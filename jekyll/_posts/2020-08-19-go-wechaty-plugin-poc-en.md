---
title: 'Summer 2020: POC Showcase for Designing and Implementing a Plugin System for go-wechaty'
author: finctive
categories: project
tags:
  - plugins
  - summer-of-wechaty
  - summer-2020
  - go
  - ecosystem
image: /assets/2020/08-go-wechaty-plugin-poc-en/2020-08-19-go-wechaty.webp
excerpt: "This post showcases the proof-of-concept for a plugin system for go-wechaty, a project from the Summer 2020 Open Source Promotion Plan. It details the design, implementation, and future plans for the plugin architecture."
---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China. Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)
This project [Design and implement a plug-in system for go-wechaty] is an open source project supported by Summer 2020.

## [Design and implement a plug-in system for go-wechaty] Information

- Mentors: Xiaoyu Ding (丁小雨), Chaofei Ding (丁超飞), Bojie Li (李博杰)
- Student: Haohan Lin (林昊翰)
- Project name: Design and implement a plug-in system for go-wechaty

### Description

wechaty is a WeChat access solution that supports multiple protocols. With the establishment of a multi-language ecosystem in the community, it has attracted more developers and enthusiasts to join; at the same time, driven by demand and technological development, the plug-in system has gradually improved, but in a multi-language system, the Plugin system has not yet been completed. We hope that through this task, more people can join the construction of go-wechaty.

At present, go-wechaty examples/ding-dong-bot.go has a ding-dong bot, but we hope that this ding-dong is universal. If our Plugin system can be written, maybe implementing ding-dong will only require one line of code.
For example:

```go
bot.Use(DingDong{})
```

go-wechaty is a project that implements wechaty in Go language, and also supports multi-protocol access; at the same time, with the help of the language features of goroutine and channel, it has achieved a more reasonable encapsulation and design.

### Time planning

Phase 1 (until August 15)

Write a plug-in mechanism design document. Among them, the document contains design ideas, implementation logic, and project changes involved. According to the characteristics of the Go language, the design of the plug-in mechanism is improved, and more possible solutions are tried to be considered. If necessary, corresponding experimental code should also be written.

Phase 2 (until September 30)

Write code according to the design document of the first stage to realize the plug-in mechanism of go-wechaty; use the go-wechaty plug-in mechanism to write a plug-in Demo.

## Project progress

Weekly development progress report: [Design and implement a plug-in system for go-wechaty · Issue #9 · wechaty/summer-of-code](https://github.com/wechaty/summer-of-code/issues/9)

In the weekly progress report, you can see the **detailed process and progress** of my project development.

Project-related code repositories:

- Plug-in mechanism development branch [FINCTIVE/go-wechaty](https://github.com/FINCTIVE/go-wechaty/tree/plugin)
- Plug-in example code repository [FINCTIVE/wechaty-demo-plugin](https://github.com/FINCTIVE/wechaty-demo-plugin)

### Work completed

- At present, the preliminary design of the go-wechaty plug-in mechanism has been carried out, and [related documents](https://github.com/wechaty/summer-of-code/issues/9#issuecomment-673422731) have been written. The current plug-in design still needs to be continuously improved and iterated.
- It was originally planned to start writing code in the second stage, but in order to express clearly and test feasibility, I have already written and implemented the code of the existing design.

According to the original plan and time plan, I think I have some aspects that are not complete enough, and some aspects that are ahead of schedule; overall, it is qualified.

### Problems encountered and solutions

- The first problem encountered in participating in the open source software supply chain lighting plan is: how to participate in the open source community and contribute to the open source community?

This is a "from 0 to 1" problem. I have not participated in the development of large projects in the first two years of college, let alone open source projects with higher requirements. The remote collaborative development of open source projects is very attractive to me, but I have never had a suitable opportunity to participate in it (insufficient level, not knowing how to participate, etc. have made me give up taking the first step many times). This open source software supply chain lighting plan just provided this opportunity for me to participate in the project development in the Wechaty community. The Wechaty community is a very inclusive community, and the mentors in the community will patiently answer the questions raised by the students. The experience of this event has increased my experience in developing open source software, and at the same time strengthened my communication and communication skills. In my future development process, I will continue to contribute code to the open source community.

- In the development process, Go program design is a certain degree of difficulty for me.

My solution is mainly to learn and consult materials by myself. For some problems, the mentors in the community have given me a lot of help.

### Follow-up work arrangement

Continue to develop and iterate according to the original plan.

## Mentor review results

- Project completion: Most of the coding work has been completed, and I look forward to merging into the main branch and finishing the work.
- Student participation: Completed 90% of the design work and 100% of the coding work; able to actively participate in related tasks.
- Code contribution: Under the guidance of the mentor, independently completed the design and coding of the multi-language project Go-Wechaty Plugin.
- Comprehensive evaluation and suggestions:
  - Evaluation: Haohan has a clear plan during the project, and the weekly progress report has corresponding results and progress; the initial design document was prepared in the early stage, and the relevant code was implemented according to the document; the shortcomings and deviations of the early design were found in the implementation, and he was able to complete the optimization through communication and learning with the mentor.
  - Suggestion: The community is very inclusive and free. You can submit code requests to the main branch at will. As long as it can reach a certain degree of completeness, it will be merged into the main branch. If it is not reached, you can also get help from other contributors; there is still some work to be merged into the main branch, and I look forward to your results.
- Final review result: Pass

## Contact us

- Project link: [wechaty/go-wechaty](https://github.com/wechaty/go-wechaty)
- Contact: finctive@foxmail.com

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/19/go-wechaty-plugin-poc/).
