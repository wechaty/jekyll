---
description: 一个Wechaty 代表着一个微信的客户端，他取决于你具体使用哪一个Puppet
---

# Wechaty

## 简介

根据你选择的[Puppet](../puppet.md)的不同，Bot 可能等于下面中的一个客户端，不同的[Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) 代表的我们对微信协议的不同实现方式, Puppet的英文意思是`傀儡`, 很形象的描述了我们希望Puppet做的事情：帮助 Wechaty 来控制微信的操作。

* 网页微信客户端, 当你选择: [puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)/[puppet-wechat4u](https://github.com/chatie/wechaty-puppet-wechat4u)​
* iPad 微信客户端, 当你选择: [puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat)​

了解更多:

* [Wechaty 中的Puppet 是什么意思](../puppet.md#1-jie-shao)

如果你希望先了解如何发送消息，点击下面

{% page-ref page="message.md" %}

如果你希望先了解如何操作微信联系人，点击下面

{% page-ref page="contact.md" %}

如果你希望先了解如何操作微信群，点击下面

{% page-ref page="room.md" %}

## Wechaty   <a id="wechaty"></a>

**Kind**: global class

* ​[Wechaty](wechaty.md#Wechaty)​
  * ​[new Wechaty\(\[options\]\)](wechaty.md#new-wechaty-options)​
  * _instance_
    * ​[.on\(event, listener\)](wechaty.md) ⇒ [`Wechaty`](wechaty.md#wechaty-on-event-listener-wechaty)​
    * ​[.start\(\)](wechaty.md#wechaty-start-promise) ⇒ `Promise.`
    * ​[.stop\(\)](wechaty.md#wechaty-stop-promise) ⇒ `Promise.`
    * ​[.logout\(\)](wechaty.md#wechaty-logout-promise) ⇒ `Promise.`
    * ​[.logonoff\(\)](wechaty.md#wechaty-logonoff-boolean) ⇒ `boolean`
    * ​[.userSelf\(\)](wechaty.md#wechaty-userself-contactself) ⇒ `ContactSelf`
    * ​[.say\(textOrContactOrFileOrUrl\)](wechaty.md#wechaty-say-textorcontactorfileorurl-promise) ⇒ `Promise.`
  * _static_
    * ​[.instance\(\[options\]\)](wechaty.md#wechaty-instance-options)​

### new Wechaty\(\[options\]\)   <a id="new-wechaty-options"></a>

创建一个 Wechaty 的实例.

| Param | Type | Default |
| :--- | :--- | :--- |
| \[options\] | ​[`WechatyOptions`](wechaty.md#wechatyoptions)​ | `{}` |

**Example** _\(The World's Shortest ChatBot Code: 6 lines of JavaScript\)_

```javascript
const { Wechaty } = require('wechaty')

const bot = new Wechaty()
bot.on('scan',    (qrcode, status) => console.log(['https://api.qrserver.com/v1/create-qr-code/?data=',encodeURIComponent(qrcode),'&size=220x220&margin=20',].join('')))
bot.on('login',   user => console.log(`User ${user} logined`))
bot.on('message', message => console.log(`Message: ${message}`))
bot.start()
```

### wechaty.on\(event, listener\) ⇒ [`Wechaty`](wechaty.md#Wechaty)​   <a id="wechaty-on-event-listener-wechaty"></a>

当机器人收到消息，会触发一个事件，一些简单的事件介绍如下：

* **scan**: 当机器人需要扫码登录的时候，会触发这个事件，当手机扫码登录后，机器人就可以登录进去了。
* **login**: 当机器人登陆成功后，会触发这个事件。
* **logout**: 当机器人退出登陆的时候，会触发到这个事件。
* **message**: 当有新消息的时候会触发这个事件。

初次之外，wechaty还有一些群相关的事件，了解更多：[WechatyEventName](wechaty.md#wechatyeventname)​

你可以在这些时间的方法中自定义你希望的所有逻辑。​

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty)

**Returns**: [`Wechaty`](wechaty.md#wechaty) - - this for chaining, see advanced [chaining usage](https://github.com/Chatie/wechaty-getting-started/wiki/FAQ-EN#36-why-wechatyonevent-listener-return-wechaty)​

| Param | Type | Description |
| :--- | :--- | :--- |
| event | ​[`WechatyEventName`](wechaty.md#wechatyeventname)​ | Emit WechatyEvent |
| listener | ​[`WechatyEventFunction`](wechaty.md#wechatyeventfunction)​ | Depends on the WechatyEvent |

**Example** _\(Event:scan\)_

```typescript
// Scan Event will emit when the bot needs to show you a QR Code for scanning​

bot.on('scan', (url, code) => {  console.log(`[${code}] Scan ${url} to login.` )})
```

**Example** _\(Event:login \)_

```typescript
// Login Event will emit when bot login full successful.

​bot.on('login', (user) => {  console.log(`user ${user} login`)})
```

**Example** _\(Event:logout \)_

```typescript
// Logout Event will emit when bot detected log out.

​bot.on('logout', (user) => {  console.log(`user ${user} logout`)})
```

**Example** _\(Event:message \)_

```typescript
// Message Event will emit when there's a new message.

​wechaty.on('message', (message) => {  console.log(`message ${message} received`)})
```

**Example** _\(Event:friendship \)_

```typescript
// Friendship Event will emit when got a new friend request, or friendship is confirmed.

​bot.on('friendship', (friendship) => {  
  if(friendship.type() === Friendship.Type.Receive){

    // 1. receive new friendship request from new contact    
    const contact = friendship.contact()    
    let result = await friendship.accept()      
    if(result){
      console.log(`Request from ${contact.name()} is accept succesfully!`)      
    } else {        
      console.log(`Request from ${contact.name()} failed to accept!`)      
    }      
  } else if (friendship.type() === Friendship.Type.Confirm) { 

    // 2. confirm friendship      
    console.log(`new friendship confirmed with ${contact.name()}`)   
    } 
})
```

**Example** _\(Event:room-join \)_

```typescript
// room-join Event will emit when someone join the room.
​
bot.on('room-join', (room, inviteeList, inviter) => {  
  const nameList = inviteeList.map(c => c.name()).join(',')  
  console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
})
```

**Example** _\(Event:room-leave \)_

```typescript
// room-leave Event will emit when someone leave the room.​

bot.on('room-leave', (room, leaverList) => {  
  const nameList = leaverList.map(c => c.name()).join(',')  
  console.log(`Room ${room.topic()} lost member ${nameList}`)
})
```

**Example** _\(Event:room-topic \)_

```typescript
// room-topic Event will emit when someone change the room's topic.
​
bot.on('room-topic', (room, topic, oldTopic, changer) => {  
  console.log(`Room ${room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
})
```

**Example** _\(Event:room-invite, RoomInvitation has been encapsulated as a RoomInvitation Class. \)_

```typescript
// room-invite Event will emit when there's an room invitation.

​bot.on('room-invite', async roomInvitation => {  
  try {    
    console.log(`received room-invite event.`)    
    await roomInvitation.accept()  
  } catch (e) {    
    console.error(e)  
  }
}
```

**Example** _\(Event:error \)_

```typescript
// error Event will emit when there's an error occurred.

​bot.on('error', (error) => {  console.error(error)})
```

### wechaty.start\(\) ⇒ `Promise.`   <a id="wechaty-start-promise"></a>

启动机器人

{% hint style="info" %}
机器人所有的操作必须在这个函数执行完成之后。
{% endhint %}

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
await bot.start() // do other stuff with bot here
```

### wechaty.stop\(\) ⇒ `Promise.`   <a id="wechaty-stop-promise"></a>

停止机器人

**Kind**: instance method of [`Wechaty`](wechaty.md#Wechaty) **Example**

```typescript
await bot.stop()
```

### wechaty.logout\(\) ⇒ `Promise.`   <a id="wechaty-logout-promise"></a>

登出机器人

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
await bot.logout()
```

### wechaty.logonoff\(\) ⇒ `boolean`   <a id="wechaty-logonoff-boolean"></a>

获取机器人logon/logoff 的状态

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
if (bot.logonoff()) {  
  console.log('Bot logined')
} else {  
  console.log('Bot not logined')
}
```

### wechaty.userSelf\(\) ⇒ `ContactSelf`   <a id="wechaty-userself-contactself"></a>

获取当前机器人的所有信息

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
const contact = bot.userSelf()
console.log(`Bot is ${contact.name()}`)
```

### wechaty.say\(textOrContactOrFileOrUrl\) ⇒ `Promise.`   <a id="wechaty-say-textorcontactorfileorurl-promise"></a>

机器人自己给自己发消息。

{% hint style="info" %}
这个函数是否能成功调用，取决于你使用了哪一种Puppet 的实现，了解更多：[Puppet 兼容性列表](../puppet.md#3-wechaty-puppet-jian-rong-xing)
{% endhint %}

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty)​

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
      <td style="text-align:left">textOrContactOrFileOrUrl</td>
      <td style="text-align:left"><code>string</code> | <code>Contact</code> | <code>FileBox</code>
      </td>
      <td style="text-align:left">
        <p>发送文本、联系人名片或者文件给机器人自己。</p>
        <p>你可以使用 <a href="https://www.npmjs.com/package/file-box">FileBox</a> 来发送文件</p>
      </td>
    </tr>
  </tbody>
</table>**Example**

```typescript
const bot = new Wechaty()
await bot.start()
// after logged in

​// 1. send text to bot itselfawait bot.say('hello!')​
// 2. send Contact to bot itself
const contact = bot.Contact.load('contactId')
await bot.say(contact)​

// 3. send Image to bot itself from remote url
import { FileBox }  from 'file-box'
const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
await bot.say(fileBox)​

// 4. send Image to bot itself from local file
import { FileBox }  from 'file-box'
const fileBox = FileBox.fromFile('/tmp/text.jpg')
await bot.say(fileBox)
```

### Wechaty.instance\(\[options\]\)   <a id="wechaty-instance-options"></a>

获取全局的Wechaty 实例。

**Kind**: static method of [`Wechaty`](wechaty.md#wechaty)​

| Param | Type | Default |
| :--- | :--- | :--- |
| \[options\] | ​[`WechatyOptions`](wechaty.md#wechatyoptions)​ | `{}` |

**Example** _\(The World's Shortest ChatBot Code: 6 lines of JavaScript\)_

```typescript
const { Wechaty } = require('wechaty')
​Wechaty.instance() // Global instance
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',       user => console.log(`User ${user} logined`))
.on('message',  message => console.log(`Message: ${message}`))
.start()
```

## 类型定义

* [PuppetModuleName](wechaty.md#puppetmodulename)
* [WechatyOptions](wechaty.md#wechatyoptions)
* [WechatyEventName](wechaty.md#wechatyeventname)
* \*\*\*\*[WechatyEventFunction](wechaty.md#wechatyeventfunction)

### PuppetModuleName

**Kind**: global typedef **Properties**

PuppetModuleName 参数在这里代表着Puppet 的名称，类型是 string, 可能的取值为：

| Name | Type | Description |
| :--- | :--- | :--- |
| PUPPET\_DEFAULT | `string` | 默认的puppet， 默认会使用 wechaty-puppet-puppeteer |
| wechaty-puppet-wechat4u | `string` | 默认的puppet，使用 [wechat4u](https://github.com/nodeWechat/wechat4u) 来控制 [网页微信 API](https://wx.qq.com/) |
| wechaty-puppet-padchat | `string` | 使用WebSocket 协议链接一个协议服务器，来控制iPad 微信。 |
| wechaty-puppet-puppeteer | `string` | 通过chrome\(谷歌\)浏览器使用 [google puppeteer](https://github.com/GoogleChrome/puppeteer) 来控制 [网页微信 API](https://wx.qq.com/) |
| wechaty-puppet-mock | `string` | 为单元测试提供模拟调用的Puppet |

### WechatyOptions

创建wechaty 实例的可选参数类型。

```typescript
export interface WechatyOptions {
  memory?        : MemoryCard,
  name?          : string,                    // Wechaty Name
  profile?       : null | string,             // DEPRECATED: use name instead
  puppet?        : PuppetModuleName | Puppet, // Puppet name or instance
  puppetOptions? : PuppetOptions,             // Puppet TOKEN
  ioToken?       : string,                    // Io TOKEN
}
```

**Kind**: global typedef **Properties**

<table>
  <thead>
    <tr>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">name</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p>Wechaty 机器人的名称.</p>
        <p>当你按照下面的方式设置的时候： <code>new Wechaty({name: &apos;wechatyName&apos;})</code>
        </p>
        <p>他会自动生成一个叫做<code>wechatyName.memory-card.json</code>的文件 。这个文件会存储机器人的登陆信息。如果这个文件有效，启动wechaty
          的时候，你不需要扫码登陆就能自动登陆机器人。</p>
        <p>这个名字在启动机器人的时候，是可以通过环境变量<code>WECHATY_NAME</code> 设置的，如：<code>WECHATY_NAME=&quot;wechatyName&quot; node bot.js</code>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">puppet</td>
      <td style="text-align:left"><code>PuppetModuleName</code> | <code>Puppet</code>
      </td>
      <td style="text-align:left">Puppet 名称或者实例</td>
    </tr>
    <tr>
      <td style="text-align:left">puppetOptions</td>
      <td style="text-align:left"><code>Partial.</code>
      </td>
      <td style="text-align:left">Puppet TOKEN</td>
    </tr>
    <tr>
      <td style="text-align:left">ioToken</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">Io TOKEN</td>
    </tr>
  </tbody>
</table>### WechatyEventName

Wechaty 事件的类型

**Kind**: global typedef **Properties**

<table>
  <thead>
    <tr>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">error</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当机器人内部出错的时候会触发error 事件。</td>
    </tr>
    <tr>
      <td style="text-align:left">login</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当机器人成功登陆后，会触发login 事件，并会在事件中传递当前登陆机器人的信息。</td>
    </tr>
    <tr>
      <td style="text-align:left">logout</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当机器人检测到登出的时候，会触发logout 事件，并会在事件中传递机器人的信息。</td>
    </tr>
    <tr>
      <td style="text-align:left">heartbeat</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">获取机器人的心跳。</td>
    </tr>
    <tr>
      <td style="text-align:left">friendship</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当有人给机器人发好友请求的时候会触发这个事件。</td>
    </tr>
    <tr>
      <td style="text-align:left">message</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当机器人收到消息的时候会触发这个事件。</td>
    </tr>
    <tr>
      <td style="text-align:left">ready</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当所有数据加载完成后，会触发这个事件。在wechaty-puppet-padchat 中，它意味着已经加载完成Contact 和Room 的信息。</td>
    </tr>
    <tr>
      <td style="text-align:left">room-join</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当有人进入微信群的时候会触发这个事件。机器人主动进入某个微信群，t那个样会触发这个事件。</td>
    </tr>
    <tr>
      <td style="text-align:left">room-topic</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当有人修改群名称的时候会触发这个事件。</td>
    </tr>
    <tr>
      <td style="text-align:left">room-leave</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当机器人把群里某个用户移出群聊的时候会触发这个时间。用户主动退群是无法检测到的。</td>
    </tr>
    <tr>
      <td style="text-align:left">room-invite</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">当收到群邀请的时候，会触发这个事件。具体请看 <a href="room-invitation.md">RoomInvitation</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">scan</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p>当机器人需要扫码登陆的时候会触发这个事件。</p>
        <p>建议你安装 qrcode-terminal(run <code>npm install qrcode-terminal</code>) 这个包，这样你可以在命令行中直接看到二维码。</p>
      </td>
    </tr>
  </tbody>
</table>### WechatyEventFunction

Wechaty 事件函数

**Kind**: global typedef **Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| error | `function` | \(this: Wechaty, error: Error\) =&gt; void callback function |
| login | `function` | \(this: Wechaty, user: ContactSelf\)=&gt; void |
| logout | `function` | \(this: Wechaty, user: ContactSelf\) =&gt; void |
| scan | `function` | \(this: Wechaty, url: string, code: number\) =&gt; void |
| heartbeat | `function` | \(this: Wechaty, data: any\) =&gt; void |
| friendship | `function` | \(this: Wechaty, friendship: Friendship\) =&gt; void |
| message | `function` | \(this: Wechaty, message: Message\) =&gt; void |
| ready | `function` | \(this: Wechaty\) =&gt; void |
| room-join | `function` | \(this: Wechaty, room: Room, inviteeList: Contact\[\], inviter: Contact\) =&gt; void |
| room-topic | `function` | \(this: Wechaty, room: Room, newTopic: string, oldTopic: string, changer: Contact\) =&gt; void |
| room-leave | `function` | \(this: Wechaty, room: Room, leaverList: Contact\[\]\) =&gt; void |
| room-invite | `function` | \(this: Wechaty, room: Room, leaverList: Contact\[\]\) =&gt; void see more in [RoomInvitation](https://github.com/Chatie/docs/tree/777195b62684a2fcb789911ad01bf3a16e5bdbf6/root/wechaty/api/RoomInvitation/README.md)​ |

