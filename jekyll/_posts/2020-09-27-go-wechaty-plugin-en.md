---
title: "Summer 2020 Final Report: Designing and Implementing Plugin System for go-wechaty"
author: finctive
categories: project
tags:
  - plugins
  - summer-of-wechaty
  - summer-2020
  - go
  - ecosystem
image: /assets/2020/09-soc-go-plugin/2020-09-27-go-wechaty-plugin.webp
excerpt: >
  Final report for designing and implementing a comprehensive plugin system for go-wechaty, including plugin management features, context handling, and a demo plugin to demonstrate the system's usability.
---

The "Open Source Software Supply Chain Lighting Program - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community. It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.

According to the difficulty of the project and the completion status, participants can also receive activity bonuses and trophies from the "Open Source Software Supply Chain Lighting Program - Summer 2020".

Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020)

Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)

This project [Designing and Implementing Plugin System for go-wechaty] is an open source project supported by Summer 2020.

## Project Information: [Designing and Implementing Plugin System for go-wechaty]

- Mentors: Xiaoyu Ding (丁小雨), Chaofei Ding (丁超飞), Bojie Li (李博杰)
- Student: Haohan Lin (林昊翰)
- Project Name: Designing and Implementing Plugin System for go-wechaty

### Project Description

Wechaty is a multi-protocol WeChat access solution. With the establishment of a multi-language ecosystem in the community, it has attracted more developers and enthusiasts. As requirements grow and technology develops, the plugin system has gradually improved. However, the Plugin system in multi-language implementations is not yet complete. We hope that through this task, more people will join the development of go-wechaty.

Currently, go-wechaty has a ding-dong bot in examples/ding-dong-bot.go, but we hope this ding-dong functionality can be universal. If we can build a proper Plugin system, implementing ding-dong might only require one line of code.

For example:

```go
bot.Use(DingDong{})
```

go-wechaty is a Go language implementation of Wechaty, which also supports multi-protocol access. By leveraging Go's language features such as goroutines and channels, it achieves more reasonable encapsulation and design.

### Timeline

Phase 1 (July 1 - August 15)

Write plugin mechanism design documentation and communicate with mentors. The documentation includes design concepts, implementation logic, and project code changes. Improve the plugin mechanism design based on Go language features, and explore more possible solutions. Write experimental code if necessary.

Phase 2 (August 16 - September 30)

Write code according to the design documentation from Phase 1 to implement the go-wechaty plugin mechanism. Write a plugin demo using the go-wechaty plugin mechanism, solve problems encountered during plugin usage, and revise the plugin mechanism design and implementation accordingly.

## Project Summary

### Videos

Final Report

{% include iframe.html src="https://www.youtube.com/watch?v=Gku0nM0JOnE" %}

Live Coding

{% include iframe.html src="https://www.youtube.com/watch?v=I_3s2BrbnV0" %}

### Project Results

By the end of the project, the following achievements were made:

- Designed and implemented the plugin mechanism for go-wechaty. This plugin system has basic management functions and references Go language design features.

- Implemented a plugin demo based on the go-wechaty plugin mechanism, verifying the feasibility and usability of the plugin mechanism.

All core objectives of the original plan have been completed.

#### go-wechaty Plugin Mechanism Design Documentation

