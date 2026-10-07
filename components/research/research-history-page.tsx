"use client";

import { Filter, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ResearchHistoryEmpty,
  ResearchHistoryList,
  ResearchHistoryTable,
} from "@/components/research/research-history-table";
import { RESEARCH_JOBS, type ResearchStatus } from "@/lib/mock-research";
import { Button } from "@/components/ui/button";

const FILTER_OPTIONS: Array<{ value: ResearchStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "queued", label: "Queued" },
  { value: "running", label: "Running" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

export function ResearchHistoryPageContent() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ResearchStatus | "all">("all");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return Object.values(RESEARCH_JOBS).filter((job) => {
      const matchesSearch =
        query.length === 0 ||
        job.company.toLowerCase().includes(query) ||
        job.website.toLowerCase().includes(query) ||
        job.domain.toLowerCase().includes(query);

      const matchesStatus = status === "all" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  return (
    <main className="min-h-full">
      <section className="border-b border-border bg-card/50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Research history</p>
            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Competitor research
            </h1>
          </div>
          <Link
            href="/research/new"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            New research
          </Link>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block flex-1">
              <span className="sr-only">Search research history</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search companies or websites"
                className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              />
            </label>

            <label className="relative block sm:w-52">
              <span className="sr-only">Filter research by status</span>
              <Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as ResearchStatus | "all")}
                className="h-10 w-full appearance-none rounded-lg border border-input bg-background pl-9 pr-9 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {(search || status !== "all") && (
              <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                <X className="size-4" aria-hidden="true" />
                Clear
              </Button>
            )}
          </div>
        </section>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredJobs.length} {filteredJobs.length === 1 ? "research" : "researches"}
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <>
            <div className="hidden sm:block">
              <ResearchHistoryTable jobs={filteredJobs} />
            </div>
            <ResearchHistoryList jobs={filteredJobs} />
          </>
        ) : (
          <ResearchHistoryEmpty search={search} status={status} />
        )}
      </div>
    </main>
  );
}
