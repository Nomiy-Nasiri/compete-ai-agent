import { ArrowLeft, ExternalLink, Globe2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import {
  ResearchActivityTimeline,
  ResearchProgress,
} from "@/components/research/research-activity";
import { ResearchStatusBadge } from "@/components/research/research-status";
import { RESEARCH_JOBS } from "@/lib/mock-research";

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = RESEARCH_JOBS[id];

  if (!job) {
    notFound();
  }

  return (
    <PageContainer className="max-w-5xl">
      <div className="mb-6">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Research History
        </Link>
      </div>

      <header className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary">Research Job</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {job.company}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="size-4" aria-hidden="true" />
                {job.website}
              </span>
              <span aria-hidden="true">•</span>
              <span>{job.domain}</span>
            </div>
          </div>
          <ResearchStatusBadge status={job.status} />
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:text-sm">
          <span>Started: {job.startedAt}</span>
          <span aria-hidden="true">•</span>
          <span>Updated: {job.updatedAt}</span>
        </div>
      </header>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-foreground">Research status</h2>
              <p className="text-sm text-muted-foreground">Current progress across the research pipeline</p>
            </div>
            <a
              href={job.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Website
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-6">
            <ResearchProgress value={job.progress} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {job.status === "completed"
              ? "Competitor research is complete and ready for review."
              : job.status === "failed"
                ? "Research stopped because the required information could not be collected."
                : job.status === "running"
                  ? "The research agent is actively collecting and analyzing evidence."
                  : "The research job is queued and waiting to begin."}
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-medium text-foreground">Research details</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <dt className="text-muted-foreground">Company</dt>
              <dd className="font-medium text-foreground">{job.company}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <dt className="text-muted-foreground">Domain</dt>
              <dd className="font-medium text-foreground">{job.domain}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd><ResearchStatusBadge status={job.status} /></dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Progress</dt>
              <dd className="font-medium text-foreground">{job.progress}%</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground">Agent Activity Timeline</h2>
          <p className="text-sm text-muted-foreground">Recent steps completed by the research agent</p>
        </div>
        <ResearchActivityTimeline activities={job.activities} />
      </section>
    </PageContainer>
  );
}
