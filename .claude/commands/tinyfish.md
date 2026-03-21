# TinyFish API Skill

You are an expert at calling the TinyFish Web Agent API. When the user asks you to interact with websites, scrape data, fill forms, or automate browser tasks, use the TinyFish API.

## Base URL

All requests go to: `https://agent.tinyfish.ai`

## Authentication

- Header: `X-API-Key: $TINYFISH_API_KEY`
- The API key should be read from the `TINYFISH_API_KEY` environment variable.
- Never hardcode API keys.

---

## Endpoints

### 1. Run Automation (Synchronous)

**POST** `/v1/automation/run`

Blocks until the automation completes and returns the result. Cannot be cancelled.

**Request body (JSON):**

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | string (URI) | Yes | Target website URL |
| `goal` | string | Yes | Natural language task description (min 1 char) |
| `browser_profile` | `"lite"` \| `"stealth"` | No | `lite` = standard browser (default). `stealth` = anti-detection. |
| `proxy_config` | object | No | `{ "enabled": true, "country_code": "US" }`. Codes: US, GB, CA, DE, FR, JP, AU |
| `use_vault` | boolean | No | Enable stored credentials |
| `credential_item_ids` | string[] | No | Specific vault credential IDs (requires `use_vault: true`) |
| `feature_flags` | object | No | `{ "enable_agent_memory": true }` |
| `api_integration` | string | No | Integration name for analytics |

**Response (200):**
```json
{
  "run_id": "uuid",
  "status": "COMPLETED",
  "started_at": "ISO8601",
  "finished_at": "ISO8601",
  "num_of_steps": 5,
  "result": { /* structured data */ },
  "error": null
}
```

**Response (500 - failure):**
```json
{
  "run_id": "uuid",
  "status": "FAILED",
  "num_of_steps": 3,
  "result": null,
  "error": {
    "code": "TASK_FAILED",
    "message": "...",
    "category": "SYSTEM_FAILURE|AGENT_FAILURE|BILLING_FAILURE|UNKNOWN",
    "retry_after": null,
    "help_url": "...",
    "help_message": "..."
  }
}
```

---

### 2. Run Automation (SSE Streaming)

**POST** `/v1/automation/run-sse`

Returns a Server-Sent Events stream with real-time progress. Can be cancelled.

**Request body:** Same as synchronous endpoint.

**SSE Event types:**

- `STARTED` — `{"type":"STARTED","run_id":"...","timestamp":"..."}`
- `STREAMING_URL` — `{"type":"STREAMING_URL","run_id":"...","streaming_url":"https://...","timestamp":"..."}`
- `PROGRESS` — `{"type":"PROGRESS","run_id":"...","purpose":"Clicking submit button","timestamp":"..."}`
- `COMPLETE` — `{"type":"COMPLETE","run_id":"...","status":"COMPLETED","result":{...},"timestamp":"..."}`
- `HEARTBEAT` — `{"type":"HEARTBEAT","timestamp":"..."}`

---

### 3. Start Automation (Async)

**POST** `/v1/automation/run-async`

Enqueues the task and immediately returns a `run_id` for polling.

**Request body:** Same as synchronous endpoint.

**Response (200):**
```json
{
  "run_id": "uuid",
  "error": null
}
```

Poll status with `GET /v1/runs/{id}`.

---

### 4. Start Multiple Automations (Batch Async)

**POST** `/v1/automation/run-batch`

Submit 1–100 automations at once. Atomic: all succeed or all fail.

**Request body:**
```json
{
  "runs": [
    { "url": "https://example.com", "goal": "Extract pricing" },
    { "url": "https://other.com", "goal": "Get product list" }
  ]
}
```

Each item in `runs` accepts the same fields as the sync endpoint (url, goal, browser_profile, proxy_config, etc.), plus an optional `is_stress_test` boolean.

**Response (200):**
```json
{
  "run_ids": ["uuid-1", "uuid-2"],
  "error": null
}
```

---

### 5. Get Run by ID

**GET** `/v1/runs/{id}`

**Response (200):**
```json
{
  "run_id": "uuid",
  "status": "PENDING|RUNNING|COMPLETED|FAILED|CANCELLED",
  "goal": "...",
  "created_at": "ISO8601",
  "started_at": "ISO8601",
  "finished_at": "ISO8601",
  "num_of_steps": 5,
  "result": { /* or null */ },
  "error": { /* or null */ },
  "streaming_url": "https://... or null",
  "browser_config": { "proxy_enabled": true, "proxy_country_code": "US" }
}
```

---

### 6. Get Multiple Runs (Batch)

**POST** `/v1/runs/batch`

**Request body:**
```json
{ "run_ids": ["uuid-1", "uuid-2"] }
```
Max 100 IDs.

**Response (200):**
```json
{
  "data": [ /* array of run objects */ ],
  "not_found": ["uuid-3"]
}
```

---

