import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WorkspaceView from "./WorkspaceView";
import { SEED_IDEAS } from "@/lib/storage";

describe("WorkspaceView Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the three Kanban columns: Under Review, Active Pursuit, and Killed", () => {
    render(<WorkspaceView />);
    expect(screen.getByRole("heading", { name: /Under Review/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Active Pursuit/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Killed \(Graveyard\)/i })).toBeInTheDocument();
  });

  it("filters ideas based on the search query input", () => {
    render(<WorkspaceView />);
    const searchInput = screen.getByPlaceholderText(/Search ideas, targets, or keywords/i);

    // Filter by "dog"
    fireEvent.change(searchInput, { target: { value: "dog" } });
    expect(screen.getByText(/Dog Social Network/i)).toBeInTheDocument();
    expect(screen.queryByText(/AI Invoicing for Freelance Creators/i)).not.toBeInTheDocument();
  });
});
