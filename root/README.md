---
description: >-
  Welcome to Chatie! We've created this documentation to help answer any
  questions you may have about what wechaty is, how to use it and what its APIs
  are.
---

## Wechaty 是什么  <a id="intro"></a>

## What is wechaty

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)[​![English Version](https://img.shields.io/badge/-English%20Version-blue.svg)​](https://docs.chatie.io/zh)

[Wechaty](https://github.com/Chatie/wechaty/) is a Wechat Bot SDK for Personal Account that lets you create software to extend the functionality of the Wechat, writen in Node.js with TypeScript, Support all platforms including [Linux](https://travis-ci.com/chatie/wechaty), [Windows](https://ci.appveyor.com/project/chatie/wechaty), [Darwin\(OSX/Mac\)](https://travis-ci.com/chatie/wechaty) and [Docker](https://app.shippable.com/github/Chatie/wechaty).

You can use wechaty building a personal wechat chatbot in just 6 lines of JavaScript code!

More Powerful Feature as follows:

* Manage Message: Automatic message reply
* Room Management: room creating/inviting/kicking off
* Friendship Management
* Intelligent dialogue Management: Just several configuration can get a task-oriented bot.
* ...

## 实现原理  <a id="web-limit"></a>

* 第一阶段：早期是基于网页版的微信客户端实现，详情查看 [Wechaty 101: from v0.0 to v0.7](https://blog.chatie.io/wechaty-101-presentation/) 这篇博客通过一个近2个小时的视频教程和ppt 来详细解释了实现原理。所有基于网页版本的实现均是**完全开源且免费的**。
* 第二阶段：[基于网页版的微信有了较多限制](./#web-limit-1)，为了方便开发者继续搭建自己的聊天机器人，我们提供了中间件 [Puppet](puppet.md) 来支持多种实现方式。[查看多种微信接入方式。](./#multi-protocal)

## 基于Web 微信的限制  <a id="web-limit"></a>

## Implementation

* First Period: Wechaty is based on web WeChat, see [Wechaty 101: from v0.0 to v0.7](https://blog.chatie.io/wechaty-101-presentation/). This blog showed how wechaty works by a 2 hours video tutorial and a big PPT. **All implement by web WeChat is fully open-source and free!**
* Second Period: There are a lot of [limitation using web WeChat](./#web-wechat-limitation). In order to make it more easy for chatbot developers, we provide Puppet to support third party to implement their WeChat implementations, see WeChat Protocal.

## Web WeChat Limitation



## Attention

Wechat account that registered after 2017 will not be able to login via Web API. Learn more at:

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)
* [\[RUMOR\] wechat will close webapi for wechat](https://github.com/Chatie/wechaty/issues/990)
* [New account login issue](https://github.com/Chatie/wechaty/issues/872)
* [wechaty-puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)

**Solution: Wechaty support protocols other than Web API, such as pad. Learn more at** [https://github.com/Chatie/wechaty/issues/1296](https://github.com/Chatie/wechaty/issues/1296)

## Just learning about Chatie?

Take a look at our [Wechaty 101 Talk](https://blog.chatie.io/wechaty-101-presentation/) which covers our core functionality, feature set and motivations behind the project.

## Curious how our technology works?

We recommend [reading the writeup](https://blog.chatie.io/wechaty-the-bot-sdk/) we did and checking out our [Github repo](https://github.com/Chatie/).

## See Also

## 支持多种微信接入方式  <a id="multi-protocal"></a>

我们提供多种微信协议的实现方式，在wechaty 的系统中，我们叫她[Puppet](https://github.com/Chatie/wechaty/wiki/Puppet)。Puppet的英文意思是`傀儡`, 很形象的描述了我们希望Puppet做的事情：帮助 Wechaty 来控制微信的操作。

  May 08, 2017 at 1:21PM  by Chris Mullins, Henrik Frystyk Nielsen, Vishwac Sena Kannan\]\([https://channel9.msdn.com/events/Build/2017/B8097](https://channel9.msdn.com/events/Build/2017/B8097)\)

* [完整的Puppet清单](puppet.md#puppet-list)
* [基于不同实现方式的Puppet兼容性对比](puppet.md#puppet-compatibility)


基于网页微信的实现方式是免费的，基于其他的接入方式是收费的。[这里是收费说明](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token)。

### Testing

* [Unit Testing for Bot Applications](https://www.microsoft.com/developerblog/2017/01/20/unit-testing-for-bot-applications/)

## 加入我们  <a id="join-us"></a>

{% hint style="success" %}
扫描下方二维码，回复 'wechaty' 加入 Wechaty Developers Home
{% endhint %}

{% hint style="danger" %}
群内均为wechaty 的开发者，群内发言之前请先阅读文档。
{% endhint %}

{% hint style="warning" %}

请不要问这些问题：

* Wechaty 怎么用？
* 有人成功过吗？
* 能不能实现_\*\*_？
* 为什么我跑不起来？
* 有待补充 …

![Wechaty Developers&apos; Home](https://chatie.io/wechaty-getting-started/bot-qr-code.png)

