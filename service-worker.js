                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/04/04/best-transport-for-event-driven-architecture-websocket-or-sse-post/","revision":"da134e9398859d2367110197b2a8be5e"},{"url":"/2024/04/25/wechaty-with-aws2024/","revision":"6326bef3fbd69be4df50dd3065f8c30a"},{"url":"/2024/03/30/wechatbot-with-wechaty-dify-gpt4/","revision":"27f2d3e38cea9df1d83f351e4e7cffb8"},{"url":"/2024/03/26/wechaty-in-2024gdc/","revision":"082f7283d2915ebd8d89b43f41d57caa"},{"url":"/2024/02/18/wechaty-gsod-gifts/","revision":"d51f4db6225b3e6d63759529f13e7fc3"}];
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
