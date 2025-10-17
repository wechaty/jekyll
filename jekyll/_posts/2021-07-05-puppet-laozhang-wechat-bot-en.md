---
title: "Good News: Login with Windows WeChat Desktop Protocol, Free Wechaty Protocol Coming Soon"
author: atorber
categories: article
tags:
  - blog
  - study
  - introduction
  - news
  - ecosystem
image: /assets/2021/07-puppet-laozhang-wechat-bot-en/wechat_bot.webp
excerpt: >
  After the free web protocol revival, Wechaty's free Windows protocol is coming soon, solving issues with accurately obtaining wxid and roomid that plagued the web protocol.
---

Following "wechaty free web protocol's glorious return," we're pleased to announce that Wechaty's free Windows protocol will soon meet everyone. If you've been struggling with the web protocol's inability to accurately obtain wxid, roomid, and other issues, this update will solve your troubles.

The Wechaty community will soon welcome a brand new puppet—wechaty-puppet-laozhang (Lao Zhang puppet, perhaps we'll update to a less catchy name later), which will support login using the Windows WeChat desktop protocol.

## About wechaty-puppet-laozhang

This puppet originates from another open source chatbot project [wechat-bot](https://github.com/cixingguangming55555/wechat-bot), crafted by the low-key individual developer Lao Zhang (老张). Like Wechaty's original intention, the chatbot provides developers with open source and free chatbot tools, and has accumulated 600+ stars and 190+ forks.

wechat-bot enables developers to log into WeChat using the official WeChat client on Windows machines, then uses DLL injection to obtain client HOOKs, and thus opens websocket and HTTP interfaces for external business program calls, receiving and sending WeChat messages locally.

### wechat-bot's Commonly Available Function Interfaces

#### Sending (websocket & http)

1. Client sends text messages to friends (supports websocket and HTTP)
2. Client gets contact list friend wxid and names (supports websocket and HTTP)
3. Client sends images to friends (supports websocket and HTTP)
4. Send AT messages (supports websocket and HTTP)
5. Send attachments (only supports HTTP, websocket)
6. Get chatroom member list (wxid) and nicknames (supports websocket and HTTP)

#### Receiving (websocket)

1. Text receiving
2. Image receiving (no decryption, no saving, XOR decryption available)
3. Quote message receiving
4. Official account message receiving
5. Friend request message receiving

#### Client Support

Java, Python, Node.js, C#, Easy Language—10 clients in 5 languages available

1. UoUoio contributed Java client
2. MickeyMi contributed Java client
3. ToBin shared Java client
4. Nuoyang (诺阳) contributed C# client
5. Kunming-C#-SakuraYuki contributed C# client
6. Yangself666 contributed Java client
7. tsingly contributed Python client
8. qq64161848 contributed Easy Language client
9. ttc contributed Python client
10. Lao Zhang personally contributed Node.js client

### Complementary Advantages of wechat-bot and Wechaty

Wechaty provides a standard set of chatbot interface specifications and tools—implement a WeChat bot with 6 lines of code, easy and standard. However, the Wechaty project itself doesn't provide Puppet Services but requires Puppet Providers. The first step in using Wechaty—"how to obtain a token"—is a frequently asked question from developers, which to a large extent prevents developers from quickly experiencing it.

The currently only free web protocol wechaty-puppet-wechat, due to protocol limitations, has natural defects in obtaining wxid and roomid.

Now the combination of the two will solve the above problems nicely. Similar to wechaty-puppet-wechat, wechaty-puppet-laozhang provides a token-free locally running puppet. Any Windows user can run the puppet locally to get the same free experience as the web protocol, while obtaining interface capabilities equivalent to other Puppet Services.

## When Will It Be Available

Phase 1: Q3 will provide localized wechaty-puppet-laozhang. The wechat-bot project's already opened function interfaces will be fully adapted and integrated into Wechaty. Developers can experience almost the same interfaces as paid Puppet Services using the Windows protocol locally.

Phase 2: Q4 will enrich wechaty-puppet-laozhang's function interfaces, while preparing to provide a commercial Windows protocol Puppet Service.

Before that, developers can still experience the currently best and free localized chatbot at the [wechat-bot](https://github.com/cixingguangming55555/wechat-bot) project.

## About Lao Zhang

Finally, we'd like to introduce the author of the wechat-bot project—Lao Zhang (老张), WeChat nickname "Lao Zhang Learns Technology" (老张学技术), with a WeChat official account of the same name. A low-key, rigorous poet and amateur programming enthusiast.

### Getting to Know Lao Zhang

- [Lao Zhang's wechat-bot open source project](https://github.com/cixingguangming55555/wechat-bot)

> Historical Articles

- [Wechaty + WeChat Mini Program to Implement Group Activity Registration](https://wechaty.js.org/2021/03/17/node-wechaty-and-wechaty-puppet-padlocal/)
- [Getting Started: How Beginners Can Publish Their First Blog in the Wechaty Community (Part 1)](https://wechaty.js.org/2021/04/22/how-to-publish-blog-on-wechaty/)

---

> 本文也有[中文版本](/2021/07/05/puppet-laozhang-wechat-bot/)。
