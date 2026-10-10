import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  define: {
    // Stamped at build time so each deploy is visibly different.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
});
