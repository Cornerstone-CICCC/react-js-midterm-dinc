import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  domains: ['cdn.dummyjson.com']
};

export default nextConfig;
