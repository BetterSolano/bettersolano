/**
 * BetterSolano Service Worker
 * Enterprise-grade PWA with versioned caching, runtime strategies, and offline resilience.
 */

var CACHE_VERSION = 'v3';
var STATIC_CACHE = 'bettersolano-static-' + CACHE_VERSION;
var RUNTIME_CACHE = 'bettersolano-runtime-' + CACHE_VERSION;
var OFFLINE_URL = '/offline.html';

// Core shell: precached on install for instant offline load
var PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/assets/css/style.css',
  '/assets/css/responsive.css',
  '/assets/css/footer.css',
  '/assets/css/accessibility.css',
  '/assets/js/main.js',
  '/assets/js/translations.js',
  '/assets/js/info-bar.js',
  '/assets/images/logo/better-solano-logo.svg',
  '/assets/images/logo/better-solano-logo-white.svg',
  '/assets/images/logo/favicon.svg',
  '/assets/images/logo/favicon.ico',
  '/manifest.webmanifest',
];

// Max items in runtime cache to prevent unbounded growth
var RUNTIME_CACHE_LIMIT = 80;

// Max age for runtime-cached responses (7 days)
var RUNTIME_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// ─── Install ────────────────────────────────────────────────────────────────
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(function (cache) {
        // Use addAll for atomic precaching — if any fail, install fails
        return cache.addAll(PRECACHE_URLS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

// ─── Activate ───────────────────────────────────────────────────────────────
self.addEventListener('activate', function (event) {
  var currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (name) {
              return currentCaches.indexOf(name) === -1;
            })
            .map(function (name) {
              return caches.delete(name);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Trim a cache to a max number of entries (FIFO)
 */
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(function () {
          trimCache(cacheName, maxItems);
        });
      }
    });
  });
}

/**
 * Check if a cached response is still fresh
 */
function isFresh(response, maxAge) {
  if (!response) return false;
  var dateHeader = response.headers.get('date');
  if (!dateHeader) return true; // no date = assume fresh
  var age = Date.now() - new Date(dateHeader).getTime();
  return age < maxAge;
}

/**
 * Determine if a request is for a static asset
 */
function isStaticAsset(url) {
  return /\.(css|js|svg|ico|png|jpg|jpeg|webp|woff2?|ttf|eot|json)(\?.*)?$/i.test(url.pathname);
}

/**
 * Determine if a request is for a data/API endpoint
 */
function isDataRequest(url) {
  return url.pathname.startsWith('/data/') || url.hostname !== self.location.hostname;
}

// ─── Fetch Strategies ───────────────────────────────────────────────────────
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  // Skip non-GET requests and chrome-extension/devtools
  if (event.request.method !== 'GET') return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // ── Navigation requests: Network-first with offline fallback ──
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          // Cache successful navigation responses
          if (response.ok) {
            var clone = response.clone();
            caches.open(RUNTIME_CACHE).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function () {
          // Try cached version first, then offline page
          return caches.match(event.request).then(function (cached) {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // ── Static assets: Stale-while-revalidate ──
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        var fetchPromise = fetch(event.request)
          .then(function (response) {
            if (response.ok) {
              var clone = response.clone();
              caches.open(STATIC_CACHE).then(function (cache) {
                cache.put(event.request, clone);
              });
            }
            return response;
          })
          .catch(function () {
            return cached;
          });

        // Return cached immediately, update in background
        return cached || fetchPromise;
      })
    );
    return;
  }

  // ── Data/API requests: Network-first with short cache ──
  if (isDataRequest(url)) {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(RUNTIME_CACHE).then(function (cache) {
              cache.put(event.request, clone);
              trimCache(RUNTIME_CACHE, RUNTIME_CACHE_LIMIT);
            });
          }
          return response;
        })
        .catch(function () {
          return caches.match(event.request);
        })
    );
    return;
  }

  // ── Everything else: Cache-first with network fallback ──
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached && isFresh(cached, RUNTIME_MAX_AGE)) {
        return cached;
      }
      return fetch(event.request)
        .then(function (response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(RUNTIME_CACHE).then(function (cache) {
              cache.put(event.request, clone);
              trimCache(RUNTIME_CACHE, RUNTIME_CACHE_LIMIT);
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });
    })
  );
});

// ─── Background Sync (for future form submissions) ─────────────────────────
self.addEventListener('sync', function (event) {
  if (event.tag === 'sync-pending') {
    event.waitUntil(
      // Placeholder for background sync logic
      Promise.resolve()
    );
  }
});

// ─── Push Notifications (foundation) ────────────────────────────────────────
self.addEventListener('push', function (event) {
  if (!event.data) return;
  var data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'BetterSolano', {
      body: data.body || '',
      icon: '/assets/images/logo/favicon.svg',
      badge: '/assets/images/logo/favicon.svg',
      tag: data.tag || 'bettersolano-notification',
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url =
    event.notification.data && event.notification.data.url ? event.notification.data.url : '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(function (clients) {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].url === url && 'focus' in clients[i]) {
          return clients[i].focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
