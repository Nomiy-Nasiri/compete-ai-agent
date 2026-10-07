import { ExternalLink, Globe2 } from "lucide-react";

import type { Report } from "@/lib/report-mock";

export function CompanyOverview({ overview }: { overview: Report["companyOverview"] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Company Overview</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {overview.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {overview.description}
          </p>
        </div>
        <a
          href={overview.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Globe2 className="size-4" aria-hidden="true" />
          Website
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
