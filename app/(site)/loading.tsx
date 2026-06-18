"use client";

import { motion } from "framer-motion";

const NAME = "Janindu".split("");

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 32, rotateX: -90, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const bar = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const sub = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.85 },
  },
};

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--background)" }}
    >
      {/* Name */}
      <motion.div
        className="flex items-end gap-[0.04em] overflow-hidden"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ perspective: 600 }}
      >
        {NAME.map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            className="inline-block select-none font-black tracking-tight"
            style={{
              fontSize: "clamp(3rem, 12vw, 6.5rem)",
              lineHeight: 1,
              background:
                i < 2
                  ? "var(--brand)"
                  : "linear-gradient(135deg, var(--brand) 0%, color-mix(in srgb, var(--brand) 55%, var(--foreground)) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Accent bar */}
      <motion.div
        variants={bar}
        initial="hidden"
        animate="show"
        className="h-[3px] w-24 rounded-full"
        style={{ background: "var(--brand)", originX: 0 }}
      />

      {/* Subtitle */}
      <motion.p
        variants={sub}
        initial="hidden"
        animate="show"
        className="text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: "var(--muted-fg)" }}
      >
        Software Engineer
      </motion.p>
    </div>
  );
}
