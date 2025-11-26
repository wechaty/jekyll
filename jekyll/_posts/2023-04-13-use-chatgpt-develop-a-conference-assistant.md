---
title: "10分钟使用ChatGPT&Wechaty开发一个群会议助手"
author: atorber
categories: article
tags:
  - blog
  - study
  - introduction
image: /assets/2023/04-use-chatgpt-develop-a-conference-assistant-en/rare-book.webp
hidden: true
---

> This post is also available in [English](/2023/04/13/use-chatgpt-develop-a-conference-assistant-en/)

## 背景

随着ChatGPT火爆，各种玩法被各路英雄玩了个遍，使用ChatGPT帮我们实现一些程序实现无疑是最有想想空间的方向之一，甚至有开发者直呼程序员要失业了~

虽然没有这么夸张，但毫无疑问，ChatGPT将给应用开发者带来巨大的改变，本文将分享一个业余开发者如何使用ChatGPT开发一个Wechaty聊天机器人应用。

## 需求整理

首先，我一直有一个想法想在微信群中实现，于是简单整理了一下需求：

使用最新版本的Wehcaty开发一个聊天机器人记录会议聊天信息并根据指令导出文档：
1.当我们在群内说 #开会 时开始记录聊天信息
2.当群内说 #结束 时结束记录
3.当群内说 #会议纪要 时，导出会议期间的聊天记录到word文档中并发送到群内

## 开始提问

直接把需求丢给ChatGPT：

超哥:

使用最新版本的Wehcaty开发一个聊天机器人记录会议聊天信息并根据指令导出文档：1.当我们在群内说 #开会 时开始记录聊天信息2.当群内说 #结束 时结束记录3.当群内说 #会议纪要 时，导出会议期间的聊天记录到word文档中并发送到群内

ChatGPT：

很抱歉，作为一名AI语言模型，我无法直接在您的计算机上执行代码。但是，我可以提供一些思路和建议，以帮助您开始构建这个聊天机器人。

首先，您需要使用最新版本的WeChaty和Node.js编写代码。WeChaty是一个开源的微信个人账号机器人SDK，它可以让您使用Node.js创建和管理微信机器人。

以下是一个大致的实现步骤：

使用WeChaty登录微信账号，并监听群聊消息。
在监听函数中，判断收到的消息是否为 #开会、#结束、#会议纪要 之一。
如果是 #开会，开始记录聊天信息，并将其存储在一个数据结构中（例如，数组）。
如果是 #结束，停止记录聊天信息。
如果是 #会议纪要，将存储的聊天信息导出到Word文档中，并将文档发送到群内。
为了实现这些功能，您需要使用一些额外的Node.js模块，例如：

docx：用于创建和导出Word文档。
fs：用于读写文件。
moment：用于处理日期和时间。
lodash：用于数据处理和操作。
下面是一个示例代码，您可以参考这个代码并根据自己的需求进行修改：

```javascript
const { Wechaty } = require('wechaty');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');

const CHAT_RECORD = []; // 存储聊天记录的数组
let RECORDING = false; // 是否正在记录聊天信息的标志

const bot = new Wechaty();

// 监听群聊消息
bot.on('message', async message => {
  const text = message.text();
  const room = message.room();

  // 判断是否为群聊消息
  if (room) {
    // 判断是否为 #开会 消息
    if (text === '#开会') {
      RECORDING = true;
      await room.say('开始记录聊天信息。');
    }

    // 判断是否为 #结束 消息
    if (text === '#结束') {
      RECORDING = false;
      await room.say('停止记录聊天信息。');
    }

    // 判断是否为 #会议纪要 消息
    if (text === '#会议纪要') {
      // 创建文档
      const doc = new Document();
      const now = moment().format('YYYY-MM-DD_HH-mm-ss');
      const filename = `会议纪要_${now}.docx`;

      // 添加标题
      const title = new Paragraph();
      title.addRun(new TextRun('会议纪要'));
      title.heading1();
      doc.addParagraph(title);

      // 添加内容
      const content = new Paragraph();
      const chatLog = _.map(CHAT_RECORD, item => `${item.from}:${item.text}`).join('\n');
       content.addRun(new TextRun(chatLog));
  doc.addParagraph(content);

  // 导出文档
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filename, buffer);

  // 发送文档到群内
  await room.say({
    file: fs.readFileSync(filename),
    filename: filename
  });
}

// 如果正在记录聊天信息，将消息添加到记录数组中
if (RECORDING) {
  CHAT_RECORD.push({
    from: message.from().name(),
    text: text
  });
}
  content.addRun(new TextRun(chatLog));
  doc.addParagraph(content);

  // 导出文档
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filename, buffer);

  // 发送文档到群内
  await room.say({
    file: fs.readFileSync(filename),
    filename: filename
  });
}

// 如果正在记录聊天信息，将消息添加到记录数组中
if (RECORDING) {
  CHAT_RECORD.push({
    from: message.from().name(),
    text: text
  });
}
```

