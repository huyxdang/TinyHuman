# TinyUser

**Find out if your product is invisible to the people who need it most.**

Powered by [TinyFish](https://www.tinyfish.ai/)

---

## Problem

You don't know how real people search for your product. You're guessing at keywords, guessing at audience segments, and spending marketing budget on terms *you* think matter — not the ones your customers actually type.

## Solution

TinyUser maintains a fixed population of 100,000 pre-built synthetic users with diverse backgrounds, jobs, and pain points. For each product run, every persona independently decides if they'd need your product, then searches for it *in their own words*. Then TinyFish deploys parallel web agents to run those searches on real search engines — live, not cached — and checks whether your product actually shows up.

No simulation. No guessing. Real search results at scale.

## Output

A discoverability report showing:

1. **Who your natural audience is** — segments that emerged organically from 100,000 synthetic users, not personas you predefined
2. **How they'd search for you** — the exact queries each segment would type into Google, in their own words
3. **Whether they'd actually find you** — real search rankings from live Google results, including who shows up instead of you

| Segment | Size | Their Search Query | You Rank | Who Ranks Instead |
|---|---|---|---|---|
| BA Leads | 21,000 | "BRS generation tool" | #3 | Jira, Confluence |
| DevOps | 18,000 | "automate release docs" | Not found | ReadMe, GitBook |
| Freelancers | 9,000 | "client deliverable template" | Not found | Canva, Notion |

---

## Architecture

### Pre-Built Asset — 100,000 Fixed Personas (One-Time Generation)

- 100,000 diverse synthetic personas generated once via Claude (age, occupation, tech level, goals, pain points)
- Stored as a static dataset, reused across every product run
- Designed for broad demographic/professional/geographic diversity

### Phase 1 — Audience Discovery (Claude API)

- User inputs product name + URL + description
- Evaluate all 100,000 personas against the product: "Would I need this?"
- Each qualifying persona generates the exact search query they'd type
- Filter to qualifying personas
- Cluster qualifying personas into natural audience segments via K-means

### Phase 2 — Live Search Execution (TinyFish API)

- Deduplicate and aggregate search queries from Phase 1 (expect ~200-500 unique queries)
- Deploy TinyFish agents in parallel — one per unique query — against live Google search
- Each TinyFish agent:
  - Navigates to Google
  - Enters the search query
  - Extracts the full first page (and optionally page 2-3) of results
  - Checks if the user's product URL appears
  - Records rank position
  - Captures all competing URLs that rank above the product
- TinyFish handles anti-bot, proxies, and browser infrastructure — no setup needed

### Phase 3 — Report Generation

- Segment summary with size, description, and representative queries
- Discoverability score per segment (% of queries where product ranks page 1)
- Overall discoverability score across all segments
- Gap analysis: high-intent segments where product is invisible
- Competitor map: who shows up where you don't
- 3D visualization: 100,000 fish swimming in clusters, colored by segment

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Persona Storage | Static dataset (JSON) | 100K pre-built personas, reused across runs |
| Persona Evaluation | Claude API (Sonnet) | Evaluate intent per product, produce search queries |
| Search Execution | TinyFish API | Run real searches at scale across live Google results |
| Clustering | K-means on embeddings | Group personas into natural audience segments |
| Visualization | Three.js / WebGL | 100K particle fish swimming in 3D cluster formations |
| Frontend | React (Vite) | User interface, product input, report display |
| Backend | FastAPI | Orchestrate phases, store results, serve reports |

## Cost Per Run

| Component | Estimate |
|---|---|
| Persona generation (one-time) | ~$50-100 |
| Claude API per run (100K evaluations, batched) | ~$30-50 |
| TinyFish API (~300 unique search queries × ~3 steps each) | ~$13.50 at $0.015/step |
| **Total per run** | **~$44-64** |

Charge $100-200 per report. Healthy margins from day one.

---

## Milestones

### v0.0 — Persona Dataset
- [ ] Generate 100,000 diverse personas via Claude API (one-time)
- [ ] Store as static dataset
- [ ] Validate diversity coverage

### v0.1 — Proof of Concept
- [ ] User inputs product name + URL + description
- [ ] Evaluate personas against the product
- [ ] Filter qualifying personas, extract search queries
- [ ] Display segments + queries in a table
- [ ] Single-file React artifact

### v0.2 — TinyFish Integration
- [ ] Connect TinyFish API for live search execution
- [ ] Run generated queries against real Google results
- [ ] Show rank position + competitors per query
- [ ] Discoverability score per segment

### v0.3 — 3D Visualization
- [ ] 100,000 particle fish in Three.js
- [ ] Clusters color-coded by segment
- [ ] Click a cluster to expand segment details
- [ ] Zoom, rotate, explore

### v0.4 — Full Report
- [ ] Exportable PDF report
- [ ] Segment deep-dives with representative persona stories
- [ ] Query gap analysis chart
- [ ] Competitor ranking table

### v1.0 — Product Launch
- [ ] Auth + saved reports
- [ ] Historical comparison (run monthly, track discoverability over time)
- [ ] Competitor mode (compare your discoverability vs a competitor's)
- [ ] API access for programmatic runs
- [ ] Pricing: $50/report (starter), $100/report (pro with deeper analysis)