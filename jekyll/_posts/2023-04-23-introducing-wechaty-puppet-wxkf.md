---
title: "Wechaty Puppet WXKF 发布公告"
author: wang-nan
categories: announcement
tags:
  - news
  - puppet
  - wxkf
  - juzi
image: /assets/2023/04-introducing-wechaty-puppet-wxkf/logo.webp
---

Wechaty 社区的朋友们，我们,[句子互动](https://www.juzibot.com),这次带来了全新的 puppet, [wechaty-puppet-wxkf](https://github.com/juzibot/wechaty-puppet-wxkf) ，基于微信客服官方接口。这个 puppet 是一个本地运行的 puppet ，不依赖服务，同时完全开源。

微信客服由腾讯微信团队为企业打造，用于满足企业的客服需求，帮助企业做好客户服务。企业可以在微信内、外各个场景中接入微信客服，用户可以发起咨询，企业可通过API来收发消息。

微信客服在企微后台配置后，可以通过自建应用、第三方应用和服务商代开发三种方式管理，目前 wechaty-puppet-wxkf 支持自建应用和服务商代开发两种方式。

微信客服的消息接受通过企微后台应用接收回调后再拉取新消息完成，因此在理想情况下应该有一个回调中心分配各种回调到应用，然后应用再分配到不同的 puppet 实例上。我们也为此推出了微信客服的回调管理服务， WXKF-manager 。 wechaty-puppet-wxkf 同时支持单独使用和配合 manager 共同使用。

## 单独使用 wechaty-puppet-wxkf

![structure-1.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf/structure-1.webp)

### 安装依赖

```shell
npm install wechaty
npm install wechaty-puppet-wxkf
```

需要注意的是， wechaty-puppet-wxkf 需要 wechaty 1.0 以上版本以运行。

### 配置环境变量

与大多数传统的 puppet 不同， wechaty-puppet-wxkf 无法通过扫描二维码登录，你需要通过环境变量或者在新建 puppet 实例的时候传入一些配置来登录成功。如果相同的变量在环境变量和配置都有设置，则优先使用配置项的。

这会在后续章节中进一步讨论。

### 启动 ding-dong bot

```ts
import { WechatyBuilder  } from "wechaty";
import { PuppetWxkf } from "wechaty-puppet-wxkf";

const bot = WechatyBuilder.build({
  puppet: new PuppetWxkf()
})

bot.on('message', async message => {
  if (message.text === 'ding') {
    await message.say('dong')
  }
})

bot.start()
```

### 身份认证

#### 如何获取身份信息

如前文所说，以及 ding-dong bot 所示， wechaty-puppet-wxkf 中不会产生 scan 事件，因此也无法通过扫码来登录，这并非是弄错了。微信客服的登录是利用企微的“微信客服”应用。你可以在你的企业后台管理微信客服应用。

![app-1.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf/app-1.webp)

将滚动条拉到页面最下方，你可以看到微信客服目前可以以3种方式被 API 管理，分别是自建应用、第三方应用和服务商代开发。目前 wechaty-puppet-wxkf 支持自建应用和服务商代开发方式。

![app-2.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf/app-2.webp)

如果你需要管理一个微信客服账号，步骤如下

- 在微信客服应用管理页面创建一个新的微信客服账号，给他一个名字（`name`）和头像。

  注： 你可以通过`name`或者`kfId`来区分账号，`kfId`比较优先。如果是想通过`kfId`来区分账号，请记得给他们唯一的名字。

- 将微信客服分配给你正在开发的企业应用。你可以在页面最下方点击自建应用或者服务商代开发来进行操作。

- 获取`token`和`encodingAesKey`。这两个值将被用来解析企微回调。

  如果你是在开发自建应用，你可以在企微客服应用页面上找到他，点击 “API” 再点击“设置”。

  ![app-3.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf/app-3.webp)

  如果你是服务商代开发，你应该能在你的服务商管理后台找到对应的值。

- 配置回调地址。你可以单独部署此 puppet ，但更好的方式是通过一个服务来接受和分发所有微信客服相关的回调。你可以使用我们的 WXKF-Manager 项目，也可以自行设计这一服务。

- 获取`secret`和`corpId`。这些值会被用来获取`accessToken`，然后用于调用企微提供的接口。

  如果你是自建应用开发者，你可以点击上图中的“查看”，然后`secret`会发送到你的手机上。你的`corpId`，可以在企微管理后台的“我的企业”标签上找到。

  如果你是服务商代开发应用开发者，这些信息会被发送到你的应用配置的回调地址上。请参考[腾讯官方 API 文档](https://developer.work.weixin.qq.com/document/path/97163)的相关章节来获取进一步的信息。

- 你还需要设定一个`port`， puppet 将会创建一个 web 服务并在指定的端口接收回调。

#### 如何配置身份信息

- 通过传入 Puppet 实例

  ```ts
  const bot = WechatyBuilder.build({
    puppet: new PuppetWxkf({
      callbackPort: `${port}`,
      wxkfAuth: {
        token: `${token}`,
        encodingAESKey: `${encodingAESKey}`,
        corpId: `${corpId}`,
        corpSecret: `${secret}`,
        kfOpenId: `${kfId}`, // either of these two keys
        kfName: `${kfName}`, // is good enough
      },
    })
  })
  ```

- 通过环境变量

  ```bash
    export PUPPET_WXKF_WECOM_APP_TOKEN=${token}
    export PUPPET_WXKF_WECOM_APP_AES_KEY=${encodingAESKey}
    export PUPPET_WXKF_WECOM_CORP_ID=${corpId}
    export PUPPET_WXKF_WECOM_CORP_SECRET=${secret}

    export PUPPET_WXKF_WECOM_KF_NAME=${name}
    export PUPPET_WXKF_WECOM_KF_OPEN_ID=${kfId}
    export PUPPET_WXKF_CALLBACK_PORT=8080
  ```

#### 配置对象存储服务 OSS

对象存储服务并非是必须的，对于 wechaty-puppet-wxkf 来说，不配置也能使用大部分的功能。但关键问题是，小程序的封面图将无法传输。原因如下。

小程序在 wecahty 中的 payload 定义如下：

```ts
export interface MiniProgramPayload {
    appid?       : string,   // optional, appid, get from wechat (mp.weixin.qq.com)
    description? : string,   // optional, mini program title
    pagePath?    : string,   // optional, mini program page path
    iconUrl?     : string,   // optional, mini program icon url
    shareId?     : string,   // optional, the unique userId for who share this mini program
    thumbUrl?    : string,   // optional, default picture, convert to thumbnail
    title?       : string,   // optional, mini program title
    username?    : string,   // original ID, get from wechat (mp.weixin.qq.com)
    thumbKey?    : string,   // original, thumbnailurl and thumbkey will make the headphoto of mini-program better
}
```

请注意，图标和封面图的形式都是 url ，而不是后来较新的 payload 使用的 filebox json 字符串。这就导致了这两个图片必须成为一个可访问的 url 地址才能传递。网址链接的封面也是类似的情况，但幸运的是，企微客服会直接传可访问的明文 url 作为网址链接的封面图，因此只有小程序受影响。

我们目前支持的 OSS 类型包括 S3, Ali, Minio, Tos 和 Cos 。可以参考`src/util/env.ts`来查看如何配置。

## 与 WXKF-Manager 配合使用

### 为什么需要一个 Manager ？

无论是自建应用还是服务商代开发应用，一个企微的应用可能承担着诸多职责，微信客服只是其中之一，例如组织架构变化、标签变化等等。而一个应用在一个企业中只能配置一个回调地址，因此需要有一个服务来根据事件类型分发回调。

如果要使用 WXKF-Manager ，在 puppet 中需要添加两个环境变量，`PUPPET_WXKF_MANAGER_CENTER_ENDPOINT`和`PUPPET_WXKF_SELF_ENDPOINT`。

```bash
export PUPPET_WXKF_MANAGER_ENDPOINT=http://127.0.0.1:7777
export PUPPET_WXKF_SELF_ENDPOINT=http://127.0.0.1:8080
```

`PUPPET_WXKF_MANAGER_ENDPOINT`是 WXKF-Manager 的地址， puppet 会主动去用 kfId 注册。 `PUPPET_WXKF_SELF_ENDPOINT`是 puppet 自身回调服务的地址，当 WXKF-Manager 收到回调后，会根据回调内容寻找对应的 puppet ，并调用 puppet 回调服务。

### 架构图

![structure-3.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf/structure-3.webp)

### 如何使用

- 依赖一个 mongo 来存储注册的 puppet 信息
- 典型的部署方式是将这一项目打包成 Docker 镜像部署在容器中。

### 环境变量配置

``` bash
export MONGO_URI=mongodb://127.0.0.1:27017/wxkf-manager
export PORT=7777
# export ACCESS_TOKEN_URL=https://127.0.0.1:8888/api/corp/accessToken
```

MONGO_URI: mongo 的地址
PORT: WXKF-Manager 服务监听的端口
ACCESS_TOKEN_URL: 这是一个可选变量。因为直接从企业微信获取 accessToken 的接口是有调用频率限制的，因此理想的方式是通过一个其他服务来调用、刷新和缓存 accessToken 。这一接口的实现方式应该与企业微信文档中一致。

注意：当解密企业微信的回调的时候，我们会需要前文所说的`aesEncodingKey`和`token`，而这两个值在 WXKF-Manager 中不是来自配置，而是来自注册的 puppet 。因此如果需要 WXKF-Manager 直接接收回调，需要有一个对应的 puppet 注册过之后才能配置成功。

### 最佳实践

尽管上图所示的架构可以正常工作，但并非是最佳实践。如前文所说，一个企业微信的应用可能承担许多职责，而微信客服只是其中之一，因此最好有一个专门的回调服务来接受和分发所有的企微回调。同时，接从企业微信获取 accessToken 的接口是有调用频率限制的，因此理想的方式是通过一个其他服务来调用、刷新和缓存 accessToken 。这一接口的实现方式应该与企业微信文档中一致。因此，最理想的架构图如下所示。

![structure-2.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf/structure-2.webp)

在这一架构中， WXKF-Manager 不再直接接收企微回调，而是通过一个 Gateway 服务来接受和分发。企微的回调地址可以配置为 `http://www.example.com/callback/{corpId}`。他的数据库中存有对应企业的`aesEncodingKey`和`token`，因此他可以解密回调信息。

当收到一个类型为 `kf_msg_or_event` 的回调时，他应该调用 WXKF-Manager 的接口，让 WXKF-Manager 把这一回调分配给具体的 puppet。

这一回调过程既可以通过明文的 JSON 形式完成，也可以用密文，即直接把来自企微的信息转发回来。例如：

明文：

```ts
const url = `${PUPPET_WXKF_MANAGER_ENDPOINT}/callback/decrypted/${corpId}`

axios.post(url, {
  token: 'xxx', // this token is not the token of wecom corp app, it is the token for sync messages. see https://kf.weixin.qq.com/api/doc/path/94745
  openKfId: 'xxx',
})
```

密文：

```ts
const url = `${PUPPET_WXKF_MANAGER_ENDPOINT}/callback/${corpId}`

axios.post(url, xmlString, { // xmlString is the raw crypted message directly from wecom callback body`
  headers: {
    'Content-type': 'text/xml'
  }
})
```

## 反馈和意见

针对 wechaty-puppet-wxkf 的反馈请移步 [issues](https://github.com/juzibot/wechaty-puppet-wxkf/issues) 提出意见

针对 WXKF-Manager 的反馈请移步 [issues](https://github.com/juzibot/wxkf-manager/issues) 提出意见

## 写在最后

一个社区的繁荣离不开大家的贡献。感谢 Wechaty 社区的成员们。是你们的热情和支持，让我们能够不断走出舒适区，开发新的产品。你们的反馈和建议也让我们对 puppet 的开发有更多的心得与经验，做出更好的产品。

我们[句子互动](https://www.juzibot.com)将一如既往的支持 Wechaty 社区，为开源社区的繁荣做出我们的一份贡献。期待下次再见。
