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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Texture & Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-slate-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 hero-glow pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-zinc-800 shadow-2xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>Early-Stage Market Validation & Dual-Geography Intelligence</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-display mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl text-balance leading-[1.15]">
            Stress-test your startup idea <br className="hidden sm:inline" />
            <span className="text-zinc-600">
              before spending 6 months building.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 text-balance font-normal">
            Founder Companion provides structured market intelligence, live competitor mapping across India and Global markets, and real failure post-mortems—helping you fix fatal flaws before writing code.
          </p>

          {/* Interactive Quick-Intake Bar */}
          <div className="mt-8 flex w-full justify-center">
            <QuickIntakeBar />
          </div>

          {/* Trust Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-zinc-800" />
              <span>Dual-Market Coverage (🇮🇳 India + 🌐 Global)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-zinc-800" />
              <span>Verified Real Incumbents (Zero Hallucinations)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-zinc-800" />
              <span>The Mom Test Discovery Framework</span>
            </div>
          </div>

          {/* Interactive Live Product Preview */}
          <div className="mt-14 w-full flex flex-col items-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <span>Interactive Intelligence Report Preview</span>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] text-zinc-800 font-bold">
                Live Model
              </span>
            </div>
            <ProductPreview />
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative border-y border-zinc-200/80 bg-white py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              Methodology
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-zinc-950">
              How Founder Companion Validates Your Concept
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Move from a vague hunch to an evidence-backed market decision in three structured steps.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm shadow-2xs mb-5">
                01
              </div>
              <h3 className="font-display text-base font-bold text-zinc-950">
                Submit Your Hypothesis
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Detail your core solution or observed industry headache, target customer profile, and monetization plan in 2 minutes. No lengthy pitch deck needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm shadow-2xs mb-5">
                02
              </div>
              <h3 className="font-display text-base font-bold text-zinc-950">
                Live Market & Post-Mortem Audit
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Parallel search engines scour active market incumbents in both Indian and Global markets, cross-referencing real failed startup post-mortems and capital burned.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm shadow-2xs mb-5">
                03
              </div>
              <h3 className="font-display text-base font-bold text-zinc-950">
                Actionable Strategic Brief
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Receive an executive verdict, fatal roadblock flags, a recommended asymmetric entry wedge, and non-leading &ldquo;Mom Test&rdquo; questions for customer interviews.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY GENERIC AI CHATBOTS FAIL MATRIX */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              The Reality Check
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-zinc-950">
              Why Generic AI Chatbots Fail Founders
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Standard chatbots are trained to be agreeable conversational assistants. Founder Companion operates as an objective investment committee.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/90 text-zinc-900 font-bold">
                  <th className="p-4 sm:p-5">Validation Factor</th>
                  <th className="p-4 sm:p-5 text-zinc-500">Generic AI Chatbots (ChatGPT / Claude)</th>
                  <th className="p-4 sm:p-5 text-zinc-950 bg-zinc-100/70 border-l border-zinc-200">
                    Founder Companion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-zinc-900">
                    Feedback Stance
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Polite cheerleader; validates flawed ideas to please user</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-zinc-50/40 border-l border-zinc-200 text-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-900" />
                      <span>Rigorous investment reality check; highlights fatal flaws</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-zinc-900">
                    Competitor Intelligence
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Hallucinates non-existent startups or vague names</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-zinc-50/40 border-l border-zinc-200 text-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-900" />
                      <span>100% verified real companies with live URLs & moats</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-zinc-900">
                    Geographic Coverage
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Heavy US Silicon Valley bias; ignores local ecosystems</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-zinc-50/40 border-l border-zinc-200 text-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-900" />
                      <span>Dual-market intelligence: 🇮🇳 India Incumbents + 🌐 Global Giants</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-zinc-900">
                    Historical Precedents
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>No knowledge of dead startups or failed Kickstarter campaigns</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-zinc-50/40 border-l border-zinc-200 text-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-900" />
                      <span>Real post-mortems with capital burned & root-cause failure traps</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-zinc-900">
                    Customer Discovery
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-600">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Leading questions like &ldquo;Would you buy this software?&rdquo;</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-zinc-50/40 border-l border-zinc-200 text-zinc-800">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-900" />
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
      <section className="border-t border-zinc-200/80 bg-white py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950">
              Two Ways to Begin
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Whether you already have a product solution in mind or you observed an acute industry problem.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link
              href="/idea/new"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/60 p-8 transition-all hover:border-zinc-900 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-zinc-200/80 p-3 text-zinc-900">
                  <Lightbulb className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Solution-Driven Track
                </span>
                <h3 className="font-display text-xl font-bold text-zinc-950">
                  &ldquo;I have a concrete Idea&rdquo;
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-600">
                  You already know what you plan to build. Input your target audience, current customer workarounds, and monetization model to discover blind spots and competitive moats.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 group-hover:underline">
                Stress-test concrete idea &rarr;
              </span>
            </Link>

            <Link
              href="/idea/new"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/60 p-8 transition-all hover:border-zinc-900 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-zinc-200/80 p-3 text-zinc-900">
                  <Compass className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Problem-Driven Track
                </span>
                <h3 className="font-display text-xl font-bold text-zinc-950">
                  &ldquo;I have an observed Problem&rdquo;
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-600">
                  You spotted an acute industry friction point but don&apos;t know the software shape yet. Explore market gaps and discover viable business model pathways.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 group-hover:underline">
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
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              Questions & Transparency
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-zinc-950">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Everything you need to know about our research methodology and data verification.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-zinc-950 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-zinc-700 shrink-0" />
                How does Founder Companion avoid AI hallucinations in competitor research?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Unlike standard chat models that invent realistic-sounding startup names, Founder Companion executes three parallel live web queries (Tavily search engines) specifically targeting verified active companies in Global and Indian registries, verified Kickstarter/Indiegogo campaigns, and venture post-mortem archives.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-zinc-950 flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-zinc-700 shrink-0" />
                Why is dual Global and Indian market intelligence important?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Early-stage founders often benchmark only against US-based unicorns (like Stripe or Yeti) while ignoring local market dynamics and domestic giants (like Razorpay, Milton, or Practo). Founder Companion analyzes both global market leaders and regional incumbents to provide realistic unit economics and distribution channels.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-zinc-950 flex items-center gap-2">
                <Target className="h-4 w-4 text-zinc-700 shrink-0" />
                What is &ldquo;The Mom Test&rdquo; and why is it included in every report?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Created by Rob Fitzpatrick, <em>The Mom Test</em> is the gold standard for startup customer discovery. Most founders ask &ldquo;Would you buy this?&rdquo; which produces false positives because people are polite. Founder Companion generates questions that interrogate past behavioral commitments, financial spending, and actual headaches.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="font-bold text-sm sm:text-base text-zinc-950 flex items-center gap-2">
                <FileText className="h-4 w-4 text-zinc-700 shrink-0" />
                Does this work for physical hardware and consumer products?
              </h4>
              <p className="mt-2 pl-6 text-xs sm:text-sm leading-relaxed text-zinc-600">
                Yes. Founder Companion includes specialized domain intelligence for physical hardware, consumer gear, and manufacturing concepts. It audits tooling mold costs, dimensional freight weight penalties, minimum order quantities (MOQs), and consumer replacement cycles alongside software metrics.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CALL TO ACTION (Obsidian / High Contrast) */}
      <section className="pb-20">
        <Container>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-14 text-center text-white shadow-2xl">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Stop guessing. Validate your concept today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xs sm:text-base text-zinc-400 leading-relaxed">
              Join founders stress-testing their product assumptions against real market incumbents and past post-mortems before writing a single line of code.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/idea/new"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-zinc-950 shadow-md transition-all hover:bg-zinc-100 hover:shadow-lg"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
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
