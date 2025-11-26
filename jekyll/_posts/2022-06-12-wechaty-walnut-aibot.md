---
hidden: true
title: "5G消息puppet-walnut的最佳实践-5G智能微秘书"
author: leochen-g
categories: article
tags:
  - code
  - puppet-walnut
  - news
image: /assets/2022/06-wechaty-walnut-aibot-en/walnut-aibot.webp
---
  
很高兴能够以《'启航计划'2022年5G消息开发者马拉松》比赛一等奖获得者的身份来写这篇文章，否则这个5G智能微秘书平台可能无法算上最佳实践了😄。同时也感谢在比赛过程中给我提供建议和指导的李卓桓老师和康嘉老师，还有`puppet-walnut`的作者丁生同学。

## 项目背景

5G消息作为一种新的短信方式，逐渐出现在人们的视野之中。和大部分人一样，第一次看到5G消息，一直不了解它是一个什么样的展示形式，它该怎么应用于现实的生活场景之中，以及我们开发者该怎么进行去对接5G消息。直到看到Wechaty社区
发了一个《'启航计划'2022年5G消息开发者马拉松》比赛通知，我才开始关注起来，原来5G消息是可以直接用Wechaty来对接的，而对接5G消息也有它对应的`puppet-walnut`。那我的第一想法就是之前做的[微信版智能微秘书](https://wechaty.js.org/2020/05/31/wechaty-web-panel-plugin/)
是不是可以直接对接过来使用呢？

为此我查阅了不少社区资料和[硬核桃官网](https://www.5g-msg.com/#/) 介绍，终于把5G消息搞明白了，其实5G消息的另一个名称是RCS融合通信(Rich Communications Services)，它支持文字、图文、视频、红包、位置、联系人、文档、图文卡片等更丰富的内容形式发送。这样看起来的话，和微信很相似，那么对接之前的智能微秘书平台也没有任何问题了，只需要把群组相关的功能去除一部分即可。因为5G消息目前是没有群组的概念，只有联系
人的概念。

那这样一来智能微秘书平台所有的功能都可以完全复用过来，省去了很多开发成本，对接起来也很简单。这一切都得益于Wechaty整体架构的设计，一个新的IM就是一个`puppet`，改的是底层`puppet`，不变的是业务逻辑和方法，这种方式真的可以给开发者省去很多时间，把大部分时间和关注点放在功能逻辑之上，做一个功能就能适用所有的`puppet`。接下来就让我来详细介绍一下5G智能微秘书平台，并且告诉大家如何快速的去实现一个5G智能微秘书。

## 关于5G智能微秘书平台

![image](/assets/2022/06-wechaty-walnut-aibot-en/web.webp)

5G智能微秘书，是一个基于Wechaty开发的智能对话器人管理平台，和其他单一bot不同的是，我们可以通过这个平台，配置生成出众多不同功能的对话机器人。

它对接了多个智能对话平台来供你选择，来也、天行、图灵、腾讯闲聊等。也内置了用户定时任务、每日提醒、纪念日提醒、当日提醒、定时资讯等众多功能来方便用户使用。

同时添加了素材管理，和openapi功能，可以把5G消息应用在更多的场景之中，使5G消息的发送更为灵活。

## 功能介绍及演示

关于5G智能微秘书平台的功能介绍和功能演示，以一段比赛时所提交的的视频来展示

- Bilibili: <https://www.bilibili.com/video/BV1RY411M7k9>
- Youtube: <https://youtu.be/kzg3rZsw2jc>

{% include iframe.html src="https://www.youtube.com/embed/kzg3rZsw2jc" %}

## 如何使用

### 一、获取5G消息平台账号

这一步直接参考社区文档[《2022-小白如何从0到1上手puppet-walnut》](https://wechaty.js.org/2022/04/22/how-to-start-puppet-walnut/) 即可，讲解的很详细，我这里就不重复说明了。目前非参与比赛的个人开发者是有1个月的体验时间。
如果想拥有更多体验时间，可以参与下个阶段的 [《第五届“绽放杯”5G应用征集大赛》](https://mp.weixin.qq.com/s/JSReqEBTuShME0Jzskaiog) ，欢迎大家踊跃参加报名。

### 二、获取5G智能微秘书平台账号

5G智能微秘书平台目前已经发布到公网[http://walnut.aibotk.com/](http://walnut.aibotk.com/) ，注册登录后获取个人中心的`APIKEY`和`APISECRET`备用

### 三、拉取5G智能微秘书客户端代码并安装依赖

由于目前还有下个阶段的比赛，所以客户端代码还没有开源出来，大家可以关注这个仓库：[https://github.com/leochen-g/walnut-aibot](https://github.com/leochen-g/walnut-aibot) ，下个阶段完赛后会第一时间开源出来，如果想提前体验可以邮箱
联系我。邮箱地址：leo.gengchen@foxmail.com

> node > 16

获取客户端后安装依赖

```shell
npm run install
```

### 四、配置参数并运行

把之前第一步和第二步获得的参数填入到代码中

```javascript
const {WechatyBuilder} = require('wechaty')
const WechatyWebPanelPlugin = require('./plugin/index');
let bot = '';
const name = 'walnut-aibot';
bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: 'wechaty-puppet-walnut',
    puppetOptions: {
        sipId: '****', // Chatbot的sipId
        appId: '******', // Chatbot的AppId
        appKey: '*******' // Chatbot的AppKey
    },
});

bot.use(
    WechatyWebPanelPlugin({
        apiKey: '*******', // 微秘书平台apikey
        apiSecret: '*******', // 微秘书平台apisecret
    })
)
bot.start()
    .catch((e) => console.error(e));
```

开始运行

```shell
npm run start
```

接下来就是手机端可以与5G智能微秘书进行对话了。

## 答辩文稿

分享一下答辩时的文稿，可以让大家更清楚的了解5G智能微秘书是怎样一个平台

{% include iframe.html src="/assets/2022/06-wechaty-walnut-aibot/walnut-share.pdf" %}

## 关于绽放杯

最后，新的一期5G应用征集大赛也要开始了，欢迎对5G消息有兴趣的开发者参与进来。这是首次绽放杯对个人开发者进行开放，而且奖项丰厚，属于国家级赛事，含金量很高的，赶快报名参加吧。

由工业和信息化部主办，中国信息通信研究院联合5G应用产业方阵、IMT-2020(5G)推进组、中国通信标准化协会以及金砖国家未来网络研究院中国分院共同承办的第五届“绽放杯”5G应用征集大赛已于2022年4月28日正式启动，本届大赛以“5G赋能数字化 扬帆助力新征程”为主题，聚焦行业数字化转型升级、个人应用创新发展、社会数字化公共服务能力提升等重点方向，加速 5G 应用从“样板间”向“商品房”转变，推动5G应用规模化发展。

[更多介绍及参赛方式](https://mp.weixin.qq.com/s/JSReqEBTuShME0Jzskaiog)

---

> This post is also available in [English](/2022/06/12/wechaty-walnut-aibot-en/).
