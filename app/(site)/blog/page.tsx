import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { PORTRAIT } from "@/lib/site";
import { fetchMediumPosts, type MediumPost } from "@/lib/medium";
import { GradientText } from "@/components/ui/gradient-text";

const MEDIUM_USERNAME = "janiduamaraweera";
const MEDIUM_PROFILE = `https://medium.com/@${MEDIUM_USERNAME}`;

/* Derive unique category labels from post data */
function deriveCategories(posts: MediumPost[]) {
  const counts: Record<string, number> = {};
  for (const p of posts) {
    for (const c of p.categories) {
      counts[c] = (counts[c] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({ label, count }));
}

export default async function BlogPage() {
  const posts = await fetchMediumPosts(MEDIUM_USERNAME);

  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  const categories = deriveCategories(posts);
  const topTags = [
    ...new Set(posts.flatMap((p) => p.categories)),
  ].slice(0, 12);

  return (
    <>
      {/* ── Hero / header ─────────────────────────────────────── */}
      <section
        className="border-b py-14 sm:py-16"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "color-mix(in srgb, var(--brand) 10%, transparent)",
                color: "var(--brand)",
              }}
            >
              {/* Medium M icon */}
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              Published on Medium
            </span>

            <h1
              className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: "var(--foreground)" }}
            >
              Writing on{" "}
              <GradientText>Software &amp; Open Source</GradientText>
            </h1>
            <p
              className="mt-4 max-w-2xl text-lg"
              style={{ color: "var(--muted-fg)" }}
            >
              Long-form articles on full-stack engineering, open-source projects,
              and lessons learned building software in Sri Lanka and beyond.
            </p>

            <a
              href={MEDIUM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-80"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              Follow on Medium
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </FadeIn>

          {/* Featured article */}
          {featured && (
            <FadeIn className="mt-10" delay={0.08}>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl p-8 text-white shadow-xl sm:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                }}
              >
                {/* Glow orbs */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl opacity-40"
                  style={{ background: "var(--brand)" }}
                />
                <div
                  className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full blur-2xl opacity-25"
                  style={{ background: "#60a5fa" }}
                />

                <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Latest Article
                </span>

                <h2 className="relative mt-4 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl group-hover:underline decoration-white/40">
                  {featured.title}
                </h2>

                <p className="relative mt-3 max-w-xl text-sm text-white/70 line-clamp-2">
                  {featured.description}
                </p>

                <div className="relative mt-4 flex flex-wrap items-center gap-3 text-xs text-white/60">
                  <span>{featured.formattedDate}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                  {featured.categories[0] && (
                    <>
                      <span>·</span>
                      <span>{featured.categories[0]}</span>
                    </>
                  )}
                </div>

                <div className="relative mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity group-hover:opacity-80"
                  style={{ background: "var(--brand)" }}
                >
                  Read on Medium
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            </FadeIn>
          )}

          {/* Empty state — no posts fetched yet */}
          {posts.length === 0 && (
            <FadeIn className="mt-10" delay={0.08}>
              <div
                className="rounded-2xl border p-10 text-center"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <svg
                  className="mx-auto h-10 w-10 opacity-30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "var(--brand)" }}
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                <p
                  className="mt-4 text-base font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Articles loading from Medium
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--muted-fg)" }}
                >
                  Can&apos;t reach the feed right now.{" "}
                  <a
                    href={MEDIUM_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: "var(--brand)" }}
                  >
                    Read directly on Medium
                  </a>
                  .
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Post list + sidebar ────────────────────────────────── */}
      {rest.length > 0 && (
        <section
          className="py-14 sm:py-16"
          style={{ background: "var(--muted)" }}
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_300px] lg:gap-12 lg:px-8">
            {/* Posts */}
            <div>
              <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  All Articles
                  <span
                    className="ml-2 text-sm font-normal"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    ({rest.length} posts)
                  </span>
                </h2>
                <a
                  href={MEDIUM_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "var(--brand)" }}
                >
                  View on Medium
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </FadeIn>

              <div className="mt-8 space-y-5">
                {rest.map((post, i) => (
                  <FadeIn key={post.link} delay={0.04 * i}>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group card-hover block rounded-2xl border p-6 shadow-sm"
                      style={{
                        background: "var(--card)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {/* Meta row */}
                      <div
                        className="flex flex-wrap items-center gap-3 text-xs font-medium"
                        style={{ color: "var(--muted-fg)" }}
                      >
                        {post.categories[0] && (
                          <span style={{ color: "var(--brand)" }}>
                            {post.categories[0]}
                          </span>
                        )}
                        <span>{post.formattedDate}</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className="mt-3 text-lg font-bold group-hover:underline decoration-[var(--muted-fg)] underline-offset-4"
                        style={{ color: "var(--foreground)" }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        className="mt-2 text-sm leading-relaxed line-clamp-2"
                        style={{ color: "var(--muted-fg)" }}
                      >
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div
                        className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <div
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "var(--muted-fg)" }}
                        >
                          <Image
                            src={PORTRAIT}
                            alt=""
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                          />
                          Janindu Amaraweera
                        </div>
                        <div
                          className="flex flex-wrap gap-1.5 text-xs"
                          style={{ color: "var(--muted-fg)" }}
                        >
                          {post.categories.slice(0, 3).map((c) => (
                            <span
                              key={c}
                              className="rounded-full border px-2 py-0.5"
                              style={{
                                borderColor: "var(--border)",
                                background: "var(--surface)",
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                ))}
              </div>

              {/* CTA to Medium */}
              <FadeIn className="mt-10 text-center">
                <a
                  href={MEDIUM_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                  }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                  Read all articles on Medium
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* About writer */}
              <FadeIn>
                <div
                  className="rounded-2xl border p-5 shadow-sm"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={PORTRAIT}
                      alt="Janindu Amaraweera"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--foreground)" }}
                      >
                        Janindu Amaraweera
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--muted-fg)" }}
                      >
                        Software Engineering · IIT / UoW
                      </p>
                    </div>
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    Writing about full-stack engineering, open-source projects,
                    and software development from Sri Lanka.
                  </p>
                  <a
                    href={MEDIUM_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                      color: "var(--foreground)",
                    }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                    Follow on Medium
                  </a>
                </div>
              </FadeIn>

              {/* Categories */}
              {categories.length > 0 && (
                <FadeIn delay={0.05}>
                  <div
                    className="rounded-2xl border p-5 shadow-sm"
                    style={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Topics
                    </p>
                    <ul className="mt-4 space-y-3">
                      {categories.map((c) => (
                        <li key={c.label}>
                          <div
                            className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm"
                            style={{ color: "var(--surface-fg)" }}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: "var(--brand)" }}
                              />
                              {c.label}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "var(--muted-fg)" }}
                            >
                              {c.count}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Tags */}
              {topTags.length > 0 && (
                <FadeIn delay={0.1}>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--muted-fg)" }}
                    >
                      Tags
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {topTags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border px-3 py-1 text-xs"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--card)",
                            color: "var(--surface-fg)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </aside>
          </div>
        </section>
      )}

      {/* ── Newsletter ──────────────────────────────────────────── */}
      <section
        className="border-t py-14"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                className="text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--foreground)" }}
              >
                Enjoyed the writing?
              </h2>
              <p className="mt-3" style={{ color: "var(--muted-fg)" }}>
                Follow on Medium to get notified when new articles drop.
              </p>
              <ul
                className="mt-4 space-y-2 text-sm"
                style={{ color: "var(--surface-fg)" }}
              >
                <li>• Practical tutorials on software engineering</li>
                <li>• Open-source project write-ups</li>
                <li>• Lessons from building in Sri Lanka and globally</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={MEDIUM_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "var(--brand)" }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                Follow on Medium
              </a>
              <Link
                href="/contact"
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border py-3 text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                  color: "var(--foreground)",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
