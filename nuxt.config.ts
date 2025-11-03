export default defineNuxtConfig({
  modules: ['@pinia/nuxt','@nuxtjs/tailwindcss','@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    workbox: {
      globPatterns: ['**/*.{html,js,css,woff2,png,svg,ico,json}'],
      navigateFallback: '/',              // fallback para rutas SPA
      cleanupOutdatedCaches: true,
    },
    manifest: {
      name: 'Notas Rápidas',
      short_name: 'Notas',
      start_url: '/',
      display: 'standalone',
      theme_color: '#3b82f6',
      background_color: '#ffffff',
      icons: [
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ]
    },
    devOptions: { enabled: true } // útil en pruebas
  },

  // para App Platform (static):
  nitro: { preset: 'vercel' }, // o quita tu 'node-server'
  ssr: false
})
