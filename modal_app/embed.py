"""
Modal app for multilingual-e5-small embedding inference.

Deploy:
    modal deploy modal_app/embed.py

Called by scripts/2_embed_frustrations.py
"""

import modal

app = modal.App("tinyuser-embed")

embed_image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("torch", "transformers", "numpy")
)

MODEL_NAME = "intfloat/multilingual-e5-small"


@app.cls(
    image=embed_image,
    gpu="T4",
    timeout=600,
    container_idle_timeout=300,
)
class Embedder:
    @modal.enter()
    def load_model(self):
        import torch
        from transformers import AutoModel, AutoTokenizer

        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.model = AutoModel.from_pretrained(MODEL_NAME)
        self.model.eval()
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    @modal.method()
    def embed(self, texts: list[str]) -> list[list[float]]:
        """Embed a batch of texts. Returns list of vectors.

        E5 models require a "query: " or "passage: " prefix.
        We use "passage: " since these are frustrations being stored for retrieval.
        """
        import torch
        import numpy as np

        prefixed = [f"passage: {t}" for t in texts]

        tokens = self.tokenizer(
            prefixed,
            padding=True,
            truncation=True,
            max_length=512,
            return_tensors="pt",
        ).to(self.device)

        with torch.no_grad():
            output = self.model(**tokens)

        # Mean pooling over token embeddings (mask padding)
        mask = tokens["attention_mask"].unsqueeze(-1).float()
        embeddings = (output.last_hidden_state * mask).sum(dim=1) / mask.sum(dim=1)

        # L2 normalize
        embeddings = torch.nn.functional.normalize(embeddings, p=2, dim=1)

        return embeddings.cpu().numpy().tolist()


@app.local_entrypoint()
def main():
    model = Embedder()
    test = ["Tôi không tìm được nhà cung cấp đáng tin", "My team uses too many tools"]
    vecs = model.embed.remote(test)
    print(f"Got {len(vecs)} vectors, dim={len(vecs[0])}")
