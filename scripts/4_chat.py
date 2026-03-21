"""
Step 5 — Chatroom Simulation (Web UI)

Runs a FastAPI server with 4 live chatboxes (one per cluster).
Personas discuss the product in real-time via Qwen on Modal.

Usage:
    python scripts/5_chat.py --product product.json
    # Opens http://localhost:8000

Requirements:
    pip install fastapi uvicorn
"""

import argparse
import asyncio
import json
import os
import sys
import time
from pathlib import Path

import modal
import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse

# ── Global state ──────────────────────────────────────────────────────────
PRODUCT = {}
PERSONAS = []
CLUSTERS = []
KNOWLEDGE = {}       # product + competitor research from TinyFish
CHAT_LOGS = {}       # cluster_id -> list of {"name": ..., "message": ..., "round": ...}
DECISIONS = {}       # cluster_id -> list of {"persona_id": ..., "before": ..., "after": ..., "reason": ...}
SIMULATION_RUNNING = False

app = FastAPI()

# ── HTML Template ─────────────────────────────────────────────────────────
HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TinyUser — Chatroom Simulation</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f0f; color: #e0e0e0; }
  header { padding: 20px 30px; background: #1a1a1a; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
  header h1 { font-size: 18px; font-weight: 600; }
  header .product { color: #888; font-size: 14px; }
  #start-btn { background: #2563eb; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; }
  #start-btn:hover { background: #1d4ed8; }
  #start-btn:disabled { background: #333; cursor: not-allowed; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 12px; padding: 12px; height: calc(100vh - 70px); }
  .chatbox { background: #1a1a1a; border-radius: 8px; border: 1px solid #333; display: flex; flex-direction: column; overflow: hidden; }
  .chatbox-header { padding: 12px 16px; background: #222; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
  .chatbox-header h2 { font-size: 14px; font-weight: 600; }
  .chatbox-header .count { font-size: 12px; color: #888; }
  .chatbox-header .stats { font-size: 11px; color: #666; margin-top: 2px; }
  .messages { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .msg { padding: 8px 12px; border-radius: 8px; background: #252525; max-width: 85%; font-size: 13px; line-height: 1.4; }
  .msg .name { font-weight: 600; color: #60a5fa; font-size: 11px; margin-bottom: 2px; }
  .msg .meta { font-size: 10px; color: #666; margin-top: 4px; }
  .msg.system { background: #1e293b; color: #94a3b8; font-style: italic; align-self: center; text-align: center; max-width: 100%; font-size: 12px; }
  .msg.vote { background: #14532d; border: 1px solid #166534; }
  .msg.vote .choice { font-weight: 600; color: #4ade80; }
  .results-bar { padding: 8px 16px; background: #222; border-top: 1px solid #333; font-size: 12px; display: none; }
  .results-bar .bar { height: 6px; background: #333; border-radius: 3px; margin-top: 4px; overflow: hidden; display: flex; }
  .results-bar .bar .segment { height: 100%; }
  .bar-product { background: #2563eb; }
  .bar-competitor { background: #dc2626; }
  .bar-pass { background: #555; }
</style>
</head>
<body>
<header>
  <div>
    <h1>TinyUser — Chatroom Simulation</h1>
    <div class="product" id="product-name"></div>
  </div>
  <button id="start-btn" onclick="startSimulation()">Start Discussion</button>
</header>
<div class="grid" id="grid"></div>

<script>
let clusters = [];
let eventSource = null;

async function init() {
  const resp = await fetch('/api/state');
  const data = await resp.json();
  document.getElementById('product-name').textContent = data.product.name + ' — ' + data.product.description;
  clusters = data.clusters;
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  clusters.forEach((c, i) => {
    grid.innerHTML += `
      <div class="chatbox" id="chat-${i}">
        <div class="chatbox-header">
          <div>
            <h2>${c.label}</h2>
            <div class="stats">${c.size} personas</div>
          </div>
          <div class="count" id="count-${i}">0 messages</div>
        </div>
        <div class="messages" id="msgs-${i}"></div>
        <div class="results-bar" id="results-${i}">
          <span id="results-text-${i}"></span>
          <div class="bar"><div class="segment bar-product" id="bar-product-${i}"></div><div class="segment bar-competitor" id="bar-competitor-${i}"></div><div class="segment bar-pass" id="bar-pass-${i}"></div></div>
        </div>
      </div>`;
  });
}

function startSimulation() {
  const btn = document.getElementById('start-btn');
  btn.disabled = true;
  btn.textContent = 'Running...';

  fetch('/api/start', { method: 'POST' });

  eventSource = new EventSource('/api/stream');
  eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'message') {
      addMessage(data.cluster_id, data.name, data.message, data.job, data.round);
    } else if (data.type === 'system') {
      addSystemMessage(data.cluster_id, data.message);
    } else if (data.type === 'vote') {
      addVote(data.cluster_id, data.name, data.choice, data.reason);
    } else if (data.type === 'results') {
      showResults(data.cluster_id, data.product_pct, data.competitor_pct, data.pass_pct, data.summary);
    } else if (data.type === 'done') {
      btn.textContent = 'Done';
      eventSource.close();
    }
  };
}

function addMessage(cid, name, message, job, round) {
  const container = document.getElementById('msgs-' + cid);
  const div = document.createElement('div');
  div.className = 'msg';
  div.innerHTML = '<div class="name">' + name + '</div>' + message + '<div class="meta">' + job + ' · round ' + round + '</div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  updateCount(cid);
}

function addSystemMessage(cid, message) {
  const container = document.getElementById('msgs-' + cid);
  const div = document.createElement('div');
  div.className = 'msg system';
  div.textContent = message;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function addVote(cid, name, choice, reason) {
  const container = document.getElementById('msgs-' + cid);
  const div = document.createElement('div');
  div.className = 'msg vote';
  div.innerHTML = '<div class="name">' + name + '</div><span class="choice">' + choice + '</span> — ' + reason;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  updateCount(cid);
}

function showResults(cid, product, competitor, pass_pct, summary) {
  const bar = document.getElementById('results-' + cid);
  bar.style.display = 'block';
  document.getElementById('results-text-' + cid).textContent = summary;
  document.getElementById('bar-product-' + cid).style.width = product + '%';
  document.getElementById('bar-competitor-' + cid).style.width = competitor + '%';
  document.getElementById('bar-pass-' + cid).style.width = pass_pct + '%';
}

function updateCount(cid) {
  const msgs = document.getElementById('msgs-' + cid).children.length;
  document.getElementById('count-' + cid).textContent = msgs + ' messages';
}

init();
</script>
</body>
</html>"""


# ── API Routes ────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def index():
    return HTML


@app.get("/api/state")
async def get_state():
    return {"product": PRODUCT, "clusters": CLUSTERS}


message_queue: asyncio.Queue = asyncio.Queue()


@app.post("/api/start")
async def start_simulation():
    global SIMULATION_RUNNING
    if SIMULATION_RUNNING:
        return {"status": "already_running"}
    SIMULATION_RUNNING = True
    asyncio.create_task(run_simulation())
    return {"status": "started"}


@app.get("/api/stream")
async def stream():
    async def event_generator():
        while True:
            msg = await message_queue.get()
            yield f"data: {json.dumps(msg, ensure_ascii=False)}\n\n"
            if msg.get("type") == "done":
                break
    return StreamingResponse(event_generator(), media_type="text/event-stream")


# ── Simulation Logic ──────────────────────────────────────────────────────

async def run_simulation():
    """Run chat simulation for all clusters."""
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    persona_map = {p["id"]: p for p in PERSONAS}
    knowledge_summary = KNOWLEDGE.get("summary_text", f"No research data available about {PRODUCT['name']}.")

    for cluster in CLUSTERS:
        cid = cluster["cluster_id"]
        member_ids = cluster["persona_ids"]
        members = [persona_map[pid] for pid in member_ids if pid in persona_map]

        await message_queue.put({
            "type": "system",
            "cluster_id": cid,
            "message": f"Discussion starting — {len(members)} participants",
        })

        chat_history = []
        CHAT_LOGS[cid] = []

        # Chat rounds
        max_rounds = 10
        for round_num in range(1, max_rounds + 1):
            history_text = "\n".join(
                f"{m['name']}: {m['message']}" for m in chat_history[-30:]
            )

            conversations = []
            for p in members:
                frustrations = ", ".join(p.get("top_3_frustrations", []))

                system_msg = (
                    f"You are {p.get('name', 'Unknown')}, a {p.get('age', '?')} year old "
                    f"{p.get('job_title', '?')} from {p.get('province', '?')}.\n"
                    f"Your frustrations: {frustrations}\n\n"
                    f"Here is real information about the products being discussed:\n{knowledge_summary}\n\n"
                    f"You are in a group chat discussing {PRODUCT['name']} and alternatives.\n"
                    f"Stay in character. Be natural. Write 1-2 sentences max in Vietnamese or English.\n"
                    f"If you have nothing new to add, say exactly \"pass\"."
                )

                user_msg = f"Chat history:\n{history_text}\n\nYour message:" if history_text else "The discussion just started. Share your thoughts."

                conversations.append([
                    {"role": "system", "content": system_msg},
                    {"role": "user", "content": user_msg},
                ])

            # Batch generate via Qwen
            outputs = await asyncio.to_thread(
                model.generate.remote, conversations, 0.7, 128
            )

            pass_count = 0
            for p, raw_msg in zip(members, outputs):
                msg = raw_msg.strip()
                if msg.lower() == "pass" or not msg:
                    pass_count += 1
                    continue

                entry = {
                    "name": p.get("name", "Unknown"),
                    "persona_id": p["id"],
                    "message": msg,
                    "round": round_num,
                }
                chat_history.append(entry)
                CHAT_LOGS[cid].append(entry)

                await message_queue.put({
                    "type": "message",
                    "cluster_id": cid,
                    "name": p.get("name", "Unknown"),
                    "message": msg,
                    "job": p.get("job_title", ""),
                    "round": round_num,
                })

            await message_queue.put({
                "type": "system",
                "cluster_id": cid,
                "message": f"Round {round_num} complete — {pass_count}/{len(members)} passed",
            })

            # Stop if 80%+ passed
            if pass_count >= len(members) * 0.8:
                await message_queue.put({
                    "type": "system",
                    "cluster_id": cid,
                    "message": "Discussion ended — consensus reached",
                })
                break

        # Final vote
        await message_queue.put({
            "type": "system",
            "cluster_id": cid,
            "message": "Voting...",
        })

        vote_conversations = []
        competitor_names = KNOWLEDGE.get("competitor_names", [])
        competitors_str = ", ".join(competitor_names)
        history_text = "\n".join(f"{m['name']}: {m['message']}" for m in chat_history[-40:])

        for p in members:
            vote_conversations.append([
                {"role": "system", "content": (
                    f"You are {p.get('name', 'Unknown')}, a {p.get('age', '?')} year old "
                    f"{p.get('job_title', '?')} from {p.get('province', '?')}.\n"
                    f"You just had a group discussion about {PRODUCT['name']}.\n"
                    f"Based on the discussion, make your final decision.\n"
                    f"Reply with EXACTLY this format:\n"
                    f"CHOICE: [product name or 'pass']\n"
                    f"REASON: [one sentence why]"
                )},
                {"role": "user", "content": (
                    f"Discussion summary:\n{history_text}\n\n"
                    f"Options: {PRODUCT['name']}, {competitors_str}, or pass.\n"
                    f"Your final decision:"
                )},
            ])

        vote_outputs = await asyncio.to_thread(
            model.generate.remote, vote_conversations, 0.3, 64
        )

        product_count = 0
        competitor_count = 0
        pass_count = 0
        cluster_decisions = []

        for p, raw_vote in zip(members, vote_outputs):
            choice, reason = _parse_vote(raw_vote, PRODUCT["name"], competitor_names)

            if choice == PRODUCT["name"].lower():
                product_count += 1
            elif choice == "pass":
                pass_count += 1
            else:
                competitor_count += 1

            cluster_decisions.append({
                "persona_id": p["id"],
                "name": p.get("name", "Unknown"),
                "before": "neutral",
                "after": choice,
                "reason": reason,
            })

            await message_queue.put({
                "type": "vote",
                "cluster_id": cid,
                "name": p.get("name", "Unknown"),
                "choice": choice,
                "reason": reason,
            })

        DECISIONS[cid] = cluster_decisions

        total = len(members)
        await message_queue.put({
            "type": "results",
            "cluster_id": cid,
            "product_pct": round(product_count / total * 100),
            "competitor_pct": round(competitor_count / total * 100),
            "pass_pct": round(pass_count / total * 100),
            "summary": f"{PRODUCT['name']}: {product_count} | Competitors: {competitor_count} | Pass: {pass_count}",
        })

    # Save outputs
    _save_outputs()

    await message_queue.put({"type": "done"})
    global SIMULATION_RUNNING
    SIMULATION_RUNNING = False



def _parse_vote(raw: str, product_name: str, competitors: list[str]) -> tuple[str, str]:
    lines = raw.strip().split("\n")
    choice = "pass"
    reason = raw.strip()

    for line in lines:
        line_lower = line.lower()
        if "choice:" in line_lower:
            choice_text = line.split(":", 1)[1].strip().lower()
            if product_name.lower() in choice_text:
                choice = product_name.lower()
            elif choice_text == "pass" or "pass" in choice_text:
                choice = "pass"
            else:
                for comp in competitors:
                    if comp.lower() in choice_text:
                        choice = comp.lower()
                        break
                else:
                    choice = choice_text
        if "reason:" in line_lower:
            reason = line.split(":", 1)[1].strip()

    return choice, reason


def _save_outputs():
    output_dir = Path("output")
    output_dir.mkdir(parents=True, exist_ok=True)

    with open(output_dir / "chat_log.json", "w") as f:
        json.dump(CHAT_LOGS, f, indent=2, ensure_ascii=False)

    with open(output_dir / "decisions.json", "w") as f:
        json.dump(DECISIONS, f, indent=2, ensure_ascii=False)

    print(f"Saved chat_log.json and decisions.json to output/")


# ── Main ──────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Step 5: Chatroom simulation (Web UI)")
    parser.add_argument("--product", required=True, help="Path to product JSON")
    parser.add_argument("--personas", default="data/personas.json")
    parser.add_argument("--clusters", default="data/clusters.json")
    parser.add_argument("--knowledge", default="output/knowledge.json")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    global PRODUCT, PERSONAS, CLUSTERS, KNOWLEDGE

    with open(args.product) as f:
        PRODUCT = json.load(f)
    with open(args.personas) as f:
        PERSONAS = json.load(f)
    with open(args.clusters) as f:
        cluster_data = json.load(f)
        CLUSTERS = cluster_data["clusters"]
    with open(args.knowledge) as f:
        KNOWLEDGE = json.load(f)

    print(f"Product: {PRODUCT['name']}")
    print(f"Personas: {len(PERSONAS)}")
    print(f"Clusters: {len(CLUSTERS)}")
    print(f"Knowledge: {len(KNOWLEDGE.get('summary_text', ''))} chars")
    print(f"\nOpen http://localhost:{args.port}")

    uvicorn.run(app, host="0.0.0.0", port=args.port, log_level="warning")


if __name__ == "__main__":
    main()
