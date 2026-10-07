import { env } from "../config/env.js";
import { FirecrawlService } from "../services/firecrawl.service.js";
export function createScrapeWebsiteTool() {
    const apiKey = process.env.FIRECRAWL_API_KEY ?? env.FIRECRAWL_API_KEY;
    if (!apiKey) {
        throw new Error("FIRECRAWL_API_KEY is not configured.");
    }
    const service = new FirecrawlService({ apiKey });
    return {
        crawlPage: (url) => service.crawlPage(url),
    };
}
export const scrapeWebsiteTool = createScrapeWebsiteTool();
