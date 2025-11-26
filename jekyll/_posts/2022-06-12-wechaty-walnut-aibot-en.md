---
title: "Best Practice of 5G Messaging puppet-walnut - 5G Intelligent Assistant"
author: leochen-g
categories: article
tags:
  - code
  - puppet-walnut
  - news
image: /assets/2022/06-wechaty-walnut-aibot-en/walnut-aibot.webp
excerpt: >
  As the first prize winner of the 2022 5G Messaging Developer Marathon, this article introduces the 5G Intelligent Assistant platform built with Wechaty's puppet-walnut, demonstrating best practices for 5G messaging bot development.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/06/12/wechaty-walnut-aibot/).
  
I'm glad to write this article as the first prize winner of the "Launch Plan - 2022 5G Messaging Developer Marathon" competition, otherwise this 5G Intelligent Assistant platform might not be considered a best practice 😄. I'd also like to thank Teacher Li Zhuohuan and Teacher Kang Jia for providing suggestions and guidance during the competition, as well as student Ding Sheng, the author of `puppet-walnut`.

## Project Background

As a new form of text messaging, 5G messaging is gradually appearing in people's vision. Like most people, when I first saw 5G messaging, I didn't understand what form it takes, how it should be applied to real-life scenarios, and how we developers should integrate with 5G messaging. It wasn't until I saw the Wechaty community post a notice for the "Launch Plan - 2022 5G Messaging Developer Marathon" competition that I started paying attention. I discovered that 5G messaging can be directly integrated with Wechaty, and integrating with 5G messaging has its corresponding `puppet-walnut`. My first thought was whether the [WeChat Intelligent Assistant](https://wechaty.js.org/2020/05/31/wechaty-web-panel-plugin/) I had previously developed could be directly integrated for use?

For this, I consulted quite a bit of community documentation and [HardWalnut official website](https://www.5g-msg.com/#/) introductions, and finally understood 5G messaging. Actually, another name for 5G messaging is RCS (Rich Communications Services). It supports sending richer content forms such as text, images, videos, red envelopes, locations, contacts, documents, and rich media cards. Looking at it this way, it's very similar to WeChat, so integrating with the previous Intelligent Assistant platform shouldn't be a problem at all - just need to remove some group-related functions. Because 5G messaging currently doesn't have the concept of groups, only the concept of contacts.

This way, all functions of the Intelligent Assistant platform can be completely reused, saving a lot of development costs, and the integration is also very simple. All this is thanks to Wechaty's overall architectural design. A new IM is just a `puppet`, what changes is the underlying `puppet`, what remains unchanged is the business logic and methods. This approach can really save developers a lot of time, putting most time and focus on functional logic. One feature can be applied to all `puppets`. Next, let me introduce in detail the 5G Intelligent Assistant platform and tell everyone how to quickly implement a 5G Intelligent Assistant.

## About the 5G Intelligent Assistant Platform

![image](/assets/2022/06-wechaty-walnut-aibot-en/web.webp)

The 5G Intelligent Assistant is an intelligent conversation bot management platform developed based on Wechaty. Unlike other single bots, we can configure and generate many different functional conversation bots through this platform.

It integrates multiple intelligent conversation platforms for your choice, including Laiye, Tianxing, Turing, Tencent Xianliao, etc. It also has built-in user scheduled tasks, daily reminders, anniversary reminders, same-day reminders, scheduled news, and many other functions for user convenience.

At the same time, material management and openapi functions have been added, allowing 5G messaging to be applied in more scenarios, making 5G message sending more flexible.

## Function Introduction and Demonstration

For the function introduction and demonstration of the 5G Intelligent Assistant platform, here's a video submitted during the competition

- Bilibili: <https://www.bilibili.com/video/BV1RY411M7k9>
- Youtube: <https://youtu.be/kzg3rZsw2jc>

{% include iframe.html src="https://www.youtube.com/embed/kzg3rZsw2jc" %}

## How to Use

### 1. Obtain 5G Messaging Platform Account

For this step, you can directly refer to the community documentation [《2022 - How to Get Started with puppet-walnut from 0 to 1》](https://wechaty.js.org/2022/04/22/how-to-start-puppet-walnut/), which explains it in detail. I won't repeat it here. Currently, individual developers not participating in the competition have 1 month of trial time.
If you want more trial time, you can participate in the next phase of the [《Fifth "Blooming Cup" 5G Application Collection Competition》](https://mp.weixin.qq.com/s/JSReqEBTuShME0Jzskaiog). Everyone is welcome to actively sign up.

### 2. Obtain 5G Intelligent Assistant Platform Account

The 5G Intelligent Assistant platform has been released to the public network [http://walnut.aibotk.com/](http://walnut.aibotk.com/). After registration and login, obtain the `APIKEY` and `APISECRET` from the personal center for backup.

### 3. Pull the 5G Intelligent Assistant Client Code and Install Dependencies

Since there is still a next phase of the competition, the client code has not been open-sourced yet. You can follow this repository: [https://github.com/leochen-g/walnut-aibot](https://github.com/leochen-g/walnut-aibot). It will be open-sourced immediately after the next phase of the competition. If you want to experience it in advance, you can contact me by email.
Email address: leo.gengchen@foxmail.com

> node > 16

After obtaining the client, install dependencies

```shell
npm run install
```

### 4. Configure Parameters and Run

Fill in the parameters obtained from steps 1 and 2 into the code

```javascript
const {WechatyBuilder} = require('wechaty')
const WechatyWebPanelPlugin = require('./plugin/index');
let bot = '';
const name = 'walnut-aibot';
bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: 'wechaty-puppet-walnut',
    puppetOptions: {
        sipId: '****', // Chatbot's sipId
        appId: '******', // Chatbot's AppId
        appKey: '*******' // Chatbot's AppKey
    },
});

bot.use(
    WechatyWebPanelPlugin({
        apiKey: '*******', // Assistant platform apikey
        apiSecret: '*******', // Assistant platform apisecret
    })
)
bot.start()
    .catch((e) => console.error(e));
```

Start running

```shell
npm run start
```

Next, the mobile can have a conversation with the 5G Intelligent Assistant.

## Defense Manuscript

Sharing the defense manuscript can help everyone understand more clearly what kind of platform the 5G Intelligent Assistant is

{% include iframe.html src="/assets/2022/06-wechaty-walnut-aibot-en/walnut-share.pdf" %}

## About the Blooming Cup

Finally, a new phase of the 5G Application Collection Competition is about to start. Developers interested in 5G messaging are welcome to participate. This is the first time the Blooming Cup is open to individual developers, with generous prizes. It's a national-level competition with high value, so sign up quickly.

Hosted by the Ministry of Industry and Information Technology, and co-organized by the China Academy of Information and Communications Technology together with the 5G Application Industry Alliance, IMT-2020 (5G) Promotion Group, China Communications Standards Association, and the China Branch of the BRICS Future Network Institute, the Fifth "Blooming Cup" 5G Application Collection Competition was officially launched on April 28, 2022. This competition takes "5G Empowers Digitalization, Sets Sail to Help the New Journey" as its theme, focusing on key directions such as industry digital transformation and upgrading, personal application innovation development, and social digital public service capability improvement, accelerating the transformation of 5G applications from "model rooms" to "commercial housing," and promoting the large-scale development of 5G applications.

[More information and competition methods](https://mp.weixin.qq.com/s/JSReqEBTuShME0Jzskaiog)

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/06/12/wechaty-walnut-aibot/).
