import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/claudetest",
  images: { unoptimized: true },
};

export default nextConfig;
