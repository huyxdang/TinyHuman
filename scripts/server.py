"""
TinyHuman — Unified Backend Server

Serves the full pipeline: research (TinyFish) → chat (Qwen on Modal) → report.
Single SSE stream for all phases.

Usage:
    python scripts/server.py
    python scripts/server.py --port 8000
"""

import asyncio
import json
import os
import re
import sys
import time
from collections import Counter
from pathlib import Path

import modal
import requests
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
OUTPUT_DIR = ROOT_DIR / "output"

load_dotenv(ROOT_DIR / ".env")

# ── Global State ─────────────────────────────────────────────────────────

PERSONAS = []
CLUSTERS = []
PRODUCT = {}
KNOWLEDGE = {}
CHAT_LOGS = {}
DECISIONS = {}
REPORT = {}
PIPELINE_RUNNING = False
DEMO_MODE = False

message_queue: asyncio.Queue = asyncio.Queue()
chat_gate: asyncio.Event = asyncio.Event()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Load pre-computed data ───────────────────────────────────────────────

def load_data():
    global PERSONAS, CLUSTERS
    if PERSONAS and CLUSTERS:
        return

    with open(DATA_DIR / "personas.json", encoding="utf-8") as f:
        PERSONAS = json.load(f)
    with open(DATA_DIR / "clusters.json", encoding="utf-8") as f:
        cluster_data = json.load(f)
        CLUSTERS = cluster_data["clusters"]
    print(f"Loaded {len(PERSONAS)} personas, {len(CLUSTERS)} clusters")


@app.on_event("startup")
async def startup_event():
    load_data()


# ── API Routes ───────────────────────────────────────────────────────────

@app.get("/api/state")
async def get_state():
    return {"personas": PERSONAS, "clusters": CLUSTERS}


@app.post("/api/run")
async def run_pipeline(body: dict):
    global PIPELINE_RUNNING, PRODUCT, CHAT_LOGS, DECISIONS, REPORT, DEMO_MODE
    if PIPELINE_RUNNING:
        return {"status": "already_running"}

    PRODUCT = {
        "name": body.get("name", ""),
        "url": body.get("url", ""),
        "description": body.get("description", body.get("name", "")),
    }
    DEMO_MODE = body.get("demo", False)
    CHAT_LOGS = {}
    DECISIONS = {}
    REPORT = {}
    PIPELINE_RUNNING = True

    # Drain any old messages from the queue
    while not message_queue.empty():
        try:
            message_queue.get_nowait()
        except asyncio.QueueEmpty:
            break

    asyncio.create_task(_run_full_pipeline())
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


@app.get("/api/report")
async def get_report():
    return REPORT if REPORT else {"error": "No report generated yet"}


@app.get("/api/knowledge")
async def get_knowledge():
    if KNOWLEDGE:
        return KNOWLEDGE
    # Fall back to file
    path = OUTPUT_DIR / "knowledge.json"
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"error": "No knowledge available yet"}


@app.post("/api/start-chat")
async def start_chat():
    chat_gate.set()
    return {"status": "chat_started"}


# ── Full Pipeline ────────────────────────────────────────────────────────

