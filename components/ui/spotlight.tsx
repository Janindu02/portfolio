"use client";

import { useEffect, useRef } from "react";

export function Spotlight({
  color = "rgba(37,99,235,0.18)",
  size = 500,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        ref={divRef}
        className="spotlight-blur absolute"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: "50%",
          transition: "transform 0.1s ease-out",
        }}
      />
    </div>
  );
}
