"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { PORTRAIT } from "@/lib/site";
import { GradientText } from "@/components/ui/gradient-text";

const navMain = [
  { label: "Popular Discussions", count: 124, active: true, icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { label: "Recent Activity", count: 52, active: false, icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { label: "Solved Topics", count: 890, active: false, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const domains = [
  { label: "ML Systems", count: 45 },
  { label: "Algorithms", count: 31 },
  { label: "Brainstorming", count: 12 },
  { label: "Career & Growth", count: 18 },
];

const topics = [
  {
    replies: 32,
    views: "4.2k",
    pill: "Brainstorming",
    pillStyle: { background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" },
    cat: "LLM",
    title: "What is the smallest viable eval harness for nightly regressions?",
    snippet: "We are debating golden sets vs synthetic adversaries for LLM routing. Looking for battle-tested patterns.",
    tags: ["LLM", "Inference", "Optimization"],
    author: "Dr. Elena Vance",
    time: "2h ago",
  },
  {
    replies: 18,
    views: "1.1k",
    pill: "Trending",
    pillStyle: { background: "color-mix(in srgb, #7c3aed 10%, transparent)", color: "#7c3aed" },
    cat: "MLOps",
    title: "Canary analysis when traffic is bursty and non-stationary",
    snippet: "Classical sequential testing assumptions break—how do you keep exec trust without slowing releases?",
    tags: ["SRE", "Stats", "Releases"],
    author: "Marcus Reid",
    time: "5h ago",
  },
  {
    replies: 7,
    views: "640",
    pill: "Solved",
    pillStyle: { background: "color-mix(in srgb, #10b981 10%, transparent)", color: "#10b981" },
    cat: "Infra",
    title: "eBPF probes vs sidecars for GPU telemetry—what did you pick?",
    snippet: "Trade-offs for multi-tenant clusters with strict NOFILE and upgrade windows.",
    tags: ["eBPF", "Kubernetes", "GPU"],
    author: "Priya Nandakumar",
    time: "1d ago",
  },
];

const tabs = ["All Topics", "Following", "Unanswered", "Solutions"] as const;

export default function ForumPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Topics");

  return (
    <div style={{ background: "var(--muted)" }}>
      <section className="border-b py-10 sm:py-12" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            <aside className="w-full shrink-0 space-y-6 lg:w-64">
              <FadeIn>
                <Link
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01]"
                  style={{ background: "var(--brand)" }}
                >
                  + New Topic
                </Link>
              </FadeIn>
              <FadeIn delay={0.04}>
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted-fg)" }}>Navigation</p>
                <nav className="mt-3 space-y-1">
                  {navMain.map((n) => (
                    <button
                      key={n.label}
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
                      style={
                        n.active
                          ? { background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }
                          : { color: "var(--surface-fg)" }
                      }
                    >
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={n.icon} />
                        </svg>
                        {n.label}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted-fg)" }}>{n.count}</span>
                    </button>
                  ))}
                </nav>
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted-fg)" }}>Technical domains</p>
                <nav className="mt-3 space-y-1">
                  {domains.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--surface-fg)" }}
                    >
                      {d.label}
                      <span className="text-xs" style={{ color: "var(--muted-fg)" }}>{d.count}</span>
                    </button>
                  ))}
                </nav>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-xl p-4 text-sm" style={{ background: "color-mix(in srgb, var(--brand) 8%, var(--muted))", color: "var(--surface-fg)" }}>
                  <p className="font-semibold" style={{ color: "var(--foreground)" }}>Weekly goal</p>
                  <p className="mt-2 leading-relaxed">
                    Explore three new papers on diffusion models and contribute to one active discussion.
                  </p>
                </div>
              </FadeIn>
            </aside>

            <div className="min-w-0 flex-1">
              <FadeIn>
                <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--foreground)" }}>Brainstorming <GradientText>Forum</GradientText></h1>
                <p className="mt-2" style={{ color: "var(--muted-fg)" }}>Collaborative technical discussions and research ideation.</p>
              </FadeIn>

              <FadeIn className="mt-8 space-y-4" delay={0.05}>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                    style={{ color: "var(--muted-fg)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    placeholder="Search topics or tags..."
                    className="input-focus w-full rounded-xl border py-3 pl-11 pr-4 text-sm"
                    style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-4 border-b pb-1" style={{ borderColor: "var(--border)" }}>
                    {tabs.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        className="relative pb-3 text-sm font-semibold transition-colors"
                        style={{ color: tab === t ? "var(--brand)" : "var(--muted-fg)" }}
                      >
                        {t}
                        {tab === t ? (
                          <motion.span
                            layoutId="forum-tab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                            style={{ background: "var(--brand)" }}
                          />
                        ) : null}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                    style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--surface-fg)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter By
                  </button>
                </div>
              </FadeIn>

              <ul className="mt-6 space-y-4">
                {topics.map((topic, i) => (
                  <FadeIn key={topic.title} delay={0.04 * i}>
                    <li className="card-hover rounded-2xl border p-4 shadow-sm sm:p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <div className="flex gap-6 text-center text-xs sm:flex-col sm:gap-1 sm:text-left" style={{ color: "var(--muted-fg)" }}>
                          <div>
                            <p className="font-bold" style={{ color: "var(--foreground)" }}>{topic.replies}</p>
                            <p>replies</p>
                          </div>
                          <div>
                            <p className="font-bold" style={{ color: "var(--foreground)" }}>{topic.views}</p>
                            <p className="inline-flex items-center gap-1">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              views
                            </p>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-full px-2 py-0.5 font-semibold" style={topic.pillStyle}>{topic.pill}</span>
                            <span style={{ color: "var(--muted-fg)" }}>in {topic.cat}</span>
                          </div>
                          <h2 className="mt-2 text-base font-bold sm:text-lg" style={{ color: "var(--foreground)" }}>{topic.title}</h2>
                          <p className="mt-2 line-clamp-2 text-sm" style={{ color: "var(--muted-fg)" }}>{topic.snippet}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {topic.tags.map((tag) => (
                              <span key={tag} className="rounded-md px-2 py-0.5 text-xs" style={{ background: "var(--surface)", color: "var(--surface-fg)" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                          <Image src={PORTRAIT} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                          <div className="text-right text-sm">
                            <p className="font-semibold" style={{ color: "var(--foreground)" }}>{topic.author}</p>
                            <p className="text-xs" style={{ color: "var(--muted-fg)" }}>{topic.time}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ul>

              <FadeIn className="mt-10 flex justify-center">
                <nav className="flex flex-wrap items-center gap-2 text-sm font-medium" style={{ color: "var(--muted-fg)" }}>
                  <button type="button" className="rounded-lg px-3 py-1.5 transition-colors hover:opacity-80">
                    Previous
                  </button>
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className="h-9 w-9 rounded-full transition-colors"
                      style={
                        p === 1
                          ? { background: "var(--brand)", color: "#fff" }
                          : { color: "var(--surface-fg)" }
                      }
                    >
                      {p}
                    </button>
                  ))}
                  <span className="px-1">…</span>
                  <button type="button" className="h-9 w-9 rounded-full transition-colors hover:opacity-80" style={{ color: "var(--surface-fg)" }}>
                    12
                  </button>
                  <button type="button" className="rounded-lg px-3 py-1.5 transition-colors hover:opacity-80">
                    Next
                  </button>
                </nav>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
