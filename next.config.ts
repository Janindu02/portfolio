import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config acknowledges Next.js 16's default Turbopack bundler.
  // Turbopack handles WASM natively; no extra config needed for @react-three/rapier.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
