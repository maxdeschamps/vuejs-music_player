CACHE = "pwa-music";

CACHE_FILES = [
    "../dist/css/",
    "../dist/images/",
    "../dist/img",
    "../dist/js",
    "../dist/media"
    // "/images",
    // "/img",
    // "/src/assets/",
    // "/src/assets/artists/",
    // "/src/assets/covers/",
    // "/src/assets/musics/"
];

if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    self.addEventListener('install', function (event) {
        console.log("[Service Worker] Installing Service Worker ...", event);
        event.waitUntil(
            caches.open('static')
                .then(function (cache) {
                    console.log("[Service Worker] Precaching App Shell");
                    cache.add(CACHE_FILES);
                })
        )
    });

    self.addEventListener('activate', function (event) {
        console.log("[Service Worker] Activating Service Worker ...", event);
        return self.clients.claim();
    });

    self.addEventListener('fetch', function (event) {
        event.respondWith(
            caches.open(CACHE)
                .then(function (cache) {
                    cache.match(event.request)
                        .then(function (cacheResponse) {
                            if (cacheResponse) {
                                return cacheResponse
                            }
                            return fetch(event.request)
                                .then(function (networkResponse) {
                                    cache.put(event.request, networkResponse.clone())
                                    return networkResponse
                                })
                        })
                })
        )
    });
}
else {
    console.log(`Workbox didn't load`);
}


