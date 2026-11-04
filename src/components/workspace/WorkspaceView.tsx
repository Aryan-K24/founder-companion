"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StartupIdea, IdeaStatus } from "@/lib/types";
import { getStoredIdeas, updateIdeaStatus, deleteIdea } from "@/lib/storage";
import {
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  ArrowRight,
} from "lucide-react";

export default function WorkspaceView() {
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIdeas(getStoredIdeas());
    setIsLoaded(true);
  }, []);

  const handleStatusChange = (id: string, newStatus: IdeaStatus) => {
    updateIdeaStatus(id, newStatus);
    setIdeas(getStoredIdeas());
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteIdea(id);
      setIdeas(getStoredIdeas());
    }
  };

  const filtered = ideas.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.targetCustomer.toLowerCase().includes(search.toLowerCase()) ||
      i.pitch.toLowerCase().includes(search.toLowerCase())
  );

  const underReview = filtered.filter((i) => i.status === "under_review");
  const activePursuit = filtered.filter((i) => i.status === "active_pursuit");
  const killed = filtered.filter((i) => i.status === "killed");

  const renderColumn = (
    title: string,
    items: StartupIdea[],
    columnStatus: IdeaStatus,
    icon: React.ReactNode,
    badgeColor: string,
    headerColor: string
  ) => (
    <div className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className={`font-display text-sm font-bold tracking-tight ${headerColor}`}>
            {title}
          </h2>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColor}`}
        >
          {items.length}
        </span>
      </div>

      {/* Column Content */}
      <div className="mt-4 flex flex-1 flex-col gap-3 min-h-[320px]">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-600">
            <p>No concepts in this stage</p>
          </div>
        ) : (
          items.map((idea) => {
            const hasReport = !!idea.report;
            return (
              <div
                key={idea.id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4 shadow-2xs transition-all hover:border-teal-600 hover:bg-white hover:shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                      {idea.track === "vision" ? "Vision" : "Idea"}
                      {idea.parentIdeaId && " • Pivot"}
                    </span>
                    <button
                      onClick={() => handleDelete(idea.id, idea.title)}
                      className="text-slate-400 opacity-0 transition-opacity hover:text-rose-600 group-hover:opacity-100"
                      aria-label={`Delete ${idea.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h3 className="font-display mt-1.5 text-sm font-semibold text-slate-900">
                    {idea.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {idea.pitch}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Target:</span>
                    <span className="truncate">{idea.targetCustomer}</span>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3 text-xs">
                  {hasReport ? (
                    <Link
                      href={`/idea/${idea.id}/report`}
                      className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:underline"
                    >
                      <span>View Analysis</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <Link
                      href="/idea/new"
                      className="text-amber-700 font-medium hover:underline"
                    >
                      Needs Analysis
                    </Link>
                  )}

                  {/* Stage Switcher */}
                  <select
                    value={idea.status}
                    onChange={(e) =>
                      handleStatusChange(idea.id, e.target.value as IdeaStatus)
                    }
                    aria-label={`Change stage for ${idea.title}`}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-2xs focus:border-teal-700 focus:outline-none"
                  >
                    <option value="under_review">Under Review</option>
                    <option value="active_pursuit">Active Pursuit</option>
                    <option value="killed">Archived (Graveyard)</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-sm text-slate-500">
        Loading workspace ideas...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ideas, targets, or keywords..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>

        <Link
          href="/idea/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-teal-800"
        >
          <Plus className="h-4 w-4" />
          <span>New Startup Intake</span>
        </Link>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {renderColumn(
          "Under Review",
          underReview,
          "under_review",
          <Clock className="h-4 w-4 text-amber-600" aria-hidden="true" />,
          "bg-amber-50 text-amber-800 border border-amber-200",
          "text-amber-950"
        )}

        {renderColumn(
          "Active Pursuit",
          activePursuit,
          "active_pursuit",
          <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />,
          "bg-emerald-50 text-emerald-800 border border-emerald-200",
          "text-emerald-950"
        )}

        {renderColumn(
          "Killed (Graveyard)",
          killed,
          "killed",
          <Archive className="h-4 w-4 text-slate-500" aria-hidden="true" />,
          "bg-slate-100 text-slate-700 border border-slate-200",
          "text-slate-900"
        )}
      </div>
    </div>
  );
}
