import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.new-brz.net",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "files.foxtrot.com.ua",
      },
      {
        protocol: "https",
        hostname: "volti.ua",
      },
      {
        protocol: "https",
        hostname: "img.moyo.ua",
      },
      {
        protocol: "https",
        hostname: "i.dell.com",
      },
      {
        protocol: "https",
        hostname: "i.moyo.ua",
      },
      {
        protocol: "https",
        hostname: "www.ipeople.in.ua",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "www.ultimateears.com",
      },
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
      },
      {
        protocol: "https",
        hostname: "cdn.comfy.ua",
      },
      {
        protocol: "https",
        hostname: "portativ.ua",
      },
      {
        protocol: "https",
        hostname: "i.citrus.world",
      },
      {
        protocol: "https",
        hostname: "content2.rozetka.com.ua",
      },
      {
        protocol: "https",
        hostname: "res.garmin.com",
      },
      {
        protocol: "https",
        hostname: "kvshop.com.ua",
      },
      {
        protocol: "https",
        hostname: "platform.polygon.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
