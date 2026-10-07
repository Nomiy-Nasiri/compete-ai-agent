import { env } from "../config/env.js";
import { FirecrawlService, type FirecrawlPage } from "../services/firecrawl.service.js";

export type CrawlPageOptions = {
  url: string;
};

export type CrawlPageTool = {
  crawlPage(url: string): Promise<FirecrawlPage>;
};

export function createScrapeWebsiteTool(): CrawlPageTool {
  const apiKey = process.env.FIRECRAWL_API_KEY ?? env.FIRECRAWL_API_KEY;

  if (!apiKey) {
    throw new Error("FIRECRAWL_API_KEY is not configured.");
  }

  const service = new FirecrawlService({ apiKey });

  return {
    crawlPage: (url: string) => service.crawlPage(url),
  };
}

export const scrapeWebsiteTool = createScrapeWebsiteTool();
