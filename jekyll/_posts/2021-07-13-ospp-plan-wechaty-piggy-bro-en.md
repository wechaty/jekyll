---
title: "OSPP 2021 - Initial Report - Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty"
author: reikohaku
categories:
  - project
  - ospp
image: /assets/2021/07-ospp-plan-wechaty-piggy-bro-en/wechaty-logo.webp
tags:
  - chat
  - summer-of-wechaty
  - summer-2021
  - ecosystem
  - ospp
  - ospp-2021
  - plan
excerpt: "Summer 2021 project plan for developing Piggy Bro, an extensible entertainment bot with jokes, idiom chains, games, and a backend garden game."
---

* Project Name: Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty
* Mentors: Han Lei, Lu Yuchao, Wang Yudan
* Student: Jing Weijia
* Module List
  * Extensible development framework
  * Functions like telling jokes, idiom chain, guess pictures, guess song names, etc.
  * Piggy Bro Logo and image design
  * Piggy Bro Back Garden
  * Usage, deployment and development documentation
* Project Requirements: [https://github.com/wechaty/summer-of-wechaty/issues/83](https://github.com/wechaty/summer-of-wechaty/issues/83)

* Project Link: [https://github.com/ReiKohaku/piggy-bro](https://github.com/ReiKohaku/piggy-bro)

## Development Plan

* Task Requirements
  Develop a bot based on Wechaty to implement functions such as telling jokes, idiom chain, guessing pictures, guessing song names, checking flights, checking weather, Weibo hot search reminders, etc.; design Logo and image; develop Piggy Bro Back Garden.
* Implementation Plan
  Utilize Wechaty features to implement a simple extensible scaffold and modularly implement various functions. Then collect highly available APIs to implement required functions. The Back Garden uses Node.js + Vue development mode to implement a simple mini-game.

## Development Timeline

### Piggy Bro Bot Development (July)

* Develop Extensible Development Framework (7.1-7.7)

  * Familiarize with Wechaty development mode
  * Build Piggy Bro development scaffold
  
* Specific Function Implementation (7.8-7.30)

  * Initially implement specific functions in requirements, which may include but are not limited to: telling jokes, checking hot searches, checking weather, idiom chain, guessing pictures, guessing song names
  * Initially write API registration and deployment documentation for related functions

### Piggy Bro Peripheral Design (August)

* Design Piggy Bro Logo and Image (8.1-8.7)
  * Make initial description for Piggy Bro's Logo and image
  * Finalize Logo and image
  
* Develop Piggy Bro Back Garden (8.8-8.30)
  * Design Back Garden gameplay flow and various values
  * Build Piggy Bro Back Garden service and pages

### Finishing Work (September)

* Write Documentation and Improve Functions (9.1-9.30)
  * Write usage, deployment and development documentation
  * Organize code and improve functions

## Other

* Contact Information:
  
  WeChat: ReiKohaku
  E-mail: hbsjzjwj@163.com

> Author: [@ReiKohaku](https://github.com/ReiKohaku)

## About Summer 2021

"Open Source Promotion Plan - Summer 2021" (hereinafter referred to as Summer 2021) is a summer activity for university students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community.
It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Promotion Plan - Summer 2021".
Official website: [https://summer.iscas.ac.cn/](https://summer.iscas.ac.cn/)

This project [Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty] is an open source project supported by Summer 2021.

---

> Chinese version of this post: [ospp plan wechaty piggy bro]({{ '/2021/07/13/ospp-plan-wechaty-piggy-bro/' | relative_url }})
