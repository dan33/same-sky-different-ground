/* Same Sky, Different Ground — offline support.
   Precaches the whole site (it is small) so the field guide, map and
   calendar keep working out on the coast where there is no signal. */
var CACHE = 'ssdg-v6';
var ASSETS = [
  'index.html', 'field-guide.html', 'ecosystems.html', 'forces.html', 'wonders.html',
  'explore-map.html', 'read-the-country.html', 'app.html', 'this-month.html', 'the-book.html', 'about.html',
  'join.html', 'thanks.html', 'prints.html',
  'manifest.webmanifest',
  'assets/style.css', 'assets/app.js', 'assets/site.js',
  'assets/fonts/fraunces.woff2', 'assets/fonts/fraunces-italic.woff2', 'assets/fonts/inter.woff2',
  'assets/relief.webp',
  'assets/cover-mount-coolum.webp',
  'assets/icons/favicon.svg', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png',
  'assets/figures/gradient-cross-section.webp',
  'assets/figures/soil-podzol-chronosequence.webp',
  'assets/figures/estuary-zonation.webp',
  'assets/figures/dune-lakes.webp',
  'assets/figures/fire-boundary.webp',
  'assets/figures/landform-cross-section.webp',
  'assets/figures/wetland-zonation.webp',
  'assets/figures/ninderry-cross-section.webp',
  'assets/figures/rainforest.webp',
  'assets/figures/sea-country.webp',
  'assets/figures/hotspot-track.webp',
  'assets/figures/seasonal-wheel.webp',
  'assets/figures/same-sky-different-ground-cover.webp'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        // Offline and uncached: fall back to the field guide shell for navigations.
        if (e.request.mode === 'navigate') return caches.match('field-guide.html');
      });
    })
  );
});
