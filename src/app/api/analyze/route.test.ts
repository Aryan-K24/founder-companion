import { describe, it, expect } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("API Route Hygiene & Protections (FE-11)", () => {
  it("rejects requests exceeding title character cap", async () => {
    const longTitle = "A".repeat(150);
    const req = new NextRequest("http://localhost:3000/api/analyze", {
      method: "POST",
      body: JSON.stringify({
        idea: {
          title: longTitle,
          pitch: "Valid pitch",
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Input cap exceeded: Title must be 120 characters or fewer");
  });

  it("rejects requests exceeding pitch character cap", async () => {
    const longPitch = "B".repeat(1600);
    const req = new NextRequest("http://localhost:3000/api/analyze", {
      method: "POST",
      body: JSON.stringify({
        idea: {
          title: "Valid Title",
          pitch: longPitch,
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Input cap exceeded: Pitch must be 1,500 characters or fewer");
  });

  it("rejects requests missing both title and pitch", async () => {
    const req = new NextRequest("http://localhost:3000/api/analyze", {
      method: "POST",
      body: JSON.stringify({
        idea: {
          title: "",
          pitch: "",
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
