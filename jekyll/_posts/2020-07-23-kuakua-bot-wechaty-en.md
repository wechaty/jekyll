---
title: ' "Praise Robot Based on Wechaty" '
author: yinizhilian
categories: project
tags:
  - padplus
  - entertainment
  - social
image: /assets/2020/07-kuakua-bot-wechaty-en/titleimage.webp
---

[![Wechaty Badge](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=132&status=done&style=none&width=132)](https://github.com/wechaty/wechaty)
[![Everything about Wechaty](https://img.shields.io/badge/Wechaty-%E5%BC%80%E6%BA%90%E6%BF%80%E5%8A%B1%E8%AE%A1%E5%88%92-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=134&status=done&style=none&width=134)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

&ensp;&ensp;&ensp;&ensp;During the epidemic, I remember adding a friend on WeChat. When I sent him a message, he could reply immediately. Later I learned that some of them were replied by robots. I was very curious about how this was done, because I only knew that WeChat official accounts could do it. Can WeChat also do it? Because of curiosity, I searched for relevant information on the Internet and learned about the powerful wechaty. It just so happens that my research direction is natural language processing. The praise robot on the official account was very popular some time ago, so I thought about writing a WeChat version of the praise robot. If you want to experience it, you can add: AINLPER-BOT. The implementation of related functions is not perfect, please don't spray it~

## What is a praise robot?

A praise robot is a chatbot that can praise you. You can send it a message, and it will reply with a praise.

## How to build a praise robot?

We can use Wechaty to build a praise robot. We can use the following code to implement this solution:

```typescript
import { Wechaty } from 'wechaty'

const bot = new Wechaty()

bot.on('scan', (qrcode, status) => {
  console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`)
})

bot.on('login', (user) => {
  console.log(`User ${user} logged in`)
})

bot.on('message', async (message) => {
  if (message.text() === 'ding') {
    await message.say('dong')
  }
})

bot.start()
```

## Conclusion

Wechaty is a powerful tool for building WeChat bots. It can be used to build a praise robot. I believe that in the future, Wechaty will become more and more popular.
