"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  github?: string;
  linkedin?: string;
}

const DEFAULTS: Testimonial[] = [
  {
    name: "Teammate A",
    role: "Full-stack Developer — CeylonMine",
    avatar: "/pics/janindua.jpg",
    quote:
      "Janindu brought exceptional drive to our team. His ability to integrate the ChatGPT API and keep the Flask backend clean under tight deadlines was impressive.",
    github: "https://github.com/Janindu02",
    linkedin: "https://linkedin.com/in/janinduamaraweera/",
  },
  {
    name: "Teammate B",
    role: "Developer — CeylonMine",
    avatar: "/pics/janindua.jpg",
    quote:
      "Working with Janindu on the permit workflow was a great experience. He writes well-structured code and always keeps the team aligned on the architecture.",
    github: "https://github.com/Janindu02",
    linkedin: "https://linkedin.com/in/janinduamaraweera/",
  },
];

export function TestimonialCarousel({
  items = DEFAULTS,
}: {
  items?: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex((i) => (i + d + items.length) % items.length);
  };

  const t = items[index];

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border p-8 shadow-lg"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* Quote mark */}
          <svg className="h-8 w-8 opacity-20" style={{ color: "var(--brand)" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--card-fg)" }}>
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={t.avatar}
                alt={t.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 2px var(--border)" }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--card-fg)" }}>{t.name}</p>
                <p className="text-xs" style={{ color: "var(--muted-fg)" }}>{t.role}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {t.github && (
                <a href={t.github} target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "var(--surface)", color: "var(--muted-fg)" }}
                  aria-label="GitHub">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {t.linkedin && (
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "var(--surface)", color: "var(--muted-fg)" }}
                  aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:opacity-70"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
          aria-label="Previous">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button key={i} type="button" onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === index ? "1.5rem" : "0.5rem",
                background: i === index ? "var(--brand)" : "var(--border)",
              }}
            />
          ))}
        </div>

        <button type="button" onClick={() => go(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:opacity-70"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
          aria-label="Next">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
