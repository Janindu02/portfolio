import Image from "next/image";
import Link from "next/link";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { GridBackground } from "@/components/ui/grid-background";
import { Spotlight } from "@/components/ui/spotlight";
import { LampContainer } from "@/components/ui/lamp";
import { TrueFocus } from "@/components/ui/true-focus";
import { GradientText } from "@/components/ui/gradient-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { CometCard } from "@/components/ui/comet-card";
import { FadeIn } from "@/components/ui/fade-in";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import { VerticalLoop } from "@/components/ui/vertical-loop";
import { ProfileHeroCard } from "@/components/ui/profile-hero-card";
import { ScrollGallery } from "@/components/ui/scroll-gallery";
import { AwardsShowcase } from "@/components/ui/awards-showcase";
import { HeroSocials } from "@/components/ui/hero-socials";
import { TechStrip } from "@/components/ui/tech-strip";

const featured = [
  {
    title: "CeylonMine",
    desc: "Award-winning platform to digitise and streamline mining operations in Sri Lanka — AI chatbot, mine mapping, and permit workflows.",
    tags: ["Next.js", "Flask", "PostgreSQL"],
    img: "/pics/ceylonemine.png",
    href: "/projects",
  },
  {
    title: "Coding Lanka",
    desc: "Free, open-source software development roadmaps for Sri Lankan learners — structured paths from beginner to production-ready.",
    tags: ["TypeScript", "React", "Next.js"],
    img: "/pics/codinglanka.png",
    href: "https://github.com/codinglanka",
  },
  {
    title: "Ticket Management System",
    desc: "Full-featured ticket system with user authentication, OOP design patterns, and a Spring Boot REST API.",
    tags: ["React", "Spring Boot", "Java"],
    img: "/pics/Daraz.jpg",
    href: "/projects",
  },
];

const coreTags = ["Java", "JavaScript", "TypeScript", "Python", "React", "Node.js", "Flask", "Next.js"];
const webTags  = ["PostgreSQL", "Supabase", "Tailwind CSS", "Git", "SQL", "Agile"];

