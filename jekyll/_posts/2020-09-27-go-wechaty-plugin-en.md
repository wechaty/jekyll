---
title: "Summer 2020 [Design and Implement Plugin System for go-wechaty] Final Report"
author: finctive
categories: project
tags:
  - plugins
  - summer-of-wechaty
  - summer-2020
  - go
  - ecosystem
image: /assets/2020/09-go-wechaty-plugin-en/2020-09-27-go-wechaty-plugin.webp
excerpt: >
  Designing and implementing a plugin system for go-wechaty to enable easy extension and reusability
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/27/go-wechaty-plugin/).

---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community.
It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Promotion Plan - Summer 2020".
Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)
This project [Design and Implement Plugin System for go-wechaty] is an open source project supported by Summer 2020.

## [Design and Implement Plugin System for go-wechaty] Information

- Mentors: Ding Xiaoyu, Ding Chaofei, Li Bojie
- Student: Lin Haohan
- Project Name: Design and Implement Plugin System for go-wechaty

### Project Description

Wechaty is a multi-protocol WeChat access solution. With the establishment of a multi-language ecosystem in the community, it has attracted more developers and enthusiasts to join. At the same time, driven by demand and technological development, the plugin system has gradually improved. However, the plugin system in the multi-language system has not been completed yet. We hope that through this task, more people can join the construction of go-wechaty.

Currently, go-wechaty has a ding-dong bot in examples/ding-dong-bot.go, but we hope this ding-dong can be universal. If we can write the plugin system, implementing ding-dong may only require one line of code.
For example:

```go
bot.Use(DingDong{})
```

go-wechaty is a Go language implementation of the wechaty project, which also supports multi-protocol access. At the same time, leveraging the language features of goroutine and channel, it achieves more reasonable encapsulation and design.

### Timeline

Phase 1 (July 1 to August 15)

Write the plugin mechanism design document and communicate with mentors. The document includes design ideas, implementation logic, and project code changes. According to the characteristics of the Go language, improve the design of the plugin mechanism and try to think of more possible solutions. If necessary, corresponding experimental code should also be written.

Phase 2 (August 16 to September 30)

Write code according to the design document of the first phase to implement the plugin mechanism of go-wechaty; use the go-wechaty plugin mechanism to write a plugin demo, solve problems encountered in the use of the plugin mechanism, and go back to modify the design and implementation of the plugin mechanism.

## Project Summary

### Videos

Final Report

{% include iframe.html src="https://www.youtube.com/watch?v=Gku0nM0JOnE" %}

Live Coding

{% include iframe.html src="https://www.youtube.com/watch?v=I_3s2BrbnV0" %}

### Project Achievements

As of the end of the project, the following achievements have been made:

- Designed and implemented the plugin mechanism of go-wechaty. The plugin system has basic management functions and refers to the design characteristics of the Go language.

- Implemented a plugin demo based on the go-wechaty plugin mechanism, which verified the feasibility and ease of use of the plugin mechanism.

The core goals of the original project plan have all been completed.

#### go-wechaty Plugin Mechanism Design Document

