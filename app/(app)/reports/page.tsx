import { CompanyOverview } from "@/components/report/company-overview";
import { CoreFeatures, Products } from "@/components/report/feature-products";
import { Pricing } from "@/components/report/pricing";
import { ReportAnalysis, ReportSources } from "@/components/report/report-sources";
import { RecentUpdates, TechnologySignals } from "@/components/report/technology-updates";
import { PageContainer } from "@/components/layout/page-container";
import { MOCK_REPORT } from "@/lib/report-mock";

export default function ReportsPage() {
  const report = MOCK_REPORT;

  return (
    <PageContainer className="max-w-6xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-primary">Competitor report</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Research report
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            A structured summary of public evidence, observed capabilities, and identified limitations.
          </p>
        </div>

        <CompanyOverview overview={report.companyOverview} />
        <Pricing pricing={report.pricing} sources={report.sources} />
        <CoreFeatures features={report.coreFeatures} />
        <Products products={report.products} />
        <TechnologySignals signals={report.technologySignals} sources={report.sources} />
        <RecentUpdates updates={report.recentUpdates} sources={report.sources} />
        <ReportSources sources={report.sources} />
        <ReportAnalysis analysis={report.analysis} />
      </div>
    </PageContainer>
  );
}