这是一个简单的示例代码，您需要根据自己的需求进行修改和优化。例如，您可能需要添加异常处理、日志记录、权限控制等功能。

值得注意的是，微信官方不允许使用机器人进行自动化操作，因此使用机器人进行会议记录可能存在一定的风险。请谨慎使用，并遵守相关规定和法律法规。

> 哇哦，看起来还不错，给出了思路，代码，最后好友情提示注意风险，但是，貌似不是基于最新的Wechaty1.x实现的，并且不是我喜欢的ts，不符合需求，必须得给改，试着把ding-dong-bot的示例代码告诉它来优化下代码

超哥：

```text
最新的wechaty版本的示例代码是这样，请根据示例优化一下你给出的代码：/**
 *   Wechaty Chatbot SDK - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  WechatyBuilder,
  ScanStatus,
  Message,
  Contact,
}                     from '../src/mods/mod.js' // from 'wechaty'

import qrTerm from 'qrcode-terminal'
import { FileBox } from 'file-box'

/**
 *
 * 1. Declare your Bot!
 *
 */
const options = {
  name : 'ding-dong-bot',

  /**
   * You can specify different puppet for different IM protocols.
   * Learn more from https://wechaty.js.org/docs/puppet-providers/
   */
  // puppet: 'wechaty-puppet-whatsapp'

  /**
   * You can use wechaty puppet provider 'wechaty-puppet-service'
   *   which can connect to Wechaty Puppet Services
   *   for using more powerful protocol.
   * Learn more about services (and TOKEN)from https://wechaty.js.org/docs/puppet-services/
   */
  // puppet: 'wechaty-puppet-service'
  // puppetOptions: {
  //   token: 'xxx',
  // }
}

const bot = WechatyBuilder.build(options)
```

ChatGPT：

好的，根据最新版本的Wechaty示例代码，这是优化后的代码：

```TypeScript
import { Wechaty } from 'wechaty'
import { ScanStatus } from 'wechaty-puppet'
import { FileBox } from 'file-box'
import { v4 as uuidv4 } from 'uuid'
import { getChatLog } from './utils'

const bot = new Wechaty()

let RECORDING = false // 是否正在记录聊天信息
let CHAT_RECORD = [] // 保存聊天记录的数组

// 监听消息事件
bot.on('message', async message => {
  const text = message.text()

  // 如果消息是 #开会，则开始记录聊天信息
  if (text === '#开会') {
    RECORDING = true
    CHAT_RECORD = []
    await message.say('会议记录已开始')
  }

  // 如果消息是 #结束，则停止记录聊天信息
  if (text === '#结束') {
    RECORDING = false
    await message.say('会议记录已结束')
  }

  // 如果消息是 #会议纪要，则导出聊天记录并发送到群内
  if (text === '#会议纪要') {
    const chatLog = getChatLog(CHAT_RECORD) // 获取聊天记录

    // 生成文档并发送到群内
    const filename = `会议纪要-${uuidv4()}.docx`
    const fileBox = FileBox.fromBase64(chatLog, filename)
    await message.say(fileBox)
  }

  // 如果正在记录聊天信息，将消息添加到记录数组中
  if (RECORDING) {
    CHAT_RECORD.push({
      from: message.talker().name(),
      text: text
    });
  }
})

// 监听扫码登录事件
bot.on('scan', (qrcode, status) => {
  if (status === ScanStatus.Waiting) {
    qrTerm.generate(qrcode, { small: true })
  }
})

// 启动机器人
bot.start().then(() => {
  console.log('WeChaty bot started')
})
```

此代码使用了ES6语法，使用import导入所需的模块。当收到消息时，根据消息的内容执行相应的操作。getChatLog函数根据聊天记录数组生成包含聊天记录的Word文档，并将其作为文件发送到群聊中。

此外，代码还添加了扫码登录事件的监听，当需要登录时，会在终端中显示二维码以供扫描。

> 看起来不错，但依然还不是最新的WechatyBuilder.build(options)，但是想到ChatGPT的数据集是截止到2021年，是否有可能它还不知道最新的Wechaty，看来用GPT来写要止步于此了，该人工出马了...nonono，那是不是有点不智能了，突然又想到还有它的孪生兄弟，具备联网能力的Nwe Bing，这次直接要求NB用最新版本和ts来写

