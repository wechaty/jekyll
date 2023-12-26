---
title: "AutoRoom 帮您更好的进行用户自动进群"
author: beiheng
categories: article
tags:
  - blog
  - autoFriend
  - autoRoom
image: /assets/2023/12-blog-autoFriend-autoRoom/logo.webp
---

WeChaty 是一个基于 Node.js 的开源微信机器人框架，而作为社群管理，需要对好友进行分类让其进入相应的群，通过本篇文章以及Wechaty，你可以创还能一个微信机器人，使其在微信平台上运行。

Setup：

我们使用 `wechaty-puppet-padlocal`

```Text
package.json:
"qrcode-terminal": "^0.12.0",
"wechaty": "^1.19.10",
"wechaty-puppet": "^1.19.6",
"wechaty-puppet-padlocal": "^1.11.18"
```

```javascript
import { PuppetPadlocal } from "wechaty-puppet-padlocal";
import { WechatyBuilder } from "wechaty";

const puppet = new PuppetPadlocal({
  token: "放入您的Pad_local申请的TOKEN",
});
const wechaty = WechatyBuilder.build({
  name: 'auto-room',
  puppet
});

```

以下代码为当私聊接收信息后返回提示 autoRoom 相关代码

```javascript
   wechaty.on('message', async message => {
    const content = msg.text();
    const talker = msg.talker();
    if (/^加群$/.test(content)) {
        const roomList = await bot.Room.findAll();
        const targetRooms = roomList.filter(async (room: RoomInterface) => {
            const topic = await room.topic();
            return topic.startsWith("狼人杀");
        });
        if (targetRooms.length > 0) {
            const roomList = targetRooms.map(async (room: RoomInterface) => {
                const roomTopic = await room.topic();
                return roomTopic;
            });
            const joinedRoomTopics = (await Promise.all(roomList)).join("\n");
            await talker.say(`狼人杀群聊列表：\n${joinedRoomTopics}\n\n请输入要加入的群聊名称`);
        } else {
            await talker.say("暂时没有狼人杀群聊可加入！");
        }
    }
    if (/^狼人杀/.test(content)) {
        const room = await bot.Room.find({ topic: content });
        if (room) {
            await room?.add(talker);
        } else {
            talker.say(`${content}群聊,查找失败`);
        }
    }
   })  
```

![1.webp](/assets/2023/12-blog-autoFriend-autoRoom/1.webp)
![1.webp](/assets/2023/12-blog-autoFriend-autoRoom/2.webp)

以下代码为当私聊接收信息后返回提示 autoFriend 相关代码

```javascript
  import { Message } from "wechaty";
  import { FriendshipInterface, WechatyInterface } from "wechaty/impls";

  let lastAcceptTime: number = 0;

  wechaty.on('friendship', async friendship => {
    if (friendship.type() === bot.Friendship.Type.Receive) {
        const currentTime = Date.now();
        // 判断距离上次接受好友请求的时间是否超过10秒
        if (currentTime - lastAcceptTime > 10000) {
            // 发送好友请求通知
            const contact = await friendship.contact();
            // 自定义验证信息
            if (friendship.hello() === "我要学习Wechaty") {
                await friendship.accept();
            }
            lastAcceptTime = currentTime;
        } else {
            console.log("距离上次接受好友请求的时间未超过10秒，暂不处理此请求");
        }
    }
  })
```
