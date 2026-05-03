"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

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
      <section className="border-b border-neutral-100 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563eb]">
              Learning Management System
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Deepen Your <span className="text-[#2563eb]">Engineering</span> Expertise
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              Structured tutorials, expert-led courses, and comprehensive materials focused on software architecture
              and machine learning.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-neutral-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-[10px] font-bold text-neutral-600"
                  >
                    {String.fromCharCode(64 + i)}
                  </span>
                ))}
              </div>
              <p>
                Joined by <span className="font-semibold text-neutral-900">2,400+</span> ambitious engineers
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Course Catalog</h2>
              <p className="mt-1 text-sm text-neutral-600">Showing 6 premium learning modules</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active === f ? "bg-[#2563eb] text-white" : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => (
              <Reveal key={c.title} delay={0.05 * i}>
                <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image src={c.img} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                    <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-neutral-800 shadow">
                      {c.level}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-neutral-900">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-neutral-600">{c.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
                      <span>{c.hours}</span>
                      <span>{c.students}</span>
                    </div>
                    {c.progress > 0 && c.progress < 100 ? (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs font-medium text-neutral-600">
                          <span>Progress</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                          <motion.div
                            className="h-full rounded-full bg-[#2563eb]"
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
                        <div className="mb-1 flex justify-between text-xs font-medium text-neutral-600">
                          <span>Completed</span>
                          <span>100%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
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
                          className="inline-flex w-full items-center justify-center rounded-full bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                        >
                          Continue Learning
                        </Link>
                      ) : null}
                      {c.cta === "enroll" ? (
                        <Link
                          href="#"
                          className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-[#2563eb] py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50"
                        >
                          Enroll Now
                          <span aria-hidden>→</span>
                        </Link>
                      ) : null}
                      {c.cta === "review" ? (
                        <Link
                          href="#"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                        >
                          <span aria-hidden>🏆</span>
                          Review Course
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-blue-50/50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-stretch gap-4 rounded-2xl border border-blue-100 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Get New Course Alerts</h2>
              <p className="mt-2 text-sm text-neutral-600">Monthly technical tutorials—no spam, unsubscribe anytime.</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row">
              <input
                type="email"
                placeholder="engineer@domain.com"
                className="input-focus flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm"
              />
              <button
                type="button"
                className="rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                Subscribe Now
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
