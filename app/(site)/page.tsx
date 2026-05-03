import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PORTRAIT } from "@/lib/site";

const verticals = [
  {
    title: "Projects",
    desc: "Production systems, prototypes, and open tooling.",
    href: "/projects",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
    ),
  },
  {
    title: "Research",
    desc: "Publications, citations, and reproducible science.",
    href: "/research",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />,
  },
  {
    title: "Blog",
    desc: "Notes on ML, systems, and engineering practice.",
    href: "/blog",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    ),
  },
  {
    title: "Courses",
    desc: "Structured learning paths and hands-on modules.",
    href: "/courses",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
    ),
  },
  {
    title: "Forum",
    desc: "Brainstorms, Q&A, and community problem solving.",
    href: "/forum",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8h2a2 2 0 012 2v6.5a2 2 0 01-2 2h-2v3l-4-3H7a2 2 0 01-2-2v-1"
      />
    ),
  },
];

const featured = [
  {
    title: "Neural-Sync Optimizer",
    desc: "Distributed training scheduler that cuts idle GPU time with adaptive batching and topology-aware placement.",
    tags: ["PyTorch", "ML Ops", "CUDA"],
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Quant Trade Engine",
    desc: "Low-latency execution stack with deterministic replay for strategy research and production risk controls.",
    tags: ["C++", "Rust", "Linux"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Visionary AR Portal",
    desc: "WebXR experience layer for spatial UI prototypes with performance budgets and frame pacing tooling.",
    tags: ["Three.js", "React", "WebXR"],
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
];

const coreTags = ["Python", "Rust", "Go", "TypeScript", "Docker", "Kubernetes", "PostgreSQL", "gRPC"];
const mlTags = ["PyTorch", "JAX", "Transformers", "Ray", "Triton", "ONNX", "Weights & Biases", "MLflow"];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563eb]">
              Available for new collaborations
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              Bridging the gap between{" "}
              <span className="text-[#2563eb]">Intelligence</span> and{" "}
              <span className="text-[#2563eb]">Architecture</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
              I design and ship ML systems that stay maintainable under load—from research prototypes to
              production services with observability, guardrails, and clear interfaces for teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#1d4ed8] active:scale-[0.98]"
              >
                Contact Me
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Resume
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-neutral-200 pt-10 sm:max-w-lg">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Experience</dt>
                <dd className="mt-1 text-2xl font-bold text-neutral-900">8+ yrs</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Projects</dt>
                <dd className="mt-1 text-2xl font-bold text-neutral-900">42</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Papers</dt>
                <dd className="mt-1 text-2xl font-bold text-neutral-900">12</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal className="relative" delay={0.08}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                <Image
                  src={PORTRAIT}
                  alt="Portrait"
                  width={640}
                  height={800}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-neutral-100 bg-white/95 p-4 shadow-lg backdrop-blur sm:left-6 sm:right-auto sm:max-w-xs">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">IEEE Senior Member</p>
                    <p className="text-xs text-neutral-600">Lead ML Researcher</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Technical Verticals</h2>
            <p className="mt-3 text-neutral-600">
              Explore the areas where I publish, teach, build, and collaborate with teams.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {verticals.map((v, i) => (
              <Reveal key={v.href} delay={0.04 * i}>
                <Link
                  href={v.href}
                  className="card-hover flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {v.icon}
                    </svg>
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">{v.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{v.desc}</p>
                  <span className="mt-4 text-sm font-semibold text-[#2563eb]">Explore →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Featured Engineering Work</h2>
              <p className="mt-2 max-w-xl text-neutral-600">
                Selected builds that balanced research novelty with operational constraints.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563eb] hover:underline"
            >
              Browse Full Portfolio
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.title} delay={0.06 * i}>
                <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image src={p.img} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-neutral-900">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{p.desc}</p>
                    <span className="mt-4 text-sm font-semibold text-[#2563eb]">Detailed Analysis →</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Expertise across the <span className="text-[#2563eb]">full technical stack</span>.
              </h2>
              <p className="mt-4 text-neutral-600">
                From kernels to dashboards, I stay close to the metrics that matter: latency, cost, reliability,
                and team velocity.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Architecture reviews with explicit trade-off matrices",
                  "ML lifecycle design: data, training, evaluation, deployment",
                  "Incident-ready observability and runbooks",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2563eb]">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="space-y-5">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-neutral-900">Core Engineering</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {coreTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-neutral-900">Machine Learning &amp; AI</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mlTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="rounded-2xl bg-[#2563eb] p-6 text-white shadow-lg">
                  <p className="font-semibold">Looking for specialized AI consulting?</p>
                  <p className="mt-2 text-sm text-blue-100">
                    Strategy sessions for model selection, infra sizing, and safe rollout plans.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#2563eb] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Request a Strategy Session
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:pl-6 lg:pl-8">
            <div className="border-l-4 border-[#2563eb] pl-5">
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Ready to build something impactful?</h2>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Tell me about your constraints, timeline, and success metrics—I respond within two business days.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-[#1d4ed8]"
              >
                Let&apos;s Talk
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                View Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
