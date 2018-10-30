## Classes

<dl>
<dt><a href="#Room">Room</a></dt>
<dd><p>All wechat rooms(groups) will be encapsulated as a Room.</p>
<p><a href="https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/room-bot.ts">Examples/Room-Bot</a></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RoomQueryFilter">RoomQueryFilter</a></dt>
<dd><p>The filter to find the room:  {topic: string | RegExp}</p>
</dd>
<dt><a href="#RoomEventName">RoomEventName</a></dt>
<dd><p>Room Class Event Type</p>
</dd>
<dt><a href="#RoomEventFunction">RoomEventFunction</a></dt>
<dd><p>Room Class Event Function</p>
</dd>
<dt><a href="#RoomMemberQueryFilter">RoomMemberQueryFilter</a></dt>
<dd><p>The way to search member by Room.member()</p>
</dd>
</dl>

<a name="Room"></a>

## Room
All wechat rooms(groups) will be encapsulated as a Room.

[Examples/Room-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/room-bot.ts)

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Get Room id. This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table) |


* [Room](#Room)
    * _instance_
        * [.sync()](#Room+sync) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.say(textOrContactOrFileOrUrl, [mention])](#Room+say) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.on(event, listener)](#Room+on) ⇒ <code>this</code>
        * [.add(contact)](#Room+add) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.del(contact)](#Room+del) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.quit()](#Room+quit) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.topic([newTopic])](#Room+topic) ⇒ <code>Promise.&lt;(string\|void)&gt;</code>
        * [.announce([text])](#Room+announce) ⇒ <code>Promise.&lt;(void\|string)&gt;</code>
        * [.qrcode()](#Room+qrcode) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.alias(contact)](#Room+alias) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
        * [.has(contact)](#Room+has) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.memberAll([query])](#Room+memberAll) ⇒ <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code>
        * [.member(queryArg)](#Room+member) ⇒ <code>Promise.&lt;(null\|Contact)&gt;</code>
        * [.owner()](#Room+owner) ⇒ <code>Contact</code> \| <code>null</code>
    * _static_
        * [.create(contactList, [topic])](#Room.create) ⇒ [<code>Promise.&lt;Room&gt;</code>](#Room)
        * [.findAll([query])](#Room.findAll) ⇒ <code>Promise.&lt;Array.&lt;Room&gt;&gt;</code>
        * [.find(query)](#Room.find) ⇒ <code>Promise.&lt;(Room\|null)&gt;</code>

<a name="Room+sync"></a>

### room.sync() ⇒ <code>Promise.&lt;void&gt;</code>
Force reload data for Room, Sync data from lowlevel API again.

**Kind**: instance method of [<code>Room</code>](#Room)  
**Example**  
```js
await room.sync()
```
<a name="Room+say"></a>

### room.say(textOrContactOrFileOrUrl, [mention]) ⇒ <code>Promise.&lt;void&gt;</code>
Send message inside Room, if set [replyTo], wechaty will mention the contact as well.
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type | Description |
| --- | --- | --- |
| textOrContactOrFileOrUrl | <code>string</code> \| <code>Contact</code> \| <code>FileBox</code> | Send `text` or `media file` inside Room. <br> You can use [FileBox](https://www.npmjs.com/package/file-box) to send file |
| [mention] | <code>Contact</code> \| <code>Array.&lt;Contact&gt;</code> | Optional parameter, send content inside Room, and mention @replyTo contact or contactList. |

**Example**  
```js
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
const contact = await bot.Contact.find({name: 'lijiarui'}) // change 'lijiarui' to any of the room member
await room.say('Hello world!', contact)
```
<a name="Room+on"></a>

### room.on(event, listener) ⇒ <code>this</code>
**Kind**: instance method of [<code>Room</code>](#Room)  
**Returns**: <code>this</code> - - this for chain  

| Param | Type | Description |
| --- | --- | --- |
| event | [<code>RoomEventName</code>](#RoomEventName) | Emit WechatyEvent |
| listener | [<code>RoomEventFunction</code>](#RoomEventFunction) | Depends on the WechatyEvent |

**Example** *(Event:join )*  
```js
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
**Example** *(Event:leave )*  
```js
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
**Example** *(Event:topic )*  
```js
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
**Example** *(Event:invite )*  
```js
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'topic of your room'}) // change `event-room` to any room topic in your wechat
if (room) {
  room.on('invite', roomInvitation => roomInvitation.accept())
}
```
<a name="Room+add"></a>

### room.add(contact) ⇒ <code>Promise.&lt;void&gt;</code>
Add contact in a room

> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)
>
> see [Web version of WeChat closed group interface](https://github.com/Chatie/wechaty/issues/1441)

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type |
| --- | --- |
| contact | <code>Contact</code> | 

**Example**  
```js
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
<a name="Room+del"></a>

### room.del(contact) ⇒ <code>Promise.&lt;void&gt;</code>
Delete a contact from the room
It works only when the bot is the owner of the room

> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)
>
> see [Web version of WeChat closed group interface](https://github.com/Chatie/wechaty/issues/1441)

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type |
| --- | --- |
| contact | <code>Contact</code> | 

**Example**  
```js
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
<a name="Room+quit"></a>

### room.quit() ⇒ <code>Promise.&lt;void&gt;</code>
Bot quit the room itself

> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Room</code>](#Room)  
**Example**  
```js
await room.quit()
```
<a name="Room+topic"></a>

### room.topic([newTopic]) ⇒ <code>Promise.&lt;(string\|void)&gt;</code>
SET/GET topic from the room

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type | Description |
| --- | --- | --- |
| [newTopic] | <code>string</code> | If set this para, it will change room topic. |

**Example** *(When you say anything in a room, it will get room topic. )*  
```js
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
**Example** *(When you say anything in a room, it will change room topic. )*  
```js
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
<a name="Room+announce"></a>

### room.announce([text]) ⇒ <code>Promise.&lt;(void\|string)&gt;</code>
SET/GET announce from the room
> Tips: It only works when bot is the owner of the room.
>
> This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type | Description |
| --- | --- | --- |
| [text] | <code>string</code> | If set this para, it will change room announce. |

**Example** *(When you say anything in a room, it will get room announce. )*  
```js
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'your room'})
const announce = await room.announce()
console.log(`room announce is : ${announce}`)
```
**Example** *(When you say anything in a room, it will change room announce. )*  
```js
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'your room'})
const oldAnnounce = await room.announce()
await room.announce('change announce to wechaty!')
console.log(`room announce change from ${oldAnnounce} to ${room.announce()}`)
```
<a name="Room+qrcode"></a>

### room.qrcode() ⇒ <code>Promise.&lt;string&gt;</code>
Get QR Code of the Room from the room, which can be used as scan and join the room.
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Room</code>](#Room)  
<a name="Room+alias"></a>

### room.alias(contact) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Return contact's roomAlias in the room

**Kind**: instance method of [<code>Room</code>](#Room)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - - If a contact has an alias in room, return string, otherwise return null  

| Param | Type |
| --- | --- |
| contact | <code>Contact</code> | 

**Example**  
```js
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
<a name="Room+has"></a>

### room.has(contact) ⇒ <code>Promise.&lt;boolean&gt;</code>
Check if the room has member `contact`, the return is a Promise and must be `await`-ed

**Kind**: instance method of [<code>Room</code>](#Room)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Return `true` if has contact, else return `false`.  

| Param | Type |
| --- | --- |
| contact | <code>Contact</code> | 

**Example** *(Check whether &#x27;lijiarui&#x27; is in the room &#x27;wechaty&#x27;)*  
```js
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
<a name="Room+memberAll"></a>

### room.memberAll([query]) ⇒ <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code>
Find all contacts in a room

#### definition
- `name`                 the name-string set by user-self, should be called name, equal to `Contact.name()`
- `roomAlias`            the name-string set by user-self in the room, should be called roomAlias
- `contactAlias`         the name-string set by bot for others, should be called alias, equal to `Contact.alias()`

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type | Description |
| --- | --- | --- |
| [query] | [<code>RoomMemberQueryFilter</code>](#RoomMemberQueryFilter) \| <code>string</code> | Optional parameter, When use memberAll(name:string), return all matched members, including name, roomAlias, contactAlias |

**Example**  
```js
const roomList:Conatct[] | null = await room.findAll()
if(roomList)
 console.log(`room all member list: `, roomList)
const memberContactList: Conatct[] | null =await room.findAll(`abc`)
console.log(`contact list with all name, room alias, alias are abc:`, memberContactList)
```
<a name="Room+member"></a>

### room.member(queryArg) ⇒ <code>Promise.&lt;(null\|Contact)&gt;</code>
Find all contacts in a room, if get many, return the first one.

**Kind**: instance method of [<code>Room</code>](#Room)  

| Param | Type | Description |
| --- | --- | --- |
| queryArg | [<code>RoomMemberQueryFilter</code>](#RoomMemberQueryFilter) \| <code>string</code> | When use member(name:string), return all matched members, including name, roomAlias, contactAlias |

**Example** *(Find member by name)*  
```js
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'wechaty'})           // change 'wechaty' to any room name in your wechat
if (room) {
  const member = await room.member('lijiarui')             // change 'lijiarui' to any room member in your wechat
  if (member) {
    console.log(`wechaty room got the member: ${member.name()}`)
  } else {
    console.log(`cannot get member in wechaty room!`)
  }
}
```
**Example** *(Find member by MemberQueryFilter)*  
```js
const bot = new Wechaty()
await bot.start()
// after logged in...
const room = await bot.Room.find({topic: 'wechaty'})          // change 'wechaty' to any room name in your wechat
if (room) {
  const member = await room.member({name: 'lijiarui'})        // change 'lijiarui' to any room member in your wechat
  if (member) {
    console.log(`wechaty room got the member: ${member.name()}`)
  } else {
    console.log(`cannot get member in wechaty room!`)
  }
}
```
<a name="Room+owner"></a>

### room.owner() ⇒ <code>Contact</code> \| <code>null</code>
Get room's owner from the room.
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Room</code>](#Room)  
**Example**  
```js
const owner = room.owner()
```
<a name="Room.create"></a>

### Room.create(contactList, [topic]) ⇒ [<code>Promise.&lt;Room&gt;</code>](#Room)
Create a new room.

**Kind**: static method of [<code>Room</code>](#Room)  

| Param | Type |
| --- | --- |
| contactList | <code>Array.&lt;Contact&gt;</code> | 
| [topic] | <code>string</code> | 

**Example** *(Creat a room with &#x27;lijiarui&#x27; and &#x27;juxiaomi&#x27;, the room topic is &#x27;ding - created&#x27;)*  
```js
const helperContactA = await Contact.find({ name: 'lijiarui' })  // change 'lijiarui' to any contact in your wechat
const helperContactB = await Contact.find({ name: 'juxiaomi' })  // change 'juxiaomi' to any contact in your wechat
const contactList = [helperContactA, helperContactB]
console.log('Bot', 'contactList: %s', contactList.join(','))
const room = await Room.create(contactList, 'ding')
console.log('Bot', 'createDingRoom() new ding room created: %s', room)
await room.topic('ding - created')
await room.say('ding - created')
```
<a name="Room.findAll"></a>

### Room.findAll([query]) ⇒ <code>Promise.&lt;Array.&lt;Room&gt;&gt;</code>
Find room by by filter: {topic: string | RegExp}, return all the matched room

**Kind**: static method of [<code>Room</code>](#Room)  

| Param | Type |
| --- | --- |
| [query] | [<code>RoomQueryFilter</code>](#RoomQueryFilter) | 

**Example**  
```js
const bot = new Wechaty()
await bot.start()
// after logged in
const roomList = await bot.Room.findAll()                    // get the room list of the bot
const roomList = await bot.Room.findAll({topic: 'wechaty'})  // find all of the rooms with name 'wechaty'
```
<a name="Room.find"></a>

### Room.find(query) ⇒ <code>Promise.&lt;(Room\|null)&gt;</code>
Try to find a room by filter: {topic: string | RegExp}. If get many, return the first one.

**Kind**: static method of [<code>Room</code>](#Room)  
**Returns**: <code>Promise.&lt;(Room\|null)&gt;</code> - If can find the room, return Room, or return null  

| Param | Type |
| --- | --- |
| query | [<code>RoomQueryFilter</code>](#RoomQueryFilter) | 

**Example**  
```js
const bot = new Wechaty()
await bot.start()
// after logged in...
const roomList = await bot.Room.find()
const roomList = await bot.Room.find({topic: 'wechaty'})
```
<a name="RoomQueryFilter"></a>

## RoomQueryFilter
The filter to find the room:  {topic: string | RegExp}

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| topic | <code>string</code> | 

<a name="RoomEventName"></a>

## RoomEventName
Room Class Event Type

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| join | <code>string</code> | Emit when anyone join any room. |
| topic | <code>string</code> | Get topic event, emitted when someone change room topic. |
| leave | <code>string</code> | Emit when anyone leave the room.<br>                               If someone leaves the room by themselves, wechat will not notice other people in the room, so the bot will never get the "leave" event. |

<a name="RoomEventFunction"></a>

## RoomEventFunction
Room Class Event Function

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| room-join | <code>function</code> | (this: Room, inviteeList: Contact[] , inviter: Contact)  => void |
| room-topic | <code>function</code> | (this: Room, topic: string, oldTopic: string, changer: Contact) => void |
| room-leave | <code>function</code> | (this: Room, leaver: Contact) => void |

<a name="RoomMemberQueryFilter"></a>

## RoomMemberQueryFilter
The way to search member by Room.member()

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Find the contact by wechat name in a room, equal to `Contact.name()`. |
| roomAlias | <code>string</code> | Find the contact by alias set by the bot for others in a room. |
| contactAlias | <code>string</code> | Find the contact by alias set by the contact out of a room, equal to `Contact.alias()`. [More Detail](https://github.com/Chatie/wechaty/issues/365) |

