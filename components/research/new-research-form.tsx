"use client";

import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createResearch } from "@/lib/api/research";
import { cn } from "@/lib/utils";
import {
  RESEARCH_CATEGORIES,
  researchFormSchema,
  type ResearchCategory,
  type ResearchFormValues,
} from "@/lib/research-form";

const initialScopes: ResearchCategory[] = [...RESEARCH_CATEGORIES];

export function NewResearchForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [scopes, setScopes] = useState<ResearchCategory[]>(initialScopes);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleScope = (category: ResearchCategory) => {
    setScopes((current) => {
      if (current.includes(category)) {
        return current.filter((value) => value !== category);
      }

      return [...current, category];
    });

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const values: ResearchFormValues = { url, scopes };
    const result = researchFormSchema.safeParse(values);

    if (!result.success) {
      const issue = result.error.issues[0];
      setError(issue.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const research = await createResearch({
        companyUrl: result.data.url,
        researchScope: {
          pricing: result.data.scopes.includes("Pricing"),
          features: result.data.scopes.includes("Features"),
          products: result.data.scopes.includes("Products"),
          technology: result.data.scopes.includes("Technology"),
          updates: result.data.scopes.includes("Recent Updates"),
        },
      });

      router.push(`/research/${research.researchId}`);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : typeof requestError === "object" && requestError !== null && "message" in requestError
            ? String(requestError.message)
            : "Unable to start research. Please try again.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || url.trim().length === 0 || scopes.length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full" aria-describedby={error ? "research-form-error" : undefined}>
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="competitor-website" className="text-sm font-medium text-foreground">
            Competitor Website
          </label>
          <input
            id="competitor-website"
            name="url"
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              if (error) {
                setError(null);
              }
            }}
            placeholder="https://example.com"
            autoComplete="url"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "research-form-error" : undefined}
            disabled={isSubmitting}
            className={cn(
              "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-3 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:border-destructive focus:ring-destructive/20"
            )}
          />
          <p className="text-xs text-muted-foreground">
            Enter the public website you want to research.
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">Research scope</legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH_CATEGORIES.map((category) => {
              const checked = scopes.includes(category);

              return (
                <label
                  key={category}
                  className={cn(
                    "flex cursor-pointer select-none items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus-within:ring-2 focus-within:ring-ring/50",
                    checked
                      ? "border-primary/30 bg-primary/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleScope(category)}
                    disabled={isSubmitting}
                    className="size-4 accent-primary"
                  />
                  <span>{category}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {error ? (
          <p id="research-form-error" role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            Research starts after the URL and scope are validated.
          </p>
          <Button type="submit" disabled={isDisabled} className="w-full sm:w-auto" aria-busy={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Starting Research...
              </>
            ) : (
              <>
                <Search className="size-4" aria-hidden="true" />
                Start Research
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
