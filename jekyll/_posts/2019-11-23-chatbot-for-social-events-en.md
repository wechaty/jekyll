---
title: "Application of Chatbot in Offline Events"
author: alex2010
date: 2019-11-28 09:00 +0800
categories:
  - talk
image: /assets/2019/11-chatbot-for-social-events-en/petppl.webp
tags:
  - chatbot
  - wechat
  - event
---

Hello everyone, my name is Alex, Wang Lei. I am a programmer with 10 years of experience and a community organizer. Since 2011, my friends and I have launched an English enthusiast community: PET (Post English Time), which mainly organizes offline English communication activities in the CBD area.

## The Problem

We have a lot of offline events, and we need to manage the attendees. We need to know who is coming, and we need to send them reminders. We also need to collect feedback after the event.

## The Solution

We decided to use a chatbot to solve this problem. We used Wechaty to build a chatbot that can help us manage the attendees.

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

Wechaty is a powerful tool for building WeChat bots. It can be used to manage offline events. I believe that in the future, Wechaty will become more and more popular.
