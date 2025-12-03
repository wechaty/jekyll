                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/12/03/when-english-hits-ring-0/","revision":"f4da7ebff1c8d9d728849c1e53c5d1bf"},{"url":"/2025/12/01/missing-feature-ai-coding-agents/","revision":"b0ace43160055e71f9cd84bd8cc0cac5"},{"url":"/2025/11/29/vibe-coding-cloud-protocol/","revision":"3125445a1c40b650588110b591ba92a1"},{"url":"/2025/11/27/goodwin-checks-source-code-cognitive-health/","revision":"74e19ba853224240db33efb04876ce05"},{"url":"/2025/11/25/the-antigravity-effect-when-coding-becomes-orchestration/","revision":"858dbd845db93ad443d6fa8d81af24c2"}];
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
