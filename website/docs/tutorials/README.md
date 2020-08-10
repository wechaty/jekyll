---
sidebar_label: 'Tutorials Index'
description: 'Overview of the Wechaty tutorial pages'
---

# Wechaty Tutorials

We have two different sets of tutorials:

- The [**Redux Essentials tutorial**](./essentials/part-1-overview-concepts) is a "top-down" tutorial that teaches how to use Redux the right way, using our latest recommended APIs and best practices.
- The [**Basic tutorial**](../basics/README.md) and [**Advanced tutorial**](../advanced/README.md) are a "bottom-up" tutorial that teaches how Redux works, starting from first principles.

:::tip

**We recommend starting with the [Redux Essentials tutorial](./essentials/part-1-overview-concepts)**, since it covers the key points you need to know about how to get started using Redux to write actual applications.

:::

:::info

While the concepts in the "Basic" and "Advanced" tutorials are still valid, those pages are some of the oldest parts of our docs. We'll be updating those tutorials soon to improve the explanations and show some patterns that are simpler and easier to use. Keep an eye out for those updates. We'll also be reorganizing our docs to make it easier to find information.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'TypeScript', value: 'ts', },
    { label: '.Net(C#)', value: 'dotnet', },
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
    { label: 'PHP', value: 'php', },
    { label: 'Python', value: 'py', },
    { label: 'Scala', value: 'scala', },
  ]
}>

<TabItem value="js">

```js
const { Wechaty } = require('wechaty')

Wechaty.instance() // Global Instance
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.github.io/qrcode/${encodeURIComponent(qrcode)}`))
  .on('login',            user => console.log(`User ${user} logged in`))
  .on('message',       message => console.log(`Message: ${message}`))
  .start()
```

</TabItem>
<TabItem value="ts">

```ts
import { Wechaty } from 'wechaty'

Wechaty.instance() // Global Instance
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.github.io/qrcode/${encodeURIComponent(qrcode)}`))
  .on('login',            user => console.log(`User ${user} logged in`))
  .on('message',       message => console.log(`Message: ${message}`))
  .start()
```

</TabItem>
<TabItem value="py">

```py
from wechaty import Wechaty

import asyncio
async def main():
    bot = Wechaty()
    bot.on('scan', lambda status, qrcode, data: print('Scan QR Code to login: {}\nhttps://wechaty.github.io/qrcode/{}'.format(status, qrcode)))
    bot.on('login', lambda user: print('User {} logined'.format(user)))
    bot.on('message', lambda message: print('Message: {}'.format(message)))
    await bot.start()

asyncio.run(main())
```

</TabItem>
<TabItem value="java">

```java
class Bot{
  public static void main(String args[]){
    Wechaty bot = Wechaty.instance()
      .onScan((qrcode, statusScanStatus, data) -> System.out.println(QrcodeUtils.getQr(qrcode)))
      .onLogin(user -> System.out.println("User logged in :" + user))
      .onMessage(message -> System.out.println("Message:" + message))
      .start(true);
  }
}
```

</TabItem>
<TabItem value="go">

```go
package main

import (
 "fmt"

  "github.com/wechaty/go-wechaty/wechaty"
)

func main() {
  _ = wechaty.NewWechaty().
    OnScan(func(qrCode, status string) {
      fmt.Printf("Scan QR Code to login: %s\nhttps://wechaty.github.io/qrcode/%s\n", status, qrCode)
    }).
    OnLogin(func(user string) { fmt.Printf("User %s logged in\n", user) }).
    OnMessage(func(message string) { fmt.Printf("Message: %s\n", message) }).
    Start()
}
```

</TabItem>
<TabItem value="php">

```php
$wechaty = \IO\Github\Wechaty\Wechaty::getInstance($token, $endPoint);
$wechaty->onScan(function($qrcode, $status, $data) {
    $qr = \IO\Github\Wechaty\Util\QrcodeUtils::getQr($qrcode);
    echo "$qr\n\nOnline Image: https://wechaty.github.io/qrcode/$qrcode\n";
})->onLogin(function(\IO\Github\Wechaty\User\ContactSelf $user) {
})->onMessage(function(\IO\Github\Wechaty\User\Message $message) {
    $message->say("hello from PHP7.4");
})->start();
```

</TabItem>
<TabItem value="dotnet">

```csharp
var wechaty = new Wechaty(options, logger).onScan((qrcode, status) => {
  Console.WriteLine($"Scan QR Code to login: {status} https://wechaty.github.io/qrcode/{(qrcode)}`");
}).OnLogin( user => {
  Console.WriteLine("User {user} logined");
}).OnMessage( message => {
  Console.WriteLine($"Message: {message}");
}).Start();
```

</TabItem>
<TabItem value="scala">

```scala
package wechaty

object DingDongBot {
  def main(args: Array[String]): Unit = {
    Wechaty.instance()
      .onScan(payload     => { println("Scan QR Code to login: %s\nhttps://wechaty.github.io/qrcode/%s\n".format(payload.status, payload.qrcode)) })
      .onLogin(payload    => { println("User %s logged in\n".format(payload.id)) })
      .onMessage(message  => { println(message) })
      .start()
    Thread.currentThread().join()
  }
}
```

</TabItem>
</Tabs>
