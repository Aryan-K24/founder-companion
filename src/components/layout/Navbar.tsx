import Link from "next/link";
import Container from "./Container";
import { ShieldCheck } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/workspace", label: "Workspace" },
  { href: "/idea/new", label: "New Idea" },
  { href: "/health", label: "Health" },
];

/**
 * Top navigation. Server Component — clean institutional header.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <Container className="flex h-15 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 shrink-0 font-display text-[15px] font-bold tracking-tight text-slate-900 transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-700 text-white shadow-2xs group-hover:bg-teal-800 transition-colors">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span>Founder Companion</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/idea/new"
            className="hidden sm:inline-flex items-center rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-teal-800 transition-colors ml-2"
          >
            Start Analysis
          </Link>
        </nav>
      </Container>
    </header>
  );
}
