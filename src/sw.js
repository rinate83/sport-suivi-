// Cache hors ligne (généré par build.sh) : page en « réseau d'abord », images en « cache d'abord », tout pré-chargé pour la salle sans réseau
const CACHE = 'apexfit-/*HASH*/';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/apple-touch-icon.png'];
const IMGS = /*IMGS*/;
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
  // images en arrière-plan, sans bloquer l'ouverture
  caches.open(CACHE).then(async c => { for (let i = 0; i < IMGS.length; i += 20) await Promise.all(IMGS.slice(i, i + 20).map(u => c.match(u).then(m => m || c.add(u)).catch(() => {}))); });
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.includes('/img/')) { e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }))); return; }
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
