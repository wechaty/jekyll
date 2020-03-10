# 最佳实践

## 1. 规则 <a id="rule"></a>

* 使用TypeScript 作为开发语言，TypeScript 是强类型的JavaScript，统一typings，增强系统的可维护性。更多请查看issue 讨论：[\#1066](https://github.com/Chatie/wechaty/issues/1066), [\#1064](https://github.com/Chatie/wechaty/issues/1064).
* 使用TSLint 作为代码检查工具，为什么需要？[推荐阅读这个了解详情](https://ts.xcatliu.com/engineering/lint.html)。wechaty 的tslint 配置说明请参考[这篇博客](https://blog.chatie.io/migrating-wechaty-v0.14-to-v0.18-guide-from-puppeteer-to-padchat-zh/)。
* 使用 [VSCode](https://code.visualstudio.com/) 作为编译器。
* 文件的命名规则是小写，用`-` 连接所有的内容而不是空格。比如`2017-10-06-wechat-pc-impactor` 而不是 `2017-10-06-WeChat PC Impactor`
* 变量命名为`小驼峰`写法。如 `userName` 而不是 `user_name`。

## 2. 使用docker 运行 <a id="start"></a>

[![Docker Pulls](https://img.shields.io/docker/pulls/zixia/wechaty.svg?maxAge=2592000)](https://hub.docker.com/r/zixia/wechaty/) [![Docker Layers](https://images.microbadger.com/badges/image/zixia/wechaty.svg)](https://microbadger.com/#/images/zixia/wechaty)

最新版的 Wechaty Docker Image \(v0.22\)预装了所有的 puppet ，包括 puppeteer 和 padchat 等代码里面预设的所有.

Wechaty Docker 同时支持JavaScript 和TypeScript。因为我们使用 `ts-node` 运行代码，所以你不需要编译，只需要将拓展名改为`.ts`即可使用TypeScript。

{% embed url="https://github.com/wechaty/docker-wechaty-getting-started" caption="" %}

### 2.1 使用 JavaScript 运行

```bash
# for JavaScript
docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty mybot.js
```

### 2.2 使用TypeScript 运行

```bash
# for TypeScript
docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty mybot.ts
```

了解更多：[Wiki:Docker](https://github.com/chatie/wechaty/wiki/Docker).

## 3. 机器人启动方法 <a id="start"></a>

```typescript
import { PuppetPadchat } from 'wechaty-puppet-padchat'
const puppet = new PuppetPadchat()
const bot = new Wechaty({
    puppet,
    name: 'your-bot-name'
})
```

进一步说明：在启动的时候设置wechaty 的 name（旧版本叫profile） 来存储机器人的登陆信息，登陆后会自动生成一个`*.memory-card.json` 的文件，这样再次运行的时候，就不需要扫码就可以直接登陆机器人了。

## 4. 为方法调用设置合理间隔 <a id="interval"></a>

为了防止微信封号，wechaty 内置了队列，详细可见：[rx-queue](https://github.com/zixia/rx-queue)​

我们也建议开发者在调用wechaty 方法的时候，也自行设置间隔，数值建议如下：

* 发送消息：1s
* 修改备注：10s
* 添加好友:   5min
* 自动通过好友请求：1min
* 持续更新中。。。

## 5. 日志说明

wechaty 使用了 [brolog](https://github.com/huan/brolog) 作为日志工具，默认打印的级别是\`verbose\`, brolog 共有的级别从高到低分别为：

* silent
* error
* warn
* info
* verbose
* silly

有以下两种方式来设置LOG 的级别：

1. 可以通过设置环境变量 \`WECHATY\_LOG\` 的方式设置LOG的级别
2. 在代码中设置:

```typescript
import { log } from 'wechaty'
log.level('silly') 
// 'silent' | 'error' | 'warn' | 'info' | 'verbose' | 'silly'
```

## 6. 使用热加载 <a id="hot-import"></a>

> docker运行的bot文件如何debug？像nodemon那样?

wechaty 提供了hot-import 模块，参考：[https://github.com/Chatie/wechaty-getting-started/tree/master/examples/professional/hot-import-bot](https://github.com/Chatie/wechaty-getting-started/tree/master/examples/professional/hot-import-bot)​

## 7. 推荐版本 <a id="version-info"></a>

> 如何理解Wechaty 及相关Puppet 的版本号

**简单回答：**

次要版本号是偶数数字是生产版本。

**详细回答：**

Wechaty 根据 [http://semver.org/](http://semver.org/) 的规则制定版本号，并使用次要版本号来发布的版本是生产版本还是开发版本。

数字的规则：

1. 偶数版本，如0.8，0.12，是用于生产环境的
2. 奇数版本，如0.11，0.13，是发布的开发版本

参考 [wechaty issue \#905](https://github.com/Chatie/wechaty/issues/905) 和 [wechaty issue 1158](https://github.com/Chatie/wechaty/issues/1158), 当语义版本的次要版本号是技术的时候，意味着它是开发分支，建议不要上生产环境。

**偶数版本** 例子: \(用于生产环境\)

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

如果想了解更多：[How to Understand the Wechaty Semantic Versioning?](https://github.com/Chatie/wechaty/wiki/FAQ#3-how-to-understand-the-wechaty-semantic-versioning)​

## 8. 环境要求 <a id="env"></a>

* 同时支持[Linux](https://travis-ci.com/chatie/wechaty), [Windows](https://ci.appveyor.com/project/chatie/wechaty), [Darwin\(OSX/Mac\)](https://travis-ci.com/chatie/wechaty) 和 [Docker](https://app.shippable.com/github/Chatie/wechaty) 多个平台。windows 用户如果安装失败，请参考这篇博客：[在Windows10下安装Wechaty](https://blog.chatie.io/wechaty-installation-in-windows-10/)​
* Node.js 版本高于 10

## 9. 相关拓展包说明 <a id="package"></a>

* [memory-card](https://github.com/huan/memory-card)：Memory Card is an Easy to Use Key/Value Store, with Swagger API Backend & Serialization Support.
* [brolog](https://github.com/huan/brolog): Brolog is Logger for Angular in Browser like Npmlog.
* [rx-queue](https://github.com/huan/rx-queue): Easy to Use ReactiveX Queue that Supports Delay/DelayExector/Throttle/Debounce Features Powered by RxJS.
* [file-box](https://github.com/huan/file-box)：Pack a File into Box for easy move/transfer between servers no matter of where it is.\(local, remote url, or cloud storage\)
* [hot-import](https://github.com/huan/hot-import): Hot Module Replacement\(HMR\) for Node.js
* [flash-store](https://github.com/huan/flash-store): FlashStore is a Key-Value persistent storage with easy to use ES6 Map-like API\(both Async and Sync support\), powered by LevelDB and TypeScript. 
* [state-switch](https://github.com/huan/state-switch): State Switch is a Monitor/Guard for Managing Your Async Operations. 
* [watchdog](https://github.com/huan/watchdog): An Timer used to Detect and Recover from Malfunctions
* [finis](https://github.com/huan/finis): Hook node exit with your callback, get `exit code` and `signal name` from parameters 
* [leveldown](https://github.com/Level/leveldown): Pure C++ Node.js LevelDB binding serving as the back-end to LevelUP

## 10. 代码示例 <a id="example"></a>

{% page-ref page="example.md" %}

