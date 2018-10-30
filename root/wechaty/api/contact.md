## Classes

<dl>
<dt><a href="#Contact">Contact</a></dt>
<dd><p>All wechat contacts(friend) will be encapsulated as a Contact.
<a href="https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/contact-bot.ts">Examples/Contact-Bot</a></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ContactQueryFilter">ContactQueryFilter</a></dt>
<dd><p>The way to search Contact</p>
</dd>
</dl>

<a name="Contact"></a>

## Contact
All wechat contacts(friend) will be encapsulated as a Contact.
[Examples/Contact-Bot](https://github.com/Chatie/wechaty/blob/1523c5e02be46ebe2cc172a744b2fbe53351540e/examples/contact-bot.ts)

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Get Contact id. This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table) |


* [Contact](#Contact)
    * _instance_
        * [.say(textOrContactOrFileOrUrl)](#Contact+say) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.name()](#Contact+name) ⇒ <code>string</code>
        * [.alias(newAlias)](#Contact+alias) ⇒ <code>Promise.&lt;(null\|string\|void)&gt;</code>
        * [.friend()](#Contact+friend) ⇒ <code>boolean</code> \| <code>null</code>
        * [.type()](#Contact+type) ⇒ <code>ContactType.Unknown</code> \| <code>ContactType.Personal</code> \| <code>ContactType.Official</code>
        * [.gender()](#Contact+gender) ⇒ <code>ContactGender.Unknown</code> \| <code>ContactGender.Male</code> \| <code>ContactGender.Female</code>
        * [.province()](#Contact+province) ⇒ <code>string</code> \| <code>null</code>
        * [.city()](#Contact+city) ⇒ <code>string</code> \| <code>null</code>
        * [.avatar()](#Contact+avatar) ⇒ <code>Promise.&lt;FileBox&gt;</code>
        * [.sync()](#Contact+sync) ⇒ <code>Promise.&lt;this&gt;</code>
        * [.self()](#Contact+self) ⇒ <code>boolean</code>
    * _static_
        * [.find(query)](#Contact.find) ⇒ <code>Promise.&lt;(Contact\|null)&gt;</code>
        * [.findAll([queryArg])](#Contact.findAll) ⇒ <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code>

<a name="Contact+say"></a>

### contact.say(textOrContactOrFileOrUrl) ⇒ <code>Promise.&lt;void&gt;</code>
> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Contact</code>](#Contact)  

| Param | Type | Description |
| --- | --- | --- |
| textOrContactOrFileOrUrl | <code>string</code> \| [<code>Contact</code>](#Contact) \| <code>FileBox</code> | send text, Contact, or file to contact. </br> You can use [FileBox](https://www.npmjs.com/package/file-box) to send file |

**Example**  
```js
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
```
<a name="Contact+name"></a>

### contact.name() ⇒ <code>string</code>
Get the name from a contact

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
const name = contact.name()
```
<a name="Contact+alias"></a>

### contact.alias(newAlias) ⇒ <code>Promise.&lt;(null\|string\|void)&gt;</code>
GET / SET / DELETE the alias for a contact

Tests show it will failed if set alias too frequently(60 times in one minute).

**Kind**: instance method of [<code>Contact</code>](#Contact)  

| Param | Type |
| --- | --- |
| newAlias | <code>none</code> \| <code>string</code> \| <code>null</code> | 

**Example** *( GET the alias for a contact, return {(Promise&lt;string | null&gt;)})*  
```js
const alias = await contact.alias()
if (alias === null) {
  console.log('You have not yet set any alias for contact ' + contact.name())
} else {
  console.log('You have already set an alias for contact ' + contact.name() + ':' + alias)
}
```
**Example** *(SET the alias for a contact)*  
```js
try {
  await contact.alias('lijiarui')
  console.log(`change ${contact.name()}'s alias successfully!`)
} catch (e) {
  console.log(`failed to change ${contact.name()} alias!`)
}
```
**Example** *(DELETE the alias for a contact)*  
```js
try {
  const oldAlias = await contact.alias(null)
  console.log(`delete ${contact.name()}'s alias successfully!`)
  console.log('old alias is ${oldAlias}`)
} catch (e) {
  console.log(`failed to delete ${contact.name()}'s alias!`)
}
```
<a name="Contact+friend"></a>

### contact.friend() ⇒ <code>boolean</code> \| <code>null</code>
Check if contact is friend

> Tips:
This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Returns**: <code>boolean</code> \| <code>null</code> - <br>True for friend of the bot <br>
False for not friend of the bot, null for unknown.  
**Example**  
```js
const isFriend = contact.friend()
```
<a name="Contact+type"></a>

### contact.type() ⇒ <code>ContactType.Unknown</code> \| <code>ContactType.Personal</code> \| <code>ContactType.Official</code>
Return the type of the Contact
> Tips: ContactType is enum here.</br>

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
const bot = new Wechaty()
await bot.start()
const isOfficial = contact.type() === bot.Contact.Type.Official
```
<a name="Contact+gender"></a>

### contact.gender() ⇒ <code>ContactGender.Unknown</code> \| <code>ContactGender.Male</code> \| <code>ContactGender.Female</code>
Contact gender
> Tips: ContactGender is enum here. </br>

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
const gender = contact.gender() === bot.Contact.Gender.Male
```
<a name="Contact+province"></a>

### contact.province() ⇒ <code>string</code> \| <code>null</code>
Get the region 'province' from a contact

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
const province = contact.province()
```
<a name="Contact+city"></a>

### contact.city() ⇒ <code>string</code> \| <code>null</code>
Get the region 'city' from a contact

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
const city = contact.city()
```
<a name="Contact+avatar"></a>

### contact.avatar() ⇒ <code>Promise.&lt;FileBox&gt;</code>
Get avatar picture file stream

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
// Save avatar to local file like `1-name.jpg`

const file = await contact.avatar()
const name = file.name
await file.toFile(name, true)
console.log(`Contact: ${contact.name()} with avatar file: ${name}`)
```
<a name="Contact+sync"></a>

### contact.sync() ⇒ <code>Promise.&lt;this&gt;</code>
Force reload data for Contact, Sync data from lowlevel API again.

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Example**  
```js
await contact.sync()
```
<a name="Contact+self"></a>

### contact.self() ⇒ <code>boolean</code>
Check if contact is self

**Kind**: instance method of [<code>Contact</code>](#Contact)  
**Returns**: <code>boolean</code> - True for contact is self, False for contact is others  
**Example**  
```js
const isSelf = contact.self()
```
<a name="Contact.find"></a>

### Contact.find(query) ⇒ <code>Promise.&lt;(Contact\|null)&gt;</code>
Try to find a contact by filter: {name: string | RegExp} / {alias: string | RegExp}

Find contact by name or alias, if the result more than one, return the first one.

**Kind**: static method of [<code>Contact</code>](#Contact)  
**Returns**: <code>Promise.&lt;(Contact\|null)&gt;</code> - If can find the contact, return Contact, or return null  

| Param | Type |
| --- | --- |
| query | [<code>ContactQueryFilter</code>](#ContactQueryFilter) | 

**Example**  
```js
const bot = new Wechaty()
await bot.start()
const contactFindByName = await bot.Contact.find({ name:"ruirui"} )
const contactFindByAlias = await bot.Contact.find({ alias:"lijiarui"} )
```
<a name="Contact.findAll"></a>

### Contact.findAll([queryArg]) ⇒ <code>Promise.&lt;Array.&lt;Contact&gt;&gt;</code>
Find contact by `name` or `alias`

If use Contact.findAll() get the contact list of the bot.

#### definition
- `name`   the name-string set by user-self, should be called name
- `alias`  the name-string set by bot for others, should be called alias

**Kind**: static method of [<code>Contact</code>](#Contact)  

| Param | Type |
| --- | --- |
| [queryArg] | [<code>ContactQueryFilter</code>](#ContactQueryFilter) | 

**Example**  
```js
const bot = new Wechaty()
await bot.start()
const contactList = await bot.Contact.findAll()                      // get the contact list of the bot
const contactList = await bot.Contact.findAll({ name: 'ruirui' })    // find allof the contacts whose name is 'ruirui'
const contactList = await bot.Contact.findAll({ alias: 'lijiarui' }) // find all of the contacts whose alias is 'lijiarui'
```
<a name="ContactQueryFilter"></a>

## ContactQueryFilter
The way to search Contact

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name-string set by user-self, should be called name |
| alias | <code>string</code> | The name-string set by bot for others, should be called alias [More Detail](https://github.com/Chatie/wechaty/issues/365) |

