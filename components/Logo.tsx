import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 font-semibold transition-opacity hover:opacity-90 ${className}`}
      style={{ color: "var(--brand)" }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
        style={{ background: "var(--brand)" }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 12h4l2-7 4 14 2-7h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[15px] tracking-tight sm:text-base" style={{ color: "var(--foreground)" }}>
        Janindu.dev
      </span>
    </Link>
  );
}
