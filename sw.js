self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('v1').then(function (cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/styles.css',
				'/script.js',
				'/sounds/breath_in.ogg',
				'/sounds/breath_out.ogg',
				'/sounds/completed.ogg',
			]);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
