---
title: "2022-小白如何从0到1上手puppet-walnut"
author: fabian
categories:
  - project
image: /assets/2022/04-how-to-start-puppet-walnut/puppet-walnut.webp
tags:
  - 5g
  - puppet-walnut
  - chatbot
  - ecosystem
---

## 小白如何从0到1上手 Puppet-Walnut

> 今天和大家分享从未接触过5G消息开发的小白如何从0到1的申请到5G消息的测试账号，以及如何使用Wechaty社区中的walnut puppet来实现5G消息的一些功能。

### 一、进入硬核桃5G开发者社区进行账号的注册

#### 1. 点击[网址链接](https://www.5g-msg.com/#/)进入硬核桃5G开发者社区，如下图所示，点击网页中的「免费注册」按钮

![img](/assets/2022/04-how-to-start-puppet-walnut/1.webp)

#### 2. 如下图所示，输入账户名、密码、手机号进行相关注册

![img](/assets/2022/04-how-to-start-puppet-walnut/2.webp)

#### 3. 如下图，输入手机短信验证码

![img](/assets/2022/04-how-to-start-puppet-walnut/3.webp)

#### 4. 注册成功！如果怕忘记密码，可以再绑定一个邮箱~（绑定邮箱的操作此处忽略）

![img](/assets/2022/04-how-to-start-puppet-walnut/4.webp)

### 二、报名参加 “启航计划” 5G消息开发者大赛

> 在完成第一步的账号注册后，我们已经有了一个硬核桃5G开发者社区的账号

#### 1. 登陆第一步注册的账号之后，点击「“[启航计划”](https://www.5g-msg.com/#/sailPlan)[5G消息](https://www.5g-msg.com/#/sailPlan)[开发者大赛](https://www.5g-msg.com/#/sailPlan)」进入活动界面

![img](/assets/2022/04-how-to-start-puppet-walnut/5.webp)

#### 2. 点击下图中的「立即报名」

![img](/assets/2022/04-how-to-start-puppet-walnut/6.webp)

#### 3. 如下图所示，填写参赛相关信息（如有邀请码请填写邀请码，没有可不填），填写完毕之后点击「提交」按钮

![img](/assets/2022/04-how-to-start-puppet-walnut/7.webp)

#### 4. 报名成功！分享邀请码，邀请朋友参赛

![img](/assets/2022/04-how-to-start-puppet-walnut/8.webp)

### 三、申请试用硬核桃开发套件

> 在申请开发资源前，请先进行实名认证。如若之前已经通过认证，无需二次认证，可直接申请所需开发资源。

#### 1. 实名认证

账号实名认证（个人）或者企业账号认证，两种方式二选一即可。

- 点击下图中的「前去认证」按钮对账户进行实名认证

![img](/assets/2022/04-how-to-start-puppet-walnut/14.webp)

- 如下图所示，填写相关资料进行账户实名认证

![img](/assets/2022/04-how-to-start-puppet-walnut/15.webp)

- 资料提交成功后，账户实名认证状态会如下图所示变为「待审核」

![img](/assets/2022/04-how-to-start-puppet-walnut/16.webp)

- 如果提交的资料没问题，等待30分钟之内，认证状态会变为「认证通过」

![img](/assets/2022/04-how-to-start-puppet-walnut/17.webp)

#### 2. 企业账号认证

- 接下来我们继续申请企业账号认证，点击下图中的「前去认证」

![img](/assets/2022/04-how-to-start-puppet-walnut/18.webp)

- 如下图所示，填写相关资料进行企业账号认证

![img](/assets/2022/04-how-to-start-puppet-walnut/19.webp)

- 资料提交成功后，企业账号认证状态会如下图所示变为「待审核」

![img](/assets/2022/04-how-to-start-puppet-walnut/20.webp)

- 如果提交的资料没问题，等待30分钟之内，认证状态会变为「认证通过」

![img](/assets/2022/04-how-to-start-puppet-walnut/21.webp)

#### 3. 开发资源申请

- 点击下图中的「开发者中心」按钮，选择下拉框中的「硬核桃开发套件」

![img](/assets/2022/04-how-to-start-puppet-walnut/29.webp)

- 点击下图中的「免费试用」按钮

![img](/assets/2022/04-how-to-start-puppet-walnut/11.webp)

- 点击「硬核桃开发套件」按钮回到下图中的界面，点击「提交」

![img](/assets/2022/04-how-to-start-puppet-walnut/22.webp)

- 如下图所示，填写相关资料后点击「提交」按钮（非必填信息可以空着）。参赛作品以电联接口账号信息为准。

![img](/assets/2022/04-how-to-start-puppet-walnut/23.webp)

- 显示账号信息提交成功！

![img](/assets/2022/04-how-to-start-puppet-walnut/24.webp)

- 此时配置状态如下图所示显示「未配置」

![img](/assets/2022/04-how-to-start-puppet-walnut/25.webp)

