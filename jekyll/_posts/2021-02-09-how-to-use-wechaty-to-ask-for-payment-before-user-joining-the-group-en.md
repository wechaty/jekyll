---
title: "Building a Paid Private Domain Traffic Assistant Using Micro Merchants + Wechaty"
author: rixingyike
categories: project
tags:
  - group
  - payment
  - tutorial
  - case-study
  - ecommerce
  - productivity
image: /assets/2021/02-how-to-use-wechaty-to-ask-for-payment-before-user-joining-the-group-en/paying-by-qrcode.webp
excerpt: "A WeChat bot that automatically accepts friend requests, collects payments, and adds users to groups based on keywords - all within WeChat."
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/02/09/how-to-use-wechaty-to-ask-for-payment-before-user-joining-the-group/).

There has always been a demand in the private domain traffic operation field: automatically accept friend requests, and after new friends pay a certain fee, add them to the corresponding WeChat group based on the keywords they send. Keywords correspond to WeChat groups, and WeChat groups can be automatically expanded when full.

Some people have thought of this solution: first let potential users add a human customer service WeChat, transfer money or scan to pay, and after manual verification, then add them to the group. But this method has high labor costs, and high labor costs mean higher group entry prices.

There is also an alternative method, using a micro mall, letting users self-complete payment in the mall, then sending users a four-digit verification code through a hook setting, which is virtual delivery. After completing this step, guide users to add the robot assistant WeChat with the verification code. After the robot assistant receives the verification code, it first verifies the order authenticity in the database, and after verification, adds people to the group.

This solution looks quite good, but there are still big problems. In a nutshell, it's too complicated. It requires a database, a micro mall, etc., and high deployment costs will naturally push up group entry prices. Some people might also think of using Knowledge Planet or similar products. This product is indeed great, but sometimes we just want to gather private domain traffic in WeChat. What should we do?

Is it possible to have such a simple solution: after the robot assistant automatically accepts friends, based on the keywords sent by new friends, it autonomously determines whether payment is needed. If needed, it sends a payment QR code to the new friend. After the new friend completes the scan payment, it automatically adds them to the WeChat group. The entire process has no third-party jumps and is completed entirely within the WeChat window. Also, the entire solution does not involve web services, database services, etc. It only requires deploying a WeChat robot.

The answer is yes, so the author wrote this open source project. I named it: A Paid Private Domain Operation Assistant Built Using Micro Merchants + WeChat Chatbot.

This is an experimental small project, not yet perfect, but feasibility is there. It can run completely, and received payments will automatically be transferred to personal WeChat cards. I hope this project can inspire you, but no technical guarantees or usage promises are provided.

This project is implemented based on WeChat Micro Merchants + Wechaty and draws from [Wechaty's example code](https://github.com/wechaty/wechaty-getting-started).

Next, let's introduce what needs to be prepared, how to use it, and at the end there is a video recorded by the author for you to quickly view the project's interaction effects.

## Main Features

Main supported functional interaction commands:

- Apply to join xx group, can join the group, replace xx with specific keywords, such as calligraphy
- `#Query 2021xxx`, used to query old orders, if paid can be added to the group
- Designated administrators can use group message commands like `@xxx Don't send` to make the bot kick someone out

## Usage Preparation

Before use, you need Wechaty's `token` and the Micro Merchant's `MCHID` and `SECRET`. The former can be purchased [here](https://qiwei.juzibot.com/corpPremium/wechaty) in the form of monthly rental payment. The latter is applied for [here](https://pay.xunhuweb.com/), it is a one-time payment, open to individuals.

After getting the startup materials, you need to configure system variables in local `bash`:

```bash
export WEPAY_MCHID=xxx
export WEPAY_SECRET=xxx
export WECHATY_PUPPET_HOSTIE_TOKEN=xxx
```

This is the configuration for `Linux/Mac`. On `Windows`, you need to modify the configuration method yourself.

## How to Start

Startup:

```bash
git clone https://github.com/rixingyike/wechat-operation-assistant.git --depth=1
cd wechat-operation-assistant
npm i
npm run serve
```

## Testing the Waters Version

Version: [v1.0](https://github.com/rixingyike/wechat-operation-assistant/releases/tag/v1.0)

Of course, this version still has some problems. For example, the robot assistant manages administrator permissions based on nicknames, which has vulnerabilities. The `Contact` object in `Wechaty` has an `alias` method that can set/get contact remarks. You can use this method instead of `name` to verify administrator permissions.

Subsequently, the author may continue to improve this project. If you have any suggestions, feel free to raise them, and PRs are also welcome.

## Usage Video

{% include iframe.html src="https://youtu.be/Rujwzt0B9K8"%}

February 09, 2021

> Author: [Programmer LIYI](https://yishulun.com), first published on the public account: [A Small Intelligent Robot: Automatically Adds People for Us, Automatically Verifies Payments, Automatically Transfers Receipts to Personal Bank Cards](https://mp.weixin.qq.com/s/TUKmK7IgJElECt7hNq5QEA). The following content has been modified when republished.

---

> Chinese version of this post: [how to use wechaty to ask for payment before user joining the group]({{ '/2021/02/09/how-to-use-wechaty-to-ask-for-payment-before-user-joining-the-group/' | relative_url }})
