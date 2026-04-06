import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ClaudeTest",
  images: { unoptimized: true },
};

export default nextConfig;
