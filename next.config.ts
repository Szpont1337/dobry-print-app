import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  experimental: {
    // Barrel-import optimization (bundle-barrel-imports). `lucide-react` is
    // already in Next's default list; `motion` and `@react-three/drei` aren't.
    optimizePackageImports: ["motion", "@react-three/drei"],
  },
};

export default nextConfig;
