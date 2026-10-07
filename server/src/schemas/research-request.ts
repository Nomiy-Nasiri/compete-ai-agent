import { z } from "zod";

export const researchScopeSchema = z.object({
  pricing: z.boolean(),
  features: z.boolean(),
  products: z.boolean(),
  technology: z.boolean(),
  updates: z.boolean(),
});

export const researchRequestSchema = z.object({
  companyUrl: z
    .string()
    .trim()
    .min(1, "companyUrl is required.")
    .refine((value) => {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    }, "companyUrl must be a valid http or https URL."),
  researchScope: researchScopeSchema,
});

export type ResearchScope = z.infer<typeof researchScopeSchema>;
export type ResearchRequest = z.infer<typeof researchRequestSchema>;
