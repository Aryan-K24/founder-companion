"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";

const SAMPLES = [
  {
    label: "🧊 All-Terrain Cooler",
    title: "Smart Modular Cooler with All-Terrain Wheels",
    badge: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300",
  },
  {
    label: "🧾 Creator Invoicing",
    title: "AI Invoicing for Freelance Creators",
    badge: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300",
  },
  {
    label: "🩺 Clinic CRM",
    title: "MicroClinic Patient Queue & Billing",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300",
  },
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
        className="group relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-md shadow-slate-200/50 transition-all focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"
      >
        <div className="flex items-center gap-3 px-3.5 flex-1 w-full">
          <Search className="h-5 w-5 text-blue-600 shrink-0" />
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-all active:scale-[0.98] shrink-0"
        >
          <span>Stress-Test Idea</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Quick Sample Chips with Tasteful Vibrant Tones */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-600 font-semibold flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          Sample concepts:
        </span>
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => handleSelectSample(sample.title)}
            className={`rounded-lg border px-3 py-1 text-[11px] font-semibold transition-all shadow-2xs hover:shadow-xs ${sample.badge}`}
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