Weekly progress reports and discussion issue: [Designing and Implementing Plugin System for go-wechaty](https://github.com/wechaty/summer-of-code/issues/9#)

Related code repository: [go-wechaty Plugin branch PR](https://github.com/wechaty/go-wechaty/pull/67)

Added `wechaty.Plugin` structure type to store plugin callback functions. It supports all event registration functions in Wechaty (such as `OnMessage()`), and its usage is consistent with Wechaty instances, making it easy to encapsulate Bot code into plugins.

Added `wechaty.Context` structure type for controlling and passing information during a message event round. A new variable is passed in each time a new message event is received. This structure also implements the `context.Context` interface.

The following describes the features of the go-wechaty plugin mechanism:

- Call Order (Priority)

Called in registration order. Bot logic code and plugin logic code can have interleaved execution order. For example:

```go
var bot = wechaty.NewWechaty()
bot.OnMessage(func(context *wechaty.Context, message *user.Message) {
    // Part A
})
bot.Use(pluginB).Use(pluginC)
bot.OnMessage(func(context *wechaty.Context, message *user.Message) {
    // Part D
}
```

Execution order: Part A → pluginB → pluginC → Part D

- Switches

  - Disable/Enable plugins.

    Corresponding method: `Plugin.SetEnable`

    Modifies plugin property variables through locking. This method is concurrency-safe.

  - Temporarily disable a specific plugin in the current message event round.

    Corresponding method: `Context.DisableOnce`

  - Message interception, skip subsequent plugin processing for the current message event. Also terminates all ongoing plugin code operations, i.e., goroutines spawned by previous plugins.

    Corresponding method: `Context.Abort` and `Context.Done`

  - Control the termination of internal goroutines in plugins within concurrent programs. Usage is the same as context.Context ([WithCancel()](https://golang.org/pkg/context/#WithCancel)) in the Go language.

    Corresponding method: `Context.Abort` and `Context.Done`

    Example:

    ```go
    plugin := NewPlugin()
    plugin.OnMessage(func(context *wechaty.Context, message *user.Message) {
        go func(ctx context.Context) {
            // other code ...
            select {
            case <-ctx.Done():
                // terminated by wechaty.Context.Abort()

           // other code ...

           }
        }(context)
    })

    // other code ...

    // context.Abort() will terminate the goroutine
    ```

- Data Passing

Data is passed through Context and is only valid for the current message event round.

Does not support concurrent read/write.

Corresponding methods: `Context.SetData`, `Context.GetData`

#### Example Plugin: wordcounter

Related code repository: [Example plugin wordcounter](https://github.com/FINCTIVE/wordcounter)

This plugin runs on the go-wechaty plugin mechanism designed above. The main purpose of developing this plugin is to verify the availability and usability of the plugin mechanism.

The plugin's function is to count the number of words spoken by group members within a specified number of hours (only counting text messages).

The plugin is used as follows - the caller only needs to pass in the corresponding configuration information:

```go
import "github.com/FINCTIVE/wordcounter"

func main() {
    var bot = wechaty.NewWechaty()
    bot.Use(wordcounter.New(wordcounter.Config{
            SearchKeyword:  "#排名",
            MaxResultCount: 10,
            Hours:          6,
        }))
    }
    // starting bot ...
}
```

### Problems Encountered and Solutions

- How to participate in open source communities and contribute to them?

In my first two years of college, I had not participated in the development of large projects, let alone high-requirement open source projects. Remote collaborative development of open source projects was very attractive to me, but I never had a suitable opportunity to participate (due to insufficient skills, not knowing how to participate, etc., which made me give up taking the first step many times). This Open Source Software Supply Chain Lighting Program provided this opportunity, allowing me to participate in the Wechaty community for project development. The Wechaty community is a highly inclusive community, and the mentors in the community patiently answer students' questions. This experience has increased my experience in participating in open source software development and also enhanced my communication skills. In future development, I will continue to contribute code to the open source community.

- During the development process, I often encountered unfamiliar technical problems that required learning new knowledge.

During the development of this project, the main problems I encountered came from unfamiliarity with Go programming. I had doubts about many details. When actually testing the program, there were also some minor issues to solve, such as using Docker and troubleshooting. My solution was mainly self-learning and consulting documentation. This project development experience greatly improved my programming ability.

For some problems I couldn't solve on my own, the mentors in the community gave me great help. After reviewing my code, the mentors provided many targeted suggestions, which were essential for me to complete the project. Thank you for the mentors' dedication.

- The project development time was long, and I often had thoughts of procrastination and lacked motivation.

Thanks to the excellent management approach of the Wechaty community, students participating in project development need to fill in weekly development reports in the corresponding Issue, summarizing weekly work results and formulating next week's development plan. Due to the pressure of weekly reporting, my procrastination was greatly reduced. This project development experience also taught me the importance of making plans.

## Mentor Review Results

- Project Completion: *According to the original plan, all planned functions were completed*

- Student Participation: *The project participation part of the activity was entirely completed by the student*

- Code Contribution: *Plugin 100% completed by the student, including an example Plugin, accounting for 10%-20% of the entire open source project.*

- Comprehensive Evaluation and Suggestions:

  - Haohan has particularly strong learning ability and initiative. He was able to quickly get started with new knowledge and methods. From initially not knowing how to approach open source projects, to becoming familiar with common ways of sharing code, and mastering Go, we can feel the progress and gains. I believe this brief activity experience can become a talking point in your future work and life.

  - I believe most people transitioning from school to work will waver on long-term projects. Actually, you just need to complete the established work according to the original plan. Breaking down large projects into small projects is a very important part of planning and execution. The report mentioned weekly planning, and I'm glad you saw the value it brought you. It kept you from deviating from the original plan, and I hope you can gain from this in your future work.

- Final Review Result: *Passed*

## Contact Us

- Project Link: [wechaty/go-wechaty](https://github.com/wechaty/go-wechaty)
- Contact: finctive@foxmail.com

---

> 本文也有[中文版本](/2020/09/27/go-wechaty-plugin/)。
