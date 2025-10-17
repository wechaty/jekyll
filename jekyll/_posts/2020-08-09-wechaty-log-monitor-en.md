---
title: "Chatbots Duet: Using wechaty-log-monitor Plugin to Implement DevOps like 'QR Code Rescue on Disconnect'"
author: archy
categories: project
tags:
  - plugin
  - devops
  - featured
  - ecosystem
image: /assets/2020/wechaty-log-monitor/demo.webp
excerpt: >
  To enable better readily availability for my chatbot in production, I wrote the wechaty-log-monitor plugin to perform log-related DevOps for Wechaty running in production.
---

Recently, [a Chinese learning assistant ARCHY based on Wechaty started operating](https://mp.weixin.qq.com/s/FcgaOOnZNPUuMSihmMs_lw)🤖🤖🍜～

![gif-demo](/assets/2020/wechaty-log-monitor/archy-demo.webp)

To enable better readily availability for the assistant, I wrote this [wechaty-log-monitor plugin](https://github.com/archywillhe/wechaty-log-monitor) to perform log-related DevOps for Wechaty running in production. This is a duet built on two chatbots.

The main feature of the plugin currently is "QR code rescue on disconnect": when one Wechaty goes offline, another Wechaty will send a QR code to that Wechaty's WeChat account to log in again.

![qr-rescue](/assets/2020/wechaty-log-monitor/demo2.webp)

This way, when disconnected, you don't need to `ssh` into the production server, then `sudo su git` + `pm2 logs --lines 100` to scan the code and log back in.

Now whether you're eating, outdoors, or on the subway, when disconnected you can immediately scan the code to log back in.

![thumbup](/assets/2020/wechaty-log-monitor/thumbup.webp)

## 1. How to "QR Code Rescue on Disconnect"

```bash
yarn add wechaty-log-monitor@latest
```

Just use `createQRRescueOperation` for `botBob` in `botAlice`.

```typescript
import {qrResuce, WechatyLogMonitor} from "wechaty-log-monitor"
const qrResuceForB = qrResuce(({
  logFile: "../botBob.log",
  adminWeixin: "BobWeixin"
},{loginTest:"您好世界"}))
botAlice.use(WechatyLogMonitor({
   enableSelfToBeQrRescued: true,
   logOperations:[qrResuceForB]
}))
```

Also do vice versa for `botAlice` in `botBob`:

```typescript
import {qrResuce, WechatyLogMonitor} from "wechaty-log-monitor"
const qrResuceForA = qrResuce(({
  logFile: "../botAlice.log",
  adminWeixin: "AliceWeixin"
},{loginTest:"#ping"))
botBob.use(WechatyLogMonitor({
  enableSelfToBeQrRescued: true,
  logOperations:[qrResuceForA]
}))
```

Just a few lines of code enable easier developer operations for reconnecting after disconnection. Improved readily availability: as long as the two don't disconnect simultaneously, the other one can quickly be rescued!

p.s. After disconnecting, the bot will only send you one QR code. If you want the latest login QR code, just send "qr" to the bot.

![qr](/assets/2020/wechaty-log-monitor/qr.webp)

## 2. Inside `WechatyLogMonitor`

Everything inside wechaty-log-monitor is functional. And very loosely coupled. Apart from unavoidable side effects in IO, it's essentially completely pure.

The `WechatyLogMonitor` function mainly defines `startWatchingLog` and `startReactingToCmds`.

`startWatchingLog` is used as a callback for `fs.watchFile` + `fs.createReadStream` (implementation in `watchAndStream`), while `startReactingToCmds` is a callback for Wechaty's `message event`.

```typescript
const startWatchingLog = (bot:Wechaty,logOperations:WechatyLogOperation[])=>{
   _.each(logOperations,(operation:WechatyLogOperation)=>{
     const {onLogFileIsChanged, config} = operation
     if(typeof onLogFileIsChanged === "undefined") return
     const {logFile=""} = config
     watchAndStream(logFile,(content)=>{
       onLogFileIsChanged(bot,content)
     })
   })
 }
```

```typescript
export const watchAndStream = (file:string,callback:(content:string)=>void)=>{
  if(!fs.existsSync(file)){
    console.log(`file-to-watch ${file} not exist`)
    return
  }
  fs.watchFile(file,{ interval: 2000 },(curr,prev) => {
    const stream = fs.createReadStream(file,{start:prev.size, end:curr.size})
    stream.on("data",function(data){
      const chunk = data.toString();
      callback(chunk)
    })
  })
}
```

The parameters `onLogFileIsChanged` and `config` both come from an object of type `WechatyLogOperation`. The previously used `qrResuce` actually returns an object of this type.

```typescript
export const qrRescue = (
  config: WechatyLogOperationConfig,parameter:{loginTest:string}
):WechatyLogOperation => { ... }
```

`startReactingToCmds` is similar to `startWatchingLog` above, self-explanatory.

## 3. Implementation of "QR Code Rescue on Disconnect"

The `onLogFileIsChanged` called in the `startWatchingLog` function depends on how the `WechatyLogOperation` object defines it.

```typescript
export type WechatyLogOperation = {
  config: WechatyLogOperationConfig,
  onLogFileIsChanged?: WechatyLogFileLambda,
  onCmdReceived?: WechatyCommandLambda,
}
```

Actually, `qrResuce` uses a global state `isOtherBotAlive:boolean` plus some regex to change the `isOtherBotAlive` "switch" based on strings written to the log, and changes to this "switch" call `onOtherBotIsLoggedOut` and `onOtherBotIsLoggedIn`.

```typescript
const onLogFileIsChanged = async (bot:Wechaty, newLogs:string) =>{
  const {adminWeixin} = config
  if(globalState.isDisabled) return
  if(globalState.isOtherBotAlive){
    const latestQRCode = qrCodeAwaitingToBeScanned(newLogs)
    if(latestQRCode) onOtherBotIsLoggedOut(bot,adminWeixin,latestQRCode)
  }else{
    const loggedIn = isUserLoggedIn(newLogs)
    if(loggedIn) onOtherBotIsLoggedIn(bot,adminWeixin)
  }
}
```

The regex in `qrCodeAwaitingToBeScanned` mainly looks for the two strings "INFO StarterBot..." and "INFO StarterBot onScan...". (The `WechatyLogMonitor` parameter `enableSelfToBeQrRescued: true` will make Wechaty give corresponding logs for these two strings during login and when code scanning is needed, written into the log file.)

```typescript
const qrCodeAwaitingToBeScanned = (lastFewLines:string):string|undefined => {

    const signThatItIsLoggedIn = /INFO StarterBot Contact<(.*)?> login/g
    const indexOfLastSignOfLoggedIn = getLastMatch(signThatItIsLoggedIn,lastFewLines)?.index || -1

    const pattern = /INFO StarterBot onScan: Waiting\(.*\) - (.*)?\n/g
    const match = getLastMatch(pattern,lastFewLines)
    if(match) return match.index > indexOfLastSignOfLoggedIn ? match[1] : undefined
    return undefined
}
```

## 4. Defining Other WechatyLogOperations

Overall, `WechatyLogMonitor` abstracts away "log watching callbacks" and "bot receiving message callbacks", so in your `WechatyLogOperation`, you only need to selectively define `onLogFileIsChanged` and `onCmdReceived`.

For example, to write a `WechatyLogOperation` function closure to restart PM2, just a few lines:

```typescript
export const restartPM2 = (config: WechatyLogOperationConfig, parameter:{pm2Id:number}):WechatyLogOperation => {
  return{
    config,
    onCmdReceived : async (bot:Wechaty, cmd:string, config: WechatyLogOperationConfig) => {
        const {adminWeixin} = config
        if(cmd === "restart") execAndPipeToBot("pm2 restart "+parameter.pm2Id, bot, adminWeixin)
    }
  }
}
```

![restart](/assets/2020/wechaty-log-monitor/restart.webp)

## 5. Auth and GPT-3 Features to be Developed

Currently, `WechatyLogOperationConfig` has a `securityRule` value, defaulting to `None`.

```typescript
export type WechatyLogOperationConfig = {
  logFile?: string,
  adminWeixin: string,
  securityRule?: WechatyLogOperationSecurityRule
}
```

```typescript
export enum WechatyLogOperationSecurityRule {
  None  = 0,
  SMSVerification, //not implemented
  authy, //not implemented
  googleAuth //not implemented
}
```

In the future, if we want to expand to using Wechaty for the entire production-related DevOps (not just Wechaty-related Operations, but also MongoDB-related Operations running in production, RESTful API server-related Operations, etc.) to create a simple, easy-to-use process for the team - essentially turning the chatbot into a simple terminal - then we can set more dangerous Operations to require SMS verification codes, authy, and other Authentication methods.

I believe the Auth feature will be one of the interesting development directions for the wechaty-log-monitor plugin.

Pragmatically speaking, if "turning chatbot into a simpler terminal" really works, another very interesting development direction would be combining with [a very interesting GPT-3 application recently mentioned by OpenAI: Natural Language Shell](https://beta.openai.com/?app=productivity&example=4_2_0) - using natural language to execute Unix and other commands.

![gtp3](/assets/2020/wechaty-log-monitor/gtp3.webp)

> Author: [Archy Will He (何魏奇)](https://github.com/archywillhe/), functional programmer, interested in computational semantics, currently working full-time on the [ARCHY.SH](https://archy.sh) project. Working with GPT-2 (and hopefully with 3 soon!)
>
> GitHub Repo: [wechaty-log-monitor plugin](https://github.com/archywillhe/wechaty-log-monitor)

---

> 本文也有[中文版本](/2020/08/09/wechaty-log-monitor/)。
