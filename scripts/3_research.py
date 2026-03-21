"""
Step 3 — Research Product & Competitors via TinyFish

Phase 1: Discover competitors by searching Google
Phase 2: Deep-research the product + each discovered competitor

Usage:
    python scripts/3_research.py --product product.json
    python scripts/3_research.py --product product.json --max-competitors 5
"""

import argparse
import json
import os
import re
import sys
import time
from collections import Counter
from pathlib import Path

import requests
from dotenv import load_dotenv
load_dotenv()

BASE_URL = "https://agent.tinyfish.ai"
API_KEY = os.environ.get("TINYFISH_API_KEY")


# ── Phase 1: Discover Competitors ────────────────────────────────────────

def build_discovery_searches(product: dict) -> list[dict]:
    """Build TinyFish searches to discover who the competitors are."""
    name = product["name"]
    return [
        {
            "id": "discover_alternatives",
            "label": f"Discover {name} alternatives",
            "url": "https://www.google.com",
            "goal": f"""Go to Google and search for "best {name} alternatives 2025".

Click on 2-3 of the top results and read them.

Extract every competing product/service mentioned. For each one, return:
- name: the product name (e.g. "Claude", not "Anthropic Claude" or "claude.ai")
- mentions: how many articles mentioned it

Return as JSON:
{{"competitors": [{{"name": "...", "mentions": 1}}], "source": "url"}}

Return at least 5 competitors, up to 10. Only include real products, not generic categories.""",
        },
        {
            "id": "discover_competitors",
            "label": f"Discover {name} competitors",
            "url": "https://www.google.com",
            "goal": f"""Go to Google and search for "{name} competitors 2025".

Click on 2-3 of the top results and read them.

Extract every competing product/service mentioned. For each one, return:
- name: the product name (e.g. "Gemini", not "Google Gemini AI")
- mentions: how many articles mentioned it

Return as JSON:
{{"competitors": [{{"name": "...", "mentions": 1}}], "source": "url"}}

Return at least 5 competitors, up to 10. Only include real products, not generic categories.""",
        },
    ]


def extract_competitors(discovery_results: dict, max_competitors: int) -> list[str]:
    """Merge competitor lists from discovery searches, ranked by mention count."""
    counts = Counter()

    for key in ("discover_alternatives", "discover_competitors"):
        data = discovery_results.get(key, {}).get("data")
        if not data or not isinstance(data, dict):
            continue
        for comp in data.get("competitors", []):
            if not isinstance(comp, dict):
                continue
            name = comp.get("name", "").strip()
            if not name:
                continue
            mentions = comp.get("mentions", 1)
            if not isinstance(mentions, int):
                mentions = 1
            counts[name] += mentions

    # Return top N by total mentions
    ranked = [name for name, _ in counts.most_common(max_competitors)]
    return ranked


# ── Phase 2: Deep Research ───────────────────────────────────────────────

def build_research_searches(product: dict, competitors: list[str]) -> list[dict]:
    """Build TinyFish searches for deep research on the product + competitors."""
    name = product["name"]
    searches = []

    # Product pricing
    searches.append({
        "id": "product_pricing",
        "label": f"{name} pricing",
        "url": "https://www.google.com",
        "goal": f"""Go to Google and search for "{name} pricing 2025".

Click on the most relevant result (preferably the official pricing page).

Extract:
- Free tier details (what's included, limits)
- Paid plan names and prices
- Any notable limitations

Return as JSON:
{{"free_tier": "description", "plans": [{{"name": "plan name", "price": "$20/month", "features": "key features"}}], "source": "url where you found this"}}""",
    })

    # Product reviews
    searches.append({
        "id": "product_reviews",
        "label": f"{name} reviews",
        "url": "https://www.google.com",
        "goal": f"""Go to Google and search for "{name} review 2025".

Read the top 3-5 results. Extract:
- Overall sentiment (positive/mixed/negative)
- Top 3 pros people mention
- Top 3 cons people mention
- A notable quote from a review

Return as JSON:
{{"sentiment": "positive", "pros": ["pro1", "pro2", "pro3"], "cons": ["con1", "con2", "con3"], "notable_quote": "quote text", "sources": ["url1", "url2"]}}""",
    })

    # Competitor deep-research
    for comp in competitors:
        safe_id = re.sub(r'[^a-z0-9]+', '_', comp.lower()).strip('_')
        searches.append({
            "id": f"competitor_{safe_id}",
            "label": f"{comp} research",
            "url": "https://www.google.com",
            "goal": f"""Go to Google and search for "{comp} pricing features 2025".

Click on the most relevant results (ideally the official site or a detailed review).

Extract:
- What {comp} is (1 sentence description)
- Pricing (free tier + paid plans with prices)
- Top 3-5 key features
- How it differs from {name}

Return as JSON:
{{"description": "one sentence", "pricing": {{"free_tier": "description", "plans": [{{"name": "plan name", "price": "$X/month"}}]}}, "key_features": ["feature1", "feature2", "feature3"], "vs_{safe_id}": "how it compares to {name}"}}""",
        })

    return searches


