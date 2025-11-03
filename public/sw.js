const CACHE_VERSION = 'v4';
const CACHE_NAME = `notas-rapidas-cache-${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',               
  '/index.html',     // fallback seguro para navegaciones
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico',
  '/nota/nueva'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // cache.addAll puede romperse con redirecciones; hacemos requests "cache: reload"
      await Promise.all(
        CORE_ASSETS.map(async (url) => {
          try {
            const req = new Request(url, { cache: 'reload' });
            const res = await fetch(req);
            if (res && res.ok) await cache.put(req, res.clone());
          } catch (e) {
            console.warn('[SW] No se pudo cachear:', url, e);
          }
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((n) => (n !== CACHE_NAME ? caches.delete(n) : undefined)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // solo mismo origen y GET
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isHTML = request.mode === 'navigate' ||
    request.headers.get('accept')?.includes('text/html');

  const isAsset = /\.(?:js|css|png|jpg|jpeg|svg|gif|woff2?|ttf|eot|ico)(\?.*)?$/.test(url.pathname);

  if (isHTML) {
    // Navegaciones: offline -> /index.html cacheado
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          // guarda copia fresca
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          // sin red: intenta la ruta pedida y si no, /index.html
          return (await caches.match(request)) ||
                 (await caches.match('/index.html')) ||
                 (await caches.match('/'));
        }
      })()
    );
    return;
  }

  if (isAsset) {
    // Assets: network-first, fallback a cache
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return (await caches.match(request)) || Response.error();
        }
      })()
    );
  }
});
