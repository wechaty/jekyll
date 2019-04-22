---
description: 一个Wechaty 代表着一个微信的客户端，他取决于你具体使用哪一个Puppet
---

# Wechaty

## 简介      <a id="intro"></a>

根据你选择的[Puppet](../puppet.md#intro)的不同，Bot 可能等于下面中的一个客户端，不同的[Puppet](../puppet.md#intro) 代表的我们对微信协议的不同实现方式, Puppet的英文意思是`傀儡`, 很形象的描述了我们希望Puppet做的事情：帮助 Wechaty 来控制微信的操作。

* 网页微信客户端, 当你选择: [puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)/[puppet-wechat4u](https://github.com/chatie/wechaty-puppet-wechat4u)​
* iPad 微信客户端, 当你选择: [puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat)​

了解更多:

* [Wechaty 中的Puppet 是什么意思](../puppet.md#intro)

如果你希望先了解如何发送消息，点击下面

{% page-ref page="message.md" %}

如果你希望先了解如何操作微信联系人，点击下面

{% page-ref page="contact.md" %}

如果你希望先了解如何操作微信群，点击下面

{% page-ref page="room.md" %}

## Wechaty          <a id="wechaty"></a>

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

### new Wechaty\(\[options\]\)          <a id="new-wechaty-options"></a>

创建一个 Wechaty 的实例，默认使用Web 的方式，切换到iPad 的方式，参数设置请查看[示例代码](https://github.com/lijiarui/wechaty-puppet-padchat#示例代码)

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

注意，\`new Wechaty\(\)\` 是可以传参数的

#### 使用网页版本的场景

* 这里name 是用来存储登录信息的，和\`Wechaty.instance\({name: 'XX'}\)\` 的作用是一样的。 [查看详情](../faq.md#login-status-persistent). 

```typescript
const bot = new Wechaty({ name: 'your-bot-name' })
```

#### 使用iPad 版本的场景

* 当不使用web 版本的时候，需要定义你需要用什么样的方式接入，通过定义puppet名字的方式确定接入方式，这里是wechaty-puppet-padchat
* puppetOptions 在这里是用来传递[token](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token)的，按照下面代码示例传入即可。

```typescript
const WECHATY_PUPPET_PADCHAT_TOKEN = 'your-token-here'

const puppet = 'wechaty-puppet-padchat' // 使用ipad 的方式接入。

const puppetOptions = {
  token: WECHATY_PUPPET_PADCHAT_TOKEN,
}

const bot = new Wechaty({
  name: 'your-bot-name'
  puppet,
  puppetOptions,
})
```

* 上述的puppet 和 token 也可以不写进代码里面，通过环境变量来传递，如在命令行中运行：

```text
WECHATY_PUPPET_PADCHAT_TOKEN=你的token WECHATY_PUPPET=padchat node bot.js
```

### wechaty.on\(event, listener\) ⇒ [`Wechaty`](wechaty.md#Wechaty)​          <a id="wechaty-on-event-listener-wechaty"></a>

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

### wechaty.start\(\) ⇒ `Promise.`          <a id="wechaty-start-promise"></a>

启动机器人

{% hint style="info" %}
机器人所有的操作必须在这个函数执行完成之后。
{% endhint %}

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
await bot.start() // do other stuff with bot here
```

### wechaty.stop\(\) ⇒ `Promise.`          <a id="wechaty-stop-promise"></a>

停止机器人

**Kind**: instance method of [`Wechaty`](wechaty.md#Wechaty) **Example**

```typescript
await bot.stop()
```

### wechaty.logout\(\) ⇒ `Promise.`          <a id="wechaty-logout-promise"></a>

登出机器人

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
await bot.logout()
```

### wechaty.logonoff\(\) ⇒ `boolean`          <a id="wechaty-logonoff-boolean"></a>

获取机器人logon/logoff 的状态

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
if (bot.logonoff()) {  
  console.log('Bot logined')
} else {  
  console.log('Bot not logined')
}
```

### wechaty.userSelf\(\) ⇒ `ContactSelf`          <a id="wechaty-userself-contactself"></a>

获取当前机器人的所有信息

**Kind**: instance method of [`Wechaty`](wechaty.md#wechaty) **Example**

```typescript
const contact = bot.userSelf()
console.log(`Bot is ${contact.name()}`)
```

### wechaty.say\(textOrContactOrFileOrUrl\) ⇒ `Promise.`          <a id="wechaty-say-textorcontactorfileorurl-promise"></a>

机器人自己给自己发消息。

{% hint style="info" %}
这个函数是否能成功调用，取决于你使用了哪一种Puppet 的实现，了解更多：[Puppet 兼容性列表](../puppet.md#puppet-compatibility)
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
      <td style="text-align:left"><code>string</code> | <code>Contact</code> | <code>FileBox</code> | <code>UrlLink</code>
      </td>
      <td style="text-align:left">
        <p>&#x53D1;&#x9001;&#x6587;&#x672C;&#x3001;&#x8054;&#x7CFB;&#x4EBA;&#x540D;&#x7247;&#x6216;&#x8005;&#x6587;&#x4EF6;&#x7ED9;&#x673A;&#x5668;&#x4EBA;&#x81EA;&#x5DF1;&#x3002;</p>
        <p>&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://www.npmjs.com/package/file-box">FileBox</a> &#x6765;&#x53D1;&#x9001;&#x6587;&#x4EF6;</p>
      </td>
    </tr>
  </tbody>
</table>

```typescript 
// 1. send text to bot itself 
await bot.say('hello!')​ 

// 2. send Contact to bot itself
const contact = bot.Contact.load('contactId') 
await bot.say(contact)​ 

// 3. send Image to bot itself from remote url
import { FileBox } from 'file-box' 
const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png') 
await bot.say(fileBox)​

// 4. send Image to bot itself from local file 
import { FileBox } from 'file-box' 
const fileBox = FileBox.fromFile('/tmp/text.jpg') 
await bot.say(fileBox) 

// 5. send Link to bot itself
const linkPayload = new UrlLink({
  description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
  thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
  title       : 'Welcome to Wechaty',
  url         : 'https://github.com/chatie/wechaty',
})
await bot.say(linkPayload)
```
 
### Wechaty.instance\(\[options\]\) 

获取全局的Wechaty 实例。 

**Kind**: static method of [`Wechaty`](wechaty.md\\#wechaty)​

| Param | Type | Default |
| :--- | :--- | :--- | 
| \[options\] | ​[`WechatyOptions`](wechaty.md#wechatyoptions)​ | `{}` |

**Example** 

_(The World's Shortest ChatBot Code: 6 lines of JavaScript)_ 

```typescript 
const { Wechaty } = require('wechaty') 
​Wechaty.instance() // Global instance 
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`)) 
.on('login', user => console.log(`User ${user} logined`)) 
.on('message', message => console.log(`Message: ${message}`)) 
.start()
``` 

## 类型定义 

* [PuppetModuleName](wechaty.md#puppetmodulename)
* [WechatyOptions](wechaty.md#wechatyoptions) 
* [WechatyEventName](wechaty.md#wechatyeventname)
* [WechatyEventFunction](wechaty.md#wechatyeventfunction)
 
### PuppetModuleName 

**Kind**: global typedef **Properties** PuppetModuleName 参数在这里代表着Puppet 的名称，类型是 string, 可能的取值为： 

| Name | Type | Description | 
| :--- | :--- | :--- |
| PUPPET_DEFAULT | `string` | 默认的puppet， 默认会使用 wechaty-puppet-puppeteer|
| wechaty-puppet-wechat4u| `string` | 默认的puppet，使用 [wechat4u](https://github.com/nodeWechat/wechat4u) 来控制 [网页微信 API](https://wx.qq.com/) 
| wechaty-puppet-padchat | `string` | 使用WebSocket 协议链接一个协议服务器，来控制iPad 微信。 |
| wechaty-puppet-puppeteer | `string` | 通过chrome\(谷歌\)浏览器使用 [google puppeteer](https://github.com/GoogleChrome/puppeteer) 来控制 [网页微信 API](https://wx.qq.com/) |
| wechaty-puppet-mock | `string` | 为单元测试提供模拟调用的Puppet | 

### WechatyOptions 

创建wechaty 实例的可选参数类型。 

```typescript 
export interface WechatyOptions { 
  memory?       : MemoryCard,
  name?         : string,                      // Wechaty Name
  profile?      : null | string,               // DEPRECATED: use name instead
  puppet?       : PuppetModuleName | Puppet,   // Puppet name or instance 
  puppetOptions?: PuppetOptions,               // Puppet TOKEN 
  ioToken?      : string,                      // Io TOKEN 
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
        <p>Wechaty &#x673A;&#x5668;&#x4EBA;&#x7684;&#x540D;&#x79F0;.</p>
        <p>&#x5F53;&#x4F60;&#x6309;&#x7167;&#x4E0B;&#x9762;&#x7684;&#x65B9;&#x5F0F;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x5019;&#xFF1A; <code>new Wechaty({name: &apos;wechatyName&apos;})</code>
        </p>
        <p>&#x4ED6;&#x4F1A;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x53EB;&#x505A;<code>wechatyName.memory-card.json</code>&#x7684;&#x6587;&#x4EF6;
          &#x3002;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4F1A;&#x5B58;&#x50A8;&#x673A;&#x5668;&#x4EBA;&#x7684;&#x767B;&#x9646;&#x4FE1;&#x606F;&#x3002;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6709;&#x6548;&#xFF0C;&#x542F;&#x52A8;wechaty
          &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x4E0D;&#x9700;&#x8981;&#x626B;&#x7801;&#x767B;&#x9646;&#x5C31;&#x80FD;&#x81EA;&#x52A8;&#x767B;&#x9646;&#x673A;&#x5668;&#x4EBA;&#x3002;</p>
        <p>&#x8FD9;&#x4E2A;&#x540D;&#x5B57;&#x5728;&#x542F;&#x52A8;&#x673A;&#x5668;&#x4EBA;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x73AF;&#x5883;&#x53D8;&#x91CF;<code>WECHATY_NAME</code> &#x8BBE;&#x7F6E;&#x7684;&#xFF0C;&#x5982;&#xFF1A;<code>WECHATY_NAME=&quot;wechatyName&quot; node bot.js</code>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">ioToken</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">Io TOKEN</td>
    </tr>
  </tbody>
</table>

Wechaty 事件的类型 **Kind**: global typedef **Properties**

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
      <td style="text-align:left">&#x5F53;&#x673A;&#x5668;&#x4EBA;&#x5185;&#x90E8;&#x51FA;&#x9519;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;error
        &#x4E8B;&#x4EF6;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">login</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x673A;&#x5668;&#x4EBA;&#x6210;&#x529F;&#x767B;&#x9646;&#x540E;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;login
        &#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x4F1A;&#x5728;&#x4E8B;&#x4EF6;&#x4E2D;&#x4F20;&#x9012;&#x5F53;&#x524D;&#x767B;&#x9646;&#x673A;&#x5668;&#x4EBA;&#x7684;&#x4FE1;&#x606F;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">logout</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x673A;&#x5668;&#x4EBA;&#x68C0;&#x6D4B;&#x5230;&#x767B;&#x51FA;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;logout
        &#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x4F1A;&#x5728;&#x4E8B;&#x4EF6;&#x4E2D;&#x4F20;&#x9012;&#x673A;&#x5668;&#x4EBA;&#x7684;&#x4FE1;&#x606F;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">heartbeat</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x83B7;&#x53D6;&#x673A;&#x5668;&#x4EBA;&#x7684;&#x5FC3;&#x8DF3;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">friendship</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x6709;&#x4EBA;&#x7ED9;&#x673A;&#x5668;&#x4EBA;&#x53D1;&#x597D;&#x53CB;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">message</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x673A;&#x5668;&#x4EBA;&#x6536;&#x5230;&#x6D88;&#x606F;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">ready</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x6240;&#x6709;&#x6570;&#x636E;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;&#x5728;wechaty-puppet-padchat
        &#x4E2D;&#xFF0C;&#x5B83;&#x610F;&#x5473;&#x7740;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;Contact
        &#x548C;Room &#x7684;&#x4FE1;&#x606F;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">room-join</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x6709;&#x4EBA;&#x8FDB;&#x5165;&#x5FAE;&#x4FE1;&#x7FA4;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;&#x673A;&#x5668;&#x4EBA;&#x4E3B;&#x52A8;&#x8FDB;&#x5165;&#x67D0;&#x4E2A;&#x5FAE;&#x4FE1;&#x7FA4;&#xFF0C;t&#x90A3;&#x4E2A;&#x6837;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">room-topic</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x6709;&#x4EBA;&#x4FEE;&#x6539;&#x7FA4;&#x540D;&#x79F0;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">room-leave</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x673A;&#x5668;&#x4EBA;&#x628A;&#x7FA4;&#x91CC;&#x67D0;&#x4E2A;&#x7528;&#x6237;&#x79FB;&#x51FA;&#x7FA4;&#x804A;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x3002;&#x7528;&#x6237;&#x4E3B;&#x52A8;&#x9000;&#x7FA4;&#x662F;&#x65E0;&#x6CD5;&#x68C0;&#x6D4B;&#x5230;&#x7684;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">room-invite</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">&#x5F53;&#x6536;&#x5230;&#x7FA4;&#x9080;&#x8BF7;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;&#x5177;&#x4F53;&#x8BF7;&#x770B;
        <a
        href="room-invitation.md">RoomInvitation</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">scan</td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p>&#x5F53;&#x673A;&#x5668;&#x4EBA;&#x9700;&#x8981;&#x626B;&#x7801;&#x767B;&#x9646;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;</p>
        <p>&#x5EFA;&#x8BAE;&#x4F60;&#x5B89;&#x88C5; qrcode-terminal(&#x8FD0;&#x884C; <code>npm install qrcode-terminal</code>)
          &#x8FD9;&#x4E2A;&#x5305;&#xFF0C;&#x8FD9;&#x6837;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x76F4;&#x63A5;&#x770B;&#x5230;&#x4E8C;&#x7EF4;&#x7801;&#x3002;</p>
      </td>
    </tr>
  </tbody>
</table>