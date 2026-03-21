"""
Step 2 — Cluster Personas into Semantic Groups

Embeds each persona's profile via Modal (multilingual-e5-small),
then clusters into k groups using k-means. Labels each cluster
by having Qwen read the top members and generate a short name.

Usage:
    python scripts/2_cluster.py
    python scripts/2_cluster.py --personas data/personas.json --k 4
"""

import argparse
import json
import time
from pathlib import Path

import modal
import numpy as np


def build_profile_texts(personas: list[dict]) -> list[str]:
    """Build a single text string per persona for embedding."""
    texts = []
    for p in personas:
        frustrations = " | ".join(p.get("top_3_frustrations", []))
        text = (
            f"{p.get('job_title', '')} in {p.get('industry', '')}, "
            f"{p.get('province', '')}. "
            f"Frustrations: {frustrations}"
        )
        texts.append(text)
    return texts


def kmeans(embeddings: np.ndarray, k: int, max_iter: int = 100, seed: int = 42) -> np.ndarray:
    """Simple k-means clustering. Returns cluster labels."""
    rng = np.random.default_rng(seed)
    n = embeddings.shape[0]

    # Initialize centroids randomly
    indices = rng.choice(n, size=k, replace=False)
    centroids = embeddings[indices].copy()

    labels = np.zeros(n, dtype=int)
    for _ in range(max_iter):
        # Assign each point to nearest centroid
        # (n, dim) @ (dim, k) -> (n, k) similarities
        sims = embeddings @ centroids.T
        new_labels = sims.argmax(axis=1)

        if np.array_equal(labels, new_labels):
            break
        labels = new_labels

        # Update centroids
        for j in range(k):
            mask = labels == j
            if mask.sum() > 0:
                centroids[j] = embeddings[mask].mean(axis=0)
                # Re-normalize
                centroids[j] /= np.linalg.norm(centroids[j])

    return labels


def label_clusters(personas: list[dict], labels: np.ndarray, k: int) -> list[str]:
    """Have Qwen generate a short label for each cluster."""
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    conversations = []
    for cluster_id in range(k):
        members = [p for p, l in zip(personas, labels) if l == cluster_id]
        # Show up to 10 members
        sample = members[:10]
        member_lines = []
        for m in sample:
            member_lines.append(
                f"- {m.get('name', '?')}, {m.get('age', '?')}, {m.get('job_title', '?')}, "
                f"{m.get('industry', '?')}, {m.get('province', '?')}"
            )
        members_text = "\n".join(member_lines)

        conversations.append([
            {"role": "system", "content": "Generate a short label (3-6 words) for this group of people. Output only the label."},
            {"role": "user", "content": f"These {len(members)} people are in a cluster:\n{members_text}\n\nShort label for this group:"},
        ])

    outputs = model.generate.remote(conversations, temperature=0.3, max_tokens=20)
    return [o.strip().strip('"').strip("'") for o in outputs]


def main():
    parser = argparse.ArgumentParser(description="Step 2: Cluster personas")
    parser.add_argument("--personas", default="data/personas.json", help="Personas from Step 1")
    parser.add_argument("--k", type=int, default=4, help="Number of clusters")
    parser.add_argument("--output", default="data/clusters.json", help="Output file")
    args = parser.parse_args()

    with open(args.personas) as f:
        personas = json.load(f)
    print(f"Loaded {len(personas)} personas")

    # Embed profiles
    print("Embedding persona profiles via Modal...")
    Embedder = modal.Cls.from_name("tinyuser-embed", "Embedder")
    embedder = Embedder()

    texts = build_profile_texts(personas)
    start = time.time()
    vecs = embedder.embed.remote(texts, prefix="passage")
    embeddings = np.array(vecs, dtype=np.float32)
    print(f"  Embedded {embeddings.shape[0]} personas, dim={embeddings.shape[1]} ({time.time()-start:.1f}s)")

    # K-means clustering
    print(f"Clustering into {args.k} groups...")
    labels = kmeans(embeddings, args.k)

    # Print cluster sizes
    for i in range(args.k):
        count = (labels == i).sum()
        print(f"  Cluster {i}: {count} personas")

    # Label clusters via Qwen
    print("Generating cluster labels via Qwen...")
    cluster_names = label_clusters(personas, labels, args.k)
    for i, name in enumerate(cluster_names):
        count = (labels == i).sum()
        print(f"  Cluster {i}: \"{name}\" ({count} personas)")

    # Build output
    clusters = []
    for i in range(args.k):
        member_ids = [personas[j]["id"] for j in range(len(personas)) if labels[j] == i]
        clusters.append({
            "cluster_id": i,
            "label": cluster_names[i],
            "size": len(member_ids),
            "persona_ids": member_ids,
        })

    output_data = {
        "k": args.k,
        "total_personas": len(personas),
        "clusters": clusters,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to {args.output}")


if __name__ == "__main__":
    main()
