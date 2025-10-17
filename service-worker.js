                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/10/13/two-stage-deployment-playbook/","revision":"01b8d8de02095e22e0c4783452d9596f"},{"url":"/2025/10/12/ultimate-guide-software-environment-release-naming/","revision":"693dfa6c89ea624f303dcba5a353165e"},{"url":"/2025/09/12/google-cloud-authentication-the-understandable-guide/","revision":"f6943cc39b7367eb8bf7bba36e6ad965"},{"url":"/2025/08/12/ai-powered-reverse-engineering-concept/","revision":"1a5199001e231d13264289859ea104e7"},{"url":"/2025/08/09/architecture-ai-driven-development/","revision":"49fcfebff6e7c7c7a87e9b5560d0c199"}];
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
