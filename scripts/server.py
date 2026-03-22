"""
TinyHuman — Unified Backend Server

Serves the full pipeline: research (Exa) → chat (Qwen on Modal) → report.
Single SSE stream for all phases.

Usage:
    python scripts/server.py
    python scripts/server.py --port 8000
"""

import asyncio
import json
import os
import random
import re
import sys
import time
import unicodedata
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

import modal
import uvicorn
from dotenv import load_dotenv
from exa_py import Exa
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI, OpenAI
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

message_queue: asyncio.Queue = asyncio.Queue()
chat_gate: asyncio.Event = asyncio.Event()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _log(event: str, **fields):
    timestamp = datetime.now().isoformat(timespec="seconds")
    if fields:
        payload = " ".join(
            f"{key}={json.dumps(value, ensure_ascii=False)}"
            for key, value in fields.items()
        )
        print(f"[{timestamp}] {event} {payload}", flush=True)
    else:
        print(f"[{timestamp}] {event}", flush=True)


# ── Load pre-computed data ───────────────────────────────────────────────

INTERESTS = [
    "bóng đá", "nấu ăn", "du lịch", "đọc sách", "chơi game",
    "nghe nhạc", "xem phim", "chụp ảnh", "tập gym", "câu cá",
    "trồng cây", "đan len", "chạy bộ", "yoga", "vẽ tranh",
    "chơi cờ", "nuôi thú cưng", "mua sắm online", "TikTok",
    "karaoke", "bơi lội", "cắm trại", "xe máy", "cà phê",
]


