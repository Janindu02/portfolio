"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";

const filters = ["All", "Machine Learning", "Systems", "Frontend", "Data Science", "AI"] as const;

const courses = [
  {
    title: "Deep Learning with PyTorch",
    level: "Intermediate",
    desc: "End-to-end modeling, training loops, and deployment patterns for modern neural networks.",
    hours: "12 Hours",
    students: "1,240 Students",
    progress: 45,
    cta: "continue" as const,
    filter: "Machine Learning",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Scalable Systems Architecture",
    level: "Advanced",
    desc: "Load shedding, idempotency, and multi-region design for mission-critical services.",
    hours: "18 Hours",
    students: "980 Students",
    progress: 15,
    cta: "continue" as const,
    filter: "Systems",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "React Performance Tuning",
    level: "Advanced",
    desc: "Profiler-driven optimizations, concurrent features, and bundle discipline for large apps.",
    hours: "9 Hours",
    students: "2,100 Students",
    progress: 0,
    cta: "enroll" as const,
    filter: "Frontend",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Applied NLP for Chatbots",
    level: "Intermediate",
    desc: "Retrieval, guardrails, evaluation harnesses, and safe prompt patterns for assistants.",
    hours: "14 Hours",
    students: "1,560 Students",
    progress: 0,
    cta: "enroll" as const,
    filter: "Machine Learning",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Rust for High-Performance Systems",
    level: "Beginner",
    desc: "Ownership, fearless concurrency, and FFI boundaries for performance-critical components.",
    hours: "10 Hours",
    students: "3,400 Students",
    progress: 100,
    cta: "review" as const,
    filter: "Systems",
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Data Visualisation Principles",
    level: "Beginner",
    desc: "Perception, accessibility, and storytelling with charts that survive executive review.",
    hours: "6 Hours",
    students: "890 Students",
    progress: 0,
    cta: "enroll" as const,
    filter: "Data Science",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CoursesPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list =
    active === "All"
      ? courses
      : active === "AI"
        ? courses.filter((c) => c.filter === "Machine Learning")
        : courses.filter((c) => c.filter === active);

  return (
    <>
      <section className="border-b py-14 sm:py-16" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              Learning Management System
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--foreground)" }}>
              Deepen Your{" "}
              <GradientText>Engineering</GradientText>{" "}
              Expertise
            </h1>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--muted-fg)" }}>
              Structured tutorials, expert-led courses, and comprehensive materials focused on software architecture
              and machine learning.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold"
                    style={{ borderColor: "var(--card)", background: "var(--surface)", color: "var(--surface-fg)" }}
                  >
                    {String.fromCharCode(64 + i)}
                  </span>
                ))}
              </div>
              <p>
                Joined by <span className="font-semibold" style={{ color: "var(--foreground)" }}>2,400+</span> ambitious engineers
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Course Catalog</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--muted-fg)" }}>Showing 6 premium learning modules</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={
                    active === f
                      ? { background: "var(--brand)", color: "#fff" }
                      : { border: "1px solid var(--border)", background: "var(--card)", color: "var(--surface-fg)" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => (
              <FadeIn key={c.title} delay={0.05 * i}>
                <article
                  className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={c.img} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                    <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-neutral-800 shadow">
                      {c.level}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm" style={{ color: "var(--muted-fg)" }}>{c.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs" style={{ color: "var(--muted-fg)" }}>
                      <span>{c.hours}</span>
                      <span>{c.students}</span>
                    </div>
                    {c.progress > 0 && c.progress < 100 ? (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
                          <span>Progress</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "var(--brand)" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${c.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ) : null}
                    {c.progress === 100 ? (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs font-medium" style={{ color: "var(--muted-fg)" }}>
                          <span>Completed</span>
                          <span>100%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
                          <motion.div
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className="mt-5">
                      {c.cta === "continue" ? (
                        <Link
                          href="#"
                          className="inline-flex w-full items-center justify-center rounded-full py-2.5 text-sm font-semibold text-white"
                          style={{ background: "var(--brand)" }}
                        >
                          Continue Learning
                        </Link>
                      ) : null}
                      {c.cta === "enroll" ? (
                        <Link
                          href="#"
                          className="inline-flex w-full items-center justify-center gap-1 rounded-full border py-2.5 text-sm font-semibold"
                          style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
                        >
                          Enroll Now
                          <span aria-hidden>→</span>
                        </Link>
                      ) : null}
                      {c.cta === "review" ? (
                        <Link
                          href="#"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white"
                          style={{ background: "var(--brand)" }}
                        >
                          <span aria-hidden>🏆</span>
                          Review Course
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-14" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--brand) 4%, var(--muted))" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-stretch gap-4 rounded-2xl border p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Get New Course Alerts</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>Monthly technical tutorials—no spam, unsubscribe anytime.</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row">
              <input
                type="email"
                placeholder="engineer@domain.com"
                className="input-focus flex-1 rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
              />
              <button
                type="button"
                className="rounded-full px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--brand)" }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
