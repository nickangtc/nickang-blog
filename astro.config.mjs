import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import { remarkRewriteImages } from "./src/plugins/remark-rewrite-images.mjs";

export default defineConfig({
  site: "https://nickang.com",
  integrations: [react()],
  adapter: netlify(),
  output: "static",
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkRewriteImages],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
