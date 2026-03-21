"""
Step 3 — Product Problem Space + Persona Matching (LLM-as-Judge)

1. GPT-4o generates ~20-30 problem statements from the product description
2. Qwen scores each persona's relevance to the product (0-10)
3. Filters qualifying personas by score threshold
4. Outputs qualifying personas with match scores

Usage:
    python scripts/3_product_match.py \
        --product "Notion - an all-in-one workspace for notes, docs, and project management" \
        --personas data/personas.json \
        --output data/matched_personas.json

Requirements:
    pip install openai modal python-dotenv
    OPENAI_API_KEY env var set
    modal deploy modal_app/qwen.py
"""

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
load_dotenv()

import modal
from openai import OpenAI

STRONG_THRESHOLD = 7
ADJACENT_THRESHOLD = 4

PROBLEM_SYSTEM_PROMPT = (
    "You are a market researcher. Given a product, generate a list of problems "
    "that real people experience that this product could solve. "
    "These should be phrased as frustrations people FEEL — not product features. "
    "Write them in both Vietnamese and English since the target market is Vietnam. "
    "Output a JSON array of strings, nothing else."
)

PROBLEM_USER_TEMPLATE = """Product: {product}

Generate 20-30 problem statements that real people feel, which this product could solve.

Rules:
- Write from the person's perspective, not the product's
- Be specific ("I can't find the doc my PM shared last week") not generic ("document management is hard")
- Include problems in both Vietnamese and English
- Cover different user types: students, office workers, freelancers, managers, etc.
- Include both obvious and non-obvious use cases

Output a JSON array of strings only. No explanation."""

JUDGE_SYSTEM_PROMPT = (
    "You are a product-market fit judge. Given a product's problem space and a person's profile, "
    "score how relevant this product is to this person from 0 to 10. "
    "Output ONLY a single integer 0-10, nothing else."
)

JUDGE_USER_TEMPLATE = """Product: {product}

Problems this product solves:
{problems_text}

Person:
- Job: {job_title}
- Industry: {industry}
- Province: {province}
- Age: {age}
- Their frustrations:
{frustrations_text}

How relevant is this product to this person? (0 = completely irrelevant, 5 = somewhat relevant, 10 = perfect match)
Output ONLY a single integer 0-10."""


def generate_problem_space(product: str) -> list[str]:
    """Call OpenAI to generate product problem statements."""
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o",
        max_tokens=2048,
        messages=[
            {"role": "system", "content": PROBLEM_SYSTEM_PROMPT},
            {"role": "user", "content": PROBLEM_USER_TEMPLATE.format(product=product)},
        ],
    )

    text = response.choices[0].message.content.strip()

    bracket_match = re.search(r"\[.*\]", text, re.DOTALL)
    if bracket_match:
        problems = json.loads(bracket_match.group(0))
        return [p for p in problems if isinstance(p, str) and p.strip()]

    raise ValueError(f"Could not parse problem list from response:\n{text[:500]}")


