---
title: "This Summer: Stories of Wechaty Community and 9 Rising Open Source Contributors"
author: huan
categories: announcement
tags:
  - news
  - summer-2020
  - summer-of-wechaty
  - featured
image: /assets/2020/12-summer-2020-student-developers-en/award.webp
excerpt: "Nine undergraduate and graduate students became rising contributors to Wechaty community during Summer 2020: Bi Kaiqiao (毕凯乔), Wang Junwei (王俊伟), Xie Yuqing (谢昱清), Fan Rui (范蕊), Jiang Shanshan (江姗姗), Lin Haohan (林昊翰), Tang Guangbin (唐光彬), Xiao Zilin (肖梓霖), and Kong Xiangzhe (孔祥哲)."
---

This summer, the Wechaty community welcomed 9 rising contributors: Bi Kaiqiao (毕凯乔), Wang Junwei (王俊伟), Xie Yuqing (谢昱清), Fan Rui (范蕊), Jiang Shanshan (江姗姗), Lin Haohan (林昊翰), Tang Guangbin (唐光彬), Xiao Zilin (肖梓霖), and Kong Xiangzhe (孔祥哲). They are all undergraduate and graduate students currently enrolled in universities.

The story of these 9 rising contributors and Wechaty begins with the "Open Source Software Supply Chain Lighting Plan - Summer 2020" jointly organized by the Institute of Software Chinese Academy of Sciences and Huawei's openEuler project this year.

![summer 2020](/assets/2020/12-summer-2020-student-developers-en/summer-2020.webp)

## The Beginning of the Story

In the process of these 9 students becoming contributors, we cannot fail to mention the community mentors who served as guiding lights for the students.

Before participating in the activity, the mentors responsible for guiding students in the Wechaty community were gathering to discuss task design. Since the Wechaty project is quite young, this was also the first time many mentors participated in similar activities, and everyone inevitably felt somewhat anxious.

Fortunately, we ultimately attracted a group of excellent students to join our projects, and during the 3 months from July to September, the Wechaty community gave birth to 9 open source stars. Most students participated in large-scale production projects for the first time. In this process, they discovered their shortcomings and improved their engineering practice abilities, enhancing their code reading and analysis skills. Some students also learned about the spirit of mutual assistance in open source communities through interaction with the community, and wished to continue to carry forward this spirit to help more people in the future.

Some functions of the projects developed by these 9 students have been released and are used by many community users; others will gradually meet everyone in future versions. In the following article, we will introduce in detail the specific details of these 9 projects and some experiences of students/mentors about this open source activity:

## Project 1 - Group Chat Assistant Robot (CHAssisT) Based on python-wechaty

> Outstanding Student Most Potential Award for Summer 2020!

![Wechaty Summer 2020 Kong Xiangzhe](/assets/2020/12-summer-2020-student-developers-en/kongxiangzhe.webp)

- Student: Kong Xiangzhe (孔祥哲), Tsinghua University (Sophomore)
- Mentor: Wu Jingjing (吴京京)
- Issue: <https://github.com/wechaty/summer-of-code/issues/6>
- Git: <https://github.com/kxz18/python-wechaty-groupchat-bot>
- Blog: <https://wechaty.js.org/2020/08/14/chassist-bot-final/>

### Project Description

In actual work and study processes, WeChat serves as the main communication channel tool, carrying the main task of event publishing. However, since group chat information is displayed chronologically, once the amount of information becomes too large, it becomes difficult to find historical messages. Therefore, a group chat assistant robot is needed that can extract historical messages based on quoted message replies and tag them correspondingly while saving them to the server locally. Messages are saved inside the group chat assistant robot, and group members only need to mention the assistant robot to query historical messages. It also periodically clears and displays tagged historical messages within a certain time period, and supports manual clearing and displaying of tagged historical messages.

