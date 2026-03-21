# TinyUser — MVP Plan (100 Personas)

Same concept as the full plan, scaled to 100 pre-built personas.

---

## Pre-Built Asset: 100 Fixed Personas

Generated once, stored as a static JSON file, reused across every product run.

**Persona schema:**

| Field | Type | Example |
|---|---|---|
| id | int | 1 |
| age | int | 34 |
| country | string | "US" |
| language_fluency | string | "native" |
| job_title | string | "Product Manager" |
| industry | string | "B2B SaaS" |
| company_size | string | "startup" |
| years_experience | int | 6 |
| technical_proficiency | string | "medium" |
| goals | string[] | ["Ship features faster", "Reduce scope creep"] |
| pain_points | string[] | ["Too many meetings", "No clear requirements process"] |
| tools_used | string[] | ["Jira", "Notion", "Slack"] |
| discovery_channel | string | "Google search" |
| budget_authority | string | "team-level" |

**Diversity requirements:**
- Spread across 10+ industries
- Mix of technical and non-technical roles
- Age range 22–65
- Company sizes from solo to enterprise
- Global distribution (weighted toward English-speaking markets)
- Explicitly include non-obvious roles (teachers, nurses, small business owners, etc.)

---

## Phase 1 — Audience Discovery (Claude API)

**Input:** Product name + URL + description from the user.

**Per persona, Claude evaluates:**
1. Would this persona need the product? (yes/no + one-line reasoning)
2. Urgency level (actively searching / would consider / no need)
3. If yes: the exact search query they'd type into Google

**Output:** Filtered list of qualifying personas grouped into natural segments, each with their search queries.

**Cost:** ~100 persona evaluations batched 10/call = ~10 API calls. Negligible.

---

## Phase 2 — Live Search Execution (TinyFish API)

- Deduplicate search queries from Phase 1 (expect ~20-50 unique queries)
- Run each query against live Google via TinyFish batch async endpoint
- Each agent extracts first page of results, checks if product URL appears, records rank + competitors
- Use `browser_profile: "stealth"` + proxy for Google searches

**Cost:** ~30 unique queries × ~3 steps = ~$1.35

---

## Phase 3 — Report

- Segment summary table (segment name, size, representative queries)
- Discoverability score per segment (% of queries where product ranks page 1)
- Overall discoverability score
- Gap analysis: segments where product is invisible
- Competitor table: who ranks where you don't

---

## Tech Stack (MVP)

| Layer | Technology |
|---|---|
| Persona storage | Static JSON file (100 personas) |
| Persona evaluation | Claude API (Sonnet) |
| Search execution | TinyFish API (batch async) |
| Frontend | React (Vite) |
| Backend | FastAPI |

---

## MVP Milestones

### M1 — Persona Dataset
- [ ] Design generation prompt ensuring diversity
- [ ] Generate 100 personas via Claude
- [ ] Store as `personas.json`
- [ ] Validate diversity coverage

### M2 — Product Evaluation Pipeline
- [ ] User inputs product name + URL + description
- [ ] Evaluate all 100 personas against the product
- [ ] Filter qualifying personas, extract search queries
- [ ] Cluster into segments
- [ ] Display segments + queries in a table

### M3 — Live Search
- [ ] Deduplicate queries
- [ ] Run queries via TinyFish batch async
- [ ] Poll for results
- [ ] Parse search results: rank position + competitors

### M4 — Report
- [ ] Segment discoverability scores
- [ ] Overall score
- [ ] Gap analysis
- [ ] Competitor ranking table
- [ ] Simple web UI to display everything
