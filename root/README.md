# 介绍

## Wechaty 是什么 <a id="intro"></a>

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty) [![English Version](https://img.shields.io/badge/-English%20Version-blue.svg)](https://docs.chatie.io/)

微信个人号功能非常强大和灵活，是一个非常适合用来做ChatBot的载体。它可以灵活不受限制的发送语音短信、视频、图片和文字，支持多人群聊。但是使用微信个人微信号作为ChatBot，需要通过非官方的第三方库接入微信。因为截至2018年底，微信尚无任何官方的ChatBot API发布。

[Wechaty](https://github.com/Chatie/wechaty/) 是一个开源的的 **个人号** 微信机器人接口，是一个使用Typescript 构建的Node.js 应用。支持多种微信接入方案，包括网页，ipad，ios，windows， android 等。同时支持[Linux](https://travis-ci.com/chatie/wechaty), [Windows](https://ci.appveyor.com/project/chatie/wechaty), [Darwin\(OSX/Mac\)](https://travis-ci.com/chatie/wechaty) 和 [Docker](https://app.shippable.com/github/Chatie/wechaty) 多个平台。

在GitHub上可以找到很多支持微信个人号接入的第三方类库，其中大多都是基于Web Wechat的API来实现的，如基于Python的WeixinBot，基于Node.js的Wechaty等。少数支持非Web协议的库，大多是商业私有闭源的，Wechaty是少有的开源项目支持非Web协议的类库。

只需要6行代码，你就可以 **通过个人号** 搭建一个 **微信机器人功能** ，用来自动管理微信消息。

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

更多功能包括：

* 消息处理：关键词回复
* 群管理：自动入群，拉人，踢人
* 自动处理好友请求
* 智能对话：通过简单配置，即可加入智能对话系统，完成指定任务
* ... 请自行开脑洞

详情请看[Wechaty](https://github.com/chatie/wechaty)项目，下面列出一些简单的基本功能 [![NPM Version](https://badge.fury.io/js/wechaty.svg)](https://badge.fury.io/js/wechaty) [![Docker Pulls](https://img.shields.io/docker/pulls/zixia/wechaty.svg?maxAge=2592000)](https://hub.docker.com/r/zixia/wechaty/) [![TypeScript](https://img.shields.io/badge/<%2F>-TypeScript-blue.svg)](https://www.typescriptlang.org/) [![Greenkeeper badge](https://badges.greenkeeper.io/Chatie/wechaty.svg)](https://greenkeeper.io/)

### 收消息

每次微信收到消息，我们都可以得到一个消息变量，代表了我们收到的消息。消息类型可以为文字、图片、视频、链接分享、联系人等。

```javascript
wechaty.on('message', msg => console.log(msg))
```

`msg`这个变量是一个[Message](api/message.md)类的实例，通过它我们可以得到每一条消息的所有细节，比如：

| 消息方法 | 功能 |
| :--- | :--- |
| \`\`[`msg​.from()`](api/message.md#message-from-contact)\`\` | 发送者 |
| \`\`[`msg​.to()`](api/message.md#message-to-contact-or-null) | 接收者 |
| \`\`[`msg.room()`](api/message.md#message-room-room-or-null) | 消息所在的群 |
| \`\`[`msg.text()`](api/message.md#message-text-string) | 消息文本内容 |
| \`\`[`msg​.toFileBox()`](api/message.md#message-tofilebox-promise) | 消息附件（图片、音频、视频等） |

### 发消息

可以将文本、图片、视频、链接卡片、联系人卡片等信息，发送给其他微信用户，或是发到某一个微信群中。

| 方法 | 功能 |
| :--- | :--- |
| \`\`[`contact.say('文本消息')`](api/contact.md#contact-say-textorcontactorfileorurl-promise) | 发送文本消息给contact |
| \`\`[`contact.say(FileBox.fromFile('test.jpg'))`](api/contact.md#contact-say-textorcontactorfileorurl-promise) | 发送图片test.jpg给contact |
| \`\`[`contact.say(FileBox.fromFile('test.mp4'))`](api/contact.md#contact-say-textorcontactorfileorurl-promise) | 发送test.mp4给contact |
| \`\`[`contact.say(UrlLink.create('https://qq.com'))`](api/contact.md#contact-say-textorcontactorfileorurl-promise) | 发送链接卡片[https://qq.com给contact](https://qq.com给contact) |
| \`\`[`contact.say(contact2)`](api/contact.md#contact-say-textorcontactorfileorurl-promise) | 发送联系人卡片contact2给contact |

如果希望在微信群中发消息，只需要将contact替换为room即可。

### 好友管理

我们可以对好友进行查找，使用 [Contact](api/contact.md) 类，也可以为他们设置别名：

```javascript
const filehelper = await wechaty.Contact.find({ name: '文件传输助手' })
filehelper.alias('文件中转站')
```

也可以向其他用户发起新好友请求\( 使用 [Friendship](api/friendship.md) 类\)：

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

### 群管理

我们可以进行建群、群查找、拉人入群、踢人出群等操作，使用 [`Room`](api/room.md) 类。

```javascript
const newRoom = await wechaty.Room.create([contact1, contact2], '新群主题')
const oldRoom = await wechaty.Room.find({ name: '已经存在的群主题' })
```

得到了room之后，我们就可以基于这个room进行加人、减人和标题操作，如：

| 方法 | 功能 |
| :--- | :--- |
| \`\`[`room.add(contact)`](api/room.md#room-add-contact-promise) | 添加contact到room群 |
| \`\`[`room.del(contact)`](api/room.md#room-del-contact-promise) | 在room群中删除contact |
| \`\`[`room.topic('新群名')`](api/room.md#room-topic-newtopic-promise) | 修改room的群名称 |

## 实现原理 <a id="web-limit"></a>

* 第一阶段：早期是基于网页版的微信客户端实现，详情查看 [Wechaty 101: from v0.0 to v0.7](https://blog.chatie.io/wechaty-101-presentation/) 这篇博客通过一个近2个小时的视频教程和ppt 来详细解释了实现原理。所有基于网页版本的实现均是**完全开源且免费的**。
* 第二阶段：[基于网页版的微信有了较多限制](./#web-limit-1)，为了方便开发者继续搭建自己的聊天机器人，我们提供了中间件 [Puppet](puppet.md) 来支持多种实现方式。[查看多种微信接入方式。](./#multi-protocal)

## 基于Web 微信的限制 <a id="web-limit"></a>

1. 从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： [https://wx.qq.com](https://wx.qq.com) 上扫码查看是否能登陆。
2. 从2018年开始，web api 无法创建群聊和自动拉人入群。

更多内容详见：

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)
* [\[谣言\] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)
* [新注册的微信号无法登陆](https://github.com/Chatie/wechaty/issues/872)
* [wechaty-puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)

{% hint style="success" %}
**解决方案： 第三方提供了非web协议的** [**Puppet**](puppet.md) **解决方案，**[**点击购买token**](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token) **, 更多技术细节查看** [**wechaty-puppet-padchat**](https://github.com/lijiarui/wechaty-puppet-padchat)
{% endhint %}

## 支持多种微信接入方式 <a id="multi-protocal"></a>

我们提供多种微信协议的实现方式，在wechaty 的系统中，我们叫她[Puppet](https://github.com/Chatie/wechaty/wiki/Puppet)。Puppet的英文意思是`傀儡`, 很形象的描述了我们希望Puppet做的事情：帮助 Wechaty 来控制微信的操作。

所有的实现方式都以`PuppetXXX` 来命名的，比如[PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) 是通过谷歌浏览器，通过 [google puppeteer](https://github.com/GoogleChrome/puppeteer)来控制[网页微信API](https://wx.qq.com)。[PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) 是通过WebSocket 连接一个协议服务器来控制iPad 微信，两个重要的信息参考：

* [完整的Puppet清单](puppet.md#puppet-list)
* [基于不同实现方式的Puppet兼容性对比](puppet.md#puppet-compatibility)

如果你希望深入了解Puppet是如何在Wechaty 运行的，你可以在[https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts](https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts) 查看源代码。

基于网页微信的实现方式是免费的，基于其他的接入方式是收费的。[这里是收费说明](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token)。

以下是Puppet 和Wechaty 的架构图，更多Puppet 的介绍在这里： [Puppet in wiki](https://github.com/Chatie/wechaty-puppet/wiki)

![Puppet Structure](.gitbook/assets/image-4.png)

## 加入我们 <a id="join-us"></a>

{% hint style="success" %}
扫描下方二维码，回复 'wechaty' 加入 Wechaty Developers Home
{% endhint %}

{% hint style="danger" %}
群内均为wechaty 的开发者，群内发言之前请先阅读文档。
{% endhint %}

{% hint style="warning" %}

![Wechaty Developers&apos; Home](https://chatie.io/wechaty/images/bot-qr-code.png)

