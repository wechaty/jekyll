# API

## Wechaty

Wechaty...

## Contact

Contact...

## Room

### roomInvitation.inviter() ⇒ [<code>Contact</code>](#Contact)
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
<a name="RoomInvitation+roomTopic"></a>

### roomInvitation.roomTopic() ⇒ [<code>Contact</code>](#Contact)
Get the room topic from room invitation

**Kind**: instance method of [<code>RoomInvitation</code>](#RoomInvitation)  
**Example**  
```js
const bot = new Wechaty()
bot.on('room-invite', async roomInvitation => {
  const topic = await roomInvitation.roomTopic()
  console.log(`received room invitation event from room ${topic}`)
}
.start()
```
<a name="RoomInvitation+date"></a>

## See Also

1. [Wechaty JsDoc]()
