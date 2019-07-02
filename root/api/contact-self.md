---
description: 机器人自己的信息将会封装一个ContactSelf 类. 这个类继承自  Contact
---

# ContactSelf

## ContactSelf

{% hint style="info" %}
这个类继承自 Contact
{% endhint %}

**Kind**: global class

* [ContactSelf](contact-self.md#contactself)
  * [contactSelf.avatar\(\[file\]\) ⇒ `Promise <void | FileBox>`](contact-self.md#contactselfavatarfile-⇒-promise)
  * [contactSelf.qrcode\(\) ⇒ `Promise<string>`](contact-self.md#contactselfqrcode-⇒-promisestring)
  * [contactSelf.name\(\[name\]\) ⇒ `Promise<void> | string`](contact-self.md#contactselfname-⇒-promisestring)
  * [contactSelf.signature\(signature\): `Promise<void>`](contact-self.md#contactselfsignaturesignature-promisevoid)

**Kind**: instance method of [`ContactSelf`](contact-self.md)

### contactSelf.avatar\(\[file\]\) ⇒ `Promise <void | FileBox>`

获取 / 设置机器人的头像。

| Param | Type |
| :--- | :--- |
| [file] | `FileBox` |

**Example** _\(GET / SET the avatar for a bot\)_

```javascript
import { FileBox }  from 'file-box'
bot.on('login', async user => {
  console.log(`user ${user} login`)
  const file = await user.avatar()
  const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
  await user.avatar(fileBox)
  console.log(`Change bot avatar successfully!`)
})
```

### contactSelf.qrcode\(\) ⇒ `Promise<string>`

获取机器人的二维码。

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself) 

**Example**

```javascript
import { generate } from 'qrcode-terminal'
bot.on('login', async user => {
  console.log(`user ${user} login`)
  const qrcode = await user.qrcode()
  console.log(`Following is the bot qrcode!`)
  generate(qrcode, { small: true })
})
```

### contactSelf.name\(\[name\]\) ⇒ `Promise <void> | string`

获取 / 修改机器人昵称。

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)

| Param | Description |
| :--- | :--- |
| [name] | 机器人要修改的昵称内容 |

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

### contactSelf.signature\(signature\): `Promise<void>`

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

