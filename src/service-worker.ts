/// <reference lib="webworker" />

const _self = self as unknown as ServiceWorkerGlobalScope;
const CACHE_NAME = 'learning-profile-cache-v1';
const OFFLINE_PAGE = '/offline';

_self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    OFFLINE_PAGE,
                    '/',
                    '/src/assets/logo.svg'
                ]);
            })
    );
});

_self.addEventListener('fetch', (event: FetchEvent) => {
    // Пропускаем запросы, которые не являются GET или навигационными
    if (event.request.method !== 'GET') {
        return;
    }

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_PAGE)
                    .then(response => response || new Response('Offline', {
                        status: 200,
                        statusText: 'OK',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    }))
                )
        );
    } else {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request)
                    .then(response => response || new Response('Not found in cache', {
                        status: 404,
                        statusText: 'Not Found'
                    }))
                )
        );
    }
});
