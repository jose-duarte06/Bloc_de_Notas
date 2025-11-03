// public/sw.js
const CACHE_VERSION = 'v4';                  // <- súbelo cuando cambies
const CACHE_NAME = `notas-rapidas-cache-${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',
  '/index.html',                              // <- importante
  '/nota/nueva',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        CORE_ASSETS.map((u) => cache.add(u).catch(() => {}))
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // solo mismo origen y GET
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html');
  const isAsset = /\.(js|css|png|jpg|jpeg|svg|gif|woff2?|ttf|eot|ico)(\?.*)?$/.test(url.pathname);

  if (isHTML) {
    // network-first con fallback a index
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        const clone = net.clone();
        caches.open(CACHE_NAME).then(c => c.put('/', clone));
        return net;
      } catch {
        const c = await caches.open(CACHE_NAME);
        return (await c.match(req)) || (await c.match('/')) || (await c.match('/index.html'));
      }
    })());
    return;
  }

  if (isAsset) {
    // cache-first, actualiza en bg
    event.respondWith((async () => {
      const c = await caches.open(CACHE_NAME);
      const hit = await c.match(req);
      if (hit) { fetch(req).then(r => r.ok && c.put(req, r.clone())).catch(()=>{}); return hit; }
      try {
        const net = await fetch(req);
        if (net.ok) c.put(req, net.clone());
        return net;
      } catch {
        return hit || Response.error();
      }
    })());
  }
});
