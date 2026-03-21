"""
Step 5 — Generate Analysis Report

Reads chat decisions, personas, clusters, and knowledge base.
Produces a detailed per-cluster analysis of vote breakdown,
individual reasoning, and competitor landscape.

Usage:
    python scripts/5_report.py --product product.json
"""

import argparse
import json
from collections import Counter
from pathlib import Path


def analyze_cluster(cluster: dict, decisions: list[dict], chat_log: list[dict],
                    persona_map: dict, product_name: str) -> dict:
    """Analyze a single cluster's votes, reasons, and demographics."""
    label = cluster["label"]
    member_ids = cluster["persona_ids"]
    size = len(member_ids)

    # Vote breakdown by exact choice
    vote_counts = Counter()
    product_voters = []
    competitor_voters = []
    pass_voters = []

    product_lower = product_name.lower()

    for d in decisions:
        pid = d.get("persona_id")
        persona = persona_map.get(pid, {})
        choice = d.get("after", "pass")
        reason = d.get("reason", "")

        voter = {
            "name": d.get("name", "Unknown"),
            "persona_id": pid,
            "choice": choice,
            "reason": reason,
            "age": persona.get("age"),
            "job_title": persona.get("job_title"),
            "industry": persona.get("industry"),
            "province": persona.get("province"),
            "income_bracket": persona.get("income_bracket"),
            "frustrations": persona.get("top_3_frustrations", []),
        }

        if product_lower in choice.lower():
            vote_counts["product"] += 1
            product_voters.append(voter)
        elif choice.lower() == "pass":
            vote_counts["pass"] += 1
            pass_voters.append(voter)
        else:
            vote_counts[choice] += 1
            competitor_voters.append(voter)

    # Competitor breakdown
    competitor_breakdown = Counter()
    for v in competitor_voters:
        competitor_breakdown[v["choice"]] += 1

    # Demographic patterns per vote group
    def demographic_summary(voters: list[dict]) -> dict:
        if not voters:
            return {}
        jobs = Counter(v["job_title"] for v in voters if v["job_title"])
        industries = Counter(v["industry"] for v in voters if v["industry"])
        provinces = Counter(v["province"] for v in voters if v["province"])
        ages = Counter(v["age"] for v in voters if v["age"])
        incomes = Counter(v["income_bracket"] for v in voters if v["income_bracket"])
        return {
            "count": len(voters),
            "top_jobs": [{"job": j, "count": c} for j, c in jobs.most_common(5)],
            "top_industries": [{"industry": i, "count": c} for i, c in industries.most_common(5)],
            "top_provinces": [{"province": p, "count": c} for p, c in provinces.most_common(5)],
            "age_distribution": dict(ages.most_common()),
            "income_distribution": dict(incomes.most_common()),
        }

    # Collect all reasons grouped by choice
    product_reasons = [v["reason"] for v in product_voters if v["reason"]]
    competitor_reasons = [
        {"choice": v["choice"], "reason": v["reason"], "name": v["name"], "job_title": v["job_title"]}
        for v in competitor_voters if v["reason"]
    ]
    pass_reasons = [v["reason"] for v in pass_voters if v["reason"]]

    total_votes = vote_counts["product"] + len(competitor_voters) + vote_counts["pass"]

    return {
        "cluster_id": cluster["cluster_id"],
        "label": label,
        "size": size,
        "total_votes": total_votes,
        "vote_summary": {
            "product": {
                "name": product_name,
                "count": vote_counts["product"],
                "pct": round(vote_counts["product"] / total_votes * 100, 1) if total_votes else 0,
            },
            "competitors": {
                "total": len(competitor_voters),
                "total_pct": round(len(competitor_voters) / total_votes * 100, 1) if total_votes else 0,
                "breakdown": [
                    {"name": name, "count": count, "pct": round(count / total_votes * 100, 1)}
                    for name, count in competitor_breakdown.most_common()
                ],
            },
            "pass": {
                "count": vote_counts["pass"],
                "pct": round(vote_counts["pass"] / total_votes * 100, 1) if total_votes else 0,
            },
        },
        "demographics": {
            "chose_product": demographic_summary(product_voters),
            "chose_competitor": demographic_summary(competitor_voters),
            "chose_pass": demographic_summary(pass_voters),
        },
        "reasoning": {
            "product_reasons": product_reasons,
            "competitor_reasons": competitor_reasons,
            "pass_reasons": pass_reasons,
        },
        "individual_decisions": [
            {
                "name": v["name"],
                "choice": v["choice"],
                "reason": v["reason"],
                "job_title": v["job_title"],
                "province": v["province"],
                "age": v["age"],
            }
            for v in product_voters + competitor_voters + pass_voters
        ],
        "chat_messages": len(chat_log),
    }


