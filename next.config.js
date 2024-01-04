/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
