---
title: 5分钟把ChatGPT装进微信里
author: sunshanpeng
categories: article
tags:
  - chatgpt
  - wechaty-puppet-wechat
image: /assets/2022/12-play-chatgpt-with-wechaty/636.webp
mermaid: true
---

基于wechaty创建一个自己的ChatGPT机器人

## 背景

### ChatGPT是什么

这几天我的朋友圈被ChatGPT刷屏，如果你还不知道那就赶紧上网搜一下吧。

官方介绍：<https://openai.com/blog/chatgpt/>

### ChatGPT能干什么

可以砍价，可以写文章，可以写代码，可以...

更多好玩的场景等你探索

![image.png](/assets/2022/12-play-chatgpt-with-wechaty/634.webp)
![image.png](/assets/2022/12-play-chatgpt-with-wechaty/636.webp)

### UOS web协议复活

`wechaty-puppet-wechat 1.18.4`版本可以免费使用了

```bash
npm install wechaty-puppet-wechat@latest --save
```

```bash
const bot = WechatyBuilder.build({
    name: 'puppet-wechat',
    puppetOptions: {
      uos: true  // 开启uos协议
    },
    puppet: 'wechaty-puppet-wechat',
})
```

## 获取ChatGPT SESSION_TOKEN

### 注册ChatGPT

注册地址: <https://chat.openai.com/chat>

在国内注册ChatGPT账号稍微有点门槛

1. 需要有一个国外的梯子（香港的不行）
2. 需要国外手机号，可以使用<https://sms-activate.org/cn>

![image.png](/assets/2022/12-play-chatgpt-with-wechaty/637.webp)

国内注册教程: <https://juejin.cn/post/7173447848292253704>

### 登录ChatGPT获取SESSION_TOKEN

- 打开网页: <https://chat.openai.com/chat>
- 打开开发者工具->应用->Cookie
- 拷贝`__Secure-next-auth.session-token`的值
![image.png](/assets/2022/12-play-chatgpt-with-wechaty/image.webp)

## 使用chatgpt-api

github地址: <https://github.com/transitive-bullshit/chatgpt-api>

### 使用方法

```bash
npm install chatgpt
```

```javascript
import { ChatGPTAPI } from 'chatgpt'

async function example() {
  // sessionToken is required; see below for details
  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN
  })

  // ensure the API is properly authenticated
  await api.ensureAuth()

  // send a message and wait for the response
  const response = await api.sendMessage(
    'Write a python version of bubble sort.
  )

  // response is a markdown-formatted string
  console.log(response)
}
```

## 集成chatgpt-api和wechaty

直接上代码：

```javascript
import { WechatyBuilder } from 'wechaty';
import qrcodeTerminal from 'qrcode-terminal';
import { ChatGPTAPI } from 'chatgpt';
let sessionToken = '';
const api = new ChatGPTAPI({ sessionToken: sessionToken || process.env.SESSION_TOKEN });
await api.ensureAuth();
const wechaty = WechatyBuilder.build({
  name: 'wechaty-chatgpt',
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true,
  },
});
wechaty
  .on('scan', async (qrcode, status) => {
    qrcodeTerminal.generate(qrcode); // 在console端显示二维码
    const qrcodeImageUrl = ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode)].join('');
    console.log(qrcodeImageUrl);
  })
  .on('login', user => console.log(`User ${user} logged in`))
  .on('logout', user => console.log(`User ${user} has logged out`))
  .on('message', async message => {
    const contact = message.talker();
    const content = message.text();
    const isText = message.type() === wechaty.Message.Type.Text;
    if (message.self() || !isText) {
      return;
    }
    console.log(`contact: ${contact} content: ${content}`);
    if (content === 'ding') {
      await contact.say('dong');
    }
    if (content.startsWith('/c ')) {
      const response = await api.sendMessage(content.replace('/c ', ''));
      try {
        await contact.say(response);
      } catch (e) {
        console.error(e);
      }
    }
  });
wechaty
  .start()
  .then(() => console.log('Start to log in wechat...'))
  .catch(e => console.error(e));
```

### 效果

![image.png](https://raw.githubusercontent.com/sunshanpeng/wechaty-chatgpt/main/media/screenshot-20221207-131138.png)

## 总结

感谢wechaty和chatgpt-api，让我们能够很方便的开发自己的机器人，更多玩法等你探索

项目地址：[github sunshanpeng/wechaty-chatgpt](https://github.com/sunshanpeng/wechaty-chatgpt)，欢迎给我一个 Star⭐
