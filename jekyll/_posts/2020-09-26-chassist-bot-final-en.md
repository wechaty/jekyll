---
title: 'Summer 2020: Final Presentation of Python-Wechaty Group Chat Assistant Bot'
author: kxz18
categories: project
image: /assets/2020/09-chassist-bot-final-en/logo.webp
tags:
  - python
  - summer-of-wechaty
  - summer-2020
  - entertainment
excerpt: "Final presentation of the CHAssisT bot, a Python-Wechaty-based group chat assistant featuring message tagging, scheduled messages, member management, and deep learning-enhanced Q&A capabilities, completed as part of Summer 2020 Open Source Promotion Plan."
---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community.
It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China.
Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)
This project [Python-Wechaty-based Group Chat Assistant Bot] is an open source project supported by Summer 2020.

## 1. Project Information

### 1.1 Basic Information

- Mentor: Jingjing Wu (吴京京)

- Student: Xiangzhe Kong (孔祥哲)

- Project Name: Python-Wechaty-based Group Chat Assistant Bot

### 1.2 Solution Description

This project requires the implementation of a group chat assistant bot based on python-wechaty. The bot is mainly composed of four plugins. The first plugin is a group chat message tagging plugin that records important information by having group members quote important messages and reply to the bot, so that it can be searched later in a Q&A manner. After the basic functions are developed, deep learning methods will be used to optimize the fault tolerance of the Q&A, thereby improving the interaction level. The second plugin is a scheduled message plugin for distributing scheduled messages. The third plugin is a group member management plugin. When a new person joins the group, they will be welcomed. When a certain number of group members express discomfort with a certain group member's words and deeds, the group member will be automatically deleted from the group chat. The fourth plugin is used to enhance interaction as a help system plugin, providing customized functional documentation to assist the first three plugins. Among the four plugins, the first plugin is the basic requirement of the project.

The project is mainly divided into three stages. The first stage is the realization of basic functions, that is, the implementation of the group chat message tagging plugin. The second stage is the realization of extended functions, mainly implementing the scheduled message plugin and the group member management plugin. The third stage optimizes interactive performance, implements the help system plugin, and uses deep learning to optimize the Q&A system of the message tagging plugin.

### 1.3 Time Planning

- Group Chat Message Tagging Plugin
  - July 1 - July 19
  - This module is the basic requirement of this project. It is necessary to tag important group chat messages by quoting messages for reply, and store them in a local database. When the corresponding question is raised, the bot can give a corresponding answer by searching the stored tagged messages. If the confidence of the matched answer is not high, it will provide possible keywords to confirm with the user. At the same time, it supports displaying all or a certain period of tagged messages. Users can manually delete or regularly delete them. The tagged messages themselves can also provide a validity period parameter, which will be automatically deleted after the validity period. Later, a help system is provided, and users can view the help information of different functions at any time.
  - Basic Functions
- Scheduled Message Plugin
  - July 20 - July 26
  - The user specifies the message content and sending time, and the bot sends the message regularly.
  - Extended Functions
- Group Member Management Plugin
  - July 27 - August 2
  - Manage kicking people and welcoming people into the group. Kicking people requires more than 3 group members to express dissatisfaction with someone (when there are only less than 3 or 4 group members in total, 1 and 2 people need to express dissatisfaction respectively). This plugin requires the bot to have relevant permissions.
  - Extended Functions
- Improve the Interaction of the Previous Modules
  - August 3 - September 24
  - Uniformly optimize the interaction, improve the fault tolerance when parsing user commands, try to use deep learning methods to improve the matching accuracy of the Q&A system (in the basic version, cosine similarity is used to match questions and answers), and confirm when user command parsing fails but is very similar to certain patterns. At the same time, this process will continuously simulate user scenarios to find where the bot is not user-friendly in interaction and correct it.
  - Extended Functions

## 2. Project Summary

### 2.1 Project Achievements

At present, the tasks of the three stages have been completed, the required functions have been realized, the corresponding unit tests have also been implemented, and the CI process of GitHub has been configured for code submission detection. At the same time, a readme is provided for the GitHub project for usage instructions, and a project logo and project name have been designed. The project name is CHAssisT, which means chat + assistant, that is, chat assistant. The logo design is shown below:

<img src="/assets/2020/09-chassist-bot-final-en/logo.webp" alt="logo" style="zoom: 33%;" />

The overall bot plugin is integrated from four independent plugins. If you want to use a certain independent plugin, you can also use it separately. For specific usage methods, please refer to the readme in the project GitHub:

