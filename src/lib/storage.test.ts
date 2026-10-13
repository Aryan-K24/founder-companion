import { describe, it, expect, beforeEach } from "vitest";
import {
  getStoredIdeas,
  saveIdea,
  getIdeaById,
  deleteIdea,
  updateIdeaStatus,
  SEED_IDEAS,
} from "./storage";
import { StartupIdea } from "./types";

describe("Storage Engine (src/lib/storage.ts)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with SEED_IDEAS if local storage is empty", () => {
    const ideas = getStoredIdeas();
    expect(ideas.length).toBe(SEED_IDEAS.length);
    expect(ideas[0].id).toBe("seed-1");
  });

  it("saves a new idea and retrieves it by ID", () => {
    const newIdea: StartupIdea = {
      id: "test-save-1",
      track: "idea",
      title: "New Testing Concept",
      pitch: "A pitch for testing",
      targetCustomer: "Developers",
      currentWorkaround: "Manual scripts",
      monetization: "$10/mo",
      status: "under_review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveIdea(newIdea);
    const retrieved = getIdeaById("test-save-1");
    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe("New Testing Concept");
  });

  it("updates idea status using updateIdeaStatus", () => {
    updateIdeaStatus("seed-1", "killed");
    const updated = getIdeaById("seed-1");
    expect(updated?.status).toBe("killed");
  });

  it("deletes an idea by ID", () => {
    deleteIdea("seed-2");
    const retrieved = getIdeaById("seed-2");
    expect(retrieved).toBeUndefined();
  });
});
