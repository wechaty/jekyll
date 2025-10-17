---
title: "Wechaty Puppet Service WorkPro Release Announcement"
author: wang-nan
categories: announcement
tags:
  - news
  - puppet-service
  - puppet-provider
  - workpro
  - ecosystem
image: /assets/2022/12-introducing-workpro-puppet-en/wecom.webp
excerpt: >
  After long-term preparation and development, WorkPro, the successor to WxWork, officially enters beta testing as a new Wechaty Puppet Service! Free 7-day trial tokens available, with formal operating plans coming soon.
---

After long-term preparation and development, WorkPro, the successor to WxWork, has officially entered the beta testing phase as the Wechaty community's new Puppet Service! Community members are welcome to apply for a free 7-day trial token. The official operating plan will be announced soon, so stay tuned!

## About Wechaty Puppet Service WorkPro

WorkPro is a new puppet service based on wechaty-puppet-service created by [RPAChat](http://rpachat.com/). RPAChat, from Silicon Valley, USA, focuses on turning IM software into bots through RPA technology. RPAChat is providing conversation-based marketing cloud solutions for well-known brands such as P&G, L'ORÉAL Paris, Swisse, and POPMART.

![rpachat-logo.webp](/assets/2022/12-introducing-workpro-puppet-en/rpachat-logo.webp)

WxWork, as our previous generation enterprise WeChat puppet service, has served everyone for over two years. Due to design and architectural reasons, WxWork has some defects that cannot be resolved, such as:

- Enormous CPU and memory consumption
- When receiving official enterprise WeChat group messages, the system needs hours to process messages, making it unusable
- When scanning QR codes to log in, it takes a very long time to sync historical messages

WorkPro completely solves the above problems with a newly designed architecture, bringing huge improvements in efficiency and performance. It also includes many new features, some of which are not yet supported in the community version of Wechaty. We are actively promoting the merging of these features into the community branch.

## About Wechaty Versions

Due to WorkPro's support for new events such as group announcement events, there are currently some compatibility issues with the community version of Wechaty, which will be fixed soon. For details, please refer to [issue 216](https://github.com/wechaty/puppet-service/issues/216).

WorkPro's architecture is directly based on wechaty-grpc related functions, aligned with the latest version of wechaty-grpc. For deprecated functions, comprehensive compatibility has not been provided, so compatibility with wechaty 0.x cannot be guaranteed. Wechaty 1.x has been released for quite some time, and it is recommended to use the latest version of Wechaty.

## How to Apply for Trial

For friends interested in this puppet service, we provide a free 7-day trial token. Please scan the QR code with WeChat or enterprise WeChat to add customer service for consultation.

![qrcode.webp](/assets/2022/12-introducing-workpro-puppet-en/qrcode.webp)

## WorkPro Getting-Started

Very simple quick start tutorial:

Use the official example repository: [Wechaty getting-started project](https://github.com/wechaty/getting-started). It is recommended to use [Github Codespace](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=78732688) directly. Of course, you can also choose to clone the [Wechaty getting-started project](https://github.com/wechaty/getting-started) locally and run it locally.

- Running with Codespace

    1. Click [Github Codespace](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=78732688), then click `Create Codespace`. Then wait a bit, the configuration service will automatically install dependencies.
    2. Set environment variables. Currently, we do not support TLS connections. For details, please refer to: <https://github.com/wechaty/puppet-service/issues/160>

        ```shell
        export WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
        ```

    3. Modify `examples/ding-dong-bot.ts`. This file should already be open automatically. Change lines 73-76 to the following code:

        ```ts
        puppet: 'wechaty-puppet-service', // WorkPro is a puppet-service, so you should fill in 'wechaty-puppet-service' instead of 'wechaty-puppet-workpro'
        puppetOptions: {
          token: 'xxx', // Fill in your token here, it should be in the form 'puppet_workpro_xxxxxx'
        }
        ```

    4. Use `npm start` to start the bot, you should see the QR code appear in your terminal.

- Clone and run locally

    1. Install dependencies, make sure you have node 16 or above installed, then run:

        ```shell
        npm install cross-env -g
        npm install
        ```

    2. Set environment variables. Currently, we do not support TLS connections. For details, please refer to: <https://github.com/wechaty/puppet-service/issues/160>

        ```shell
        export WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
        ```

    3. Open `examples/ding-dong-bot.ts`. Change lines 73-76 to the following code:

        ```ts
        puppet: 'wechaty-puppet-service', // WorkPro is a puppet-service, so you should fill in 'wechaty-puppet-service' instead of 'wechaty-puppet-workpro'
        puppetOptions: {
          token: 'xxx', // Fill in your token here, it should be in the form 'puppet_workpro_xxxxxx'
        }
        ```

    4. Use `npm start` to start the bot, you should see the QR code appear in your terminal.

## Comparison Between WorkPro and WxWork

| Feature | WorkPro | WxWork | Notes |
| - | - | - | ----|
| <Messages> |
| Text message | ✅ | ✅ |
| Image message | ✅ | ✅ |
| Video message | ✅ | ✅ |
| File message | ✅ | ✅ |
| Emoji message | ✅ | ✅ |
| Sticker message | ✅ | ✅ |
| Voice message | ✅ | ❌ |
| Mini-program message | ✅ | ✅ |
| Link message | ✅ | ✅ |
| Contact card message | ✅ | ✅ |
| Location message | ✅ | ❌ | Requires experience version Wechaty |
| Quote message | ✅ | ❌ | Requires experience version Wechaty |
| Video account message | ✅ | ❌ | Requires experience version Wechaty |
| <Groups> |
| Create group chat | ✅ | ✅ |
| Set group announcement | ✅ | ✅ |
| Get group announcement | ✅ | ❌ |
| Group QR code | ❌ | ❌ | In planning |
| Invite to group | ✅ | ✅ |
| Accept group invitation | ✅ | ✅ |
| Remove from group | ✅ | ✅ |
| Leave group | ✅ | ❌ |
| Modify group name | ✅ | ✅ |
| Join group event | ✅ | ✅ | WxWork only for group owner, WorkPro unlimited |
| Leave group event | ✅ | ✅ | WxWork only for group owner, WorkPro unlimited |
| Group name event | ✅ | ✅ |
| @ group members | ✅ | ✅ |
| Group member list | ✅ | ✅ |
| Group details | ✅ | ✅ |
| Group announcement change event | ✅ | ❌ | Requires experience version Wechaty |
| <Contacts> |
| Modify remark | ✅ | ✅ |
| Add friend | ✅ | ✅ |
| Accept friend | ✅ | ✅ |
| Friend list | ✅ | ✅ |
| Friend details | ✅ | ✅ |
| Delete/deleted event | ✅ | ❌  |
| Friend tags | ✅ | ❌ | Requires experience version Wechaty |
| Friend tag add/remove event | ✅ | ❌ | Requires experience version Wechaty |
| Tag add/delete/modify event | ✅ | ❌ | Requires experience version Wechaty |
| <Others> |
| Login event | ✅ | ✅ |
| Scan status | ✅ | ❌ |
| Logout event | ✅ | ✅ |
| Active logout | ✅ | ❌ |
| Post moments | ✅ | ❌ | Requires experience version Wechaty |

---

> 本文也有[中文版本](/2022/12/23/introducing-workpro-puppet/)。
