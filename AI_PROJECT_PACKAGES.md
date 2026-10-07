# AI Project Packages

## Application stack

| Area | Package or technology | Role |
| --- | --- | --- |
| Frontend | Next.js 16 | App Router and server-rendered UI |
| UI | React 19 | Component-driven interface |
| Styling | Tailwind CSS 4 | Utility-first styling |
| Components | shadcn/ui | Reusable interface components |
| Icons | lucide-react | Interface icons |
| Types | TypeScript 5 | Static typing |
| Backend | Express | Research API and orchestration |
| AI SDK | Vercel AI SDK | Model calls and structured output |
| Crawling | Firecrawl | Public page discovery and content retrieval |
| Validation | Zod | Request, step, environment, and report validation |
| Database ORM | Prisma | PostgreSQL access and schema management |
| Database | PostgreSQL | Research jobs, logs, pages, and reports |

## Current dependency status

The current project already includes Next.js, React, TypeScript, Tailwind CSS, shadcn, and Lucide packages.

The following packages are required for the planned backend and AI features and must be added before integration starts:

```bash
npm install express cors zod prisma @prisma/client firecrawl-mcp @ai-sdk/openai
npm install -D @types/express @types/cors tsx prisma
```

> The exact provider package depends on the configured LLM provider. Use an environment-selected provider rather than hardcoding a vendor.

## Package installation rules

- Use the root package manager for all workspaces.
- Keep runtime and development dependencies separated.
- Do not commit secrets or API keys.
- Add packages only when a concrete feature requires them.
- Review the installed version and compatibility before upgrading major dependencies.

## Suggested scripts

The following scripts should be added to the root package manifest:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:web\"",
    "dev:web": "next dev",
    "dev:server": "tsx watch server/index.ts",
    "build": "next build && tsc -p tsconfig.server.json",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}
```

## Package verification

Before submitting changes:

1. Run `npm run typecheck`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Run the relevant automated tests.
5. Confirm that adding a dependency does not introduce an unnecessary duplicate implementation.

## Security requirements

- Never expose API keys in source code or browser code.
- Keep provider configuration server-side.
- Validate all external inputs.
- Use Firecrawl only for public pages.
- Do not store credentials or unauthorized user content.
