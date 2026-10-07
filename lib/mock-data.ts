export type ResearchStatus = "Completed" | "Running" | "Failed";

export type ResearchItem = {
  id: string;
  company: string;
  url: string;
  status: ResearchStatus;
  date: string;
};

export const researchSummary = {
  total: 12,
  completed: 8,
  running: 2,
  failed: 2,
};

export const recentResearch: ResearchItem[] = [
  {
    id: "r-101",
    company: "Northstar Labs",
    url: "https://northstarlabs.com",
    status: "Completed",
    date: "Oct 6, 2026",
  },
  {
    id: "r-102",
    company: "Aster Cloud",
    url: "https://astercloud.io",
    status: "Running",
    date: "Oct 5, 2026",
  },
  {
    id: "r-103",
    company: "Harbor Analytics",
    url: "https://harboranalytics.ai",
    status: "Completed",
    date: "Oct 4, 2026",
  },
  {
    id: "r-104",
    company: "Summit Forge",
    url: "https://summitforge.com",
    status: "Failed",
    date: "Oct 3, 2026",
  },
];
