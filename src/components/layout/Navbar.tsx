import Link from "next/link";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/workspace", label: "Workspace" },
  { href: "/idea/new", label: "New Idea" },
  { href: "/health", label: "Health" },
];

/**
 * Top navigation. Server Component — no client-side state needed for a
 * static link list, so we avoid the "use client" cost entirely.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="shrink-0 font-display text-[15px] font-semibold tracking-tight text-foreground"
        >
          Founder Companion
        </Link>

        <nav className="flex items-center gap-0.5 overflow-x-auto sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-foreground sm:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
