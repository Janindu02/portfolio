import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PORTRAIT } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              Contact &amp; Career
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Let&apos;s Connect.</h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              Have a complex technical challenge or a role that needs an expert engineer? Reach out below or review my
              professional history.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="space-y-10">
            <Reveal>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-neutral-900">Send a Message</h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Share context, links, and timing—I read every note and respond personally.
                </p>
                <form className="mt-6 space-y-4" action="#" method="get">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Full Name
                      <input
                        className="input-focus mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm text-neutral-900"
                        placeholder="Alex Sterling"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Email Address
                      <input
                        type="email"
                        className="input-focus mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm text-neutral-900"
                        placeholder="you@company.com"
                      />
                    </label>
                  </div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Subject
                    <input
                      className="input-focus mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm text-neutral-900"
                      placeholder="Project / role / collaboration"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Message
                    <textarea
                      rows={5}
                      className="input-focus mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm text-neutral-900"
                      placeholder="What are you building, and how can I help?"
                    />
                  </label>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] hover:bg-[#1d4ed8] active:scale-[0.99]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-neutral-900">Direct details</h3>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    <li className="flex gap-2">
                      <span className="text-[#2563eb]">✉️</span> hello@engineer.dev
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#2563eb]">📞</span> +1 (415) 555-0199
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#2563eb]">📍</span> San Francisco, CA
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-neutral-900">Online presence</h3>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {["GitHub", "LinkedIn", "Twitter", "Upwork"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className="rounded-xl border border-neutral-200 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col gap-4 rounded-2xl bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-neutral-900">Current availability</p>
                  <p className="mt-1 text-sm text-neutral-600">Available for contract roles starting Oct 2024</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-white">
                    Remote Friendly
                  </span>
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-white">
                    Contract / Full-time
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-neutral-900">Resume Preview</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full bg-[#2563eb] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1d4ed8]"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
                <div className="grid gap-6 bg-[#0f172a] p-6 text-white sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">Alex Sterling</h3>
                    <p className="mt-1 text-sm text-blue-100">Senior Software &amp; Machine Learning Engineer</p>
                    <div className="mt-4 space-y-1 text-xs text-blue-100">
                      <p>hello@engineer.dev</p>
                      <p>engineer.dev</p>
                      <p>San Francisco, CA</p>
                    </div>
                  </div>
                  <Image
                    src={PORTRAIT}
                    alt=""
                    width={96}
                    height={96}
                    className="h-24 w-24 justify-self-start rounded-xl object-cover ring-2 ring-white/20 sm:justify-self-end"
                  />
                </div>
                <div className="space-y-6 p-6 text-sm text-neutral-700">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-neutral-500">Professional summary</h4>
                    <p className="mt-2 leading-relaxed">
                      Hands-on leader for ML platforms and full-stack product engineering. Comfortable owning roadmaps,
                      architecture, and on-call health for customer-facing systems.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-neutral-500">Experience</h4>
                    <ul className="mt-3 space-y-4">
                      <li>
                        <p className="font-semibold text-neutral-900">Senior ML Engineer — TechFlow Systems</p>
                        <p className="text-xs italic text-neutral-500">2021 — Present · Seattle / Remote</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          <li>Owned latency-critical inference path and fairness review cadence.</li>
                          <li>Scaled training platform to multi-region with deterministic replay.</li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-semibold text-neutral-900">Software Engineer II — Nexus Innovations</p>
                        <p className="text-xs italic text-neutral-500">2018 — 2020 · Austin, TX</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          <li>Shipped analytics suite with RBAC and audit trails for regulated clients.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-neutral-500">Core competencies</h4>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { k: "Languages", v: "Python, Rust, TS" },
                        { k: "AI Tools", v: "PyTorch, Ray, Triton" },
                        { k: "Cloud", v: "AWS, K8s" },
                        { k: "Systems", v: "gRPC, Kafka" },
                      ].map((c) => (
                        <div key={c.k} className="rounded-lg bg-neutral-50 p-3">
                          <p className="text-[10px] font-bold uppercase text-neutral-500">{c.k}</p>
                          <p className="mt-1 text-xs font-medium text-neutral-800">{c.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-neutral-500">Education</h4>
                    <p className="mt-2 font-medium text-neutral-900">M.S. Computer Science — Stanford University</p>
                    <p className="text-xs text-neutral-500">2016</p>
                    <p className="mt-3 font-medium text-neutral-900">B.S. EECS — MIT</p>
                    <p className="text-xs text-neutral-500">2014</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-100 p-6 text-center text-sm text-neutral-700">
                <p>Prefer a quick chat? Book a 15-minute intro call on my calendar.</p>
                <button
                  type="button"
                  className="mt-4 inline-flex rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  Schedule a Meeting
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
