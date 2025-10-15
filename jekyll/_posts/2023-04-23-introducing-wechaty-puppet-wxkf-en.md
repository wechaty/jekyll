---
title: "Announcing Wechaty Puppet WXKF"
author: wang-nan
categories: announcement
tags:
  - news
  - puppet
  - wxkf
  - juzi
image: /assets/2023/04-introducing-wechaty-puppet-wxkf-en/logo.webp
excerpt: "We are excited to introduce wechaty-puppet-wxkf, a new, fully open-source puppet based on the official WeChat Customer Service API. This puppet runs locally, does not depend on external services, and offers robust features for managing customer interactions."
---

To the Wechaty community, we at [Juzi Interactive (句子互动)](https://www.juzibot.com) are excited to bring you a brand-new puppet, [wechaty-puppet-wxkf](https://github.com/juzibot/wechaty-puppet-wxkf), based on the official WeChat Customer Service API. This puppet runs locally, does not rely on any external services, and is completely open-source.

WeChat Customer Service is a tool created by the Tencent WeChat team for businesses to meet their customer service needs and help them provide excellent support. Businesses can integrate WeChat Customer Service across various scenarios, both inside and outside of WeChat. Users can initiate inquiries, and businesses can send and receive messages via the API.

After configuring WeChat Customer Service in the Wework backend, it can be managed in three ways: through self-built applications, third-party applications, or service provider development. Currently, `wechaty-puppet-wxkf` supports the self-built application and service provider development methods.

WeChat Customer Service messages are received by pulling new messages after the Wework backend application receives a callback. Therefore, ideally, there should be a callback center to distribute various callbacks to the application, which then distributes them to different puppet instances. For this purpose, we have also launched a callback management service for WeChat Customer Service, WXKF-manager. `wechaty-puppet-wxkf` supports both standalone use and use in conjunction with the manager.

## Using `wechaty-puppet-wxkf` Standalone

![structure-1.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf-en/structure-1.webp)

### Installing Dependencies

```shell
npm install wechaty
npm install wechaty-puppet-wxkf
```

Note that `wechaty-puppet-wxkf` requires Wechaty version 1.0 or higher to run.

### Configuring Environment Variables

Unlike most traditional puppets, `wechaty-puppet-wxkf` cannot be logged in by scanning a QR code. You need to pass some configuration through environment variables or when creating a new puppet instance to log in successfully. If the same variable is set in both environment variables and the configuration, the configuration item will take precedence.

This will be discussed further in subsequent sections.

### Starting a Ding-Dong Bot

```ts
import { WechatyBuilder } from "wechaty";
import { PuppetWxkf } from "wechaty-puppet-wxkf";

const bot = WechatyBuilder.build({
  puppet: new PuppetWxkf()
});

bot.on('message', async message => {
  if (message.text === 'ding') {
    await message.say('dong');
  }
});

bot.start();
```

### Authentication

#### How to Obtain Identity Information

As mentioned earlier and as shown in the ding-dong bot example, `wechaty-puppet-wxkf` does not generate a `scan` event, so it cannot be logged in by scanning a QR code. This is not a mistake. Logging into WeChat Customer Service is done using the "WeChat Customer Service" application in Wework. You can manage the WeChat Customer Service application in your enterprise's backend.

![app-1.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf-en/app-1.webp)

Scroll to the bottom of the page, and you will see that WeChat Customer Service can be managed by API in three ways: self-built applications, third-party applications, and service provider development. Currently, `wechaty-puppet-wxkf` supports the self-built application and service provider development methods.

![app-2.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf-en/app-2.webp)

If you need to manage a WeChat Customer Service account, the steps are as follows:

- Create a new WeChat Customer Service account on the WeChat Customer Service application management page, giving it a name (`name`) and an avatar.
  Note: You can distinguish accounts by `name` or `kfId`. `kfId` is preferred. If you want to distinguish accounts by `kfId`, remember to give them unique names.
- Assign the WeChat Customer Service account to the enterprise application you are developing. You can do this by clicking on "Self-built Application" or "Service Provider Development" at the bottom of the page.
- Obtain the `token` and `encodingAesKey`. These two values will be used to parse Wework callbacks.
  If you are developing a self-built application, you can find them on the Wework Customer Service application page by clicking "API" and then "Settings."
  ![app-3.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf-en/app-3.webp)
  If you are a service provider developer, you should be able to find the corresponding values in your service provider management backend.
- Configure the callback address. You can deploy this puppet separately, but a better way is to use a service to receive and distribute all WeChat Customer Service-related callbacks. You can use our WXKF-Manager project or design this service yourself.
- Obtain the `secret` and `corpId`. These values will be used to get the `accessToken`, which is then used to call the APIs provided by Wework.
  If you are a self-built application developer, you can click "View" in the image above, and the `secret` will be sent to your phone. Your `corpId` can be found in the "My Company" tab of the Wework management backend.
  If you are a service provider application developer, this information will be sent to the callback address configured for your application. Please refer to the relevant sections of the [official Tencent API documentation](https://developer.work.weixin.qq.com/document/path/97163) for more information.
- You also need to set a `port`. The puppet will create a web service and receive callbacks on the specified port.

#### How to Configure Identity Information

- By Passing it to the Puppet Instance

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
  });
  ```

- Through Environment Variables

  ```bash
  export PUPPET_WXKF_WECOM_APP_TOKEN=${token}
  export PUPPET_WXKF_WECOM_APP_AES_KEY=${encodingAESKey}
  export PUPPET_WXKF_WECOM_CORP_ID=${corpId}
  export PUPPET_WXKF_WECOM_CORP_SECRET=${secret}

  export PUPPET_WXKF_WECOM_KF_NAME=${name}
  export PUPPET_WXKF_WECOM_KF_OPEN_ID=${kfId}
  export PUPPET_WXKF_CALLBACK_PORT=8080
  ```

#### Configuring Object Storage Service (OSS)

An Object Storage Service is not mandatory. For `wechaty-puppet-wxkf`, most functions can be used without configuring it. However, the key issue is that the cover images for Mini Programs cannot be transmitted. Here's why.

The payload for a Mini Program in Wechaty is defined as follows:

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

Please note that the icon and cover image are in the form of a URL, not the more recent payload format that uses a FileBox JSON string. This means that these two images must be accessible via a URL to be transmitted. The situation is similar for the cover images of web links, but fortunately, Wework Customer Service directly provides an accessible plain-text URL for web link cover images, so only Mini Programs are affected.

We currently support OSS types including S3, Ali, Minio, Tos, and Cos. You can refer to `src/util/env.ts` to see how to configure them.

## Using with WXKF-Manager

### Why Do You Need a Manager?

Whether it's a self-built application or a service provider-developed application, a Wework application may have many responsibilities, with WeChat Customer Service being just one of them, such as handling organizational structure changes, tag changes, and so on. Since an application can only have one callback address configured within a company, a service is needed to distribute callbacks based on the event type.

To use WXKF-Manager, you need to add two environment variables to the puppet: `PUPPET_WXKF_MANAGER_CENTER_ENDPOINT` and `PUPPET_WXKF_SELF_ENDPOINT`.

```bash
export PUPPET_WXKF_MANAGER_CENTER_ENDPOINT=http://127.0.0.1:7777
export PUPPET_WXKF_SELF_ENDPOINT=http://127.0.0.1:8080
```

`PUPPET_WXKF_MANAGER_CENTER_ENDPOINT` is the address of WXKF-Manager, and the puppet will actively register with it using its `kfId`. `PUPPET_WXKF_SELF_ENDPOINT` is the address of the puppet's own callback service. When WXKF-Manager receives a callback, it will find the corresponding puppet based on the callback content and call the puppet's callback service.

### Architecture Diagram

![structure-3.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf-en/structure-3.webp)

### How to Use

- It relies on a MongoDB to store registered puppet information.
- A typical deployment method is to package this project into a Docker image and deploy it in a container.

### Environment Variable Configuration

```bash
export MONGO_URI=mongodb://127.0.0.1:27017/wxkf-manager
export PORT=7777
# export ACCESS_TOKEN_URL=https://127.0.0.1:8888/api/corp/accessToken
```

- `MONGO_URI`: The address of the MongoDB.
- `PORT`: The port on which the WXKF-Manager service listens.
- `ACCESS_TOKEN_URL`: This is an optional variable. Because the interface for directly obtaining an `accessToken` from Wework has call frequency limits, the ideal approach is to use another service to call, refresh, and cache the `accessToken`. The implementation of this interface should be consistent with the Wework documentation.

Note: When decrypting Wework callbacks, we will need the `aesEncodingKey` and `token` mentioned earlier. In WXKF-Manager, these two values do not come from the configuration but from the registered puppet. Therefore, if you need WXKF-Manager to receive callbacks directly, a corresponding puppet must be registered before the configuration can be successful.

### Best Practices

Although the architecture shown above can work, it is not the best practice. As mentioned earlier, a Wework application may have many responsibilities, and WeChat Customer Service is just one of them. Therefore, it is best to have a dedicated callback service to receive and distribute all Wework callbacks. Also, since the interface for obtaining an `accessToken` from Wework has call frequency limits, the ideal approach is to use another service to call, refresh, and cache the `accessToken`. The implementation of this interface should be consistent with the Wework documentation. Thus, the most ideal architecture is as follows.

![structure-2.webp](/assets/2023/04-introducing-wechaty-puppet-wxkf-en/structure-2.webp)

In this architecture, WXKF-Manager no longer receives Wework callbacks directly but through a Gateway service for reception and distribution. The Wework callback address can be configured as `http://www.example.com/callback/{corpId}`. Its database stores the corresponding company's `aesEncodingKey` and `token`, so it can decrypt the callback information.

