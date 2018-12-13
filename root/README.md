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

## 

