# AI Project Overview

## Product

Competitor Intelligence Agent is an AI-powered research application that accepts a competitor website URL, gathers public evidence, and produces a structured competitor intelligence report.

## Primary users

- Founders
- Product managers
- Operators and analysts

## Core workflow

1. Enter a valid public competitor website URL.
2. Create a research job.
3. Analyze the target website.
4. Discover relevant public pages.
5. Crawl allowed pages within defined limits.
6. Extract pricing, products, features, technology signals, and updates.
7. Analyze the evidence and identify gaps.
8. Produce a validated structured report with source URLs.
9. Display status, logs, and the final report in the interface.
10. Allow users to reopen previous research jobs.

## Architecture

- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Node.js and Express with TypeScript
- **AI:** Vercel AI SDK
- **Web research:** Firecrawl
- **Validation:** Zod
- **Database:** PostgreSQL with Prisma

The frontend must remain a separate presentation layer. The research agent and persistence logic belong in the Express backend.

## Success criteria

- Research starts only after URL validation succeeds.
- Every research stage has a visible status.
- Agent activity is readable and persisted.
- Claims are traceable to public source URLs.
- Unknown or unavailable information is clearly labeled.
- Failed jobs return actionable error details.
- Completed reports can be opened from research history.

## Out of scope

- Authentication
- Payments
- Deployment automation
- Production monitoring
- Analytics
- Credentialed scraping
- Access to private or unauthorized data

## Source of truth

The detailed product specification is in `docs/project.md`. Treat it as the authoritative definition for features, architecture, constraints, and scope.
