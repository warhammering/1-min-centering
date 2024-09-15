self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('v1').then(function (cache) {
			return cache.addAll([
				'/index.html',
				'/styles.css',
				'/script.js',
				'/manifest.json',
				'/sw.js',
				'/logo/Masterschool-logo-Soft black.png',
				'/logo/Masterschool-logo-White.png',
				'/images/icon-192.png',
				'/images/icon-512.png',
				'/sounds/breath_in.ogg',
				'/sounds/breath_out.ogg',
				'/sounds/completed.ogg',
				// Add font files
				'/fonts/FoundersGrotesk-Medium.woff',
				'/fonts/FoundersGrotesk-Medium.woff2',
				'/fonts/FoundersGrotesk-Regular.woff',
				'/fonts/FoundersGrotesk-Regular.woff2',
				'/fonts/FreightTextProBook-Regular.woff',
				'/fonts/FreightTextProBook-Regular.woff2',
				'/fonts/FreightTextProBold-Regular.woff',
				'/fonts/FreightTextProBold-Regular.woff2',
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
