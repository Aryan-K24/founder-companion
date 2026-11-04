import Container from "@/components/layout/Container";
import Link from "next/link";
import QuickIntakeBar from "@/components/home/QuickIntakeBar";
import ProductPreview from "@/components/home/ProductPreview";
import {
  Lightbulb,
  Compass,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  History,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Globe2,
  Target,
  FileText,
  Sparkles,
  Zap,
  BarChart3,
  Layers,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Ambient Background Layering */}
      <div className="absolute inset-0 bg-mesh-grid opacity-75 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[650px] hero-ambient-glow pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow Badge with Luminous Border */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-blue-900 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>Early-Stage Venture Intelligence · Dual Geography (🇮🇳 India + 🌐 Global)</span>
          </div>

          {/* Master Headline with Gradient Punch */}
          <h1 className="font-display mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl text-balance leading-[1.12]">
            Stress-test your startup concept <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              before spending 6 months building.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 text-balance font-normal">
            Founder Companion runs automated, multi-engine market diligence: mapping live incumbents across India and Global markets, auditing real startup failure autopsies, and uncovering defensible niche beachheads.
          </p>

          {/* Interactive Quick-Intake Bar */}
          <div className="mt-8 flex w-full justify-center">
            <QuickIntakeBar />
          </div>

          {/* Trust Metric Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/80 px-3 py-1 shadow-2xs">
              <Globe2 className="h-4 w-4 text-blue-600" />
              <span>Dual-Market Coverage (🇮🇳 India + 🌐 Global)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/80 px-3 py-1 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Real Incumbents (Zero Hallucinations)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/80 px-3 py-1 shadow-2xs">
              <Target className="h-4 w-4 text-indigo-600" />
              <span>The Mom Test Discovery Framework</span>
            </div>
          </div>

          {/* Interactive Live Product Preview Container */}
          <div className="mt-14 w-full flex flex-col items-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Interactive Intelligence Report Preview</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-800 font-bold">
                Live Data Simulation
              </span>
            </div>
            <ProductPreview />
          </div>
        </Container>
      </section>

      {/* BENTO GRID FEATURE SHOWCASE */}
      <section className="relative border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Diligence Architecture
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
              Structured Research, Not Generic Chat
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Four specialized analytical engines run parallel queries to stress-test your concept from every angle.
            </p>
          </div>

          {/* 4-Box Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Box 1: Dual Market Radar (Span 2) */}
            <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Dual-Market Competitor Radar
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Parallel search across domestic and international ecosystems</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                  Global + India
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                Most tools only search Silicon Valley startups. Founder Companion maps both international market leaders (like Yeti, Stripe, Deel) and Indian domestic incumbents (like Milton, Razorpay, Practo) to evaluate real unit economics and local distribution moats.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <span className="font-bold text-slate-800 block">🌐 Global Incumbents</span>
                  <span className="text-slate-600 text-[11px] mt-0.5 block">Distribution moats, premium pricing structures & software enterprise locks.</span>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                  <span className="font-bold text-amber-900 block">🇮🇳 Indian Market Leaders</span>
                  <span className="text-amber-800/90 text-[11px] mt-0.5 block">Price sensitivity, localized supply chains & regional distribution channels.</span>
                </div>
              </div>
            </div>

            {/* Bento Box 2: Post-Mortem Autopsy Engine (Span 1) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-sm mb-4">
                  <History className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Post-Mortem Autopsy Engine
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Scours archives of failed venture-backed startups and crowdfunded projects. Uncovers exact capital burned, customer churn metrics, and fatal traps.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50/60 p-3 text-[11px] text-rose-950 font-medium">
                Example: Coolest Cooler burned \$13M on custom electric motors and mold tooling before bankruptcy.
              </div>
            </div>

            {/* Bento Box 3: The Mom Test Behavioral Discovery (Span 1) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm mb-4">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  The Mom Test Discovery
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Formulates non-leading interview questions based on Rob Fitzpatrick&apos;s customer discovery framework. Never ask &ldquo;Would you buy?&rdquo;—interrogate past actions.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-[11px] text-indigo-950 font-medium">
                Generates verbatim prompts to ask customers tomorrow morning without revealing your solution.
              </div>
            </div>

            {/* Bento Box 4: Asymmetric Wedge Synthesizer (Span 2) */}
            <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Asymmetric Market Wedge Synthesizer
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">How newcomers bypass entrenched incumbents</p>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                You cannot out-spend market leaders on paid ads or out-scale them on Day 1. Founder Companion pinpoints underserved customer niches where incumbents are too bulky or slow to compete, giving you a defensible beachhead.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-800">
                  Targeted Customer Micro-Niches
                </span>
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-800">
                  Sustainable Unit Economics & Pricing
                </span>
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-800">
                  Defensible Beachhead Wedge
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY GENERIC AI CHATBOTS FAIL MATRIX */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              The Reality Check
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
              Why Generic AI Chatbots Fail Founders
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Standard chatbots are trained to be agreeable conversational assistants. Founder Companion operates as an objective investment committee.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-900 font-bold">
                  <th className="p-4 sm:p-5">Validation Factor</th>
                  <th className="p-4 sm:p-5 text-slate-500">Generic AI Chatbots (ChatGPT / Claude)</th>
                  <th className="p-4 sm:p-5 text-blue-950 bg-blue-50/70 border-l border-blue-100">
                    Founder Companion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Feedback Stance
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Polite cheerleader; validates flawed ideas to please user</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-blue-50/30 border-l border-blue-100 text-slate-800">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                      <span>Rigorous investment reality check; highlights fatal flaws</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Competitor Intelligence
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Hallucinates non-existent startups or vague names</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-blue-50/30 border-l border-blue-100 text-slate-800">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                      <span>100% verified real companies with live URLs & moats</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Geographic Coverage
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Heavy US Silicon Valley bias; ignores local ecosystems</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-blue-50/30 border-l border-blue-100 text-slate-800">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                      <span>Dual-market intelligence: 🇮🇳 India Incumbents + 🌐 Global Giants</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Historical Precedents
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>No knowledge of dead startups or failed Kickstarter campaigns</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-blue-50/30 border-l border-blue-100 text-slate-800">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                      <span>Real post-mortems with capital burned & root-cause failure traps</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Customer Discovery
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Leading questions like &ldquo;Would you buy this software?&rdquo;</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-blue-50/30 border-l border-blue-100 text-slate-800">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                      <span>The Mom Test behavioral prompts investigating past actions</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* TWO STARTING PATHWAYS */}
      <section className="border-t border-slate-200/80 bg-white py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Two Ways to Begin
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Whether you already have a product solution in mind or you observed an acute industry problem.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link
              href="/idea/new"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60 p-8 transition-all hover:border-blue-600 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="mb-4 inline-flex rounded-2xl bg-blue-100/80 p-3.5 text-blue-700">
                  <Lightbulb className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-blue-700">
                  Solution-Driven Track
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  &ldquo;I have a concrete Idea&rdquo;
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  You already know what you plan to build. Input your target audience, current customer workarounds, and monetization model to discover blind spots and competitive moats.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 group-hover:underline">
                Stress-test concrete idea &rarr;
              </span>
            </Link>

            <Link
              href="/idea/new"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60 p-8 transition-all hover:border-indigo-600 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="mb-4 inline-flex rounded-2xl bg-indigo-100/80 p-3.5 text-indigo-700">
                  <Compass className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Problem-Driven Track
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  &ldquo;I have an observed Problem&rdquo;
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  You spotted an acute industry friction point but don&apos;t know the software shape yet. Explore market gaps and discover viable business model pathways.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 group-hover:underline">
                Explore problem space &rarr;
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* HIGH TRUST FAQ SECTION */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Questions & Transparency
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Everything you need to know about our research methodology and data verification.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-600 shrink-0" />
                How does Founder Companion avoid AI hallucinations in competitor research?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                Unlike standard chat models that invent realistic-sounding startup names, Founder Companion executes three parallel live web queries (Tavily search engines) specifically targeting verified active companies in Global and Indian registries, verified Kickstarter/Indiegogo campaigns, and venture post-mortem archives.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-blue-600 shrink-0" />
                Why is dual Global and Indian market intelligence important?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                Early-stage founders often benchmark only against US-based unicorns (like Stripe or Yeti) while ignoring local market dynamics and domestic giants (like Razorpay, Milton, or Practo). Founder Companion analyzes both global market leaders and regional incumbents to provide realistic unit economics and distribution channels.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600 shrink-0" />
                What is &ldquo;The Mom Test&rdquo; and why is it included in every report?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                Created by Rob Fitzpatrick, <em>The Mom Test</em> is the gold standard for startup customer discovery. Most founders ask &ldquo;Would you buy this?&rdquo; which produces false positives because people are polite. Founder Companion generates questions that interrogate past behavioral commitments, financial spending, and actual headaches.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                Does this work for physical hardware and consumer products?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                Yes. Founder Companion includes specialized domain intelligence for physical hardware, consumer gear, and manufacturing concepts. It audits tooling mold costs, dimensional freight weight penalties, minimum order quantities (MOQs), and consumer replacement cycles alongside software metrics.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CALL TO ACTION (Luminous Midnight/Indigo) */}
      <section className="pb-20">
        <Container>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-grid opacity-30 pointer-events-none" />
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight relative z-10">
              Stop guessing. Validate your concept today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xs sm:text-base text-slate-300 leading-relaxed relative z-10">
              Join founders stress-testing their product assumptions against real market incumbents and past post-mortems before writing a single line of code.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 relative z-10">
              <Link
                href="/idea/new"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-500 hover:shadow-lg"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <span>Explore Workspace</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