# ── TinyFish Batch Runner ────────────────────────────────────────────────

def run_tinyfish_batch(searches: list[dict], concurrency: int = 10) -> dict:
    """Submit searches to TinyFish in waves and collect results."""
    results = {}
    total_waves = (len(searches) + concurrency - 1) // concurrency

    for wave_idx in range(0, len(searches), concurrency):
        wave = searches[wave_idx : wave_idx + concurrency]
        wave_num = wave_idx // concurrency + 1
        print(f"\n  Wave {wave_num}/{total_waves}: {len(wave)} searches")
        for s in wave:
            print(f"    - {s['label']}")

        # Submit batch
        runs = []
        for s in wave:
            runs.append({
                "url": s["url"],
                "goal": s["goal"],
                "browser_profile": "stealth",
                "proxy_config": {"enabled": True, "country_code": "US"},
            })

        resp = requests.post(
            f"{BASE_URL}/v1/automation/run-batch",
            headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
            json={"runs": runs},
        )
        resp.raise_for_status()
        data = resp.json()
        if data.get("error"):
            print(f"  ERROR: {data['error']}")
            continue
        run_ids = data["run_ids"]

        # Poll until done
        pending = set(run_ids)
        run_results = {}
        start = time.time()
        timeout = 600

        while pending and (time.time() - start) < timeout:
            chunk = list(pending)[:100]
            resp = requests.post(
                f"{BASE_URL}/v1/runs/batch",
                headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
                json={"run_ids": chunk},
            )
            resp.raise_for_status()
            for run in resp.json().get("data", []):
                rid = run["run_id"]
                if run["status"] in ("COMPLETED", "FAILED", "CANCELLED"):
                    run_results[rid] = run
                    pending.discard(rid)

            if pending:
                elapsed = int(time.time() - start)
                done = len(run_ids) - len(pending)
                print(f"    {done}/{len(run_ids)} done, {len(pending)} pending... ({elapsed}s)")
                time.sleep(10)

        if pending:
            print(f"    WARNING: {len(pending)} runs timed out")

        # Map results back
        for search, rid in zip(wave, run_ids):
            run = run_results.get(rid, {"status": "TIMEOUT", "result": None})
            parsed = parse_result(run)
            results[search["id"]] = {
                "id": search["id"],
                "label": search["label"],
                "status": run.get("status", "TIMEOUT"),
                "data": parsed,
                "raw": run.get("result"),
            }
            status = run.get("status", "TIMEOUT")
            print(f"    {search['label']}: {status}")

    return results


def parse_result(run: dict) -> dict | None:
    """Try to extract JSON from TinyFish result."""
    result = run.get("result")
    if not result:
        return None

    raw = result
    if isinstance(result, dict):
        raw = result.get("input", result.get("output", result.get("data", "")))

    if isinstance(raw, dict):
        return raw

    if isinstance(raw, str):
        cleaned = re.sub(r"^```(?:json)?\s*", "", raw.strip())
        cleaned = re.sub(r"\s*```$", "", cleaned)
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            match = re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', cleaned)
            if match:
                try:
                    return json.loads(match.group())
                except json.JSONDecodeError:
                    pass
            return {"raw_text": raw}

    return None


