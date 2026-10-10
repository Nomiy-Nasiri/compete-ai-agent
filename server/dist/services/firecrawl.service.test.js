import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { FirecrawlService } from "./firecrawl.service.js";
async function createFirecrawlTestServer(response) {
    const server = createServer((req, res) => {
        const body = [];
        req.on("data", (chunk) => body.push(Buffer.from(chunk)));
        req.on("end", () => {
            assert.equal(req.headers.authorization, "Bearer test-api-key");
            assert.equal(req.headers["content-type"], "application/json");
            assert.equal(req.method, "POST");
            assert.match(req.url ?? "", /^\/v1\/scrape/);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(response));
        });
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address === "object");
    return {
        server,
        url: `http://127.0.0.1:${address.port}/v1/scrape`,
    };
}
test("FirecrawlService crawls a valid URL and normalizes metadata", async () => {
    const server = await createFirecrawlTestServer({
        success: true,
        data: {
            markdown: "# Example\n\nWebsite content.",
            title: "Example Company",
            description: "Example description",
            links: ["https://example.com/pricing"],
            metadata: {
                language: "en",
                statusCode: 200,
            },
        },
    });
    try {
        const service = new FirecrawlService({
            apiKey: "test-api-key",
            baseUrl: server.url,
        });
        const result = await service.crawlPage("https://example.com");
        assert.deepEqual(result, {
            success: true,
            sourceUrl: "https://example.com/",
            title: "Example Company",
            description: "Example description",
            content: "# Example\n\nWebsite content.",
            links: ["https://example.com/pricing"],
            metadata: {
                language: "en",
                statusCode: 200,
                sourceUrl: "https://example.com/",
            },
        });
    }
    finally {
        await new Promise((resolve, reject) => server.server.close((error) => (error ? reject(error) : resolve())));
    }
});
test("FirecrawlService rejects unsupported protocols", async () => {
    const service = new FirecrawlService({ apiKey: "test-api-key" });
    await assert.rejects(service.crawlPage("ftp://example.com"), /http or https URL/);
});
test("FirecrawlService surfaces Firecrawl API failures", async () => {
    const server = await createFirecrawlTestServer({
        success: false,
        error: "Rate limit exceeded",
    });
    try {
        const service = new FirecrawlService({
            apiKey: "test-api-key",
            baseUrl: server.url,
        });
        await assert.rejects(service.crawlPage("https://example.com"), /Rate limit exceeded/);
    }
    finally {
        await new Promise((resolve, reject) => server.server.close((error) => (error ? reject(error) : resolve())));
    }
});
