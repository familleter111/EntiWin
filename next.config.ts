import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Toutes les pages sont statiques : elles sont servies en HTML pré-rendu,
  // et <Link> les précharge -> navigation quasi instantanée.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Image de conteneur minimale : ne copie que les fichiers nécessaires à
  // l'exécution (server.js + node_modules élagués), cf. Dockerfile.
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          // nginx fait du buffering par défaut, ce qui casse le streaming
          // (Suspense/loading.tsx) de l'App Router.
          { key: "X-Accel-Buffering", value: "no" },
        ],
      },
    ];
  },
};

export default nextConfig;
