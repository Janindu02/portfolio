"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* CSS-based 3D globe — no Three.js dependency.
   Sphere: radial gradient + grid overlay + location pins.
   Rotates on its Y axis; draggable for manual spin. */

const PINS = [
  { label: "Sri Lanka", top: "62%", left: "57%", color: "#2563eb" },
  { label: "London",   top: "28%", left: "47%", color: "#7c3aed" },
];

export function Globe3D({ size = 300 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const drag = useMotionValue(0);
  const rotation = useSpring(drag, { stiffness: 60, damping: 20 });

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: size, height: size, perspective: `${size * 3}px` }}
      aria-label="3D globe showing Sri Lanka and London"
    >
      <motion.div
        ref={containerRef}
        className="relative h-full w-full"
        style={{
          borderRadius: "50%",
          transformStyle: "preserve-3d",
          rotateY: rotation,
          animation: "globe-spin 28s linear infinite",
          background: `
            radial-gradient(circle at 32% 32%,
              #1e3a5f 0%,
              #0f2848 40%,
              #07071a 100%
            )`,
          boxShadow: `
            inset -${size * 0.07}px -${size * 0.07}px ${size * 0.2}px rgba(0,0,0,0.6),
            inset ${size * 0.03}px ${size * 0.03}px ${size * 0.1}px rgba(96,165,250,0.15),
            0 0 ${size * 0.3}px rgba(37,99,235,0.25),
            0 0 ${size * 0.06}px rgba(37,99,235,0.5)
          `,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={(_, info) => drag.set(drag.get() + info.delta.x * 0.4)}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "50%",
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(96,165,250,0.08) 0px, rgba(96,165,250,0.08) 1px, transparent 1px, transparent ${size / 8}px),
              repeating-linear-gradient(90deg, rgba(96,165,250,0.08) 0px, rgba(96,165,250,0.08) 1px, transparent 1px, transparent ${size / 8}px)
            `,
            maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 100%)",
          }}
        />

        {/* Atmosphere rim */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "50%",
            background: "radial-gradient(circle at 70% 70%, transparent 55%, rgba(37,99,235,0.18) 100%)",
          }}
        />

        {/* Location pins */}
        {PINS.map((p) => (
          <div
            key={p.label}
            className="globe-pin absolute flex h-3 w-3 items-center justify-center rounded-full"
            style={{
              top: p.top,
              left: p.left,
              transform: "translate(-50%, -50%)",
              background: p.color,
              boxShadow: `0 0 0 3px rgba(255,255,255,0.2)`,
              zIndex: 10,
            }}
            title={p.label}
          />
        ))}
      </motion.div>
    </div>
  );
}
