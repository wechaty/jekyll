---
description: 机器人自己的信息将会封装一个ContactSelf 类. 这个类继承自  Contact
---

# ContactSelf

## ContactSelf

{% hint style="info" %}
这个类继承自 Contact
{% endhint %}

**Kind**: global class

* [ContactSelf](contact-self.md)
  * [.avatar\(\[file\]\)](contact-self.md#contactself-avatar-file-promise) ⇒ `Promise.`
  * [.qrcode\(\)](contact-self.md#contactself-qrcode-promise) ⇒ `Promise.`
  * [.signature\(signature\)](contact-self.md#contactself-signature-signature)

### contactSelf.avatar\(\[file\]\) ⇒ `Promise.`

获取 / 设置 机器人的头像。

**Kind**: instance method of [`ContactSelf`](contact-self.md)

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

获取机器人的二维码。

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)  
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

修改机器人签名。

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)

| Param | Description |
| :--- | :--- |
| signature | 机器人要修改的签名内容 |

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

