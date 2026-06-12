"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";

/* ─────────────────────────────────────────────────────────────────────────────
   Three rows of images, each drifting at a different speed + direction as the
   user scrolls through the section — the "infinite filmstrip" effect used on
   Apple / Linear / Framer premium pages.

   Row A → slides left  (fast)
   Row B → slides right (medium)
   Row C → slides left  (slow)

   Edge vignettes (mask-image gradient) dissolve the rows at the left + right
   viewport edges so it feels like the images continue beyond the screen.
───────────────────────────────────────────────────────────────────────────── */

const ROW_A = [
  "/pics/myjourney/photograthy/janindu1.jpg",
  "/pics/myjourney/photograthy/janindu2.jpg",
  "/pics/myjourney/photograthy/janindu3.jpg",
  "/pics/myjourney/photograthy/janindu4.jpg",
  "/pics/myjourney/photograthy/janindu5.jpg",
  "/pics/myjourney/photograthy/janindu6.jpg",
  "/pics/myjourney/photograthy/janindu9.jpg",
  "/pics/myjourney/photograthy/janindu10.jpg",
];

const ROW_B = [
  "/pics/myjourney/photograthy/janindu11.jpg",
  "/pics/myjourney/photograthy/janindu12.jpg",
  "/pics/myjourney/photograthy/janindu13.jpg",
  "/pics/myjourney/photograthy/janindu14.jpg",
  "/pics/myjourney/photograthy/janindu15.jpg",
  "/pics/myjourney/photograthy/janindu19.jpg",
  "/pics/myjourney/photograthy/janindu20.jpg",
  "/pics/myjourney/photograthy/janindu21.jpg",
];

const ROW_C = [
  "/pics/myjourney/photograthy/janindu22.jpg",
  "/pics/myjourney/photograthy/janindu23.jpg",
  "/pics/myjourney/photograthy/janindu26.jpg",
  "/pics/myjourney/photograthy/janindu27.jpg",
  "/pics/myjourney/photograthy/janindu29.jpg",
  "/pics/myjourney/photograthy/janindu30.jpg",
  "/pics/myjourney/photograthy/janindu31.jpg",
  "/pics/myjourney/photograthy/janindu32.jpg",
];

/* Duplicate each row so rows never run out of images at wide viewports */
function tile<T>(arr: T[]): T[] {
  return [...arr, ...arr, ...arr];
}

interface RowProps {
  images: string[];
  x: MotionValue<string>;
  aspect: string;
}

function ImageRow({ images, x, aspect }: RowProps) {
  return (
    <div className="overflow-visible py-2">
      <motion.div
        className="flex gap-3 sm:gap-4"
        style={{ x, willChange: "transform" }}
      >
        {tile(images).map((src, i) => (
          <motion.div
            key={i}
            className={`relative shrink-0 overflow-hidden rounded-2xl ${aspect}`}
            whileHover={{ scale: 1.04, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="(max-width:768px) 200px, 280px"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * x values are percentages of the element's own width.
   * Row A: starts +4% → ends −22%  (moves left, fast)
   * Row B: starts −12% → ends +12%  (moves right, medium, symmetric)
   * Row C: starts +2% → ends −14%  (moves left, slow)
   */
  const xA = useTransform(scrollYProgress, [0, 1], ["4%", "-22%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const xC = useTransform(scrollYProgress, [0, 1], ["2%", "-14%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "var(--background)" }}
    >
      {/* ── Large watermark text ─────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(5rem,16vw,14rem)] font-black uppercase tracking-tighter leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px color-mix(in srgb, var(--foreground) 6%, transparent)",
          }}
        >
          MOMENTS
        </span>
      </div>

      {/* ── Section header ───────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto mb-14 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            My World
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            Beyond the{" "}
            <GradientText>Code</GradientText>
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: "var(--muted-fg)" }}
          >
            A visual diary — photography, travel, and the moments that shape
            the person behind the keyboard.
          </p>
        </motion.div>
      </div>

      {/* ── Image rows — full bleed, edge-vignette masked ────────────── */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* Row A — portrait, slides LEFT fast */}
        <ImageRow
          images={ROW_A}
          x={xA}
          aspect="h-[240px] w-[180px] sm:h-[300px] sm:w-[220px]"
        />

        {/* Row B — landscape, slides RIGHT */}
        <ImageRow
          images={ROW_B}
          x={xB}
          aspect="h-[200px] w-[270px] sm:h-[240px] sm:w-[340px]"
        />

        {/* Row C — portrait tall, slides LEFT slow */}
        <ImageRow
          images={ROW_C}
          x={xC}
          aspect="h-[240px] w-[180px] sm:h-[300px] sm:w-[220px]"
        />
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mt-14 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <a
          href="/about"
          className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97]"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--foreground)",
          }}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          More About Me
        </a>
      </motion.div>
    </section>
  );
}
