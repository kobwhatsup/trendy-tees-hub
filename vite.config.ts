import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: "::",
  },
  base: '',  // 设置为空字符串,这样资源引用会使用相对路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});