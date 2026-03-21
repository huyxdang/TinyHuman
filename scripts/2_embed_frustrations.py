"""
Step 2 — Embed Persona Frustrations using multilingual-e5-small on Modal

Takes personas from Step 1, concatenates each persona's top_3_frustrations
into a single text, and embeds them via Modal. Saves as .npy for fast
cosine similarity in Step 3 (per-product matching).

Usage:
    python scripts/2_embed_frustrations.py --personas data/personas.json --output data/persona_embeddings.npy
    python scripts/2_embed_frustrations.py --personas data/personas.json --batch-size 256

Requirements:
    pip install modal numpy
    modal deploy modal_app/embed.py   (first time only)
"""

import argparse
import json
import time
from pathlib import Path

import modal
import numpy as np


def load_personas(path: str) -> list[dict]:
    with open(path) as f:
        return json.load(f)


def frustrations_to_text(persona: dict) -> str:
    """Concatenate a persona's frustrations into a single string for embedding.

    Joins with ' | ' so the embedding captures all frustrations as one vector.
    """
    frustrations = persona.get("top_3_frustrations", [])
    return " | ".join(frustrations)


def main():
    parser = argparse.ArgumentParser(description="Step 2: Embed persona frustrations via Modal")
    parser.add_argument("--personas", default="data/personas.json", help="Path to personas JSON from Step 1")
    parser.add_argument("--output", default="data/persona_embeddings.npy", help="Output .npy file")
    parser.add_argument("--batch-size", type=int, default=256, help="Texts per Modal call")
    args = parser.parse_args()

    personas = load_personas(args.personas)
    print(f"Loaded {len(personas)} personas")

    # Build texts
    texts = [frustrations_to_text(p) for p in personas]
    empty = sum(1 for t in texts if not t.strip())
    if empty:
        print(f"WARNING: {empty} personas have empty frustrations")

    # Get handle to deployed Modal class
    Embedder = modal.Cls.from_name("tinyuser-embed", "Embedder")
    model = Embedder()

    # Embed in batches
    all_embeddings = []
    start = time.time()

    for i in range(0, len(texts), args.batch_size):
        batch = texts[i : i + args.batch_size]
        batch_num = i // args.batch_size + 1
        total_batches = (len(texts) + args.batch_size - 1) // args.batch_size

        vecs = model.embed.remote(batch)
        all_embeddings.extend(vecs)

        elapsed = time.time() - start
        rate = len(all_embeddings) / elapsed if elapsed > 0 else 0
        print(f"  Batch {batch_num}/{total_batches}: {len(all_embeddings)}/{len(texts)} done ({rate:.0f}/sec)")

    elapsed = time.time() - start

    # Convert to numpy array and save
    embeddings = np.array(all_embeddings, dtype=np.float32)
    print(f"\nEmbeddings shape: {embeddings.shape}")
    print(f"Total time: {elapsed:.1f}s")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    np.save(output_path, embeddings)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
