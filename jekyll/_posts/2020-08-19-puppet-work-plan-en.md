---
title: 'Summer 2020: Project Plan for WeCom Chatbot Based on Wechaty Interface with Open API'
author: sapio-s
categories: project
image: /assets/2020/08-puppet-work-plan-en/pic.webp
tags:
  - summer-of-wechaty
  - summer-2020
  - wecom
  - ecosystem
excerpt: "This post outlines the project plan for developing a Wechaty puppet for WeChat Work (WeCom) platform, allowing developers to switch to using WeCom functionality by simply changing a variable."
---

This project plans to develop a puppet for the WeChat Work (WeCom) platform, allowing Wechaty developers to switch to using WeCom functionality by simply changing a variable.

## Summer 2020 Project Plan for WeCom Chatbot Based on Wechaty Interface with Open API

## Summer 2020

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China. Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: <https://isrc.iscas.ac.cn/summer2020> Official news: <http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html>
This project [WeCom Chatbot Based on Wechaty Interface with Open API] is an open source project supported by Summer 2020.

## [WeCom Chatbot Based on Wechaty Interface with Open API] Detailed Plan

- Mentor: Yuan Gao (高原)
- Student: Yuqing Xie (谢昱清)
- Module list
  - Design configuration parameters
  - Access WeCom session archive interface to read messages
    - Implement message interfaces of various types on puppet
    - Periodically read messages and trigger message events after reading messages
    - Usage documentation for WeCom session archive puppet
- Plan arrangement:
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
- Project link: <https://github.com/Sapio-S/wechaty-puppet-official/>
- Contact: 1205402283@mail.qq.com

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/19/puppet-work-plan/).