超哥:

使用最新版本的Wehcaty实现一个聊天机器人记录会议聊天信息并根据指令导出文档： 1. 当我们在群内说 #开会 时开始记录聊天信息 2. 当群内说 #结束 时结束记录，当群内说 #会议纪要 时，导出会议期间的聊天记录到word文档中 请给出ts示例代

Nwe Bing:

你好，这是Bing。我可以帮你实现一个聊天机器人记录会议聊天信息并根据指令导出文档。😊

你可以使用Wechaty这个框架，它是一个用于创建聊天机器人的RPA（机器人流程自动化）SDK，支持JavaScript, Python, Go, 和 Java等语言，可以跨平台运行在Linux, Windows, MacOS, 和 Docker等环境。¹²³

Wechaty有很多示例代码，你可以参考其中的一些来实现你的需求。¹ 我尝试用TypeScript语言给你写了一个简单的例子，你可以在这里看到：

```TypeScript
// 导入Wechaty模块
import { Wechaty } from 'wechaty'

// 创建一个Wechaty实例
const bot = new Wechaty()

// 定义一个变量来存储会议聊天信息
let meetingLog = ''

// 定义一个变量来标记是否在记录会议
let isRecording = false

// 监听扫码登录事件
bot.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))

// 监听登录成功事件
bot.on('login', user => console.log(`User ${user} logged in`))

// 监听收到消息事件
bot.on('message', async message => {
  // 获取消息的文本内容
  const text = message.text()

  // 获取消息所在的群聊，如果不是群聊则返回null
  const room = message.room()

  // 如果消息是群聊消息
  if (room) {
    // 如果消息内容是 #开会，则开始记录会议聊天信息，并回复“开始记录”
    if (text === '#开会') {
      isRecording = true
      meetingLog = ''
      await message.say('开始记录')
    }
    // 如果消息内容是 #结束，则结束记录会议聊天信息，并回复“结束记录”
    else if (text === '#结束') {
      isRecording = false
      await message.say('结束记录')
    }
    // 如果消息内容是 #会议纪要，则导出会议期间的聊天记录到word文档中，并发送给群聊
    else if (text === '#会议纪要') {
      // 这里需要调用一些第三方库或服务来实现word文档的生成和发送，这里只是简单地回复一下会议纪要的内容
      await message.say(`会议纪要如下：\n${meetingLog}`)
    }
    // 如果正在记录会议，并且消息不是自己发的，则将消息追加到会议聊天信息中
    else if (isRecording && !message.self()) {
      meetingLog += `${await room.topic()}: ${message}\n`
    }
  }
})

// 启动机器人
bot.start()
```

这个例子可能还不完善，你可以根据你的具体需求进行修改和优化。希望这能对你有所帮助。😉

> 目测已经ok来，但是貌似没有导出文件相关的内容

超哥：

添加上导出文件相关的代码

Nwe Bing:

好的，我可以帮你添加上导出文件相关的代码。😊

你可以使用一些第三方库或服务来实现word文档的生成和发送，例如docx² 或者 html-to-docx³。这些库可以让你用JS/TS来轻松地生成和修改.docx文件。²

我在之前的例子的基础上，给你写了一个使用html-to-docx库的例子，你可以在这里看到：

```TypeScript
// 导入Wechaty模块
import { Wechaty } from 'wechaty'

// 导入html-to-docx模块
import htmlToDocx from 'html-to-docx'

// 创建一个Wechaty实例
const bot = new Wechaty()

// 定义一个变量来存储会议聊天信息
let meetingLog = ''

// 定义一个变量来标记是否在记录会议
let isRecording = false

// 监听扫码登录事件
bot.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))

// 监听登录成功事件
bot.on('login', user => console.log(`User ${user} logged in`))

// 监听收到消息事件
bot.on('message', async message => {
  // 获取消息的文本内容
  const text = message.text()

  // 获取消息所在的群聊，如果不是群聊则返回null
  const room = message.room()

  // 如果消息是群聊消息
  if (room) {
    // 如果消息内容是 #开会，则开始记录会议聊天信息，并回复“开始记录”
    if (text === '#开会') {
      isRecording = true
      meetingLog = ''
      await message.say('开始记录')
    }
    // 如果消息内容是 #结束，则结束记录会议聊天信息，并回复“结束记录”
    else if (text === '#结束') {
      isRecording = false
      await message.say('结束记录')
    }
    // 如果消息内容是 #会议纪要，则导出会议期间的聊天记录到word文档中，并发送给群聊
    else if (text === '#会议纪要') {
      // 使用html-to-docx库将会议聊天信息转换为word文档的buffer对象
      const buffer = await htmlToDocx(`<p>会议纪要如下：</p><p>${meetingLog}</p>`)

      // 将buffer对象转换为FileBox对象，用于发送文件
      const fileBox = FileBox.fromBuffer(buffer, 'meeting.docx')

      // 发送文件给群聊
      await room.say(fileBox)
    }
    // 如果正在记录会议，并且消息不是自己发的，则将消息追加到会议聊天信息中
    else if (isRecording && !message.self()) {
      meetingLog += `${await room.topic()}: ${message}<br>`
    }
  }
})

// 启动机器人
bot.start()
```

