import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import pagefind from "astro-pagefind";

export default defineConfig({
  site: "https://nickang.com",
  integrations: [react(), pagefind()],
  adapter: netlify(),
  output: "static",
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  markdown: {
    syntaxHighlight: "prism",
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
