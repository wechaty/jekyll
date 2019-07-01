---
description: 所有的联系人（好友）都会被封装成Contact 类实例
---

# Contact

## Contact

[Examples/Contact-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/contact-bot.ts)

**Kind**: global class  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| id | `string` | 获取联系人id，这个id 是否为永久唯一id 取决于你使用什么puppet，详见 [Puppet 兼容性清单](../puppet.md#puppet-compatibility)。 |

* [Contact](contact.md#contact)
  * _instance_
    * [.say\(textOrContactOrFileOrUrl\)](contact.md#contact-say-textorcontactorfileorurl-promise) ⇒ `Promise <void>`
    * [.name\(\)](contact.md#contact-name-string) ⇒ `string`
    * [.alias\(newAlias\)](contact.md#contact-alias-newalias-promise) ⇒ `Promise <null | string | void>`
    * [.friend\(\)](contact.md#contact-friend-boolean-or-null) ⇒ `boolean` \| `null`
    * [.type\(\)](contact.md#contact-type-contacttype-unknown-or-contacttype-personal-or-contacttype-official) ⇒ `ContactType.Unknown` \| `ContactType.Personal` \| `ContactType.Official`
    * [.gender\(\)](contact.md#contact-gender-contactgender-unknown-or-contactgender-male-or-contactgender-female) ⇒ `ContactGender.Unknown` \| `ContactGender.Male` \| `ContactGender.Female`
    * [.province\(\)](contact.md#contact-province-string-or-null) ⇒ `string` \| `null`
    * [.city\(\)](contact.md#contact-city-string-or-null) ⇒ `string` \| `null`
    * [.avatar\(\)](contact.md#contact-avatar-promise) ⇒ `Promise <FileBox>`
    * [.sync\(\)](contact.md#contact-sync-promise) ⇒ `Promise <void>`
    * [.self\(\)](contact.md#contact-self-boolean) ⇒ `boolean`
  * _static_
    * [.find\(query\)](contact.md#contact-find-query-promise) ⇒ `Promise <Contact | null>`
    * [.findAll\(\[queryArg\]\)](contact.md#contact-findall-queryarg-promise-greater-than) ⇒ `Promise <Contact []>`

### contact.say\(textOrContactOrFileOrUrl\) ⇒ `Promise <void>`

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Contact`](contact.md#contact)

| Param | Type | Description |
| :--- | :--- | :--- |
| textOrContactOrFileOrUrl | `string` \| [`Contact`](contact.md#contact) \| `FileBox` \| `UrlLink` | 给微信好友发送文本，联系人名片，文件或者链接。你可以使用[FileBox](https://www.npmjs.com/package/file-box) 来发送文件。 |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
const contact = await bot.Contact.find({name: 'lijiarui'})  // change 'lijiarui' to any of your contact name in wechat

// 1. send text to contact

await contact.say('welcome to wechaty!')

// 2. send media file to contact

import { FileBox }  from 'file-box'
const fileBox1 = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
const fileBox2 = FileBox.fromFile('/tmp/text.txt')
await contact.say(fileBox1)
await contact.say(fileBox2)

// 3. send contact card to contact

const contactCard = bot.Contact.load('contactId')
await contact.say(contactCard)

// 4. send url link to contact

const urlLink = new UrlLink ({
  description : 'this is url link description',
  thumbnailUrl: 'this is a thumbnail url',
  title       : 'this is url link title',
  url         : 'this is the url',
})
await contact.say(urlLink)
```

### contact.name\(\) ⇒ `string`

获取联系人的昵称

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
const name = contact.name()
```

### contact.alias\(newAlias\) ⇒ `Promise <null | string | void>`

获取/设置/删除 好友的备注。

如果设置备注过于频繁，设置将会失效（比如1分钟设置60次）

**Kind**: instance method of [`Contact`](contact.md#contact)

| Param | Type |
| :--- | :--- |
| newAlias | `none` \| `string` \| `null` |

**Example** _\( GET the alias for a contact, return {\(Promise&lt;string \| null&gt;\)}\)_

```javascript
const alias = await contact.alias()
if (alias === null) {
  console.log('You have not yet set any alias for contact ' + contact.name())
} else {
  console.log('You have already set an alias for contact ' + contact.name() + ':' + alias)
}
```

**Example** _\(SET the alias for a contact\)_

```javascript
try {
  await contact.alias('lijiarui')
  console.log(`change ${contact.name()}'s alias successfully!`)
} catch (e) {
  console.log(`failed to change ${contact.name()} alias!`)
}
```

**Example** _\(DELETE the alias for a contact\)_

```javascript
try {
  const oldAlias = await contact.alias(null)
  console.log(`delete ${contact.name()}'s alias successfully!`)
  console.log(`old alias is ${oldAlias}`)
} catch (e) {
  console.log(`failed to delete ${contact.name()}'s alias!`)
}
```

### contact.friend\(\) ⇒ `boolean` \| `null`

判断这个联系人是否为机器人的好友

{% hint style="info" %}
这个功能是否能实现取决于你使用的是哪一个Puppet, 详情参考：[puppet兼容性列表](../puppet.md#puppet-compatibility)
{% endhint %}

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Returns**: `boolean` \| `null`
True for friend of the bot  
False for not friend of the bot, null for unknown.  
**Example**

```javascript
const isFriend = contact.friend()
```

### contact.type\(\) ⇒ `ContactType.Unknown` \| `ContactType.Personal` \| `ContactType.Official`

获取好友的类型，是公众号还是普通还有。

{% hint style="info" %}
ContactType 在这里是enum
{% endhint %}

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
const bot = new Wechaty()
await bot.start()
const isOfficial = contact.type() === bot.Contact.Type.Official
```

### contact.gender\(\) ⇒ `ContactGender.Unknown` \| `ContactGender.Male` \| `ContactGender.Female`

获取联系人的性别

{% hint style="info" %}
ContactGender在这里是 enum
{% endhint %}

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
const gender = contact.gender() === bot.Contact.Gender.Male
```

### contact.province\(\) ⇒ `string` \| `null`

获取联系人设置的省份信息

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
const province = contact.province()
```

### contact.city\(\) ⇒ `string` \| `null`

获取联系人设置的城市信息

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
const city = contact.city()
```

### contact.avatar\(\) ⇒ `Promise <FileBox>`

获取联系人的头像

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
// Save avatar to local file like `1-name.jpg`

const file = await contact.avatar()
const name = file.name
await file.toFile(name, true)
console.log(`Contact: ${contact.name()} with avatar file: ${name}`)
```

### contact.sync\(\) ⇒ `Promise <void>`

强制重新加载好友数据，会从低级别的 API 中重新同步一遍。

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Example**

```javascript
await contact.sync()
```

### contact.self\(\) ⇒ `boolean`

检测好友是否是机器人自己。

**Kind**: instance method of [`Contact`](contact.md#contact)  
**Returns**: `boolean` - True for contact is self, False for contact is others  
**Example**

```javascript
const isSelf = contact.self()
```

### Contact.find\(query\) ⇒ `Promise <Contact | null>`

通过类似这样的命令查找联系人： {name: string \| RegExp} / {alias: string \| RegExp}

支持通过昵称或者备注查找。如果查到不止一个联系人，返回找到的第一个。

**Kind**: static method of [`Contact`](contact.md#contact)  
**Returns**: `Promise <Contact | null>` - If can find the contact, return Contact, or return null

| Param | Type |
| :--- | :--- |
| query | [`ContactQueryFilter`](contact.md#contactqueryfilter) |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
const contactFindByName = await bot.Contact.find({ name:"ruirui"} )
const contactFindByAlias = await bot.Contact.find({ alias:"lijiarui"} )
```

### Contact.findAll\(\[queryArg\]\) ⇒ `Promise <Contact []>`

通过name \(昵称\)或者alias\(备注\)查找联系人。

用 Contact.findAll\(\) 获取机器人的所有联系人列表。

#### 定义

* `name`   用户自己设置的昵称叫做name
* `alias`  机器人给这个用户设置的昵称叫做alias

**Kind**: static method of [`Contact`](contact.md#contact)

| Param | Type |
| :--- | :--- |
| [queryArg] | [`ContactQueryFilter`](contact.md#contactqueryfilter) |

**Example**

```javascript
const bot = new Wechaty()
await bot.start()
const contactList = await bot.Contact.findAll()                      // get the contact list of the bot
const contactList = await bot.Contact.findAll({ name: 'ruirui' })    // find all of the contacts whose name is 'ruirui'
const contactList = await bot.Contact.findAll({ alias: 'lijiarui' }) // find all of the contacts whose alias is 'lijiarui'
```

## 类型定义    <a id="typedef"></a>

* [ContactQueryFilter](contact.md#contactqueryfilter)

### ContactQueryFilter

搜索联系人的方式

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | 用户自己设置的昵称叫做name |
| alias | `string` | 机器人或者其他人给这个用户设置的昵称叫做alias：[More Detail](https://github.com/Chatie/wechaty/issues/365) |

