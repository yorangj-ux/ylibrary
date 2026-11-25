// Y's Library service worker: 앱 화면은 캐시에서 바로 열고, 도서 정보 조회는 항상 네트워크로.
const VERSION = 'v6';
const SHELL = ['./', 'index.html', 'privacy.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open('shell-' + VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => !k.endsWith(VERSION)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 앱 파일: 네트워크 우선(새 버전 반영), 실패하면 캐시
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open('shell-' + VERSION).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
    return;
  }
  // 글꼴과 표지 이미지: 캐시 우선
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || req.destination === 'image') {
    e.respondWith(caches.open('assets-' + VERSION).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }))));
  }
  // 그 외(도서 정보 API)는 그대로 네트워크
});
