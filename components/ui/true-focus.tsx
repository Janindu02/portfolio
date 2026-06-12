"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TrueFocus({
  words,
  interval = 2200,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* invisible spacer keeps width stable */}
      <span className="invisible whitespace-nowrap">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="absolute inset-0 flex items-center justify-start whitespace-nowrap"
          initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)", y: -6 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
