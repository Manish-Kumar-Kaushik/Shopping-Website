import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["*.loca.lt", "*.githubpreview.dev", "*.gitpod.io", "localhost:3000", "192.168.1.25"],
};

export default nextConfig;
