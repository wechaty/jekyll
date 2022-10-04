---
title: "Wechaty community meetup: Office Hour, Feb 22th, 2022"
author: leochen-g
categories: talk
tags:
  - wechaty-puppet-walnut
  - wechaty-ui
  - meetup
image: /assets/2022/07-wechaty-office-hour/icon.webp
---

7月22日，周五，社区在线上举办了一个 Office Hour 的视频会议，由 `@Huan`，`@wj-Mcat`，`@Leo_chen` 共同讨论了一下社区中一些新项目的进展，并且相互提出了一些建议。

**本篇文章是基于视频会议回放整理出来的内容**，视频会议回放如下：

{% include iframe.html src="https://www.youtube.com/watch?v=JAOhsyW937c" %}

## 与会者介绍

[@huan](https://github.com/huan), [Huan LI](https://wechaty.js.org/contributors/huan), Creator of Wechaty, Tencent TVP of Chatbot

[@wj-Mcat](https://github.com/wj-Mcat), Author of [python-wechaty](https://github.com/wechaty/python-wechaty)

[@Leo_chen](https://github.com/leochen-g): Author of [Wechaty-web-panel](https://github.com/leochen-g/wechaty-web-panel)

## 个人分享环节

### Leo_chen

近期关注：

- 硬核桃社区5G消息套件 的 [puppet-walnut](https://github.com/wechaty/puppet-walnut)
- 硬核桃社区5G消息网关 的 [puppet-walnut-gateway](https://github.com/leochen-g/puppet-walnut-gateway)
- 关于适配市面支持http调用的IM接口

### wj-Mcat

近期关注：

- Wechaty-ui的开发推进，实现Wechaty社区官方的UI插件管理中心

### huan

- 回顾了最早时期Wechaty的愿景，具体文档可以参见[Wechaty 101](https://docs.google.com/presentation/d/13oUOIEnzdLWO6KZWztD_pMuu22AQ3SIMjk2wp8f-f18/edit#slide=id.g194ee6e600_0_51)

## FAQ Meetup

主要讲四块：

- 5G消息puppet模块的更替，需要和丁生和康嘉再进行一次讨论
- 关于Post Message 的扩展，可以支持更多的其他消息类型
- 关于实现engine-template去支持市面所有可以进行http或websocket的调用的协议
- Wechaty-ui的设计模式及具体展现形式

## Suggestions

### Wechaty-ui：

- strongly suggests using Angular as a web framework because Angular will be used with the official Wechaty cloud service in the future

### CQRS & DDD：

Event Driven Programming with Wechaty：

- [Event Driven Wechaty-cqrs](https://wechaty.js.org/2022/03/17/event-driven-wechaty-cqrs/)
- [CQRS](https://github.com/wechaty/cqrs)

## Future Wechaty Community Official Hour

[https://calendly.com/huan/wechaty](https://calendly.com/huan/wechaty)
