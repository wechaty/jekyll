# 1. Intro

The term [Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) in Wechaty is an Abstract Class for implementing protocol plugins. The plugins are the component that helps Wechaty to control the Wechat(that's the reason we call it puppet).

The plugins are named `PuppetXXX`, like [PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) is using the [google puppeteer](https://github.com/GoogleChrome/puppeteer) to control the [WeChat Web API](https://wx.qq.com) via a chrome browser, [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) is using the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program. More detail you could go [Puppet in wiki](https://github.com/Chatie/wechaty-puppet/wiki).

For a deeper understanding of the Puppet in Wechaty, you can read its source code if you like at <https://github.com/Chatie/wechaty-puppet/blob/master/src/puppet.ts>

![](https://github.com/Chatie/wechaty/wiki/image/abstract-info.png)

# 2. Wechaty Puppet List

## 2.1. For Puppet User

| Wechaty Puppet                                                         | Backend Protocol            | Npm Name                 | Npm Version                                                               | Stage   |
| :----------------------------------------------------------------------| :---------------------------| :------------------------| :-------------------------------------------------------------------------| :-------|
| [PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer)  | Web API via Browser Hooking | wechaty-puppet-puppeteer | ![PuppetPuppeteer](https://badge.fury.io/js/wechaty-puppet-puppeteer.svg)<br />[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-puppeteer/next.svg)](https://www.npmjs.com/package/wechaty-puppet-puppeteer?activeTab=versions) | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg)  |
| [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat)    | iPad Protocol               | wechaty-puppet-padchat   | ![PuppetPadchat](https://badge.fury.io/js/wechaty-puppet-padchat.svg) <br /> [![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-padchat/next.svg)](https://www.npmjs.com/package/wechaty-puppet-padchat?activeTab=versions)    | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg)    |
| [PuppetWechat4u](https://github.com/Chatie/wechaty-puppet-wechat4u)    | Web API via HTTP            | wechaty-puppet-wechat4u  | ![PuppetWechat4u](https://badge.fury.io/js/wechaty-puppet-wechat4u.svg) <br /> [![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-wechat4u/next.svg)](https://www.npmjs.com/package/wechaty-puppet-wechat4u?activeTab=versions)  | ![Stage:Release](https://img.shields.io/badge/Stage-Alpha-red.svg)      |
| [PuppetIoscat](https://github.com/linyimin-bupt/wechaty-puppet-ioscat) | iPhone App Hooking          | wechaty-puppet-ioscat    | ![PuppetIoscat](https://badge.fury.io/js/wechaty-puppet-ioscat.svg) <br /> [![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-ioscat/next.svg)](https://www.npmjs.com/package/wechaty-puppet-ioscat?activeTab=versions)      | ![Stage:Release](https://img.shields.io/badge/Stage-Alpha-red.svg)      |
| TBW                                                                    | Android Hook                | Android                  | 0.0.0                                                                     | ![Stage:Release](https://img.shields.io/badge/Stage-Plan-lightgrey.svg) |
| TBW                                                                    | Win32 Hook                  | Win32                    | 0.0.0                                                                     | ![Stage:Release](https://img.shields.io/badge/Stage-Plan-lightgrey.svg) |

## 2.2. For Puppet Builder

| Wechaty Puppet                                              | Backend Protocol    | Npm Name            |  Npm Version                                                    | Stage   |
| :-----------------------------------------------------------| :-------------------| :-------------------| :---------------------------------------------------------------| :-------|
| [Puppet](https://github.com/Chatie/wechaty-puppet)          | Abstract Base Class | wechaty-puppet      | ![Puppet](https://badge.fury.io/js/wechaty-puppet.svg) <br /> [![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet/next.svg)](https://www.npmjs.com/package/wechaty-puppet?activeTab=versions)         | ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg) |
| [PuppetMock](https://github.com/Chatie/wechaty-puppet-mock) | Mocking             | wechaty-puppet-mock | ![PuppetMock](https://badge.fury.io/js/wechaty-puppet-mock.svg) <br /> [![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-mock/next.svg)](https://www.npmjs.com/package/wechaty-puppet-mock?activeTab=versions)| ![Stage:Release](https://img.shields.io/badge/Stage-Release-green.svg) |


# 3. Wechaty Puppet Compatibility

## 3.1 Puppet Contact API

| Contact API | PuppetWechat4u &<br />PuppetPuppeteer | PuppetPadchat | PuppetIoscat
| --- | :---: | :---: | :---: |
| Permanent ContactPayload.id  | ~~No~~ | Yes | ~~No~~
| ContactPayload.friend | ~~No~~ | Yes | Yes

## 3.2 Puppet Message API

| Message API | PuppetWechat4u &<br />PuppetPuppeteer | PuppetPadchat | PuppetIoscat
| --- | :---: | :---: | :---: |
| messageSendContact() | ~~No~~ | Yes | ~~No~~
| messageFile() | Yes | Yes for Image/Audio/Video<br />No for other Attachments | ~~No~~
| messageSendFile() | Yes | Yes for Image/Audio/Video<br />No for other Attachments | ~~No~~ |
| messageSendUrl() | ~~No~~ | Yes | ~~No~~ |

## 3.3 Puppet Room API

| Room API | PuppetWechat4u &<br />PuppetPuppeteer | PuppetPadchat | PuppetIoscat
| --- | :---: | :---: | :---: |
| Permanent RoomPayload.id | ~~No~~ | Yes | ~~No~~
| roomQrcode() | ~~No~~ | Yes | Yes
| roomCreate() | ~~No~~ | Yes | Yes
| roomAdd() | ~~No~~ | Yes | Yes
| roomDel() | ~~No~~ | Yes | Yes
| roomQuit() | ~~No~~ | Yes | Yes
| roomAnnounce() | ~~No~~ | Yes | Yes
| roomPayload.owner | ~~No~~ | Yes | ~~No~~

# 4. Learn More

Learn more about Wechaty Puppet at <https://github.com/Chatie/wechaty-puppet/wiki>
- Repository: https://github.com/Chatie/wechaty-puppet
- Documentation: https://chatie.io/wechaty-puppet/typedoc/classes/puppet.html
- Puppet Development Guide: https://github.com/Chatie/wechaty-puppet/wiki/Development
- Puppet Related Links: https://github.com/Chatie/wechaty-puppet/wiki/Links
