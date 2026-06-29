import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/drukarnia-:miasto",
        destination: "/drukarnia/:miasto",
      },
      {
        source: "/drukarnia-:miasto/:produkt",
        destination: "/drukarnia/:miasto/:produkt",
      },
    ];
  },
};

export default nextConfig;