def load_data():
    global PERSONAS, CLUSTERS
    if PERSONAS and CLUSTERS:
        return

    with open(DATA_DIR / "personas.json", encoding="utf-8") as f:
        PERSONAS = json.load(f)
    with open(DATA_DIR / "clusters.json", encoding="utf-8") as f:
        cluster_data = json.load(f)
        CLUSTERS = cluster_data["clusters"]

    # Assign random interests to each persona
    for p in PERSONAS:
        if "interests" not in p:
            p["interests"] = random.sample(INTERESTS, k=random.randint(2, 3))

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
    global PIPELINE_RUNNING, PRODUCT, CHAT_LOGS, DECISIONS, REPORT, KNOWLEDGE
    if PIPELINE_RUNNING:
        return {"status": "already_running"}

    PRODUCT = {
        "name": body.get("name", ""),
        "url": body.get("url", ""),
        "description": body.get("description", body.get("name", "")),
    }
    KNOWLEDGE = {}
    CHAT_LOGS = {}
    DECISIONS = {}
    REPORT = {}
    PIPELINE_RUNNING = True
    _log("pipeline.start", product=PRODUCT["name"])

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
            data = json.load(f)
        if PRODUCT.get("name") and not _knowledge_matches_product(data, PRODUCT["name"]):
            return {"error": "No current knowledge available yet"}
        return data
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
        _log("pipeline.research.start", product=PRODUCT["name"])

        loop = asyncio.get_running_loop()
        knowledge = await asyncio.to_thread(_run_research, PRODUCT, loop)

        KNOWLEDGE = knowledge
        _log(
            "pipeline.research.complete",
            product=PRODUCT["name"],
            competitors=knowledge.get("competitor_names", []),
        )
        await message_queue.put({
            "type": "research_complete",
            "competitors": knowledge.get("competitor_names", []),
            "knowledge": knowledge,
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

        # Summarize top reasons for the winner
        try:
            all_reasons = []
            for c in report.get("clusters", []):
                reasoning = c.get("reasoning", {})
                all_reasons.extend(reasoning.get("product_reasons", []))
                for cv in reasoning.get("competitor_reasons", []):
                    all_reasons.append(f"{cv.get('choice', '')}: {cv.get('reason', '')}")

            if all_reasons:
                reasons_text = "\n".join(all_reasons[:20])
                summary = await _llm_chat([
                    {"role": "system", "content": "Tóm tắt thành 3 lý do ngắn gọn (mỗi lý do 3-5 từ tiếng Việt) tại sao sản phẩm được chọn nhiều nhất. Trả lời dạng JSON: [\"lý do 1\", \"lý do 2\", \"lý do 3\"]"},
                    {"role": "user", "content": f"Các lý do vote:\n{reasons_text}"},
                ], max_tokens=100, temperature=0.3)
                try:
                    report["top_reasons"] = json.loads(summary)
                except json.JSONDecodeError:
                    report["top_reasons"] = [summary]
        except Exception:
            pass

        REPORT = report
        _save_outputs(knowledge, report)
        _log("pipeline.report.ready", product=PRODUCT["name"])
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
    """Build hardcoded knowledge for demo mode (ACFC fashion research)."""
    product_name = product["name"]

    # ── Hardcoded ACFC product data (from Exa research 2026-03-22) ────────
    demo_product = {
        "name": "Thời trang ACFC",
        "input_name": "Thời trang ACFC",
        "url": "",
        "description": "Thời trang ACFC",
        "overview": "ACFC Vietnam offers high-end fashion from international brands, serving as an official distributor of top fashion brands in Vietnam.",
        "services": [
            "Official distributor of international fashion brands",
            "New collections updated weekly",
            "Membership benefits including discounts",
        ],
        "features": [
            "Official distributor of international fashion brands",
            "New collections updated weekly",
            "Membership benefits including discounts",
        ],
        "price_range": "Premium / high-end",
        "pricing": "Premium / high-end",
        "recent_announcements": [
            "Premium Privileges: Free shipping for ACFC members on qualifying purchases",
            "New arrivals including Calvin Klein and Tommy Hilfiger collections",
        ],
        "recent_news": [
            "Premium Privileges: Free shipping for ACFC members on qualifying purchases",
            "New arrivals including Calvin Klein and Tommy Hilfiger collections",
        ],
        "sources": [
            "https://www.acfc.com.vn/",
            "https://www.acfc.com.vn/nam.html",
            "https://www.acfc.com.vn/nu/trang-phuc-nu.html",
            "https://www.acfc.com.vn/new-collection.html",
            "https://www.acfc.com.vn/promotion.html",
            "https://www.acfc.com.vn/blog",
        ],
    }

    # ── Hardcoded competitor data ─────────────────────────────────────────
    demo_competitors = {
        "NEM": {
            "name": "NEM",
            "overview": "NEM is a leading fashion brand in Vietnam, offering a wide range of stylish apparel for women.",
            "services": [
                "Wide range of stylish apparel for women",
                "Empowering women through fashion and beauty",
                "Various sizes and colors available",
            ],
            "features": [
                "Wide range of stylish apparel for women",
                "Empowering women through fashion and beauty",
                "Various sizes and colors available",
            ],
            "price_range": "1,500,000₫ - 3,000,000₫",
            "pricing": "1,500,000₫ - 3,000,000₫",
            "recent_announcements": [
                "Sale 50% on selected items",
                "New arrivals including dresses and tops",
                "Sale 70% on selected items",
            ],
            "sources": [
                "https://nemshop.vn/",
                "https://nemfashionstore.com/",
            ],
            "why_competitor": "NEM is a leading fashion brand in Vietnam, offering a wide range of stylish apparel.",
        },
        "Thời Trang Vanfa": {
            "name": "Thời Trang Vanfa",
            "overview": "Thời Trang Vanfa is a Retail Apparel and Fashion company based in Vietnam, specializing in manufacturing fashionable clothing including T-shirts, uniforms, and antibacterial masks.",
            "services": [
                "Manufacturing fashionable T-shirts",
                "Uniforms",
                "Antibacterial masks",
            ],
            "features": [
                "Manufacturing fashionable T-shirts",
                "Uniforms",
                "Antibacterial masks",
            ],
            "price_range": "Up to 400,000 VND for T-shirts",
            "pricing": "Up to 400,000 VND for T-shirts",
            "recent_announcements": [
                "New cotton T-shirts priced under 400,000 VND",
            ],
            "sources": [
                "https://vanfa.vn/",
                "https://vanfabeauty.com/collections/all",
            ],
            "why_competitor": "Thời Trang Vanfa specializes in fashionable clothing and has a strong presence in the Vietnamese market.",
        },
        "Thời trang công sở Andora": {
            "name": "Thời trang công sở Andora",
            "overview": "Thời trang công sở Andora is a retail company specializing in modern and trendy office fashion for women, offering dresses, pants, skirts, shoes, and accessories.",
            "services": [
                "Designs modern and trendy office wear for women",
                "Wide range of products including dresses, pants, skirts, shoes, and accessories",
                "Online retail platform for women's office fashion",
            ],
            "features": [
                "Designs modern and trendy office wear for women",
                "Wide range of products including dresses, pants, skirts, shoes, and accessories",
                "Online retail platform for women's office fashion",
            ],
            "price_range": "Mid-range",
            "pricing": "Mid-range",
            "recent_announcements": [
                "New bodycon dress - FLORA DRESS",
                "Maxi dress with body-hugging design - A0404DB",
                "Silk blouse with bow collar - DORIS TOP",
            ],
            "sources": [
                "https://andora.com.vn/",
                "https://andora.com.vn/thoi-trang-nu/",
            ],
            "why_competitor": "Andora focuses on modern and trendy office wear for women, appealing to a similar customer segment.",
        },
    }

    # Build knowledge structure matching what the chat simulation expects
    competitors_data = {}
    for comp_name in competitor_names:
        competitors_data[comp_name] = demo_competitors.get(comp_name, {
            "name": comp_name,
            "overview": f"{comp_name} is a competitor in the Vietnamese fashion market.",
            "services": ["Fashion retail"],
            "features": ["Fashion retail"],
            "price_range": "Various",
            "pricing": "Various",
            "recent_announcements": [],
            "sources": [],
        })

    # Use real product data if the product is ACFC; otherwise fall back to generic
    effective_product = demo_product if "acfc" in product_name.lower() else {
        "name": product_name,
        "description": product.get("description", ""),
        "overview": product.get("description", product_name),
        "services": [],
        "features": [],
        "price_range": "",
        "pricing": "",
        "recent_announcements": [],
        "sources": [],
    }

    # Build summary text
    summary_parts = [f"=== {effective_product['name']} ==="]
    if effective_product.get("overview"):
        summary_parts.append(f"Overview: {effective_product['overview']}")
    if effective_product.get("services"):
        summary_parts.append(f"Services: {'; '.join(effective_product['services'])}")
    if effective_product.get("price_range"):
        summary_parts.append(f"Price range: {effective_product['price_range']}")

    competitor_selection = []
    for comp_name in competitor_names:
        comp = competitors_data[comp_name]
        competitor_selection.append({
            "name": comp_name,
            "why": comp.get("why_competitor", ""),
        })
        summary_parts.append(f"\n=== {comp_name} ===")
        if comp.get("why_competitor"):
            summary_parts.append(f"Why this competitor: {comp['why_competitor']}")
        if comp.get("overview"):
            summary_parts.append(f"Overview: {comp['overview']}")
        if comp.get("services"):
            svc = comp["services"]
            summary_parts.append(f"Services: {'; '.join(svc) if isinstance(svc, list) else svc}")
        if comp.get("price_range"):
            summary_parts.append(f"Price range: {comp['price_range']}")

    knowledge = {
        "product": effective_product,
        "competitors": competitors_data,
        "competitor_names": competitor_names,
        "competitor_selection": competitor_selection,
        "summary_text": "\n".join(summary_parts),
    }
    return knowledge


# ── Phase 1: Research (Exa) ──────────────────────────────────────────────

CURRENT_YEAR = datetime.now().year
COMPETITOR_NAME_STOPWORDS = {
    "about", "alternative", "alternatives", "announcement", "announcements",
    "best", "brand", "brands", "catalog", "collection", "collections",
    "comparison", "competitor", "competitors", "contact", "fashion",
    "feature", "features", "guide", "home", "latest", "lookbook", "news",
    "official", "overview", "price", "pricing", "product", "products",
    "review", "reviews", "sale", "service", "services", "shop", "site",
    "store", "top", "website",
}
IGNORED_COMPETITOR_DOMAINS = {
    "facebook", "google", "instagram", "linkedin", "reddit", "tiktok",
    "wikipedia", "x", "youtube",
}
PRODUCT_CONTEXT_SPLITTERS = [
    r"\s+for\s+",
    r"\s+in\s+",
    r"\s+across\s+",
    r"\s+within\s+",
    r"\s+targeting\s+",
    r"\s+focused on\s+",
    r"\s+built for\s+",
    r"\s+serving\s+",
]


def _run_research(product: dict, loop: asyncio.AbstractEventLoop) -> dict:
    """Run Exa research synchronously (called via asyncio.to_thread)."""
    _emit_sync.loop = loop
    research_started_at = time.perf_counter()
    api_key = os.environ.get("EXA_API_KEY")
    if not api_key:
        raise ValueError("EXA_API_KEY not set")
    exa = Exa(api_key=api_key)

    # Search 1: understand the inputted product/store first.
    _log("research.stage.start", stage="product_profile", product=product["name"])
    _emit_sync({"type": "research_progress", "step": "researching_product", "name": product["name"]})
    product_profile, product_info, product_trace = _search_product_profile(exa, product)
    _log(
        "research.stage.done",
        stage="product_profile",
        product=product["name"],
        elapsed_s=round(time.perf_counter() - research_started_at, 2),
        queries=product_trace.get("queries", []),
    )

    # Search 2: discover the top competitors from the product context.
    competitors_started_at = time.perf_counter()
    _log("research.stage.start", stage="competitor_discovery", product=product["name"])
    _emit_sync({"type": "research_progress", "step": "discovering_competitors"})
    competitors, competitor_trace = _discover_competitors(
        exa, product, product_profile, max_competitors=3
    )
    competitor_names = [item["name"] for item in competitors]
    _log(
        "research.stage.done",
        stage="competitor_discovery",
        product=product["name"],
        elapsed_s=round(time.perf_counter() - competitors_started_at, 2),
        competitors=competitor_names,
        queries=competitor_trace.get("queries", []),
    )
    _emit_sync({"type": "research_progress", "step": "competitors_found", "competitors": competitor_names})

    # Search 3: deep-dive each competitor for services, pricing, and recent announcements.
    competitor_info = {}
    competitor_traces = {}
    if competitors:
        deep_dive_started_at = time.perf_counter()
        _log("research.stage.start", stage="competitor_deep_dive", competitors=competitor_names)
        with ThreadPoolExecutor(max_workers=min(3, len(competitors))) as executor:
            future_to_competitor = {}
            for competitor in competitors:
                comp_name = competitor["name"]
                _emit_sync({"type": "research_progress", "step": "researching_competitor", "name": comp_name})
                _log("research.competitor.start", competitor=comp_name)
                future = executor.submit(
                    _research_entity_with_fresh_client,
                    comp_name,
                    product_profile,
                    competitor.get("why", ""),
                )
                future_to_competitor[future] = competitor

            for future in as_completed(future_to_competitor):
                competitor = future_to_competitor[future]
                comp_name = competitor["name"]
                try:
                    info, trace = future.result()
                except Exception as exc:
                    _log("research.competitor.error", competitor=comp_name, error=str(exc))
                    info = _normalize_entity_info(comp_name, {})
                    trace = {"queries": [], "results": []}
                info["why_competitor"] = competitor.get("why", "")
                competitor_info[comp_name] = info
                competitor_traces[comp_name] = {
                    **trace,
                    "label": f"Search 3: {comp_name} competitor deep dive",
                }
                _log(
                    "research.competitor.done",
                    competitor=comp_name,
                    queries=trace.get("queries", []),
                )
        _log(
            "research.stage.done",
            stage="competitor_deep_dive",
            competitors=competitor_names,
            elapsed_s=round(time.perf_counter() - deep_dive_started_at, 2),
        )

    research_trace = {
        "search_1": {
            **product_trace,
            "label": "Search 1: product discovery",
        },
        "search_2": {
            **competitor_trace,
            "label": "Search 2: competitor discovery",
            "selected_competitors": competitors,
        },
        "search_3": competitor_traces,
    }

    return _build_knowledge_base(
        product=product,
        product_profile=product_profile,
        competitors=competitors,
        product_info=product_info,
        competitor_info=competitor_info,
        research_trace=research_trace,
    )


def _emit_sync(msg: dict):
    """Put a message on the async queue from a sync thread."""
    _emit_sync.loop.call_soon_threadsafe(message_queue.put_nowait, msg)


def _research_entity_with_fresh_client(
    name: str,
    product_profile: dict,
    focus_note: str = "",
) -> tuple[dict, dict]:
    api_key = os.environ.get("EXA_API_KEY")
    if not api_key:
        raise ValueError("EXA_API_KEY not set")
    exa = Exa(api_key=api_key)
    return _research_entity(exa, name, product_profile, focus_note=focus_note)


def _search_product_profile(exa: Exa, product: dict) -> tuple[dict, dict, dict]:
    queries = _build_product_search_queries(product)
    trace = _run_search_stage(
        exa,
        queries,
        num_results=5,
        max_saved_hits=3,
        progress_label=f"Searching web for {product.get('name', '')}",
    )
    input_aliases = _derive_product_aliases(product)

    default_profile = {
        "canonical_name": input_aliases[0] if input_aliases else (product.get("name") or "").strip(),
        "overview": (product.get("description") or product.get("name") or "").strip(),
        "entity_type": "",
        "category": "",
        "location_focus": "",
        "customer_segment": "",
        "services": [],
        "price_range": "",
        "recent_announcements": [],
        "competitor_search_seed": input_aliases[0] if input_aliases else (product.get("description") or product.get("name") or "").strip(),
    }
    search_context = _search_trace_to_text(trace)
    profile = _llm_json_sync(
        messages=[
            {
                "role": "system",
                "content": (
                    "You extract structured market research context from Exa web search results. "
                    "Use only the supplied evidence. Output valid JSON only."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Today is {datetime.now().date().isoformat()}.\n"
                    f"User inputted product/store: {product.get('name', '')}\n"
                    f"Description/context: {product.get('description', '')}\n\n"
                    f"Input aliases to consider: {json.dumps(input_aliases, ensure_ascii=False)}\n\n"
                    f"Search 1 results:\n{search_context}\n\n"
                    "Return JSON with keys:\n"
                    "{\n"
                    '  "canonical_name": "",\n'
                    '  "overview": "",\n'
                    '  "entity_type": "",\n'
                    '  "category": "",\n'
                    '  "location_focus": "",\n'
                    '  "customer_segment": "",\n'
                    '  "services": [],\n'
                    '  "price_range": "",\n'
                    '  "recent_announcements": [],\n'
                    '  "competitor_search_seed": ""\n'
                    "}\n"
                    "Rules: canonical_name must be a specific store/brand/product only if clearly supported by the search results. "
                    "If the user input mixes a product name with market qualifiers or descriptors, keep canonical_name to the shortest specific product/brand phrase supported by the evidence and put the broader descriptor into competitor_search_seed. "
                    "If unclear, keep it close to the original input. services and recent_announcements should be short bullet-like phrases."
                ),
            },
        ],
        default=default_profile,
        max_tokens=650,
        label=f"product_profile:{product.get('name', '')}",
    )

    profile = {
        **default_profile,
        **(profile if isinstance(profile, dict) else {}),
    }
    profile["canonical_name"] = _coerce_text(profile.get("canonical_name")) or default_profile["canonical_name"]
    profile["overview"] = _coerce_text(profile.get("overview")) or default_profile["overview"]
    profile["entity_type"] = _coerce_text(profile.get("entity_type"))
    profile["category"] = _coerce_text(profile.get("category"))
    profile["location_focus"] = _coerce_text(profile.get("location_focus"))
    profile["customer_segment"] = _coerce_text(profile.get("customer_segment"))
    profile["services"] = _coerce_list(profile.get("services"))
    profile["price_range"] = _coerce_text(profile.get("price_range"))
    profile["recent_announcements"] = _coerce_list(profile.get("recent_announcements"))
    profile["competitor_search_seed"] = (
        _coerce_text(profile.get("competitor_search_seed"))
        or profile["category"]
        or default_profile["competitor_search_seed"]
    )

    product_info = _normalize_entity_info(profile["canonical_name"] or product["name"], profile)
    if not product_info["overview"]:
        product_info["overview"] = default_profile["overview"]
    product_info["sources"] = _collect_sources_from_trace(trace)

    return profile, product_info, trace


def _discover_competitors(
    exa: Exa,
    product: dict,
    product_profile: dict,
    max_competitors: int,
) -> tuple[list[dict], dict]:
    queries = _build_competitor_search_queries(product, product_profile)
    trace = _run_search_stage(
        exa,
        queries,
        num_results=5,
        max_saved_hits=4,
        progress_label=f"Finding competitors for {product.get('name', '')}",
    )

    fallback_names = _heuristic_competitors_from_trace(trace, product["name"], max_competitors)
    default_payload = {
        "competitors": [{"name": name, "why": ""} for name in fallback_names],
    }
    search_context = _search_trace_to_text(trace, max_queries=4, max_hits=4, max_chars=420)
    payload = _llm_json_sync(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are selecting direct competitors from Exa search results. "
                    "Use only the supplied evidence. Output valid JSON only."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Product/store input: {product.get('name', '')}\n"
                    f"Canonical product context: {json.dumps(product_profile, ensure_ascii=False)}\n\n"
                    f"Search 2 results:\n{search_context}\n\n"
                    "Return JSON with this shape:\n"
                    '{ "competitors": [ {"name": "", "why": ""}, {"name": "", "why": ""}, {"name": "", "why": ""} ] }\n'
                    "Rules: choose up to 3 real competitors that customers would reasonably compare against. "
                    "Do not include media sites, directories, or the product itself. why should be one short sentence."
                ),
            },
        ],
        default=default_payload,
        max_tokens=450,
        label=f"competitor_discovery:{product.get('name', '')}",
    )

    candidates = _normalize_competitor_candidates(
        payload if isinstance(payload, dict) else default_payload,
        product["name"],
        max_competitors,
    )
    if len(candidates) < max_competitors:
        seen = {item["name"].lower() for item in candidates}
        for name in fallback_names:
            if name.lower() in seen:
                continue
            candidates.append({"name": name, "why": ""})
            seen.add(name.lower())
            if len(candidates) >= max_competitors:
                break

    return candidates[:max_competitors], trace


