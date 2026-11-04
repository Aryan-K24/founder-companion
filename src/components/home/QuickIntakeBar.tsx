"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

const SAMPLES = [
  { label: "🧊 All-Terrain Cooler", title: "Smart Modular Cooler with All-Terrain Wheels" },
  { label: "🧾 Creator Invoicing", title: "AI Invoicing for Freelance Creators" },
  { label: "🩺 Clinic CRM", title: "MicroClinic Patient Queue & Billing" },
];

export default function QuickIntakeBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/idea/new?title=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSample = (sampleTitle: string) => {
    router.push(`/idea/new?title=${encodeURIComponent(sampleTitle)}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="group relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-zinc-300 bg-white p-2 shadow-lg shadow-zinc-200/50 transition-all focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10"
      >
        <div className="flex items-center gap-3 px-3.5 flex-1 w-full">
          <Lightbulb className="h-5 w-5 text-zinc-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your startup idea (e.g. B2B freight billing, smart cooler)..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-zinc-800 transition-all shrink-0"
        >
          <span>Stress-Test Idea</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Quick Sample Chips */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-zinc-600 font-medium flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-zinc-600" />
          Try a sample:
        </span>
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => handleSelectSample(sample.title)}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-zinc-700 text-[11px] font-medium shadow-2xs transition-colors hover:border-zinc-400 hover:text-zinc-950 hover:bg-zinc-50"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
