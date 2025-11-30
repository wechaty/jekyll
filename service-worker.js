                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/11/29/vibe-coding-cloud-protocol/","revision":"b0a1236635b0fc196eeeff7e42e52013"},{"url":"/2025/11/27/goodwin-checks-source-code-cognitive-health/","revision":"74e19ba853224240db33efb04876ce05"},{"url":"/2025/11/25/the-antigravity-effect-when-coding-becomes-orchestration/","revision":"858dbd845db93ad443d6fa8d81af24c2"},{"url":"/2025/11/17/confident-cluster-decoding/","revision":"f4384e991cd81faec09a1d3d811a6dbf"},{"url":"/2025/11/13/firegen-firebase-rtdb-genai-api/","revision":"155579f6c71b4b74974598c7cf2879e4"}];
            // set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'Wechaty',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.networkFirst()
);

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
    /assets\/(img|icons)/,
    workbox.strategies.cacheFirst()
);

// third party files
workbox.routing.registerRoute(
    /^https?:\/\/cdn.staticfile.org/,
    workbox.strategies.staleWhileRevalidate()
);
