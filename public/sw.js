const CACHE_VERSION = 'v1'
const CACHE_NAME = `notas-rapidas-${CACHE_VERSION}`
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`

const STATIC_ASSETS = [
  '/',
  '/nota/nueva',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cacheando assets estáticos')
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })))
          .catch((error) => {
            console.warn('[Service Worker] Algunos assets no se pudieron cachear:', error)
            return Promise.resolve()
          })
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
    .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') {
    return
  }

  if (url.origin !== location.origin) {
    return
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return caches.open(RUNTIME_CACHE).then((cache) => {
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                cache.put(request, response.clone())
              }
              return response
            })
            .catch((error) => {
              console.log('[Service Worker] Fetch falló, intentando caché:', error)
              return caches.match(request)
            })
        })
      })
  )
})
