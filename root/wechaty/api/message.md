<a name="Message"></a>

## Message
All wechat messages will be encapsulated as a Message.

[Examples/Ding-Dong-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)

**Kind**: global class  

* [Message](#Message)
    * _instance_
        * [.from()](#Message+from) ⇒ <code>Contact</code>
        * [.to()](#Message+to) ⇒ <code>Contact</code> \| <code>null</code>
        * [.room()](#Message+room) ⇒ <code>Room</code> \| <code>null</code>
        * ~~[.content()](#Message+content)~~
        * [.text()](#Message+text) ⇒ <code>string</code>
        * [.say(textOrContactOrFile, [mention])](#Message+say) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.type()](#Message+type) ⇒ <code>MessageType</code>
        * [.self()](#Message+self) ⇒ <code>boolean</code>
        * [.mention()](#Message+mention) ⇒ <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code>
        * [.mentionSelf()](#Message+mentionSelf) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.forward(to)](#Message+forward) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.date()](#Message+date)
        * [.age()](#Message+age) ⇒ <code>number</code>
        * ~~[.file()](#Message+file)~~
        * [.toFileBox()](#Message+toFileBox) ⇒ <code>Promise.&lt;FileBox&gt;</code>
        * [.toContact()](#Message+toContact) ⇒ <code>Promise.&lt;Contact&gt;</code>
    * _static_
        * [.find()](#Message.find)
        * [.findAll()](#Message.findAll)

<a name="Message+from"></a>

### message.from() ⇒ <code>Contact</code>
Get the sender from a message.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Example**  
```js
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
<a name="Message+to"></a>

### message.to() ⇒ <code>Contact</code> \| <code>null</code>
Get the destination of the message
Message.to() will return null if a message is in a room, use Message.room() to get the room.

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+room"></a>

### message.room() ⇒ <code>Room</code> \| <code>null</code>
Get the room from the message.
If the message is not in a room, then will return `null`

**Kind**: instance method of [<code>Message</code>](#Message)  
**Example**  
```js
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
<a name="Message+content"></a>

### ~~message.content()~~
***Deprecated***

use [text](#Message+text) instead

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+text"></a>

### message.text() ⇒ <code>string</code>
Get the text content of the message

**Kind**: instance method of [<code>Message</code>](#Message)  
**Example**  
```js
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
<a name="Message+say"></a>

### message.say(textOrContactOrFile, [mention]) ⇒ <code>Promise.&lt;void&gt;</code>
Reply a Text or Media File message to the sender.
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Message</code>](#Message)  
**See**: [Examples/ding-dong-bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/ding-dong-bot.ts)  

| Param | Type | Description |
| --- | --- | --- |
| textOrContactOrFile | <code>string</code> \| <code>Contact</code> \| <code>FileBox</code> | send text, Contact, or file to bot. </br> You can use [FileBox](https://www.npmjs.com/package/file-box) to send file |
| [mention] | <code>Contact</code> \| <code>Array.&lt;Contact&gt;</code> | If this is a room message, when you set mention param, you can `@` Contact in the room. |

**Example**  
```js
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
<a name="Message+type"></a>

### message.type() ⇒ <code>MessageType</code>
Get the type from the message.
> Tips: MessageType is Enum here. </br>
- MessageType.Unknown     </br>
- MessageType.Attachment  </br>
- MessageType.Audio       </br>
- MessageType.Contact     </br>
- MessageType.Emoticon    </br>
- MessageType.Image       </br>
- MessageType.Text        </br>
- MessageType.Video       </br>
- MessageType.Url         </br>

**Kind**: instance method of [<code>Message</code>](#Message)  
**Example**  
```js
const bot = new Wechaty()
if (message.type() === bot.Message.Type.Text) {
  console.log('This is a text message')
}
```
<a name="Message+self"></a>

### message.self() ⇒ <code>boolean</code>
Check if a message is sent by self.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>boolean</code> - - Return `true` for send from self, `false` for send from others.  
**Example**  
```js
if (message.self()) {
 console.log('this message is sent by myself!')
}
```
<a name="Message+mention"></a>

### message.mention() ⇒ <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code>
Get message mentioned contactList.

Message event table as follows

|                                                                            | Web  |  Mac PC Client | iOS Mobile |  android Mobile |
| :---                                                                       | :--: |     :----:     |   :---:    |     :---:       |
| [You were mentioned] tip ([有人@我]的提示)                                   |  ✘   |        √       |     √      |       √         |
| Identify magic code (8197) by copy & paste in mobile                       |  ✘   |        √       |     √      |       ✘         |
| Identify magic code (8197) by programming                                  |  ✘   |        ✘       |     ✘      |       ✘         |
| Identify two contacts with the same roomAlias by [You were  mentioned] tip |  ✘   |        ✘       |     √      |       √         |

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code> - - Return message mentioned contactList  
**Example**  
```js
const contactList = await message.mention()
console.log(contactList)
```
<a name="Message+mentionSelf"></a>

### message.mentionSelf() ⇒ <code>Promise.&lt;boolean&gt;</code>
Check if a message is mention self.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - - Return `true` for mention me.  
**Example**  
```js
if (await message.mentionSelf()) {
 console.log('this message were mentioned me! [You were mentioned] tip ([有人@我]的提示)')
}
```
<a name="Message+forward"></a>

### message.forward(to) ⇒ <code>Promise.&lt;void&gt;</code>
Forward the received message.

**Kind**: instance method of [<code>Message</code>](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Sayable</code> \| <code>Array.&lt;Sayable&gt;</code> | Room or Contact The recipient of the message, the room, or the contact |

**Example**  
```js
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
<a name="Message+date"></a>

### message.date()
Message sent date

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+age"></a>

### message.age() ⇒ <code>number</code>
Returns the message age in seconds. <br>

For example, the message is sent at time `8:43:01`,
and when we received it in Wechaty, the time is `8:43:15`,
then the age() will return `8:43:15 - 8:43:01 = 14 (seconds)`

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+file"></a>

### ~~message.file()~~
***Deprecated***

use [toFileBox](#Message+toFileBox) instead

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+toFileBox"></a>

### message.toFileBox() ⇒ <code>Promise.&lt;FileBox&gt;</code>
Extract the Media File from the Message, and put it into the FileBox.
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+toContact"></a>

### message.toContact() ⇒ <code>Promise.&lt;Contact&gt;</code>
Get Share Card of the Message
Extract the Contact Card from the Message, and encapsulate it into Contact class
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message.find"></a>

### Message.find()
Find message in cache

**Kind**: static method of [<code>Message</code>](#Message)  
<a name="Message.findAll"></a>

### Message.findAll()
Find messages in cache

**Kind**: static method of [<code>Message</code>](#Message)  
