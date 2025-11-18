                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/2025/11/17/confident-cluster-decoding/","revision":"fdc4077e4b6b45417f5dc53f3aa73f9b"},{"url":"/2025/11/13/firegen-firebase-rtdb-genai-api/","revision":"155579f6c71b4b74974598c7cf2879e4"},{"url":"/2025/11/08/rethinking-iam-human-centered-cli/","revision":"db4b3631d4345e0564e784e91b08ef7a"},{"url":"/2025/11/04/rethinking-azure-billing/","revision":"8c20b3ba2e6dfa5e47866035829bac65"},{"url":"/2025/10/13/two-stage-deployment-playbook/","revision":"01b8d8de02095e22e0c4783452d9596f"}];
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
