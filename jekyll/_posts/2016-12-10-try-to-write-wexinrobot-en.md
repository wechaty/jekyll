---
title: 'How a Girl Built a WeChat Chatbot with 6 Lines of Code'
author: lijiarui
categories: story
tags:
  - code
  - news
  - tutorial
  - chatbot
image: /assets/2016/ruirui-dance.webp
excerpt: A personal story of how dance video creator Jiarui Li solved her community management challenges by building a WeChat chatbot using Wechaty framework with just 6 lines of JavaScript.
---

I've been shooting dance tutorial videos with my friends in our spare time, called "WuLi". We've created hundreds of original videos with nearly 10 million views, so we built WeChat groups to communicate with our fans.

![RuiRui][ruirui-dance-image]

## 1. My Encounter with WeChat Robots

When our WeChat group exceeded 100 people, the group owner had to manually add people. So I registered a WeChat secondary account on my iPad, letting everyone join the WeChat group by adding this secondary account. Every evening at 9 PM, I would log into this secondary account, approve all friend requests, and then add them to the group. Sometimes there would be dozens of friend requests. I'd first approve them all, then take photos of these new friends with my phone, and match the photos to find each friend in my contacts to add them to the WeChat group.

Until one time when I went abroad and didn't bring my iPad because it was too heavy, meaning I couldn't handle the WeChat secondary account for 10 days. When I returned, I discovered something tragic... about 100+ friend requests, and just taking photos of these friend requests would require dozens of screenshots!

This was clearly mechanized assembly line work! How could a programmer be expected to complete this manually? So I started organizing my requirements, which were actually just three:

1. Automatically approve friend requests
2. When fans chat with me on WeChat, automatically reply through keywords. After all, 80% of questions are the same
3. Automatically add them to groups

So I found Wechaty on GitHub and discovered that just a few dozen lines of code could meet my needs. Most importantly, robots do mechanized assembly line operations much better than manual work.

## 2. Introduction to a Simple WeChat Robot Framework

There are many open source projects related to WeChat robots on GitHub, implementable through JavaScript, Electron, Go, Perl, Python, etc.

Since I'm only familiar with JavaScript, I chose Wechaty. It's a Node project written in TypeScript, a bot framework specifically built for personal WeChat accounts. Using Wechaty's API, you can build the simplest WeChat robot with just 6 lines of JavaScript code, supporting Linux, Windows, Darwin(OSX/Mac) and Docker.

![wechaty-pic][wechaty-pic]

What I particularly love about Wechaty is that I don't need to worry about any implementation logic - I just write business logic in JS. Once I figure out what I need to do, implementing it in JS is very simple and convenient.

Wechaty's basic implementation principle is to monitor various information from WeChat web version through Chrome in real-time, then encapsulate the captured information into APIs for developers to use. It has 9 basic events that basically cover all events on our Web WeChat:

1. scan event is triggered when QR code login is needed
2. login event is triggered after the robot successfully logs in
3. logout event is triggered after the robot goes offline
4. message event is triggered when there are new messages
5. error event is triggered when the program encounters an error
6. friend event is triggered when there are friend requests
7. room-join event is triggered when someone joins a group
8. room-leave event is triggered when the group owner removes friends from the group
9. room-topic event is triggered when the group name is modified

Additionally, Wechaty encapsulates robots, contacts, WeChat groups, and friend requests into classes: Wechaty, Contact, Message, and FriendRequest. This way, I just need to import these packages to directly use functions in these classes to simulate various WeChat operations. For example, to send a message to a specific person, I just use contact.say('hello'). Function names in Wechaty are very human-friendly - writing business logic in JS reads as smoothly and comfortably as reading English documentation.

## 3. How to Install Wechaty

There are two ways to install Wechaty:

1. Docker
2. NPM

I highly recommend using Docker to install Wechaty. Although I initially used the second method, having tried both ways, I deeply appreciate "Docker is awesome."

Here's a simple introduction to both installation methods - Docker and NPM:

### Docker

After installing Docker (click here to see how to install docker), run the following command and Wechaty will be successfully installed on your computer:

`docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty run demo`

After first run, you'll see this screenshot:
![docker-pull][docker-pull]

Docker will automatically deploy related packages to your computer. After successful installation, future runs will look like this:
![run-ding][run-ding]

The Wechaty author's love for this special font reaches a crazy level. To help everyone understand more clearly, I've included all screenshot content.

Usually, I alias this command string to wechaty:

`alias wechaty='docker run -t -i --rm -e WECHATY_LOG="silly" --volume="$(pwd)":/bot zixia/wechaty:0.5.9'`

And add -e WECHATY_LOG="silly" and the version number: zixia/wechaty:0.5.9, then run like this:

`wechaty run demo`

-e WECHATY_LOG="silly" prints all wechaty system logs for easier problem discovery and code debugging. zixia/wechaty:0.5.9 adds a version number because the author frequently updates code, and recent code occasionally has issues. 0.5.9 is what I consider a relatively stable version.

### NPM

```shell
npm install --save wechaty
node mybot.js
```

Several points worth noting:

1. Wechaty requires Node version 6 or above; I'm currently using version 7
1. Some environments require installing Chromedriver - depending on versions, you may need to pay attention
1. If on a server, you need to run the xvfb.sh script in the Script directory to provide Chrome with a virtual runtime environment, and set program runtime environment variables according to post-run prompts
1. You can also set WECHATY_LOG value to print system logs: WECHATY_LOG=SILLY node mybot.js

#### About Servers

Many packages Wechaty depends on are outside the firewall, so I recommend using overseas VPS. I use DigitalOcean. If just running a robot service, I suggest 2GB/2 CPUs or higher configuration. One robot service occupies about 1G memory. With swap configured, short-term use is also possible.

## 4. How to Use Wechaty

After environment deployment, the following 6 lines of code can successfully implement basic bot functionality: print out all messages received by the WeChat robot:

```shell
import { Wechaty }  from 'wechaty'

Wechaty.instance()
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',  user => console.log(`User ${user.name()} logined`))
.on('message',  message => console.log(`Message: ${message.content()}`))
.init()
```

Brief introduction to this code:

- scan event: Two return values
  - code: Returns scan status
    - 0: Initial state
    - 200: Successfully logged in
    - 201: WeChat has been scanned, waiting for confirmation
    - 408: Waiting for WeChat scan
  - url: QR code image address needed for login. You need to paste this url into a browser to open and scan for login
- login event: Returns user representing the logged-in user, which is a Contact type. When printed, you can see the current logged-in user's nickname. Through user.id() you can get the user's unique id, user.name() gets the user's WeChat nickname, user.weixin() gets the user's WeChat ID.
- message event: Returns message representing received messages, which is a Message type. Through message.content() you can get message content, message.from() can get the message sender, returning a Contact type.

The above are just simple interface introductions. For more detailed interface documentation, click to view: Wechaty Interface Documentation. The interface documentation is still being updated. If you want more interfaces, directly clone the source code to view the code - you'll discover many surprising and fun little things.

Besides this, I also want to share two practical Wechaty tools:

### qrcode-terminal

Just printing the QR code image link that needs scanning on screen, then copying the link to browser for scanning is still troublesome. I prefer directly scanning QR codes on terminal for login to achieve the cool effect in demos. Just two steps:

1. Install dependency package:

`npm install qrcode-terminal`

1. Slightly modify the code after scan event:

```ts
wechaty.on('scan', (url, code) => {  
if (!/201|200/.test(String(code))){
   let loginUrl = url.replace(/\/qrcode\//, '/l/')
   require('qrcode-terminal').generate(loginUrl)  
}  
console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})
```

### Server酱 (ServerChan)

Although robots can run stably on VPS, Web WeChat frequently kicks users offline, so I need to know about various Wechaty exceptions. There's a simple third-party tool: ServerChan, which can push alerts and logs from servers to phones. Very simple and easy to operate:

1. Login with GitHub account to get an SCKEY (on the "Send Message" page). Follow guidance, click "WeChat Push", scan to follow "FangTang" to complete binding
1. After login, logout, scan, and error events trigger, send key information via GET request to <http://sc.ftqq.com/SCKEY.send>, and I receive messages on my WeChat

This way, when my robot encounters various exceptions, I can know anytime, anywhere. When re-scanning is needed, the FangTang official account pushes the QR code to my phone, and I just scan with the robot's WeChat.

Yes, just like this, I achieved my dream of adding people with my eyes closed.

## 5. Follow-up

When I started using robots for all repetitive operations, I had further thoughts about group joining work. For example, I blacklisted many micro-merchants so they can never enter my WeChat groups again. I also wrote an admin function for WeChat groups, so admins can kick users from WeChat groups even if they're not group owners. Sometimes when feeling creative, I'd make pranks, specifically collecting group members' recalled messages to entertain everyone...

Suddenly remembered a saying: "People should think, Bot should work." When machines can help us complete mechanized work, we have more time to think about truly valuable things.

Wechaty liberated me from some repetitive work, and I also hope to do something for Wechaty. So I'm now updating Wechaty documentation in my spare time, sometimes sharing problems I encounter when using Wechaty, hoping to help more people quickly get started with Wechaty.

If you're interested in Wechaty and want to communicate, share, and learn together, you can scan the code to add "JuziBot Secretary" as a friend, reply "wechaty" to join WECHATY DEVELOPERS' HOME. You can also experience some small functions implemented by wechaty.

![qr-code][qr-code]

[ruirui-dance-image]: /assets/2016/ruirui-dance.webp
[wechaty-pic]: /assets/2017/lijiarui-write-bot-wechaty-pic.webp
[docker-pull]: /assets/2017/lijiarui-write-bot-docker-pull.webp
[run-ding]: /assets/2017/lijiarui-write-bot-run-ding.webp
[qr-code]: /assets/2017/lijiarui-write-bot-qr-code.webp

---

---

> Chinese version of this post: [尝试写微信聊天机器人，以及对chatBot的思考]({{ '/2016/12/10/try-to-write-wexinrobot/' | relative_url }})