def build_judge_conversations(personas: list[dict], product: str, problems: list[str]) -> list[list[dict]]:
    """Build one judge conversation per persona."""
    problems_text = "\n".join(f"- {p}" for p in problems)
    convos = []
    for p in personas:
        frustrations = p.get("top_3_frustrations", [])
        frustrations_text = "\n".join(f"  - {f}" for f in frustrations)

        user_msg = JUDGE_USER_TEMPLATE.format(
            product=product,
            problems_text=problems_text,
            job_title=p.get("job_title", "unknown"),
            industry=p.get("industry", "unknown"),
            province=p.get("province", "unknown"),
            age=p.get("age", "unknown"),
            frustrations_text=frustrations_text,
        )
        convos.append([
            {"role": "system", "content": JUDGE_SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ])
    return convos


def parse_score(text: str) -> int | None:
    """Extract integer score 0-10 from model output."""
    text = text.strip()
    # Try direct int parse
    try:
        score = int(text)
        if 0 <= score <= 10:
            return score
    except ValueError:
        pass
    # Try to find first number in text
    match = re.search(r'\b(\d+)\b', text)
    if match:
        score = int(match.group(1))
        if 0 <= score <= 10:
            return score
    return None


def main():
    parser = argparse.ArgumentParser(description="Step 3: Product matching via LLM-as-judge")
    parser.add_argument("--product", required=True, help="Product name + description")
    parser.add_argument("--personas", default="data/personas.json", help="Path to personas JSON")
    parser.add_argument("--output", default="data/matched_personas.json", help="Output file")
    parser.add_argument("--batch-size", type=int, default=500, help="Prompts per Modal call")
    parser.add_argument("--strong-threshold", type=int, default=STRONG_THRESHOLD)
    parser.add_argument("--adjacent-threshold", type=int, default=ADJACENT_THRESHOLD)
    args = parser.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print("ERROR: Set OPENAI_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    # Load personas
    with open(args.personas) as f:
        personas = json.load(f)
    print(f"Loaded {len(personas)} personas")

    # Step 1: GPT-4o generates problem space
    print("Generating product problem space via GPT-4o...")
    start = time.time()
    problems = generate_problem_space(args.product)
    print(f"  Generated {len(problems)} problem statements ({time.time()-start:.1f}s)")
    for i, p in enumerate(problems[:5]):
        print(f"    [{i}] {p[:80]}")
    if len(problems) > 5:
        print(f"    ... and {len(problems)-5} more")

    # Step 2: Qwen scores each persona
    print(f"\nScoring {len(personas)} personas via Qwen (batch size {args.batch_size})...")
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    all_scores = []
    failed = 0
    start = time.time()

    for i in range(0, len(personas), args.batch_size):
        batch = personas[i : i + args.batch_size]
        batch_num = i // args.batch_size + 1
        total_batches = (len(personas) + args.batch_size - 1) // args.batch_size

        convos = build_judge_conversations(batch, args.product, problems)
        outputs = model.generate.remote(
            convos,
            temperature=0.1,  # Low temp for consistent scoring
            max_tokens=4,     # Just need a single number
        )

        for raw in outputs:
            score = parse_score(raw)
            if score is not None:
                all_scores.append(score)
            else:
                all_scores.append(-1)  # Mark as failed
                failed += 1

        elapsed = time.time() - start
        print(f"  Batch {batch_num}/{total_batches}: {len(all_scores)} scored ({elapsed:.1f}s)")

    elapsed = time.time() - start
    print(f"  Total scoring time: {elapsed:.1f}s")
    if failed:
        print(f"  WARNING: {failed} personas failed to parse score")

    # Score distribution
    valid_scores = [s for s in all_scores if s >= 0]
    if valid_scores:
        from collections import Counter
        dist = Counter(valid_scores)
        print(f"\nScore distribution:")
        for score in range(11):
            count = dist.get(score, 0)
            bar = "█" * (count // 10)
            print(f"  {score:2d}: {count:4d} {bar}")

    # Filter by thresholds
    strong = sum(1 for s in all_scores if s >= args.strong_threshold)
    adjacent = sum(1 for s in all_scores if args.adjacent_threshold <= s < args.strong_threshold)
    filtered = sum(1 for s in all_scores if 0 <= s < args.adjacent_threshold)
    print(f"\n  Strong (>={args.strong_threshold}):    {strong}")
    print(f"  Adjacent ({args.adjacent_threshold}-{args.strong_threshold - 1}):   {adjacent}")
    print(f"  Filtered (<{args.adjacent_threshold}):  {filtered}")

    # Build output
    qualifying = []
    for persona, score in zip(personas, all_scores):
        if score >= args.adjacent_threshold:
            qualifying.append({
                **persona,
                "match_score": score / 10.0,  # Normalize to 0-1 for downstream compat
                "match_score_raw": score,
                "match_tier": "strong" if score >= args.strong_threshold else "adjacent",
            })

    qualifying.sort(key=lambda p: p["match_score"], reverse=True)

    print(f"\n{'='*50}")
    print(f"Total qualifying: {len(qualifying)} / {len(personas)}")
    print(f"  Strong:   {strong}")
    print(f"  Adjacent: {adjacent}")
    print(f"{'='*50}")

    # Save
    output = {
        "product": args.product,
        "problems": problems,
        "thresholds": {
            "strong": args.strong_threshold,
            "adjacent": args.adjacent_threshold,
        },
        "summary": {
            "total_personas": len(personas),
            "strong_matches": strong,
            "adjacent_matches": adjacent,
            "filtered_out": filtered,
            "parse_failures": failed,
        },
        "qualifying_personas": qualifying,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
