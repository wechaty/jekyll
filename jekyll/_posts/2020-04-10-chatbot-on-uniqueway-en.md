---
title: "Application of Chatbot in the Customized Tourism Industry"
author: likai
categories: tutorial
tags:
  - travel
image: /assets/2020/04-chatbot-on-uniqueway-en/teaser.webp
---

## 1. Introduction to Customized Tourism

* Customize itinerary on demand, no need to make your own travel guide
* Book accommodation, transportation, attractions, and activities in advance, no need to do it yourself
* 24-hour in-trip guarantee, no need to worry about problems that no one will handle

## 2. The Problem

In the customized tourism industry, we need to communicate with customers frequently. We need to understand their needs, and we need to provide them with the best travel plan. This is a very time-consuming process.

## 3. The Solution

We decided to use a chatbot to solve this problem. We used Wechaty to build a chatbot that can help us to communicate with customers. The chatbot can:

1. **Understand customer needs:** The chatbot can understand customer needs by asking them questions.
2. **Provide travel plans:** The chatbot can provide customers with the best travel plans according to their needs.
3. **Answer customer questions:** The chatbot can answer customer questions about the travel plans.

## 4. The Implementation

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

## 5. Conclusion

Wechaty is a powerful tool for building WeChat bots. It can be used to build a chatbot that can help us to communicate with customers in the customized tourism industry. I believe that in the future, Wechaty will become more and more popular.
