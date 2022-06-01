const cacheName = "cache-v1";
const staticAssets = [
    './',
    './index.html',
    "./logo.png",
    "./logo16.png",
    "./logo32.png",
    "./logo64.png",
    "./logo192.png",
    "./logo512.png",
    "./manifest.json",
    './brands/rj.png',
    './brands/soundcloud.png',
    './brands/spotify.png',
    './manifest.webmanifest'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);

    return self.skipWaiting();

});

self.addEventListener('activate', event => {
    self.clients.claim();
});


self.addEventListener('fetch', async event => {

    const req = event.request;

    const url = new URL(req.url);

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } else {
        //   event.respondWith(networkAndCache(req));
    }


});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization,Accept',
            },
        });
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}