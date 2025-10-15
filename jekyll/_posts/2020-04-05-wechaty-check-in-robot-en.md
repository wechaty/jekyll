---
title: "WeChat Check-in Robot"
author: yeojongki
categories: project
tags:
  - checkin
  - social
  - game
image: /assets/2020/04-wechaty-check-in-robot-en/notice.webp
---

## 1. Development Background

My girlfriend (just kidding) created a WeChat group for study check-ins, inviting some classmates to join for daily check-ins. Those who fail to check in for three consecutive days will be removed from the group chat. Therefore, it is necessary to record each user's check-in time and perform related settlements. I had seen WeChat robot development before, so I thought of creating a robot to replace manual recording to save time. This project was developed using the [wechaty-puppet-padplus](https://github.com/wechaty/wechaty-puppet-padplus) protocol of [wechaty](https://github.com/wechaty/wechaty).

## 2. The Solution

We decided to use Wechaty to build a chatbot that can help us solve this problem. We used Wechaty to build a chatbot that can:

1. **Record check-in time:** The chatbot can record the check-in time of each user.
2. **Settle accounts:** The chatbot can settle accounts according to the check-in time.
3. **Remove users:** The chatbot can remove users who fail to check in for three consecutive days.

## 3. The Implementation

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

## 4. Conclusion

Wechaty is a powerful tool for building WeChat bots. It can be used to build a check-in robot. I believe that in the future, Wechaty will become more and more popular.
