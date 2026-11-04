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
} from "lucide-react";

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"verdict" | "competitors" | "strategy">("verdict");

  return (
    <div className="w-full max-w-5xl rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-200/60 overflow-hidden">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
          </div>
          <span className="ml-2 font-mono text-[11px] font-medium text-slate-500">
            report-preview · smart-all-terrain-cooler.fc
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse" />
            Verified Intelligence Report
          </span>
        </div>
      </div>

      {/* Report Header Brief */}
      <div className="border-b border-slate-100 bg-white p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                Sample Concept Brief
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                Physical Product / Hardware
              </span>
            </div>
            <h3 className="font-display mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Modular Cooler with All-Terrain Wheels & Dual Zone Storage
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Target Audience: <strong className="text-slate-800">Mobile event caterers, pop-up beverage carts & overland campers</strong>
            </p>
          </div>

          <div className="shrink-0">
            <div className="inline-flex flex-col items-start sm:items-end rounded-xl border border-teal-200 bg-teal-50/80 px-4 py-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Decision Verdict</span>
              <span className="text-xs sm:text-sm font-bold text-teal-950 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-teal-700" />
                Viable with B2B Commercial Beachhead
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("verdict")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all shrink-0 ${
              activeTab === "verdict"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>1. Executive Verdict & Fatal Traps</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("competitors")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all shrink-0 ${
              activeTab === "competitors"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>2. Incumbents & Historical Post-Mortems</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("strategy")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all shrink-0 ${
              activeTab === "strategy"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>3. Market Entry Wedge & The Mom Test</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="bg-slate-50/60 p-5 sm:p-7 min-h-[380px]">
        {/* TAB 1: VERDICT & TRAPS */}
        {activeTab === "verdict" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* The Bottom Line */}
            <div className="rounded-2xl border-2 border-teal-700/80 bg-white p-5 sm:p-6 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                The Bottom Line (Plain English)
              </span>
              <h4 className="mt-1 text-base sm:text-lg font-bold text-slate-900">
                Do NOT build for generic mass-market consumers. Focus exclusively on mobile pop-up vendors.
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                Mass consumer retail is a bloodbath dominated by \$20 Coleman coolers on the low end and \$350 Yeti brand loyalty on the high end. Rotomolded tooling molds cost \$40,000–\$80,000, and retail buyers purchase a cooler once every 8 years. However, mobile event bartenders, farmer&apos;s market juice vendors, and festival caterers haul 30kg of ice daily across gravel and have zero reliable heavy-duty wheeled options with commercial locks.
              </p>

              <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50/70 p-3.5 text-xs">
                <span className="font-bold text-teal-900 uppercase tracking-wider">Tomorrow Morning&apos;s Action: </span>
                <span className="text-slate-800 font-medium">
                  Interview 5 local farmer&apos;s market or festival food vendors. Do NOT pitch your cooler—ask how they transported ice last Saturday and what broke.
                </span>
              </div>
            </div>

            {/* Fatal Roadblock Flags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-200 bg-white p-4.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Rotomolding Tooling Capital Trap
                  </h5>
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-800">
                    CRITICAL
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Custom aluminum tooling molds require \$50k+ upfront before a single unit ships. You must validate pre-orders with modular off-the-shelf roto-chassis before ordering custom metal dies.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-4.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Freight Dimensional Shipping Costs
                  </h5>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                    HIGH
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Coolers are essentially shipping empty air. Dimensional weight freight can devour 35% of direct-to-consumer margin unless packaged nested or sold through commercial B2B freight channels.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INCUMBENTS & POST-MORTEMS */}
        {activeTab === "competitors" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-in fade-in duration-200">
            {/* Active Incumbents */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-700" />
                <h4 className="font-bold text-sm text-slate-900">Active Market Incumbents</h4>
              </div>

              {/* Yeti */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Yeti Coolers (Tundra Haul)</span>
                  <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    🌐 Global Incumbent
                  </span>
                </div>
                <p className="mt-2 text-slate-600">
                  <strong className="text-emerald-800">Defensible Moat:</strong> Premium lifestyle brand status, nationwide retail presence, bulletproof rotomolded insulation.
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

            {/* Historical Post-Mortem */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-amber-700" />
                <h4 className="font-bold text-sm text-slate-900">Historical Post-Mortems & Case Studies</h4>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Coolest Cooler</span>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-semibold text-slate-700 text-[10px]">
                    Shut Down 2019 • Raised \$13.2M
                  </span>
                </div>
                <p className="text-slate-700 pt-1">
                  <strong>The Seductive Promise:</strong> The &ldquo;Swiss Army knife&rdquo; of coolers—featuring built-in blender, waterproof Bluetooth speaker, USB charger, and LED lid lights.
                </p>
                <div className="rounded-lg bg-rose-50/70 p-2.5 border border-rose-100 text-rose-950">
                  <strong className="font-bold text-rose-900">The Fatal Trap:</strong> Feature overload led to custom electric motor supplier delays, skyrocketing mold tooling costs, and tariff shocks. The company burned \$13M and went bankrupt before fulfilling 20,000 Kickstarter orders.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STRATEGY & MOM TEST */}
        {activeTab === "strategy" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Entry Strategy */}
            <div className="rounded-2xl border border-teal-200/80 bg-white p-5 sm:p-6 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                Actionable Niche Wedge Strategy
              </span>
              <h4 className="mt-1 text-base sm:text-lg font-bold text-slate-900">
                The &ldquo;Mobile Bartender & Craft Caterer&rdquo; Beachhead
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                Sell directly to commercial event service providers who expense equipment on company credit cards. Offer a modular dual-compartment rolling ice chest with food-grade sanitary NSF certifications, integrated tap lines, and puncture-proof foam-filled pneumatic wheels.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <span><strong>Target Pricing:</strong> \$389 Commercial SKU</span>
                <span>•</span>
                <span><strong>Gross Margin Target:</strong> 58%</span>
                <span>•</span>
                <span><strong>Customer LTV:</strong> 2.4 units / year</span>
              </div>
            </div>

            {/* The Mom Test Questions */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-teal-700" />
                <h5 className="font-bold text-sm text-slate-900">The Mom Test Customer Discovery Script</h5>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <span className="font-semibold text-slate-800">Hypothesis to Test: Do mobile caterers actually lose revenue or time due to poor ice storage?</span>
                  <p className="mt-1.5 font-medium text-teal-900 text-sm bg-teal-50/70 p-2 rounded-lg border border-teal-100">
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

      {/* Preview Footer Call to Action */}
      <div className="border-t border-slate-200/80 bg-white px-5 py-4 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span>Every analysis includes real verified companies, failure post-mortems & interview scripts.</span>
        </div>

        <Link
          href="/idea/new"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-900 transition-all shrink-0"
        >
          <span>Run Free Analysis On Your Concept</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