This project implemented a group chat assistant robot based on python-wechaty. The robot mainly consists of four plugins. The first plugin is the group chat message tagging plugin, which records important information through group members quoting important messages and replying to the robot, for later question-and-answer retrieval. The second plugin is the scheduled message plugin, used for timed message delivery. The third plugin is the group member management plugin, which welcomes new members when they join the group, and automatically removes members from the group chat when a certain number of group members express discomfort with someone's words or actions. The fourth plugin is used to enhance interaction, serving as a help system plugin that provides customized function documentation to assist the work of the first three plugins. The four plugins can also be used independently.

### Reflections

This SoC activity allowed me to experience the open source community and conduct a simple software engineering practice. From initial requirement confirmation and project technology confirmation, to weekly iterative updates and unit testing, to final project documentation writing and CI configuration, the entire process is consistent with basic software engineering.

In the early stages of the project, the most important thing is to determine the project requirements and design the project architecture based on current requirements and possible future additions. Although this step doesn't involve substantial code writing, it has great guiding significance for the entire subsequent development process. Whether requirements are clear and whether the architecture is appropriate will determine the difficulty and amount of code in the development process, so it must be taken seriously. For myself, I spent nearly two weeks on requirement confirmation and project architecture. When confirming requirements, user stories can be used to easily discover detail issues in requirement documents. Project architecture can use UML diagrams, swimlane diagrams, etc. Project architecture should adopt OOP thinking to ensure good extensibility. After completing the architecture, development scheduling can be done based on the difficulty and dependency relationships of different modules. With a detailed plan, you can focus more on development itself, thereby improving efficiency.

After the project truly enters development, you may encounter problems from time to time. Most problems can be solved with search engines. What Baidu can't find can be searched with Google. If it's a specific third-party library issue, it can usually be solved by consulting documentation and GitHub issues. If it really can't be solved, you can also seek help from mentors during regular meetings. During the code writing process, it's best to configure the community's code style checking in advance. If the community doesn't have the practice of configuring such checks, it's also best to learn more from the community's code to ensure code standardization and readability during development. At the same time, for large projects, since the difficulty of overall debugging is relatively large, unit testing is very necessary. After completing a module, corresponding unit testing must be configured to ensure that the module implementation is correct, so that the probability of bugs when finally combining all modules is very small.

After development is completed, documentation writing and CI configuration are still needed. These two items usually have examples provided by the community, and documentation should be similar or consistent with the community style. When writing documentation, you should first consider from the user's perspective, then provide the documentation needed by developers. Because most people will first look at the project's usage methods and function descriptions when choosing a project, and will only refer to the interfaces and project architecture needed by developers when they actually choose the project for subsequent development.

### Mentor's Message

Student Kong Xiangzhe completed most functions according to the original project requirements quickly, and the code quality was very good. During this period, he maintained close contact with me, actively consulted about problems, and solved various difficulties in the project. Student Kong Xiangzhe started efficient development from the beginning of the project, with sufficient daily code commits, actively completing project functions, and being able to precisely analyze various problems existing in the project, taking on the main work of the project, including in-depth requirement analysis, module development, and discussion of extension modules.

This student's programming ability and business analysis ability are very good. During this period, he could quickly and precisely discover main problems, accelerating project development speed, and is a very excellent practitioner. This student showed high efficiency during the process. I hope this student can continue to study according to his interests and look forward to your future highlights.

## Project 2 - Lark Chatbot Based on Open API Encapsulating Wechaty Interface

![Wechaty Summer 2020 Fan Rui](/assets/2020/12-summer-2020-student-developers-en/fanrui.webp)

- Student: Fan Rui (范蕊), Nankai University (Senior)
- Mentor: Gao Yuan (高原), Li Jiarui (李佳芮)
- Issue: <https://github.com/wechaty/summer-of-code/issues/12>
- Git: <https://github.com/Roxanne718/wechaty-puppet-lark>
- Blog: <https://wechaty.js.org/2020/09/30/wechaty-puppet-lark-final-blog/>

### Project Description

This project mainly implements the Lark version of puppet, helping developers quickly port Wechaty WeChat robots to Lark. The main implementation idea is to implement function functions within puppet according to the API provided by the Lark open platform.

