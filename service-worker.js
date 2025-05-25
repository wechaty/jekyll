                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/05/23/wechaty-with-aws2025/","revision":"90b56b0b6f9b689f3f3eab1376901236"},{"url":"/2025/04/15/huans-conversation-law/","revision":"85b6090a393591324fbd4b18583244cd"},{"url":"/2025/04/04/best-transport-for-event-driven-architecture-websocket-or-sse-post/","revision":"da134e9398859d2367110197b2a8be5e"},{"url":"/2024/04/25/wechaty-with-aws2024/","revision":"6326bef3fbd69be4df50dd3065f8c30a"},{"url":"/2024/03/30/wechatbot-with-wechaty-dify-gpt4/","revision":"27f2d3e38cea9df1d83f351e4e7cffb8"}];
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