- 等待配置完成，配置完成后状态如下图所示显示「已配置」，此时点击「查看」，显示分配的 Chatbot资源信息。

![img](/assets/2022/04-how-to-start-puppet-walnut/30.webp)

### 四、硬核桃调测模拟终端

> 5G消息是短信的升级，请在**安卓手机**安装终端模拟器进行5G消息的测试。

#### 1. APP下载

- 下载页面<https://www.5g-msg.com/#/kaifataojian>，页面内查找终端测试消息 APP，点击进行下载，如图：

![img](/assets/2022/04-how-to-start-puppet-walnut/31.webp)

![img](/assets/2022/04-how-to-start-puppet-walnut/32.webp)

#### 2. APP安装

- 下载完成后，点击安装，**替代系统默认短信权限**，无需担心原有短信数据。由于安卓手机权限不一致的原因，若无法替代系统默认短信权限，可能导致终端模拟器无法正常使用，建议更换另一款安卓手机，重新安装。

#### 3. APP登录

- 安装成功后，打开 APP，点击【右上角三竖点】，选【设置】，选【常规】，选【融合通信登录】，登录界面如图：

![img](/assets/2022/04-how-to-start-puppet-walnut/33.webp)

- 输入账号（申请 Chatbot 时的手机号码）信息，点击登录，成功后返回，可查看到【小程序服务】。

#### 4. Chatbot查看

- 点击【小程序服务】，可在【小程序列表】中，输入Chatbot名称，搜索 Chatbot。点击 Chatbot，进入交互界面。完成首次交互后，也可在【消息列表】中，进行 Chatbot 的消息交互。

![img](/assets/2022/04-how-to-start-puppet-walnut/34.webp)

### 五、开始接入Wechaty社区的puppet-walnut

> 在完成第二步的硬核桃开发者套件申请试用后，我们已经有了从硬核桃5G开发者社区申请到的Chatbot的AppId、Chatbot的AppKey、Chatbot的sipId。上报填报chatbot的公网回调地址

#### 1. 设置环境变量

- Windows

  ```bash
  set WECHATY_LOG=verbose
  set WECHATY_PUPPET=wechaty-puppet-walnut
  set WECHATY_PUPPET_WALNUT_APPID=Chatbot的AppId
  set WECHATY_PUPPET_WALNUT_APPKEY=Chatbot的AppKey
  set WECHATY_PUPPET_WALNUT_SIPID=Chatbot的sipId
  ```
  
- Linux & MacOs

  ```bash
  export WECHATY_LOG=verbose
  export WECHATY_PUPPET=wechaty-puppet-walnut
  export WECHATY_PUPPET_WALNUT_APPID=Chatbot的AppId
  export WECHATY_PUPPET_WALNUT_APPKEY=Chatbot的AppKey
  export WECHATY_PUPPET_WALNUT_SIPID=Chatbot的sipId
  ```
  
#### 2. 安装依赖

> 1. Node.js version 16+
> 2. NPM version 7+
> 3. TypeScript version 4.4+

```bash
npm install wechaty
npm install wechaty-puppet-walnut
```

#### 3. 配置公网映射（开发环境）

将我们之前上报的公网回调地址**映射到我们本地的3000端口**即可。

> 这边推荐使用开源的frp工具
>
> - Github repo: <https://github.com/fatedier/frp>
> - 教程👉 <https://fabian4.site/blog/22217.html>
>
> walnut中包含一个**koa**的服务 默认监听端口为3000（可在启动配置中更改）

#### 4. 使用示例

##### (1). 创建实例

```ts
const bot = WechatyBuilder.build({
  puppet: new PuppetWalnut(),
})  // get a Wechaty instance
  .on('login', (user: any) => log.info(`User ${user} logged in`))
    // get the message chatbot received from users
  .on('message', async (message: Message) => {
    log.info(`Message: ${message}`)
  })

await bot.start()

const contact = await bot.Contact.find({ id: 'xxxxxxxxxxx' })
```

##### (2). 文本消息

```ts
await contact.say('This is a simple text message.')
```

![img](/assets/2022/04-how-to-start-puppet-walnut/26.webp)

##### (3). 图片消息

```ts
contact.say(FileBox.fromFile('C:\\Users\\Desktop\\1.png'))
```

![img](/assets/2022/04-how-to-start-puppet-walnut/27.webp)

##### (4). 富文本消息

```ts
const post = await bot.Post.builder()
  .add('This is a single rich card.')
  .add('This is the description of the rich card. It\'s the first field that will be truncated if it exceeds the maximum width or height of a card.')
  .add(FileBox.fromFile('C:\\Users\\Desktop\\1.png'))
  .type(PUPPET.types.Post.Unspecified)
  .build()

await contact.say(post)
```

![img](/assets/2022/04-how-to-start-puppet-walnut/28.webp)

#### 6. 消息支持

