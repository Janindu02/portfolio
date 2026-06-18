import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";
import { PORTRAIT } from "@/lib/site";

const contents = [
  { href: "#story", label: "The Story So Far" },
  { href: "#education", label: "Academic Foundation" },
  { href: "#recognition", label: "Recognition & Endorsements" },
  { href: "#honors", label: "Honors & Achievements" },
  { href: "#testimonials", label: "What Teammates Say" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--muted)" }}>
      <section className="border-b" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
          <FadeIn>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              Biography &amp; Journey
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--foreground)" }}>
              Turning complex problems into{" "}
              <GradientText>clean, efficient code</GradientText>.
            </h1>
            <p className="mt-5 max-w-xl text-lg" style={{ color: "var(--muted-fg)" }}>
              A passionate tech explorer and Software Engineering undergraduate from Panadura, Sri Lanka,
              studying at IIT affiliated with the University of Westminster — building user-friendly,
              scalable software and solving real-world problems through code.
            </p>
          </FadeIn>
          <FadeIn className="flex justify-center lg:justify-end" delay={0.06}>
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              <Image
                src={PORTRAIT}
                alt="Janindu Amaraweera"
                fill
                className="rounded-full object-cover shadow-xl"
                style={{ boxShadow: "0 0 0 4px var(--card), 0 20px 60px rgba(0,0,0,0.15)" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:flex lg:gap-10 lg:px-8 lg:py-16">
        <article className="min-w-0 flex-1 space-y-14">
          <FadeIn id="story">
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>
              <svg className="h-6 w-6" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              The Story So Far
            </h2>
            <div className="mt-6 space-y-4" style={{ color: "var(--muted-fg)" }}>
              <p>
                Ever since I was a kid, I&apos;ve been curious about how things work especially in tech.
                That curiosity started early: in Grade 7, armed with just a basic mobile phone and endless
                curiosity, I launched my first tech YouTube channel from my bedroom. No fancy gear, just
                passion. I recorded tutorials, app reviews, and tech tips driven by a genuine love for
                technology and a desire to help others understand it. By 2019 the channel had grown past
                500 subscribers and one video pulled 15,000+ views in a short time.
              </p>
              <p>
                That foundation of building things for others grew into something bigger. At the University
                of Westminster I teamed up with three others to build CeylonMine, a platform to digitise
                mining operations in Sri Lanka. It went on to win 2nd Runners-up at Cutting Edge 2025 and
                earn official endorsement from the GSMB.
              </p>
              <p>
                Today I split my time between coursework and shipping writing clean APIs, building
                responsive UIs, and contributing to open-source projects like Coding Lanka. I believe in
                readable, well-tested code and software that actually serves people.
              </p>
            </div>
            <blockquote
              className="mt-8 border-l-4 py-4 pl-5 text-sm italic leading-relaxed"
              style={{
                borderColor: "color-mix(in srgb, var(--brand) 35%, transparent)",
                background: "color-mix(in srgb, var(--brand) 5%, transparent)",
                color: "var(--surface-fg)",
              }}
            >
              &ldquo;Clean code, good architecture, and real-world impact—that&apos;s what I&apos;m here to build.&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn id="education">
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>
              <svg className="h-6 w-6" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Academic Foundation
            </h2>
            <div className="mt-6 space-y-5">
              {[
                {
                  school: "University of Westminster",
                  degree: "BEng Software Engineering",
                  range: "2023 — 2027",
                  place: "London, UK",
                  logo: "/education/westmin.png",
                  points: [
                    "Full-stack development, algorithms, and software architecture",
                    "CeylonMine project — 2nd Runners-up at Cutting Edge 2025",
                  ],
                },
                {
                  school: "Rahula College",
                  degree: "G.C.E. A/L — Combined Maths, Physics, Chemistry",
                  range: "2014 — 2023",
                  place: "Matara, Sri Lanka",
                  logo: "/education/rahula.png",
                  points: [
                    "G.C.E. O/L: 9 A's in English Medium, including ICT (2019)",
                    "G.C.E. A/L: Mathematics stream (2022)",
                  ],
                },
                {
                  school: "Vijitha Central College",
                  degree: "Primary Education",
                  range: "2009 — 2014",
                  place: "Matara, Sri Lanka",
                  logo: "/education/vijhitha.jpeg",
                  points: ["Grade 5 Scholarship Examination: 181 marks (2013)"],
                },
              ].map((e, i) => (
                <FadeIn key={e.school} delay={i * 0.08}>
                  <div
                    className="card-hover group rounded-2xl border p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className="relative shrink-0 overflow-hidden rounded-2xl border-2 p-2 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-2"
                        style={{
                          background: "var(--surface)",
                          borderColor: "color-mix(in srgb, var(--brand) 25%, var(--border))",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        }}
                      >
                        <Image
                          src={e.logo}
                          alt={`${e.school} logo`}
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-xl object-contain transition-all duration-500 group-hover:brightness-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-fg)" }}>{e.place}</p>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
                          >
                            {e.range}
                          </span>
                        </div>
                        <p className="mt-1 text-lg font-bold leading-snug" style={{ color: "var(--foreground)" }}>{e.degree}</p>
                        <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>{e.school}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5 pl-1">
                      {e.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted-fg)" }}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--brand)" }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn id="recognition">
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>
              <svg className="h-6 w-6" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              </svg>
              Recognition &amp; Endorsements
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "2nd Runners-up — Cutting Edge 2025",
                  body: "Recognised at the annual innovation competition hosted by the University of Westminster for CeylonMine, a platform to digitise mining operations in Sri Lanka.",
                  foot: "University of Westminster",
                },
                {
                  title: "GSMB Official Endorsement",
                  body: "Received data collection permission and implementation approval from the Geological Survey & Mines Bureau of Sri Lanka for the CeylonMine platform.",
                  foot: "Government of Sri Lanka",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border p-6"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{c.body}</p>
                  <p className="mt-4 text-xs font-semibold" style={{ color: "var(--brand)" }}>{c.foot}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn id="honors">
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>
              <svg className="h-6 w-6" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Honors &amp; Achievements
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                { tag: "Competition", year: "2025", title: "2nd Runners-up, Cutting Edge 2025", org: "University of Westminster", desc: "Recognised for CeylonMine, an innovative platform to digitise Sri Lanka's mining industry." },
                { tag: "Academic", year: "2019", title: "G.C.E. O/L — 9 A's, English Medium", org: "Rahula College", desc: "Achieved 9 A grades in the national O/L examination, including ICT, in English medium." },
              ].map((a) => (
                <div
                  key={a.title}
                  className="card-hover rounded-2xl border p-6 shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{ background: "var(--surface)", color: "var(--surface-fg)" }}
                    >
                      {a.tag}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: "var(--muted-fg)" }}>{a.year}</span>
                  </div>
                  <h3 className="mt-3 font-bold" style={{ color: "var(--foreground)" }}>{a.title}</h3>
                  <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>{a.org}</p>
                  <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>{a.desc}</p>
                </div>
              ))}
              <div
                className="card-hover rounded-2xl border p-6 shadow-sm sm:col-span-2"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ background: "var(--surface)", color: "var(--surface-fg)" }}
                  >
                    Academic
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--muted-fg)" }}>2013</span>
                </div>
                <h3 className="mt-3 font-bold" style={{ color: "var(--foreground)" }}>Grade 5 Scholarship Examination</h3>
                <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>Vijitha Central College</p>
                <p className="mt-2 text-sm" style={{ color: "var(--muted-fg)" }}>
                  Achieved 181 marks in the national Grade 5 Scholarship Examination, demonstrating early
                  academic excellence.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn id="testimonials">
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>
              <svg className="h-6 w-6" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              What Teammates Say
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted-fg)" }}>Feedback from collaborators on real projects.</p>

            <div
              className="mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-8 py-14 text-center"
              style={{ borderColor: "color-mix(in srgb, var(--brand) 30%, var(--border))", background: "color-mix(in srgb, var(--brand) 4%, var(--card))" }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "color-mix(in srgb, var(--brand) 10%, var(--card))",
                  borderColor: "color-mix(in srgb, var(--brand) 35%, transparent)",
                  color: "var(--brand)",
                }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                Coming Soon
              </span>
              <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                Still gathering feedback from collaborators. Check back soon.
              </p>
            </div>
          </FadeIn>
        </article>

        <aside className="mt-12 space-y-6 lg:mt-0 lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border p-6 shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex flex-col items-center text-center">
                <Image src={PORTRAIT} alt="Janindu Amaraweera" width={96} height={96} className="h-24 w-24 rounded-full object-cover" />
                <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--foreground)" }}>Janindu Amaraweera</h3>
                <p className="text-sm" style={{ color: "var(--muted-fg)" }}>Software Engineering Undergraduate</p>
                <ul className="mt-4 w-full space-y-2 text-left text-sm" style={{ color: "var(--muted-fg)" }}>
                  <li className="flex gap-2">
                    <span style={{ color: "var(--brand)" }}>📍</span> Panadura, Sri Lanka
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: "var(--brand)" }}>🎓</span> University of Westminster
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: "var(--brand)" }}>🏅</span> Cutting Edge 2025
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border p-5 shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-fg)" }}>Contents</p>
              <nav className="mt-3 space-y-1">
                {contents.map((c) => (
                  <a
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--surface-fg)" }}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--brand)" }} />
                    {c.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="rounded-2xl p-6 text-center shadow-lg" style={{ background: "var(--brand)" }}>
              <p className="font-semibold text-white">Currently @ HP Innovations</p>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>Interning since September 2025. Open to collaborations and conversations.</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
                style={{ background: "var(--card)", color: "var(--brand)" }}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t py-14" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--brand) 4%, var(--muted))" }}>
        <div
          className="mx-auto max-w-6xl rounded-2xl border px-6 py-10 shadow-sm sm:px-10 lg:px-12"
          style={{ background: "var(--card)", borderColor: "color-mix(in srgb, var(--brand) 15%, var(--border))" }}
        >
          <FadeIn className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Ready for the next challenge?</h2>
              <p className="mt-2 max-w-xl" style={{ color: "var(--muted-fg)" }}>
                Download my CV or jump straight to my projects and experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/cv/Janindu Amaraweera.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: "var(--brand)" }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV (PDF)
              </a>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                View Experience
                <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