### Reflections

This was my first time contributing code to an open source community. Thank you to the event organizers and the Wechaty community for their help and support. Although it was only three short months, I gained a lot from this project. In communication with mentors, I learned many excellent development ideas and habits, and also met many excellent peers. Currently, this project has not reached my expected standards. I will continue to follow up and improve it in the future, hoping to complete a complete Lark robot framework.

This was my first time developing independently in the strict sense. I encountered many problems during development, such as inconsistent front and back interfaces, and modifying early logic in the later stages of the project. In the process of being overwhelmed by new bugs, I increasingly understood the importance of engineering, and I hope I can learn from this experience and do better in future development.

Finally, I hope the "Open Source Software Supply Chain Lighting Plan" series of activities will get better and better. I believe future developers will also gain growth from it.

## Project 3 - Building a Meme Bot Based on Python-wechaty

- Student: Xiao Zilin (肖子霖), Sichuan University (Junior)
- Mentor: Huang Chunhong (黄纯洪)
- Issue: <https://github.com/wechaty/summer-of-code/issues/7>
- Git: <https://github.com/MrZilinXiao/python-wechaty-meme-bot/>
- Blog: <https://wechaty.js.org/2020/09/27/python-wechaty-meme-bot-final/>

### Project Description

Meme battles are currently very popular among many young people, even many post-00s, and are very popular among people around 20 years old. Currently, there are many meme battle software on the market, software that automatically generates memes, and many homemade emoticons are also brought out for meme battles, and their download volumes are also quite good. Therefore, in this context, developing a meme battle robot based on Python-wechaty is also good.

This project, based on OCR and natural language generation technology, implemented a meme battle robot that can interact instantly based on meme content sent by users. The project mainly uses GPT2 as the language generation model, chineseocr_lite as the OCR module, and supports multi-turn dialogue and mutual loss calculation of dialogue replies. It also provides RESTful API interfaces that can provide meme battle services for Wechaty's multi-language plan and even other chatbots.

### Reflections

Like many students participating in the activity, this was also my first time participating in open source community work. Before this, my GitHub could only be considered a personal project repository. During the three-month development process, I learned a lot about open source communities and the Wechaty ecosystem, and also learned about CI/CD processes, code styles, and other content that is difficult to find in undergraduate textbooks. Although as an undergraduate, I had not been exposed to many open source communities, in the process of communicating with core community members and students also participating in the Summer 2020 activity, I gradually discovered that the atmosphere of mutual communication among Wechaty community members deeply attracted me. Although the Summer 2020 activity has come to an end, the open source journey of all of us participating students has just begun. I hope that I can improve my development level in future continuous practice and continue to make contributions within my ability to open source communities including the Wechaty community!

Finally, I would like to thank the Summer 2020 activity hosted by the Institute of Software Chinese Academy of Sciences and the OpenEuler community, thank all members of the Wechaty community, especially the careful guidance of community mentor Teacher Huang, and thank other participating partners for their enthusiastic sharing and active communication!

### Mentor's Message

The original intention of the project was to create a robot that "can" meme battle and "knows how to" meme battle. Xiao Zilin completed a robot that "can" meme battle in the middle of the project, and in the later stages of the project, the robot that "can" meme battle was also sublimated to become a robot that "knows how to" meme battle. From the final results, student Xiao Zilin's completion was relatively good.

In the implementation process of the later stages of the project, student Xiao Zilin overcame various difficulties and achieved certain results in unfamiliar fields such as natural language processing, which is commendable. During the project process, Xiao Zilin actively participated in project development, explored in unknown fields, worked hard to find solutions and methods to solve problems, and finally completed a robot that "knows how to" meme battle.

In the later stages of this project, due to the special nature of machine learning, there might not be particularly much code, and the workload was mainly highlighted in continuously modifying models and tuning parameters, so that a robot that "knows how to" meme battle could finally be completed.