def build_report(product: dict, clusters: list[dict], personas: list[dict],
                 decisions: dict, chat_logs: dict, knowledge: dict) -> dict:
    """Build the full report across all clusters."""
    persona_map = {p["id"]: p for p in personas}
    product_name = product["name"]
    competitor_names = knowledge.get("competitor_names", [])

    cluster_reports = []
    total_product = 0
    total_competitor = 0
    total_pass = 0

    for cluster in clusters:
        cid = str(cluster["cluster_id"])
        cluster_decisions = decisions.get(cid, [])
        cluster_chat = chat_logs.get(cid, [])

        report = analyze_cluster(cluster, cluster_decisions, cluster_chat,
                                 persona_map, product_name)
        cluster_reports.append(report)

        total_product += report["vote_summary"]["product"]["count"]
        total_competitor += report["vote_summary"]["competitors"]["total"]
        total_pass += report["vote_summary"]["pass"]["count"]

    total_votes = total_product + total_competitor + total_pass

    # Overall competitor breakdown
    overall_competitor_breakdown = Counter()
    for cr in cluster_reports:
        for comp in cr["vote_summary"]["competitors"]["breakdown"]:
            overall_competitor_breakdown[comp["name"]] += comp["count"]

    # Competitor analysis from knowledge base
    competitor_profiles = {}
    for comp_name in competitor_names:
        comp_data = knowledge.get("competitors", {}).get(comp_name, {})
        votes = overall_competitor_breakdown.get(comp_name.lower(), 0)
        # Check case-insensitive
        for k, v in overall_competitor_breakdown.items():
            if comp_name.lower() in k.lower():
                votes = max(votes, v)
        competitor_profiles[comp_name] = {
            "total_votes": votes,
            "vote_pct": round(votes / total_votes * 100, 1) if total_votes else 0,
            "research": comp_data,
        }

    return {
        "product": product,
        "summary": {
            "total_personas": len(personas),
            "total_votes": total_votes,
            "clusters": len(clusters),
            "overall_votes": {
                "product": {
                    "name": product_name,
                    "count": total_product,
                    "pct": round(total_product / total_votes * 100, 1) if total_votes else 0,
                },
                "competitors": {
                    "total": total_competitor,
                    "total_pct": round(total_competitor / total_votes * 100, 1) if total_votes else 0,
                    "breakdown": [
                        {"name": name, "count": count, "pct": round(count / total_votes * 100, 1)}
                        for name, count in overall_competitor_breakdown.most_common()
                    ],
                },
                "pass": {
                    "count": total_pass,
                    "pct": round(total_pass / total_votes * 100, 1) if total_votes else 0,
                },
            },
        },
        "competitor_analysis": competitor_profiles,
        "clusters": cluster_reports,
    }