def _research_entity(
    exa: Exa,
    name: str,
    product_profile: dict,
    focus_note: str = "",
) -> tuple[dict, dict]:
    queries = _build_entity_search_queries(name, product_profile)
    trace = _run_search_stage(
        exa,
        queries,
        num_results=4,
        max_saved_hits=3,
        progress_label=f"Searching web for {name}",
    )
    search_context = _search_trace_to_text(trace, max_queries=3, max_hits=3, max_chars=420)

    default_payload = {
        "overview": focus_note,
        "services": [],
        "price_range": "",
        "recent_announcements": [],
    }
    payload = _llm_json_sync(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are summarizing competitor research from Exa search results. "
                    "Use only the supplied evidence. Output valid JSON only."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Target competitor: {name}\n"
                    f"Product context: {json.dumps(product_profile, ensure_ascii=False)}\n"
                    f"Why it was selected: {focus_note}\n\n"
                    f"Search 3 results:\n{search_context}\n\n"
                    "Return JSON with keys:\n"
                    "{\n"
                    '  "overview": "",\n'
                    '  "services": [],\n'
                    '  "price_range": "",\n'
                    '  "recent_announcements": []\n'
                    "}\n"
                    "Rules: services should describe what the competitor sells or offers. "
                    "price_range should be concise. recent_announcements should be short bullet-like phrases."
                ),
            },
        ],
        default=default_payload,
        max_tokens=500,
        label=f"competitor_summary:{name}",
    )

    info = _normalize_entity_info(name, payload if isinstance(payload, dict) else default_payload)
    if focus_note and not info["overview"]:
        info["overview"] = focus_note
    info["sources"] = _collect_sources_from_trace(trace)
    return info, trace


