"use client";

import { useEffect, useRef } from "react";

/* Dotted flat world map with animated SVG arc.
   Draws a dot-grid approximation of a world map on <canvas>.
   No external dependencies. */

const DOTS: [number, number][] = [
  // North America
  [14,8],[15,7],[16,7],[17,7],[18,7],[19,8],[20,8],[21,9],[22,9],[23,10],[24,10],
  [14,9],[15,9],[16,9],[17,9],[18,9],[19,9],[20,9],[21,10],[22,10],
  [15,10],[16,10],[17,10],[18,10],[19,10],[20,10],[21,11],[22,11],
  [17,11],[18,11],[19,11],[20,11],[21,12],
  [18,12],[19,12],[20,12],[20,13],[21,13],
  // South America
  [22,14],[23,14],[24,14],[22,15],[23,15],[24,15],[22,16],[23,16],
  [22,17],[23,17],[22,18],[23,18],[23,19],[23,20],
  // Europe
  [46,6],[47,6],[48,6],[49,6],[50,6],[51,6],[52,7],[53,7],[54,7],[55,7],
  [46,7],[47,7],[48,7],[49,7],[50,7],[51,7],[52,8],[53,8],[54,8],
  [46,8],[47,8],[48,8],[49,8],[50,8],[51,8],[52,9],[53,9],
  [47,9],[48,9],[49,9],[50,9],[51,9],
  // Africa
  [48,11],[49,11],[50,11],[51,11],[52,11],
  [48,12],[49,12],[50,12],[51,12],[52,12],
  [48,13],[49,13],[50,13],[51,13],
  [48,14],[49,14],[50,14],[51,14],
  [49,15],[50,15],[49,16],[50,16],[49,17],[50,17],
  // Asia
  [56,6],[57,6],[58,6],[59,6],[60,6],[61,6],[62,6],[63,7],[64,7],[65,7],[66,7],[67,7],[68,7],[69,8],[70,8],[71,8],[72,8],[73,8],[74,8],[75,8],
  [56,7],[57,7],[58,7],[59,7],[60,7],[61,7],[62,7],[63,8],[64,8],[65,8],[66,8],[67,8],[68,8],[70,9],[71,9],[72,9],[73,9],[74,9],[75,9],[76,9],
  [57,8],[58,8],[59,8],[60,8],[61,8],[62,8],[63,9],[64,9],[65,9],[66,9],[67,9],[68,9],[69,9],[71,10],[72,10],[73,10],[74,10],[75,10],[76,10],
  [58,9],[59,9],[60,9],[61,9],[62,9],[63,10],[64,10],[65,10],[66,10],[67,10],[68,10],[69,10],[72,11],[73,11],[74,11],[75,11],
  [60,10],[61,10],[62,10],[63,11],[64,11],[65,11],[66,11],[67,11],[68,11],
  [61,11],[62,11],[63,12],[64,12],[65,12],[66,12],[67,12],
  [63,13],[64,13],[65,13],[66,13],[67,13],
  // Australia
  [72,16],[73,16],[74,16],[75,16],[76,16],
  [72,17],[73,17],[74,17],[75,17],[76,17],
  [72,18],[73,18],[74,18],[75,18],
  [73,19],[74,19],
];

const LOCATIONS = [
  { name: "Sri Lanka", col: 66, row: 13, color: "#2563eb" },
  { name: "London",   col: 48, row: 7,  color: "#7c3aed" },
];

export function WorldMap({
  width = 700,
  height = 340,
  dotColor,
  arcColor = "#2563eb",
}: {
  width?: number;
  height?: number;
  dotColor?: string;
  arcColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cols = 90;
    const rows = 26;
    const cellW = width  / cols;
    const cellH = height / rows;
    const r = Math.min(cellW, cellH) * 0.38;

    let progress = 0; // 0 → 1 arc draw progress

    const dc = dotColor ??
      (document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(255,255,255,0.15)"
        : "rgba(0,0,0,0.12)");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // dots
      for (const [c, row] of DOTS) {
        const x = (c + 0.5) * cellW;
        const y = (row + 0.5) * cellH;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = dc;
        ctx.fill();
      }

      // location dots
      for (const loc of LOCATIONS) {
        const x = (loc.col + 0.5) * cellW;
        const y = (loc.row + 0.5) * cellH;
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = loc.color;
        ctx.fill();
      }

      // arc between locations
      if (LOCATIONS.length >= 2) {
        const [a, b] = LOCATIONS;
        const ax = (a.col + 0.5) * cellW;
        const ay = (a.row + 0.5) * cellH;
        const bx = (b.col + 0.5) * cellW;
        const by = (b.row + 0.5) * cellH;
        const cx2 = (ax + bx) / 2;
        const cy2 = Math.min(ay, by) - height * 0.22;

        ctx.save();
        ctx.strokeStyle = arcColor;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.moveTo(ax, ay);

        // Draw arc up to current progress
        const steps = 60;
        const total = Math.ceil(steps * progress);
        for (let i = 1; i <= total; i++) {
          const t = i / steps;
          const px = (1 - t) ** 2 * ax + 2 * (1 - t) * t * cx2 + t ** 2 * bx;
          const py = (1 - t) ** 2 * ay + 2 * (1 - t) * t * cy2 + t ** 2 * by;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
      }

      progress = Math.min(progress + 0.012, 1);
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, dotColor, arcColor]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto max-w-full"
      aria-label="World map showing Sri Lanka and London"
    />
  );
}
