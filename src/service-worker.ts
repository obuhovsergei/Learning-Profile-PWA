/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = 'learning-profile-cache-v1'
const OFFLINE_PAGE = '/offline'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    OFFLINE_PAGE,
                    '/',
                    '/src/assets/logo.svg'
                ])
            })
    )
})

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_PAGE)))
    }
    else {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request)))
    }
})
