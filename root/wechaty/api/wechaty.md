## Classes

<dl>
<dt><a href="#Wechaty">Wechaty</a></dt>
<dd><p>Main bot class.</p>
<p>A <code>Bot</code> is a wechat client depends on which puppet you use.
It may equals</p>
<ul>
<li>web-wechat, when you use: <a href="https://github.com/chatie/wechaty-puppet-puppeteer">puppet-puppeteer</a>/<a href="https://github.com/chatie/wechaty-puppet-wechat4u">puppet-wechat4u</a></li>
<li>ipad-wechat, when you use: <a href="https://github.com/lijiarui/wechaty-puppet-padchat">puppet-padchat</a></li>
<li>ios-wechat, when you use: puppet-ioscat</li>
</ul>
<p>See more:</p>
<ul>
<li><a href="https://github.com/Chatie/wechaty-getting-started/wiki/FAQ-EN#31-what-is-a-puppet-in-wechaty">What is a Puppet in Wechaty</a></li>
</ul>
<blockquote>
<p>If you want to know how to send message, see <a href="#Message">Message</a> <br>
If you want to know how to get contact, see <a href="#Contact">Contact</a></p>
</blockquote>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PuppetName">PuppetName</a></dt>
<dd><p>The term <a href="https://github.com/Chatie/wechaty/wiki/Puppet">Puppet</a> in Wechaty is an Abstract Class for implementing protocol plugins.
The plugins are the component that helps Wechaty to control the Wechat(that&#39;s the reason we call it puppet).
The plugins are named XXXPuppet, for example:</p>
<ul>
<li><a href="https://github.com/Chatie/wechaty-puppet-puppeteer">PuppetPuppeteer</a>:</li>
<li><a href="https://github.com/lijiarui/wechaty-puppet-padchat">PuppetPadchat</a></li>
</ul>
</dd>
<dt><a href="#WechatyOptions">WechatyOptions</a></dt>
<dd><p>The option parameter to create a wechaty instance</p>
</dd>
<dt><a href="#WechatyEventName">WechatyEventName</a></dt>
<dd><p>Wechaty Class Event Type</p>
</dd>
<dt><a href="#WechatyEventFunction">WechatyEventFunction</a></dt>
<dd><p>Wechaty Class Event Function</p>
</dd>
</dl>

<a name="Wechaty"></a>

## Wechaty
Main bot class.

A `Bot` is a wechat client depends on which puppet you use.
It may equals
- web-wechat, when you use: [puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)/[puppet-wechat4u](https://github.com/chatie/wechaty-puppet-wechat4u)
- ipad-wechat, when you use: [puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat)
- ios-wechat, when you use: puppet-ioscat

See more:
- [What is a Puppet in Wechaty](https://github.com/Chatie/wechaty-getting-started/wiki/FAQ-EN#31-what-is-a-puppet-in-wechaty)

> If you want to know how to send message, see [Message](#Message) <br>
> If you want to know how to get contact, see [Contact](#Contact)

**Kind**: global class  

* [Wechaty](#Wechaty)
    * [new Wechaty([options])](#new_Wechaty_new)
    * _instance_
        * [.on(event, listener)](#Wechaty+on) ⇒ [<code>Wechaty</code>](#Wechaty)
        * [.start()](#Wechaty+start) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.stop()](#Wechaty+stop) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.logout()](#Wechaty+logout) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.logonoff()](#Wechaty+logonoff) ⇒ <code>boolean</code>
        * [.userSelf()](#Wechaty+userSelf) ⇒ <code>ContactSelf</code>
        * [.say(textOrContactOrFileOrUrl)](#Wechaty+say) ⇒ <code>Promise.&lt;void&gt;</code>
    * _static_
        * [.instance([options])](#Wechaty.instance)

<a name="new_Wechaty_new"></a>

### new Wechaty([options])
Creates an instance of Wechaty.


| Param | Type | Default |
| --- | --- | --- |
| [options] | [<code>WechatyOptions</code>](#WechatyOptions) | <code>{}</code> | 

**Example** *(The World&#x27;s Shortest ChatBot Code: 6 lines of JavaScript)*  
```js
const { Wechaty } = require('wechaty')
const bot = new Wechaty()
bot.on('scan',    (qrcode, status) => console.log(['https://api.qrserver.com/v1/create-qr-code/?data=',encodeURIComponent(qrcode),'&size=220x220&margin=20',].join('')))
bot.on('login',   user => console.log(`User ${user} logined`))
bot.on('message', message => console.log(`Message: ${message}`))
bot.start()
```
<a name="Wechaty+on"></a>

### wechaty.on(event, listener) ⇒ [<code>Wechaty</code>](#Wechaty)
When the bot get message, it will emit the following Event.

You can do anything you want when in these events functions.
The main Event name as follows:
- **scan**: Emit when the bot needs to show you a QR Code for scanning. After scan the qrcode, you can login
- **login**: Emit when bot login full successful.
- **logout**: Emit when bot detected log out.
- **message**: Emit when there's a new message.

see more in [WechatyEventName](#WechatyEventName)

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  
**Returns**: [<code>Wechaty</code>](#Wechaty) - - this for chaining,
see advanced [chaining usage](https://github.com/Chatie/wechaty-getting-started/wiki/FAQ-EN#36-why-wechatyonevent-listener-return-wechaty)  

| Param | Type | Description |
| --- | --- | --- |
| event | [<code>WechatyEventName</code>](#WechatyEventName) | Emit WechatyEvent |
| listener | [<code>WechatyEventFunction</code>](#WechatyEventFunction) | Depends on the WechatyEvent |

**Example** *(Event:scan)*  
```js
// Scan Event will emit when the bot needs to show you a QR Code for scanning

bot.on('scan', (url, code) => {
  console.log(`[${code}] Scan ${url} to login.` )
})
```
**Example** *(Event:login )*  
```js
// Login Event will emit when bot login full successful.

bot.on('login', (user) => {
  console.log(`user ${user} login`)
})
```
**Example** *(Event:logout )*  
```js
// Logout Event will emit when bot detected log out.

bot.on('logout', (user) => {
  console.log(`user ${user} logout`)
})
```
**Example** *(Event:message )*  
```js
// Message Event will emit when there's a new message.

wechaty.on('message', (message) => {
  console.log(`message ${message} received`)
})
```
**Example** *(Event:friendship )*  
```js
// Friendship Event will emit when got a new friend request, or friendship is confirmed.

bot.on('friendship', (friendship) => {
  if(friendship.type() === Friendship.Type.Receive){ // 1. receive new friendship request from new contact
    const contact = friendship.contact()
    let result = await friendship.accept()
      if(result){
        console.log(`Request from ${contact.name()} is accept succesfully!`)
      } else{
        console.log(`Request from ${contact.name()} failed to accept!`)
      }
	  } else if (friendship.type() === Friendship.Type.Confirm) { // 2. confirm friendship
      console.log(`new friendship confirmed with ${contact.name()}`)
   }
 })
```
**Example** *(Event:room-join )*  
```js
// room-join Event will emit when someone join the room.

bot.on('room-join', (room, inviteeList, inviter) => {
  const nameList = inviteeList.map(c => c.name()).join(',')
  console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
})
```
**Example** *(Event:room-leave )*  
```js
// room-leave Event will emit when someone leave the room.

bot.on('room-leave', (room, leaverList) => {
  const nameList = leaverList.map(c => c.name()).join(',')
  console.log(`Room ${room.topic()} lost member ${nameList}`)
})
```
**Example** *(Event:room-topic )*  
```js
// room-topic Event will emit when someone change the room's topic.

bot.on('room-topic', (room, topic, oldTopic, changer) => {
  console.log(`Room ${room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
})
```
**Example** *(Event:room-invite, RoomInvitation has been encapsulated as a RoomInvitation Class. )*  
```js
// room-invite Event will emit when there's an room invitation.

bot.on('room-invite', async roomInvitation => {
  try {
    console.log(`received room-invite event.`)
    await roomInvitation.accept()
  } catch (e) {
    console.error(e)
  }
}
```
**Example** *(Event:error )*  
```js
// error Event will emit when there's an error occurred.

bot.on('error', (error) => {
  console.error(error)
})
```
<a name="Wechaty+start"></a>

### wechaty.start() ⇒ <code>Promise.&lt;void&gt;</code>
When you start the bot, bot will begin to login, need you wechat scan qrcode to login
> Tips: All the bot operation needs to be triggered after start() is done

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  
**Example**  
```js
await bot.start()
// do other stuff with bot here
```
<a name="Wechaty+stop"></a>

### wechaty.stop() ⇒ <code>Promise.&lt;void&gt;</code>
Stop the bot

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  
**Example**  
```js
await bot.stop()
```
<a name="Wechaty+logout"></a>

### wechaty.logout() ⇒ <code>Promise.&lt;void&gt;</code>
Logout the bot

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  
**Example**  
```js
await bot.logout()
```
<a name="Wechaty+logonoff"></a>

### wechaty.logonoff() ⇒ <code>boolean</code>
Get the logon / logoff state

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  
**Example**  
```js
if (bot.logonoff()) {
  console.log('Bot logined')
} else {
  console.log('Bot not logined')
}
```
<a name="Wechaty+userSelf"></a>

### wechaty.userSelf() ⇒ <code>ContactSelf</code>
Get current user

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  
**Example**  
```js
const contact = bot.userSelf()
console.log(`Bot is ${contact.name()}`)
```
<a name="Wechaty+say"></a>

### wechaty.say(textOrContactOrFileOrUrl) ⇒ <code>Promise.&lt;void&gt;</code>
Send message to userSelf, in other words, bot send message to itself.
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Wechaty</code>](#Wechaty)  

| Param | Type | Description |
| --- | --- | --- |
| textOrContactOrFileOrUrl | <code>string</code> \| <code>Contact</code> \| <code>FileBox</code> | send text, Contact, or file to bot. </br> You can use [FileBox](https://www.npmjs.com/package/file-box) to send file |

**Example**  
```js
const bot = new Wechaty()
await bot.start()
// after logged in

// 1. send text to bot itself
await bot.say('hello!')

// 2. send Contact to bot itself
const contact = bot.Contact.load('contactId')
await bot.say(contact)

// 3. send Image to bot itself from remote url
import { FileBox }  from 'file-box'
const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
await bot.say(fileBox)

// 4. send Image to bot itself from local file
import { FileBox }  from 'file-box'
const fileBox = FileBox.fromFile('/tmp/text.jpg')
await bot.say(fileBox)
```
<a name="Wechaty.instance"></a>

### Wechaty.instance([options])
Get the global instance of Wechaty

**Kind**: static method of [<code>Wechaty</code>](#Wechaty)  

| Param | Type | Default |
| --- | --- | --- |
| [options] | [<code>WechatyOptions</code>](#WechatyOptions) | <code>{}</code> | 

**Example** *(The World&#x27;s Shortest ChatBot Code: 6 lines of JavaScript)*  
```js
const { Wechaty } = require('wechaty')

Wechaty.instance() // Global instance
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',       user => console.log(`User ${user} logined`))
.on('message',  message => console.log(`Message: ${message}`))
.start()
```
<a name="PuppetName"></a>

## PuppetName
The term [Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) in Wechaty is an Abstract Class for implementing protocol plugins.
The plugins are the component that helps Wechaty to control the Wechat(that's the reason we call it puppet).
The plugins are named XXXPuppet, for example:
- [PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer):
- [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat)

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wechat4u | <code>string</code> | The default puppet, using the [wechat4u](https://github.com/nodeWechat/wechat4u) to control the [WeChat Web API](https://wx.qq.com/) via a chrome browser. |
| padchat | <code>string</code> | - Using the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program. |
| puppeteer | <code>string</code> | - Using the [google puppeteer](https://github.com/GoogleChrome/puppeteer) to control the [WeChat Web API](https://wx.qq.com/) via a chrome browser. |
| mock | <code>string</code> | - Using the mock data to mock wechat operation, just for test. |

<a name="WechatyOptions"></a>

## WechatyOptions
The option parameter to create a wechaty instance

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| profile | <code>string</code> | Wechaty Name. </br>          When you set this: </br>          `new Wechaty({profile: 'wechatyName'}) ` </br>          it will generate a file called `wechatyName.memory-card.json`. </br>          This file stores the bot's login information. </br>          If the file is valid, the bot can auto login so you don't need to scan the qrcode to login again. </br>          Also, you can set the environment variable for `WECHATY_PROFILE` to set this value when you start. </br>          eg:  `WECHATY_PROFILE="your-cute-bot-name" node bot.js` |
| puppet | <code>PuppetModuleName</code> \| <code>Puppet</code> | Puppet name or instance |
| puppetOptions | <code>Partial.&lt;PuppetOptions&gt;</code> | Puppet TOKEN |
| ioToken | <code>string</code> | Io TOKEN |

<a name="WechatyEventName"></a>

## WechatyEventName
Wechaty Class Event Type

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| error | <code>string</code> | When the bot get error, there will be a Wechaty error event fired. |
| login | <code>string</code> | After the bot login full successful, the event login will be emitted, with a Contact of current logined user. |
| logout | <code>string</code> | Logout will be emitted when bot detected log out, with a Contact of the current login user. |
| heartbeat | <code>string</code> | Get bot's heartbeat. |
| friendship | <code>string</code> | When someone sends you a friend request, there will be a Wechaty friendship event fired. |
| message | <code>string</code> | Emit when there's a new message. |
| ready | <code>string</code> | Emit when all data has load completed, in wechaty-puppet-padchat, it means it has sync Contact and Room completed |
| room-join | <code>string</code> | Emit when anyone join any room. |
| room-topic | <code>string</code> | Get topic event, emitted when someone change room topic. |
| room-leave | <code>string</code> | Emit when anyone leave the room.<br> |
| room-invite | <code>string</code> | Emit when there is a room invitation, see more in  [RoomInvitation](RoomInvitation)                                    If someone leaves the room by themselves, wechat will not notice other people in the room, so the bot will never get the "leave" event. |
| scan | <code>string</code> | A scan event will be emitted when the bot needs to show you a QR Code for scanning. </br>                                    It is recommend to install qrcode-terminal(run `npm install qrcode-terminal`) in order to show qrcode in the terminal. |

<a name="WechatyEventFunction"></a>

## WechatyEventFunction
Wechaty Class Event Function

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| error | <code>function</code> | (this: Wechaty, error: Error) => void callback function |
| login | <code>function</code> | (this: Wechaty, user: ContactSelf)=> void |
| logout | <code>function</code> | (this: Wechaty, user: ContactSelf) => void |
| scan | <code>function</code> | (this: Wechaty, url: string, code: number) => void <br> <ol> <li>URL: {String} the QR code image URL</li> <li>code: {Number} the scan status code. some known status of the code list here is:</li> </ol> <ul> <li>0 initial_</li> <li>200 login confirmed</li> <li>201 scaned, wait for confirm</li> <li>408 waits for scan</li> </ul> |
| heartbeat | <code>function</code> | (this: Wechaty, data: any) => void |
| friendship | <code>function</code> | (this: Wechaty, friendship: Friendship) => void |
| message | <code>function</code> | (this: Wechaty, message: Message) => void |
| ready | <code>function</code> | (this: Wechaty) => void |
| room-join | <code>function</code> | (this: Wechaty, room: Room, inviteeList: Contact[],  inviter: Contact) => void |
| room-topic | <code>function</code> | (this: Wechaty, room: Room, newTopic: string, oldTopic: string, changer: Contact) => void |
| room-leave | <code>function</code> | (this: Wechaty, room: Room, leaverList: Contact[]) => void |
| room-invite | <code>function</code> | (this: Wechaty, room: Room, leaverList: Contact[]) => void <br>                                        see more in  [RoomInvitation](RoomInvitation) |

