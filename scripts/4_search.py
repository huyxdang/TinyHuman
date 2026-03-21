"""
Step 4 — Live Search via TinyFish

Runs search queries against Google via TinyFish browser agents.
Respects concurrency limit (default 10). Caches results for reuse.

Usage:
    python scripts/4_search.py --product-url https://notion.so
    python scripts/4_search.py --queries data/queries.json --product-url https://notion.so --concurrency 10
"""

import argparse
import json
import os
import re
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

GOOGLE_URLS = {"vi": "https://www.google.com.vn", "en": "https://www.google.com"}
PROXY_COUNTRY = {"vi": "JP", "en": "US"}

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
    runs = [build_tinyfish_run(q["query"], q["lang"]) for q in queries]
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
        for run in resp.json().get("data", []):
            rid = run["run_id"]
            if run["status"] in ("COMPLETED", "FAILED", "CANCELLED"):
                results[rid] = run
                pending.discard(rid)

        if pending:
            elapsed = int(time.time() - start)
            done = len(run_ids) - len(pending)
            print(f"    {done}/{len(run_ids)} done, {len(pending)} pending... ({elapsed}s)")
            time.sleep(poll_interval)

    if pending:
        print(f"  WARNING: {len(pending)} runs timed out", file=sys.stderr)
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
    parser = argparse.ArgumentParser(description="Step 4: Live search via TinyFish")
    parser.add_argument("--queries", default="data/queries.json", help="Queries from Step 3")
    parser.add_argument("--product-url", required=True, help="Product URL to check")
    parser.add_argument("--output", default="output/search_results.json", help="Output file")
    parser.add_argument("--concurrency", type=int, default=10, help="Max concurrent TinyFish agents")
    parser.add_argument("--timeout", type=int, default=600, help="Timeout per wave in seconds")
    parser.add_argument("--cache", default="output/search_cache.json", help="Cache file")
    args = parser.parse_args()

    if not API_KEY:
        print("ERROR: Set TINYFISH_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    with open(args.queries) as f:
        all_queries = json.load(f)
    print(f"Loaded {len(all_queries)} queries")

    # Load cache
    cache_path = Path(args.cache)
    cache = {}
    if cache_path.exists():
        with open(cache_path) as f:
            for r in json.load(f):
                cache[r["query"]] = r
        print(f"Loaded {len(cache)} cached results")

    # Find uncached queries
    to_search = [q for q in all_queries if q["query"] not in cache]
    print(f"Need to search: {len(to_search)} ({len(all_queries) - len(to_search)} cached)")

    # Process in waves of concurrency limit
    total_waves = (len(to_search) + args.concurrency - 1) // args.concurrency if to_search else 0
    for wave_idx in range(0, len(to_search), args.concurrency):
        wave = to_search[wave_idx : wave_idx + args.concurrency]
        wave_num = wave_idx // args.concurrency + 1
        print(f"\n  Wave {wave_num}/{total_waves}: {len(wave)} queries")

        run_ids = submit_batch(wave)
        runs = poll_runs(run_ids, timeout=args.timeout)

        for query_entry, run in zip(wave, runs):
            search_results = parse_search_results(run)
            product_found, product_rank = check_product_rank(search_results, args.product_url)

            cache[query_entry["query"]] = {
                "query": query_entry["query"],
                "lang": query_entry["lang"],
                "persona_id": query_entry.get("persona_id"),
                "product_found": product_found,
                "product_rank": product_rank,
                "run_status": run.get("status", "UNKNOWN"),
                "top_results": search_results[:10],
            }

        # Save cache after each wave
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        with open(cache_path, "w") as f:
            json.dump(list(cache.values()), f, indent=2, ensure_ascii=False)

    # Map all queries to results
    results = []
    found_count = 0
    for q in all_queries:
        r = cache.get(q["query"], {
            "query": q["query"],
            "lang": q["lang"],
            "persona_id": q.get("persona_id"),
            "product_found": False,
            "product_rank": None,
            "run_status": "MISSING",
            "top_results": [],
        })
        r["persona_id"] = q.get("persona_id")
        results.append(r)
        if r.get("product_found"):
            found_count += 1

    successful = sum(1 for r in results if r["run_status"] == "COMPLETED")
    print(f"\n{'='*50}")
    print(f"Total queries:   {len(results)}")
    print(f"Successful:      {successful}")
    print(f"Product found:   {found_count}/{successful}")
    if successful:
        print(f"Discoverability: {found_count / successful * 100:.1f}%")
    print(f"{'='*50}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
