import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReportView from "./ReportView";
import { StartupIdea } from "@/lib/types";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockIdea: StartupIdea = {
  id: "test-idea-1",
  track: "idea",
  title: "Test Invoicing SaaS",
  pitch: "Automated billing for freelance creators.",
  targetCustomer: "Freelancers earning $5k+/mo",
  currentWorkaround: "Manual Excel sheets",
  monetization: "$29/mo",
  status: "under_review",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  report: {
    verdict: "VIABLE_WITH_PIVOT",
    verdictHeadline: "Viable with Asymmetric Pivot",
    executiveSummary: "Detailed executive analysis of why direct competition will fail.",
    dealbreakerFlags: [
      {
        flag: "High Churn in Solo Market",
        severity: "CRITICAL",
        reasoning: "Solo freelancers churn when gigs pause.",
      },
    ],
    activeCompetitors: [
      {
        name: "Deel",
        url: "https://deel.com",
        moat: "Global legal footprint",
        vulnerability: "High enterprise minimums",
        marketPosition: "Market Leader",
      },
    ],
    graveyardStartups: [
      {
        name: "DeadInvoice Co",
        yearEnded: "2022",
        fundingBurned: "$2M",
        seductivePromise: "Free invoicing for all",
        fatalTrap: "CAC outpaced lifetime value",
        sourceUrl: "https://failory.com",
      },
    ],
    survivalWedge: {
      strategy: "Micro-Agency Wedge",
      unfairWedge: "Target boutique agencies rather than solo workers",
      deadlyMistakeToAvoid: "Do not offer credit advances",
      proposedPricingModel: "$49/mo flat",
    },
    momTestQuestions: [
      {
        hypothesis: "Agencies struggle with FX conversion",
        questionToAsk: "How much did you lose on exchange rates last month?",
        trapToAvoid: "Don't ask if they want a software solution",
      },
    ],
    generatedAt: new Date().toISOString(),
  },
};

describe("ReportView Component", () => {
  it("renders the verdict headline and executive summary", () => {
    render(<ReportView idea={mockIdea} />);
    const matches = screen.getAllByText(/VIABLE WITH ASYMMETRIC PIVOT/i);
    expect(matches.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Detailed executive analysis of why direct competition will fail/i)
    ).toBeInTheDocument();
  });

  it("renders active competitors and graveyard autopsy details", () => {
    render(<ReportView idea={mockIdea} />);
    expect(screen.getByText("Deel")).toBeInTheDocument();
    expect(screen.getByText(/Global legal footprint/i)).toBeInTheDocument();
    expect(screen.getByText("DeadInvoice Co")).toBeInTheDocument();
    expect(screen.getByText(/CAC outpaced lifetime value/i)).toBeInTheDocument();
  });

  it("renders the Mom Test customer discovery questions", () => {
    render(<ReportView idea={mockIdea} />);
    expect(
      screen.getByText(/How much did you lose on exchange rates last month\?/i)
    ).toBeInTheDocument();
  });

  it("opens the pivot modal when 'Spin off as Pivot' is clicked", () => {
    render(<ReportView idea={mockIdea} />);
    const pivotBtn = screen.getByRole("button", { name: /Spin off as Pivot/i });
    fireEvent.click(pivotBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Spin off as an Asymmetric Pivot/i)).toBeInTheDocument();
  });
});
