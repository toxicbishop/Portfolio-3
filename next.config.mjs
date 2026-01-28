/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/skills",
        destination: "/",
      },
      {
        source: "/projects",
        destination: "/",
      },
      {
        source: "/contact",
        destination: "/",
      },
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/experience",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
