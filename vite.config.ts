/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'
import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import { imagetools } from 'vite-imagetools'
import { compression } from 'vite-plugin-compression2'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import { SITE } from './src/data/site.ts'
import { ROUTE_PATHS } from './src/data/navigation.ts'
import { pwaManifest } from './pwa.manifest.ts'

const analyze = process.env.ANALYZE === 'true'

function writeSitemap() {
  const urls = ROUTE_PATHS.map(
    (path) => `  <url><loc>${SITE.url}${path === '/' ? '/' : `${path}/`}</loc></url>`,
  ).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync(fileURLToPath(new URL('./dist/sitemap.xml', import.meta.url)), xml)
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Icons({ compiler: 'vue3', scale: 1, defaultClass: 'icon' }),
    imagetools({
      // Strip metadata and keep quality sensible for every generated variant.
      defaultDirectives: () => new URLSearchParams({ quality: '72' }),
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      manifest: pwaManifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,svg,webmanifest}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
    compression({ algorithms: ['brotliCompress'], exclude: [/\.(avif|webp|jpg|png|woff2)$/] }),
    analyze &&
      (visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
  ssgOptions: {
    entry: 'src/app/main.ts',
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    beastiesOptions: { preload: 'media', reduceInlineStyles: false },
    onFinished: writeSitemap,
  },
  ssr: {
    noExternal: ['@vueuse/core'],
  },
})
