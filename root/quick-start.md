# 快速开始

## 环境要求   <a id="env"></a>

{% hint style="warning" %}
注意： Wechaty 需要Node.js 版本高于 10
{% endhint %}

## 运行   <a id="run"></a>

### 0. 安装 Node.jS \(&gt;=10\)   <a id="install-nodejs"></a>

如果你还没有安装Node.js 或者你的版本低于10, 根据你的环境参考以下链接安装最新版本的Node.js:

* [Windows](https://nodejs.org/en/download/package-manager/#windows)
* [Linux\(Debian/Ubuntu\)](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* [macOS](https://nodejs.org/en/download/package-manager/#macos)

{% hint style="info" %}
如果想在更多其他平台安装Node.js, 可以参考 [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)
{% endhint %}

请通过下面的命令确认Node.js 是否安装成功并确认版本：

```bash
node --version
```

安装成功且版本正确，你会看到类似下面的输出结果，只要是v10以上的都可以。

```bash
v10.10.0
```

### 1. 从GitHub 上下载 wechaty-getting-started  代码   <a id="clone"></a>

```bash
git clone https://github.com/Chatie/wechaty-getting-started
cd wechaty-getting-started
```

### 2. 安装依赖   <a id="install"></a>

```bash
npm install
```

### 3. 运行Bot   <a id="run"></a>

```bash
npm start

# 或者直接用node 运行代码
node examples/starter-bot.js
```

npm start 实际上执行的命令是：`node examples/starter-bot.js`你可以基于examples 目录下的starter-bot.js 文件修改你希望实现的功能。

运行成功后，你可以看到下面的界面：

4. 切换成非Web 版本协议  

![demo](.gitbook/assets/image%20%284%29.png)

以上是默认使用网页微信的解决方案，但是网页微信有如下的限制：

1. 登录限制：从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。验证是否被限制登陆： [https://wx.qq.com](https://wx.qq.com/) 上扫码查看是否能登陆。
2. 功能限制：Web 版本会限制微信一些方法的获取，具体参考[puppet 功能对比](puppet.md#puppet-compatibility)。

为了帮助开发者快速实现自己希望实现的功能，我们提供了一个[ipad](https://github.com/lijiarui/wechaty-puppet-padchat) 版本的接入方式，运行下面两条命令就可以了：

```bash
# 1. 安装 wechaty-puppet-padchat
npm install wechaty-puppet-padchat

# 2. 通过环境变量设置接入方式并设置token 运行
WECHATY_PUPPET_PADCHAT_TOKEN=你的token WECHATY_PUPPET=padchat npm start
```

#### 针对环境变量的进一步说明：

* WECHATY\_PUPPET\_PADCHAT\_TOKEN：[点击链接申请token](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/购买token)
* WECHATY\_PUPPET : 切换到wechaty-puppet-padchat 的puppet 来运行，即从使用web 版本变为使用ipad 版本

## DEMO 展示   <a id="demo"></a>

以下是使用wechaty 开发的机器人，扫码体验。

{% hint style="success" %}
回复 'wechaty' 加入 Wechaty 开发者群。
{% endhint %}

{% hint style="danger" %}
群内均为wechaty 的开发者，如果仅是为了测试功能，请测试后自动退群。为了避免广告及不看文档用户，群主及机器人会T人，不喜勿加。群内发言之前请先阅读文档，谢谢！

进群后请切勿提问以下问题：

* 有人用过 Wechaty 吗？
* 有人成功过吗？
* 能不能实现_\*\*_？
* 为什么我跑不起来？
* 有待补充 …
{% endhint %}

![Wechaty Developers&apos; Home](.gitbook/assets/image%20%285%29.png)



