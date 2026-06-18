"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";

/* ─────────────────────────────────────────────────────────────────────────────
   Animation layers per card
   ──────────────────────────────────────────────────────────────────────────
   1. Entrance     — opacity + y + scale, staggered by index
   2. Shimmer      — one-time horizontal sweep across the card on entry
   3. 3-D tilt     — cursor-driven rotateX / rotateY via spring
   4. Image parallax — image offsets opposite direction of tilt (depth cue)
   5. Spotlight    — radial gradient follows cursor (useMotionTemplate, no re-render)
   6. Badge pop-in — spring scale for the number / year chips
   7. Text stagger — each text line slides up with increasing delay
   8. Accent line  — scaleX 0 → 1 wipe on entry
   9. Border glow  — box-shadow deepens + brand-colour rim on hover
───────────────────────────────────────────────────────────────────────────── */

const AWARDS = [
  {
    src: "/awards/cutting edge.jpg",
    num: "01",
    year: "2025",
    title: "2nd Runners-up",
    event: "Cutting Edge 2025",
    org: "CeylonMine · GSMB · Sri Lanka",
    featured: false,
    portrait: false,
    center: false,
  },
  {
    src: "/awards/nbqsa.jpg",
    num: "02",
    year: "2024",
    title: "NBQSA",
    event: "National Best Quality Software Awards",
    org: "BCS Sri Lanka",
    featured: false,
    portrait: false,
    center: false,
  },
  /* ── Centre hero — spans 2 rows in the middle column ── */
  {
    src: "/awards/nbqsa%203.jpg",
    num: "03",
    year: "2024",
    title: "NBQSA Ceremony",
    event: "National Best Quality Software Awards",
    org: "BCS Sri Lanka",
    featured: false,
    portrait: true,
    center: true,
  },
  {
    src: "/awards/nbqsa2.jpg",
    num: "04",
    year: "2024",
    title: "NBQSA",
    event: "National Best Quality Software Awards",
    org: "BCS Sri Lanka",
    featured: false,
    portrait: false,
    center: false,
  },
  {
    src: "/awards/1776176340463.jpg",
    num: "05",
    year: "2024",
    title: "Special Achievement",
    event: "Academic Excellence",
    org: "University of Westminster · IIT Campus",
    featured: false,
    portrait: false,
    center: false,
  },
];

