---
title: "Build a WeChat Sweet-Talk Bot in Three Steps with Node.js - Beginner Friendly"
author: leochen-g
categories: project
tags:
  - code
  - featured
  - entertainment
  - ecosystem
image: /assets/2019/everyday-header.webp
excerpt: >
  A beginner-friendly Node.js tutorial for building a WeChat bot that sends daily weather updates, sweet messages, and relationship reminders to your significant other, with optional AI chatbot integration.
---

Build a WeChat sweet-talk bot in three steps with Node.js - beginner friendly! Can also be used to sweet-talk your girlfriend/boyfriend - we programmers are serious about romance!

## Foreword

Have you noticed the Python version of "WeChat Daily Say" trending recently? It dominated GitHub's Python trending list for nearly two weeks. Are frontend developers feeling a bit envious? Since it's in the less familiar Python language, learning and using it might not be as comfortable. Wouldn't it be great to use our familiar JavaScript to build our own girlfriend-sweetening tool! 😆

We frontend developers are also serious about sweet-talking! We can also build an automatic sweet-talk tool!

## Project Introduction

Actually, the "WeChat Daily Say" project was completed back in March. I published an article at that time: ["Using Node+Wechaty to Write a Crawler Script that Sends Daily Sweet Messages to Your Girlfriend/Boyfriend"](https://juejin.im/post/5c77c6bef265da2de6611cff). Those who have seen it should remember. Since that article was more technical and a friend said it might not be suitable for beginners, at his suggestion, I reorganized the code and created video tutorials to make it accessible to anyone.

I'm also maintaining two projects: one is this project ["WeChat Daily Say"](https://github.com/gengchen528/wechatBot) suitable for beginners - simple operation, convenient configuration, easy to get started. The other is ["WeChat Personal Secretary"](https://github.com/gengchen528/wechat-assistant), with more features including auto-join groups, auto-add friends, auto-reply, scheduled reminders, etc. Since it involves database operations, it's mainly for those with programming experience. Interested friends can refer to ["Building a Personal WeChat Secretary with koa2+wechaty"](https://juejin.im/post/5ca1dd846fb9a05e6c77b72f).

This project uses Node and the Wechaty WeChat web interface to develop a tool that can send daily weather conditions, weather reminders, and a daily quote to your girlfriend. After configuring the bot API, it can also achieve WeChat bot auto-chat with your girlfriend.

## Project Repository

GitHub: [https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)

Let's see if frontend developers can send this project to trending! Haha

## Effect Preview

Before the three-step tutorial, let's look at the effect

![image](/assets/2019/everyday-1.webp)

![image](/assets/2019/everyday-2.webp)

You can see messages sent at specified times, including weather information, weather reminders, and how many days you've been together. When the bot is enabled, your girlfriend can chat with the assistant. However, current open-source bot APIs aren't very intelligent, and semantic matching may not be very accurate. So remember not to enable the bot when your girlfriend is angry, or incorrect responses might get you in trouble! 😨

This project initially used Turing Bot, but Turing Bot recently imposed restrictions - unverified users can't call the API, and verified users only get 100 calls per day. This is quite limited - you can't finish sweet-talking before being restricted, which is terrible (manual smirk)! So I switched to Tianxing Bot API, which has fewer restrictions and provides enough free API calls. I've made it available in the project, but I still recommend everyone apply for their own account, as you can customize the bot name and set your own reply content.

## Video Tutorial

{% include iframe.html src="//www.bilibili.com/video/av56077628" %}

## Three-Step Tutorial

### Step 1: Install Node

Node official website: [https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

Download and install the Node version for your system. For Windows, `.msi` package is recommended - just keep clicking next. Same for other systems.
> Windows Node installation guide: [https://www.cnblogs.com/liuqiyun/p/8133904.html](https://www.cnblogs.com/liuqiyun/p/8133904.html)
> Mac Node installation guide: [https://blog.csdn.net/qq_32407233/article/details/83758899](https://blog.csdn.net/qq_32407233/article/details/83758899)
> Linux Node installation guide: [https://www.cnblogs.com/liuqi/p/6483317.html](https://www.cnblogs.com/liuqi/p/6483317.html)

![image](/assets/2019/everyday-3.webp)

After installation, hold `Shift+Right Click` and select "Open command window here". Execute `node -v` in the command line - if a version number appears, installation succeeded.

![image](/assets/2019/everyday-4.webp)

### Step 2: Download Code and Configure

Code repository: [https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)

* Visit this address and directly download the zip package to your desktop, then extract it

![image](/assets/2019/everyday-5.webp)

* Enter the directory and find the `index.js` file in the `config` directory

![image](/assets/2019/everyday-6.webp)

![image](/assets/2019/everyday-7.webp)

* Right-click the `index.js` file and select "Open with". If you don't have a code editor, use Notepad. If you have a code editor, use that directly. Non-developers can download `notepad++`, download link: [https://pan.baidu.com/s/1mWdEOaTQ1D6kihQveN1JHw](https://pan.baidu.com/s/1mWdEOaTQ1D6kihQveN1JHw) Password: fn9g. Developers can use their preferred editor.

![image](/assets/2019/everyday-8.webp)

* Configuration items to modify: Your girlfriend's WeChat remark name `NAME` must be changed, or you'll be sending messages to me 😂. WeChat nickname `NICKNAME` should also be filled in. Your anniversary `MEMORIAL_DAY` needless to say, must be changed.
* If sending weather info, your girlfriend's city `CITY` must be modified. For the `LOCATION` spelling, I suggest checking Moji Weather's official website [https://tianqi.moji.com/weather/china/](https://tianqi.moji.com/weather/china/)

![image](/assets/2019/everyday-9.webp)

* After finding the corresponding area's weather on Moji Weather, check the webpage URL. Fill the green-marked pinyin into `CITY` and the red-marked pinyin into `LOCATION`

![image](/assets/2019/everyday-10.webp)

* Daily send time `SENDDATE` - the rules can be found in the `index.js` file in the `schedule` directory. `0 06 8 * * *` means every day at 8:06:00 AM. Usually, we only need to configure the first three fields.
* To enable bot chat, set `AUTOREPLY` to `true`. I've abandoned Turing Bot for reasons mentioned above and switched to Tianxing Bot, but don't expect too much - it's not that intelligent 😂. Currently, since my API calls are still abundant, I've made it available in the project code. Just modify `AUTOREPLY` to enable auto-reply.

```js
// Configuration file
module.exports = {
    // Basic scheduled send function config (required)
    NAME: 'Leo_chen', //Girlfriend's remark name
    NICKNAME: 'Leo_chen', //Girlfriend's nickname
    MEMORIAL_DAY: '2015/04/18', //Your anniversary
    CITY: 'shanghai', //Girlfriend's city
    LOCATION: "pudong-new-district", //Girlfriend's district (check Moji Weather website for English spelling)
    SENDDATE: '0 06 8 * * *', //Scheduled send time - 8:06:00 AM daily, see /schedule/index.js for rules
    ONE: 'http://wufazhuce.com/', //ONE web version website
    MOJI_HOST: 'https://tianqi.moji.com/weather/china/', //China Moji Weather url

    //Advanced features (optional)
    AUTOREPLY: true, //Auto-chat feature - disabled by default
    AIBOTAPI: 'http://api.tianapi.com/txapi/robot/', //Tianxing Bot API - register at https://www.tianapi.com/signup.html?source=474284281
    APIKEY: 'Tianxing Bot apikey', //Tianxing Bot apikey
}
```

### Step 3: Run the Program

After configuring and saving the file, return to the project's main directory. For Windows, hold `Shift+Right Click` and select "Open command window here".

![image](/assets/2019/everyday-11.webp)

* Then enter `npm install`.

![image](/assets/2019/everyday-12.webp)

* After installation completes, enter `npm run start`. A file will download (it's quite large, so wait a bit). When the QR code appears, scan it with your WeChat app to log in. Then enjoy the chat! 😆

![image](/assets/2019/everyday-13.webp)

![image](/assets/2019/everyday-14.webp)

* If `npm run start` fails, first execute `npm install wechaty-puppet-puppeteer@^0.17.14 --no-save` then execute `npm run start`

## Common Issues

* Check if Node version is greater than 10
* Delete package-lock.json file if it exists
* Delete `node_modules` and re-execute `npm install`
* You can also add the assistant's WeChat and send 'join group' to enter the WeChat Daily Say technical exchange group

1. My WeChat account cannot log in
    1. Starting from late June 2017, using solutions based on web WeChat has a high probability of being restricted from logging in. Main symptom: Unable to log into Web WeChat, but doesn't affect mobile and other platforms. Verify if you're restricted: Try scanning the QR code at <https://wx.qq.com> to see if you can log in. If not, you may not be able to use this tool. More details:
    1. [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/wechaty/wechaty/issues/603)
    1. [[Rumor] WeChat will close the web version](https://github.com/wechaty/wechaty/issues/990)
    1. [Newly registered WeChat accounts cannot log in](https://github.com/wechaty/wechaty/issues/872)
2. Cannot install puppet-puppeteer && Chromium when executing npm run start
3. Deployment issues on Centos7
    ![image](/assets/2019/everyday-15.webp)
    Problem cause: [https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)
    Solution:

    ```shell
    #Dependencies
    yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

    #Fonts
    yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
    ```

4. On Windows, puppeteer download fails
    Execute `npm install wechaty-puppet-puppeteer@^0.17.14 --no-save`

## Notice

This project is developed out of personal interest. It's open-sourced for technical exchange. Please do not use this project for anything that violates WeChat rules or other illegal activities. Commercial use is not recommended. It's suggested to test with a secondary account as there's a risk of web login ban (client unaffected). Please ensure voluntary use. The author is not responsible for web login bans caused by improper personal use. Thank you for understanding.

## Finally

If your WeChat account cannot log in or you have technical questions to discuss, add my WeChat assistant and send 'join group' - it will automatically send the exchange group QR code. This secondary account also has more advanced features waiting for you to discover. (Note: Friend requests are automatically approved within 20s)

![image](/assets/2019/everyday-16.webp)

Try it yourself and I'm sure you'll discover more fun features!

Also, my public account has integrated Microsoft Xiaoice. After following, send voice messages and a young lady's voice will chat with you. You can also text chat with her. Feel free to try if interested - singles welcome!

![image](/assets/2019/everyday-17.webp)

> Author: [Leo_chen](https://github.com/leochen-g/), frontend engineer, enjoys using Node for various small projects, working at a big data company. This article was first published on Juejin: [Build a WeChat Sweet-Talk Bot in Three Steps with Node.js](https://juejin.im/post/5d09fa9f51882508bd2065f4)

---

> 本文也有[中文版本](/2019/06/21/three-step-get-girlfriend/)。
