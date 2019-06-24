## 简介
### Wechaty
[Wechaty](https://github.com/Chatie/wechaty) 是一个开源的`微信机器人`接口，由 Typescript 构建的 Node.js  应用。支持多种微信接入方案，包括网页、ipad、ios、windows, android 等。同时支持Linux, Windows, Darwin(OSX/Mac) 和 Docker 多个平台。

#### Wechaty能帮我们做什么？
- 智能收发消息
  - 发送者，接收者及群组的ID
  - 消息的类型（文本、链接、联系人、表情、图片、文件）
  - 通过简单配置，即可加入智能对话系统，完成指定任务
- 管理联系人
  - 查找好友
  - 获取联系人详细信息
  - 管理备注信息
  - 获取机器人信息（self）
- 管理群组
  - 创建群组
  - 自动入群、关键字入群、二维码入群
  - 邀请联系人进群（40人以上链接邀请好友，确认后入群；40人以下直接入群）
  - 将联系人移出群组
- 处理好友请求
  - 自动处理好友请求
  - 获取发好友请求的联系人信息

#### 快速创建`微信机器人`
```javascript
const { Wechaty } = require('wechaty')

Wechaty.instance() // Singleton
.on('scan', (qrcode, status)  => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
.on('login', user => console.log(`User ${user} logined`))
.on('message', message => console.log(`Message: ${message}`))
.start()
```

以上一段很简短的代码就能创建一个 wechaty 智能机器人。
- 通过监听`scan`事件，触发扫码登录的功能
- 监听`login`事件，检测到用户登录成功时，提示用户登录信息
- 监听`message`事件，用户通过微信所发的消息都会被`微信机器人`打印显示在控制台

基于事件绑定机制，我们可以根据不同场景事件的触发，通过wechaty中的room, contact, message等功能模块完成自己感兴趣的逻辑操作，从而提升工作效率。

### Puppet
Puppet 是帮助 Wechaty 操纵微信的工具，即微信接入方案。目前存在根据不同协议实现的版本(wechaty-puppet-padchat, wechaty-puppet-padpro,wechaty-puppet-mock等)。详细了解Puppet抽象类的层级结构，参见 [Puppet Provider Interface Documentation](https://chatie.io/wechaty-puppet/typedoc/classes/puppet.html#hierarchy)。

#### Puppet常用方法梳理
    
对于Wechaty中所提供的接口，部分接口的实现都会依赖于Puppet的抽象方法，再根据协议的不同进行实现。例如wechaty-puppet-padpro模块，该模块是一种基于iPad协议的对Puppet抽象方法的具体实现。

> Message方法

```
Message-->messageSendText:发送文本信息
Message-->messageSendFile:根据FileBox的文件名后缀进行处理
Message-->messageFile:根据消息文件类型进行处理
Message-->messageSendContact:发送联系人名片
Message-->messagePayload:从缓存中获取message信息
Message-->messageForward:根据payload的type来判断消息类型处理
```

> Contact方法

```
Contact-->contactRoomList:联系人群组列表
Contact-->contactList:联系人ID列表
Contact-->contactQrcode:联系人二维码
Contact-->contactPayload:从缓存中获取联系人信息
Contact-->contactSearch:查找联系人
```

> Room方法

```
Room-->roomCreate:创建群组
Room-->roomTopic:群组的名称
Room-->roomQrcode:群组二维码
Room-->roomAdd:添加成员
Room-->roomDel:移出成员
Room-->roomList:群组列表
Room-->roomMemberList:群组成员列表
Room-->roomMemberPayload
Room-->roomMemberSearch
```

> Friendship方法

```
Friendship-->friendshipAdd:添加好友
Friendship-->friendshipAccept:接受好友
Friendship-->friendshipPayload:从缓存中获取好友请求信息
```



#### Puppet-Padpro
Puppet-PadPro 是 Puppet 基于 iPad 协议的一种实现方式，将 Puppet 中的抽象方法进行实现，是一种较成熟的微信介入方案。

##### padpro入门
从 git 上下载 [wechaty-puppet-padpro源码](https://github.com/botorange/wechaty-puppet-padpro)，从入口文件`index`开始，我们会发现项目的核心文件 `puppet-padpro`，一切的学习从这里开始。

- 引入模块
    - wechaty-puppet
        > 引入 puppet 基类中的一些数据类型

    - pure-function-helpers
        > 纯函数助手，用来解析一些数据，大多是对XML的解析

    - config
        > 日志及基础配置文件

    - utils
        > 工具类方法
    
    - padpro-manager
        > Padpro逻辑管理工具，主要是调用gRPC接口来实现相应的功能，也是该项目的核心之一

    - schemas
        > 类型声明，对于业务处理所采用到的数据结构进行约束

以上介绍了padpro中所依赖的一些模块，可以看出 `puppet-padpro` 及 `padpro-manager` 这两个文件是 padpro 的核心。

进一步了解 padpro 从 `puppet-padpro` 的 `start` 方法开始。

##### GRPC及其优点
Padpro 采用 gRPC 取代 RESTful 作为通信方式。具体使用教程参见 [GRPC quick start](https://grpc.io/docs/quickstart/node/)

- 谷歌开发的一个远程调用框架，现在已开源
- 使用了二进制编码，所以它比 JSON/HTTP 更快
- 明确的接口规范
- 支持流式传输

## 三者之间的调用关系
为了便于讨论，本文以 wechaty 中的 room.qrcode 为例，来阐述三个模块之间的调用关系。

[Wechaty API ⇒ room.qrcode](https://docs.chatie.io/v/zh/api/room#room-qrcode-promise)

    room.qrcode() ⇒ Promise.
    获取群二维码，用户可以通过扫描这个二维码加入群聊。

我们先看一下该API所执行的具体逻辑：

```javascript
/**
* Get QR Code of the Room from the room, which can be used as scan and join the room.
* > Tips:
* This function is depending on the Puppet Implementation, see [puppet-compatible-table](https://github.com/Chatie/wechaty/wiki/Puppet#3-puppet-compatible-table)
* @returns {Promise<string>}
*/
public async qrcode (): Promise<string> {
  log.verbose('Room', 'qrcode()')
  const qrcode = await this.puppet.roomQrcode(this.id)
  return qrcode
}
```

该逻辑实现的过程中会依赖于 puppet 的 roomQrcode 方法，在 puppet 中 roomQrcode 方法只是一个抽象方法：

```javascript
public abstract async roomQrcode (roomId: string) : Promise<string>
```

我们知道 puppet 是一个 wechaty 的微信接入方案，其具体的实现还需要看使用者所采用的puppet实现模块，例如 wechaty-puppet-padpro。当我们使用 padrpo 模块时，padpro 会继承并实现 puppet中的所有抽象方法：

```javascript
export class PuppetPadpro extends Puppet {
    ...
}
```

padpro 对于 roomQrcode 的具体实现如下：

```javascript
public async roomQrcode (roomId: string): Promise<string> {
  log.verbose(PRE, 'roomQrcode(%s)', roomId)
  const memberIdList = await this.roomMemberList(roomId)
  if (!memberIdList.includes(this.selfId())) {
    throw new Error(`userSelf not in this room: ${roomId}`)
  }

  const result = await this.padproManager!.GrpcGetContactQrcode(roomId)
  const base64 = result.QrcodeBuf

  const roomPayload = await this.roomPayload(roomId)
  const roomName    = roomPayload.topic || roomPayload.id
  const fileBox     = FileBox.fromBase64(base64, `${roomName}-qrcode.jpg`)

  const qrcode = await fileBoxToQrcode(fileBox)

  return qrcode
}
```


## 合作开发
有兴趣参与 wechaty 开发的小伙伴们，可以从GitHub上将 [wechaty](https://github.com/Chatie/wechaty)、[wechaty-puppet](https://github.com/Chatie/wechaty-puppet)、[wechaty-puppet-padpro](https://github.com/botorange/wechaty-puppet-padpro) 源码下载到本地，在开发项目中使用 npm link 将以上模块载入。便于Bug修复、业务拓展等的提交。

技术栈：`Typescript` `Node.js`

### 详细日志查看
padpro中有详尽的日志层级系统，可以使用命令`PADPRO_LOG=silly`来启动项目，从而查看对应等级的日志。通过日志的反应情况，可以明显的得知某功能所执行的具体逻辑过程，便于快速锁定问题。

### npm link 的坑
简单介绍以上三个模块之间的依赖关系：

> wechaty 依赖于 wechaty-puppet

```
wechaty-->wechaty-puppet
```

> wechaty-puppet-padpro 依赖于 wechaty-puppet

```
wechaty-puppet-padpro-->wechaty-puppet
```

引入模块的步骤说明：
> `Note`:以上三个模块都需要执行`npm install`安装项目依赖包

`Step1`
> 在模块 wechaty-puppet 中创建链接，执行以下命令
```javascript
npm run dist // 编译 .ts 文件
npm link // 创建链接
```

`Step2`
> 在模块 wechaty 中引入依赖模块并创建链接，执行以下命令
```javascript
npm link wechaty-puppet // 引入 puppet 模块
npm run dist // 编译 .ts 文件
npm link // 创建链接
```

`Step3`
> 在模块 wechaty-puppet-padpro 中引入依赖模块并创建链接，执行以下命令
```javascript
npm link wechaty-puppet // 引入 puppet 模块
npm run dist // 编译 .ts 文件
npm link // 创建链接
```

`Step4`
> 在开发项目 my-wechaty-project 中引入链接，执行以下命令

```javascript
npm link wechaty // 引入 wechaty 模块
npm link wechaty-puppet-padpro // 引入 puppet-padpro 模块
```

`Step5`
> 运行开发项目 my-wechaty-project，执行以下命令，并查看运行状态。

> 若存在错误提示，请在模块 wechaty 及 wechaty-puppet-padpro 中重新执行 `npm link` 操作。

```javascript
node node_modules/ts-node/dist/bin.js index.ts
```
