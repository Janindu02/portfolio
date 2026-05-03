import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PORTRAIT } from "@/lib/site";

const contents = [
  { href: "#story", label: "The Story So Far" },
  { href: "#education", label: "Academic Foundation" },
  { href: "#training", label: "Specialized Training" },
  { href: "#honors", label: "Honors & Achievements" },
];

export default function AboutPage() {
  return (
    <div className="bg-neutral-50">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
          <Reveal>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563eb]">
              Biography &amp; Journey
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Architecting the future of <em className="text-[#2563eb] not-italic">Intelligence</em>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-neutral-600">
              I care about algorithmic elegance that survives contact with reality—latency budgets, flaky
              hardware, and humans who need clarity more than cleverness.
            </p>
          </Reveal>
          <Reveal className="flex justify-center lg:justify-end" delay={0.06}>
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              <Image src={PORTRAIT} alt="" fill className="rounded-full object-cover shadow-xl ring-4 ring-white" />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:flex lg:gap-10 lg:px-8 lg:py-16">
        <article className="min-w-0 flex-1 space-y-14">
          <Reveal id="story">
            <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
              <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              The Story So Far
            </h2>
            <div className="mt-6 space-y-4 text-neutral-600">
              <p>
                My path started in numerical methods and systems programming, then curved toward machine learning
                as models became infrastructure. I have led teams through the awkward middle: when a demo works,
                but the pipeline, evaluation harness, and on-call story do not.
              </p>
              <p>
                Today I split time between research ideation and shipping—writing, prototyping, and pairing with
                engineers to make robust defaults (tests, canaries, dashboards) the path of least resistance.
              </p>
            </div>
            <blockquote className="mt-8 border-l-4 border-blue-200 bg-blue-50/50 py-4 pl-5 text-sm italic leading-relaxed text-neutral-700">
              “The best ML systems feel boring in production: predictable rollbacks, understandable failure modes,
              and metrics that executives and engineers can agree on.”
            </blockquote>
          </Reveal>

          <Reveal id="education">
            <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
              <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Academic Foundation
            </h2>
            <div className="mt-6 space-y-5">
              {[
                {
                  school: "Stanford University",
                  degree: "M.S. Computer Science (AI track)",
                  range: "2014 — 2016",
                  place: "Stanford, CA",
                  points: ["Convex optimization for large models", "Distributed systems research lab"],
                },
                {
                  school: "MIT",
                  degree: "B.S. Electrical Engineering & Computer Science",
                  range: "2010 — 2014",
                  place: "Cambridge, MA",
                  points: ["Focus on algorithms & probability", "Undergraduate thesis on streaming analytics"],
                },
              ].map((e) => (
                <div
                  key={e.school}
                  className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{e.place}</p>
                  <p className="mt-1 text-lg font-bold text-neutral-900">{e.degree}</p>
                  <p className="text-sm font-semibold text-[#2563eb]">{e.school}</p>
                  <p className="mt-1 text-xs text-neutral-500">{e.range}</p>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal id="training">
            <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
              <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              </svg>
              Specialized Training
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Deep Learning Institute",
                  body: "Large-scale model training, mixed precision, and GPU cluster operations at production fidelity.",
                  foot: "Professional Certification",
                },
                {
                  title: "Vector Institute for AI",
                  body: "Research sprint on representation learning with emphasis on evaluation design and ablations.",
                  foot: "Professional Certification",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-neutral-200 bg-neutral-100/80 p-6">
                  <h3 className="font-semibold text-neutral-900">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{c.body}</p>
                  <p className="mt-4 text-xs font-semibold text-[#2563eb]">{c.foot}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal id="honors">
            <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
              <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Honors &amp; Achievements
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                { tag: "Innovation", year: "2021", title: "Global AI Excellence Award", org: "World AI Forum" },
                { tag: "Competition", year: "2020", title: "NeurIPS Competition Winner", org: "NeurIPS" },
              ].map((a) => (
                <div key={a.title} className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                      {a.tag}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">{a.year}</span>
                  </div>
                  <h3 className="mt-3 font-bold text-neutral-900">{a.title}</h3>
                  <p className="text-sm font-semibold text-[#2563eb]">{a.org}</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Recognized for reproducible benchmarks and open evaluation tooling shared with the community.
                  </p>
                  <button type="button" className="mt-4 text-xs font-semibold text-neutral-500 hover:text-[#2563eb]">
                    View Impact &amp; Context ▾
                  </button>
                </div>
              ))}
              <div className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:col-span-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                    Community
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">2019</span>
                </div>
                <h3 className="mt-3 font-bold text-neutral-900">Open Source Maintainer Grant</h3>
                <p className="text-sm font-semibold text-[#2563eb]">LF AI &amp; Data</p>
                <p className="mt-2 text-sm text-neutral-600">
                  Sustained maintenance of inference utilities and documentation used by 4k+ weekly developers.
                </p>
                <button type="button" className="mt-4 text-xs font-semibold text-neutral-500 hover:text-[#2563eb]">
                  View Impact &amp; Context ▾
                </button>
              </div>
            </div>
          </Reveal>
        </article>

        <aside className="mt-12 space-y-6 lg:mt-0 lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <Image src={PORTRAIT} alt="" width={96} height={96} className="h-24 w-24 rounded-full object-cover" />
                  <h3 className="mt-4 text-lg font-bold text-neutral-900">Alex Chen</h3>
                  <p className="text-sm text-neutral-600">Senior ML Engineer &amp; Researcher</p>
                  <ul className="mt-4 w-full space-y-2 text-left text-sm text-neutral-600">
                    <li className="flex gap-2">
                      <span className="text-[#2563eb]">📍</span> San Francisco Bay Area
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#2563eb]">🎓</span> Stanford, MIT
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#2563eb]">🏅</span> Kaggle Master
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Contents</p>
                <nav className="mt-3 space-y-1">
                  {contents.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                      {c.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="rounded-2xl bg-[#2563eb] p-6 text-center text-white shadow-lg">
                <p className="font-semibold">Collaboration?</p>
                <p className="mt-2 text-sm text-blue-100">Advisory, hands-on build, or team workshops.</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white py-2.5 text-sm font-semibold text-[#2563eb] transition-transform hover:scale-[1.02]"
                >
                  Contact Me
                </Link>
              </div>
            </div>
        </aside>
      </div>

      <section className="border-t border-neutral-200 bg-blue-50/60 py-14">
        <div className="mx-auto max-w-6xl rounded-2xl border border-blue-100 bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-12">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Ready for the next challenge?</h2>
              <p className="mt-2 max-w-xl text-neutral-600">
                Download the full biography packet or jump straight to roles, impact, and references.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF (5.2MB)
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                View Experience
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
