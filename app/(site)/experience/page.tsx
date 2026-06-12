import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

const jobs = [
  {
    title: "Full-stack Developer",
    company: "CeylonMine (Team Project)",
    place: "University of Westminster",
    range: "2024 — 2025",
    desc: "Built a platform to digitise and streamline mining operations in Sri Lanka, integrating a ChatGPT-powered chatbot, an interactive mine map, and a digital permit application workflow for a team of four.",
    wins: [
      "2nd Runners-up at Cutting Edge 2025 innovation competition",
      "Received data collection permission and implementation approval from the GSMB",
    ],
    tags: ["Next.js", "Flask", "Supabase", "PostgreSQL", "Tailwind CSS", "ChatGPT API"],
  },
  {
    title: "Open-Source Developer",
    company: "Coding Lanka",
    place: "Remote",
    range: "2024 — Present",
    desc: "Developed free, open-source software development roadmaps for Sri Lankan learners, providing structured learning paths from beginner fundamentals to production-ready skills.",
    wins: [
      "Built an accessible learning platform serving the local developer community",
      "Maintained open-source codebase with TypeScript and modern React patterns",
    ],
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Developer",
    company: "Ticket Management System (Team Project)",
    place: "University of Westminster",
    range: "2024",
    desc: "Developed a full-featured ticket management system with user authentication, OOP design patterns, and a React front-end backed by a Spring Boot REST API.",
    wins: [
      "Implemented clean OOP architecture with a Spring Boot REST API",
      "Built a responsive React UI with role-based access control",
    ],
    tags: ["React", "Spring Boot", "Java", "OOP"],
  },
];

const certs = [
  { name: "2nd Runners-up, Cutting Edge 2025", org: "University of Westminster", date: "2025", tag: "Award" },
  { name: "G.C.E. O/L — 9 A's, English Medium", org: "Rahula College", date: "2019", tag: "Academic" },
  { name: "G.C.E. A/L — Mathematics Stream", org: "Rahula College", date: "2022", tag: "Academic" },
  { name: "Grade 5 Scholarship — 181 marks", org: "Vijitha Central College", date: "2013", tag: "Academic" },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="border-b py-14 sm:py-16" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Engineering Journey
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--foreground)" }}>
              Project Experience &amp; Achievements
            </h1>
            <p className="mt-4 text-lg" style={{ color: "var(--muted-fg)" }}>
              A timeline of projects built during my degree at the University of Westminster, alongside
              academic milestones and competition awards.
            </p>
          </FadeIn>
          <FadeIn className="flex shrink-0 flex-wrap gap-3" delay={0.06}>
            <a
              href="/cv/Janindu Amaraweera.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
              style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Download CV
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--brand)" }}
            >
              Hire Me
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_340px] lg:gap-12 lg:px-8">
          <div>
            <FadeIn>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Project Experience</h2>
                  <p className="text-sm" style={{ color: "var(--muted-fg)" }}>Builds and contributions during my degree.</p>
                </div>
              </div>
            </FadeIn>

            <div className="relative mt-10 pl-6 sm:pl-8">
              <div className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[9px]" style={{ background: "var(--border)" }} aria-hidden />
              <div className="space-y-8">
                {jobs.map((job, i) => (
                  <FadeIn key={job.title} delay={0.05 * i}>
                    <div className="relative">
                      <span
                        className="absolute -left-[22px] top-4 flex h-3 w-3 rounded-full border-4 shadow sm:-left-[26px]"
                        style={{ background: "var(--brand)", borderColor: "var(--card)" }}
                      />
                      <article
                        className="card-hover rounded-2xl border p-6 shadow-sm sm:p-7"
                        style={{ background: "var(--card)", borderColor: "var(--border)" }}
                      >
                        <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{job.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: "var(--muted-fg)" }}>
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {job.company} · {job.place}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {job.range}
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{job.desc}</p>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-fg)" }}>
                          Key achievements
                        </p>
                        <ul className="mt-2 space-y-2">
                          {job.wins.map((w) => (
                            <li key={w} className="flex gap-2 text-sm" style={{ color: "var(--surface-fg)" }}>
                              <span className="mt-0.5" style={{ color: "var(--brand)" }}>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              {w}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {job.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--surface-fg)" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <FadeIn>
              <div className="rounded-2xl border p-6 shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Academic Milestones</h2>
                    <p className="text-xs" style={{ color: "var(--muted-fg)" }}>Awards and academic achievements.</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {certs.map((c) => (
                    <li
                      key={c.name}
                      className="card-hover flex items-start justify-between gap-3 rounded-xl border p-4"
                      style={{ background: "var(--muted)", borderColor: "var(--border)" }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{c.name}</p>
                        <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                          {c.org} · {c.date}
                        </p>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
                      >
                        {c.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: "var(--brand)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold">Need a PDF version?</h3>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>My CV with full project details and academic history.</p>
                <a
                  href="/cv/Janindu Amaraweera.pdf"
                  download
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full py-2.5 text-sm font-semibold"
                  style={{ background: "var(--card)", color: "var(--brand)" }}
                >
                  Download CV (PDF)
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="rounded-2xl border p-6 text-sm shadow-sm"
                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-fg)" }}
              >
                <p>Interested in working together or have a role in mind?</p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 font-semibold hover:underline"
                  style={{ color: "var(--brand)" }}
                >
                  Contact Me Directly
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </aside>
        </div>
      </section>
    </>
  );
}
