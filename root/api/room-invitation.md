---
description: 自动通过入群邀请
---

# RoomInvitation

## RoomInvitation

自动通过入群邀请

**Kind**: global class

* [RoomInvitation](room-invitation.md#roominvitation)
  * [.accept\(\)](room-invitation.md#roominvitation-accept-promise) ⇒ `Promise.`
  * [.inviter\(\)](room-invitation.md#roominvitation-inviter-contact) ⇒ `Contact`
  * [.topic\(\)](room-invitation.md#roominvitation-topic-contact) ⇒ `Promise`
  * [~~.roomTopic\(\)~~](room-invitation.md#roominvitation-roomtopic) ⇒ `Promise`
  * [.date\(\)](room-invitation.md#roominvitation-date-promise) ⇒ `Promise.`
  * [.age\(\)](room-invitation.md#roominvitation-age-number) ⇒ `number`

### roomInvitation.accept\(\) ⇒ `Promise.`

自动通过入群邀请

**Kind**: instance method of [`RoomInvitation`](room-invitation.md#roominvitation)  
**Example**

```javascript
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  try {
    console.log(`received room-invite event.`)
    await roomInvitation.accept()
  } catch (e) {
    console.error(e)
  }
}
.start()
```

### roomInvitation.inviter\(\) ⇒ `Contact`

获取发送入群邀请的联系人。

**Kind**: instance method of [`RoomInvitation`](room-invitation.md#roominvitation)  
**Example**

```javascript
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  const inviter = await roomInvitation.inviter()
  const name = inviter.name()
  console.log(`received room invitation event from ${name}`)
}
.start()
```

### roomInvitation.topic\(\) ⇒ `Promise`

获取需要进的群的群名称.

**Kind**: instance method of [`RoomInvitation`](room-invitation.md#roominvitation)  
**Example**

```javascript
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  const topic = await roomInvitation.topic()
  console.log(`received room invitation event from room ${topic}`)
}
.start()
```

### ~~roomInvitation.roomTopic\(\)~~

**Kind**: instance method of [`RoomInvitation`](room-invitation.md#RoomInvitation)  
**Deprecated:**: 请使用 [topic\(\) ](room-invitation.md#roominvitation-topic-contact)

### roomInvitation.date\(\) ⇒ `Promise.`

获取发送入群邀请的时间。

**Kind**: instance method of [`RoomInvitation`](room-invitation.md#roominvitation)

### roomInvitation.age\(\) ⇒ `number`

获取入群邀请的时间间隔。

例如：入群邀请的发送时间在 `8:43:01`, 当我们在Wechaty 上收到这个信息的时间是 `8:43:15`, 那么 age\(\) 的值为： `8:43:15 - 8:43:01 = 14 (seconds)`

**Kind**: instance method of [`RoomInvitation`](room-invitation.md#roominvitation)

