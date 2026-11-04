import Container from "@/components/layout/Container";
import Link from "next/link";
import {
  Lightbulb,
  Compass,
  ArrowRight,
  History,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <Container>
      {/* Hero Section */}
      <div className="flex flex-col items-center pb-16 pt-16 text-center sm:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-xs font-semibold text-teal-800 shadow-xs">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-600"></span>
          <span>Early-Stage Market Validation & Intelligence</span>
        </div>

        <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Stress-Test Your Startup Idea <br className="hidden sm:block" />
          <span className="text-teal-700">Before You Spend 6 Months Building</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Founder Companion gives early founders structured competitive intelligence, historical post-mortems, and customer discovery frameworks before committing capital and engineering resources.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/idea/new"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <span>Explore Triage Workspace</span>
          </Link>
        </div>

        {/* Trust Points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            <span>Dual Market Coverage (Global + India)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            <span>Verified Post-Mortem Case Studies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            <span>Structured The Mom Test Discovery</span>
          </div>
        </div>
      </div>

      {/* Two Entry Points */}
      <div className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2">
        <Link
          href="/idea/new"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs transition-all hover:border-teal-600 hover:shadow-md"
        >
          <div>
            <div className="mb-4 inline-flex rounded-xl bg-teal-50 p-3 text-teal-700">
              <Lightbulb className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-teal-700">
              Solution-Driven
            </span>
            <h2 className="font-display text-xl font-bold text-slate-900">
              &ldquo;I have an Idea&rdquo;
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              You already know the product you want to build. Input your target audience, current customer workarounds, and monetization model to discover blind spots and competitive moats.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 group-hover:underline">
            Begin stress-test &rarr;
          </span>
        </Link>

        <Link
          href="/idea/new"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs transition-all hover:border-teal-600 hover:shadow-md"
        >
          <div>
            <div className="mb-4 inline-flex rounded-xl bg-teal-50 p-3 text-teal-700">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-teal-700">
              Problem-Driven
            </span>
            <h2 className="font-display text-xl font-bold text-slate-900">
              &ldquo;I have a Vision&rdquo;
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              You observed an acute industry headache but don&apos;t know the software shape yet. Explore market gaps and discover viable business model pathways.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 group-hover:underline">
            Explore problem space &rarr;
          </span>
        </Link>
      </div>

      {/* Value Pillars Section */}
      <div className="mb-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs sm:p-12">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Designed for Clear Decision-Making, Not Flattery
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Standard conversational chatbots are tuned to be polite cheerleaders. Founder Companion stress-tests your assumptions against real market incumbents, unit economics, and past post-mortems.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-colors hover:bg-slate-50">
            <div className="mb-3.5 inline-flex rounded-lg bg-amber-100/70 p-2 text-amber-800">
              <History className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Historical Case Studies & Post-Mortems
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Examines past companies that attempted similar concepts, the capital they raised, and the strategic traps that caused them to shut down.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-colors hover:bg-slate-50">
            <div className="mb-3.5 inline-flex rounded-lg bg-emerald-100/70 p-2 text-emerald-800">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Active Market Incumbent Mapping
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Identifies established incumbents across global and Indian markets, their distribution moats, and the specific underserved gaps where a newcomer can enter.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-colors hover:bg-slate-50">
            <div className="mb-3.5 inline-flex rounded-lg bg-teal-100/70 p-2 text-teal-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              The Mom Test Discovery Framework
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Provides objective, non-leading customer interview questions based on actual user behavior rather than hypothetical opinions.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
