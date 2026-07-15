import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export default function NewIdeaPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="New idea"
        title="Let's start shaping it"
        description="This is where you'll begin a new startup idea or vision. In a later phase, this page will kick off the structured founder interview and create a workspace for you."
      />

      <div className="my-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-display text-lg font-semibold tracking-tight text-foreground">
          Idea intake coming soon
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          The intake form, interview flow, and idea creation logic aren&apos;t
          built yet — this route is a placeholder reserved for that work.
        </p>
      </div>
    </Container>
  );
}
