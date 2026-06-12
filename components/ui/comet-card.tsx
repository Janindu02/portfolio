"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CometCard({
  children,
  className = "",
  glowColor = "rgba(37,99,235,0.25)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 30 });
  const y = useSpring(rawY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"]);
  const glowX  = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY  = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
      className={`relative ${className}`}
    >
      {children}

      {/* shimmer overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${glowColor}, transparent 60%)`,
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
}
