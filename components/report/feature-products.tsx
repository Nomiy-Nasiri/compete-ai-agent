import { Boxes, Sparkles } from "lucide-react";

import type { Report } from "@/lib/report-mock";
import { EvidenceStatusBadge } from "@/components/report/evidence-status";

export function CoreFeatures({ features }: { features: Report["coreFeatures"] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <Sparkles className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Core Features</h2>
          <p className="text-sm text-muted-foreground">Capabilities supported by available evidence</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.id} className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium text-foreground">{feature.name}</h3>
              <EvidenceStatusBadge status={feature.status} />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Products({ products }: { products: Report["products"] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Boxes className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">Services and product offerings described publicly</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.id} className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium text-foreground">{product.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{product.category}</p>
              </div>
              <EvidenceStatusBadge status={product.status} />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
