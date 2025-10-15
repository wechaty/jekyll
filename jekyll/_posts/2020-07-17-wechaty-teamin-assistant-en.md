---
title: "Implementing a WeChat Task Assistant with Wechaty"
author: darkli
categories: project
tags:
  - padplus
  - productivity
  - wechat-robot
  - teamin
  - chatbot
  - featured
image: /assets/2020/07-wechaty-teamin-assistant-en/home-01.webp
excerpt: "This post introduces a WeChat task assistant built with Wechaty. The author shares the motivation, design, and technical challenges of creating a chatbot that can understand natural language to manage daily tasks and reminders within WeChat."
---

> This post is also available in [Chinese (Simplified)](/2020/07/17/wechaty-teamin-assistant/).

[![PoweredBy](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=132&status=done&style=none&width=132)](https://github.com/wechaty/wechaty)
[![Wechaty](https://img.shields.io/badge/Wechaty-Open%20Source%20Incentive%20Program-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=134&status=done&style=none&width=134)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

## A WeChat Task Assistant Implemented with Wechaty

### The Beginning

Ever since the iPhone added the Screen Time feature, I was surprised to find that I spend more than half of my day on my phone, and over 80% of that time is on WeChat. This is probably a reflection of many people's daily lives. Gradually, we find that every aspect of our lives becomes connected to WeChat.

After learning about Wechaty, an idea came to my mind: could I create a small assistant on WeChat to help me manage the various trivial matters of daily life? When there's something to do, I could just tell the assistant, and it would record it and remind me when the time comes. That sounds great, much simpler than opening a productivity app and typing in a schedule word by word. The assistant could also be made more human-like, making me feel as if I really have a personal assistant.

### The Challenge

#### Design

The structure is actually quite simple. I thought about it, and the simplest implementation would look like this:
![Structure Diagram](/assets/2020/07-wechaty-teamin-assistant-en/structure.webp)

The official documentation already explains in detail how to connect to WeChat and handle message sending and receiving, so I won't go into that here. For the task assistant part, the two most core steps are intent analysis and keyword extraction to add tasks through the assistant.

**Intent Analysis**
I have previously compared Baidu's UNIT, Microsoft's LUIS, and the dialogue platforms of Tencent and iFlytek. I feel that Microsoft's LUIS has the best performance, so I chose their solution for intent understanding.

**Keyword Extraction**
In LUIS's intent analysis, you can also pick out some desired words through Entities, but this is far from enough for adding a task. Unlike the customer service dialogues we usually see, the dialogue scene for adding tasks is open-ended, so conventional keyword extraction cannot meet our requirements. For example:

1. Remind me to go to a meeting tomorrow morning.
2. Remind me to go on a business trip in the background.

In these two sentences, "remind" and the time words are easy to pick out through Entities. The difficult part is the task's subject: "meeting," "business trip." The range of task subjects is open-ended; there's no way to predict what the content will be, nor is there a way to limit it. If one day the assistant suddenly tells you, "You can only ask me to remind you about meetings," what kind of mood would that put you in?

To accurately extract the subject content, syntactic structure comes into play. The specifics of how to analyze it are beyond the scope of this blog, so I won't go into detail. The general idea is to use syntactic structure analysis to find the part of the user's expression that contains the content, remove some useless words, and then form the subject. It sounds simple, but doing it is another story, hehe...

Well, with the general idea in mind, let's get started. The basic logic is:

1. I send voice or text messages to WeChat.
2. The assistant gets my information through the Wechaty interface. If it's a voice message, it's converted to text.
3. The text is sent to LUIS for intent analysis, and some simple keywords like time, place, and person are extracted.
4. The sentence is syntactically analyzed to extract the task's subject.
5. Business logic is formed, and the task is recorded in the database.
6. There will also be a scheduled task to periodically check if tasks are due. If a task is due, a message is sent to me via Wechaty.

#### Trying it Out

Since extracting the task subject is a very difficult thing to do, it's hard to make it perfect, but common reminder tasks are no problem, and the results are quite good. Let's look at some examples:
![Chat Example 01](/assets/2020/07-wechaty-teamin-assistant-en/chat-01.webp)

Here, the request to the assistant is: `Remind me to go to a meeting on the third floor at 10 am the day after tomorrow.`
In this sentence, `me` and `10 am the day after tomorrow` can be directly returned during intent analysis. As mentioned earlier, through syntactic structure analysis, we find that `me` and `go to a meeting on the third floor at 10 am the day after tomorrow` are both objects of `remind`. From this, we can extract the subject: `go to a meeting on the third floor`. It doesn't seem too difficult, does it? Hehe.

Now for a more complex one:
![Chat Example 02](/assets/2020/07-wechaty-teamin-assistant-en/chat-02.webp)

This time the wording is:
`Meeting with a client at 10 am tomorrow, remind Xiao Ming to prepare the meeting materials before 3 pm.`

This structure is more complex. Here, `Xiao Ming` is the person in charge of this matter. Also, there are two times: `10 am tomorrow` and `before 3 pm`. The difficulties in this sentence are:

1. Determining that `Xiao Ming` is the person in charge.
2. There are two times: `10 am` is the main time for the meeting, and `before 3 pm` is the time by which the materials need to be prepared.
3. Deriving the subject: `Meeting with a client, have the meeting materials prepared`, without any extra useless words.

For those who are interested, you can study how to do this yourself. It's quite interesting.

### In Conclusion

WeChat has now evolved into a tool for connecting people, and dialogue will slowly become the mainstream of applications in the future. The emergence of Wechaty has given us new opportunities for attempts like this. I am very grateful for the hard work of the Wechaty authors. We can imagine that in the future, a more intelligent dialogue assistant will appear, one that can help you solve various complex problems around you. I hope that day comes soon. :)

[![PoweredBy](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=132&status=done&style=none&width=132)](https://github.com/wechaty/wechaty)
[![Wechaty](https://img.shields.io/badge/Wechaty-%E5%BC%80%E6%BA%90%E6%BF%80%E5%8A%B1%E8%AE%A1%E5%88%92-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=134&status=done&style=none&width=134)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

## Wechaty实现微信上的任务小助手

### 缘起

iphone自从增加了屏幕时间提醒以后，我惊奇的发现，现在一天有超过一半的时间都在看手机，而这么长的时间里面超过80%的时间在微信。。。  
可能这是很多人日常生活的一个缩影，慢慢地我们会发现，生活重的各种点滴都开始会和微信关联起来。

知道有Wechaty以后，我萌生了一个想法，是否可以在微信上做一个小助手，让她来帮我管理日常生活中的各种琐事呢？  
当有什么需要做的事情，就直接告诉小助手，他帮忙记录下来，等到了时间就来提醒我，想想就很爽，比打开一个效率管理的App一字字输入日程安排要简单多了。  
小助手也可以做的更拟人化一些，让我觉得就好像真的是自己的一个助理。

### 挑战

#### 设计思路

其实结构比较简单，我想了一下，一个最简单的实现结构是这样的  
![结构图](/assets/2020/07-wechaty-teamin-assistant-en/structure.webp)

怎么接入Wechat，实现微信消息的收发，这个官方文档已经说的很详细了，这里就不多说了。  
针对任务助手这块，要实现通过小助手把任务添加进来，对话的意图分析和关键词获取是最核心的两个步骤

**意图分析**  
之前曾经对比过百度的UNIT、微软的Luis以及腾讯、讯飞的对话平台，效果最好的感觉还是微软的Luis，因此这里选择用他们的方案来做意图理解。

**关键词获取**  
在Luis的意图分析中可以通过Entity顺便挑选出一些想要的词汇，但这些对于添加一条任务来说，还是远远不够  
和一般我们看到的客服对话不太一样，添加任务的对话场景是开放式的，因此常规的这种关键词获取并不能满足我们的要求  
比如：

1. 提醒我明天上午去开会
2. 提醒我后台去出差

这两句话中，提醒、时间词，这些都很好通过Entity挑选出来，比较难的是，任务的主题：开会、出差  
任务主题的范围是开放式的，没有办法预料会有什么内容，也没有办法去限制，如果有一天小助手突然对你说，只能跟我说提醒你开会啊，那是一种什么样的心情。。。  

为了能够精准获取主题的内容，语法结构就派上用场了，具体怎么分析，不属于这篇Blog的范畴，就不详细说啦。  
大致的思路是通过语法结构分析，找出用户表达内容的部分，去掉一些无用的词汇，就可以形成主题了，说起来很简单，做起来嘛，嘿嘿。。。

嗯，大致的思路有了，开始搞一把。  
基本逻辑是：

1. 我发送语音、文字给微信
2. 小助手通过Wechay接口获取我的信息，如果是语音，转成文字
3. 将文字传送给Luis进行意图分析，同时获取一些简单的关键词：时间、地点、人物等
4. 将句子进行句法分析，再抽取出任务的主题
5. 形成业务逻辑，往数据库中记录任务
6. 同时会有一个定时任务，定期检查任务是否到期，如果到期，通过Wechaty给我发送消息

#### 效果尝试

由于任务主题的提取是一个非常难得事情，很难做到尽善尽美，不过常用的提醒任务都是没问题的，效果还是挺好的。  
我们来看些例子：
![聊天示例01](/assets/2020/07-wechaty-teamin-assistant-en/chat-01.webp)

在这里，向小助手提的要求是：`提醒我后天上午10点去三楼开会`  
在这句话中，`我`、`后天上午10点`，这两个关键词都可以在意图分析的时候，直接返回出来  
按照前面说的，通过句法结构分析，我们发现，`我`、`后天上午10点去三楼开会`，都是`提醒`的宾语，
通过这个可以抽取出主题：`去三楼开会`  
看起来是不是也不太难，嘿嘿。  

那咱们来个复杂的：
![聊天示例02](/assets/2020/07-wechaty-teamin-assistant-en/chat-02.webp)

这次的话术是：
`明天上午10点与客户开会，提醒一下小明下午3点之前把会议资料准备好`  

这个结构就复杂了，在这里，`小明`是这件事情的负责人，
同时这里有两个时间：`明天上午10点`，`下午3点之前`
这句话的难点是：

1. 判断`小明`是负责人
2. 两个时间，`上午10点`是开会的正题，`下午3点之前`是需要准备资料的时间
3. 得出主题：`与客户开会，把会议资料准备好`，不能有多余的无用的词

具体怎么做，有兴趣的小伙伴可以自己研究研究，还是挺有意思的。

### 写在最后

微信现在已经演变成了一个人和人之间的连接工具，对话慢慢会变成以后应用的主流，
Wechaty的出现让我们进行类似这样的尝试有了新的机会，还是非常感谢Wechaty的作者们的辛勤努力的。
可以畅想，未来一定会出现一个更加智能的对话小助手，它可以帮你解决身边各种复杂的问题，希望这一天能够早点到来，：）

大家也可以加我们的小助手为好友，体验一下对话任务协作的功能，多多给我们提建议哦。  

![小助手二维码](/assets/2020/07-wechaty-teamin-assistant-en/teamin-assistant.webp)

> 作者: [darkli](https://github.com/darkli)

---

> Chinese version of this post: [wechaty teamin assistant]({{ '/2020/07/17/wechaty-teamin-assistant/' | relative_url }})
