import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

const config = defineConfig({
  base: "/llm-benchmark-demo/",
  build: {
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        compact: true,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/").pop()?.split("/")[0]
          }

          return id.toString().split("/")[0]
        },
        validate: true,
      },
    },
  },
  clearScreen: false,
  esbuild: {
    target: "esnext",
  },
  plugins: [
    vue({
      include: [ /\.vue$/, /\.md$/ ],
      features: { optionsAPI: false },
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/global.scss",
      },
    }),
  ],
  preview: {
    port: 8000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8888,
  },
})

export default config
