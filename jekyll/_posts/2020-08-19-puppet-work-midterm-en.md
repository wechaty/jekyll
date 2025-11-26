---
title: 'Summer 2020: POC Showcase for WeCom Chatbot Based on Wechaty Interface with Open API'
author: sapio-s
categories: project
image: /assets/2020/08-puppet-work-midterm-en/pic2.webp
tags:
  - summer-2020
  - summer-of-wechaty
  - puppet-provider
  - wecom
  - ecosystem
excerpt: "This post showcases the mid-term progress of developing a Wechaty puppet for WeChat Work (WeCom) platform, allowing developers to switch to WeCom functionality by simply changing a variable."
---

This project plans to develop a puppet for the WeChat Work (WeCom) platform, allowing Wechaty developers to switch to using WeCom functionality by simply changing a variable.

## Summer 2020 [WeCom Chatbot Based on Wechaty Interface with Open API] POC Showcase

## Summer 2020

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China. Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: <https://isrc.iscas.ac.cn/summer2020> Official news: <http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html>
This project [WeCom Chatbot Based on Wechaty Interface with Open API] is an open source project supported by Summer 2020.

## [WeCom Chatbot Based on Wechaty Interface with Open API] Information

- Mentor: Yuan Gao (高原)
- Student: Yuqing Xie (谢昱清)
- Project name: WeCom Chatbot Based on Wechaty Interface with Open API
- Description:
- Time planning:
  - Preparation work
    - 2020.7.1 - 2020.7.19
      - Master related technology stacks (typescript, etc.), understand puppet structure.
      - Establish connection with WeCom, complete the information path from node.js to WeCom
    - 2020.7.20 - 2020.8.5
      - Including encryption and decryption of conversations, related environment configuration, interaction between node.js and WeChat SDK. Complete a demo of node.js pulling WeCom messages.
      - Note: Originally planned to be completed on 2020.7.26, but due to a misunderstanding of the expected results, the progress direction deviated, and it was postponed for one week.
      - Implement message interfaces of various types on puppet
    - 2020.8.6 - 2020.8.30
      - Officially develop puppet. Complete status functions, message reading and message storage. It may be necessary to expand the data structure of the original puppet. The first week completes the logic design and basic message pull.
      - Note: WeCom puppet is only responsible for pulling messages, and does not need to complete the complete interaction process, so it may be necessary to design a corresponding bot separately for testing.
      - Periodically read messages and trigger message events after reading messages
    - 2020.8.31 - 2020.9.13
      - Complete all required functions of WeCom puppet and perform finishing work.
      - Usage documentation for WeCom session archive puppet
    - 2020.9.14 - 2020.9.20
      - Add WeCom puppet-related content to the original documentation.

## Project Progress

- Work completed:
  - Used the API interface provided by WeCom to complete message encryption and decryption and cross-language information transmission;
  - Completed the encapsulation of basic message types (text, markdown and other text information);
  - Simply configured parameters and internal logic, which can be pulled regularly to form the effect of "instant communication";
  - Completed the demo of basic functions.

- Problems encountered and solutions:
  - The project requirements were unclear, and there was a lack of effective communication with the mentor in the early stage, which led to one or two weeks of progress that had nothing to do with the target direction and became useless. In the later stage, we should actively communicate with the mentor to solve the doubtful problems as soon as possible to avoid similar situations.
  - Using a brand new technology stack, in addition to spending a lot of time getting started, there were a lot of problems in configuring the environment, some of which could not even be searched for solutions on the Internet. For example, several rare installation bugs encountered when installing node-ffi:
    - There is no binding.cc file during compilation, and you need to create an empty file yourself;
    - Node and npm need to be downgraded, otherwise ffi/ref cannot be successfully installed and compiled;
    - If you compile ffi's example (factorial.c) with C++, you need to change the macro structure, otherwise it will report "Error: Dynamic Symbol Retrieval Error: Win32 error 127".

- Follow-up work arrangement:
  At present, the project structure and project requirements are relatively clear, and the development progress can be accelerated. Due to some misunderstandings about the project requirements when writing the time plan, the later work arrangements have been adjusted.
  - 8.17-8.23
    - Introduce manager to decouple puppet's internal functions;
    - Complete the function encapsulation of WeCom's "Get media files";
    - Improve the data storage method, which may introduce caching.
  - 8.24-8.30
    - Complete the encapsulation of media message formats such as pictures, voice, and video in WeCom.
  - 8.31-9.06
    - Complete the encapsulation of all formats in the WeCom "All message formats" list; (Since there are more types than those defined by wechaty, it may be necessary to modify the storage format of some messages)
    - Complete the acquisition of messages such as WeCom "external contacts" as appropriate. (Should not be directly pulled)
  - 9.07-9.13
    - Complete the processing of the remaining functions in puppet;
    - Complete the encapsulation of WeCom's "Get session consent status", "Enable member list" and other functions as appropriate.
  - 9.14-9.20
    - Package and publish npm package, write usage documentation.
  - 9.21-9.27
    - Improve project functions and write final report.

## Contact us

- Project link: <https://github.com/Sapio-S/wechaty-puppet-official/>
- Contact: 1205402283@mail.qq.com

> Author: [@Sapio-S](https://github.com/Sapio-S) Learning & practicing.
> Code: [@code](https://github.com/Sapio-S/wechaty-puppet-official)

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/19/puppet-work-midterm/).
