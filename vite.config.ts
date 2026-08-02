import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig(() => {

  return {
    plugins: [tanstackRouter(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      port: 9012,
      proxy: {
        "/api/v1/auth": {
          target: "http://localhost:8081",
          changeOrigin: true,
        },
        "/api/v1": {
          target: "http://localhost:9002",
          changeOrigin: true,
        },
      },
    },
  };
});
