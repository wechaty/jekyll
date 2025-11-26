---
title: "Open Source Leaders Talk - Wechaty's Open Source Journey"
author: windmemory
categories: announcement
tags:
  - summer-of-wechaty
  - summer-2021
  - talk
  - news
  - meetup
  - featured
  - ospp
  - ospp-admin
  - ecosystem
image: /assets/2021/06-summer-2021-open-source-en/001.webp
excerpt: >
  Yuan Gao (高原), Juzibot CTO and Wechaty committer, shares Wechaty's open source journey from 2016 to 2021, covering what Wechaty is, how to use it, the evolution of the Puppet architecture, and outstanding community projects.
---

## Self-Introduction

Yuan Gao (高原): Co-founder & CTO of Juzibot, Wechaty committer, former engineer at Amazon and Expedia, co-founder of Bot Friday.

![intro](/assets/2021/06-summer-2021-open-source-en/002.webp)

## Wechaty Open Source Journey Live Recording

{% include iframe.html src="https://www.youtube.com/watch?v=0UMLAA1Pa-s" %}

### Agendas

- [0:04:52](https://youtu.be/0UMLAA1Pa-s?t=293) Self-Introduction
- [0:05:55](https://youtu.be/0UMLAA1Pa-s?t=353) What is Wechaty
- [0:12:58](https://youtu.be/0UMLAA1Pa-s?t=778) How to Use Wechaty
- [0:22:18](https://youtu.be/0UMLAA1Pa-s?t=1338) Wechaty's Open Source Journey
- [0:39:39](https://youtu.be/0UMLAA1Pa-s?t=2379) Open Source Projects Based on Wechaty

## 1. What is Wechaty

- Official Introduction:
A Conversational RPA SDK for WeChat which can help you create a bot in 6 lines of JavaScript, with cross-platform support including Linux, Windows, Darwin (OSX/Mac) and Docker.
In other words, it's a framework that helps chatbot developers quickly build chatbots and supports multiple system platforms.

- Wechaty's Mission:
To provide chatbot developers with the best open source SDK, continuously optimize the SDK, and give developers the best experience. Help developers focus more on business logic rather than the underlying integration with platforms - they only need to write upper-layer application code.

- Developers' Reviews:
A Tencent software engineer and famous mini-program VP framework author used Wechaty for community management and commented: "Wechaty is a great solution, I believe there would be much more users recognize it."

A Google engineer and Haoshiyou project founder created a platform to help international students find housing. All interactions occur in WeChat groups, built on Wechaty, serving around 5,000 active users. He commented: "So easy to use, it made me want to cry."

- Wechaty is becoming increasingly popular. From 330 stars in 2016 to over 10,000 stars now is remarkable, as there aren't many projects on GitHub with more than 10,000 stars. Developers come from all over the world and from different internet companies: Microsoft, Tencent, Google, Alibaba, Baidu, etc. Contributors from various major companies have contributed code while using Wechaty. Wechaty has been referenced by 854 open source projects, and we know many non-open source projects also use Wechaty - the actual number of users is enormous.

## 2. How to Use Wechaty

- Example in TypeScript:

```yaml
---
import{Wechaty} from 'wechaty';
import QRCodeTerminal from 'qrcode-terminal';
---
```

- Import Wechaty and QR code packages

```yaml
---
const bot = new Wechaty({ name: 'my-bot' })
---
```

- Create a new bot and name it, add: login event, scan event (using the QR code package), message event (when the bot receives a message)

```yaml
---
bot
on('login',user => console.log(`Login: ${user}`))
on('scan',qrcode => QRCodeTerminal.generate(qrcode, { small: true }))
on('message', message => console.log(`Message: ${message}`))
start()
---
```

- Implement a chatbot in six lines of code

```yaml
---
const bot = new Wechaty({ name: 'my-bot' });
bot
on('login',user => console.log(`Login: ${user}`))
on('scan',qrcode => QRCodeTerminal.generate(qrcode, { small: true }))
on('message', message => console.log(`Message: ${message}`))
start()
---
```

- A simple ding-dong bot: when someone says "ding", the bot will say "dong"

You can implement any logic you want, perform different operations, and execute different commands after receiving messages to implement your desired logic. If interested, you can download it and play around with it.

## 3. Wechaty's Open Source Journey

Now that you know how to use it, let's talk about what we've experienced on the open source journey.

Wechaty began with chatbot enthusiast Huan Li (李卓桓). He's a lazy yet smart person. In 2016, before WeChat had the 500-person limit, he had 12,859 contacts in WeChat, hundreds of 100-person groups, and 1,000+ unread messages. Since he can program and contribute to open source, he hoped to automate processing WeChat messages, filter unnecessary messages, extract and filter important information for processing.

- Wechaty in 2016: Supported WeChat Web access, only had 300 stars at the time.

By 2018, WeChat Web version restricted login, and a large number of users couldn't use it. Non-web-based access solutions emerged in the community. To enable developers to seamlessly switch solutions, ensure stable operation, and improve efficiency, a new strategy was implemented. With different implementation methods and code, Wechaty underwent a major refactoring, introducing the Puppet concept. Puppet is an automated testing framework, essentially acting as an adapter.

![intro](/assets/2021/06-summer-2021-open-source-en/009.webp)

- Green section: The upper layer that developers directly interact with, consisting of different classes like those used in the examples, which developers frequently call when writing business logic.

- Red section (Puppet): An abstract concept that defines the abstract interface for connecting with Wechaty. The underlying implementation needs to follow the requirements. As long as the underlying implementation meets the standard, it will seamlessly integrate with Wechaty. The underlying implementation connects to different platforms for data interaction and then submits to the upper Wechaty layer.

- Huge Benefits of Puppet: Switch underlying implementations by changing environment variables without modifying any business logic code; developers don't need to worry about underlying access implementation, only focus on their business logic; different underlying implementations in the community can be seamlessly delivered to developers' hands, laying a solid foundation for more IM implementations in the future; more developers are willing to do underlying access, better cooperating with upper-layer developers.

- In 2019, interesting Wechaty projects began appearing in large numbers.

Discussions on WeChat cannot be archived in mailing lists or accessed via permanent addresses. Discussion content is mostly in Chinese, which is not friendly to international developers, hindering cross-border understanding and interaction. To solve these problems, OSS.CHAT was created. OSS.CHAT's functions include: when users post issues or comment on issues on GitHub, the corresponding WeChat group receives messages; group admins guide users to reply and discuss important information in GitHub issues while normal chat content is discussed in the group; Chinese issues posted are automatically translated into English.

If interested, here's how to join:

[Getting Started Tutorial (video)](https://youtu.be/HNksCmm_pvY)

[GitHub Repo](https://github.com/kaiyuanshe/osschat)

[Community Meeting Notes](https://shimo.im/docs/wGHydDxvWGjWKgDK)

In 2020, Wechaty joined the 2020 Open Source Software Supply Chain Lighting Program, greatly expanding the number of IM integrations supported by Wechaty, multi-language versions of Wechaty, and more non-JavaScript language developers joined the community. Wechaty supports a Plugin system - write code once and run it on 7 different mainstream platforms by just switching environment variables.

In 2021, Wechaty participated in Google Season of Docs, joined the 2021 Open Source Software Supply Chain Lighting Program, the main Wechaty project's star count exceeded 10,000, the Web version returned to Wechaty integration, and more interesting new IM integrations are in progress. We have many technical writers from around the world helping optimize our documentation, currently about 10 writers are working on it.

Endpoint and Goals:
We have achieved our mission to a certain extent. Now developers can largely focus only on business implementation without worrying about underlying implementation. Wechaty may not dare claim to be the best, but from developer feedback, we're already a very successful project.

## 4. Open Source Projects Based on Wechaty

### Divination Bot <https://wechaty.js.org/2020/06/28/build-divination-yibot/>

![intro](/assets/2021/06-summer-2021-open-source-en/010.webp)

### Poetry Search Bot <https://wechaty.js.org/2020/07/07/wechat-poem-robot/>

![intro](/assets/2021/06-summer-2021-open-source-en/011.webp)

### Party Entertainment Bot <https://wechaty.js.org/2020/06/06/wechaty-game-bot/>

![intro](/assets/2021/06-summer-2021-open-source-en/012.webp)

### Food Delivery Bot <https://wechaty.js.org/2019/12/23/wechaty-north-america-ricepo/>

![intro](/assets/2021/06-summer-2021-open-source-en/013.webp)

### Chinese Learning Assistant <https://wechaty.js.org/2020/06/19/archyshuo-anki-assistant/>

![intro](/assets/2021/06-summer-2021-open-source-en/014.webp)

### Miracleplus Bot <https://wechaty.js.org/2020/08/08/qijibot-sales-automation/>

![intro](/assets/2021/06-summer-2021-open-source-en/015.webp)

### Daily Work Report Bot <https://wechaty.js.org/2020/07/11/wechaty-daily-report/>

![intro](/assets/2021/06-summer-2021-open-source-en/016.webp)

If interested, there's more: <https://wechaty.js.org/blog/>

Finally, welcome everyone to join the Wechaty community. Project, documentation, and blog addresses:

Project: <https://github.com/wechaty/wechaty>

Documentation: <https://wechaty.js.org/v/zh/>

Blog: <https://wechaty.github.io/>

## Welcome Your Participation

If anyone is interested in joining us to improve the efficiency of marketing processes on enterprise-level SCRM software, please contact me and let's discuss whether we can collaborate.

![intro](/assets/2021/06-summer-2021-open-source-en/008.webp)

> Author: [windmemory](https://github.com/windmemory)

---

> 本文也有[中文版本](/2021/06/05/summer-2021-open-source/)。
