"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Layers,
  Target,
  ArrowRight,
  TrendingUp,
  History,
  ShieldAlert,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Gauge,
  Sparkles,
  Zap,
} from "lucide-react";

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"verdict" | "competitors" | "strategy">("verdict");

  return (
    <div className="w-full max-w-5xl rounded-3xl p-1 bg-gradient-to-b from-slate-200/90 via-indigo-100/50 to-slate-200/80 preview-shadow overflow-hidden">
      <div className="rounded-[22px] bg-white overflow-hidden">
        {/* Window Chrome Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400 border border-rose-500/30" />
              <span className="h-3 w-3 rounded-full bg-amber-400 border border-amber-500/30" />
              <span className="h-3 w-3 rounded-full bg-emerald-400 border border-emerald-500/30" />
            </div>
            <span className="ml-3 hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-slate-500">
              <span className="text-slate-400">workspace /</span>
              <span className="text-slate-700 font-semibold">cooler-all-terrain-v1.report</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Verified Multi-Engine Synthesis
            </span>
          </div>
        </div>

        {/* Dashboard Concept Brief Bar */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/70 via-white to-blue-50/30 p-5 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800">
                  <Zap className="h-3 w-3 text-blue-600" />
                  Hardware / Consumer Gear
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Target: Mobile Bartenders & Event Caterers
                </span>
              </div>
              <h3 className="font-display mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Modular All-Terrain Cooler with Integrated Pneumatic Wheels
              </h3>
            </div>

            {/* Live Viability Score Widget */}
            <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3 sm:px-4 shadow-2xs shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-lg shadow-sm">
                81
              </div>
              <div>
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-950">
                  <Gauge className="h-3.5 w-3.5 text-blue-600" />
                  <span>Viability Score</span>
                </div>
                <span className="text-xs font-semibold text-indigo-900/90">
                  High Conviction (B2B Niche Angle)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-t border-slate-200/60 pt-5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("verdict")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                activeTab === "verdict"
                  ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Award className="h-3.5 w-3.5 text-blue-400" />
              <span>1. Executive Verdict & Risk Radar</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("competitors")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                activeTab === "competitors"
                  ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-blue-400" />
              <span>2. Incumbents (India + Global) & Post-Mortems</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("strategy")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                activeTab === "strategy"
                  ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Target className="h-3.5 w-3.5 text-blue-400" />
              <span>3. Asymmetric Wedge & The Mom Test</span>
            </button>
          </div>
        </div>

        {/* Dashboard Dynamic Content Panel */}
        <div className="bg-slate-50/70 p-5 sm:p-7 min-h-[400px]">
          {/* TAB 1: EXECUTIVE VERDICT & RISK RADAR */}
          {activeTab === "verdict" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Executive Bottom Line */}
              <div className="rounded-2xl border-2 border-blue-600/80 bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    The Bottom Line in Plain English
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    Strong Opportunity (If Niche Focused)
                  </span>
                </div>

                <h4 className="mt-2 text-base sm:text-lg font-bold text-slate-900">
                  Do NOT build for mass consumers. Focus exclusively on mobile pop-up beverage vendors.
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                  Generic consumer retail is a bloodbath dominated by \$20 Coleman coolers on the budget end and \$350 Yeti brand loyalty on the luxury end. Tooling molds for rotomolded plastics cost \$50,000–\$80,000, and retail buyers purchase a cooler once every 8 years. However, mobile event bartenders, farmer&apos;s market juice vendors, and festival caterers haul 30kg of ice daily across gravel and have zero reliable commercial options with lockable taps and pneumatic tires.
                </p>

                {/* Immediate Next Step */}
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/80 p-3.5 text-xs text-blue-950 flex items-start gap-2.5">
                  <ArrowRight className="h-4 w-4 text-blue-700 shrink-0 mt-0.5 font-bold" />
                  <div>
                    <span className="font-bold text-blue-900 uppercase tracking-wider">Tomorrow Morning&apos;s Action: </span>
                    <span className="font-medium">
                      Interview 5 local festival or farmer&apos;s market food vendors. Do NOT pitch your cooler—ask how they transported ice last Saturday and what broke.
                    </span>
                  </div>
                </div>
              </div>

              {/* Fatal Roadblock Flags Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-l-4 border-l-rose-500 border border-slate-200 bg-white p-4.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Rotomolding Tooling Capital Trap
                    </h5>
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                      CRITICAL RISK
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Custom aluminum tooling molds require \$60,000+ upfront before a single unit ships. You must validate pre-orders with modular off-the-shelf roto-chassis before ordering custom metal dies.
                  </p>
                </div>

                <div className="rounded-2xl border-l-4 border-l-amber-500 border border-slate-200 bg-white p-4.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Freight Dimensional Weight Penalty
                    </h5>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      HIGH RISK
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Coolers essentially ship empty air. Dimensional weight shipping can devour 35% of direct-to-consumer margin unless packaged nested or sold through commercial B2B freight channels.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INCUMBENTS & POST-MORTEMS */}
          {activeTab === "competitors" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-in fade-in duration-200">
              {/* Active Competitors */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <h4 className="font-bold text-sm text-slate-900">Active Market Incumbents</h4>
                </div>

                {/* Yeti */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Yeti Coolers (Tundra Haul)</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      🌐 Global Incumbent
                    </span>
                  </div>
                  <p className="mt-2 text-slate-600">
                    <strong className="text-emerald-800">Defensible Moat:</strong> Unrivaled premium lifestyle brand prestige, nationwide retail presence, bulletproof rotomolded insulation.
                  </p>
                  <p className="mt-1 text-slate-600">
                    <strong className="text-rose-800">Vulnerable Gap:</strong> Rigid fixed handle geometry causes wrist strain on uneven terrain; \$450 retail price point locks out small commercial vendors.
                  </p>
                </div>

                {/* Milton & Cello */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Milton / Cello Ice-Packs</span>
                    <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      🇮🇳 India Market Leader
                    </span>
                  </div>
                  <p className="mt-2 text-slate-600">
                    <strong className="text-emerald-800">Defensible Moat:</strong> Dominant distribution in tier 1–3 cities, sub-₹3,000 price point, widespread brand familiarity.
                  </p>
                  <p className="mt-1 text-slate-600">
                    <strong className="text-rose-800">Vulnerable Gap:</strong> Thin injection-molded plastic; fails cold-retention test beyond 6 hours in 40°C Indian summers; wheels break on cobblestone.
                  </p>
                </div>
              </div>

              {/* Startup Post-Mortems */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <History className="h-4 w-4 text-amber-600" />
                  <h4 className="font-bold text-sm text-slate-900">Historical Post-Mortems & Case Studies</h4>
                </div>

                <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Coolest Cooler</span>
                    <span className="rounded-full border border-rose-200 bg-rose-100 px-2.5 py-0.5 font-bold text-rose-900 text-[10px]">
                      Shut Down 2019 • Raised \$13.2M
                    </span>
                  </div>
                  <p className="text-slate-700 pt-1">
                    <strong>The Seductive Promise:</strong> The &ldquo;Swiss Army knife&rdquo; of coolers—featuring built-in blender, waterproof Bluetooth speaker, USB charger, and LED lid lights.
                  </p>
                  <div className="rounded-lg bg-rose-100/70 p-2.5 border border-rose-200 text-rose-950 font-medium">
                    <strong className="font-bold text-rose-900">The Fatal Trap:</strong> Feature overload led to custom electric motor supplier delays, skyrocketing mold tooling costs, and tariff shocks. The company burned \$13M and went bankrupt before fulfilling 20,000 Kickstarter orders.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STRATEGY & THE MOM TEST */}
          {activeTab === "strategy" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Niche Beachhead Strategy */}
              <div className="rounded-2xl border border-indigo-200 bg-white p-5 sm:p-6 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-blue-600" />
                  Actionable Niche Wedge Strategy
                </span>
                <h4 className="mt-1 text-base sm:text-lg font-bold text-slate-900">
                  The &ldquo;Mobile Bartender & Craft Caterer&rdquo; Beachhead
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                  Sell directly to commercial event service providers who expense equipment on company credit cards. Offer a modular dual-compartment rolling ice chest with food-grade sanitary NSF certifications, integrated tap lines, and puncture-proof foam-filled pneumatic wheels.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <span><strong>Target Retail:</strong> \$389 Commercial SKU</span>
                  <span>•</span>
                  <span><strong>Gross Margin Target:</strong> 58%</span>
                  <span>•</span>
                  <span><strong>Customer LTV:</strong> 2.4 units / year</span>
                </div>
              </div>

              {/* The Mom Test Behavioral Questions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <h5 className="font-bold text-sm text-slate-900">The Mom Test Customer Discovery Script</h5>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                    <span className="font-semibold text-slate-800">Hypothesis to Test: Do mobile caterers actually lose revenue or time due to poor ice storage?</span>
                    <p className="mt-1.5 font-medium text-slate-900 text-sm bg-blue-50/70 p-2.5 rounded-lg border border-blue-200/80">
                      &ldquo;Walk me through your setup for last Saturday&apos;s outdoor event. How did you get ice from your depot to the tent, and what happened around 4 PM when temperatures peaked?&rdquo;
                    </p>
                    <p className="mt-1.5 text-slate-500">
                      <strong className="text-rose-700">Trap to Avoid:</strong> Never ask &ldquo;Would you like a cooler with bigger wheels?&rdquo; (They will say yes, but won&apos;t buy).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Footer Call to Action */}
        <div className="border-t border-slate-200/80 bg-slate-50/90 px-5 py-4 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span>Every report contains verified domestic & global data, post-mortems, and customer discovery.</span>
          </div>

          <Link
            href="/idea/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all shrink-0"
          >
            <span>Run Free Analysis On Your Concept</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
