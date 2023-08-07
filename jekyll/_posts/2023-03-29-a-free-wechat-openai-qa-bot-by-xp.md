---
title: "a free wechat openai qa-bot by wechaty-puppet-xp"
author: atorber
categories: article
tags:
  - blog
  - study
  - introduction
image: /assets/2023/03-a-free-wechat-openai-qa-bot-by-xp/rare-book.webp
---

{% include iframe.html src="https://www.bilibili.com/video/BV1Y54y1f7v1?share_source=copy_web" %}

## 简介

[wechat-openai-qa-bot](https://github.com/choogoo/wechat-openai-qa-bot)使用wechat机器人快速实现一个免费的QA问答系统，如果你是一个社群工作者、拼团团长、业务群运营经理，使用这个项目可以帮助你解决解决一些重复性问答。

**前提是你有一台Windows电脑可以运行本项目。**

项目用到了一些工具和免费的轮子：

- [Wechaty](https://wechaty.js.org/) —— In just a few lines of code, you can have a fully featured
Chatbot  !  !  !

- [wechaty-puppet-xp](https://github.com/atorber/puppet-xp) —— 可能是目前最好用的免费wechat机器人

- [微信对话开放平台](https://openai.weixin.qq.com/) —— 5分钟零基础免费一键搭建智能对话机器人，并应用于微信公众号、小程序、企业网站、APP等

## 已经实现的功能

|功能|描述|
|--|--|
|消息存档|群聊天消息存档到表格（基于vika维格表，免费）|
|定时消息|定时消息发送，支持单次定时和周期消息发送给指定好友或群|
|智能问答|可以自定义问答内容，智能匹配答案，支持相似问题匹配，例如“什么时候到货？”“亲，几时到货”“亲，什么时候到货”均能匹配（基于微信对话开放平台，免费）|
|千群千面|多个群相同问题不同回答内容,例如“何时到货？”,A群中回答“今天到”，B群中回答“明天到货”|
|群白名单|支持配置群白名单，白名单内群开启机器人问答，未配置问题答案的群不会受到机器人干扰|
|客服后台|简单客服后台，可以把群内消息按发言人列表区分|
|MQTT消息推送|支持配置一个MQTTQ消息队列，将消息推送到队列当中|
|远程控制发消息|支持通过MQTT控制机器人向指定好友或群发消息|
|非群主链接检测|支持非群主小程序卡片、网页链接分享检测，自动提醒、警告发送者撤回|
|团购订单转换|支持快团团订货单转换，原始表发送到群即可自动转换为按楼栋统计表|

## 快速入门

[手把手教程](https://www.yuque.com/atorber/oegota/zm4ulnwnqp9whmd6)

1.下载源码并安装依赖

```Shell
git clone <https://github.com/choogoo/wechat-openai-qa-bot.git>
cd ./wechat-openai-qa-bot
npm install
```

2.分别登陆[微信对话开放平台](https://openai.weixin.qq.com/)和[vika维格表](https://spcp52tvpjhxm.com.vika.cn/?inviteCode=55152973)官网注册账号并获取token

3.在电脑上登陆微信，微信版本必须为[WeChatSetup-v3.6.0.18.exe](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.6.0.18/WeChatSetup-3.6.0.18.exe)

4.修改./config.js配置文件

快速开始仅需要修改VIKA_TOKEN、VIKA_SPACENAME配置项,其他配置项暂时无需修改

```javascript
/* eslint-disable sort-keys */
// 配置文件，所有配置必须齐全，补充空白配置项，其他配置项可按需要修改
const configs = {
  VIKA_TOKEN: '替换成自己的维格表token', // VIKA维格表token
  VIKA_SPACENAME: '替换成你的维格表空间名称', // VIKA维格表空间名称，修改为自己的空间名称
}

export default configs
```

> 只有加入到roomWhiteList里的群才会开启只能问答机器人

5.初始化系统表，先运行，系统会自动在维格表中创建好初始化表格

```Shell
npm run sys-init
```

在维格表查看系统表是否创建成功

6.程序默认使用wechaty-puppet-wechat，三大系统均可使用

7.启动程序

```Shell
npm start
```

出现二维码之后，扫码二维码登陆微信

8.开启智能问答功能

8.1 设置微信对话平台token，填写"环境变量"表中的 【对话平台token】、【对话平台EncodingAESKey】并在"功能开关"表中开启智能问答

添加一个简单问题到微信对话开放平台，测试对应群内智能问答内容

8.2 如果不希望每个群都开启智能问答，需设置群白名单,首先需要将上图中的群白名单开关设置为开启

然后将群加入到问答白名单，在“群白名单”表中，加入需要开启的群ID（roomid），群ID在消息中查看(在群里发一条消息，然后控制台查看或在维格表中查找)

详细操作参考 [手把手教程](https://www.yuque.com/atorber/oegota/zm4ulnwnqp9whmd6)

8.4 重启程序，在指定群测试问答

## 效果展示

去 [效果展示图文](https://www.yuque.com/atorber/oegota/tbsokg3pqu5vk50y) 查看

## 最佳实践

如果你对以上操作感觉困难而不能使用，添加ledongmao微信，提供你需要的问答清单，我们可以提供一个免费的机器人供体验

当然，最好的反馈方式是在这里 [https://github.com/choogoo/wechat-openai-qa-bot/issues](https://github.com/choogoo/wechat-openai-qa-bot/issues) 提交一个issues

## 二次开发

此项目只是提供了一个简单的使用微信机器人和智能对话平台实现的QA系统。如果有兴趣，可以继续学习微信对话开放平台的高级技能，实现诸如连续问答等高级功能，欢迎贡献你的创意。

此外要说明的是，项目中使用puppet-xp完全是出于免费的考虑，如果不靠这一点的话，wechaty还有更好用的puppet，对于二开来说可以根据实际情况替换。

> 历史文章

- [Wechaty+微信小程序实现群内活动报名](https://wechaty.js.org/2021/03/17/node-wechaty-and-wechaty-puppet-padlocal/)
