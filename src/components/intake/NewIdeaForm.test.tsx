import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NewIdeaForm from "./NewIdeaForm";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("NewIdeaForm Component", () => {
  it("renders both track options and defaults to 'I have an Idea'", () => {
    render(<NewIdeaForm />);
    expect(screen.getByRole("tab", { name: /I have an Idea/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /I have a Vision/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Working Title or Project Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/The Pitch \(One-liner\)/i)).toBeInTheDocument();
  });

  it("switches to 'I have a Vision' track when clicked and displays problem fields", () => {
    render(<NewIdeaForm />);
    const visionTab = screen.getByRole("tab", { name: /I have a Vision/i });
    fireEvent.click(visionTab);

    expect(screen.getByLabelText(/The Observed Headache/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Why Now\? What has changed\?/i)).toBeInTheDocument();
  });

  it("shows an error alert if submitted with whitespace-only required fields", async () => {
    render(<NewIdeaForm />);
    const titleInput = screen.getByLabelText(/Working Title or Project Name/i);
    fireEvent.change(titleInput, { target: { value: "   " } });

    const form = titleInput.closest("form");
    if (form) {
      fireEvent.submit(form);
    }

    expect(
      await screen.findByText(/Please provide a title and core description/i)
    ).toBeInTheDocument();
  });
});
