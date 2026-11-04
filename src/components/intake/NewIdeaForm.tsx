"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IdeaTrack, StartupIdea } from "@/lib/types";
import { saveIdea } from "@/lib/storage";
import { Lightbulb, Compass, Loader2, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function NewIdeaForm() {
  const router = useRouter();
  const [track, setTrack] = useState<IdeaTrack>("idea");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [currentWorkaround, setCurrentWorkaround] = useState("");
  const [monetization, setMonetization] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [whyNow, setWhyNow] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title.trim() || !pitch.trim()) {
      setError("Please provide a title and core description of your concept.");
      return;
    }
    if (!targetCustomer.trim()) {
      setError("Please specify who the target customer or audience is.");
      return;
    }

    setLoading(true);
    setProgressStep("Gathering verified competitor signals and market data...");

    const id = "idea-" + Date.now();
    const newIdeaPayload: StartupIdea = {
      id,
      track,
      title: title.trim(),
      pitch: pitch.trim(),
      targetCustomer: targetCustomer.trim(),
      currentWorkaround: currentWorkaround.trim() || "Manual effort / Excel spreadsheets",
      monetization: monetization.trim() || "Unspecified subscription model",
      problemStatement: track === "vision" ? problemStatement.trim() : undefined,
      whyNow: track === "vision" ? whyNow.trim() : undefined,
      status: "under_review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const timer1 = setTimeout(() => {
        setProgressStep("Mapping active market incumbents in Global and Indian regions...");
      }, 1200);

      const timer2 = setTimeout(() => {
        setProgressStep("Cross-referencing historical post-mortems and case studies...");
      }, 2400);

      const timer3 = setTimeout(() => {
        setProgressStep("Synthesizing strategic wedge, unit economics, and customer discovery...");
      }, 3800);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: newIdeaPayload }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (!res.ok) {
        throw new Error("Analysis failed. Please check your network or try again.");
      }

      const data = await res.json();
      if (!data.report) {
        throw new Error("Unable to parse analysis report.");
      }

      newIdeaPayload.report = data.report;
      saveIdea(newIdeaPayload);

      router.push(`/idea/${id}/report`);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Track Selection Switcher */}
      <div
        role="tablist"
        aria-label="Select starting point"
        className="mb-8 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={track === "idea"}
          aria-controls="track-panel"
          onClick={() => setTrack("idea")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
            track === "idea"
              ? "bg-teal-700 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Lightbulb className="h-4 w-4" aria-hidden="true" />
          <span>I have an Idea</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={track === "vision"}
          aria-controls="track-panel"
          onClick={() => setTrack("vision")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
            track === "vision"
              ? "bg-teal-700 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          <span>I have a Vision</span>
        </button>
      </div>

      {/* Form Container */}
      <div
        id="track-panel"
        role="tabpanel"
        className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-9"
      >
        <div className="mb-7 pb-6 border-b border-slate-100">
          <h2 className="font-display text-xl font-bold text-slate-900">
            {track === "idea"
              ? "Stress-Test a Specific Product Concept"
              : "Explore an Observed Industry Headache"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
            {track === "idea"
              ? "Detail your product vision. We will cross-reference live competitors across Global and Indian markets, audit past post-mortems, and identify market entry wedges."
              : "Describe the observed friction point. We will analyze why existing workarounds fall short and synthesize viable beachhead entry angles."}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Concept Name */}
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Working Title or Project Name *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Cooler with Built-in Wheels, DogPals Community, CreatorFlow"
              disabled={loading}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          {/* Track-Specific Questions */}
          {track === "vision" ? (
            <>
              <div>
                <label
                  htmlFor="problemStatement"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  The Observed Headache *
                </label>
                <textarea
                  id="problemStatement"
                  required
                  rows={3}
                  value={problemStatement}
                  onChange={(e) => {
                    setProblemStatement(e.target.value);
                    if (!pitch) setPitch(e.target.value);
                  }}
                  placeholder="What is broken, frustratingly slow, or unnecessarily expensive today?"
                  disabled={loading}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
              </div>

              <div>
                <label
                  htmlFor="whyNow"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Why Now? What has changed?
                </label>
                <input
                  id="whyNow"
                  type="text"
                  value={whyNow}
                  onChange={(e) => setWhyNow(e.target.value)}
                  placeholder="e.g. Advancements in roto-molded insulation, new regulatory shifts, remote work expansion"
                  disabled={loading}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
              </div>
            </>
          ) : (
            <div>
              <label
                htmlFor="pitch"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                The Pitch (One-liner) *
              </label>
              <textarea
                id="pitch"
                required
                rows={3}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="What does the product do in plain English, and what is its primary benefit?"
                disabled={loading}
                className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            </div>
          )}

          {/* Target Customer */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="targetCustomer"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Target Customer (Who buys?) *
              </label>
              <span className="text-[11px] text-slate-500 font-medium">Avoid generic answers like &ldquo;Everyone&rdquo;</span>
            </div>
            <input
              id="targetCustomer"
              type="text"
              required
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              placeholder="e.g. Weekend campers carrying 20kg gear, Solo boutique design agencies"
              disabled={loading}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          {/* Current Workaround */}
          <div>
            <label
              htmlFor="currentWorkaround"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Current Workaround (How is it handled today?)
            </label>
            <input
              id="currentWorkaround"
              type="text"
              value={currentWorkaround}
              onChange={(e) => setCurrentWorkaround(e.target.value)}
              placeholder="e.g. Dragging heavy boxes, multiple trips with cheap bags, Excel sheets"
              disabled={loading}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          {/* Monetization Model */}
          <div>
            <label
              htmlFor="monetization"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Planned Revenue Model
            </label>
            <input
              id="monetization"
              type="text"
              value={monetization}
              onChange={(e) => setMonetization(e.target.value)}
              placeholder="e.g. Direct-to-consumer at $199 with 55% gross margin, $49/mo subscription"
              disabled={loading}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Analyzing Market Landscape...</span>
                </>
              ) : (
                <>
                  <span>Validate Concept & Run Intelligence Report</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {/* Live Progress Stage Announcement (ARIA live region) */}
          {loading && (
            <div
              aria-live="polite"
              className="rounded-xl border border-teal-200 bg-teal-50/80 p-4 text-center text-xs font-semibold text-teal-900 shadow-2xs"
            >
              <div className="flex items-center justify-center gap-2.5">
                <span className="h-2 w-2 animate-ping rounded-full bg-teal-600" />
                <span>{progressStep}</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
