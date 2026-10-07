import { z } from "zod";

const apiBaseUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

export const researchApiResponseSchema = z.object({
  success: z.literal(true),
  researchId: z.string().uuid(),
  status: z.literal("queued"),
});

export type ResearchApiResponse = z.infer<typeof researchApiResponseSchema>;

export type ResearchApiError = {
  message: string;
  status: number;
};

export type CreateResearchRequest = {
  companyUrl: string;
  researchScope: {
    pricing: boolean;
    features: boolean;
    products: boolean;
    technology: boolean;
    updates: boolean;
  };
};

function getApiUrl(): string {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_EXPRESS_API_URL is not configured.");
  }

  return apiBaseUrl.replace(/\/$/, "");
}

export async function createResearch(
  request: CreateResearchRequest
): Promise<ResearchApiResponse> {
  const response = await fetch(`${getApiUrl()}/api/research`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload
        ? String(payload.error)
        : "The research service could not process the request.";

    throw {
      message,
      status: response.status,
    } satisfies ResearchApiError;
  }

  const parsed = researchApiResponseSchema.safeParse(payload);

  if (!parsed.success) {
    throw {
      message: "The research service returned an invalid response.",
      status: response.status,
    } satisfies ResearchApiError;
  }

  return parsed.data;
}
