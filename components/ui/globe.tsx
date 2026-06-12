"use client";

/* Arc Globe — simplified Aceternity-style arc globe.
   Uses canvas to draw a spherical projection with animated arcs.
   No external dependencies. */

import { useEffect, useRef } from "react";

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

const DEFAULT_ARCS: Arc[] = [
  { startLat: 6.9,  startLng: 79.9,  endLat: 51.5, endLng: -0.1,  color: "#2563eb" },
  { startLat: 51.5, startLng: -0.1,  endLat: 35.7, endLng: 139.7, color: "#7c3aed" },
  { startLat: 6.9,  startLng: 79.9,  endLat: 1.3,  endLng: 103.8, color: "#06b6d4" },
  { startLat: 6.9,  startLng: 79.9,  endLat: 25.2, endLng: 55.3,  color: "#2563eb" },
];

function latLngToXY(
  lat: number, lng: number,
  cx: number, cy: number, r: number,
  rotation: number
): [number, number] {
  const phi   = ((90 - lat)  * Math.PI) / 180;
  const theta = ((lng + rotation) * Math.PI) / 180;
  const x = cx + r * Math.sin(phi) * Math.cos(theta);
  const y = cy + r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);
  return z > 0 ? [x, y] : [NaN, NaN]; // hide back-face points
}

export function World({
  arcs = DEFAULT_ARCS,
  size = 360,
}: {
  arcs?: Arc[];
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r  = size * 0.42;

    const drawGlobe = (rot: number) => {
      ctx.clearRect(0, 0, size, size);

      // Sphere background
      const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      grad.addColorStop(0, "#1e3a5f");
      grad.addColorStop(1, "#07071a");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Atmosphere
      const atmo = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.08);
      atmo.addColorStop(0, "rgba(37,99,235,0.0)");
      atmo.addColorStop(1, "rgba(37,99,235,0.18)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      // Latitude lines
      ctx.strokeStyle = "rgba(96,165,250,0.07)";
      ctx.lineWidth = 0.7;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 3) {
          const [x, y] = latLngToXY(lat, lng, cx, cy, r, rot);
          if (isNaN(x)) { first = true; continue; }
          first ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          first = false;
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const [x, y] = latLngToXY(lat, lng, cx, cy, r, rot);
          if (isNaN(x)) { first = true; continue; }
          first ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          first = false;
        }
        ctx.stroke();
      }

      // Arcs
      for (const arc of arcs) {
        ctx.save();
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        let first = true;
        for (let t = 0; t <= 1; t += 0.02) {
          const lat = arc.startLat + (arc.endLat - arc.startLat) * t;
          const lng = arc.startLng + (arc.endLng - arc.startLng) * t;
          const [x, y] = latLngToXY(lat, lng, cx, cy, r * 1.04, rot);
          if (isNaN(x)) { first = true; continue; }
          first ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          first = false;
        }
        ctx.stroke();
        ctx.restore();
      }

      // Location dots
      const pins = [
        { lat: 6.9,  lng: 79.9,  color: "#2563eb", label: "Sri Lanka" },
        { lat: 51.5, lng: -0.1,  color: "#7c3aed", label: "London" },
        { lat: 35.7, lng: 139.7, color: "#06b6d4", label: "Tokyo" },
        { lat: 1.3,  lng: 103.8, color: "#06b6d4", label: "Singapore" },
      ];
      for (const p of pins) {
        const [x, y] = latLngToXY(p.lat, p.lng, cx, cy, r, rot);
        if (isNaN(x)) continue;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const animate = () => {
      rotRef.current = (rotRef.current + 0.18) % 360;
      drawGlobe(rotRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [arcs, size]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      aria-label="Interactive arc globe"
    />
  );
}
