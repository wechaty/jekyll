---
title: "Lark Chatbot Based on Wechaty Interface with Open API: Mid-term Report"
author: roxanne718
categories: project
image: /assets/2020/08-wechaty-puppet-lark-mid-term-blog-en/wechaty-lark-mid-term.webp
tags:
  - summer-2020
  - summer-of-wechaty
  - lark
  - puppet
  - chatbot
  - ecosystem
excerpt: >
  Mid-term progress report for developing a Lark chatbot puppet using Wechaty interface and Open API, including implementation of message handling, contact list management, and event subscriptions.
---

The "Open Source Software Supply Chain Lighting Program - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community. It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.

According to the difficulty of the project and the completion status, participants can also receive activity bonuses and trophies from the "Open Source Software Supply Chain Lighting Program - Summer 2020".

Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020)

Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)

This project [Lark Chatbot Based on Wechaty Interface with Open API] is an open source project supported by Summer 2020.

## Project Information: [Lark Chatbot Based on Wechaty Interface with Open API]

- Mentors: Yuan Gao (高原), Jingjing Wu (吴京京)
- Student: Rui Fan (范蕊)

- Project Name: Lark Chatbot Based on Wechaty Interface with Open API
- Project Description:
  - Read messages by subscribing to Lark message events
  - Implement real-time contact list updates by subscribing to Lark contact events
  - Interface with Lark API to implement message interfaces for various types in puppet
  - Design configuration parameters
  - Write usage documentation for Lark puppet
- Timeline:
  - Familiarize with technology stack
    - July 1 - July 20
    - Read Wechaty-puppet-padplus source code, learn TypeScript, familiarize with Lark server-side API
  - Establish connection with Lark
    - July 20 - July 31
    - Establish connection with Lark through Express, implement text message sending and receiving (i.e., ding-dong-bot)
  - Complete text message puppet
    - August 1 - August 5
    - Integrate text message sending and receiving into lark-puppet
    - Build basic project framework
  - Complete other basic message types
    - August 6 - August 20
    - Complete sending and receiving of other message types, including: images, videos, files
  - Complete message card functionality
    - August 21 - August 30
    - Establish multi-turn interactive communication with users through message cards
  - Configure parameters
    - August 31 - September 7
  - Code refactoring
    - September 8 - September 20
  - Write usage documentation
    - September 21 - September 30

## Project Progress

- Completed Work
  - Built the basic code framework, established connection path with Lark, completed URL verification, authentication, and other basic function encapsulation
  - Completed text message and image message puppet for sending and receiving, now it's possible to write message bots using wechaty-lark
  - Completed file message receiving, now received files can be saved locally
  - Completed retrieval of enterprise contact list and department list (not yet encapsulated in puppet)

- Problems Encountered and Solutions
  - When using Ngrok for intranet penetration, the subdomain changed every time it restarted. With the teacher's suggestions and guidance, we finally solved this problem using localtunnel.
  - Due to insufficient understanding of TypeScript and HTTP requests, encountered some message format issues, which were resolved by consulting documentation and learning from other students' code.

- Future Work Plan
Currently have some questions about project details, such as how to store/process retrieved files. After completing this week's tasks, will communicate with mentors about these details. The overall timeline remains unchanged.

- Project Results:
  - Mid-term Report Video: {% include iframe.html src="https://youtu.be/u5bbdWLbpBY" %}
  - Demo Video: {% include iframe.html src="https://youtu.be/g7K8l734uuY" %}

## Contact Us

- Project Link: [https://github.com/Roxanne718/wechaty-puppet-lark](https://github.com/wechaty/wechaty-puppet-lark)

- Contact: +86 17822015718 | email: 953299708@qq.com

---

> Chinese version of this post: [wechaty puppet lark mid term blog]({{ '/2020/08/19/wechaty-puppet-lark-mid-term-blog/' | relative_url }})
