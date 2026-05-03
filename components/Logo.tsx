import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 font-semibold text-[#2563eb] transition-opacity hover:opacity-90 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-white shadow-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M4 12h4l2-7 4 14 2-7h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[15px] tracking-tight text-neutral-900 sm:text-base">
        Engineer Portfolio
      </span>
    </Link>
  );
}