async def _run_full_pipeline():
    global PIPELINE_RUNNING, KNOWLEDGE, REPORT

    try:
        # Phase 1: Research
        await message_queue.put({"type": "research_start"})

        if DEMO_MODE:
            # Simulated research with hardcoded data
            await message_queue.put({
                "type": "research_progress",
                "step": "discovering_competitors",
            })
            await asyncio.sleep(2)

            demo_competitors = ["Claude", "Gemini", "Perplexity"]
            await message_queue.put({
                "type": "research_progress",
                "step": "competitors_found",
                "competitors": demo_competitors,
            })
            await asyncio.sleep(1)

            for comp in [PRODUCT["name"]] + demo_competitors:
                await message_queue.put({
                    "type": "research_progress",
                    "step": "researching_competitor" if comp != PRODUCT["name"] else "researching_product",
                    "name": comp,
                })
                await asyncio.sleep(0.5)

            knowledge = _build_demo_knowledge(PRODUCT, demo_competitors)
        else:
            loop = asyncio.get_running_loop()
            knowledge = await asyncio.to_thread(_run_research, PRODUCT, loop)

        KNOWLEDGE = knowledge
        await message_queue.put({
            "type": "research_complete",
            "competitors": knowledge.get("competitor_names", []),
        })

        # Wait for user to click "Start Gossip"
        chat_gate.clear()
        await message_queue.put({"type": "waiting_for_chat"})
        await chat_gate.wait()

        # Phase 2: Chat simulation
        await message_queue.put({"type": "chat_start"})
        await _run_chat_simulation(knowledge)
        await message_queue.put({"type": "chat_done"})

        # Phase 3: Report
        report = _build_report(PRODUCT, CLUSTERS, PERSONAS, DECISIONS, CHAT_LOGS, knowledge)
        REPORT = report
        _save_outputs(knowledge, report)
        await message_queue.put({"type": "report_ready", "report": report})

    except Exception as e:
        print(f"Pipeline error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        await message_queue.put({"type": "error", "message": str(e)})

    finally:
        await message_queue.put({"type": "done"})
        PIPELINE_RUNNING = False


# ── Demo Research ────────────────────────────────────────────────────────

def _build_demo_knowledge(product: dict, competitor_names: list[str]) -> dict:
    """Build hardcoded knowledge for demo mode."""
    product_name = product["name"]

    demo_competitors = {
        "Claude": {
            "overview": "AI assistant by Anthropic focused on safety, long-context understanding, and nuanced reasoning. Known for careful, detailed responses.",
            "features": "200K token context window, extended thinking, Claude Code for development, Projects with file uploads, Google Workspace integration, artifacts for rich content",
            "pricing": "Free: Sonnet access | Pro: $20/mo | Team: $25/user/mo | Max: $100/mo | Enterprise: Custom",
        },
        "Gemini": {
            "overview": "Google's multimodal AI assistant with deep Search integration, native access to Gmail/Docs/Sheets, and the largest context window available.",
            "features": "Deep Google Search with citations, multimodal (text/image/audio/video), Gems custom personas, Google Workspace integration, 1M token context (Gemini 1.5 Pro)",
            "pricing": "Free: Gemini Flash | Advanced: $19.99/mo (bundled with Google One 2TB) | Business: $24/user/mo",
        },
        "Perplexity": {
            "overview": "AI-powered answer engine combining real-time web search with LLM synthesis. Focuses on cited, factual, up-to-date answers.",
            "features": "Real-time web search with source citations, focus modes (Web/Academic/Writing/Math), Collections for research, API access, multiple LLM backends",
            "pricing": "Free: 5 Pro searches/day | Pro: $20/mo or $200/yr | Enterprise: Custom",
        },
        "ChatGPT": {
            "overview": "AI chatbot by OpenAI for writing, coding, research, and everyday tasks. Powered by GPT-4o and GPT-5, with a large plugin and GPT Store ecosystem.",
            "features": "Memory across sessions, code generation/debugging, DALL-E image generation, file uploads, web browsing, Custom GPTs, voice mode, mobile apps",
            "pricing": "Free: Limited GPT-5 | Plus: $20/mo | Pro: $200/mo | Team: $25-30/user/mo | Enterprise: Custom",
        },
    }

    # Build knowledge structure matching what the chat simulation expects
    competitors_data = {}
    summary_parts = [f"Product: {product_name} — {product.get('description', '')}"]

    for comp_name in competitor_names:
        comp = demo_competitors.get(comp_name, {
            "overview": f"{comp_name} is a competitor product.",
            "features": "Various AI features",
            "pricing": "Contact for pricing",
        })
        competitors_data[comp_name] = comp
        summary_parts.append(
            f"\n{comp_name}: {comp['overview']} "
            f"Features: {comp['features']}. "
            f"Pricing: {comp['pricing']}"
        )

    knowledge = {
        "product": {
            "name": product_name,
            "description": product.get("description", ""),
            "overview": demo_competitors.get(product_name, {}).get("overview", f"{product_name} — {product.get('description', '')}"),
            "features": demo_competitors.get(product_name, {}).get("features", ""),
            "pricing": demo_competitors.get(product_name, {}).get("pricing", ""),
        },
        "competitors": competitors_data,
        "competitor_names": competitor_names,
        "summary_text": "\n".join(summary_parts),
    }
    return knowledge


# ── Phase 1: Research (TinyFish Web Agent API) ──────────────────────────

TINYFISH_BASE = "https://agent.tinyfish.ai"


def _tf_headers():
    api_key = os.environ.get("TINYFISH_API_KEY")
    if not api_key:
        raise ValueError("TINYFISH_API_KEY not set")
    return {"X-API-Key": api_key, "Content-Type": "application/json"}


def _tf_run_sync(url: str, goal: str) -> dict | None:
    """Run a TinyFish automation synchronously. Returns result or None."""
    try:
        resp = requests.post(
            f"{TINYFISH_BASE}/v1/automation/run",
            headers=_tf_headers(),
            json={"url": url, "goal": goal},
            timeout=120,
        )
        data = resp.json()
        if data.get("status") == "COMPLETED" and data.get("result"):
            return data["result"]
    except Exception as e:
        print(f"TinyFish error: {e}", file=sys.stderr)
    return None


def _tf_run_batch_and_poll(runs: list[dict], timeout: int = 180) -> list[dict | None]:
    """Submit a batch of TinyFish runs and poll until all complete."""
    headers = _tf_headers()

    # Submit batch
    resp = requests.post(
        f"{TINYFISH_BASE}/v1/automation/run-batch",
        headers=headers,
        json={"runs": runs},
        timeout=30,
    )
    batch_data = resp.json()
    run_ids = batch_data.get("run_ids", [])
    if not run_ids:
        return [None] * len(runs)

    # Poll until all done
    results = [None] * len(run_ids)
    deadline = time.time() + timeout
    while time.time() < deadline:
        poll_resp = requests.post(
            f"{TINYFISH_BASE}/v1/runs/batch",
            headers=headers,
            json={"run_ids": run_ids},
            timeout=30,
        )
        poll_data = poll_resp.json()
        all_done = True
        for i, run_obj in enumerate(poll_data.get("data", [])):
            status = run_obj.get("status")
            if status == "COMPLETED":
                results[i] = run_obj.get("result")
            elif status in ("FAILED", "CANCELLED"):
                results[i] = None
            else:
                all_done = False
        if all_done:
            break
        time.sleep(3)

    return results


def _run_research(product: dict, loop: asyncio.AbstractEventLoop) -> dict:
    """Run TinyFish research synchronously (called via asyncio.to_thread)."""
    _emit_sync.loop = loop
    name = product["name"]

    # Step 1: Discover competitors
    _emit_sync({"type": "research_progress", "step": "discovering_competitors"})
    discover_result = _tf_run_sync(
        url=f"https://www.google.com/search?q={requests.utils.quote(name + ' competitors alternatives 2025')}",
        goal=(
            f"Find the top 3-5 competitors or alternatives to '{name}'. "
            f"Extract a JSON list of competitor product names. "
            f"Return as: {{\"competitors\": [\"Name1\", \"Name2\", ...]}}"
        ),
    )

    competitors = []
    if discover_result:
        # Try to extract competitor names from the result
        if isinstance(discover_result, dict):
            competitors = discover_result.get("competitors", [])
        if not competitors:
            # Try parsing from string result
            result_str = json.dumps(discover_result)
            competitors = _extract_competitor_names(result_str, name)

    if not competitors:
        competitors = ["Claude", "Gemini", "Perplexity"]  # fallback

    competitors = competitors[:5]
    _emit_sync({"type": "research_progress", "step": "competitors_found", "competitors": competitors})

    # Step 2: Research product + all competitors in batch
    all_targets = [name] + competitors
    runs = []
    for target in all_targets:
        runs.append({
            "url": f"https://www.google.com/search?q={requests.utils.quote(target + ' pricing features overview 2025')}",
            "goal": (
                f"Research '{target}'. Extract: "
                f"1) A one-sentence overview of what it is. "
                f"2) Top 5 key features as a list. "
                f"3) Pricing tiers. "
                f"Return as JSON: {{\"overview\": \"...\", \"features\": [\"...\", ...], \"pricing\": \"...\"}}"
            ),
        })

    _emit_sync({"type": "research_progress", "step": "researching_product", "name": name})
    results = _tf_run_batch_and_poll(runs)

    # Step 3: Build knowledge from results
    product_info = _parse_research_result(results[0]) if results[0] else {}
    competitor_info = {}
    for i, comp in enumerate(competitors):
        _emit_sync({"type": "research_progress", "step": "researching_competitor", "name": comp})
        comp_result = results[i + 1] if (i + 1) < len(results) else None
        competitor_info[comp] = _parse_research_result(comp_result) if comp_result else {}

    knowledge = _build_knowledge_base(product, competitors, product_info, competitor_info)
    return knowledge


def _parse_research_result(result: dict | None) -> dict:
    """Parse a TinyFish result into structured overview/features/pricing."""
    if not result:
        return {}
    info = {}
    if isinstance(result, dict):
        info["overview"] = result.get("overview", "")
        features = result.get("features", [])
        if isinstance(features, list):
            info["features"] = features
        elif isinstance(features, str):
            info["features"] = [f.strip() for f in features.split(",") if f.strip()]
        info["pricing"] = result.get("pricing", "")
    return info


def _emit_sync(msg: dict):
    """Put a message on the async queue from a sync thread."""
    _emit_sync.loop.call_soon_threadsafe(message_queue.put_nowait, msg)


def _extract_competitor_names(text: str, product_name: str) -> list[str]:
    names = set()
    product_lower = product_name.lower()
    known_products = [
        "ChatGPT", "Claude", "Gemini", "Copilot", "Perplexity",
        "Grok", "DeepSeek", "Mistral", "Jasper", "Notion AI",
    ]
    for p in known_products:
        if p.lower() != product_lower and p.lower() in text.lower():
            names.add(p)
    return list(names)


def _build_knowledge_base(product: dict, competitors: list[str],
                          product_info: dict, competitor_info: dict) -> dict:
    knowledge = {
        "product": {
            "name": product["name"],
            "url": product.get("url", ""),
            "description": product.get("description", ""),
            "overview": product_info.get("overview", ""),
            "features": product_info.get("features", []),
            "pricing": product_info.get("pricing", ""),
        },
        "competitors": competitor_info,
        "competitor_names": competitors,
    }

    # Build summary text for chat simulation context
    summary_parts = [f"{product['name']}: {product_info.get('overview', product.get('description', ''))}"]
    pricing = product_info.get("pricing", "")
    if pricing:
        summary_parts.append(f"Pricing: {pricing}")

    for comp_name in competitors:
        comp_data = competitor_info.get(comp_name, {})
        overview = comp_data.get("overview", "")
        comp_pricing = comp_data.get("pricing", "")
        summary_parts.append(f"\n{comp_name}: {overview}")
        if comp_pricing:
            summary_parts.append(f"Pricing: {comp_pricing}")

    knowledge["summary_text"] = "\n".join(summary_parts)
    return knowledge


# ── Phase 2: Chat Simulation (Qwen on Modal) ────────────────────────────

async def _run_chat_simulation(knowledge: dict):
    """Run chat simulation for all clusters."""
    Qwen = modal.Cls.from_name("tinyuser-qwen", "Qwen")
    model = Qwen()

    persona_map = {p["id"]: p for p in PERSONAS}
    knowledge_summary = knowledge.get("summary_text", f"No research data available about {PRODUCT['name']}.")
    # Truncate knowledge to avoid exceeding model's 2048 token limit
    if len(knowledge_summary) > 400:
        knowledge_summary = knowledge_summary[:400] + "..."
    competitor_names = knowledge.get("competitor_names", [])

    for cluster in CLUSTERS:
        cid = cluster["cluster_id"]
        member_ids = cluster["persona_ids"]
        all_members = [persona_map[pid] for pid in member_ids if pid in persona_map]
        # Only 8 chat, but all vote
        chat_members = all_members[:8]

        await message_queue.put({
            "type": "system",
            "cluster_id": cid,
            "message": f"Discussion starting — {len(chat_members)} participants",
        })

        chat_history = []
        CHAT_LOGS[cid] = []

        max_rounds = 3
        for round_num in range(1, max_rounds + 1):
            history_text = "\n".join(
                f"{m['name']}: {m['message']}" for m in chat_history[-10:]
            )
            # Truncate history to stay within token limits
            if len(history_text) > 500:
                history_text = history_text[-500:]

            conversations = []
            for p in chat_members:
                frustrations = ", ".join(p.get("top_3_frustrations", []))

                system_msg = (
                    f"You are {p.get('name', 'Unknown')}, {p.get('age', '?')}yo "
                    f"{p.get('job_title', '?')} from {p.get('province', '?')}.\n"
                    f"Frustrations: {frustrations}\n"
                    f"Product info:\n{knowledge_summary}\n"
                    f"Group chat about {PRODUCT['name']} vs alternatives.\n"
                    f"RESPOND IN ENGLISH ONLY. 1-2 sentences. Stay in character.\n"
                    f"You MUST share an opinion. Ask questions, agree, disagree, or share your experience."
                )

                user_msg = (
                    f"Chat history:\n{history_text}\n\nYour message:"
                    if history_text
                    else "The discussion just started. Share your thoughts."
                )

                conversations.append([
                    {"role": "system", "content": system_msg},
                    {"role": "user", "content": user_msg},
                ])

            outputs = await asyncio.to_thread(
                model.generate.remote, conversations, 0.7, 128
            )

            pass_count = 0
            for p, raw_msg in zip(chat_members, outputs):
                msg = raw_msg.strip()
                if not msg or msg.lower() == "pass":
                    pass_count += 1
                    continue
                # Strip "pass" if model prepends it
                if msg.lower().startswith("pass"):
                    msg = msg[4:].strip().lstrip(".,;:-").strip()
                    if not msg:
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
                await asyncio.sleep(0.4)  # stagger messages one-by-one

            await message_queue.put({
                "type": "system",
                "cluster_id": cid,
                "message": f"Round {round_num} complete — {pass_count}/{len(chat_members)} passed",
            })


        # Final vote
        await message_queue.put({
            "type": "system",
            "cluster_id": cid,
            "message": "Voting...",
        })

        vote_conversations = []
        competitors_str = ", ".join(competitor_names)
        vote_history = "\n".join(f"{m['name']}: {m['message']}" for m in chat_history[-8:])
        if len(vote_history) > 400:
            vote_history = vote_history[-400:]

        for p in all_members:
            vote_conversations.append([
                {"role": "system", "content": (
                    f"You are {p.get('name', 'Unknown')}, {p.get('age', '?')}yo "
                    f"{p.get('job_title', '?')} from {p.get('province', '?')}.\n"
                    f"Pick one product. Reply EXACTLY:\n"
                    f"CHOICE: [product name]\nREASON: [one sentence]"
                )},
                {"role": "user", "content": (
                    f"Discussion:\n{vote_history}\n\n"
                    f"Options: {PRODUCT['name']}, {competitors_str}\n"
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

        for p, raw_vote in zip(all_members, vote_outputs):
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

        total = len(all_members)
        await message_queue.put({
            "type": "results",
            "cluster_id": cid,
            "product_pct": round(product_count / total * 100) if total else 0,
            "competitor_pct": round(competitor_count / total * 100) if total else 0,
            "pass_pct": round(pass_count / total * 100) if total else 0,
            "summary": f"{PRODUCT['name']}: {product_count} | Competitors: {competitor_count} | Pass: {pass_count}",
        })


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
            elif "pass" in choice_text:
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


# ── Phase 3: Report ──────────────────────────────────────────────────────

def _build_report(product: dict, clusters: list[dict], personas: list[dict],
                  decisions: dict, chat_logs: dict, knowledge: dict) -> dict:
    persona_map = {p["id"]: p for p in personas}
    product_name = product["name"]
    competitor_names = knowledge.get("competitor_names", [])

    cluster_reports = []
    total_product = 0
    total_competitor = 0
    total_pass = 0

    for cluster in clusters:
        cid = str(cluster["cluster_id"])
        cluster_decisions = decisions.get(cluster["cluster_id"], decisions.get(cid, []))
        cluster_chat = chat_logs.get(cluster["cluster_id"], chat_logs.get(cid, []))

        cr = _analyze_cluster(cluster, cluster_decisions, cluster_chat, persona_map, product_name)
        cluster_reports.append(cr)

        total_product += cr["vote_summary"]["product"]["count"]
        total_competitor += cr["vote_summary"]["competitors"]["total"]
        total_pass += cr["vote_summary"]["pass"]["count"]

    total_votes = total_product + total_competitor + total_pass

    overall_competitor_breakdown = Counter()
    for cr in cluster_reports:
        for comp in cr["vote_summary"]["competitors"]["breakdown"]:
            overall_competitor_breakdown[comp["name"]] += comp["count"]

    competitor_profiles = {}
    for comp_name in competitor_names:
        comp_data = knowledge.get("competitors", {}).get(comp_name, {})
        votes = 0
        for k, v in overall_competitor_breakdown.items():
            if comp_name.lower() in k.lower():
                votes = max(votes, v)
        competitor_profiles[comp_name] = {
            "total_votes": votes,
            "vote_pct": round(votes / total_votes * 100, 1) if total_votes else 0,
            "research": comp_data,
        }

    return {
        "product": product,
        "summary": {
            "total_personas": len(personas),
            "total_votes": total_votes,
            "clusters": len(clusters),
            "overall_votes": {
                "product": {
                    "name": product_name,
                    "count": total_product,
                    "pct": round(total_product / total_votes * 100, 1) if total_votes else 0,
                },
                "competitors": {
                    "total": total_competitor,
                    "total_pct": round(total_competitor / total_votes * 100, 1) if total_votes else 0,
                    "breakdown": [
                        {"name": name, "count": count, "pct": round(count / total_votes * 100, 1)}
                        for name, count in overall_competitor_breakdown.most_common()
                    ],
                },
                "pass": {
                    "count": total_pass,
                    "pct": round(total_pass / total_votes * 100, 1) if total_votes else 0,
                },
            },
        },
        "competitor_analysis": competitor_profiles,
        "clusters": cluster_reports,
    }


def _analyze_cluster(cluster: dict, decisions: list[dict], chat_log: list[dict],
                     persona_map: dict, product_name: str) -> dict:
    label = cluster["label"]
    product_lower = product_name.lower()

    vote_counts = Counter()
    product_voters = []
    competitor_voters = []
    pass_voters = []

    for d in decisions:
        pid = d.get("persona_id")
        persona = persona_map.get(pid, {})
        choice = d.get("after", "pass")
        reason = d.get("reason", "")

        voter = {
            "name": d.get("name", "Unknown"),
            "persona_id": pid,
            "choice": choice,
            "reason": reason,
            "age": persona.get("age"),
            "job_title": persona.get("job_title"),
            "industry": persona.get("industry"),
            "province": persona.get("province"),
        }

        if product_lower in choice.lower():
            vote_counts["product"] += 1
            product_voters.append(voter)
        elif choice.lower() == "pass":
            vote_counts["pass"] += 1
            pass_voters.append(voter)
        else:
            vote_counts[choice] += 1
            competitor_voters.append(voter)

    competitor_breakdown = Counter()
    for v in competitor_voters:
        competitor_breakdown[v["choice"]] += 1

    total_votes = vote_counts["product"] + len(competitor_voters) + vote_counts["pass"]

    return {
        "cluster_id": cluster["cluster_id"],
        "label": label,
        "size": len(cluster["persona_ids"]),
        "total_votes": total_votes,
        "vote_summary": {
            "product": {
                "name": product_name,
                "count": vote_counts["product"],
                "pct": round(vote_counts["product"] / total_votes * 100, 1) if total_votes else 0,
            },
            "competitors": {
                "total": len(competitor_voters),
                "total_pct": round(len(competitor_voters) / total_votes * 100, 1) if total_votes else 0,
                "breakdown": [
                    {"name": name, "count": count, "pct": round(count / total_votes * 100, 1)}
                    for name, count in competitor_breakdown.most_common()
                ],
            },
            "pass": {
                "count": vote_counts["pass"],
                "pct": round(vote_counts["pass"] / total_votes * 100, 1) if total_votes else 0,
            },
        },
        "reasoning": {
            "product_reasons": [v["reason"] for v in product_voters if v["reason"]],
            "competitor_reasons": [
                {"choice": v["choice"], "reason": v["reason"], "name": v["name"], "job_title": v["job_title"]}
                for v in competitor_voters if v["reason"]
            ],
            "pass_reasons": [v["reason"] for v in pass_voters if v["reason"]],
        },
        "individual_decisions": [
            {"name": v["name"], "choice": v["choice"], "reason": v["reason"],
             "job_title": v["job_title"], "province": v["province"], "age": v["age"]}
            for v in product_voters + competitor_voters + pass_voters
        ],
        "chat_messages": len(chat_log),
    }


# ── Save outputs ─────────────────────────────────────────────────────────

def _save_outputs(knowledge: dict, report: dict):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_DIR / "knowledge.json", "w", encoding="utf-8") as f:
        json.dump(knowledge, f, indent=2, ensure_ascii=False)
    with open(OUTPUT_DIR / "chat_log.json", "w", encoding="utf-8") as f:
        json.dump(CHAT_LOGS, f, indent=2, ensure_ascii=False)
    with open(OUTPUT_DIR / "decisions.json", "w", encoding="utf-8") as f:
        json.dump(DECISIONS, f, indent=2, ensure_ascii=False)
    with open(OUTPUT_DIR / "report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print("Saved knowledge.json, chat_log.json, decisions.json, report.json to output/")


# ── Main ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="TinyUser server")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    print(f"\nOpen http://localhost:{args.port}")
    uvicorn.run(app, host="0.0.0.0", port=args.port, log_level="info")
