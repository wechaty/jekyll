---
title: "Wechaty Lecture at Peking University Open Source Class"
author: limingth
categories: event
tags:
  - meetup
  - lecture
  - news
  - ecosystem
image: /assets/2019/wechaty-pku-lecture-en/pku-liming2.webp
excerpt: >
  On October 18, 2019, Wechaty was presented to over 120 students at Peking University's Software and Microelectronics School, covering project architecture, community governance, and the Maodou Classroom Assistant case study.
---

## Overview

* Wechaty Architecture  
* Wechaty Open Source Community Governance  
* Wechaty Community Ecosystem Governance  
* Wechaty Application Case Study  

![PKU Lecture Scene](/assets/2019/wechaty-pku-lecture-en/wechaty-pku-lecture.webp)

On October 18, 2019, I was invited by Professor Zhang Qixun from [Peking University's School of Software and Microelectronics](http://www.ss.pku.edu.cn/), through an introduction by Zhuang Biaowei from Huawei Cloud, to represent the Wechaty open source project. I gave a comprehensive and systematic presentation about the Wechaty project to over 120 students from PKU's software experimental class, and shared a Wechaty application case study - [Maodou Classroom Assistant](/assets/2019/wechaty-pku-lecture-en/wechaty-pku-mdktxzs.webp).

![Liming's PKU Lecture](/assets/2019/wechaty-pku-lecture-en/pku-liming.webp)

Most of these students were born after 1995. Their growth phase itself represents a historical process where Linux open source culture entered China through the internet, germinated and spread, then developed and grew stronger, and finally led us to create our own open source projects.

![PKU Lecture Scene 2](/assets/2019/wechaty-pku-lecture-en/wechaty-pku-lecture2.webp)

Below, I'll highlight several key slides from the lecture presentation.

## Wechaty Architecture

Wechaty is a typical three-tier architecture. The top layer provides the interface, the middle layer performs abstraction, and the bottom layer connects various implementations. This is very similar to Linux's system call layer, filesystem layer, and driver layer logic and philosophy. This keeps the upper-layer application interface as consistent and stable as possible, facilitating the construction of various chatbots. The lower layer can connect different WeChat communication protocols, for example, puppeteer corresponds to the WeChat web protocol, while padpro corresponds to the WeChat iPad protocol.

![Wechaty Architecture](/assets/2019/wechaty-pku-lecture-en/wechaty-arch.webp)

## Wechaty Open Source Community Governance

Wechaty's open source community follows the organizational structure of many open source communities, including the PMC (Project Management Committee), CDG (Community Developer Group), and OC (Organizer Committee). The largest group is the developer community, which is divided into 4 levels from high to low based on project contribution and influence: Maintainer, Committer, Contributor, and Community Member. Most developers who participate and contribute code to the project make their contributions through the fork-pr-merge workflow.

![Wechaty Community Architecture](/assets/2019/wechaty-pku-lecture-en/wechaty-community.webp)

## Wechaty Community Ecosystem Governance

The community isn't just about online code commits—it also includes the Bot Friday offline activities every Friday. Each event typically has around 10-20 participants. The small scale ensures that most people have the opportunity to speak and contribute, which reflects the community organizers' emphasis on quality over quantity in their governance philosophy.

![Wechaty Bot Friday](/assets/2019/wechaty-pku-lecture-en/wechaty-bot-friday.webp)

Here's a series of numbers summarizing the Wechaty project!

![Wechaty Summary](/assets/2019/wechaty-pku-lecture-en/wechaty-summary.webp)

## Wechaty Application Case Study

The Maodou Classroom project provides children's education institutions and teachers with a fully online, real-time interactive teaching platform. It uses AI for teaching assistance and learning feedback, and provides parents with the most trustworthy and suitable courses for their children through an intelligent course recommendation engine. One component of this project is a WeChat robot that helps teachers create course reminders—the Maodou Classroom Assistant.

![Maodou Classroom Demo](/assets/2019/maodou-ketang-demo.webp)

By sending a natural language message to the Maodou Classroom Assistant, it can automatically extract the time, location, and topic, help teachers create course reminders, and push relevant course mini-programs to teachers. The basic workflow is shown in the diagram below:

![Maodou Classroom Assistant Workflow](/assets/2019/wechaty-pku-lecture-en/xzs-workflow.webp)

The code for this project is currently in [Wechaty Examples](https://github.com/wechaty/wechaty-getting-started/tree/master/examples/third-party/maodou). If you're interested, feel free to contact me. (Add my WeChat: limingth)

Recommended reading - three blog posts related to this project:

* [Implementing a Chatbot that Supports WeChat Mini Programs](https://www.bot5.ml/talks/wechaty-send-miniprogram/)

* [The Bad Part of My Chatbot Experience](https://www.bot5.ml/talks/maodou-bot-limingth/)

* [How to Send WeChat Mini Programs Using Padpro](https://wechaty.github.io/send-miniprogram-using-padpro/)

## Acknowledgments

* **[lijiarui](https://github.com/lijiarui)** for the PPT. The vast majority of the slides used in this lecture came from Li Jiarui's contributions. Without those beautiful slides that perfectly summarized all aspects of the project, I would hardly have had the courage to take the stage for this lecture.

* Thanks to Professor Zhang Qixun from PKU for providing such a great opportunity to introduce the latest developments from the open source community to a new generation of university and graduate students. After the event, over 100 students joined the Wechaty-PKU Open Source Technology Exchange group. This fresh blood will surely bring new vitality to the Wechaty project!

> Author: [limingth](https://github.com/limingth) Maodou Network

---

> 本文也有[中文版本](/2019/10/18/wechaty-pku-lecture/)。
