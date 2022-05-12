---
 title: "基于Wechaty的推特图、视频下载机器人"
 author: mixver
 categories: article
 tags:
   - chatbot
   - typescript
   - study
 image: /assets/2022/05-wechat-media-bot/rare-book.webp
---

Twitter图片、视频下载微信机器人，使用插件系统进行功能的开发，便于维护以及后续功能的开发。

## 目录结构

```shell
wechat-twitter-bot
├─ README.md
├─ components
│  └─ twitter
│     ├─ index.ts
├─ .env
├─ package.json
└─ main.ts
```

## 主要功能

解析twitter的分享链接，下载其中的图片或者视频。

![指令使用-1](/assets/2022/05-wechat-media-bot/user-1.webp)

## 下载

```bash
git clone https://github.com/mixver/wechat-twitter-bot.git
```

## 配置

```bash
cp .env.example .env
```

TWITTER_TOKEN配置为twitter的登录token

## 运行

```bash
npm install
ts-node main.ts
```

## 使用

发送 。推特图 [推特分享链接]  给机器人，即可下载twitter上分享的图片或视频。
