---
title: "Community meeting: generate Wechaty code with LLM & FLAML"
author: huan
categories: event
tags:
  - llm
  - code-generation
image: /assets/2023/06-flaml-code-generation-llm/bot-coding.webp
---

FLAML (Fast Library for Automated Machine Learning, <https://github.com/microsoft/FLAML>) is a lightweight Python library for efficient automation of machine learning and AI operations, including selection of models, hyperparameters, and other tunable choices of an application (e.g., inference hyperparameters for foundation models, configurations in MLOps/LMOps workflows, pipelines, mathematical/statistical models, algorithms, computing experiments, software configurations).

It has a very interesting blog post: [Achieve More, Pay Less - Use GPT-4 Smartly](https://microsoft.github.io/FLAML/blog/2023/05/18/GPT-adaptive-humaneval) tells us a case study using the HumanEval benchmark shows that an adaptive way of using multiple GPT models can achieve both much **higher accuracy (from 68% to 90%)** and **lower inference cost (by 18%)** than using GPT-4 for coding.

As our Wechaty community is working on a chat project (<https://wechaty.js.org/chat>) for helping our open-source community developers to not only easily get answer of documentations, but also can ask for generated codes by just telling system their chatbot requirements, as the following screenshot demostrated:

> Write a chatbot on WeChat using Wechaty SDK v1.x (with `WechatyBuilder`) to monitor a room with the following features:
>  
> 1. When a user sends a text message to the bot, if the text is "Room A", then add the user to the "Room A" group; if the text is "Room B", then add the user to the "Room B" group;
> 1. When a user sends an ad message to the "Room B" group:
>     1. for the first time, send a warning message to them;
>     1. for the second time, remove the user from the room;

![Wechaty Chat](/assets/2023/06-flaml-code-generation-llm/wechaty-chat-llm-code-generation.webp)

## Wechaty Community Meeting with Author of FLAML

In this meeting, we invited Chi Wang, the author of FLAML, fireside chat with Tianwei Yue from Wechaty community LLM project.

{% include iframe.html src="https://youtu.be/tTOWr8eE6Bc" %}

> image credit: [The New Open Source LLM that Can Generative Code in Over 80 Programming Languages](https://pub.towardsai.net/inside-starcoder-the-new-open-source-llm-that-can-generative-code-in-over-80-programming-languages-12aab76800da)
