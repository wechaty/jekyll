---
title: ' "Bridge Between Backend Systems and WeChat"'
author: johnwang71
image: /assets/2020/12-bridge-between-backend-and-wechat-en/homepage.webp
categories: project
tags:
  - nodejs
  - donut
  - productivity
excerpt: >
  A minimal WeChat gateway with just over 100 lines of code, designed to bridge communication between various backend systems and WeChat using RESTful bidirectional calls.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/12/10/bridge-between-backend-and-wechat/).

Confused about communication between various backend systems and colleagues, clients, and other related parties: on one hand, backend systems are complex and diverse with numerous development languages; on the other hand, different groups have different preferences for email, SMS, etc. Relatively speaking, WeChat has a large usage rate among business people. Although WeChat provides integration methods such as official accounts, this is precisely the service method that most WeChat users will only use when absolutely necessary.

There were many plugins based on the WeChat web version before, and I tried to integrate them, but unfortunately WeChat shut down web login permissions for most WeChat users. Recently, I had the chance to discover [wechaty](https://github.com/wechaty). After reading the experience sharing of previous contributors, I immediately had the urge to participate. I followed the bot's instructions to complete registration and get a token, and started the development experience journey.

## A Super Small WeChat Gateway

Although I'm most familiar with Java, wechaty is in JS, and I happen to be doing other work with Node.js, so let's start with that. Considering the need to integrate with other systems, I wrapped wechaty into a WeChat communication gateway, designed to use RESTful bidirectional calls to decouple the gateway from backend systems. Although I've been particularly busy recently, rushing to complete it, I finally submitted a minimum viable product within the 15-day token validity period. It can meet all business needs including friend and WeChat group operations and text message interactions, with just over 100 lines of code.

Running it is also very simple, just refer to the README:
![Installation](/assets/2020/12-bridge-between-backend-and-wechat-en/00.webp)

Thanks to wechaty for providing great ideas, thanks to wechaty-puppet for providing excellent design, allowing me to stand on the shoulders of giants and quickly complete the work. Thanks to all the friends who have helped and are interested!

After a period of testing, basically no disconnections have been found, and the service is operating normally.
If you like it, please review and experience <https://github.com/johnwang71/wechaty-integration> this short code, and welcome to provide good suggestions and issues!

---

> Chinese version of this post: [bridge between backend and wechat]({{ '/2020/12/10/bridge-between-backend-and-wechat/' | relative_url }})

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/12/10/bridge-between-backend-and-wechat/).
