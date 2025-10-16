---
title: 'WeChat Marketing Group Customer Service Bot'
author: zlh
categories: project
image: /assets/2020/08-wx-group-assistant-bot-en/wx-bot.webp
tags:
  - nodejs
  - padplus
  - project
  - ecommerce
excerpt: "A WeChat group assistant bot designed to help e-commerce customer service teams monitor and manage marketing groups by detecting and removing malicious marketers using keyword blacklists and AI voice recognition."
---

Almost everyone has WeChat, and for e-commerce customer service, managing customers through WeChat groups is an important way to maintain good customer relationships. Due to the busy work of e-commerce customer service, they urgently need a bot to help them handle the heavy workload in daily WeChat group management.

A customer service representative will simultaneously manage dozens or even hundreds of groups. In addition to using existing bot functions to send marketing content in bulk regularly and connect with prospective customer inquiries, customer service representatives generally report that they spend a lot of time warning and removing malicious marketers in groups.

This situation occurs because these groups are often pulled together through offline activities (such as conferences and marketing events) by scanning QR codes. Offline customer acquisition costs are high, and these prospective customer groups often have precise targeting characteristics (for example, customer acquisition through offline mother and baby activities is basically expectant mothers). Therefore, it is easy to attract peer sales to grab customers or conduct malicious marketing, and sometimes other bots are also pulled in. Therefore, customer service responded that they need to add WeChat bots to the group to help monitor malicious marketing in WeChat groups in addition to traditional customer relationship maintenance work. Against this background, we designed this bot module to help them reduce the burden of monitoring work and focus on core business.

## Solution

Based on historical malicious marketing cases encountered by customer service, summarize keywords (such as swearing, sales order grabbing), generate a keyword blacklist, and through configuration files (supporting simple and/or, include/exclude logic), train customer service and have them maintain it regularly.

When someone in the group triggers the keyword blacklist, the bot will @ this person and issue a warning. After two warnings, if they offend again, the bot will directly kick them out of the group.

Supports recognition of text and WeChat voice, voice calls Baidu AI voice recognition interface to convert to text.

## Code Implementation

Project address: [wx-bot](https://github.com/mathsyouth/wx-bot)

## Implementation Results

Currently, customer service feedback shows that the keyword method can better identify some malicious marketing cases. Overall, it feels like it has reduced half of the previous monitoring work. However, due to occasional false positives, directly @-ing the other party can easily cause misunderstandings, so keyword configuration updates are relatively slow. Customer service responded that even if it doesn't need to be very accurate, they are quite satisfied if it can solve most of the problems.

## Next Steps

At present, the bot function is relatively simple and can only recognize based on keywords. Although customer service can already use configuration files proficiently, some customer service also responded that summarizing keywords is quite brain-consuming, and they want a smarter method to automatically recognize text on certain specific topics. Therefore, the next step is to use a deep learning language model (first using a pre-trained model of word embeddings, such as the functions provided by Baidu Cloud NLP module) to summarize and model past data. Plan to try the effect based on existing data first. If the accuracy does not meet the requirements, you can also consider not @ in the foreground directly, but remind customer service through personal WeChat in the background to avoid causing misunderstandings to customers.

In addition, customer service has also raised new requirements for marketing bots in customer profiling, which will be updated later.

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/08/29/wx-group-assistant-bot/).
