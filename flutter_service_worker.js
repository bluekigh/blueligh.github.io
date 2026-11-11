// Retire the former root Flutter timer without affecting nested project workers.
'use strict';
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all(['flutter-app-manifest', 'flutter-temp-cache', 'flutter-app-cache'].map(name => caches.delete(name)));
    await self.clients.claim();
    await self.registration.unregister();
    const home = new URL(self.registration.scope);
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await Promise.all(windows.map(client => {
      const url = new URL(client.url);
      if (url.origin === home.origin && (url.pathname === home.pathname || url.pathname === home.pathname + 'index.html')) {
        return client.navigate(client.url);
      }
    }));
  })());
});
