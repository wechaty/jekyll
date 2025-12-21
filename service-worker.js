                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/11/25/the-antigravity-effect-when-coding-becomes-orchestration/","revision":"858dbd845db93ad443d6fa8d81af24c2"},{"url":"/2025/08/12/ai-powered-reverse-engineering-concept/","revision":"31bfbb3d2ecd8407a40ce76277b8dad0"},{"url":"/2025/05/23/wechaty-with-aws2025/","revision":"8314e9b3fe888293047012d3d69110de"},{"url":"/2025/05/23/wechaty-with-aws2025-en/","revision":"a594e39470e96355de9490970107fb6a"},{"url":"/2025/04/15/huans-conversation-law/","revision":"91cee0415fb8ad6a1cfef454b0cc08b2"}];
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
