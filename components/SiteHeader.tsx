"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { NAV, PORTRAIT } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

/* ─────────────────────────────────────────────────────────────────────
   Liquid-glass morphing navbar.

   Architecture
   ─────────────
   • A single fixed <motion.header> whose visual properties
     (top / border-radius / max-width / padding) are all continuous
     MotionValues derived from scroll position via a spring.
   • No boolean state flip → zero "snap" artefact.
   • The glass background + saturate blur stays constant; only
     max-width and border-radius change, so the transparency never
     jumps.
   • A shadow/shine overlay fades in as the pill forms, giving the
     "rim-lit glass capsule" look.
───────────────────────────────────────────────────────────────────── */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen]   = useState(false);

  /* ── Scroll → spring ─────────────────────────────────────────────
     Scroll 0→90 px maps to progress 0→1.
     Spring stiffness 65 / damping 13 → critically-smooth, no bounce.
     Every visual property is a continuous transform of `p`.
  ──────────────────────────────────────────────────────────────────*/
  const { scrollY } = useScroll();
  const raw  = useTransform(scrollY, [0, 90], [0, 1], { clamp: true });
  const p    = useSpring(raw, { stiffness: 65, damping: 13, mass: 0.5 });

  const top          = useTransform(p, [0, 1], [0,    14]);
  const radius       = useTransform(p, [0, 1], [0,    9999]);
  const maxWidth     = useTransform(p, [0, 1], [3840, 780]);
  const paddingX     = useTransform(p, [0, 1], [28,   18]);
  const shineOpacity = useTransform(p, [0, 1], [0,    1]);

  return (
    <>
      {/* ── Desktop header ────────────────────────────────────────── */}
      <motion.header
        className="fixed z-50 hidden md:block"
        style={{
          /* Geometry */
          top,
          borderRadius: radius,
          maxWidth,
          width: "100%",
          left: "50%",
          x: "-50%",
          paddingLeft:  paddingX,
          paddingRight: paddingX,

          /* Liquid glass */
          background:           "var(--glass-bg)",
          backdropFilter:       "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",

          /* Border: thin white rim → looks like light catching glass */
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Rim-light + drop-shadow layer — fades in with the pill */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: shineOpacity,
            boxShadow: [
              "inset 0 1px 0 var(--glass-shine)",   /* top-edge light */
              "0 8px 32px rgba(0,0,0,0.13)",
              "0 2px 8px  rgba(0,0,0,0.07)",
            ].join(", "),
          }}
        />

        <div className="relative flex h-14 items-center justify-between gap-4">
          <Logo />

          {/* Nav links with animated active-pill */}
          <nav className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150"
                  style={{ color: active ? "var(--brand)" : "var(--muted-fg)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                      }}
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: theme toggle + avatar */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/about" className="relative">
              <Image
                src={PORTRAIT}
                alt="Janindu Amaraweera"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 2px var(--glass-border)" }}
              />
              <span
                className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 0 2px var(--background)" }}
              />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Spacer so content doesn't hide behind the fixed bar */}
      <div className="hidden h-14 md:block" />

      {/* ── Mobile header ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 md:hidden"
        style={{
          background:           "var(--glass-bg)",
          backdropFilter:       "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderBottom:         "1px solid var(--glass-border)",
          boxShadow:            "inset 0 -1px 0 var(--glass-border)",
        }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: "var(--glass-border)", color: "var(--foreground)" }}
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              style={{
                borderTop:  "1px solid var(--glass-border)",
                background: "var(--glass-bg)",
                backdropFilter:       "blur(20px) saturate(1.8)",
                WebkitBackdropFilter: "blur(20px) saturate(1.8)",
              }}
            >
              <nav className="flex flex-col gap-1 p-3">
                {NAV.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
                      style={{
                        color: active ? "var(--brand)" : "var(--foreground)",
                        background: active
                          ? "color-mix(in srgb, var(--brand) 10%, transparent)"
                          : "transparent",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="my-1 border-t" style={{ borderColor: "var(--glass-border)" }} />
                <Link href="/about" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium" style={{ color: "var(--muted-fg)" }}>About Me</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium" style={{ color: "var(--muted-fg)" }}>Contact</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
