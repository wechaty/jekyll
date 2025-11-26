---
title: "OSPP 2021 - Final Report - Developing WeChat Mini Program for Club Member & Activity Management Based on Wechaty"
author: mangguo188
categories:
  - project
  - ospp
image: /assets/2021/09-final-term-club-managment-en/wechaty.webp
tags:
  - summer-of-wechaty
  - summer-2021
  - ecosystem
  - ospp
  - ospp-2021
  - final-term
excerpt: >
  Final report for the OSPP 2021 project developing a WeChat mini program for club member and activity management based on Wechaty, featuring registration services, member management, and activity organization.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/09/29/final-term-club-managment/).

## Summer 2021

The "Summer 2021 of Open Source Promotion Plan" (hereinafter referred to as Summer 2021) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community.
It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty of the project and completion status, participants can also receive awards and trophies from the "Summer 2021 of Open Source Promotion Plan".
Official website: [https://summer.iscas.ac.cn/](https://summer.iscas.ac.cn/)

This project [Developing WeChat Mini Program for Club Member & Activity Management Based on Wechaty] is an open source project supported by Summer 2021.

## Project Information

- Mentor: Lu Yuchao

- Student: Chen Jing

- Project Introduction: <https://github.com/wechaty/summer/issues/78>

- Project Name: Developing WeChat Mini Program for Club Member & Activity Management Based on WeChat  

- Solution Description: This project requires developing a mini program based on Wechaty for member and activity management. The core content of the mini program is registration service. The WeChat bot serves as one of the services to receive information and respond to database operations. This program aims to provide users with more convenient and efficient functions for managing members and activities.

- Timeline:
  - Phase 1
    - Completion Time: July 20
    - Plan Description: Introduce chatbot, organize basic usage/development production environment/user agreement, bind user data to club, implement "keyword reply" function using WeChat Open Platform.
  - Phase 2
    - Completion Time: August 15
    - Plan Description: Implement "group owner publishes activities" function, implement "group owner manages activities" function, implement "member tags activities" function, refine and debug the above function blocks.
  - Phase 3
    - Completion Time: September 5
    - Plan Description: Implement "activity album" function, "help" function (associate keywords with operations, requiring improved fault tolerance), if time permits, design custom functions.
  - Phase 4
    - Completion Time: September 30
    - Plan Description: Implement self-defined functions, collect problems that arise, optimize and upgrade overall program functions (user data processing).

## Project Summary

- Project Results

Project Repository: <https://github.com/mangguo188/wechaty-club-management>  

- Problems Encountered and Solutions:
  - After launching the mini program, only the authorization page appears, with no proper display after authorization.
    - Solution: This project requires the mini program and bot to log in together. The interface will only display correctly when the bot owner logs into the mini program. Find the message published by the bot owner in the cloud development log and assign their wxid to the mini program user (the original wxid of the mini program user was a system-generated number, only ensuring wxid uniqueness but meaningless).
  - Errors frequently occur during cloud function development, but error detection requires submission and execution, which has a long time cycle and limited submission times. Need to explore better methods for error detection.
    - Solution: Based on the teacher's suggestion, I first simulated backend returns in the bot, wrote functions in the bot service to verify function correctness. Only after all functions run without errors do I modify the corresponding functions in the backend. This greatly reduced the number of cloud function uploads and reduced computer load.
  - This project can only respond to text messages, unable to extract effective information from hyperlinks, images, videos, etc.
    - Solution: Temporarily build framework for responding to hyperlinks, images, and videos. Follow-up functions can be continuously developed when time permits.
  - After completion, the cloud development part and front-end part of the mini program are in the same folder as the bot, making it unclear which is which. Plus every folder has an index.js file, making it easy to modify incorrectly.
    - Solution: Encapsulate the mini program in the mp folder and the bot in the wechatbot folder, so the two functions can be used separately and are easy to connect (note that since the mini program cloud functions are encapsulated in the mp folder, when viewing from WeChat Developer Tools, only open the mp folder, otherwise deployment problems will occur).

- Project Outlook:
  - This project only completes basic function development. Currently users entering the mini program can view group activities and member IDs at any time, including convenient statistical data such as registration records. But the basic framework has been completed. With more time, more functional modules can be added, including how to break the 1-to-1 relationship between group bot and mini program, making it easier for more mini program users to simply access activity management functions, etc.

## Project Demonstration

### Live Coding Video

{% include iframe.html src="https://youtu.be/5LZ08re5YR8" %}

> Domestic link: <https://www.bilibili.com/video/BV1hR4y1n7AH/>

### PPT Presentation Video

{% include iframe.html src="https://youtu.be/eSgaD32njVw" %}

> Domestic link: <https://www.bilibili.com/video/BV1uP4y187T9/>

### Project PPT

{% include iframe.html src="/assets/2021/09-final-term-club-managment-en/final-term.pdf" %}

## Contact Us

- Project Link: <https://github.com/mangguo188/wechaty-club-management>  
- Contact: 1017137803@qq.com

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/09/29/final-term-club-managment/).
