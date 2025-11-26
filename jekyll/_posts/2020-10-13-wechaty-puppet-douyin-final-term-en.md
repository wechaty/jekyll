---
title: ' "Douyin Chatbot based on RPA with Wechaty Interface - Final Report"'
author: wangjunwei
categories: project
image: /assets/2020/10-wechaty-puppet-douyin-final-term-en/wechaty-puppet-douyin-logo.webp
tags:
  - douyin
  - summer-of-wechaty
  - summer-2020
  - ecosystem
excerpt: >
  Final report for the Summer 2020 project building a Douyin (TikTok) chatbot using RPA with autojs on Android, connected via socket to a Wechaty puppet.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/10/13/wechaty-puppet-douyin-final-term/).

The "Open Source Software Supply Chain Lighting Program - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for university students jointly organized by the Institute of Software at the Chinese Academy of Sciences and the openEuler community.

It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.

Depending on the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Software Supply Chain Lighting Program - Summer 2020".

Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)

This project [Douyin Chatbot based on RPA with Wechaty Interface] is an open source project supported by Summer 2020.

## Final Report: Douyin Chatbot based on RPA with Wechaty Interface

## Project Information

- Project Name: Douyin Chatbot based on RPA with Wechaty Interface
- Solution Description: On the Android side, control Douyin through autojs, connect to the puppet via socket, and then connect to wechaty
- Timeline: July 19 - August 15 to complete various solution attempts and exploration, August 15 - September 15 to complete various interface integrations for the puppet

## Project Progress

- Project Achievements:
  - Became familiar with the usage and operation methods of wechaty
  - Explored various solutions:
    - Douyin's private message sending openapi requires users to be enterprise users; the api is only effective for enterprise Douyin accounts
    - Explored MonkeyDEV and IDA reverse engineering methods for private message protocols
    - Couldn't find a method to run Android apps in Chrome, or the methods were ineffective
    - Tried to obtain Douyin's private message method by packet capturing on Android and iOS, but couldn't capture private messages
    - The autojs method of controlling Android apps is currently being adopted and is the only currently operational method; the encapsulation of basic Douyin operation methods and socket communication has been completed
  - The autojs-controlled version of Douyin has completed automatic login, message listening, message sending and other methods
  - Ran a simple dingdongbot using socket and autojs methods, [video demonstration](https://youtu.be/TY4hn9TIWlA) (YouTube)
  - Completed the first version of the Douyin puppet and the autojs method for operating Douyin
  - The puppet completed the basic communication functions and can run dingdongbot
  - Wechaty puppet combined with autojs can implement automatic message replies
- Problems Encountered and Solutions:
  - Encountered many problems with this code; had little exposure to TypeScript coding and many unfamiliar areas
  - Initially tried many solutions for choosing the private message method, and ultimately chose autojs as the tool for operating Douyin private messages, but it's not very stable and has low performance requiring certain hardware support
  - Autojs is sometimes very unstable, debugging is abnormally troublesome, can only progress bit by bit; app control names are very random, different Douyin versions have different control names, so the app needs a unified version
  - Running a Douyin puppet requires an Android phone or computer running an emulator with autojs, then using nodejs to run wechaty and puppet, need to run two services, which is a bit troublesome
  - When exploring how to get Douyin image messages, there are certain problems with finding images through auto, the running speed is slow, first open the image then cache it then load the image to transcode it into base64 and then send it to the puppet
  - ESLint syntax formatting was unfamiliar at the beginning and often reported various errors
  - Unfamiliar with puppet interfaces and methods, wrote a Douyin puppet by imitation, and finally it can run dingdongbot
  - When messages are frequent, message accumulation may occur; autojs needs time to process messages; when autojs enters a certain session and this session sends a message, that message may not be read, but messages outside this session can be read and replied to
  - The Douyin puppet needs many improvements and new message types and functions to be added...
  - Due to the 996 work schedule during my internship, there was too little progress in the later stages; need to work harder to contribute to the community

### PPT

{% include iframe.html src="https://www.youtube.com/embed/zDIPzGztn_E" %}

### Live coding

{% include iframe.html src="https://www.youtube.com/embed/OF7UfQ4o_5c" %}

### Project Links

- Project links: [https://github.com/gavinwang23/douyin-autojs](https://github.com/gavinwang23/douyin-autojs) / [https://github.com/gavinwang23/wechaty-puppet-douyin](https://github.com/gavinwang23/wechaty-puppet-douyin)

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/10/13/wechaty-puppet-douyin-final-term/).
