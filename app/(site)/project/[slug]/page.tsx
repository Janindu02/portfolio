"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";
import { getProjectBySlug } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

// ─── CeylonMine-specific rich page ──────────────────────────────────────────

const techStack = [
  { name: "Next.js", role: "Frontend", icon: "/pics/ceylonmine/nextjs.png" },
  { name: "Flask", role: "Backend", icon: "/pics/ceylonmine/flask.png" },
  { name: "TailwindCSS", role: "Styling", icon: "/pics/ceylonmine/tailwind.png" },
  { name: "PostgreSQL", role: "Database", icon: "/pics/ceylonmine/postgresql.png" },
  { name: "Supabase", role: "Database", icon: "/pics/ceylonmine/database.png" },
  { name: "ChatGPT API", role: "AI Integration", icon: "/pics/ceylonmine/chatgpt.png" },
];

const problems = [
  {
    emoji: "📋",
    title: "Outdated Manual Processes & Licensing Delays",
    problem:
      "Manual processing of over 1M+ license applications each year leads to delays, human errors, and slow approvals.",
    solution:
      "CeylonMine replaces paper-based workflows with an end-to-end digital license management system, enabling faster processing and centralised tracking.",
    evidence: ["GSMB officers report high workload and missing documents", "Delayed project approvals due to paper-based backlog", "Cancelled projects affecting mining companies and share market trust"],
  },
  {
    emoji: "💰",
    title: "No Real-Time Royalty Tracking & Revenue Leakage",
    problem:
      "There's no digital system to track royalty payments or detect irregularities, leading to lost revenue and delayed reporting.",
    solution:
      "Automated royalty calculation tools, real-time dashboards, and reporting modules ensure accurate and timely payment tracking.",
    evidence: ["Inconsistent royalty records and missed payments", "Lack of real-time insights for financial monitoring", "Estimated 15–20% potential revenue loss due to manual handling"],
  },
  {
    emoji: "🌍",
    title: "Undetected Illegal Mining & Environmental Risks",
    problem:
      "Illegal mining operations remain untracked and environmental damage is not measured or reported in real time.",
    solution:
      "Future expansion includes GPS tracking, drone-based volume detection, and AI-powered environmental reporting tools.",
    evidence: ["No system to detect unlicensed operations", "No mechanism for tracking environmental impact", "Risk of regulatory failure and ecosystem damage"],
  },
  {
    emoji: "🤝",
    title: "Poor Stakeholder Collaboration & Data Access",
    problem:
      "Key partner agencies lack access to centralised systems, relying on manual communication which causes delays in decision-making.",
    solution:
      "Multi-role dashboards and secure access for external stakeholders enable joint workflows and faster approvals.",
    evidence: ["Fragmented data sharing between departments", "Delayed coordination between GSMB and partner bodies", "No unified platform for collaborative decision-making"],
  },
];

const features = [
  { icon: "📄", title: "Fully Digital Licensing", desc: "End-to-end digital workflow for mining licenses, eliminating paper-based delays." },
  { icon: "🤖", title: "AI Chatbot", desc: "Instant support and guidance for users navigating the platform." },
  { icon: "🗺️", title: "Digital Map", desc: "Interactive map for visualising mining locations and live activities." },
  { icon: "🧮", title: "Royalty Calculator", desc: "Automated, accurate royalty calculations with real-time reporting." },
  { icon: "🔒", title: "Anonymous Complaints", desc: "Securely report issues and concerns without revealing identity." },
  { icon: "🔔", title: "Real-Time Updates", desc: "Stay informed with instant notifications across all workflows." },
];

const outcomes = [
  { value: "40%", label: "Improved Operational Efficiency" },
  { value: "85%", label: "Reduction in Manual Data Entry Errors" },
  { value: "95%", label: "User Adoption Rate" },
  { value: "1M+", label: "Licence Applications Addressed Annually" },
];

const futureVision = [
  { icon: "📱", title: "Mobile App Integration" },
  { icon: "🧠", title: "AI-Powered Environmental Insights" },
  { icon: "⛏️", title: "Rock & Mineral Extraction Tracking" },
  { icon: "🚛", title: "Illegal Transport Detection" },
  { icon: "📊", title: "Dashboards for External Authorities" },
  { icon: "🚁", title: "Drone-Based AI Volume Tracking" },
];


