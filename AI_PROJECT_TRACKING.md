# AI Project Tracking

**Last updated:** 2026-10-07
**Update rule:** This file must be updated after any edit, task completion, dependency change, or milestone status change.

## Current status

- **Project:** Competitor Intelligence Agent
- **Application:** Next.js 16 prototype with React 19 and Tailwind CSS
- **Frontend:** Dashboard, reports, research, settings, responsive navigation, and shared UI components are present
- **Backend:** Not implemented yet
- **Database and AI integration:** Planned
- **Status:** Frontend foundation and product specification are present; backend, database, AI, and crawling implementation are pending

## Milestone overview

### Milestone 1 — Foundation

- [ ] Define shared API contracts between frontend and backend
- [ ] Add environment variable examples
- [ ] Create the Express backend structure
- [ ] Add TypeScript and linting configuration
- [ ] Add database schema and Prisma setup

### Milestone 2 — Research job lifecycle

- [ ] Add validation for incoming research requests
- [ ] Create research jobs
- [ ] Support queued, running, succeeded, and failed states
- [ ] Persist activity logs
- [ ] Add job retrieval endpoints

### Milestone 3 — Web research pipeline

- [ ] Add Firecrawl client integration
- [ ] Discover relevant public pages
- [ ] Crawl pages with configured limits
- [ ] Extract pricing, features, technology, and updates
- [ ] Preserve source URLs and excerpts
- [ ] Handle crawl and provider failures gracefully

### Milestone 4 — AI analysis and reporting

- [ ] Add provider and model configuration
- [ ] Call the LLM through the Vercel AI SDK
- [ ] Validate AI output with Zod
- [ ] Generate the structured intelligence report
- [ ] Store report results and source references

### Milestone 5 — Frontend experience

- [ ] Connect URL submission to the backend
- [ ] Display research progress and status
- [ ] Stream or poll activity logs
- [ ] Show report details and sources
- [ ] Add research history and error states
- [ ] Improve accessibility and loading UX

### Milestone 6 — Quality and integration

- [ ] Add end-to-end tests for the core flow
- [ ] Add unit tests for validation and report schemas
- [ ] Add error handling and retries where appropriate
- [ ] Run linting, type checking, tests, and builds
- [ ] Review security and public-data constraints

## Definitions

- **Queued:** A job has been created but has not started.
- **Running:** The agent is processing the job.
- **Succeeded:** The report was generated and validated.
- **Failed:** The job ended with an error that must be surfaced.

## Change rule

Before implementation begins, update `docs/project.md` and the relevant AI documentation when scope, architecture, or requirements change.

## Current implementation notes

- The root app is already a Next.js 16 project with React 19.
- Existing UI pages provide navigation, dashboard, reports, research, and settings placeholders.
- The frontend has reusable layout and UI components, including the app shell, sidebar, header, mobile navigation, and avatar.
- Backend files, database infrastructure, AI orchestration, and web crawling are not yet present.
- The current package manifest does not include Express, Prisma, Firecrawl, Zod, or Vercel AI SDK dependencies.
- No automated test suite is currently configured.
