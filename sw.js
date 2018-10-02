var staticCacheName = 'restaurants-static-v1';

self.addEventListener('fetch', function(event){
    console.log(event.request);
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/img/',
        '/index.html',
        '/css/styles.css',
        '/js/',
        '/data/',
        '/restaurant.html',
        'sw.js'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurants-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        if(response.status == 404){
            return new Response("Error 404. Network unavailable.");
        } else {
            let responseClone = response.clone();

            caches.open('restaurants-static-v1').then(function (cache) {
              cache.put(event.request, responseClone);
            });
            return response;
        }
      }).catch(function () {
        return new Response("Oops! It looks like your network is unavailable. Please try again once you're reconnected.");
      });
    }
  }));
});

//Attributions: https://github.com/mdn/sw-test/
