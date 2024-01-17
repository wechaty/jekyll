---
title: "Wechaty for non-Weixin accounts"
author: aherman3
categories: talk
tags: puppet-wechat
image: /assests/2024/01-wechaty-for-non-weixin-accounts/error-message.webp
---

Due to Tencent policy change in 2017, newly created accounts are unable to login via Web Wechat. Since Wechaty uses Wechat Web API, Wechaty is also unable to login for these accounts. This issue can be solved with [UOS](https://github.com/wechaty/jekyll/blob/main/jekyll/_posts/2021-04-13-wechaty-uos-web.md).

Even using UOS, some users may find they are still unable to log in. This may be due to being a WeChat user, rather than Weixin. Weixin and WeChat users are differentiated by mobile numbers, Weixin users use Chinese Mainland mobile numbers while WeChat users use non-Chinese Mainland mobile numbers. You can check which type of user you are through Wechat -> Settings -> About -> Terms of Service.

If you are a Wechat user, don't worry! There are still multiple puppets you can use to access Wechaty. As a WeChat user, I was able to successfully access Wechaty with all 3 methods.

## 1. Puppet XP

[Wechaty Puppet XP](https://github.com/wechaty/puppet-xp) for Windows logs in through Windows Desktop Wechat, so it is usable for Wechat users. If you use a Mac, you can still use puppet-xp through Bootcamp to partition a Windows OS.

Requirements
1. Windows OS
2. Your system must have Node.js installed (version >= 12).
3. Install and login to Windows Desktop WeChat (v3.9.2)

```shell
git clone https://github.com/wechaty/wechaty-puppet-xp.git
cd wechaty-puppet-xp
npm install
npm start
```

## 2. PadLocal

[Wechaty Puppet PadLocal](https://wechaty.js.org/docs/puppet-services/padlocal) can workaround Wechat user limitations without requiring Windows. PadLocal can also be used without VM. 

Requirements
1. Your system must have Node.js installed (version >= 12).
2. Your system must have Wechaty (version >= 0.40).

```shell
npm install wechaty-puppet-padlocal
export WECHATY_PUPPET=wechaty-puppet-padlocal
export WECHATY_PUPPET_PADLOCAL_TOKEN=__TOKEN__ ## free token for 7 days from pad-local.com
npm start
```

## 3. Whatsapp

Whatsapp has no conflict with mainland v. non-mainland numbers. Change your Wechaty puppet to Whatsapp Web protocol and use Whatsapp to scan the QR.

```shell
npm install wechaty-puppet-whatsapp
export WECHATY_PUPPET=wechaty-puppet-whatsapp
npm start
```