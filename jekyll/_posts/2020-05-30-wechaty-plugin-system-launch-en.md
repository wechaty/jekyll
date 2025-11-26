---
title: "Wechaty Plugin System Launch Event: Join Us on May 30th"
author: juzibot
categories: announcement
tags:
  - talk
  - news
  - meetup
  - featured
  - ecosystem
image: /assets/2020/05-30-wechaty-plugin-system-launch/001.webp
excerpt: >
  Wechaty officially launches its complete plugin system, allowing developers to call pre-packaged plugin capabilities with just one line of code. Join our May 30th event to learn more.
---

## If You Don't Know Wechaty, Here's a Quick Introduction

- Wechaty is an open-source chatbot framework SDK with 8,000 stars on GitHub—a highly encapsulated, highly available, multi-language chatbot framework.

## Now, Read Three More Sentences to Learn About Our New Progress

![002](/assets/2020/05-30-wechaty-plugin-system-launch/002.webp)

- Wechaty officially launches its complete plugin system, allowing developers to call pre-packaged plugin capabilities with just one line of code.
- Wechaty will hold a sharing event on May 30th (Saturday) afternoon to introduce how to use and develop Wechaty plugins (scan the QR code at the end to register).
- Wechaty will hold a series of plugin open source month activities over the next month and distribute Wechaty service tokens worth hundreds of thousands (scan the QR code at the end to join the group).

Looking back at the long past, the development history of software systems is a history of layer-by-layer encapsulation evolution.
From assembly language to high-level languages, from command line to graphical interfaces...
Undoubtedly, "encapsulation" has made computers extremely usable from the user's perspective.
The same story holds true at smaller touchpoints: in already encapsulated projects, performing deeper "encapsulation" of code segments for common operations, implementing complete functionality with just one line of code, will be a new exponential improvement in efficiency.

![003](/assets/2020/05-30-wechaty-plugin-system-launch/003.webp)

Wechaty's story began with using RPA to simulate logging into WeChat. Over the past few years, it has served tens of thousands of developers and garnered 8,000 stars on GitHub.
<https://github.com/wechaty/wechaty>

We encapsulated work that was previously unimaginable for most people into an npm package that can simulate WeChat login with as few as six lines of code through tens of thousands of lines of code.

```sh
import { Wechaty }  from 'wechaty' // import { Wechaty } from 'wechaty'
Wechaty.instance() // Global Instance
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
.on('login',            user => console.log(`User ${user} logined`))
.on('message',       message => console.log(`Message: ${message}`))
.start()
```

However, for truly usable WeChat chatbots, inevitably a large amount of logic is needed to handle sending and receiving messages under different conditions, group management, and even coupling with external systems.
This means that even though operations like receiving messages, sending messages, and adding friends each require only one line of code, completing a complex task still requires dozens of lines of code.
With expectations for plug-and-play functionality, we launched a complete plugin system.
<https://github.com/wechaty/wechaty-plugin-contrib>
For traditionally complex functions that require dozens of lines of code, based on already encapsulated npm packages, you only need to follow the documentation and use as little as one line of code to call them.
If you're interested, please click the link above immediately and quickly start using plugins that developers have already written!

![004](/assets/2020/05-30-wechaty-plugin-system-launch/004.webp)
If you're interested, scan the code first!
We will post this event's link, corresponding open source plugin GitHub links in the group, and continuously announce new developments regarding Wechaty plugin-related open source activities.

![005](/assets/2020/05-30-wechaty-plugin-system-launch/005.webp)

In the event, we will invite Wechaty author Huan Li (李卓桓), Wechaty Plugin designer Gcaufy, Wechaty Puppet Donut/Padplus author Yuan Gao (高原), and Wechaty Plugin developer Mo Yang Wang (王墨炱) to share in-depth on Wechaty development ecosystem, complete plugin development guide, commercial possibilities of plugins, and other areas. The agenda is as follows:

May 30th (Saturday) afternoon

14:00 - 14:05 Wechaty Community Team "Plugin Open Source Month" event opening and agenda introduction

14:05 - 14:25 Wechaty Author Huan Li: Wechaty project and community ecosystem introduction

14:25 - 14:55 Wechaty Plugin Designer, Tencent WeChat Mini Program Framework open source project Wepy author Gcaufy: Plugin system development journey and applications

14:55 - 15:00 Break

15:00 - 15:30 Wechaty Puppet Donut/Padplus Author Yuan Gao: Commercial implementation prospects of Wechaty plugins

15:30 - 16:00 Wechaty Plugin Developer Mo Yang Wang: Plugin-based Wechaty development

![006](/assets/2020/05-30-wechaty-plugin-system-launch/006.webp)

---

> 本文也有[中文版本](/2020/05/30/wechaty-plugin-system-launch/)。
