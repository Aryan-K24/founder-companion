import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterviewPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Container>
      <PageHeader
        eyebrow={`Idea ${id}`}
        title="Founder Interview"
        description="This is where the AI-led interview will walk through your idea — its problem, audience, and assumptions — to build a clearer picture."
      />

      <div className="my-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-display text-lg font-semibold tracking-tight text-foreground">
          Interview flow coming soon
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Questions, responses, and the interview engine aren&apos;t built yet —
          this route is a placeholder reserved for that work.
        </p>
      </div>
    </Container>
  );
}
