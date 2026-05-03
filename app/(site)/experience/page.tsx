import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const jobs = [
  {
    title: "Senior Machine Learning Engineer",
    company: "TechFlow Systems",
    place: "Remote / Seattle",
    range: "Jan 2021 — Present",
    desc: "Owns ranking and safety models for a global marketplace with strict latency budgets and fairness reviews.",
    wins: [
      "Cut P99 inference latency 38% via batching + cache-aware routing",
      "Introduced shadow evaluation for every model promotion",
    ],
    tags: ["PyTorch", "Kubernetes", "Python", "Ray"],
  },
  {
    title: "Software Engineer II (Full Stack)",
    company: "Nexus Innovations",
    place: "Austin, TX",
    range: "Jun 2018 — Dec 2020",
    desc: "Built customer-facing analytics and internal ops consoles on a TypeScript/React + Go stack.",
    wins: ["Shipped role-based access with audit trails for regulated clients", "Led on-call rotation and postmortems"],
    tags: ["Node.js", "React", "PostgreSQL", "Go"],
  },
  {
    title: "Junior Data Scientist",
    company: "DataPlex Corp",
    place: "Boston, MA",
    range: "Aug 2016 — May 2018",
    desc: "Experimentation platform for growth teams—A/B analysis, uplift modeling, and executive dashboards.",
    wins: ["Automated experiment reports saving ~10 analyst hours weekly"],
    tags: ["Python", "Spark", "SQL"],
  },
];

const certs = [
  { name: "AWS Solutions Architect – Professional", org: "Amazon Web Services", date: "2022", tag: "Cloud" },
  { name: "TensorFlow Developer Certificate", org: "Google", date: "2021", tag: "ML" },
  { name: "Certified Kubernetes Administrator", org: "CNCF", date: "2020", tag: "DevOps" },
  { name: "Deep Learning Specialization", org: "DeepLearning.AI", date: "2019", tag: "ML" },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-14 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Career Portfolio
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Experience &amp; Certifications
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              A comprehensive timeline of professional work in software engineering and machine learning, validated by
              industry-leading credentials.
            </p>
          </Reveal>
          <Reveal className="flex shrink-0 flex-wrap gap-3" delay={0.06}>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print CV
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Hire Me
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_340px] lg:gap-12 lg:px-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Professional Experience</h2>
                  <p className="text-sm text-neutral-500">Detailed work history and technical achievements.</p>
                </div>
              </div>
            </Reveal>

            <div className="relative mt-10 pl-6 sm:pl-8">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200 sm:left-[9px]" aria-hidden />
              <div className="space-y-8">
                {jobs.map((job, i) => (
                  <Reveal key={job.title} delay={0.05 * i}>
                    <div className="relative">
                      <span className="absolute -left-[22px] top-4 flex h-3 w-3 rounded-full border-4 border-white bg-[#2563eb] shadow sm:-left-[26px]" />
                      <article className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-7">
                        <h3 className="text-lg font-bold text-neutral-900">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {job.company} · {job.place}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {job.range}
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{job.desc}</p>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                          Key achievements
                        </p>
                        <ul className="mt-2 space-y-2">
                          {job.wins.map((w) => (
                            <li key={w} className="flex gap-2 text-sm text-neutral-700">
                              <span className="mt-0.5 text-[#2563eb]">
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
                              className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">Certifications</h2>
                    <p className="text-xs text-neutral-500">Industry validated skills.</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {certs.map((c) => (
                    <li
                      key={c.name}
                      className="card-hover flex items-start justify-between gap-3 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900">{c.name}</p>
                        <p className="text-xs text-neutral-500">
                          {c.org} · {c.date}
                        </p>
                        <button type="button" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:underline">
                          Verify
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                      </div>
                      <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2563eb]">
                        {c.tag}
                      </span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="mt-4 text-xs font-semibold text-neutral-500 hover:text-[#2563eb]">
                  View All Credentials →
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-2xl bg-[#2563eb] p-6 text-white shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold">Need a PDF version?</h3>
                <p className="mt-2 text-sm text-blue-100">One file with timeline, publications, and selected references.</p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50"
                >
                  Download Full Resume
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 shadow-sm">
                <p>Interested in discussing experience or collaborations?</p>
                <Link href="/contact" className="mt-3 inline-flex items-center gap-1 font-semibold text-[#2563eb] hover:underline">
                  Contact Me Directly
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
