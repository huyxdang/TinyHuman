# TinyUser

![TinyUser](./new.png)

Simulated word-of-mouth for product discovery.

## Overview

Humans discover products, then gossip about them. TinyUser simulates that dynamic to surface market signals from research plus conversation. It generates diverse personas from population statistics, uses **Exa** to gather live product and competitor context, then drops those personas into a chatroom where they discuss and vote on competing products. The result is a competitive analysis report powered by simulated consumer conversations.

**Tech stack:** Python · FastAPI · Modal (GPU inference) · Qwen 2.5 · OpenAI API · Exa · React · Three.js · Vite

## Requirements

- Python 3.11+
- Node.js 18+
- [Modal](https://modal.com) account (for GPU inference)
- `EXA_API_KEY`
- `OPENAI_API_KEY`
- Modal auth configured locally with `modal setup`

## Environment

Create a `.env` file in the project root. `scripts/server.py` loads it automatically on startup.

```bash
EXA_API_KEY=your_exa_api_key
OPENAI_API_KEY=your_openai_api_key
```

Notes:

- `EXA_API_KEY` is required for the research/search phase.
- `OPENAI_API_KEY` is required for the report summary and chat simulation.
- If either key is missing, the backend will start but the corresponding research step will fail.

## Quick Start

```bash
# Backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cat > .env <<'EOF'
EXA_API_KEY=your_exa_api_key
OPENAI_API_KEY=your_openai_api_key
EOF
python scripts/server.py --port 8000

# Deploy Modal endpoints
modal deploy modal_app/embed.py
modal deploy modal_app/qwen.py

# Frontend
cd frontend && npm install && npm run dev
```

## Run Order

1. Start the backend with `python scripts/server.py --port 8000`.
2. Make sure the required keys are present in `.env`.
3. Open the frontend and submit a product name or description.
4. If you use the Modal-backed inference paths, deploy `modal_app/embed.py` and `modal_app/qwen.py` first.

## Troubleshooting

- If research fails immediately, check that `EXA_API_KEY` is present and valid.
- If the chat/report phase fails, check that `OPENAI_API_KEY` is present and valid.
- If Modal deployment fails, run `modal setup` and confirm your account is authenticated.
