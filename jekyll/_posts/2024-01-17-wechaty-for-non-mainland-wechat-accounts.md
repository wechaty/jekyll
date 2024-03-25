---
title: "Wechaty for non-Weixin accounts"
author: aherman3
categories: talk
tags: puppet-wechat
image: /assets/2024/01-wechaty-for-non-mainland-wechat-accounts/error-message.webp
---

## Using Wechaty with a non-mainland China WeChat account

When scanning to access Wechaty, some international users may find they are still unable to log in. This may be due to which version of WeChat your account is registered with. **If your account was created with a non-Chinese Mainland mobile number (numbers not beginning with +86), you are using the international version of WeChat, which has some differences in service.** You can check which type of user you are through WeChat → Settings → About → Terms of Service.

The international version of WeChat does not allow WeChat Web login, so scanning the default service Wechaty login QR will return the message "Service unavailable for this account".

If you are a non-mainland Chinese Wechat user, don't worry! There are still multiple puppets you can use to access Wechaty. With my non-mainland Chinese account, I was able to successfully access Wechaty with all methods.

## 1. Puppet XP

[Wechaty Puppet XP](https://github.com/wechaty/puppet-xp) for Windows logs in through Windows Desktop Wechat, so it is usable for Wechat users. If you use a Mac, you can still use puppet-xp through Bootcamp to partition a Windows OS.

- Requirements
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

- Requirements
    1. Your system must have Node.js installed (version >= 12).
    2. Your system must have Wechaty (version >= 0.40).

```shell
npm install wechaty-puppet-padlocal
export WECHATY_PUPPET=wechaty-puppet-padlocal
export WECHATY_PUPPET_PADLOCAL_TOKEN=__TOKEN__ ## free token for 7 days from pad-local.com
npm start
```

## 3. Whatsapp

Whatsapp has no conflict with mainland v. non-mainland numbers. Change your Wechaty puppet to [Whatsapp Web protocol](https://wechaty.js.org/docs/puppet-providers/whatsapp/) and use Whatsapp to scan the QR.

```shell
npm install wechaty-puppet-whatsapp
export WECHATY_PUPPET=wechaty-puppet-whatsapp
npm start
```

## 4. WorkPro

[Wechaty WorkPro Puppet](https://wechaty.js.org/docs/puppet-services/workpro) provided by RPAChat is also available. It is recommended to us Github Codespace for installation.

- Requirements
    1. Your system must have Node.js installed (version >= 16).
    2. Use latest version of Wechaty

First set environment variables

```shell
export WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
```

Then revise examples/ding-dong-bot.ts by changing lines 73-76 to the following code

```node
puppet: 'wechaty-puppet-service', // NOTE: NOT 'wechaty-puppet-workpro'
 puppetOptions: {
   token: 'xxx', // your token (ex.'puppet_workpro_xxxxxx')
 }
```

And launch

```shell
npm start
```
