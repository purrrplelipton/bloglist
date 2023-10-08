import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vitePluginSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@contexts": resolve(__dirname, "src/contexts"),
      "@pages": resolve(__dirname, "src/pages"),
      "@services": resolve(__dirname, "src/services"),
      "@store": resolve(__dirname, "src/store"),
    },
  },
  css: { modules: { localsConvention: "camelCase" } },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  optimizeDeps: {
    include: ["@testing-library/jest-dom", "@testing-library/react", "ts-jest"],
  },
  build: { rollupOptions: { external: ["ts-jest"] } },
});
