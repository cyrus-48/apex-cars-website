import type { ManifestOptions } from 'vite-plugin-pwa'

export const pwaManifest: Partial<ManifestOptions> = {
  name: 'Apex Cars',
  short_name: 'Apex',
  description: 'Electric performance cars engineered for the edge.',
  theme_color: '#0B0B0B',
  background_color: '#EFEFEF',
  display: 'standalone',
  start_url: '/',
  icons: [
    { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}
