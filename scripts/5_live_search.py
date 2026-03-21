"""
Step 5 — Live Search Execution via TinyFish API

Takes search queries from Step 4 + a product URL, runs a sample against
live Google, caches the results, and maps them back to all personas.

TinyFish concurrency limit: 10 agents. So we pick ~10 representative
queries, run those, cache the results, and reuse for the full dataset.

Usage:
    python scripts/5_live_search.py \
        --queries data/queries.json \
        --product-url https://notion.so \
        --sample-size 10 \
        --output output/search_results.json

TinyFish API reference: .claude/commands/tinyfish.md
"""

import argparse
import json
import os
import re
import random
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

import requests
from dotenv import load_dotenv
load_dotenv()

BASE_URL = "https://agent.tinyfish.ai"
API_KEY = os.environ.get("TINYFISH_API_KEY")

_VIET_PATTERN = re.compile(
    r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡ"
    r"ùúụủũưừứựửữỳýỵỷỹđ]",
    re.IGNORECASE,
)

GOOGLE_URLS = {
    "vi": "https://www.google.com.vn",
    "en": "https://www.google.com",
}

PROXY_COUNTRY = {
    "vi": "JP",
    "en": "US",
}

GOAL_TEMPLATES = {
    "en": """Go to Google and search for exactly: "{query}"

Extract all organic search results from the first page. For each result return:
- rank (integer, starting at 1)
- title (the clickable link title)
- url (the destination URL)

Skip ads, "People also ask", featured snippets, knowledge panels, and any
non-organic results. Only return the standard blue-link results.

Return as a JSON array: [{{"rank": 1, "title": "...", "url": "..."}}]""",
    "vi": """Truy cập Google và tìm kiếm chính xác: "{query}"

Trích xuất tất cả kết quả tìm kiếm tự nhiên (organic) trên trang đầu tiên.
Với mỗi kết quả, trả về:
- rank (số nguyên, bắt đầu từ 1)
- title (tiêu đề của link)
- url (URL đích)

Bỏ qua quảng cáo, "Mọi người cũng hỏi", featured snippets, knowledge panels,
và các kết quả không phải organic. Chỉ trả về các kết quả blue-link tiêu chuẩn.

Trả về dưới dạng JSON array: [{{"rank": 1, "title": "...", "url": "..."}}]""",
}


def detect_language(text: str) -> str:
    if _VIET_PATTERN.search(text):
        return "vi"
    return "en"


def pick_representative_queries(queries: list[dict], sample_size: int) -> list[dict]:
    """Pick diverse representative queries across job titles and match tiers."""
    strong = [q for q in queries if q.get("match_tier") == "strong"]
    adjacent = [q for q in queries if q.get("match_tier") == "adjacent"]

    # Prioritize strong matches, then fill with adjacent
    sampled = []
    seen_jobs = set()

    for pool in [strong, adjacent]:
        random.shuffle(pool)
        for q in pool:
            job = q.get("persona_job", "")
            if job not in seen_jobs:
                seen_jobs.add(job)
                sampled.append(q)
            if len(sampled) >= sample_size:
                break
        if len(sampled) >= sample_size:
            break

    return sampled


def build_tinyfish_run(query: str, lang: str) -> dict:
    return {
        "url": GOOGLE_URLS.get(lang, GOOGLE_URLS["en"]),
        "goal": GOAL_TEMPLATES.get(lang, GOAL_TEMPLATES["en"]).format(query=query),
        "browser_profile": "stealth",
        "proxy_config": {
            "enabled": True,
            "country_code": PROXY_COUNTRY.get(lang, "US"),
        },
    }


def submit_batch(queries: list[dict]) -> list[str]:
    runs = [build_tinyfish_run(e["query"], e["lang"]) for e in queries]
    resp = requests.post(
        f"{BASE_URL}/v1/automation/run-batch",
        headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
        json={"runs": runs},
    )
    resp.raise_for_status()
    data = resp.json()
    if data.get("error"):
        print(f"Batch submit error: {data['error']}", file=sys.stderr)
        sys.exit(1)
    return data["run_ids"]


def poll_runs(run_ids: list[str], poll_interval: int = 10, timeout: int = 600) -> list[dict]:
    pending = set(run_ids)
    results: dict[str, dict] = {}
    start = time.time()

    while pending and (time.time() - start) < timeout:
        chunk = list(pending)[:100]
        resp = requests.post(
            f"{BASE_URL}/v1/runs/batch",
            headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
            json={"run_ids": chunk},
        )
        resp.raise_for_status()
        data = resp.json()

        for run in data.get("data", []):
            rid = run["run_id"]
            if run["status"] in ("COMPLETED", "FAILED", "CANCELLED"):
                results[rid] = run
                pending.discard(rid)

        if pending:
            elapsed = int(time.time() - start)
            done = len(run_ids) - len(pending)
            print(f"  {done}/{len(run_ids)} done, {len(pending)} pending... ({elapsed}s)")
            time.sleep(poll_interval)

    if pending:
        print(f"WARNING: {len(pending)} runs timed out after {timeout}s", file=sys.stderr)
        for rid in pending:
            results[rid] = {"run_id": rid, "status": "TIMEOUT", "result": None}

    return [results[rid] for rid in run_ids]


