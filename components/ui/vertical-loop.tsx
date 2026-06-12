"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface VerticalLoopProps {
  words?: string[];
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export function VerticalLoop({
  words = ["DREAM", "BUILD", "CREATE", "SHIP", "REPEAT"],
  duration = 4,
  className,
  style,
}: VerticalLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration * 1000);
    return () => clearInterval(id);
  }, [words.length, duration]);

  return (
    /*
     * Outer span acts as a clipping window: overflow:hidden + fixed height
     * shows exactly one word at a time as words slide vertically through it.
     */
    <span
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1.15em",
        verticalAlign: "bottom",
        ...style,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          style={{ display: "block" }}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
