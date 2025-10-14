---
title: "WeChat Calculator Bot"
author: ray
categories: project
tags:
  - padplus
  - productivity
excerpt: "Build a simple WeChat calculator bot using Wechaty that can perform basic arithmetic operations through chat messages"
image: /assets/2020/wechat-calc/header.webp
---

[![Wechaty Badge](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=132&status=done&style=none&width=132)](https://github.com/wechaty/wechaty)
[![Everything about Wechaty](https://img.shields.io/badge/Wechaty-%E5%BC%80%E6%BA%90%E6%BF%80%E5%8A%B1%E8%AE%A1%E5%88%92-green.svg#align=left&display=inline&height=20&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=134&status=done&style=none&width=134)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

## Background

I've been following WeChat bots for quite some time. As a frontend developer with solid Node.js knowledge, I wanted to create my own WeChat calculator bot. The reason is simple: every time I need a calculator, it's very inconvenient. The calculator app on my phone is buried deep in folders, hard to find, and putting it on the home screen feels like a waste of space. So I thought of using Wechaty to implement a personal WeChat calculator bot that can perform basic arithmetic operations like addition, subtraction, multiplication, and division.

## Features

Addition, subtraction, multiplication, and division

## Implementation Logic

The logic is quite simple: use Wechaty to receive user messages, filter the messages, and when a user inputs something like "1+1", directly evaluate the expression and return the result to the user.

## Dependencies

- wechaty: Core Wechaty library
- wechaty-puppet-padplus: iPad protocol implementation for Wechaty

## Implementation Process

```javascript

function calculator(intxt, callback) {
  return new Promise(function (resolve, reject) {
    var a = intxt;
    try {
      intxt = intxt.replace(/=|等|等于|\?/, '');
      intxt = intxt.replace(/加/g, '+').replace(/减/g, '-').replace(/乘/g, '*').replace(/除/g, '/');
      a = eval(intxt);
    } catch(e){
      // console.log('========error', e);
    }
      resolve(a);
    });
}

async function onMessage (msg) {
  const contact = msg.from()
  let text = msg.text()
  const room = msg.room();

  if (room) return;
  if(msg.self()){ // Skip self messages
    return;
  }
  if (text) {
    text = text.replace(/[。，、,.]$/gi, '').replace(/\s*/gi, "");
  }
  if (msg.type() === bot.Message.Type.Text && /^\d+.{1}\d+/gi.test(text)) { // Text messages
    let result = await CalcFunc.calculator(text);
    await msg.say(result+'');
  }
}

```

## Local Setup

1. Clone the project

```shell
git clone https://github.com/leiroc/wechat-calculator.git
cd wechat-calculator
```

1. Install dependencies

```shell
npm install
```

1. Start the project

```shell
node app.js
```

## Demo

![Demo](/assets/2020/wechat-calc/demo.webp)

## Acknowledgments

Thanks to the [Wechaty](https://wechaty.github.io/) team for providing the WeChat bot SDK, allowing developers to focus on business logic.
Thanks to [Juzi.BOT](https://www.juzibot.com) for providing the Pad protocol token. I saw many DLL-based implementations but decided not to explore them due to time constraints.

> Author: [Ray (雷)](https://github.com/leiroc/)
> Code: [Github](https://github.com/leiroc/wechat-calculator)

---

> 中文版: [微信计算器机器人](/2020/07/06/wechat-calculator-bot/)
