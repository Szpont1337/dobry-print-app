import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        // Druga warstwa zabezpieczenia poza robots.txt: odpowiedzi na RSC
        // payload requests (?_rsc=<hash>) dostają noindex, gdyby jakiś bot
        // zignorował robots.txt albo reguła została kiedyś usunięta. Nagłówek
        // jest neutralny dla przeglądarek, więc nie warunkujemy po User-Agent.
        source: "/:path*",
        has: [{ type: "query", key: "_rsc" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
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
  async redirects() {
    return [
      {
        // No /produkty index page — canonical product listing is the
        // #produkty section on the home page.
        source: "/produkty",
        destination: "/#produkty",
        permanent: true,
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
