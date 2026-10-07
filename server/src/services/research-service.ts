import { randomUUID } from "node:crypto";

import type { ResearchRequest, ResearchScope } from "../schemas/research-request.js";

export type QueuedResearch = {
  researchId: string;
  status: "queued";
  companyUrl: string;
  researchScope: ResearchScope;
};

export function createQueuedResearch(request: ResearchRequest): QueuedResearch {
  return {
    researchId: randomUUID(),
    status: "queued",
    companyUrl: request.companyUrl,
    researchScope: request.researchScope,
  };
}
