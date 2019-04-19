---
description: 机器人自己的信息将会封装一个ContactSelf 类. 这个类继承自  Contact
---

# ContactSelf


{% hint style="info" %}
这个类继承自 Contact
{% endhint %}

**Kind**: global class

- [ContactSelf](#contactself)
    - [contactSelf.avatar() ⇒ Promise<FileBox>](#contactselfavatar-%E2%87%92-promisefilebox)
    - [contactSelf.avatar\(file) ⇒ `Promise<void>`](#contactselfavatarfile-%E2%87%92-promisevoid)
    - [contactSelf.qrcode\(\) ⇒ `Promise<string>`](#contactselfqrcode-%E2%87%92-promisestring)
    - [contactSelf.name\(\) ⇒ `string`](#contactselfname-%E2%87%92-string)
    - [contactSelf.name\(name\) ⇒ `Promise<string>`](#contactselfnamename-%E2%87%92-promisestring)
    - [contactSelf.signature\(signature\): `Promise<void>`](#contactselfsignaturesignature-promisevoid)

**Kind**: instance method of [`ContactSelf`](contact-self.md)

### contactSelf.avatar() ⇒ Promise<FileBox>

获取机器人的头像

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

### contactSelf.avatar\(file) ⇒ `Promise<void>`

设置 机器人的头像

| Param | Type |
| :--- | :--- |
| file | `FileBox` |


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

### contactSelf.qrcode\(\) ⇒ `Promise<string>`

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

### contactSelf.name\(\) ⇒ `string`

获取 机器人签名。

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)

**Example**

```javascript
bot.on('login', async user => {
  console.log(`user ${user} login`)
  console.log(`user name: ${user.name()}`)
})
```

### contactSelf.name\(name\) ⇒ `Promise<string>`

修改机器人名称。

**Kind**: instance method of [`ContactSelf`](contact-self.md#contactself)

| Param | Description |
| :--- | :--- |
| name | 机器人要修改的名称内容 |

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
