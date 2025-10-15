---
title: "How to Build a WeChat Chatbot from 0 to 1"
author: lijiarui
categories: announcement
tags:
  - chatbot
  - globalai
  - talk
  - news
  - meetup
  - featured
image: /assets/2020/04-how-to-build-a-chatbot-from-zero-to-one-on-wechaty-en/homepage.webp
---

## 1. What is a chatbot?

A chatbot is a computer program that simulates human conversation through voice commands or text chats or both. Chatbot, short for chatterbot, is an artificial intelligence (AI) feature that can be embedded and used through any major messaging applications.

## 2. Why do we need a chatbot?

Chatbots are a great way to engage with your customers. They can help you to:

* Answer customer questions.
* Provide customer support.
* Generate leads.
* Sell products.

## 3. How to build a chatbot?

There are many ways to build a chatbot. You can use a chatbot platform, or you can build a chatbot from scratch.

### 3.1. Chatbot platforms

There are many chatbot platforms available, such as:

* [Dialogflow](https://dialogflow.com/)
* [Microsoft Bot Framework](https://dev.botframework.com/)
* [Rasa](https://rasa.com/)

### 3.2. Build a chatbot from scratch

If you want to build a chatbot from scratch, you can use a chatbot framework, such as:

* [Wechaty](https://wechaty.js.org/)
* [Botpress](https://botpress.com/)
* [Botkit](https://botkit.ai/)

## 4. How to build a WeChat chatbot?

If you want to build a WeChat chatbot, you can use Wechaty. Wechaty is a chatbot framework for WeChat. It is easy to use and has a lot of features.

### 4.1. The Implementation

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

Wechaty is a powerful tool for building WeChat bots. It can be used to build a chatbot that can help you to engage with your customers. I believe that in the future, Wechaty will become more and more popular.
