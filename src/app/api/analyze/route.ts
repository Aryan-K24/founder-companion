import { NextRequest, NextResponse } from "next/server";
import { analyzeStartupIdea } from "@/lib/ai";
import { StartupIdea } from "@/lib/types";

// Sensible maxDuration for Vercel serverless functions (FE-11 production hygiene)
export const maxDuration = 60;

// In-memory sliding window rate limiter (prevents stranger abuse and credit drainage)
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];

  // Filter out timestamps older than the sliding window
  const activeTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, activeTimestamps);
    return true;
  }

  activeTimestamps.push(now);
  ipRequestHistory.set(ip, activeTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Guard (FE-11)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded: Maximum 5 analyses per 5 minutes allowed to protect API credits. Please wait a few moments before submitting again.",
        },
        {
          status: 429,
          headers: { "Retry-After": "300" },
        }
      );
    }

    const body = await req.json();
    const idea: Partial<StartupIdea> = body.idea;

    if (!idea || (!idea.pitch && !idea.title)) {
      return NextResponse.json(
        { error: "Idea title or pitch is required to conduct analysis." },
        { status: 400 }
      );
    }

    // 2. Input Caps Guard (FE-11: Protects against context stuffing and token drain)
    if (idea.title && idea.title.length > 120) {
      return NextResponse.json(
        { error: "Input cap exceeded: Title must be 120 characters or fewer." },
        { status: 400 }
      );
    }
    if (idea.pitch && idea.pitch.length > 1500) {
      return NextResponse.json(
        { error: "Input cap exceeded: Pitch must be 1,500 characters or fewer." },
        { status: 400 }
      );
    }
    if (idea.targetCustomer && idea.targetCustomer.length > 400) {
      return NextResponse.json(
        { error: "Input cap exceeded: Target customer field must be 400 characters or fewer." },
        { status: 400 }
      );
    }

    // 3. Process Analysis
    const report = await analyzeStartupIdea(idea);
    return NextResponse.json({ report });
  } catch (error) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during idea analysis." },
      { status: 500 }
    );
  }
}
