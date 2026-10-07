import { ExternalLink, Link2 } from "lucide-react";

import type { Report } from "@/lib/report-mock";

export function ReportSources({ sources }: { sources: Report["sources"] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Link2 className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Sources</h2>
          <p className="text-sm text-muted-foreground">Public sources used during research</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                {source.title}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-wide text-muted-foreground">
                {source.type}
              </span>
              <span className="mt-1 block truncate text-xs text-muted-foreground">{source.url}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ReportAnalysis({ analysis }: { analysis: Report["analysis"] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-foreground">Analysis</h2>
        <p className="text-sm text-muted-foreground">Key findings and evidence limitations</p>
      </div>
      <p className="text-sm leading-7 text-foreground">{analysis.summary}</p>
      <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Limitations</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {analysis.limitations.map((limitation) => (
            <li key={limitation} className="flex gap-2">
              <span className="text-amber-600 dark:text-amber-400" aria-hidden="true">•</span>
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
