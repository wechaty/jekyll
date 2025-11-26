---
title: "OSPP 2021 - Mid-term Report - Developing Open Source Piggy Bro Community Entertainment Bot Based on Wechaty"
author: reikohaku
categories:
  - project
  - ospp
image: /assets/2021/08-ospp-mid-term-wechaty-piggy-bro-en/piggy-bro-logo.webp
tags:
  - chat
  - summer-of-wechaty
  - summer-2021、
  - ecosystem
  - ospp
  - ospp-2021
  - mid-term
excerpt: >
  Mid-term report for the OSPP 2021 project developing Piggy Bro, an open-source multi-functional group chat bot based on Wechaty with extensible interceptor architecture, featuring weather queries, jokes, idiom chains, riddles, and more.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/08/26/ospp-mid-term-wechaty-piggy-bro/).

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

## Project Progress

* Completed Work

  Currently, the basic framework of the bot has been fully built, and preset functions such as telling jokes, checking trending topics, weather queries, music search, idiom chains, and riddles are provided.

  The Piggy Bro logo has been basically finalized.

* Problems Encountered and Solutions

  The main problem at present is that it cannot handle the complex environment of natural language semantics well.

  Due to the design goal of making responses as fast and efficient as possible, the example plugins currently provided all use regular expressions to check function triggers and parse parameters. This has two disadvantages:

  * Although regular expressions have broad coverage, they are not comprehensive.

    For example, in the weather query function, two trigger methods are preset: "Piggy Bro, check XX weather" and "Piggy Bro, how is the weather in XX". But in fact, there are more ways to ask about weather, such as "Is the weather in XX good", "Is it raining in XX", etc. These special phrasings cannot be parsed by regular expressions.

  * Regular expressions are not very good at extracting parameters.

    Still taking the weather query function as an example, for the sentence "Piggy Bro, how is the weather in XX", the key is to extract the location name. But because the trigger word "Piggy Bro" is followed directly by the parameter, extracting the location name is somewhat difficult. In addition, as mentioned in the previous point, in questions like "Is it raining in XX", the user also expresses the meaning of **whether it is raining in XX**. At this time, a more natural language response should be "It is raining in XX" or "It is not raining in XX". Regular expressions cannot achieve this yet.

  Regarding the solution to this problem, one approach is to integrate the semantic detection API from WeChat Open Platform, which can identify semantics more accurately. Another option is to consider using the **jieba** library for word segmentation to solve semantic analysis and parameter extraction problems.

* Follow-up Work Arrangement

  Follow-up work is basically consistent with the plan, with priority given to completing tasks on the schedule.
  
  In addition, there are plans to further optimize the interceptor logic to allow developers to configure pre-checks and help text for functions.
  
  Natural language recognition will depend on productivity.

## Project Results

Project Repository: [https://github.com/ReiKohaku/piggy-bro](https://github.com/ReiKohaku/piggy-bro)

### Live Code

{% include iframe.html src="https://www.youtube.com/embed/i1AhcgQzQHw" %}

### PPT Presentation Video

{% include iframe.html src="https://www.youtube.com/embed/VQ56QFz69Ek" %}

### Project PPT

{% include iframe.html src="/assets/2021/08-ospp-mid-term-wechaty-piggy-bro-en/mid-term-ppt.pdf" %}

## Miscellaneous

* Project Link: [https://github.com/wechaty/summer-of-wechaty/issues/83](https://github.com/wechaty/summer-of-wechaty/issues/83)

* Contact Information:

  WeChat: ReiKohaku
  E-mail: hbsjzjwj@163.com

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/08/26/ospp-mid-term-wechaty-piggy-bro/).
