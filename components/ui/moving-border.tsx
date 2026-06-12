"use client";

import type { ReactNode } from "react";

export function MovingBorderButton({
  children,
  className = "",
  containerClassName = "",
  borderRadius = "9999px",
  duration = 3,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  duration?: number;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <div
      className={`relative overflow-hidden p-[1.5px] ${containerClassName}`}
      style={{ borderRadius }}
    >
      {/* spinning gradient border */}
      <div
        className="moving-border-inner absolute"
        style={{
          inset: "-100%",
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--brand) 20%, #7c3aed 40%, transparent 60%)",
          animationDuration: `${duration}s`,
        }}
        aria-hidden
      />
      {/* inner face */}
      <span
        className={`relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold ${className}`}
        style={{
          borderRadius,
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ display: "inline-block" }}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={{ display: "inline-block" }}>
      {inner}
    </button>
  );
}
