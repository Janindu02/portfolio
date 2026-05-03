import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PORTRAIT } from "@/lib/site";

const posts = [
  {
    cat: "Technical Deep Dive",
    date: "Oct 24, 2023",
    read: "12 min read",
    title: "Designing Backpressure for Streaming Inference",
    excerpt: "How to keep GPUs fed without melting your queues when tail latency spikes during peak traffic.",
    tags: ["#Deep Learning", "#Infra"],
  },
  {
    cat: "Engineering",
    date: "Sep 12, 2023",
    read: "8 min read",
    title: "Canary Math That Executives Actually Trust",
    excerpt: "A practical template for SLO-aligned releases with explicit error budgets and rollback triggers.",
    tags: ["#SRE", "#Metrics"],
  },
  {
    cat: "Thought Leadership",
    date: "Aug 2, 2023",
    read: "6 min read",
    title: "Why Your ML Team Needs a Librarian",
    excerpt: "Metadata, dataset cards, and lineage hooks that pay off the moment compliance asks a question.",
    tags: ["#MLOps", "#Culture"],
  },
  {
    cat: "Career Growth",
    date: "Jul 15, 2023",
    read: "5 min read",
    title: "Staff Engineer Narratives Without the Buzzwords",
    excerpt: "Framing impact stories around constraints lifted, risks removed, and teams unblocked.",
    tags: ["#Career"],
  },
];

const categories = [
  { label: "Technical Deep Dive", count: 18 },
  { label: "Engineering", count: 24 },
  { label: "Thought Leadership", count: 9 },
  { label: "Career Growth", count: 6 },
];

const topTags = ["PyTorch", "Rust", "CUDA", "LLMs", "Kubernetes", "Ray", "JAX", "WebGPU", "Observability"];

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Technical Blog
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Notes on Machine Learning &amp;{" "}
              <em className="font-serif text-4xl text-[#2563eb] not-italic sm:text-5xl">Systems Engineering</em>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              Long-form writeups on software architecture, deep learning, and high-performance computing—written for
              builders who ship.
            </p>
          </Reveal>

          <Reveal className="mt-10" delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8 text-white shadow-xl sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#2563eb]/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 opacity-30">
                <svg viewBox="0 0 100 100" className="h-full w-full text-white/40">
                  <path fill="none" stroke="currentColor" d="M20 80 L50 20 L80 80 Z M35 80 L50 45 L65 80" />
                </svg>
              </div>
              <span className="inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                Featured Article
              </span>
              <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
                Demystifying Quantization: Shrinking LLMs for Modern GPUs
              </h2>
              <p className="mt-3 max-w-xl text-sm text-neutral-300">
                A field guide to PTQ vs QAT, calibration datasets, and the deployment traps that only show up under
                load.
              </p>
              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                Start Reading
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_320px] lg:gap-12 lg:px-8">
          <div>
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-neutral-900">Recent Insights</h2>
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                Sort by:
                <select className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900">
                  <option>Latest</option>
                </select>
              </label>
            </Reveal>
            <div className="mt-8 space-y-5">
              {posts.map((post, i) => (
                <Reveal key={post.title} delay={0.04 * i}>
                  <article className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-neutral-500">
                      <span className="text-[#2563eb]">{post.cat}</span>
                      <span>{post.date}</span>
                      <span>{post.read}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Image src={PORTRAIT} alt="" width={28} height={28} className="rounded-full object-cover" />
                        Alex Chen
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-neutral-500">{post.tags.join(" ")}</div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                Load More Articles
                <span aria-hidden>→</span>
              </button>
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    placeholder="Search articles, tags, topics..."
                    className="input-focus w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-3 text-sm"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Explore categories</p>
                <ul className="mt-4 space-y-3">
                  {categories.map((c) => (
                    <li key={c.label}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                          {c.label}
                        </span>
                        <span className="text-xs text-neutral-500">{c.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-[#2563eb]">🔔</span>
                  <div>
                    <p className="font-semibold text-neutral-900">Stay Ahead</p>
                    <p className="mt-1 text-sm text-neutral-600">Monthly notes—no fluff, optional unsubscribe.</p>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="input-focus mt-3 w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      className="mt-3 w-full rounded-full bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Top tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topTags.map((t) => (
                    <span key={t} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-100 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Never miss a technical update.</h2>
              <p className="mt-3 text-neutral-600">What you get in each issue:</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• No spam—one focused essay</li>
                <li>• Case studies from production systems</li>
                <li>• Code snippets you can paste into your repo</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="you@domain.com"
                className="input-focus flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm"
              />
              <button
                type="button"
                className="rounded-full bg-[#2563eb] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
