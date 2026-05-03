"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const filters = ["All Work", "Machine Learning", "Web Systems", "Core Systems"] as const;
type Filter = (typeof filters)[number];

const projects: {
  title: string;
  cat: string;
  filter: Exclude<Filter, "All Work">;
  desc: string;
  tags: string[];
  img: string;
}[] = [
  {
    title: "Neural-Shift Optimizer",
    cat: "ML",
    filter: "Machine Learning",
    desc: "Adaptive optimizer suite for large transformer training with memory-aware fusion passes.",
    tags: ["PyTorch", "CUDA", "Python", "Docker"],
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Quant Trade Engine",
    cat: "Systems",
    filter: "Core Systems",
    desc: "Deterministic matching engine with journal replay and cross-region failover drills.",
    tags: ["C++", "Rust", "Linux", "ZeroMQ"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Visionary AR Portal",
    cat: "Web",
    filter: "Web Systems",
    desc: "Immersive commerce prototypes with performance telemetry and asset budgeting tooling.",
    tags: ["Three.js", "React", "TypeScript", "WebXR"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "SecurFlow AI",
    cat: "ML",
    filter: "Machine Learning",
    desc: "Graph-based anomaly detection over streaming logs with human-in-the-loop review queues.",
    tags: ["PyTorch Geometric", "Kafka", "Elasticsearch", "Go"],
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "CloudMesh Dashboard",
    cat: "Systems",
    filter: "Core Systems",
    desc: "Control plane UI for multi-cluster health, canaries, and SLO burn alerts.",
    tags: ["Kubernetes", "Go", "eBPF", "Prometheus"],
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "EcoScale IoT",
    cat: "Systems",
    filter: "Core Systems",
    desc: "Edge firmware and cloud ingestion for precision agriculture pilots across three regions.",
    tags: ["C", "FreeRTOS", "AWS IoT", "LoRaWAN"],
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<Filter>("All Work");
  const list =
    active === "All Work" ? projects : projects.filter((p) => p.filter === active);

  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563eb]">
              Portfolio
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Technical Projects</h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              A curated archive of engineering work—from high-frequency trading engines to large-scale machine
              learning frameworks.
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active === f
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="text-sm text-neutral-500">Showing {list.length} projects</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.article
                  layout
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="card-hover flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={p.img} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-600">
                        {p.cat}
                      </span>
                      <div className="flex gap-2 text-neutral-400">
                        <span className="sr-only">Links</span>
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-neutral-900">{p.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs font-medium text-neutral-500">
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

      <section className="border-t border-neutral-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-neutral-900">Looking for a custom solution?</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-600">
              Available for technical consulting and complex systems architecture engagements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                Get In Touch
              </Link>
              <Link
                href="/about"
                className="inline-flex rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                About My Process
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
