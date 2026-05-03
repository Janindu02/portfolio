"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const areas = [
  "All Areas",
  "Computer Vision",
  "Generative AI",
  "Deep Learning",
  "NLP",
  "Scaling Laws",
  "Infrastructure",
  "Robotics",
  "Safety",
  "Graph ML",
  "Bioinformatics",
  "Science",
] as const;

const papers = [
  {
    type: "Conference",
    year: "2023",
    cites: "1240 Citations",
    title: "Latent Diffusion Models for High-Resolution Image Synthesis",
    authors: "Rombach, R., ..., Jane Doe",
    venue: "CVPR",
  },
  {
    type: "Journal",
    year: "2022",
    cites: "890 Citations",
    title: "Attention is All You Need: Scaling Transformers to Billion-Parameter Regimes",
    authors: "Vaswani, A., ..., Jane Doe",
    venue: "Journal of Machine Learning Research",
  },
  {
    type: "Journal",
    year: "2021",
    cites: "412 Citations",
    title: "Robust Out-of-Distribution Detection in Autonomous Driving Systems",
    authors: "Jane Doe, et al.",
    venue: "IEEE Transactions on Pattern Analysis",
  },
  {
    type: "Journal",
    year: "2020",
    cites: "301 Citations",
    title: "Graph Neural Networks for Drug Discovery and Molecular Property Prediction",
    authors: "Jane Doe, et al.",
    venue: "Nature Machine Intelligence",
  },
];

export default function ResearchPage() {
  const [area, setArea] = useState<(typeof areas)[number]>("All Areas");

  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563eb]">
              Scholar Profile
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Research &amp; Publications
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              Exploring machine learning, generative AI, and distributed systems through rigorous inquiry and
              open-source contributions.
            </p>
          </Reveal>

          <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
            {[
              { k: "6,120+", l: "Google Scholar Citations", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
              { k: "24", l: "Peer-Reviewed Papers", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { k: "18", l: "h-index (i10: 22)", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { k: "3", l: "Best Paper Awards", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex items-center gap-4 border-b border-neutral-200 pb-6 lg:border-b-0 lg:border-r lg:border-neutral-200 lg:pb-0 lg:pr-6 last:border-0 last:pr-0"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </span>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{s.k}</p>
                  <p className="text-xs text-neutral-600">{s.l}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10 space-y-4" delay={0.1}>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search by title, author, or keywords"
                className="input-focus w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setArea(a)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    area === a ? "bg-[#2563eb] text-white" : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
              <svg className="h-5 w-5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Archive ({papers.length})
            </h2>
            <p className="text-sm text-neutral-600">
              Sorted by: <span className="font-semibold text-neutral-900">Newest First</span>
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {papers.map((paper, i) => (
              <Reveal key={paper.title} delay={0.04 * i}>
                <article className="card-hover overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-100 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-700">
                        {paper.type}
                      </span>
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-700">
                        {paper.year}
                      </span>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563eb]">
                      {paper.cites}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-neutral-900">{paper.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      {paper.authors.split("Jane Doe").map((part, idx, arr) => (
                        <span key={idx}>
                          {part}
                          {idx < arr.length - 1 ? (
                            <span className="font-semibold underline decoration-[#2563eb] decoration-2">
                              Jane Doe
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </p>
                    <p className="mt-1 text-sm italic text-neutral-500">{paper.venue}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 border-t border-neutral-100 bg-neutral-50/80 px-5 py-4 text-xs font-semibold sm:px-6">
                    <button type="button" className="text-neutral-600 hover:text-[#2563eb]">
                      View Abstract
                    </button>
                    <button type="button" className="text-neutral-600 hover:text-[#2563eb]">
                      Full Details
                    </button>
                    <button type="button" className="text-neutral-600 hover:text-[#2563eb]">
                      Code
                    </button>
                    <button
                      type="button"
                      className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#2563eb] px-3 py-1.5 text-white hover:bg-[#1d4ed8]"
                    >
                      PDF
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button type="button" className="text-neutral-600 hover:text-[#2563eb]">
                      BibTeX
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
