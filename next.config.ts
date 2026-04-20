import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product images are large local PNGs (5–8 MB).
    // unoptimized bypasses the image optimizer and serves them directly
    // from public/ — equivalent to a plain <img> but keeps next/image API.
    unoptimized: true,
  },
};

export default nextConfig;
