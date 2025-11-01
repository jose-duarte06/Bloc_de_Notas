const CACHE_VERSION = 'v3'
const CACHE_NAME = `notas-rapidas-cache-${CACHE_VERSION}`

const CORE_ASSETS = [
  '/',
  '/nota/nueva',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico'
]

self.addEventListener('install', (event) => {
  console.log('[SW] Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets')
        return Promise.all(
          CORE_ASSETS.map((url) => {
            return cache.add(url).catch((err) => {
              console.warn('[SW] Failed to cache:', url, err)
            })
          })
        )
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
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

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  const isHTMLRequest = 
    request.headers.get('accept')?.includes('text/html') || 
    request.mode === 'navigate'
  
  const isAsset = /\.(js|css|png|jpg|jpeg|svg|gif|woff2?|ttf|eot|ico)(\?.*)?$/.test(url.pathname)

  if (isHTMLRequest) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            return caches.match('/')
          })
        })
    )
  } else if (isAsset) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
  }
})
