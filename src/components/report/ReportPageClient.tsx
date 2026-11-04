"use client";

import { useEffect, useState } from "react";
import { StartupIdea } from "@/lib/types";
import { getIdeaById } from "@/lib/storage";
import ReportView from "./ReportView";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

interface ReportPageClientProps {
  id: string;
}

export default function ReportPageClient({ id }: ReportPageClientProps) {
  const [idea, setIdea] = useState<StartupIdea | null | undefined>(undefined);

  useEffect(() => {
    const loaded = getIdeaById(id);
    setIdea(loaded || null);
  }, [id]);

  if (idea === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-900" />
      </div>
    );
  }

  if (idea === null) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Idea Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          No startup idea with ID &quot;{id}&quot; was found in this workspace.
        </p>
        <div className="mt-6">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workspace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/workspace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Workspace
        </Link>
      </div>

      <ReportView idea={idea} />
    </div>
  );
}
