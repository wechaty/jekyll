---
title: "Wechaty Puppet Service WorkPro 迁移指南"
author: wang-nan
categories: tutorial
tags:
  - news
  - puppet-service
  - puppet-provider
  - workpro
  - wxwork
image: /assets/2023/01-workpro-immigration-guide/workpro.webp
---

## 前言

这一迁移指南主要针对 Node Wechaty 用户。对于其他版本的 Wechaty 使用中出现的问题，请首先将对应的 Wechaty 包版本升级到最新，然后再尝试。如果有报错信息，可以提供给我们看看能否兼容（但无法保证），或是在对应包的 repo 中提 issue。

## 迁移之前

先通过 ```npm ls wechaty``` ```npm ls wechaty-wechaty-puppet``` 和 ```npm ls wechaty-puppet-service``` 来查看所使用的核心包的版本。如果使用版本是 0.x ，请升级到最新版。尤其需要注意的是，```wechaty-puppet-service``` 的版本需要高于 1.19.9 ，否则会在触发标签、群公告等事件时造成卡死。具体请参考这个 [issue](https://github.com/wechaty/puppet-service/issues/216) 。

## 迁移代码

在升级到 wechaty 1.x 包的过程中，代码需要进行一定的修改。参考：[Wechaty 1.0 迁移](https://juzihudong.feishu.cn/docx/PCL2dg0yjoDBkOxNlC9cb1H7nkg)。

## 获取 token

根据已有的 token 联系售后客服，可以获取到一个新旧 token 的映射表（一般为 csv 格式），登录账号、到期时间等各种信息都可以继承。正常情况下会在新的 token 上自动登录上原账号，但由于登录环境发生了变化，也有一定概率会掉线需要扫码（概率很低）。

## 使用新 token 的注意事项

- 禁用 tls 连接，原因请参考这个 [issue](https://github.com/wechaty/puppet-service/issues/160)。可以在代码中禁用，也可以通过环境变量。
  - 代码：在 ```puppetOptions中加入tls: { disable: true }```
  - 环境变量：```WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true```
- 注意与 token 断开后重连。目前 WorkPro 处于新上线阶段，各种升级和修复情况较多。我们一般会在晚上12点左右进行服务更新。目前会较为频繁，稳定后预计一周一次，但总归是无法避免的。更新时账号会离线1分钟左右。由于目前社区版的 wechaty 重连功能不很稳定，建议在外部使用一些额外的代码进行在线状态检查，并尝试重连或重启。

## 体验版与社区版的功能差异

在 [WorkPro 发布博客](https://wechaty.js.org/2022/12/23/introducing-workpro-puppet/) 中可以看到，有一些功能被标注为依赖体验版 Wechaty 。所谓体验版 Wechaty，指的是 @juzi scope下的 Wechaty 相关包，里面包含了一些尚未在社区版上线的新功能。

需要注意的是，尽管我们会尽力推动体验版的功能向社区版合并，并且也会尽量保证兼容性，但无法保证百分之百的功能都能合并入社区版，并且与体验版的参数、回调、返回值等各方面一致。
体验版独有的功能包括（如果有需求，可以再写文档）：

- 新的 Wechaty 层事件

```ts
  update               : 'Will be emitted when some info has been changed.',
  'contact-tag-add'    : 'Will be emitted when contact has new tags.',
  'contact-tag-remove' : 'Will be emitted when contact has some tags removed.',
  'contact-name'       : 'Will be emitted when contact name has been changed.',
  'contact-alias'      : 'Will be emitted when contact alias has been changed.',
  'contact-phone'      : 'Will be emitted when contact phone has been changed.',
  'contact-description': 'Will be emitted when contact description has been changed.',
  'contact-corporation': 'Will be emitted when contact corporation has been changed.',
  'room-owner'         : 'Will be emitted when room owner has been changed.',
```

- 新的 Puppet 层事件

```ts
  'room-announce': 'new room announcement received',
  tag            : 'tag created, deleted or changed',
  'tag-group'    : 'tag group created, deleted or changed',
  'post-comment' : 'a post receives a new comment',
  'post-tap'     : 'a post receives a new tap',
```

- 朋友圈功能（发布、点赞、回复）
- 标签功能（列表、打标签）
- 改进了重连机制（需要在 errorListener 中监听'no grpc manager'关键字并重启 bot ）
- 会话已读功能
- 发送接收视频号消息、位置消息功能
- 系统消息
