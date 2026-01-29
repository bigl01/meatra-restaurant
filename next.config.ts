import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ Опасно: разрешает продакшн сборку даже с ошибками TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Опасно: разрешает продакшн сборку даже с ошибками ESLint
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'my-restuaran.local',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.qazan-rest.ru',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
