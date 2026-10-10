import assert from "node:assert/strict";
import test from "node:test";
import { classifyPage, normalizePageUrl, PageDiscoveryService, } from "./page-discovery.service.js";
test("normalizePageUrl canonicalizes URLs and removes tracking data", () => {
    assert.equal(normalizePageUrl("HTTPS://Example.com/pricing/?utm_source=campaign&b=2&a=1#plans"), "https://example.com/pricing?a=1&b=2");
    assert.equal(normalizePageUrl("mailto:hello@example.com"), null);
    assert.equal(normalizePageUrl("../docs?utm_campaign=launch", "https://example.com/company/"), "https://example.com/docs");
});
test("discoverPages removes duplicate URLs and retains useful same-site pages", async () => {
    const service = new PageDiscoveryService({
        async crawlPage(url, options) {
            assert.equal(url, "https://example.com/");
            assert.deepEqual(options?.formats, ["markdown", "links"]);
            return {
                success: true,
                sourceUrl: url,
                content: [
                    "[Pricing](https://example.com/pricing/)",
                    "[Developer Documentation](https://docs.example.com/guide)",
                ].join("\n"),
                links: [
                    "https://example.com/pricing/?utm_source=nav",
                    "https://www.example.com/pricing#plans",
                    "https://docs.example.com/guide",
                    "https://other.example.net/pricing",
                    "https://example.com/",
                    "https://example.com/contact-us",
                ],
                metadata: { sourceUrl: url },
            };
        },
    });
    const pages = await service.discoverPages("https://example.com");
    assert.deepEqual(pages, [
        {
            url: "https://docs.example.com/guide",
            pageType: "docs",
            title: "Developer Documentation",
            confidence: 0.96,
        },
        {
            url: "https://example.com/pricing",
            pageType: "pricing",
            title: "Pricing",
            confidence: 0.96,
        },
    ]);
});
test("classifyPage recognizes page types from titles and URL clues", () => {
    assert.deepEqual(classifyPage("https://example.com/learn", "API Documentation"), { pageType: "docs", confidence: 0.84 });
    assert.deepEqual(classifyPage("https://example.com/product-updates", "Product Updates"), { pageType: "changelog", confidence: 0.96 });
    assert.deepEqual(classifyPage("https://example.com/for-healthcare", "Solutions for Healthcare"), { pageType: "solutions", confidence: 0.84 });
    assert.equal(classifyPage("https://example.com/contact"), null);
});
