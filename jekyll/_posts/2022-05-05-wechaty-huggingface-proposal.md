---
title: "2022-关于开发wechaty-huggingface-pipeline的提议"
author: anaivebird
categories:
  - project
image: /assets/2022/05-wechaty-huggingface-proposal/huggingface_title.png
tags:
  - plugin
  - chatbot
  - ecosystem
---

## 关于开发wechaty-huggingface-pipeline的提议


### 一、huggingface是什么

- 一个一键化傻瓜化的NLP模型平台

- 支持16+的NLP（自然语言处理）任务，包括对话系统、自动摘要、文本分类、情感分析


![img](/assets/2022/05-wechaty-huggingface-proposal/huggingface1.png)

- 支持36000+的AI训练好的预训练模型，包括中文预训练模型

![img](/assets/2022/05-wechaty-huggingface-proposal/huggingface2.png)

### 二、Wechaty社区为什么需要huggingface的NLP能力？

- 可以让对话机器人更智能，更好玩，比如这个AI剧本杀：
- https://wechaty.js.org/2022/03/31/shezhang-bujian-le/
- 而huggingface接口可以让用户傻瓜化地使用这些AI模型

### 三、可能的实现方式

- 做一个插件，包装huggingface pipeline的API
- huggingface的API非常简单，第一步选择任务text-generation
- 第二步直接输入一句话，模型就会回复了。
- 其中pipeline有一个可选参数是model_card，可以去选择用model_hub中哪一个模型

![img](/assets/2022/05-wechaty-huggingface-proposal/huggingface3.png)

### 四、智能问答的机器人最终效果是怎么样的？

- 可以参考本段视频：https://www.bilibili.com/video/BV1G3411p7Us

{% include iframe.html src="//player.bilibili.com/player.html?aid=425000021&bvid=BV1G3411p7Us&cid=559010604&page=1" %}
- 这个机器人已经接入huggingface pipeline，只是没有碰wechaty
- 主要功能有：智能客服（只能匹配客服问题库最相近的问题）、差评自动分类识别

### 五、API是去请求调用huggingface服务器还是可以下载模型本地运算

- 模型是下载到本地的，不依赖付费API，当然也可以用他给的API

### 六、机器人运行的机器需要GPU吗？

- 可以GPU推理，也可以CPU，CPU推理速度也很快