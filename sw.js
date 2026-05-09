const CACHE_NAME = 'minhas-tarefas-v1'
const urlsParaCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsParaCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(nomes => {
      return Promise.all(
        nomes.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resposta => {
      return resposta || fetch(event.request).catch(() => {
        return caches.match('/index.html')
      })
    })
  )
})
