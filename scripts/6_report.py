"""
Step 6 — Generate Final Report

Reads all outputs from the pipeline and produces a per-cluster
discoverability + conversion report.

Usage:
    python scripts/6_report.py --product product.json
"""

import argparse
import json
from collections import Counter
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Step 6: Generate report")
    parser.add_argument("--product", required=True, help="Path to product JSON")
    parser.add_argument("--personas", default="data/personas.json")
    parser.add_argument("--clusters", default="data/clusters.json")
    parser.add_argument("--search-results", default="output/search_results.json")
    parser.add_argument("--decisions", default="output/decisions.json")
    parser.add_argument("--chat-log", default="output/chat_log.json")
    parser.add_argument("--output", default="output/report.json")
    args = parser.parse_args()

    with open(args.product) as f:
        product = json.load(f)
    with open(args.personas) as f:
        personas = json.load(f)
    with open(args.clusters) as f:
        cluster_data = json.load(f)
    with open(args.search_results) as f:
        search_results = json.load(f)
    with open(args.decisions) as f:
        decisions = json.load(f)
    with open(args.chat_log) as f:
        chat_logs = json.load(f)

    persona_map = {p["id"]: p for p in personas}
    search_map = {r.get("persona_id"): r for r in search_results}

    product_name = product["name"].lower()
    clusters = cluster_data["clusters"]

    # Per-cluster analysis
    cluster_reports = []
    total_product = 0
    total_competitor = 0
    total_pass = 0
    total_flipped_to_product = 0
    total_flipped_away = 0

    for cluster in clusters:
        cid = str(cluster["cluster_id"])
        label = cluster["label"]
        member_ids = cluster["persona_ids"]

        # Visibility
        found_count = sum(1 for pid in member_ids if search_map.get(pid, {}).get("product_found"))
        visibility = found_count / len(member_ids) * 100 if member_ids else 0

        # Decisions
        cluster_decisions = decisions.get(cid, [])
        choices = Counter()
        before_after = []
        for d in cluster_decisions:
            choice = d.get("after", "pass")
            if product_name in choice:
                choices["product"] += 1
            elif choice == "pass":
                choices["pass"] += 1
            else:
                choices["competitor"] += 1

            before_after.append({
                "name": d.get("name"),
                "before": d.get("before"),
                "after": d.get("after"),
                "reason": d.get("reason"),
                "flipped": d.get("before") != _stance_category(d.get("after", ""), product_name),
            })

        product_pct = choices["product"] / len(member_ids) * 100 if member_ids else 0
        competitor_pct = choices["competitor"] / len(member_ids) * 100 if member_ids else 0
        pass_pct = choices["pass"] / len(member_ids) * 100 if member_ids else 0

        # Flips
        flipped_to = sum(
            1 for d in before_after
            if d["before"] != "interested" and product_name in d.get("after", "")
        )
        flipped_away = sum(
            1 for d in before_after
            if d["before"] == "interested" and product_name not in d.get("after", "")
        )

        total_product += choices["product"]
        total_competitor += choices["competitor"]
        total_pass += choices["pass"]
        total_flipped_to_product += flipped_to
        total_flipped_away += flipped_away

        # Competitor breakdown
        competitor_names = Counter()
        for d in cluster_decisions:
            choice = d.get("after", "pass")
            if product_name not in choice and choice != "pass":
                competitor_names[choice] += 1

        # Chat stats
        cluster_chat = chat_logs.get(cid, [])
        msg_count = len(cluster_chat)

        cluster_reports.append({
            "cluster_id": int(cid),
            "label": label,
            "size": len(member_ids),
            "visibility_pct": round(visibility, 1),
            "found_product": found_count,
            "conversion": {
                "product": choices["product"],
                "product_pct": round(product_pct, 1),
                "competitor": choices["competitor"],
                "competitor_pct": round(competitor_pct, 1),
                "pass": choices["pass"],
                "pass_pct": round(pass_pct, 1),
            },
            "flipped_to_product": flipped_to,
            "flipped_away": flipped_away,
            "top_competitors": [
                {"name": name, "count": count}
                for name, count in competitor_names.most_common(5)
            ],
            "chat_messages": msg_count,
            "decisions": before_after,
        })

    # Overall
    total_personas = len(personas)
    total_found = sum(1 for r in search_results if r.get("product_found"))

    report = {
        "product": product,
        "summary": {
            "total_personas": total_personas,
            "clusters": len(clusters),
            "visibility_pct": round(total_found / total_personas * 100, 1) if total_personas else 0,
            "overall_conversion": {
                "product": total_product,
                "product_pct": round(total_product / total_personas * 100, 1) if total_personas else 0,
                "competitor": total_competitor,
                "pass": total_pass,
            },
            "word_of_mouth_impact": {
                "flipped_to_product": total_flipped_to_product,
                "flipped_away": total_flipped_away,
                "net_gain": total_flipped_to_product - total_flipped_away,
            },
        },
        "clusters": cluster_reports,
    }

    # Print summary
    print(f"\n{'='*60}")
    print(f"TINYUSER REPORT: {product['name']}")
    print(f"{'='*60}")
    print(f"Personas: {total_personas} across {len(clusters)} clusters")
    print(f"Visibility: {report['summary']['visibility_pct']}% found product in search")
    print(f"\nConversion (after chat):")
    print(f"  {product['name']}: {total_product} ({report['summary']['overall_conversion']['product_pct']}%)")
    print(f"  Competitors: {total_competitor}")
    print(f"  Pass: {total_pass}")
    print(f"\nWord of mouth impact:")
    print(f"  Gained: {total_flipped_to_product} (didn't care → chose product)")
    print(f"  Lost: {total_flipped_away} (interested → chose competitor)")
    print(f"  Net: {total_flipped_to_product - total_flipped_away:+d}")

    print(f"\nPer cluster:")
    for c in cluster_reports:
        print(f"  {c['label']} ({c['size']} people)")
        print(f"    Visibility: {c['visibility_pct']}% | Conversion: {c['conversion']['product_pct']}%")
        if c["top_competitors"]:
            comps = ", ".join(f"{tc['name']}({tc['count']})" for tc in c["top_competitors"][:3])
            print(f"    Top competitors: {comps}")
    print(f"{'='*60}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to {args.output}")


def _stance_category(choice: str, product_name: str) -> str:
    if product_name in choice:
        return "interested"
    elif choice == "pass":
        return "neutral"
    else:
        return "competitor"


if __name__ == "__main__":
    main()
