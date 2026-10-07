import { NewResearchForm } from "@/components/research/new-research-form";
import { PageContainer } from "@/components/layout/page-container";

export default function NewResearchPage() {
  return (
    <PageContainer>
      <div className="max-w-3xl">
        <div className="mb-8 space-y-2">
          <p className="text-sm font-medium text-primary">Competitor research</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            New Research
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Review public information about a competitor and select the evidence areas you want the agent to explore.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
          <NewResearchForm />
        </div>
      </div>
    </PageContainer>
  );
}
