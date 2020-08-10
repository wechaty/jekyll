---
title: API Reference
sidebar_label: 'API Index'
---

The Wechaty API surface is tiny. Wechaty defines a set of easy to use classes for you.

This section documents the complete Wechaty API.

## Top-level Exports

Every class described below is a top-level export.

### Wechaty Class

- [Class Wechaty](api/wechaty)

### User Classes

- [Class Message](api/message)
- [Class Contact](api/contact)
  - [Class ContactSelf](api/contact-self)
- [Class Room](api/room)
  - [Class RoomInvitation](api/room-invitation)
- [Class Friendship](api/friendship)

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
