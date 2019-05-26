---
description: 所有的微信消息会被封装成一个Message 类
---

# Message

## Message

[Examples/Ding-Dong-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

**Kind**: global class

* [Message](message.md#message)
  * _instance_
    * [.from\(\) ](message.md#message-from-contact)⇒ `Contact` \| `null`
    * [.to\(\)](message.md#message-to-contact-or-null) ⇒ `Contact` \| `null`
    * [.room\(\)](message.md#message-room-room-or-null) ⇒ `Room` \| `null`
    * ~~~~\[~~.content\(\)~~\]\(message.md\#message-content\)~~~~
    * .[text\(\)](message.md#message-text-string) ⇒ `string`
    * [.say\(textOrContactOrFile, \[mention\]\)](message.md#message-say-textorcontactorfile-mention-promise) ⇒ `Promise.`
    * [.type\(\)](message.md#message-type-messagetype) ⇒ `MessageType`
    * [.self\(\)](message.md#message-self-boolean) ⇒ `boolean`
    * [.mention\(\)](message.md#message-mention-promise-greater-than) ⇒ `Promise.>`
    * [.mentionSelf\(\)](message.md#message-mentionself-promise) ⇒ `Promise.`
    * [.forward\(to\)](message.md#message-forward-to-promise) ⇒ `Promise.`
    * [.date\(\)](message.md#message-date)
    * [.age\(\)](message.md#message-age-number) ⇒ `number`
    * ~~~~\[~~.file\(\)~~\]\(message.md\#message-file\)~~~~
    * [.toFileBox\(\) ](message.md#message-tofilebox-promise)⇒ `Promise.`
    * [.toContact\(\)](message.md#message-tocontact-promise) ⇒ `Promise.`
  * _static_
    * [.find\(\)](message.md#message-find)
    * [.findAll\(\)](message.md#message-findall)

### message.from\(\) ⇒ `Contact`

获取发送消息的联系人

**Kind**: instance method of [`Message`](message.md#message)  
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

获取消息发送的联系人。在微信群中，Message.to\(\) 会返回null，使用Message.room\(\)获取微信群信息。

**Kind**: instance method of [`Message`](message.md#message)

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
```

### message.room\(\) ⇒ `Room` \| `null`

获取消息所在的微信群，如果这条消息不在微信群中，会返回null

**Kind**: instance method of [`Message`](message.md#message)  
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

请使用 [message.text\(\) ](message.md#message-text-string)

**Kind**: instance method of [`Message`](message.md#message)

### message.text\(\) ⇒ `string`

获取消息的文本内容。

**Kind**: instance method of [`Message`](message.md#message)  
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

获取撤回消息的文本内容。

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
```

### message.say\(textOrContactOrFileOrUrl, \[mention\]\) ⇒ `Promise.`

回复多媒体、微信名片、文本或者链接给这条消息的发送者。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Message`](message.md#message)  
**See**: [Examples/ding-dong-bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

| Param | Type | Description |
| :--- | :--- | :--- |


<table>
  <thead>
    <tr>
      <th style="text-align:left">textOrContactOrFileOrUrl</th>
      <th style="text-align:left"><code>string</code> | <code>Contact</code> | <code>FileBox</code> | <code>UrlLink</code>
      </th>
      <th style="text-align:left">
        <p>&#x53D1;&#x9001;&#x6587;&#x672C;&#x3001;&#x540D;&#x7247;&#x6216;&#x8005;&#x6587;&#x4EF6;</p>
        <p>&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://www.npmjs.com/package/file-box">FileBox</a> &#x6765;&#x53D1;&#x9001;&#x6587;&#x4EF6;</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>```javascript
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
    description : 'Netty',
    thumbnailUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/48MFTQpxichmmxEoXZ1w7eno72H2MQdx1WC6JiaVdYRmwAp4MCcQbctE2IE7jWqkWOlgMPqMBXVAdR1N46xEibvoQ/640?wx_fmt=jpeg&wxtype=jpeg&wxfrom=0',
    title       : 'Netty',
    url         : 'http://mp.weixin.qq.com/s?__biz=MzU2MDU3MzE1Mg==&mid=2247484375&idx=1&sn=5ee91b0a8607a1766b5212a23d3c9179&chksm=fc04bc58cb73354e798403bcc03e293149bb115a0755940e334c0fbe33d7c3b0b0797120a213&scene=0&xtrack=1#rd',
  })
  await msg.say(linkPayload) 
}
.start()
```

### message.type\(\) ⇒ `MessageType`

获取消息的类型

{% hint style="info" %}

**Kind**: instance method of [`Message`](message.md#message)  
**Example**

```javascript
const bot = new Wechaty()
if (message.type() === bot.Message.Type.Text) {
  console.log('This is a text message')
}
```

### message.self\(\) ⇒ `boolean`

查看这条消息是否为机器人发送的。

**Kind**: instance method of [`Message`](message.md#message)  
**Returns**: `boolean` - - Return `true` for send from self, `false` for send from others.  
**Example**

```javascript
if (message.self()) {
 console.log('this message is sent by myself!')
}
```

### message.mention\(\) ⇒ `Promise.`

获取在群中@的用户列表。

**Kind**: instance method of [`Message`](message.md#message)  
**Returns**: `Promise.>` - - Return message mentioned contactList  
**Example**

```javascript
const contactList = await message.mention()
console.log(contactList)
```

### message.mentionSelf\(\) ⇒ `Promise.`

获取机器人是否在群里被@ 了

**Kind**: instance method of [`Message`](message.md#message)  
**Returns**: `Promise.` - - Return `true` for mention me.  
**Example**

```javascript
if (await message.mentionSelf()) {
 console.log('this message were mentioned me! [You were mentioned] tip ([有人@我]的提示)')
}
```

### message.forward\(to\) ⇒ `Promise.`

转发收到的消息

**Kind**: instance method of [`Message`](message.md#message)

| Param | Type | Description |
| :--- | :--- | :--- |
| to | `Sayable` \| `Array.` | Room 或者 Contact。指的是收消息方。 |

### message.date\(\)

消息发送的时间

**Kind**: instance method of [`Message`](message.md#message)

### message.age\(\) ⇒ `number`

消息的时差

例如： 消息在`8:43:01`发送的，当我们在wechaty 上收到消息的时候，时间是`8:43:15`,那么 age\(\) 为 `8:43:15 - 8:43:01 = 14 (seconds)`

**Kind**: instance method of [`Message`](message.md#message)

### ~~message.file\(\)~~

_**Deprecated**_

使用 [toFileBox](message.md#Message+toFileBox)

**Kind**: instance method of [`Message`](message.md#message)

### message.toFileBox\(\) ⇒ `Promise.`

从消息中提取多媒体文件并把它 存入到FileBox 里面。

{% hint style="info" %}
这个方法是否能实现，取决于用的是什么Puppet，具体请看：[Puppet 兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Message`](message.md#message)

### message.toContact\(\) ⇒ `Promise.`

提取转发的微信好友名片内容，并封装成Contact 类型。

{% hint style="info" %}
这个方法是否能实现，取决于用的是什么Puppet，具体请看：[Puppet 兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Message`](message.md#message)

### Message.find\(\)

在缓存中找消息。

**Kind**: static method of [`Message`](message.md#message)

### Message.findAll\(\)

在缓存中找消息

**Kind**: static method of [`Message`](message.md#message)

