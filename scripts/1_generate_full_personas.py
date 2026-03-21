"""
Step 1 — Generate Full Personas from Anchors using Qwen on Modal

Takes anchors from Step 0 and generates complete personas by calling
Qwen2.5-3B-Instruct on Modal (via vLLM on A10G GPU). Each anchor
(age, gender, province, region) gets expanded into a full persona.

Sends batches of 500 to Modal for GPU-parallel inference.

Usage:
    python scripts/1_generate_full_personas.py --anchors data/anchors.json --output data/personas.json
    python scripts/1_generate_full_personas.py --anchors data/anchors.json --batch-size 500

Requirements:
    pip install modal
    modal deploy modal_app/qwen.py   (first time only)
"""

import argparse
import json
import re
import time
from pathlib import Path

import modal

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
    "job_title", "industry", "company_size", "education_level",
    "income_bracket", "primary_platform", "search_language", "top_3_frustrations",
}


def build_conversations(anchors: list[dict]) -> list[list[dict]]:
    """Build chat conversations for each anchor."""
    convos = []
    for a in anchors:
        user_msg = USER_TEMPLATE.format(
            age=a["age"],
            gender=a["gender"],
            province=a["province"],
            region=a["region"],
        )
        convos.append([
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ])
    return convos


def extract_json(text: str) -> dict | None:
    """Extract JSON object from model output, handling markdown fences and preamble."""
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
    """Check that all expected fields are present and non-empty."""
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
    """Combine anchor demographics with LLM-generated fields."""
    return {
        "id": anchor["id"],
        "age": anchor["age"],
        "gender": anchor["gender"],
        "province": anchor["province"],
        "region": anchor["region"],
        "job_title": generated["job_title"],
        "industry": generated["industry"],
        "company_size": generated["company_size"],
        "education_level": generated["education_level"],
        "income_bracket": generated["income_bracket"],
        "primary_platform": generated["primary_platform"],
        "search_language": generated["search_language"],
        "top_3_frustrations": generated["top_3_frustrations"][:3],
    }


def process_outputs(anchors: list[dict], outputs: list[str]) -> tuple[list[dict], list[dict]]:
    """Parse model outputs, return (successes, failed_anchors)."""
    successes = []
    failures = []
    for anchor, text in zip(anchors, outputs):
        generated = extract_json(text)
        if generated and validate_persona(generated):
            successes.append(merge_anchor_and_generated(anchor, generated))
        else:
            failures.append(anchor)
    return successes, failures


def main():
    parser = argparse.ArgumentParser(description="Step 1: Generate full personas via Qwen on Modal")
    parser.add_argument("--anchors", default="data/anchors.json", help="Path to anchors JSON from Step 0")
    parser.add_argument("--output", default="data/personas.json", help="Output file path")
    parser.add_argument("--batch-size", type=int, default=500, help="Prompts per Modal call")
    parser.add_argument("--max-retries", type=int, default=2, help="Retries for failed generations")
    parser.add_argument("--temperature", type=float, default=0.7, help="Sampling temperature")
    parser.add_argument("--max-tokens", type=int, default=512, help="Max tokens per generation")
    args = parser.parse_args()

    with open(args.anchors) as f:
        anchors = json.load(f)
    print(f"Loaded {len(anchors)} anchors")

    # Get handle to the deployed Modal class
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    all_personas = []
    remaining = list(anchors)

    for attempt in range(args.max_retries + 1):
        if not remaining:
            break

        label = "Initial run" if attempt == 0 else f"Retry {attempt}"
        print(f"\n{label}: {len(remaining)} anchors to process")

        batch_successes = []
        batch_failures = []
        start = time.time()

        for i in range(0, len(remaining), args.batch_size):
            batch = remaining[i : i + args.batch_size]
            batch_num = i // args.batch_size + 1
            total_batches = (len(remaining) + args.batch_size - 1) // args.batch_size

            conversations = build_conversations(batch)
            outputs = model.generate.remote(
                conversations,
                temperature=args.temperature,
                max_tokens=args.max_tokens,
            )

            successes, failures = process_outputs(batch, outputs)
            batch_successes.extend(successes)
            batch_failures.extend(failures)

            elapsed = time.time() - start
            rate = len(batch_successes) / elapsed if elapsed > 0 else 0
            print(f"  Batch {batch_num}/{total_batches}: "
                  f"{len(successes)}/{len(batch)} ok "
                  f"({len(batch_successes)} total, {rate:.0f} personas/sec)")

        all_personas.extend(batch_successes)
        remaining = batch_failures

        elapsed = time.time() - start
        print(f"  {label} done in {elapsed:.1f}s: "
              f"{len(batch_successes)} ok, {len(batch_failures)} failed")

    all_personas.sort(key=lambda p: p["id"])

    total = len(anchors)
    success = len(all_personas)
    failed = total - success
    print(f"\n{'='*50}")
    print(f"Total:     {total}")
    print(f"Success:   {success} ({success/total*100:.1f}%)")
    print(f"Failed:    {failed}")
    print(f"{'='*50}")

    if failed > 0:
        failed_ids = set(a["id"] for a in anchors) - set(p["id"] for p in all_personas)
        print(f"Failed IDs: {sorted(failed_ids)[:20]}{'...' if failed > 20 else ''}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(all_personas, f, indent=2, ensure_ascii=False)
    print(f"\nSaved {len(all_personas)} personas to {args.output}")


if __name__ == "__main__":
    main()
