# Puppet System

The term [Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) in Wechaty is an Abstract Class for implementing protocol plugins. The plugins are the component that helps Wechaty to control the Wechat(that's the reason we call it puppet).

The plugins are named `PuppetXXX`, like [PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) is using the [google puppeteer](https://github.com/GoogleChrome/puppeteer) to control the [WeChat Web API](https://wx.qq.com) via a chrome browser, [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) is using the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program. More detail you could go [Puppet in wiki](https://github.com/Chatie/wechaty-puppet/wiki).

For a deeper understanding of the Puppet in Wechaty, you can read its source code if you like at <https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts>

![](https://github.com/Chatie/wechaty/wiki/image/abstract-info.png)

# Wechaty-puppet-padchat

A web solution to connect weChat, Wechaty init implement is by web weChat, which inject js code into chrome.

Repo: https://github.com/Chatie/wechaty-puppet-puppeteer

# Wechaty-puppet-puppeteer

An iPad solution to connect weChat

Repo: https://github.com/lijiarui/wechaty-puppet-padchat