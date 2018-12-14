# Introduction

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

See more in [Wechaty](https://github.com/chatie/wechaty) [![NPM Version](https://badge.fury.io/js/wechaty.svg)](https://badge.fury.io/js/wechaty) [![Docker Pulls](https://img.shields.io/docker/pulls/zixia/wechaty.svg?maxAge=2592000)](https://hub.docker.com/r/zixia/wechaty/) [![TypeScript](https://img.shields.io/badge/<%2F>-TypeScript-blue.svg)](https://www.typescriptlang.org/) [![Greenkeeper badge](https://badges.greenkeeper.io/Chatie/wechaty.svg)](https://greenkeeper.io/)

## Just learning about Wechaty?

* First Period: Wechaty is based on web WeChat. **All implement by web WeChat is fully open-source and free!**
* Second Period: There are a lot of [limitations when using web WeChat](./#web-wechat-limitation). In order to make it more easy for chatbot developers, we provide Puppet to support third party to implement their WeChat implementations, see WeChat Protocal.

Take a look at our [Wechaty 101 Talk](https://blog.chatie.io/wechaty-101-presentation/) which covers our core functionality, feature set and motivations behind the project.

## Web WeChat Limitations

1. WeChat Account that registered after 2017 mignt not be able to login Web Wechat, so it can not use PuppetPuppeteer with Wechaty. Please make sure your WeChat Account can be able to login by visiting [https://wx.qq.com](https://wx.qq.com/)
2. Web API can not create room and invite members to room since 2018.

related issues:

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)
* [\[RUMOR\] wechat will close webapi for wechat](https://github.com/Chatie/wechaty/issues/990)
* [New account login issue](https://github.com/Chatie/wechaty/issues/872)
* [wechaty-puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)

If you want to break the above limitations, please consider to use a Wechaty Puppet other than using Web API, like [wechaty-puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat).

Learn more about the Puppet at [Wechaty wiki: Puppet](https://github.com/Chatie/wechaty/wiki/Puppet)

## Curious how our technology works?

We recommend [reading the writeup](https://blog.chatie.io/wechaty-the-bot-sdk/) we did and checking out our [Github repo](https://github.com/Chatie/).

## Support Multi WeChat Protocols

The term `Puppet` in Wechaty is a name that we had picked up to describe part of our system: Puppet is an Abstract Class for implementing plugins, the plugins are the component that helps Wechaty to control the Wechat, that's the reason we call it `puppet`.

Plugins are named PuppetXXX, like PuppetPuppeteer is using the chrome puppeteer to control the WeChat Web API via a chrome browser, PuppetPadchat is using the WebSocket protocol to connect with a Protocol Server for controlling an iPad program. Here is the related information:

* ​[Full Puppet List](puppet-1.md#2-wechaty-puppet-list)
* ​[Wechaty Puppet compatibility](puppet-1.md#3-wechaty-puppet-compatibility)

For a deeper understanding of the Puppet in Wechaty, you can read its source code if you like at [https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts](https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts)

All implement by web WeChat is fully open-source and free, if you need other implement, you should pay for it, [see Why we charge for token](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/Buy-Padchat-Token).

Here is the whole image for wechaty puppet introduction:

![Puppet](.gitbook/assets/image.png)

## Join Us

{% hint style="success" %}
Scan the following QRCode, reply ''wechaty" to join Wechaty Developers' Home.
{% endhint %}

{% hint style="danger" %}
Please read the doc before you ask question in the group. We don't welcome any discussion unrelated to wechaty, or you should give a red pocket\(more than 100 RMB\) in the group.
{% endhint %}

![Wechaty Developers&apos; Home](.gitbook/assets/image%20%281%29.png)



