"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "janindu".split("");

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3"
          style={{ background: "var(--background)" }}
        >
          {/* Main row: dev.janindu */}
          <div className="flex items-baseline" style={{ gap: 0 }}>

            {/* "dev." — monospace prefix, fades in first */}
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 5vw, 3.2rem)",
                color: "var(--brand)",
                letterSpacing: "-0.01em",
                opacity: 0.75,
              }}
            >
              dev.
            </motion.span>

            {/* "janindu" — each letter flips in staggered */}
            <div className="flex items-baseline" style={{ perspective: 700, gap: "0.04em" }}>
              {NAME.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 36, rotateX: -80, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.22 + i * 0.07,
                    ease: "easeOut",
                  }}
                  className="inline-block select-none"
                  style={{
                    fontFamily: "var(--font-raleway), sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 12vw, 6.5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                    background:
                      "linear-gradient(135deg, var(--brand) 0%, color-mix(in srgb, var(--brand) 50%, var(--foreground)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Underline wipe */}
          <motion.div
            className="h-[2px] rounded-full"
            style={{ background: "var(--brand)", originX: 0, width: "100%", maxWidth: 320 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              color: "var(--muted-fg)",
              textTransform: "uppercase",
            }}
          >
            software engineer
          </motion.p>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px]"
            style={{ background: "var(--brand)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
