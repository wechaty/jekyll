---
title: "Building a WeChat Group Bot with Wechaty & PadLocal: A Step-by-Step Guide | 使用 Wechaty + PadLocal 搭建微信群机器人完整教程"
author: dihe709155244
categories: article
tags:
  - blog
  - wechaty
  - padlocal
  - nodejs
  - wechat-bot
  - tutorial
image: /assets/2026/04-building-wechat-group-bot-with-wechaty-padlocal/post-teaser-image.webp
excerpt: 本文从零开始，教你使用 Wechaty 和 PadLocal 协议搭建一个能自动回复、监控消息的微信群机器人。包含 Token 申请、代码实现、图片处理等完整步骤。
---

> English version follows the Chinese version below.  
> 中文版本在前，英文版本在后。
---

## 中文版

### 前言

微信群是国内最主流的团队沟通工具之一。如果你曾经想过**自动监控群消息、统计成员活跃度、或者搭建一个群助手机器人**，那么 Wechaty + PadLocal 协议是目前最稳定、最易用的开源解决方案。

本文将从零开始，带你完整跑通一个能够：

- ✅ 监听多个微信群消息
- ✅ 识别图片和文字内容
- ✅ 自动回复关键词
- ✅ 记录消息日志

的微信群机器人。

### 技术栈

