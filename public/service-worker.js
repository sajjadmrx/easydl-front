// const cacheName = "cache-v1";
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
    './manifest.webmanifest',
    './amozesh/install.mp4',
    './amozesh/spotify.mp4'
]

// self.addEventListener('install', async event => {
//     const cache = await caches.open(cacheName);
//     await cache.addAll(staticAssets);

//     return self.skipWaiting();

// });

// self.addEventListener('activate', event => {
//     self.clients.claim();
// });


// self.addEventListener('fetch', async event => {

//     const req = event.request;

//     const url = new URL(req.url);

//     if (url.origin === location.origin) {
//         event.respondWith(cacheFirst(req));
//     } else {
//         //   event.respondWith(networkAndCache(req));
//     }


// });

// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName);
//     const cached = await cache.match(req);
//     if (cache) return cached;
//     try {
//         const networked = await fetch(req);
//         return networked;
//     } catch (e) {
//         console.log(e);
//         //return await cache.match('/offline.html');
//     }
// }

// async function networkAndCache(req) {
//     const cache = await caches.open(cacheName);
//     try {
//         const fresh = await fetch(req, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//                 'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization,Accept',
//             },
//         });
//         await cache.put(req, fresh.clone());
//         return fresh;
//     } catch (error) {
//         const cached = await cache.match(req);
//         return cached;
//     }
// }


const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';


// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(staticAssets))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});