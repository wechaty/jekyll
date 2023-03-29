---
title: "a free wechat openai qa-bot by wechaty-puppet-xp"
author: choogoo
categories: article
tags:
  - blog
  - study
  - introduction
image: /assets/2022/05-a-free-wechat-openai-qa-bot-by-xp/rare-book.webp
---

{% include iframe.html src="https://www.bilibili.com/video/BV1Y54y1f7v1?share_source=copy_web" %}

## 简介

[wechat-openai-qa-bot](https://github.com/choogoo/wechat-openai-qa-bot)使用wechat机器人快速实现一个免费的QA问答系统，如果你是一个社群工作者、拼团团长、业务群运营经理，使用这个项目可以帮助你解决解决一些重复性问答。

**前提是你有一台Windows电脑可以运行本项目。**

项目用到了一些工具和免费的轮子：

- [Wechaty](https://wechaty.js.org/) —— In just a few lines of code, you can have a fully featured
Chatbot  !  !  !

- [wechaty-puppet-xp](https://github.com/atorber/puppet-xp) —— 可能是目前最好用的免费wechat机器人

- [微信对话开放平台](https://openai.weixin.qq.com/) —— 5分钟零基础免费一键搭建智能对话机器人，并应用于微信公众号、小程序、企业网站、APP等

## 快速入门

1.clone （下载）项目代码,运行以下命令：

  ```Shell
  git clone https://github.com/atorber/wechaty-wx-openai-link.git
  ```

  考虑对git不熟悉的用户，可以在页面直接下载项目.zip到电脑上,下载后解压缩即可

  <img src="https://user-images.githubusercontent.com/104893934/167073011-7dd7b652-d384-4ac4-8adb-fba385f24981.png" width="60%">

  clone或下载解压缩之后的目录是这样

  <img src="https://user-images.githubusercontent.com/104893934/167073103-dfe07476-eb38-4bd9-9f57-2485fdb470eb.png" width="60%">

2.安装nodejs，项目的tools目录下有相应的安装包node-v16.15.0-x64.zip，解压缩并安装；下载WeChatSetup-v3.3.0.115并安装（点击下载[WeChatSetup-v3.3.0.115.exe](https://github.com/wechaty/wechaty-puppet-xp/releases/download/v0.5/WeChatSetup-v3.3.0.115.exe)）

> 特别注意目前支持的微信客户端版本为 WeChatSetup-v3.3.0.115,如果电脑上已经安装了其他版本的微信，需要卸载之后安装项目中的版本

3.安装依赖，假设当前系统为win10，在系统搜索栏中输入 powershell ，选择第一个结果

<img src="https://user-images.githubusercontent.com/104893934/167073290-2dbbf1b8-68fd-4588-b583-5336e934affc.png" width="60%">

打开Windows PoweShell

<img src="https://user-images.githubusercontent.com/104893934/167073308-d39df0f2-3709-4299-815a-6f4af7bd6c51.png" width="60%">

到项目目录下用鼠标点击地址栏复制文件路径，例如我当前的路径为 C:\Users\wechaty\Documents\GitHub\wechaty-wx-openai-link

<img src="https://user-images.githubusercontent.com/104893934/167073318-850e2388-fa14-466a-96dd-132c0d6eddb1.png" width="60%">

在复制如下命令在Windows PoweShell中执行

```Shell
cd C:\Users\wechaty\Documents\GitHub\wechaty-wx-openai-link
npm install
```

4.微信对话开放平台注册，访问[https://openai.weixin.qq.com/](https://openai.weixin.qq.com/)，导入示例数据及获取token

> 示例问答中的 xxx@chatroom 为你需要引入QA的群，此处特别注意，必须在回答中以 **QA+xxx@chatroom+回答内容** 才能达到在不同的群内有不同回答的效果

扫码登陆

<img src="https://user-images.githubusercontent.com/104893934/167073158-cd9ae604-f3a5-4f32-8bae-a719e945cfd8.png" width="60%">

填写机器人信息

<img src="https://user-images.githubusercontent.com/104893934/167073177-555d84c3-c7cb-4d05-a6b4-69fe82c8ce64.png" width="60%">

批量导入问答

<img src="https://user-images.githubusercontent.com/104893934/167073422-88ca1ad2-f364-45b2-a33e-256213e93ac1.png" width="60%">

选择项目中tools目录下的示例问答

<img src="https://user-images.githubusercontent.com/104893934/167073438-5e631b72-b9a6-4727-b980-49a851654224.png" width="60%">

上传问答

<img src="https://user-images.githubusercontent.com/104893934/167073484-3dcb48fa-b85d-4b57-9036-9ba5e9b76781.png" width="60%">

导入成功后问答列表

<img src="https://user-images.githubusercontent.com/104893934/167073492-20c382bd-427c-4a16-84c7-1ae28fe5e83c.png" width="60%">

上线发布

<img src="https://user-images.githubusercontent.com/104893934/167073510-bc4f2f59-97a9-4b31-b192-0f7b83e467dc.png" width="60%">

发布成功

<img src="https://user-images.githubusercontent.com/104893934/167073537-ba9d5d50-c29d-46cf-aba5-8105a5d9686f.png" width="60%">

应用绑定，获取token

<img src="https://user-images.githubusercontent.com/104893934/167073557-022bae19-8092-4909-8d33-d11466b266b2.png" width="60%">

填写申请信息，提交后马上就会审核通过

<img src="https://user-images.githubusercontent.com/104893934/167073582-a38f19f0-0610-4c84-80cc-ef8fab4e9938.png" width="60%">

开通成功，复制token备用

<img src="https://user-images.githubusercontent.com/104893934/167073600-02b5d7ef-da79-49ea-9c64-84182f3dc517.png" width="60%">

5.启动系统，在获取token之后，准备启动系统

> 替换自己的微信对话开放平台token，如果set环境变量失败，可以尝试在index.ts中直接设置WX_TOKEN

```Shell
set WX_TOKEN=5jr7a*************************4u8B
npm run start
```

顺利的话，恭喜你已经拥有一个QA机器人，接下来你需要在简单问答中继续导入你需要的问答内容

不顺利的话...请截图留言...

## 效果

- 程序运行成功

<img src="https://user-images.githubusercontent.com/104893934/167073620-ef370d68-66be-4cd5-bd0f-d4e43b7d2917.png" width="60%">

- 问答

<img src="https://user-images.githubusercontent.com/104893934/167064460-5e88dcaf-32c8-464f-9fe1-1b9efb272cd7.png" width="60%">

## 最佳实践

如果你对以上操作感觉困难而不能使用，添加ledongmao微信，提供你需要的问答清单，我们可以提供一个免费的机器人供体验

当然，最好的反馈方式是在这里 [https://github.com/choogoo/wechat-openai-qa-bot/issues](https://github.com/choogoo/wechat-openai-qa-bot/issues) 提交一个issues

## 二次开发

此项目只是提供了一个简单的使用微信机器人和智能对话平台实现的QA系统。如果有兴趣，可以继续学习微信对话开放平台的高级技能，实现诸如连续问答等高级功能，欢迎贡献你的创意。

此外要说明的是，项目中使用puppet-xp完全是出于免费的考虑，如果不靠这一点的话，wechaty还有更好用的puppet，对于二开来说可以根据实际情况替换。

> 历史文章

- [Wechaty+微信小程序实现群内活动报名](https://wechaty.js.org/2021/03/17/node-wechaty-and-wechaty-puppet-padlocal/)