def _build_knowledge_base(
    product: dict,
    product_profile: dict,
    competitors: list[dict],
    product_info: dict,
    competitor_info: dict,
    research_trace: dict,
) -> dict:
    competitor_names = [item["name"] for item in competitors]
    knowledge = {
        "product": {
            "name": product_profile.get("canonical_name") or product["name"],
            "input_name": product["name"],
            "input_aliases": _derive_product_aliases(product),
            "url": product.get("url", ""),
            "description": product.get("description", ""),
            "overview": product_info.get("overview") or product.get("description", ""),
            "services": product_info.get("services", []),
            "features": product_info.get("features", []),
            "price_range": product_info.get("price_range", ""),
            "pricing": product_info.get("pricing"),
            "reviews": product_info.get("reviews"),
            "recent_announcements": product_info.get("recent_announcements", []),
            "recent_news": product_info.get("recent_news"),
            "sources": product_info.get("sources", []),
        },
        "competitors": competitor_info,
        "competitor_names": competitor_names,
        "competitor_selection": competitors,
        "research_trace": research_trace,
    }

    summary_parts = [f"=== {knowledge['product']['name']} ==="]
    if knowledge["product"].get("overview"):
        summary_parts.append(f"Overview: {_limit_text(knowledge['product']['overview'], 260)}")
    if knowledge["product"].get("services"):
        summary_parts.append(f"Services: {_limit_text(_coerce_text(knowledge['product']['services']), 220)}")
    if knowledge["product"].get("price_range"):
        summary_parts.append(f"Price range: {_limit_text(knowledge['product']['price_range'], 120)}")
    if knowledge["product"].get("recent_announcements"):
        summary_parts.append(
            f"Recent announcements: {_limit_text(_coerce_text(knowledge['product']['recent_announcements']), 180)}"
        )

    for competitor in competitors:
        comp_name = competitor["name"]
        comp_data = competitor_info.get(comp_name, {})
        summary_parts.append(f"\n=== {comp_name} ===")
        if competitor.get("why"):
            summary_parts.append(f"Why this competitor: {_limit_text(competitor['why'], 160)}")
        if comp_data.get("overview"):
            summary_parts.append(f"Overview: {_limit_text(comp_data['overview'], 220)}")
        if comp_data.get("services"):
            summary_parts.append(f"Services: {_limit_text(_coerce_text(comp_data['services']), 180)}")
        if comp_data.get("price_range"):
            summary_parts.append(f"Price range: {_limit_text(comp_data['price_range'], 100)}")
        if comp_data.get("recent_announcements"):
            summary_parts.append(
                f"Recent announcements: {_limit_text(_coerce_text(comp_data['recent_announcements']), 150)}"
            )

    knowledge["summary_text"] = "\n".join(summary_parts)
    return knowledge


def _build_product_search_queries(product: dict) -> list[str]:
    aliases = _derive_product_aliases(product)
    base_query = aliases[0] if aliases else _product_query_text(product)
    secondary_query = next((alias for alias in aliases[1:] if alias.lower() != base_query.lower()), "")
    domains = _extract_domains_from_product(product)

    queries = []
    for domain in domains:
        queries.append(f"{domain} {base_query}".strip())
    queries.extend([
        base_query,
        f"{base_query} official store services price range".strip(),
        f"{base_query} recent announcements news {CURRENT_YEAR}".strip(),
    ])
    if secondary_query:
        queries.extend([
            secondary_query,
            f"{secondary_query} official website product".strip(),
        ])
    return _unique_nonempty(queries)


def _build_competitor_search_queries(product: dict, product_profile: dict) -> list[str]:
    canonical_name = product_profile.get("canonical_name") or product["name"]
    seed = (
        product_profile.get("competitor_search_seed")
        or product_profile.get("category")
        or _product_query_text(product)
    )
    location = _coerce_text(product_profile.get("location_focus"))
    entity_hint = f"{product_profile.get('entity_type', '')} {seed}".lower()

    queries = [
        f"{canonical_name} competitors".strip(),
        f"alternatives to {canonical_name}".strip(),
    ]

    if seed:
        if any(word in entity_hint for word in ["fashion", "store", "boutique", "brand", "apparel"]):
            queries.append(f"brands like {canonical_name}".strip())
            queries.append(f"best {seed} {location}".strip())
        else:
            queries.append(f"top {seed} competitors {location}".strip())
            queries.append(f"{seed} alternatives".strip())

    return _unique_nonempty(queries)


def _build_entity_search_queries(name: str, product_profile: dict) -> list[str]:
    context_bits = [
        _coerce_text(product_profile.get("category")),
        _coerce_text(product_profile.get("location_focus")),
    ]
    context = " ".join(bit for bit in context_bits if bit).strip()

    queries = [
        f"{name} {context} services products categories".strip(),
        f"{name} {context} price range pricing".strip(),
        f"{name} recent announcements news {CURRENT_YEAR}".strip(),
    ]
    return _unique_nonempty(queries)


