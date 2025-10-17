---
title: "Teaching You to Develop Bots with python-wechaty and Web Protocol"
author: wj-mcat
categories: article
tags:
  - code
  - wechaty-puppet-wechat
  - web-protocol
  - python
  - featured
  - ecosystem
image: /assets/2021/04-python-wechaty-use-web/wechaty-love-wechaty-desktop.webp
excerpt: >
  Detailed guide on using python-wechaty with web protocol to develop chatbots, including Docker setup for web protocol service and connecting with python-wechaty to build functional bots.
---

The reason for writing this article: [dchaofei](https://github.com/dchaofei), the author of go-wechaty, was first to write the [blog about web protocol revival](https://wechaty.js.org/2021/04/16/go-wechaty-use-web/). As the author of [python-wechaty](http://github.com/wechaty/python-wechaty), I also need to give everyone a more detailed introduction on how to use [python-wechaty](http://github.com/wechaty/python-wechaty) to log in to the web version of WeChat.

## 1. Introduction

There are many types of WeChat bots with various protocols, such as iPad, Mac, and Windows protocols, but the earliest to appear was actually the web protocol. In previous years, due to some restrictions from Tencent, the web login permissions for most users were shut down, causing many web protocol WeChat bots to die directly, such as the famous itchat.

However, since UOS and Tencent jointly launched the desktop version of WeChat, web version bots have been revived in a certain way, and Wechaty is one of the earliest open source projects to address this issue. Next, I will introduce in detail how to use [python-wechaty](http://github.com/wechaty/python-wechaty) to develop chatbots based on the web protocol.

The overall steps are divided into two parts:

* Use Docker to start the web protocol service
* Use python-wechaty to connect to the service

The first step exposes the web protocol as a gRPC service. The process is very simple, you just need to pay attention to a few configuration items. The second step is to use python-wechaty to connect to the service and develop chatbots.

## 2. Starting the Web Protocol Service

The script to start the web protocol service is as follows:

```shell
docker pull wechaty/wechaty:latest

export WECHATY_LOG="verbose"
export WECHATY_PUPPET="wechaty-puppet-wechat"
export WECHATY_PUPPET_SERVER_PORT="8080"
export WECHATY_TOKEN="python-wechaty-uos-token"

docker run -ti \
--name wechaty_puppet_service_token_gateway \
--rm \
-e WECHATY_LOG \
-e WECHATY_PUPPET \
-e WECHATY_PUPPET_SERVER_PORT \
-e WECHATY_TOKEN \
-p "$WECHATY_PUPPET_SERVER_PORT:$WECHATY_PUPPET_SERVER_PORT" \
wechaty/wechaty:latest
```

When testing locally, `WECHATY_PUPPET_SERVER_PORT` and `WECHATY_TOKEN` are relatively flexible and can be set at any time, because the connection in the next step can be set to local connection.

When deploying on a server, `WECHATY_PUPPET_SERVER_PORT` needs to ensure that the port on the server is kept open to ensure that `python-wechaty` can connect normally. Additionally, `WECHATY_TOKEN` will be used to register the started service in the wechaty token center, so that [python-wechaty](http://github.com/wechaty/python-wechaty) can find the service address. Therefore, it must be changed to a unique identifier. It is recommended to use `uuid` instead of `python-wechaty-uos-token`.

## 3. Using python-wechaty to Connect to the Service

The simplest chatbot developed in Python is shown in the following code:

```python
# bot.py
from wechaty import Wechaty
import os

import asyncio
async def main():
    bot = Wechaty()
    bot.on('scan', lambda status, qrcode, data: print('Scan QR Code to login: {}\nhttps://wechaty.js.org/qrcode/{}'.format(status, qrcode)))
    bot.on('login', lambda user: print('User {} logged in'.format(user)))
    bot.on('message', lambda message: print('Message: {}'.format(message)))
    await bot.start()

asyncio.run(main())
```

When testing locally, you can set the `WECHATY_PUPPET_SERVICE_ENDPOINT` environment variable to have `python-wechaty` connect directly to the local web service. For example: `WECHATY_PUPPET_SERVICE_ENDPOINT=127.0.0.1:8080`. The script to run is as follows:

```shell
WECHATY_PUPPET_SERVICE_TOKEN=python-wechaty-uos-token WECHATY_PUPPET_SERVICE_ENDPOINT=127.0.0.1:8080 python bot.py
```

When deploying on a remote server, you only need to set `WECHATY_PUPPET_SERVICE_TOKEN` to connect to the started web service. The script to run is as follows:

```shell
WECHATY_PUPPET_SERVICE_TOKEN=python-wechaty-uos-token python bot.py
```

## Summary

python-wechaty is a very simple chatbot framework that can theoretically interface with any IM platform. It has native AI integration capabilities and can quickly develop powerful chatbots. Everyone is welcome to follow [python-wechaty](https://github.com/wechaty/python-wechaty).

## Related Links

* [python-wechaty](https://github.com/wechaty/python-wechaty)
* [python-wechaty getting started](https://github.com/wechaty/python-wechaty-getting-started)
* [Web protocol revival](https://wechaty.js.org/2021/04/13/wechaty-uos-web/)
* [Python Wechaty Getting Started](https://wechaty.js.org/docs/polyglot/python/)
* [puppet-providers](https://wechaty.js.org/docs/puppet-providers/wechat)

> Author: [wj-mcat](https://github.com/wj-Mcat), Natural Language Processing Algorithm Engineer, python-wechaty author

---

> 本文也有[中文版本](/2021/04/17/python-wechaty-use-web/)。
