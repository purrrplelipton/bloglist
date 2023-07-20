import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": ["/src/assets"],
      "@components": ["/src/components"],
      "@contexts": ["/src/contexts"],
      "@pages": ["/src/pages"],
      "@services": ["/src/services"],
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
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
