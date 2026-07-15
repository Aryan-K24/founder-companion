import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Container>
      <PageHeader
        eyebrow={`Idea ${id}`}
        title="Evaluation Report"
        description="This is where the evidence-based analysis of your idea will live — market signals, risks, and an overall read on viability."
      />

      <div className="my-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-display text-lg font-semibold tracking-tight text-foreground">
          Report coming soon
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Research, scoring, and the report generation logic aren&apos;t built
          yet — this route is a placeholder reserved for that work.
        </p>
      </div>
    </Container>
  );
}
