import Container from "@/components/layout/Container";
import Link from "next/link";
import {
  Lightbulb,
  Compass,
  ArrowRight,
  Skull,
  ShieldCheck,
  TrendingUp,
  Search,
} from "lucide-react";

export default function HomePage() {
  return (
    <Container>
      {/* Hero Section */}
      <div className="flex flex-col items-center pb-16 pt-16 text-center sm:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          <span>AI-Powered Pre-Seed Due Diligence</span>
        </div>

        <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Stress-Test Your Startup <br className="hidden sm:block" />
          <span className="text-accent">Before You Waste 6 Months</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Founder Companion is a structured research and decision-support platform.
          We audit market incumbents, autopsy the startup graveyard, and invalidate fatal flaws before you write code.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/idea/new"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:opacity-95"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent"
          >
            <span>Explore Triage Workspace</span>
          </Link>
        </div>
      </div>

      {/* Two Entry Points */}
      <div className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2">
        <Link
          href="/idea/new"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all hover:border-accent hover:shadow-md"
        >
          <div>
            <div className="mb-4 inline-flex rounded-xl bg-accent-soft p-3 text-accent">
              <Lightbulb className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-accent">
              Solution-Driven
            </span>
            <h2 className="font-display text-xl font-bold text-foreground">
              &ldquo;I have an Idea&rdquo;
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              You already know what you want to build. Input your target audience, current workarounds, and monetization strategy to identify competitor blind spots.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:underline">
            Begin stress-test &rarr;
          </span>
        </Link>

        <Link
          href="/idea/new"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all hover:border-accent hover:shadow-md"
        >
          <div>
            <div className="mb-4 inline-flex rounded-xl bg-accent-soft p-3 text-accent">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-accent">
              Problem-Driven
            </span>
            <h2 className="font-display text-xl font-bold text-foreground">
              &ldquo;I have a Vision&rdquo;
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              You observed an acute industry headache but don&apos;t know the software shape yet. Explore market gaps and discover viable business model pathways.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:underline">
            Explore problem space &rarr;
          </span>
        </Link>
      </div>

      {/* Value Pillars Section */}
      <div className="mb-24 rounded-3xl border border-border bg-surface p-8 sm:p-12">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Why Generic AI Chatbots Fail Founders
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Standard conversational chatbots are tuned to be polite cheerleaders. Founder Companion operates as a ruthless venture investment committee.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="mb-3 text-red-600">
              <Skull className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              Startup Graveyard Autopsies
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Uncovers dead companies that attempted the same idea, how much capital they burned, and the exact trap that killed them.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="mb-3 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              Active Incumbent Vulnerabilities
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Analyzes existing market giants, their distribution moats, and the specific underserved cracks where a startup can enter.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="mb-3 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              The Mom Test Discovery Scripts
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Provides non-leading interview questions to test critical behavioral hypotheses before asking for commitments.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
