const CACHE_NAME = 'starbox-v1';
const urlsToCache = [
  './',
  './index.html',
  './strophe.umd.min.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // لا نخزّن طلبات XMPP (BOSH)
  if (event.request.url.includes('/http-bind/')) {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});