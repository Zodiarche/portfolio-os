import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy, rarely-changing vendor code into long-cacheable chunks
        // so an app change does not invalidate the whole bundle.
        manualChunks: {
          mui: ["@mui/material", "@mui/system", "@emotion/react", "@emotion/styled"],
          motion: ["framer-motion"],
          rnd: ["react-rnd"],
        },
      },
    },
  },
});
