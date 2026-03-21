"""
Step 0 — Sample Anchor Demographics from Census Data

Samples (age, gender, city) triplets from real Vietnamese census distributions
defined in persona_specification.json. These anchors are the input for Step 1
where Qwen generates full personas.

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
    """Sample (age, gender, city) triplets from census distributions."""
    dist = spec["anchor_distributions"]

    # Age
    age_brackets = {k: v for k, v in dist["age_bracket"].items() if k not in ("source",)}
    age_opts = list(age_brackets.keys())
    age_wts = np.array(list(age_brackets.values()), dtype=np.float64)
    age_wts /= age_wts.sum()
    ages = rng.choice(age_opts, size=count, p=age_wts)

    # Gender
    gender_map = {k: v for k, v in dist["gender"].items() if k != "source"}
    gender_opts = list(gender_map.keys())
    gender_wts = np.array(list(gender_map.values()), dtype=np.float64)
    gender_wts /= gender_wts.sum()
    genders = rng.choice(gender_opts, size=count, p=gender_wts)

    # City
    city_dist = dist["city"]["distribution"]
    city_opts = list(city_dist.keys())
    city_wts = np.array(list(city_dist.values()), dtype=np.float64)
    city_wts /= city_wts.sum()
    cities = rng.choice(city_opts, size=count, p=city_wts)

    return [
        {"id": i, "age": ages[i], "gender": genders[i], "city": cities[i]}
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
    age_expected = {k: v for k, v in dist["age_bracket"].items() if k != "source"}
    print("\nage_bracket:")
    age_counts = {}
    for a in anchors:
        age_counts[a["age"]] = age_counts.get(a["age"], 0) + 1
    for key, exp in age_expected.items():
        actual = age_counts.get(key, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {key:20s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")

    # Gender
    gender_expected = {k: v for k, v in dist["gender"].items() if k != "source"}
    print("\ngender:")
    gender_counts = {}
    for a in anchors:
        gender_counts[a["gender"]] = gender_counts.get(a["gender"], 0) + 1
    for key, exp in gender_expected.items():
        actual = gender_counts.get(key, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {key:20s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")

    # City (top 5 + rural_other)
    city_expected = dist["city"]["distribution"]
    print("\ncity (top 5 + rural_other):")
    city_counts = {}
    for a in anchors:
        city_counts[a["city"]] = city_counts.get(a["city"], 0) + 1
    top_cities = sorted(city_expected.items(), key=lambda x: x[1], reverse=True)[:6]
    for key, exp in top_cities:
        actual = city_counts.get(key, 0) / n
        diff = abs(actual - exp)
        flag = " ⚠" if diff > 0.03 else ""
        print(f"  {key:25s}  exp={exp:.3f}  actual={actual:.3f}  diff={diff:.3f}{flag}")


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
