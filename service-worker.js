                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/08/12/ai-powered-reverse-engineering-concept/","revision":"1a5199001e231d13264289859ea104e7"},{"url":"/2025/08/09/architecture-ai-driven-development/","revision":"49fcfebff6e7c7c7a87e9b5560d0c199"},{"url":"/2025/05/23/wechaty-with-aws2025/","revision":"90b56b0b6f9b689f3f3eab1376901236"},{"url":"/2025/04/15/huans-conversation-law/","revision":"85b6090a393591324fbd4b18583244cd"},{"url":"/2025/04/04/best-transport-for-event-driven-architecture-websocket-or-sse-post/","revision":"da134e9398859d2367110197b2a8be5e"}];
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
