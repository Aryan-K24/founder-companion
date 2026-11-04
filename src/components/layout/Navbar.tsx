import Link from "next/link";
import Container from "./Container";
import { ShieldCheck, ArrowRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/workspace", label: "Workspace" },
  { href: "/idea/new", label: "New Idea" },
  { href: "/health", label: "Health" },
];

/**
 * Modern institutional top navigation with high-trust branding and crisp CTA.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm group-hover:from-blue-700 group-hover:to-indigo-800 transition-all">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[15px] font-bold tracking-tight text-slate-900">
              Founder Companion
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 -mt-0.5">
              Market Intelligence
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1 sm:gap-1.5 mr-1 sm:mr-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/idea/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all"
          >
            <span>Start Analysis</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </header>
  );
}
