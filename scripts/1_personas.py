"""
Step 1 — Generate 50 Representative Personas

Samples anchors (age, gender, province) from Vietnamese census distributions,
then calls Qwen on Modal to generate full personas in a single batch.

Usage:
    python scripts/1_personas.py --product product.json
    python scripts/1_personas.py --product product.json --count 50 --seed 42
"""

import argparse
import json
import re
import time
from pathlib import Path

import modal
import numpy as np


SYSTEM_PROMPT = (
    "You are generating realistic Vietnamese personas for market research. "
    "Each persona must be a coherent, believable person. All fields must be "
    "consistent with each other and with the anchor demographics provided. "
    "Output valid JSON only, no explanation."
)

USER_TEMPLATE = """Generate a realistic Vietnamese persona.

Anchors:
- Age: {age}
- Gender: {gender}
- Province: {province} ({region})

Fill in the following JSON. Every field must be realistic for this specific person's age, gender, and province. Frustrations must be specific to their daily life — not generic.

{{
  "name": "",
  "job_title": "",
  "industry": "",
  "company_size": "",
  "education_level": "",
  "income_bracket": "",
  "primary_platform": "",
  "search_language": "",
  "top_3_frustrations": ["", "", ""]
}}"""

EXPECTED_FIELDS = {
    "name", "job_title", "industry", "company_size", "education_level",
    "income_bracket", "primary_platform", "search_language", "top_3_frustrations",
}


def load_spec(path: str = "persona_specification.json") -> dict:
    with open(path) as f:
        return json.load(f)


def sample_anchors(rng: np.random.Generator, count: int, spec: dict) -> list[dict]:
    dist = spec["anchor_distributions"]

    age_raw = dist["age_bracket"]
    age_opts = [k for k in age_raw if k != "source"]
    age_wts = np.array([age_raw[k] for k in age_opts], dtype=np.float64)
    age_wts /= age_wts.sum()
    ages = rng.choice(age_opts, size=count, p=age_wts)

    gender_raw = dist["gender"]
    gender_opts = [k for k in gender_raw if k != "source"]
    gender_wts = np.array([gender_raw[k] for k in gender_opts], dtype=np.float64)
    gender_wts /= gender_wts.sum()
    genders = rng.choice(gender_opts, size=count, p=gender_wts)

    prov_dist = dist["province"]["distribution"]
    prov_opts = list(prov_dist.keys())
    prov_wts = np.array([prov_dist[k]["weight"] for k in prov_opts], dtype=np.float64)
    prov_wts /= prov_wts.sum()
    provinces = rng.choice(prov_opts, size=count, p=prov_wts)

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


def extract_json(text: str) -> dict | None:
    fence_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fence_match:
        try:
            return json.loads(fence_match.group(1))
        except json.JSONDecodeError:
            pass
    brace_match = re.search(r"\{.*\}", text, re.DOTALL)
    if brace_match:
        try:
            return json.loads(brace_match.group(0))
        except json.JSONDecodeError:
            pass
    return None


def validate_persona(generated: dict) -> bool:
    if not isinstance(generated, dict):
        return False
    for field in EXPECTED_FIELDS:
        if field not in generated:
            return False
        val = generated[field]
        if val is None or val == "":
            return False
        if field == "top_3_frustrations":
            if not isinstance(val, list) or len(val) < 3:
                return False
            if any(not f or not isinstance(f, str) for f in val):
                return False
    return True


def merge_anchor_and_generated(anchor: dict, generated: dict) -> dict:
    return {
        "id": anchor["id"],
        "age": anchor["age"],
        "gender": anchor["gender"],
        "province": anchor["province"],
        "region": anchor["region"],
        "name": generated["name"],
        "job_title": generated["job_title"],
        "industry": generated["industry"],
        "company_size": generated["company_size"],
        "education_level": generated["education_level"],
        "income_bracket": generated["income_bracket"],
        "primary_platform": generated["primary_platform"],
        "search_language": generated["search_language"],
        "top_3_frustrations": generated["top_3_frustrations"][:3],
    }


def main():
    parser = argparse.ArgumentParser(description="Step 1: Generate representative personas")
    parser.add_argument("--product", required=True, help="Path to product JSON")
    parser.add_argument("--count", type=int, default=200, help="Number of personas")
    parser.add_argument("--output", default="data/personas.json", help="Output file")
    parser.add_argument("--spec", default="persona_specification.json", help="Census spec")
    parser.add_argument("--seed", type=int, default=42, help="Random seed")
    args = parser.parse_args()

    with open(args.product) as f:
        product = json.load(f)
    print(f"Product: {product['name']}")

    spec = load_spec(args.spec)
    rng = np.random.default_rng(args.seed)

    print(f"Sampling {args.count} anchors (seed={args.seed})...")
    anchors = sample_anchors(rng, args.count, spec)
    print(f"Sampled {len(anchors)} anchors")

    # Generate full personas via Modal Qwen
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    all_personas = []
    remaining = list(anchors)

    for attempt in range(3):
        if not remaining:
            break

        label = "Generating" if attempt == 0 else f"Retry {attempt}"
        print(f"\n{label}: {len(remaining)} personas via Qwen...")
        start = time.time()

        conversations = []
        for a in remaining:
            user_msg = USER_TEMPLATE.format(
                age=a["age"], gender=a["gender"],
                province=a["province"], region=a["region"],
            )
            conversations.append([
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_msg},
            ])

        outputs = model.generate.remote(conversations, temperature=0.7, max_tokens=512)

        successes = []
        failures = []
        for anchor, text in zip(remaining, outputs):
            generated = extract_json(text)
            if generated and validate_persona(generated):
                successes.append(merge_anchor_and_generated(anchor, generated))
            else:
                failures.append(anchor)

        all_personas.extend(successes)
        remaining = failures
        elapsed = time.time() - start
        print(f"  {len(successes)}/{len(successes) + len(failures)} ok ({elapsed:.1f}s)")

    all_personas.sort(key=lambda p: p["id"])

    print(f"\n{'='*50}")
    print(f"Generated {len(all_personas)}/{len(anchors)} personas")
    print(f"{'='*50}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(all_personas, f, indent=2, ensure_ascii=False)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
