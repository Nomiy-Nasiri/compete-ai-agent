import { ExternalLink, SearchX } from "lucide-react";
import Link from "next/link";

import { ResearchStatusBadge } from "@/components/research/research-status";
import type { ResearchJob, ResearchStatus } from "@/lib/mock-research";
import { cn } from "@/lib/utils";

function ResearchHistoryRow({ job }: { job: ResearchJob }) {
  return (
    <tr className="border-t border-border text-sm transition-colors hover:bg-muted/40">
      <td className="px-4 py-4 sm:px-6">
        <div className="font-medium text-foreground">{job.company}</div>
      </td>
      <td className="px-4 py-4 sm:px-6">
        <a
          href={job.website}
          target="_blank"
          rel="noreferrer"
          className="max-w-xs truncate text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {job.website}
        </a>
      </td>
      <td className="px-4 py-4 sm:px-6">
        <ResearchStatusBadge status={job.status} />
      </td>
      <td className="px-4 py-4 text-muted-foreground sm:px-6">{job.startedAt}</td>
      <td className="px-4 py-4 sm:px-6">
        <Link
          href={`/research/${job.id}`}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View report
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </Link>
      </td>
    </tr>
  );
}

export function ResearchHistoryTable({ jobs }: { jobs: ResearchJob[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Company</th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Website</th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Status</th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Research date</th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Report</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <ResearchHistoryRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ResearchHistoryList({ jobs }: { jobs: ResearchJob[] }) {
  return (
    <div className="grid gap-3 sm:hidden">
      {jobs.map((job) => (
        <article key={job.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-medium text-foreground">{job.company}</h2>
              <a
                href={job.website}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block max-w-full truncate text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {job.website}
              </a>
            </div>
            <ResearchStatusBadge status={job.status} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="text-muted-foreground">Research date</dt>
              <dd className="mt-1 text-foreground">{job.startedAt}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="mt-1 text-foreground">{job.status}</dd>
            </div>
          </dl>
          <Link
            href={`/research/${job.id}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View report
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ResearchHistoryEmpty({
  search,
  status,
}: {
  search: string;
  status: ResearchStatus | "all";
}) {
  const hasFilters = search.trim().length > 0 || status !== "all";

  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-sm">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchX className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-lg font-medium text-foreground">
        No research matches your filters
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {hasFilters
          ? "Try adjusting your search or status filter to find another research job."
          : "Start your first competitor analysis to populate your research history."}
      </p>
      {!hasFilters ? (
        <Link href="/research/new" className={cn("mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80")}>Start research</Link>
      ) : null}
    </div>
  );
}
