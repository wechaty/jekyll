---
title: "Java Wechaty Beta Released: Finally a WeChat Bot in Java"
author: diaozxin007
categories: announcement
tags:
  - news
  - java
  - featured
  - ecosystem
image: /assets/2020/java-wechaty/2020-06-15-java-wechaty.webp
excerpt: >
  Java Wechaty Beta has been released, bringing the power of Wechaty chatbot development to the Java ecosystem with full TS version feature parity and plugin support.
---

Finally, there's a Java version of the WeChat bot.

The WeChat public account hasn't been updated for a long time. There are two main reasons: first, after changing jobs, I need to spend more time understanding and learning the new business. Second, I've spent almost all my spare time recently writing this Java version of the WeChat bot.

![java-wechaty](/assets/2020/java-wechaty/2020-06-15-java-wechaty.webp)

## What is Wechaty

The official description is:

- A Conversational AI RPA SDK for Chatbot

It's actually an open source SDK that can quickly build chat bots. In the beginning, Wechaty was just a WeChat utility library, but now it has gradually developed to interface with mainstream chat software on the market including but not limited to: WeChat, Enterprise WeChat, DingTalk, Line, etc.

The programming languages have also developed from a single language (TypeScript) to multi-language implementations including Java, Scala, Python, Go, and more. Meanwhile, the community ecosystem continues to grow.

