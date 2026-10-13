import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PlaceholderCard from "./PlaceholderCard";

describe("PlaceholderCard Component", () => {
  it("renders card with title, description, and tag", () => {
    render(
      <PlaceholderCard
        title="Sample Card"
        description="Sample Description text"
        tag="Early Stage"
        href="/idea/new"
      />
    );

    expect(screen.getByText("Sample Card")).toBeInTheDocument();
    expect(screen.getByText("Sample Description text")).toBeInTheDocument();
    expect(screen.getByText("Early Stage")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/idea/new");
  });

  it("renders without link when href is omitted", () => {
    render(<PlaceholderCard title="Static Card" description="Static Description" />);
    expect(screen.getByText("Static Card")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
