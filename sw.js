// Silv Market Service Worker — caches fonts, images, and shell HTML
const CACHE = 'silv-v3';
const FONT_CACHE = 'silv-fonts-v1';

// Static assets to pre-cache on install
const PRECACHE = [
  '/',
  '/account',
  '/loyalty',
  '/images/logo.png',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Don't intercept POST requests or bot API calls
  if (e.request.method !== 'GET') return;
  if (url.hostname === 'silvreview-production.up.railway.app') return;
  if (url.hostname === 'api.stripe.com') return;

  // Google Fonts — cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONT_CACHE).then(async c => {
        const cached = await c.match(e.request);
        if (cached) return cached;
        const fresh = await fetch(e.request);
        c.put(e.request, fresh.clone());
        return fresh;
      }).catch(() => fetch(e.request))
    );
    return;
  }

  // GitHub raw images — stale-while-revalidate (1 hour TTL)
  if (url.hostname === 'raw.githubusercontent.com') {
    e.respondWith(
      caches.open(CACHE).then(async c => {
        const cached = await c.match(e.request);
        const fetchPromise = fetch(e.request).then(fresh => {
          if (fresh.ok) c.put(e.request, fresh.clone());
          return fresh;
        }).catch(() => cached);
        // Serve cached immediately, refresh in background
        return cached || fetchPromise;
      })
    );
    return;
  }

  // silvmarket.shop images — cache-first with network fallback
  if (url.hostname === 'silvmarket.shop' && url.pathname.startsWith('/images/')) {
    e.respondWith(
      caches.open(CACHE).then(async c => {
        const cached = await c.match(e.request);
        if (cached) return cached;
        const fresh = await fetch(e.request);
        if (fresh.ok) c.put(e.request, fresh.clone());
        return fresh;
      }).catch(() => new Response('', { status: 503 }))
    );
    return;
  }

  // HTML pages — network-first, fall back to cache
  if (e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request).then(r => {
        if (r.ok) {
          const clone = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
});
