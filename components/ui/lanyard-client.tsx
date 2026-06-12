"use client";

// ssr: false must live inside a Client Component in Next.js App Router.
// This wrapper is what server components (like contact/page.tsx) import.
import dynamic from "next/dynamic";
import type { LanyardProps } from "./lanyard";

const LanyardCanvas = dynamic(() => import("./lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-[280px] w-[190px] animate-pulse rounded-2xl"
        style={{ background: "var(--surface)" }}
      />
    </div>
  ),
});

export function LanyardClient(props: LanyardProps) {
  return <LanyardCanvas {...props} />;
}
