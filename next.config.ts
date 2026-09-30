import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cream-house-lime.vercel.app" }],
  },
};
export default nextConfig;
