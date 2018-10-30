<a name="Friendship"></a>

## Friendship
Send, receive friend request, and friend confirmation events.

1. send request
2. receive request(in friend event)
3. confirmation friendship(friend event)

[Examples/Friend-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/friend-bot.ts)

**Kind**: global class  

* [Friendship](#Friendship)
    * _instance_
        * [.accept()](#Friendship+accept) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.hello()](#Friendship+hello) ⇒ <code>string</code>
        * [.contact()](#Friendship+contact) ⇒ <code>Contact</code>
        * [.type()](#Friendship+type) ⇒ <code>FriendshipType</code>
    * _static_
        * ~~[.send()](#Friendship.send)~~
        * [.add(contact, hello)](#Friendship.add) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="Friendship+accept"></a>

### friendship.accept() ⇒ <code>Promise.&lt;void&gt;</code>
Accept Friend Request

**Kind**: instance method of [<code>Friendship</code>](#Friendship)  
**Example**  
```js
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
<a name="Friendship+hello"></a>

### friendship.hello() ⇒ <code>string</code>
Get verify message from

**Kind**: instance method of [<code>Friendship</code>](#Friendship)  
**Example** *(If request content is &#x60;ding&#x60;, then accept the friendship)*  
```js
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
<a name="Friendship+contact"></a>

### friendship.contact() ⇒ <code>Contact</code>
Get the contact from friendship

**Kind**: instance method of [<code>Friendship</code>](#Friendship)  
**Example**  
```js
const bot = new Wechaty()
bot.on('friendship', async friendship => {
  const contact = friendship.contact()
  const name = contact.name()
  console.log(`received friend event from ${name}`)
}
.start()
```
<a name="Friendship+type"></a>

### friendship.type() ⇒ <code>FriendshipType</code>
Return the Friendship Type
> Tips: FriendshipType is enum here. </br>
- FriendshipType.Unknown  </br>
- FriendshipType.Confirm  </br>
- FriendshipType.Receive  </br>
- FriendshipType.Verify   </br>

**Kind**: instance method of [<code>Friendship</code>](#Friendship)  
**Example** *(If request content is &#x60;ding&#x60;, then accept the friendship)*  
```js
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
<a name="Friendship.send"></a>

### ~~Friendship.send()~~
***Deprecated***

use [Friendship#add](Friendship#add) instead

**Kind**: static method of [<code>Friendship</code>](#Friendship)  
<a name="Friendship.add"></a>

### Friendship.add(contact, hello) ⇒ <code>Promise.&lt;void&gt;</code>
Send a Friend Request to a `contact` with message `hello`.

The best practice is to send friend request once per minute.
Remeber not to do this too frequently, or your account may be blocked.

**Kind**: static method of [<code>Friendship</code>](#Friendship)  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>Contact</code> | Send friend request to contact |
| hello | <code>string</code> | The friend request content |

**Example**  
```js
const memberList = await room.memberList()
for (let i = 0; i < memberList.length; i++) {
  await bot.Friendship.add(member, 'Nice to meet you! I am wechaty bot!')
}
```
