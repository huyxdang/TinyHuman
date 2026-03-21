# TinyUser — MVP Plan v2

**Find out if your product is invisible to the people who need it most.**

Powered by TinyFish + Modal + Claude

---

## Architecture Overview

```
PRE-COMPUTED (one-time, cached forever):
  Sample 100K (age, gender, city) from census data
  → Qwen generates full persona: job, industry, education, income, platform, frustrations
  → Embed all frustrations → Store vectors

PER PRODUCT RUN:
  (1) Claude: "What problems does this product solve?" → Embed
  (2) Cosine similarity: 100K persona frustrations × product problems → instant match
  (3) Qwen: qualifying personas generate search queries
  (4) TinyFish: run real Google searches → rank + competitors
  (5) Report: human-readable segments, discoverability scores, gap analysis
```

---

## Persona Design

### 3 Anchor Fields (sampled from real census data)

| Field | Source | Method |
|---|---|---|
| Age | GSO 2024, UN Population Prospects | Weighted random from age pyramid |
| Gender | GSO 2024 (49% M, 51% F) | Weighted random |
| City | GSO 2024 intercensal census, top 20 provinces + rural bucket | Weighted by population |

### LLM-Generated Fields (Qwen, conditioned on anchors)

| Field | Example | Why it matters |
|---|---|---|
| Job title | "Hotel front desk manager" | Targetable by ads, content |
| Industry | "Tourism & hospitality" | Segment label |
| Company size | "medium (50-200)" | B2B vs B2C signal |
| Education level | "university" | Content complexity |
| Income bracket | "7-15M VND/month" | Pricing sensitivity |
| Primary platform | "Zalo" | Channel strategy |
| Search language | "mixed" | SEO language |
| Top 3 frustrations | "Guest complaints pile up with no tracking system" | Core of the simulation |

**Every field is directly reportable.** A marketing team reads "Hotel managers in Da Nang, 25-44, university-educated, search in Vietnamese on Zalo" and knows exactly what to do.

**No abstract behavioral characteristics.** No "C1=3 digital fluency." The persona is a person, not a vector.

---

## Pre-Computed Assets (One-Time)

### Step 1: Sample Anchors
Python script samples 100K (age, gender, city) triplets from `persona_specification.json` distributions.

### Step 2: Generate Full Personas
Qwen2.5-7B-Instruct on Modal generates the remaining fields for each persona. Batched 10 per call = 10K calls. ~15 minutes with 100+ concurrent GPU workers.

### Step 3: Embed Frustrations
`intfloat/multilingual-e5-small` on Modal embeds all frustrations. Stored as `persona_embeddings.npy`.

**One-time cost: ~$6-9. Cached forever.**

**Output files:**
- `personas.json` — 100K complete personas
- `persona_embeddings.npy` — 100K frustration vectors

---

## Per-Product Pipeline

### Step 1 — Product Problem Space (Claude, 1 call)

User inputs product. Claude generates ~20-30 problem statements — not what the product *does*, but what problems people *feel* that the product solves.

Embedded using same multilingual-e5-small model.

**Cost:** ~$0.01 | **Time:** ~2 seconds

### Step 2 — Problem Matching (Cosine Similarity)

Matrix multiply: 100K persona frustration vectors × 30 product problem vectors.

Each persona gets a match score (0.0 to 1.0). No LLM needed — pure numpy.

- Score > 0.75 → strong match
- Score 0.55-0.75 → adjacent
- Score < 0.55 → filtered out

**Cost:** $0 | **Time:** <1 second

### Step 3 — Search Query Generation (Qwen on Modal)

Only qualifying personas (~5K-20K) get this step. Qwen generates the search query they'd type, based on:
- Their frustration (not the product)
- Their primary platform
- Their search language

The persona never sees the product.

**Cost:** ~$1-3 | **Time:** ~30-60 seconds

### Step 4 — Live Search (TinyFish API)

Deduplicate queries (~200-500 unique). TinyFish runs them on real Google. Records rank + competitors.

**Cost:** ~$13.50 | **Time:** ~2 minutes

### Step 5 — Report

Segments labeled with human-readable demographics:

| Segment | Size | Top Query | You Rank | Competitor |
|---|---|---|---|---|
| Hotel managers in Da Nang (25-44) | 3,200 | "phần mềm quản lý khách sạn" | Not found | Cloudbeds, ezCloud |
| Bank tellers in HCMC (25-34) | 8,100 | "công cụ tự động hóa tài liệu" | #7 | Jira, Confluence |
| Young Shopee sellers (18-24, TikTok) | 12,400 | "cách tăng đơn hàng Shopee" | Not found | Shopee University |

---

## Per-Product Cost & Speed

| Step | Cost | Time |
|---|---|---|
| 1. Claude: product problem space | ~$0.01 | ~2 sec |
| 2. Cosine similarity | $0 | <1 sec |
| 3. Qwen: search queries (qualifying only) | ~$1-3 | ~30-60 sec |
| 4. TinyFish: real Google searches | ~$13.50 | ~2 min |
| 5. Report generation | $0 | ~5 sec |
| **Total** | **~$15-17** | **~3-4 min** |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Persona storage | Static JSON + .npy embeddings |
| Persona generation | Qwen2.5-7B-Instruct on Modal (vLLM) |
| Embedding | multilingual-e5-small on Modal |
| Problem matching | Numpy cosine similarity |
| Search query generation | Qwen2.5-7B-Instruct on Modal (vLLM) |
| Search execution | TinyFish API (batch async) |
| Visualization | Three.js — force-directed network graph, 1.5K nodes |
| Frontend | React (Vite) |
| Backend | FastAPI |

---

## MVP Milestones

### M1 — Persona Dataset
- [ ] Implement anchor sampling from census distributions
- [ ] Set up Modal with Qwen2.5-7B-Instruct (vLLM)
- [ ] Design + test persona generation prompt
- [ ] Generate 100K personas → `personas.json`
- [ ] Validate: realistic job/city combos, no nonsense personas
- [ ] Embed frustrations → `persona_embeddings.npy`

### M2 — Per-Product Pipeline
- [ ] Claude generates product problem space
- [ ] Embed product problems
- [ ] Cosine similarity matching
- [ ] Filter + cluster qualifying personas
- [ ] Auto-label segments from demographics

### M3 — Search Execution
- [ ] Qwen generates search queries for qualifying personas
- [ ] Deduplicate queries
- [ ] TinyFish batch async → real Google results
- [ ] Parse: rank position + competitors

### M4 — Report & Visualization
- [ ] Segment table with discoverability scores
- [ ] Gap analysis + competitor table
- [ ] Force-directed 3D network graph (Three.js, ~1.5K nodes)
- [ ] Web UI: hero graph on load → input modal → animated clustering → report