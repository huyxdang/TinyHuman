"""
Step 1 — Generate Full Personas from Anchors using Qwen (vLLM)

Takes anchors from Step 0 and generates complete personas using Qwen2.5-7B-Instruct
with vLLM offline batched inference. Each anchor (age, gender, province, region)
gets expanded into a full persona with job, industry, frustrations, etc.

Uses vLLM's offline LLM class for maximum throughput — batches of 500 prompts
at a time, processed in parallel on GPU.

Usage:
    python scripts/1_generate_full_personas.py --anchors data/anchors.json --output data/personas.json
    python scripts/1_generate_full_personas.py --anchors data/anchors.json --output data/personas.json --model Qwen/Qwen2.5-7B-Instruct --batch-size 500

Requirements:
    pip install vllm
"""

import argparse
import json
import re
import sys
import time
from pathlib import Path

from vllm import LLM, SamplingParams


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


def build_prompts(anchors: list[dict]) -> list[str]:
    """Build chat-formatted prompts for each anchor."""
    prompts = []
    for a in anchors:
        user_msg = USER_TEMPLATE.format(
            age=a["age"],
            gender=a["gender"],
            province=a["province"],
            region=a["region"],
        )
        prompts.append(user_msg)
    return prompts


def extract_json(text: str) -> dict | None:
    """Extract JSON object from model output, handling markdown fences and preamble."""
    # Try to find JSON in code fences first
    fence_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fence_match:
        try:
            return json.loads(fence_match.group(1))
        except json.JSONDecodeError:
            pass

    # Try to find raw JSON object
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
    """Combine anchor demographics with LLM-generated fields into a complete persona."""
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


def generate_batch(llm: LLM, sampling_params: SamplingParams, anchors: list[dict]) -> tuple[list[dict], list[dict]]:
    """Generate personas for a batch of anchors. Returns (successes, failed_anchors)."""
    prompts = build_prompts(anchors)

    # Build conversations for chat model
    conversations = [
        [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": p},
        ]
        for p in prompts
    ]

    outputs = llm.chat(conversations, sampling_params=sampling_params)

    successes = []
    failures = []
    for anchor, output in zip(anchors, outputs):
        text = output.outputs[0].text.strip()
        generated = extract_json(text)

        if generated and validate_persona(generated):
            persona = merge_anchor_and_generated(anchor, generated)
            successes.append(persona)
        else:
            failures.append(anchor)

    return successes, failures


def main():
    parser = argparse.ArgumentParser(description="Step 1: Generate full personas from anchors via Qwen + vLLM")
    parser.add_argument("--anchors", default="data/anchors.json", help="Path to anchors JSON from Step 0")
    parser.add_argument("--output", default="data/personas.json", help="Output file path")
    parser.add_argument("--model", default="Qwen/Qwen2.5-3B-Instruct", help="Model name/path")
    parser.add_argument("--batch-size", type=int, default=500, help="Prompts per vLLM batch")
    parser.add_argument("--max-retries", type=int, default=2, help="Retries for failed generations")
    parser.add_argument("--max-tokens", type=int, default=512, help="Max tokens per generation")
    parser.add_argument("--temperature", type=float, default=0.7, help="Sampling temperature")
    parser.add_argument("--gpu-memory", type=float, default=0.9, help="GPU memory utilization (0-1)")
    args = parser.parse_args()

    # Load anchors
    with open(args.anchors) as f:
        anchors = json.load(f)
    print(f"Loaded {len(anchors)} anchors")

    # Init vLLM
    print(f"Loading model: {args.model}")
    llm = LLM(
        model=args.model,
        gpu_memory_utilization=args.gpu_memory,
        max_model_len=2048,
        trust_remote_code=True,
    )

    sampling_params = SamplingParams(
        temperature=args.temperature,
        max_tokens=args.max_tokens,
        top_p=0.9,
    )

    # Process in batches
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

            successes, failures = generate_batch(llm, sampling_params, batch)
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

    # Sort by ID
    all_personas.sort(key=lambda p: p["id"])

    # Summary
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

    # Save
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(all_personas, f, indent=2, ensure_ascii=False)
    print(f"\nSaved {len(all_personas)} personas to {args.output}")


if __name__ == "__main__":
    main()
