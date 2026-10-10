export const DISCOVERABLE_PAGE_TYPES = [
    "pricing",
    "features",
    "products",
    "solutions",
    "docs",
    "changelog",
    "blog",
    "about",
];
const PAGE_TYPE_PATTERNS = {
    pricing: /\b(pricing|price|plans?|billing|subscription|costs?)\b/i,
    features: /\b(features?|capabilities|functionality)\b/i,
    products: /\b(products?|platform|software|tools?)\b/i,
    solutions: /\b(solutions?|use cases?|industries)\b/i,
    docs: /\b(documentation|docs?|developers?|api reference|guides?|knowledge base)\b/i,
    changelog: /\b(changelog|release notes|what'?s new|product updates)\b/i,
    blog: /\b(blog|articles?|insights|newsroom)\b/i,
    about: /\b(about|our company|our team|who we are|company profile)\b/i,
};
const CLASSIFICATION_PRECEDENCE = [
    "pricing",
    "changelog",
    "docs",
    "solutions",
    "features",
    "products",
    "blog",
    "about",
];
const TRACKING_QUERY_PARAM = /^(utm_.+|fbclid|gclid|msclkid)$/i;
export function normalizePageUrl(value, baseUrl) {
    try {
        const url = baseUrl ? new URL(value, baseUrl) : new URL(value);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return null;
        }
        url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
        url.hash = "";
        for (const key of [...url.searchParams.keys()]) {
            if (TRACKING_QUERY_PARAM.test(key)) {
                url.searchParams.delete(key);
            }
        }
        url.searchParams.sort();
        if (url.pathname.length > 1) {
            url.pathname = url.pathname.replace(/\/+$/, "");
        }
        return url.toString();
    }
    catch {
        return null;
    }
}
export function classifyPage(url, title = "") {
    const pathname = new URL(url).pathname.replace(/[-_]+/g, " ");
    const titleText = title.replace(/[-_]+/g, " ");
    const pathMatchText = decodeURIComponent(pathname);
    for (const pageType of CLASSIFICATION_PRECEDENCE) {
        const pattern = PAGE_TYPE_PATTERNS[pageType];
        const titleMatches = pattern.test(titleText);
        const pathMatches = pattern.test(pathMatchText);
        if (titleMatches || pathMatches) {
            return {
                pageType,
                confidence: titleMatches && pathMatches ? 0.96 : titleMatches ? 0.84 : 0.78,
            };
        }
    }
    return null;
}
function getSiteRoot(hostname) {
    return hostname.toLowerCase().replace(/^www\./, "");
}
function isSameSite(candidateUrl, homepageUrl) {
    const candidateHost = getSiteRoot(new URL(candidateUrl).hostname);
    const homepageHost = getSiteRoot(new URL(homepageUrl).hostname);
    return (candidateHost === homepageHost ||
        candidateHost.endsWith(`.${homepageHost}`) ||
        (candidateHost.split(".").length >= 2 &&
            homepageHost.endsWith(`.${candidateHost}`)));
}
function getFallbackTitle(url) {
    const path = new URL(url).pathname;
    const segment = path.split("/").filter(Boolean).at(-1);
    if (!segment) {
        return new URL(url).hostname;
    }
    return decodeURIComponent(segment)
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}
function getMarkdownLinkTitles(markdown, baseUrl) {
    const titles = new Map();
    const markdownLinkPattern = /\[([^\]]+)\]\(([^)\s]+)(?:\s+[^)]*)?\)/g;
    for (const match of markdown.matchAll(markdownLinkPattern)) {
        const title = match[1]?.trim();
        const normalizedUrl = match[2]
            ? normalizePageUrl(match[2], baseUrl)
            : null;
        if (title && normalizedUrl && !titles.has(normalizedUrl)) {
            titles.set(normalizedUrl, title);
        }
    }
    return titles;
}
export class PageDiscoveryService {
    crawler;
    constructor(crawler) {
        this.crawler = crawler;
    }
    async discoverPages(homepageUrl) {
        const normalizedHomepage = normalizePageUrl(homepageUrl);
        if (!normalizedHomepage) {
            throw new Error("Homepage must be a valid http or https URL.");
        }
        const crawled = await this.crawler.crawlPage(normalizedHomepage, {
            formats: ["markdown", "links"],
        });
        const titleHints = getMarkdownLinkTitles(crawled.content, normalizedHomepage);
        const candidates = new Map();
        for (const link of crawled.links ?? []) {
            const url = normalizePageUrl(link, normalizedHomepage);
            if (!url ||
                url === normalizedHomepage ||
                !isSameSite(url, normalizedHomepage)) {
                continue;
            }
            const title = titleHints.get(url);
            const current = candidates.get(url);
            if (!current || (!current.title && title)) {
                candidates.set(url, { url, title });
            }
        }
        const pages = new Map();
        for (const candidate of candidates.values()) {
            const title = candidate.title || getFallbackTitle(candidate.url);
            const classification = classifyPage(candidate.url, title);
            if (!classification) {
                continue;
            }
            pages.set(candidate.url, {
                url: candidate.url,
                pageType: classification.pageType,
                title,
                confidence: classification.confidence,
            });
        }
        return [...pages.values()].sort((left, right) => left.url.localeCompare(right.url));
    }
}
