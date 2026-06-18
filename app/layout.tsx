import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Janindu Amaraweera — Software Engineering Portfolio",
  description:
    "Third-year Software Engineering undergraduate at the University of Westminster. Full-stack developer, open-source contributor, and 2nd Runners-up at Cutting Edge 2025.",
};

/* Prevents flash of wrong theme before hydration */
const antiFlicker = `
  try {
    const t = localStorage.getItem('theme');
    const d = t || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', d);
  } catch(e) {}
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlicker }} />
      </head>
      <body className="min-h-full font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
