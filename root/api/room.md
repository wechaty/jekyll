---
description: 所有的微信群都会被封装成 Room 类
---

# Room

## Room

所有的微信群都会被封装成 Room类。

[Examples/Room-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/room-bot.ts)

**Kind**: global class  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| id | `string` | 获取群id。这个id 是否是永久不变的id 取决于使用哪一个puppet，具体 [查看puppet兼容性清单](../puppet.md#puppet-compatibility)。 |

* [Room](room.md#room)
  * _instance_
    * [.sync\(\)](room.md#room-sync-promise) ⇒ `Promise <void>`
    * [.say\(textOrContactOrFileOrUrl, \[mention\]\)](room.md#room-say-textorcontactorfileorurl-mention-promise) ⇒ `Promise <void>`
    * [.on\(event, listener\)](room.md#room-on-event-listener-this) ⇒ `this`
    * [.add\(contact\)](room.md#room-add-contact-promise) ⇒ `Promise <void>`
    * [.del\(contact\)](room.md#room-del-contact-promise) ⇒ `Promise <void>`
    * [.quit\(\)](room.md#room-quit-promise) ⇒ `Promise <void>`
    * [.topic\(\[newTopic\]\)](room.md#room-topic-newtopic-promise) ⇒ `Promise <void | string>`
    * [.announce\(\[text\]\)](room.md#room-announce-text-promise) ⇒ `Promise <void | string>`
    * [.qrcode\(\)](room.md#room-qrcode-promise) ⇒ `Promise <string>`
    * [.alias\(contact\)](room.md#room-alias-contact-promise) ⇒ `Promise <null | string>`
    * [.has\(contact\)](room.md#room-has-contact-promise) ⇒ `Promise <boolean>`
    * [.memberAll\(\[query\]\)](room.md#room-memberall-query-promise-greater-than) ⇒ `Promise <Contact []>`
    * [.member\(query\)](room.md#room-member-queryarg-promise) ⇒ `Promise <null | Contact>`
    * [.owner\(\)](room.md#room-owner-contact-or-null) ⇒ `Contact` \| `null`
    * [.avatar\(\)](room.md#room-owner-contact-or-null) ⇒ `Promise <FileBox>`
  * _static_
    * [.create\(contactList, \[topic\]\)](room.md#room-create-contactlist-topic-promise) ⇒ `Promise <Room>`
    * [.findAll\(\[query\]\)](room.md#room-findall-query-promise-greater-than) ⇒ `Promise <Room[]>`
    * [.find\(query\)](room.md#room-findall-query-promise-greater-than) ⇒ `Promise <Room>`

### room.sync\(\) ⇒ `Promise <void>`

强制加载群的数据，从底层API 重新加载数据。

**Kind**: instance method of [`Room`](room.md#room)  
**Example**

```javascript
await room.sync()
```

### room.say\(textOrContactOrFileOrUrl, ...mentionList\) ⇒ `Promise.`

在群内发消息，如果设置了 ...mentionList 参数，机器人在群内发送消息的时候还会@这个联系人。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

> **Kind**: instance method of [`Room`](room.md#room)

| Param | Type | Description |
| :--- | :--- | :--- |
| textOrContactOrFileOrUrl | `string` \| `Contact` \| `FileBox` \| `UrlLiink` | 群内发送 `text` 或者`media file` 或者`链接` 。你可以通过 [FileBox](https://www.npmjs.com/package/file-box) 来发送文件。 |
| mentionList | `Contact[]` | 可选参数，当设置这个参数的时候，在群内发送文本消息会@此联系人。 |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'wechaty'})

// 1. Send text inside Room

await room.say('Hello world!')

// 2. Send media file inside Room
import { FileBox }  from 'file-box'
const fileBox1 = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
const fileBox2 = FileBox.fromLocal('/tmp/text.txt')
await room.say(fileBox1)
await room.say(fileBox2)

// 3. Send Contact Card in a room
const contactCard = await bot.Contact.find({name: 'lijiarui'}) // change 'lijiarui' to any of the room member
await room.say(contactCard)

// 4. Send text inside room and mention @mention contact
const members = await room.memberAll() // memtion all members in this room
await room.say('Hello world!', ...members)

// 5. Send url link in a room
const urlLink = new UrlLink ({
  description: 'Wechaty is a Bot SDK for Wechat Individual Account which can help you create a bot in 6 lines of javascript, with cross-platform support including Linux, Windows, Darwin(OSX/Mac) and Docker.',
  thumbnailUrl: 'https://camo.githubusercontent.com/f310a2097d4aa79d6db2962fa42bb3bb2f6d43df/68747470733a2f2f6368617469652e696f2f776563686174792f696d616765732f776563686174792d6c6f676f2d656e2e706e67',
  title: 'Wechaty',
  url: 'https://github.com/chatie/wechaty',
})
await room.say(urlLink)
```

### room.on\(event, listener\) ⇒ `this`

**Kind**: instance method of [`Room`](room.md#room)  
**Returns**: `this` - - this for chain

| Param | Type | Description |
| :--- | :--- | :--- |
| event | [`RoomEventName`](room.md#RoomEventName) | 群内事件触发 |
| listener | [`RoomEventFunction`](room.md#RoomEventFunction) | 取决于是哪一个事件 |

**Example** _\(Event:join \)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'topic of your room'}) // change `event-room` to any room topic in your wechat
if (room) {
  room.on('join', (room, inviteeList, inviter) => {
    const nameList = inviteeList.map(c => c.name()).join(',')
    console.log(`Room got new member ${nameList}, invited by ${inviter}`)
  })
}
```

**Example** _\(Event:leave \)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'topic of your room'}) // change `event-room` to any room topic in your wechat
if (room) {
  room.on('leave', (room, leaverList) => {
    const nameList = leaverList.map(c => c.name()).join(',')
    console.log(`Room lost member ${nameList}`)
  })
}
```

**Example** _\(Event:topic \)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'topic of your room'}) // change `event-room` to any room topic in your wechat
if (room) {
  room.on('topic', (room, topic, oldTopic, changer) => {
    console.log(`Room topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
  })
}
```

**Example** _\(Event:invite \)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'topic of your room'}) // change `event-room` to any room topic in your wechat
if (room) {
  room.on('invite', roomInvitation => roomInvitation.accept())
}
```

### room.add\(contact\) ⇒ `Promise <void>`

邀请好友加入群聊。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)

基于网页微信开发的用户请查看： [Web version of WeChat closed group interface](https://github.com/Chatie/wechaty/issues/1441)
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)

| Param | Type |
| :--- | :--- |
| contact | `Contact` |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const contact = await bot.Contact.find({name: 'lijiarui'}) // change 'lijiarui' to any contact in your wechat
const room = await bot.Room.find({topic: 'wechat'})        // change 'wechat' to any room topic in your wechat
if (room) {
  try {
     await room.add(contact)
  } catch(e) {
     console.error(e)
  }
}
```

### room.del\(contact\) ⇒ `Promise <void>`

将好友移出群聊，这个功能仅在机器人是群主的时候会生效。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)

基于网页微信开发的用户请查看： [Web version of WeChat closed group interface](https://github.com/Chatie/wechaty/issues/1441)
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)

| Param | Type |
| :--- | :--- |
| contact | `Contact` |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'wechat'})          // change 'wechat' to any room topic in your wechat
const contact = await bot.Contact.find({name: 'lijiarui'})   // change 'lijiarui' to any room member in the room you just set
if (room) {
  try {
     await room.del(contact)
  } catch(e) {
     console.error(e)
  }
}
```

### room.quit\(\) ⇒ `Promise <void>`

机器人主动退群。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)  
**Example**

```javascript
await room.quit()
```

### room.topic\(\[newTopic\]\) ⇒ `Promise <void | string>`

设置 / 获取 群名称。

**Kind**: instance method of [`Room`](room.md#room)

| Param | Type | Description |
| :--- | :--- | :--- |
| newTopic | `string` | 参数可选，如果没有设置，则会获取群名称，如果设置了，则会设置群名称。 |

**Example** _\(当你在群里说话的时候，打印群名称 \)_

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const room = m.room()
  if (room) {
    const topic = await room.topic()
    console.log(`room topic is : ${topic}`)
  }
})
.start()
```

**Example** _\(当你在群内说话的时候，机器人修改群名称. \)_

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const room = m.room()
  if (room) {
    const oldTopic = await room.topic()
    await room.topic('change topic to wechaty!')
    console.log(`room topic change from ${oldTopic} to ${room.topic()}`)
  }
})
.start()
```

### room.announce\(\[text\]\) ⇒ `Promise <void | string>`

设置 / 获取 群公告。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#3-wechaty-puppet-jian-rong-xing)

这个功能仅在机器人是群主的时候生效。
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)

| Param | Type | Description |
| :--- | :--- | :--- |
| text | `string` | 如果设置了这个参数，则会设置群公告，如果没有设置，则是获取群公告。 |

**Example** _\(当你在群里说话的时候，打印群公告. \)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'your room'})
const announce = await room.announce()
console.log(`room announce is : ${announce}`)
```

**Example** _\(当你在群里说话的时候，修改群公告. \)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'your room'})
const oldAnnounce = await room.announce()
await room.announce('change announce to wechaty!')
console.log(`room announce change from ${oldAnnounce} to ${room.announce()}`)
```

### room.qrcode\(\) ⇒ `Promise <string>`

获取群二维码，用户可以通过扫描这个二维码加入群聊。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)

这个二维码仅在群人数小于100人的时候可用。
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)

### room.alias\(contact\) ⇒ `Promise <null | string>`

获取这个联系人在群内的群昵称。

**Kind**: instance method of [`Room`](room.md#room)  
**Returns**: `Promise <null | string>` - - 如果此联系人在群内设置了群昵称则会返回，否则会返回空。

| Param | Type |
| :--- | :--- |
| contact | `Contact` |

**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const room = m.room()
  const contact = m.from()
  if (room) {
    const alias = await room.alias(contact)
    console.log(`${contact.name()} alias is ${alias}`)
  }
})
.start()
```

### room.has\(contact\) ⇒ `Promise <boolean>`

检查群内是否有这个群成员。

**Kind**: instance method of [`Room`](room.md#room)  
**Returns**: `Promise <boolean>` - Return `true` if has contact, else return `false`.

| Param | Type |
| :--- | :--- |
| contact | `Contact` |

**Example** _\(Check whether 'lijiarui' is in the room 'wechaty'\)_

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const contact = await bot.Contact.find({name: 'lijiarui'})   // change 'lijiarui' to any of contact in your wechat
const room = await bot.Room.find({topic: 'wechaty'})         // change 'wechaty' to any of the room in your wechat
if (contact && room) {
  if (await room.has(contact)) {
    console.log(`${contact.name()} is in the room wechaty!`)
  } else {
    console.log(`${contact.name()} is not in the room wechaty!`)
  }
}
```

### room.memberAll\(\[query\]\) ⇒ `Promise <Contact []>`

根据 query 获取群内所有的群成员列表。如果没有设置query，返回所有的群成员信息。

#### 定义

* `name`                       微信联系人自己设置的昵称，等于 `Contact.name()`
* `roomAlias`             微信联系人自己在群内设置的昵称。
* `contactAlias`       机器人给微信联系人设置的，等于 `Contact.alias()`

**Kind**: instance method of [`Room`](room.md#room)

| Param | Type | Description |
| :--- | :--- | :--- |
| query | [`RoomQueryFilter`](room.md#roomqueryfilter) \| `string` | 1. RoomMemberQueryFilter 可通过 name, roomAlias, contactAlias 查找指定的群成员。<br>2. 当memberAll(name) 的参数为string 类型的时候, 返回所有找到的群成员。这里面的name 包括上面定义的name, roomAlias, contactAlias。|

### room.member\(query\) ⇒ `Promise <null | Contact>`

根据 query 获取群内的群成员。

#### 定义

* `name`                       微信联系人自己设置的昵称，等于 `Contact.name()`
* `roomAlias`             微信联系人自己在群内设置的昵称。
* `contactAlias`       机器人给微信联系人设置的，等于 `Contact.alias()`

**Kind**: instance method of [`Room`](room.md#room)

| Param | Type | Description |
| :--- | :--- | :--- |
| query | [`RoomQueryFilter`](room.md#roomqueryfilter) \| `string` | RoomMemberQueryFilter 可通过 name, roomAlias, contactAlias 查找指定的群成员。|


### room.owner\(\) ⇒ `Contact` \| `null`

获取群主的信息。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)  
**Example**

```javascript
const owner = room.owner()
```

### room.avatar\(\) ⇒ `Promise <FileBox>`

获取群头像的信息。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Room`](room.md#room)  
**Example**

```javascript
const owner = room.avatar()
```

### Room.create\(contactList, topic\) ⇒ `Promise <Room>`(room.md#Room)

创建群聊

**Kind**: static method of [`Room`](room.md#room)

| Param | Type |
| :--- | :--- |
| contactList | `Array` |
| topic | `string` |

**Example** _\(Creat a room with 'lijiarui' and 'juxiaomi', the room topic is 'ding - created'\)_

```javascript
const helperContactA = await Contact.find({ name: 'lijiarui' })  // change 'lijiarui' to any contact in your wechat
const helperContactB = await Contact.find({ name: 'juxiaomi' })  // change 'juxiaomi' to any contact in your wechat
const contactList = [helperContactA, helperContactB]
console.log('Bot', 'contactList: %s', contactList.join(','))
const room = await Room.create(contactList, 'ding')
console.log('Bot', 'createDingRoom() new ding room created: %s', room)
await room.topic('ding - created')
await room.say('ding - created')
```

### Room.findAll\(\[query\]\) ⇒ `Promise <Room []>`

通过 {topic: string \| RegExp}, 查找群，返回找到的所有群的数组。

**Kind**: static method of [`Room`](room.md#room)

| Param | Type |
| :--- | :--- |
| query | [`RoomQueryFilter`](room.md#roomqueryfilter) |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in
const roomList = await bot.Room.findAll()                    // get the room list of the bot
const roomList = await bot.Room.findAll({topic: 'wechaty'})  // find all of the rooms with name 'wechaty'
```

### Room.find\(query\) ⇒ `Promise <Room>`

通过 {topic: string \| RegExp}, 查找群，如果找到多个群，返回找到的第一个群。

**Kind**: static method of [`Room`](room.md#room)  
**Returns**: `Promise <Room>` -- If can find the room, return Room, or return null

| Param | Type |
| :--- | :--- |
| query | [`RoomQueryFilter`](room.md#roomqueryfilter) |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
// after logged in...
const roomList = await bot.Room.find()
const roomList = await bot.Room.find({topic: 'wechaty'})
```

## 类型定义      <a id="typedef"></a>

[RoomQueryFilter](room.md#RoomQueryFilter)

* [RoomQueryFilter](room.md#roomqueryfilter) ：查找群的过滤器，{topic: string \| RegExp}
* [RoomEventName](room.md#roomeventname) ：群事件的类型
* [RoomEventFunction](room.md#roomeventfunction) ：群事件的方法
* [RoomMemberQueryFilter](room.md#roommemberqueryfilter) ： 通过Room.member\(\) 搜索群成员的过滤器

### RoomQueryFilter

查找群的过滤器，{topic: string \| RegExp}

**Kind**: global typedef  
**Properties**

| Name | Type |
| :--- | :--- |
| topic | `string` |

### RoomEventName

群事件的类型

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| join | `string` | 当有人入群的时候，会触发这个事件。 |
| topic | `string` | 当有人修改群名称的时候，会触发这个事件。 |
| leave | `string` | 当有人离群的时候，会触发这个事件。如果是用户主动离群，是无法获取到这个事件的。 |

### RoomEventFunction

Room Class Event Function

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| room-join | `function` | \(this: Room, inviteeList: Contact\[\] , inviter: Contact\)  =&gt; void |
| room-topic | `function` | \(this: Room, topic: string, oldTopic: string, changer: Contact\) =&gt; void |
| room-leave | `function` | \(this: Room, leaver: Contact\) =&gt; void |

### RoomMemberQueryFilter

通过Room.member\(\) 搜索群成员的过滤器

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | 通过用户的昵称查找群成员，这里面的name 等于`Contact.name()`。 |
| roomAlias | `string` | 通过用户设置的群昵称查找群成员。 |
| contactAlias | `string` | 通过机器人给用户设置的备注查找群成员，这里面的contactAlias 等于 `Contact.alias()`。 更多细节查看： [More Detail](https://github.com/Chatie/wechaty/issues/365) |

