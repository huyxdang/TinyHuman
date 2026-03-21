"""
Step 4 — Live Search Execution via TinyFish API

Takes search queries from Step 3 + a product URL, runs them against
live Google (google.com or google.com.vn depending on language),
and reports whether the product appears in results.

Supports Vietnamese and English queries. Language is auto-detected
per query or can be specified via the "lang" field in input.

Usage:
    python scripts/live_search.py --queries queries.json --product-url https://yourproduct.com

Input (queries.json):
    [
        {"query": "phần mềm quản lý dự án", "lang": "vi", "persona_ids": [47832, 51200]},
        {"query": "project management tool", "lang": "en", "persona_ids": [1, 5]},
        {"query": "tổ chức công việc nhóm", "persona_ids": [3100]}
    ]

Output (search_results.json):
    [
        {
            "query": "phần mềm quản lý dự án",
            "lang": "vi",
            "persona_ids": [47832, 51200],
            "product_found": false,
            "product_rank": null,
            "run_status": "COMPLETED",
            "top_results": [
                {"rank": 1, "title": "...", "url": "https://..."}
            ]
        }
    ]

TinyFish API reference: .claude/commands/tinyfish.md
- Batch submit: POST /v1/automation/run-batch (1-100 runs, atomic)
- Batch poll:   POST /v1/runs/batch (1-100 IDs)
- Auth:         X-API-Key header from TINYFISH_API_KEY env var
- Browser:      stealth profile + proxy for Google searches
"""

import argparse
import json
import os
import re
import sys
import time
import unicodedata
from pathlib import Path
from urllib.parse import urlparse

import requests

# ---------------------------------------------------------------------------
# TinyFish API config (see .claude/commands/tinyfish.md)
# Base URL: https://agent.tinyfish.ai
# Auth: X-API-Key header
# Batch submit: POST /v1/automation/run-batch  (1-100 runs, atomic)
# Batch poll:   POST /v1/runs/batch            (1-100 IDs)
# ---------------------------------------------------------------------------
BASE_URL = "https://agent.tinyfish.ai"
API_KEY = os.environ.get("TINYFISH_API_KEY")

# Vietnamese diacritical character ranges for language detection
_VIET_PATTERN = re.compile(
    r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡ"
    r"ùúụủũưừứựửữỳýỵỷỹđ]",
    re.IGNORECASE,
)

# Google URLs per language
GOOGLE_URLS = {
    "vi": "https://www.google.com.vn",
    "en": "https://www.google.com",
}

# Proxy country per language — Vietnamese queries route through JP (closest
# supported proxy to Vietnam). English queries route through US.
# Supported proxy countries: US, GB, CA, DE, FR, JP, AU
PROXY_COUNTRY = {
    "vi": "JP",
    "en": "US",
}

# Goal prompts per language. Structured per TinyFish prompting best practices:
# Objective → Target → Fields → Schema → Guardrails
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
    """Detect if text is Vietnamese or English based on diacritical marks."""
    if _VIET_PATTERN.search(text):
        return "vi"
    return "en"


def deduplicate_queries(queries: list[dict]) -> list[dict]:
    """Merge entries with the same query text, combining persona_ids."""
    seen: dict[str, dict] = {}
    for entry in queries:
        q = entry["query"].strip().lower()
        lang = entry.get("lang") or detect_language(entry["query"])
        key = f"{lang}:{q}"
        if key in seen:
            seen[key]["persona_ids"].extend(entry.get("persona_ids", []))
        else:
            seen[key] = {
                "query": entry["query"].strip(),
                "lang": lang,
                "persona_ids": list(entry.get("persona_ids", [])),
            }
    return list(seen.values())


def build_tinyfish_run(query: str, lang: str) -> dict:
    """Build a single TinyFish run config for a search query.

    Per tinyfish.md:
    - url: target website (Google or Google VN)
    - goal: natural language task
    - browser_profile: "stealth" for anti-detection on Google
    - proxy_config: { enabled: true, country_code: "XX" }
    """
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
    """Submit queries via TinyFish POST /v1/automation/run-batch.

    Batch endpoint accepts 1-100 runs per request (atomic: all succeed or all fail).
    Returns list of run_ids in the same order as input queries.
    """
    runs = [build_tinyfish_run(e["query"], e["lang"]) for e in queries]

    all_run_ids = []
    for i in range(0, len(runs), 100):
        chunk = runs[i : i + 100]
        resp = requests.post(
            f"{BASE_URL}/v1/automation/run-batch",
            headers={
                "X-API-Key": API_KEY,
                "Content-Type": "application/json",
            },
            json={"runs": chunk},
        )
        resp.raise_for_status()
        data = resp.json()
        if data.get("error"):
            print(f"Batch submit error: {data['error']}", file=sys.stderr)
            sys.exit(1)
        all_run_ids.extend(data["run_ids"])

    return all_run_ids


