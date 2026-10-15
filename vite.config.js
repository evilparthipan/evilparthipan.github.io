import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: "src",
  plugins: [
    {
      name: "alpine-cdn-for-production",
      apply: "build",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return html.replace(
            /<script type="module" src="\.\/profile-panel\.js"><\/script>/g,
            '<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.17.4/dist/cdn.min.js"></script>',
          );
        },
      },
    },
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(projectRoot, "src/index.html"),
        about: resolve(projectRoot, "src/about.html"),
      },
    },
  },
  define: {
    // Stamped at build time so each deploy is visibly different.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
});
