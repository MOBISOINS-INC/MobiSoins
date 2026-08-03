import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'i.pravatar.cc' },
      { hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
