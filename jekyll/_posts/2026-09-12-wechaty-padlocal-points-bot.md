---
title: 用 Wechaty + padlocal 搭建一个微信群积分机器人
author: 零等待
image: /assets/2026/09-wechaty-padlocal-points-bot/teaser.png
tags:
  - talk
  - padlocal
  - node
date: 2026-09-12
---
为什么需要它
做私域社群运营时，经常要在群里做积分激励：谁拉了人、谁打卡、谁分享了，就手动 +1。人工记容易漏，也想让群友当场看到自己的总分。于是我用 Wechaty 写了个微信群积分机器人：群里有人 @积分小助手 积分+1，它就自动回 @昵称 积分+1，当前总积分 X（本月 Y），分数落本地库，月底能出榜。
技术选型（踩过的坑）
Wechaty 是跨平台的聊天机器人 SDK，但个人微信群机器人有几个常见坑：
- 网页协议基本已经不可用了；
- puppet-xp 需要把代码注入本机 Windows 微信，而且只认 3.9.10.27 这个特定版本——既要降级微信，又和你的主号共用数据目录、没法并存，折腾成本高。
最终我选了 padlocal（iPad 协议的商业 puppet）：机器人是一个独立小号走协议登录，不依赖本机微信版本，也不和主号冲突。新人还能先领 7 天免费试用 token，跑通再付费。
环境
- Node 18（部分原生模块对 Node 版本敏感，建议锁版本）
- wechaty@1.20.2 + wechaty-puppet-padlocal@1.20.1（同属 v1.x 家族，互相兼容）
项目结构
- wechaty_bot.js —— 监听群消息，识别 @机器人 积分+N
- points_store.js —— 本地 JSON 积分存储（按群隔离：同一人在不同群分数互不干扰）
核心代码
机器人主程序 wechaty_bot.js
const { WechatyBuilder } = require('wechaty')
const { PointsStore } = require('./points_store')

const PUPPET = process.env.PUPPET || 'wechaty-puppet-padlocal'
const BOT_NAME = '积分小助手'

const store = new PointsStore('points.db')
const bot = WechatyBuilder.build({
  name: 'points-bot',
  puppet: PUPPET,
  puppetOptions: PUPPET === 'wechaty-puppet-padlocal'
    ? { token: process.env.PADLOCAL_TOKEN }
    : {},
})

bot.on('message', async (msg) => {
  const room = msg.room()
  if (!room) return                       // 只处理群消息
  const text = msg.text() || ''
  const amount = PointsStore.parseAmount(text)
  if (amount <= 0) return                 // 不含「积分+N」则忽略
  const mentions = await msg.mentionList()
  const self = bot.userSelf()
  if (!mentions.some((c) => c.id() === self.id)) return  // 没 @ 我则忽略
  const talker = msg.talker()
  const others = mentions.filter((c) => c.id() !== self.id)
  const target = others[0] || talker
  const reply = store.award(target.id(), target.name(), amount, room.id())
  if (reply) await room.say(reply)
})

bot.start().catch(console.error)
积分存储 points_store.js（按群隔离）
const fs = require('fs')
const path = require('path')

class PointsStore {
  constructor(dbPath = 'points.db') {
    this.dbPath = path.resolve(dbPath)
    this.records = {}
    if (fs.existsSync(this.dbPath)) {
      this.records = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8')).records
    }
  }
  static parseAmount(text) {
    const m = /积分\s*\+\s*(\d+)/.exec(text)
    return m ? parseInt(m[1], 10) : 0
  }
  award(wxid, name, amount, roomId) {
    if (amount <= 0 || !roomId) return null
    const month = new Date().toISOString().slice(0, 7)
    const key = `${roomId}|${wxid}|${month}`   // 用群ID隔离，同一人不同群独立
    const row = this.records[key]
    const monthTotal = row ? row.total + amount : amount
    this.records[key] = { roomId, wxid, name, month, total: monthTotal }
    // 该群累计（跨月）
    const roomTotal = Object.entries(this.records)
      .filter(([k]) => k.startsWith(`${roomId}|${wxid}|`))
      .reduce((s, [, r]) => s + r.total, 0)
    fs.writeFileSync(this.dbPath, JSON.stringify({ records: this.records }, null, 2))
    return `@${name} 积分+${amount}，当前总积分 ${roomTotal}（本月 ${monthTotal}）`
  }
}
module.exports = { PointsStore }
运行
1. 注册 padlocal 拿到 token（新人可先领 7 天试用）；
2. PADLOCAL_TOKEN=你的token node wechaty_bot.js（Windows 用 set PADLOCAL_TOKEN=...）；
3. 终端打印二维码 → 用机器人小号手机微信扫码 → 进群后 @积分小助手 积分+1 即可看到回复。
几点提醒
- 务必用独立小号，绝不用主号当机器人；
- 机器人只做计数回复，文案里不要出现价格 / 优惠 / 引流词；
- 低频小群先灰度一周再扩到主群。
小结
Wechaty + padlocal 让个人微信群自动化变得简单稳定，上面这套积分机器人几十行就能跑起来。欢迎按需改造，也欢迎在评论区交流。
