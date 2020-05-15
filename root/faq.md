# 常见问题

## 1. 基本使用 <a id="basic"></a>

### 1.1 如何用最简单的方式把wechaty 跑起来？ <a id="simple-run"></a>

1. 从github 上clone wechaty 的教学代码： [https://github.com/wechaty/wechaty-getting-started](https://github.com/wechaty/wechaty-getting-started)
2. 运行 \`npm install\`
3. 运行 \`npm start\`
4. 默认会跑起来我们的demo 例子，demo代码位置: [examples/starter-bot.js](https://github.com/wechaty/wechaty-getting-started/blob/master/examples/starter-bot.js)
5. 修改demo 的例子，实现你自己想要的bot 逻辑

### 1.2 Windows 安装wechaty-puppet-padchat 失败怎么办？ <a id="install-failed"></a>

请参考这篇博客：[在Windows10下安装Wechaty](https://wechaty.github.io/2018/07/24/wechaty-installation-in-windows-10/)

### 1.3 我的微信号无法登陆 <a id="can-not-login"></a>

从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： [https://wx.qq.com](https://wx.qq.com) 上扫码查看是否能登陆。 更多内容详见：

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/wechaty/wechaty/issues/603)
* [\[谣言\] 微信将会关闭网页版本](https://github.com/wechaty/wechaty/issues/990)
* [新注册的微信号无法登陆](https://github.com/wechaty/wechaty/issues/872)
* [wechaty-puppet-puppeteer](https://github.com/wechaty/wechaty-puppet-puppeteer)

{% hint style="success" %}
**解决方案： 第三方提供了非web协议的** [**Puppet**](puppet.md) **解决方案，**[**点击购买token**](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token) **, 更多技术细节查看** [**wechaty-puppet-padchat**](https://github.com/lijiarui/wechaty-puppet-padchat)
{% endhint %}

### 1.**4** 如何打开调试信息 <a id="can-not-login"></a>

参考 [最佳实践之日志说明](best-practice.md#4-ri-zhi-shuo-ming)

## 2. 功能相关 <a id="feature"></a>

{% hint style="info" %}
请查看[ Puppet功能兼容性清单](puppet.md#3-wechaty-puppet-jian-rong-xing) 查看完整功能内容
{% endhint %}

### 2.1 如何获取到用户的微信号 <a id="how-to-get-id"></a>

> 我用\`Contact.id\`获取到的不是用户的微信号，如何获取到用户的微信号？

对的，`Contact.id` 获取不到用户的微信号的，应该用 `Contact.weixin()` 获取用户的微信号。

能否获取到用户的微信号，取决于你使用的是哪一个Puppet。

* 如果使用的是Web 版本的Puppet，基于网页微信的机制，大部分情况下获取不到微信号，只有一小部分用户能获取到微信号。
* 如果使用的是iPad 版本的Puppet，PadPro版本是可以拿到微信号的，但是前提这个Contact 需要和bot 是好友关系，非好友关系是拿不到微信号的。

相关issue：

* [\#1658](https://github.com/wechaty/wechaty/issues/1658) How to get the wx\_id when user had wx account? 
* [\#1307](https://github.com/wechaty/wechaty/issues/1307) How to get the user's wechat account（微信号）？

### 2.2 如何获取好友和群的唯一id？ <a id="unique-id"></a>

通过 `Contact.id` 和 `Room.id` 获取好友和群的唯一id。

不同的Puppet，这个唯一id是不同的。

除此之外，还有一定重要的不同：**是否能够跨session 依然保持不变，换句话说，当你重新登录的时候，或者切换账号登录的时候，同一个好友或者群的id 是否唯一。**

不通的Puppet 表现各不相同：

* 基于Web 版本的Puppet 得到的id 跨session 是会变化的，所以不能被用来当做你系统的唯一标识码来使用。
* 基于iPad 版本的Puppet 得到的id 跨session 是不会变化的，可以用来当做这个联系人的唯一标识码。

相关issue:

* [\#1644](https://github.com/wechaty/wechaty/issues/1644)  About wxid or chatroomID
* [\#90](https://github.com/wechaty/wechaty/issues/90) 请问可以获取到群号吗？
* [\#1276](https://github.com/wechaty/wechaty/issues/1276) 最新版本Contact没有uin字段了吗？
* [\#133](https://github.com/wechaty/wechaty/issues/133)  请问有办法取得个人和群的唯一标识吗？或者有没有办法自己构建？
* [\#1307](https://github.com/wechaty/wechaty/issues/1307) How to get the user's wechat account（微信号）？

### 2.3 支持 红包、转账、朋友圈… 吗？ <a id="feature-support"></a>

以下功能目前均不支持

* 支付相关 - 红包、转账、收款 等都不支持
* 在群聊中@他人 - 是的，Web 微信中被人@后也不会提醒
* 朋友圈相关 - 后续会支持
* 小程序 - 后续会支持
* 发送视频 - 后续会支持

以下功能部分支持

* 发送分享链接，仅padchat 支持
* 发送名片，仅padchat 支持
* 发送语音消息，仅padchat 支持

### 2.4 wechaty 是支持个人号还是公众号？ <a id="personal-vs-official"></a>

现阶段，wechaty 只支持个人号，未来会陆续开放支持公众号的功能。

相关Issue:

* [\#1016](https://github.com/wechaty/wechaty/issues/1016) Using wechaty to start a wechatOA account

### 2.5 wechaty 是否可以发送卡片消息，然后跳转到网页 <a id="url-message"></a>

> 是否可以通过wechaty 发送分享链接？

PuppetPadchat 是支持的， 其他版本是不支持的，示例代码：

```typescript
  import { UrlLink } from 'wechaty'
  bot.on('message', async function (m: Message) {
    const link = new UrlLink({
      description : '这是图文链接里面的描述',
      title       : '这是图文链接的标题',
      url         : 'https://github.com/wechaty/wechaty',
      thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=30&v=4',
    })
    m.say(link)
  })
```

相关issue:

* [\#1593](https://github.com/wechaty/wechaty/issues/1539) feat: add receive and send link
* [\#718](https://github.com/wechaty/wechaty/issues/718) Add support for send url rich media message
* [\#537](https://github.com/wechaty/wechaty/issues/537) \[enhancement\] Cant send a wechat page link to the room.
* [\#331](https://github.com/wechaty/wechaty/issues/331) \[Feature\] sending formatted links / href tags

### 2.6 机器人被拉到一个新的群组里的事件是否支持？ <a id="room-join-support"></a>

支持，可以通过\`room-join\` 获取到这个事件。

```typescript
bot.on('room-join', (room, inviteeList, inviter) => {
  const nameList = inviteeList.map(c => c.name()).join(',')
  console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
  // 如果机器人被拉到一个新的群组里, inviteeList[0] === bot.self()
})
```

### 2.7 为什么需要扫码登陆而不是用户名密码登陆？ <a id="why-scan-login"></a>

> 我发现代码是有通过用户名密码登陆的方法的，所以也许我可以很简单的写一个创建账户的功能，然后不用再扫码登陆，但是为什么现在没做呢？

对的，我们不支持账号密码登陆，以后也不会支持。

有一些Puppet 有有通过账号密码登陆的方法的，但是我们并不打算把这个API开放出来，因为以下3个原因：

1. 有一些Puppet 是不支持这个功能的，比如使用网页API的PuppetWechat4u
2. 当你使用扫码的方式登陆的时候，你是可以保存你手机的session的。换句话说，你可以同时让手机和机器人同时在线。如果你使用了用户名密码登陆，那么的session将会失效，只有机器人微信在线，手机微信将会自动退出。
3. 通过用户名密码登陆的协议，是使用一个协议服务器来控制iPad 微信的。如果你使用用户名密码的方式登陆，那么你就会直接把这些敏感的账号信息发给第三方的服务器，这种方式大部分用户会觉得很不舒服。

### 2.8 如何不使用onMessage 来发消息？ <a id="why-not-send-with-on-message"></a>

**在群内发送消息：**

```typescript
const room = await Room.find('room name')
room.say('hello room')
```

**给一个好友私信发消息：**

```typescript
const contact = await Contact.find('contact name')
contact.say('hello room')
```

更多例子请参考：[https://github.com/wechaty/wechaty-getting-started/blob/master/examples](https://github.com/wechaty/wechaty-getting-started/blob/master/examples)

相关issue:

* [\#446](https://github.com/wechaty/wechaty/issues/446) how to send mesage without onMessage
* [\#200](https://github.com/wechaty/wechaty/issues/200) \[new feature\] Forward Message
* [\#89](https://github.com/wechaty/wechaty/issues/89) Wechaty.send\(\) error when send message to the room
* [\#41](https://github.com/wechaty/wechaty/issues/41) \[New Feature\] send message by branding new method: say\(\)

### 2.9 运行出现Error: can not found bot file: xxx.js when using docker to start wechaty. <a id="docker-error-file-not-found"></a>

首先，请确认你有`xxx.js`文件，如果依然有这个问题，请检查一下Linux 的 `SELinux`设置。

**SELinux** 在`CentOS`系统下是默认开启的，`Ubuntu`默认 看不到这个。

`root` 用户是没有权限读这个目录的，你可以运行下面的命令

```text
setenforce 0
```

`setenforce 0` 会禁掉SELinux

* 相关博客:  [Find if permission denied errors are caused by SELinux](https://www.mysysadmintips.com/linux/servers/587-find-if-permission-denied-error-is-caused-by-selinux)
* 相关 issues:[\#66](https://github.com/wechaty/wechaty/issues/66#issuecomment-374086724) Dockerize Wechaty for easy start

### 2.10 通过Room.find\(\)找到的群，要是用户名或群名字有相同的会怎么办，find找到的是哪一个？ <a id="room-find-same-topic"></a>

返回找到的第一个群，排序方式是随机的。

### 2.11 如何发送一个链接邀请好友进群？ <a id="invite-friend-to-room"></a>

> 我是用 \`room.add\(contact\)\` 的方法邀请好友入群的，但是我发现机器人是直接拉用户进群的，而没有给用户发送的入群邀请链接。

这个是微信自带的机制，手工操作也是同样的效果：

* 40人以下的群，是直接拉用户进群的。
* 40人以上的群，是发送入群邀请链接的。

### 2.12 为什么我通过Room.findAll只拿到了一部分的群 <a id="room-list-not-complete"></a>

> 有谁知道, Room.findAll拿不到所有的群列表吗?

首先，`Room.findAll`可以拿到所有的群，但是微信的群数据量很大，需要同步时间。无论是web的puppet还是iPad的puppet都需要一定时间来同步这部分消息，如果在同步的时候去调用`Room.findAll`，就只能拿到当前已经同步好的群。

因此，`wechaty-puppet-padchat` 有一个`ready` 的事件可以供大家来监听 \(注意： 只有 wechaty-puppet-padchat 版本的接入方式才有ready 事件。[点击了解更多详情](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/Padchat-%E9%80%9A%E8%AE%AF%E5%BD%95%E5%8A%A0%E8%BD%BD%E8%AF%A6%E8%A7%A3)\) 当所有数据都加载完毕的时候，`ready` 事件会被触发，此事件在`wechaty` 启动后只会被触发一次。那么，在`ready` 事件被触发了之后去调用`Room.findAll` 就会拿到所有的群聊消息了。示例代码如下：

```javascript
bot.on('ready', () => {
    const allRooms = await bot.Room.findAll()
    // Then do whatever you want to do
}
```

### 2.13 我的群好多，我等不了ready事件就想要操作bot的群 <a id="too-many-rooms-to-wait"></a>

这个问题暂时没法完全解决，有两个临时的解决方案，首先要明确一下需求：

**我需要操作的这个群是我的长期管理的群，每次启动都需要拿到这个群**

对于这种情况，可以在开发阶段先拿到这个群的`id` 并且保存这个`id`，之后每次启动之后，主动加载这个room。

```javascript
bot.on('login', user => {
    const room = bot.Room.load(roomId)
    await room.sync()
    // Do whatever you want to do with the room
}
```

**我需要对这个群的事件有些响应**

对于这种情况，所有的群的事件（`room-join`, `room-leave`, `room-topic`）在触发了之后，都会对当前这个群做一次加载，所有监听到的事件里面，都是可以直接拿到这个群的信息的，是不需要等待的，还有当群里面有消息的时候，如果当前的群并没有被加载过，也是会手动加载这个群的，然后可以通过消息对象来获取这个群。

```javascript
bot.on('message', message => {
    const room = message.room()
    // room might not be available if the message is not in a room
    if (room) {
        // Do things you like in the room
    }
}
```

### 2.14 为什么我的bot疯狂的在说话 <a id="endless-talking"></a>

以下只是一个可能的原因，但是应该是大部分人遇到这个问题的原因

`Wechaty` 的消息事件是会在所有消息被发出来的时候都会触发的，包括自己发的消息。所以大部分情况如果发现机器人疯狂的在说话，那么大概是机器人在自己和自己说话了。建议在消息事件里面对自己说的话做一个过滤，只处理别人说话，这样就不会造成死循环一直自己对自己说话了

```javascript
bot.on('message', message => {
    if (message.self()) {
        // Don't deal with message from yourself.
        return
    }
    // Deal with message from anyone else
}
```

### 2.15 重新登陆之后是否可以读到之前的消息 <a id="endless-talking"></a>

这取决于你多久之后重新启动，也取决于这条消息是否在手机上被阅读过。如果是断线重连的情况，是可以读到之前的消息的。

通常情况下，机器人只能读到在线期间所有的消息

## 3. 最佳实践 <a id="best-practice"></a>

### 3.1 wechaty & 队列的最佳实践 <a id="best-practice-queue"></a>

参考 [最佳实践之设置合理间隔](best-practice.md#3-wei-fang-fa-tiao-yong-she-zhi-he-li-jian-ge)

### 3.2 如何能不多次扫码登陆机器人 <a id="login-status-persistent"></a>

在启动的时候可以设置wechaty 的 name（旧版本叫profile） 来存储机器人的登陆信息，登陆后会自动生成一个`*.memory-card.json` 的文件，这样再次运行的时候，就不需要扫码就可以直接登陆机器人了

```typescript
const bot = Wechaty.instance({ name: 'your-cute-bot-name' })
```

### 3.3 我发现在根目录下有一个`default.memory-card.json` 的文件，这个文件是干什么的？ <a id="what-is-memory-card"></a>

`default.memory-card.json` 会用来存储登陆信息，机器人可以通过这个文件实现自动登陆。

### 3.4 既然`default.memory-card.json` 存储了机器人的登陆信息，如果我想启动多个机器人，如何防止每次启动的时候加载不同的信息呢？ <a id="multiple-memory-card"></a>

如果你想在一个机器上启动多个机器人，你可以通过设置 name（旧版本叫profile） 的值设置不同的机器人登陆信息，对应的你得到多个`*.memory-card.json`文件。有两种方法可以设置profile

**1. wechaty 初始化的时候设置name**

```typescript
const bot = Wechaty.instance({ name: 'your-cute-bot-name' })

或者

const bot = new Wechaty({ name: 'your-bot-name'})
```

**2. 通过设置**`WECHATY_NAME` **环境变量传递profile**

```text
WECHATY_NAME="your-cute-bot-name" node bot.js
```

这样，你就可以在根目录下看到`your-cute-bot-name.memory-card.json`的文件了。

### 3.5 wechaty 运行的bot 如何修改文件后自动重启 <a id="hot-reload"></a>

参考 [最佳实践之热加载](best-practice.md#5-shi-yong-re-jia-zai)

## 4. 其他 <a id="other"></a>

### 4.1 wechaty 和 wechat4u 项目，有什么区别？ <a id="difference-between-wechaty-and-wechaty-4-u"></a>

wechaty 可以实现多个微信接入的方案，对外提供统一的接口，包括web，ipad，ios等等，其中[wechat4u](https://github.com/nodeWechat/wechat4u) 是[SPACELAN](https://github.com/spacelan)写的基于web 实现微信接入的，wechaty 可以实现用wechaty 的接口，调用wechat4u的api。

> 这么理解：wechat4u有的，wechaty都有，反之不一定有，对么？

这个也不是完全确定的，因为wechaty 只是基于wechaty 暴露出来的接口为wechat4u 进行了封装。

### 4.2 Python 版本什么时候上线？ <a id="when-python-available"></a>

请关注这个项目：

{% embed url="https://github.com/Chatie/python-wechaty" caption="" %}

### 4.3 如何理解Wechaty 的版本号 <a id="wechaty-version-number"></a>

参考 [最佳实践之版本说明](best-practice.md#6-tui-jian-ban-ben)

{% hint style="info" %}
如果FAQ的内容无法满足你，可以去官网发Issue 获取支持： [https://github.com/wechaty/wechaty/issues](https://github.com/wechaty/wechaty/issues)
{% endhint %}

