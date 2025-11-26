---
title: "Summer 2020 [Write a \"Word of the Day\" Plugin] Project Plan"
author: univerone
categories: project
tags:
  - plugins
  - summer-of-wechaty
  - summer-2020
  - entertainment
image: /assets/2020/07-wechaty-words-per-day-plugin-plan-en/header.webp
excerpt: "This post outlines the project plan for creating a \"Word of the Day\" plugin for Wechaty as part of the Summer 2020 open-source program. The plan covers the basic framework, NPM package publication, corpus enrichment, and testing."
---

> This post is also available in [Chinese (Simplified)](/2020/07/18/wechaty-words-per-day-plugin-plan/).

"Open Source Software Supply Chain Lighting Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community.
It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China.
According to the difficulty and completion of the project, participants can also get bonuses and trophies for the "Open Source Software Supply Chain Lighting Plan - Summer 2020" event.

Official website: <https://isrc.iscas.ac.cn/summer2020>

Official news: <http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html>

This project [Write a "Word of the Day" plugin] is an open source project supported by Summer 2020.

## Specific plan for writing a "Word of the Day" plugin

- Mentor: gcaufy
- Student: univerone
- Module list
  - [x] Develop the basic framework of the plugin
  - [ ] Publish NPM package, introduce CI/CD
  - [ ] Enrich the corpus
  - [ ] Conduct tests and improve project documentation
  - [ ] Recommend the content of the daily sentence according to the group name (optional)
- Schedule:
  - Develop the basic framework of the plugin
    - 7/1 - 7/21
    - The input parameters of the plugin are: the name of the built-in API interface used, the name of the applied group chat, and the time to publish the daily sentence content, and complete the basic code construction. The plugin can set the scheduled sending time, group name, and sending content. It can also download pictures according to the picture address in the request structure, and add watermarks according to the daily sentence content and WeChat group related information.
    - Basic steps
  - Publish NPM package, introduce CI/CD
    - 7/22 - 8/05
    - Further optimize the code and comments, and introduce CI/CD for code quality control and package version management
    - None
  - Enrich the corpus
    - 8/06 - 8/20
    - First determine the API interface to be used or the URL to be crawled, and perform different parsing according to different URLs to return the specified results. Construct the request and parse the content, and return the required string (the content of the daily sentence or the URL of the picture). If there is spare capacity, it can support users to set the source of the corpus independently.
    - None
  - Conduct tests and improve project documentation
    - 8/20 - 9/03
    - Improve the project documentation and write a summary article of the entire project process. Add unit tests, etc.
    - None
- Project link: [https://github.com/univerone/WordsPerDay](https://github.com/univerone/WordsPerDay)
- Contact: univerone@outlook.com

> Author: [univerone](https://github.com/univerone/)
> Code: [Github](https://github.com/univerone/WordsPerDay)
