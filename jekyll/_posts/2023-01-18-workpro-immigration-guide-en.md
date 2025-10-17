---
title: "Wechaty Puppet Service WorkPro Migration Guide"
author: wang-nan
categories: tutorial
tags:
  - news
  - puppet-service
  - puppet-provider
  - workpro
  - wxwork
  - ecosystem
image: /assets/2023/01-workpro-immigration-guide/workpro.webp
excerpt: >
  Migration guide for Node Wechaty users upgrading to WorkPro puppet service, including version compatibility, code changes, token migration, and important configuration notes for TLS and reconnection handling.
---

## Preface

This migration guide is primarily for Node Wechaty users. For issues encountered while using other versions of Wechaty, please first upgrade the corresponding Wechaty package version to the latest, then try again. If there are error messages, you can provide them to us to see if compatibility is possible (but cannot be guaranteed), or raise an issue in the corresponding package's repo.

## Before Migration

First, use `npm ls wechaty`, `npm ls wechaty-puppet`, and `npm ls wechaty-puppet-service` to check the versions of the core packages being used. If the version used is 0.x, please upgrade to the latest version. It is especially important to note that the version of `wechaty-puppet-service` needs to be higher than 1.19.9, otherwise it will cause freezing when triggering events like tags and group announcements. For details, please refer to this [issue](https://github.com/wechaty/puppet-service/issues/216).

## Migrating Code

During the upgrade to wechaty 1.x packages, code needs to be modified accordingly. Reference: [Wechaty 1.0 Migration](https://juzihudong.feishu.cn/docx/PCL2dg0yjoDBkOxNlC9cb1H7nkg).

## Obtaining Token

Contact customer service with your existing token to get a new-old token mapping table (generally in CSV format). Information such as login account and expiration date can all be inherited. Normally, the new token will automatically log in to the original account, but since the login environment has changed, there is also a small probability that the connection will drop and require QR code scanning (very low probability).

## Important Notes for Using New Token

- Disable TLS connection. For the reason, please refer to this [issue](https://github.com/wechaty/puppet-service/issues/160). You can disable it in code or through environment variables.
  - Code: Add `tls: { disable: true }` in `puppetOptions`
  - Environment variable: `WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true`
- Pay attention to reconnection after disconnecting from token. Currently, WorkPro is in the new launch phase, with many upgrades and fixes happening. We generally perform service updates around 12 AM. This will be relatively frequent at present, and is expected to be once a week after stabilization, but it is ultimately unavoidable. Accounts will be offline for about 1 minute during updates. Since the community version of wechaty's reconnection function is not very stable at present, it is recommended to use some additional code externally for online status checks and attempt reconnection or restart.

## Functional Differences Between Experience Version and Community Version

In the [WorkPro release blog](https://wechaty.js.org/2022/12/23/introducing-workpro-puppet/), you can see that some functions are marked as dependent on the experience version of Wechaty. The so-called experience version of Wechaty refers to Wechaty-related packages under the @juzi scope, which contain some new features that have not yet been launched in the community version.

It should be noted that although we will do our best to promote the merging of experience version features into the community version and try to ensure compatibility, we cannot guarantee that 100% of the features can be merged into the community version, and that parameters, callbacks, return values, etc. will be exactly the same as the experience version.

Experience version exclusive features include (documentation can be written if needed):

- New Wechaty layer events

```ts
  update               : 'Will be emitted when some info has been changed.',
  'contact-tag-add'    : 'Will be emitted when contact has new tags.',
  'contact-tag-remove' : 'Will be emitted when contact has some tags removed.',
  'contact-name'       : 'Will be emitted when contact name has been changed.',
  'contact-alias'      : 'Will be emitted when contact alias has been changed.',
  'contact-phone'      : 'Will be emitted when contact phone has been changed.',
  'contact-description': 'Will be emitted when contact description has been changed.',
  'contact-corporation': 'Will be emitted when contact corporation has been changed.',
  'room-owner'         : 'Will be emitted when room owner has been changed.',
```

- New Puppet layer events

```ts
  'room-announce': 'new room announcement received',
  tag            : 'tag created, deleted or changed',
  'tag-group'    : 'tag group created, deleted or changed',
  'post-comment' : 'a post receives a new comment',
  'post-tap'     : 'a post receives a new tap',
```

- Moments functionality (post, like, comment)
- Tag functionality (list, add tags)
- Improved reconnection mechanism (need to listen for 'no grpc manager' keyword in errorListener and restart bot)
- Chat read status functionality
- Send and receive video account messages and location messages
- System messages

---

> 本文也有[中文版本](/2023/01/18/workpro-immigration-guide/)。
