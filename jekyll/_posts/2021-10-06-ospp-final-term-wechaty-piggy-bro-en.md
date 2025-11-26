---
title: "OSPP 2021 - Final Report - Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty"
author: reikohaku
categories:
  - project
  - ospp
image: /assets/2021/10-ospp-final-term-wechaty-piggy-bro-en/piggy-bro-logo.webp
tags:
  - chat
  - summer-of-wechaty
  - summer-2021
  - ecosystem
  - ospp
  - ospp-2021
  - final-term
excerpt: >
  Final report for the OSPP 2021 project developing Piggy Bro, an open-source multi-functional group chat bot based on Wechaty, featuring jokes, weather, music search, trending topics, idiom chains, riddles, and more.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/10/06/ospp-final-term-wechaty-piggy-bro/).

## Summer 2021

The "Summer 2021 of Open Source Promotion Plan" (hereinafter referred to as Summer 2021) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community.
It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty of the project and completion status, participants can also receive awards and trophies from the "Summer 2021 of Open Source Promotion Plan".
Official website: [https://summer.iscas.ac.cn/](https://summer.iscas.ac.cn/)

This project [Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty] is an open source project supported by Summer 2021.

## Project Information

* Mentors: Han Lei, Lu Yuchao, Wang Yudan
* Student: Jing Weijia
* Project Introduction: [https://github.com/wechaty/summer-of-wechaty/issues/83](https://github.com/wechaty/summer-of-wechaty/issues/83)

* Project Name: Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty

* Solution Description

  This project requires developing a multi-functional group chat bot based on Wechaty.

  The core functionality of this bot is to write and configure **interceptors** to respond to messages. An interceptor is a **function with fixed input parameters and return value types**. By writing the interceptor logic, you can **intercept messages** or **pass messages to the next interceptor**, while **making certain responses**.

  This project **presets several functions**, such as weather queries, telling jokes, idiom chains, riddles, etc. for use and reference. At the same time, this project hopes to **allow users to add functions by themselves**, so users can add functions to the bot by writing their own interceptors.

  This project will also provide a **Piggy Bro Garden** page as extended help documentation, status query, and daily activity functions.

* Timeline:

  * Develop Extensible Development Framework (7.1-7.7)
    * Familiarize with Wechaty development mode
    * Build Piggy Bro development scaffolding
  * Specific Function Implementation (7.8-7.30)
    * Initially implement specific functions in requirements, which may include but are not limited to: telling jokes, checking trending topics, weather queries, music search, idiom chains, picture guessing, song name guessing
    * Initially write registration and deployment documentation for related function APIs

  * Design Piggy Bro Logo and Image (8.1-8.7)
    * Make preliminary descriptions of Piggy Bro's logo and image
    * Finalize logo and image
  * Develop Piggy Bro Garden (8.8-8.30)
    * Design garden functionality and page layout
    * Build Piggy Bro Garden service and pages

  * Write Documentation and Improve Functions (9.1-9.30)
    * Write usage, deployment, and development documentation
    * Organize code and improve functions

## Project Summary

Project Repository: [https://github.com/ReiKohaku/piggy-bro](https://github.com/ReiKohaku/piggy-bro)

### Project Results

By the end of the project, the following results were achieved:

* Built an out-of-the-box WeChat bot that can be self-deployed in any supported environment.
* Built-in six basic entertainment functions: telling jokes, weather queries, music search, checking trending topics, idiom chains, and riddles.
* Designed a logo with "electronic feel, cartoon-like, similar to the traditional Piggy Bro image in the public's mind".
* Wrote basic garden service and pages. By reading the documentation, you can learn deployment methods. The garden provides two modules: usage help and status query.
* Wrote detailed deployment documentation and function development-related documentation.

All core objectives originally planned for the project have been completed.

### Live Code Video

{% include iframe.html src="https://www.youtube.com/embed/51EwCNB_Y90" %}

Domestic link: [https://v.qq.com/x/page/t3300psc439.html](https://v.qq.com/x/page/t3300psc439.html)

### PPT Presentation Video

{% include iframe.html src="https://www.youtube.com/embed/Na9pGdf_6oY" %}

Domestic link: [https://v.qq.com/x/page/m3300a8rnft.html](https://v.qq.com/x/page/m3300a8rnft.html)

### Project PPT

{% include iframe.html src="/assets/2021/10-ospp-final-term-wechaty-piggy-bro-en/final-ppt.pdf" %}

## Others

* Contact:

  WeChat: ReiKohaku
  E-mail: hbsjzjwj@163.com

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/10/06/ospp-final-term-wechaty-piggy-bro/).
