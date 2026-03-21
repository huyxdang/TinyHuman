"""
Step 6 — Generate Discoverability Report

Takes matched personas (Step 3), queries (Step 4), and search results (Step 5)
to produce a human-readable discoverability report with:
- Segment summary with human-readable labels
- Discoverability score per segment
- Overall discoverability score
- Gap analysis: high-match segments where product is invisible
- Competitor table

Usage:
    python scripts/6_report.py \
        --matched data/matched_personas.json \
        --queries data/queries.json \
        --search-results output/search_results.json \
        --output output/report.json
"""

import argparse
import json
from collections import Counter, defaultdict
from pathlib import Path


def cluster_personas_into_segments(personas: list[dict], queries: list[dict], search_results: list[dict]) -> list[dict]:
    """Group qualifying personas into human-readable segments based on demographics.

    Uses (industry, province, age) as the grouping key, then labels each segment
    with a readable name like "Hotel managers in Da Nang (25-44)".
    """
    # Build lookup: persona_id -> search result
    query_by_persona = {}
    for q in queries:
        for pid in q.get("persona_ids", []):
            query_by_persona[pid] = q["query"]

    result_by_query = {}
    for r in search_results:
        result_by_query[r["query"]] = r

    # Group personas by (industry, region, age)
    groups = defaultdict(list)
    for p in personas:
        key = (
            p.get("industry", "Unknown"),
            p.get("region", "Unknown"),
            p.get("age", "Unknown"),
        )
        groups[key].append(p)

    # Merge small groups (< 3 personas) into broader buckets by (industry, region)
    broad_groups = defaultdict(list)
    for (industry, region, age), members in groups.items():
        if len(members) < 3:
            broad_key = (industry, region, "mixed ages")
        else:
            broad_key = (industry, region, age)
        broad_groups[broad_key].extend(members)

    # Build segments
    segments = []
    for (industry, region, age), members in sorted(broad_groups.items(), key=lambda x: -len(x[1])):
        # Collect provinces
        provinces = Counter(p.get("province", "") for p in members)
        top_provinces = [prov for prov, _ in provinces.most_common(3)]
        province_str = ", ".join(top_provinces)

        # Segment name
        if age == "mixed ages":
            name = f"{industry} in {province_str}"
        else:
            name = f"{industry} in {province_str} ({age})"

        # Collect queries and search results for this segment
        segment_queries = []
        found_count = 0
        total_searched = 0
        all_competitors = Counter()

        for p in members:
            pid = p["id"]
            query = query_by_persona.get(pid)
            if not query:
                continue

            segment_queries.append(query)
            result = result_by_query.get(query)
            if result and result.get("run_status") == "COMPLETED":
                total_searched += 1
                if result.get("product_found"):
                    found_count += 1
                else:
                    # Track competitors
                    for r in result.get("top_results", [])[:5]:
                        domain = r.get("url", "").split("/")[2] if "://" in r.get("url", "") else ""
                        domain = domain.replace("www.", "")
                        if domain:
                            all_competitors[domain] += 1

        # Most common query
        query_counter = Counter(segment_queries)
        top_query = query_counter.most_common(1)[0][0] if query_counter else None

        # Top competitors
        top_competitors = [domain for domain, _ in all_competitors.most_common(3)]

        # Discoverability score
        discoverability = (found_count / total_searched * 100) if total_searched > 0 else None

        # Average match score
        avg_score = sum(p.get("match_score", 0) for p in members) / len(members)

        segments.append({
            "name": name,
            "size": len(members),
            "avg_match_score": round(avg_score, 3),
            "top_query": top_query,
            "unique_queries": len(set(segment_queries)),
            "queries_searched": total_searched,
            "product_found_count": found_count,
            "discoverability_pct": round(discoverability, 1) if discoverability is not None else None,
            "top_competitors": top_competitors,
            "top_jobs": [job for job, _ in Counter(p.get("job_title", "") for p in members).most_common(3)],
        })

    segments.sort(key=lambda s: s["size"], reverse=True)
    return segments


def compute_overall_score(search_results: list[dict]) -> dict:
    """Compute overall discoverability metrics."""
    total = 0
    found = 0
    failed = 0
    for r in search_results:
        if r.get("run_status") == "COMPLETED":
            total += 1
            if r.get("product_found"):
                found += 1
        else:
            failed += 1

    return {
        "total_queries_searched": total,
        "product_found": found,
        "product_not_found": total - found,
        "failed_searches": failed,
        "discoverability_pct": round(found / total * 100, 1) if total > 0 else 0,
    }