const siteVisits = [
  { src: "/pics/ceylonmine/image1.jpg", caption: "Winning moment at Cutting Edge 2025 – 2nd Runners-up 🏆" },
  { src: "/pics/ceylonmine/image2.jpg", caption: "Presenting our mining solution to GSMB" },
  { src: "/pics/ceylonmine/image3.jpg", caption: "Pitching the CeylonMine concept to GSMB" },
  { src: "/pics/ceylonmine/image4.jpg", caption: "Gaining practical insights from active mining environments" },
  { src: "/pics/ceylonmine/image5.jpg", caption: "Receiving feedback from GSMB Officials after demo presentation" },
  { src: "/pics/ceylonmine/image6.jpg", caption: "Visiting GSMB Office with IIT Lecturers" },
  { src: "/pics/ceylonmine/image7.jpg", caption: "Exploring real-world mining operations during field visit" },
  { src: "/pics/ceylonmine/image8.jpg", caption: "Visitor pass for official meeting at GSMB headquarters" },
  { src: "/pics/ceylonmine/image9.jpg", caption: "On-site visit to a rock mining location" },
  { src: "/pics/ceylonmine/image10.jpeg", caption: "Collaborative meeting at GSMB with IIT Lecturers" },
  { src: "/pics/ceylonmine/image11.jpeg", caption: "Team discussion with academic mentors and GSMB representatives" },
  { src: "/pics/ceylonmine/image12.jpg", caption: "Presenting innovative solutions for the mining sector" },
  { src: "/pics/ceylonmine/image13.jpeg", caption: "Discussion with GSMB Chairman on CeylonMine" },
  { src: "/pics/ceylonmine/image14.jpeg", caption: "Presenting CeylonMine to the GSMB Director Board" },
  { src: "/pics/ceylonmine/image15.jpeg", caption: "Gained new insights while showcasing CeylonMine" },
  { src: "/pics/ceylonmine/image16.jpeg", caption: "Proud moment holding our achievement!" },
  { src: "/pics/ceylonmine/image17.jpeg", caption: "Learning and presenting at IIT Cutting Edge 2025" },
  { src: "/pics/ceylonmine/image18.jpeg", caption: "Presenting CeylonMine at IIT Cutting Edge 2025" },
  { src: "/pics/ceylonmine/image19.png", caption: "What GSMB Says About CeylonMine" },
];

const SLIDES = Array.from({ length: 15 }, (_, i) => `/presentation/${i + 1}.png`);

