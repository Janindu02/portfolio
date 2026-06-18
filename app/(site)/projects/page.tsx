"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";
import { projects } from "@/lib/projects-data";

const filters = ["All Work", "Full Stack", "Open Source"] as const;
type Filter = (typeof filters)[number];

export default function ProjectsPage() {
  const router = useRouter();
  const [active, setActive] = useState<Filter>("All Work");
  const list =
    active === "All Work" ? projects : projects.filter((p) => p.filter === active);

  return (
    <>
      <section className="border-b py-14 sm:py-16" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              Portfolio
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--foreground)" }}>Technical <GradientText>Projects</GradientText></h1>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--muted-fg)" }}>
              A curated collection of projects built during my degree—from award-winning full-stack
              platforms to open-source learning tools.
            </p>
          </FadeIn>
          <FadeIn className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
                  style={
                    active === f
                      ? { background: "var(--brand)", color: "#fff" }
                      : { border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="text-sm" style={{ color: "var(--muted-fg)" }}>Showing {list.length} projects</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.article
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="card-hover flex flex-col overflow-hidden rounded-2xl border shadow-sm cursor-pointer"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  onClick={() => router.push(`/project/${p.slug}`)}
                >
                    <div className="relative aspect-[16/10]">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="rounded-md px-2 py-0.5 text-xs font-semibold"
                          style={{ background: "var(--surface)", color: "var(--surface-fg)" }}
                        >
                          {p.category}
                        </span>
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="transition-opacity hover:opacity-70"
                            style={{ color: "var(--muted-fg)" }}
                            aria-label="GitHub"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <h2 className="mt-3 text-lg font-bold" style={{ color: "var(--foreground)" }}>{p.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{p.shortDesc}</p>
                      <div className="mt-4 flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                        {p.tags.map((t) => (
                          <span key={t} className="text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="border-t py-14" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Interested in working together?</h2>
            <p className="mx-auto mt-3 max-w-xl" style={{ color: "var(--muted-fg)" }}>
              I&apos;m seeking a 1-year internship starting 2025. Let&apos;s talk about what I can build for your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--brand)" }}
              >
                Get In Touch
              </Link>
              <Link
                href="/about"
                className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                About Me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
