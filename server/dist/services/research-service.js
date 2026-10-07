import { randomUUID } from "node:crypto";
export function createQueuedResearch(request) {
    return {
        researchId: randomUUID(),
        status: "queued",
        companyUrl: request.companyUrl,
        researchScope: request.researchScope,
    };
}