def find_gaps(segments: list[dict]) -> list[dict]:
    """Identify high-match segments where the product is invisible."""
    gaps = []
    for s in segments:
        if (s["discoverability_pct"] is not None
            and s["discoverability_pct"] < 10
            and s["avg_match_score"] > 0.6
            and s["size"] >= 3):
            gaps.append({
                "segment": s["name"],
                "size": s["size"],
                "avg_match_score": s["avg_match_score"],
                "discoverability_pct": s["discoverability_pct"],
                "top_query": s["top_query"],
                "competitors_instead": s["top_competitors"],
            })
    gaps.sort(key=lambda g: g["avg_match_score"], reverse=True)
    return gaps


def build_competitor_table(search_results: list[dict]) -> list[dict]:
    """Build a ranked table of competitors who show up where the product doesn't."""
    competitor_counts = Counter()
    for r in search_results:
        if r.get("run_status") != "COMPLETED" or r.get("product_found"):
            continue
        for item in r.get("top_results", [])[:5]:
            url = item.get("url", "")
            if "://" in url:
                domain = url.split("/")[2].replace("www.", "")
                competitor_counts[domain] += 1

    return [
        {"domain": domain, "appears_in_queries": count}
        for domain, count in competitor_counts.most_common(20)
    ]


def main():
    parser = argparse.ArgumentParser(description="Step 6: Generate discoverability report")
    parser.add_argument("--matched", default="data/matched_personas.json", help="Matched personas from Step 3")
    parser.add_argument("--queries", default="data/queries.json", help="Queries from Step 4")
    parser.add_argument("--search-results", default="output/search_results.json", help="Search results from Step 5")
    parser.add_argument("--output", default="output/report.json", help="Output report file")
    args = parser.parse_args()

    with open(args.matched) as f:
        matched_data = json.load(f)
    with open(args.queries) as f:
        queries = json.load(f)
    with open(args.search_results) as f:
        search_results = json.load(f)

    product = matched_data["product"]
    personas = matched_data["qualifying_personas"]
    print(f"Product: {product}")
    print(f"Qualifying personas: {len(personas)}")
    print(f"Queries: {len(queries)}")
    print(f"Search results: {len(search_results)}")

    # Build report
    print("\nBuilding segments...")
    segments = cluster_personas_into_segments(personas, queries, search_results)

    print("Computing overall score...")
    overall = compute_overall_score(search_results)

    print("Finding gaps...")
    gaps = find_gaps(segments)

    print("Building competitor table...")
    competitors = build_competitor_table(search_results)

    report = {
        "product": product,
        "summary": {
            **matched_data["summary"],
            **overall,
        },
        "segments": segments,
        "gaps": gaps,
        "competitors": competitors,
        "problems_generated": matched_data["problems"],
    }

    # Print summary
    print(f"\n{'='*60}")
    print(f"DISCOVERABILITY REPORT: {product[:50]}")
    print(f"{'='*60}")
    print(f"Overall discoverability: {overall['discoverability_pct']}%")
    print(f"  ({overall['product_found']}/{overall['total_queries_searched']} queries)")
    print(f"\nSegments ({len(segments)}):")
    for s in segments[:10]:
        disc = f"{s['discoverability_pct']}%" if s['discoverability_pct'] is not None else "N/A"
        print(f"  {s['name']}")
        print(f"    Size: {s['size']} | Discoverability: {disc} | Query: \"{s['top_query']}\"")

    if gaps:
        print(f"\nGaps ({len(gaps)} segments where you're invisible):")
        for g in gaps[:5]:
            print(f"  {g['segment']}")
            print(f"    {g['size']} personas, match={g['avg_match_score']}, disc={g['discoverability_pct']}%")
            print(f"    They search: \"{g['top_query']}\"")
            print(f"    They find instead: {', '.join(g['competitors_instead'][:3])}")

    if competitors:
        print(f"\nTop competitors:")
        for c in competitors[:10]:
            print(f"  {c['domain']:40s}  appears in {c['appears_in_queries']} queries")

    print(f"{'='*60}")

    # Save
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(f"\nFull report saved to {args.output}")


if __name__ == "__main__":
    main()
