---
title: "OSSChat is What You Need for Open Source Community Operations"
author: hailiang-wang
categories:
  - project
tags:
  - osschat
  - chatopera
  - github
  - utility
  - sticky
image: /assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/cover.webp
excerpt: "OSSChat now supports auto-reply for WeChat bots, helping you manage your open-source community by bridging WeChat groups with GitHub Issues."
---

Hello everyone, I'm the Chief Operating Officer of the [Cskefu Open Source Community](http://github.com/chatopera/cskefu). We often find that WeChat groups, especially when they have more than 30 people, become places where you can't "discuss things." **Many ideas just fly by.** Some of these ideas are worth tracking, with necessary tasks behind them, but in WeChat groups, or on WeChat in general, we are not focused.

## The Pains of Community Operations

To deal with this, our usual solution is for operations staff to answer the same questions repeatedly, or to remind people (or do it themselves) to create a GitHub Issue. We document the matter on GitHub or elsewhere, and sometimes we even create a new group. However, the problem persists: valuable conversation data from the group is not stored in a public, searchable place. **Users don't like to contact you; they prefer self-service.** Imagine how cool it would be if users could find answers directly through a search engine or on GitHub Issues. In short, WeChat group operations are a pain. How much time do we waste every day answering repetitive questions?

### Answering the Same Questions Over and Over

Large WeChat groups also become highly inefficient. For example, every new member who joins asks the same questions that have been answered before.

### "Can You Create an Issue for That?"

Another problem is that **users don't like to create issues.** We live fast-paced lives, and everything is in a rush. Not every matter deserves an issue; sometimes it's just casual chat. But when a task emerges, we need an issue—a stateful record with an owner that can be assigned, tracked, and commented on. Issues are significant. An issue is a commitment, a clear list of work to be delivered. We can tolerate a poorly written initial issue, but then we follow up on it, and that's the magic of issues. I used to use Wunderlist, and now I use Microsoft To-do. Having a record immediately boosts my execution. But in a WeChat group, after a heated discussion, the task of creating an issue suddenly becomes daunting.

![osschat-is-what-you-need 6](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-6.webp)

From opening a GitHub Issue to pasting the conversation and saving it—the steps are simple, but few people do it. Believe me, once an issue is created, the matter will be resolved. Even if the issue later turns out to be for a task not worth doing, that's still a gain. **On the one hand, having issues is good for our work; on the other hand, few people create them.** We have some inertia, and we even absurdly analyze the cultural rationality of this.

If you tell me about a difficult task, I'll create an issue for you, and the task will be resolved, or at least it will see progress. If you tell me something in a WeChat group, you'll have to remind me tomorrow and next week. **The human brain has its own working principles. Issues help us build a culture of keeping promises and foster more trust.**

**The secret to improving execution is to take the first step:** start from the discussion in WeChat, create an issue, and begin execution.

## Data Hides Value

Another very, very important thing—very important! **Data hides the secret to your project's success.** People chat in WeChat every day. Do you know what they care about? Do you know how you should prioritize tasks right now?

We can compile frequently asked questions into an FAQ list. Can we use a chatbot with multi-turn conversations to handle common processes? We can check keywords to see what users are concerned about.

All of this depends on data, and this data is in WeChat groups. If you handle this data well, your project's activity can increase tenfold in 90 days! I don't have a habit of over-promising :-). I'm talking about **analyzing chat data to help you truly become "customer-centric."**

## WeChat Doesn't Innovate

Eight years ago, Mark Zuckerberg said he often looked at WeChat to learn from its innovation. Look at his enthusiasm now; his Mandarin is fluent. But now, do you know? Facebook Messenger's innovation is already a product generation ahead of WeChat! Messenger provides a pretty good experience for Metaverse-level scenarios like AR and Chatbots. **WeChat doesn't innovate.** If you've experienced Messenger's support for chatbot interactions, you'll feel the same way.

![osschat-is-what-you-need 1](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-1.webp)

**We are like WeChat slaves, giving our data to WeChat, which then mines this value to exploit us.**

## A Hero Arrives

Things won't end like this. The wheels of history roll forward, and one day, some people awakened: **Take back our data, we want to innovate!**

![osschat-is-what-you-need 2](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-2.webp)

Wechaty is very cool. It uses RPA to turn WeChat into a programmable tool. You can manage your contacts, messages, and WeChat groups with code. Yes, yours, all yours. The WeChat in the middle is yours. Then there's Chatopera, which is also very cool. It's the brain for custom robots, handling smart Q&A and conversation flows. This way, we can integrate with GitHub, allowing free synchronization between WeChat groups and GitHub issues.

```plain
I have a dream that one day, I can analyze the chat data from my WeChat groups to see what people often talk about, so I can build a knowledge base bot for automatic replies.

I have a dream that one day, I can get automatic notifications in my WeChat group for GitHub Issue creation and comment events.

I have a dream that one day, I can just say, "create an issue from the above," and the chat history from the WeChat group will automatically be created as a GitHub Issue.

I have a dream that one day, I can be with her...
```

Okay, back to work. This dream can be realized. It's a very cool idea, and I'm a bit excited. These goals can be achieved with **Wechaty + Chatopera + WeChat + GitHub**, but the workload is quite large. Let's skip the hundred thousand words here.

![osschat-is-what-you-need 3](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-3.webp)

With the participation of more than twenty contributors, this idea has finally been realized.

![osschat-is-what-you-need 4](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-4.webp)

[https://github.com/kaiyuanshe/osschat](https://github.com/kaiyuanshe/osschat)

## OSSChat Auto-Reply Feature Launched on 2021-10-14

The OSSChat cloud service has been online since March 2020, but it wasn't until October 14, 2021, that the auto-reply feature was ready, because the workload was indeed quite large. Now we just need to say in a WeChat group, "create an issue from the five messages above," and the corresponding GitHub Issue will be created and sent to the group.

![osschat-is-what-you-need 5](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-5.webp)

This is a conversation in our Cskefu developer group. With just one sentence, a GitHub Issue was created. Isn't that great? Aren't you excited? Aren't you envious?

**Saving 5 minutes in the process of creating an issue and ultimately raising execution to a higher level.** Once the first step of a complex process is initiated, the process has its own momentum.

## I Want to Use OSSChat

* **Managed Service**

To access the cloud service, you just need to contact us for registration and authorization.

[How to use osschat](https://github.com/kaiyuanshe/osschat/wiki/How-to-use-osschat)

* **Self-Hosted**

Do it yourself, run the service and configure it. The workload is 20 times that of the managed service! Feel free to give it a try!

Refer to the [README.md documentation](https://github.com/kaiyuanshe/osschat) [https://github.com/kaiyuanshe/osschat](https://github.com/kaiyuanshe/osschat)

## Discover More

OSSChat's auto-reply feature for WeChat bots is now live, helping with open-source community operations. On the evening of October 14, 2021, the OSSChat project team held an online sharing session to introduce the automatic issue creation feature to users who were already using OSSChat.

For visitors from China who cannot access YouTube.com, this video is also hosted on bilibili.com:

* [微信机器人上线自动回复，OSSChat 助力开源社区运营 \| Wechaty @ bilibili](https://www.bilibili.com/video/BV1PQ4y1S7iZ)

{% include iframe.html src="https://youtu.be/qWxDnSaa29s" %}

![osschat-is-what-you-need 7](/assets/2021/10-osschat-is-what-you-need-for-opensouce-community-operations-en/screenshot-7.webp)

> This post is also available in [Chinese](/2021/10/28/osschat-is-what-you-need-for-opensouce-community-operations/).
