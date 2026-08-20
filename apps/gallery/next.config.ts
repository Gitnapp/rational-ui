import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@gitnapp/ui", "@gitnapp/web-shell"],
  // Keeps the ergonomic `import { X } from "lucide-react"` shadcn generates
  // everywhere, while still getting per-icon direct imports at build time
  // (see vercel react-best-practices: bundle-barrel-imports).
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
