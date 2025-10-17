---
title: "Lark Chatbot based on Open API for Wechaty: Final Report"
author: roxanne718
categories: project
image: /assets/2020/09-wechaty-puppet-lark-final-blog-en/wechaty-lark-final.webp
tags:
  - featured
  - summer-2020
  - summer-of-wechaty
  - lark
  - ecosystem
excerpt: >
  Building a Lark (Feishu) chatbot using Wechaty by encapsulating open APIs
---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Promotion Plan - Summer 2020".
Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)
This project [Lark Chatbot based on Open API for Wechaty] is an open source project supported by Summer 2020.

## [Lark Chatbot based on Open API for Wechaty] Information

- Mentors: Gao Yuan, Wu Jingjing
- Student: Fan Rui

- Project Name: Lark Chatbot based on Open API for Wechaty
- Project Description:
  - Read messages through Lark subscription message events
  - Real-time update of member information in the address book through Lark subscription address book events
  - Interface with Lark API to implement message interfaces of various types on puppet
  - Design configuration parameters
  - Write usage documentation for Lark puppet
- Timeline
  - Familiarize with technology stack
    - 7.1-7.20
    - Read Wechaty-puppet-plus source code, learn TypeScript, familiarize with Lark server API
  - Establish connection with Lark
    - 7.20-7.31
    - Establish connection with Lark through Express, implement text message sending and receiving (i.e. ding-dong-bot)
  - Complete text message sending and receiving puppet
    - 8.1-8.5
    - Integrate text message sending and receiving into lark-puppet
    - Build project basic framework
  - Complete other basic message type sending and receiving
    - 8.6-8.20
    - Complete sending and receiving of other message types, including: pictures, videos, files
  - Complete message card sending and receiving
    - 8.21-8.30
    - Establish multiple interactive communications with users through message cards
  - Set configuration parameters
    - 8.31-9.7
  - Code refactoring
    - 9.8-9.20
  - Write usage documentation
    - 9.21-9.30

## Project Summary

- Project achievements:
  - Project repository located at: <https://github.com/Roxanne718/wechaty-puppet-lark>
  - Live coding video:{% include iframe.html src="https://youtu.be/eutz5EMlJCI" %}
  - Demo video:{% include iframe.html src="https://youtu.be/_y5DktHdL9U" %}
  
- Problems encountered and solutions:
  - When using Ngrok for intranet penetration, the subdomain name changes every time it restarts. Under the teacher's suggestion and guidance, we finally used localtunnel to solve this problem.
  - Due to insufficient understanding of TypeScript and HTTP requests, I encountered some message format problems, which were solved by consulting materials and learning from other students' code.
  - Although the basic functions have been completed, the project cannot reach publication standards. If you want to develop Lark bots like using wechaty in WeChat, you still need to complete the following things:
    - Encapsulation of contact class, room class, etc.
    - Encapsulation and processing of other payload messages
    - Encapsulate puppet into wechaty
  - Thank you to the wechaty community for your tolerance, help and encouragement. Although it was only three months, I gained a lot from this project. I learned a lot of new things from communicating with my mentor and met many excellent partners. At present, this project has not reached my expected level. I will continue to follow up and improve, hoping to complete a complete Lark robot framework.
  - This is my first time developing independently in the strict sense. I encountered many problems during the development process, such as inconsistent front and back interfaces, and modifications to the early logic in the later stages of the project. In the process of being overwhelmed by new bugs, I increasingly understand the importance of engineering. I hope I can learn from the lessons and do better in future development.
  - Finally, I hope the "Open Source Promotion Plan" series of activities will get better and better. I believe future developers can also grow from it and become new contributors to China's open source software chain.

## Contact Us

- Project link: [https://github.com/Roxanne718/wechaty-puppet-lark](https://github.com/Roxanne718/wechaty-puppet-lark)

- Contact: +86 17822015718 | email: 953299708@qq.com

---

> Chinese version of this post: [wechaty puppet lark final blog]({{ '/2020/09/30/wechaty-puppet-lark-final-blog/' | relative_url }})

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/30/wechaty-puppet-lark-final-blog/).
