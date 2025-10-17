---
title: "Major News: Login with UOS WeChat Desktop Protocol, Wechaty Free Web Protocol Regains Glory"
author: leochen-g
categories: article
tags:
  - code
  - wechaty-puppet-wechat
  - web-protocol
  - news
  - ecosystem
image: /assets/2021/04-wechaty-uos-web-en/wechaty-puppet-wechat.webp
---

> This post is also available in [Chinese](/2021/04/13/wechaty-uos-web/)

I'm very pleased to write this article to inform everyone that Wechaty's web protocol can shine again! If your WeChat previously prompted that it couldn't log in to the web version, this update will be good news for you. Because the current `wechaty-puppet-wechat` now supports logging in using the UOS WeChat desktop protocol. Come and try it out!

## How to Use

> Key dependency: npm install wechaty-puppet-wechat --save

There is no intrusion into existing code—just update the dependencies.

First, install the latest `wechaty-puppet-wechat` dependency and configure the environment:

```shell
npm install qrcode-terminal --save
npm install wechaty 
npm install wechaty-puppet-wechat --save // This dependency is key
export WECHATY_PUPPET=wechaty-puppet-wechat // This is also key, you need to configure the puppet you're using
```

Second, make sure your puppet is configured as `wechaty-puppet-wechat`

If you're using `ipadlocal` and want to try the web protocol, you also need to configure it as follows:

Example:

index.js

```javascript

import { Wechaty }  from 'wechaty';

const name = 'wechat-puppet-wechat';
let bot = '';
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});

//  QR code generation
function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode); // Display QR code in console
  const qrcodeImageUrl = [
    'https://wechaty.js.org/qrcode/',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);
}

// Login
async function onLogin(user) {
  console.log(`Caring Assistant ${user} logged in`);
  if (config.AUTOREPLY) {
    console.log(`Bot auto-chat mode enabled`);
  }
  // Create scheduled task after login
  await initDay();
}

// Logout
function onLogout(user) {
  console.log(`Assistant ${user} logged out`);
}

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot
  .start()
  .then(() => console.log('Starting WeChat login'))
  .catch((e) => console.error(e));

```

According to the above configuration, pick up your phone and scan the code. You'll find that WeChat accounts that couldn't log in before can now log in. Surprised? Unexpected?

## Common Questions

1. Why does it still prompt that I can't log in to web WeChat after updating to the latest dependency?

Please check your project's root directory to see if there's a file like `wechaty-puppet-wechat.memory-card.json`. If so, delete it and run again. The stored cookies may have expired (this issue has been fixed in the latest version).

1. Can this puppet always bypass web login restrictions?

Currently, it seems possible to bypass web restrictions, but there's no guarantee this won't change in the future.

1. Will bypassing this restriction be detected by WeChat and result in a ban?

Currently, the bypass method actually uses UOS desktop WeChat request headers, so if you don't do anything that violates WeChat's terms of service, there's a high probability it will be fine. If you violate WeChat regulations, that's another story.

More questions will continue to be added based on feedback.

## Principles

