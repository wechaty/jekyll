---
title: "A Bot for Downloading Short Videos Without Watermarks"
author: remainsu
categories: project
tags:
  - nodejs
  - vue
  - padplus
  - productivity
  - nuxt
excerpt: "This post introduces a Wechaty-based bot that allows users to download short videos from major Chinese platforms without watermarks. The author shares the motivation behind creating this tool and provides a guide on how to set it up and use it."
---

At the beginning of 2020, I started getting into TikTok (the international version of Douyin) and have been experimenting with it ever since, learning a lot along the way. I also built a community around it, and many people in my circle complained about the tools available for removing watermarks from short videos. The most common tools are WeChat Mini Programs, but most of them are filled with ads, and their response times are often intentionally delayed by the developers (to make you watch a few more seconds of ads).

So, I thought, why not create my own tool? This could also be a way to attract more users.

The first thing that came to mind was a WeChat bot because it's so convenient to use, whether for monitoring groups or for individual use. A friend recommended Wechaty, and it was incredibly easy to get started with.

The bot is now live and supports watermark-free video downloads from all major Chinese short video platforms. All you need to do is send the video link to the bot.

## Project Usage

## 1. Directory Introduction

```js
.
├── README.md     // Introduction
├── config.js     // Configuration file with token, bot name, etc.
├── dtbot.js      // Core logic of the bot
├── node_modules  // Required modules
├── package.json  
├── source        // Resources like images
└── utils         // Utility classes
```

## 2. Install Node.js and Ensure the Version is 10 or Higher

```sh
# On macOS, you can use Homebrew
brew install node
```

## 3. Clone the Project

```sh
git clone git@github.com:remainsu/qmrobot.git
```

## 4. Modify the Token in `config.js`

```js
const basic = {
    TOKEN: 'your_token',
    NAME: 'your_bot_name',
}
```

## 5. Run the Bot

```sh
node dtbot.js
```

As shown in the image, you can log in by scanning the QR code.
![Demo Image](/assets/2020/06-wechaty-mqbot-video-downloader-en/denglu1.webp)

## Main Features

The bot currently supports watermark-free video downloads from all major Chinese short video platforms. You just need to send the video link to my bot.

Note: The API for removing watermarks is a paid service, so it is hidden in the source code. If you need it, you can add my bot, and I will recommend it to you.

Here's how to use it, taking Kuaishou as an example:

## 1. Copy and Send the Link

![Demo Image](/assets/2020/06-wechaty-mqbot-video-downloader-en/fasong1.webp)

## 2. Send it to the Bot, and You Will Get an Immediate Response. Copy the Link to Your Browser to Download

![Demo Image](/assets/2020/06-wechaty-mqbot-video-downloader-en/wancheng1.webp)

## Finally

A big thank you to the [Wechaty](https://wechaty.github.io) open-source project and [Juzi Interactive (句子互动)](https://www.juzibot.com) for providing the token, which has been a great convenience for developers!

There are still many features that can be improved, such as how to quickly download and convert videos. I am currently researching this.

Feel free to scan the QR code to add my bot. Use "tiktok" as the verification message. You are also welcome to recommend me to your friends. Downloading videos without watermarks is that simple.

![QR Code](/assets/2020/06-wechaty-mqbot-video-downloader-en/ewm1.webp)

> Author: [remainsu](https://github.com/remainsu)
> Code: [Github](https://github.com/remainsu/qmrobot)
>
> This post is also available in [Chinese (Simplified)](/2020/06/03/wechaty-mqbot-video-downloader/).

### 1. 目录介绍

```js
.
├── README.md     介绍
├── config.js     配置文件，有token、机器人名称等
├── dtbot.js      机器人核心逻辑代码
├── node_modules  所需的模块
├── package.json  
├── source        需要的资源 如图片
└── utils         工具类
```

### 2. 安装 nodejs 并确保版本在10以上

```sh
# macos 直接使用
brew install node
```

### 3. 克隆项目

```sh
git@github.com:remainsu/qmrobot.git
```

### 4. 修改config.js 中的token

```sh
const basic = {
    TOKEN: '你的token',
    NAME: '你的机器人名称',
}
```

### 5. 运行

```sh
node dtot.js
```

效果如图，扫码后即可完成登录
![演示图片](/assets/2020/06-wechaty-mqbot-video-downloader-en/denglu1.webp)

## 主要功能

机器人当前支持国内各大短视频平台的视频无水印下载，只需要发送给我的机器人视频链接即可。

备注：因为去水印的接口是需要收费的，所以项目源码中隐藏掉了，有需要的朋友可以加我的机器人，我推荐给你

使用方式如下，拿快手举例

### 1. 发送复制链接

![演示图片](/assets/2020/06-wechaty-mqbot-video-downloader-en/fasong1.webp)

### 2. 发送给机器人，会得到及时的返回结果，复制到浏览器即可下载

![演示图片](/assets/2020/06-wechaty-mqbot-video-downloader-en/wancheng1.webp)

## 最后

感谢[Wechaty](https://wechaty.github.io)开源项目 及 [句子互动](https://www.juzibot.com)公司提供的token，为开发者带来极大便利！

还有很多可以完善的功能，例如如何快速的下载转换会后的视频，目前正在研究中。

欢迎扫码加我的机器人，验证填写 “tiktok”，也欢迎将我推荐给需要的朋友，无水印下载就是这么简单。

![演示图片](/assets/2020/06-wechaty-mqbot-video-downloader-en/ewm1.webp)

> 作者: [remainsu](https://github.com/remainsu)
> Code: [Github](https://github.com/remainsu/qmrobot)

---

> Chinese version of this post: [wechaty mqbot video downloader]({{ '/2020/06/03/wechaty-mqbot-video-downloader/' | relative_url }})
