---
title: "Practice of Implementing a University Admission Assistant Based on Wechaty"
author: ligen131
categories: article
tags:
  - bot
  - backend
  - node.js
  - typescript
  - university-admission
image: /assets/2022/09-wechaty-university-admission-helper-en/cover.webp
excerpt: >
  A bot that intelligently recognizes keywords and automatically replies with admission information, implemented based on Wechaty and Node.js for university recruitment promotion.
---

A bot that intelligently recognizes keywords and automatically replies with admission information, implemented based on Wechaty and Node.js.

## Background

This is an article three months overdue, and I finally have the opportunity to make up for it. Through this article, I'll record some problems encountered and their solutions.

Three months ago in June, right when gaokao (national college entrance examination) results were released, major universities were conducting intense recruitment presentations. As more and more people came to consult, more and more WeChat groups for recruitment promotion were created. Then I had a sudden idea - everyone's questions are basically the same: how many students are enrolled this year, what was last year's cutoff score, how's the school environment, how are the majors, etc. So why not let a bot handle these repetitive response tasks?

## Implementation

Since it happened to be finals week at the time, I hastily implemented an auto-reply function based on keywords. By analyzing everyone's consultation questions, I divided each person's message into two parts: admission-related vocabulary and question vocabulary. When these two types of vocabulary appear together, it can basically be determined that a parent or student is consulting about admission-related issues.

```javascript
export const ADMISSION_WORDS = [
  `plan`,
  `score`,
  `admission`,
  `number`,
  `recruit`,
  `major`,
];
export const QUESTIONS_WORDS = [
  `may I ask`,
  `?`,
  `how`,
  `ask`,
  `how many`,
];
```

After repeated adjustments in the later period, these two arrays finally became like the above.

Then set up fixed reply sentences, and an auto-reply bot was completed.

## Problems

After using it for a while, problems emerged one after another.

### Sending Images

First, if all admission information were combined into text, the final reply text would be quite long, causing a screen-flooding effect. So the image sending function must be implemented to send part of the information through images.

At that time, I was using `wechaty-puppet-xp`, and `puppet-xp`'s image sending interface was not complete. By reading the source code, I found it only supports sending images via URL, so I uploaded images to an image hosting service, then obtained the URL and sent it.

```javascript
img = FileBox.fromUrl(reply.content);
```

The `img` above can be sent directly through Wechaty's `say()` interface.

The effect is as follows:
![Q&A example](/assets/2022/09-wechaty-university-admission-helper-en/question_and_answer.webp)

### Misjudgment

When recruitment team teachers sent admission information, I found that the bot would also automatically reply. As shown in the figure below.
![Misjudged recruitment team teacher's information](/assets/2022/09-wechaty-university-admission-helper-en/error.webp)

I guessed it was because both types of keywords mentioned earlier were satisfied simultaneously, so I adjusted the keyword dictionary and added filtering for messages from recruitment team teachers and school seniors. Specific people are identified through WeChat IDs, and if conditions are met, admission information is not sent.

### Non-recruitment Groups

Since my bot was running in several groups at the same time, non-recruitment promotion WeChat groups would also send recruitment promotion messages. So I added a command to control the switch for whether to send admission information in this group (not enabled by default).
![Command control example](/assets/2022/09-wechaty-university-admission-helper-en/command.webp)

The command includes school information because the initial implementation was based on the idea of providing services for multiple schools simultaneously, and each group can independently send admission information for different universities.

### Scheduled Sending

Due to WeChat group's restriction that new members cannot view historical information, the recruitment team teacher asked me to add a scheduled sending function. Through scheduled sending of admission information, members who join the WeChat group later can get the latest information in a timely manner.
![Scheduled sending](/assets/2022/09-wechaty-university-admission-helper-en/timing.webp)

### Disturbance

Since the bot identifies every message, if someone who wants to consult sends multiple messages in succession, the bot will reply with a long string of text to each message. So I added a mechanism to send after an interval. If two consecutive messages requiring replies are identified within 10 minutes, the second message will not receive a reply.

## Summary

With the bot's help, the workload of recruitment teachers has been reduced quite a bit. However, this function still has many problems and needs to be continuously improved in the future.

Project address: [github ligen131/Sunbot](https://github.com/ligen131/Sunbot), welcome to give me a Star⭐

In addition to the admission assistant, many other interesting functions have been implemented, such as the previously popular wordle game, word cloud function, etc. Perhaps I'll talk about it in another article.
![wordle game](/assets/2022/09-wechaty-university-admission-helper-en/wordle.webp)

> Author: [ligen131](https://ligen131.com), Life goes on, tinkering never stops.
>
> This is a translated version of the original Chinese post. You can find the original post [here](/2022/09/27/wechaty-university-admission-helper/).
