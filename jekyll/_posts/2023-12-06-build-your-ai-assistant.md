---
title: "构建一个属于你自己的 AI 对话机器人"
author: zhengxs2018
categories: article
tags:
  - blog
  - agent
image: /assets/2023/11-build-your-ai-assistant/1.webp
---

本文将分享使用 WeChaty 和 OpenAI 开发微信机器人的经验，包括如何处理对话上下文、过滤消息、快速回复等方面，希望能给开发者带来一些启示和帮助。

## 一、创建机器人

我们接入 AI 的之前，需要过滤掉 AI 无法处理，或不需要处理的消息。

拿群消息举例，因为微信不支持富文本消息，而其他格式的消息无法带 @，如果都处理，很明显就 AI 这种需要上下文，并且存在速率限制的，一定会崩。

微信每次启动就会同步最近的消息过来，过滤历史消息是因为可能已经回复过。我在 `puppet-wechat4u` 中有看到 [startTime][startTime] 属性用于过滤此类消息，但不知道为什么还会存在此问题，原因待查。

微信中还有如 **微信团队** 等内置的微信功能，也会发送消息过来，比如异常登录，首次登录的欢迎语等，这种很明显不需要处理。

所以我们需要过滤掉：

- 启动时同步过来的历史消息
- 群聊中，非文本并且非被提及的消息
- 非真实好友的消息
- 其他 AI 无法处理的消息
- 等等

```js
// 机器人启动时间
let startupTime = new Date();

bot.on("login", () => {
  startupTime = new Date();
});

bot.on("message", async (message) => {
  // 忽略每次启动前的消息
  if (startupTime > message.date()) return;

  const talker = message.talker();
  const ContactType = message.wechaty.Contact.Type;

  // 忽略非好友消息，如微信团队发送的消息
  if (talker.type() !== ContactType.Individual) return;

  const room = message.room();

  // 如果是群消息
  if (room) {
    // 但是没有提到自己，则忽略
    if (!(await message.mentionSelf())) return;

    // 微信的 @ 只支持文本，所以不用判断其他格式
    // 但微信的消息会带 @文本，所以需要额外的处理

    // 询问 AI 处理...

    return;
  }

  const MessageType = wechaty.Message.Type;
  const msgType = message.type();

  // 文本直接处理
  if (msgType === MessageType.Text) {
    // 询问 AI 处理...

    return;
  }

  // 可根据接入 AI 支持的格式
  // 决定是否处理其他格式的消息
  // 或者全部回复不支持的消息格式

  return;
});
```

## 二、创建对话上下文

什么是对话上下文？对于人类来说，在一个场景中说过的话就是对话上下文，但对 AI 无法知道当前处于什么环境，或者说当前提问者处于什么环境。

机器人不是它家的网页聊天产品，我们可能一会在群里，一会在私聊，或者希望重新开始，它无法拿到当前的聊天记录。所以我们需要主动告诉它，当前对话和历史对话的内容。

OpenAI 提供了 messages 字段，其他厂商也有类似或同名的字段，让我们可以提交我们当时对话的内容。

```js
import OpenAI from "openai";

const openai = new OpenAI();

const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Who won the world series in 2020?" },
    {
      role: "assistant",
      content: "The Los Angeles Dodgers won the World Series in 2020.",
    },
    { role: "user", content: "Where was it played?" },
  ],
});
```

