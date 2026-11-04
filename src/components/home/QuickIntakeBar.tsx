"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";

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
        className="group relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-sm transition-all focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900"
      >
        <div className="flex items-center gap-3 px-3.5 flex-1 w-full">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your startup idea (e.g. B2B freight billing, smart cooler)..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-all shrink-0"
        >
          <span>Stress-Test Idea</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Quick Sample Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-slate-500" />
          Sample concepts:
        </span>
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => handleSelectSample(sample.title)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 text-[11px] font-medium transition-colors hover:border-slate-400 hover:bg-white hover:text-slate-900"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