[https://github.com/kxz18/CHAssisT](https://github.com/kxz18/CHAssisT).

Since the project functions were completed before the mid-term evaluation, the mid-term presentation briefly explained the functions and structure of the project. If you are interested in the project architecture, you can refer to this video:  

{% include iframe.html src="https://www.youtube.com/embed/WlxClO3C_Sc" %}

After the mid-term, I mainly conducted some experimental attempts in deep learning and optimized the interaction of the bot to a certain extent, which was explained in the later stage presentation:

{% include iframe.html src="https://www.youtube.com/embed/BCQx_g8t9l4" %}

The video was also uploaded to Bilibili: [https://www.bilibili.com/video/BV1zz4y1Z7iJ/](https://www.bilibili.com/video/BV1zz4y1Z7iJ/)

In order to better demonstrate the project results, a live coding demonstration of the implemented functions was also conducted according to community requirements. The demonstration content is as follows:

{% include iframe.html src="https://www.youtube.com/embed/uqBwzAckhzk" %}

The video was also uploaded to Bilibili: [https://www.bilibili.com/video/BV1iz4y1Z74S/](https://www.bilibili.com/video/BV1iz4y1Z74S/)

### 2.2 Project Experience

The whole process of this project can be seen as a simple software engineering practice, and the problems encountered and the ways to solve them are also similar to common problems and solutions in software engineering.

At first, requirements were confirmed. Because the original requirements were just some vague ideas, and many details were not implemented, the first step to start the project was to confirm the details of various requirements with the mentor. When confirming the requirements, a discussion was first conducted to have a general understanding of the original ideas, and a general requirements document was listed. However, having a requirements document alone is not enough for specific implementation, so the user story mode was adopted to determine the details of requirements. User stories simulate a user, simulate the use of each function one by one, and record the use process and the problems encountered in the process for reference in specific implementation.

Next is software architecture. Because there are many requirements, obviously if you start writing directly, it may lead to problems such as not knowing where to start, a lot of duplicate code, poor maintainability, and poor extensibility. So before actually writing code, modules were divided according to functions, and the structure was established using UML diagrams. This method can decompose huge requirements into individual subtasks, and at the same time abstract universal structures into interfaces, which is convenient for implementation and can also enjoy the benefits of a relatively neat code structure. This step usually takes more effort than actually writing code, because a good architecture can get twice the result with half the effort, and vice versa. Of course, the architecture conceived before starting work will definitely not be perfect. Various problems may (and indeed do) occur after starting work. At this time, you also need to adjust the architecture yourself or consult your mentor.

![uml](/assets/2020/09-chassist-bot-final-en/uml.webp)

Finally, there is the code implementation. In the actual implementation process, some problems with the use of third-party libraries are often encountered. Since the method of "asking when you don't understand" is actually quite inefficient, at the mentor's suggestion, when encountering problems, if it is a problem with the wechaty framework, first read the relevant code yourself. Directly reading the code can usually solve most problems caused by not knowing how to use the interface or not knowing the role of the function; if it is a problem with other third-party libraries, you can try to solve it yourself through GitHub issues, documentation, Google, etc. If you can't solve it yourself, record the problem. When the number of unsolvable problems reaches a certain amount, then have a meeting with the mentor to communicate. This problem-solving method is indeed quite efficient, saving a lot of time for both myself and my mentor.

In terms of correctness detection of function implementation, it is done in the form of unit testing. And because open source code is not just for yourself, it is also necessary to follow certain code specifications, so code style checking was also added. Both of these were eventually configured into the project's CI to prevent non-standard code from being merged into the library. In terms of interactivity, I found some places where the bot is not user-friendly enough through my own real use, such as not replying after setting a scheduled task, which causes users to not know whether the bot has set the scheduled task or not. Determine the direction that needs to be optimized by finding problems and doubts encountered in actual use.

Of course, even though nearly a month was spent optimizing the software, because this is a single-person development project, there must be many things that are not well considered, such as scheduled message sending not being persistently stored, some places in the interaction are not user-friendly enough, and English support is not enough. If this project can be put into actual use later, these may be points that need to be optimized with priority.

## 3. Review Results

- Project Completion:

  The student was able to complete every function in the requirements according to the original plan, and the completion was very good, and the efficiency was also very high. After careful comparison, the completion was 100%;

- Student Participation:

  The student conscientiously and independently completed each module in the project during the actual development process, and had multiple discussions on requirements and technology, actively promoting our positive communication. After viewing all the submission records in the project, all the code was completed by this student. The student was deeply involved in the early requirements research, mid-term technical discussions, and late-stage project review.

- Code Contribution:

  In this project, all the code was contributed by this student, and all requirements discussions were driven by him. He is the main person in charge of this project.

- Comprehensive Evaluation and Suggestions:

  The student actively and efficiently completed all tasks in the project, promoted various progress in the project, worked hard to explore potential problems and could find them in advance, and has a very high enthusiasm for open source. I also look forward to making more contributions to the open source community in the future.

  In addition, I suggest that the student work hard to learn more software-related soft skills, strictly require his code standardization ability, expand his knowledge, study a certain field in depth, and always maintain a strong enthusiasm for open source.

- Final Review Result: Pass

## Contact Us

- Project link: [https://github.com/kxz18/CHAssisT](https://github.com/kxz18/CHAssisT)
- Contact: +86 15068701650 | e: 15068701650@163.com

> Author: [@kxz18](https://github.com/kxz18)
> Code: [@kxz18/CHAssisT](https://github.com/kxz18/CHAssisT)

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/26/chassist-bot-final/).
