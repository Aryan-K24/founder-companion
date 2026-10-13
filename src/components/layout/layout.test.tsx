import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Container from "./Container";
import Navbar from "./Navbar";
import PageHeader from "./PageHeader";

describe("Layout Components", () => {
  it("renders Container with children and custom className", () => {
    render(<Container className="custom-class">Test Container Content</Container>);
    expect(screen.getByText("Test Container Content")).toBeInTheDocument();
  });

  it("renders Navbar with branding and navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Founder Companion")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Workspace" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "New Idea" })).toBeInTheDocument();
  });

  it("renders PageHeader with eyebrow, title, and description", () => {
    render(
      <PageHeader
        eyebrow="Test Eyebrow"
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