export default function HomePage() {
  return (
    <>
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR="#7c3aed"
      />

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--background)" }}
      >
        <GridBackground />
        <Spotlight color="rgba(37,99,235,0.14)" size={600} />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          {/* Left: Text */}
          <FadeIn direction="up">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
                background: "color-mix(in srgb, var(--brand) 10%, transparent)",
                color: "var(--brand)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Seeking Internship · Open to Work
            </span>

            <p
              className="mt-4 text-sm font-medium tracking-wide"
              style={{ color: "var(--muted-fg)" }}
            >
              <TrueFocus
                words={[
                  "Full-Stack Developer",
                  "Software Engineer",
                  "Open Source Contributor",
                  "Problem Solver",
                ]}
              />
            </p>

            <h1
              className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]"
              style={{ color: "var(--foreground)" }}
            >
              <VerticalLoop
                words={["Building", "Crafting", "Shipping", "Designing"]}
                duration={3}
                className="font-extrabold"
                style={{ color: "var(--brand)" }}
              />{" "}
              scalable software for{" "}
              <GradientText>Sri Lanka and the world</GradientText>.
            </h1>

            <p
              className="mt-5 max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--muted-fg)" }}
            >
              I&apos;m a third-year Software Engineering undergraduate at the University of
              Westminster, passionate about turning complex problems into clean, efficient
              code — from full-stack web platforms to open-source learning tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MovingBorderButton href="/contact">
                Let&apos;s Connect
              </MovingBorderButton>
              <a
                href="/cv/Janindu Amaraweera.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>

            <HeroSocials />
          </FadeIn>

          {/* Right: Profile card */}
          <div className="flex items-center justify-center">
            <ProfileHeroCard />
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ──────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "var(--muted)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                Featured <GradientText>Projects</GradientText>
              </h2>
              <p className="mt-2 max-w-xl" style={{ color: "var(--muted-fg)" }}>
                Selected builds that balanced real-world impact with clean engineering.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--brand)" }}
            >
              Browse Full Portfolio
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featured.map((p, i) => (
              <FadeIn key={p.title} delay={0.06 * i}>
                <CometCard className="group h-full">
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-lg"
                    style={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md px-2 py-0.5 text-xs font-medium"
                            style={{
                              background: "color-mix(in srgb, var(--brand) 10%, transparent)",
                              color: "var(--brand)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="mt-4 text-lg font-bold"
                        style={{ color: "var(--card-fg)" }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="mt-2 flex-1 text-sm leading-relaxed"
                        style={{ color: "var(--muted-fg)" }}
                      >
                        {p.desc}
                      </p>
                      <Link
                        href={p.href}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{ color: "var(--brand)" }}
                      >
                        View Project
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </CometCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AWARDS SHOWCASE ────────────────────────────────────────── */}
      <AwardsShowcase />

      {/* ─── TECH STRIP ─────────────────────────────────────────────── */}
      <TechStrip />

      {/* ─── SKILLS — wrapped in LampContainer ──────────────────────── */}
      <LampContainer>
        <div className="w-full max-w-6xl px-4 text-left sm:px-6 lg:px-8">
          <FadeIn>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              Expertise across the{" "}
              <GradientText>
                full technical stack
              </GradientText>.
            </h2>
            <p className="mt-4 max-w-xl" style={{ color: "var(--muted-fg)" }}>
              From database design to polished frontends, I stay close to the metrics that
              matter: performance, maintainability, and real-world usability.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <FadeIn delay={0.05}>
                <div
                  className="rounded-2xl border p-6 shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <h3 className="text-sm font-semibold" style={{ color: "var(--card-fg)" }}>
                    Core Engineering
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {coreTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--surface)",
                          color: "var(--surface-fg)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div
                  className="rounded-2xl border p-6 shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <h3 className="text-sm font-semibold" style={{ color: "var(--card-fg)" }}>
                    Web &amp; Database
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {webTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--surface)",
                          color: "var(--surface-fg)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.1} className="flex flex-col gap-5">
              {[
                "Full-stack development: from REST APIs to responsive UIs",
                "Database design and optimisation with PostgreSQL and Supabase",
                "Team collaboration using Agile methodologies and Git workflows",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl border p-4"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "color-mix(in srgb, var(--brand) 15%, transparent)",
                      color: "var(--brand)",
                    }}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm" style={{ color: "var(--surface-fg)" }}>{item}</p>
                </div>
              ))}

              <div
                className="rounded-2xl p-6 text-white shadow-lg"
                style={{ background: "var(--brand)" }}
              >
                <p className="font-semibold">Looking for a motivated intern?</p>
                <p className="mt-2 text-sm opacity-85">
                  Available for a 1-year internship starting 2025 — let&apos;s discuss what I can
                  build for your team.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--background)", color: "var(--brand)" }}
                >
                  Get in Touch
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </LampContainer>

      {/* ─── LOCATION ───────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "var(--muted)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
                color: "var(--brand)",
              }}
            >
              Location
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              Based in Sri Lanka,{" "}
              <GradientText>building for the world</GradientText>.
            </h2>
            <p className="mt-4 max-w-2xl text-base" style={{ color: "var(--muted-fg)" }}>
              Currently studying Software Engineering at the University of Westminster
              (IIT Campus, Colombo). Open to remote and on-site opportunities in Sri Lanka,
              London, and beyond.
            </p>
            <ul className="mt-8 flex flex-wrap gap-4">
              {[
                { flag: "🇱🇰", label: "Panadura, Sri Lanka — hometown" },
                { flag: "🎓", label: "Colombo, Sri Lanka — currently studying" },
                { flag: "🌍", label: "London, UK — University of Westminster" },
              ].map((loc) => (
                <li
                  key={loc.label}
                  className="flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    color: "var(--surface-fg)",
                  }}
                >
                  <span className="text-base">{loc.flag}</span>
                  {loc.label}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              What teammates say
            </h2>
            <p className="mt-3" style={{ color: "var(--muted-fg)" }}>
              Feedback from collaborators on real projects.
            </p>
          </FadeIn>
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* ─── JOURNEY PHOTO GALLERY ─────────────────────────────────── */}
      <ScrollGallery />

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-16"
        style={{ background: "var(--muted)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div
              className="rounded-2xl border p-8 sm:p-12"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div
                  className="border-l-4 pl-5"
                  style={{ borderColor: "var(--brand)" }}
                >
                  <h2
                    className="text-xl font-bold sm:text-2xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    Ready to build something impactful?
                  </h2>
                  <p
                    className="mt-2 text-sm sm:text-base"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    Tell me about your team and what you&apos;re working on — I respond within two business days.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <MovingBorderButton href="/contact">
                    Let&apos;s Talk
                  </MovingBorderButton>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                      color: "var(--foreground)",
                    }}
                  >
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
