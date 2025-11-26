---
title: "Group Chat Assistant Bot based on python-wechaty"
author: kxz18
categories: project
image: /assets/2020/07-python-wechaty-groupchat-assistant-bot-en/header.webp
tags:
  - python
  - summer-2020
  - summer-of-wechaty
  - utility
excerpt: "This post outlines the plan for creating a Group Chat Assistant Bot using python-wechaty as part of the Summer 2020 open-source program. The project includes features like message tagging, scheduled messages, and group member management."
---

> This post is also available in [Chinese (Simplified)](/2020/07/18/python-wechaty-groupchat-assistant-bot/).

## Summer 2020

"Open Source Software Supply Chain Lighting Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer event for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China.
Participants can also get bonuses and trophies for the "Open Source Software Supply Chain Lighting Plan - Summer 2020" event according to the difficulty and completion of the project.
Official website: [https://isrc.iscas.ac.cn/summer2020](https://isrc.iscas.ac.cn/summer2020) Official news: [http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html](http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html)
This project [Group chat assistant robot based on python-wechaty] is an open source project supported by Summer 2020.

## [Group chat assistant robot based on python-wechaty] specific plan

- Mentor: Wu Jingjing
- Student: Kong Xiangzhe
- Module list
  - [x] Group chat message tagging plugin
  - [ ] Timed message plugin
  - [ ] Group member management plugin
  - [ ] Improve the interaction of the first few modules
  - [ ] (Optional) rasa chat bot plugin
- Schedule:
  - Group chat message tagging plugin
    - 7.1 - 7.19
    - This module is the basic requirement of this project. It needs to be able to mark important group chat messages by replying to quoted messages and store them in a local database. When a corresponding question is raised, the robot can give a corresponding answer by searching the stored marked messages. If the confidence of the matched answer is not high, it will provide possible keywords to the user for confirmation. At the same time, it supports displaying all or a certain period of marked messages. Users can manually or regularly delete messages. The marked messages themselves can also provide a validity period parameter, which will be automatically deleted after the validity period. Provide a help system, users can view help information for different functions at any time.
    - Basic functions
  - Timed message plugin
    - 7.20 - 7.26
    - The user specifies the message content and sending time, and the robot sends the message regularly.
    - Extended functions
  - Group member management plugin
    - 7.27 - 8.2
    - Manage kicking people and welcoming new members. Kicking people requires more than 3 group members to express dissatisfaction with someone. This plugin requires the robot to have relevant permissions.
    - Extended functions
  - Improve the interaction of the first few modules
    - 8.3 - 8.23
    - Uniformly optimize the interaction, and improve the fault tolerance when parsing user commands. The current idea is to try to use deep learning methods to improve the matching accuracy of the question and answer system (using cosine similarity to match questions and answers in the basic version), and confirm when the user command parsing fails but is very similar to some patterns. At the same time, the process will continuously simulate user scenarios to find and correct the robot's inhuman interaction.
    - Extended functions
  - (Optional) rasa chat bot plugin
    - 8.24 - 8.31
    - Access the API of the rasa chat bot. This is optional. If all the above content is completed and there is still ample time, you can consider trying to make it.
    - Optional content
- Project link: [https://github.com/kxz18/python-wechaty-groupchat-bot](https://github.com/kxz18/python-wechaty-groupchat-bot)
- Contact: +86 15068701650 | e: 15068701650@163.com

> Author: [@kxz18](https://github.com/kxz18)
> Code: [@kxz18/python-wechaty-groupchat-bot](https://github.com/kxz18/python-wechaty-groupchat-bot)
