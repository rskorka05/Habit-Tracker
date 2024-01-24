/*self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          // Dodaj tutaj inne ścieżki do plików, które chcesz zcache'ować
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });*/

  // Zamiast użycia 'self', użyj 'this' lub kontekstu zdarzenia (event.target)
// Zamiast użycia 'self', użyj 'this' lub kontekstu zdarzenia (event.target)
// serviceWorker.js
window.self.addEventListener('install', (event) => {
  // Krok instalacji Service Workera
  console.log('Service Worker został zainstalowany.');
});

window.self.addEventListener('activate', (event) => {
  // Aktywacja Service Workera
  console.log('Service Worker został aktywowany.');
});

  

