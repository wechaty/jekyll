---
title: ' "基于 Wechaty 实现高校招生宣传小助手的实践" (English translation WIP)'
author: ligen131
categories: article
tags:
  - bot
  - 后端
  - node.js
  - typescript
  - 高校招生
image: /assets/2022/09-wechaty-university-admission-helper-en/cover.webp
---
一个能够智能识别关键词并自动回复招生信息的机器人，基于 Wechaty, Node.js 实现。

## 背景

这是一篇迟到了三个月的文章，此时终于有机会能够补上。通过这篇文章，记录一下遇到的一些问题与解决方案。

三个月前的六月，正值高考放榜，各大高校都在进行火热的招生宣讲。随着咨询的人越来越多，招生宣传的拉的微信群也越来越多，于是突发奇想，反正大家问的问题无非就是今年招多少人，去年分数线如何，学校环境如何，专业如何等等，那这些重复性的回答工作为何不交给机器人来做呢？

## 实现

由于当时正好是期末周，于是草草实现了一个基于关键词的自动回复功能。通过分析大家咨询的问题，我把每个人发的信息分为两个部分：和招生相关的词汇、疑问词汇。当这两种词汇同时出现时，基本可以断定是家长或者学生正在咨询招生相关问题。

```javascript
export const ADMISSION_WORDS = [
  `计划`,
  `分数`,
  `录取`,
  `人数`,
  `招`,
  `专业`,
];
export const QUESTIONS_WORDS = [
  `请问`,
  `吗`,
  `呢`,
  `问`,
  `多少`,
];
```

这两个数组经过后期反复的调整，最终变为上面这样。

再设置一下固定的回复语句，一个自动回复的机器人就这么完成了。

## 问题

用了一段时间之后，问题层出不穷。

### 发送图片

首先，如果要将招生信息全部结合到文字中，那么最终回复的文字会相当的长，会造成刷屏的效果，所以必须要实现图片的发送功能，把部分信息通过图片发送。

当时使用的是 `wechaty-puppet-xp`，而 `puppet-xp` 的图片发送接口并不完善，通过阅读源代码发现只支持通过 URL 发送图片，遂将图片上传到图床，然后获取网址再发送。

```javascript
img = FileBox.fromUrl(reply.content);
```

上面的 `img` 就可以通过 `Wechaty` 的 `say()` 接口直接进行发送了。

效果如下：
![问答示例](/assets/2022/09-wechaty-university-admission-helper-en/question_and_answer.webp)

### 误判

当招生组老师发送招生信息时，发现机器人也会自动回复。如下图所示。
![误判了招生组老师的信息](/assets/2022/09-wechaty-university-admission-helper-en/error.webp)

猜想是同时满足了刚才说的两种关键词的原因，于是调整了关键词词库，并添加了过滤掉招生组老师与本校学长学姐的消息，通过微信号识别特定的人，若满足条件则不发送招生信息。

### 非招生群

由于我的机器人同时挂在了好几个群里，会出现不是招生宣传的微信群也会发送招生宣传的消息。于是加上了命令控制是否在本群发送招生信息的开关（默认不开启）。
![命令控制示例](/assets/2022/09-wechaty-university-admission-helper-en/command.webp)

命令中包含学校信息，是因为一开始实现是基于可以为多个学校同时提供服务的想法，每个群可以独立发送不同高校的招生信息。

### 定时发送

由于微信群有新成员不可查看历史信息的限制，招生组老师让我加上了一个定时发送的功能，通过定时发送招生信息，让后面加入微信群的成员可以及时获取最新消息。
![定时发送](/assets/2022/09-wechaty-university-admission-helper-en/timing.webp)

### 扰民

由于机器人是对每一条消息进行识别，所以会导致如果想要咨询的人连续发了多条消息，机器人对每一条消息都会回复一串长长的文字，于是又加上了间隔一段时间再发送的机制，如果 10 分钟内识别到连续两条需要回复的消息，那么第二条消息将不会进行回复。

## 总结

有了机器人的帮助，还是给招生老师的工作减轻了不少，不过这个功能仍然存在许多问题，需要后续继续加以改进。

项目地址：[github ligen131/Sunbot](https://github.com/ligen131/Sunbot)，欢迎给我一个 Star⭐

除了招生小助手之外，还实现了不少好玩的功能，比如之前很火的 wordle 游戏，词云功能等等。或许会在另一篇文章中讲到。
![wordle 游戏](/assets/2022/09-wechaty-university-admission-helper-en/wordle.webp)

> 作者: [ligen131](https://ligen131.com)，生命不息，折腾不止。

---

> Chinese version of this post: [wechaty university admission helper]({{ '/2022/09/27/wechaty-university-admission-helper/' | relative_url }})
