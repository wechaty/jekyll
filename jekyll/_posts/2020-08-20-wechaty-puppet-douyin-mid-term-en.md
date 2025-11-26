---
title: 'Mid-term Report: Douyin Chatbot Based on Wechaty Interface Encapsulated by RPA'
author: wangjunwei
categories: project
image: /assets/2020/08-wechaty-puppet-douyin-mid-term-en/wechaty-puppet-douyin-logo.webp
tags:
  - douyin
  - summer-of-wechaty
  - summer-2020
  - ecosystem
excerpt: "This mid-term report presents progress on developing a Wechaty puppet for Douyin (TikTok) using RPA automation with AutoJS on Android, covering implementation challenges, solutions, and next steps."
---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community.

It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China.

Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.

Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)

This project [Douyin Chatbot Based on Wechaty Interface Encapsulated by RPA] is an open source project supported by Summer 2020.

## Mid-term Report: Douyin Chatbot Based on Wechaty Interface Encapsulated by RPA

## Project Information

- Project Name: Douyin Chatbot Based on Wechaty Interface Encapsulated by RPA
- Solution Description: Set up an Android virtual machine on the server, operate Douyin through AutoJS, similar to how Wechaty's puppeteer operates Chrome's web WeChat, and connect to Wechaty through socket
- Time Planning: July 19 - August 15 to complete various solution attempts and explorations, August 15 - September 15 to complete the integration of various puppet interfaces

## Project Progress

- Completed Work:
  - Familiarized with the usage and operation methods of Wechaty
  - Explored various solutions:
    - Douyin's private message sending OpenAPI requires users to be enterprise users, only enterprise Douyin account APIs are effective
    - Explored methods of using MonkeyDEV and IDA to reverse engineer the private message protocol
    - Could not find a method to run Android apps in Chrome, or the method has become invalid
    - Attempted to obtain Douyin's private message method through packet capture on Android and iOS, but could not capture private messages
    - AutoJS method to control Android apps, currently being adopted, and is the only working method at present. Currently completed the encapsulation of Douyin's basic operation methods and socket communication
  - Douyin's AutoJS control version has completed automatic login, message listening, sending messages and other methods
  - Ran a simple DingDongBot using socket and AutoJS methods, [video demonstration](https://youtu.be/TY4hn9TIWlA) (YouTube)
  - Puppet development in progress, initially taking shape
- Problems Encountered and Solutions:
  - Problems Encountered:
    - Douyin's app control IDs are named randomly, with three random letters and numbers. Control names vary across different versions
    - First-time Douyin login also requires image verification, which I haven't figured out a solution for yet. Can only verify manually. The second login can be automated
    - Message listening problem: messages can only be obtained when the message window is open. When multiple people send multiple messages, only one person can be read
    - ESLint syntax check often reports errors
  - Solutions:
    - Use a unified version of the Douyin app
    - Manually log in for the first time
    - When exiting the message window, continue to search for unread messages, and judge that there are n unread messages by the small circle with a number on the unread messages. Open the window of unread messages, traverse the message boxes on the screen, store the last n messages in an array, and pass them to the client
    - Follow the syntax format
- Follow-up Work Arrangement:
  - Continue to improve and encapsulate AutoJS code, beautify and standardize the code
  - Continue to develop puppet, migrate the existing socket client to puppet, and connect to Wechaty to complete a DingDongBot
  - Explore more functions of puppet and implement the underlying AutoJS

### PPT

{% include iframe.html src="https://www.youtube.com/embed/zDIPzGztn_E" %}

### Live coding

{% include iframe.html src="https://www.youtube.com/embed/OF7UfQ4o_5c" %}

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/20/wechaty-puppet-douyin-mid-term/).
