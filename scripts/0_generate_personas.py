"""
Step 0 — Sample Anchor Demographics from Census Data

Samples (age, gender, province, region) from real Vietnamese census distributions
defined in persona_specification.json. These anchors are the input for Step 1
where Qwen generates full personas.

Uses the 2025 post-merger 34-province structure with real GSO population weights.

Usage:
    python scripts/0_generate_personas.py --count 100 --output data/anchors.json
    python scripts/0_generate_personas.py --count 100000 --output data/anchors.json --seed 42
"""

import argparse
import json
from pathlib import Path

import numpy as np


def load_spec(path: str = "persona_specification.json") -> dict:
    with open(path) as f:
        return json.load(f)


def sample_anchors(rng: np.random.Generator, count: int, spec: dict) -> list[dict]:
    """Sample (age, gender, province, region) from census distributions."""
    dist = spec["anchor_distributions"]

    # Age
    age_raw = dist["age_bracket"]
    age_opts = [k for k in age_raw if k != "source"]
    age_wts = np.array([age_raw[k] for k in age_opts], dtype=np.float64)
    age_wts /= age_wts.sum()
    ages = rng.choice(age_opts, size=count, p=age_wts)

    # Gender
    gender_raw = dist["gender"]
    gender_opts = [k for k in gender_raw if k != "source"]
    gender_wts = np.array([gender_raw[k] for k in gender_opts], dtype=np.float64)
    gender_wts /= gender_wts.sum()
    genders = rng.choice(gender_opts, size=count, p=gender_wts)

    # Province (new structure: each value is {pop, weight, region, type})
    prov_dist = dist["province"]["distribution"]
    prov_opts = list(prov_dist.keys())
    prov_wts = np.array([prov_dist[k]["weight"] for k in prov_opts], dtype=np.float64)
    prov_wts /= prov_wts.sum()
    provinces = rng.choice(prov_opts, size=count, p=prov_wts)

    # Build region lookup
    region_map = {k: v["region"] for k, v in prov_dist.items()}

    return [
        {
            "id": i,
            "age": ages[i],
            "gender": genders[i],
            "province": provinces[i],
            "region": region_map[provinces[i]],
        }
        for i in range(count)
    ]


def validate(anchors: list[dict], spec: dict):
    """Print distribution stats vs spec targets."""
    n = len(anchors)
    dist = spec["anchor_distributions"]
    print(f"\n{'='*55}")
    print(f"Distribution validation ({n} anchors)")
    print(f"{'='*55}")

    # Age
    age_raw = dist["age_bracket"]
    print("\nage_bracket:")
    counts = {}
    for a in anchors:
        counts[a["age"]] = counts.get(a["age"], 0) + 1
    for k in [k for k in age_raw if k != "source"]:
        exp = age_raw[k]
        actual = counts.get(k, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {k:20s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")

    # Gender
    gender_raw = dist["gender"]
    print("\ngender:")
    counts = {}
    for a in anchors:
        counts[a["gender"]] = counts.get(a["gender"], 0) + 1
    for k in [k for k in gender_raw if k != "source"]:
        exp = gender_raw[k]
        actual = counts.get(k, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {k:20s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")

    # Province: top 10 by weight
    prov_dist = dist["province"]["distribution"]
    print("\nprovince (top 10 by population):")
    counts = {}
    for a in anchors:
        counts[a["province"]] = counts.get(a["province"], 0) + 1
    top = sorted(prov_dist.items(), key=lambda x: x[1]["weight"], reverse=True)[:10]
    for name, info in top:
        exp = info["weight"]
        actual = counts.get(name, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {name:25s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")

    # Region summary
    print("\nby region:")
    region_expected = {}
    for name, info in prov_dist.items():
        r = info["region"]
        region_expected[r] = region_expected.get(r, 0) + info["weight"]
    region_actual = {}
    for a in anchors:
        r = a["region"]
        region_actual[r] = region_actual.get(r, 0) + 1
    for r in sorted(region_expected, key=region_expected.get, reverse=True):
        exp = region_expected[r]
        actual = region_actual.get(r, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {r:25s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")


def main():
    parser = argparse.ArgumentParser(description="Step 0: Sample anchor demographics from census data")
    parser.add_argument("--count", type=int, default=100, help="Number of personas to sample")
    parser.add_argument("--output", default="data/anchors.json", help="Output file path")
    parser.add_argument("--spec", default="persona_specification.json", help="Path to persona spec")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    args = parser.parse_args()

    spec = load_spec(args.spec)
    rng = np.random.default_rng(args.seed)

    print(f"Sampling {args.count} anchors (seed={args.seed})...")
    anchors = sample_anchors(rng, args.count, spec)
    print(f"Sampled {len(anchors)} anchors")

    validate(anchors, spec)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(anchors, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to {args.output}")


if __name__ == "__main__":
    main()
