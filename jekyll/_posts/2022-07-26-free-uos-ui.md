---
title: 免费UOS协议快速接入可视化配置面板
author: leochen-g
categories: talk
tags:
  - code
  - puppet-wechat
  - web-protocol
image: /assets/2022/07-free-uos-ui/wechaty-puppet-wechat.webp
---

经历过UOS web协议的重放荣光，又经过一段时间的封禁，又有大神把UOS web协议救回来了。免费的快乐又重新回来了，不是吗?

## 背景

在闲逛各大平台学习(摸鱼)的时候，突然发现有群里有人发`python`的`ichat`可以使用uos协议了，我刚开始还很纳闷，uos不是被封一年多了吗，怎么会还可以用，抱着试试看
的态度问了一下，说有大佬已经研究破解了最新的解禁方式，并且还友好的发了一份说明。带着这份好奇，我测试了一番，果然已经可以登录了。那还说什么，赶紧去提个PR去修
复一下看看。研究了一个晚上按照`ichat`的方式去修改各种参数，但是最后才发现，其实并不需要，`puppet-wechat`本身就是hook web协议的，不需要各种参数构造
直接，修改`expam`加上修改登录地址即可，我这暴脾气啊...

具体修改代码参考：[uos make puppet-wechat great again](https://github.com/wechaty/puppet-wechat/pull/206)

对于`ichat`uos修复方案感兴趣的可以查看此文档（此文档非本人编写，也是其他大佬提供的）：[https://docs.google.com/document/d/124zjP9K3URbUHQ2rC0LMQxp_PoMQ0G-KOYFFTYeiYVA/edit?usp=sharing](https://docs.google.com/document/d/124zjP9K3URbUHQ2rC0LMQxp_PoMQ0G-KOYFFTYeiYVA/edit?usp=sharing)

## 如何开启uos协议登录

默认的web协议是没有开启uos协议登录的，需要自行配置一下，旧版的`wechaty-puppet-wechat`是不支持，版本必须`>=1.18.4`

```shell
npm install wechaty-puppet-wechat@latest --save
```

```javascript
const bot = WechatyBuilder.build({
    name: 'puppet-wechat',
    puppetOptions: {
      uos: true  // 开启uos协议
    },
    puppet: 'wechaty-puppet-wechat',
})
```

### 报错无法登录？

通常可能是由于你账号的原因，因为我已经测试了多个不能登录网页版微信的账户，都已经可以成功登陆。如果看不出错误，可以下载这个chrome插件，安装后，直接在浏览器访问[https://wx.qq.com/?target=t](https://wx.qq.com/?target=t) 先测试一下，看看有什么报错

谷歌浏览器插件地址：[https://github.com/leochen-g/wechrome](https://github.com/leochen-g/wechrome)

## 可视化配置面板

![home](/assets/2022/07-free-uos-ui/1.webp)

![main](/assets/2022/07-free-uos-ui/2.webp)

![news](/assets/2022/07-free-uos-ui/3.webp)

### 功能介绍

- [x] 微信每日说,定时给女朋友发送每日天气提醒，以及每日一句

定时提醒

- [x] 当天定时提醒 例："提醒 我 18:00 下班了，记得带好随身物品"
- [x] 每天定时提醒 例："提醒 我 每天 18:00 下班了，记得带好随身物品"
- [x] 指定日期提醒 例："提醒 我 2019-05-10 8:00 还有 7 天是女朋友生日了，准备一下"

智能机器人

- [x] 天行机器人
- [x] 图灵机器人
- [x] 腾讯闲聊机器人
- [x] 微信对话开放平台
- [ ] 更多

群定时任务

- [x] 群新闻定时发送
- [x] 群消息定时发送
- [ ] 更多功能等你来 pr

关键词

- [x] 关键词加好友
- [x] 关键词加群
- [x] 关键词回复
- [x] 关键词事件
  - [x] 天气查询 例："上海天气"
  - [x] 垃圾分类 例："?香蕉皮"
  - [x] 名人名言 例： "名人名言"
  - [x] 老黄历查询 例： "黄历 2019-6-13"
  - [x] 姓氏起源 例： "姓陈"
  - [x] 星座运势 例： "\*双子座"
  - [x] 神回复 例： "神回复"
  - [x] 获取表情包 例： "表情包你好坏"
  - [x] 获取美女图 例： "美女图"
  - [x] 群合影 例： "群合影"
  - [x] 牛年头像 例： "牛气冲天"
  - [x] 国旗头像 例： "我要国旗"
  - [ ] 更多待你发现
- [x] 进群自动欢迎
- [x] 加好友自动回复

自动更新配置文件，无需重启

- [x] 默认给机器人发送 ‘更新’ 触发拉取新配置文件操作，可在面板`小助手配置->关键词回复->关键词事件`进行修改关键词

特色功能

- [x] 群合影
- [x] 主动发送消息
- [x] 主动更新配置
- [x] 主动同步好友和群列表
- [x] 多群消息同步
- [x] openapi请求

## 提前准备

### 注册智能微秘书管理账号

1. 注册：[智能微秘书](http://wechat.aibotk.com/signup?from=wechatyblog)

2. 初始化配置文件`小助手配置->基础配置`，修改后保存

3. 个人中心获取`APIKEY`和`APISECRET`，后续配置用到

### 注册天行数据账号

由于本项目大部分定时资讯和一些天气接口来自于天行数据，所以需要提前准备好天行数据的账号，同时申请好相关接口的权限

1、注册: [天行数据](https://www.tianapi.com/source/865c0f3bfa)

2、申请接口权限

必选接口

- [天行机器人](https://www.tianapi.com/apiview/47)
- [天气](https://www.tianapi.com/apiview/72)
- [新闻](https://www.tianapi.com/apiview/51)
- [垃圾分类](https://www.tianapi.com/apiview/97)

可选接口（如果想使用相应的功能还是必须申请的），但是如果默认使用了天行机器人，以下功能接口无需申请也可以，机器人会直接返回对应信息

- [土味情话](https://www.tianapi.com/apiview/80)
- [名人名言](https://www.tianapi.com/apiview/92)
- [星座运势](https://www.tianapi.com/apiview/78)
- [姓氏起源](https://www.tianapi.com/apiview/94)
- [顺口溜](https://www.tianapi.com/apiview/54)
- [老黄历](https://www.tianapi.com/apiview/45)
- [神回复](https://www.tianapi.com/apiview/39)
- [歇后语](https://www.tianapi.com/apiview/38)
- [绕口令](https://www.tianapi.com/apiview/37)
- [疫情](https://www.tianapi.com/apiview/169)
- [网络取名](https://www.tianapi.com/apiview/36)

## 开始运行

> 环境node > 16

### Step 1: 安装

```shell
npm install wechaty-web-panel@latest wechaty@latest --save
```

### Step 2: 创建机器人并配置插件的`apiKey`和`apiSecret`

```shell
vim mybot.js

const {WechatyBuilder} = require('wechaty')
const WechatyWebPanelPlugin = require('../src/index')

const name = 'wechat-assistant'

const bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: 'wechaty-puppet-wechat',
})
bot
    .use(WechatyWebPanelPlugin({
        apiKey: 'apiKey',
        apiSecret: 'apiSecret'
    }))
    .start()
    .catch((e) => console.error(e))

```

### Step 3: 运行

```shell
node mybot.js
```

### Step 4: 扫码进入

进入面板`小助手配置->登录状态`扫码登录，或直接扫码控制台二维码登录

### 直接拉取镜像（推荐）

由于群里经常反应会遇到各种环境问题，或者经常会卡住，所以本项目已经提前构建好发布到dockerhub了，直接pull就行了

#### step1： 拉取镜像

```shell

docker pull aibotk/wechat-assistant

```

#### step2： 启动docker

以下两个命令自己选择一个执行就行，执行的时候会下载puppet，可能会比较慢，耐心等待一下即可

1、请在项目根目录执行，这个命令是前台执行可以直接看到log日志的，但是没法关闭，只能销毁终端实例

```shell
docker run -e AIBOTK_KEY="微秘书apikey" -e AIBOTK_SECRET="微秘书apiSecret" --name=wechatbot aibotk/wechat-assistant

```

2、这个命令可以在后台运行，多了一个`-d`

```shell
docker run -d -e AIBOTK_KEY="微秘书apikey" -e AIBOTK_SECRET="微秘书apiSecret" --name=wechatbot aibotk/wechat-assistant

```

[如何查看docker日志](https://www.cnblogs.com/mydesky2012/p/11430394.html)

## 源码

客户端所有实现的功能均已经开源：[Wechaty-web-panel](https://github.com/leochen-g/wechaty-web-panel) ，欢迎star

## 其他协议

- ipad协议对接可视化面板：[wechat-assistant-pro-ipad](https://github.com/leochen-g/wechat-assistant-pro-ipad)
- 5G消息对接可视化面板：[walnut-aibot](https://github.com/leochen-g/walnut-aibot)
- xp协议对接可视化面板： [如何使用免费的 wechaty-puppet-xp 协议](http://wechat.aibotk.com/docs/faq)

### 其他插件

- [wechaty-fanli插件](https://github.com/leochen-g/wechaty-fanli) ：基于wechaty实现的返利微信机器人，根据淘口令生成高佣转链接，并创建新的淘口令
- [wechaty-face-cartoon](https://github.com/leochen-g/wechaty-face-cartoon) ：Wechaty 人像转换插件，让你的 Wechaty 机器人实现照片卡通化，年龄变化，性别变化等功能
- [wechaty-dice-king](https://github.com/leochen-g/wechaty-dice-king) ：Wechaty 骰王卡牌抽取游戏插件，类似[骰娘](https://v2docs.kokona.tech/zh/latest/CookBook.html) ,也可以在微信群实现玩狼人杀
