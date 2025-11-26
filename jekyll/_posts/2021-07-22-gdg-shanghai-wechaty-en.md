---
title: "Wechaty: Build a Conversational UI App for WhatsApp and WeChat with 6 Lines of Code"
author: huan
categories:
  - talk
image: /assets/2021/07-gdg-shanghai-wechaty-en/community-wechaty.webp
tags:
  - gdg
  - google
  - news
---

In this week's Community Talk live stream at 8pm, GDG Shanghai invited Huan (Li Zixuan), author of the Wechaty Conversational SDK, to chat with developers on Bilibili about building chatbots with Wechaty.

![Huan Intro](/assets/2021/07-gdg-shanghai-wechaty-en/huan-intro.webp)

## Speaker

- Huan (Li Zixuan)
- Google Developer Expert (Machine Learning), author of the Conversational SDK Wechaty
- TensorFlow.js Evangelist, Angular enthusiast
- Co-author of "Chatbot from 0 to 1" and "Simple TensorFlow 2"; Creator of the GitHub 10k+ stars Conversational SDK Wechaty
- Angel investor at PreAngel, focusing on AI/Chatbot startups
- Tsinghua University, EMBA at CEIBS
- Former Zixia BBS and Shuimu Tsinghua BBS admin; former Chief Scientist at Youku

## Conversational UI Trends

How do machines evolve from "dumb" to "smart" in human-computer interaction—from punch cards to voice assistants? Interaction modalities keep simplifying, and machines understand user intent better over time.

## AI Frontiers

Huan introduced how models like GPT-3 and DALL·E generate surprisingly capable texts and images from simple natural language prompts, and discussed the role of AI in improving chatbot understanding and user experience through human-in-the-loop collaboration.

![gpt-3](/assets/2021/07-gdg-shanghai-wechaty-en/gpt-3.webp)

![dall-e](/assets/2021/07-gdg-shanghai-wechaty-en/dall-e.webp)

## Wechaty Intro

The Wechaty project started from the pain of message overload in 2014. The idea was to automate repetitive messaging tasks by letting a bot handle them.

> Wechaty is an open-source Conversational SDK for personal WeChat. It’s a Node.js application built with TypeScript that supports multiple WeChat access methods including Web, iPad, iOS, Windows, and Android, and runs on Linux, Windows, macOS, and Docker.

Wechaty helps developers build seamless conversational experiences across IM platforms. You scan a QR code to log in; choose a puppet (protocol) implementation; build your app logic; and you get a smart bot.

Wechaty supports multiple IM platforms and language SDKs:

![wechaty-puppets](/assets/2021/07-gdg-shanghai-wechaty-en/wechaty-puppets.webp)

- GitHub Repo: <https://github.com/wechaty/wechaty>
- Website: <https://wechaty.js.org>

## Live Demo

A quick demo to start a WeChat or WhatsApp bot using different puppets:

```sh
git clone git@github.com:wechaty/wechaty-getting-started.git
cd wechaty-getting-started
WECHATY_PUPPET=wechaty-puppet-wechat npm start
# or
WECHATY_PUPPET=wechaty-puppet-whatsapp npm start
```

In the demo, after logging in with a personal WeChat account in the web interface, the bot replies "dong" when it receives the keyword "ding":

![ding-dong](/assets/2021/07-gdg-shanghai-wechaty-en/ding-dong.webp)

The Wechaty open-source community has earned multiple honors, millions of downloads, and widespread influence both domestically and globally:

![awards-honors](/assets/2021/07-gdg-shanghai-wechaty-en/honors.webp)

Watch the replay:

{% include iframe.html src="https://youtu.be/q7a6x81RLA8" %}

- 00:00 Community Talk intro
- 06:27 Talk begins
- 09:25 Speaker intro
- 11:43 Conversational UI trends
- 15:11 AI frontiers
- 23:00 Conversation AI scenarios
- 26:58 Wechaty intro
- 29:40 Live Demo
- 45:26 Wechaty summary
- 47:46 Chatbot industry outlook
- 49:45 Q/A

> Bilibili: <https://www.bilibili.com/video/BV13f4y1575J>

## Slides

For slide viewing, we encourage embedding via Google Slides for faster loading on the web.

> 中文版: [Wechaty：6 行代码构建基于 WhatsApp 和个人微信的对话式人机交互界面应用](/2021/07/22/gdg-shanghai-wechaty/)
