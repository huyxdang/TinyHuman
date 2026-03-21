"""
Step 2 — Generate Product-Category Search Queries

For each persona, Qwen generates the search query they'd type when looking
for this type of product — NOT their problem, but the product category.

Usage:
    python scripts/2_search_queries.py --product product.json
"""

import argparse
import json
import re
import time
from pathlib import Path

import modal


SYSTEM_PROMPT = (
    "You are simulating how a real Vietnamese person would search online. "
    "Given a persona and a product category, generate the EXACT search query "
    "they would type to find this kind of product. "
    "Output only the search query string, nothing else."
)

USER_TEMPLATE = """This person wants to find a product like this:
Product category: {description}
Known options in this space: {competitors}

Person:
- Name: {name}
- Job: {job_title}
- Province: {province}
- Age: {age}
- They search in: {search_language}
- Platform: {primary_platform}

What EXACTLY would they type into Google to find this type of product?
Consider their language, job context, and how they'd phrase it naturally.
They may or may not know the product by name.

Output ONLY the search query — no quotes, no explanation."""


def clean_query(text: str) -> str:
    text = text.strip().strip("\"'").strip()
    for prefix in ["search query:", "query:", "tìm kiếm:", "google:"]:
        if text.lower().startswith(prefix):
            text = text[len(prefix):].strip()
    text = text.split("\n")[0].strip()
    return text


def main():
    parser = argparse.ArgumentParser(description="Step 2: Generate search queries")
    parser.add_argument("--product", required=True, help="Path to product JSON")
    parser.add_argument("--personas", default="data/personas.json", help="Personas from Step 1")
    parser.add_argument("--output", default="data/queries.json", help="Output file")
    args = parser.parse_args()

    with open(args.product) as f:
        product = json.load(f)
    with open(args.personas) as f:
        personas = json.load(f)

    print(f"Product: {product['name']}")
    print(f"Personas: {len(personas)}")

    competitors_str = ", ".join(product.get("competitors", []))

    # Build conversations
    conversations = []
    for p in personas:
        user_msg = USER_TEMPLATE.format(
            description=product["description"],
            competitors=competitors_str,
            name=p.get("name", ""),
            job_title=p.get("job_title", "unknown"),
            province=p.get("province", "unknown"),
            age=p.get("age", "unknown"),
            search_language=p.get("search_language", "vietnamese"),
            primary_platform=p.get("primary_platform", "Google"),
        )
        conversations.append([
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ])

    # Generate via Modal Qwen
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    print(f"Generating {len(personas)} queries via Qwen...")
    start = time.time()
    outputs = model.generate.remote(conversations, temperature=0.7, max_tokens=64)
    elapsed = time.time() - start
    print(f"  Done in {elapsed:.1f}s")

    # Build query list
    queries = []
    lang_map = {"vietnamese": "vi", "english": "en", "mixed": "vi"}
    for persona, raw in zip(personas, outputs):
        query = clean_query(raw)
        if query:
            queries.append({
                "query": query,
                "lang": lang_map.get(persona.get("search_language", "vietnamese"), "vi"),
                "persona_id": persona["id"],
                "persona_name": persona.get("name", ""),
                "persona_job": persona.get("job_title", ""),
            })

    print(f"\n{'='*50}")
    print(f"Generated {len(queries)} queries")
    print(f"{'='*50}")
    print("\nSample queries:")
    for q in queries[:10]:
        print(f"  [{q['lang']}] {q['persona_name']:20s} | {q['query'][:60]}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(queries, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to {args.output}")


if __name__ == "__main__":
    main()
