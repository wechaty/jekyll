---
title: "利用 Dify 构建基于 GPT-4 Turbo 的智能 Agent,实现医疗微信机器人"
author: gscfwid
categories: article
tags:
  - Wechaty
  - Dify
  - GPT-4 turbo
image: /assets/2024/03-wechatbot-with-wechaty-Dify-GPT4/bp-post.webp
---

> 作者: [gscfwid](https://github.com/gscfwid/)，An anesthetist in a big ship of mainland.

大家好,我是一名医生,同时也是一个技术爱好者。今天我想和大家分享一下我最近的一个项目——利用 Dify 构建基于 GPT-4 Turbo 的智能 Agent,实现高级微信聊天机器人。

## 为什么选择微信机器人

首先,我想说一下为什么要做这个机器人。作为一名医生,我的一项重要工作是随访病人,了解他们术后的恢复情况。我们医院每年有 7-8 万的手术量,人工电话随访是非常不现实的。而且,现在运营商对电话的限制也比较严格。我发现,对于病人来说,微信可能是一个更容易接受的随访方式,因为它不会显得打扰到他们的生活。

## 为什么选择 Wechaty

然而,市面上大多数微信机器人框架都是基于 web 协议的,而目前 web 协议基本处于不可用的状态。例如,虽然 wechaty 可以利用 UOS 上保留的 web 协议,但它无法获取永久的 ID、备注、tag 等数据,这对随访工作非常不利。在尝试了 padlocal 协议后,我觉得它非常适合我的需求。

## 为什么选择 Dify

接下来,我想说一下为什么选择使用 Dify 来构建这个机器人。首先,我希望这个机器人不仅能完成随访任务,还能成为一个面向病人的医学科普机器人。随着大语言模型的爆发,这个想法变得非常容易实现。利用 wechaty 和大模型的 API,我很快就构思出了一个初步的框架。

Dify 是一个知名的大模型 Agent 平台,它对 API 的封装要比 OpenAI 官方的 API 更加友好,例如在 prompt 的构建和对话线程的保持方面。虽然 OpenAI 也可以构建 assistant,但是保持对话似乎没有那么容易。另外,Dify 平台本身也构建了一些插件,比如 Google 搜索,可以很容易集成到 API 中。因此,我最终选择了 Dify 作为我的开发平台。
以上就是我开发这个微信医疗随访机器人的一些背景和思路。作为一个医生和技术小白,我希望通过分享自己的项目经历,能给大家带来一些启发和思考。在接下来的部分,我会和大家聊聊这个机器人的一些技术细节,欢迎大家提出宝贵的意见和建议。

## 通过 Dify 创建基于 GPT-4 Turbo 的模型

Dify 提供了一个简单易用的界面,让我可以快速地创建和测试模型。
首先,我在 Dify 平台上创建了一个新的应用,并选择了 GPT-4 Turbo 作为基础模型。在这个初始阶段,我暂时没有使用任何自定义的 prompt 或插件,只是想先做一个简单的测试,看看模型的性能如何。

创建应用后,Dify 会自动生成一个 API 密钥(API key),我们可以使用这个密钥来调用 Dify 的 API 接口,与我们创建的智能对话模型进行交互。

## 使用 Wechaty 实现微信机器人

有了智能对话模型,接下来我们需要一个平台来实现微信机器人,将模型集成到微信中。这里我选择了 Wechaty。Wechaty 是一个开源的对话机器人 SDK,支持个人微信号,使用 Node.js 和 TypeScript 构建。

下面是我的代码实现,主要分为以下几个部分:

首先,我使用 wechaty-puppet-padlocal 作为 Wechaty 的 Puppet Provider,它通过 iPad 协议连接微信,相比 Web 协议更加稳定可靠。然后使用 WechatyBuilder 来构建我们的机器人实例。

```javascript
// 初始化Wechaty
const { PuppetPadlocal } = require("wechaty-puppet-padlocal");
const { WechatyBuilder } = require("wechaty");

const puppet = new PuppetPadlocal({
  token: "your_token_here",
});

const bot = WechatyBuilder.build({ puppet, name: "test" });
```

接下来调用 Dify API 的核心函数。我使用 axios 库发送 POST 请求到 Dify 的 API 端点,传入用户的输入消息、对话 ID 等参数,并通过 API Key 进行身份验证。Dify 会返回智能对话模型生成的回复。

```javascript
// 调用Dify API的函数
const difyApiKey = "your_api_key_here";
const difyApiUrl = "https://api.dify.ai/v1/chat-messages";

async function sendMessage(message, userName) {
  // ...
  const response = await axios.post(
    difyApiUrl,
    {
      inputs: {},
      query: message,
      response_mode: "streaming",
      conversation_id: conversationData.conversationId,
      user: userName,
      files: [],
    },
    {
      headers: {
        Authorization: `Bearer ${difyApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  // ...
}
```

最后,我监听 Wechaty 的 message 事件,当收到用户在群聊中@机器人的消息时,提取出消息内容,调用 sendMessage 函数获取智能回复,然后通过 room.say 将回复发送到群聊中。

```javascript
// 监听消息事件
bot.on("message", async (message) => {
  // 获取发消息人的信息
  const id = message.talker().id;
  const room = message.room();
  const userName = message.name();
  const text = message.text();
  // 判断它是否在我已经创建好的SQLite数据库中
  if (!room) {
    db.get("SELECT * FROM contacts WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error(err.message);
      } else if (row != undefined) {
        reply = await sendMessage(text, userName);
        message.talker().say(reply);
      }
    });
  }
});
```

这里需要强调的一点是，我利用 Dify API 中的 conversation_id 来实现保持对话的功能。这部分代码主要在 sendMessage 函数中:

```javascript
const conversationMap = new Map(); // 创建一个键值对来保存提问者的信息和conversation_id
const CONVERSATION_EXPIRATION = 5 * 60 * 1000; // 设定conversation的保持时间，设定为5分钟
async function sendMessage(message, userName) {
  // ...
  let conversationData = conversationMap.get(userName);
  const timestamp = Date.now();

  // 如果会话不存在或已过期,则创建新的会话
  if (
    !conversationData ||
    timestamp - conversationData.timestamp > CONVERSATION_EXPIRATION
  ) {
    conversationData = { conversationId: null, timestamp };
    conversationMap.set(userName, conversationData);
  }

  const response = await axios.post(
    difyApiUrl,
    {
      // ...
      conversation_id: conversationData.conversationId,
      user: userName,
      // ...
    }
    // ...
  );

  // 更新会话ID和时间戳
  conversationData.timestamp = timestamp;

  // ...
  // 下面的代码是由于使用了stream模式来获取Dify的response，所以我需要遍历它的每个回复，找到最终的回复内容
  for (const line of lines) {
    if (line.startsWith("data:")) {
      const data = JSON.parse(line.slice(5).trim());
      if (data.event === "agent_thought") {
        // ...
        conversationData.conversationId = data.conversation_id;
      }
    }
  }
  // ...
}
```

通过这种方式,我们可以为每个用户维护一个独立的对话上下文,实现多轮对话。当用户在一定时间内(这里设置为 5 分钟)继续发送消息时,就可以保持上下文连贯;如果超过了这个时间,就会开始一个新的对话。

接下来的设置就都是在 Dify 平台了，目前我还在制作中。我设想是上传从网络中下载的科普文章作为知识库，限定 GPT-4 只在知识库中作答。Anyway，就不属于技术讨论的范畴了。

以上就是利用 Dify 和 Wechaty 实现微信智能对话机器人的核心代码。通过 Dify 强大的对话模型和 Wechaty 方便的微信集成,我们可以快速搭建一个实用的医疗科普机器人。当然,这只是一个基础版本,我们还可以继续添加更多功能,如自定义 prompt、知识库搜索等,来进一步提升机器人的智能化水平。
