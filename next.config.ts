import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 关键修复：让 Neon 数据库驱动在运行时原生加载，
  // 避免 Turbopack 打包后连接挂起（Next.js 16 已知兼容问题）
  serverExternalPackages: ["@neondatabase/serverless"],
};

export default nextConfig;