Overall, student Xiao Zilin completed this project well. From the initial recognition of emoticons, including text recognition and emotion recognition, to the later robot that "can" meme battle, and finally to the robot that "knows how to" meme battle, student Xiao Zilin completed the project with practical actions.

One final suggestion: From the current presented effects, the "roasting" effect may still lack some fire, and I hope it can "roast" better in the future.

## Project 4 - Writing a "Daily Sentence" Plugin

![Wechaty Summer 2020 Jiang Shanshan](/assets/2020/12-summer-2020-student-developers-en/shanshan.webp)

> Outstanding Student Contribution Award for Summer 2020!

- Student: Jiang Shanshan (江姗姗), Peking University
- Mentor: Gcaufy
- Issue: <https://github.com/wechaty/summer-of-code/issues/10>
- Git: <https://github.com/univerone/WordsPerDay>
- Blog: <https://wechaty.js.org/2020/09/26/wechaty-words-per-day-plugin-final/>

### Project Description

Using plugins to empower robots. In many communication groups, there are requirements for robots to send a sentence or an article of information in the group at a certain time every day.

For example, English learning groups may need a daily English knowledge point, stock trading groups may need daily financial information, work groups need daily chicken soup for the soul, etc.

This project mainly developed a plugin that can be called by wechaty, which can extract text information according to user-defined rules, can send information in specified groups at scheduled times, and this plugin also supports generating daily changing check-in images.

### Reflections

I was very happy to get to know the wechaty community this summer. Although I had been exposed to simple GitHub usage before, I had never been exposed to a large and active open source community like wechaty. Everyone comes from all over the world and gathers together because of their passion and love for open source. It's really a magical process, and there are no push and mandatory requirements. The atmosphere is relatively relaxed and pleasant. Everyone writes code out of interest and adds new functions. The biggest reason for developing new things may be that they find it interesting or fun.

In the past, I always wrote code behind closed doors, and the things I wrote were very non-standard and others couldn't understand them. After getting to know the wechaty community, I also began to learn to read other people's excellent code, pay attention to standards when writing code, and introduce automated deployment tools such as GitHub Actions. For me personally, I think I gained a lot and really like the inclusive and open development style of the wechaty community. After the project ended, I was fortunate to participate in the open source summit in Nanjing with the wechaty community, which was also a super pleasant and rewarding journey.

There were also some regrets during the project development process. I was still too introverted and not confident enough in my technical level, so I didn't dare to discuss technical issues with community mentors and other developers, missing many communication opportunities. This is something I need to pay attention to in the future. There is also the issue of time management. Open source community projects are all completed in everyone's spare time, and I was always rushing deadlines during project development. I need to learn from other developers about reasonable planning and time allocation.

Overall, my biggest experience is to actively and proactively approach new things and challenges. I also thank the wechaty community and the Institute of Software Chinese Academy of Sciences for giving me this opportunity.

## Project 5 - Kuaishou Chatbot Based on RPA Encapsulating Wechaty Interface

- Student: Bi Kaiqiao (毕凯乔), Changchun University of Technology (Senior)
- Mentor: Wang Kaifeng (王凯峰), Yin Bohao (尹伯昊)
- Issue: <https://github.com/wechaty/summer-of-code/issues/14>
- Git: <https://github.com/bikaiqiao/kuaishouPuppet.git>
- Blog: <https://wechaty.js.org/2020/08/20/wechaty-puppet-kuaishou-mid-term/>

### Project Description

Kuaishou has a powerful internal IM system, and a large number of users are accustomed to chatting directly with content creators and fan groups within Kuaishou.

However, there is currently no mature Kuaishou chatbot framework, and for tedious operational scenarios such as automatic replies and group management, there is no complete and mature solution yet.

### Reflections

