import Link from "next/link";
import type { ReactNode } from "react";

type PlaceholderCardProps = {
  title: string;
  description?: string;
  tag?: string;
  href?: string;
  size?: "default" | "large";
  icon?: ReactNode;
};

/**
 * Generic placeholder surface used for landing-page entry points,
 * workspace idea cards, and empty-state content. No live data or
 * logic — just a consistent shape for content that will be wired up
 * in a later phase.
 */
export default function PlaceholderCard({
  title,
  description,
  tag,
  href,
  size = "default",
  icon,
}: PlaceholderCardProps) {
  const isLarge = size === "large";

  const content = (
    <div
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-colors ${
        href ? "hover:border-accent" : ""
      } ${isLarge ? "p-8" : "p-6"}`}
    >
      {/* corner mark — signature detail, only visible on interactive cards */}
      {href && (
        <span
          aria-hidden
          className="absolute right-0 top-0 h-8 w-8 rounded-bl-xl border-b border-l border-border transition-colors group-hover:border-accent"
        />
      )}

      <div>
        {tag && (
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-accent">
            {tag}
          </p>
        )}
        {icon && <div className="mb-4 text-accent">{icon}</div>}
        <h3
          className={`font-display font-semibold tracking-tight text-foreground ${
            isLarge ? "text-xl" : "text-base"
          }`}
        >
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>

      {href && (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Get started
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
