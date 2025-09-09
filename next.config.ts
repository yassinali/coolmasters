import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "kisrj7912y.ufs.sh",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
