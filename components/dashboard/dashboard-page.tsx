import { ArrowRight, CheckCircle2, CircleDashed, LayoutDashboard, Search, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { researchSummary, recentResearch, type ResearchStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<ResearchStatus, string> = {
  Completed: "bg-emerald-500/10 text-emerald-700 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400",
  Running: "bg-amber-500/10 text-amber-700 ring-1 ring-inset ring-amber-500/20 dark:text-amber-400",
  Failed: "bg-red-500/10 text-red-700 ring-1 ring-inset ring-red-500/20 dark:text-red-400",
};

const statusIcons: Record<ResearchStatus, typeof CheckCircle2> = {
  Completed: CheckCircle2,
  Running: CircleDashed,
  Failed: XCircle,
};

function SummaryCard({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: number;
  icon: typeof LayoutDashboard;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm transition-colors duration-150",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-sm">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Search className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-lg font-medium text-foreground">
        Start your first competitor analysis
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Discover pricing, products, technology signals, and recent updates from a competitor&apos;s public website.
      </p>
      <Button className="mt-6" type="button">
        <Search className="size-4" aria-hidden="true" />
        New Research
      </Button>
    </div>
  );
}

export function DashboardPageContent() {
  const hasResearch = recentResearch.length > 0;

  return (
    <main className="min-h-full">
      <section className="flex flex-col gap-3 border-b border-border bg-card/50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Research overview</p>
            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Competitor Intelligence
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              Research competitors and turn public-facing evidence into clear, actionable intelligence with an AI agent.
            </p>
          </div>
          <Button type="button" size="lg" className="w-full sm:w-auto">
            <Search className="size-4" aria-hidden="true" />
            New Research
          </Button>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section aria-label="Research summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Research" value={researchSummary.total} icon={LayoutDashboard} />
          <SummaryCard label="Completed" value={researchSummary.completed} icon={CheckCircle2} className="border-emerald-500/20" />
          <SummaryCard label="Running" value={researchSummary.running} icon={CircleDashed} className="border-amber-500/20" />
          <SummaryCard label="Failed" value={researchSummary.failed} icon={XCircle} className="border-red-500/20" />
        </section>

        <section aria-labelledby="recent-research-heading" className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
            <div>
              <h2 id="recent-research-heading" className="text-lg font-medium text-foreground">
                Recent Research
              </h2>
              <p className="text-sm text-muted-foreground">Your latest competitor analyses</p>
            </div>
            {hasResearch ? (
              <Button variant="outline" type="button" className="hidden sm:inline-flex">
                View all
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            ) : null}
          </div>

          {hasResearch ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Company</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">URL</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Status</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Date</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentResearch.map((research) => {
                    const StatusIcon = statusIcons[research.status];

                    return (
                      <tr key={research.id} className="border-t border-border transition-colors hover:bg-muted/30">
                        <td className="px-4 py-4 sm:px-6">
                          <div className="font-medium text-foreground">{research.company}</div>
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <a
                            href={research.url}
                            target="_blank"
                            rel="noreferrer"
                            className="max-w-xs truncate text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                          >
                            {research.url}
                          </a>
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium", statusStyles[research.status])}>
                            <StatusIcon className="size-3.5" aria-hidden="true" />
                            {research.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground sm:px-6">{research.date}</td>
                        <td className="px-4 py-4 sm:px-6">
                          <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                            View Report
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}
