import { PageContainer } from "@/components/layout/page-container";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageContainer>
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </PageContainer>
  );
}