def poll_runs(run_ids: list[str], poll_interval: int = 5, timeout: int = 300) -> list[dict]:
    """Poll via TinyFish POST /v1/runs/batch until all runs reach terminal state.

    Terminal states: COMPLETED, FAILED, CANCELLED.
    Non-terminal: PENDING, RUNNING.
    Batch endpoint accepts 1-100 IDs. Returns { data: [...], not_found: [...] }.
    """
    pending = set(run_ids)
    results: dict[str, dict] = {}
    start = time.time()

    while pending and (time.time() - start) < timeout:
        pending_list = list(pending)
        for i in range(0, len(pending_list), 100):
            chunk = pending_list[i : i + 100]
            resp = requests.post(
                f"{BASE_URL}/v1/runs/batch",
                headers={
                    "X-API-Key": API_KEY,
                    "Content-Type": "application/json",
                },
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
            remaining = len(pending)
            elapsed = int(time.time() - start)
            print(f"  {remaining} runs still pending... ({elapsed}s elapsed)")
            time.sleep(poll_interval)

    if pending:
        print(f"WARNING: {len(pending)} runs timed out after {timeout}s", file=sys.stderr)
        for rid in pending:
            results[rid] = {"run_id": rid, "status": "TIMEOUT", "result": None}

    return [results[rid] for rid in run_ids]


def parse_search_results(run_result: dict) -> list[dict]:
    """Extract the list of search results from a TinyFish run's result field."""
    result = run_result.get("result")
    if not result:
        return []

    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        for key in ("results", "data", "search_results", "organic_results"):
            if key in result and isinstance(result[key], list):
                return result[key]
        values = list(result.values())
        if len(values) == 1 and isinstance(values[0], list):
            return values[0]

    return []


def check_product_rank(search_results: list[dict], product_url: str) -> tuple[bool, int | None]:
    """Check if the product URL appears in search results. Returns (found, rank)."""
    product_domain = urlparse(product_url).netloc.lower().replace("www.", "")

    for item in search_results:
        url = item.get("url", "")
        result_domain = urlparse(url).netloc.lower().replace("www.", "")
        if product_domain in result_domain or result_domain in product_domain:
            return True, item.get("rank")
        if product_url.rstrip("/") in url:
            return True, item.get("rank")

    return False, None


def run_searches(queries_file: str, product_url: str, output_file: str, timeout: int = 300):
    """Main pipeline: dedupe → submit → poll → parse → output."""
    if not API_KEY:
        print("ERROR: Set TINYFISH_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    with open(queries_file) as f:
        raw_queries = json.load(f)
    print(f"Loaded {len(raw_queries)} queries")

    queries = deduplicate_queries(raw_queries)
    vi_count = sum(1 for q in queries if q["lang"] == "vi")
    en_count = len(queries) - vi_count
    print(f"After dedup: {len(queries)} unique queries ({vi_count} vi, {en_count} en)")

    print(f"Submitting {len(queries)} queries to TinyFish...")
    run_ids = submit_batch(queries)
    print(f"Submitted {len(run_ids)} runs")

    print("Polling for results...")
    runs = poll_runs(run_ids, timeout=timeout)

    results = []
    found_count = 0
    failed_count = 0
    for query_entry, run in zip(queries, runs):
        search_results = parse_search_results(run)
        product_found, product_rank = check_product_rank(search_results, product_url)
        status = run.get("status", "UNKNOWN")

        if product_found:
            found_count += 1
        if status in ("FAILED", "TIMEOUT", "CANCELLED"):
            failed_count += 1

        results.append({
            "query": query_entry["query"],
            "lang": query_entry["lang"],
            "persona_ids": query_entry["persona_ids"],
            "product_found": product_found,
            "product_rank": product_rank,
            "run_status": status,
            "top_results": search_results[:10],
        })

    # Summary
    total = len(results)
    successful = total - failed_count
    print(f"\n{'='*50}")
    print(f"Total queries:   {total} ({vi_count} vi, {en_count} en)")
    print(f"Successful:      {successful}")
    print(f"Failed/Timeout:  {failed_count}")
    print(f"Product found:   {found_count}/{successful}")
    if successful:
        print(f"Discoverability: {found_count / successful * 100:.1f}%")
    print(f"{'='*50}")

    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"Results saved to {output_file}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Step 4: Run search queries against live Google via TinyFish API"
    )
    parser.add_argument("--queries", required=True, help="Path to queries JSON file")
    parser.add_argument("--product-url", required=True, help="Product URL to check rankings for")
    parser.add_argument("--output", default="output/search_results.json", help="Output file path")
    parser.add_argument("--timeout", type=int, default=300, help="Max seconds to wait for results")
    args = parser.parse_args()

    run_searches(args.queries, args.product_url, args.output, args.timeout)
