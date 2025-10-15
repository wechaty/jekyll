---
title: "基于 Wechaty 的无水印短视频下载机器人"
author: remainsu
categories: project
tags:
  - nodejs
  - vue
  - padplus
  - productivity
  - nuxt
hidden: true
---

> This post is also available in [English](/2020/06/03/wechaty-mqbot-video-downloader-en/).

2020 年初，我开始接触抖音，一直在摸索，也学到了很多东西，自己也建立了一个社群，圈子里很多人吐槽短视频去水印的工具，最常见的就是小程序，但大部分小程序广告满天飞，而且响应时间开发者会故意延迟（让你多看几秒广告）。

所以，我想，为什么不自己做一个呢？顺便还可以引流。

最先想到的就是微信机器人，不管是监控群还是自用，都非常方便，朋友推荐了 Wechaty，上手非常容易。

目前机器人已经上线，支持国内所有主流短视频平台无水印下载，你只需要将视频链接发送给机器人即可。

## 项目使用

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
