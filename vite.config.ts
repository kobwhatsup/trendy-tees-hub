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
  base: '',  // 使用相对路径
  build: {
    outDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录
    sourcemap: true,
    // 添加 copyPublicDir 确保 public 目录下的文件被正确复制
    copyPublicDir: true
  },
});