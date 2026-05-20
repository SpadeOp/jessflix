import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "www.vidking.net" },
    ],
  },
}

export default nextConfig
