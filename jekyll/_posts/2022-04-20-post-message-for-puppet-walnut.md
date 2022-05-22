---
title: "2022-基于5G平台puppet接入post消息"
author: fabian
categories:
  - project
image: /assets/2022/04-post-message-for-puppet-walnut/puppet-walnut.webp
tags:
  - 5g
  - puppet-walnut
  - chatbot
  - ecosystem
  - plan

---

## 基于 5G 平台开发 puppet 模块接入 wechaty

- 项目名称：基于5G消息的 Wechaty Puppet 模块的设计与实现
- 学生：鲍耀龙
- 导师：苏畅
- 项目介绍：<https://github.com/juzibot/intern/issues/1>
- 代码地址：<https://github.com/wechaty/puppet-walnut>

### 背景介绍

- Wechaty 社区目前已经支持微信、Whatsapp、企业微信、飞书等常见流行即时通讯工具，并且能够通过多语言 SDK （比如 Python Wechaty） 进行调用。
- [5G Chatbot (RCS)](https://wechaty.js.org/2021/03/27/rcs-messaging-chatbot/) 是近期中国电信运营商基于 5G 的消息战略落地平台，未来的 5G 手机将会内置 RCS 消息的处理能力。
- [硬核桃社区](https://www.5g-msg.com/#/) 的 [电信运营商商5G Chatbot](https://wechaty.js.org/2021/03/27/rcs-messaging-chatbot/) 平台。

### 目标计划

- 基于 5G 平台的开放 api 进行封装，实现可以收发消息的机器人 bot。
- 丰富机器人的扩展性功能，完善对于 Wechaty 的 api 适配。

### 项目进展

- 完成对于 POST 的消息格式的支持 实现卡片消息
- 完成 walnut 的开发者社群的基本逻辑 准备线上调试

### 需求分析与设计

#### 1. 对于`POST`消息格式的支持

相关issue: <https://github.com/wechaty/wechaty/issues/2245>

> post消息是提出的新的消息形式，为了去适应微信的朋友圈、推特和微博等功能去实现

```ts
import * as WECHATY from 'wechaty'

const post = await wechaty.Post.builder()
  .add('this is the qrcode of Friday bot')
  .add(FileBox.from('https://wechaty.js.org/img/wechatyqrcode.webp'))
  .type(WECHATY.types.Post.Moment)
  .build()

await wechaty.post(post)
```

#### 2. 抽象方法的实现

在继承了抽象父类之后，我们就可以按照自己需要去实现具体的方法。

postMixin: POST相关的抽象方法

```ts
override async messageSendPost (conversationId: string, postPayload: PUPPET.payloads.Post): Promise<void> {
    log.verbose('PuppetWalnut', 'messageSendPost(%s, %s)', conversationId, postPayload)
    await sendPostMessage(conversationId, postPayload)
 }
 
 export async function sendPostMessage (contactId: string, postPayload: PUPPET.payloads.Post) {
     const title = postPayload.sayableList[0] as PUPPET.payloads.Sayable
     const description = postPayload.sayableList[1] as PUPPET.payloads.Sayable
     const img = postPayload.sayableList[2] as PUPPET.payloads.Sayable
     if (title.type !== 'Text' || description.type !== 'Text' || img.type !== 'Attachment') {
         throw new Error('Wrong Post!!! please check your Post payload to make sure it right')
     }
     const fileItem = await uploadFile(true, (<FileBoxInterface>img.payload.filebox))

     sendMessage(contactId, {
         contentEncoding: contentEncoding.utf8,
         contentText: {
             message: {
                 generalPurposeCard: {
                     content: {
                         description: description.payload.text,
                         media: {
                             height: 'MEDIUM_HEIGHT',
                             mediaContentType: fileItem.contentType,
                             mediaFileSize: fileItem.fileSize,
                             mediaUrl: fileItem.url,
                         },
                         title: title.payload.text,
                     },
                     layout: {
                         cardOrientation: 'HORIZONTAL',
                         descriptionFontStyle: ['calibri'],
                         imageAlignment: 'LEFT',
                         titleFontStyle: ['underline', 'bold'],
                     },
                 },
             },
         },
         contentType: 'application/vnd.gsma.botmessage.v1.0+json',
     })
 }
```

### 项目成果

#### 1. 创建实例

```ts
 // get a Wechaty instance
const bot = WechatyBuilder.build({
  puppet: new PuppetWalnut(),
}) 
  .on('login', (user: any) => log.info(`User ${user} logged in`))
  .on('message', async (message: Message) => {
    log.info(`Message: ${message}`)
  })

await bot.start()

const contact = await bot.Contact.find({ id: 'xxxxxxxxxxx' })
```

#### 2. 文本消息

```ts
await contact.say('This is a simple text message.')
```

![img](/assets/2022/04-post-message-for-puppet-walnut/1.webp)

#### 3. 图片消息

```ts
contact.say(FileBox.fromFile('C:\\Users\\Desktop\\1.png'))
```

![img](/assets/2022/04-post-message-for-puppet-walnut/2.webp)

#### 4. 富文本消息

```ts
const post = await bot.Post.builder()
  .add('This is a single rich card.')
  .add('This is the description of the rich card. It\'s the first field that will be truncated if it exceeds the maximum width or height of a card.')
  .add(FileBox.fromFile('C:\\Users\\Desktop\\1.png'))
  .type(PUPPET.types.Post.Unspecified)
  .build()

await contact.say(post)
```

![img](/assets/2022/04-post-message-for-puppet-walnut/3.webp)

### 视频展示

{% include iframe.html src="https://youtu.be/syfsyaAz43U" %}

### 答辩报告

{% include iframe.html src="/assets/2022/04-post-message-for-puppet-walnut/post-message-for-puppet-walnut.pdf" %}

### 未来与展望

- 将walnut部署到句子秒回
- 展开walnut社群的部署上线调试工作
- 完成从0到1运行 puppet-walnut以及相关的功能博客
- 用联通 5G 的接口接入 walnut

> Author: [@fabian](https://github.com/fabian4)