def print_report(report: dict):
    """Print a human-readable report to stdout."""
    product_name = report["product"]["name"]
    s = report["summary"]

    print(f"\n{'='*60}")
    print(f"  TINYUSER REPORT: {product_name}")
    print(f"{'='*60}")
    print(f"\n  {s['total_personas']} personas across {s['clusters']} clusters")
    print(f"  {s['total_votes']} total votes\n")

    # Overall vote breakdown
    ov = s["overall_votes"]
    print(f"  OVERALL VOTES:")
    print(f"    {product_name}: {ov['product']['count']} ({ov['product']['pct']}%)")
    for comp in ov["competitors"]["breakdown"]:
        print(f"    {comp['name']}: {comp['count']} ({comp['pct']}%)")
    print(f"    Pass: {ov['pass']['count']} ({ov['pass']['pct']}%)")

    # Competitor analysis
    print(f"\n{'─'*60}")
    print(f"  COMPETITOR ANALYSIS")
    print(f"{'─'*60}")
    for comp_name, comp in report["competitor_analysis"].items():
        print(f"\n  {comp_name}: {comp['total_votes']} votes ({comp['vote_pct']}%)")
        research = comp.get("research", {})
        if research and isinstance(research, dict):
            raw = research.get("raw_text", "")
            if raw:
                # Print first 200 chars of research
                preview = raw[:200].replace("\n", " ")
                print(f"    Research: {preview}...")

    # Per-cluster breakdown
    for cr in report["clusters"]:
        print(f"\n{'─'*60}")
        print(f"  CLUSTER: {cr['label']} ({cr['size']} personas, {cr['chat_messages']} messages)")
        print(f"{'─'*60}")

        vs = cr["vote_summary"]
        print(f"    {product_name}: {vs['product']['count']} ({vs['product']['pct']}%)")
        for comp in vs["competitors"]["breakdown"]:
            print(f"    {comp['name']}: {comp['count']} ({comp['pct']}%)")
        print(f"    Pass: {vs['pass']['count']} ({vs['pass']['pct']}%)")

        # Demographics of product voters
        demo = cr["demographics"].get("chose_product", {})
        if demo and demo.get("top_jobs"):
            jobs = ", ".join(f"{j['job']}({j['count']})" for j in demo["top_jobs"][:3])
            print(f"\n    Who chose {product_name}:")
            print(f"      Top jobs: {jobs}")

        demo = cr["demographics"].get("chose_competitor", {})
        if demo and demo.get("top_jobs"):
            jobs = ", ".join(f"{j['job']}({j['count']})" for j in demo["top_jobs"][:3])
            print(f"\n    Who chose competitors:")
            print(f"      Top jobs: {jobs}")

        # Sample reasons
        reasons = cr["reasoning"]
        if reasons["product_reasons"]:
            print(f"\n    Why they chose {product_name}:")
            for r in reasons["product_reasons"][:3]:
                print(f"      - \"{r}\"")

        if reasons["competitor_reasons"]:
            print(f"\n    Why they chose competitors:")
            for r in reasons["competitor_reasons"][:3]:
                print(f"      - {r['name']} ({r['job_title']}): \"{r['reason']}\" → {r['choice']}")

    print(f"\n{'='*60}\n")


def main():
    parser = argparse.ArgumentParser(description="Step 5: Generate analysis report")
    parser.add_argument("--product", required=True, help="Path to product JSON")
    parser.add_argument("--personas", default="data/personas.json")
    parser.add_argument("--clusters", default="data/clusters.json")
    parser.add_argument("--decisions", default="output/decisions.json")
    parser.add_argument("--chat-log", default="output/chat_log.json")
    parser.add_argument("--knowledge", default="output/knowledge.json")
    parser.add_argument("--output", default="output/report.json")
    args = parser.parse_args()

    with open(args.product) as f:
        product = json.load(f)
    with open(args.personas) as f:
        personas = json.load(f)
    with open(args.clusters) as f:
        cluster_data = json.load(f)
    with open(args.decisions) as f:
        decisions = json.load(f)
    with open(args.chat_log) as f:
        chat_logs = json.load(f)
    with open(args.knowledge) as f:
        knowledge = json.load(f)

    clusters = cluster_data["clusters"]

    report = build_report(product, clusters, personas, decisions, chat_logs, knowledge)

    # Save JSON
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    # Print to terminal
    print_report(report)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