When a callback of type `kf_msg_or_event` is received, it should call the WXKF-Manager's interface to have WXKF-Manager assign this callback to a specific puppet.

This callback process can be done either in plain-text JSON format or in ciphertext, i.e., by directly forwarding the information from Wework. For example:

Plain text:

```ts
const url = `${PUPPET_WXKF_MANAGER_CENTER_ENDPOINT}/callback/decrypted/${corpId}`;

axios.post(url, {
  token: 'xxx', // this token is not the token of wecom corp app, it is the token for sync messages. see https://kf.weixin.qq.com/api/doc/path/94745
  openKfId: 'xxx',
});
```

Ciphertext:

```ts
const url = `${PUPPET_WXKF_MANAGER_ENDPOINT}/callback/${corpId}`;

axios.post(url, xmlString, { // xmlString is the raw crypted message directly from wecom callback body
  headers: {
    'Content-type': 'text/xml'
  }
});
```

## Feedback and Suggestions

For feedback on `wechaty-puppet-wxkf`, please submit an issue [here](https://github.com/juzibot/wechaty-puppet-wxkf/issues).

For feedback on `WXKF-Manager`, please submit an issue [here](https://github.com/juzibot/wxkf-manager/issues).

## Final Words

The prosperity of a community depends on the contributions of its members. Thank you to all the members of the Wechaty community. It is your enthusiasm and support that allow us to continuously step out of our comfort zone and develop new products. Your feedback and suggestions also give us more insights and experience in puppet development, helping us create better products.

We at [Juzi Interactive (句子互动)](https://www.juzibot.com) will continue to support the Wechaty community and contribute to the prosperity of the open-source community. We look forward to seeing you next time.

> This post is also available in [Chinese (Simplified)](/2023/04/23/introducing-wechaty-puppet-wxkf/).
