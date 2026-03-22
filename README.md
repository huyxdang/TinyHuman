# TinyUser

Simulated word-of-mouth for product discovery.

## Overview

Humans discover products, then gossip about them — TinyUser simulates that dynamic to surface real market insights. It generates diverse personas from population statistics, uses **TinyFish** to fetch live product info, then drops those personas into a chatroom where they discuss and vote on competing products. The result is a competitive analysis report powered by simulated consumer conversations.

**Tech stack:** Python · FastAPI · Modal (GPU inference) · Qwen 2.5 · multilingual-e5-small · OpenAI API · TinyFish (web search) · React · Three.js · Vite

## Requirements

- Python 3.11+
- Node.js 18+
- [Modal](https://modal.com) account (for GPU inference)
- OpenAI API key
- TinyFish API key

## Quick Start

```bash
# Backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Deploy Modal endpoints
modal deploy modal_app/embed.py
modal deploy modal_app/qwen.py

# Set env vars
cp .env.example .env  # add OPENAI_API_KEY, TINYFISH_API_KEY

# Frontend
cd frontend && npm install && npm run dev
```
