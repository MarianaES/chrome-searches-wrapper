import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/chrome-searches-wrapper",
  devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
