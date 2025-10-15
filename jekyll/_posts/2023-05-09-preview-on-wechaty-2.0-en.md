---
title: "Plans and Preview for Wechaty 2.0"
author: wang-nan
categories: announcement
tags:
  - talk
  - meetup
  - news
image: /assets/2023/05-preview-on-wechaty-2.0-en/logo.webp
excerpt: "We are excited to share our plans for Wechaty 2.0, which will merge experimental features into the main branch. This update includes new functionalities like video channel messages, system messages, message quoting, and Moments support, along with significant improvements to existing features."
---

For those using the WorkPro Token, you may be aware that Wechaty has an experimental version, `@juzi/wechaty`, which allows you to try out features not yet supported in the main Wechaty branch, such as Moments, message quoting, and mentioning everyone (@all). We have been working hard to merge these features into the main community branch to make them accessible to more users. Recently, we had a brief meeting with [Huan](https://wechaty.js.org/contributors/huan/) (you can view the summary [here](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.si1xxj2xji7f)) to discuss the design of these new features, and we have reached a general consensus. This marks a significant step toward launching these new features in the main branch. You can track the progress of these features in this [issue](https://github.com/wechaty/wechaty/issues/2535). Here is a brief overview.

## Meeting Discussion Summary

- A `messagePreview` might be needed to get information before actually downloading media.
  - Use a UUID FileBox for lazy loading.
  - Use the metadata of the FileBox to transmit metadata.

- New system messages.
  - If the IM has corresponding system messages, new events can be added.
  - Trigger a "Dirty" event at the bot layer to notify of data updates.

- Quoted messages.
  - Implement using `Post` and `message.toPost`.

- Moments (Post).
  - The payload in `sayableList` needs to be constructed as a `message`, where both the `talker` and `listener` are the bot itself.
  - Use `Location` in `sayable` as a workaround for the location of Moments.
  - Use `Contact` in `sayable` as a workaround for the visibility list.

- Mentioning everyone (@all).
  - Use `@<group_chat_id>` to represent mentioning everyone.
  - A new version of the `messageSendText` method is needed to pass the `contactId`, and the underlying layer will construct the message body.

Based on the meeting, we are proposing a preview of Wechaty 2.0 features:

- **New Feature: Video Channel Messages.**
  Video channel messages are a unique message type in the WeChat ecosystem, similar to sharing a video, photo (yes, video channels can also post photos), or live stream from one's own space. The design for this feature is nearly complete.

- **New Feature: System Messages.**
  System messages are the small gray text that appears in the chat box, such as "xxx invited xxx to the group chat." While we already have the `ROOM_JOIN` event for joining a group, system notifications include more than that, and some are difficult to categorize into existing Wechaty events.

- **Concept Update: `message` vs. `post`.** This is mainly for puppet developers, as some concepts need to be updated.
  - Previously, I thought a `message` was just a single message, equivalent to one line in a conversation between two people. After our discussion, I now understand that any sendable entity can be a `message`. For example, when I receive a Moments event, it contains some `sayable` items. According to Wechaty's code, the `sayableList` from a server-side `post` contains IDs, and these IDs need to be used as `messageId` to fetch the specific content via `messagePayload`. Therefore, these images, although not generated in a two-person conversation, are essentially `message`s. Additionally, for these generated `message`s from Moments, both the `talker` and `listener` are the sender.
  - A `post` refers to a structure with a tree-like hierarchy and multiple `sayable` items. So, when sending a quoted message, you need to first convert it to a `post` using `toPost()` to make it the root of the tree before you can quote it.

- **New Feature: Quoted Messages.** You can use `message.reply()` to send a quoted message. A quoted message is a `POST`, and this call is equivalent to the following operation:

  ```ts
  const builder = bot.Wechaty.builder()
  builder.reply(message.toPost())
  builder.add(content)
  builder.type(Post.Message)
  const post = await builder.build()
  await contact.say(post)
  ```

- **Moments.** Moments is not a new feature, as it was previously supported at the Wechaty layer, but it seems no puppet could actually send them. WorkPro supports sending Moments, but it uses an experimental implementation. After understanding the `message` concept above, sending Moments should be a straightforward feature to implement. We look forward to more puppets supporting this functionality.

- **New Feature: Mentioning Everyone (@all) Messages.** Previously, mentioning everyone was mainly done through `roomAnnounce()`. This is because, in the WeChat ecosystem, sending a group announcement also sends an @all message with the same content. Now, we will identify an @all mention by setting the `mentionId` to the `roomId`.

- **Revision: `messageSendText`**
  The problem with the existing `messageSendText` is that since the `text` parameter is a `string`, it's difficult to map the mentioned person to a specific position. This is convenient when mentioning someone at the beginning of a sentence but becomes troublesome in the middle of a sentence. Therefore, we plan to change it to the following. Additionally, when sending a mention message, Wechaty currently replaces the mentioned part of the text with `@<name>`, which was a compromise made for the earliest WeChat puppet. A better solution is to mention by ID, so Wechaty will no longer replace the `contactId` in the text with `@<name>` but will keep it as `@${id}`.

  ```ts
  abstract messageSendText (conversationId: string, text: string[], mentionIdList?: string[]) : Promise<void | string>
  ```

- **Improvement: Batch Deleting and Adding Group Members.**

- **New Feature: Lazy Loading and Metadata for Files.** Those who have read the `puppet-service` source code should be familiar with the UUID-type `FileBox`. This type of `FileBox` only downloads from the server when `toXXX()` is called. Now, we are taking it a step further: when the server cannot find the corresponding UUID file, it will try to download it from the IM. This means we can achieve true lazy loading, where the file is only downloaded from the IM when you need to save it. At the same time, you can use the metadata, such as width, height, duration, and filename, to decide whether you need to download the file.

- **Bug Fix:** The long-standing `RoomMember` Dirty bug will be fixed. For details, see this [issue](https://github.com/wechaty/wechaty/issues/2410).

- **New System Events:** `ROOM_OWNER`, `ROOM_ANNOUNCE`, and more.

- **System-level Dirty Events:** You will be notified whenever the properties of any group or contact change.

- **Tagging System:** Still in the discussion phase, mainly for adapting to Enterprise WeChat.

These features are all under active development. You can follow this [issue](https://github.com/wechaty/wechaty/issues/2535) to get the latest updates. Stay tuned!

> This post is also available in [Chinese (Simplified)](/2023/05/09/preview-on-wechaty-2.0/).
