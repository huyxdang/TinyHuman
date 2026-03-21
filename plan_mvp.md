# TinyUser — MVP Plan

**Find out if your product is invisible to the people who need it most.**

Powered by TinyFish + Modal + Claude

---

## Architecture Overview

```
PRE-COMPUTED (one-time, cached forever):
  100K personas → Qwen generates their problems → Embed problems → Store vectors

PER PRODUCT RUN:
  (1) Claude: "What problems does this product solve?" → Embed → 30 vectors
  (2) Cosine similarity: 100K persona vectors × 30 product vectors → instant match
  (3) Qwen: qualifying personas generate search queries → deduplicate
  (4) TinyFish: run real Google searches → rank + competitors
  (5) Report: segments, discoverability scores, gap analysis, 3D visualization
```

---

## Pre-Computed Assets (One-Time Setup)

### 100,000 Vietnamese Personas

Generated from `persona_specification.json` using autoregressive sampling.

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
| C1 | Digital Fluency & Platform Affinity | How they discover products |
| C2 | Collective Trust & Social Validation | Whose opinion they need before buying |
| C3 | Pragmatic Price-Value Orientation | When/if they convert |
| C4 | Ethno-Centricity | Which products they'd consider (local vs foreign) |
| C5 | Risk Aversion & Transactional Security | How they pay |

### Pre-Computed Persona Problems

For each of the 100K personas, Qwen generates their top 3-5 daily frustrations / unmet needs **without any product context**. This is believable because we're asking "what bothers you?" not "would you use X?"

Example for persona #47832 (urban, 25-34, white-collar, platform-savvy):
- "My team's project docs are scattered across Zalo, email, and Google Drive"
- "I spend too long writing status reports every week"
- "I can't find the spec my PM shared last month"

These problems are then embedded using `intfloat/multilingual-e5-small` (handles Vietnamese) and stored as vectors. **Never recomputed.**

**Stored files:**
- `personas.json` — 100K persona demographic + characteristic data
- `persona_problems.json` — 100K × 3-5 problems per persona (text)
- `persona_embeddings.npy` — 100K pre-computed embedding vectors

**One-time cost:**
- Modal (Qwen inference for 100K personas): ~$3-5
- Modal (embedding 100K × 5 problems): ~$0.50
- **Total one-time: ~$4-6, then $0 forever**

---

## Per-Product Pipeline

### Step 1 — Product Problem Space (Claude, 1 API call)

User inputs product name + URL + description. Claude generates a broad problem space: every possible way someone might *experience the need* for this product.

Not a product description — a list of **problems people feel**, phrased in their language.

Example for Notion:
- "I can't find the document my teammate shared last week"
- "My meeting notes are scattered across 5 apps"
- "I need a simple wiki for my small team"
- "I'm a student and I need to organize my coursework"
- "I run a freelance business and track everything in spreadsheets"

Output: ~20-30 problem statements, then embedded using the same multilingual-e5-small model.

**Cost:** ~$0.01 (one Claude call) + milliseconds for embedding

### Step 2 — Problem Matching (Cosine Similarity, Deterministic)

Matrix multiply: 100K pre-computed persona problem vectors × 30 product problem vectors.

Each persona gets a **match score** (0.0 to 1.0). No LLM judgment — pure math.

- Score > 0.75 → **strong match** (actively has this problem)
- Score 0.55-0.75 → **adjacent** (related problem, might discover it)
- Score < 0.55 → **no match** (filtered out)

This gives you not just yes/no but a gradient. A persona at 0.92 is desperate for your product. A persona at 0.60 is a stretch audience.

**Cost:** $0 (numpy dot product, under 1 second)

### Step 3 — Search Query Generation (Qwen on Modal, qualifying personas only)

Only personas that passed Step 2 (expect ~5K-20K out of 100K) get this step.