不过本篇文章主要以另一个知名的 NPM 模块 `chatgpt` 为主，详细接入请查看 [接入 OpenAI](#三接入-openai) 章节。这个包允许我们只传递当前 **对话内容** 和 `parentMessageId`，剩下的它会去处理。

### 1. 创建上下文状态

存储 `parentMessageId` 字段的对象就是我们说的上下文状态对象。我们需要确保每个人存的就是自己的，并且隔离 群聊 和 私聊 中，因为同一个人在不同的群有自己的对话场景。

```js
// 保存所有对话上下文的对象
// 也可以使用 redis 等进行持久化存储
// 避免每次重启丢失状态
const store = new Map();

// 定义对话状态
// 用户存储当前上下文中的数据
function defineState(id) {
  if (store.has(id)) return store.get(id);

  const state = {};

  store.set(id, state);

  return state;
}
```

现在我们有了一个定义状态对象的函数，就可以在聊天中存储对话上下文中需要的数据了。

```js
bot.on("message", async (message) => {
  // ...

  const room = message.room();

  if (room) {
    if (!(await message.mentionSelf())) return;

    // 1. 隔离群聊和私聊的同一个人的对话
    // 2. 隔离不同成员的对话
    const state = defineState(`${room.id}:${talker.id}`);

    // 询问 AI 处理...

    return;
  }

  //...

  // 1. 私聊我们只需要确保是同一个人就行
  const state = defineState(talker.id);

  if (msgType === MessageType.Text) {
    // 询问 AI 处理...

    return;
  }

  //...
});
```

### 2、创建快速回复的函数

wechaty 自身的 `say` 函数非常方便，但在群聊中，AI 回复的内容很容易被其他成员的消息刷没，过一会等他回群内看消息，都不知道 AI 回复的是谁。

如果我们希望确保对方收到消息，并且让 AI 支持回复多个用户，最好的办法就是 @ 当时的用户。但私聊是没有 @ 的，虽然有 `message.say()` 函数，但内部不会为我们 @ 对方，于是我们需要自己实现一个回复函数。

```js
import { log, type Sayable } from "wechaty";

/**
 * 创建快速回复函数
 *
 * @param sayable - 可以被发送的内容
 * @param finished - 是否结束对话，仅用于输出日志
 * @param bubble - 是否纯气泡模式，也就是群内只发内容，不 @ 对方，可以使用 message.say() 代替
 */
async function reply(
  sayable: Sayable,
  finished?: boolean,
  bubble?: boolean
): Promise<void> {
  const room = message.room();

  if (room) {
    if (typeof sayable === "string" || bubble === false) {
      await room.say(`\n\n ${sayable}`, talker);
    } else {
      await room.say(sayable);
    }
  } else {
    await talker.say(sayable);
  }

  if (finished) {
    if (room) {
      log.info(
        `🤖️ [${
          message.id
        }] 在房间 (${await room.topic()}) 回复 (${talkerName}) 的消息`
      );
    } else {
      log.info(`🤖️ [${message.id}] 回复(${talkerName})的消息`);
    }
  }
}
```

这是我们在处理消息前，要创建的一个回复函数，帮助我们解决指定回复提问者的函数。

### 3、创建上下文对象

我们现在有了一个存储当前对话上下文状态的对象以及一个很方便的，把 状态，回复函数，消息对象合并起来就是后续处理需要的上下文对象了。

```js
bot.on("message", async (message) => {
  // ...

  if (room) {
    if (!(await message.mentionSelf())) return;

    //...

    // 创建对话上下文对象
    const ctx = {
      state,
      replay,
      message,
    };

    // 询问 AI 处理...

    return;
  }

  //...

  // 1. 私聊我们只需要确保是同一个人就行
  const state = defineState(talker.id);

  if (msgType === MessageType.Text) {
    // 创建对话上下文对象
    const ctx = {
      state,
      replay,
      message,
    };

    // 询问 AI 处理...

    return;
  }

  //...
});
```

这样后面使用就方便很多，下一步我们要开始接入 OpenAI。

## 三、接入 OpenAI

虽然 OpenAI 官方有提供 SDK，但我们选择非官方的 [chatgpt][chatgpt] 作为接入用到的包，因为我们需要一个人帮我们记录和 AI 对话的历史消息。

在 `chatgpt` 这个模块中，我们只要传递 `parentMessageId` 字段就可以完成历史消息的传输。

```js
import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });

// send a message and wait for the response
let res = await api.sendMessage("What is OpenAI?");
console.log(res.text);

// send a follow-up
res = await api.sendMessage("Can you expand on that?", {
  parentMessageId: res.id,
});

console.log(res.text);
```

基于这个封装，结合之前的对话上下文对象，就可以很容易创建和 AI 沟通的方法。

```js
const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });

// 这里接受的就是前面创建的对话上下文
async function askAI({ message, state, reply }) {
  // 你也可以支持其他消息
  const text = message.text();

  const res = await api.sendMessage(text, {
    // 如果之前记录 id 就传递
    parentMessageId: state.parentMessageId,
  });

  // 回复用户
  await reply(res.text, true);

  // 存储当前消息 ID 到对话状态
  state.parentMessageId = res.id;
}
```

相信大部分人都已经用过 AI 厂商提供的在线 chat 产品，里面有一个很重要的功能，那就是 **新建聊天**，但微信不支持互动类消息。

所以我们需要从消息文本中下手，那就是根据消息内容判断对话者的意图。

```js
const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });

const newKeywords = ["新对话", "重新开始"];

// 这里接受的就是前面创建的对话上下文
async function askAI({ message, state, reply }) {
  // 你也可以支持其他消息
  const text = message.text();

  // 判断用户是否希望重新开始聊天
  if (newKeywords.includes(text)) {
    // 直接删除就行
    delete state.parentMessageId;

    // 告诉用户可以从新开始了
    await reply("好的，新的对话从现在开始，期待与您的交流。", true);
    return;
  }

  const res = await api.sendMessage(text, {
    // 如果之前记录 id 就传递
    parentMessageId: state.parentMessageId,
  });

  // 回复用户
  await reply(res.text, true);

  // 存储当前消息 ID 到对话状态
  state.parentMessageId = res.id;
}
```

## 四、我目前遇到的问题

这是我目前为止出现的问题，希望能给大家一点提示，避免被封号。

- 登录报 1209 错误
  - **出现时机** 频繁登录 或 启动
  - **导致结果** 无法登录
  - **何时解除** 需要等一会才可以正常登录
  - **解决办法** 无解，我现在都是隔几分种后，才选择重启机器人
- 发送图片会报 1205 错误
  - **出现时机** 群内图片发送过多，并且频率过快
  - **导致结果** 无法发送图片给对方
  - **何时解除** 快速发图到一定频率就会出现，过一会会自动回复
  - **解决办法** 我为每次图片和消息发送添加 300 ～ 500 毫秒延迟后，没有再出现。
- 经常莫名其妙的回复之前的用户
  - **出现时机** 不确定
  - **导致结果** 半夜疯狂发消息并且 @ 对方
  - **何时解除** 不确定
  - **解决办法** 初步排查是消息回流，应该是后台消息同步问题，所以记录每一条消息的 ID，处理前先验证是否收到过。
- 私聊消息可以，但群内消息无法发送
  - **出现时机** 群内消息发送频率过快，条数过多 或 新微信号加人频繁
  - **导致结果** 无法发送消息到群内
  - **何时解除** 轻微的就是禁言，重的就是被关小黑屋了，但加人频繁是很大概率被封的，去微信安全中心可以查到被关理由和解除时间
  - **解决办法** 给每一条回复的消息加 300 ～ 500 毫秒的延迟
- 登录后报 batchGetContact 1205 错误
  - **出现时机** 使用 wechat4u 部署到服务器很大概率出现，其他 puppet 没试过
  - **导致结果** 有可能下一秒机器人就自动退出登录
  - **何时解除**
  - **解决办法** 还没排查原因

在开发过程中，也因为一些操作不谨慎，付出了一些代价，那就是：

- 1 个微信小号被关 6 个月 **小黑屋**（已解封）
- 1 个微信小号被 **禁言** 了一天（已解封）

在 02/10 puppet-wechat4u 仓库也出了一个提示，让大家谨慎使用，应该都是遇到和我类似的人太多的缘故。

## 五、未完待续

现在我们已经有了一个最简单的接入 OpenAI 的机器人，我们可以继续优化，比如支持图片，支持文件，或者接入多模型等等。

这也是此篇文章要分享的主要内容，以 OpenAI + wechaty 分享我这一年的开发经验，希望能给大家带来一些提示与帮助。

---------------------

**以下为广告内容**

我将自己的经验写成一个 wechaty 插件，并且开源到 Github 上。

仓库地址：[wechaty-plugin-assistant](https://github.com/zhengxs2018/wechaty-plugin-assistant)

示例代码：

```js
import {
  ChatERNIEBot,
  createAssistant,
} from '@zhengxs/wechaty-plugin-assistant';
import { WechatyBuilder } from 'wechaty';
import { QRCodeTerminal } from 'wechaty-plugin-contrib';

// ============ 创建 AI 助手  ============

const llm = new ChatERNIEBot({
  // 百度文心千帆的 token
  token: process.env.EB_ACCESS_TOKEN,
});

const assistant = createAssistant({
  llm,
});

// ============ 启动 wechaty 服务  ============

const bot = WechatyBuilder.build({
  name: 'demo',
  puppet: 'wechaty-puppet-wechat4u',
  puppetOptions: { uos: true },
});

bot.use(QRCodeTerminal({ small: true }));

// 使用插件
bot.use(assistant.callback());

bot.start();
```

欢迎大家 star 和 fork ♥️。

[startTime]: https://github.com/wechaty/puppet-wechat4u/blob/51280590e722bc59754ad178b697574abd968d25/src/puppet-wechat4u.ts#L412
[chatgpt]: https://www.npmjs.com/package/chatgpt
