---
title: API Reference
---

The Wechaty API surface is tiny. Wechaty defines a set of easy to use classes for you.

This section documents the complete Wechaty API.

## Top-level Exports

Every class described below is a top-level export.

### Wechaty Class

- [Class Wechaty](wechaty.md)

### User Classes

- [Class Message](message.md)
- [Class Contact](contact.md)
  - [Class ContactSelf](contact-self)
- [Class Room](room.md)
  - [Class RoomInvitation](room-invitation)
- [Class Friendship](friendship.md)

## Importing

You can import any of them like this:

### ES6/TypeScript

```js
import { Wechaty } from 'wechaty'
```

### ES5 (CommonJS)

```js
var Wechaty = require('wechaty').Wechaty
```
