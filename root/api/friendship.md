---
description: 发送，接受好友请求的Class
---

# Friendship

## Friendship

发送，接受好友请求的Class，有以下三种：

1. 发送好友请求
2. 在 Friend event 中收到好友请求
3. 在 Friend event 中确认好友请求

[Examples/Friend-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/friend-bot.ts)

**Kind**: global class

* [Friendship](friendship.md#friendship)
  * _instance_
    * [.accept\(\)](friendship.md#friendship-accept-promise) ⇒ `Promise.`
    * [.hello\(\)](friendship.md#friendship-hello-string) ⇒ `string`
    * [.contact\(\)](friendship.md#friendship-contact-contact) ⇒ `Contact`
    * [.type\(\)](friendship.md#friendship-type-friendshiptype) ⇒ `FriendshipType`
  * _static_
    * [~~.send\(\)~~](friendship.md#friendship-send)
    * [.add\(contact, hello\)](friendship.md#friendship-add-contact-hello-promise) ⇒ `Promise.`

### friendship.accept\(\) ⇒ `Promise.`

通过好友请求

**Kind**: instance method of [`Friendship`](friendship.md#friendship)  
**Example**

```javascript
const bot = new Wechaty()
bot.on('friendship', async friendship => {
  try {
    console.log(`received friend event.`)
    switch (friendship.type()) {

    // 1. New Friend Request

    case Friendship.Type.Receive:
      await friendship.accept()
      break

    // 2. Friend Ship Confirmed

    case Friendship.Type.Confirm:
      console.log(`friend ship confirmed`)
      break
    }
  } catch (e) {
    console.error(e)
  }
}
.start()
```

### friendship.hello\(\) ⇒ `string`

获取对方发送好友请求的验证信息。

**Kind**: instance method of [`Friendship`](friendship.md#friendship)  
**Example** _\(If request content is \`ding\`, then accept the friendship\)_

```javascript
const bot = new Wechaty()
bot.on('friendship', async friendship => {
  try {
    console.log(`received friend event from ${friendship.contact().name()}`)
    if (friendship.type() === Friendship.Type.Receive && friendship.hello() === 'ding') {
      await friendship.accept()
    }
  } catch (e) {
    console.error(e)
  }
}
.start()
```

### friendship.contact\(\) ⇒ `Contact`

获取发送好友请求的联系人。

**Kind**: instance method of [`Friendship`](friendship.md#friendship)  
**Example**

```javascript
const bot = new Wechaty()
bot.on('friendship', async friendship => {
  const contact = friendship.contact()
  const name = contact.name()
  console.log(`received friend event from ${name}`)
}
.start()
```

### friendship.type\(\) ⇒ `FriendshipType`

返回好友请求的类型。

{% hint style="info" %}

FriendshipType 在这里是enum:

* FriendshipType.Unknown 
* FriendshipType.Confirm
* FriendshipType.Receive  
* FriendshipType.Verify   

**Kind**: instance method of [`Friendship`](friendship.md#Friendship)  
**Example** _\(If request content is \`ding\`, then accept the friendship\)_

```javascript
const bot = new Wechaty()
bot.on('friendship', async friendship => {
  try {
    if (friendship.type() === Friendship.Type.Receive && friendship.hello() === 'ding') {
      await friendship.accept()
    }
  } catch (e) {
    console.error(e)
  }
}
.start()
```

### ~~Friendship.send\(\)~~

_**Deprecated**_

请使用 [Friendship\#add](friendship.md#friendship-add-contact-hello-promise) 替换

**Kind**: static method of [`Friendship`](friendship.md#Friendship)

### Friendship.add\(contact, hello\) ⇒ `Promise.`

发送好友请求给`contact` 发送的内容是 `hello`.

{% hint style="success" %}
最佳实践：每分钟加1次，如果发送的过于频繁，你可能会被封号，每天能添加的好友数量是有上限的。
{% endhint %}

**Kind**: static method of [`Friendship`](friendship.md#Friendship)

| Param | Type | Description |
| :--- | :--- | :--- |
| contact | `Contact` | 需要发送好友请求的联系人 |
| hello | `string` | 发送好友请求的内容 |

**Example**

```javascript
const memberList = await room.memberList()
for (let i = 0; i < memberList.length; i++) {
  await bot.Friendship.add(member, 'Nice to meet you! I am wechaty bot!')
}
```

