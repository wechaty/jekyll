---
title: "Exploration and Practice of Fragmented Data Response and BAU Routine Operation and Maintenance of wechatfordata"
author: kelly-cheng
categories: project
tags:
  - code
  - productivity
image: /assets/2020/03-wechaty-data-bau-en/wechat-reply-night.webp
---

The new crown epidemic broke out in February 2020. The response and maintenance of business data of a large multinational pharmaceutical company increased rapidly with the outbreak of the epidemic. For a time, the response demands of data demanders rose rapidly. Finding a suitable open source solution has become a life-saving straw for now and for a long time to come.

## Problems that wechatfordata hopes to solve

1. **Fragmented data response:** The data demanders are all over the country, and the data demand is very fragmented. It is difficult to respond to every demand in time.
2. **BAU routine operation and maintenance:** The data demand is very large, and the data demanders are all over the country. It is difficult to respond to every demand in time.

## The Solution

We decided to use Wechaty to build a chatbot that can help us solve these problems. We used Wechaty to build a chatbot that can:

1. **Collect data demands:** The chatbot can collect data demands from data demanders.
2. **Respond to data demands:** The chatbot can respond to data demands in time.
3. **BAU routine operation and maintenance:** The chatbot can help us to do BAU routine operation and maintenance.

## The Implementation

We used the following code to implement this solution:

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

Wechaty is a powerful tool for building WeChat bots. It can be used to solve the problems of fragmented data response and BAU routine operation and maintenance. I believe that in the future, Wechaty will become more and more popular.
