import { NextRequest, NextResponse } from "next/server";
import { analyzeStartupIdea } from "@/lib/ai";
import { StartupIdea } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea: Partial<StartupIdea> = body.idea;

    if (!idea || (!idea.pitch && !idea.title)) {
      return NextResponse.json(
        { error: "Idea title or pitch is required to conduct analysis." },
        { status: 400 }
      );
    }

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
