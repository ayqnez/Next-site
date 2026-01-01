import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/emotions/:path*",
        destination: "http://localhost:8080/api/emotions/:path*",
      },
    ];
  }
};

module.exports = nextConfig;


export default nextConfig;
