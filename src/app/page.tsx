import Container from "@/components/layout/Container";
import PlaceholderCard from "@/components/ui/PlaceholderCard";

export default function HomePage() {
  return (
    <Container>
      <div className="flex flex-col items-center pb-20 pt-20 text-center sm:pt-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-accent">
          Founder Companion
        </p>
        <h1 className="font-display max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          What are you bringing today?
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          Start from a rough idea or an early vision. We&apos;ll help you turn it
          into a well-researched startup concept.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2">
        <PlaceholderCard
          size="large"
          tag="Concrete"
          title="I have an Idea"
          description="You already know roughly what you want to build. Begin a structured interview to pressure-test and shape it."
          href="/idea/new"
        />
        <PlaceholderCard
          size="large"
          tag="Early stage"
          title="I have a Vision"
          description="You have a direction or a problem you care about, but no fixed shape yet. Start exploring from there."
          href="/idea/new"
        />
      </div>
    </Container>
  );
}
