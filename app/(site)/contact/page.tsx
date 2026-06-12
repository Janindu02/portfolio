import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";
import { LanyardClient } from "@/components/ui/lanyard-client";
import { PORTRAIT } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Ambient glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[640px] w-[640px] -translate-y-1/4 translate-x-1/4 rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, var(--brand) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Mobile: flex-col (card first), desktop: 2-col grid */}
          <div className="flex flex-col lg:grid lg:min-h-[620px] lg:items-center lg:grid-cols-[1fr_480px]">
            {/* Card — first on mobile (top), second column on desktop */}
            <div className="order-first h-[460px] w-full lg:order-last lg:h-[620px]">
              <LanyardClient
                frontImage={PORTRAIT}
                imageFit="cover"
                lanyardWidth={1.2}
              />
            </div>

            {/* Text — second on mobile (bottom), first column on desktop */}
            <FadeIn className="order-last py-10 lg:order-first lg:py-20">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                style={{
                  borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
                  color: "var(--brand)",
                  background: "color-mix(in srgb, var(--brand) 8%, transparent)",
                }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                Contact &amp; Career
              </span>

              <h1
                className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: "var(--foreground)" }}
              >
                Let&apos;s <GradientText>Connect</GradientText>.
              </h1>

              <p
                className="mt-5 max-w-xl text-lg leading-relaxed"
                style={{ color: "var(--muted-fg)" }}
              >
                Looking for a motivated intern or have a project in mind? Reach
                out below or download my CV to review my background.
              </p>

              {/* Quick-action chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:janiduamaraweera@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                    background: "var(--card)",
                  }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
                <a
                  href="https://linkedin.com/in/janinduamaraweera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--brand)" }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="/cv/Janindu Amaraweera.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--surface-fg)",
                    background: "var(--surface)",
                  }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:gap-12 lg:px-8">

          {/* Left column */}
          <div className="space-y-10">
            <FadeIn>
              <div
                className="rounded-2xl border p-6 shadow-sm sm:p-8"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  Send a Message
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>
                  Share context, links, and timing—I read every note and respond personally.
                </p>
                <form className="mt-6 space-y-4" action="#" method="get">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Full Name
                      <input
                        className="input-focus mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--card)",
                          color: "var(--foreground)",
                        }}
                        placeholder="Your Name"
                      />
                    </label>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Email Address
                      <input
                        type="email"
                        className="input-focus mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--card)",
                          color: "var(--foreground)",
                        }}
                        placeholder="you@company.com"
                      />
                    </label>
                  </div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    Subject
                    <input
                      className="input-focus mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--card)",
                        color: "var(--foreground)",
                      }}
                      placeholder="Internship / project / collaboration"
                    />
                  </label>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    Message
                    <textarea
                      rows={5}
                      className="input-focus mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--card)",
                        color: "var(--foreground)",
                      }}
                      placeholder="What are you working on, and how can I help?"
                    />
                  </label>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
                    style={{ background: "var(--brand)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div
                  className="rounded-2xl border p-6 shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    Direct details
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <li className="flex gap-2">
                      <span style={{ color: "var(--brand)" }}>✉️</span>
                      janiduamaraweera@gmail.com
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: "var(--brand)" }}>📞</span>
                      +94 71 397 4674
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: "var(--brand)" }}>📍</span>
                      Panadura, Sri Lanka
                    </li>
                  </ul>
                </div>
                <div
                  className="rounded-2xl border p-6 shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    Online presence
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { label: "GitHub",    href: "https://github.com/Janindu02" },
                      { label: "LinkedIn",  href: "https://linkedin.com/in/janinduamaraweera/" },
                      { label: "Medium",    href: "https://medium.com/@janiduamaraweera" },
                      { label: "Instagram", href: "https://instagram.com/third_eye_of_janindu/" },
                    ].map((p) => (
                      <a
                        key={p.label}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border py-2.5 text-center text-xs font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--brand)_6%,transparent)]"
                        style={{ borderColor: "var(--border)", color: "var(--surface-fg)" }}
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div
                className="flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  background: "color-mix(in srgb, var(--brand) 8%, var(--muted))",
                }}
              >
                <div>
                  <p className="font-bold" style={{ color: "var(--foreground)" }}>
                    Current availability
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted-fg)" }}>
                    Seeking 1-year internship starting 2025
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "var(--foreground)" }}
                  >
                    On-site or Remote
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "var(--foreground)" }}
                  >
                    1-Year Internship
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column — CV Preview */}
          <div className="space-y-6">
            <FadeIn>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  CV Preview
                </h2>
                <a
                  href="/cv/Janindu Amaraweera.pdf"
                  download
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                  style={{ background: "var(--brand)" }}
                >
                  Download PDF
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <div
                className="overflow-hidden rounded-2xl border shadow-lg"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="grid gap-6 bg-[#0f172a] p-6 text-white sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">Janindu Amaraweera</h3>
                    <p className="mt-1 text-sm text-blue-100">
                      Software Engineering Undergraduate · Full-stack Developer
                    </p>
                    <div className="mt-4 space-y-1 text-xs text-blue-100">
                      <p>janiduamaraweera@gmail.com</p>
                      <p>linkedin.com/in/janinduamaraweera</p>
                      <p>Panadura, Sri Lanka</p>
                    </div>
                  </div>
                  <Image
                    src={PORTRAIT}
                    alt="Janindu Amaraweera"
                    width={96}
                    height={96}
                    className="h-24 w-24 justify-self-start rounded-xl object-cover ring-2 ring-white/20 sm:justify-self-end"
                  />
                </div>
                <div
                  className="space-y-6 p-6 text-sm"
                  style={{ background: "var(--card)", color: "var(--surface-fg)" }}
                >
                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Professional summary
                    </h4>
                    <p className="mt-2 leading-relaxed">
                      Third-year Software Engineering undergraduate at the University of Westminster,
                      passionate about building scalable, user-centred software. Hands-on experience
                      across full-stack development and open-source contribution. Seeking a 1-year
                      industry internship.
                    </p>
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Project Experience
                    </h4>
                    <ul className="mt-3 space-y-4">
                      <li>
                        <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                          Full-stack Developer — CeylonMine
                        </p>
                        <p className="text-xs italic" style={{ color: "var(--muted-fg)" }}>
                          2024 — 2025 · Team Project
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          <li>2nd Runners-up at Cutting Edge 2025; GSMB endorsed.</li>
                          <li>Built with Next.js, Flask, Supabase, and ChatGPT API.</li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                          Open-Source Developer — Coding Lanka
                        </p>
                        <p className="text-xs italic" style={{ color: "var(--muted-fg)" }}>
                          2024 — Present
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          <li>Free learning roadmaps for Sri Lankan developers.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Core competencies
                    </h4>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { k: "Languages", v: "Java, Python, JS" },
                        { k: "Frontend",  v: "React, Next.js" },
                        { k: "Backend",   v: "Flask, Node.js" },
                        { k: "Database",  v: "PostgreSQL, SQL" },
                      ].map((c) => (
                        <div
                          key={c.k}
                          className="rounded-lg p-3"
                          style={{ background: "var(--muted)" }}
                        >
                          <p
                            className="text-[10px] font-bold uppercase"
                            style={{ color: "var(--muted-fg)" }}
                          >
                            {c.k}
                          </p>
                          <p
                            className="mt-1 text-xs font-medium"
                            style={{ color: "var(--foreground)" }}
                          >
                            {c.v}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Education
                    </h4>
                    <p className="mt-2 font-medium" style={{ color: "var(--foreground)" }}>
                      BEng Software Engineering — University of Westminster
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                      2023 — 2027
                    </p>
                    <p className="mt-3 font-medium" style={{ color: "var(--foreground)" }}>
                      G.C.E. A/L — Rahula College
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted-fg)" }}>
                      Mathematics Stream · 2022
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="rounded-2xl border p-6 text-center text-sm"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--surface-fg)",
                }}
              >
                <p>Prefer to reach out directly? Drop me an email anytime.</p>
                <a
                  href="mailto:janiduamaraweera@gmail.com"
                  className="mt-4 inline-flex rounded-full border px-6 py-2.5 text-sm font-semibold"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                  }}
                >
                  janiduamaraweera@gmail.com
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
