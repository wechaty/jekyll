---
title: "What Can a WeChat Bot Do?"
author: zhuangbiaowei
categories: article
tags:
  - ai
  - news
  - ecosystem
image: /assets/2018/11-25-wechat-robot-can-do-anything-en/kaiyuanshe.webp
excerpt: >
  As a product manager who can code, I explore the limitless possibilities of WeChat bots using Wechaty - from chat history recording to community management, multi-group broadcasting, and ChatOps integration.
---

As a product manager who can write code, I've recently been playing with an open-source framework for WeChat bots: [wechaty](https://github.com/wechaty/wechaty). Because it's so easy to get started, I've also written my own WeChat bot by modifying the "hello world" example. This has sparked many ideas, and I'd like to share these thoughts with you.

Theoretically, a **WeChat bot** can do anything a human can do using the WeChat client. Of course, some limitations still exist:

* There's no API related to Moments, so that's a no-go. Many interesting things that could be done with Moments are not yet possible.
* It's very good at accepting "keyword" commands, but implementing natural language operations (dialogue) is very difficult.

Other than that, there's nothing else. Let's dive in:

## Recording Chat History

This was the first thing I tried: synchronizing WeChat group chat records to [gitter.im](https://gitter.im). You just need two bots, one joining the WeChat group and one joining the Gitter group, then forward messages received on WeChat in real-time. What's slightly more difficult is parsing various message types and forwarding them properly.

The benefit of doing this is singular: because WeChat cannot display past chat records for newcomers to a group, while Gitter can do this, it becomes very convenient for new members to review past chat history.

## Community Recruitment

Now we can implement a system where anyone can automatically add this bot as a friend, then chat with it. If they input "#join [reason for application]", this person will be pulled into a WeChat group where there are some "interviewers" who will chat with the newcomer and determine whether to accept their application.

There can be further operations: through #join _topic_, users can choose to join different WeChat groups. For a large community, this should be very helpful.

## Multi-Group Broadcast Forwarding

This should be fairly easy work. Suppose a particularly impressive expert wants to do a live online session (images, text, audio recordings, plus Q&A). You can create Group 1, Group 2 through Group N, and the expert doesn't need to join any group—they just need to speak to the WeChat bot. The bot can synchronously forward their teaching content to multiple WeChat groups.

Going further, if someone asks a question, the bot can also forward these questions to the instructor (or add a manual question review intermediate step). The instructor's answers can also be synchronously forwarded to all groups.

Thus, the 500-person limit for WeChat groups is no longer an issue.

## Enforcing Name Change Rules

Many WeChat groups have naming conventions, such as "Zhuang Biaowei@Shanghai#Kaiyuanshe" representing my name, location, and organization.

Using a WeChat bot, you can completely prompt newcomers when they join the group. Those who don't change their name within 24 hours get automatically kicked.

## Identifying Spam

Referring to certain spam email filtering algorithms, if you identify that someone in the group is sending spam content, kick them out directly.

## Clearing Lurkers

Since all group chat records can be recorded, long-term lurkers can no longer just spam before cleanup to appear active—it's already useless.

A simple algorithm: average no less than 3 messages per day, consecutive non-messaging time less than 3 days. This can filter out lurkers, and if you want to clear them, you can take action directly.

## Member Level System

A more complex contribution point system is also possible:

* Friends newly joining the group start at level 0
* After 2 consecutive weeks of activity, they reach level 1
* Friends at level 1 and above can say "@someone thanks" or other keywords
* Friends who receive thanks more than N times can level up
* Those who send red envelopes get kicked directly (you can't buy thanks by sending red envelopes)

## Tools for Administrators

In one-on-one chats, the bot can accept more commands, such as:

* find :name="Zhang San"
* kick :name="Zhang San", :room=:all
* ban :name="Zhang San"
* broadcast :msg="", :room=/Kaiyuanshe/g
* manager add :name="Zhang San"
* manager delete :name="Zhang San"
* And many, many more...

## Re-engaging Old Users

Users who were once active but haven't been active recently—send them a message to "check in." If you can be even more intelligent: "In such-and-such group, people are recently discussing the Vue framework for frontend. Don't you want to participate in the discussion?"

I believe this can bring back many people.

## Work Groups - Integrating Work Tasks

There's so much that can be done with work groups. Here I can only ramble a bit:

* Manager: Have we figured out the reason for today's XXX issue?
* Xiao Zhang: Yes, we found a problem, we'll solve it tomorrow
* Manager: Are you going to solve it?
* Xiao Zhang: @Li Si Please solve this problem tomorrow. @Bot #newtask Fix bug caused by XXXX
* Bot: Task ticket created, ticket number #13048, responsible person: @Li Si
* Li Si: Received

## Work Groups - ChatOps

Forward WeChat group chat messages to an IM that supports ChatOps, such as Slack or BearyChat, and the possibilities become even more limitless.

That's all for now. I welcome everyone to discuss further ideas together. The QR code is for "Kaiyuanshe-bot"—feel free to add it. The functionality is still quite weak, so please go easy :)

![Kaiyuanshe](/assets/2018/11-25-wechat-robot-can-do-anything-en/kaiyuanshe.webp)

> Author: [Zhuang Biaowei](https://github.com/zhuangbiaowei/), Director/Executive Director of [Kaiyuanshe](http://www.kaiyuanshe.cn/). Originally published on Jianshu: [What Can a WeChat Bot Do?](https://www.jianshu.com/p/9698395511e0)

---

> 本文也有[中文版本](/2018/11/25/wechat-robot-can-do-anything/)。
