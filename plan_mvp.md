# TinyUser — MVP Plan

Same concept as the full plan, scaled for cost-efficient execution.

---

## Pre-Built Asset: 100,000 Vietnamese Personas

Generated once from `persona_specification.json`, stored as a static file, reused across every product run.

**Generation method:**
- Autoregressive sampling from `persona_specification.json`
- Demographics (age, location, occupation) drawn from real Vietnamese population distributions (GSO, DataReportal 2025)
- 5 behavioral characteristics sampled via conditional probability chain: C1 → C2 → C3 → C4 → C5
- See `persona_specification.json` for full probability tables and sampling algorithm

**Persona schema:**

| Field | Type | Example |
|---|---|---|
| id | int | 47832 |
| age | string | "25-34" |
| location | string | "urban" |
| occupation | string | "white_collar" |
| C1_digital_fluency | int (1-4) | 3 (platform_savvy) |
| C2_collective_trust | int (1-4) | 2 (community_validated) |
| C3_price_value | int (1-4) | 3 (value_conscious) |
| C4_ethnocentricity | int (1-4) | 2 (local_leaning) |
| C5_risk_aversion | int (1-4) | 3 (platform_trusting) |

**The 5 characteristics (from persona_specification.json):**

| ID | Name | Controls |
|---|---|---|
| C1 | Digital Fluency & Platform Affinity | How they discover products (Google, TikTok, Zalo, word of mouth, etc.) |
| C2 | Collective Trust & Social Validation | Whose opinion they need before buying (family, community, KOLs, self) |
| C3 | Pragmatic Price-Value Orientation | When/if they convert (deal-dependent, value-based, premium) |
| C4 | Ethno-Centricity | Which products they'd consider (Vietnamese-only to international-preferring) |
| C5 | Risk Aversion & Transactional Security | How they pay (cash-only, chat-to-buy, e-wallet, card on file) |

Each characteristic has 4 discrete levels with behavioral descriptions. See `persona_specification.json` for full level definitions and population distributions.

---

## Phase 1 — Audience Discovery (Self-hosted Qwen on Modal)

**Why not Claude API:** 100,000 personas × 2 prompts each ("do I care?" + "what would I search?") = 200K+ inference calls. Too expensive and too slow via external API.

**Solution:** Host a small Qwen model (Qwen2.5-7B-Instruct or Qwen2.5-3B-Instruct) on Modal with GPU. Fast, cheap, runs in parallel.

**Input:** Product name + URL + description from the user.

**Per persona, Qwen evaluates:**
1. Given this persona's 5 characteristics, would they need this product? (yes/no + one-line reasoning)
2. Urgency level (actively_searching / would_consider / no_need)
3. If yes: the exact search query they'd type (in Vietnamese or English, based on C1 level and C4 level)

**Modal setup:**
- Qwen2.5-7B-Instruct (or 3B if latency matters more)
- vLLM serving on Modal for high-throughput batch inference
- Batch 100K personas into chunks, run in parallel across multiple GPU containers
- Estimated: ~$2-5 per run on Modal (vs $100-200 via Claude API)

**Output:** Filtered list of qualifying personas grouped into natural segments, each with their search queries.

---

## Phase 2 — Live Search Execution (TinyFish API)

- Deduplicate search queries from Phase 1 (expect ~200-500 unique queries after dedup across 100K personas)
- Run each query against live Google via TinyFish batch async endpoint
- Each agent extracts first page of results, checks if product URL appears, records rank + competitors
- Use `browser_profile: "stealth"` + proxy for Google searches
- Queries in both Vietnamese and English depending on persona language patterns

**Cost:** ~300 unique queries × ~3 steps × $0.015/step = ~$13.50

---

## Phase 3 — Report

- Segment summary table (segment name, size, representative queries)
- Discoverability score per segment (% of queries where product ranks page 1)
- Overall discoverability score
- Gap analysis: segments where product is invisible
- Competitor table: who ranks where you don't
- 3D visualization: 100,000 fish clustered by segment (Three.js)

---

## Tech Stack (MVP)

| Layer | Technology | Role |
|---|---|---|
| Persona storage | Static JSON (100K personas from persona_specification.json) | Pre-generated, reused per run |
| Persona generation | Python script using persona_specification.json | One-time generation |
| Persona evaluation | Qwen2.5-7B-Instruct on Modal (vLLM) | "Do I care?" + "What would I search?" |
| Search execution | TinyFish API (batch async) | Real Google searches at scale |
| Visualization | Three.js / WebGL | 100K particle fish in 3D clusters |
| Frontend | React (Vite) | User interface, report display |
| Backend | FastAPI | Orchestration, Modal calls, TinyFish calls |

## Cost Per Run

| Component | Estimate |
|---|---|
| Modal (Qwen inference, 100K personas) | ~$2-5 |
| TinyFish (~300 unique queries) | ~$13.50 |
| **Total per run** | **~$15-19** |

---

## MVP Milestones

### M1 — Persona Dataset
- [ ] Implement sampling algorithm from `persona_specification.json`
- [ ] Generate 100,000 personas, store as `personas.json`
- [ ] Validate marginal distributions match spec (C1-C5 within ±2%)
- [ ] Validate demographic distributions match GSO data

### M2 — Modal Inference Pipeline
- [ ] Set up Modal project with Qwen2.5-7B-Instruct via vLLM
- [ ] Design evaluation prompt: persona context → product description → (relevance, urgency, search_query)
- [ ] Batch inference: chunk 100K personas, run in parallel
- [ ] Parse structured output, filter qualifying personas
- [ ] Cluster qualifying personas into segments (K-means on characteristics)
- [ ] Extract and deduplicate search queries per segment

### M3 — Live Search
- [ ] Connect TinyFish API (batch async endpoint)
- [ ] Run deduplicated queries against live Google
- [ ] Poll for results
- [ ] Parse search results: rank position + competitors per query

### M4 — Report & Visualization
- [ ] Segment discoverability scores
- [ ] Overall score
- [ ] Gap analysis
- [ ] Competitor ranking table
- [ ] 3D fish visualization (Three.js, 100K particles, colored by segment)
- [ ] Web UI to input product + display report