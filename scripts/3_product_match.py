"""
Step 3 — Product Problem Space + Persona Matching

1. Claude generates ~20-30 problem statements from the product description
2. Embeds them via Modal (multilingual-e5-small)
3. Cosine similarity against all persona embeddings
4. Filters qualifying personas by threshold
5. Outputs qualifying personas with match scores

Usage:
    python scripts/3_product_match.py \
        --product "Notion - an all-in-one workspace for notes, docs, and project management" \
        --personas data/personas.json \
        --embeddings data/persona_embeddings.npy \
        --output data/matched_personas.json

Requirements:
    pip install openai modal numpy
    OPENAI_API_KEY env var set
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
load_dotenv()

import modal
import numpy as np
from openai import OpenAI

STRONG_THRESHOLD = 0.75
ADJACENT_THRESHOLD = 0.55

SYSTEM_PROMPT = (
    "You are a market researcher. Given a product, generate a list of problems "
    "that real people experience that this product could solve. "
    "These should be phrased as frustrations people FEEL — not product features. "
    "Write them in both Vietnamese and English since the target market is Vietnam. "
    "Output a JSON array of strings, nothing else."
)

USER_TEMPLATE = """Product: {product}

Generate 20-30 problem statements that real people feel, which this product could solve.

Rules:
- Write from the person's perspective, not the product's
- Be specific ("I can't find the doc my PM shared last week") not generic ("document management is hard")
- Include problems in both Vietnamese and English
- Cover different user types: students, office workers, freelancers, managers, etc.
- Include both obvious and non-obvious use cases

Output a JSON array of strings only. No explanation."""


def generate_problem_space(product: str) -> list[str]:
    """Call OpenAI to generate product problem statements."""
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o",
        max_tokens=2048,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": USER_TEMPLATE.format(product=product)},
        ],
    )

    text = response.choices[0].message.content.strip()

    # Parse JSON array from response
    import re
    bracket_match = re.search(r"\[.*\]", text, re.DOTALL)
    if bracket_match:
        problems = json.loads(bracket_match.group(0))
        return [p for p in problems if isinstance(p, str) and p.strip()]

    raise ValueError(f"Could not parse problem list from Claude response:\n{text[:500]}")


def embed_problems(problems: list[str]) -> np.ndarray:
    """Embed problem statements via Modal. Uses 'query: ' prefix for E5 retrieval."""
    Embedder = modal.Cls.from_name("tinyuser-embed", "Embedder")
    model = Embedder()

    # E5 uses "query: " for the search/retrieval side, "passage: " for stored docs.
    # Persona frustrations were embedded with "passage: ", so product problems
    # must use "query: " for proper asymmetric similarity.
    vecs = model.embed.remote(problems, prefix="query")
    return np.array(vecs, dtype=np.float32)


def match_personas(
    persona_embeddings: np.ndarray,
    problem_embeddings: np.ndarray,
) -> np.ndarray:
    """Compute max cosine similarity between each persona and any product problem.

    Returns array of shape (n_personas,) with match scores 0.0-1.0.
    Both inputs should be L2-normalized, so dot product = cosine similarity.
    """
    # (n_personas, dim) @ (dim, n_problems) -> (n_personas, n_problems)
    similarity_matrix = persona_embeddings @ problem_embeddings.T

    # Each persona's score = max similarity across all product problems
    return similarity_matrix.max(axis=1)


def main():
    parser = argparse.ArgumentParser(description="Step 3: Product problem space + persona matching")
    parser.add_argument("--product", required=True, help="Product name + description")
    parser.add_argument("--personas", default="data/personas.json", help="Path to personas JSON")
    parser.add_argument("--embeddings", default="data/persona_embeddings.npy", help="Path to persona embeddings .npy")
    parser.add_argument("--output", default="data/matched_personas.json", help="Output file")
    parser.add_argument("--strong-threshold", type=float, default=STRONG_THRESHOLD)
    parser.add_argument("--adjacent-threshold", type=float, default=ADJACENT_THRESHOLD)
    args = parser.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print("ERROR: Set OPENAI_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    # Load pre-computed data
    with open(args.personas) as f:
        personas = json.load(f)
    persona_emb = np.load(args.embeddings)
    print(f"Loaded {len(personas)} personas, embeddings shape {persona_emb.shape}")

    # Step 1: Claude generates problem space
    print("Generating product problem space via Claude...")
    start = time.time()
    problems = generate_problem_space(args.product)
    print(f"  Generated {len(problems)} problem statements ({time.time()-start:.1f}s)")
    for i, p in enumerate(problems[:5]):
        print(f"    [{i}] {p[:80]}")
    if len(problems) > 5:
        print(f"    ... and {len(problems)-5} more")

    # Step 2: Embed problems via Modal
    print("Embedding problem statements via Modal...")
    start = time.time()
    problem_emb = embed_problems(problems)
    print(f"  Embedded {problem_emb.shape[0]} problems, dim={problem_emb.shape[1]} ({time.time()-start:.1f}s)")

    # Step 3: Cosine similarity matching
    print("Computing cosine similarity...")
    scores = match_personas(persona_emb, problem_emb)

    strong = (scores >= args.strong_threshold).sum()
    adjacent = ((scores >= args.adjacent_threshold) & (scores < args.strong_threshold)).sum()
    filtered = (scores < args.adjacent_threshold).sum()
    print(f"  Strong match (>{args.strong_threshold}):   {strong}")
    print(f"  Adjacent ({args.adjacent_threshold}-{args.strong_threshold}):        {adjacent}")
    print(f"  Filtered out (<{args.adjacent_threshold}):  {filtered}")

    # Build output: qualifying personas with scores
    qualifying = []
    for i, (persona, score) in enumerate(zip(personas, scores)):
        if score >= args.adjacent_threshold:
            qualifying.append({
                **persona,
                "match_score": round(float(score), 4),
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
            "strong_matches": int(strong),
            "adjacent_matches": int(adjacent),
            "filtered_out": int(filtered),
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
