"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedSidebar({
  open,
  onClose,
  children,
  side = "left",
  width = 280,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
  width?: number;
}) {
  const from = side === "left" ? { x: -width } : { x: width };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          {/* Panel */}
          <motion.aside
            className="fixed top-0 z-50 flex h-full flex-col overflow-y-auto py-6 shadow-2xl"
            style={{
              [side]: 0,
              width,
              background: "var(--card)",
              borderRight: side === "left" ? `1px solid var(--border)` : undefined,
              borderLeft: side === "right" ? `1px solid var(--border)` : undefined,
            }}
            initial={{ ...from, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ ...from, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--muted-fg)" }}
              aria-label="Close sidebar"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
