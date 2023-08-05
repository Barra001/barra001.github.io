'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "0897709a24f6447bbde57e5438e83e9a",
"index.html": "07be4efd9dd19bcdef2a861cdf857c92",
"/": "07be4efd9dd19bcdef2a861cdf857c92",
"main.dart.js": "401f430f8007c70bb812a8c2405fc55f",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "1fb7e0504e91fd0f388bef68a83aa634",
"icons/Icon-192.png": "8744292dc63d98229f65c532b227130e",
"icons/Icon-maskable-192.png": "8744292dc63d98229f65c532b227130e",
"icons/favicon.png": "7a26ea9d4e61122fc023b84e5acdb148",
"icons/Icon-maskable-512.png": "51bbebf038e1e5018d1f46b6715b4a15",
"icons/Icon-512.png": "51bbebf038e1e5018d1f46b6715b4a15",
"manifest.json": "dc38294f59762b785bb3f6f5116ed5f3",
"assets/AssetManifest.json": "5ec8e40b4409786fd8a558aa62841bca",
"assets/NOTICES": "e25a18d6961f5fe8ee2fb7184d923010",
"assets/FontManifest.json": "80032e7acd4ec5b01dd5dd376543d19f",
"assets/packages/deli_ui/assets/images/icon.png": "13e9c72ec37fac220397aa819fa1ef2d",
"assets/packages/deli_ui/assets/images/logo-completo.png": "b0ef3a3217673156f2d063e6b476036e",
"assets/packages/deli_ui/assets/images/carrousel3.webp": "19d56b190e97b969df7f655687253cb3",
"assets/packages/deli_ui/assets/images/portada.jpeg": "13d3ef4907ce7addb145cf9b1ef68507",
"assets/packages/deli_ui/assets/images/carrousel2.webp": "db7dc7fa56376edbc8de7937cfdabb0c",
"assets/packages/deli_ui/assets/images/logo-deliglobe.png": "281b0560eca2341785fa902efb58097f",
"assets/packages/deli_ui/assets/images/carrousel1.webp": "228103f5b024c268295c69a22dabfd48",
"assets/packages/deli_ui/assets/icons/email_outline.svg": "6a367a2b8c929081730f972004bd8013",
"assets/packages/deli_ui/assets/icons/back_icon.svg": "cef6495ced8c9c80b8a9db7d5421ffb8",
"assets/packages/deli_ui/assets/fonts/Merriweather-Regular.ttf": "e2f219e63a575a41e10f991e9c95819a",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-Bold.ttf": "05706af596be869b12493f18a06f672a",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-ExtraBold.ttf": "e07ed53b2dd45c47e9fcc6376228401c",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-Italic.ttf": "8d09cf3c53690fe0c8977494a9681a3c",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-Regular.ttf": "7bc358c3038290392f8c25898960cd04",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-Medium.ttf": "45b92102d5b0daba1f4f0fae0efa853a",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-Light.ttf": "a30e862ed5fba06da61c4671f8216a3d",
"assets/packages/deli_ui/assets/fonts/MerriweatherSans-SemiBold.ttf": "271e5beab3fe84819aba35803dabe7c6",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "cae7e4fefe818bb3c7f1dabaf60cbccf",
"assets/fonts/MaterialIcons-Regular.otf": "d2b9d5d40896565662b5a8d9dd61896d",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
