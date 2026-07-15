import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssumptionsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Container>
      <PageHeader
        eyebrow={`Idea ${id}`}
        title="Assumption Board"
        description="This is where the key assumptions behind your idea will be tracked, tested, and revisited as the concept evolves."
      />

      <div className="my-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-display text-lg font-semibold tracking-tight text-foreground">
          Assumption board coming soon
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          The board layout and assumption tracking logic aren&apos;t built yet —
          this route is a placeholder reserved for that work.
        </p>
      </div>
    </Container>
  );
}
