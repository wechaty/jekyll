---
title: "RICEPO Authentic Chinese Food Delivery in North America"
author: areigna
categories: event
tags:
  - meetup
image: /assets/2019/12-wechaty-north-america-ricepo--en/logo.webp
---

## Content Outline

* RICEPO Introduction
* Application of Wechaty in RICEPO
* Wechaty+SQS Overall Architecture

## RICEPO Introduction

RICEPO is the largest authentic Chinese food delivery platform in North America. It was founded in 2013 and is headquartered in Silicon Valley. RICEPO is committed to providing the most authentic Chinese food to overseas Chinese.

## Application of Wechaty in RICEPO

We use Wechaty to build a chatbot that can help us manage our delivery fleet. The chatbot can help us to:

* Assign orders to drivers.
* Track the location of drivers.
* Send reminders to drivers.
* Collect feedback from drivers.

## Wechaty+SQS Overall Architecture

We use Wechaty and SQS to build our chatbot. The overall architecture is as follows:

1. The user sends a message to the chatbot.
2. The chatbot receives the message and sends it to SQS.
3. A worker process receives the message from SQS and processes it.
4. The worker process sends the result back to the chatbot.
5. The chatbot sends the result to the user.

## Conclusion

Wechaty is a powerful tool for building WeChat bots. It can be used to build a chatbot that can help us manage our delivery fleet. I believe that in the future, Wechaty will become more and more popular.
