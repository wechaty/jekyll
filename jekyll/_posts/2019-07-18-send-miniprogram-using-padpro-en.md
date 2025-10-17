---
title: "How to Send WeChat Mini Programs Using PadPro"
author: limingth
categories: feature
tags:
  - code
  - featured
  - ecosystem
image: /assets/2019/maodou-ketang-demo.webp
---

> This post is also available in [Chinese](/2019/07/18/send-miniprogram-using-padpro/)

Three months ago, on April 18, 2019, our company launched a mini program project called **Maodou Classroom**. This project leverages [Maodou.io](https://maodou.io)'s audio-video interactive live streaming technology to build an online education platform focused on children's quality education courses.

Currently, the MVP of this mini program has been approved by WeChat and is live. It has initially implemented features allowing parents (such as a child's mother) to set time reminders for their child's courses. The reminder methods include four common notification channels: mini program messages, SMS, phone calls, and emails. Forwarding a course can also invite course-related people (such as the child's father, classmates' parents, and course teachers) to join the course reminder. Future plans include developing social features similar to a parents' social feed. If you're interested in trying it out, you can scan this [Maodou Classroom Mini Program QR code](/assets/2019/maodou-ketang-invite-qrcode.webp).

A month ago, we felt that the process of creating course reminders through this mini program was still not convenient enough. We wondered if we could create reminders through chat in WeChat. For example, if a child's mother sends a message like `"Tonight at 6 PM, Chenchen's English class at Business Center 1101"`, the father who receives the message could forward it to a WeChat bot, which would automatically create this course reminder for the father, so he can be reminded to take the child to class. When I had this idea, I happened to meet Huan Li on my way out with my child, and I naturally thought of using [Wechaty](https://github.com/wechaty/wechaty/), this amazing open-source WeChat bot project.

Actually, I had known about this project for several years, but when I logged into GitHub and saw [Huan](https://github.com/huan)'s over 5,000 commits, I was still shocked. Countless thoughts ran through my mind—Zixia is still Zixia, and he's still writing code. Orz. In addition to admiration, I spent the next week working day and night. Although I only had a background in C language and ARM assembly, I implemented our [maodou-ketang-bot](https://github.com/maodouio/wechaty-getting-started/blob/master/examples/third-party/maodou/README.md) based on learning the [xiaoli-news-bot](https://github.com/wechaty/wechaty-getting-started/tree/master/examples/third-party/xiaoli) code framework. If you're interested in trying it out, you can scan this [Maodou Classroom Assistant QR code](/assets/2019/maodou-ketang-qrcode.webp), add it as a friend, and forward that message from the child's mother to it.

![Maodou Classroom Demo](/assets/2019/maodou-ketang-demo.webp)

As you can see, the assistant replies with 2 messages: one is text that parses the time, location, and title from the text; the other is a mini program that creates a corresponding message reminder. However, at that time, the underlying Wechaty did not support sending mini programs—it could only send text, images, contact cards, and links.

For initial testing, we used wechaty+puppeteer and found that it couldn't send images or mini programs. After communicating with Huan Li, he suggested using puppet-padpro and even gave us one of his treasured tokens for development. We then discovered that Wechaty is really powerful—it can connect to different puppets, and puppet-padpro is the iPad version of the puppet.

At the same time, we learned that [Simon](https://github.com/lhr0909) had already done a lot of [underlying work](https://github.com/xanthous-tech/wechaty-puppet-padpro/commit/057927caf64f4b811b7269adfc18c7c8dec86efd) on puppet-padpro in this area. He was just a little short of implementing mini program sending but didn't have time to continue. So, based on his work, we conducted experiments and modifications and found that we only needed to add the filekey field to the underlying XML protocol. Subsequently, I opened a related [#issue Send Mini-Program](https://github.com/wechaty/wechaty/issues/1806), and then my colleague [@zhaoic](https://github.com/zhaoic) participated in completing the subsequent development work, initially solving this problem and submitting a code PR.

For those who want to learn more about this PR, you can directly visit the following 3 links. I've also excerpted important code sections in this article to provide more clues for those interested in understanding this work.

* <https://github.com/wechaty/wechaty/pull/1822/files>
* <https://github.com/wechaty/wechaty-puppet/pull/55/files>
* <https://github.com/botorange/wechaty-puppet-padpro/pull/172/files>

Below, I will focus on introducing how we implemented sending WeChat mini programs.

## Table of Contents

* Background Introduction to Maodou Classroom Project  
* How to Implement Sending WeChat Mini Programs Using PadPro  
* Further Work to be Completed  

## How to Implement Sending WeChat Mini Programs Using PadPro

The process of implementing code changes to send mini programs involves three libraries: wechaty, wechaty-puppet, and wechaty-puppet-padpro. Regarding the relationship between these three libraries, I recommend reading [Summary of Learning Wechaty and Padpro](https://wechaty.github.io/summary-of-learning-wechaty-and-padpro) written by another expert, [Su Chang](https://github.com/su-chang). It clearly outlines the top-to-bottom three layers: the interface layer, abstract layer, and implementation layer. I won't elaborate on this here, but I will explain the code modification process we undertook.

To make changes from top to bottom, the amount of code modification would be very large. To quickly get the mini program flow working, after analysis, we found that the UrlLink structure is quite similar to mini programs. This way, we didn't need to modify the wechaty and wechaty-puppet libraries—only modify the wechaty-puppet-padpro library, greatly reducing the workload.

Simon's wechaty-puppet-padpro library had already implemented most of the mini program functionality. Based on this, we first modified the `forwardAttachment` function in the puppet-padpro.ts file. This function calls `generateAttachmentXMLMessageFromRaw`. After we replaced the content of this function with the parsed mini program XML, forwarding mini programs was successful, and the basic flow was working.

Next, we continued to modify the `messageSendUrl` function. Following the pattern of `generateAttachmentXMLMessageFromRaw`, we created a new function `generateMiniProgramXMLMessageFromRaw` and changed the underlying call of messageSendUrl to this new function: `await this.padproManager.GrpcSendApp(id, generateMiniProgramXMLMessageFromRaw(urlLinkPayload))`. Through `urlLinkPayload`, we passed two parameters: the mini program's `title` and `url`. After testing, through `say(urlLink)`, we could send mini programs.

After verification of feasibility and confirmation that the underlying system could send mini programs, we began the specific code and file modification work in the three libraries.

### wechaty Interface Layer

* Add a new file src/user/mini-program.ts, defining a new Class

```ts
export class MiniProgram {

  /**
   *
   * Create
   *
   */
  public static async create (): Promise<MiniProgram> {
    log.verbose('MiniProgram', 'create()')

    // TODO: get title/description/thumbnailUrl from url automatically
    const payload: MiniProgramPayload = {
      appid              : 'todo',
      description        : 'todo',
      pagepath           : 'todo',
      thumbnailurl       : 'todo',
      title              : 'todo',
      username           : 'todo',
    }

    return new MiniProgram(payload)
  }

  constructor (
    public readonly payload: MiniProgramPayload,
  ) {
    log.verbose('MiniProgram', 'constructor()')
  }

  public appid (): undefined | string {
    return this.payload.appid
  }

  public title (): undefined | string {
    return this.payload.title
  }

  public pagepath (): undefined | string {
    return this.payload.pagepath
  }

  public username (): undefined | string {
    return this.payload.username
  }

  public description (): undefined | string {
    return this.payload.description
  }

  public thumbnailurl (): undefined | string {
    return this.payload.thumbnailurl
  }

}
```

* Update three files src/user/contact.ts, src/user/message.ts, src/user/room.ts, adding the say interface

src/user/contact.ts

```ts
  public async say (textOrContactOrFileOrUrlOrMini: string | Contact | FileBox | UrlLink | MiniProgram): Promise<void> {
    log.verbose('Contact', 'say(%s)', textOrContactOrFileOrUrlOrMini)

    if (typeof textOrContactOrFileOrUrlOrMini === 'string') {
      /**
       * 1. Text
       */
      await this.puppet.messageSendText({
        contactId: this.id,
      }, textOrContactOrFileOrUrlOrMini)
    } else if (textOrContactOrFileOrUrlOrMini instanceof Contact) {
      /**
       * 2. Contact
       */
      await this.puppet.messageSendContact({
        contactId: this.id,
      }, textOrContactOrFileOrUrlOrMini.id)
    } else if (textOrContactOrFileOrUrlOrMini instanceof FileBox) {
      /**
       * 3. File
       */
      await this.puppet.messageSendFile({
        contactId: this.id,
      }, textOrContactOrFileOrUrlOrMini)
    } else if (textOrContactOrFileOrUrlOrMini instanceof UrlLink) {
      /**
       * 4. Link Message
       */
      await this.puppet.messageSendUrl({
        contactId : this.id,
      }, textOrContactOrFileOrUrlOrMini.payload)
    } else if (textOrContactOrFileOrUrlOrMini instanceof MiniProgram) {
      /**
       * 5. Mini Program
       */
      await this.puppet.messageSendMiniProgram({
        contactId : this.id,
      }, textOrContactOrFileOrUrlOrMini.payload)
    } else {
      throw new Error('unsupported arg: ' + textOrContactOrFileOrUrlOrMini)
    }
  }
```

src/user/message.ts

```ts
  public async say (
    textOrContactOrFileOrUrlOrMini : string | Contact | FileBox | UrlLink | MiniProgram,
  ): Promise<void> {
    log.verbose('Message', 'say(%s)', textOrContactOrFileOrUrlOrMini)

    // const user = this.puppet.userSelf()
    const from = this.from()
    // const to   = this.to()
    const room = this.room()

    if (typeof textOrContactOrFileOrUrlOrMini === 'string') {
      /**
       * Text Message
       */
      await this.puppet.messageSendText({
        contactId : (from && from.id) || undefined,
        roomId    : (room && room.id) || undefined,
      }, textOrContactOrFileOrUrlOrMini)
    } else if (textOrContactOrFileOrUrlOrMini instanceof Contact) {
      /**
       * Contact Card
       */
      await this.puppet.messageSendContact({
        contactId : (from && from.id) || undefined,
        roomId    : (room && room.id) || undefined,
      }, textOrContactOrFileOrUrlOrMini.id)
    } else if (textOrContactOrFileOrUrlOrMini instanceof FileBox) {
      /**
       * File Message
       */
      await this.puppet.messageSendFile({
        contactId : (from && from.id) || undefined,
        roomId    : (room && room.id) || undefined,
      }, textOrContactOrFileOrUrlOrMini)
    } else if (textOrContactOrFileOrUrlOrMini instanceof UrlLink) {
      /**
       * Link Message
       */
      await this.puppet.messageSendUrl({
        contactId : (from && from.id) || undefined,
        roomId    : (room && room.id) || undefined,
      }, textOrContactOrFileOrUrlOrMini.payload)
    } else if (textOrContactOrFileOrUrlOrMini instanceof MiniProgram) {
      /**
       * MiniProgram
       */
      await this.puppet.messageSendMiniProgram({
        contactId : (from && from.id) || undefined,
        roomId    : (room && room.id) || undefined,
      }, textOrContactOrFileOrUrlOrMini.payload)
    } else {
      throw new Error('unknown msg: ' + textOrContactOrFileOrUrlOrMini)
    }
  }
```

src/user/room.ts

```ts
  public async say (
    textOrListOrContactOrFileOrUrl : string | Contact | FileBox | UrlLink | MiniProgram | TemplateStringsArray,
    ...mentionList                 : Contact[]
  ): Promise<void> {

    log.verbose('Room', 'say(%s, %s)',
      textOrListOrContactOrFileOrUrl,
      mentionList.join(', '),
    )

    let text: string

    if (typeof textOrListOrContactOrFileOrUrl === 'string') {

      if (mentionList.length > 0) {
        const AT_SEPARATOR = FOUR_PER_EM_SPACE
        const mentionAlias = await Promise.all(mentionList.map(async contact =>
          '@' + (await this.alias(contact) || contact.name())
        ))
        const mentionText = mentionAlias.join(AT_SEPARATOR)

        text = mentionText + ' ' + textOrListOrContactOrFileOrUrl
      } else {
        text = textOrListOrContactOrFileOrUrl
      }
      const receiver = {
        contactId : (mentionList.length && mentionList[0].id) || undefined,
        roomId    : this.id,
      }
      await this.puppet.messageSendText(
        receiver,
        text,
        mentionList.map(c => c.id),
      )
    } else if (textOrListOrContactOrFileOrUrl instanceof FileBox) {
      /**
       * 2. File Message
       */
      await this.puppet.messageSendFile({
        roomId: this.id,
      }, textOrListOrContactOrFileOrUrl)
    } else if (textOrListOrContactOrFileOrUrl instanceof Contact) {
      /**
       * 3. Contact Card
       */
      await this.puppet.messageSendContact({
        roomId: this.id,
      }, textOrListOrContactOrFileOrUrl.id)
    } else if (textOrListOrContactOrFileOrUrl instanceof UrlLink) {
      /**
       * 4. Link Message
       */
      await this.puppet.messageSendUrl({
        contactId : this.id,
      }, textOrListOrContactOrFileOrUrl.payload)
    } else if (textOrListOrContactOrFileOrUrl instanceof MiniProgram) {
      /**
       * 5. Mini Program
       */
      await this.puppet.messageSendMiniProgram({
        contactId : this.id,
      }, textOrListOrContactOrFileOrUrl.payload)
    } else if (textOrListOrContactOrFileOrUrl instanceof Array) {
      await this.sayTemplateStringsArray(
        textOrListOrContactOrFileOrUrl,
        ...mentionList,
      )
    } else {
      throw new Error('arg unsupported: ' + textOrListOrContactOrFileOrUrl)
    }
  }
```

### wechaty-puppet Abstract Layer

* Add a new file src/schemas/mini-program.ts, defining an Interface

```ts
export interface MiniProgramPayload {
    appid?          : string,    // optional, appid, get from wechat (mp.weixin.qq.com)
    description?    : string,    // optional, mini program title
    pagepath?       : string,    // optional, mini program page path
    thumbnailurl?   : string,    // optional, default picture, convert to thumbnail
    title?          : string,    // optional, mini program title
    username?       : string,    // original ID, get from wechat (mp.weixin.qq.com)
}
```

* Update src/puppet.ts, declaring messageMiniProgram and messageSendMiniProgram abstract interfaces

```ts
  public abstract async messageMiniProgram (messageId: string)  : Promise<MiniProgramPayload>

  public abstract async messageSendMiniProgram (receiver: Receiver, miniProgramPayload: MiniProgramPayload)          : Promise<void>
```

### wechaty-puppet-padpro Implementation Layer

* Update src/puppet-padpro.ts, adding implementations of messageMiniProgram and messageSendMiniProgram

```ts
  public async messageSendMiniProgram (
    receiver: Receiver,
    miniProgramPayload: MiniProgramPayload
  ): Promise<void> {
    log.verbose(PRE, `messageSendLink("${JSON.stringify(receiver)}", ${JSON.stringify(miniProgramPayload)})`)

    if (!this.padproManager) {
      throw new Error('no padpro manager')
    }

    // Send to the Room if there's a roomId
    const id = receiver.roomId || receiver.contactId

    if (!id) {
      throw Error('no id')
    }

    await this.padproManager.GrpcSendApp(id, generateMiniProgramXMLMessage(miniProgramPayload))
  }
```

```ts
  public async messageMiniProgram (messageId: string): Promise<MiniProgramPayload> {

    const rawPayload = await this.messageRawPayload(messageId)
    const payload = await this.messagePayload(messageId)

    if (payload.type !== MessageType.MiniProgram) {
      throw new Error('Can not get miniProgram from non miniProgram payload')
    } else {
      const appPayload = await appMessageParser(rawPayload)
      if (appPayload) {
        return {
        }
      } else {
        throw new Error('Can not parse miniProgram message payload')
      }
    }
  }
```

* Update src/pure-function-helpers/app-message-generator.ts, adding the implementation of generateMiniProgramXMLMessage

```ts
export const generateMiniProgramXMLMessage = (payload: MiniProgramPayload): string => {
  return `
  <appmsg appid="" sdkver="0">
    <title>${payload.title}</title>
    <des>${payload.description}</des>
    <action/>
    <type>33</type>
    <showtype>0</showtype>
    <soundtype>0</soundtype>
    <mediatagname/>
    <messageext/>
    <messageaction/>
    <content/>
    <contentattr>0</contentattr>
    <url>https://mp.weixin.qq.com/mp/waerrpage?appid=${payload.appid}&amp;type=upgrade&amp;upgradetype=3#wechat_redirect</url>
    <lowurl/>
    <dataurl/>
    <lowdataurl/>
    <appattach>
      <totallen>0</totallen>
      <attachid/>
      <emoticonmd5/>
      <fileext/>
      <cdnthumburl></cdnthumburl>
      <cdnthumbmd5></cdnthumbmd5>
      <cdnthumblength></cdnthumblength>
      <cdnthumbwidth></cdnthumbwidth>
      <cdnthumbheight></cdnthumbheight>
      <cdnthumbaeskey></cdnthumbaeskey>
      <aeskey></aeskey>
      <encryver>0</encryver>
      <filekey></filekey>
    </appattach>
    <extinfo/>
    <sourceusername>${payload.username}@app</sourceusername>
    <sourcedisplayname>${payload.description}</sourcedisplayname>
    <thumburl/>
    <md5/>
    <statextstr/>
    <weappinfo>
      <username><![CDATA[${payload.username}@app]]></username>
      <appid><![CDATA[${payload.appid}]]></appid>
      <type>2</type>
      <version></version>
      <weappiconurl><![CDATA[]]></weappiconurl>
      <pagepath><![CDATA[${payload.pagepath}]]></pagepath>
      <shareId><![CDATA[0_${payload.appid}_858901320_1563444358_0]]></shareId>
      <appservicetype>0</appservicetype>
    </weappinfo>
  </appmsg>
  <fromusername></fromusername>
  <scene>0</scene>
  <appinfo>
    <version>1</version>
    <appname/>
  </appinfo>
  <commenturl/>`
}
```

## Further Work to be Completed

### Analysis of Underlying Mini Program XML Protocol

To send a mini program in padpro, you need to first enable the debug switch `PADPRO_LOG='silly'` to receive a mini program in order to get information like the above. We then serialize the saved information, explore patterns, find variables, extract common template data, and programmatically construct XML data for sending mini programs.

General process:

1. Query mini program information based on appid (need to research how to do this)
2. Store the obtained information (if querying is convenient, this operation may be skipped)
3. Construct a common template
4. Embed the obtained information into the template
5. Use the resulting XML structure as the return data for messageSendMiniProgram

We posted the captured underlying XML protocol [here](https://github.com/wechaty/wechaty/issues/1806). Friends interested in deeper research can continue to analyze these underlying protocol fields. Although we guessed some key fields and implemented basic sending functionality, we don't know if the WeChat server monitors field completeness or correctness—after all, it's easy to blacklist a bot through such hacking methods.

### CDN Upload for thumbnailUrl

The relationship between the view and interface input data for a sent mini program is shown in the diagram below:

![MiniProgramPayload](/assets/2019/maodou-miniprogram-spec.webp)

Currently, appid, description, pagepath, title, and username are relatively easy to obtain. For thumbnailUrl, we referenced the UrlLink structure. The thumbnail for this area can allow the caller to pass in a thumbnailUrl for an image. The underlying code should also do the following 2 subsequent tasks in the future, which have not yet been implemented due to time constraints.

1. Call FileBox.fromUrl to get this image file
2. Call the CDN upload file function provided by WeChat to get the following data structure:

```json
  thumbnail: {
    cdnthumburl:
    cdnthumbmd5:
    cdnthumblength:
    cdnthumbwidth:
    cdnthumbheight:
    cdnthumbaeskey:
    aeskey:
    filekey:
  }
```

Currently, in the underlying XML protocol sent, fields like cdnthumbnailurl, aeskey, and filekey are all extracted from existing mini programs. This area may need further refinement in the future.

### NLP Help Needed

Currently, the NLP Parser used by the bot is [@microsoft/recognizers-text-suite](https://github.com/microsoft/Recognizers-Text) provided by Microsoft. We use it to extract time variables from a sentence, which is a simple function like `const time = parseTime(msgText)`. However, the result of Microsoft NLP processing is actually a complex JSON return value, and we still need to write a lot of code to filter out the time results we expect. These codes are in the [getTimeInResults](https://github.com/maodouio/wechaty-getting-started/blob/master/examples/third-party/maodou/maodou-nlp.js) function, appearing verbose and low-level. We hope someone can tell us a better parseTime.

In addition to time, identifying the course title and class location from a sentence is also what we need, but Microsoft NLP doesn't support it yet. So we used another [BasonNLP NER](http://docs.bosonnlp.com/ner.html), but its processing result is also a complex JSON return value, and we still need to use parts of speech to piece together the results we expect. These codes are in another function [parseTitleAndLocation](https://github.com/maodouio/wechaty-getting-started/blob/master/examples/third-party/maodou/maodou-nlp.js), appearing low-level and amateurish. We also look forward to more elegant AI to save us.

Nowadays, NLP is a standard feature in intelligent API suites provided by various major companies, but after testing from Tencent, Baidu, Alibaba to iFlytek to Fudan NLP, we haven't found an API that can conveniently and accurately identify time/location/theme. If anyone is familiar with this area, please let me know. Welcome to add my WeChat: limingth

## Acknowledgments

* **Simon Liang**'s code had already done most of the underlying work. Without his pioneering achievements paving the way, we would have had difficulty completing this task.
* **Su Chang** wrote the documentation for setting up the local development environment, saving us time in getting the development environment running locally. He also provided enthusiastic help during the code modification process, and more importantly, he's handsome.
* I also want to thank @Gao Yuan ོ and @Shanmu in the WeChat PR group for confirming that CDNManager can solve the thumbnailUrl in the unfinished work. We look forward to improving this part of the code together in the future.
* Finally, thanks to the Wechaty team for providing such a great tool, thanks to Huan Li and Jiarui Li for doing so much foundational work in the early stages, and I'm also happy to meet Yunjun Li, who is working on [Teamin Group Collaboration](https://www.teamin.cc/), through this project. So many people surnamed Li doing things together is very fun! :P

> Author: [limingth](https://github.com/limingth), [zhaoic](https://github.com/zhaoic) Maodou.io