这个例子可能还不完善，你可以根据你的具体需求进行修改和优化。希望这能对你有所帮助。😉

截止到此，虽然依然没有使用最新的bot构建方式，感觉主体代码已经ok了，人工做一下肉眼可见错误的改进

1.安装依赖npm i html-to-docx
2.替换机器人构建方式为const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',})
3.添加import { FileBox } from 'file-box'

## 最终代码

已亲测可运行，细节还可以探索优化

```TypeScript
// 导入Wechaty模块
import {
    Contact,
    Message,
    ScanStatus,
    WechatyBuilder,
    log,
  }                  from 'wechaty'
  
  import qrcodeTerminal from 'qrcode-terminal'

// 导入html-to-docx模块
import htmlToDocx from 'html-to-docx'
import { FileBox } from 'file-box'

// 创建一个Wechaty实例
const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',})

// 定义一个变量来存储会议聊天信息
let meetingLog = ''

// 定义一个变量来标记是否在记录会议
let isRecording = false

// 监听扫码登录事件
function onScan (qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
      log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
  
      qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
  
    } else {
      log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
  }
bot.on('scan', onScan)

// 监听登录成功事件
bot.on('login', user => console.log(`User ${user} logged in`))

// 监听收到消息事件
bot.on('message', async message => {
  // 获取消息的文本内容
  const text = message.text()

  // 获取消息所在的群聊，如果不是群聊则返回null
  const room = message.room()

  // 如果消息是群聊消息
  if (room) {
    // 如果消息内容是 #开会，则开始记录会议聊天信息，并回复“开始记录”
    if (text === '#开会') {
      isRecording = true
      meetingLog = ''
      await message.say('开始记录')
    }
    // 如果消息内容是 #结束，则结束记录会议聊天信息，并回复“结束记录”
    else if (text === '#结束') {
      isRecording = false
      await message.say('结束记录')
    }
    // 如果消息内容是 #会议纪要，则导出会议期间的聊天记录到word文档中，并发送给群聊
    else if (text === '#会议纪要') {
      // 使用html-to-docx库将会议聊天信息转换为word文档的buffer对象
      const buffer = await htmlToDocx(`<p>会议纪要如下：</p><p>${meetingLog}</p>`)

      // 将buffer对象转换为FileBox对象，用于发送文件
      const fileBox = FileBox.fromBuffer(buffer, 'meeting.docx')

      // 发送文件给群聊
      await room.say(fileBox)
    }
    // 如果正在记录会议，并且消息不是自己发的，则将消息追加到会议聊天信息中
    else if (isRecording && !message.self()) {
      meetingLog += `${await room.topic()}: ${message}<br>`
    }
  }
})

// 启动机器人
bot.start()
```

## 效果展示

1. 发送 #开会 机器人立即返回了”开始记录“
2. 开始发言”测试会议内容“
3. 发送 #结束 机器人立即回复”结束记录“
4. 发送 #会议纪要 机器人立即回复了一个”meeting.docx“的文件到群里

完整代码可以查看[微信群会议助手](https://github.com/choogoo/wechat-openai-qa-bot/blob/main/src/plugins/meet-mate.ts)，额外又添加了导出到语雀文档的支持，同样出自New Bing

## 总结

1.整个开发调试过程大约十几分钟，如果对Wchaty不熟悉，实际上可以通过把报错信息发给NB的方式继续追问，后续会继续尝试一下，ChatGPT的能力真的惊艳，智能快速构建程序主体加人工微调，对于非专业程序员，应用开发门槛无疑进一步降低，前提是我们熟悉某种语言最基本的使用。
2.随着ChatGPT的不断进化和数据跟新，相信在不远的明天，完全使用自然语言构建一个Wchaty机器人将成为现实。

> 历史文章

- [Wechaty+微信小程序实现群内活动报名](https://wechaty.js.org/2021/03/17/node-wechaty-and-wechaty-puppet-padlocal/)
