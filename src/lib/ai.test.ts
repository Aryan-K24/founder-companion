import { describe, it, expect } from "vitest";
import { generateFallbackReport } from "./ai";

describe("AI Engine Resilience & Fallback (FE-07)", () => {
  it("generates a structured report matching the required schema even when offline", () => {
    const report = generateFallbackReport({
      title: "Solo Video SaaS",
      pitch: "Automatic caption generator for reels",
      targetCustomer: "Content Creators",
      currentWorkaround: "CapCut manual typing",
      monetization: "$15/month",
    });

    expect(report).toBeDefined();
    expect(report.verdict).toBeDefined();
    expect(["DEAD_ON_ARRIVAL", "HIGH_RISK", "VIABLE_WITH_PIVOT", "COMPELLING_WEDGE"]).toContain(
      report.verdict
    );
    expect(report.dealbreakerFlags.length).toBeGreaterThan(0);
    expect(report.activeCompetitors.length).toBeGreaterThan(0);
    expect(report.graveyardStartups.length).toBeGreaterThan(0);
    expect(report.survivalWedge.unfairWedge).toBeDefined();
    expect(report.momTestQuestions.length).toBeGreaterThan(0);
    expect(report.isMockFallback).toBe(true);
  });
});
