"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";

export default function ResearchPage() {
  return (
    <>
      <section className="border-b py-14 sm:py-16" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)" }}
            >
              Scholar Profile
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--foreground)" }}>
              Research &amp; <GradientText>Publications</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--muted-fg)" }}>
              Exploring machine learning, generative AI, and distributed systems through rigorous inquiry and
              open-source contributions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-28 flex items-center justify-center min-h-screen" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn className="flex flex-col items-center justify-center text-center">
            <div className="mb-8 relative">
              <div
                className="animate-pulse"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "conic-gradient(var(--brand), transparent)",
                  animation: "spin-slow 3s linear infinite",
                }}
              >
                <style>{`
                  @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  .research-dot {
                    animation: bounce-dot 2s ease-in-out infinite;
                  }
                `}</style>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  width: "120px",
                  height: "120px",
                  background: "var(--card)",
                  borderRadius: "50%",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <svg className="h-12 w-12 research-dot" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
            </div>

            <h2 className="mt-12 text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
              I&apos;m <GradientText>Working on It</GradientText>
            </h2>

            <p className="mt-6 max-w-xl text-lg" style={{ color: "var(--muted-fg)" }}>
              My research papers and publications are currently being compiled. Stay tuned for updates on my latest work in machine learning and software engineering.
            </p>

            <div className="mt-10 flex gap-3 justify-center flex-wrap">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "var(--brand)",
                  color: "#fff",
                }}
              >
                Get in Touch
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
