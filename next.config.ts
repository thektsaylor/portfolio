import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain static files in /out so the site can live on any host.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
