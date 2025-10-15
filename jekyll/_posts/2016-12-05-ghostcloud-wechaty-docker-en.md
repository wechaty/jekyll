---
title: 'Running Wechaty WeChat Bot Framework with Docker'
author: shevyan
categories: tutorial
tags:
  - code
  - docker
excerpt: "Learn how to use Docker to run Wechaty WeChat bot framework, from basic setup to deployment with GhostCloud EcOS"
image: /assets/2016/12-ghostcloud-wechaty-docker-en/ghostcloud-banner.webp
---

Wechaty (<https://github.com/wechaty/wechaty>) is an open-source WeChat SDK. Based on WeChat's public APIs, it wraps interfaces in a series of encapsulations, providing a series of simple interfaces for developers to build WeChat bots. After communicating with the author and testing it, I found many application scenarios, such as:

1. If you have many friends, how to manage and maintain friend groups;
2. How to quickly and orderly process massive chat information and distinguish importance;
3. How to handle massive chat groups, especially since WeChat allows creating groups at will, resulting in many chat groups over time;
4. Whether automatic intelligent chat replies are possible;
5. And more...

* Author: @[shevyan](https://github.com/shevyan) Yan Dong (晏东), Founder & CEO of [GhostCloud](https://www.ghostcloud.cn/)
* Original article: <http://mp.weixin.qq.com/s/o-4VMcAMz0K8yJVdNaUXow>

![GhostCloud Banner][ghostcloud-banner]

## 1 Quick Start

Wechaty is written in Node.js, so it supports almost all platforms. Wechaty's hello-world only requires 6 lines of code to implement dynamic chat record collection. For convenience, the author has also provided Docker packaging, making Docker an excellent choice.

Step 1: Create a new mybot.js file with the following content:

```javascript
import { Wechaty }  from 'wechaty'

Wechaty.instance() // Singleton
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',       user => console.log(`User ${user} logined`))
.on('message',  message => console.log(`Message: ${message}`))
.init()
```

Step 2: Run the command on the host machine

```shell
docker run -ti --rm --volume"$(pwd)":/bot zixia/wechaty mybot.js
```

Step 3: Copy the QR code to your browser

![QR Code][ghostcloud-qrcode]

Step 4: All chat records will be printed to the screen

![Message][ghostcloud-message]

## 2 Containerization Analysis

Wechaty is a good example of Docker implementation. The Dockerfile in the project root directory describes in detail how to build the image, including what environment is needed. From the Dockerfile, we can see it uses the Node.js image mhart/alpine-node:7 based on Alpine as the base image.

Alpine is generally recommended for daily use - the smallest version is only about 4MB. This is followed by installation of some common packages, which you can see in detail in the Dockerfile. At runtime, mybot.js is mapped to the container interior, effectively isolating the runtime environment from the specific application.

## 3 Other Examples

Hello-world is usually just the simplest example. The real power of this framework lies in other use cases included at <https://github.com/wechaty/wechaty/tree/master/example>

These include:

1. api-ai-bot.ts: Calls api.ai for artificial intelligence recognition
2. contact-bot.ts: Lists friends' WeChat IDs and names
3. ding-dong-bot.ts: An auto-reply example - if a friend inputs 'ding', automatically replies 'dong'
4. friend-bot.ts: Examples of adding friends, approving additions, and message verification
5. media-file-bot.ts: Examples of various message types, saving media files locally
6. room-bot.ts: A series of chat group examples, including finding, adding, deleting, changing topics, monitoring group events, etc.
7. speech-to-text-bot.ts: When receiving voice messages, calls third-party interfaces to convert to text. Users can choose different speech recognition APIs based on needs
8. tuling123-bot.ts: An example of domestic robot integration

Careful friends might ask: can this framework support dynamic red packet grabbing? This is left for interested friends to research. We will also share introductions to other open-source projects in the future.

## 4 Deploying Wechaty through GhostCloud EcOS

EcOS (Enterprise container Operation System) is a Docker container cloud platform independently developed by GhostCloud, providing enterprises with a complete solution and management platform for R&D, operations, and new business deployment. Through EcOS, users can quickly install Docker in private cloud and hybrid cloud environments. Official website: www.ghostcloud.cn

GhostCloud EcOS installation steps:

1. Access <http://ecospkg.ghostcloud.cn/EcOS/stable/> in your browser, download the latest installation file (EcOS-install*) and service image file (srvimgs.tgz) to the root directory of the server to be installed
2. Extract the installation file and execute the installation script: tar -zxf Ecos-install* && bash install.sh IPADDR (where IPADDR is the IP address of the server where EcOS is installed)
3. Extract the service image file and execute push image operation: tar -zxvf srvimgs.tag && ./srvimgs/pushimgs.sh
4. For detailed installation steps, please go to: <http://ecospkg.ghostcloud.cn/EcOS/video/EcOS_Install.mp4>

Deployment

1) Create Wechaty Service

Create a Wechaty container through the EcOS platform (see <http://ecospkg.ghostcloud.cn/EcOS/video/EcOS_Contianer.mp4> for specific container operations)
Select image wechaty:latest, set startup creation to yes, and appropriately increase memory capacity (memory allowed for container use)

1) Monitor Wechaty Container Logs

Use putty or other SSH client tools to log into the host machine where the Wechaty container was created, and execute:
docker logs -f wechaty

![Log][ghostcloud-log]

Scan the QR code in the logs or copy the URL address to your browser to scan, then use WeChat normally. You can see related information in the terminal.

[ghostcloud-banner]: /assets/2016/12-ghostcloud-wechaty-docker-en/ghostcloud-banner.webp
[ghostcloud-log]: /assets/2016/12-ghostcloud-wechaty-docker-en/ghostcloud-log.webp
[ghostcloud-message]: /assets/2016/12-ghostcloud-wechaty-docker-en/ghostcloud-message.webp
[ghostcloud-qrcode]: /assets/2016/12-ghostcloud-wechaty-docker-en/ghostcloud-qrcode.webp

> Author: [Yan Dong (晏东)](https://github.com/shevyan), Founder & CEO of GhostCloud

---

> 中文版: [Docker玩转微信机器人框架Wechaty](/2016/12/05/ghostcloud-wechaty-docker/)
