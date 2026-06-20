import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow higher-quality optimized images for the hero carousel infographics.
    // Next.js 16 restricts qualities to [75] by default.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
