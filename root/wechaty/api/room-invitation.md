<a name="RoomInvitation"></a>

## RoomInvitation
accept room invitation

**Kind**: global class  

* [RoomInvitation](#RoomInvitation)
    * [.accept()](#RoomInvitation+accept) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.inviter()](#RoomInvitation+inviter) ⇒ <code>Contact</code>
    * [.topic()](#RoomInvitation+topic) ⇒ <code>Contact</code>
    * [.roomTopic()](#RoomInvitation+roomTopic)
    * [.date()](#RoomInvitation+date) ⇒ <code>Promise.&lt;Date&gt;</code>
    * [.age()](#RoomInvitation+age) ⇒ <code>number</code>

<a name="RoomInvitation+accept"></a>

### roomInvitation.accept() ⇒ <code>Promise.&lt;void&gt;</code>
Accept Room Invitation

**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
**Example**  
```js
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  try {
    console.log(`received room-invite event.`)
    await roomInvitation.accept()
  } catch (e) {
    console.error(e)
  }
}
.start()
```
<a name="RoomInvitation+inviter"></a>

### roomInvitation.inviter() ⇒ <code>Contact</code>
Get the inviter from room invitation

**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
**Example**  
```js
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  const inviter = await roomInvitation.inviter()
  const name = inviter.name()
  console.log(`received room invitation event from ${name}`)
}
.start()
```
<a name="RoomInvitation+topic"></a>

### roomInvitation.topic() ⇒ <code>Contact</code>
Get the room topic from room invitation

**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
**Example**  
```js
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  const topic = await roomInvitation.topic()
  console.log(`received room invitation event from room ${topic}`)
}
.start()
```
<a name="RoomInvitation+roomTopic"></a>

### roomInvitation.roomTopic()
**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
**Deprecated:**: use topic() instead  
<a name="RoomInvitation+date"></a>

### roomInvitation.date() ⇒ <code>Promise.&lt;Date&gt;</code>
Get the invitation time

**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
<a name="RoomInvitation+age"></a>

### roomInvitation.age() ⇒ <code>number</code>
Returns the roopm invitation age in seconds. <br>

For example, the invitation is sent at time `8:43:01`,
and when we received it in Wechaty, the time is `8:43:15`,
then the age() will return `8:43:15 - 8:43:01 = 14 (seconds)`

**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
