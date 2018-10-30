<a name="ContactSelf"></a>

## ContactSelf
Bot itself will be encapsulated as a ContactSelf.

> Tips: this class is extends Contact

**Kind**: global class  

* [ContactSelf](#ContactSelf)
    * [.avatar([file])](#ContactSelf+avatar) ⇒ <code>Promise.&lt;(void\|FileBox)&gt;</code>
    * [.qrcode()](#ContactSelf+qrcode) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.signature(signature)](#ContactSelf+signature)

<a name="ContactSelf+avatar"></a>

### contactSelf.avatar([file]) ⇒ <code>Promise.&lt;(void\|FileBox)&gt;</code>
GET / SET bot avatar

**Kind**: instance method of [<code>ContactSelf</code>](#ContactSelf)  

| Param | Type |
| --- | --- |
| [file] | <code>FileBox</code> | 

**Example** *( GET the avatar for bot, return {Promise&lt;FileBox&gt;})*  
```js
// Save avatar to local file like `1-name.jpg`

bot.on('login', (user: ContactSelf) => {
  console.log(`user ${user} login`)
  const file = await user.avatar()
  const name = file.name
  await file.toFile(name, true)
  console.log(`Save bot avatar: ${contact.name()} with avatar file: ${name}`)
})
```
**Example** *(SET the avatar for a bot)*  
```js
import { FileBox }  from 'file-box'
bot.on('login', (user: ContactSelf) => {
  console.log(`user ${user} login`)
  const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
  await user.avatar(fileBox)
  console.log(`Change bot avatar successfully!`)
})
```
<a name="ContactSelf+qrcode"></a>

### contactSelf.qrcode() ⇒ <code>Promise.&lt;string&gt;</code>
Get bot qrcode

**Kind**: instance method of [<code>ContactSelf</code>](#ContactSelf)  
**Example**  
```js
import { generate } from 'qrcode-terminal'
bot.on('login', (user: ContactSelf) => {
  console.log(`user ${user} login`)
  const qrcode = await user.qrcode()
  console.log(`Following is the bot qrcode!`)
  generate(qrcode, { small: true })
})
```
<a name="ContactSelf+signature"></a>

### contactSelf.signature(signature)
Change bot signature

**Kind**: instance method of [<code>ContactSelf</code>](#ContactSelf)  

| Param | Description |
| --- | --- |
| signature | The new signature that the bot will change to |

**Example**  
```js
bot.on('login', async user => {
  console.log(`user ${user} login`)
  try {
    await user.signature(`Signature changed by wechaty on ${new Date()}`)
  } catch (e) {
    console.error('change signature failed', e)
  }
})
```
