---
title: "Wechaty Puppet Service WorkPro 发布公告"
author: wang-nan
categories: announcement
tags:
  - news
  - puppet-service
  - puppet-provider
  - workpro
image: /assets/2022/12-introducing-workpro-puppet/wecom.webp
---

经过长期的筹备与开发， WxWork 的继任者 WorkPro 作为 Wechaty 社区新的 Puppet Service 如今正式进入 beta 测试阶段了！欢迎社区的小伙伴申请7天的免费测试 token ，正式的运营方案也将很快出台，敬请期待！

## 关于 Wechaty Puppet Service WorkPro

WorkPro 是 [RPAChat](http://rpachat.com/) 基于 wechaty-puppet-service 做的新 puppet service，RPAChat 来自美国硅谷，专注于通过 RPA 技术将 IM 软件变成机器人。RPAChat 正在为 P&G 、 L’ORÉAL Paris 、 Swisse 、 POPMART 等知名品牌提供基于对话的营销云解决方案。

![rpachat-logo.webp](/assets/2022/12-introducing-workpro-puppet/rpachat-logo.webp)

WxWork作为我们上一代的企业微信 puppet service，已经服务了大家超过两年的时间。由于设计和架构的原因， WxWork 存在一些无法解决的缺陷，例如：

- CPU 和内存占用巨大
- 当收到企微官方群发时，系统需要花费数小时来处理消息，导致无法使用
- 当扫码登录时，会花很长时间来同步历史消息

WorkPro 利用全新设计的架构彻底解决了以上问题，带来了效率与性能的巨大提升。他还包含了许多新功能，其中一些在社区版的 Wechaty 上还无法支持。我们正在积极的推动这些功能合并入社区分支。

## 关于 Wechaty 的版本

WorkPro 由于支持了群公告事件等新事件，目前与社区版的 Wechaty 兼容存在一些问题，这会很快修复。详情请参考 [issue 216](https://github.com/wechaty/puppet-service/issues/216) 。
WorkPro 的架构是直接根据 wechaty-grpc 的相关功能，对齐的是 wechaty-grpc 的最新版，对于 deprecated 的功能未做全面兼容，因此对于 wechaty 0.x 的兼容性无法保证。 Wechaty 1.x 已经发布相当长的时间，建议使用最新版本的 Wechaty

## 如何申请试用

对于这个 puppet 服务感兴趣的朋友，我们提供7天的免费试用 token ，请用微信或企微扫码添加客服咨询。
![qrcode.webp](/assets/2022/12-introducing-workpro-puppet/qrcode.webp)

## WorkPro Getting-Started

非常傻瓜的快速上手教程：

使用官方的实例仓库:  [Wechaty getting-started 项目](https://github.com/wechaty/getting-started) 。推荐直接使用 [Github Codespace](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=78732688)。当然也可以选择将 [Wechaty getting-started 项目](https://github.com/wechaty/getting-started) 克隆到本地在本地运行，

- 使用 Codespace 运行

    1. 点击 [Github Codespace](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=78732688) ，再点击 ```Create Codespace``` 。然后稍作等待，配置服务会自动安装好依赖。
    2. 设置环境变量。目前我们尚不支持 TLS 链接。详情请参考 : <https://github.com/wechaty/puppet-service/issues/160>

        ```shell
        export WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
        ```

    3. 修改 ```examples/ding-dong-bot.ts``` 。这一文件应该已经自动打开了。将 73-76 行改为如下代码

        ```ts
        puppet: 'wechaty-puppet-service', // WorkPro 是一种 puppet-service ，因此这里应该填写 'wechaty-puppet-service' 而不是 'wechaty-puppet-workpro'
        puppetOptions: {
          token: 'xxx', // 将你的 token 填写在此，它应该形式类似于 'puppet_workpro_xxxxxx'
        }
        ```

    4. 使用 ```npm start``` 启动 bot ，你应该能看见二维码出现在你的终端中。

- 克隆到本地运行

    1. 安装依赖，确保你安装了 node 16 或以上，然后运行

        ```shell
        npm install cross-env -g
        npm install
        ```

    2. 设置环境变量。目前我们尚不支持 TLS 链接。详情请参考 : <https://github.com/wechaty/puppet-service/issues/160>

        ```shell
        export WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
        ```

    3. 打开 ```examples/ding-dong-bot.ts``` 。将 73-76 行改为如下代码

        ```ts
        puppet: 'wechaty-puppet-service', // WorkPro 是一种 puppet-service ，因此这里应该填写 'wechaty-puppet-service' 而不是 'wechaty-puppet-workpro'
        puppetOptions: {
          token: 'xxx', // 将你的 token 填写在此，它应该形式类似于 'puppet_workpro_xxxxxx'
        }
        ```

    4. 使用 ```npm start``` 启动 bot ，你应该能看见二维码出现在你的终端中。

## WorkPro 与 WxWork 的对比

| 功能 | WorkPro | WxWork | 备注 |
| - | - | - | ----|
| <消息> |
| 文本消息 | ✅ | ✅ |
| 图片消息 | ✅ | ✅ |
| 视频消息 | ✅ | ✅ |
| 文件消息 | ✅ | ✅ |
| 表情消息 | ✅ | ✅ |
| 表情包消息 | ✅ | ✅ |
| 语音消息 | ✅ | ❌ |
| 小程序消息 | ✅ | ✅ |
| 图文链接消息 | ✅ | ✅ |
| 名片消息 | ✅ | ✅ |
| 位置消息 | ✅ | ❌ | 依赖体验版 Wechaty |
| 引用消息 | ✅ | ❌ | 依赖体验版 Wechaty |
| 视频号消息 | ✅ | ❌ | 依赖体验版 Wechaty |
| <群> |
| 创建群聊 | ✅ | ✅ |
| 设置群公告 | ✅ | ✅ |
| 获取群公告 | ✅ | ❌ |
| 群二维码 | ❌ | ❌ | 在计划中 |
| 拉人进群 | ✅ | ✅ |
| 接受群邀请 | ✅ | ✅ |
| 踢人出群 | ✅ | ✅ |
| 退出群聊 | ✅ | ❌ |
| 修改群名 | ✅ | ✅ |
| 入群事件 | ✅ | ✅ | WxWork 仅限群主， WorkPro 无限制 |
| 离群事件 | ✅ | ✅ | WxWork 仅限群主， WorkPro 无限制 |
| 群名称事件 | ✅ | ✅ |
| @群成员 | ✅ | ✅ |
| 群成员列表 | ✅ | ✅ |
| 群详情 | ✅ | ✅ |
| 群公告变更事件 | ✅ | ❌ | 依赖体验版 Wechaty |
| <联系人> |
| 修改备注 | ✅ | ✅ |
| 添加好友 | ✅ | ✅ |
| 通过好友 | ✅ | ✅ |
| 好友列表 | ✅ | ✅ |
| 好友详情 | ✅ | ✅ |
| 删除/被删除事件 | ✅ | ❌  |
| 好友标签 | ✅ | ❌ | 依赖体验版 Wechaty |
| 好友标签添加/删除事件 | ✅ | ❌ | 依赖体验版 Wechaty |
| 标签添加/删除/修改事件 | ✅ | ❌ | 依赖体验版 Wechaty |
| <其他> |
| 登录事件 | ✅ | ✅ |
| 扫码状态 | ✅ | ❌ |
| 登出事件 | ✅ | ✅ |
| 主动退出登录 | ✅ | ❌ |
| 发朋友圈 | ✅ | ❌ | 依赖体验版 Wechaty |
