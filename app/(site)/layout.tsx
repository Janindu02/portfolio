import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PageLoader } from "@/components/PageLoader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <PageLoader />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
