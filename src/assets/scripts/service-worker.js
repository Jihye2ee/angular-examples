
// 아래는 service worker가 각 client에게 client.postMessage()를 보내는
// 다소 애매한 예시이다.
// 여기서 service worker가 시작되면 evnets를 handling하기 전에
// message를 보낸다.
// self.clients.matchAll().then(function(clients) {
//     clients.forEach(function(client) {
//         console.log(client);
//         client.postMessage('The service worker just started up.');
//     });
// });

self.addEventListener('install', (event) => {
    // Perform install steps
    // event.waitUntil(
    //     caches.open(CACHE_NAME)
    //     .then(function(cache) {
    //         console.log('Opened cache');
    //         return cache.addAll(urlsToCache);
    //     })
    // );
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
    console.log('Handling install event:', event);
});

self.addEventListener('activate', function(event) {
    console.log('Handling activate event:', event);
    event.waitUntil(self.clients.claim()); // Become available to all pages
    // event.waitUntil(
    //     caches.keys().then(function (cacheNames)
    //     {
    //         return Promise.all(
    //             cacheNames.map(function (cacheName)
    //             {
    //                 return caches.delete(cacheName);
    //             })
    //         );
    //     })
    // );

});

self.addEventListener('message', function(event) {
    console.log('Handling message event:', event);
});

// onmessage = (e) => {
//     console.log('Message received from main script');
//     var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
//     console.log('Posting message back to main script');
//     postMessage(workerResult);
// }