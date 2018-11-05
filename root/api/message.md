---
description: 所有的微信消息会被封装成一个Message 类
---

# Message

## Message

[Examples/Ding-Dong-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

**Kind**: global class

* [Message](message.md#message)
  * _instance_
    * [.from\(\) ](message.md#message-from-contact)⇒ `Contact`
    * [.to\(\)](message.md#message-to-contact-or-null) ⇒ `Contact` \| `null`
    * [.room\(\)](message.md#message-room-room-or-null) ⇒ `Room` \| `null`
    * ~~~~[~~.content\(\)~~](message.md#message-content)~~~~
    * .[text\(\)](message.md#message-text-string) ⇒ `string`
    * [.say\(textOrContactOrFile, \[mention\]\)](message.md#message-say-textorcontactorfile-mention-promise) ⇒ `Promise.`
    * [.type\(\)](message.md#message-type-messagetype) ⇒ `MessageType`
    * [.self\(\)](message.md#message-self-boolean) ⇒ `boolean`
    * [.mention\(\)](message.md#message-mention-promise-greater-than) ⇒ `Promise.>`
    * [.mentionSelf\(\)](message.md#message-mentionself-promise) ⇒ `Promise.`
    * [.forward\(to\)](message.md#message-forward-to-promise) ⇒ `Promise.`
    * [.date\(\)](message.md#message-date)
    * [.age\(\)](message.md#message-age-number) ⇒ `number`
    * ~~~~[~~.file\(\)~~](message.md#message-file)~~~~
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

请使用  [message.text\(\) ](message.md#message-text-string)

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

### message.say\(textOrContactOrFile, \[mention\]\) ⇒ `Promise.`

回复多媒体、微信名片或者文本给这条消息的发送者。

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#3-wechaty-puppet-jian-rong-xing)
{% endhint %}

**Kind**: instance method of [`Message`](message.md#message)  
**See**: [Examples/ding-dong-bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

<table>
  <thead>
    <tr>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">textOrContactOrFile</td>
      <td style="text-align:left"><code>string</code> | <code>Contact</code> | <code>FileBox</code>
      </td>
      <td style="text-align:left">
        <p>发送文本、名片或者文件</p>
        <p>你可以使用 <a href="https://www.npmjs.com/package/file-box">FileBox</a> 来发送文件</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">[mention]</td>
      <td style="text-align:left"><code>Contact</code> | <code>Array.</code>
      </td>
      <td style="text-align:left">如果这是一条来自微信群的消息，当你设置了这个参数，你会在群中@这个联系人。</td>
    </tr>
  </tbody>
</table>**Example**

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
.start()
```

### message.type\(\) ⇒ `MessageType`

获取消息的类型

{% hint style="info" %}
MessageType 的类型是 Enum， 具体如下

* MessageType.Unknown     
* MessageType.Attachment  
* MessageType.Audio       
* MessageType.Contact     
* MessageType.Emoticon  
* MessageType.Image      
* MessageType.Text      
* MessageType.Video    
* MessageType.Url   
{% endhint %}

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

### message.mention\(\) ⇒ `Promise.>`

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

<table>
  <thead>
    <tr>
      <th style="text-align:left">Param</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">to</td>
      <td style="text-align:left"><code>Sayable</code> | <code>Array.</code>
      </td>
      <td style="text-align:left">
        <p>Room or Contact</p>
        <p>The recipient of the message, the room, or the contact</p>
      </td>
    </tr>
  </tbody>
</table>**Example**

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
这个方法是否能实现，取决于用的是什么Puppet，具体请看：[Puppet 兼容性列表](../puppet.md#3-wechaty-puppet-jian-rong-xing)
{% endhint %}

**Kind**: instance method of [`Message`](message.md#message)  


### message.toContact\(\) ⇒ `Promise.`

提取转发的微信好友名片内容，并封装成Contact 类型。

{% hint style="info" %}
这个方法是否能实现，取决于用的是什么Puppet，具体请看：[Puppet 兼容性列表](../puppet.md#3-wechaty-puppet-jian-rong-xing)
{% endhint %}

**Kind**: instance method of [`Message`](message.md#message)  


### Message.find\(\)

在缓存中找消息。

**Kind**: static method of [`Message`](message.md#message)  


### Message.findAll\(\)

在缓存中找消息

**Kind**: static method of [`Message`](message.md#message)

