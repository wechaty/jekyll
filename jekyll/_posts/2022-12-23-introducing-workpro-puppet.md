---
title: "Wechaty Puppet Service Workpro 发布公告"
author: Wang-Nan
categories: announcement
tags:
  - news
  - puppet-service
  - puppet-provider
  - workpro
image: /assets/2022/12-introducing-workpro-puppet/wecom.webp
---

经过长期的筹备与开发， WxWork 的继任者 workpro 作为 Wechaty 社区新的 Puppet Service 如今正式进入 beta 测试阶段了！欢迎社区的小伙伴申请7天的免费测试 token ，正式的运营方案也将很快出台，敬请期待！

## 关于 Wechaty Puppet Service WorkPro

WorkPro 是 [juzibot](https://github.com/juzibot/wxwork-tester) 基于 wechaty-puppet-service 做的新 puppet service，句子互动围绕微信生态为客户提供智能营销和销售服务，帮助企业引流并实现转化，客户覆盖教育、保险、大健康等多个领域。曾入选百度AI加速器 和 Facebook 大陆首期加速器，获得PreAngel、Plug and Play，Y Combination, TSVC和阿尔法公社多家中美机构投资。

WxWork作为我们上一代的企业微信 puppet service，已经服务了大家超过两年的时间。由于设计和架构的原因， WxWork 存在一些无法解决的缺陷，例如：

- CPU 和内存占用巨大
- 当收到企微官方群发时，系统需要花费数小时来处理消息，导致无法使用
- 当扫码登录时，会花很长时间来同步历史消息

WorkPro 利用全新设计的架构彻底解决了以上问题，带来了效率与性能的巨大提升。他还包含了许多新功能，其中一些在社区版的 wechaty 上还无法支持。我们正在积极的推动这些功能合并入社区分支。

## 关于 wechaty 的版本

WorkPro 由于支持了群公告事件等新事件，目前与社区版的 wechaty 兼容存在一些问题，这会很快修复。详情请参考 [issue 216](https://github.com/wechaty/puppet-service/issues/216) 。
WorkPro 的架构是直接根据 wechaty-grpc 的相关功能，对齐的是 wechaty-grpc 的最新版，对于 deprecated 的功能未做全面兼容，因此对于 wechaty 0.x 的兼容性无法保证。 wechaty 1.x 已经发布相当长的时间，建议使用最新版本的 wechaty。

## 如何申请试用

对于社区感兴趣的朋友，我们提供7天的免费试用 token ，请用微信或企微扫码添加客服咨询。
![image.png](/assets/2022/12-introducing-workpro-puppet/qrcode.png)

## WorkPro Getting-Started

对于想试用的朋友，可以参考[这个仓库](https://github.com/juzibot/workpro-getting-started)，也可以直接点击进入[社区版](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=581390026)或者[体验版](https://github.com/codespaces/new?hide_repo_select=true&ref=latest-features&repo=581390026)的 CodeSpace ，直接填入 token 即可开始使用。

## WorkPro 与 WxWork 的对比

WorkPro 支持 WxWork 的所有功能 （WxWork 的功能请参考 [WxWork发布博客](https://wechaty.js.org/2020/12/07/puppet-wxwork-beta-release/)）

WorkPro 支持的新功能包括但不限于：

- 查询群公告
- 收发语音消息
- 退出群聊
- 主动退出登录
- 扫码状态（已扫码未确定）
- 视频号消息*
- 位置消息*
- 引用消息*
- 打标签（包括个人标签和企业标签）*
- 发朋友圈*
- 标签相关事件（标签增删改、标签打与删除）*
- 群公告事件*

*带星号的功能需要体验版 wechaty 支持。
