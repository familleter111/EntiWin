import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Toutes les pages sont statiques : elles sont servies en HTML pré-rendu,
  // et <Link> les précharge -> navigation quasi instantanée.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