> 最新支持情况请参考 <https://github.com/wechaty/puppet-walnut#%E6%B6%88%E6%81%AF%E7%A7%8D%E7%B1%BB%E6%94%AF%E6%8C%81>

| 消息类型   | 从属(根据接口返回) | api                    | 接收 | 发送 | 群聊 |
| ---------- | ------------------ | ---------------------- | ---- | ---- | ---- |
| 文本       | `text`             | `message.text`         | ✅    | ✅    | ❌    |
| 图片       | `image`            | `message.toImage()`    | ✅    | ✅    | ❌    |
| 视频       | `video`            | `message.toFilebox()`  | ✅    | ❌    | ❌    |
| 音频       | `audio`            | `message.toFilebox()`  | ✅    | ❌    | ❌    |
| 位置       | `location`         | `message.toLocation()` | ❌    | ❌    | ❌    |
| 文件       | `other`            | `message.toFilebox()`  | ✅    | ❌    | ❌    |
| 联系人     | `other`            | `message.toContact()`  | ✅    | ❌    | ❌    |
| 富文本卡片 | `post`             | `message.toPost()`     | ❌    | ✅    | ❌    |

#### 7. Wechaty Api支持

> 最新支持情况请参考 <https://github.com/wechaty/puppet-walnut#wechaty-api-%E6%94%AF%E6%8C%81>

##### (1). Contact

- #### [Properties](https://wechaty.js.org/docs/api/contact#properties)

  | Name | Type     | Description                                                  | Support | Details      |
  | ---- | -------- | ------------------------------------------------------------ | ------- | ------------ |
  | id   | `string` | Get Contact id. This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/wechaty/wechaty/wiki/Puppet#3-puppet-compatible-table) | ✅       | Phone number |

- #### [Instance Methods](https://wechaty.js.org/docs/api/contact#instance-methods)

  | Instance Methods             | Return type                                                  | Support | Details               |
  | ---------------------------- | ------------------------------------------------------------ | ------- | --------------------- |
  | say(text Or Contact Or File) | `Promise`                                                    | ✅       | ⚠Contact not Support  |
  | name()                       | `String`                                                     | ✅       | Phone number          |
  | alias(newAlias)              | `Promise`                                                    | ✅       |                       |
  | friend()                     | `Boolean or null`                                            | ✅       | True                  |
  | type()                       | `ContactType.Unknown or ContactType.Personal or ContactType.Official` | ✅       | ContactType.Personal  |
  | gender()                     | `ContactGender.Unknown or ContactGender.Male or ContactGender.Female` | ✅       | ContactGender.Unknown |
  | province()                   | `String or null`                                             | ❌       |                       |
  | city()                       | `String or null`                                             | ❌       |                       |
  | avatar()                     | `Promise`                                                    | ✅       | Default avatar        |
  | sync()                       | `Promise`                                                    | ✅       |                       |
  | self()                       | `Boolean`                                                    | ✅       |                       |

  > Default avatar 👉 <https://raw.githubusercontent.com/wechaty/puppet-walnut/main/docs/images/avatar.png>

- #### [Static Methods](https://wechaty.js.org/docs/api/contact#static-methods)

  | Static Methods            | Return Type                 | Support | Detail |
  | ------------------------- | --------------------------- | ------- | ------ |
  | find(query)               | `Promise <Contact \| null>` | ✅       |        |
  | findAll(Query Arguements) | `Promise <Contact []>`      | ✅       |        |

##### (2). Message

- #### [Instance Methods](https://wechaty.js.org/docs/api/message#instance-methods)

  | Instance methods             | Return type         | Support | Detail               |
  | ---------------------------- | ------------------- | ------- | -------------------- |
  | talker()                     | `Contact` or `null` | ✅       |                      |
  | to()                         | `Contact` or `null` | ✅       |                      |
  | room()                       | `Room` or `null`    | ✅       | null                 |
  | text()                       | `string`            | ✅       |                      |
  | say(text Or Contact Or File) | `Promise`           | ✅       | ⚠Contact not Support |
  | type()                       | `MessageType`       | ✅       | Message.Text         |
  | self()                       | `boolean`           | ✅       |                      |
  | mention()                    | `Promise`           | ❌       |                      |
  | mentionSelf()                | `Promise`           | ❌       |                      |
  | forward(to)                  | `Promise`           | ✅       |                      |
  | date()                       | `Date`              | ✅       |                      |
  | age()                        | `Number`            | ✅       |                      |
  | toFileBox()                  | `Promise`           | ✅       |                      |
  | toContact()                  | `Promise`           | ✅       |                      |
  | toUrlLink()                  | `Promise`           | ✅       |                      |

- #### [Static Method](https://wechaty.js.org/docs/api/message#static-method)

  | Static Methods | Return type | Support | Detail |
  | -------------- | ----------- | ------- | ------ |
  | find()         | `Promise`   | ✅       |        |
  | findAll()      | `Promise`   | ✅       |        |

> Author: [@fabian](https://github.com/fabian4)
