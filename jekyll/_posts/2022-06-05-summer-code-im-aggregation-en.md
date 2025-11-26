---
title: "Summer of Code - IM Message Aggregation"
author: tanknee
categories: project
tags:
  - summer-code
  - puppet-whatsapp
  - productivity
image: /assets/2022/06-summer-code-im-aggregation-en/title.webp
excerpt: >
  A Summer of Code project to aggregate messages from different IM applications (WeChat, WeCom, WhatsApp) and forward them at scheduled times to reduce information overload and improve productivity.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/06/05/summer-code-im-aggregation/).

Nowadays, the types of social applications are becoming increasingly diverse. Everyone faces massive amounts of information daily, while attention and time are limited. Frequently browsing, checking, and replying to messages on various social platforms consumes a lot of energy. To improve work efficiency and reduce invalid information interference, we hope to aggregate messages from different IM applications (such as WeChat, WeCom, and WhatsApp) and forward all messages from the previous cycle to a specified application at fixed times each day.

## IM Message Aggregation Application Function Overview

### Integrating WeChat, WeCom, and WhatsApp Through Wechaty

* Use Wechaty's capabilities to implement sending and receiving basic message types for these three types of social apps

  * Text messages
  * Image messages
  * File messages
  * Animated emojis
  * Card links

### Message Interoperability Between the Three Applications

* Through message forwarding and scheduling scheme, WeCom and WhatsApp messages can be aggregated to WeChat
* Message synchronization: synchronize messages from other applications

### Support Time-Period Selection of Social Software for Receiving Messages

* Support configuration to select any social software as the message aggregation application, select message receiving time, etc.
* Support quick project deployment with Docker
* Support more IM applications
* Support extending third-party applications, connecting bots, weather queries, and similar applications

## Message Forwarding and Scheduling

After reaching a user-specified time point, the message aggregation application automatically pulls historical messages from the storage pool and forwards them to the aggregation application.

The general process of forwarding and scheduling is as follows.

![Message forwarding and scheduling process](/assets/2022/06-summer-code-im-aggregation-en/1.webp)

To protect users' privacy information, in principle, the message aggregation application should delete the originally stored messages by default after forwarding.

To enhance the usability of this part, messages can be filtered and processed in a targeted manner.

For example, when the application receives information that triggers pre-set rules:

1. Messages that @me
2. Messages that successfully match regular expressions
3. Messages from specified group chats
4. Messages sent by specified friends
5. Specific categories of messages (images, links, animated emojis, etc.)

Then some custom operations can be performed, such as:

1. Send specified network requests
2. Forward messages to a specified user
3. Send emails to specified email addresses

When forwarding messages to the aggregation application, an additional message needs to be sent to inform users which social application the following forwarded messages come from, for example (the following content is sent from WeChat).

## Project Configuration

To make the user experience more consistent and avoid cumbersome configuration after starting the Docker service, users should configure the message aggregation application through conversational interaction operations in WeChat. We expect to be able to configure the following functions:

1. Aggregation application
2. Message forwarding time (can be a sequence, multiple times)
3. Whitelist mechanism (regular expressions, message types, @me and other multi-condition combinations)
4. Blacklist mechanism
5. Operations after keyword triggers
6. Clear message pool
7. Pause message forwarding through interactive commands
8. Restart message forwarding through interactive operations

![Interactive operations](/assets/2022/06-summer-code-im-aggregation-en/2.webp)

In addition to the above configuration-related content, the interactive operations should also support:

1. Query application status, such as whether the application is running, how many messages are in the message pool.
2. Query whether accounts of other social applications are online.

## Extensions

### Multi-IM Application Integration

This application should design a complete set of interfaces to facilitate developers and users to integrate more IM applications, such as Telegram, QQ, etc. The Wechaty community has already adapted many IM applications. We can perform simple adaptation of these applications, such as developing an adapter layer to unify data communication between puppets and the message aggregation application.

![Message aggregation application architecture design](/assets/2022/06-summer-code-im-aggregation-en/4.webp)

### Third-Party Application Integration

To enhance the playability and extensibility of the project, a plugin framework can be introduced. The application exposes several hook functions to plugins during its lifecycle, facilitating third-party developers to develop applications embedded in the message aggregation process.

Hooks can be roughly divided into these categories:

1. Project startup
2. Receive messages
3. Forward messages to aggregation application
4. Receive commands from users

As shown in the figure below, when the message aggregation application starts, it will trigger the callback functions of all extensions that have registered the "startup success" hook. When receiving IM messages, it will also trigger the callback functions of all extensions that have registered the "receive messages" hook. The other items follow similar logic.

![Lifecycle events](/assets/2022/06-summer-code-im-aggregation-en/3.webp)

Some messages that trigger keywords will be sent to third-party applications:

![Interactive command events](/assets/2022/06-summer-code-im-aggregation-en/5.webp)

## Docker Image Packaging

We plan to use Docker to integrate the runtime environment required by the project, facilitating users to quickly deploy the IM message aggregation project on their own machines or servers.

Docker related documentation: [https://docs.docker.com/](https://docs.docker.com/).

---

## Summary

Since using Wechaty last year, I have been following Wechaty's developments, thinking that after finishing the postgraduate entrance examination next year, I could do a wave of Wechaty's [Summer of Code](https://summer-ospp.ac.cn/#/org/prodetail/220260301) projects. What a coincidence, I managed to get it this year, so I'm very fortunate to be able to participate.

This project is planned to officially start construction in late June and early July. According to the workload described above, a rough product can be made in about a month. Around August, perfection and testing work will begin, along with writing related documentation.

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/06/05/summer-code-im-aggregation/).
