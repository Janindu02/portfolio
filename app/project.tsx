"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { GradientText } from "@/components/ui/gradient-text";
import { getProjectBySlug } from "@/lib/projects-data";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative border-b py-16 sm:py-20"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/projects"
                className="text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "var(--brand)" }}
              >
                Projects
              </Link>
              <span style={{ color: "var(--muted-fg)" }}>/</span>
              <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {project.title}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--muted-fg)" }}>
              {project.shortDesc}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "color-mix(in srgb, var(--brand) 10%, transparent)",
                  color: "var(--brand)",
                }}
              >
                {project.category}
              </span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:opacity-70"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Thumbnail Image */}
      <section
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--muted)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border shadow-lg"
            style={{ borderColor: "var(--border)" }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, (max-width:1024px) 90vw, 1200px"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div
              className="prose-lg space-y-6"
              style={{
                "--tw-prose-body": "var(--muted-fg)",
                "--tw-prose-headings": "var(--foreground)",
              } as React.CSSProperties}
            >
              {project.fullDesc.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("##")) {
                  const heading = paragraph.replace("## ", "");
                  return (
                    <h2
                      key={idx}
                      className="text-2xl font-bold mt-8 mb-4"
                      style={{ color: "var(--foreground)" }}
                    >
                      {heading}
                    </h2>
                  );
                }
                if (paragraph.startsWith("**")) {
                  return (
                    <p
                      key={idx}
                      className="text-base leading-relaxed"
                      style={{ color: "var(--muted-fg)" }}
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, "<strong style='font-weight: 600;'>$1</strong>: ")
                          .replace(/\*\*/g, ""),
                      }}
                    />
                  );
                }
                return (
                  <p
                    key={idx}
                    className="text-base leading-relaxed"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Technology Stack */}
      <section
        className="border-y py-14 sm:py-16"
        style={{ borderColor: "var(--border)", background: "var(--muted)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {project.tags.map((tag, idx) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 rounded-lg border px-4 py-3"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "var(--brand)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery.length > 0 && (
        <section className="py-14 sm:py-16" style={{ background: "var(--card)" }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
                Project Gallery
              </h2>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, idx) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border shadow-md hover:shadow-lg transition-shadow"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} gallery ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section
        className="border-t py-14"
        style={{ borderColor: "var(--border)", background: "var(--muted)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                  Interested in working together?
                </h2>
                <p className="mt-2" style={{ color: "var(--muted-fg)" }}>
                  I&apos;m seeking a 1-year internship starting 2025. Let&apos;s talk about what I can build for your team.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:opacity-80"
                  style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
                >
                  Back to Projects
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "var(--brand)" }}
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
