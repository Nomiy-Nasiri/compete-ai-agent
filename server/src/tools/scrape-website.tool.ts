import { env } from "../config/env.js";
import {
  FirecrawlService,
  type FirecrawlPage,
  type FirecrawlScrapeOptions,
} from "../services/firecrawl.service.js";

export type CrawlPageOptions = {
  url: string;
};

export type CrawlPageTool = {
  crawlPage(
    url: string,
    options?: FirecrawlScrapeOptions
  ): Promise<FirecrawlPage>;
};

export function createScrapeWebsiteTool(): CrawlPageTool {
  return {
    crawlPage: (url, options) => {
      const apiKey = process.env.FIRECRAWL_API_KEY ?? env.FIRECRAWL_API_KEY;

      if (!apiKey) {
        throw new Error("FIRECRAWL_API_KEY is not configured.");
      }

      return new FirecrawlService({ apiKey }).crawlPage(url, options);
    },
  };
}

export const scrapeWebsiteTool = createScrapeWebsiteTool();
