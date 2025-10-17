---
title: "Wechaty - Making Online Business Easy"
author: coderwhocode
categories: project
tags:
  - code
  - featured
  - ecommerce
  - ecosystem
image: /assets/2019/wechaty-pay-paypic-en.webp
excerpt: >
  A Wechaty-based payment solution for small businesses and individual developers without business licenses, enabling instant WeChat and Alipay payment notifications and automatic order confirmations for daily revenues under 5K RMB.
---

## Wechaty - Making Online Business Easy

### TLDR

This article is mainly aimed at small and medium enterprises or individual developers without business licenses who want to use WeChat or Alipay for online payments, with daily revenue under 5K RMB (gambling or tax evaders please avoid).

Since using Wechaty, funds arrive promptly with immediate notifications after payment. Ready to use out of the box, high concurrency, super stable with no lost orders.

![Making Online Business Easy](/assets/2019/wechaty-pay-paypic-en.webp)

### Background

WeChat and Alipay payment QR codes are everywhere, making business easy for supermarkets, fruit shops, and street food vendors. However, online payment isn't that simple. Most interfaces require enterprise qualification certification or registered domains and permissions, setting a very high threshold for small and medium merchants. Most people manually confirm orders after receiving payments, frequently resulting in delayed or missed orders. Yet market solutions are far from satisfactory. So how can we use Wechaty to optimize this online payment process?

![Comparison of Various Payment Solutions](/assets/2019/wechaty-pay-paycompare-en.webp)

### Technical Implementation

The entire payment process is divided into 3 steps. For more information, check: [WechatyPay](https://github.com/coderwhocode/wechaty-pay).

1. After users select payment amount, the payment page opens the corresponding payment code (Alipay allows custom amounts), users scan to pay
2. After confirming payment (```onMessage```), send callback to backend with payment amount and time (```sendPayment```)
3. Backend automatically marks corresponding orders based on amount and time

The example below uses step 2 to show how to confirm payment in the backend and send callbacks.

```ts
// Classic Wechaty startup
const bot = new Wechaty()
bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('message', onMessage)
bot.start()

// WeChat payment notification message
async function onMessage (msg) {
  if ( msg.type() !== bot.Message.Type.Attachment && !msg.self()
    || contact.name() !== 'WeChat Pay') {
    return
  }
  const strs = msg.text().split('Yuan')
  if (strs.length >= 1) {
    const prices = strs[0].split('WeChat Payment Received')
    if (prices.length >= 1) {
      const priceStr = prices[1]
      sendPayment(parseFloat(priceStr), msg.date().getTime())
    }
  }
}

// After receiving amount, perform order confirmation callback
function sendPayment (priceAmount, timestamp) {
  const options = {
    method: 'POST',
    url: 'https://api.callbackaddress.com/api/admin/callback',
    headers: { 'content-type': 'application/json', 'token': 'XXXXXX'},
    body: {'amount': priceAmount, 'timestamp': timestamp },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}
```

Alipay works similarly, though there isn't currently a product packaging as excellent as Wechaty's code library. Semi-automatic operation is as follows:

1. Scan to log into Alipay account, obtain Cookie from Headers. Operation similar to `bot.on('scan', onScan)`
2. Poll to get order list. If there's a new payment order, send callback to backend with payment amount and time (```sendPayment```)
3. Since polling is used here, to prevent frequent access from Alipay risk control, high-frequency access to order interface only occurs when there are pending payment orders.

### Effect Preview

Finally, all WeChat and Alipay orders can be managed in one place! Each order's time, amount, and daily revenue statistics are clear at a glance.

![Backend Order Management](/assets/2019/wechaty-pay-paymentsx-en.webp)

### Product Implementation

Still find the steps a bit cumbersome? Try this cloud service based on Juzi BOT.

* Supports WeChat scan hosting (based on Juzi BOT service)
* Supports Alipay scan hosting
* Security guaranteed, no personal account passwords recorded
* Funds arrive in real-time, no third-party intermediary

![Juzi BOT](/assets/2019/wechaty-pay-botorange-en.webp)

For continued technical product discussion, add WeChat below 👇. This article is for technical product reference only. Official certified interfaces are recommended. Please do not use this project for anything that violates WeChat, Alipay regulations, or other illegal activities!

![WeChat](/assets/2019/wechaty-pay-wechat-en.webp)

> Author: [Shawn](https://mugglepay.com), full-stack startup entrepreneur, committed to using technology to improve payment industry efficiency.

---

> 本文也有[中文版本](/2019/07/12/wechaty-business-easy-pay/)。
