---
title: 'Summer 2020: POC Showcase for Python-Wechaty Group Chat Assistant Bot'
author: kxz18
categories: project
image: /assets/2020/08-python-wechaty-groupchat-assistant-bot-poc-en/header.webp
tags:
  - python
  - summer-2020
  - summer-of-wechaty
  - productivity
excerpt: "This post showcases the proof-of-concept for a Python-Wechaty based group chat assistant bot, a project from the Summer 2020 Open Source Promotion Plan. The bot features plugins for message tagging, scheduled messages, and group member management."
---

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China. Participants can also obtain bonuses and trophies from the "Open Source Promotion Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)
This project [Project Name] is an open source project supported by Summer 2020.

Code: [@kxz18/python-wechaty-groupchat-bot](https://github.com/kxz18/python-wechaty-groupchat-bot)

## [python-wechaty-based group chat assistant robot] Information

- Mentor: Jingjing Wu (吴京京)
- Student: Xiangzhe Kong (孔祥哲)
- Project name: python-wechaty-based group chat assistant robot
- Description:
  This project needs to implement a group chat assistant robot based on python-wechaty. The robot is mainly composed of four plug-ins. The first plug-in is a group chat message tagging plug-in, which records important information by group members quoting important messages and replying to the robot, so that it can be searched in a question-and-answer manner later. After the basic functions are developed, deep learning methods will be used to optimize the fault tolerance of question and answer, thereby improving the level of interaction. The second plug-in is a timed message plug-in for the distribution of timed messages. The third plug-in is a group member management plug-in. When a new person enters the group, they will be welcomed. When a certain number of group members express discomfort with a certain group member's words and deeds, the group member will be automatically deleted from the group chat. The fourth plug-in is used to enhance interaction, as a help system plug-in, to provide customized functional documents to assist the first three plug-ins. The first of the four plug-ins is the basic requirement of the project.
  The project is mainly divided into four stages. The first stage is the realization of basic functions, that is, the realization of the group chat message tagging plug-in. The second stage is the realization of extended functions, mainly realizing the timed message plug-in and the group member management plug-in. The third stage optimizes the interactive performance, implements the help system plug-in, and uses deep learning to optimize the question-and-answer system of the message tagging plug-in. The last is the optional stage. If there is still time after the project plan is completed, the rasa chatbot api will be connected to enrich the plug-in functions.
- Time planning:
  - Group chat message tagging plugin
    - 7.1 - 7.19
    - This module is the basic requirement of this project. It is necessary to realize the marking of important group chat messages by quoting messages for reply, and store them in the local database. When the corresponding question is raised, the robot can give the corresponding answer by searching the stored marked messages. If the confidence of the matched answer is not high, it will provide possible keywords to confirm with the user. At the same time, it supports displaying all or a certain period of marked messages. Users can manually delete or regularly delete them. The marked messages themselves can also provide a validity period parameter, which will be automatically deleted after the validity period. In the later stage, a help system is provided, and users can view the help information of different functions at any time.
  - Basic functions
  - Timed message plugin
    - 7.20 - 7.26
    - The user specifies the message content and sending time, and the robot sends the message regularly.
    - Extended functions
  - Group member management plugin
    - 7.27 - 8.2
    - Manage kicking people and welcoming people into the group. Kicking people requires more than 3 group members to express dissatisfaction with someone (when there are only less than 3 or 4 group members in total, 1 and 2 people need to express dissatisfaction respectively). This plug-in requires the robot to have relevant permissions.
    - Extended functions
  - Improve the interaction of the first few modules
    - 8.3 - 8.23
    - The interaction will be uniformly optimized to improve the fault tolerance when parsing user commands. The current idea is to try to use deep learning methods to improve the matching accuracy of the question-and-answer system (in the basic version, cosine similarity is used to match questions and answers), and to confirm when the user command parsing fails but is very similar to some patterns. At the same time, the process will continuously simulate user scenarios to find out where the robot is not user-friendly in interaction and correct it.
    - Extended functions
  - (Optional) rasa chat bot plugin
    - 8.24 - 8.31
    - Access the API of the rasa chat bot. This is optional. If all the above contents are completed and there is still plenty of time, you can consider trying to make it.
    - Optional content

## Project progress

- Work done:
  At present, the development of four plug-ins and corresponding unit tests have been completed. That is, the first two stages of the project have been completed, and the third stage has been partially completed and is in progress.
  At present, a presentation has been made to briefly explain the function and structure of the project:
  
  {% include iframe.html src="https://www.youtube.com/embed/WlxClO3C_Sc" %}

  A live coding demonstration of the implemented functions was also carried out. The demonstration content is as follows:

  {% include iframe.html src="https://www.youtube.com/embed/TcsK58aokUA" %}

- Problems encountered and solutions:
  In the development process, there are mainly two types of problems, one is technical problems, and the other is the choice of software architecture.
  Technical problems are mainly due to unfamiliarity with third-party libraries. For example, in the development process, I was not familiar with the python-wechaty interface and could not get the information I wanted quickly and accurately, and I did not know how to use the async function as a callback function when using apscheduler. Since python-wechaty is still in the development stage and the documentation is not perfect, the problem is mainly to refer to the code on github, trace the relevant classes and functions to see the code to solve the problem, and if it can't be solved or the solution is not correct, I will directly consult the mentor. For third-party libraries like apscheduler, there are more complete documents, so I can directly seek answers from the documents. There are also some multi-threading problems, such as the multi-threading access problem caused by keeping the connection with the database after modifying the database (passing the connection with the database from the main thread to the sub-thread). This kind of problem will be solved by directly searching for a more template-like writing method on the Internet. Another problem is that a WeChat account is required to access WeChat for testing. When I first started testing, it was always easy to be blocked by Tencent. After communicating with my mentor, I raised the account for a long time (simulating human behavior), and finally I could use it to hang up the robot for testing.
  In terms of software architecture selection, since I don't have much experience in software architecture, I will first design some architectures with my existing knowledge, and then communicate with my mentor whether such architectures are reasonable and ask him to give some suggestions. For some common architecture problems, I will also search for traditional architecture patterns to imitate.
  In general, most of the problems can be solved. Generally, solutions can be found from documents, github issues, the code itself, various forums and blogs. At the same time, you should communicate more with your mentor. The mentor has rich experience and can give more efficient answers to many questions. Communicating more with your mentor can not only solve problems, but also learn a lot of new things.

- Follow-up work arrangement:
  The follow-up work is consistent with the previous plan on the route, and since the completion date of the previous tasks is earlier than expected, the overall plan can be moved forward.

## Contact us

- Project link: [https://github.com/kxz18/python-wechaty-groupchat-bot](https://github.com/kxz18/python-wechaty-groupchat-bot)
- Contact: +86 15068701650 | e: 15068701650@163.com

## Mentor review

### Review object

- Review content: *Interim report*
- Submitter: *Xiangzhe Kong (孔祥哲)*

### Review results

- Project completion: *Xiangzhe Kong (孔祥哲) quickly completed most of the functions according to the original project requirements, and the code quality is very good. During the period, he kept in close contact with me, actively consulted questions, and solved various problems in the project. At present, the project has come to an end, and the remaining work is the development of additional expansion functions of the project and some code testing.*
- Student participation: *Xiangzhe Kong (孔祥哲) has been developing with high efficiency since the beginning of the project, has enough code submissions every day, actively completes the project functions, and can accurately analyze the various problems in the project. Basically, the whole process is led by the student, and I am just here to solve the problems he raised.*
- Code contribution: *The student undertakes the main work of the project, including in-depth analysis of requirements, module development and discussion of expansion modules. I mainly play a guiding role to solve some of the problems raised by the student.*

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/14/python-wechaty-groupchat-assistant-bot-poc/).
