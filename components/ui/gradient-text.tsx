"use client";

import { type ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

const BRAND_COLORS = ["#7c3aed", "#818cf8", "#60a5fa", "#06b6d4"];

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
  // Backward-compat props from the old static API
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className = "",
  colors,
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
  from,
  via,
  to,
  animate: _animate = true,
}: GradientTextProps) {
  const resolvedColors =
    colors ??
    (from || via || to
      ? [from ?? "#7c3aed", via ?? "#60a5fa", to ?? "#06b6d4"]
      : BRAND_COLORS);

  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const ms = animationSpeed * 1000;

  useAnimationFrame((_, delta) => {
    if (isPaused || !_animate) return;
    elapsed.current += delta;
    const full = yoyo ? ms * 2 : ms;
    const cycle = elapsed.current % full;
    progress.set(
      yoyo && cycle >= ms
        ? 100 - ((cycle - ms) / ms) * 100
        : (cycle / ms) * 100,
    );
  });

  useEffect(() => {
    elapsed.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo, progress]);

  const gradientAngle =
    direction === "vertical"
      ? "to bottom"
      : direction === "diagonal"
        ? "135deg"
        : "to right";

  const gradientColors = [...resolvedColors, resolvedColors[0]].join(", ");

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: direction === "vertical" ? "100% 300%" : "300% 100%",
    backgroundRepeat: "repeat" as const,
  };

  const backgroundPosition = useTransform(progress, (p: number) =>
    direction === "vertical" ? `50% ${p}%` : `${p}% 50%`,
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return (
    <motion.span
      className={`relative inline-flex ${showBorder ? "rounded-[1.25rem] px-2 py-0.5" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[1.25rem]"
          style={{ ...gradientStyle, backgroundPosition }}
        >
          <span
            className="absolute inset-px rounded-[1.2rem]"
            style={{ background: "var(--background)" }}
          />
        </motion.span>
      )}
      <motion.span
        className="relative z-10"
        style={{
          ...gradientStyle,
          backgroundPosition,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export default GradientText;
