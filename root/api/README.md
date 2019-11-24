---
description: 'Wechaty Version: v0.20'
---

# API 文档

以下是一个最简单上手的示例代码。

```javascript
import { Wechaty } from 'wechaty'

Wechaty.instance()
.on('scan',        qrcode  => console.log('扫码登录：' + qrcode))
.on('login',       user    => console.log('登录成功：' + user))
.on('message',     message => console.log('收到消息：' + message))
.on('friendship',  friendship => console.log('收到好友请求：' + friendship))
.on('room-invite', invitation => console.log('收到入群邀请：' + invitation))
.start()
```

在这里简单举例一些基础功能：

## 收消息

每次微信收到消息，我们都可以得到一个消息变量，代表了我们收到的消息。消息类型可以为文字、图片、视频、链接分享、联系人等。

```javascript
wechaty.on('message', msg => console.log(msg))
```

`msg`这个变量是一个Message类的实例，通过它我们可以得到每一条消息的所有细节，比如：

| 消息方法 | 功能 |
| :--- | :--- |
| `msg​.from()` | 发送者 |
| `msg​.to()` | 接收者 |
| `msg.room()` | 消息所在的群 |
| `msg.text()` | 消息文本内容 |
| `msg​.toFileBox()` | 消息附件（图片、音频、视频等） |

## 好友管理

我们可以对好友进行查找，也可以为他们设置别名：

```javascript
const filehelper = await wechaty.Contact.find({ name: '文件传输助手' })
filehelper.alias('文件中转站')
```

也可以向其他用户发起新好友请求：

```javascript
wechaty.Friendship.add(stranger)
```

或者接受好友请求：

```javascript
wechaty.on('friendship', async friendship => {
  if (friendship.type() === Friendship.Type.Receive) {
    await friendship.accept()
  }
})
```

## 发消息

可以将文本、图片、视频、链接卡片、联系人卡片等信息，发送给其他微信用户，或是发到某一个微信群中。

| 方法 | 功能 |
| :--- | :--- |
| `contact.say('文本消息')` | 发送文本消息给contact |
| `contact.say(FileBox.fromFile('test.jpg'))` | 发送图片test.jpg给contact |
| `contact.say(FileBox.fromFile('test.mp4'))` | 发送test.mp4给contact |
| `contact.say(UrlLink.create('https://qq.com'))` | 发送链接卡片[https://qq.com给contact](https://qq.com给contact) |
| `contact.say(contact2)` | 发送联系人卡片contact2给contact |

如果希望在微信群中发消息，只需要将contact替换为room即可。

## 群管理

我们可以进行建群、群查找、拉人入群、踢人出群等操作。

```javascript
const newRoom = await wechaty.Room.create([contact1, contact2], '新群主题')
const oldRoom = await wechaty.Room.find({ name: '已经存在的群主题' })
```

得到了room之后，我们就可以基于这个room进行加人、减人和标题操作，如：

| 方法 | 功能 |
| :--- | :--- |
| `room.add(contact)` | 添加contact到room群 |
| `room.del(contact)` | 在room群中删除contact |
| `room.topic('新群名')` | 修改room的群名称 |

{% page-ref page="wechaty.md" %}

{% page-ref page="message.md" %}

{% page-ref page="contact.md" %}

{% page-ref page="contact-self.md" %}

{% page-ref page="room.md" %}

{% page-ref page="room-invitation.md" %}

{% page-ref page="friendship.md" %}

