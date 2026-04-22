import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@kgalexander/mcreate-react'],
  experimental: {
    optimizePackageImports: ['@kgalexander/mcreate-react'],
  },
  outputFileTracingRoot: path.join(__dirname, "../"),
  serverExternalPackages: ['mjml', 'mjml-core', 'mjml-validator', 'uglify-js'],
};

export default nextConfig;
