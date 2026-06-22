import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable modern formats for automatic format negotiation
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Allow remote images from Supabase storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kezzhxqzybukpgkijbnz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // www → non-www (permanent 301 redirect)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.architassociates.com" }],
        destination: "https://architassociates.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
