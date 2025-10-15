---
title: "Wechaty 2.0 的计划与预告"
author: wang-nan
categories: announcement
tags:
  - talk
  - meetup
  - news
image: /assets/2023/05-preview-on-wechaty-2.0-en/logo.webp
---

使用 WorkPro Token 的朋友们可能知道， wechaty 有一个体验版， @juzi/wechaty，可以体验一些 wechaty 暂不支持的功能，例如朋友圈、引用、@所有人等。我们一直在致力于将其中的功能合并到社区主分支，使得更多的人可以用上这些功能。最近我们与[Huan](https://wechaty.js.org/contributors/huan/)在一个短会上（可以在[这里](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.si1xxj2xji7f)查看摘要），交流了对一些新功能设计的观点，并且基本达成了一致。这可以说向这些新功能在主分支上线迈进了一大步。对于这些功能的进度追踪可以参考这个 [issue](https://github.com/wechaty/wechaty/issues/2535) 。这里简单介绍一下。

会议讨论内容：

- 可能需要一个 ```messagePreview``` 来在实际下载媒体前获取

  - 使用 uuid FileBox 来实现懒加载

  - 使用 FileBox 的 metadata 来传输元数据

- 新的系统消息

  = 如果 IM 有对应的系统消息，则可以新增事件

  - 将 Dirty 触发到 bot 层来实现数据更新通知

- 引用消息

  - 使用 Post 和 message.toPost 实现

- 朋友圈的 Post

  - sayableList 中的 payload 需要构造为 message，其中的 talker 和 listener 为 bot 自己

  - 朋友圈的位置使用 sayable 中的 Location 作为 workaround

  - 可见列表使用 sayable 中的 Contact 作为 workaround

- @所有人

  - @群聊 ID 来表示@所有人

  - 需要新版本的 messageSendText 方法传递 contactId ，底层构造消息体

基于会议内容，我们提出了 Wechaty 2.0 功能预览：

- 新功能：视频号消息。
  
  视屏号消息是微信生态特有的一种消息，类似于分享自己空间的一个视频、照片（是的，视频号也可以发照片）、直播等。这一功能设计已基本完成。

- 新功能：系统消息。

  系统消息是指聊天框出现的灰色的小字，典型的就是 xxx 邀请 xxx 加入了群聊。当然加入群聊我们已经有 ROOM_JOIN 事件了，但系统的通知不仅如此，还有一些难以归类到现有的 Wechaty 事件中的。

- 概念更新：```message``` 与 ```post``` 。这一点主要针对 puppet 开发者，有一些概念需要更新一下。

  - 在我之前的观念里，```message``` 就单指一条消息，等于 IM 上两个人对话的其中一条。但经过交流，我理解任何可以发送的实体都可以是一条 ```message``` 。例如，我收到了一个朋友圈事件，包含了一些 ```sayable```。根据 wechaty 的代码，服务端的 ```post``` 传来的 ```sayableList``` 都是些 id ，需要把这些 id 作为 messageId 通过 ```messagePayload``` 去获取具体的内容。因此这些图片，虽然并非实际是两个人对话中产生的，但本质上也是一条 ```message```。另外，朋友圈的这些生成的 ```message``` ，其 talker 和 listener 都是发送者自己。
  - ```post``` 指有树状结构和多条 ```sayable``` 的结构。所以在发送引用消息时，因为要引用它，把它作为这棵树的根，因此要先把他用 ```toPost()``` 转化为 ```post``` 才能引用。

- 新功能：引用消息。可以使用 ```message.reply()``` 来发送引用消息。引用消息是一个 POST，这一调用相当于以下操作：

    ```ts
      const builder = bot.Wechaty.builder()
      builder.reply(message.toPost())
      builder.add(content)
      builder.type(Post.Message)
      const post = await builder.build()
      await contact.say(post)
    ```

- 朋友圈。朋友圈不是新功能了，之前在 wechaty 层就已经支持，但实际似乎没有 puppet 可以发送。 WorkPro 支持发送朋友圈，但是是通过体验版的实现方式。在理解了上面的 ```message``` 概念之后，发送朋友圈应该是水到渠成的功能。期待有更多的 puppet 可以支持这一功能。

- 新功能：@所有人消息。之前@所有人主要通过 ```roomAnnounce()``` 来完成。因为在微信生态里，发送群公告会同时发送一条相同内容的@所有人消息。现在我们会通过将 mentionId 设为 roomId 的方式来标识我们要@这个群的所有人。

- 改版：```messageSendText``` 。现有的 ```messageSendText``` 的问题在于，由于 ```text``` 参数是一个 ```string``` ，难以将@的人和具体的位置对应上，这在发送@xxx在句子开头的时候很方便，但在句子中间的时候就比较麻烦。因此计划改为如下的样子。另外，在发送@消息时，目前 wechaty 会把 text 中被@部分用@xxx的名字替换，这是为了最早编写 wechat puppet 所做的妥协。而通过 id 来@人很明显是一个更好的方案，因此 wechaty 将不再把 text 中的 contactId 替换为 @xxx，而是保留 ```@${id}``` 的样子。

  ```ts
    abstract messageSendText (conversationId: string, text: string[], mentionIdList?: string[]) : Promise<void | string>
  ```

- 改进：批量删除、添加群成员。

- 新功能：文件懒加载和元数据。读过 puppet-service 源码的朋友们应该比较了解 uuid 类型的 FileBox ，这种类型的 FileBox 会在 ```toXXX()``` 的时候才真正从服务端下载。现在我们更进一步，服务端在找不到对应的 uuid 文件时，会尝试从 IM 下载。也就是说，可以实现彻底的懒加载，在你要保存这个文件的时候，文件才会从 IM 下载下来。同时，你可以通过 metadata 中的相关信息，例如长宽、时长、文件名等信息来决定是否需要下载文件。

- BugFix: 困扰长久的 RoomMember Dirty bug 将会得到修复，详情可参考 [issue](https://github.com/wechaty/wechaty/issues/2410)。

- 新的系统事件： ROOM_OWNER 、 ROOM_ANNOUNCE 等等。

- 系统级的 Dirty 事件，当你在任何群、联系人的属性有变化的时候都会得到通知。

- 标签组系统： 还在讨论阶段，主要适配企业微信。

这些功能都在紧锣密鼓的开发中。可以关注这个 [issue](https://github.com/wechaty/wechaty/issues/2535) 来获取最新进度。敬请期待。
