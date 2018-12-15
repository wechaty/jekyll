# 介绍

## Wechaty 是什么    <a id="intro"></a>

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty) [![English Version](https://img.shields.io/badge/-English%20Version-blue.svg)](https://docs.chatie.io/)

[Wechaty](https://github.com/Chatie/wechaty/) 是一个开源的的 **个人号** 微信机器人接口，是一个使用Typescript 构建的Node.js 应用。支持多种微信接入方案，包括网页，ipad，ios，windows， android 等。同时支持[Linux](https://travis-ci.com/chatie/wechaty), [Windows](https://ci.appveyor.com/project/chatie/wechaty), [Darwin\(OSX/Mac\)](https://travis-ci.com/chatie/wechaty) 和 [Docker](https://app.shippable.com/github/Chatie/wechaty) 多个平台。

只需要6行代码，你就可以 **通过个人号** 搭建一个 **微信机器人功能** ，用来自动管理微信消息。

更多功能包括：

* 消息处理：关键词回复
* 群管理：自动入群，拉人，踢人
* 自动处理好友请求
* 智能对话：通过简单配置，即可加入智能对话系统，完成指定任务
* ... 请自行开脑洞

详情请看[Wechaty](https://github.com/chatie/wechaty)项目 [![NPM Version](https://badge.fury.io/js/wechaty.svg)](https://badge.fury.io/js/wechaty) [![Docker Pulls](https://img.shields.io/docker/pulls/zixia/wechaty.svg?maxAge=2592000)](https://hub.docker.com/r/zixia/wechaty/) [![TypeScript](https://img.shields.io/badge/<%2F>-TypeScript-blue.svg)](https://www.typescriptlang.org/) [![Greenkeeper badge](https://badges.greenkeeper.io/Chatie/wechaty.svg)](https://greenkeeper.io/)

## 实现原理    <a id="web-limit"></a>

* 第一阶段：早期是基于网页版的微信客户端实现，详情查看 [Wechaty 101: from v0.0 to v0.7](https://blog.chatie.io/wechaty-101-presentation/) 这篇博客通过一个近2个小时的视频教程和ppt 来详细解释了实现原理。所有基于网页版本的实现均是**完全开源且免费的**。
* 第二阶段：[基于网页版的微信有了较多限制](./#web-limit-1)，为了方便开发者继续搭建自己的聊天机器人，我们提供了中间件 [Puppet](puppet.md) 来支持多种实现方式。[查看多种微信接入方式。](./#multi-protocal)

## 基于Web 微信的限制    <a id="web-limit"></a>

1. 从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： [https://wx.qq.com](https://wx.qq.com) 上扫码查看是否能登陆。
2. 从2018年开始，web api 无法创建群聊和自动拉人入群。

更多内容详见：

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)
* [\[谣言\] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)
* [新注册的微信号无法登陆](https://github.com/Chatie/wechaty/issues/872)
* [wechaty-puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)

{% hint style="success" %}
**解决方案： 我们提供了非web 版本解决方案，**[**点击购买token**](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token) **, 更多技术细节查看** [**wechaty-puppet-padchat**](https://github.com/lijiarui/wechaty-puppet-padchat)
{% endhint %}

## 支持多种微信接入方式    <a id="multi-protocal"></a>

我们提供多种微信协议的实现方式，在wechaty 的系统中，我们叫她[Puppet](https://github.com/Chatie/wechaty/wiki/Puppet)。Puppet的英文意思是`傀儡`, 很形象的描述了我们希望Puppet做的事情：帮助 Wechaty 来控制微信的操作。

所有的实现方式都以`PuppetXXX` 来命名的，比如[PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) 是通过谷歌浏览器，通过 [google puppeteer](https://github.com/GoogleChrome/puppeteer)来控制[网页微信API](https://wx.qq.com)。[PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) 是通过WebSocket 连接一个协议服务器来控制iPad 微信，两个重要的信息参考：

* [完整的Puppet清单](puppet.md#puppet-list)
* [基于不同实现方式的Puppet兼容性对比](puppet.md#puppet-compatibility)

如果你希望深入了解Puppet是如何在Wechaty 运行的，你可以在[https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts](https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts) 查看源代码。

基于网页微信的实现方式是免费的，基于其他的接入方式是收费的。[这里是收费说明](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token)。

以下是Puppet 和Wechaty 的架构图，更多Puppet 的介绍在这里： [Puppet in wiki](https://github.com/Chatie/wechaty-puppet/wiki)

![](https://github.com/Chatie/docs/blob/master/docs/images/puppet.png)

## 加入我们    <a id="join-us"></a>

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

![Wechaty Developers&apos; Home](https://chatie.io/wechaty/images/bot-qr-code.png)

