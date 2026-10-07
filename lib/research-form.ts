import { z } from "zod";

export const RESEARCH_CATEGORIES = [
  "Pricing",
  "Features",
  "Products",
  "Technology",
  "Recent Updates",
] as const;

export type ResearchCategory = (typeof RESEARCH_CATEGORIES)[number];

export const researchFormSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "Competitor Website is required.")
    .refine((value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "Enter a valid http:// or https:// URL."),
  scopes: z
    .array(z.enum(RESEARCH_CATEGORIES))
    .min(1, "Select at least one research category."),
});

export type ResearchFormValues = z.infer<typeof researchFormSchema>;
