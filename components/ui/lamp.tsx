"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function LampContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden py-20 ${className}`}
      style={{ background: "var(--background)" }}
    >
      {/* Beams */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-center">
        {/* Left beam */}
        <motion.div
          className="absolute origin-top-right"
          style={{
            right: "50%",
            top: 0,
            height: "16rem",
            background: "conic-gradient(from 70deg at 100% 0%, transparent 0deg, var(--brand) 60deg, transparent 90deg)",
            opacity: 0.55,
          }}
          initial={{ width: "4rem", opacity: 0 }}
          whileInView={{ width: "28rem", opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        />
        {/* Right beam */}
        <motion.div
          className="absolute origin-top-left"
          style={{
            left: "50%",
            top: 0,
            height: "16rem",
            background: "conic-gradient(from 290deg at 0% 0%, transparent 0deg, var(--brand) 60deg, transparent 90deg)",
            opacity: 0.55,
          }}
          initial={{ width: "4rem", opacity: 0 }}
          whileInView={{ width: "28rem", opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        />
        {/* Top line */}
        <motion.div
          className="absolute top-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, var(--brand), transparent)",
            filter: "blur(1px)",
          }}
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{ width: "60%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
        {/* Bottom glow blob */}
        <div
          className="spotlight-blur absolute"
          style={{
            top: "8rem",
            width: "20rem",
            height: "6rem",
            background: "var(--brand)",
            borderRadius: "50%",
            opacity: 0.15,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
