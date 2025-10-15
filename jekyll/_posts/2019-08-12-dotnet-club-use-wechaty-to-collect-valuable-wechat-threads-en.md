---
title: "dotnet club uses Wechaty to collect valuable WeChat threads"
author: jijiechen
categories: story
tags:
  - bot
  - dotnetclub
  - featured
---

Talking with experts in a field often feels like a revelation. Some questions linger in our minds for a long time without an answer, sometimes for a while, sometimes for years. It's like a child prodigy in a martial arts world who has been trying to understand a secret manual for years without success, making no progress for years. If on a lucky day, you meet a master in an inconspicuous street corner who happens to hit the nail on the head and answer your question, you will be enlightened, your martial arts will be greatly improved, and you will enter the ranks of martial arts masters. What a blessing this would be!

Fortunately, in today's highly developed Internet and efficient information dissemination, when we encounter technical problems, we no longer need to spend years to understand them. Generally speaking, the pressure of reality usually does not allow it to take so long, otherwise we would not even be qualified to enjoy the [blessing of 996](https://github.com/996icu/996.ICU). Therefore, people usually search for discussions and sharing posted by people who have encountered similar problems on search engines, and refer to other people's sample methods on open source websites, and most of the problems can be quickly answered. On the other hand, this is almost enough to show that the work content of many technical personnel is the same, or at least similar.

![Copying and Pasting from Stack Overflow](/assets/2019/08-dotnet-club-use-wechaty-to-collect-valuable-wechat-threads-en/copy-paste-from-so.webp)

## The Problem

However, there are still some problems that cannot be solved by searching. For example, some problems are too new, and no one has encountered them yet. Some problems are too niche, and there are not many people who have encountered them. Some problems are too difficult, and there are not many people who can solve them.

In this case, we need to ask for help from experts. However, experts are usually very busy, and they may not have time to answer our questions. Even if they have time, they may not be willing to answer our questions for free.

## The Solution

Fortunately, there is a solution. We can use Wechaty to collect valuable WeChat threads. We can create a WeChat group, and invite experts to join the group. When someone asks a question in the group, we can use Wechaty to record the question and the answer. In this way, we can build a knowledge base of valuable WeChat threads.

## The Implementation

We can use the following code to implement this solution:

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
  if (message.room()) {
    // record the message
  }
})

bot.start()
```

## Conclusion

Wechaty is a powerful tool for building WeChat bots. It can be used to collect valuable WeChat threads, and build a knowledge base. I believe that in the future, Wechaty will become more and more popular.