For the specific implementation principles, please refer to this [issue](https://github.com/wechaty/wechaty-puppet-wechat/issues/127). For code modifications, see [https://github.com/wechaty/wechaty-puppet-wechat/pull/129](https://github.com/wechaty/wechaty-puppet-wechat/pull/129)

The general idea is that WeChat under UOS is just a web version wrapped in electron. So some experts compared the request headers and found that you only need to first add a `?target=t` to the request address like this: `https://wx.qq.com/?target=t`

Then after scanning the code to log in, intercept the `https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage` request and add two fixed parameters to the request header:

```shell
extspam ='Gp8ICJkIEpkICggwMDAwMDAwMRAGGoAI1GiJSIpeO1RZTq9QBKsRbPJdi84ropi16EYI10WB6g74sGmRwSNXjPQnYUKYotKkvLGpshucCaeWZMOylnc6o2AgDX9grhQQx7fm2DJRTyuNhUlwmEoWhjoG3F0ySAWUsEbH3bJMsEBwoB//0qmFJob74ffdaslqL+IrSy7LJ76/G5TkvNC+J0VQkpH1u3iJJs0uUYyLDzdBIQ6Ogd8LDQ3VKnJLm4g/uDLe+G7zzzkOPzCjXL+70naaQ9medzqmh+/SmaQ6uFWLDQLcRln++wBwoEibNpG4uOJvqXy+ql50DjlNchSuqLmeadFoo9/mDT0q3G7o/80P15ostktjb7h9bfNc+nZVSnUEJXbCjTeqS5UYuxn+HTS5nZsPVxJA2O5GdKCYK4x8lTTKShRstqPfbQpplfllx2fwXcSljuYi3YipPyS3GCAqf5A7aYYwJ7AvGqUiR2SsVQ9Nbp8MGHET1GxhifC692APj6SJxZD3i1drSYZPMMsS9rKAJTGz2FEupohtpf2tgXm6c16nDk/cw+C7K7me5j5PLHv55DFCS84b06AytZPdkFZLj7FHOkcFGJXitHkX5cgww7vuf6F3p0yM/W73SoXTx6GX4G6Hg2rYx3O/9VU2Uq8lvURB4qIbD9XQpzmyiFMaytMnqxcZJcoXCtfkTJ6pI7a92JpRUvdSitg967VUDUAQnCXCM/m0snRkR9LtoXAO1FUGpwlp1EfIdCZFPKNnXMeqev0j9W9ZrkEs9ZWcUEexSj5z+dKYQBhIICviYUQHVqBTZSNy22PlUIeDeIs11j7q4t8rD8LPvzAKWVqXE+5lS1JPZkjg4y5hfX1Dod3t96clFfwsvDP6xBSe1NBcoKbkyGxYK0UvPGtKQEE0Se2zAymYDv41klYE9s+rxp8e94/H8XhrL9oGm8KWb2RmYnAE7ry9gd6e8ZuBRIsISlJAE/e8y8xFmP031S6Lnaet6YXPsFpuFsdQs535IjcFd75hh6DNMBYhSfjv456cvhsb99+fRw/KVZLC3yzNSCbLSyo9d9BI45Plma6V8akURQA/qsaAzU0VyTIqZJkPDTzhuCl92vD2AD/QOhx6iwRSVPAxcRFZcWjgc2wCKh+uCYkTVbNQpB9B90YlNmI3fWTuUOUjwOzQRxJZj11NsimjOJ50qQwTTFj6qQvQ1a/I+MkTx5UO+yNHl718JWcR3AXGmv/aa9rD1eNP8ioTGlOZwPgmr2sor2iBpKTOrB83QgZXP+xRYkb4zVC+LoAXEoIa1+zArywlgREer7DLePukkU6wHTkuSaF+ge5Of1bXuU4i938WJHj0t3D8uQxkJvoFi/EYN/7u2P1zGRLV4dHVUsZMGCCtnO6BBigFMAA='
client-version' = '2.0.0', 
```

This way you can perfectly use the desktop protocol. Many thanks to [@Luv Letter](https://github.com/luvletter2333) for the explanation and [@artxia](https://github.com/artxia) for the Chrome plugin code, which gave me the opportunity to contribute to `wechaty-puppet-wechat`.

## Quick Experience

If you want to quickly experience Wechaty's full functionality and visual configuration features, you can check out my [WeChat Daily Talk](https://github.com/gengchen528/wechatBot) and [Smart WeChat Secretary](https://github.com/gengchen528/wechat-assistant-pro) projects. Both have been updated with the latest web protocol and fully support web login.

> Historical Articles

* [wechaty-web-panel Visual Plugin](https://wechaty.js.org/2020/05/31/wechaty-web-panel-plugin/)
* [Three Steps to Build a WeChat Dating Bot with Node - Beginner Friendly](https://wechaty.js.org/2019/06/21/three-step-get-girlfriend/)

> Author: [Leo_chen](https://github.com/leochen-g/), Senior Frontend Engineer, enjoys using Node for various projects