def _run_search_stage(
    exa: Exa,
    queries: list[str],
    num_results: int = 5,
    max_saved_hits: int = 3,
    progress_label: str = "",
) -> dict:
    stage_results = []
    unique_queries = _unique_nonempty(queries)
    total_queries = len(unique_queries)

    for index, query in enumerate(unique_queries, start=1):
        if progress_label:
            _emit_sync({
                "type": "research_progress",
                "step": "web_search_query",
                "label": progress_label,
                "query": query,
                "current": index,
                "total": total_queries,
            })
        query_started_at = time.perf_counter()
        _log(
            "research.query.start",
            label=progress_label,
            index=index,
            total=total_queries,
            query=query,
        )
        hits = _exa_search(exa, query, num_results=num_results)
        _log(
            "research.query.done",
            label=progress_label,
            index=index,
            total=total_queries,
            query=query,
            hits=len(hits),
            elapsed_s=round(time.perf_counter() - query_started_at, 2),
        )
        stage_results.append({
            "query": query,
            "hits": hits[:max_saved_hits],
        })
    return {
        "queries": [item["query"] for item in stage_results],
        "results": stage_results,
    }


def _exa_search(exa: Exa, query: str, num_results: int = 5) -> list[dict]:
    try:
        response = exa.search(query, num_results=num_results)
    except Exception as exc:
        print(f"Exa search failed for {query!r}: {exc}", file=sys.stderr)
        return []

    hits = []
    for result in getattr(response, "results", []) or []:
        title = _clean_snippet(getattr(result, "title", "") or "", limit=180)
        url = (getattr(result, "url", "") or "").strip()
        text = _clean_snippet(getattr(result, "text", "") or "", limit=900)
        if not any([title, url, text]):
            continue
        hits.append({
            "title": title,
            "url": url,
            "text": text,
        })
    return hits


def _llm_json_sync(messages: list[dict], default, max_tokens: int = 500, label: str = ""):
    if not os.environ.get("OPENAI_API_KEY"):
        _log("research.llm.skip", label=label, reason="OPENAI_API_KEY missing")
        return default

    started_at = time.perf_counter()
    _log("research.llm.start", label=label, max_tokens=max_tokens)
    try:
        response = research_client.chat.completions.create(
            model=RESEARCH_MODEL,
            messages=messages,
            max_tokens=max_tokens,
            temperature=0.2,
        )
        content = (response.choices[0].message.content or "").strip()
        parsed = _parse_json_response(content)
        _log(
            "research.llm.done",
            label=label,
            elapsed_s=round(time.perf_counter() - started_at, 2),
            parsed=parsed is not None,
        )
        return default if parsed is None else parsed
    except Exception as exc:
        _log(
            "research.llm.error",
            label=label,
            elapsed_s=round(time.perf_counter() - started_at, 2),
            error=str(exc),
        )
        print(f"{RESEARCH_MODEL} research parse failed: {exc}", file=sys.stderr)
        return default


def _parse_json_response(text: str):
    cleaned = (text or "").strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```[a-zA-Z0-9_-]*\n?", "", cleaned)
        cleaned = re.sub(r"\n?```$", "", cleaned).strip()

    for candidate in (cleaned,):
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            pass

    for opener, closer in (("{", "}"), ("[", "]")):
        start = cleaned.find(opener)
        end = cleaned.rfind(closer)
        if start == -1 or end == -1 or end <= start:
            continue
        try:
            return json.loads(cleaned[start:end + 1])
        except json.JSONDecodeError:
            continue
    return None


def _search_trace_to_text(
    trace: dict,
    max_queries: int = 4,
    max_hits: int = 3,
    max_chars: int = 500,
) -> str:
    blocks = []
    for entry in (trace.get("results") or [])[:max_queries]:
        lines = [f"Query: {entry.get('query', '')}"]
        for index, hit in enumerate((entry.get("hits") or [])[:max_hits], start=1):
            title = hit.get("title") or "(no title)"
            url = hit.get("url") or ""
            text = _limit_text(hit.get("text", ""), max_chars)
            lines.append(f"{index}. {title} | {url}\n{text}")
        blocks.append("\n".join(lines))
    return "\n\n".join(blocks)


def _normalize_competitor_candidates(payload: dict, product_name: str, limit: int) -> list[dict]:
    raw_items = payload.get("competitors") if isinstance(payload, dict) else []
    normalized = []
    seen = set()

    if not isinstance(raw_items, list):
        raw_items = []

    for item in raw_items:
        if isinstance(item, str):
            candidate = item
            why = ""
        elif isinstance(item, dict):
            candidate = item.get("name", "")
            why = _coerce_text(item.get("why"))
        else:
            continue

        candidate = _clean_candidate_name(candidate)
        if not _is_valid_competitor_name(candidate, product_name):
            continue

        candidate_key = candidate.lower()
        if candidate_key in seen:
            continue

        normalized.append({
            "name": candidate,
            "why": why,
        })
        seen.add(candidate_key)

        if len(normalized) >= limit:
            break

    return normalized


def _heuristic_competitors_from_trace(trace: dict, product_name: str, limit: int) -> list[str]:
    counts = Counter()

    for entry in trace.get("results", []):
        for hit in entry.get("hits", []):
            for candidate in _extract_competitor_candidates(hit, product_name):
                counts[candidate] += 1

    return [name for name, _ in counts.most_common(limit)]


def _extract_competitor_candidates(hit: dict, product_name: str) -> list[str]:
    candidates = set()

    for field in ("title", "text"):
        value = hit.get(field) or ""
        matches = re.findall(
            r"\b(?:[A-Z][A-Za-z0-9&'.-]*|[A-Z]{2,})(?:\s+(?:[A-Z][A-Za-z0-9&'.-]*|[A-Z]{2,})){0,3}\b",
            value,
        )
        for match in matches:
            candidate = _clean_candidate_name(match)
            if _is_valid_competitor_name(candidate, product_name):
                candidates.add(candidate)

    domain_candidate = _candidate_from_url(hit.get("url", ""))
    if _is_valid_competitor_name(domain_candidate, product_name):
        candidates.add(domain_candidate)

    return list(candidates)


def _normalize_entity_info(name: str, data: dict) -> dict:
    services = _coerce_list(data.get("services") or data.get("features"))
    price_range = _coerce_text(data.get("price_range") or data.get("pricing"))
    recent_announcements = _coerce_list(
        data.get("recent_announcements") or data.get("recent_news")
    )
    overview = _coerce_text(data.get("overview"))

    return {
        "name": name,
        "overview": overview,
        "services": services,
        "features": services,
        "price_range": price_range,
        "pricing": price_range,
        "recent_announcements": recent_announcements,
        "recent_news": recent_announcements,
        "reviews": services,
        "sources": _unique_nonempty(data.get("sources") or []),
    }


def _collect_sources_from_trace(trace: dict, max_sources: int = 6) -> list[str]:
    sources = []
    seen = set()

    for entry in trace.get("results", []):
        for hit in entry.get("hits", []):
            url = (hit.get("url") or "").strip()
            if not url or url in seen:
                continue
            sources.append(url)
            seen.add(url)
            if len(sources) >= max_sources:
                return sources

    return sources


def _product_query_text(product: dict) -> str:
    aliases = _derive_product_aliases(product)
    if aliases:
        return aliases[0]

    name = (product.get("name") or "").strip()
    description = (product.get("description") or "").strip()

    if description and name and description.lower() != name.lower():
        return f"{name} {description}".strip()
    return name or description


