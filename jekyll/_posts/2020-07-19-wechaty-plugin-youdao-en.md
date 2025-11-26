---
title: "Youdao AI Cloud Translation Plugin"
author: chs97
categories: npm
tags:
  - plugins
  - featured
  - ecosystem
image: /assets/2020/youdao-plugin/head.webp
excerpt: >
  Integrate Youdao AI Cloud translation capabilities as a Wechaty plugin, enabling developers to easily add translation features to their bots.
---

[![badge](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=132&status=done&style=none&width=132)](https://github.com/wechaty/wechaty)
[![badge](https://img.shields.io/badge/Wechaty-%E5%BC%80%E6%BA%90%E6%BF%80%E5%8A%B1%E8%AE%A1%E5%88%92-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=134&status=done&style=none&width=134)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

## Youdao AI Cloud Translation Plugin

Integrate Youdao AI Cloud translation capabilities in the form of a `wechaty` plugin, allowing more developers to conveniently add translation features to their bots. Youdao AI Cloud is Youdao's official cloud platform that provides translation capabilities. [Related API Documentation](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html)

## Features

Provides translation capabilities. Send text to be translated via WeChat, such as `hello` to the bot, and the bot replies with the translation result and pronunciation audio.
**Pronunciation audio requires the application to bind the Speech Synthesis Service**
Since the `Voice` message type is not supported, the pronunciation audio can only be replied in the form of a `UrlLink`.
![Result Screenshot](/assets/2020/youdao-plugin/1.webp)

## Implementation Details

The plugin capability is provided by `Wechaty` itself. It mainly uses `got` to call the Youdao AI Cloud translation API.

## Unit Testing

Mainly uses `wechaty-puppet-mock` for unit testing. The advantage is that there's no need for frequent login and QR code scanning. You can directly `mock` some bot behaviors and user behaviors.
Here's how to use unit testing to test the bot. I'm using the `jest` testing framework.
I'll skip the `jest` configuration instructions here. [Official Documentation](https://jestjs.io/)
During the process of writing test cases, I found `jest` to be quite handy. I recommend stepping out of the official `example` and trying `jest` for yourself.

### Test Preparation

All `wechaty` behaviors are proxied through `puppet`. Here we need to prepare several objects: `mocker`, `puppet`, `wechaty`

```typescript
async function wechatyFixtures() {
  const mocker = new Mocker()
  const puppet = new PuppetMock({ mocker })
  const wechaty = new Wechaty({ puppet })
  await wechaty.start()
  const [user, contact] = mocker.createContacts(2)
  await mocker.login(user)
  return {
    wechaty,
    user,
    contact,
    mocker,
  }
}
```

`mocker.login(user)` logs in `wechaty` with `user`'s identity. When other users send messages to `user`, the `message` event that `wechaty` listens to will be triggered.

### Test Cases

Using the `test case: wechaty replies with translation result` as an example:

```typescript
const { contact, user, wechaty } = await wechatyFixtures()
const CONFIG = {
  appId,
  privateKey,
} as YouDaoTranslatorPluginOption
wechaty.use(wechatyYouDaoPlugin(CONFIG))
// Plugin receives message and replies with translation result
contact.on('message', (message) => {
  const res = message.text()!
  expect(res).toBe('你好')
  done()
})
// contact sends message to wechaty
contact.say('Hello').to(user)
```

The behavior of this plugin is relatively simple, so writing unit test cases is also easy. You can refer to [issues#37](https://github.com/wechaty/wechaty-puppet-mock/issues/37)

## Conclusion

The API of `wechaty-puppet-mock` is currently not fully consistent with `wechaty`. For example, there's no way to send message types other than `Text`, such as `UrlLink`, etc.
I raised an [Issue](https://github.com/wechaty/wechaty-puppet-mock/issues/40) about this problem for discussion.
Thanks to the [wechaty](https://github.com/wechaty/wechaty) team for providing the WeChat bot SDK  
Thanks to [Juzibot](https://www.juzibot.com/) for providing the iPad protocol token

> Author: [Chs97](https://github.com/chs97/)
> Code: [Github](https://github.com/chs97/wechaty-plugin-youdao)

---

> 本文也有[中文版本](/2020/07/19/wechaty-plugin-youdao/)。
