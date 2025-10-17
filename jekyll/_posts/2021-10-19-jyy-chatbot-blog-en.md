---
title: "A Gift for My Newborn Daughter: Parenting Chatbot Built with Wechaty and Semantic Open Platform"
author: jxitc
image: /assets/2021/10-jyy-chatbot-blog-en/jyy.webp
categories:
  - tutorial
tags:
  - opensource
excerpt: >
  Building a smart parenting chatbot using Wechaty and semantic analysis to automatically record baby's daily activities through WeChat, converting natural language into structured data for data-driven parenting.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/10/19/jyy-chatbot-blog/).

Recently my life has been enriched by a new daughter (Jiang Yiyi). For digital parenting, I wrote this bot that can automatically record the baby's daily routine through WeChat, storing structured parenting data to achieve data-driven parenting.
> About me: Graduated from Fudan/Cambridge Natural Language Processing group. From 2013-2018, led teams at startup Mobvoi responsible for semantic analysis algorithms and open platform development, supporting many clients including Google, JAC, WHALEY, Volkswagen, etc. Currently at WhatsApp responsible for fake news and anti-spam machine learning development. Welcome to follow my [Zhihu profile](https://www.zhihu.com/people/xjiangxjxjxjx).

## The Need: How to Raise a Baby

Newborns cannot express their needs in complete language, so as parents, in addition to passive signals like "crying", we also need to "actively record" the baby's daily behavioral and rest data to ensure healthy growth. This data includes:

- *Feeding Amount*: Newborns have relatively fixed feeding amounts in early growth (although individual differences exist), so we need to track the baby's daily feeding amount and frequency. For example, when I was developing the bot, my daughter Jiang Yiyi was exactly two weeks old. She needed to be fed about every 3-4 hours, about 6-8 times a day.
- *Diapers*: Diaper quantity is to track whether the baby has taken in enough nutrition and water daily. For example, Jiang Yiyi needs at least 6 or more wet diapers per day, otherwise it may mean insufficient water intake.
- *Sleep*: To track the baby's daily sleep situation. For instance, Jiang Yiyi needs to sleep about 15 hours a day to ensure her brain and body development. At the same time, sufficient sleep also ensures parents have enough time to watch shows and play games.

Therefore, for scientific parenting, I decided to write this WeChat bot that allows natural language input from users and automatically converts it to structured data for later analysis:

For example:

```lang-text
# Input
Jiang Yiyi drank 30 milliliters of milk at 9 AM
```

```lang-text
# Output
event: feeding
time: 2021-10-19 09:00:00
quantity: 30
```

## Technical Design: Semantic Open Platform

To extract key information from natural language text, the simple approach would be using regular expressions, for example:

```lang-text
(?<time>(上午|下午)?\d+点).*(?<event>喂奶|奶粉|睡觉|起床|拉屎|拉尿).*(?<quantity>\d+(毫升|克))?
```

But obviously using proper semantic analysis algorithms is a better choice. The semantic analysis algorithms here specifically refer to those used in task-oriented dialogue, data-driven semantic analysis algorithms based on *intent classification* (classification algorithm) and *slot extraction* (sequence labeling algorithm). For details, you can search keywords *NLU* *semantic analysis* *task-oriented dialogue*, or directly read this [popular science article](https://bbs.huaweicloud.com/blogs/detail/200427).

Compared to previous rule-based recognition, machine learning model-based algorithms have the following advantages:

1. *Broader Recognition Range*: No need for strict rule matching, with great freedom to handle different phrasings.
2. *Easy Maintenance and Extension*: Especially for complex semantic systems, the number of rules grows exponentially to become unmaintainable. With machine learning-based semantic analysis, you only need to provide annotated training text and the machine learning algorithm will automatically handle the rest.

Moreover, in 2021, basic semantic analysis has been platformized, which means:
3. No need to train models from scratch, can completely configure your own semantic analysis through graphical interfaces.
4. There are ready-made processing methods for common tasks, such as time (today, tomorrow at 9 o'clock, next Friday), measurements (thirty milliliters, 40°, one and a half meters)
5. Can also be easily extended to dialogue semantic analysis with context.

For this task, I used [Mobvoi's Semantic Open Platform](https://ai.chumenwenwen.com/pages/home). There are many other semantic analysis open platforms on the market (like Baidu, iFlytek, Facebook's wit.ai). I chose Mobvoi's platform for a simple reason - because I wrote it myself.

Specific usage methods can be found in the platform documentation. In short, I spent about 10 minutes submitting some training data and automatically got a usable semantic analysis model that supports direct HTTP GET calls. Actual call example:

```lang-text
// input: Jiang Yiyi was fed 30 milliliters

// output:
"semantic": {
    "slots": {
        "event_type": [
            {
                "prob": 0.8787958032333055,
                "index": {
                    "3-5": "喂奶"
                },
                "raw_data": "喂奶",
                "norm_value": "喂奶"
            }
        ],
        "quantity": [
            {
                "prob": 0.9999999999999982,
                "index": {
                    "6-10": "30毫升"
                },
                "raw_data": "30毫升",
                "norm_value": "30"
            }
        ]
    },
}

```

## Technical Design: WeChat Bot

Compared to the semantic open platform, the WeChat API part is relatively simple and straightforward.

I directly referenced wechaty's ding-dong-bot.js code, adding calls to Mobvoi's open platform in the ``onMessage`` function, then writing to Google Docs for data storage for later analysis. Detailed code will be updated in my [code repository](https://github.com/jxitc/jyy_bot).

However, during preliminary research, I also looked at many different WeChat code libraries, including itchat which I used before but can no longer log into personal WeChat. Apart from other methods based on dll code injection, wechaty is the only API I've tried that works. But in the long term, using personal WeChat accounts for bots is inherently risky, so I did abstraction encapsulation in code design to facilitate migration to other platforms (WeChat Official Account, WeChat Work, etc.) if personal WeChat API really becomes unusable.

## Extension: Is There Commercial Value?

This small bot itself is not very difficult. What it replaces is merely helping record some data during childcare, not even much more convenient than manual recording or Excel.

But I think the more important meaning of this project is opening up the WeChat workflow, converting everyday natural language into computer-processable structured semantics through natural language processing, which can then be used to build various automation processes.

Various intelligent customer service and RPA robot platforms were created for this vision. However, these platform tools based on general scenarios sometimes still lack flexibility to support actual scenarios.

Therefore, I want to explore through this small project a set of low-cost DIY automated workflows to replicate to more personal workflows in the future.

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/10/19/jyy-chatbot-blog/).
