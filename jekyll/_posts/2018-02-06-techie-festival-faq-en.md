---
title: "Girl Techie Festival, Wechaty FAQ"
author: tingyinhelen
categories: tutorial
tags:
  - datagirls
---

This article is a summary of the questions asked by students at the Wechaty session of the Girl Techie Festival. Because many students do not have much programming experience, this article will be more basic.

Where does the story begin? Through this Girl Techie Festival event, the problems encountered by the students mainly came from three aspects: first, problems with Docker installation; second, misunderstanding of some proper nouns; third, problems with program operation and code writing. Then, I will focus on the problems encountered in program writing and operation, and the explanation of professional terms that are relatively unfamiliar to students. Because the installation problems are varied, after installation, everyone can write their own robots as they wish, and encounter more problems with program code. Also, I'm really not very good at installation...

So, this article is mainly written in the form of Q&A, and if you encounter new problems later, you can also tell me, and I will supplement them in time.

## 1. Can the Wechaty WeChat robot be used on a public account?

No. Wechaty is a third-party library for WeChat personal accounts, which can only be used for personal accounts, not for public accounts.

## 2. What is Docker?

Docker is an open source application container engine that allows developers to package their applications and dependencies into a portable container that can then be published to any popular Linux machine, and can also be virtualized. Containers are completely sandboxed, so they don't have any interfaces with each other.

## 3. What is the relationship between Docker and Wechaty?

Wechaty is a third-party library for WeChat personal accounts. It is a Node.js library. Docker is a container. Wechaty can be run in a Docker container.

## 4. What is the relationship between Wechaty and Node.js?

Wechaty is a Node.js library. It is written in TypeScript and can be used with any Wechaty-based chatbot.

## 5. What is the relationship between Wechaty and TypeScript?

Wechaty is written in TypeScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## 6. What is the relationship between Wechaty and JavaScript?

Wechaty is a Node.js library. It is written in TypeScript and can be used with any Wechaty-based chatbot. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. So, you can use JavaScript to write Wechaty chatbots.

## 7. What is the relationship between Wechaty and Python?

Wechaty is a Node.js library. It is written in TypeScript and can be used with any Wechaty-based chatbot. Wechaty also provides a Python version, which is a wrapper of the Node.js version. So, you can use Python to write Wechaty chatbots.

## 8. What is the relationship between Wechaty and Go?

Wechaty is a Node.js library. It is written in TypeScript and can be used with any Wechaty-based chatbot. Wechaty also provides a Go version, which is a wrapper of the Node.js version. So, you can use Go to write Wechaty chatbots.

## 9. What is the relationship between Wechaty and Java?

Wechaty is a Node.js library. It is written in TypeScript and can be used with any Wechaty-based chatbot. Wechaty also provides a Java version, which is a wrapper of the Node.js version. So, you can use Java to write Wechaty chatbots.

## 10. When running instructor Li Jiarui's get-start code, why can't I reply to my own messages?

In fact, from Wechaty's point of view, you can send messages and reply to yourself, but sending messages to yourself will enter an infinite loop.

The get-start code provided by the instructor has this sentence:

```javascript
if(m.self()){
  return;
}
```

When the received message is sent by yourself, the code will be terminated and will not continue to execute.

## 11. Chinese messages cannot be sent under Windows 7

This is a problem with MinGW. MinGW is a set of include files and port libraries whose function is to allow console mode programs to use Microsoft's standard C Runtime library.
Simply put, some software must run in a Linux environment. MinGW can provide a set of Linux running environments on Windows. In other words, you can execute Linux commands on Windows. But MinGW's support for Chinese is not very friendly. MinGW is automatically installed when we install Git. This is why students cannot send Chinese messages.
The specific solution is: use the command `docker-machine ssh`, ssh to connect to the inside of the docker image, and then run. ssh is a network protocol. If a user wants to log in to a remote computer through a local computer, they must use ssh. For those who want to know more, you can read this introductory article by Ruan Yifeng: [http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html). Here we use `docker-machine ssh` to access the docker image, because the inside of docker is a linux environment, so MinGW is not used inside, which solves the system compatibility problem.
However, after entering through ssh, you cannot directly use `docker run -t` to mount the local directory, because the command is now executed directly inside the virtual machine and cannot operate the files of the host machine. The solution is to mount the local directory to the inside of the docker virtual machine, then ssh to connect to the virtual machine, and `docker run -t` is to mount the directory inside the virtual machine.

