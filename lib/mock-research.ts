export type ResearchStatus = "queued" | "running" | "completed" | "failed";

export type ActivityItem = {
  id: string;
  label: string;
  timestamp: string;
  status: "pending" | "current" | "completed" | "failed";
};

export type ResearchJob = {
  id: string;
  company: string;
  website: string;
  domain: string;
  status: ResearchStatus;
  progress: number;
  startedAt: string;
  updatedAt: string;
  activities: ActivityItem[];
};

export const RESEARCH_JOBS: Record<string, ResearchJob> = {
  "northstar-labs": {
    id: "northstar-labs",
    company: "Northstar Labs",
    website: "https://northstarlabs.com",
    domain: "northstarlabs.com",
    status: "completed",
    progress: 100,
    startedAt: "Oct 6, 2026 · 09:15",
    updatedAt: "Oct 6, 2026 · 10:02",
    activities: [
      { id: "a1", label: "Initializing research agent", timestamp: "09:15", status: "completed" },
      { id: "a2", label: "Analyzing website structure", timestamp: "09:21", status: "completed" },
      { id: "a3", label: "Discovering pricing page", timestamp: "09:29", status: "completed" },
      { id: "a4", label: "Crawling pricing page", timestamp: "09:34", status: "completed" },
      { id: "a5", label: "Analyzing product features", timestamp: "09:46", status: "completed" },
      { id: "a6", label: "Checking recent updates", timestamp: "09:54", status: "completed" },
      { id: "a7", label: "Building competitor profile", timestamp: "09:58", status: "completed" },
      { id: "a8", label: "Validating research", timestamp: "10:02", status: "completed" },
    ],
  },
  "aster-cloud": {
    id: "aster-cloud",
    company: "Aster Cloud",
    website: "https://astercloud.io",
    domain: "astercloud.io",
    status: "running",
    progress: 72,
    startedAt: "Oct 5, 2026 · 14:40",
    updatedAt: "Oct 5, 2026 · 15:08",
    activities: [
      { id: "a1", label: "Initializing research agent", timestamp: "14:40", status: "completed" },
      { id: "a2", label: "Analyzing website structure", timestamp: "14:46", status: "completed" },
      { id: "a3", label: "Discovering pricing page", timestamp: "14:52", status: "completed" },
      { id: "a4", label: "Crawling pricing page", timestamp: "14:58", status: "current" },
      { id: "a5", label: "Analyzing product features", timestamp: "—", status: "pending" },
      { id: "a6", label: "Checking recent updates", timestamp: "—", status: "pending" },
      { id: "a7", label: "Building competitor profile", timestamp: "—", status: "pending" },
      { id: "a8", label: "Validating research", timestamp: "—", status: "pending" },
    ],
  },
  "summit-forge": {
    id: "summit-forge",
    company: "Summit Forge",
    website: "https://summitforge.com",
    domain: "summitforge.com",
    status: "failed",
    progress: 41,
    startedAt: "Oct 3, 2026 · 11:10",
    updatedAt: "Oct 3, 2026 · 11:35",
    activities: [
      { id: "a1", label: "Initializing research agent", timestamp: "11:10", status: "completed" },
      { id: "a2", label: "Analyzing website structure", timestamp: "11:15", status: "completed" },
      { id: "a3", label: "Discovering pricing page", timestamp: "11:21", status: "failed" },
      { id: "a4", label: "Crawling pricing page", timestamp: "—", status: "pending" },
      { id: "a5", label: "Analyzing product features", timestamp: "—", status: "pending" },
      { id: "a6", label: "Checking recent updates", timestamp: "—", status: "pending" },
      { id: "a7", label: "Building competitor profile", timestamp: "—", status: "pending" },
      { id: "a8", label: "Validating research", timestamp: "—", status: "pending" },
    ],
  },
};