def parse_search_results(run_result: dict) -> list[dict]:
    result = run_result.get("result")
    if not result:
        return []

    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        raw = result.get("input", "")
        if isinstance(raw, str) and raw.strip():
            cleaned = re.sub(r"^```(?:json)?\s*", "", raw.strip())
            cleaned = re.sub(r"\s*```$", "", cleaned)
            try:
                parsed = json.loads(cleaned)
                if isinstance(parsed, list):
                    return parsed
            except json.JSONDecodeError:
                pass
        for key in ("results", "data", "search_results", "organic_results"):
            if key in result and isinstance(result[key], list):
                return result[key]

    return []


def check_product_rank(search_results: list[dict], product_url: str) -> tuple[bool, int | None]:
    product_domain = urlparse(product_url).netloc.lower().replace("www.", "")

    for item in search_results:
        url = item.get("url", "")
        result_domain = urlparse(url).netloc.lower().replace("www.", "")
        if product_domain in result_domain or result_domain in product_domain:
            return True, item.get("rank")
        if product_url.rstrip("/") in url:
            return True, item.get("rank")

    return False, None


def main():
    parser = argparse.ArgumentParser(description="Step 5: Live search via TinyFish")
    parser.add_argument("--queries", default="data/queries.json", help="Queries from Step 4")
    parser.add_argument("--product-url", required=True, help="Product URL to check rankings for")
    parser.add_argument("--output", default="output/search_results.json", help="Output file")
    parser.add_argument("--sample-size", type=int, default=10, help="Number of queries to actually search")
    parser.add_argument("--timeout", type=int, default=600, help="Max seconds to wait per batch")
    parser.add_argument("--cache", default="output/search_cache.json", help="Cache file for reuse")
    args = parser.parse_args()

    if not API_KEY:
        print("ERROR: Set TINYFISH_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    with open(args.queries) as f:
        all_queries = json.load(f)
    print(f"Loaded {len(all_queries)} total queries")

    # Check for existing cache
    cache_path = Path(args.cache)
    cache = {}
    if cache_path.exists():
        with open(cache_path) as f:
            cached = json.load(f)
        cache = {r["query"]: r for r in cached}
        print(f"Loaded {len(cache)} cached results")

    # Pick representative sample
    uncached = [q for q in all_queries if q["query"] not in cache]
    if uncached and args.sample_size > 0:
        sample = pick_representative_queries(uncached, args.sample_size)
        print(f"\nSearching {len(sample)} representative queries via TinyFish:")
        for q in sample:
            print(f"  [{q['lang']}] {q['query'][:70]}")

        # Submit and poll
        print(f"\nSubmitting {len(sample)} queries...")
        run_ids = submit_batch(sample)
        print(f"Polling (timeout {args.timeout}s)...")
        runs = poll_runs(run_ids, timeout=args.timeout)

        # Parse and cache results
        for query_entry, run in zip(sample, runs):
            search_results = parse_search_results(run)
            product_found, product_rank = check_product_rank(search_results, args.product_url)
            status = run.get("status", "UNKNOWN")

            result = {
                "query": query_entry["query"],
                "lang": query_entry["lang"],
                "persona_ids": query_entry.get("persona_ids", []),
                "product_found": product_found,
                "product_rank": product_rank,
                "run_status": status,
                "top_results": search_results[:10],
            }
            cache[query_entry["query"]] = result

        # Save cache
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        with open(cache_path, "w") as f:
            json.dump(list(cache.values()), f, indent=2, ensure_ascii=False)
        print(f"Cache saved to {args.cache} ({len(cache)} entries)")

    # Map cached results to ALL queries
    # Each uncached query gets the result from the closest cached query (random for demo)
    cached_results = list(cache.values())
    results = []
    found_count = 0
    for q in all_queries:
        if q["query"] in cache:
            r = {**cache[q["query"]], "persona_ids": q.get("persona_ids", [])}
        else:
            # Assign a random cached result (for demo — in prod, cluster & match)
            donor = random.choice(cached_results)
            r = {
                **donor,
                "query": q["query"],
                "persona_ids": q.get("persona_ids", []),
            }
        results.append(r)
        if r.get("product_found"):
            found_count += 1

    # Summary
    successful = sum(1 for r in results if r["run_status"] == "COMPLETED")
    failed = len(results) - successful
    print(f"\n{'='*50}")
    print(f"Total queries:     {len(results)}")
    print(f"Real searches:     {len(cache)}")
    print(f"Mapped from cache: {len(results) - len(cache)}")
    print(f"Product found:     {found_count}/{len(results)}")
    if len(results):
        print(f"Discoverability:   {found_count / len(results) * 100:.1f}%")
    print(f"{'='*50}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"Results saved to {args.output}")


if __name__ == "__main__":
    main()
