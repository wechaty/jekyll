---
title: "Building an Assistant with Wechaty and WeChat Open AI Platform"
author: windmemory
categories: tutorial
tags: 
  - openai
  - talk
  - featured
  - ecosystem
image: /assets/2020/wechaty-weixin-openai/teaser-image.webp
excerpt: >
  Invited by WWC (Women Who Code), I shared online how to build an assistant using Wechaty and WeChat Open AI Platform to help answer common questions.
---

Invited by [WWC (Women Who Code)](#women-who-code), I shared online how to build an assistant using Wechaty and WeChat Open AI Platform to help answer common questions.

Event introduction: [WWC Online Sharing: How to Create Your Personal Assistant with Wechaty and WeChat Open AI Platform](https://mp.weixin.qq.com/s/6HyEZlwWbuRGY9T_KotXEw)

![wechaty-weixin-openai][teaser]

As the pace of society continues to accelerate, I have more and more WeChat messages to reply to every day, including many repetitive questions. As a programmer, I don't want to waste my precious time on repetitive work. This time, I'll share how to create your personal assistant using Wechaty and OpenAI to help handle those repetitive questions and free up your time.

## What Are We Going to Build?

A WeChat assistant bot with the following features:

- When I @ it and ask a question, it automatically sends out prepared materials
- When others ask it questions, it can automatically match common questions and answer them
- When no answer is matched, transfer to me
  - Message in a group and I'm in the group: @me to let me answer
  - Private chat or I'm not in the group: Send my contact card and guide them to add me as a friend

## We Need to Control WeChat Through Code

This is where `Wechaty` shines. Here's the integration code:

```ts
import { Wechaty, Message, UrlLink } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import { EventLogger, QRCodeTerminal } from 'wechaty-plugin-contrib'

import { padplusToken } from './const'

const puppet = new PuppetPadplus({
  token: padplusToken,
})

const bot = new Wechaty({
  name: 'wwc-agent',
  puppet,
})

bot.use(EventLogger())
bot.use(QRCodeTerminal({ small: true }))

bot.start()
```

The code is simple: create a `puppet` instance, pass it as a parameter to the `Wechaty` constructor to create a new `Wechaty` instance, then start the `Wechaty` instance.

Two plugins are used here: `EventLogger` prints all `Wechaty` events to the console, and `QRCodeTerminal` prints the QR code from the scan event directly to the console for easy login.

Run the code above and you'll see the QR code printed in the command line. After scanning, you can see the account login. The effect is as follows:

```shell
19:27:44 INFO WeixinOpenAI constructor(your-, your-opena)
19:27:44 INFO PuppetPadplus start()
19:27:47 INFO WechatyPluginContrib EventLogger heartbeat:
19:27:48 INFO WechatyPluginContrib EventLogger scan: http://weixin.qq.com/x/QfsfuToGOs-EVGgaa-gn,2,

19:27:48 INFO WechatyPluginContrib QRCodeTerminal Login QR Code Status: Waiting(2)
QR Code Image URL: https://wechaty.js.org/qrcode/http%3A%2F%2Fweixin.qq.com%2Fx%2FQfsfuToGOs-EVGgaa-gn
19:27:55 INFO PadplusManager
            =================================================
            QRCODE_SCAN MSG : 已扫码，请在手机端确认登陆...
            =================================================

19:27:55 INFO WechatyPluginContrib EventLogger scan: ,3,
19:27:55 INFO WechatyPluginContrib QRCodeTerminal onScan: Scanned(3)
19:27:57 INFO PadplusManager
            =================================================
            QRCODE_SCAN MSG : 已确认
            =================================================

19:27:57 INFO WechatyPluginContrib EventLogger scan: ,4,
19:27:57 INFO WechatyPluginContrib QRCodeTerminal onScan: Confirmed(4)
19:28:03 INFO WechatyPluginContrib EventLogger heartbeat:
19:28:03 INFO WechatyPluginContrib EventLogger login: Contact<小助手>
```

## Implementing Material Sharing

This step is relatively easy, simple code logic implementation:

```ts
bot.on('message', async (message: Message) => {
  const room = message.room()
  const from = message.from()
  const mentionSelf = await message.mentionSelf()
  const text = message.text()

  if (room !== null && from.id === bossId && mentionSelf) {
    if (/句子互动/.test(text)) {
      await room.say(juzibotIntro)
      await room.say(new UrlLink(juzibotIntroUrl))
    } else if (/高原/.test(text)) {
      await room.say(new UrlLink(yuanIntroUrl))
    }
  }
}).start()
```

This way, when I @ the bot in a group to introduce `Juzibot` or myself, the bot will automatically send some introductory messages, and I don't need to

![mobile-screenshot-1][mobile-screenshot-1]

## Implementing Q&A

To have the bot help me answer common questions, the first thought is to reply directly through keyword matching. Done in three lines~

```ts
if (/句子互动/.test(message.text())) {
  await message.say(juzibotIntro)
}
```

But when I want to support another question at the same time, it becomes a bit problematic

```ts
if (/句子互动/.test(message.text())) {
  await message.say(juzibotIntro)
} else if (/技术栈/.test(message.text())) {
  await message.say(techStackAnswer)
}
```

If the question is `What is Juzibot's tech stack?`, the code above won't answer correctly. Of course, I can solve this by adjusting the order of the two `if` judgments, but if I have 20 common questions, this `if-else` approach will definitely have problems. Besides, each question may have many different ways of asking. For example, when asking about our company introduction, they might also say:

- What does your company do?
- Introduce your situation?
- What business do you do?
- And so on...

So simply writing `if-else` in code cannot solve this problem well.

So, it's time to show the real technology: [`WeChat Open AI Platform`](#wechat-open-ai-platform)

According to my personal understanding, `WeChat Open AI Platform` is a **cloud service** that helps you **quickly create chatbots**

### Configuring WeChat Open AI Platform

Next, we need to register a `WeChat Open AI Platform` account: [https://openai.weixin.qq.com](https://openai.weixin.qq.com)

Then create a bot on the platform, I call it `My Assistant`, and add a custom general skill `Assistant Skill`

![openai-screenshot][openai-screenshot]

Next, add custom Q&A to the skill. I created several, as shown below:

![openai-qna][openai-qna]

Here I encountered a tricky problem. I configured Q&A about `Juzibot` and `Tech Stack`, but I found that when I asked `Juzibot's tech stack`, it matched `Juzibot` instead of `Tech Stack`. So as shown above, I created a **counter-example** in `Juzibot`. It means that when a question matches this similar question, it indicates that the question does not belong to the current Q&A, which perfectly solves the problem of `Juzibot's tech stack` matching incorrectly.

### Integrating WeChat Open AI Platform into Wechaty

For easy integration, I wrote a `Wechaty` plugin [wechaty-weixin-openai](https://github.com/wechaty/wechaty-weixin-openai) for quick integration with `WeChat Open AI Platform`

First, I encapsulated the material reply code we wrote earlier into a function for easy invocation when using the plugin later. I also added a `boolean` return value to tell the calling function whether I handled the message reply in the current function, so the calling function knows I've already processed this message and can avoid processing it again.

```ts
const processCommonMaterial = async (message: Message) => {
  const room = message.room()
  const from = message.from()
  const mentionSelf = await message.mentionSelf()
  const text = message.text()

  if (room !== null && from.id === bossId && mentionSelf) {
    if (/句子互动/.test(text)) {
      await room.say(juzibotIntro)
      await room.say(new UrlLink(juzibotIntroUrl))
      return true
    } else if (/高原/.test(text)) {
      await room.say(new UrlLink(yuanIntroUrl))
      return true
    }
  }
  return false
}
```

Then, import and configure the plugin in `Wechaty`

```ts
const openAIToken = 'openai-token'
const openAIEncodingAESKey = 'openai-encoding-aes-key'

const preAnswerHook = async (message: Message) => {
  const isCommonMaterial = await processCommonMaterial(message)
  if (isCommonMaterial) {
    return false
  }
}

/**
 * Use wechaty-weixin-openai plugin here with given config
 */
bot.use(WechatyWeixinOpenAI({
  token: openAIToken,
  encodingAESKey: openAIEncodingAESKey,
  preAnswerHook,
}))
```

Using the plugin is actually very simple. Just pass in the `TOKEN` and `EncodingAESKey` from the `WeChat Open AI Platform` open service access to connect to `WeChat Open AI Platform`

![openai-config][openai-config]

Also, as you can see, the plugin configuration has a function called `preAnswerHook`. As its name suggests, this function is called before the `wechaty-weixin-openai` plugin replies with the result from `WeChat Open AI Platform`, allowing us to do some custom logic before replying.

For example, what we did above is when the bot detects that the message is in a group, sent by me, and matches a previously defined material, it replies with that material and stops subsequent logic (including not replying with the answer returned by `WeChat Open AI Platform`)

This way, when using `WeChat Open AI Platform`, we have some flexibility to combine our own custom logic.

## Implementing Transfer Functionality

Transfer is also relatively easy to implement. Here's the code directly:

```ts
/**
 * Function to get boss contact
 */
const getBoss = async () => {
  const contact = bot.Contact.load(bossId)
  await contact.sync()
  return contact
}

const noAnswerHook = async (message: Message) => {
  const room = message.room()
  const from = message.from()
  if (!room) {
    const boss = await getBoss()
    await room.say`${from}，你的问题我不会回答，你可以联系我的老板`
    await room.say(boss)
    return;
  }
  const members = await room.memberAll()
  const bossInRoom = members.find(m => m.id === bossId)
  if (bossInRoom) {
    await room.say`${bossInRoom}，${from}问的问题我不知道，你帮我回答一下吧。`
  } else {
    const boss = await getBoss()
    await room.say`${from}，你的问题我不会回答，你可以联系我的老板`
    await room.say(boss)
  }
}

/**
 * Use wechaty-weixin-openai plugin here with given config
 */
bot.use(WechatyWeixinOpenAI({
  token: openAIToken,
  encodingAESKey: openAIEncodingAESKey,
  noAnswerHook,
  preAnswerHook,
}))
```

Here we introduce another function from `wechaty-weixin-openai`: `noAnswerHook`. Similarly, translating this name literally explains the function's purpose. When `WeChat Open AI Platform` doesn't find a suitable answer, this function is called, allowing us to handle situations where we don't know what the user is asking. For example, this time we want to transfer the conversation to me when unable to answer.

In this callback function, we distinguish whether the current conversation is in a group chat or private chat. If it's a private chat, we directly send my contact card to guide adding friends. If it's in a group chat, we first get the group members and check if I'm in the group. If I am, @ me to reply. If not, similarly send a contact card. The code is simple.

Up to this point, we've basically completed the features we initially envisioned, but can we play with something more interesting based on the AI capabilities of `WeChat Open AI Platform`?

## One More Thing

Finally, let's implement another fun feature together: **When the bot recognizes that a user has negative emotions, create a group with me and that user, then let me communicate with the user**

Let's get started. Here's the code:

```ts
const preAnswerHook = async (message: Message, _: any, sentiment: SentimentData) => {
  const isCommonMaterial = await processCommonMaterial(message)
  if (isCommonMaterial) {
    return false
  }

  const hate = sentiment.hate
  const angry = sentiment.angry
  const score = (hate || 0) + (angry || 0)
  if (score > 0.9) {
    const boss = await getBoss()
    const from = message.from()
    const room = await bot.Room.create([boss, from])
    await new Promise(r => setTimeout(r, 3000))
    await room.say`${boss}，你帮帮我吧，${from}和我聊天已经聊得不耐烦了`
    return false
  }
}

bot.use(WechatyWeixinOpenAI({
  token: openAIToken,
  encodingAESKey: openAIEncodingAESKey,
  includeSentiment: true,
  noAnswerHook,
  preAnswerHook,
}))
```

Here we use a new plugin parameter `includeSentiment`. This parameter determines whether to pass the sentiment value parameter for the current message found in `WeChat Open AI Platform` in the `preAnswerHook` function. We set it to `true` here, so sentiment data will be included in the `preAnswerHook` function.

Then, based on this sentiment data, we judge whether the current user is in a state with heavy negative emotions. If so, we create a group and ask for my help.

PS: During the live demonstration, we tested many types of negative emotion messages, but some message parsing was not as expected, so we finally chose to use the sum of `hate` and `angry` to represent negative emotions.

## Final Result

![final-screenshot][final-screenshot]

Complete code: [https://github.com/windmemory/wwc-wechaty](https://github.com/windmemory/wwc-wechaty)

## Live Coding

{% include iframe.html src="https://www.youtube.com/embed/PYFg8wYZbvI" %}

> Bilibili: <https://www.bilibili.com/video/BV1LV411r756/>

## WeChat Open AI Platform

[WeChat Open AI Platform](https://openai.weixin.qq.com/) is **centered on conversational interaction**, providing intelligent business services and user management capabilities for individuals, enterprises, and organizations with customer service needs through a **skill configuration platform**. Skill developers can use the tools provided by the platform to build customer service robots.

![openai-banner][openai-banner]

## Women Who Code

[Women Who Code Beijing](https://mp.weixin.qq.com/s?__biz=MzIyMzc0NDgzMg==&mid=100000001&idx=1&sn=2cb2c65673dd989cebac1e69abad5ccd&chksm=6818c72e5f6f4e386470525349192f23c8407a77e0a628cec7dbee3e75d9704223a2ef7f2d95) was founded in Beijing in October 2015, hoping to help and encourage female engineers living and working in this city to advance smoothly in their career development. We believe the IT industry will also become more productive and creative with more women joining.

[teaser]: /assets/2020/wechaty-weixin-openai/teaser-image.webp
[mobile-screenshot-1]: /assets/2020/wechaty-weixin-openai/mobile-screenshot-1.webp
[openai-screenshot]: /assets/2020/wechaty-weixin-openai/openai-screenshot.webp
[openai-qna]: /assets/2020/wechaty-weixin-openai/openai-qna.webp
[openai-config]: /assets/2020/wechaty-weixin-openai/openai-config.webp
[openai-banner]: /assets/2020/wechaty-weixin-openai/openai-banner.webp
[final-screenshot]: /assets/2020/wechaty-weixin-openai/final-screenshot.webp

> Author: [@windmemory](https://github.com/windmemory) Wechaty contributor, author of [wechaty-puppet-padchat](https://github.com/wechaty/wechaty-puppet-padchat), [wechaty-puppet-padpro](https://github.com/wechaty/wechaty-puppet-padpro), [wechaty-puppet-padplus](https://github.com/wechaty/wechaty-puppet-padplus). CTO of [Juzi.Bot](https://pre-angel.com/portfolios/juzibot/)
>
> Code: [wwc-wechaty](https://github.com/windmemory/wwc-wechaty)

---

> 本文也有[中文版本](/2020/07/20/wechaty-openai-agent/)。
