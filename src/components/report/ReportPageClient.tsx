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
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (idea === null) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
        <h2 className="font-display text-lg font-bold text-foreground">
          Idea Not Found
        </h2>
        <p className="mt-2 text-sm text-muted">
          No startup idea with ID &quot;{id}&quot; was found in this workspace.
        </p>
        <div className="mt-6">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Workspace
        </Link>
      </div>

      <ReportView idea={idea} />
    </div>
  );
}
