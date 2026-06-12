"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { PORTRAIT } from "@/lib/site";

/* ─────────────────────────────────────────────────────────────────────────────
   ProfileHeroCard
   ─────────────────────────────────────────────────────────────────────────────
   3-D tilt-on-cursor, frosted-glass border, animated stats on mount.
   Matches the "Sophie Bennett" card layout from the reference.
───────────────────────────────────────────────────────────────────────────── */
export function ProfileHeroCard() {
  const ref = useRef<HTMLDivElement>(null);

  /* ── Cursor-driven 3-D tilt ──────────────────────────────────────── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = { stiffness: 180, damping: 22, mass: 0.6 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  const stats = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
        </svg>
      ),
      value: "3+",
      label: "Projects",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      value: "2",
      label: "Open Source",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[320px] select-none"
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    >
      {/* ── Ambient glow behind card ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-25 spotlight-blur"
        style={{ background: "var(--brand)" }}
        aria-hidden
      />

      {/* ── Card shell ──────────────────────────────────────────────── */}
      <motion.div
        className="overflow-hidden rounded-[2rem]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "var(--card)",
          boxShadow: [
            "0 0 0 1px var(--border)",
            "0 4px 6px -1px rgba(0,0,0,0.06)",
            "0 24px 56px -12px rgba(0,0,0,0.22)",
          ].join(", "),
        }}
      >
        {/* ── Portrait image ───────────────────────────────────────── */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={PORTRAIT}
            alt="Janindu Amaraweera"
            fill
            className="object-cover object-top transition-transform duration-700 will-change-transform hover:scale-[1.04]"
            priority
            sizes="320px"
          />
          {/* Soft gradient scrim so image fades into card info */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--card))",
            }}
            aria-hidden
          />
        </div>

        {/* ── Info section ─────────────────────────────────────────── */}
        <div className="px-5 pb-5 pt-1">
          {/* Name + verified badge */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold leading-tight" style={{ color: "var(--foreground)" }}>
              Janindu Amaraweera
            </h2>
            {/* Green verified shield */}
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.6 }}
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.702 3.637 3.745 3.745 0 01-3.637.702A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.637-.702 3.745 3.745 0 01-.702-3.637A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.702-3.637 3.745 3.745 0 013.637-.702A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.637.702 3.746 3.746 0 01.702 3.637A3.746 3.746 0 0121 12z"
                  stroke="#22c55e"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </div>

          {/* Bio */}
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
            Software Engineering Undergraduate who builds things for Sri Lanka &amp; the world.
          </p>

          {/* Divider */}
          <div className="my-4 h-px" style={{ background: "var(--border)" }} />

          {/* Stats row + CTA */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{ color: "var(--muted-fg)" }}>{s.icon}</span>
                  <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{s.value}</span>
                  <span className="text-xs" style={{ color: "var(--muted-fg)" }}>{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Hire Me button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-shadow hover:shadow-md"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                Hire Me
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
