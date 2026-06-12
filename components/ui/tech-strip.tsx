"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LogoLoop, type LogoItem } from "./logo-loop";
import { GradientText } from "@/components/ui/gradient-text";

type Skill = { name: string; color: string };

/* ── Row A — languages & frontend ─────────────────────────────── */
const ROW_A: Skill[] = [
  { name: "Java", color: "#007396" },
  { name: "JavaScript", color: "#F0DB4F" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Python", color: "#3776AB" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#7c3aed" },
];

/* ── Row B — backend, data & tooling ──────────────────────────── */
const ROW_B: Skill[] = [
  { name: "Spring Boot", color: "#6DB33F" },
  { name: "Node.js", color: "#339933" },
  { name: "Flask", color: "#9B9B9B" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Git", color: "#F05032" },
];

function toItem(s: Skill): LogoItem {
  return {
    node: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 20px",
          borderRadius: "100px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--foreground)",
          fontWeight: 600,
          fontSize: "13px",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          userSelect: "none",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* Brand-colour dot */}
        <span
          style={{
            display: "inline-block",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: s.color,
            flexShrink: 0,
          }}
        />
        {s.name}
      </div>
    ),
    title: s.name,
  };
}

export function TechStrip() {
  const rowA = useMemo(() => ROW_A.map(toItem), []);
  const rowB = useMemo(() => ROW_B.map(toItem), []);

  return (
    <section
      className="overflow-hidden py-14 sm:py-16"
      style={{ background: "var(--muted)" }}
    >
      {/* Header */}
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
              color: "var(--brand)",
              background: "color-mix(in srgb, var(--brand) 8%, transparent)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Stack
          </span>
          <h2
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--foreground)" }}
          >
            Technologies I <GradientText>build with</GradientText>
          </h2>
        </motion.div>
      </div>

      {/* Scrolling rows */}
      <div className="flex flex-col gap-3">
        {/* Row A → scrolls left */}
        <LogoLoop
          logos={rowA}
          speed={65}
          direction="left"
          logoHeight={40}
          gap={12}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--muted)"
          ariaLabel="Frontend and language technologies"
        />

        {/* Row B → scrolls right */}
        <LogoLoop
          logos={rowB}
          speed={65}
          direction="right"
          logoHeight={40}
          gap={12}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--muted)"
          ariaLabel="Backend and tooling technologies"
        />
      </div>
    </section>
  );
}