Thanks to our remote teaching assistants [Shanmu](https://github.com/binsee) and [Fery](https://github.com/h4dex) for the solution.

## 12. Regular Expressions

Because when the robot pulls people into the group, we mainly use the method that the friend enters the keyword for joining the group, and then the robot matches the keyword and automatically pulls the person into the group. Here we need to use regular expressions.

First, let's understand what a regular expression is: a regular expression is a text pattern, which can be ordinary characters or special characters. A regular expression uses a single string to describe and match a series of strings that conform to a certain syntactic rule. Maybe this is not very clear to everyone, let's take an example:
We want to pull people into the `test` group, and we hope that friends will send "room" to the robot. Only when the robot receives this word will it automatically add the friend to the `test` group. Then we need to use regular expressions to match.
Here I would like to mention a piece of code written by a student that is very educational. It can be seen that this student has a certain programming foundation. The function she wants to achieve is that when a friend enters "Hello" or "Hi", they can be automatically added to the group. Here is the code:

```js
if(/Hello || Hi/.test(content)){
  ...
}
```

In js regular expressions, "or" is written as `/Hello|Hi/`, and there can be no spaces in between. If there are spaces, the regular expression will also match the spaces, and the friend must enter "Hello " or " Hi" to match.
Regular expressions are tedious to learn, but they are very powerful. Interested students need to spend time learning them on their own.

## 13. Typescript

Javascript is a weakly typed language, which means that the variable type is uncertain, for example:

```javascript
var x = 5;
x = x + 'A'
```

When `x` is declared, it is a number, but the second sentence directly turns `x` into a string. In other words, the type of a variable in js is completely determined by its current value. This is very convenient and simple for the original js as a scripting language, but as the project gradually grows, this weakly typed language can only detect errors when the program is running. In order for developers to find problems in the code during compilation, many large projects now hope that Js can support strong typing, that is, specify the type of the variable, such as Flow, Typescript. Typescript is a programming language launched by Microsoft in 2012. It is a superset of JavaScript and can be compiled into JavaScript for execution. Its biggest feature is that it supports strong typing and ES6 classes.

Wechaty itself is written in Typescript. We can also use Typescript when writing robots.

## 14. How to know the conditions for automatic friend approval

Some students asked, what if I don't want to accept all friend requests?

You can refer to this example: <https://github.com/wechaty/wechaty/blob/main/example/friend-bot.ts>
And the `friend` Event API:
<https://wechaty.github.io/wechaty/#Wechaty+on>

The interface provided by Wechaty can filter out some friends who send requests through verification information. The specific code is:

```javascript
.on('friend', async (contact, request) => {
  if (request && request.hello == ‘ding’) {
    request.accept()
  }
}）
```

Only when the verification information is 'ding' will friends be added automatically.

## 15. Does it support red envelope type messages?

The interface provided by Wechaty can identify the type of message received by the robot. Because Wechaty is web-based, it cannot perform the operation of receiving red envelopes.

You can refer to my code:
<https://github.com/TingYinHelen/wechaty-test/blob/master/index.js>
At line 49, it judges the type of the message. The `m.type()` of a red envelope message is 10000. When `m.type() == 10000`, it means it is a red envelope, and the robot will @ me to remind me to grab the red envelope quickly.

## 16. How to prevent being blocked

You need to control the frequency of sending messages. A high sending frequency is easy to be identified. In addition, the account is best to be authenticated, bound to a bank card, and used normally on the mobile phone (such as posting on Moments). In short, make your account behave like a real person.

Also very important, do not use it to send advertisements or harass, otherwise it is easy to be blocked if reported.

## 17. My account cannot log in to the web version of WeChat

The WeChat account is too new, you need to switch to an earlier registered account. In fact, you have encountered the situation mentioned above where your account has been blocked.

## 18. Solution to the robot going offline

It is recommended to use Server酱 here. The web version of WeChat often kicks users offline. Server酱 can help us know what exceptions have occurred in Wechaty. Server酱 is a tool that can push alarms and logs from the server to the mobile phone. It is very simple and easy to operate:

1. After logging in with your GitHub account, you will get an SCKEY (on the "Send Message" page). Follow the guide, click "WeChat Push", and scan the code to follow "方糖" to complete the binding.

2. After the login, logout, scan, and error events are triggered, send some key information to <http://sc.ftqq.com/SCKEY.send> as a Get request, and I will receive the message in my WeChat.

In this way, when my robot has various abnormal situations, I can know it anytime and anywhere. When I need to scan the code to enter again, the "方糖" official account will push the QR code to my mobile phone, and I only need to scan the code with the robot's WeChat.

## 19. How to terminate the program

Command to terminate the program: `ctrl + c`

## 20. How to distinguish between group chat and private chat

When the robot gets a message, it can judge the return value of the `message.room()` method. When the return is null, it means it is a private chat. If the return is not null, it is a group chat. `null` is converted to `false` in js. So let's look at the code directly.

```javascript
const room = m.room()
if(room){
  // This is a group chat
}else{
  // This is a private chat
}
```

## 21. Application scenarios of Wechaty

The application scenarios of Wechaty are very wide. [Wechaty](https://wechaty.github.io) provides a very convenient set of interfaces. In the past, we always went to the App store to install Apps, and then used the Apps to meet some of our needs for application scenarios. But now, when using mobile phones, most of the time is spent on WeChat. Whether it is private chat, group chat or looking at Moments, we have to admit that WeChat occupies a large part of our lives. So why not save the time of downloading Apps and meet our needs for applications on WeChat. Booking air tickets, hotels, renting houses, checking the weather, and checking nearby food. It can be said that a chatbot can achieve most of the functions of an App, but it needs to be designed by the developer. A chatbot can simplify all mechanical labor costs, such as: pulling people into groups, sending welcome messages, automatically adding friends, and automatically kicking people. Speaking of automatically kicking people, in fact, in many groups, the group owner kicks people manually. In the Wechaty developer home WeChat group, automatic kicking is implemented. When someone sends irrelevant messages in the group, members of the group can @ this person and vote with WeChat emoticons. If the number of votes exceeds three, the robot will automatically kick the person. So there are too many things that a chatbot can do. If you are interested, you can find many technical articles written by developers in Wechaty's blog [https://wechaty.github.io/](https://wechaty.github.io/), and the actual application of Wechaty. Of course, you can also use your imagination to make more interesting WeChat robots.

## 22. Execute `docker run` in the project directory

Many students have this problem. After downloading the get-start project, they start running the code without entering the project directory. You need to enter the project directory before running.

`cd wechaty-getting-started`

The following are various installation problems

## 23. Docker installation problem

Error with pre-create check: "This computer doesn't have VT-X/AMD-v enabled. Enabling it in the BIOS is mandatory"

Looks like something went wrong in step ´Checking if machine default exists´... Press any key to continue...

Restart and enter the Bios to set it up.

Security->Virtualization->Intel(R)Virtualization Technology From Disabled->Enabled

## 24. ash.exe not found problem

If the installation path is not on the C drive, you may encounter this problem. Just browse it manually.

## 25. boot2docker cannot be downloaded

Download it manually and put it in C:\users\username\.docker\machine\cache

## 26. bash.exe not found problem

Download the link provided below and install it.
<https://github.com/boot2docker/boot2docker/releases/download/v18.01.0-ce/boot2docker.iso>

![a](https://avatars2.githubusercontent.com/u/14006826?v=3&s=88)
>
> Author: [@Helen](https://github.com/TingYinHelen), Lenovo
>
> Volunteer teaching assistant for the Girl Techie Festival.
>

---

> Original post in Chinese: [女生科技体验节，Wechaty杂货铺]({{ '/2018/02/06/techie-festival-faq/' | relative_url }})
