---
title: ' "Creating a Rebate Robot Using Wechaty"'
author: jiangxiaotao1024
categories: project
tags:
  - ecommerce
image: /assets/2020/12-automatic-rebate-robot-en/taokouling.webp
excerpt: >
  An e-commerce rebate robot built with Wechaty (TypeScript frontend) and Java backend, automatically identifying Taobao command codes and returning rebate links with multi-level commission distribution.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/12/28/automatic-rebate-robot/).

## Implemented Features

1. Automatically identifies Taobao command codes (淘口令) when sent and returns a rebate link
2. After payment through the rebate link, the user receives the estimated rebate amount
3. When the order transaction is completed, the user's account balance is increased, and they receive a notification of the added amount and balance. Upper-level agents and second-level agents also receive corresponding commissions

### Implementation Method

The frontend uses the TypeScript version of wechaty to interact with users. The backend uses the Java version of Dataoke SDK, with MySQL as the database. The frontend imports JAR packages in TypeScript to call backend interfaces.

## Defects

1. Cannot identify friend referrers, so when receiving friend requests, agent information needs to be manually added to the database
2. Cannot identify which user initiated the transaction order, so a PID needs to be added for each user

## Friend Module

After accepting a friend request, set the friend's remark to their wxid for easy lookup later

## Message Module

Parse received text information and return corresponding information. If the API call cannot identify the product ID, no rebate link is returned; if the product ID is identified but there's no discount information, return "no discount"; if there's discount information, return the rebate link.

![help](/assets/2020/12-automatic-rebate-robot-en/help.webp)
![chaxun](/assets/2020/12-automatic-rebate-robot-en/chaxun.webp)
![tixian](/assets/2020/12-automatic-rebate-robot-en/tixian.webp)
![zhuanqian](/assets/2020/12-automatic-rebate-robot-en/zhuanqian.webp)
![taokouling](/assets/2020/12-automatic-rebate-robot-en/taokouling.webp)

## Order Query Module

After login, trigger a 10-second timer that queries order transaction information for this period every 10 seconds. Parse out the discount information and PID of successfully paid orders. Query the corresponding wxid based on the PID and send estimated commission information to that wxid user. For successfully paid orders, send commission information to the user, and simultaneously send rebate information to upper-level and second-level agents according to the proportion.

---

> Chinese version of this post: [automatic rebate robot]({{ '/2020/12/28/automatic-rebate-robot/' | relative_url }})

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/12/28/automatic-rebate-robot/).
