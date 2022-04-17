 ---
 title: "入门：小白使用ipad协议制作微信机器人"
 author: xingkongqwq
 categories: article
 tags:
   - blog
   - wechaty
   - study
   - introduction
 image: /assets/2022/04-use-ipad-protocol-to-write-wechat-bot/wechaylogo.webp
 ---

 > 作者: [xingkongqwq](https://github.com/xingkongqwq/)

  [![Wechaty Contributor Program](https://img.shields.io/badge/Wechaty-Contributor%20Program-green.svg)](https://wechaty.js.org/docs/contributing/)
 # 作者的话

 ~~其实我也是刚接触Wechaty，这是一个微信机器人的好框架，也是仅存的为数不多的框架~~
 
 # 开始了？
 
 孔子说过

 > 工欲善其事,必先利其器 —— 《论语·卫灵公》

 嗯，那就让我们开始吧

 ## 你需要的东西

 - 一台Win7或以上可以上网的电脑
 - 你的脑子
 - 耐心

 ## Node.js安装
 
 [安装教程传送门](https://blog.csdn.net/FRESHET/article/details/119758647)

 **注意安装的是12LTS！！！**

 ## 获取一个token

 好吧，这里需要打钱

 [200/月](http://pad-local.com/#/login)

 [白嫖看我](https://wechaty.js.org/docs/contributing/)

 ## 使用官方demo

    git clone git@github.com:padlocal/wechaty-puppet-padlocal-demo.git
    cd wechaty-puppet-padlocal-demo
    npm install

 ## 设置token

 打开main.ts

    const puppet = new PuppetPadlocal({
        token: "TOKEN"
    });

 ## 跑！

     npm run demo