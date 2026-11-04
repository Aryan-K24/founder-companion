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
    <div className="w-full max-w-5xl rounded-3xl border border-zinc-200/90 bg-white shadow-2xl shadow-zinc-200/60 overflow-hidden">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/90 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-zinc-300" />
            <span className="h-3 w-3 rounded-full bg-zinc-300" />
            <span className="h-3 w-3 rounded-full bg-zinc-300" />
          </div>
          <span className="ml-2 font-mono text-[11px] font-medium text-zinc-500">
            report-preview · smart-all-terrain-cooler.fc
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-800 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            Verified Intelligence Report
          </span>
        </div>
      </div>

      {/* Report Header Brief */}
      <div className="border-b border-zinc-100 bg-white p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                Sample Concept Brief
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700">
                Physical Product / Hardware
              </span>
            </div>
            <h3 className="font-display mt-1 text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              Modular Cooler with All-Terrain Wheels & Dual Zone Storage
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-600">
              Target Audience: <strong className="text-zinc-800">Mobile event caterers, pop-up beverage carts & overland campers</strong>
            </p>
          </div>

          <div className="shrink-0">
            <div className="inline-flex flex-col items-start sm:items-end rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">Decision Verdict</span>
              <span className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-blue-700" />
                Viable with B2B Commercial Beachhead
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex items-center gap-2 border-t border-zinc-100 pt-5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("verdict")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all shrink-0 ${
              activeTab === "verdict"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
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
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
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
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>3. Market Entry Wedge & The Mom Test</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="bg-zinc-50/60 p-5 sm:p-7 min-h-[380px]">
        {/* TAB 1: VERDICT & TRAPS */}
        {activeTab === "verdict" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* The Bottom Line */}
            <div className="rounded-2xl border-2 border-zinc-900 bg-white p-5 sm:p-6 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                The Bottom Line (Plain English)
              </span>
              <h4 className="mt-1 text-base sm:text-lg font-bold text-zinc-950">
                Do NOT build for generic mass-market consumers. Focus exclusively on mobile pop-up vendors.
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-700">
                Mass consumer retail is a bloodbath dominated by \$20 Coleman coolers on the low end and \$350 Yeti brand loyalty on the high end. Rotomolded tooling molds cost \$40,000–\$80,000, and retail buyers purchase a cooler once every 8 years. However, mobile event bartenders, farmer&apos;s market juice vendors, and festival caterers haul 30kg of ice daily across gravel and have zero reliable heavy-duty wheeled options with commercial locks.
              </p>

              <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs">
                <span className="font-bold text-blue-900 uppercase tracking-wider">Tomorrow Morning&apos;s Action: </span>
                <span className="text-zinc-800 font-medium">
                  Interview 5 local farmer&apos;s market or festival food vendors. Do NOT pitch your cooler—ask how they transported ice last Saturday and what broke.
                </span>
              </div>
            </div>

            {/* Fatal Roadblock Flags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-200 bg-white p-4.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Rotomolding Tooling Capital Trap
                  </h5>
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-800">
                    CRITICAL
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                  Custom aluminum tooling molds require \$50k+ upfront before a single unit ships. You must validate pre-orders with modular off-the-shelf roto-chassis before ordering custom metal dies.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-4.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Freight Dimensional Shipping Costs
                  </h5>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                    HIGH
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">
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
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-zinc-900" />
                <h4 className="font-bold text-sm text-zinc-950">Active Market Incumbents</h4>
              </div>

              {/* Yeti */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-950 text-sm">Yeti Coolers (Tundra Haul)</span>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">
                    🌐 Global Incumbent
                  </span>
                </div>
                <p className="mt-2 text-zinc-600">
                  <strong className="text-zinc-900">Defensible Moat:</strong> Premium lifestyle brand status, nationwide retail presence, bulletproof rotomolded insulation.
                </p>
                <p className="mt-1 text-zinc-600">
                  <strong className="text-rose-800">Vulnerable Gap:</strong> Rigid fixed handle geometry causes wrist strain on uneven terrain; \$450 retail price point locks out small commercial vendors.
                </p>
              </div>

              {/* Milton & Cello */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-950 text-sm">Milton / Cello Ice-Packs</span>
                  <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    🇮🇳 India Market Leader
                  </span>
                </div>
                <p className="mt-2 text-zinc-600">
                  <strong className="text-zinc-900">Defensible Moat:</strong> Dominant distribution in tier 1–3 cities, sub-₹3,000 price point, widespread brand familiarity.
                </p>
                <p className="mt-1 text-zinc-600">
                  <strong className="text-rose-800">Vulnerable Gap:</strong> Thin injection-molded plastic; fails cold-retention test beyond 6 hours in 40°C Indian summers; wheels break on cobblestone.
                </p>
              </div>
            </div>

            {/* Historical Post-Mortem */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-amber-800" />
                <h4 className="font-bold text-sm text-zinc-950">Historical Post-Mortems & Case Studies</h4>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-950 text-sm">Coolest Cooler</span>
                  <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 font-semibold text-zinc-700 text-[10px]">
                    Shut Down 2019 • Raised \$13.2M
                  </span>
                </div>
                <p className="text-zinc-700 pt-1">
                  <strong>The Seductive Promise:</strong> The &ldquo;Swiss Army knife&rdquo; of coolers—featuring built-in blender, waterproof Bluetooth speaker, USB charger, and LED lid lights.
                </p>
                <div className="rounded-lg bg-rose-50/80 p-2.5 border border-rose-100 text-rose-950">
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
            <div className="rounded-2xl border border-zinc-300 bg-white p-5 sm:p-6 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                Actionable Niche Wedge Strategy
              </span>
              <h4 className="mt-1 text-base sm:text-lg font-bold text-zinc-950">
                The &ldquo;Mobile Bartender & Craft Caterer&rdquo; Beachhead
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-700">
                Sell directly to commercial event service providers who expense equipment on company credit cards. Offer a modular dual-compartment rolling ice chest with food-grade sanitary NSF certifications, integrated tap lines, and puncture-proof foam-filled pneumatic wheels.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600 border-t border-zinc-100 pt-3">
                <span><strong>Target Pricing:</strong> \$389 Commercial SKU</span>
                <span>•</span>
                <span><strong>Gross Margin Target:</strong> 58%</span>
                <span>•</span>
                <span><strong>Customer LTV:</strong> 2.4 units / year</span>
              </div>
            </div>

            {/* The Mom Test Questions */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-zinc-900" />
                <h5 className="font-bold text-sm text-zinc-950">The Mom Test Customer Discovery Script</h5>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5">
                  <span className="font-semibold text-zinc-800">Hypothesis to Test: Do mobile caterers actually lose revenue or time due to poor ice storage?</span>
                  <p className="mt-1.5 font-medium text-zinc-950 text-sm bg-zinc-100 p-2.5 rounded-lg border border-zinc-200">
                    &ldquo;Walk me through your setup for last Saturday&apos;s outdoor event. How did you get ice from your depot to the tent, and what happened around 4 PM when temperatures peaked?&rdquo;
                  </p>
                  <p className="mt-1.5 text-zinc-500">
                    <strong className="text-rose-700">Trap to Avoid:</strong> Never ask &ldquo;Would you like a cooler with bigger wheels?&rdquo; (They will say yes, but won&apos;t buy).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Footer Call to Action */}
      <div className="border-t border-zinc-200/80 bg-white px-5 py-4 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <span>Every analysis includes real verified companies, failure post-mortems & interview scripts.</span>
        </div>

        <Link
          href="/idea/new"
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 transition-all shrink-0"
        >
          <span>Run Free Analysis On Your Concept</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
