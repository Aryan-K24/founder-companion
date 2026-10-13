"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IdeaTrack, StartupIdea } from "@/lib/types";
import { saveIdea } from "@/lib/storage";
import { Lightbulb, Compass, Loader2, AlertCircle, ArrowRight } from "lucide-react";

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
    setProgressStep("Initializing research engine & gathering web signals...");

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
      // Simulate live stage transitions for transparency and UX feedback
      const timer1 = setTimeout(() => {
        setProgressStep("Searching active competitors & market incumbents...");
      }, 1200);

      const timer2 = setTimeout(() => {
        setProgressStep("Querying post-mortem archives for failed startups...");
      }, 2400);

      const timer3 = setTimeout(() => {
        setProgressStep("Running investment committee stress-test & asymmetric wedge analysis...");
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
        className="mb-8 grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={track === "idea"}
          aria-controls="track-panel"
          onClick={() => setTrack("idea")}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all ${
            track === "idea"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted hover:text-foreground"
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
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all ${
            track === "vision"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted hover:text-foreground"
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
        className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <div className="mb-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {track === "idea"
              ? "Pressure-test a concrete concept"
              : "Explore an observed problem"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {track === "idea"
              ? "Provide the core details of what you plan to build. We will search the web to evaluate competitors and past failures."
              : "Describe the pain point you care about. We will analyze why existing solutions fail and find viable business models."}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Concept Name */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-foreground"
            >
              Working Title or Project Name *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. CreatorFlow, MicroClinic CRM, DogPals"
              disabled={loading}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {/* Track-Specific Questions */}
          {track === "vision" ? (
            <>
              <div>
                <label
                  htmlFor="problemStatement"
                  className="block text-sm font-medium text-foreground"
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
                  placeholder="What is broken, frustratingly slow, or unfairly expensive right now?"
                  disabled={loading}
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="whyNow"
                  className="block text-sm font-medium text-foreground"
                >
                  Why Now? What has changed?
                </label>
                <input
                  id="whyNow"
                  type="text"
                  value={whyNow}
                  onChange={(e) => setWhyNow(e.target.value)}
                  placeholder="e.g. New AI capabilities, new regulations, recent shift to remote work"
                  disabled={loading}
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </>
          ) : (
            <div>
              <label
                htmlFor="pitch"
                className="block text-sm font-medium text-foreground"
              >
                The Pitch (One-liner) *
              </label>
              <textarea
                id="pitch"
                required
                rows={3}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="What does the product do in plain English, and what is the primary benefit?"
                disabled={loading}
                className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Target Customer */}
          <div>
            <label
              htmlFor="targetCustomer"
              className="block text-sm font-medium text-foreground"
            >
              Target Customer (Who pays?) *
            </label>
            <input
              id="targetCustomer"
              type="text"
              required
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              placeholder="e.g. Solo video editors earning $4k+/mo, Not 'everyone'"
              disabled={loading}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <p className="mt-1 text-xs text-muted">
              Be as specific as possible. Broad audiences increase customer acquisition costs.
            </p>
          </div>

          {/* Current Workaround */}
          <div>
            <label
              htmlFor="currentWorkaround"
              className="block text-sm font-medium text-foreground"
            >
              Current Workaround (How do they solve this today?)
            </label>
            <input
              id="currentWorkaround"
              type="text"
              value={currentWorkaround}
              onChange={(e) => setCurrentWorkaround(e.target.value)}
              placeholder="e.g. Disorganized Google Sheets, WhatsApp groups, manual email chains"
              disabled={loading}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {/* Monetization Model */}
          <div>
            <label
              htmlFor="monetization"
              className="block text-sm font-medium text-foreground"
            >
              Planned Revenue Model
            </label>
            <input
              id="monetization"
              type="text"
              value={monetization}
              onChange={(e) => setMonetization(e.target.value)}
              placeholder="e.g. $49/mo SaaS, 2% transaction fee, $200 one-time setup"
              disabled={loading}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Stress-Testing Concept...</span>
                </>
              ) : (
                <>
                  <span>Run Pre-Seed Autopsy & Analysis</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {/* Live Progress Stage Announcement (ARIA live region) */}
          {loading && (
            <div
              aria-live="polite"
              className="rounded-lg border border-accent/20 bg-accent-soft p-3.5 text-center text-xs font-medium text-accent"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
                <span>{progressStep}</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