### 7. List & Search Runs

**GET** `/v1/runs`

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `status` | string | PENDING, RUNNING, COMPLETED, FAILED, CANCELLED |
| `goal` | string | Case-insensitive partial match (max 500 chars) |
| `created_after` | ISO 8601 | Filter by creation time |
| `created_before` | ISO 8601 | Filter by creation time |
| `sort_direction` | `asc` \| `desc` | Default: desc |
| `cursor` | string | Pagination cursor |
| `limit` | integer | 1–100, default 20 |

**Response (200):**
```json
{
  "data": [ /* run objects */ ],
  "pagination": { "total": 42, "next_cursor": "...", "has_more": true }
}
```

---

### 8. Cancel Run

**POST** `/v1/runs/{id}/cancel`

Only works for runs created via `/run-async` or `/run-sse` (NOT `/run`).

**Response (200):**
```json
{
  "run_id": "uuid",
  "status": "CANCELLED|COMPLETED|FAILED",
  "cancelled_at": "ISO8601 or null",
  "message": "Run already cancelled|Run already finished|null"
}
```

---

### 9. Cancel Multiple Runs (Batch)

**POST** `/v1/runs/batch/cancel`

**Request body:**
```json
{ "run_ids": ["uuid-1", "uuid-2"] }
```
Max 100 IDs. Idempotent.

**Response (200):**
```json
{
  "results": [
    { "run_id": "uuid", "status": "CANCELLED", "cancelled_at": "ISO8601", "message": null }
  ],
  "not_found": ["uuid-3"]
}
```

---

### 10. Create Remote Browser Session

**POST** `/v1/browser`

No request body needed.

**Response (201):**
```json
{
  "session_id": "tf-uuid",
  "cdp_url": "wss://...",
  "base_url": "https://..."
}
```

---

## Error Codes

| Code | HTTP | Meaning |
|---|---|---|
| MISSING_API_KEY | 401 | X-API-Key header not provided |
| INVALID_API_KEY | 401 | Key doesn't exist or was revoked |
| INVALID_INPUT | 400 | Validation failed (bad URL, missing fields, etc.) |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests — use exponential backoff |
| UNAUTHORIZED | 401 | Auth failed (non-key reason) |
| FORBIDDEN | 403 | No credits or inactive subscription |
| NOT_FOUND | 404 | Resource doesn't exist |
| INTERNAL_ERROR | 500 | Server error — retry after delay |
| INSUFFICIENT_CREDITS | 402 | Account out of credits |
| CONTENT_POLICY_VIOLATION | — | Goal violates content policy |
| MAX_STEPS_EXCEEDED | — | Automation exceeded step limit |
| SITE_BLOCKED | — | Target site is blocked |
| TASK_FAILED | — | Automation failed (browser crash, etc.) |
| CANCELLED | — | Run was cancelled |
| SERVICE_BUSY | 502 | Service temporarily overloaded |
| TIMEOUT | 502 | Request timed out |

---

## Goal Prompting Best Practices

Good goals are specific and structured. Include up to 7 components:

1. **Objective** — What to achieve
2. **Target** — Where to focus on the page
3. **Fields** — Specific data to extract
4. **Schema** — Output structure (provide sample values for type clarity, e.g. `"price": 29.99`)
5. **Steps** — Numbered action sequence for multi-step tasks
6. **Guardrails** — What NOT to do
7. **Edge cases** — How to handle unexpected scenarios

Specific goals complete **4.9x faster** and return **16x less unnecessary data**.

---

## Browser Profile Selection

- Use **`lite`** (default) for: standard websites, internal tools, performance-critical tasks.
- Use **`stealth`** for: sites with CAPTCHAs, Cloudflare, bot protection, e-commerce sites.
- **Stealth limitations:** Cannot solve reCAPTCHA, may struggle with infinite scroll, doesn't persist login sessions across runs.
- Combine `stealth` + `proxy_config` for maximum anti-detection.

---

## curl Examples

**Synchronous run:**
```bash
curl -X POST https://agent.tinyfish.ai/v1/automation/run \
  -H "X-API-Key: $TINYFISH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "goal": "Extract the page title and all heading text"
  }'
```

**SSE streaming:**
```bash
curl -N -X POST https://agent.tinyfish.ai/v1/automation/run-sse \
  -H "X-API-Key: $TINYFISH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "goal": "Find pricing page and extract all plan details"
  }'
```

**Async with stealth + proxy:**
```bash
curl -X POST https://agent.tinyfish.ai/v1/automation/run-async \
  -H "X-API-Key: $TINYFISH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "goal": "Extract product listings",
    "browser_profile": "stealth",
    "proxy_config": { "enabled": true, "country_code": "US" }
  }'
```

**Poll run status:**
```bash
curl https://agent.tinyfish.ai/v1/runs/YOUR_RUN_ID \
  -H "X-API-Key: $TINYFISH_API_KEY"
```
