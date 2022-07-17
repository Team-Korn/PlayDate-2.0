let CACHE_NAME = 'PlayDate-cache';
const urlsToCache = [
'/',
'/index.html',
'/home',
'/chat',
'/register',
'/login'
];


// Perform install steps
self.addEventListener('install', function(event) {
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

//listen for requests
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
    .then(function(response) {
      if (response) {
      return response;
      }
      return fetch(event.request);
      })
    );
  });

