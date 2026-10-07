import { CalendarClock, Cpu, ExternalLink, Newspaper } from "lucide-react";

import { EvidenceStatusBadge } from "@/components/report/evidence-status";
import type { Report } from "@/lib/report-mock";

export function TechnologySignals({ signals, sources }: { signals: Report["technologySignals"]; sources: Report["sources"] }) {
  const getSource = (id: string) => sources.find((source) => source.id === id);

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Cpu className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Technology Signals</h2>
          <p className="text-sm text-muted-foreground">Publicly observable technology and infrastructure evidence</p>
        </div>
      </div>
      <div className="space-y-3">
        {signals.map((signal) => {
          const source = getSource(signal.sourceId);

          return (
            <article key={signal.id} className="rounded-lg border border-border bg-background p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{signal.technology}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{signal.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{signal.confidence} confidence</span>
                  <EvidenceStatusBadge status={signal.status} />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{signal.evidence}</p>
              {source ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Evidence source
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function RecentUpdates({ updates, sources }: { updates: Report["recentUpdates"]; sources: Report["sources"] }) {
  const getSource = (id: string) => sources.find((source) => source.id === id);

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Newspaper className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recent Updates</h2>
          <p className="text-sm text-muted-foreground">Publicly reported product and company changes</p>
        </div>
      </div>
      <div className="space-y-4">
        {updates.map((update) => {
          const source = getSource(update.sourceId);

          return (
            <article key={update.id} className="rounded-lg border border-border bg-background p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{update.title}</h3>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5" aria-hidden="true" />
                    {update.date}
                  </div>
                </div>
                <EvidenceStatusBadge status={update.status} />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{update.summary}</p>
              {source ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Source
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