> Source: [Congratulations to our institute's 2017 students Bi Kaiqiao and Wang Junwei... for successfully participating in the Open Source Software Supply Chain Lighting Plan - Summer 2020 and successfully completing the project](http://www.ccutchi.com:8205/zidonghua/TemplateForm_view.aspx?id=851&ClassOneID=20)

As a senior student about to graduate and work, I deeply feel the insufficiency of my professional skills. I saw the "Open Source Software Supply Chain Lighting Plan - Summer 2020" activity on CSDN. This activity provided generous bonuses and gifts to encourage college students to participate more in maintaining open source community work. But I needed more to improve my professional skills in this activity and pave the way for future work.

The community we participated in was the Wechaty community, which initially mainly developed WeChat chatbots. In this activity, the community hoped to bridge their chatbots to more platforms. We respectively chose "Kuaishou Chatbot Based on RPA Encapsulating Wechaty Interface" and "Douyin Chatbot Based on RPA Encapsulating Wechaty Interface". The language used by the community is TypeScript, which is slightly more difficult syntactically than the JavaScript we usually use. At the same time, this was our first time encountering such large-scale project source code, and the project's solution had no many open source precedents, making it difficult to search. We tried three different approaches before finally completing the demo version with the help of community mentors.

Through participating in this activity, I deeply realized the insufficiency of my technical level. When facing large projects, I cannot quickly find the optimal solution. Although we passed the final review of the activity, in today's increasingly intense competition, we may pay a painful price for our previous youthful ignorance. Now there is only about half a year left before university graduation. It's better late than never. I will study professional knowledge more diligently in the coming life, improve my technical level, so that I can gain higher competitiveness in the future.

I hope everyone can forge ahead through hardships.

## Project 6 - Douyin Chatbot Based on RPA Encapsulating Wechaty Interface

- Student: Wang Junwei (王俊伟), Changchun University of Technology (Senior)
- Mentor: Wang Kaifeng (王凯峰), Yin Bohao (尹伯昊)
- Issue: <https://github.com/wechaty/summer-of-code/issues/13>
- Git: <https://github.com/gavinwang23/wechaty-puppet-douyin>
- Blog: <https://wechaty.js.org/2020/10/13/wechaty-puppet-douyin-final-term/>

### Project Description

Douyin has a powerful internal IM system, and a large number of users are accustomed to chatting directly with content creators and fan groups within Douyin. However, there is currently no mature Douyin chatbot framework, and for tedious operational scenarios such as automatic replies and group management, there is no complete and mature solution yet.

Wechaty is the world's largest open source chatbot framework, hoping to achieve chatbots for different software based on the same set of application layer code.

## Project 7 - Enterprise WeChat Chatbot Based on Open API Encapsulating Wechaty Interface

- Student: Xie Yuqing (谢昱清)
- Mentor: Gao Yuan (高原), Li Jiarui (李佳芮)
- Issue: <https://github.com/wechaty/summer-of-code/issues/2>
- Git: <https://github.com/Sapio-S/wechaty-puppet-official/>
- Blog: <https://wechaty.js.org/2020/09/27/puppet-work-final/>

### Project Description

Enterprises need to store and analyze chat records, but the interfaces are too complex and need secondary encapsulation based on existing open interfaces. Enterprise WeChat, as the enterprise version of WeChat, provides various APIs to meet different enterprise needs. The conversation archiving function provided by Enterprise WeChat can meet the enterprise's need to retain messages and then optimize workflows, accountability, and quality inspection by analyzing large amounts of message data.

However, Enterprise WeChat's conversation archiving interface has many encryption, parsing, and other work due to high security requirements. While ensuring security on one hand, it greatly increases development difficulty on the other.

Wechaty is the world's largest open source chatbot framework, hoping to achieve chatbots for different software based on the same set of application layer code. As one of the world's largest chatbot developer communities, Wechaty provides very simple interface implementations, allowing developers to implement their own chatbot with just 6 lines of code. If Enterprise WeChat's conversation archiving interface can be encapsulated into Wechaty, it can greatly simplify the development process for enterprise developers.

Because Wechaty is built on the puppet system, puppet is an abstraction layer that Wechaty depends on. It defines interfaces that various underlying IM access solutions need to implement. It is precisely because of the existence of the puppet abstraction layer that many Wechaty developers can switch between different underlying IM accesses with just one variable.

### Reflections

During the project period, I felt my ability to understand code was constantly improving. Looking back, what I didn't understand before, I now understand roughly. The harvest is really great. When writing this report, I actually had a relatively clear understanding of the entire wechaty architecture for the first time. From being completely ignorant at the beginning of July to gradually getting started in August and then to the current sudden realization (perhaps not really comprehending), it's very fulfilling.

Of course, there are also many regrets and shortcomings. The main problems are still with myself - unfamiliarity with the language and time conflicts, resulting in the current results not being very satisfactory, leaving many holes to fill. For me, this is also a very important lesson. When doing projects in the future, I must plan time well and understand the required technology stack early, so that I can better complete tasks.

Additional note: I originally thought that although my code definitely couldn't be directly published and used, it barely completed the main functions. But looking at other people's blogs, I fell into deep embarrassment. I could actually have completed it to a higher degree and done better. I hope the software engineering and other courses offered by the school this semester can help me understand and become familiar with the complete development process more deeply!

## Project 8 - Designing and Implementing Plugin System for go-wechaty

- Student: Lin Haohan (林昊翰), Xidian University (Junior)
- Mentor: Ding Xiaoyu (丁小雨)
- Issue: <https://github.com/wechaty/summer-of-code/issues/9>
- Git: <https://github.com/wechaty/go-wechaty/pull/67>
- Blog: <https://wechaty.js.org/2020/09/27/go-wechaty-plugin/>

### Project Description

Wechaty is a multi-protocol WeChat access solution. With the establishment of the community's multi-language ecosystem, it has attracted more developers and enthusiasts to join. At the same time, driven by demand and technological development, the plugin system has gradually improved, but the Plugin system in the multi-language system has not yet been completed. We hope that through this task, more people can join the construction of go-wechaty.

Currently, go-wechaty examples/ding-dong-bot.go has a ding-dong bot, but we hope this ding-dong is universal. If our Plugin system can be written, maybe implementing ding-dong will only require one line of code. For example: go bot.Use(DingDong{}) go-wechaty is a Go language implementation of the wechaty project, which also supports multi-protocol access and achieves more reasonable encapsulation and design with the help of goroutine and channel language features.

### Reflections

In my first two years of university, I had not participated in the development of large projects, let alone high-requirement open source projects. Remote collaborative development of open source projects has great appeal to me, but I never had a suitable opportunity to participate (insufficient level, not knowing how to participate, and other situations made me repeatedly give up taking the first step).

This Open Source Software Supply Chain Lighting Plan provided this opportunity, allowing me to participate in the Wechaty community for project development. The Wechaty community is a very inclusive community, and mentors in the community patiently answer questions raised by students.

This activity experience increased my experience in participating in open source software development and strengthened my communication skills. In future development journeys, I will continue to contribute code to open source communities.

In the development process of this project, the main problems I encountered came from unfamiliarity with Go program development, and I would have doubts about many details. When actually testing programs, there were also some small problems to solve, such as Docker usage and troubleshooting. My solution was mainly self-learning and consulting materials. This project development experience greatly improved my programming ability and some computer-related knowledge.

For some problems I couldn't solve myself, mentors in the community gave me great help. After reading my code, mentors gave many targeted suggestions, which was very necessary for me to complete project development. Thank you for the mentors' efforts.

### Mentor Comments

Student Haohan's learning ability and initiative are particularly strong, and he can quickly get started with new knowledge and methods. From initially being at a loss about open source projects to becoming familiar with conventional methods of sharing code and mastering Go, you can feel progress and gains. I believe this brief activity experience can become a topic of conversation in your future work and life.

I believe most people transitioning from school to work will waver about long-cycle projects. Actually, you just need to complete the established work according to the original plan. Breaking down large projects into small projects is a very important part of planning and execution. The weekly plan mentioned in the report makes me pleased that you saw the value this brought you. It kept you from deviating from the original planned direction, and I hope you can gain something from this in your future work.

## Project 9 - Go-wechaty Github Action Optimization

- Student: Tang Guangbin (唐光彬), South China Agricultural University (Sophomore)
- Mentor: Ding Xiaoyu (丁小雨)
- Issue: <https://github.com/wechaty/summer-of-code/issues/8>
- Git: <https://github.com/wechaty/go-wechaty>
- Blog: <https://wechaty.js.org/2020/09/27/go-wechaty-gh-actions-optimization-final-poc/>

### Project Description

GitHub Action has been released for some time, and has been implemented in go-wechaty's unit testing, code detection, and code rating.

Go-wechaty GitHub Action optimization mainly achieves cross-repository CI optimization by using GitHub Actions features, aiming to reduce the burden on developers.

### Reflections

As a novice with little experience in project development, this was my first time contributing a small amount to an open source project. During these three months, I gradually learned knowledge related to GitHub Actions and Docker. Special thanks to mentor Ding Xiaoyu for his efforts. Under his guidance, I also felt the warmth and power of the open source community.

Although the amount of code developed this time was relatively small, what I gained was the process of open source project collaboration and the spirit of mutual assistance and sharing in the open source community, which was quite rewarding. This standardized and professional multi-person collaboration allowed me to experience an efficient development journey. This activity also let me learn about many excellent developers, making me even more determined to hone my development skills.

Finally, I would like to thank the Open Source Software Supply Chain Lighting Plan series activities and the Wechaty community for giving me this opportunity, and I am very grateful to Teacher Ding Xiaoyu and other teachers and peers for the guidance and help they brought me.

### Mentor Comments

Student Guangbin can actively expand knowledge areas he has not yet mastered, and even actively explore new technical solutions in certain directions. This is a very important skill in work. I hope you can continuously expand your knowledge areas and solve more unknown problems.

I believe you have enough enthusiasm to solve technical aspects, just as you mentioned in your summary that you will realize your room for improvement in technology. But on the other hand, I hope you can gain more in open source aspects, which can enable you to promote more improvements in project collaboration in your future work.

## To Be Continued

This activity has extraordinary significance for both students and mentors. Regardless of whether students continue to contribute to the Wechaty community in the future, I hope this activity can pave the way for them to become professional programmers and ignite their passion for open source.

A single spark can start a prairie fire. Summer may have passed, but your story with the Wechaty community is still to be continued.

We welcome every partner who hopes to contribute to the Wechaty project to join us and write more stories with us!

You can start here: <https://github.com/wechaty/wechaty/issues>

## Welcome to Join the Wechaty Community

| Address | Portal |
| :--- | :--- |
| <https://github.com/wechaty/wechaty> | Source Code |
| <https://wechaty.js.org> | Official Website |
| <https://gitter.im/wechaty/wechaty> | Gitter Chat Room |
| <https://wechaty.js.org/blog> | Blog |
| [https://www.youtube.com/playlist...](https://www.youtube.com/playlist?list=PL8hd9KDTdarDXf_Rxtr8meKhxtgcXMInh) | YouTube |
| [https://photos.google.com/...](https://photos.google.com/share/AF1QipOWKUfUkjw-VzE0skrjmCwbwIWwuBiI7Li4UCbdXH62n8iH2ITnvDbPTsx4eBl8dw?key=cy1NdWFoUGpXanVmczVHSm84TVg1LXJWeW5HTDhR) | Album |
| [https://docs.google.com/document/...](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.64c95c3y2l4v) | Meeting Notes |

> Special thanks to Milvus community for the [template](https://mp.weixin.qq.com/s?__biz=MzUzMDI5OTA5NQ==&mid=2247486935&idx=2&sn=07bbbc323872d5ef3a48e3096e2c6f02)

---

> 中文版: [今年夏天，Wechaty 社区与 9 位开源后浪的故事](/2020/12/31/summer-2020-student-developers/)

---

> Chinese version of this post: [summer 2020 student developers]({{ '/2020/12/31/summer-2020-student-developers/' | relative_url }})
