# TinyUser — Frontend Plan

---

## Design Language

- **Style:** Light, clean, TinyFish-inspired. White/warm-white background (#f8f6f2), minimal chrome.
- **Typography:** Bold serif headlines (DM Serif Display), clean sans body (DM Sans).
- **Accent color:** TinyFish orange (#FF6B35) for CTAs and highlights.
- **Tone:** Professional but alive. The graph is the star — everything else serves it.

---

## Screen Flow

### Screen 1 — The Graph (Hero, immediate on load)

The 3D force-directed graph fills the entire viewport the moment you land. No loading screen, no splash. Fish are already swimming.

**What you see:**
- ~1,500 nodes drifting in loose formation (not yet clustered)
- Nodes are colored by category (industry, job type, or province — TBD based on what looks best)
- Thin grey edges connect personas who share similar frustrations (pre-computed from embeddings)
- Slow ambient motion — nodes gently drift, edges flex
- Camera slowly auto-orbits. Mouse controls viewing angle.

**Overlaid on the graph:**
- Top-left: 🐟 TINYUSER logo
- Center: Large serif headline — "Find out if your product is invisible."
- Center below headline: Subtext — "100,000 synthetic users. Real Google searches. Real answers."
- Center below subtext: Orange CTA button — "Try it →"
- Bottom: Subtle stats — "100K personas · 34 provinces · real search results"

**The graph IS the landing page.** The headline floats over it. The graph is not a decoration — it's the product.

### Screen 2 — Input Modal (opens on "Try it" click)

Clicking "Try it →" opens a modal card overlaid on the graph (graph stays visible behind, slightly blurred via backdrop-filter).

**Modal contents:**
- Header: "PRODUCT DESCRIPTION" (small caps label)
- Textarea: "Paste your product URL or describe what it does..."
- Example chips below textarea: "Notion", "TinyFish.ai", "Shopee seller tools", "VIB mobile banking"
- Close button (×) top-right — clicking outside also closes
- Orange "Run →" button bottom-right

**On Run:**
- Modal closes with a slide-down animation
- Headline and CTA fade out
- Graph transitions to Phase 2

### Screen 3 — Clustering (after Run)

**What happens to the graph:**
- Nodes that match the product (cosine similarity > threshold) brighten and pull toward their cluster centers
- Nodes that don't match fade to near-invisible (alpha ~0.1)
- Edges between matching nodes become visible and colored by cluster
- Force-directed simulation kicks in — matching nodes self-organize into dense clusters connected by edges
- Non-matching nodes drift outward and fade

**UI elements that appear:**
- Top-left: 🐟 TINYUSER + product name
- Bottom-left: Progress bar with 4 phases (Deploying → Clustering → Scanning → Results)
- Bottom-left: Status text — "Personas forming into natural audience segments..."
- Right side: Cluster legend fades in — colored dots with segment labels + counts

**Timing:** ~5 seconds for clustering animation

### Screen 4 — Scanning (TinyFish phase)

**What happens to the graph:**
- A subtle sweep/pulse animation passes through the graph
- As TinyFish results come back per cluster:
  - Found clusters: edges turn green, nodes glow slightly
  - Invisible clusters: edges turn red/pink, nodes pulse dimly
- Cluster legend updates with rank badges (#3, #7) or "✗" for not found

**UI elements:**
- Progress bar advances to "Scanning"
- Status text: "Running search queries against live Google..."
- If live TinyFish streaming URLs are available, a small "Watch live" indicator pulses near the active cluster

**Timing:** ~2 minutes real-time (this is when TinyFish is actually running searches)

### Screen 5 — Results

**What happens to the graph:**
- Graph settles into final state. Found clusters vivid, invisible clusters ghostly.
- Graph shrinks slightly or shifts right to make room for results panel on the left.
- Graph remains interactive — you can still rotate, zoom, and click nodes.

**Left panel (slides in):**
- Large score: "50%" in serif font, colored green (>50) or red (<50)
- Label: "discoverability score"
- Stats: segments found / invisible, qualifying personas count
- Gap card (red accent): "18,000 personas search 'quản lý dự án phần mềm' — you rank nowhere."
- Best ranking card (green accent): "BA Leads search 'công cụ tạo BRS' — you rank #3."

**Right panel (cluster legend, already visible):**
- Each cluster now shows: name, size, rank or ✗, top query

---

## Node Click → Detail Panel + CUA Session

This is the "holy shit" moment.

### What happens when you click a node:

**The graph:**
- Clicked node enlarges and pulses
- Connected nodes highlight, others dim
- Camera smoothly zooms toward the clicked node's neighborhood

**Detail panel slides in from the right (like the Mirofish reference image):**

```
┌─────────────────────────────────────────┐
│  Node Details              [Segment] ✕  │
│─────────────────────────────────────────│
│                                         │
│  Persona #47,832                        │
│                                         │
│  Age:        34                         │
│  Gender:     Female                     │
│  Province:   Da Nang (South Central)    │
│  Job:        Hotel front desk manager   │
│  Industry:   Tourism & hospitality      │
│  Company:    Medium (50-200)            │
│  Education:  University                 │
│  Income:     7-15M VND/month            │
│  Platform:   Zalo                       │
│  Language:   Mixed                      │
│                                         │
│─────────────────────────────────────────│
│  Frustrations:                          │
│                                         │
│  • Guest complaints pile up and there's │
│    no system to track them              │
│  • I manually update room availability  │
│    across 3 booking platforms           │
│  • Staff scheduling is done on paper    │
│                                         │
│─────────────────────────────────────────│
│  Search Query:                          │
│                                         │
│  "phần mềm quản lý khách sạn"          │
│                                         │
│  Match Score: 0.87  │  Rank: Not found  │
│─────────────────────────────────────────│
│                                         │
│  🐟 TinyFish Session                   │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │   [Live browser session         │    │
│  │    embedded iframe from          │    │
│  │    streaming_url -OR-            │    │
│  │    step-by-step replay log]      │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Steps:                                 │
│  ✓ Navigated to google.com.vn           │
│  ✓ Typed "phần mềm quản lý khách sạn"  │
│  ✓ Extracted search results (page 1)    │
│  ✗ Product URL not found in results     │
│                                         │
│  Top results instead:                   │
│  1. ezCloud.vn                          │
│  2. hotel.vn/phan-mem-quan-ly           │
│  3. cloudbeds.com/vi                    │
│                                         │
└─────────────────────────────────────────┘
```

### TinyFish CUA Session Integration

TinyFish SSE returns these events during a run:

| Event Type | What it contains | How we use it |
|---|---|---|
| `STARTED` | `run_id`, `timestamp` | Associate run with persona |
| `STREAMING_URL` | `streaming_url` (live browser view) | Embed as iframe in detail panel |
| `PROGRESS` | `purpose` ("Typing search query", "Scrolling results") | Show as step-by-step log |
| `COMPLETE` | `status`, `result` (JSON with search results) | Parse rank + competitors |

**During live scan (Screen 4):**
- If the user clicks a node whose TinyFish run is currently active, embed the `streaming_url` as a live iframe — they literally watch the agent Google the query in real-time.

**After scan complete (Screen 5):**
- Show the step log from PROGRESS events
- Show final results from COMPLETE event
- Optionally: capture a screenshot of the search results page as the final step in the TinyFish goal (add to goal: "...and take a screenshot of the results page") and display it as a static image.

---

## Graph Technical Details

### Nodes
- ~1,500 sampled from 100K (representative sample, one per ~67 personas)
- Size: proportional to match score (bigger = stronger match)
- Color: by segment/cluster
- Label: job title (shown on hover, not always visible to avoid clutter)

### Edges
- Connect personas who share similar frustrations (cosine similarity of frustration embeddings > 0.7)
- Pre-computed when personas are generated
- ~3,000-4,000 edges total
- Thin grey by default, colored when clustered
- Found clusters: green edges. Invisible clusters: red/pink edges.

### Layout
- Force-directed simulation (d3-force or custom Three.js implementation)
- Nodes with edges attract each other → natural clustering
- Unconnected nodes drift to periphery
- 3D space with gentle camera orbit

### Rendering
- Three.js for 3D
- Nodes: GL_POINTS with custom shader (size, color, alpha, glow)
- Edges: THREE.LineSegments (BufferGeometry) for performance with thousands of edges
- Raycasting for node click/hover detection

### Performance
- 1,500 nodes + 4,000 edges is very manageable for Three.js
- Use instanced rendering or buffer geometry for edges
- Target 60fps on modern browsers

---

## Responsive Behavior

### Desktop (>1024px)
- Full 3D graph with all UI panels
- Detail panel slides in from right, graph shifts left

### Tablet (768-1024px)
- Graph fills screen, panels overlay on bottom half
- Detail panel is a bottom sheet

### Mobile (<768px)
- Graph fills screen with simplified node count (~500)
- Input is full-screen, not modal
- Detail panel is full-screen overlay
- CUA session iframe may be too small — show step log only

---

## Component Structure (React)

```
<App>
  <ThreeGraph />              ← always mounted, fills viewport
  <HeroOverlay />             ← headline + CTA, fades after Run
  <InputModal />              ← opens on "Try it" click
  <TopBar />                  ← logo + product name (after Run)
  <ProgressBar />             ← bottom-left phases (after Run)
  <ClusterLegend />           ← right side (after clustering)
  <ResultsPanel />            ← left side (after results)
  <NodeDetailPanel />         ← right side (on node click)
    <PersonaDetails />
    <SearchResult />
    <TinyFishSession />       ← iframe or step log
</App>
```

---

## Key Interactions

| Action | Result |
|---|---|
| Land on page | 3D graph visible immediately, nodes drifting |
| Mouse move | Camera angle shifts subtly |
| Click "Try it →" | Input modal opens, graph blurs slightly behind |
| Click example chip | Fills textarea |
| Click "Run →" | Modal closes, clustering begins |
| Hover a node | Node enlarges, label appears (job title + city) |
| Click a node | Detail panel slides in with persona + CUA session |
| Click ✕ on detail panel | Panel closes, graph resets zoom |
| Hover a cluster in legend | That cluster's nodes brighten, others dim |
| Scroll/pinch on graph | Zoom in/out |
| Drag on graph | Rotate camera |