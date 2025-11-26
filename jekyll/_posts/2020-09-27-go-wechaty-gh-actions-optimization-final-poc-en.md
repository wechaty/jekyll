---
title: "Summer 2020 [Go-wechaty Github Action optimization] Final POC"
author: nebell
categories: project
tags:
  - summer-of-wechaty
  - summer-2020
  - go
  - devops
image: /assets/2020/09-go-wechaty-gh-actions-optimization-final-poc-en/header.webp
excerpt: >
  Using Github Actions to optimize Go-wechaty related projects and improve user and developer experience
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/27/go-wechaty-gh-actions-optimization-final-poc/).

---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community.
It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Promotion Plan - Summer 2020".

Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020)

Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)

This project [Go-wechaty Github Action optimization] is an open source project supported by Summer 2020.

## Project Information

- Project Name: Go-wechaty Github Action optimization

- Project Description: Use Github Actions related features to optimize Go-wechaty related projects and improve the user and development experience.

- Timeline:
  - July 1 to July 7: Read the documentation and source code of Go-wechaty and its plugins, conduct local manual compilation tests and compilation tests through Github Action continuous integration scripts.
  - July 7 to July 14: Write Github Action scripts to update go-wechaty-getting-started dependencies and implement ding-dong compilation tests on Windows platform.
  - July 14 to July 21: Explore other Github Action use cases and research optimization solutions for existing wechaty continuous integration solutions.
  - August 1 to September 5: Improve Dockerfile and trigger conditions for Dispatch.

## Project Summary

- Project Achievements:
  - Automatically update go-wechaty-getting-started dependencies to the latest version
    - Use [Repository Dispatch](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#repository_dispatch) to trigger Actions across repositories
      - Submit Pull-Request to go-wechaty-getting-started after update when conditions are met
  - Completed ding-dong compilation test on Windows platform
  - Completed ding-dong docker and pushed to Github Packages
    - Use multi-stage build to reduce image size
    - Tested buildx

- Problems Encountered and Solutions:
  - While learning Docker, I tried to use buildx to build multiple platforms at once, but since Github Packages does not support multi-platform images, I switched to testing ghcr which went online in September.
  - When testing go-wechaty, my understanding of trigger conditions was not deep enough. I personally thought it was logical to put sending dispatch as a step after compilation testing, and only used the `if:Contains()` statement to roughly determine whether it was a `Pull-Request` event to skip. After the mentor's reminder, I realized that this was easy to cause confusion. I would like to thank Teacher Ding for the reminder.
  - After the core goal of Github Actions optimization was achieved, optimization based on existing projects lost direction. Under the reminder of my mentor Teacher Ding, I turned to optimization of Dockerfile, learned relevant content, and multi-stage construction also reduced the image size and optimized the hands-on experience. Thanks again for the teacher's guidance.

### Video Report

{% include iframe.html src="//player.bilibili.com/player.html?aid=244737639&bvid=BV1cv411y7jY&cid=239638372&page=1" %}

## Mentor Review

### Review Subject

- Review Content: *Final Report*
- Submitted by: *Tang Guangbin*

### Review Results

- Project Completion: *Completed the originally planned cross-project trigger CI and Docker image compilation work.*
- Student Participation: *Cross-project triggers were fully completed by the student. The Docker compilation part was improved by the student with a new solution. Dockerfile was optimized under guidance.*
- Code Contribution: *The CI/CD part of the new solution was fully completed by the student. The code volume involves 5%-10% of the open source project, but heroes should not be judged by code volume alone. CI/CD has positive significance for the entire open source project.*
- Overall Evaluation and Suggestions:
  - Student Guangbin is able to actively expand his knowledge areas that he has not yet mastered, and can even actively explore new technical solutions in certain directions. This is a very important skill in work. I hope you can continue to expand your knowledge areas and be able to solve more unknown problems.
  - I believe you have enough enthusiasm to solve technical issues, just as you mentioned in your summary that you are aware of the room for improvement in your technical skills. However, on the other hand, I hope you can gain more in open source, which can enable you to promote more improvements in project collaboration in your future work.
- Final Review Result: *Passed*

---

> Chinese version of this post: [go wechaty gh actions optimization final poc]({{ '/2020/09/27/go-wechaty-gh-actions-optimization-final-poc/' | relative_url }})

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/27/go-wechaty-gh-actions-optimization-final-poc/).
