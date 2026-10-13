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
  ArrowRight,
  GitBranch,
  Archive,
  Sparkles,
  Info,
} from "lucide-react";

interface ReportViewProps {
  idea: StartupIdea;
}

export default function ReportView({ idea }: ReportViewProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(idea.status);
  const [pivotModalOpen, setPivotModalOpen] = useState(false);
  const [pivotTitle, setPivotTitle] = useState(`${idea.title} (Vertical Pivot)`);
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
          This idea has not undergone stress-testing yet.
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
      report: undefined, // Needs new analysis
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
          label: "DEAD ON ARRIVAL",
          bg: "bg-red-50 border-red-200 text-red-900",
          barColor: "bg-red-600",
        };
      case "HIGH_RISK":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />,
          label: "HIGH STRUCTURAL RISK",
          bg: "bg-amber-50 border-amber-200 text-amber-900",
          barColor: "bg-amber-600",
        };
      case "VIABLE_WITH_PIVOT":
        return {
          icon: <GitBranch className="h-5 w-5 text-teal-700" aria-hidden="true" />,
          label: "VIABLE WITH ASYMMETRIC PIVOT",
          bg: "bg-teal-50 border-teal-200 text-teal-900",
          barColor: "bg-teal-700",
        };
      case "COMPELLING_WEDGE":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
          label: "COMPELLING DEFENSIVE WEDGE",
          bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
          barColor: "bg-emerald-600",
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

  return (
    <div className="space-y-8">
      {/* Fallback Notice for Capstone Evaluators */}
      {report.isMockFallback && (
        <div
          role="region"
          aria-label="Evaluator notice"
          className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs leading-relaxed text-blue-900"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
          <div>
            <span className="font-semibold">Evaluator Notice (FE-07 Fallback Active): </span>
            This report was produced by the contextual fallback engine because live API keys (Claude/Gemini + Tavily) are not set in your environment. Provide keys in <code className="rounded bg-blue-100 px-1 font-mono">.env.local</code> to activate live web scraping and real-time LLM inference.
          </div>
        </div>
      )}

      {/* Top Header & Triage Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Pre-Seed Autopsy Report
          </span>
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {idea.title}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Targeting: <span className="font-medium text-foreground">{idea.targetCustomer}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleStatusChange("active_pursuit")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
              currentStatus === "active_pursuit"
                ? "bg-emerald-600 text-white shadow-sm"
                : "border border-border bg-background text-muted hover:border-emerald-600 hover:text-emerald-700"
            }`}
          >
            Mark as Active Pursuit
          </button>

          <button
            onClick={() => handleStatusChange("killed")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
              currentStatus === "killed"
                ? "bg-red-600 text-white shadow-sm"
                : "border border-border bg-background text-muted hover:border-red-600 hover:text-red-700"
            }`}
          >
            Send to Graveyard
          </button>

          <button
            onClick={() => setPivotModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-accent-soft px-3.5 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Spin off as Pivot</span>
          </button>
        </div>
      </div>

      {/* 1. Verdict Banner */}
      <div className={`overflow-hidden rounded-2xl border ${badge.bg} p-6 sm:p-8`}>
        <div className="flex items-center gap-2.5">
          {badge.icon}
          <span className="text-xs font-bold uppercase tracking-wider">
            {badge.label}
          </span>
        </div>
        <h2 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
          {report.verdictHeadline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
          {report.executiveSummary}
        </p>
      </div>

      {/* 2. Dealbreaker Flags */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Structural Dealbreaker Flags
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted">
          Fatal traps identified before customer validation. These must be addressed to survive.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {report.dealbreakerFlags.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-background p-4.5 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-foreground text-sm">
                  {item.flag}
                </h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${getSeverityBadge(
                    item.severity
                  )}`}
                >
                  {item.severity}
                </span>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-muted">
                {item.reasoning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Battlefield: Active Giants vs The Graveyard */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Active Competitors */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-700" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              The Active Survivors
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted">
            Current players holding market share, their defensibility, and where they bleed.
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
                    <span className="font-semibold text-emerald-800">Defensive Moat (Pro): </span>
                    <span className="text-muted">{comp.moat}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-800">The Opening (Con): </span>
                    <span className="text-muted">{comp.vulnerability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Graveyard (Past Failures) */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2">
            <Skull className="h-5 w-5 text-red-600" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              The Startup Graveyard
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted">
            Startups that attempted this concept and died. Learn from their autopsy.
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
                    Ended {dead.yearEnded} • {dead.fundingBurned || "Unknown Burn"}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <span className="font-semibold text-foreground">Seductive Promise: </span>
                    <span className="text-muted">{dead.seductivePromise}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-900">The Fatal Guillotine: </span>
                    <span className="text-red-950 font-medium">{dead.fatalTrap}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. The Survival Wedge Playbook */}
      <div className="rounded-2xl border border-accent/30 bg-accent-soft/30 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            The Asymmetric Survival Playbook
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted">
          How David beats Goliath: your specific beachhead angle, counter-positioning, and pricing.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              Core Strategy
            </h3>
            <p className="mt-1 font-semibold text-foreground text-sm">
              {report.survivalWedge.strategy}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {report.survivalWedge.unfairWedge}
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-surface p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-700">
              Deadly Mistake to Avoid
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-red-950">
              {report.survivalWedge.deadlyMistakeToAvoid}
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <span className="text-[11px] font-semibold uppercase text-muted">
                Proposed Pricing Model:
              </span>
              <p className="mt-0.5 text-xs font-medium text-foreground">
                {report.survivalWedge.proposedPricingModel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. The Mom Test Discovery Script */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Cold-Truth Customer Interview Script (The Mom Test)
            </h2>
            <p className="mt-1 text-xs text-muted">
              Do not pitch your product during customer interviews. Ask these non-leading questions to validate past behavior.
            </p>
          </div>
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
                  Hypothesis: {q.hypothesis}
                </span>
              </div>

              <div className="mt-3 pl-7">
                <p className="font-medium text-accent text-sm">
                  &ldquo;{q.questionToAsk}&rdquo;
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
              Spin off as an Asymmetric Pivot
            </h3>
            <p className="mt-1 text-xs text-muted">
              Clone this idea into a new iteration focused on the recommended vertical wedge.
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
                  Pivoted Value Wedge (One-liner)
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
                Create Pivot in Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