| 组件 | 说明 |
| --- | --- |
| [Wechaty](https://github.com/wechaty/wechaty) | 微信机器人框架 |
| [puppet-padlocal](https://github.com/wechaty/puppet-padlocal) | iPad 协议 Puppet |
| Node.js 18+ | 运行环境 |
| TypeScript（可选） | 类型安全 |

### 第一步：申请 PadLocal Token

1. 访问 [pad-local.com](http://pad-local.com)
2. 注册账号，申请 **7天免费试用 Token**
3. Token 格式形如：`puppet_padlocal_xxxxxxxxxxxxxxxx`

> 💡 长期免费 Token：成为 Wechaty 贡献者（提交博客或代码 PR 被合并）后可向官方申请长期 Token。

### 第二步：初始化项目

```bash
mkdir wechaty-group-bot
cd wechaty-group-bot
npm init -y
npm install wechaty wechaty-puppet-padlocal
```

### 第三步：创建机器人入口文件

新建 `bot.js`：

```javascript
const { WechatyBuilder } = require('wechaty')

const bot = WechatyBuilder.build({
  name: 'group-bot',
  puppet: 'wechaty-puppet-padlocal',
  puppetOptions: {
    token: process.env.WECHATY_PUPPET_PADLOCAL_TOKEN,
  },
})

// 扫码登录
bot.on('scan', (qrcode, status) => {
  const qrcodeUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`
  console.log(`扫码登录: ${qrcodeUrl}`)
  console.log(`状态: ${status}`)
})

// 登录成功
bot.on('login', (user) => {
  console.log(`✅ 登录成功: ${user.name()}`)
})

// 监听消息
bot.on('message', async (message) => {
  const room = message.room()
  const talker = message.talker()
  const text = message.text()
  const type = message.type()

  // 只处理群消息
  if (!room) return

  const roomName = await room.topic()
  const talkerName = talker.name()

  console.log(`[${roomName}] ${talkerName}: ${text}`)

  // 关键词自动回复
  if (text.includes('签到')) {
    await message.say(`@${talkerName} 签到成功！`)
  }
})

bot.start()
  .then(() => console.log('机器人启动中...'))
  .catch(console.error)
```

### 第四步：运行机器人

```bash
WECHATY_PUPPET_PADLOCAL_TOKEN=puppet_padlocal_你的token \
  node bot.js
```

控制台会输出一个二维码链接，用**微信小号**扫码登录即可。

### 第五步：处理图片消息

图片消息需要单独处理，获取图片 Buffer 后可以对接 OCR：

```javascript
const { MessageType } = require('wechaty')

bot.on('message', async (message) => {
  if (message.type() === MessageType.Image) {
    const fileBox = await message.toFileBox()
    const buffer = await fileBox.toBuffer()
    console.log(`收到图片，大小: ${buffer.length} bytes`)
    // 在此调用 OCR API 处理图片内容
  }
})
```

### 常见问题

**Q: 扫码后登录失败？**  
A: 确认小号微信版本支持 iPad 协议；建议使用已注册超过1个月的账号。

**Q: Token 过期怎么办？**  
A: 访问 pad-local.com 续期，或申请长期 Token。

**Q: 机器人会封号吗？**  
A: 低频操作风险较低。建议：控制消息发送频率、避免批量加人、用养号超过1个月的小号。

### 总结

通过本文，你已经掌握了使用 Wechaty + PadLocal 搭建微信群机器人的完整流程。这个基础框架可以进一步扩展为：积分系统、群统计、AI 客服等多种场景。

完整代码已托管在 GitHub：[wechaty-group-bot](https://github.com/dihe709155244/wechaty-group-bot)，欢迎 Star 和 PR。

---

## English Version

### Introduction

WeChat groups are one of the most popular team communication tools in China. If you've ever wanted to **automatically monitor group messages, track member activity, or build a group assistant bot**, Wechaty + PadLocal protocol is currently the most stable and easy-to-use open-source solution.

This tutorial walks you through building a WeChat group bot from scratch that can:

- ✅ Listen to messages from multiple WeChat groups
- ✅ Handle both text and image messages
- ✅ Auto-reply based on keywords
- ✅ Log all message activity

### Tech Stack

| Component | Description |
| --- | --- |
| [Wechaty](https://github.com/wechaty/wechaty) | WeChat bot framework |
| [puppet-padlocal](https://github.com/wechaty/puppet-padlocal) | iPad protocol Puppet |
| Node.js 18+ | Runtime environment |
| TypeScript (optional) | Type safety |

### Step 1: Get a PadLocal Token

1. Visit [pad-local.com](http://pad-local.com)
2. Register and apply for a **7-day free trial Token**
3. Token format: `puppet_padlocal_xxxxxxxxxxxxxxxx`

> 💡 **Long-term free Token**: After becoming a Wechaty Contributor (by having a blog post or code PR merged), you can apply for a long-term free Token from the Wechaty team.

### Step 2: Initialize the Project

```bash
mkdir wechaty-group-bot
cd wechaty-group-bot
npm init -y
npm install wechaty wechaty-puppet-padlocal
```

### Step 3: Create the Bot Entry File

Create `bot.js`:

```javascript
const { WechatyBuilder } = require('wechaty')

const bot = WechatyBuilder.build({
  name: 'group-bot',
  puppet: 'wechaty-puppet-padlocal',
  puppetOptions: {
    token: process.env.WECHATY_PUPPET_PADLOCAL_TOKEN,
  },
})

bot.on('scan', (qrcode, status) => {
  const qrcodeUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`
  console.log(`Scan to login: ${qrcodeUrl}`)
  console.log(`Status: ${status}`)
})

bot.on('login', (user) => {
  console.log(`✅ Logged in as: ${user.name()}`)
})

bot.on('message', async (message) => {
  const room = message.room()
  const talker = message.talker()
  const text = message.text()

  if (!room) return

  const roomName = await room.topic()
  const talkerName = talker.name()

  console.log(`[${roomName}] ${talkerName}: ${text}`)

  if (text.includes('check-in')) {
    await message.say(`@${talkerName} Check-in successful!`)
  }
})

bot.start()
  .then(() => console.log('Bot starting...'))
  .catch(console.error)
```

### Step 4: Run the Bot

```bash
WECHATY_PUPPET_PADLOCAL_TOKEN=puppet_padlocal_your_token \
  node bot.js
```

A QR code URL will be printed to the console. Scan it with a **secondary WeChat account** to log in.

### Step 5: Handle Image Messages

```javascript
const { MessageType } = require('wechaty')

bot.on('message', async (message) => {
  if (message.type() === MessageType.Image) {
    const fileBox = await message.toFileBox()
    const buffer = await fileBox.toBuffer()
    console.log(`Received image, size: ${buffer.length} bytes`)
    // Pass buffer to your OCR API here
  }
})
```

### FAQ

**Q: Login fails after scanning the QR code?**  
A: Make sure your secondary WeChat account supports the iPad protocol. Accounts registered more than 1 month ago work best.

**Q: What if my Token expires?**  
A: Renew it at pad-local.com, or apply for a long-term Token through the Wechaty Contributor Program.

**Q: Will the bot get banned?**  
A: Low-frequency operation carries low risk. Recommendations: control message send frequency, avoid mass-adding contacts, use an account that's been active for over a month.

### Conclusion

You've now learned the complete workflow for building a WeChat group bot using Wechaty + PadLocal. This foundational framework can be extended into many applications: points/scoring systems, group analytics, AI customer service bots, and more.

The full source code is available on GitHub: [wechaty-group-bot](https://github.com/dihe709155244/wechaty-group-bot). Stars and PRs are welcome!

---

*Author: [dihe709155244](https://github.com/dihe709155244)*  
*Contact: 709155244@qq.com*
