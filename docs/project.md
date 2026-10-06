# Competitor Intelligence Agent

Development specification. This document is the source of truth for product scope, user flow, features, and architecture. Do not treat implementation code as overriding this spec unless this file is updated.

---

## Product

**Competitor Intelligence Agent** is a full-stack AI SaaS prototype. A user submits a competitor’s public website URL. A research agent then inspects that site, discovers relevant public pages, crawls them, extracts evidence (pricing, products and features, observable technology, recent public updates), analyzes the collection, and returns a structured competitor intelligence report.

The product is for founders, product managers, and operators who need a fast, evidence-backed snapshot of a competitor from public web pages—not internal systems, paywalled content, or private data.

The UI must show the research process (steps, activity, progress) as well as the final report. Reports must cite source URLs so claims can be verified.

This is a prototype. Authentication, payments, production deployment, analytics, and monitoring are explicitly out of scope until this specification says otherwise.

---

## Main User Flow

1. User enters a competitor website URL.
2. User starts research.
3. The system validates the URL and creates a research job.
4. The agent analyzes the target website (entry page / homepage context).
5. The agent discovers relevant public pages (for example pricing, product, blog, changelog, docs).
6. The agent crawls those public pages (via Firecrawl).
7. The agent extracts evidence: pricing, products/features, technology signals, recent updates.
8. The agent analyzes the collected information.
9. The agent produces a structured competitor intelligence report with source URLs.
10. The UI displays progress, agent activity logs, and the finished report.
11. The user can later reopen the report from research history.

---

## Main Features

| Feature | Requirement |
| --- | --- |
| Competitor URL input | Single primary input for the target website URL. |
| URL validation | Reject empty, malformed, or unsupported URLs before research starts. Require `http`/`https`. Surface clear errors. |
| Research start | Create a research job from a valid URL and begin the agent pipeline. |
| Research progress | Show pipeline stage (analyze, discover, crawl, extract, analyze, report) and overall status (queued, running, succeeded, failed). |
| Agent activity logs | Stream or poll human-readable log lines of what the agent is doing (pages found, crawl started, extraction notes, errors). |
| Website crawling | Crawl public pages of the target site within defined limits (page count, depth, timeouts). Public pages only. |
| Page discovery | Identify relevant URLs (pricing, product, features, changelog/blog, docs, about) from the entry site. |
| Pricing extraction | Extract publicly listed plans, prices, billing periods, and caveats. Record uncertainty when pricing is missing or unclear. |
| Feature extraction | Extract products, modules, and feature claims from public copy. |
| Technology detection | Record publicly observable signals (for example scripts, meta, CDN, known SaaS widgets). Do not claim internals that are not evidenced. |
| Recent update detection | Find recent public product updates where available (changelog, blog, release notes). Note absence when none are found. |
| Structured AI report | Produce a typed report (Zod schema): company/site overview, pricing, products/features, technology, updates, analysis, limitations. |
| Source URLs | Attach source URLs (and where useful, short excerpts) to extracted claims. |
| Research history | Persist past jobs so the user can list previous research runs. |
| Report viewing | Dedicated view of a completed (or failed) report, including logs and sources. |

---

## Development Architecture

### Frontend

- **Next.js App Router** (existing app in this repository)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

The frontend owns URL input, validation UX, start-research actions, progress and activity logs, report rendering, and research history.

### Backend

- **Node.js**
- **Express**
- **TypeScript**

The backend owns research job lifecycle, Firecrawl orchestration, LLM calls via the Vercel AI SDK, extraction/analysis pipeline, Prisma persistence, and APIs consumed by the Next.js app.

The Next.js app must not implement the research agent as its primary backend. Agent work runs on the Express service.

### AI

- **Vercel AI SDK** for model calls, structured output, and (where used) streaming.

### LLM

- Use an **environment-configured model provider**.
- Provider, model id, and API keys come from environment variables.
- Do not hardcode a vendor or model name in application logic beyond config defaults documented in env examples.

### Web research

- **Firecrawl** for website mapping, crawling, and page content retrieval.
- Stay on public pages of the submitted site (and clearly in-scope public pages discovered from it).
- Respect crawl limits, timeouts, and failure handling. Partial evidence is allowed; the report must say what was not found.

### Validation

- **Zod** for:
  - incoming URL / API payloads
  - agent step outputs
  - the structured intelligence report schema
  - environment config where practical

### Database

- **PostgreSQL**
- **Prisma**

Persist at least:

- research jobs (URL, status, timestamps, error)
- agent activity logs
- discovered/crawled page records as needed
- final structured reports and source URL lists

### Authentication

Do not implement yet.

### Payments

Do not implement.

### Deployment

Do not implement.

### Analytics

Do not implement.

### Monitoring

Do not implement.

---

## Agent pipeline (logical)

The backend research job should follow this order:

1. **Analyze target website** — fetch/understand the entry URL.
2. **Discover relevant pages** — map or link-discover candidate URLs.
3. **Crawl public pages** — retrieve content via Firecrawl within limits.
4. **Extract evidence** — pricing, products/features, technology signals, recent updates.
5. **Analyze** — synthesize findings, note gaps and confidence.
6. **Structured report** — validate with Zod and persist.
7. **UI** — expose status, logs, and report to the frontend.

Each step should emit activity log events the UI can show.

---

## Constraints and non-goals

- Prototype only; no auth, billing, deploy automation, analytics, or monitoring.
- Public web evidence only. No login walls, no credentialed scraping, no unauthorized access.
- Every material claim in the report should be traceable to a source URL or explicitly marked as inferred/unavailable.
- Do not invent pricing, features, or updates that were not evidenced in crawled content.
- Frontend and Express backend remain separate runtimes; they communicate over HTTP (and optionally a simple job-status protocol). Secrets stay on the server (Express / env), not in the browser.

---

## Document status

This file is the development source of truth. New features, stack changes, and scope changes must be reflected here before they are treated as required work.
