// import { fileURLToPath, URL } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["styled-jsx/babel"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
