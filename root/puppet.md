# Puppet

## 1. 介绍

不同的[Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) 代表的我们对微信协议的不同实现方式, Puppet的英文意思是`傀儡`, 很形象的描述了我们希望Puppet做的事情：帮助 Wechaty 来控制微信的操作。

所有的实现方式都以`PuppetXXX` 来命名的，比如[PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) 是通过谷歌浏览器，通过 [google puppeteer](https://github.com/GoogleChrome/puppeteer)来控制[网页微信API](https://wx.qq.com)。[PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) 是通过WebSocket 连接一个协议服务器来控制iPad 微信。

如果你希望深入了解Puppet是如何在Wechaty 运行的，你可以在[https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts](https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts) 查看源代码。

基于网页微信的实现方式是免费的，基于其他的接入方式是收费的，详细介绍：[收费说明](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token)

以下是Puppet 和Wechaty 的架构图，更多Puppet 的介绍在这里： [Puppet in wiki](https://github.com/Chatie/wechaty-puppet/wiki)

![](https://github.com/Chatie/wechaty/wiki/image/abstract-info.png)

## 2. Wechaty Puppet 清单

### 2.1 调用 Wechaty 的开发者

| Puppet | 使用的微信协议 | Npm 名称 | Npm 版本 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| [PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) | 通过浏览器 Hook 网页API | wechaty-puppet-puppeteer | ![PuppetPuppeteer](https://badge.fury.io/js/wechaty-puppet-puppeteer.svg) [![npm \(tag\)](https://img.shields.io/npm/v/wechaty-puppet-puppeteer/next.svg)](https://www.npmjs.com/package/wechaty-puppet-puppeteer?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg) |
| [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) | iPad 协议 | wechaty-puppet-padchat | ![PuppetPadchat](https://badge.fury.io/js/wechaty-puppet-padchat.svg)   [![npm \(tag\)](https://img.shields.io/npm/v/wechaty-puppet-padchat/next.svg)](https://www.npmjs.com/package/wechaty-puppet-padchat?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg) |
| [PuppetWechat4u](https://github.com/Chatie/wechaty-puppet-wechat4u) | 通过HTTP 调用网页API | wechaty-puppet-wechat4u | ![PuppetWechat4u](https://badge.fury.io/js/wechaty-puppet-wechat4u.svg)   [![npm \(tag\)](https://img.shields.io/npm/v/wechaty-puppet-wechat4u/next.svg)](https://www.npmjs.com/package/wechaty-puppet-wechat4u?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Alpha-red.svg) |
| [PuppetIoscat](https://github.com/linyimin-bupt/wechaty-puppet-ioscat) | iPhone Hook | wechaty-puppet-ioscat | ![PuppetIoscat](https://badge.fury.io/js/wechaty-puppet-ioscat.svg)   [![npm \(tag\)](https://img.shields.io/npm/v/wechaty-puppet-ioscat/next.svg)](https://www.npmjs.com/package/wechaty-puppet-ioscat?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Alpha-red.svg) |
| TBW | Android Hook | Android | 0.0.0 | ![Stage:Release](https://img.shields.io/badge/Stage-Plan-lightgrey.svg) |
| TBW | Win32 Hook | Win32 | 0.0.0 | ![Stage:Release](https://img.shields.io/badge/Stage-Plan-lightgrey.svg) |

### 2.2 开发 Puppet 开发者

| Puppet | 使用的微信协议 | Npm 名称 | Npm 版本 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| [Puppet](https://github.com/Chatie/wechaty-puppet) | 抽象父类 | wechaty-puppet | ![Puppet](https://badge.fury.io/js/wechaty-puppet.svg)   [![npm \(tag\)](https://img.shields.io/npm/v/wechaty-puppet/next.svg)](https://www.npmjs.com/package/wechaty-puppet?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg) |
| [PuppetMock](https://github.com/Chatie/wechaty-puppet-mock) | 为单元测试提供模拟调用 | wechaty-puppet-mock | ![PuppetMock](https://badge.fury.io/js/wechaty-puppet-mock.svg)   [![npm \(tag\)](https://img.shields.io/npm/v/wechaty-puppet-mock/next.svg)](https://www.npmjs.com/package/wechaty-puppet-mock?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg) |

## 3. Wechaty Puppet 兼容性

### 3.1 Puppet 联系人接口

| Contact API | 描述 | PuppetWechat4u & PuppetPuppeteer | PuppetPadchat | PuppetIoscat |
| :--- | :--- | :---: | :---: | :---: |
| Permanent ContactPayload.id | 唯一id | ~~No~~ | Yes | ~~No~~ |
| ContactPayload.friend | 判断是否为机器人好友 | ~~No~~ | Yes | Yes |

### 3.2 Puppet 消息收发接口

| Message API | 描述 | PuppetWechat4u & PuppetPuppeteer | PuppetPadchat | PuppetIoscat |
| :--- | :--- | :---: | :---: | :---: |
| messageSendContact\(\) | 发送联系人名片 | ~~No~~ | Yes | ~~No~~ |
| messageFile\(\) | 接收文件 | Yes | Yes: 图片/音频/视频 No: 其他文件 | ~~No~~ |
| messageSendFile\(\) | 发送文件 | Yes | Yes: 图片/音频/视频 No: 其他文件 | ~~No~~ |
| messageSendUrl\(\) | 发送链接消息 | ~~No~~ | Yes | ~~No~~ |

### 3.3 Puppet 微信群接口

| Room API | 描述 | PuppetWechat4u & PuppetPuppeteer | PuppetPadchat | PuppetIoscat |
| :--- | :--- | :---: | :---: | :---: |
| Permanent RoomPayload.id | 唯一群id | ~~No~~ | Yes | ~~No~~ |
| roomQrcode\(\) | 获取群二维码 | ~~No~~ | Yes | Yes |
| roomCreate\(\) | 创建微信群 | ~~No~~ | Yes | Yes |
| roomAdd\(\) | 邀请好友入群 | ~~No~~ | Yes | Yes |
| roomDel\(\) | 将用户踢出群聊 | ~~No~~ | Yes | Yes |
| roomQuit\(\) | 主动退群 | ~~No~~ | Yes | Yes |
| roomAnnounce\(\) | 发群公告 | ~~No~~ | Yes | Yes |
| roomPayload.owner | 获取群主信息 | ~~No~~ | Yes | ~~No~~ |
| roomInvitaition | 自动接受群邀请 | ~~No~~ | Yes | ~~No~~ |

## 4. 了解更多

你可以参考这里了解更多的 Wechaty Puppet 内容： [https://github.com/Chatie/wechaty-puppet/wiki](https://github.com/Chatie/wechaty-puppet/wiki)

* Github: [https://github.com/Chatie/wechaty-puppet](https://github.com/Chatie/wechaty-puppet)
* 文档说明: [https://chatie.io/wechaty-puppet/typedoc/classes/puppet.html](https://chatie.io/wechaty-puppet/typedoc/classes/puppet.html)
* Puppet 开发指南: [https://github.com/Chatie/wechaty-puppet/wiki/Development](https://github.com/Chatie/wechaty-puppet/wiki/Development)
* Puppet 相关链接: [https://github.com/Chatie/wechaty-puppet/wiki/Links](https://github.com/Chatie/wechaty-puppet/wiki/Links)