/* ── Individual card ──────────────────────────────────────────────────────── */
function AwardCard({
  award,
  index,
  mobile = false,
}: {
  award: (typeof AWARDS)[number];
  index: number;
  mobile?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* 3-D tilt ─────────────────────────────────────── */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const stX = useSpring(tiltX, { stiffness: 180, damping: 26, mass: 0.5 });
  const stY = useSpring(tiltY, { stiffness: 180, damping: 26, mass: 0.5 });
  const deg = award.featured ? 4 : 8;
  const rotateX = useTransform(stY, [-0.5, 0.5], [deg, -deg]);
  const rotateY = useTransform(stX, [-0.5, 0.5], [-deg, deg]);

  /* Image parallax ─────────────────────────────── */
  const imgX = useTransform(stX, [-0.5, 0.5], [12, -12]);
  const imgY = useTransform(stY, [-0.5, 0.5], [12, -12]);

  /* Spotlight (no re-render — MotionValue → CSS string) ─── */
  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(
    circle 260px at ${spotX}px ${spotY}px,
    color-mix(in srgb, var(--brand) 13%, transparent),
    transparent 80%
  )`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width - 0.5);
    tiltY.set((e.clientY - r.top) / r.height - 0.5);
    spotX.set(e.clientX - r.left);
    spotY.set(e.clientY - r.top);
  }
  function onLeave() {
    tiltX.set(0);
    tiltY.set(0);
    spotX.set(-400);
    spotY.set(-400);
  }

  const base = index * 0.1; // stagger base delay

  return (
    <div className={award.center && !mobile ? "h-full" : ""}>
      {/* ── Entrance wrapper ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 52, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: base, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 900 }}
        className={award.center && !mobile ? "h-full" : ""}
      >
        {/* ── Card shell ─────────────────────────────────────────────── */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={`relative overflow-hidden rounded-2xl${award.center && !mobile ? " h-full flex flex-col" : ""}`}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            background: "var(--card)",
            boxShadow: [
              "0 0 0 1px var(--border)",
              "0 2px 8px rgba(0,0,0,0.05)",
              "0 12px 40px rgba(0,0,0,0.08)",
            ].join(", "),
          }}
          whileHover={{
            boxShadow: [
              "0 0 0 1.5px color-mix(in srgb, var(--brand) 55%, transparent)",
              "0 4px 16px rgba(0,0,0,0.08)",
              "0 24px 64px rgba(0,0,0,0.15)",
            ].join(", "),
          }}
          transition={{ duration: 0.22 }}
        >
          {/* ── Spotlight overlay ─────────────────────────────────── */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: spotlight }}
          />

          {/* ── Entrance shimmer sweep ────────────────────────────── */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background:
                "linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.11) 50%, transparent 70%)",
              willChange: "transform",
            }}
            initial={{ x: "-110%" }}
            whileInView={{ x: "210%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: base + 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── Photo thumbnail ──────────────────────────────────── */}
          <div
            className={`relative overflow-hidden ${
              award.center && !mobile
                ? "flex-1 min-h-0"
                : award.featured
                ? "aspect-[21/8]"
                : award.portrait
                ? "aspect-[3/4]"
                : "aspect-[4/3]"
            }`}
          >
            {/* Parallax container — slightly oversized so edges never show */}
            <motion.div
              className="absolute inset-[-6%]"
              style={{ x: imgX, y: imgY }}
            >
              <Image
                src={award.src}
                alt={award.event}
                fill
                className={award.portrait ? "object-cover object-top" : "object-cover"}
                sizes={
                  award.featured
                    ? "(max-width:640px) 100vw, 100vw"
                    : "(max-width:640px) 100vw, 50vw"
                }
              />
            </motion.div>

            {/* Scrim — fades photo edge into card bg */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
              style={{
                background: "linear-gradient(to top, var(--card), transparent)",
              }}
            />

            {/* Number badge — spring pop-in */}
            <motion.span
              className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold"
              style={{
                background: "color-mix(in srgb, var(--brand) 14%, var(--card))",
                color: "var(--brand)",
                border:
                  "1px solid color-mix(in srgb, var(--brand) 28%, transparent)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 20,
                delay: base + 0.18,
              }}
            >
              {award.num}
            </motion.span>

            {/* Year badge — spring pop-in (offset delay) */}
            <motion.span
              className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              style={{
                background:
                  "color-mix(in srgb, var(--foreground) 8%, var(--card))",
                color: "var(--muted-fg)",
                border: "1px solid var(--border)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 20,
                delay: base + 0.24,
              }}
            >
              {award.year}
            </motion.span>
          </div>

          {/* ── Text content ─────────────────────────────────────── */}
          <div
            className={`relative z-10 p-4 sm:p-5 ${award.featured ? "sm:p-6" : ""}`}
          >
            {/* Trophy icon for featured card */}
            {award.featured && (
              <motion.span
                className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background:
                    "color-mix(in srgb, var(--brand) 12%, transparent)",
                  color: "var(--brand)",
                }}
                initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                  delay: base + 0.3,
                }}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 4v1m0 0V8a4 4 0 01-8 0V5m8 0H8M8 5H5a1 1 0 00-1 1v1a4 4 0 004 4h.5m7.5-6h3a1 1 0 011 1v1a4 4 0 01-4 4H15M12 17v2m0 0h-2m2 0h2"
                  />
                </svg>
              </motion.span>
            )}

            {/* Title */}
            <motion.h3
              className={`font-bold leading-tight tracking-tight ${
                award.featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
              }`}
              style={{ color: "var(--foreground)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: base + 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {award.title}
            </motion.h3>

            {/* Event */}
            <motion.p
              className="mt-1 text-sm font-medium"
              style={{ color: "var(--brand)" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: base + 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              {award.event}
            </motion.p>

            {/* Org */}
            <motion.p
              className="mt-0.5 text-xs"
              style={{ color: "var(--muted-fg)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: base + 0.44 }}
            >
              {award.org}
            </motion.p>

            {/* Brand accent line — scaleX wipe */}
            <motion.div
              className="mt-4 h-[2px] w-10 rounded-full"
              style={{ background: "var(--brand)", originX: 0 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: base + 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function AwardsShowcase() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--brand) 30%, transparent)",
                color: "var(--brand)",
                background:
                  "color-mix(in srgb, var(--brand) 8%, transparent)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              Honours
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              Awards &amp;{" "}
              <GradientText>Achievements</GradientText>
            </h2>
            <p
              className="mt-2 max-w-xl text-base"
              style={{ color: "var(--muted-fg)" }}
            >
              Recognition earned by building things that solve real problems.
            </p>
          </div>

        </motion.div>

        {/* Mobile / tablet — simple responsive stack */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:hidden">
          {AWARDS.map((award, i) => (
            <div key={award.num} className={award.center ? "sm:col-span-2" : ""}>
              <AwardCard award={award} index={i} mobile />
            </div>
          ))}
        </div>

        {/* Desktop — bento: centre card spans 2 rows in column 2 */}
        <div
          className="mt-10 hidden gap-5 lg:grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
          }}
        >
          {AWARDS.map((award, i) => {
            const gridStyle: React.CSSProperties = award.center
              ? { gridColumn: "2", gridRow: "1 / span 2" }
              : i === 0
              ? { gridColumn: "1", gridRow: "1" }
              : i === 1
              ? { gridColumn: "3", gridRow: "1" }
              : i === 3
              ? { gridColumn: "1", gridRow: "2" }
              : { gridColumn: "3", gridRow: "2" };
            return (
              <div key={award.num} style={gridStyle}>
                <AwardCard award={award} index={i} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
