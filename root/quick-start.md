# 快速开始

## 环境要求

Node.js 版本高于 v10

## 运行

### 0. 安装 Node.jS \(&gt;=10\)

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

### 1. 从GitHub 上下载 wechaty-getting-started  代码

```bash
git clone tps://github.com/Chatie/wechaty-getting-started
cd wechaty-getting-started
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行Bot

{% hint style="warning" %}
注意： Wechaty 需要Node.js 版本高于 10
{% endhint %}

```bash
npm start

# Or use node to run bot directly
node examples/starter-bot.js
```

运行成功后，你可以看到下面的界面：

![demo](https://chatie.io/wechaty-getting-started/demo.gif)

## DEMO 展示

以下是使用wechaty 开发的机器人，扫码体验。

![Wechaty Developers&apos; Home](https://chatie.io/wechaty-getting-started/bot-qr-code.png)

{% hint style="success" %}
回复 'wechaty' 加入 Wechaty 开发者群。
{% endhint %}

{% hint style="danger" %}
群内均为wechaty 的开发者，如果仅是为了测试功能，请测试后自动退群。为了避免广告及不看文档用户，群主及机器人会T人，不喜勿加。群内发言之前请先阅读文档，谢谢！
{% endhint %}

