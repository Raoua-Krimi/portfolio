import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 90 for the case-study figures: their mockups carry small UI text that blurs at the default 75.
  images: { qualities: [75, 90] },
  cacheComponents: true,
  partialPrefetching: true,
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
