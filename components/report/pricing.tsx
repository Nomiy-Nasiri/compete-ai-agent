import { BadgeDollarSign, ExternalLink } from "lucide-react";

import type { Report } from "@/lib/report-mock";
import { EvidenceStatusBadge } from "@/components/report/evidence-status";

export function Pricing({ pricing, sources }: { pricing: Report["pricing"]; sources: Report["sources"] }) {
  const getSource = (id: string) => sources.find((source) => source.id === id);

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BadgeDollarSign className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Pricing</h2>
          <p className="text-sm text-muted-foreground">Publicly visible plan information</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {pricing.map((plan) => {
          const source = getSource(plan.sourceId);

          return (
            <article key={plan.id} className="flex min-h-full flex-col rounded-lg border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{plan.price}</p>
                  <p className="text-xs text-muted-foreground">{plan.billingPeriod}</p>
                </div>
                <EvidenceStatusBadge status={plan.status} />
              </div>
              <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
              {source ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-primary underline-offset-4 hover:underline"
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
