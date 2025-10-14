---
title: 'How to Build a Chatbot'
author: lijiarui
categories: tutorial
tags:
  - talk
  - featured
  - tutorial
  - development
image: /assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-7.webp
excerpt: A comprehensive guide to building chatbots from the founder of Juzi Interactive, covering the evolution from PC to web to mobile apps to chatbots, and practical implementation using Wechaty framework.
---

> Chatbot is a computer program for chatting with human users. It represents an interaction revolution and a multi-technology integration platform. The founder of Juzi Interactive shares her experience on how to build WeChat chatbots.

## What are chatbots and why the hype

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-1.webp)

Back in the 80s, people commonly used PCs to access the internet, and all online interactions were implemented through PC clients. As internet speeds became faster and faster, browsers began to proliferate.

After smartphones appeared, people spent less and less time using computers, while installing more and more apps on their phones.

Now we've entered the era of chatbots. All bots are built on messaging platforms to implement all the services that were previously on apps.

I think official accounts, direct access accounts, and H5 pages were all early prototypes of chatbots. Apps really make users too anxious - everyone hopes for a program that can quickly and simply find services.

Because data, computing power, and internet speeds are all developing rapidly, many interesting applications and services will appear on messaging apps, just like the transition from PC to web, and from apps to chatbots.

I believe chatbots are the future, and all upcoming services might be implemented through chatbots.

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-2.webp)

Matt Schlicht, founder of Chatbot Magazine, defines chatbots as: "A chatbot is a service, powered by rules and sometimes artificial intelligence, that you interact with via a chat interface."

Chatbots are services driven by rules and some artificial intelligence, interacting through chat interfaces.

The way we interact has undergone new changes - we can now implement all functions through speech. In the web and app era, humans had to think like computers, while chatbots make computers think like humans, achieving "no UI."

Today's users don't like using apps because not only are the download costs high for users, but app development and upgrade costs are also very high, and only a very small number of apps remain active.

Bots are built on messaging platforms, require no installation, and can even access services when network conditions are poor. Chatbots exist in a "no UI" state. If you only focus on the logical level to solve scenario-based problems, development costs won't be very high.

## Overview of the bot ecosystem

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-3.webp)

Facebook Messenger has already opened to developers, Apple iOS Message Apps is also opening up, and Slack, Kik, Telegram, and Skype all support related APIs.

Facebook acquired Wit.ai, Google acquired Api.ai, and Microsoft launched luis.ai. I think these three all implement the same function - intent recognition.

Microsoft also has a Bot Framework for the entire chat control system, and IBM launched Watson Conversation API.

Facebook Messenger has over 100,000 bots, with approximately 100,000 developers developing these bots on Facebook Messenger.

Over 2 million users interact with chatbots daily.

On other platforms like Skype and Telegram, there are also thousands of bots.

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-4.webp)

Chatbots that consumers can actually encounter fall into roughly three categories:

The first category is personal assistants that help users implement various services.

The second category is virtual customer service that provides corresponding answers based on user questions.

The third category is productivity tools that can collect information, distribute messages, and other tasks.

Chatbots are a huge industry. It's not just about AI and deep learning, doesn't necessarily require high tech, and isn't only about algorithms. It's about truly solving practical problems. In the future, they'll be around us like apps, providing very simple services.

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-5.webp)

Requirements are similar to normal software development - writing requirement documents and specifications.

When developing software or apps, you create wireframes or flowcharts. Since chatbots are a "no UI" experience, you need to write scripts, understand how to collect user information, how to understand users, and organize these user conversations. It's like a wireframe concept for communicating with users.

Next comes architecture development, which is also divided into frontend and backend. The frontend is the script, collecting user information more completely. After collection, it's made into an action for the backend to integrate with other web services.

When developing chatbots, you often fall into repeated cycles of coding and testing because the interaction isn't structured data, making it somewhat complex.

Testing in chatbots is different from general app testing. In apps, you can do simple, brute-force testing, but in chatbots, different messages have different requirements or limitations. When testing, you need to understand the differences between different messaging platforms.

You need to deploy to a hostable environment and constantly monitor it, then do promotion.

Finally, you need to do chatbot analytics - knowing what each conversation duration is like and what users are most interested in. After getting this data, research user needs again, forming a cycle.

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-6.webp)

Chatbots mainly start from scenarios, focusing more on solving problems and innovation points rather than underlying development. I think various developers will also transition from app developers to chatbot developers - it's just a matter of time.

## How to Build a Chatbot with Wechaty

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-7.webp)

Wechaty is an interface that can turn WeChat into a robot. Using this framework, you can turn personal WeChat accounts into robots that can automatically reply and provide services.

Wechaty's implementation principle is mainly monitoring information on web pages, encapsulating the information and providing it for developers to call. When developers send information, the browser implements these functions.

The side project uses code tracking to handle WeChat web page changes.

Wechaty's seven basic events are error, scan, login, logout, message, friend, and join.

![wechaty](/assets/2017/07-how-to-build-a-chatbot-en/itdakashuo-how-to-build-a-chatbot-8.webp)

## Related Scenarios

We've already implemented WeChat group CRM management, inviting friends to groups through various methods, and doing multi-group live broadcasts.

There are also some interesting things we want to share with everyone:

Selecting the most attractive avatar for WeChat. By analyzing user like counts, determine which avatars are most popular among males and females respectively, helping users choose WeChat avatars.

File storage. Connecting WeChat with cloud storage, allowing users to directly transfer files received on WeChat to robots, which store them in cloud storage.

Generating beautiful images from lyrics. Booking flights, train tickets, hotels, etc. GitHub notifications. Sending real-time updates that users follow to WeChat groups, connecting WeChat groups with information from various platforms, and collecting group messages for analysis and training.

Chatbots are indeed tools that can help us solve many problems in life, and any developer can implement them.

---

---

> Chinese version of this post: [零基础小白如何搭建聊天机器人]({{ '/2017/07/13/how-to-build-a-chatbot/' | relative_url }})
