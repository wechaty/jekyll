---
title: 'Wechaty Java Component Porting Development'
author: cunkoulaocai
categories: project
tags:
  - java
  - soc
  - soc2020
  - ecosystem
image: /assets/2020/08-java-wechaty-transplant-midpoc-en/java-wechaty-transplant-midpoc.webp
excerpt: "This post is a mid-term report on porting Wechaty components to Java/Kotlin as part of the Summer 2020 Open Source Promotion Plan. It covers the development of memory-card and state-switch components, API porting, and challenges faced during the process."
---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China. Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: <https://isrc.iscas.ac.cn/summer2020> Official news: <http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html>
This project [Wechaty Java Component Porting] is an open source project supported by Summer 2020.

## Summer 2020 [Wechaty Java Component Porting] POC Showcase

## [Wechaty Java Component Porting] Information

- Mentor: Zhengxin Diao (刁政欣)
- Student: Yang Chen (陈炀)
- Project Name: Wechaty
- Description: Port the typescript version of wechaty to the java/kotlin platform using java or kotlin

- Time planning:

  memory-card storage

  - 7.1 - 7.19
  - This module porting is a basic requirement of the project. In order to meet the functions of the robot not needing to scan the code to log in again and saving the robot's own information, this component is needed. This component separates the storage function from the storage data structure, so that the storage method can be easily replaced. It supports Alibaba Cloud OSS, Huawei Cloud OBS, Amazon S3, json storage, etc., and provides easy-to-use APIs.
  - Basic functions

  state-switch state machine

  - 7.20 - 7.26
  - state-switch is a monitor/protector for managing asynchronous operations. In the original ts version, it can be easily implemented through the characteristics of Promise. In kotlin, other APIs are needed to achieve it. The idea is relatively clear, but it is a bit troublesome to find a suitable implementation method.
  - Basic functions

  (Optional) Other API porting and testing

  - 7.27 - 8.7
  - There are still many APIs in java-wechaty that have not been implemented, and the style of the APIs is also imitated from js. In the follow-up, these APIs need to be gradually implemented and their API style modified to be more suitable for languages ​​such as java and kotlin.
  - Extended functions

  (Optional) Understand the underlying principles and add some new functions

  - 8.8-8.15
  - This part is optional. Wechaty has some functions about miniprogram, red envelopes, etc. that have not been implemented. It is necessary to understand the bottom layer for subsequent expansion and gradually enhance the functions of wechaty.
  - Extended functions

## Project progress

- Work completed:

1. Completed the development of memory-card and states-witch components. Since a part of it involves aws, and aws requires a visa or other bank card to register, this part was written but not tested, but I added an Alibaba Cloud interface for easy use.
2. Completed the porting of most of the typescript version of the API. At present, almost all the ts version of the API should have been ported. Of course, there will be some bugs, and the ease of use of the API has not yet reached a good requirement.
3. Conducted some existing API tests and fixed some small bugs. Of course, there are still some bugs that have not been fixed. I look forward to the next stage of development.

- Problems encountered and solutions:

> Quickly learn kotlin and understand the program architecture and logic

Although it is `java` porting development, according to the mentor's suggestion and the integrity of the entire project, I still choose to use kotlin for development, but I have not written kotlin before, I must immediately spend some time to learn kotlin, for advanced features and possible errors can only be encountered and then said. The entire program logic architecture is still relatively clear, although it still took some time to understand the workflow.

> Asynchronous support in java and kotlin

Due to async, await, and Promise, js has better support for asynchrony, so we need to carefully consider the asynchronous operations during the porting process. Of course, since kotlin is used, you can also try to use coroutines for writing later.

> Consideration of coroutines

When writing state-switch, it took some time to understand the ts version, mainly because the understanding of promise was not in place. After understanding the working principle, because there is no similar api in kotlin to solve it, it took some time to explore. Finally, at the suggestion of the mentor, and considering that it was written in kotlin, you can use coroutines. It is temporarily decided to use coroutines plus a blocking queue to achieve it. It seems to have achieved the effect at present.

This coroutine is quite interesting. Some parts of kotlin's coroutines are still difficult to understand.

Experience: In the second half of the project, there was a problem on my side, which slowed down the progress. Fortunately, the difficulty of the task was not very great, and the mentor was also very good. In the end, whether I passed the assessment or not, this experience of participating in an open source project is worthy of recollection.

> I think porting is quite interesting

Different programming languages ​​have different ways of thinking. It is also a very interesting thing to quickly learn a language and practice it in a few days. Although the main consideration for the entire porting is the porting of functions, we must also pay attention to the ease of use of the API. There are still many differences in the API styles of ts and java.

> Simple experience of github development process

It is a very interesting experience to participate in the open source community with github. Although I have cooperated on github in the same group before, the process is still different. I also experienced the CI/CD process of github for the first time. I also experienced the meeting discussion of the open source community for the first time.

> High-quality unit testing

To be honest, I still don't know how to write high-quality unit tests, and I need to continue to learn in the future.

- Follow-up work arrangement:

From the current progress, there are still some things to be completed

1. Write a springboot starter to facilitate the integration of springboot projects, which should include storage configuration and token configuration
2. Split the memory-card component (it feels okay not to split it)
3. Continue to improve api testing, I tried it some apis can not achieve the desired effect, such as the tags interface has problems
4. Develop new functions, some of the existing apis are still not finished, and some functions have not been realized
5. Update and improve documentation (it seems that the documentation has been updated recently, but there are still some things that have not been improved), it seems that there is no Chinese documentation

## Demo Day Video

YouTube link: <https://www.youtube.com/watch?v=ipRq3kT32wI>
{% include iframe.html src="https://www.youtube.com/watch?v=ipRq3kT32wI" %}

## Contact Us

- Project link: <https://github.com/cunkoulaocai/java-wechaty>
- Contact: +86 15806082601 | e: <1184016190@qq.com>

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/17/java-wechaty-transplant-midpoc/).
