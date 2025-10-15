---
title: "My Exploration and Views on WeChat Bots"
author: nbwsc
categories: article
tags:
  - sdk
---

First of all, thank you to [Huan LI](https://github.com/huan) for the invitation to write this blog post. I haven't been doing research related to WeChat bots for very long, and there was a long interruption in the middle. I started in June last year and spent two months trying several versions and different methods to create a product. Then in April of this year, there was a demand in this area again, so I came back into contact with WeChat bots.

## Based on web WeChat http api lib

There are many libraries of this kind. The core of our `wechaty` is also this method, and there are implementations in various other languages:

| Project | Intro | Comments |
| :--- | :--- | :--- |
| [wechaty](https://github.com/wechaty/wechaty) | a sdk for wechat bot | The most active and powerful library |
| [itchat](https://github.com/littlecodersh/ItChat) | A complete and graceful API for Wechat. | The most popular python library |
| [wechat-go](https://github.com/songtianyi/wechat-go) | a wechat robot sdk for go | The most popular go library |
| [wechat-api](https://github.com/node-webot/wechat-api) | wechat api for nodejs | a nodejs library |

## Based on xposed

This method is to use the xposed framework to hook the WeChat client, and then expose the api. The advantage is that the api is very powerful, and the disadvantage is that it is not stable and easy to be blocked.

## Based on mac WeChat client

This method is to use the mac WeChat client to expose the api. The advantage is that the api is very powerful, and the disadvantage is that it is not stable and easy to be blocked.

## Based on windows WeChat client

This method is to use the windows WeChat client to expose the api. The advantage is that the api is very powerful, and the disadvantage is that it is not stable and easy to be blocked.

## Conclusion

I think the best way to make a WeChat bot is to use the web WeChat http api lib. It is the most stable and the most powerful.
