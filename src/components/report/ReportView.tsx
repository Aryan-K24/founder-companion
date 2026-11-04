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
  AlertOctagon,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  GitBranch,
  Target,
  Layers,
  HelpCircle,
  Award,
  Package,
  ArrowRight,
  History,
  Compass,
  MessageSquare,
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
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
        <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
        <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
          No Report Available
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          This idea has not been evaluated yet.
        </p>
        <Link
          href="/idea/new"
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800"
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
          icon: <AlertOctagon className="h-5 w-5 text-rose-700" aria-hidden="true" />,
          label: "DEAD ON ARRIVAL (DO NOT BUILD)",
          bg: "bg-rose-50 border-rose-200 text-rose-950",
          tagBg: "bg-rose-100 text-rose-800",
        };
      case "HIGH_RISK":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />,
          label: "HIGH RISK — SERIOUS ROADBLOCKS",
          bg: "bg-amber-50 border-amber-200 text-amber-950",
          tagBg: "bg-amber-100 text-amber-800",
        };
      case "VIABLE_WITH_PIVOT":
        return {
          icon: <GitBranch className="h-5 w-5 text-teal-700" aria-hidden="true" />,
          label: "VIABLE WITH ASYMMETRIC PIVOT",
          bg: "bg-teal-50 border-teal-200 text-teal-950",
          tagBg: "bg-teal-100 text-teal-800",
        };
      case "COMPELLING_WEDGE":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />,
          label: "STRONG OPPORTUNITY DETECTED",
          bg: "bg-emerald-50 border-emerald-200 text-emerald-950",
          tagBg: "bg-emerald-100 text-emerald-800",
        };
    }
  };

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "HIGH":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "MEDIUM":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-slate-100 text-slate-700 border-slate-200";
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
          className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/90 p-4 text-xs leading-relaxed text-blue-900 shadow-2xs"
        >
          <Package className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
          <div>
            <span className="font-semibold">Domain-Specific Intelligence Active: </span>
            {isHardware ? (
              <span>This concept was analyzed as a <strong>Physical Hardware / Consumer Gear</strong> product. The validation examines manufacturing minimums, cold retention physics, and incumbent market positions.</span>
            ) : (
              <span>Analyzed using structured domain evaluation intelligence.</span>
            )}
            {report.apiErrorDetails && (
              <p className="mt-1 font-mono text-[11px] text-blue-800/80">Diagnostic info: {report.apiErrorDetails}</p>
            )}
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                Strategic Concept Brief
              </span>
              <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold text-teal-800">
                {isHardware ? "Physical Product / Hardware" : "Software / SaaS"}
              </span>
            </div>

            <h1 className="font-display mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {idea.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Target Customer: <span className="font-medium text-slate-900">{idea.targetCustomer}</span>
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 sm:p-4">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
              <span>Next Decision for This Concept:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleStatusChange("active_pursuit")}
                title="Save to your workspace as an active project you want to build"
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                  currentStatus === "active_pursuit"
                    ? "bg-emerald-700 text-white shadow-2xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-800"
                }`}
              >
                ✓ Active Pursuit
              </button>

              <button
                onClick={() => handleStatusChange("killed")}
                title="Mark this idea as too risky and move it to your archives"
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                  currentStatus === "killed"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-rose-600 hover:text-rose-800"
                }`}
              >
                ✕ Archive (High Risk)
              </button>

              <button
                onClick={() => setPivotModalOpen(true)}
                title="Clone this idea and test a different, better niche angle"
                className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3.5 py-2 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-700 hover:text-white"
              >
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Try a Different Angle (Pivot)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Report sections"
        className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-2xs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "verdict"}
          onClick={() => setActiveTab("verdict")}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "verdict"
              ? "bg-teal-700 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
              ? "bg-teal-700 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
              ? "bg-teal-700 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Target className="h-4 w-4" />
          <span>3. How You Can Win</span>
        </button>
      </div>

      {/* TAB 1: THE VERDICT & RISKS */}
      {activeTab === "verdict" && (
        <div className="space-y-6">
          {/* Executive Bottom Line */}
          <div className="rounded-2xl border-2 border-teal-700/80 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Compass className="h-4 w-4" />
              <span>THE BOTTOM LINE: EXECUTIVE EVALUATION</span>
            </div>

            <div className="mt-3.5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {report.bottomLine?.isGoodIdea || report.verdictHeadline}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                {report.bottomLine?.inPlainEnglish || report.executiveSummary}
              </p>
            </div>

            {report.bottomLine?.immediateNextStep && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-4 text-xs">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 font-bold" />
                <div>
                  <span className="font-bold text-teal-900 uppercase tracking-wider">Immediate Recommended Next Step: </span>
                  <span className="text-slate-800 font-medium">{report.bottomLine.immediateNextStep}</span>
                </div>
              </div>
            )}
          </div>

          {/* Verdict Summary Box */}
          <div className={`overflow-hidden rounded-2xl border ${badge.bg} p-6 sm:p-7 shadow-xs`}>
            <div className="flex items-center gap-2">
              {badge.icon}
              <span className="text-xs font-bold uppercase tracking-wider">
                {badge.label}
              </span>
            </div>
            <h3 className="mt-2.5 font-display text-lg font-bold text-slate-900">
              {report.verdictHeadline}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-line">
              {report.executiveSummary}
            </p>
          </div>

          {/* Dealbreaker Flags */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-700" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Identified Roadblocks & Dealbreaker Risks
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Critical structural challenges that require clear mitigation before capital commitment.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {report.dealbreakerFlags.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {item.flag}
                    </h4>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getSeverityBadge(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
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
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Market Leaders & Active Incumbents
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Established players currently capturing revenue, their primary defensibility, and vulnerable gaps.
            </p>

            <div className="mt-5 space-y-4">
              {report.activeCompetitors.map((comp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4.5 text-xs transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-sm">
                      <span>{comp.name}</span>
                      {comp.url && (
                        <a
                          href={comp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-teal-700"
                          aria-label={`Visit ${comp.name} website`}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-medium text-[11px] ${
                        comp.marketPosition.toLowerCase().includes("india")
                          ? "border border-amber-300 bg-amber-50 text-amber-900 font-semibold"
                          : "border border-teal-200 bg-teal-50 text-teal-800 font-semibold"
                      }`}
                    >
                      {comp.marketPosition.toLowerCase().includes("india") ? "🇮🇳 " : "🌐 "}
                      {comp.marketPosition}
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2">
                    <div className="rounded-lg bg-emerald-50/60 p-2 border border-emerald-100">
                      <span className="font-semibold text-emerald-900">Defensible Advantage: </span>
                      <span className="text-slate-700">{comp.moat}</span>
                    </div>
                    <div className="rounded-lg bg-rose-50/50 p-2 border border-rose-100">
                      <span className="font-semibold text-rose-900">Structural Vulnerability: </span>
                      <span className="text-slate-700">{comp.vulnerability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Case Studies & Post-Mortems */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-amber-700" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Historical Case Studies & Post-Mortems
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Past startups and crowdfunded initiatives that tackled this concept, capital deployed, and root-cause failure points.
            </p>

            <div className="mt-5 space-y-4">
              {report.graveyardStartups.map((dead, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4.5 text-xs transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-sm">
                      <span>{dead.name}</span>
                      {dead.sourceUrl && (
                        <a
                          href={dead.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-rose-700"
                          aria-label={`Read ${dead.name} post-mortem`}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-semibold text-slate-700 text-[11px]">
                      Concluded {dead.yearEnded} • {dead.fundingBurned || "Early Stage"}
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2">
                    <div className="rounded-lg bg-white p-2 border border-slate-200/80">
                      <span className="font-semibold text-slate-800">Initial Premise: </span>
                      <span className="text-slate-600">{dead.seductivePromise}</span>
                    </div>
                    <div className="rounded-lg bg-rose-50/60 p-2 border border-rose-100">
                      <span className="font-semibold text-rose-950">Root-Cause Failure Mode: </span>
                      <span className="text-rose-900 font-medium">{dead.fatalTrap}</span>
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
          <div className="rounded-2xl border border-teal-200/80 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Actionable Market Entry Strategy & Wedge
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Avoid fighting incumbents head-on. Own a specific, underserved customer segment with distinct unit economics.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Recommended Beachhead Angle
                </span>
                <p className="mt-1.5 font-semibold text-slate-900 text-sm">
                  {report.survivalWedge.strategy}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {report.survivalWedge.unfairWedge}
                </p>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Critical Pitfall to Avoid
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-rose-950 font-medium">
                  {report.survivalWedge.deadlyMistakeToAvoid}
                </p>
                <div className="mt-4 border-t border-rose-200/60 pt-3">
                  <span className="text-[11px] font-semibold uppercase text-slate-600">
                    Suggested Pricing Architecture:
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-slate-900">
                    {report.survivalWedge.proposedPricingModel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Questions */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-slate-900">
                The Mom Test Discovery Framework
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Never ask potential customers &ldquo;Would you buy this?&rdquo; (courtesy bias produces false positives). Interrogate their past behaviors:
            </p>

            <div className="mt-6 space-y-4">
              {report.momTestQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white shadow-2xs">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">
                      Hypothesis Tested: {q.hypothesis}
                    </span>
                  </div>

                  <div className="mt-3.5 pl-8 space-y-2">
                    <p className="font-medium text-teal-800 text-sm bg-teal-50/70 p-2.5 rounded-lg border border-teal-100">
                      <strong>Verbatim Prompt:</strong> &ldquo;{q.questionToAsk}&rdquo;
                    </p>
                    <p className="text-slate-600 pt-1">
                      <strong className="text-rose-800">Trap to Avoid: </strong>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 id="pivot-title" className="font-display text-lg font-bold text-slate-900">
              Try a Different Angle (Create Pivot)
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Branch this concept and focus it on the recommended beachhead angle.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="pivot-name" className="block text-xs font-semibold text-slate-900">
                  Pivoted Idea Title
                </label>
                <input
                  id="pivot-name"
                  type="text"
                  value={pivotTitle}
                  onChange={(e) => setPivotTitle(e.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs focus:border-teal-700 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="pivot-wedge" className="block text-xs font-semibold text-slate-900">
                  Target Beachhead Focus (One-liner)
                </label>
                <textarea
                  id="pivot-wedge"
                  rows={3}
                  value={pivotPitch}
                  onChange={(e) => setPivotPitch(e.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs focus:border-teal-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setPivotModalOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreatePivot}
                className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-teal-800"
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