def _shorten_product_phrase(value: str) -> str:
    text = _coerce_text(value)
    if not text:
        return ""

    shortened = re.split(r"\s*(?:\||:| - | — | – )\s*", text, maxsplit=1)[0].strip()
    for pattern in PRODUCT_CONTEXT_SPLITTERS:
        parts = re.split(pattern, shortened, maxsplit=1, flags=re.IGNORECASE)
        shortened = parts[0].strip()

    return _clean_candidate_name(shortened)


def _derive_product_aliases(product: dict) -> list[str]:
    aliases = []

    for value in (product.get("name", ""), product.get("description", "")):
        text = _coerce_text(value)
        if not text:
            continue

        shortened = _shorten_product_phrase(text)
        if shortened and shortened.lower() != text.lower():
            aliases.append(shortened)
        aliases.append(text)

    for value in (product.get("url", ""), product.get("name", ""), product.get("description", "")):
        text = value or ""
        for match in re.findall(r"https?://[^\s)]+", text):
            domain_alias = _candidate_from_url(match)
            if domain_alias:
                aliases.append(domain_alias)

    return _unique_nonempty(aliases)


def _extract_domains_from_product(product: dict) -> list[str]:
    values = [
        product.get("url", ""),
        product.get("name", ""),
        product.get("description", ""),
    ]
    domains = []
    seen = set()

    for value in values:
        text = value or ""
        for match in re.findall(r"https?://[^\s)]+", text):
            parsed = urlparse(match)
            netloc = parsed.netloc.lower().lstrip("www.")
            if netloc and netloc not in seen:
                domains.append(netloc)
                seen.add(netloc)

    return domains


def _candidate_from_url(url: str) -> str:
    if not url:
        return ""

    parsed = urlparse(url)
    host = parsed.netloc.lower().lstrip("www.")
    if not host:
        return ""

    stem = host.split(".")[0]
    if stem in IGNORED_COMPETITOR_DOMAINS or len(stem) <= 2:
        return ""

    return stem.replace("-", " ").title()


def _clean_candidate_name(value: str) -> str:
    cleaned = re.sub(r"\s+", " ", value or "").strip(" \t\r\n-–—|:,.;")
    return cleaned


def _is_valid_competitor_name(candidate: str, product_name: str) -> bool:
    if not candidate or len(candidate) < 2 or len(candidate) > 40:
        return False

    candidate_lower = candidate.lower()
    product_lower = (product_name or "").lower()

    if not re.search(r"[A-Za-z]", candidate):
        return False
    if candidate_lower == product_lower:
        return False
    if candidate_lower in product_lower or product_lower in candidate_lower:
        return False

    words = [word for word in re.split(r"\s+", candidate_lower) if word]
    if words and all(word in COMPETITOR_NAME_STOPWORDS for word in words):
        return False

    return True


def _coerce_list(value, max_items: int = 6) -> list[str]:
    if isinstance(value, list):
        items = value
    elif isinstance(value, str):
        items = re.split(r"\n+|;|\u2022|\|", value)
    else:
        items = []

    normalized = []
    seen = set()
    for item in items:
        text = _coerce_text(item)
        if not text:
            continue
        key = text.lower()
        if key in seen:
            continue
        normalized.append(text)
        seen.add(key)
        if len(normalized) >= max_items:
            break
    return normalized


def _coerce_text(value) -> str:
    if isinstance(value, list):
        return "; ".join(part for part in (_coerce_text(v) for v in value) if part)
    if value is None:
        return ""
    return str(value).strip()


def _clean_snippet(text: str, limit: int = 600) -> str:
    cleaned = re.sub(r"\s+", " ", text or "").strip()
    return cleaned[:limit]


def _limit_text(value: str, limit: int) -> str:
    text = _coerce_text(value)
    if len(text) <= limit:
        return text
    return text[: limit - 3].rstrip() + "..."


def _unique_nonempty(values) -> list[str]:
    unique = []
    seen = set()

    for value in values:
        text = _coerce_text(value)
        if not text:
            continue
        key = text.lower()
        if key in seen:
            continue
        unique.append(text)
        seen.add(key)

    return unique


def _knowledge_matches_product(knowledge: dict, requested_name: str) -> bool:
    product = knowledge.get("product") or {}
    candidates = [
        product.get("input_name", ""),
        product.get("name", ""),
        *(_coerce_list(product.get("input_aliases"))),
        requested_name,
    ]
    normalized = [_normalize_product_label(value) for value in candidates if value]
    if len(normalized) < 2:
        return True

    requested = normalized[-1]
    for candidate in normalized[:-1]:
        if not candidate:
            continue
        if candidate == requested:
            return True
        if candidate in requested or requested in candidate:
            return True
    return False


def _normalize_product_label(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value or "")
    normalized = "".join(ch for ch in normalized if unicodedata.category(ch) != "Mn")
    normalized = normalized.replace("đ", "d").replace("Đ", "D")
    return re.sub(r"[^a-z0-9]+", "", normalized.casefold())


# ── Phase 2: Chat Simulation (GPT-4o-mini) ──────────────────────────────

RESEARCH_MODEL = "gpt-4o-mini"
research_client = OpenAI()
openai_client = AsyncOpenAI()

MODEL = RESEARCH_MODEL
MAX_CHAT_MEMBERS = 10  # chat participants per cluster