# ── Knowledge Base Assembly ──────────────────────────────────────────────

def build_knowledge_base(product: dict, competitors: list[str], results: dict) -> dict:
    """Assemble results into a structured knowledge base."""
    knowledge = {
        "product": {
            "name": product["name"],
            "url": product["url"],
            "description": product["description"],
            "pricing": results.get("product_pricing", {}).get("data"),
            "reviews": results.get("product_reviews", {}).get("data"),
        },
        "competitors": {},
        "competitor_names": competitors,
    }

    for comp in competitors:
        safe_id = re.sub(r'[^a-z0-9]+', '_', comp.lower()).strip('_')
        key = f"competitor_{safe_id}"
        knowledge["competitors"][comp] = results.get(key, {}).get("data")

    # Build plain-text summary for injecting into chat prompts
    summary_parts = [f"=== {product['name']} ==="]
    summary_parts.append(f"Description: {product['description']}")

    pricing = knowledge["product"]["pricing"]
    if pricing and isinstance(pricing, dict):
        summary_parts.append(f"Pricing: {json.dumps(pricing, ensure_ascii=False)}")

    reviews = knowledge["product"]["reviews"]
    if reviews and isinstance(reviews, dict):
        pros = reviews.get("pros", [])
        cons = reviews.get("cons", [])
        if pros:
            summary_parts.append(f"Pros: {', '.join(pros[:3])}")
        if cons:
            summary_parts.append(f"Cons: {', '.join(cons[:3])}")

    for comp_name, comp_data in knowledge["competitors"].items():
        summary_parts.append(f"\n=== {comp_name} ===")
        if comp_data and isinstance(comp_data, dict):
            summary_parts.append(json.dumps(comp_data, ensure_ascii=False))
        else:
            summary_parts.append("No data available")

    knowledge["summary_text"] = "\n".join(summary_parts)

    return knowledge


# ── Main ─────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Step 3: Research product via TinyFish")
    parser.add_argument("--product", required=True, help="Path to product JSON")
    parser.add_argument("--output", default="output/knowledge.json", help="Output file")
    parser.add_argument("--max-competitors", type=int, default=5, help="Max competitors to research")
    parser.add_argument("--concurrency", type=int, default=10, help="Max concurrent TinyFish agents")
    args = parser.parse_args()

    if not API_KEY:
        print("ERROR: Set TINYFISH_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    with open(args.product) as f:
        product = json.load(f)

    print(f"Product: {product['name']}")

    # Phase 1: Discover competitors
    print(f"\n{'='*50}")
    print("PHASE 1: Discovering competitors...")
    print(f"{'='*50}")

    discovery_searches = build_discovery_searches(product)
    discovery_results = run_tinyfish_batch(discovery_searches, concurrency=args.concurrency)

    competitors = extract_competitors(discovery_results, args.max_competitors)
    print(f"\nDiscovered {len(competitors)} competitors: {', '.join(competitors)}")

    if not competitors:
        print("WARNING: No competitors discovered, proceeding with product research only")

    # Phase 2: Deep research
    print(f"\n{'='*50}")
    print("PHASE 2: Researching product + competitors...")
    print(f"{'='*50}")

    research_searches = build_research_searches(product, competitors)
    print(f"Total research searches: {len(research_searches)}")

    research_results = run_tinyfish_batch(research_searches, concurrency=args.concurrency)

    # Build knowledge base
    knowledge = build_knowledge_base(product, competitors, research_results)

    # Save
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(knowledge, f, indent=2, ensure_ascii=False)

    # Print summary
    total = len(discovery_results) + len(research_results)
    successful = sum(1 for r in discovery_results.values() if r["status"] == "COMPLETED")
    successful += sum(1 for r in research_results.values() if r["status"] == "COMPLETED")
    print(f"\n{'='*50}")
    print(f"Searches: {total} total, {successful} successful")
    print(f"Competitors found: {', '.join(competitors)}")
    print(f"Knowledge base saved to {args.output}")
    print(f"{'='*50}")
    print(f"\nSummary preview:")
    print(knowledge["summary_text"][:500])


if __name__ == "__main__":
    main()
