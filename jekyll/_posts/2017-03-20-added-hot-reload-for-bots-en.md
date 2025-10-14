---
title: 'Adding Hot Reload Function for WeChat Bots'
author: gcaufy
categories: feature
tags:
  - code
image: /assets/2017/03-added-hot-reload-for-bots-en/gcaufy-hot-reload-screencast.webp
---

![avatars](https://avatars3.githubusercontent.com/u/2182004?v=3&s=88)

Wechaty has solved many pain points I encountered during WeChat operations, which I won't elaborate on here. At the same time, Wechaty's elegant and simple API design and convenient deployment are another attractive aspects.

After getting started quickly, during development and debugging, I needed to frequently restart the Wechaty program when modifying code. I believe most people have similar issues, so let's discuss how to avoid such problems.

## 1. Problem Analysis

During development and debugging, the Wechaty program must be restarted after modifying code. Each restart takes about 30s-60s. Developers also need to frequently scan QR codes to log in, which is quite costly for programs in the debugging stage. Therefore, I considered optimizing this startup time.

For the QR code login issue, I found the [answer](https://github.com/wechaty/wechaty/wiki/API#wechaty-class) in the Wiki:

>**Wechaty.instance(profile:string): Wechaty**
>
>profile(OPTIONAL): profile name. if a profile name is provided, wechaty will save login status to it, and automatically restored on next time of wechaty start(restart).
>
> * can be set by environment variable: WECHATY_PROFILE

This means setting a profile can remember the login status, avoiding repeated QR code scanning actions during restarts.
The QR code issue can be solved, but can the 30-60s startup time be further optimized? We need to understand what the program is doing during these 30 seconds.

By examining the source code [browser-driver.ts](https://github.com/wechaty/wechaty/blob/main/src/puppet-web/browser-driver.ts), I found that during init execution, the program starts a driver, which can be thought of as opening a browser, then obtaining the browser session, retrying three times until failure. This is the foundation of Wechaty's operation, and we can't avoid this 30s time overhead here. We can only think from other aspects.

## 2. Node.js Hot Reload

This is actually a Node.js feature itself, not closely related to Wechaty. We can dynamically load module content by listening for file changes. First, we need to understand Node.js's module caching mechanism. Refer to the key code in [module.js](https://github.com/nodejs/node/blob/master/lib/module.js):

```ts
// Check the cache for the requested file.
// 1. If a module already exists in the cache: return its exports object.
// 2. If the module is native: call `NativeModule.require()` with the
//    filename and return the result.
// 3. Otherwise, create a new module for the file and save it to the cache.
//    Then have it load  the file contents before returning its exports
//    object.
Module._load = function(request, parent, isMain) {
    if (parent) {
        debug('Module._load REQUEST %s parent: %s', request, parent.id);
    }
    var filename = Module._resolveFilename(request, parent, isMain);
    var cachedModule = Module._cache[filename];
    if (cachedModule) {
        return cachedModule.exports;
    }
    if (NativeModule.nonInternalExists(filename)) {
        debug('load native module %s', request);
        return NativeModule.require(filename);
    }
    var module = new Module(filename, parent);
    if (isMain) {
        process.mainModule = module;
        module.id = '.';
    }
    Module._cache[filename] = module;
    tryModuleLoad(module, filename);
    return module.exports;
};

require.cache = Module._cache;
```

After Node.js requires a module, when the module is updated and required again, it actually reads the cached original module in memory. Unless you manually clear the `require.cache` content, the updated module content can be reloaded. Therefore, following the Node.js source code, I wrote a require cache clearing method:

```ts
// purge require cache
const purgeCache = (moduleName) => {
    var mod = require.resolve(moduleName);
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        (function traverse(mod) {
            mod.children.forEach(function (child) {
                traverse(child);
            });
            delete require.cache[mod.id];
        }(mod));
    }

    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};
```

Then use `fs.watch` or libraries like `chokidar` to complete file monitoring functionality, implementing module reloading after file changes:

```ts
fs.watch('./somedir', (e, filename) => {
     purgeCache(`./somedir/${filename}`);
     require(`./somedir/${filename}`);
});
```

## 3. Logic Separation

When using Wechaty, developers are more concerned with event responses, such as responding to scan events, friend request events, message sending events, etc. Therefore, these response events can be separated individually. If I need to handle friend request events, I add a `friend.js` to handle them. If I need to handle message events, I add a `message.js` to handle them. Conversely, if I don't need them, I delete the js file. Each file is an event handler. The code is as follows:

```ts
const EVENT_LIST = ['scan', 'logout', 'login', 'friend', 'room-join', 'room-leave', 'room-topic', 'message', 'heartbeat', 'error'];

let eventHandler = {};

// Load lisenter
const loadListener = (evt) => {
    let fn;
    try {
        fn = require(`./listener/${evt}`);
        console.log(`binded listener: ${evt}`);
    } catch (e) {
        fn = () => void 0;
        if (e.toString().indexOf('Cannot find module') > -1) {
            console.warn(`listener ${evt} is not defined.`);
        } else {
            console.error(e);
        }
    }
    return fn;
}

// Bind events
EVENT_LIST.forEach(evt => {
    eventHandler[evt] = loadListener(evt);
    bot.on(evt, eventHandler[evt]);
});
```

## 4. Integration

Next is integrating the logic code with the hot reload functionality, making each event handler have hot reload capability.

```ts
fs.watch('./listener', (e, filename) => {
    let evt = filename.substring(0, filename.length - 3);
    console.log(`${e}: ${filename}`);

    if (EVENT_LIST.indexOf(evt) > -1) {
        if (e === 'change') {
            console.log(`${evt} listener reloaded.`);
            purgeCache(`./listener/${evt}`);
            // It may read an empty file, if not use setTimeout
            setTimeout(() => {
                bot.removeListener(evt, eventHandler[evt]);
                //console.log('filecontent: ' + fs.readFileSync(`./listener/${evt}.js`));
                eventHandler[evt] = loadListener(evt);
                bot.on(evt, eventHandler[evt]);
            }, 1000);
        } else if (e === 'rename') {
            console.log(`${evt} listener removed.`);
            bot.removeListener(evt, eventHandler[evt]);
            eventHandler[evt] = () => void 0;
            bot.on(evt, eventHandler[evt]);
        }
    }
});
```

After detecting file changes in the `./listener` directory, it automatically removes the original event listener and updates it, perfectly implementing Wechaty development debugging without restarts.

Finally, an environment variable is needed to distinguish development mode from production mode, where hot reload functionality is not needed in production mode.

```ts
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    fs.watch('./listener', ....);
}
```

This way, you can enter development mode or production mode with the following commands.

```ts
// development
docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty index.js

// production
docker run -ti -e NODE_ENV=production --rm --volume="$(pwd)":/bot zixia/wechaty index.js
```

Hot reload bot effect image:

![hot-reload][gcaufy-hot-reload]

This basically covers all the content of this article. You can use the [example code](https://github.com/wechaty/wechaty/tree/master/example/hot-reload-bot) to experience it.

Author: @[Gcaufy](https://github.com/gcaufy), Tencent, [Wechaty Contributor](https://github.com/orgs/Chatie/teams/contributor)

[gcaufy-hot-reload]: /assets/2017/03-added-hot-reload-for-bots-en/gcaufy-hot-reload-screencast.webp

---

> Chinese version of this post: [给微信机器人添加热重启功能]({{ '/2017/03/20/added-hot-reload-for-bots/' | relative_url }})