async def _llm_chat(
    messages: list[dict],
    max_tokens: int = 150,
    temperature: float = 0.9,
    presence_penalty: float = 0.0,
    frequency_penalty: float = 0.0,
) -> str:
    """Call GPT-4o-mini for a single chat completion."""
    try:
        resp = await openai_client.chat.completions.create(
            model=MODEL,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
            presence_penalty=presence_penalty,
            frequency_penalty=frequency_penalty,
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        print(f"{MODEL} error: {e}", file=sys.stderr)
        return ""


async def _llm_batch(
    all_messages: list[list[dict]],
    max_tokens: int = 150,
    temperature: float = 0.9,
    presence_penalty: float = 0.0,
    frequency_penalty: float = 0.0,
) -> list[str]:
    """Call LLM for multiple completions in parallel."""
    tasks = [
        _llm_chat(
            msgs,
            max_tokens=max_tokens,
            temperature=temperature,
            presence_penalty=presence_penalty,
            frequency_penalty=frequency_penalty,
        )
        for msgs in all_messages
    ]
    return await asyncio.gather(*tasks)


def _persona_voice_hint(persona: dict) -> str:
    age = str(persona.get("age", "")).strip()

    if age in {"18-24", "25-34"}:
        return "Giọng trẻ, nhanh, tự nhiên; có thể dùng 1 emoji hoặc 1 từ đệm đời thường, nhưng đừng quá lố."
    if age in {"35-44", "45-54"}:
        return "Giọng đời thường, rõ ràng, có chính kiến; hạn chế slang nặng."
    if age in {"55-64", "65+"}:
        return "Giọng mộc, ngắn gọn, thực tế; ưu tiên nhận xét chân thành hơn là bắt trend."
    return "Giọng chat tự nhiên, không kiểu quảng cáo."


def _format_chat_history(chat_history: list[dict], limit: int = 6) -> str:
    if not chat_history:
        return ""

    recent_messages = chat_history[-limit:]
    return "\n".join(f"{m['name']}: {m['message']}" for m in recent_messages)


def _pick_reply_target(chat_history: list[dict], persona_id: int) -> dict | None:
    recent_candidates = [m for m in reversed(chat_history[-4:]) if m["persona_id"] != persona_id]
    if not recent_candidates:
        return None
    return random.choice(recent_candidates)


def _clean_chat_message(raw_msg: str, speaker_name: str) -> str:
    lines = []
    for raw_line in raw_msg.strip().splitlines():
        line = raw_line.strip()
        if not line:
            continue
        line = re.sub(r"^[A-ZÀ-ỹ][A-ZÀ-ỹa-z0-9 .'-]{0,40}:\s*", "", line)
        if line:
            lines.append(line)

    msg = " ".join(lines).strip()
    msg = re.sub(r"\s+", " ", msg)

    speaker_prefix = re.escape(speaker_name)
    msg = re.sub(rf"^{speaker_prefix}:\s*", "", msg, flags=re.IGNORECASE)
    msg = re.sub(r"^(Ôi trời|OMG|Omg|Ủa|Nghe nói)\b[ ,!.-]*", "", msg).strip()

    if len(msg) > 280:
        msg = msg[:277].rstrip() + "..."

    return msg


def _build_chat_turn_messages(
    persona: dict,
    history_text: str,
    reply_target: dict | None,
    knowledge_summary: str,
) -> list[dict]:
    frustrations = ", ".join(persona.get("top_3_frustrations", []))
    interests = ", ".join(persona.get("interests", []))
    voice_hint = _persona_voice_hint(persona)

    system_msg = (
        f"Bạn là {persona.get('name', 'Unknown')}, {persona.get('age', '?')} tuổi, "
        f"{persona.get('job_title', '?')} ở {persona.get('province', '?')}.\n"
        f"Ngành: {persona.get('industry', '?')}\n"
        f"Thu nhập: {persona.get('income_bracket', '?')}\n"
        f"Sở thích: {interests}\n"
        f"Nỗi bức xúc: {frustrations}\n"
        f"Phong cách: {voice_hint}\n\n"
        f"Bạn đang chat trong một nhóm bạn bè bàn về {PRODUCT['name']} và các lựa chọn khác.\n"
        f"Thông tin sản phẩm để tham khảo:\n{knowledge_summary}\n\n"
        "Quy tắc:\n"
        "- Chỉ viết đúng 1 tin nhắn của riêng bạn, tối đa 2 câu.\n"
        "- Phải phản hồi vào một ý cụ thể vừa xuất hiện hoặc thêm góc nhìn mới thật cụ thể.\n"
        "- Không lặp lại slogan/quảng cáo, không nói chung chung kiểu ai cũng giống nhau.\n"
        "- Không mở đầu bằng các cụm sáo mòn như 'Ôi trời', 'OMG', 'nghe nói'.\n"
        "- Không tự thêm tên người nói ở đầu câu.\n"
        "- Không viết transcript nhiều người, không hashtag."
    )

    if reply_target and history_text:
        user_msg = (
            f"Đoạn chat gần nhất:\n{history_text}\n\n"
            f"Bạn đang phản hồi ý của {reply_target['name']}:\n"
            f"\"{reply_target['message']}\"\n\n"
            "Hãy nhắc hoặc phản biện đúng một chi tiết trong ý đó, rồi nêu quan điểm riêng của bạn."
        )
    else:
        user_msg = (
            "Cuộc trò chuyện vừa bắt đầu.\n"
            f"Hãy nêu góc nhìn đầu tiên của bạn về {PRODUCT['name']} thật cụ thể "
            "(ví dụ: giá, chất lượng, trải nghiệm mua, độ tin cậy, size, hoàn trả, đối thủ)."
        )

    return [
        {"role": "system", "content": system_msg},
        {"role": "user", "content": user_msg},
    ]


async def _run_chat_simulation(knowledge: dict):
    """Run chat simulation for ALL clusters in parallel using GPT-4o-mini."""
    persona_map = {p["id"]: p for p in PERSONAS}
    knowledge_summary = knowledge.get("summary_text", f"No research data available about {PRODUCT['name']}.")
    if len(knowledge_summary) > 800:
        knowledge_summary = knowledge_summary[:800] + "..."
    competitor_names = knowledge.get("competitor_names", [])

    # Run all clusters concurrently
    cluster_tasks = []
    for cluster in CLUSTERS:
        task = _run_cluster_chat(
            cluster, persona_map, knowledge_summary, competitor_names
        )
        cluster_tasks.append(task)

    await asyncio.gather(*cluster_tasks)


async def _run_cluster_chat(cluster, persona_map, knowledge_summary, competitor_names):
    """Run chat + vote for a single cluster."""
    cid = cluster["cluster_id"]
    member_ids = cluster["persona_ids"]
    all_members = [persona_map[pid] for pid in member_ids if pid in persona_map]
    chat_member_count = min(len(all_members), MAX_CHAT_MEMBERS)
    chat_members = random.sample(all_members, k=chat_member_count) if chat_member_count else []

    await message_queue.put({
        "type": "system",
        "cluster_id": cid,
        "message": f"Discussion starting — {len(chat_members)} participants",
    })

    chat_history = []
    CHAT_LOGS[cid] = []

    max_rounds = 3
    for round_num in range(1, max_rounds + 1):
        round_members = chat_members[:]
        random.shuffle(round_members)

        for p in round_members:
            history_text = _format_chat_history(chat_history, limit=6)
            if len(history_text) > 700:
                history_text = history_text[-700:]

            reply_target = _pick_reply_target(chat_history, p["id"])
            messages = _build_chat_turn_messages(
                p,
                history_text,
                reply_target,
                knowledge_summary,
            )
            raw_msg = await _llm_chat(
                messages,
                max_tokens=90,
                temperature=1.05,
                presence_penalty=0.6,
                frequency_penalty=0.45,
            )

            msg = _clean_chat_message(raw_msg, p.get("name", "Unknown"))
            if not msg or msg.lower() == "pass":
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
            await asyncio.sleep(0.3)

        await message_queue.put({
            "type": "system",
            "cluster_id": cid,
            "message": f"Round {round_num} complete",
        })

    # Final vote + impression (both questions in one call)
    await message_queue.put({
        "type": "system",
        "cluster_id": cid,
        "message": "Voting...",
    })

    vote_conversations = []
    vote_history = "\n".join(f"{m['name']}: {m['message']}" for m in chat_history[-8:])
    if len(vote_history) > 400:
        vote_history = vote_history[-400:]

    all_companies = [PRODUCT["name"]] + competitor_names

    for p in all_members:
        vote_conversations.append([
            {"role": "system", "content": (
                f"Bạn là {p.get('name', 'Unknown')}, {p.get('age', '?')} tuổi, "
                f"{p.get('job_title', '?')} ở {p.get('province', '?')}.\n"
                f"Dựa trên cuộc thảo luận, trả lời 2 câu hỏi.\n"
                f"Trả lời ĐÚNG format:\n"
                f"CHOICE: [tên sản phẩm bạn sẽ mua]\n"
                f"REASON: [1 câu tiếng Việt]\n"
                f"IMPRESSIONS: [tên1]=[1-5], [tên2]=[1-5], ..."
            )},
            {"role": "user", "content": (
                f"Thảo luận:\n{vote_history}\n\n"
                f"Các sản phẩm: {', '.join(all_companies)}\n"
                f"1) Bạn sẽ MUA sản phẩm nào?\n"
                f"2) Cho điểm ấn tượng (1=tệ nhất, 5=tốt nhất) cho TỪNG sản phẩm.\n"
                f"Quyết định:"
            )},
        ])

    vote_outputs = await _llm_batch(vote_conversations, max_tokens=100, temperature=0.3)

    product_count = 0
    competitor_count = 0
    pass_count = 0
    cluster_decisions = []
    impressions = {c: [] for c in all_companies}

    for p, raw_vote in zip(all_members, vote_outputs):
        choice, reason, scores = _parse_vote_with_impressions(
            raw_vote, PRODUCT["name"], competitor_names
        )

        if choice.lower() == PRODUCT["name"].lower():
            product_count += 1
        elif choice == "pass":
            pass_count += 1
        else:
            competitor_count += 1

        # Collect impression scores
        for company, score in scores.items():
            for known in all_companies:
                if known.lower() in company.lower() or company.lower() in known.lower():
                    impressions[known].append(score)
                    break

        cluster_decisions.append({
            "persona_id": p["id"],
            "name": p.get("name", "Unknown"),
            "before": "neutral",
            "after": choice,
            "reason": reason,
            "impressions": scores,
        })

        await message_queue.put({
            "type": "vote",
            "cluster_id": cid,
            "name": p.get("name", "Unknown"),
            "choice": choice,
            "reason": reason,
        })

    DECISIONS[cid] = cluster_decisions

    # Compute average impressions
    avg_impressions = {}
    for company, scores_list in impressions.items():
        if scores_list:
            avg_impressions[company] = round(sum(scores_list) / len(scores_list), 1)

    total = len(all_members)
    await message_queue.put({
        "type": "results",
        "cluster_id": cid,
        "product_pct": round(product_count / total * 100) if total else 0,
        "competitor_pct": round(competitor_count / total * 100) if total else 0,
        "pass_pct": round(pass_count / total * 100) if total else 0,
        "impressions": avg_impressions,
        "summary": f"{PRODUCT['name']}: {product_count} | Competitors: {competitor_count}",
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
                choice = product_name
            elif "pass" in choice_text:
                choice = "pass"
            else:
                for comp in competitors:
                    if comp.lower() in choice_text:
                        choice = comp
                        break
                else:
                    choice = choice_text
        if "reason:" in line_lower:
            reason = line.split(":", 1)[1].strip()

    return choice, reason


def _parse_vote_with_impressions(raw: str, product_name: str, competitors: list[str]) -> tuple[str, str, dict]:
    """Parse vote output that includes CHOICE, REASON, and IMPRESSIONS."""
    choice, reason = _parse_vote(raw, product_name, competitors)

    # Parse impressions: "IMPRESSIONS: ChatGPT=4, Claude=3, ..."
    scores = {}
    for line in raw.strip().split("\n"):
        if "impression" in line.lower():
            parts = line.split(":", 1)
            if len(parts) > 1:
                for pair in parts[1].split(","):
                    pair = pair.strip()
                    if "=" in pair:
                        name_part, score_part = pair.rsplit("=", 1)
                        try:
                            score = int(score_part.strip())
                            score = max(1, min(5, score))
                            scores[name_part.strip()] = score
                        except ValueError:
                            pass

    return choice, reason, scores


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

        cr = _analyze_cluster(
            cluster,
            cluster_decisions,
            cluster_chat,
            persona_map,
            product_name,
            competitor_names,
        )
        cluster_reports.append(cr)

        total_product += cr["vote_summary"]["product"]["count"]
        total_competitor += cr["vote_summary"]["competitors"]["total"]
        total_pass += cr["vote_summary"]["pass"]["count"]

    total_votes = total_product + total_competitor + total_pass

    overall_competitor_breakdown = Counter()
    for cr in cluster_reports:
        for comp in cr["vote_summary"]["competitors"]["breakdown"]:
            overall_competitor_breakdown[comp["name"]] += comp["count"]

    normalized_breakdown = _normalize_competitor_breakdown(overall_competitor_breakdown, competitor_names)

    competitor_profiles = {}
    for comp_name in competitor_names:
        comp_data = knowledge.get("competitors", {}).get(comp_name, {})
        votes = normalized_breakdown.get(comp_name, 0)
        competitor_profiles[comp_name] = {
            "total_votes": votes,
            "vote_pct": round(votes / total_votes * 100, 1) if total_votes else 0,
            "research": comp_data,
        }

    # Aggregate impression scores across all clusters
    all_impressions = {}
    all_companies = [product_name] + competitor_names
    for c in all_companies:
        all_impressions[c] = []
    for cr in cluster_reports:
        for d in decisions.get(cr["cluster_id"], decisions.get(str(cr["cluster_id"]), [])):
            for company, score in d.get("impressions", {}).items():
                for known in all_companies:
                    if known.lower() in company.lower() or company.lower() in known.lower():
                        all_impressions[known].append(score)
                        break

    avg_impressions = {}
    for company, scores_list in all_impressions.items():
        if scores_list:
            avg_impressions[company] = round(sum(scores_list) / len(scores_list), 1)

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
                    "breakdown": _serialize_competitor_breakdown(
                        normalized_breakdown,
                        competitor_names,
                        total_votes,
                    ),
                },
                "pass": {
                    "count": total_pass,
                    "pct": round(total_pass / total_votes * 100, 1) if total_votes else 0,
                },
            },
            "impressions": avg_impressions,
        },
        "competitor_analysis": competitor_profiles,
        "clusters": cluster_reports,
    }


