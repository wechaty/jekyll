# FAQ

### 1. 基本使用

#### 1.1 如何用最简单的方式把wechaty 跑起来？

1. 从github 上clone wechaty 的教学代码： [https://github.com/Chatie/wechaty-getting-started](https://github.com/Chatie/wechaty-getting-started)
2. 运行 \`npm install\`
3. 运行 \`npm start\`
4. 默认会跑起来我们的demo 例子，demo代码位置: [examples/starter-bot.js](https://github.com/Chatie/wechaty-getting-started/blob/master/examples/starter-bot.js)
5. 修改demo 的例子，实现你自己想要的bot 逻辑

#### 1.2 我的微信号无法登陆

从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： [https://wx.qq.com](https://wx.qq.com) 上扫码查看是否能登陆。 更多内容详见：

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)
* [\[谣言\] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)
* [新注册的微信号无法登陆](https://github.com/Chatie/wechaty/issues/872)
* [wechaty-puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)

{% hint style="success" %}
**解决方案： 我们提供了非web 版本解决方案，**[**点击购买token**](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token) **, 更多技术细节查看** [**wechaty-puppet-padchat**](https://github.com/lijiarui/wechaty-puppet-padchat)
{% endhint %}

### 2. 功能相关

{% hint style="info" %}
请查看[ Puppet功能兼容性清单](puppet.md#3-wechaty-puppet-jian-rong-xing) 查看完整功能内容
{% endhint %}

#### 2.1 支持 红包、转账、朋友圈… 吗？

以下功能目前均不支持

* 支付相关 - 红包、转账、收款 等都不支持
* 在群聊中@他人 - 是的，Web 微信中被人@后也不会提醒
* 朋友圈相关 - 后续会支持
* 小程序 - 后续会支持

以下功能部分支持

* 发送分享链接，仅padchat 支持
* 发送名片，仅padchat 支持
* 发送语音消息，仅padchat 支持

#### 2.2 wechaty 是支持个人号还是公众号？

现阶段，wechaty 只支持个人号

相关Issue: [Using wechaty to start a wechatOA account](https://github.com/Chatie/wechaty/issues/1016)

#### 2.3 wechaty 是否可以发送卡片消息，然后跳转到网页

PuppetPadchat 是支持的， 其他版本是不支持的，示例代码：

```typescript
  import { UrlLink } from 'wechaty'
  bot.on('message', async function (m: Message) {
    const link = new UrlLink({
      description : '这是图文链接里面的描述',
      title       : '这是图文链接的标题',
      url         : 'https://github.com/chatie/wechaty',
      thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=30&v=4',
    })
    m.say(link)
  })
```

#### 2.4 机器人被拉到一个新的群组里的事件是否支持？

支持，可以通过\`room-join\` 获取到这个事件。

```typescript
bot.on('room-join', (room, inviteeList, inviter) => {
  const nameList = inviteeList.map(c => c.name()).join(',')
  console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
  // 如果机器人被拉到一个新的群组里, inviteeList[0] === bot.self()
})
```

#### 2.5 为什么需要扫码登陆而不是用户名密码登陆？

> 我发现代码是有通过用户名密码登陆的方法的，所以也许我可以很简单的写一个创建账户的功能，然后不用再扫码登陆，但是为什么现在没做呢？

对的，我们不支持账号密码登陆，以后也不会支持。

有一些Puppet 有有通过账号密码登陆的方法的，但是我们并不打算把这个API开放出来，因为以下3个原因：

1. 有一些Puppet 是不支持这个功能的，比如使用网页API的PuppetWechat4u
2. 当你使用扫码的方式登陆的时候，你是可以保存你手机的session的。换句话说，你可以同时让手机和机器人同时在线。如果你使用了用户名密码登陆，那么的session将会失效，只有机器人微信在线，手机微信将会自动退出。
3. 通过用户名密码登陆的协议，是使用一个协议服务器来控制iPad 微信的。如果你使用用户名密码的方式登陆，那么你就会直接把这些敏感的账号信息发给第三方的服务器，这种方式大部分用户会觉得很不舒服。

#### 2.6 如何不使用onMessage 来发消息？

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

更多例子请参考：[https://github.com/Chatie/wechaty-getting-started/blob/master/examples](https://github.com/Chatie/wechaty-getting-started/blob/master/examples)

相关issue:

* [\#446](https://github.com/Chatie/wechaty/issues/446) how to send mesage without onMessage
* [\#200](https://github.com/Chatie/wechaty/issues/200) \[new feature\] Forward Message
* [\#89](https://github.com/Chatie/wechaty/issues/89) Wechaty.send\(\) error when send message to the room
* [\#41](https://github.com/Chatie/wechaty/issues/41) \[New Feature\] send message by branding new method: say\(\)

#### 2.7 运行出现Error: can not found bot file: xxx.js when using docker to start wechaty.

首先，请确认你有`xxx.js`文件，如果依然有这个问题，请检查一下Linux 的 `SELinux`设置。

**SELinux** 在`CentOS`系统下是默认开启的，`Ubuntu`默认 看不到这个。 

`root` 用户是没有权限读这个目录的，你可以运行下面的命令 

```text
setenforce 0
```

`setenforce 0` 会禁掉SELinux

* 相关博客:  [Find if permission denied errors are caused by SELinux](https://www.mysysadmintips.com/linux/servers/587-find-if-permission-denied-error-is-caused-by-selinux)
* 相关 issues:[\#66](https://github.com/Chatie/wechaty/issues/66#issuecomment-374086724) Dockerize Wechaty for easy start

#### 2.8 通过Room.find\(\)找到的群，要是用户名或群名字有相同的会怎么办，find找到的是哪一个？

返回找到的第一个群，排序方式是随机的。

### 3. 最佳实践

#### 3.1 wechaty & 队列的最佳实践

为了防止微信封号，wechaty 内置了队列，详细可见：[rx-queue](https://github.com/zixia/rx-queue)

#### 3.2 如何能不多次扫码登陆机器人

在启动的时候可以设置wechaty 的 name（旧版本叫profile） 来存储机器人的登陆信息，登陆后会自动生成一个`*.memory-card.json` 的文件，这样再次运行的时候，就不需要扫码就可以直接登陆机器人了

```typescript
const bot = Wechaty.instance({ name: 'your-cute-bot-name' })
```

#### 3.3 我发现在根目录下有一个`default.memory-card.json` 的文件，这个文件是干什么的？

`default.memory-card.json` 会用来存储登陆信息，机器人可以通过这个文件实现自动登陆。

#### 3.4 既然`default.memory-card.json` 存储了机器人的登陆信息，如果我想启动多个机器人，如何防止每次启动的时候加载不同的信息呢？

如果你想在一个机器上启动多个机器人，你可以通过设置 name（旧版本叫profile） 的值设置不同的机器人登陆信息，对应的你得到多个`*.memory-card.json`文件。有两种方法可以设置profile

**1. wechaty 初始化的时候设置name**

```typescript
const bot = Wechaty.instance({ name: 'your-cute-bot-name' })
```

**2. 通过设置**`WECHATY_PROFILE` **环境变量传递profile**

```text
WECHATY_PROFILE="your-cute-bot-name" node bot.js
```

这样，你就可以在根目录下看到`your-cute-bot-name.memory-card.json`的文件了。

#### 3.5 wechaty 运行的bot 如何修改文件后自动重启

wechaty 提供了hot-import 模块，参考：[https://github.com/Chatie/wechaty-getting-started/tree/master/examples/professional/hot-import-bot](https://github.com/Chatie/wechaty-getting-started/tree/master/examples/professional/hot-import-bot)

### 4. 其他

#### 4.1 wechaty 和 wechat4u 项目，有什么区别？

wechaty 可以实现多个微信接入的方案，对外提供统一的接口，包括web，ipad，ios等等，其中[wechat4u](https://github.com/nodeWechat/wechat4u) 是[SPACELAN](https://github.com/spacelan)写的基于web 实现微信接入的，wechaty 可以实现用wechaty 的接口，调用wechat4u的api。

> 这么理解：wechat4u有的，wechaty都有，反之不一定有，对么？

这个也不是完全确定的，因为wechaty 只是基于wechaty 暴露出来的接口为wechat4u 进行了封装。

#### 4.2 Python 版本什么时候上线？

请关注这个项目：

{% embed url="https://github.com/Chatie/python-wechaty" %}

#### 4.3 如何理解Wechaty 的版本号

**简单回答：**

次要版本号是偶数数字是生产版本。

**详细回答：**

Wechaty 根据 [http://semver.org/ ](http://semver.org/%20) 的规则制定版本号，并使用次要版本号来发布的版本是生产版本还是开发版本。

数字的规则：

1. 偶数版本，如0.8，0.12，是用于生产环境的
2. 奇数版本，如0.11，0.13，是发布的开发版本

参考 [wechaty issue \#905](https://github.com/Chatie/wechaty/issues/905) 和 [wechaty issue 1158](https://github.com/Chatie/wechaty/issues/1158), 当语义版本的次要版本号是技术的时候，意味着它是开发分支，建议不要上生产环境。

**偶数版本**  例子: \(用于生产环境\)

* 0.**16**.1
* 0.**16**.2
* 1.**0**.1
* 1.**0**.2

**技术版本** 例子: \(用于开发环境\)

* 0.**15**.1
* 0.**15**.2
* 1.**1**.1
* 1.**1**.2

同时，只要代码通过了Travis CI 的自动化测试，我们会发布所有版本的NPM包。

如果想了解更多：[How to Understand the Wechaty Semantic Versioning?](https://github.com/Chatie/wechaty/wiki/FAQ#3-how-to-understand-the-wechaty-semantic-versioning)

### 





{% hint style="info" %}
如果FAQ的内容无法满足你，可以去官网发Issue 获取支持： [https://github.com/chatie/wechaty/issues](https://github.com/chatie/wechaty/issues)
{% endhint %}