GitHub address: [https://github.com/wechaty/wechaty](https://github.com/wechaty/wechaty) currently has 7.9k stars.

## My Connection with Wechaty

At my previous job, the boss had a requirement: send an email report after work each day briefly describing the day's work progress. If you forgot to send the report, the next day you'd be responsible for compiling everyone's reports. As a forgetful person, forgetting to send the report was practically a daily occurrence.

So I considered needing a mechanism:

- Remind me to send the report every day
- Actions should be as simple and automated as possible.

I wondered if I could have a bot on WeChat that would remind me to send the report on time every day, and just by replying to this bot, it could take my reply message, generate a report according to a fixed template, and send it to my boss. This way I wouldn't forget, and could simply and automatically complete this task.

After some Googling, I actually found the Wechaty tool. I tried writing a daily report bot that met my needs. Then I went further and wrote a tool to remind my girlfriend to eat, but because I wasn't familiar with TypeScript, the bot I wrote couldn't be stopped and became a message bomber, almost got blocked. [How can someone forget to eat? Write a WeChat bot to remind them](https://mp.weixin.qq.com/s?__biz=MzU2NTQ1NTAxNQ==&mid=2247483767&idx=1&sn=ca72401e514dded0c84b1220f887cdf4&chksm=fcba30bfcbcdb9a98e8c455357b38fda66f7af203ce09101597f23ae6a5d1eb133c48c7f63d3&token=656593281&lang=zh_CN#rd)

Because of this article, I got to know Wechaty's author Li Jiarui. Now her company is valued at many zeros.

Since my main work language is Java and I still don't know much about TypeScript, I temporarily put it aside.

## Java Version of Wechaty

After a certain version of Wechaty, it started supporting GRPC as a transport protocol. At this time, I felt the environment for multi-language development was relatively mature. So I started trying to write a Java version of Wechaty.

### Java vs Kotlin

Wechaty is developed using TypeScript. During the porting process, I found that to implement the corresponding functionality of the TS version, Java required too much boilerplate code, making development inefficient. So I considered whether I could use Kotlin to build the Java-Wechaty SDK.

Kotlin has the following characteristics that I felt were suitable for Wechaty development:

- Java and Kotlin can interoperate seamlessly
- In Kotlin, functions are first-class citizens and can exist independently of classes, which was quite advantageous when porting TS code.
- Null safety - I had enough of checking step by step when writing Java before. Kotlin solves the null pointer safety problem at the language level. Writing with it effectively reduces mental burden.
- Kotlin is pragmatic and more expressive. The syntax is closer to TS and GO, more concise compared to Java.

### Event-Driven

The TS version of Wechaty is developed based on Node.js, a typical event-driven architecture. In the early development stage, I naturally thought of using the `Vertx` framework to develop. But after developing for a while, I found that `Vertx` is actually an event-driven network framework. It mainly solves network-related problems and was too heavy for Java-Wechaty.

So I removed the Vertx framework from the code and implemented a Kotlin version of the event-driven component by referencing the EventEmitter in Node.js.

### Overall Architecture

```ascii
  +--------------------------+ +--------------------------+
  |                          | |                          |
  |   Wechaty (TypeScript)   | |     Wechaty (Java)       |
  |                          | |                          |
  +--------------------------+ +--------------------------+

  +-------------------------------------------------------+
  |                 Wechaty Puppet Service               |
  |                                                       |
  |                (wechaty-puppet-service)               |
  +-------------------------------------------------------+

+---------------------  @chatie/grpc  ----------------------+

  +-------------------------------------------------------+
  |                Wechaty Puppet Abstract                |
  |                                                       |
  |                   (wechaty-puppet)                    |
  +-------------------------------------------------------+

  +--------------------------+ +--------------------------+
  |      Pad Protocol        | |      Web Protocol        |
  |                          | |                          |
  | wechaty-puppet-padplus   | |(wechaty-puppet-puppeteer)|
  +--------------------------+ +--------------------------+
  +--------------------------+ +--------------------------+
  |    Windows Protocol      | |       Mac Protocol       |
  |                          | |                          |
  | (wechaty-puppet-windows) | | (wechaty-puppet-macpro)  |
  +--------------------------+ +--------------------------+
```

Through this diagram, you can see that Wechaty's structural design is quite clear. Using the Puppet architecture, the actual communication protocol is isolated from the specific IM software. Based on this, different languages can be developed in multiple languages based on the Puppet protocol.

### Is It Easy to Use?

Thanks to Wechaty's good early API design, you can develop your own chatbot with just a few lines of code:

Demo 1:

```java
class Bot{
  public static void main(String args[]){
    Wechaty bot = Wechaty.instance()
      .onScan((qrcode, statusScanStatus, data) -> System.out.println(QrcodeUtils.getQr(qrcode)))
      .onLogin(user -> System.out.println("User logined :" + user))
      .onMessage(message -> System.out.println("Message:" + message))
      .start(true);
  }
}
```

This Demo with 6 lines of code implements the bot's scan login and message receiving functions. At the same time, Java-Wechaty now supports pluggable plugins. Using plugins, you can build bots more simply.

Demo 2:

```java
class Bot{
  public static void main(String args[]){
    Wechaty bot = Wechaty.instance()
            .use(
                WechatyPlugins.ScanPlugin(),
                WechatyPlugins.DingDongPlugin(null)
            )
            .start(true);
  }
}
```

As plugins become more and more abundant, in the future, users may only need to combine various plugins to achieve their needs, striving for low-code development as much as possible.

### What Stage Is It at Now?

Currently, Java-Wechaty has completed the migration of TS version functionality.

Basic chat, friend management, and group management functions have been implemented. The next development will focus on API polishing and stability improvement. We also look forward to your joining us to contribute code to Java-Wechaty.

### What Can You Gain from Java-Wechaty?

1. Truly participate in open source code contributions.
2. Publish your own Jar package in the Maven central repository.
3. Meet various partners, including angel investor @Huan who has been programming for 25 years.
4. While writing Java-Wechaty, constantly refer to partners' TypeScript, Go, and Python code, examining the characteristics of various programming languages from a practical perspective. Explore the original intentions behind the design of various language features.

## Looking Forward to Your Participation

The Wechaty community has joined the "Open Source Software Supply Chain Lighting Plan - Summer 2020," a summer activity for college students jointly organized by the **Institute of Software Chinese Academy of Sciences** and **openEuler Community**.

Details: [https://github.com/wechaty/summer-of-code](https://github.com/wechaty/summer-of-code)

Wechaty provides students with many interesting topics, such as:

1. Using AI technology to develop an AI meme battle bot
2. Using Wechaty's plugin technology to develop a "daily sentence" plugin, a "flirting" bot that cares for your girl
3. There are also engineering-oriented code migration tasks that allow students to truly participate in open source projects

Development languages include TypeScript, Go, Java, Kotlin, Python, and even Scala - there's always one suitable for you.

I hope that if you've read this far, you can forward this article to students studying computer science or interested in programming, looking forward to them joining.

## Epilogue

Java-Wechaty [project address](https://github.com/wechaty/java-wechaty). Join us and you can also write a WeChat bot with six lines of code.

> Author: [@diaozxin007](https://github.com/diaozxin007) The author of Java-wechaty
> Code: [@Java-wechaty](https://github.com/wechaty/java-wechaty)

---

> 本文也有[中文版本](/2020/06/15/java-wechaty-beta-release/)。