def _match_competitor_name(choice: str, competitor_names: list[str]) -> str:
    choice_text = (choice or "").strip()
    choice_lower = choice_text.lower()

    for comp_name in competitor_names:
        comp_lower = comp_name.lower()
        if comp_lower == choice_lower or comp_lower in choice_lower or choice_lower in comp_lower:
            return comp_name

    return choice_text


def _normalize_competitor_breakdown(raw_counts: Counter, competitor_names: list[str]) -> Counter:
    normalized = Counter()

    for name, count in raw_counts.items():
        canonical_name = _match_competitor_name(name, competitor_names)
        normalized[canonical_name] += count

    return normalized


def _serialize_competitor_breakdown(counts: Counter, competitor_names: list[str], total_votes: int) -> list[dict]:
    ordered_names = []
    seen = set()

    for name in competitor_names:
        if name and name not in seen:
            ordered_names.append(name)
            seen.add(name)

    for name, _ in counts.most_common():
        if name and name not in seen:
            ordered_names.append(name)
            seen.add(name)

    return [
        {
            "name": name,
            "count": counts.get(name, 0),
            "pct": round(counts.get(name, 0) / total_votes * 100, 1) if total_votes else 0,
        }
        for name in ordered_names
    ]


def _analyze_cluster(cluster: dict, decisions: list[dict], chat_log: list[dict],
                     persona_map: dict, product_name: str, competitor_names: list[str]) -> dict:
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

        choice_lower = choice.lower()
        if product_lower in choice_lower or choice_lower in product_lower:
            vote_counts["product"] += 1
            product_voters.append(voter)
        elif choice_lower == "pass":
            vote_counts["pass"] += 1
            pass_voters.append(voter)
        else:
            vote_counts[choice] += 1
            competitor_voters.append(voter)

    competitor_breakdown = Counter()
    for v in competitor_voters:
        competitor_breakdown[v["choice"]] += 1
    normalized_competitor_breakdown = _normalize_competitor_breakdown(
        competitor_breakdown,
        competitor_names,
    )

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
                "breakdown": _serialize_competitor_breakdown(
                    normalized_competitor_breakdown,
                    competitor_names,
                    total_votes,
                ),
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
