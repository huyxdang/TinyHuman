"""
Step 4 — Search Query Generation for Qualifying Personas (Qwen on Modal)

Takes qualifying personas from Step 3 and generates the search query each
persona would type, based on their frustration, platform, and language.

The persona NEVER sees the product. They search for their problem.

Usage:
    python scripts/4_generate_queries.py \
        --matched data/matched_personas.json \
        --output data/queries.json

Requirements:
    pip install modal
    modal deploy modal_app/qwen.py
"""

import argparse
import json
import re
import time
from pathlib import Path

import modal

SYSTEM_PROMPT = (
    "You are simulating how a real Vietnamese person would search online. "
    "Given a persona and their frustration, generate the EXACT search query "
    "they would type. Output only the search query string, nothing else."
)

USER_TEMPLATE = """This person has a problem and wants to find a solution online.

Person:
- Job: {job_title}
- Province: {province}
- Age: {age}
- Platform they usually use: {primary_platform}
- They search in: {search_language}

Their frustration: "{frustration}"

What EXACTLY would they type into Google to find a solution?
Consider their language, tech level, and how they'd phrase it naturally.

Output ONLY the search query — no quotes, no explanation."""


def build_conversations(personas: list[dict]) -> list[list[dict]]:
    """Build one conversation per persona, using their top frustration."""
    convos = []
    for p in personas:
        # Use the frustration with highest relevance (first one)
        frustration = p["top_3_frustrations"][0] if p.get("top_3_frustrations") else ""
        user_msg = USER_TEMPLATE.format(
            job_title=p.get("job_title", "unknown"),
            province=p.get("province", "unknown"),
            age=p.get("age", "unknown"),
            primary_platform=p.get("primary_platform", "Google"),
            search_language=p.get("search_language", "vietnamese"),
            frustration=frustration,
        )
        convos.append([
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ])
    return convos


def clean_query(text: str) -> str:
    """Clean up model output to a bare search query."""
    # Remove quotes, leading/trailing whitespace
    text = text.strip().strip('"\'').strip()
    # Remove any "Search query:" or similar prefixes
    for prefix in ["search query:", "query:", "tìm kiếm:", "google:"]:
        if text.lower().startswith(prefix):
            text = text[len(prefix):].strip()
    # Take only first line if multi-line
    text = text.split("\n")[0].strip()
    return text


def main():
    parser = argparse.ArgumentParser(description="Step 4: Generate search queries for qualifying personas")
    parser.add_argument("--matched", default="data/matched_personas.json", help="Path to matched personas from Step 3")
    parser.add_argument("--output", default="data/queries.json", help="Output queries file")
    parser.add_argument("--batch-size", type=int, default=500, help="Prompts per Modal call")
    parser.add_argument("--max-tokens", type=int, default=64, help="Max tokens per query (queries are short)")
    parser.add_argument("--temperature", type=float, default=0.7, help="Sampling temperature")
    args = parser.parse_args()

    with open(args.matched) as f:
        data = json.load(f)

    personas = data["qualifying_personas"]
    print(f"Loaded {len(personas)} qualifying personas")
    print(f"Product: {data['product']}")

    # Get Modal handle
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    # Generate queries in batches
    all_queries = []
    start = time.time()

    for i in range(0, len(personas), args.batch_size):
        batch = personas[i : i + args.batch_size]
        batch_num = i // args.batch_size + 1
        total_batches = (len(personas) + args.batch_size - 1) // args.batch_size

        conversations = build_conversations(batch)
        outputs = model.generate.remote(
            conversations,
            temperature=args.temperature,
            max_tokens=args.max_tokens,
        )

        for persona, raw_query in zip(batch, outputs):
            query = clean_query(raw_query)
            if query:
                all_queries.append({
                    "query": query,
                    "lang": persona.get("search_language", "vietnamese"),
                    "persona_ids": [persona["id"]],
                    "persona_province": persona.get("province"),
                    "persona_job": persona.get("job_title"),
                    "match_score": persona.get("match_score"),
                    "match_tier": persona.get("match_tier"),
                })

        elapsed = time.time() - start
        print(f"  Batch {batch_num}/{total_batches}: {len(all_queries)} queries ({elapsed:.1f}s)")

    elapsed = time.time() - start

    # Map search_language values to lang codes for live_search compatibility
    lang_map = {"vietnamese": "vi", "english": "en", "mixed": "vi"}
    for q in all_queries:
        q["lang"] = lang_map.get(q["lang"], "vi")

    # Summary
    vi_count = sum(1 for q in all_queries if q["lang"] == "vi")
    en_count = len(all_queries) - vi_count
    print(f"\n{'='*50}")
    print(f"Total queries: {len(all_queries)} ({vi_count} vi, {en_count} en)")
    print(f"Time: {elapsed:.1f}s")
    print(f"{'='*50}")

    # Show sample queries
    print("\nSample queries:")
    for q in all_queries[:10]:
        print(f"  [{q['lang']}] {q['query'][:70]}")

    # Save
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(all_queries, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to {args.output}")


if __name__ == "__main__":
    main()
