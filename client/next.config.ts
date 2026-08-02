import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  images: {
    // Next 16 rejects any `quality` not listed here with a 400 — the hero uses 90.
    qualities: [75, 90],
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'i.pravatar.cc' },
      { hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
