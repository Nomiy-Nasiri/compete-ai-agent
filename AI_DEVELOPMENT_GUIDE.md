# AI Development Guide

## Purpose

This file gives AI assistants and developers a concise implementation baseline. Use it together with `docs/project.md`, `AGENTS.md`, and the current package manifest.

## Working rules

1. Read `docs/project.md` before changing product behavior.
2. Follow the repository's existing Next.js and TypeScript conventions.
3. Keep frontend and backend responsibilities separate.
4. Prefer small, focused changes with clear names.
5. Add tests for new behavior and fix broken tests as part of the same change.
6. Never expose secrets, credentials, or private data.
7. Document scope changes in `docs/project.md` before implementing them.

## Recommended project structure

```text
app/                 # Next.js App Router frontend
components/          # Reusable UI components
server/              # Express API, orchestration, and services
server/services/     # Firecrawl, AI, extraction, and analysis services
server/routes/       # API route handlers
server/types/        # Shared backend types
server/utils/        # Backend utilities
prisma/              # Prisma schema and migrations
lib/                 # Frontend utilities and client code
```

## API expectations

The backend should expose endpoints for:

- Creating a research job
- Retrieving job status and logs
- Retrieving a completed report
- Listing previous research jobs
- Handling research job errors

Use consistent response shapes:

```ts
{
  success: true,
  data: {},
  error: null
}
```

Validation errors must return a clear status and message. Unexpected errors must not leak internal stack traces.

## Research pipeline implementation order

1. Validate the submitted URL.
2. Create the research job record.
3. Start the job with the configured worker or service.
4. Analyze the entry page.
5. Discover relevant public pages.
6. Crawl the allowed pages.
7. Extract evidence.
8. Analyze evidence and identify uncertainty.
9. Validate the final report schema.
10. Persist the report and source references.
11. Update the job status.
12. Expose the result to the frontend.

## Evidence rules

- Use only public and permitted pages.
- Record every source URL used by a material claim.
- Mark unverified claims clearly.
- Do not invent pricing, features, or updates.
- Include limitations when evidence is incomplete.
- Prefer direct citations and short excerpts over unsupported summaries.

## Validation requirements

Use Zod for:

- URL and API request validation
- Research job creation input
- Agent step output
- Structured report output
- Environment configuration

## Verification checklist

Run these checks before considering a change complete:

```bash
npm run typecheck
npm run lint
npm run build
npm test
```

If the project does not yet define `npm test`, add the relevant test command before relying on it.

## Implementation notes for assistants

- Do not create a database model or UI feature that is absent from `docs/project.md` without updating the specification.
- Keep changes small and traceable.
- Preserve the existing Next.js App Router structure.
- Add the minimum dependencies necessary for each feature.
- Prefer integration tests that exercise real request and validation behavior over tests that only assert mock calls.
