---
description: >-
  Bot itself will be encapsulated as a ContactSelf. This class is extends
  Contact
---

# ContactSelf

## ContactSelf

Bot itself will be encapsulated as a ContactSelf.

> Tips: this class is extends Contact

**Kind**: global class

- [ContactSelf](#contactself)
  - [ContactSelf](#contactself-1)
    - [contactSelf.avatar\(\[file\]\) ⇒ `Promise.`](#contactselfavatar\\file\\-⇒-promise)
    - [contactSelf.qrcode\(\) ⇒ `Promise.`](#contactselfqrcode\\-⇒-promise)
    - [contactSelf.signature\(signature\)](#contactselfsignature\signature\)
    - [contactSelf.name\(\) ⇒ `string`](#contactselfname\\-⇒-string)
    - [contactSelf.name\(name\) ⇒ `Promise<string>`](#contactselfname\name\-⇒-promisestring)

### contactSelf.avatar\(\[file\]\) ⇒ `Promise.`

GET / SET bot avatar

**Kind**: instance method of [`ContactSelf`](contact-self.md#ContactSelf)

| Param | Type |
| :--- | :--- |
| \[file\] | `FileBox` |

**Example** _\( GET the avatar for bot, return {Promise&lt;FileBox&gt;}\)_

```javascript
// Save avatar to local file like `1-name.jpg`

bot.on('login', (user: ContactSelf) => {
  console.log(`user ${user} login`)
  const file = await user.avatar()
  const name = file.name
  await file.toFile(name, true)
  console.log(`Save bot avatar: ${contact.name()} with avatar file: ${name}`)
})
```

**Example** _\(SET the avatar for a bot\)_

```javascript
import { FileBox }  from 'file-box'
bot.on('login', (user: ContactSelf) => {
  console.log(`user ${user} login`)
  const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
  await user.avatar(fileBox)
  console.log(`Change bot avatar successfully!`)
})
```

### contactSelf.qrcode\(\) ⇒ `Promise.`

Get bot qrcode

**Kind**: instance method of [`ContactSelf`](contact-self.md#ContactSelf)  
**Example**

```javascript
import { generate } from 'qrcode-terminal'
bot.on('login', (user: ContactSelf) => {
  console.log(`user ${user} login`)
  const qrcode = await user.qrcode()
  console.log(`Following is the bot qrcode!`)
  generate(qrcode, { small: true })
})
```

### contactSelf.signature\(signature\)

Change bot signature

**Kind**: instance method of [`ContactSelf`](contact-self.md#ContactSelf)

| Param | Description |
| :--- | :--- |
| signature | The new signature that the bot will change to |

**Example**

```javascript
bot.on('login', async user => {
  console.log(`user ${user} login`)
  try {
    await user.signature(`Signature changed by wechaty on ${new Date()}`)
  } catch (e) {
    console.error('change signature failed', e)
  }
})
```

### contactSelf.name\(\) ⇒ `string`

Get alias of bot.

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)

**Example**

```javascript
bot.on('login', async user => {
  console.log(`user ${user} login`)
  console.log(`user name: ${user.name()}`)
})
```

### contactSelf.name\(name\) ⇒ `Promise<string>`

Change bot alias.

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)

| Param | Description |
| :--- | :--- |
| name | The new alias that the bot will change to |

**Example**

```javascript
bot.on('login', async user => {
  console.log(`user ${user} login`)
  const oldName = user.name()
  try {
    await user.name(`${oldName}-${new Date().getTime()}`)
  } catch (e) {
    console.error('change name failed', e)
  }
})
```
