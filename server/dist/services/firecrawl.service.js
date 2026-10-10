import { z } from "zod";
export const firecrawlPageSchema = z.object({
    success: z.boolean(),
    data: z
        .object({
        markdown: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        links: z.array(z.string()).optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
    })
        .optional(),
    error: z.string().optional(),
});
export class FirecrawlService {
    apiKey;
    baseUrl;
    constructor(options) {
        if (!options.apiKey.trim()) {
            throw new Error("FIRECRAWL_API_KEY is required.");
        }
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl ?? "https://api.firecrawl.dev";
    }
    async crawlPage(url, options = {}) {
        const validatedUrl = this.validateUrl(url);
        const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/v1/scrape`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: validatedUrl,
                formats: options.formats ?? ["markdown"],
            }),
        });
        let payload;
        try {
            payload = await response.json();
        }
        catch {
            throw new Error("Firecrawl returned an invalid response.");
        }
        const parsed = firecrawlPageSchema.safeParse(payload);
        if (!parsed.success) {
            throw new Error("Firecrawl returned an unexpected response.");
        }
        if (!parsed.data.success || parsed.data.error) {
            throw new Error(parsed.data.error ?? "Firecrawl failed to scrape the page.");
        }
        const data = parsed.data.data;
        return {
            success: true,
            sourceUrl: validatedUrl,
            title: data?.title?.trim() || undefined,
            description: data?.description?.trim() || undefined,
            content: data?.markdown?.trim() || "",
            ...(data?.links ? { links: data.links } : {}),
            metadata: {
                ...(data?.metadata ?? {}),
                sourceUrl: validatedUrl,
            },
        };
    }
    validateUrl(url) {
        const value = url.trim();
        if (!value) {
            throw new Error("A URL is required.");
        }
        try {
            const parsed = new URL(value);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                throw new Error("companyUrl must be a valid http or https URL.");
            }
            return parsed.toString();
        }
        catch (error) {
            if (error instanceof Error && error.message.includes("http or https")) {
                throw error;
            }
            throw new Error("companyUrl must be a valid http or https URL.");
        }
    }
}