function CeylonMineDetail() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  const goSlide = (dir: 1 | -1) => {
    setSlideDir(dir);
    setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (!lightbox) {
        if (e.key === "ArrowRight") goSlide(1);
        if (e.key === "ArrowLeft") goSlide(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b py-16 sm:py-20"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-2 text-sm font-medium">
              <Link href="/projects" className="transition-opacity hover:opacity-70" style={{ color: "var(--brand)" }}>
                Projects
              </Link>
              <span style={{ color: "var(--muted-fg)" }}>/</span>
              <span style={{ color: "var(--muted-fg)" }}>CeylonMine</span>
            </div>

            {/* Award badge */}
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)", color: "var(--brand)" }}
            >
              🏆 2nd Runners-up · IIT Cutting Edge 2025
            </span>

            <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl" style={{ color: "var(--foreground)" }}>
              Ceylon<GradientText>Mine</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-medium" style={{ color: "var(--muted-fg)" }}>
              Revolutionising Mining Operations in Sri Lanka
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              A smart ERP platform built to digitalise and streamline Sri Lanka's mining sector—simplifying
              licence processing, royalty tracking, and data management for government and private stakeholders.
            </p>

            {/* Meta badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: "⏱️", label: "6 Months" },
                { icon: "👥", label: "4 Developers" },
                { icon: "💻", label: "Full-Stack Developer" },
                { icon: "✅", label: "GSMB Endorsed" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://ceylonmine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                <span>↗</span> Live Demo
              </a>
              <a
                href="https://github.com/Janindu02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
      <section className="border-b py-14" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {techStack.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                >
                  <div className="relative h-10 w-10">
                    <Image src={t.icon} alt={t.name} fill className="object-contain" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-fg)" }}>{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem Space ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              🤔 Problem Space
            </span>
            <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Problems to Solve
            </h2>
            <p className="mb-10 max-w-2xl text-base" style={{ color: "var(--muted-fg)" }}>
              Sri Lanka's mining sector processes over 1 million licence applications annually through outdated,
              manual systems — causing project delays, revenue loss, and lack of visibility.
            </p>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <h3 className="text-base font-bold leading-snug" style={{ color: "var(--foreground)" }}>
                    {p.title}
                  </h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                  <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>Problem: </strong>
                  {p.problem}
                </p>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                  <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>Solution: </strong>
                  {p.solution}
                </p>
                <ul className="space-y-1.5 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                  {p.evidence.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-xs" style={{ color: "var(--muted-fg)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>→</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ───────────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Key Features
            </h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl border p-5 transition-shadow hover:shadow-md"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "var(--foreground)" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── GSMB Endorsement ───────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              Official Endorsements & Collaboration
            </span>
            <h2 className="mb-4 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Why CeylonMine?
            </h2>
            <p className="mb-8 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              CeylonMine was developed in close collaboration with the{" "}
              <strong style={{ color: "var(--foreground)" }}>Geological Survey & Mines Bureau (GSMB)</strong> and
              guided by supervisors at the Informatics Institute of Technology (IIT). This wasn't just academic — it
              was built on real-world requirements, stakeholder feedback, and official data.
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Data Collection Letter */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">📄</span>
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>Data Collection Permission Letter</h3>
              </div>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                Granting us access to gather real operational data directly from GSMB for accurate and context-aware system design.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLightbox("/pics/ceylonmine/sample2.png")}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Image src="/pics/ceylonmine/sample2.png" alt="GSMB Data Collection Letter 1" fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="200px" />
                  <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}>
                    <span className="text-xs font-semibold text-white">View</span>
                  </div>
                </button>
                <button
                  onClick={() => setLightbox("/pics/ceylonmine/sample3.png")}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Image src="/pics/ceylonmine/sample3.png" alt="GSMB Data Collection Letter 2" fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="200px" />
                  <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}>
                    <span className="text-xs font-semibold text-white">View</span>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Implementation Approval */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">✅</span>
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>Implementation Approval Letter</h3>
              </div>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                Acknowledging the successful completion of the system and approving it for internal deployment
                within the institution. GSMB has already considered it for future implementation.
              </p>
              <div
                className="overflow-hidden rounded-xl border shadow-md"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/pics/ceylonmine/sample1.png"
                    alt="GSMB Implementation Approval Letter"
                    fill
                    className="object-contain"
                    sizes="(max-width:768px) 100vw, 600px"
                  />
                </div>
                <div className="px-4 py-3 text-center" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    🏛️ Geological Survey &amp; Mines Bureau
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-fg)" }}>
                    Official approval granted for internal deployment and future live implementation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Presentation Slideshow ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              Cutting Edge 2025
            </span>
            <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Presentation Slides
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--muted-fg)" }}>
              Slides from our official presentation. Use arrows or keyboard ← → to navigate.
            </p>
          </FadeIn>

          {/* Main slide viewer */}
          <div
            className="relative overflow-hidden rounded-2xl border shadow-xl"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            {/* Slide */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <AnimatePresence mode="wait" custom={slideDir}>
                <motion.div
                  key={slide}
                  custom={slideDir}
                  initial={{ opacity: 0, x: slideDir * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDir * -80 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDES[slide]}
                    alt={`CeylonMine Presentation Slide ${slide + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width:768px) 100vw, 1200px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Expand button */}
              <button
                onClick={() => setLightbox(SLIDES[slide])}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-opacity hover:opacity-80"
                style={{ background: "rgba(0,0,0,0.45)" }}
                aria-label="View full size"
              >
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Side arrow — prev */}
              <button
                onClick={() => goSlide(-1)}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-opacity hover:opacity-80"
                style={{ background: "rgba(0,0,0,0.45)" }}
                aria-label="Previous slide"
              >
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Side arrow — next */}
              <button
                onClick={() => goSlide(1)}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-opacity hover:opacity-80"
                style={{ background: "rgba(0,0,0,0.45)" }}
                aria-label="Next slide"
              >
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide counter + dot nav */}
            <div className="flex items-center justify-between gap-4 px-5 py-3" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--muted-fg)" }}>
                {slide + 1} / {SLIDES.length}
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setSlideDir(i > slide ? 1 : -1); setSlide(i); }}
                    aria-label={`Go to slide ${i + 1}`}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === slide ? "1.5rem" : "0.5rem",
                      height: "0.5rem",
                      background: i === slide ? "var(--brand)" : "var(--border)",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs" style={{ color: "var(--muted-fg)" }}>← → keys</span>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-15">
            {SLIDES.map((src, i) => (
              <button
                key={i}
                onClick={() => { setSlideDir(i > slide ? 1 : -1); setSlide(i); }}
                className="relative aspect-[16/9] overflow-hidden rounded-lg border-2 transition-all duration-200"
                style={{
                  borderColor: i === slide ? "var(--brand)" : "transparent",
                  opacity: i === slide ? 1 : 0.55,
                }}
                aria-label={`Slide ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo Portals ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div
              className="mb-8 rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--brand) 8%, var(--card))" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">🚧</span>
                <div>
                  <p className="font-semibold" style={{ color: "var(--foreground)" }}>Demo Version Only</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                    This showcases a demo version of CeylonMine. We are currently in the implementation and
                    approval phase with GSMB. Due to GSMB's request, the live version cannot be fully hosted until
                    official approval is granted. Some features are intentionally limited in this version.
                  </p>
                </div>
              </div>
            </div>
            <h2 className="mb-8 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              CeylonMine Demo Platform
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { label: "User Portal", href: "https://ceylonmine.vercel.app", img: "/pics/ceylonmine/Picture1.png" },
              { label: "Admin Portal", href: "https://ceylonmine-admin.vercel.app", img: "/pics/ceylonmine/Picture2.png" },
            ].map((portal) => (
              <motion.div
                key={portal.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-2xl border shadow-md"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={portal.img}
                    alt={portal.label}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <p className="font-bold" style={{ color: "var(--foreground)" }}>{portal.label}</p>
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--brand)" }}
                  >
                    Visit Demo ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Challenges & Solutions ─────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Challenges & Solutions
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <h3 className="mb-5 flex items-center gap-2 font-bold text-lg" style={{ color: "var(--foreground)" }}>
                <span>⚡</span> Challenges Faced
              </h3>
              <ul className="space-y-3">
                {[
                  "Integrating multiple data sources from various mining equipment",
                  "Ensuring real-time data accuracy and reliability",
                  "Designing an intuitive interface for non-technical users",
                  "Implementing robust security measures for sensitive mining data",
                  "Optimising performance for large datasets",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0 text-red-400">✕</span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <h3 className="mb-5 flex items-center gap-2 font-bold text-lg" style={{ color: "var(--foreground)" }}>
                <span>💡</span> Solutions Implemented
              </h3>
              <ul className="space-y-3">
                {[
                  "Developed a modular API architecture for seamless data integration",
                  "Implemented data validation and error handling mechanisms",
                  "Created user-centred design with extensive user testing",
                  "Built role-based access control and encryption protocols",
                  "Utilised efficient database indexing and caching strategies",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Project Outcomes ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Project Outcomes
            </h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <p className="text-4xl font-bold" style={{ color: "var(--brand)" }}>{o.value}</p>
                <p className="mt-2 text-sm leading-snug" style={{ color: "var(--muted-fg)" }}>{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future Vision ──────────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Future Vision & Expansion
            </h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {futureVision.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 rounded-2xl border px-5 py-4"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <span className="text-2xl shrink-0">{v.icon}</span>
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{v.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research & Site Visits ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-3 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Research & Site Visits
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--muted-fg)" }}>
              Click any photo to view full size.
            </p>
          </FadeIn>
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {siteVisits.map((v, i) => (
              <motion.button
                key={v.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setLightbox(v.src)}
                className="group mb-4 block w-full overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="relative w-full" style={{ paddingBottom: i % 3 === 0 ? "133%" : "75%" }}>
                  <Image
                    src={v.src}
                    alt={v.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}
                  >
                    <p className="text-left text-xs font-medium text-white leading-snug line-clamp-2">{v.caption}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="border-t py-14" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Interested in working together?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm" style={{ color: "var(--muted-fg)" }}>
              Currently interning at HP Innovations. Open to collaborations and conversations about what we can build together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                ← Back to Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                Get In Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────────────────────── */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-h-[90vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox}
              alt="Full size view"
              className="mx-auto max-h-[90vh] w-auto rounded-xl object-contain shadow-2xl"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

// ─── Generic project fallback ────────────────────────────────────────────────

function GenericProjectDetail({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  return (
    <>
      <section className="border-b py-16 sm:py-20" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Link href="/projects" className="transition-opacity hover:opacity-70" style={{ color: "var(--brand)" }}>
                Projects
              </Link>
              <span style={{ color: "var(--muted-fg)" }}>/</span>
              <span style={{ color: "var(--muted-fg)" }}>{project.title}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--foreground)" }}>
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--muted-fg)" }}>{project.shortDesc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
              >
                {project.category}
              </span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b py-8" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border shadow-lg" style={{ borderColor: "var(--border)" }}>
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 1200px" priority />
          </div>
        </div>
      </section>

      <section className="py-14" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="space-y-4">
              {project.fullDesc.split("\n\n").map((para, i) => {
                if (para.startsWith("##")) {
                  return <h2 key={i} className="text-2xl font-bold mt-8" style={{ color: "var(--foreground)" }}>{para.replace("## ", "")}</h2>;
                }
                return <p key={i} className="text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>{para}</p>;
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="border-t py-14" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn><h2 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>Gallery</h2></FadeIn>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img, i) => (
                <motion.div key={img} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border shadow-md" style={{ borderColor: "var(--border)" }}>
                  <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 100vw, 33vw" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t py-14" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/projects" className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold hover:opacity-80 transition-opacity" style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}>
                ← Back to Projects
              </Link>
              <Link href="/contact" className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: "var(--brand)" }}>
                Get In Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ─── Plane Seat Management System ───────────────────────────────────────────

const planeTech = [
  { emoji: "☕", name: "Java", role: "Language" },
  { emoji: "🍃", name: "Spring Boot", role: "Backend" },
  { emoji: "🏗️", name: "OOP", role: "Architecture" },
  { emoji: "🗄️", name: "MySQL", role: "Database" },
  { emoji: "⚡", name: "Angular", role: "Frontend" },
  { emoji: "⚛️", name: "React.js", role: "Prototype" },
  { emoji: "🧮", name: "Algorithms", role: "Logic" },
];

const planeProblems = [
  { emoji: "🎯", title: "Inaccurate Seat Allocation", desc: "Due to inefficient data models and poor seat management algorithms." },
  { emoji: "⚠️", title: "Scheduling Conflicts", desc: "Caused by lack of centralised control and real-time synchronisation." },
  { emoji: "📱", title: "Poor User Experience", desc: "Difficult seat selection and booking management online." },
  { emoji: "🔄", title: "Real-time Synchronisation", desc: "Lack of efficient real-time updates for seat availability." },
];

const planeFeatures = [
  "Dynamic Seat Selection UI with live updates on seat availability",
  "OOP-based Flight & Booking Models using Java",
  "Spring Boot Backend with MySQL integration",
  "Booking History & Management system",
  "API Integration with RESTful services",
  "User Authentication & Role-based access",
  "Responsive design for mobile devices",
  "Real-time seat allocation algorithms",
];

const planeOutcomes = [
  { value: "50%", label: "Improved Seat Allocation Efficiency" },
  { value: "70%", label: "Reduced Booking Conflicts" },
  { value: "200", label: "Concurrent Reservations Supported" },
  { value: "100%", label: "Streamlined Admin Operations" },
];

const planeGoals = [
  { emoji: "🏗️", title: "OOP Implementation", desc: "Implement Object-Oriented Programming concepts and real-world algorithmic logic to simulate aviation systems." },
  { emoji: "⚡", title: "Scalable Platform", desc: "Develop a scalable full-stack booking platform with robust data handling and real-time feedback." },
  { emoji: "🎨", title: "User Experience", desc: "Provide a clean, user-focused interface to enhance the reservation experience." },
];

const planeTechHighlights = [
  { emoji: "🧮", title: "Algorithm", desc: "Optimised seat allocation logic for conflict resolution" },
  { emoji: "🏗️", title: "OOP Design Principles", desc: "Modelling flights, users, and seats with clean architecture" },
  { emoji: "🍃", title: "Spring Boot + MySQL", desc: "Robust data storage and transaction management" },
  { emoji: "⚡", title: "Responsive Angular", desc: "Interactive user experience with real-time updates" },
  { emoji: "🧪", title: "Load Testing", desc: "200 concurrent sessions to validate scalability" },
  { emoji: "⚛️", title: "React Prototype", desc: "Alternative frontend implementation for comparison" },
];

function PlaneSeatDetail() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b py-16 sm:py-20"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-5 flex items-center gap-2 text-sm font-medium">
              <Link href="/projects" className="transition-opacity hover:opacity-70" style={{ color: "var(--brand)" }}>
                Projects
              </Link>
              <span style={{ color: "var(--muted-fg)" }}>/</span>
              <span style={{ color: "var(--muted-fg)" }}>Plane Seat Management System</span>
            </div>

            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)", color: "var(--brand)" }}
            >
              ✈️ Advanced Aviation Booking Platform
            </span>

            <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl" style={{ color: "var(--foreground)" }}>
              Plane Seat <GradientText>Management</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              A comprehensive seat management and booking system for private aviation, featuring real-time seat
              allocation, user authentication, and an intuitive interface for both passengers and administrators.
              Built with Java, Spring Boot, and Angular with advanced OOP principles and algorithms.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: "📅", label: "January 2025 – April 2025" },
                { icon: "👤", label: "Solo Developer" },
                { icon: "💻", label: "Full-Stack Developer" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/Janindu02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
      <section className="border-b py-14" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              🛠️ Technologies Used
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {planeTech.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}
                >
                  <span className="text-3xl">{t.emoji}</span>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted-fg)" }}>{t.role}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem Space ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              🤔 Problem Space
            </span>
            <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Challenges in Private Aviation Booking
            </h2>
            <p className="mb-10 max-w-2xl text-base" style={{ color: "var(--muted-fg)" }}>
              Private aviation booking systems suffer from inefficiencies that lead to conflicts, poor user
              experience, and revenue loss.
            </p>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {planeProblems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <span className="mb-3 block text-3xl">{p.emoji}</span>
                <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-fg)" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem Statement & Solution ───────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              🚧 Problem Statement & Solution
            </h2>
          </FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-7"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">👉</span>
              <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                Inefficient Seat Allocation & Booking Conflicts
              </h3>
            </div>

            <div className="mb-6 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>⚠️ Problem Statement</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                Private aviation booking systems often suffer from inaccurate seat allocation, booking overlaps,
                and poor scalability when handling multiple reservations in real-time.
              </p>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>✅ Implemented Solution</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { emoji: "☕", title: "Java-based Engine", desc: "Seat management engine using OOP and algorithms." },
                  { emoji: "🍃", title: "Spring Boot Backend", desc: "MySQL for persistent data storage and transactions." },
                  { emoji: "⚡", title: "Angular Frontend", desc: "Responsive interface with real-time seat selection." },
                  { emoji: "🔗", title: "API Integration", desc: "Smooth communication across modules with clean architecture." },
                ].map((s) => (
                  <div key={s.title} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                    <span className="shrink-0 text-xl">{s.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</p>
                      <p className="text-xs" style={{ color: "var(--muted-fg)" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-5" style={{ borderColor: "var(--border)" }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>📊 Impact</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "📈", text: "Improved seat allocation efficiency by 50%" },
                  { icon: "🔧", text: "Reduced booking and scheduling conflicts by 70%" },
                  { icon: "🚀", text: "Supported up to 200 concurrent reservations" },
                ].map((impact) => (
                  <span
                    key={impact.text}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                    style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
                  >
                    {impact.icon} {impact.text}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Features ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🧠 Key Features</h2>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2">
            {planeFeatures.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-xl border px-5 py-4"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>🚀</span>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{f}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Goals ──────────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🎯 Project Goals</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-3">
            {planeGoals.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span className="mb-3 block text-4xl">{g.emoji}</span>
                <h3 className="mb-2 font-bold" style={{ color: "var(--foreground)" }}>{g.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── User Stories ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🧑‍💻 User Stories</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                emoji: "👨‍✈️",
                type: "Admin / Airline Staff",
                goals: ["Manage flights and seat maps", "View all bookings and user activity"],
                needs: ["Error-free booking data", "Conflict-free schedules"],
              },
              {
                emoji: "🧍‍♂️",
                type: "Passenger",
                goals: ["Book and manage seats easily", "View availability in real-time"],
                needs: ["Mobile-friendly interface", "Intuitive seat selection"],
              },
            ].map((u) => (
              <motion.div
                key={u.type}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{u.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>User Type</p>
                    <p className="font-bold" style={{ color: "var(--foreground)" }}>{u.type}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold" style={{ color: "var(--foreground)" }}>🎯 Goals</p>
                  <ul className="space-y-1">
                    {u.goals.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted-fg)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>•</span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                  <p className="mb-2 text-xs font-semibold" style={{ color: "var(--foreground)" }}>💡 Needs</p>
                  <ul className="space-y-1">
                    {u.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted-fg)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>•</span>{n}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Highlights ───────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>⚙️ Technical Highlights</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {planeTechHighlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span className="shrink-0 text-2xl">{h.emoji}</span>
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "var(--foreground)" }}>{h.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Challenges & Solutions ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>Challenges & Solutions</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <h3 className="mb-5 flex items-center gap-2 font-bold text-lg" style={{ color: "var(--foreground)" }}>
                ⚠️ Challenges Faced
              </h3>
              <ul className="space-y-3">
                {[
                  "Implementing real-time seat availability updates",
                  "Ensuring data consistency across concurrent bookings",
                  "Designing scalable database architecture",
                  "Creating intuitive user interface for seat selection",
                  "Managing booking conflicts and overlaps",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0 text-red-400">🔥</span>{c}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <h3 className="mb-5 flex items-center gap-2 font-bold text-lg" style={{ color: "var(--foreground)" }}>
                ✅ Solutions Implemented
              </h3>
              <ul className="space-y-3">
                {[
                  "Implemented WebSocket connections for real-time updates",
                  "Used database transactions and locking mechanisms",
                  "Designed normalised database schema with proper indexing",
                  "Created interactive seat map with drag-and-drop functionality",
                  "Developed Double-Lobby algorithm for conflict resolution",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>💡</span>{s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Outcomes ───────────────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🏆 Project Outcomes</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {planeOutcomes.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <p className="text-4xl font-bold" style={{ color: "var(--brand)" }}>{o.value}</p>
                <p className="mt-2 text-sm leading-snug" style={{ color: "var(--muted-fg)" }}>{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Interested in working together?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm" style={{ color: "var(--muted-fg)" }}>
              Currently interning at HP Innovations. Open to collaborations and conversations about what we can build together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                ← Back to Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                Get In Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ─── Coding Lanka ────────────────────────────────────────────────────────────

const clTech = [
  { emoji: "📘", name: "TypeScript", role: "Language" },
  { emoji: "⚛️", name: "React", role: "Frontend" },
  { emoji: "🚀", name: "Next.js", role: "Framework" },
  { emoji: "🎨", name: "TailwindCSS", role: "Styling" },
];

const clProblems = [
  { emoji: "🎯", title: "Information Overload & Lack of Direction", desc: "Thousands of free tutorials exist, but learners don't know where to start or how to structure their journey." },
  { emoji: "🏫", title: "University-Industry Skill Gap", desc: "University curriculums often lag behind current industry tools, languages, and workflows." },
  { emoji: "📈", title: "Unawareness of Trending Tools and Roles", desc: "Many learners don't know which technologies are currently in demand in the job market." },
  { emoji: "🌐", title: "No Central Hub for Free Learning Paths", desc: "People need a reliable place to find high-quality resources in a job-focused learning path." },
];

const clFeatures = [
  "Structured learning paths for Front-End, Back-End, Full-Stack, DevOps, UI/UX, and more",
  "Centralised hub for free resources including YouTube tutorials, blogs, and documentation",
  "Mobile-optimised responsive design for access on any device",
  "Open-source contribution system for developers to suggest and add content",
  "Smart search and filtering to quickly find relevant learning materials",
  "Regular updates based on user feedback to improve content and usability",
  "Learning paths aligned with real-world job roles and industry trends",
  "Clean, fast, and scalable architecture built with Next.js, TypeScript, and Tailwind CSS",
];

const clOutcomes = [
  { value: "500+", label: "Learners on Structured Paths" },
  { value: "50%", label: "Increased User Engagement (First 3 Months)" },
  { value: "40%", label: "Improved Navigation Efficiency" },
  { value: "8", label: "Supported Career Tracks" },
];

const clSatisfaction = [
  {
    stakeholder: "Learners",
    current: "Confused, unmotivated, and directionless",
    desired: "Confident, clear about goals, job-ready with practical skills",
  },
  {
    stakeholder: "Universities",
    current: "Limited curriculum scope",
    desired: "Able to guide students toward real-world tools and trends",
  },
  {
    stakeholder: "Contributors",
    current: "Lack platform to share valuable free resources",
    desired: "Can collaborate, contribute, and build a global learning hub",
  },
];

const clScreenshots = [
  { src: "/pics/codinglanka/photo1.jpeg", label: "Homepage Overview" },
  { src: "/pics/codinglanka/photo2.jpeg", label: "Learning Paths" },
  { src: "/pics/codinglanka/photo3.jpeg", label: "Resource Hub" },
  { src: "/pics/codinglanka/photo4.jpeg", label: "Mobile Responsive" },
  { src: "/pics/codinglanka/photo5.jpeg", label: "User Interface" },
];

function CodingLankaDetail() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b py-16 sm:py-20"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-5 flex items-center gap-2 text-sm font-medium">
              <Link href="/projects" className="transition-opacity hover:opacity-70" style={{ color: "var(--brand)" }}>
                Projects
              </Link>
              <span style={{ color: "var(--muted-fg)" }}>/</span>
              <span style={{ color: "var(--muted-fg)" }}>Coding Lanka</span>
            </div>

            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)", color: "var(--brand)" }}
            >
              🌐 Open-Source Learning Platform
            </span>

            <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl" style={{ color: "var(--foreground)" }}>
              Coding<GradientText>Lanka</GradientText>
            </h1>
            <p className="mt-2 text-xl font-medium" style={{ color: "var(--muted-fg)" }}>
              Learn Software Engineering for Free
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              A free and open-source learning platform for anyone who wants to learn software development. It
              collects the best free YouTube videos, blogs, and online guides to help learners follow step-by-step
              paths — whether you're a university student or self-taught.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: "⏱️", label: "4 Months" },
                { icon: "👥", label: "2 Open-Source Developers" },
                { icon: "💻", label: "Full-Stack Developer" },
                { icon: "🆓", label: "Fully Free & Open-Source" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://codinglanka.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                ↗ Live Demo
              </a>
              <a
                href="https://github.com/Janindu02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Hero Image ─────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border shadow-xl cursor-pointer"
            style={{ borderColor: "var(--border)" }}
            onClick={() => setLightbox("/pics/codinglanka/photo1.jpeg")}
          >
            <Image
              src="/pics/codinglanka/photo1.jpeg"
              alt="Coding Lanka Platform"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 1200px"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
      <section className="border-b py-14" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              🛠️ Technologies Used
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {clTech.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                >
                  <span className="text-4xl">{t.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-fg)" }}>{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem Space ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              🤔 Problem Space
            </span>
            <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Problems to Solve
            </h2>
            <p className="mb-10 max-w-2xl text-base" style={{ color: "var(--muted-fg)" }}>
              Free learning resources exist in abundance, but without structure, direction, or quality curation,
              most learners struggle to make meaningful progress.
            </p>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clProblems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span className="mb-3 block text-3xl">{p.emoji}</span>
                <h3 className="mb-2 text-sm font-bold leading-snug" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-fg)" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem Statements & Solutions ─────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              🚧 Problem Statements & Solutions
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {[
              {
                title: "Unstructured Learning Paths",
                problem: "Self-learners and even computer science students often waste time and energy figuring out where to start and what to learn next. The absence of structured paths discourages many from continuing their learning journey.",
                solution: "We created multiple curated learning tracks (front-end, back-end, full-stack, UI/UX, DevOps) based on real industry job roles. These tracks include YouTube playlists, blog posts, documentation, and GitHub projects, all categorised and ordered for clarity.",
                evidence: [
                  "Learners often say they get stuck trying to figure out what to learn first",
                  "Popularity of roadmap-related GitHub repos shows demand for structured learning",
                  'Many beginner forums ask, "How do I start learning web development?"',
                ],
              },
              {
                title: "University-Industry Skill Gap",
                problem: "There's a noticeable mismatch between what's taught in university curriculums and the skills required by tech companies today.",
                solution: "The platform includes up-to-date tools and workflows used by developers in the industry — Git, Docker, CI/CD, JavaScript frameworks, and cloud tools — helping learners stay relevant.",
                evidence: [
                  "Many graduates fail job interviews due to lack of practical skillsets",
                  "Recruiters prefer candidates who demonstrate job-ready projects and tool familiarity",
                ],
              },
            ].map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span>👉</span>
                  <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>Problem: {s.title}</h3>
                </div>
                <div className="mb-4 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>⚠️ Problem Statement</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{s.problem}</p>
                </div>
                <div className="mb-4 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>✅ Current Solution</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{s.solution}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>📊 How we know it's a problem</p>
                  <ul className="space-y-1.5">
                    {s.evidence.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-xs" style={{ color: "var(--muted-fg)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>→</span>{e}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Solve These Problems ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>✅ Why Solve These Problems?</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { emoji: "🚀", title: "Empower Learners", desc: "Anyone, regardless of background, can follow structured paths and build a strong portfolio using free resources." },
              { emoji: "🌉", title: "Bridge the Gap", desc: "Helps universities and self-learners align more closely with industry expectations." },
              { emoji: "🎯", title: "Increase Opportunity Access", desc: "Reduces reliance on expensive bootcamps or formal degrees to land a job in tech." },
            ].map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span className="mb-3 block text-4xl">{w.emoji}</span>
                <h3 className="mb-2 font-bold" style={{ color: "var(--foreground)" }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── User Satisfaction Matrix ───────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 text-3xl font-bold" style={{ color: "var(--foreground)" }}>📈 User Satisfaction Matrix</h2>
          </FadeIn>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "color-mix(in srgb, var(--brand) 10%, var(--muted))" }}>
                  <th className="px-6 py-4 text-left font-bold" style={{ color: "var(--foreground)" }}>Stakeholder</th>
                  <th className="px-6 py-4 text-left font-bold" style={{ color: "var(--foreground)" }}>Current State</th>
                  <th className="px-6 py-4 text-left font-bold" style={{ color: "var(--foreground)" }}>Desired State</th>
                </tr>
              </thead>
              <tbody>
                {clSatisfaction.map((row, i) => (
                  <tr
                    key={row.stakeholder}
                    className="border-t"
                    style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "var(--card)" : "var(--muted)" }}
                  >
                    <td className="px-6 py-4 font-semibold" style={{ color: "var(--foreground)" }}>{row.stakeholder}</td>
                    <td className="px-6 py-4" style={{ color: "var(--muted-fg)" }}>{row.current}</td>
                    <td className="px-6 py-4" style={{ color: "var(--muted-fg)" }}>{row.desired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Goals ──────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🎯 Goals</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-bold" style={{ color: "var(--foreground)" }}>
                🏢 Company Objective
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
                To democratise software engineering education by creating a free, AI-assisted, community-driven
                platform that delivers structured and job-oriented learning paths.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-bold" style={{ color: "var(--foreground)" }}>
                🎯 Project Goals
              </h3>
              <ul className="space-y-2">
                {[
                  "Build a full-stack web application using Next.js, TypeScript, Tailwind CSS",
                  "Curate and organise free high-quality resources from YouTube, GitHub, blogs, and docs",
                  "Enable community contribution so developers can add/update learning paths",
                  "Ensure mobile and desktop compatibility for learners across devices",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>→</span>{g}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── User Stories ───────────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🧑‍🤝‍🧑 User Stories</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                emoji: "👨‍🎓",
                type: "Beginner Learner (Self-Taught or Student)",
                goals: ["Learn software engineering from scratch for free", "Find the best path to become a front-end/back-end/full-stack developer"],
                needs: ["A structured, guided learning path with zero confusion", "Free and accessible resources"],
                other: ["May not have a formal degree", "Interested in building projects and landing a job"],
              },
              {
                emoji: "👨‍💻",
                type: "Contributor (Experienced Developer or Mentor)",
                goals: ["Contribute valuable content to help others", "Collaborate with an open-source community"],
                needs: ["Ability to submit/edit learning paths and links", "A review system for quality control"],
                other: ["Passionate about teaching and open source", "May work in the industry or as a senior university student"],
              },
            ].map((u) => (
              <motion.div
                key={u.type}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{u.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>User Type</p>
                    <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{u.type}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="mb-2 text-xs font-semibold" style={{ color: "var(--foreground)" }}>🎯 Goals</p>
                  <ul className="space-y-1">
                    {u.goals.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-xs" style={{ color: "var(--muted-fg)" }}>
                        <span className="shrink-0" style={{ color: "var(--brand)" }}>•</span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3 border-t pt-3" style={{ borderColor: "var(--border)" }}>
                  <p className="mb-2 text-xs font-semibold" style={{ color: "var(--foreground)" }}>💡 Needs</p>
                  <ul className="space-y-1">
                    {u.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-xs" style={{ color: "var(--muted-fg)" }}>
                        <span className="shrink-0" style={{ color: "var(--brand)" }}>•</span>{n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
                  <p className="mb-2 text-xs font-semibold" style={{ color: "var(--foreground)" }}>👤 Other Characteristics</p>
                  <ul className="space-y-1">
                    {u.other.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-xs" style={{ color: "var(--muted-fg)" }}>
                        <span className="shrink-0" style={{ color: "var(--brand)" }}>•</span>{o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>✨ Key Features</h2>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2">
            {clFeatures.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-xl border px-5 py-4"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>🚀</span>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{f}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Challenges & Solutions ─────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>Challenges & Solutions</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <h3 className="mb-5 font-bold text-lg" style={{ color: "var(--foreground)" }}>⚠️ Challenges Faced</h3>
              <ul className="space-y-3">
                {[
                  "Structuring diverse learning paths using free online resources",
                  "Ensuring accuracy and quality of third-party content",
                  "Designing a user-friendly and scalable front-end architecture",
                  "Encouraging open-source contributions while maintaining content standards",
                  "Improving engagement and navigation for first-time learners",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0 text-red-400">🔥</span>{c}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
            >
              <h3 className="mb-5 font-bold text-lg" style={{ color: "var(--foreground)" }}>✅ Solutions Implemented</h3>
              <ul className="space-y-3">
                {[
                  "Mapped curated learning tracks for various roles using verified tutorials and documentation",
                  "Manually reviewed and categorised each resource for relevancy and clarity",
                  "Built with Next.js, TypeScript, and Tailwind CSS for scalability and responsiveness",
                  "Integrated a contribution system with GitHub workflows and review processes",
                  "Added category filters and quick links based on user feedback for smoother navigation",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-fg)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>💡</span>{s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Outcomes ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>🏆 Project Outcomes</h2>
          </FadeIn>
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clOutcomes.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <p className="text-4xl font-bold" style={{ color: "var(--brand)" }}>{o.value}</p>
                <p className="mt-2 text-xs leading-snug" style={{ color: "var(--muted-fg)" }}>{o.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Helped over 500+ learners follow structured software engineering paths",
              "Increased user engagement by 50% within the first 3 months",
              "Improved navigation efficiency by 40% based on user feedback",
              "Boosted returning visitor rate through consistent weekly activity",
              "Enabled easy access to job-relevant skills and resources without cost",
              "Encouraged open-source collaboration among aspiring developers",
              "Reduced learner confusion by centralising high-quality, curated content",
              "Improved platform usability across devices with responsive design",
            ].map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 rounded-xl border px-4 py-3"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span className="shrink-0" style={{ color: "var(--brand)" }}>🎉</span>
                <p className="text-sm" style={{ color: "var(--muted-fg)" }}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots ────────────────────────────────────────────────────── */}
      <section className="border-y py-14 sm:py-16" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-3 text-3xl font-bold" style={{ color: "var(--foreground)" }}>📸 Project Screenshots</h2>
            <p className="mb-8 text-sm" style={{ color: "var(--muted-fg)" }}>Click any image to view full size.</p>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clScreenshots.map((s, i) => (
              <motion.button
                key={s.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setLightbox(s.src)}
                className={`group overflow-hidden rounded-2xl border shadow-md hover:shadow-xl transition-shadow${i === 0 ? " sm:col-span-2 lg:col-span-2" : ""}`}
                style={{ borderColor: "var(--border)" }}
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={s.src}
                    alt={s.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 66vw"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.55))" }}
                  >
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Interested in working together?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm" style={{ color: "var(--muted-fg)" }}>
              Currently interning at HP Innovations. Open to collaborations and conversations about what we can build together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
              >
                ← Back to Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                Get In Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────────────────────── */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-h-[90vh] max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Full size" className="mx-auto max-h-[90vh] w-auto rounded-xl object-contain shadow-2xl" />
          </div>
        </motion.div>
      )}
    </>
  );
}

// ─── Route entry point ───────────────────────────────────────────────────────

export default function ProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

  if (slug === "ceylonmine") {
    return <CeylonMineDetail />;
  }

  if (slug === "plane-seat") {
    return <PlaneSeatDetail />;
  }

  if (slug === "learning-platform") {
    return <CodingLankaDetail />;
  }

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return <GenericProjectDetail slug={slug} />;
}
