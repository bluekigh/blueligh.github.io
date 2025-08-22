'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "9d55ffab31855aedeafb0956e00f6471",
"version.json": "36122377bfaf7045b07a4b3c10071d23",
"index.html": "938b855cec4c53d0b987fa582b647d69",
"/": "938b855cec4c53d0b987fa582b647d69",
"main.dart.js": "ea93a2abf3d394667874190b4adbc66f",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"README.md": "3d11f45ca3412ab160acbdd805e57a88",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b1592ddece5d24dd9d316e2c02520a6e",
".git/REBASE_HEAD": "b271a9023998fcc1820f81434f1c2066",
".git/ORIG_HEAD": "b271a9023998fcc1820f81434f1c2066",
".git/config": "5f45bbfab658bf9e207432ad2a27c126",
".git/objects/95/f5f458a3398ce235f915bb39ca19b378fa3c1d": "3593916fc8d2debd2344e8f7340fd6b0",
".git/objects/0c/e9d9e8022229595167481632cdfcbb825c2c9c": "489df9d922198c079cc21fe7a4004692",
".git/objects/3e/d0ddd7136a48520910e7e4bf665362facd60d4": "c8322669a78b5f07c75b1decdc05718d",
".git/objects/9b/d3accc7e6a1485f4b1ddfbeeaae04e67e121d8": "784f8e1966649133f308f05f2d98214f",
".git/objects/3c/756096c2548ab45878f3ac64a9cda65e7ff78f": "f4586ef7ec959391debde9a8306d0284",
".git/objects/67/7a975bb0726a38190f5d767946faf42e4dd115": "9152b23f2679786e82965f3a34dfdbce",
".git/objects/94/677a4e29964c658484542dae666e776639cd68": "3701a2fc5d8a5a6ae953723bb125060a",
".git/objects/33/319556d08a003c978faca342e55e7883c3c6d1": "514423d5d120c42e63c423f832bd682a",
".git/objects/b5/83c42adbde8555ee93193fb4517585cc49d19e": "858fb9058a8598e8db9e8ebd38939ba8",
".git/objects/d9/20e7c74231b410070ecf045012e24a9afa4129": "06523221a0c40bd81030e601b809db80",
".git/objects/d9/4baa69a331cbd2aa020b583ee35ae3f313dd6e": "f490a630499ff097ba094fa1228dd892",
".git/objects/d7/7cfefdbe249b8bf90ce8244ed8fc1732fe8f73": "9c0876641083076714600718b0dab097",
".git/objects/d0/e67ea40bf3dfa1de5f14db11a375d952fb913b": "c0dc837e288bebde4a9f22328cbefe31",
".git/objects/b3/aa5de784050d81f9e1a23493124ee09683f49a": "bbe29c3b86003a54b5d866abfba87f02",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/ab/202a929d8b1100daf2927f0e9e4b25b7d171c9": "30faebb013439dcf10cecef6155876b0",
".git/objects/e5/2843ee97d394a29ae7d938c86c85ca6f6667e3": "e42f05ec9d5dc16b4d224d6ba557220e",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/ee/0e319c5539dbb17d9167d3b7194b5e1a963b42": "b8904b0dc33f998f23b01fa587059178",
".git/objects/c9/807b3bd338f6dd7234b83d15474fb12dda264b": "0d418bfb4fc728a67baedf3aaa258dce",
".git/objects/c9/e9862e8b31ad533c8b2684092459f40cac767f": "3be452d4bd41d315fba8f035aa980d5b",
".git/objects/fc/1e3d16c9435bead1a5be9eac87dd285f928c47": "7df8600514ed89abf1c01bd1ec0a1877",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f5/72b90ef57ee79b82dd846c6871359a7cb10404": "e68f5265f0bb82d792ff536dcb99d803",
".git/objects/c8/08fb85f7e1f0bf2055866aed144791a1409207": "92cdd8b3553e66b1f3185e40eb77684e",
".git/objects/73/c63bcf89a317ff882ba74ecb132b01c374a66f": "6ae390f0843274091d1e2838d9399c51",
".git/objects/1a/d7683b343914430a62157ebf451b9b2aa95cac": "94fdc36a022769ae6a8c6c98e87b3452",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/10/4c356c74db4ede563660fe0d091c1a688742d9": "d4e0d66e9c2ef5d35ff7a04a082bdc47",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/6b/9862a1351012dc0f337c9ee5067ed3dbfbb439": "85896cd5fba127825eb58df13dfac82b",
".git/objects/00/6675b277d269766fb7cdea0c23c49eddfa0b70": "16cb9b9fcf69896767be96cd3d9da468",
".git/objects/09/f35efd89bad6ce04a81123b2d5acce8eee1510": "7114aa2efb9f56e2a7f578ca72f39a17",
".git/objects/65/5a3265be50e277956c1ab2cf89f70e55548539": "fd2b3b46d3e0010e661bc3d902b9840e",
".git/objects/53/18a6956a86af56edbf5d2c8fdd654bcc943e88": "a686c83ba0910f09872b90fd86a98a8f",
".git/objects/53/3d2508cc1abb665366c7c8368963561d8c24e0": "4592c949830452e9c2bb87f305940304",
".git/objects/30/4f5b98f6f7167f2ad80940c3c4b76583282776": "f756d5b8d273fc65b62a2dc19b0d7aac",
".git/objects/5b/693a9f59b3e7310c3a398ad0a6579b4704ef99": "2fc9d36687a55244aec9da09fae15408",
".git/objects/37/9a5ff0c679046630b7e6a00a572b150e9cfc13": "4abe6bc40be441af2daf867f3a942c98",
".git/objects/39/4a1915804eff74a70298b3d45a27cc3ad7d708": "49a9350b5cb29c8e0c742af046e878a7",
".git/objects/99/095ae0fb874cb74b5cfc3449ade997e3f6a6d6": "448706543d1494970f299a0c3d28d776",
".git/objects/52/9fdeff327d0eab8ec8bb8fdfb332445c75c4da": "c7bdf9d8034113e5a30102aa5478f9c7",
".git/objects/52/5621fec512e18eda433abcb650891b5cf1d5a5": "43476d3500385deb2e79b2b98ba1ad8d",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d4/46600f135f5282eb6ee67df31ef1770c2b6f8c": "2924fdcb0df4f6b74547a201f5b870f1",
".git/objects/dc/11fdb45a686de35a7f8c24f3ac5f134761b8a9": "761c08dfe3c67fe7f31a98f6e2be3c9c",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/a8/da3510a90d24c34405d8877a622a1b1ec62576": "11a44aa33f463e3af42c9090cbe3bcfc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/b9/f8cfdc51cf6d741938b0b09fddae072eb93b7b": "b0079f01c48872fd18ca8880d8f39e13",
".git/objects/b9/6a5236065a6c0fb7193cb2bb2f538b2d7b4788": "4227e5e94459652d40710ef438055fe5",
".git/objects/e6/8d7a740f17ad044c600d38458e4d5863acf54f": "0178729c5fa7defdbaec964992641e77",
".git/objects/ff/4e98145d7fb13f2af9f6095d82a673fda61969": "4e2d840d1c00d43f8acfb17b8d12043e",
".git/objects/e9/94225c71c957162e2dcc06abe8295e482f93a2": "2eed33506ed70a5848a0b06f5b754f2c",
".git/objects/f1/2025de0367d71a259018fb2d461333977ef769": "4ca3f4363b686ed50df31e531e4bda54",
".git/objects/e7/64b1ed1bb0ec12f2d0c9927bf625461678993c": "daa96dc9c21d8ec186588298d90bf211",
".git/objects/cb/6b7a6137f8e01d986294349a6bc2fadc6d1849": "9df7d09456db8013ef6b3c4b23309f7a",
".git/objects/e0/7ac7b837115a3d31ed52874a73bd277791e6bf": "74ebcb23eb10724ed101c9ff99cfa39f",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/70/a234a3df0f8c93b4c4742536b997bf04980585": "d95736cd43d2676a49e58b0ee61c1fb9",
".git/objects/70/a3b3cfcb1bbcce1fa85a38a9332b6e6e371706": "43de2665fcf2b07e67725a1224a61a86",
".git/objects/8c/45372e0c89b06b1587b512074e0a29f252d468": "fe77d53169ecaff73bf2531900c648c8",
".git/objects/8c/a202a516898b8863e79588bf955067dfe2806e": "f28e8dfc0d7cf13995fe4ed54ffa238e",
".git/objects/1c/dd5efb3f3386a9f7c391f2523f7b777a3f8519": "fd87aaf80929b5efbba111ba65fb7d81",
".git/objects/49/1ba6f74798503b1a24094c583eb7e422c118f0": "487d8f105e5655b4546d40db27b603d8",
".git/objects/14/20ac8a8ee16e6c898bc0ea584db89a13754c05": "c5b5a6573ef7e81456c582c10c2c6670",
".git/objects/22/0436150ba6834988d3abed193f265cf2c34677": "303c53ec3c73624c191c861e6d603bc9",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/fork-settings": "f7de948c45578e93bb5f5f25c7f111e1",
".git/logs/HEAD": "52cc40892b24cc0b350df37c7c1e3b55",
".git/logs/refs/heads/master": "6b35574b5be8ceffab5b99492d9188ef",
".git/logs/refs/remotes/origin/HEAD": "3deb59defea61f3452608e7de82ca299",
".git/logs/refs/remotes/origin/Master": "8b88b51de181d0dddf515343e7dd554b",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/master": "beeb2790c9f09bcfecd8c2ead8c12205",
".git/refs/remotes/origin/HEAD": "d542eb12e0249c97e2dd845d2605335f",
".git/refs/remotes/origin/Master": "beeb2790c9f09bcfecd8c2ead8c12205",
".git/index": "2e83d96715204bdf0d1ff5ddd476c5b0",
".git/COMMIT_EDITMSG": "97ab042e87cf0a9806416c682e1aa304",
".git/FETCH_HEAD": "fb06e00d22d80ee314835a9a1ffa229e",
"assets/AssetManifest.json": "9d17ada1ad4fad955f7929fc439a2c1a",
"assets/NOTICES": "a3cfcc9d51c2156c2072b0be19cd79e9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "f3bc5ec9146a6d9b69832a60583a88dc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "cfc8da18526da0cbcff0bc65d66ec418",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/assets/ding.mp3": "b5b37bf91f00685dcf25e87ae11b6487",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
