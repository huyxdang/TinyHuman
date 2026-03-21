"""
Modal app for Qwen2.5-3B-Instruct inference via vLLM.

Deploy:
    modal deploy modal_app/qwen.py

Test:
    modal run modal_app/qwen.py

Called by scripts/1_generate_full_personas.py
"""

import modal

app = modal.App("tinyuser-qwen")

vllm_image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("vllm>=0.6.0", "torch")
)

MODEL_NAME = "Qwen/Qwen2.5-7B-Instruct"


@app.cls(
    image=vllm_image,
    gpu="A10G",
    timeout=600,
    container_idle_timeout=300,
    keep_warm=1,
)
class Qwen:
    @modal.enter()
    def load_model(self):
        from vllm import LLM
        self.llm = LLM(
            model=MODEL_NAME,
            gpu_memory_utilization=0.9,
            max_model_len=2048,
            trust_remote_code=True,
        )

    @modal.method()
    def generate(
        self,
        conversations: list[list[dict]],
        temperature: float = 0.7,
        max_tokens: int = 512,
    ) -> list[str]:
        """Run batched chat inference. Returns list of output strings."""
        from vllm import SamplingParams

        sampling_params = SamplingParams(
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=0.9,
        )
        outputs = self.llm.chat(conversations, sampling_params=sampling_params)
        return [o.outputs[0].text.strip() for o in outputs]


# Quick test
@app.local_entrypoint()
def main():
    model = Qwen()
    test = [[
        {"role": "system", "content": "Output valid JSON only."},
        {"role": "user", "content": 'Generate a Vietnamese persona. Anchors: Age 25-34, female, Ho Chi Minh City (Southeast). Fill in: {"job_title":"","industry":"","top_3_frustrations":["","",""]}'},
    ]]
    results = model.generate.remote(test)
    print(results[0])
