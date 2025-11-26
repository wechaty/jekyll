---
title: "OSPP 2021 - Initial Report - Blessed-based Wechaty Command Line Text Client Software"
author: chinggg
categories:
  - project
  - ospp
image: /assets/2021/07-ospp-plan-blessed-cli-en/wechaty-cli-logo.webp
tags:
  - summer-of-wechaty
  - summer-2021
  - ecosystem
  - ospp
  - ospp-2021
  - plan
excerpt: "Summer 2021 project plan for building an IRC-style terminal client for Wechaty using Blessed, supporting real-time messaging and contact management."
---

- Project Name: Blessed-based Wechaty Command Line Text Client Software
- Mentor: Li Zhuohuan
- Student: Liu Jing
- Module List
  - [x] Real-time reception and display of all messages
  - [ ] Obtaining and displaying contact and group chat lists
  - [ ] Displaying group chat members/contact details on the right side
  - [ ] Storing and viewing message content by source, caching contact and group chat information
  - [ ] Displaying unread message counts and intelligent sorting of contacts
  - [ ] Sending private and group chat messages
  - [ ] Fine-grained contact, group and conversation management
- Project Introduction: [https://github.com/wechaty/summer-of-wechaty/issues/80](https://github.com/wechaty/summer-of-wechaty/issues/81)
  
## Detailed Plan

- Task Requirements  
Use components provided by [Blessed](https://github.com/chjj/blessed) and [blessed-contrib](https://github.com/yaronn/blessed-contrib) to implement an instant messaging client based on Wechaty, modeled after IRC text clients in Linux command line terminals. Support all existing [Wechaty Puppet Providers](https://wechaty.js.org/docs/puppet-providers/) through Wechaty, such as WeChat, Enterprise WeChat, Feishu, WhatsApp, etc. In the initial development, being able to implement text message reception and sending can complete the proof of concept (POC).

- Implementation Plan  
Learn the use of Blessed and Wechaty, and study the architectural design of [node-facenet](https://github.com/huan/node-facenet/tree/master/src/manager/ui) and [console-tg-client](https://github.com/lekzd/console-tg-client). Communicate more with mentors, use event binding or RxJS to implement text message sending and receiving functions and unread status prompts, and provide certain contact and group conversation management functions to reach the completeness close to existing IRC clients.

The design plan is shown in the figure below:
![diagram](/assets/2021/07-ospp-plan-blessed-cli-en/wechaty-cli-diagram.webp)

## Project Development Timeline

### Phase 1 (7.1 - 8.14)

Interface with backend events, select appropriate architecture and technology stack to complete data storage, display and updating.

- 7.1 - 7.14
Explore independently to make a demo, implement simple message reception and contact list display, communicate with mentor about architectural design and technology stack to be used.

- 7.15 - 7.29  
During military training period, time is limited. Learn front-end related knowledge or implement relatively simple functions when available.

- 8.1 - 8.14
Improve code structure, focus on advancing data storage and state management, implement message content storage and viewing by source, and caching of contact and group chat information, and write mid-term report.

### Phase 2 (8.15 - 9.30)

Focus on improving front-end interaction and continuously improving user experience.

- 8.15 - 8.30
Perform state management and intelligent sorting of contacts based on unread message counts, provide more interaction options and management functions.

- 9.1 - 9.14
Implement message sending

- 9.15 - 9.30
Improve documentation, write sample code, and write tests if needed.

- October and beyond
Continue to maintain and optimize code, implement new features.

> Author:[@chinggg](https://github.com/chinggg)

## About Summer 2021

"Open Source Promotion Plan - Summer 2021" (hereinafter referred to as Summer 2021) is a summer activity for university students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community, aiming to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Promotion Plan - Summer 2021".
Official website: [https://summer.iscas.ac.cn/](https://summer.iscas.ac.cn/)

This project [Blessed-based Wechaty Command Line Text Client Software] is an open source project supported by Summer 2021.

---

> Chinese version of this post: [ospp plan blessed cli]({{ '/2021/07/14/ospp-plan-blessed-cli/' | relative_url }})
