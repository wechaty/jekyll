---
description: All wechat messages will be encapsulated as a Message.
---

# Message

## Message

All wechat messages will be encapsulated as a Message.

[Examples/Ding-Dong-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

**Kind**: global class

* [Message](message.md#Message)
  * _instance_
    * [.from\(\)](message.md#Message+from) ⇒ `Contact` \| `null`
    * [.to\(\)](message.md#Message+to) ⇒ `Contact` \| `null`
    * [.room\(\)](message.md#Message+room) ⇒ `Room` \| `null`
    * [~~.content\(\)~~](message.md#Message+content)
    * [.text\(\)](message.md#Message+text) ⇒ `string`
    * [.say\(textOrContactOrFile, \[mention\]\)](message.md#Message+say) ⇒ `Promise.`
    * [.type\(\)](message.md#Message+type) ⇒ `MessageType`
    * [.self\(\)](message.md#Message+self) ⇒ `boolean`
    * [.mention\(\)](message.md#Message+mention) ⇒ `Promise.>`
    * [.mentionSelf\(\)](message.md#Message+mentionSelf) ⇒ `Promise.`
    * [.forward\(to\)](message.md#Message+forward) ⇒ `Promise.`
    * [.date\(\)](message.md#Message+date)
    * [.age\(\)](message.md#Message+age) ⇒ `number`
    * [~~.file\(\)~~](message.md#Message+file)
    * [.toFileBox\(\)](message.md#Message+toFileBox) ⇒ `Promise.`
    * [.toContact\(\)](message.md#Message+toContact) ⇒ `Promise.`
  * _static_
    * [.find\(\)](message.md#Message.find)
    * [.findAll\(\)](message.md#Message.findAll)

### message.from\(\) ⇒ `Contact`

Get the sender from a message.

**Kind**: instance method of [`Message`](message.md#Message)  
**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()
  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
  }
})
.start()
```

### message.to\(\) ⇒ `Contact` \| `null`

Get the destination of the message Message.to\(\) will return null if a message is in a room, use Message.room\(\) to get the room.

**Kind**: instance method of [`Message`](message.md#Message)

**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const contact = message.from()
  const text = message.text()
  const toContact = message.to()
  if (toContact) {
    const name = toContact.name()
    console.log(`toContact: ${name} Contact: ${contact.name()} Text: ${text}`)
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
  }
})
.start() 


### message.room\(\) ⇒ `Room` \| `null`

Get the room from the message. If the message is not in a room, then will return `null`

**Kind**: instance method of [`Message`](message.md#Message)  

**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()
  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
  }
})
.start()
```

### ~~message.content\(\)~~

_**Deprecated**_

use [text](message.md#Message+text) instead

**Kind**: instance method of [`Message`](message.md#Message)

### message.text\(\) ⇒ `string`

Get the text content of the message

**Kind**: instance method of [`Message`](message.md#Message)  
**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()
  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
  }
})
.start()
```

### message.toRecalled\(\) ⇒ `Promise`

Get the text content of the recalled message

**Kind**: instance method of [`Message`](message.md#message)  
**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  if (m.type() === MessageType.Recalled) {
    const recalledMessage = await m.toRecalled()
    console.log(`Message: ${recalledMessage} has been recalled.`)
  }
})
.start()

### message.say\(textOrContactOrFileOrUrlLink, \[mention\]\) ⇒ `Promise.`

Reply a Text, Media File or Link message to the sender.

> Tips: This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [`Message`](message.md#Message)  
**See**: [Examples/ding-dong-bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

| Param | Type | Description |
| :--- | :--- | :--- |
| textOrContactOrFile | `string` \| `Contact` \| `FileBox` \| `UrlLink` | send text, Contact, or file to bot. &lt;/br&gt; You can use [FileBox](https://www.npmjs.com/package/file-box) to send file |
| \[mention\] | `Contact` \| `Array.` | If this is a room message, when you set mention param, you can `@` Contact in the room. |

**Example**

```javascript
import { FileBox }  from 'file-box'
const bot = new Wechaty()
bot
.on('message', async m => {

// 1. send Image

  if (/^ding$/i.test(m.text())) {
    const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
    await msg.say(fileBox)
  }

// 2. send Text

  if (/^dong$/i.test(m.text())) {
    await msg.say('dingdingding')
  }

// 3. send Contact

  if (/^lijiarui$/i.test(m.text())) {
    const contactCard = await bot.Contact.find({name: 'lijiarui'})
    if (!contactCard) {
      console.log('not found')
      return
    }
    await msg.say(contactCard)
  }

})

// 4. send UrlLink

if (/^link$/i.test(m.text())) { 
  const linkPayload = new UrlLnik({
    description: 'Netty',
    thumbnailUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/48MFTQpxichmmxEoXZ1w7eno72H2MQdx1WC6JiaVdYRmwAp4MCcQbctE2IE7jWqkWOlgMPqMBXVAdR1N46xEibvoQ/640?wx_fmt=jpeg&wxtype=jpeg&wxfrom=0',
    title: 'Netty',
    url: 'http://mp.weixin.qq.com/s?__biz=MzU2MDU3MzE1Mg==&mid=2247484375&idx=1&sn=5ee91b0a8607a1766b5212a23d3c9179&chksm=fc04bc58cb73354e798403bcc03e293149bb115a0755940e334c0fbe33d7c3b0b0797120a213&scene=0&xtrack=1#rd', 
  })
  await msg.say(linkPayload) 
}
.start()
```

### message.type\(\) ⇒ `MessageType`

Get the type from the message.

> Tips: MessageType is Enum here. &lt;/br&gt;
>
> * MessageType.Unknown     &lt;/br&gt;
> * MessageType.Attachment  &lt;/br&gt;
> * MessageType.Audio       &lt;/br&gt;
> * MessageType.Contact     &lt;/br&gt;
> * MessageType.Emoticon    &lt;/br&gt;
> * MessageType.Image       &lt;/br&gt;
> * MessageType.Text        &lt;/br&gt;
> * MessageType.Video       &lt;/br&gt;
> * MessageType.Url         &lt;/br&gt;

**Kind**: instance method of [`Message`](message.md#Message)  
**Example**

```javascript
const bot = new Wechaty()
if (message.type() === bot.Message.Type.Text) {
  console.log('This is a text message')
}
```

### message.self\(\) ⇒ `boolean`

Check if a message is sent by self.

**Kind**: instance method of [`Message`](message.md#Message)  
**Returns**: `boolean` - - Return `true` for send from self, `false` for send from others.  
**Example**

```javascript
if (message.self()) {
 console.log('this message is sent by myself!')
}
```

### message.mention\(\) ⇒ `Promise.`

Get message mentioned contactList.

Message event table as follows

|  | Web | Mac PC Client | iOS Mobile | android Mobile |
| :--- | :---: | :---: | :---: | :---: |
| \[You were mentioned\] tip \(\[有人@我\]的提示\) | ✘ | √ | √ | √ |
| Identify magic code \(8197\) by copy & paste in mobile | ✘ | √ | √ | ✘ |
| Identify magic code \(8197\) by programming | ✘ | ✘ | ✘ | ✘ |
| Identify two contacts with the same roomAlias by \[You were  mentioned\] tip | ✘ | ✘ | √ | √ |

**Kind**: instance method of [`Message`](message.md#Message)  
**Returns**: `Promise.>` - - Return message mentioned contactList  
**Example**

```javascript
const contactList = await message.mention()
console.log(contactList)
```

### message.mentionSelf\(\) ⇒ `Promise.`

Check if a message is mention self.

**Kind**: instance method of [`Message`](message.md#Message)  
**Returns**: `Promise.` - - Return `true` for mention me.  
**Example**

```javascript
if (await message.mentionSelf()) {
 console.log('this message were mentioned me! [You were mentioned] tip ([有人@我]的提示)')
}
```

### message.forward\(to\) ⇒ `Promise.`

Forward the received message.

**Kind**: instance method of [`Message`](message.md#Message)

| Param | Type | Description |
| :--- | :--- | :--- |
| to | `Sayable` \| `Array.` | Room or Contact The recipient of the message, the room, or the contact |

**Example**

```javascript
const bot = new Wechaty()
bot
.on('message', async m => {
  const room = await bot.Room.find({topic: 'wechaty'})
  if (room) {
    await m.forward(room)
    console.log('forward this message to wechaty room!')
  }
})
.start()
```

### message.date\(\)

Message sent date

**Kind**: instance method of [`Message`](message.md#Message)

### message.age\(\) ⇒ `number`

Returns the message age in seconds.

For example, the message is sent at time `8:43:01`, and when we received it in Wechaty, the time is `8:43:15`, then the age\(\) will return `8:43:15 - 8:43:01 = 14 (seconds)`

**Kind**: instance method of [`Message`](message.md#Message)

### ~~message.file\(\)~~

_**Deprecated**_

use [toFileBox](message.md#Message+toFileBox) instead

**Kind**: instance method of [`Message`](message.md#Message)

### message.toFileBox\(\) ⇒ `Promise.`

Extract the Media File from the Message, and put it into the FileBox.

> Tips: This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [`Message`](message.md#Message)

### message.toContact\(\) ⇒ `Promise.`

Get Share Card of the Message Extract the Contact Card from the Message, and encapsulate it into Contact class

> Tips: This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [`Message`](message.md#Message)

### Message.find\(\)

Find message in cache

**Kind**: static method of [`Message`](message.md#Message)

### Message.findAll\(\)

Find messages in cache

**Kind**: static method of [`Message`](message.md#Message)

