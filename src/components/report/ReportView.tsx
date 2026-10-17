"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  StartupIdea,
  VerdictType,
  SeverityLevel,
} from "@/lib/types";
import { updateIdeaStatus, saveIdea } from "@/lib/storage";
import {
  AlertTriangle,
  Skull,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  GitBranch,
  Sparkles,
  Layers,
  HelpCircle,
  Award,
  Package,
  ArrowRight,
  Compass,
} from "lucide-react";

interface ReportViewProps {
  idea: StartupIdea;
}

type TabType = "verdict" | "competition" | "playbook";

export default function ReportView({ idea }: ReportViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("verdict");
  const [currentStatus, setCurrentStatus] = useState(idea.status);
  const [pivotModalOpen, setPivotModalOpen] = useState(false);
  const [pivotTitle, setPivotTitle] = useState(`${idea.title} (Focused Pivot)`);
  const [pivotPitch, setPivotPitch] = useState(
    idea.report?.survivalWedge.unfairWedge || idea.pitch
  );

  const report = idea.report;

  if (!report) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
          No Report Available
        </h3>
        <p className="mt-1 text-sm text-muted">
          This idea has not been evaluated yet.
        </p>
        <Link
          href="/idea/new"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Run New Analysis &rarr;
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus: StartupIdea["status"]) => {
    setCurrentStatus(newStatus);
    updateIdeaStatus(idea.id, newStatus);
  };

  const handleCreatePivot = () => {
    const pivotId = `pivot-${Date.now()}`;
    const pivotedIdea: StartupIdea = {
      ...idea,
      id: pivotId,
      parentIdeaId: idea.id,
      title: pivotTitle.trim(),
      pitch: pivotPitch.trim(),
      status: "under_review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      report: undefined,
    };
    saveIdea(pivotedIdea);
    setPivotModalOpen(false);
    router.push("/workspace");
  };

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case "DEAD_ON_ARRIVAL":
        return {
          icon: <Skull className="h-5 w-5 text-red-600" aria-hidden="true" />,
          label: "DEAD ON ARRIVAL (DO NOT BUILD)",
          bg: "bg-red-50 border-red-200 text-red-900",
        };
      case "HIGH_RISK":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />,
          label: "HIGH RISK — SERIOUS ROADBLOCKS",
          bg: "bg-amber-50 border-amber-200 text-amber-900",
        };
      case "VIABLE_WITH_PIVOT":
        return {
          icon: <GitBranch className="h-5 w-5 text-teal-700" aria-hidden="true" />,
          label: "VIABLE WITH ASYMMETRIC PIVOT",
          bg: "bg-teal-50 border-teal-200 text-teal-900",
        };
      case "COMPELLING_WEDGE":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
          label: "STRONG OPPORTUNITY DETECTED",
          bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
        };
    }
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const badge = getVerdictBadge(report.verdict);
  const isHardware = report.productCategory === "physical_hardware";

  return (
    <div className="space-y-6">
      {/* Notice Bar */}
      {report.isMockFallback && (
        <div
          role="region"
          aria-label="Evaluation mode notice"
          className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/90 p-4 text-xs leading-relaxed text-blue-900"
        >
          <Package className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
          <div>
            <span className="font-semibold">Specialized Domain Evaluation Active: </span>
            {isHardware ? (
              <span>This concept was detected as a <strong>Physical Hardware / Consumer Gear</strong> product. The analysis evaluates tooling molds, cold retention physics, manufacturing minimums, and physical competitors like Yeti and Coleman.</span>
            ) : (
              <span>Analyzed using structured software domain evaluation logic.</span>
            )}
            {report.apiErrorDetails && (
              <p className="mt-1 font-mono text-[11px] text-blue-800/80">API Note: {report.apiErrorDetails}</p>
            )}
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Startup Reality Check
              </span>
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-accent">
                {isHardware ? "Physical Product / Hardware" : "Software / SaaS"}
              </span>
            </div>

            <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {idea.title}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Target Customer: <span className="font-medium text-foreground">{idea.targetCustomer}</span>
            </p>
          </div>

          {/* Action Box with Clear Helper Subtitles */}
          <div className="rounded-xl border border-border bg-background p-3.5 sm:p-4">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <HelpCircle className="h-3.5 w-3.5 text-muted" />
              <span>What do you want to do with this idea?</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleStatusChange("active_pursuit")}
                title="Save to your workspace as an active project you want to build"
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  currentStatus === "active_pursuit"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border border-border bg-surface text-muted hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                ✓ Keep Working On It
              </button>

              <button
                onClick={() => handleStatusChange("killed")}
                title="Mark this idea as too risky and move it to your killed list"
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  currentStatus === "killed"
                    ? "bg-red-600 text-white shadow-sm"
                    : "border border-border bg-surface text-muted hover:border-red-600 hover:text-red-700"
                }`}
              >
                ✕ Archive (Too Risky)
              </button>

              <button
                onClick={() => setPivotModalOpen(true)}
                title="Clone this idea and test a different, better niche angle"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-accent-soft px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Try a Different Angle (Pivot)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple, Clean 3-Tab Navigator */}
      <div
        role="tablist"
        aria-label="Report sections"
        className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-surface p-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "verdict"}
          onClick={() => setActiveTab("verdict")}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "verdict"
              ? "bg-accent text-accent-foreground shadow-xs"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Award className="h-4 w-4" />
          <span>1. The Verdict & Risks</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "competition"}
          onClick={() => setActiveTab("competition")}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "competition"
              ? "bg-accent text-accent-foreground shadow-xs"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>2. Competitors & Failures</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "playbook"}
          onClick={() => setActiveTab("playbook")}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "playbook"
              ? "bg-accent text-accent-foreground shadow-xs"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>3. How You Can Win</span>
        </button>
      </div>

      {/* TAB 1: THE VERDICT & RISKS */}
      {activeTab === "verdict" && (
        <div className="space-y-6">
          {/* THE BOTTOM LINE CARD: Clear 3-Line Answer */}
          <div className="rounded-2xl border-2 border-accent bg-surface p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
              <Compass className="h-4 w-4" />
              <span>THE BOTTOM LINE: IS THIS A GOOD OR BAD IDEA?</span>
            </div>

            <div className="mt-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                {report.bottomLine?.isGoodIdea || report.verdictHeadline}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                {report.bottomLine?.inPlainEnglish || report.executiveSummary}
              </p>
            </div>

            {report.bottomLine?.immediateNextStep && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent-soft p-4 text-xs">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent font-bold" />
                <div>
                  <span className="font-bold text-accent uppercase tracking-wider">What you should do tomorrow morning: </span>
                  <span className="text-foreground/90 font-medium">{report.bottomLine.immediateNextStep}</span>
                </div>
              </div>
            )}
          </div>

          {/* Full Verdict Summary */}
          <div className={`overflow-hidden rounded-2xl border ${badge.bg} p-6 sm:p-7`}>
            <div className="flex items-center gap-2">
              {badge.icon}
              <span className="text-xs font-bold uppercase tracking-wider">
                {badge.label}
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold text-foreground">
              {report.verdictHeadline}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
              {report.executiveSummary}
            </p>
          </div>

          {/* Warning Signs */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Major Warning Signs (Before You Spend Money)
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted">
              These are the predictable traps that ruin early startups in this space.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {report.dealbreakerFlags.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-background p-4.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-foreground text-sm">
                      {item.flag}
                    </h4>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${getSeverityBadge(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {item.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPETITORS & FAILURES */}
      {activeTab === "competition" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Active Competitors */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Brands & Competitors Winning Right Now
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted">
              Who already sells products in this space, why customers buy from them, and where they suck.
            </p>

            <div className="mt-5 space-y-4">
              {report.activeCompetitors.map((comp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-background p-4 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                      <span>{comp.name}</span>
                      {comp.url && (
                        <a
                          href={comp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent"
                          aria-label={`Visit ${comp.name} website`}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span className="rounded bg-accent-soft px-2 py-0.5 font-medium text-accent text-[11px]">
                      {comp.marketPosition}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <span className="font-semibold text-emerald-800">Why Customers Buy From Them: </span>
                      <span className="text-muted">{comp.moat}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-red-800">Where They Are Heavy, Bulky, or Flawed: </span>
                      <span className="text-muted">{comp.vulnerability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Startup Graveyard */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <Skull className="h-5 w-5 text-red-600" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Startups That Tried This and Died
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted">
              Real companies and Kickstarter projects that attempted this concept, burned capital, and failed.
            </p>

            <div className="mt-5 space-y-4">
              {report.graveyardStartups.map((dead, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-red-200/60 bg-red-50/40 p-4 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                      <span>{dead.name}</span>
                      {dead.sourceUrl && (
                        <a
                          href={dead.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-red-700"
                          aria-label={`Read ${dead.name} post-mortem`}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span className="rounded bg-red-100 px-2 py-0.5 font-semibold text-red-800 text-[11px]">
                      Died in {dead.yearEnded} • {dead.fundingBurned || "Unknown Burn"}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <span className="font-semibold text-foreground">Why It Looked Brilliant at First: </span>
                      <span className="text-muted">{dead.seductivePromise}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-red-900">The Exact Reason It Collapsed: </span>
                      <span className="text-red-950 font-medium">{dead.fatalTrap}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOW YOU CAN WIN */}
      {activeTab === "playbook" && (
        <div className="space-y-6">
          {/* Survival Strategy */}
          <div className="rounded-2xl border border-accent/30 bg-accent-soft/30 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                How You Can Still Win (Your Secret Angle)
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted">
              Don't build a generic cooler. Pick one specific group and solve their exact carrying headache.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent">
                  Your Best Angle to Start
                </h4>
                <p className="mt-1 font-semibold text-foreground text-sm">
                  {report.survivalWedge.strategy}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {report.survivalWedge.unfairWedge}
                </p>
              </div>

              <div className="rounded-xl border border-red-200 bg-surface p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Dumbest Mistake to Avoid
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-red-950">
                  {report.survivalWedge.deadlyMistakeToAvoid}
                </p>
                <div className="mt-4 border-t border-border pt-3">
                  <span className="text-[11px] font-semibold uppercase text-muted">
                    Realistic Pricing Strategy:
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-foreground">
                    {report.survivalWedge.proposedPricingModel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Questions */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Questions to Ask Real People (Before You Spend on Manufacturing)
              </h3>
              <p className="mt-1 text-xs text-muted">
                Never ask people &ldquo;Would you buy this?&rdquo; (they always say yes to be polite). Ask about their past actions:
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {report.momTestQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-background p-5 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-foreground text-sm">
                      What you are checking: {q.hypothesis}
                    </span>
                  </div>

                  <div className="mt-3 pl-7">
                    <p className="font-medium text-accent text-sm">
                      Ask this: &ldquo;{q.questionToAsk}&rdquo;
                    </p>
                    <p className="mt-2 text-muted">
                      <strong className="text-red-700">Trap to Avoid: </strong>
                      {q.trapToAvoid}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pivot Modal */}
      {pivotModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pivot-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-xl">
            <h3 id="pivot-title" className="font-display text-lg font-semibold text-foreground">
              Try a Different Angle (Create Pivot)
            </h3>
            <p className="mt-1 text-xs text-muted">
              Clone this concept and focus it on the recommended niche angle.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="pivot-name" className="block text-xs font-semibold text-foreground">
                  New Idea Title
                </label>
                <input
                  id="pivot-name"
                  type="text"
                  value={pivotTitle}
                  onChange={(e) => setPivotTitle(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="pivot-wedge" className="block text-xs font-semibold text-foreground">
                  Your New Focus (One-liner)
                </label>
                <textarea
                  id="pivot-wedge"
                  rows={3}
                  value={pivotPitch}
                  onChange={(e) => setPivotPitch(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setPivotModalOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-muted hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreatePivot}
                className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-sm hover:opacity-95"
              >
                Save as New Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
