---
title: "wechaty-electron: Making Your Wechaty a Client Service"
author: guoyingxu
categories: project
tags:
  - code
  - featured
  - utility
  - electron
  - desktop
image: /assets/2017/wechaty-electron-making-your-wachaty-as-a-client-service1.webp
excerpt: A technical exploration of creating a desktop client for Wechaty using Electron, enabling real-time WeChat group broadcasting with manual intervention capabilities and cross-platform deployment.
---

## First Encounter with Wechaty

A year ago, when I just joined my current company, I discovered colleagues using WeChat for broadcasting - synchronizing valuable discussions from several WeChat groups to other groups while also storing them in a database for forum viewing. At the time, colleagues used a Chrome plugin approach. That was my first time learning WeChat could be used this way. While amazed, I also discovered a serious problem: the plugin would freeze the webpage after running for a while, requiring restarts. So I searched online for different solutions. GitHub is truly a magical place - I quickly found several versions of WeChat robots, with Wechaty being the most popular, and another promising Python project. Due to my preference for Node.js, I chose Wechaty.

## Why Electron

From Qt to Adobe AIR, I never gave up trying and practicing desktop application development using JS and HTML, until Electron appeared. I felt a perfect solution finally emerged. Of course, there's also NW.js - NW is also a good solution. Initially, NW wasn't as good as Electron, which led me to stop following NW. However, currently NW.js has completely gained the capability to compete with Electron.

After finding Wechaty, my project had just begun. Since the broadcasting process required real-time human intervention, and even manual operations to correct issues when bugs appeared (Wechaty couldn't send images at the time, requiring manual forwarding), my desire to deploy Wechaty on servers was shattered. If I could make an Electron client, I could give it directly to operations, liberating programmers and thus liberating productivity. Electron itself runs a Node environment on PC, completely meeting Wechaty's runtime environment requirements.

## Initial Ideas for wechaty-electron

Soon my project entered implementation phase. Wechaty's API was indeed very simple. A WeChat broadcasting client was quickly completed and achieved interaction with website text live broadcasting.

Startup interface: Select server and choose a live room

![Figure 1][1]

Operation interface: Select groups to share, use regular expressions to filter unwanted synchronized messages, and the guest-only feature provides one-way broadcasting.

![Figure 2][3]

Web side: User messages from WeChat are directly published to text live rooms, marked as WeChat users, and display WeChat avatars. Multiple group members can essentially share messages.

![Figure 3][2]

WeChat groups: You can choose to distribute information to all groups.

![Figure 4][4]

The only thing that didn't satisfy me was that starting Wechaty with an Electron client still required opening a webpage to log into WeChat. Electron itself is based on Chrome kernel. It can do everything browsers can do, and things browsers can't do too. There's no need to start a webdriver to log into WeChat. Just create a new window or open a webview to replace the browser, with complete freedom to hide and show. Wechaty only needs to care about interacting with Electron's webcontent. Additionally, Electron's local code interaction with webcontent is more convenient - besides complete web events, there are ipcMain and ipcRenderer interaction mechanisms. Wechaty doesn't need to start an additional Express server to establish socket channels (Puppeteer didn't exist then). More valuably, Wechaty could have a multi-platform client available anywhere, anytime!

## wechaty-electron Implementation

I often secretly delight in having what I feel are great ideas. But mustering courage to actually write them is another matter. I carefully read Wechaty's source code and compared it with Electron's API for testing. Just when I had some progress, Puppeteer appeared, and Wechaty underwent a major version change. Puppeteer was simply too useful, with more comprehensive APIs than Electron (I suspect Electron might update versions because of this). However, problems arose - Puppeteer's implemented interfaces couldn't be done by Electron! For example, getting page popups, or class ElementHandle...

I took the most cautious and conservative approach to rewriting wechaty/puppet-web:

* Added electron-driver.ts implementing all Puppeteer interface methods used in Wechaty
* Used ipcRenderer in wechaty-bro.js to send and receive Electron events and commands
* Added emit method (Electron interface lacks Puppeteer's exposeFunction method)
* Added bindEvents method in bridge.ts, using ipcMain.on(event,handler) to subscribe to page-returned events

The above main modifications ensured minimal changes to the original project.
After testing, basic functions work, but some bugs remain, requiring continued fixes. Project address: [wechaty-electron](https://github.com/GuoYingxu/wechaty/tree/wechaty-electron)

## Run Demo

```sh
git clone https://github.com/GuoYingxu/wechaty.git
git checkout wechaty-electron

npm install
npm run dist
npm start
```

Reference: [https://github.com/GuoYingxu/wechaty/tree/wechaty-electron/example](https://github.com/GuoYingxu/wechaty/tree/wechaty-electron/example/electron-app)

## Quick Start

wechaty-electron usage is the same as the original. Just note to start Wechaty after Electron initialization is complete.

```javascript
//demo code
const {app, BrowserWindow} = require('electron')
const {Wechaty} = require('../dist/index')
let window;
app.on('ready', () => {
  //electron init code
  window = new BrowserWindow();
  window.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file',
    slashes: true
  }))

  //wechaty init
  const bot = Wechaty.instance({ profile: config.default.DEFAULT_PROFILE })

  bot
    .on('logout', user => log.info('Bot', `${user.name()} logouted`))
    .on('login', user => {
      log.info('Bot', `${user.name()} login`)
      bot.say('Wechaty login').catch(console.error)
    })
    .on('scan', (url, code) => {
      if (!/201|200/.test(String(code))) {
        const loginUrl = url.replace(/\/qrcode\//, '/l/')
        QrcodeTerminal.generate(loginUrl)
      }
      console.log(`${url}\n[${code}] Scan QR Code above url to log in: `)
    })
    .on('message', async m => {
      //---

    })
  bot.start()
})
```

## More Ideas

Domestic IPs are restricted, making npm install puppeteer and electron very difficult. So I opened a separate branch and removed Puppeteer. I wonder if Wechaty could make puppet a plugin mode - install whichever you need. Would this provide a better experience? Even more wechaty-puppet-engines might emerge later, like wechaty-nw for NW.js. This way, Wechaty itself only cares about WeChat APIs, puppets only care about communicating with engines - this should be a relatively perfect structure.

Using WeChat robots can lead to IP blocking. Currently, it's unclear whether using Electron can reduce blocking probability. Previous experience tells me that if WeChat accounts get blocked, changing IPs allows login. Electron client installation is much simpler than server deployment.

I look forward to more exchanges with everyone.

PS: Recently heard news about WeChat web version being blocked - don't know if it's true. However, the technology itself attracts me more. If the web version gets blocked, new solutions will definitely emerge. For technology itself, this isn't necessarily a bad thing.

[1]: /assets/2017/wechaty-electron-making-your-wachaty-as-a-client-service1.webp
[2]: /assets/2017/wechaty-electron-making-your-wechaty-as-a-client-service2.webp
[3]: /assets/2017/wechaty-electron-making-your-wachaty-as-a-client-service3.webp
[4]: /assets/2017/wechaty-electron-making-your-wechaty-as-a-client-service4.webp

![a](https://avatars1.githubusercontent.com/u/33899027?s=88&v=3)

> Author: [Yingxu Guo (郭英旭)](https://github.com/Guoyingxu)

---

> Chinese version of this post: [Wechaty × Electron: 构建跨平台聊天桌面应用]({{ '/2017/11/26/wechaty-electron-making-your-wechaty-as-a-client-service/' | relative_url }})
