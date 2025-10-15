const CACHE_NAME = 'calculator-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/script.js',
  '/style.css'
];

// Install the service worker and cache files
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate SW immediately
});

// Activate the SW and clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          // Update the cache with fresh response
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => {
          // If offline, serve cached version
          return cache.match(event.request);
        });
    })
  );
});
