import { z } from "zod";

export const evidenceStatusSchema = z.enum(["confirmed", "inferred", "unavailable"]);
export type EvidenceStatus = z.infer<typeof evidenceStatusSchema>;

const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  type: z.enum(["Website", "Pricing", "Blog", "Documentation", "Changelog"]),
});

const companyOverviewSchema = z.object({
  name: z.string(),
  website: z.string().url(),
  description: z.string(),
});

const pricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  billingPeriod: z.string(),
  limitations: z.array(z.string()),
  sourceId: z.string(),
  status: evidenceStatusSchema,
});

const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sourceId: z.string(),
  status: evidenceStatusSchema,
});

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  sourceId: z.string(),
  status: evidenceStatusSchema,
});

const technologySignalSchema = z.object({
  id: z.string(),
  technology: z.string(),
  category: z.string(),
  evidence: z.string(),
  confidence: z.enum(["High", "Medium", "Low"]),
  sourceId: z.string(),
  status: evidenceStatusSchema,
});

const updateSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  sourceId: z.string(),
  status: evidenceStatusSchema,
});

export const reportSchema = z.object({
  companyOverview: companyOverviewSchema,
  pricing: z.array(pricingPlanSchema),
  coreFeatures: z.array(featureSchema),
  products: z.array(productSchema),
  technologySignals: z.array(technologySignalSchema),
  recentUpdates: z.array(updateSchema),
  sources: z.array(sourceSchema),
  analysis: z.object({
    summary: z.string(),
    limitations: z.array(z.string()),
  }),
});

export type ReportSource = z.infer<typeof sourceSchema>;
export type Report = z.infer<typeof reportSchema>;

export const MOCK_REPORT: Report = {
  companyOverview: {
    name: "Northstar Labs",
    website: "https://northstarlabs.com",
    description:
      "Northstar Labs develops workflow automation and analytics tools for product and operations teams.",
  },
  pricing: [
    {
      id: "plan-starter",
      name: "Starter",
      price: "$29",
      billingPeriod: "per seat / month",
      limitations: ["Up to 3 integrations", "Email support only"],
      sourceId: "source-pricing",
      status: "confirmed",
    },
    {
      id: "plan-growth",
      name: "Growth",
      price: "$79",
      billingPeriod: "per seat / month",
      limitations: ["Annual billing required for custom reporting"],
      sourceId: "source-pricing",
      status: "confirmed",
    },
    {
      id: "plan-enterprise",
      name: "Enterprise",
      price: "Custom",
      billingPeriod: "custom quote",
      limitations: ["Pricing and contract terms are not publicly disclosed"],
      sourceId: "source-pricing",
      status: "inferred",
    },
  ],
  coreFeatures: [
    {
      id: "feature-workflows",
      name: "Workflow Automation",
      description: "Create repeatable operational sequences across connected business tools.",
      sourceId: "source-product",
      status: "confirmed",
    },
    {
      id: "feature-analytics",
      name: "Operational Analytics",
      description: "Track performance, adoption, and team activity through shared dashboards.",
      sourceId: "source-product",
      status: "confirmed",
    },
    {
      id: "feature-auditing",
      name: "Audit Trail",
      description: "Review changes and activity across automated processes and key decisions.",
      sourceId: "source-docs",
      status: "inferred",
    },
  ],
  products: [
    {
      id: "product-ops-suite",
      name: "Ops Suite",
      description: "A unified platform for automating operational workflows and reporting.",
      category: "Platform",
      sourceId: "source-product",
      status: "confirmed",
    },
    {
      id: "product-analytics",
      name: "Analytics Workspace",
      description: "A dashboard product for measuring workflow performance and adoption.",
      category: "Analytics",
      sourceId: "source-product",
      status: "confirmed",
    },
    {
      id: "product-api",
      name: "Developer API",
      description: "Programmatic integration layer for custom data and workflow connections.",
      category: "Integration",
      sourceId: "source-docs",
      status: "inferred",
    },
  ],
  technologySignals: [
    {
      id: "tech-nextjs",
      technology: "Next.js",
      category: "Frontend framework",
      evidence: "Observed from public page markup and deployment identifiers.",
      confidence: "High",
      sourceId: "source-website",
      status: "confirmed",
    },
    {
      id: "tech-postgres",
      technology: "PostgreSQL",
      category: "Data platform",
      evidence: "Referenced in public infrastructure documentation.",
      confidence: "Medium",
      sourceId: "source-docs",
      status: "confirmed",
    },
    {
      id: "tech-unknown",
      technology: "Custom AI orchestration",
      category: "AI infrastructure",
      evidence: "Not publicly documented in available sources.",
      confidence: "Low",
      sourceId: "source-website",
      status: "unavailable",
    },
  ],
  recentUpdates: [
    {
      id: "update-workflow-templates",
      title: "Workflow templates expanded",
      date: "September 2026",
      summary: "Added new templates for cross-functional operations and reporting workflows.",
      sourceId: "source-blog",
      status: "confirmed",
    },
    {
      id: "update-audit-controls",
      title: "Expanded audit controls",
      date: "August 2026",
      summary: "Introduced additional controls for review history and configuration changes.",
      sourceId: "source-blog",
      status: "confirmed",
    },
    {
      id: "update-ml-roadmap",
      title: "AI-assisted automations announced",
      date: "Not publicly dated",
      summary: "The roadmap mentions AI-assisted automation, but no implementation details were confirmed.",
      sourceId: "source-roadmap",
      status: "inferred",
    },
  ],
  sources: [
    {
      id: "source-website",
      title: "Northstar Labs homepage",
      url: "https://northstarlabs.com",
      type: "Website",
    },
    {
      id: "source-pricing",
      title: "Northstar Labs pricing",
      url: "https://northstarlabs.com/pricing",
      type: "Pricing",
    },
    {
      id: "source-product",
      title: "Product overview",
      url: "https://northstarlabs.com/products",
      type: "Website",
    },
    {
      id: "source-docs",
      title: "Platform documentation",
      url: "https://docs.northstarlabs.com",
      type: "Documentation",
    },
    {
      id: "source-blog",
      title: "Product blog",
      url: "https://northstarlabs.com/blog",
      type: "Blog",
    },
    {
      id: "source-roadmap",
      title: "Public roadmap",
      url: "https://northstarlabs.com/roadmap",
      type: "Changelog",
    },
  ],
  analysis: {
    summary:
      "Northstar Labs presents a broad workflow automation platform with analytics, integrations, and operational tooling. Public evidence supports its core product positioning, while some enterprise capabilities and AI details remain unverified.",
    limitations: [
      "Enterprise pricing and contract details are not publicly disclosed.",
      "Some product capabilities are described as planned rather than currently available.",
      "AI claims cannot be confirmed without direct product evidence.",
    ],
  },
};
