/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    domains: [
      "www.dropbox.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
      "avatars.githubusercontent.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
  compiler: {
    relay: {
      // This should match relay.config.js
      src: "./",
      artifactDirectory: "./__generated__",
      language: "typescript",
      eagerEsModules: false,
    },
  },
};

module.exports = nextConfig;
