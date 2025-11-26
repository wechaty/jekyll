---
title: "Write a Web Scraper with Node + Wechaty to Send Daily Warm Messages to Your Girlfriend (or Boyfriend)"
author: leochen-g
categories: project
tags:
  - code
  - featured
  - social
  - entertainment
  - ecosystem
image: /assets/2019/node-wechaty-1.webp
---

> This post is also available in [Chinese](/2019/04/02/node-wechaty-spider/)

WeChat Daily Talk—automatically send WeChat messages to your loved one every day.

## Project Introduction

### Inspiration

After seeing an article on Juejin titled [《用Node + EJS写一个爬虫脚本每天定时女朋友发一封暖心邮件》](https://juejin.im/post/5c75fa4af265da2d84109219),
I accidentally saw a reader in the comments asking if it could be implemented with WeChat. I happened to be working on a WeChat bot mini-project recently, so I decided to put this scheduled task into WeChat. I decided to do it, and after an afternoon of work, I finally got it done.

### Project Address

GitHub: [https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)

### Libraries Used

* [wechaty](https://github.com/wechaty/wechaty) - WeChat operations
* [node-schedule](https://github.com/node-schedule/node-schedule) - Scheduled tasks
* [superagent](https://github.com/visionmedia/superagent) - Web scraping
* [cheerio](https://github.com/cheeriojs/cheerio#readme) - Page parsing
* [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) - Display QR code in terminal

### Features

* Send daily weather reminders and daily quotes to friends
* Auto-add friends and auto-invite to groups based on keywords
* Integrate Turing Robot
* More features to be added... (you're welcome to submit PRs with good ideas)

### Data Sources

* Daily quote comes from [ONE](http://wufazhuce.com/), same as the referenced article
* Weather information comes from [Moji Weather](https://tianqi.moji.com/weather)

### Scheduled Tasks

[node-schedule](https://github.com/node-schedule/node-schedule) is perfect for this,
allowing you to schedule tasks for specific times each month, week, or day.

### Implementation Effect

Since WeChat sends messages on a scheduled basis, unlike email, WeChat cannot put images and text in the same message box, so it may not be as aesthetically pleasing as email. However, the text can still be formatted nicely. Due to time constraints, there's relatively little text content, but more will be added later.

![screenshot](/assets/2019/node-wechaty-2.webp)

![screenshot](/assets/2019/node-wechaty-1.webp)

## Code Description

### Directory Structure

![directory](/assets/2019/node-wechaty-3.webp)

* config: Stores public variables and superagent configuration
* schedule: Task scheduling configuration
* superagent: Gets daily quote and weather information
* utils: Extracted common methods

### Core Code

index.js

This file handles WeChat login, scheduled task creation, and message sending.

```js
    /**
     * WechatBot
     *  - https://github.com/gengchen528/wechatBot
     */
    import {Wechaty,Friendship}  from 'wechaty'
    import schedule  from './schedule/index'
    import config  from './config/index'
    import untils  from './untils/index'
    import superagent  from './superagent/index'
    import {FileBox}  from 'file-box' // File reading module
    //  QR code generation
    function onScan (qrcode, status) {
      require('qrcode-terminal').generate(qrcode)  // Display QR code in console
      const qrcodeImageUrl = [
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(qrcode),
      ].join('')
      console.log(qrcodeImageUrl)
    }

    // Login
    async function onLogin (user) {
      console.log(`Caring Assistant ${user} logged in`)
      // Create scheduled task after login
      schedule.setSchedule(config.SENDDATE,()=>{
      console.log('Your caring assistant starts working!')
        main()
      })
    }

    // Logout
    function onLogout(user) {
      console.log(`${user} logged out`)
    }
    // Listen to messages and auto-join groups based on keywords
    async function onMessage (msg) {
      const contact = msg.from() // Message sender
      const content = msg.text() // Message content
      const room = msg.room() // Is it a group message
      const roomCodeUrl = FileBox.fromUrl(config.ROOMCODEURL) // File from URL
      const roomCodeLocal = FileBox.fromFile(config.ROOMLOCALPATH) // Add local file
      if (msg.self()) {
      return
      }
      if(room){ // If it's a group message
      const topic = await room.topic()
        console.log(`Group name: ${topic} Sender: ${contact.name()} Content: ${content}`)
      }else { // If not a group message
      console.log(`Sender: ${contact.name()} Content: ${content}`)
      let addRoomReg = eval(config.ADDROOMWORD)
      let roomReg = eval(config.ROOMNAME)
      if(addRoomReg.test(content)&&!room){
        let keyRoom = await this.Room.find({topic: roomReg})
        if(keyRoom){
          try{
            await contact.say(roomCodeLocal||roomCodeUrl)
            await keyRoom.say('WeChat Daily Talk: Welcome new friend', contact)
          }catch (e) {
            console.error(e)
          }
        }
      }else {
        await contact.say('Hello, don\'t tease me easily, I can only send group QR codes, I can\'t chat!')
        await contact.say('Please reply with the code word: join group to get the group QR code')
      }
      }
    }
    // Auto-add friend feature
    async function onFriendShip(friendship) {
      let logMsg
      try {
      logMsg = 'Add friend ' + friendship.contact().name()
      console.log(logMsg)

      switch (friendship.type()) {
        /**
         *
         * 1. New Friend Request
         *
         * when request is set, we can get verify message from `request.hello`,
         * and accept this request by `request.accept()`
         */
        case Friendship.Type.Receive:
          let addFriendReg = eval(config.ADDFRIENDWORD)
        if (addFriendReg.test(friendship.hello())) {
          logMsg = 'Auto-add friend because verification message contains keyword "daily talk"'
          await friendship.accept()
        } else {
          logMsg = 'Did not pass verification ' + friendship.hello()
        }
        break
        /**
         *
         * 2. Friend Ship Confirmed
         *
         */
        case Friendship.Type.Confirm:
        logMsg = 'friend ship confirmed with ' + friendship.contact().name()
        break
      }
      } catch (e) {
      logMsg = e.message
      }
      console.log(logMsg)
    }
    // Auto-send message feature
    async function main() {
      let  contact = await bot.Contact.find({name:config.NICKNAME}) || await bot.Contact.find({alias:config.NAME}) // Get the contact you want to send to
      let one = await superagent.getOne() // Get daily quote
      let weather = await superagent.getWeather() // Get weather info
      let today = await untils.formatDate(new Date())// Get today's date
      let memorialDay = untils.getDay(config.MEMORIAL_DAY)// Get memorial day count
      let str = today + '<br>' + 'Today is day ' + memorialDay + ' of us being together'
        + '<br><br>Today\'s weather forecast<br><br>' + weather.weatherTips +'<br><br>' +weather.todayWeather+ 'Daily quote:<br><br>'+one+'<br><br>'+'------From the one who loves you most'
      await contact.say(str)// Send message
    }

    const bot = new Wechaty()

    bot.on('scan',    onScan)
    bot.on('login',   onLogin)
    bot.on('logout',  onLogout)
    bot.on('message', onMessage)
    bot.on('friendship', onFriendShip)

    bot.start()
      .then(() => console.log('Starting WeChat login'))
      .catch(e => console.error(e))
```

superagent/index.js

```js
    import superagent  from '../config/superagent'
    import config  from '../config/index'
    import cheerio  from 'cheerio'

    async function getOne() { // Get daily quote
      let res = await superagent.req(config.ONE,'GET')
      let $ = cheerio.load(res.text)
      let todayOneList = $('#carousel-one .carousel-inner .item')
      let todayOne = $(todayOneList[0]).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
      return todayOne;
    }

    async function getWeather() { // Get Moji weather
      let url = config.MOJI_HOST+config.CITY+'/'+config.LOCATION
      let res = await superagent.req(url,'GET')
      let $ = cheerio.load(res.text)
      let weatherTips = $('.wea_tips em').text()
      const today = $('.forecast .days').first().find('li');
      let todayInfo = {
        Day:$(today[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
        WeatherText:$(today[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
        Temp:$(today[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
        Wind:$(today[3]).find('em').text().replace(/(^\s*)|(\s*$)/g, ""),
        WindLevel:$(today[3]).find('b').text().replace(/(^\s*)|(\s*$)/g, ""),
        PollutionLevel:$(today[4]).find('strong').text().replace(/(^\s*)|(\s*$)/g, "")
      }
      let obj = {
      weatherTips:weatherTips,
      todayWeather:todayInfo.Day + ':' + todayInfo.WeatherText + '<br>' + 'Temperature:' + todayInfo.Temp +  '<br>'
        + todayInfo.Wind + todayInfo.WindLevel + '<br>' + 'Air Quality:' + todayInfo.PollutionLevel + '<br>'
      }
      return  obj
    }
    module.exports ={
      getOne,getWeather
    }
 ```

## Running the Project

Since chromium needs to be installed, you should configure the mirror first. Note that due to Wechaty limitations, it's best to use Node 10 or above.

npm

```sh
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set puppeteer_download_host https://npm.taobao.org/mirrors
```

yarn

```sh
yarn config set registry https://registry.npm.taobao.org
yarn config set disturl https://npm.taobao.org/dist
yarn config set puppeteer_download_host https://npm.taobao.org/mirrors
```

Then install the project:

```sh
git clone git@github.com:gengchen528/wechatBot.git
cd wechatBot
npm install or cnpm install
```

Parameter Configuration

wechatBot/config/index.js

## Project Configuration

config/index.js

```js
    // Configuration file
    module.exports ={
      // Basic scheduled sending feature configuration (required)
      NAME:'A Bunny',// Remark name
      NICKNAME:'Uh-huh', // Nickname
      MEMORIAL_DAY:'2015/04/18', // Your memorial day with the recipient
      CITY:'shanghai',// Recipient's city
      LOCATION:'pudong-new-district',// Recipient's district (you can visit Moji Weather website to check the English spelling)
      SENDDATE:'0 0 8 * * *',// Scheduled send time - send at 8:00:00 every day, see /schedule/index.js for rules
      ONE:'http://wufazhuce.com/',// ONE web version website
      MOJI_HOST:'https://tianqi.moji.com/weather/china/', // China Moji Weather URL

      // Advanced features configuration (optional)
      AUTOADDFRIEND:false,// Auto-add friend feature - disabled by default
      AUTOADDROOM:false,// Auto-invite to group feature - disabled by default
      AUTOREPLY:false,// Auto-chat feature - disabled by default
      AIBOTAPI:'http://www.tuling123.com/openapi/api',// Turing Robot API - register at http://www.turingapi.com/
      APIKEY:'Your Turing Robot apikey',// Turing Robot apikey
      ROOMNAME:'/^Your group name/i', // Group name (please only modify Chinese, don't delete symbols, this is regex)
      ADDFRIENDWORD:'/Your trigger keyword/i',// Auto-add friend trigger keyword (please only modify Chinese, don't delete symbols, this is regex)
      ADDROOMWORD:'/join group/',// Auto-send group image trigger keyword (please only modify Chinese, don't delete symbols, this is regex)
      ROOMCODEURL:'http://image.bloggeng.com/qun.png',// Group QR code URL link (choose one with local group QR code path)
      ROOMLOCALPATH:'./static/qun.png',// Local group QR code image path (choose one with group URL)
    }
```

Start Running

```sh
npm run start
```

Then take out your phone—preferably use a secondary account—and scan the QR code in the console.

## Issues to Resolve

* Moji Weather page may have delays when fetching, sometimes unable to retrieve data

## Common Issues

1. My WeChat account cannot log in

Starting from late June 2017, there is a high probability of login restrictions when using solutions based on web WeChat. Main symptoms: unable to log in to Web WeChat, but does not affect mobile and other platforms. Verify if login is restricted: scan code at <https://wx.qq.com> to check if you can log in. More details:

* [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/wechaty/wechaty/issues/603)
* [[Rumor] WeChat will close the web version](https://github.com/wechaty/wechaty/issues/990)
* [Newly registered WeChat accounts cannot log in](https://github.com/wechaty/wechaty/issues/872)

1. Unable to install puppet-puppeteer && Chromium when running npm run start

Issues deploying on CentOS 7:

![image](/assets/2019/koa-wechaty-7.webp)

Reason: [https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)

Solution:

```shell
# Dependencies
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
```

```sh
# Fonts
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```

* On Windows, puppeteer download failure

Link: <https://pan.baidu.com/s/1YF09nELpO-4KZh3D2nAOhA>  
Extraction code: 0mrz  
Put the downloaded file in the path shown below and extract it to the current folder.

![image](/assets/2019/koa-wechaty-8.webp)

1. Does it support red packets, transfers, Moments...?

Payment related - red packets, transfers, receiving payments, etc. are not supported.

1. More Wechaty feature-related interfaces

[Refer to Wechaty official documentation](https://wechaty.js.org/v/zh/)

1. Other problem solutions

    * First check if Node version is greater than 10
    * Confirm npm or yarn has been configured with Taobao mirror  
    * If package-lock.json file exists, delete it first
    * Delete `node_modules` and re-run `npm install` or `cnpm install`

## Notice

This project is developed out of personal interest and is open-sourced for technical exchange. Please do not use this project to violate WeChat regulations or do other illegal things.
It's recommended to use a secondary account for testing. There is a risk of web login being banned by WeChat (client not affected). Please ensure you use it voluntarily. The author is not responsible for web login bans caused by improper personal use. Thank you for your understanding.

## Finally

Since I added auto-add friend and group invitation features to this WeChat bot, interested friends can add my WeChat for testing. Remember to include the code word `WeChat Daily Talk` when adding friends. After adding, send `join group` and it will automatically send the group QR code.

**Note**: When adding friends, please fill in `WeChat Daily Talk` in the verification to auto-add friends.

![image](/assets/2019/koa-wechaty-9.webp)

Come try it yourself—I believe you'll discover more fun features!

GitHub: [https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)

Also, my official account has integrated Microsoft Xiaoice. After following, sending voice messages will get you a young lady's voice chatting with you. You can also text chat with her. If you're interested, give it a try. Singles are welcome to flirt!

![image](/assets/2019/koa-wechaty-10.webp)

> Author: [Leo_chen](https://github.com/leochen-g/), Frontend Engineer, enjoys using Node for various small projects, works at a big data company. This article was first published on Juejin: [用Node+wechaty写一个爬虫脚本每天定时给女(男)朋友发微信暖心话](https://juejin.im/post/5c77c6bef265da2de6611cff)