Qwen generates the search query this persona would type, given:
- Their problem (from pre-computed problems, not the product)
- Their C1 digital fluency level (determines if they Google, ask Zalo, browse TikTok)
- Their language patterns (Vietnamese, English, or mixed — based on C1 and C4)

The persona **never sees the product**. They're searching for their problem, not your solution. This is how real discovery works.

**Cost:** ~$1-3 on Modal (only qualifying personas, not all 100K)

### Step 4 — Live Search Execution (TinyFish API)

Deduplicate search queries from Step 3 (expect ~200-500 unique queries).

TinyFish agents run each query on real Google:
- Extract first page of results
- Check if product URL appears
- Record rank position
- Capture all competing URLs that rank above the product
- Queries in both Vietnamese and English depending on persona patterns

**Cost:** ~300 unique queries × ~3 steps × $0.015/step = ~$13.50

### Step 5 — Report

- Segment summary table (segment name, size, match score distribution, representative queries)
- Discoverability score per segment (% of queries where product ranks page 1)
- Overall discoverability score
- Gap analysis: high-match segments where product is invisible
- Competitor table: who ranks where you don't
- 3D visualization: 100K fish clustered by segment (Three.js)

---

## Per-Product Cost & Speed

| Step | Cost | Time |
|---|---|---|
| 1. Claude: product problem space | ~$0.01 | ~2 seconds |
| 2. Cosine similarity (100K × 30) | $0 | <1 second |
| 3. Qwen: search queries (qualifying only) | ~$1-3 | ~30-60 seconds |
| 4. TinyFish: real Google searches | ~$13.50 | ~2 minutes |
| 5. Report generation | $0 | ~5 seconds |
| **Total per product** | **~$15-17** | **~3-4 minutes** |

Charge $50-100 per report. Pre-computed assets amortized to $0.

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Persona storage | Static JSON + .npy embeddings | Pre-generated, cached forever |
| Problem generation | Qwen2.5-7B-Instruct on Modal (vLLM) | One-time: persona problems |
| Embedding | multilingual-e5-small on Modal | One-time: persona embeddings. Per-run: product embeddings |
| Problem matching | Numpy cosine similarity | Per-run: instant matching |
| Search query generation | Qwen2.5-7B-Instruct on Modal (vLLM) | Per-run: qualifying personas only |
| Search execution | TinyFish API (batch async) | Per-run: real Google searches |
| Visualization | Three.js / WebGL | 100K particle fish in 3D clusters |
| Frontend | React (Vite) | User interface, report display |
| Backend | FastAPI | Orchestration, Modal calls, TinyFish calls |

---

## MVP Milestones

### M1 — Persona Dataset & Pre-Computation
- [ ] Implement sampling algorithm from `persona_specification.json`
- [ ] Generate 100,000 personas → `personas.json`
- [ ] Validate distributions match spec (C1-C5 within ±2%)
- [ ] Set up Modal project with Qwen2.5-7B-Instruct (vLLM)
- [ ] Generate persona problems (100K × 3-5 problems each) → `persona_problems.json`
- [ ] Set up multilingual-e5-small on Modal
- [ ] Embed all persona problems → `persona_embeddings.npy`

### M2 — Per-Product Pipeline
- [ ] User inputs product name + URL + description
- [ ] Claude generates product problem space
- [ ] Embed product problems
- [ ] Cosine similarity matching against 100K personas
- [ ] Filter qualifying personas by threshold
- [ ] Cluster qualifying personas into segments

### M3 — Search Query Generation & Execution
- [ ] Qwen generates search queries for qualifying personas
- [ ] Deduplicate queries
- [ ] Run queries via TinyFish batch async
- [ ] Parse search results: rank position + competitors per query

### M4 — Report & Visualization
- [ ] Segment discoverability scores
- [ ] Overall score
- [ ] Gap analysis
- [ ] Competitor ranking table
- [ ] 3D fish visualization (Three.js, 100K particles, colored by segment)
- [ ] Web UI to input product + display report