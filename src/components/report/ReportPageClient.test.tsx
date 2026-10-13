import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ReportPageClient from "./ReportPageClient";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ReportPageClient Component", () => {
  it("shows not found state when idea does not exist", () => {
    render(<ReportPageClient id="non-existent-id" />);
    expect(screen.getByText(/Idea Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to Workspace/i })).toBeInTheDocument();
  });

  it("renders seed idea report when valid seed ID is provided", () => {
    render(<ReportPageClient id="seed-1" />);
    expect(screen.getByText(/AI Invoicing for Freelance Creators/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Deel/i).length).toBeGreaterThan(0);
  });
});