Weekly progress report and discussion issue: [Design and implement plugin system for go-wechaty](https://github.com/wechaty/summer-of-code/issues/9#)

Related code repository: [go-wechaty Plugin branch PR](https://github.com/wechaty/go-wechaty/pull/67)

Added `wechaty.Plugin` structure type to store plugin-related callback functions. It supports all event registration functions in Wechaty (such as `OnMessage()`), and the usage is consistent with the Wechaty instance, making it easy to encapsulate Bot code into plugins.

Added `wechaty.Context` structure type for controlling and passing message events in one round. A new variable is passed in each time a new message event is received. At the same time, this structure implements the `context.Context` interface.

The following is a description of the functions of the go-wechaty plugin mechanism:

- Call order (priority)

Called in the order of registration. Among them, bot logic code and plugin logic code can have interleaved execution order. That is:

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

  - Disable and enable plugins.

    Corresponding method: `Plugin.SetEnable`

    Modify plugin property variables by locking. This method is concurrency safe.

  - Temporarily disable a plugin in this round of message events.

    Corresponding method: `Context.DisableOnce`

  - Message interception, skip the processing of subsequent plugins for this round of message events. At the same time, terminate all ongoing plugin code operations, i.e. goroutines generated by previous plugins.

    Corresponding methods: `Context.Abort` and `Context.Done`

  - In concurrent programs, control the termination of goroutines inside the plugin. The usage is the same as context.Context ([WithCancel()](https://golang.org/pkg/context/#WithCancel)) in the Go language.

    Corresponding methods: `Context.Abort` and `Context.Done`

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

- Data passing

Pass data through Context, data is only valid in this round of message events.

Concurrent read and write are not supported.

Corresponding methods: `Context.SetData`, `Context.GetData`

#### Example Plugin wordcounter Description

Related code repository: [Example plugin wordcounter](https://github.com/FINCTIVE/wordcounter)

This plugin runs on the above-designed go-wechaty plugin mechanism. The main purpose of developing this plugin is to verify the availability and ease of use of the plugin mechanism.

The function of the plugin is to count the number of words spoken by group members within a limited number of hours (only text messages are counted).

The usage of the plugin is as follows. The caller only needs to pass in the corresponding configuration information.

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

- How to participate in the open source community and contribute to it?

In the first two years of college, I had not participated in the development of large projects, let alone open source projects with high requirements. Remote collaborative development of open source projects is very attractive to me, but I have never had a suitable opportunity to participate (lack of skills, not knowing how to participate, etc. made me give up taking the first step many times). This Open Source Promotion Plan just provided this opportunity for me to participate in the Wechaty community for project development. The Wechaty community is a highly inclusive community, and the mentors in the community will patiently answer students' questions. This activity experience increased my experience in participating in open source software development and strengthened my communication skills. In the future development process, I will continue to contribute code to the open source community.

- During the development process, I often encountered unfamiliar technical problems and needed to learn new knowledge.

During the development of this project, the main problems I encountered came from unfamiliarity with Go program development, and I had doubts about many details. When actually testing the program, there were also some small problems to be solved, such as the use of Docker and troubleshooting. My solution was mainly to learn by myself and consult materials. This project development experience greatly improved my programming ability.

For some problems that I couldn't solve by myself, the mentors in the community gave me great help. After reading my code, the mentors gave many targeted suggestions, which were very necessary for me to complete the project development. Thank you for the efforts of the mentors.

- The project development time is long, and I often have the idea of procrastination and lack of motivation.

Thanks to the excellent management method of the Wechaty community, students participating in project development need to fill in weekly development reports on the corresponding Issue, and the reports need to summarize the work results of the week and formulate the development plan for the next week. Due to the pressure of weekly reports, my procrastination has been greatly reduced. This project development experience also taught me the importance of making plans.

## Mentor Review Results

- Project completion: *According to the original plan, the functional development of the original plan was completed*

- Student participation: *The part of the project participating in the activity was all completed by the student*

- Code contribution: *Plugin 100% completed by students, including an example Plugin, accounting for 10%-20% of the entire open source project.*

- Comprehensive evaluation and suggestions:

  - Student Haohan has a particularly strong learning ability and initiative, and can quickly get started with new knowledge and methods; from the initial inability to start with open source projects, to becoming familiar with the conventional way of sharing code, and mastering Go, we can all feel the progress and gains; I believe that such a short activity experience can become a talking point in your future work and life.

  - I believe that most people transitioning from school to work will waver on long-cycle projects. In fact, you just need to complete the established work according to the original plan. Breaking down large projects into small projects is a very important part of planning and execution; the report mentioned weekly planning, and I am very pleased that you see the value it brings to you. It keeps you from deviating from the direction of the original plan, and I also hope that you can benefit from this in your future work.

- Final review result: *Passed*

## Contact Us

- Project link: [wechaty/go-wechaty](https://github.com/wechaty/go-wechaty)
- Contact: finctive@foxmail.com

> Chinese version of this post: [go wechaty plugin]({{ '/2020/09/27/go-wechaty-plugin/' | relative_url }})
