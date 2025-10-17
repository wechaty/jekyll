---
title: "Installing Wechaty on Windows 10"
author: kaffa
categories: tutorial
tags:
  - windows
  - install
  - news
  - ecosystem
image: /assets/2018/wechaty-installation-in-windows-en.webp
excerpt: >
  A comprehensive guide to installing Wechaty on Windows 10 Home, covering common installation errors and solutions including Python 2.7, node-gyp, windows-build-tools, and puppeteer configuration.
---

![Installing Wechaty on Windows 10](/assets/2018/wechaty-installation-in-windows-en.webp)

Thanks to @huan @lijiarui for allowing me to share my experience installing Wechaty on the Windows 10 Home platform. I hope my documentation and analysis of the installation process can help others installing Wechaty on this platform.

## Introduction

[Wechaty](https://github.com/wechaty/wechaty) is a conversational bot SDK that helps you implement a WeChat personal account with just 6 lines of JavaScript code. Using node technology, it supports Linux, Windows, macOS platforms and Docker containers. Its installation process is similar to other node packages: first ```git clone``` the source code, then use node's npm command ```npm install & npm start``` for out-of-the-box use. The official also provides a getting started case: Wechaty getting started. In China, you may encounter problems during the actual installation process due to certain software dependencies. This article documents errors that may occur during installation and their solutions. Detailed steps and explanations are described below:

* Project address: [Wechaty](https://github.com/wechaty/wechaty)
* Wechaty Getting Started: [Wechaty Getting Started](https://github.com/wechaty/wechaty-getting-started)
* Wechaty Documentation: [Wechaty Documents](https://wechaty.js.org)

## Concepts

* [Puppet](https://github.com/wechaty/wechaty/wiki/Puppet): An abstract class containing bot conversation logic, part of Wechaty's technical architecture. By inheriting and implementing the Puppet abstract class (protocol) components, you can implement broader logic related to contacts, messages/one-to-one conversations, groups/chat rooms/many-to-many conversations, etc. Puppet in Chinese means puppet/marionette, which is quite fitting here.
* [node-gyp](https://www.npmjs.com/package/node-gyp): A node package based on gyp for compiling node native extension modules, and gyp is a tool used in the Chromium project for cross-platform compilation. See [installation documentation](https://github.com/nodejs/node-gyp#installation)
* [windows-build-tools](https://www.npmjs.com/package/windows-build-tools): Node-packaged compilation tools for the Windows platform
* [node-expat](https://www.npmjs.com/package/node-expat): A node package based on libexpat for handling XML. libexpat is claimed to be the fastest XML parsing library, written in pure C language. Wechaty uses it to parse XML-based communications. See [installation documentation](https://github.com/felixrieseberg/windows-build-tools)
* [Python 2.7](https://www.python.org/downloads/): A timeless language; node-gyp depends on Python 2.7 for cross-platform compilation
* [puppeteer](https://github.com/GoogleChrome/puppeteer): Programmable Google Chrome, officially produced by the Google Chrome team.
* [Chromium](https://www.chromium.org/): puppeteer depends on a specific Chromium version. Chrome is open source Chromium + Google's closed-source extension package.

## Installation Steps

1. Download Wechaty source code

2. Install Wechaty dependencies and configure

3. Start Wechaty

## Detailed Steps

### 1. Download Wechaty Source Code

First we create a source code directory. This article uses ```D:\code```. If you use a different directory, make corresponding replacements in the following text. Let's start with the getting started project, run the following commands to download and enter the project directory:

```bat
git clone https://github.com/lijiarui/wechaty-getting-started.git
cd wechaty-getting-started
```

### 2. Install Wechaty Dependencies and Configure

First install node-v10.x.x. On Windows, using the official installation package is recommended. As of this writing, the [latest 64-bit system installation package](https://nodejs.org/dist/v10.7.0/node-v10.7.0-x64.msi). If network speed is insufficient, using Thunder downloader is recommended.

Besides node-v10, Wechaty also depends on other software, and due to well-known network reasons, installing them won't be very smooth.

At this point, if you run npm install & npm start, you'll get the following error:

```bat
Microsoft Windows [Version 10.0.16299.492]
(c) 2017 Microsoft Corporation. All rights reserved.

D:\code>cd wechaty-getting-started

D:\code\wechaty-getting-started>npm install
npm notice created a lockfile as package-lock.json. You should commit this file.
added 134 packages from 94 contributors and audited 324 packages in 22.581s
found 0 vulnerabilities

D:\code\wechaty-getting-started>npm start

> wechaty-getting-started@0.1.0 start D:\code\wechaty-getting-started
> node examples/starter-bot.js

01:59:34 INFO Wechaty <default> start() v0.18.5 is starting...
01:59:34 INFO Wechaty initPuppet() using puppet: default
01:59:34 INFO PuppetConfig installPuppet(wechaty-puppet-puppeteer@^0.4.2) please wait ...
npm:
> node-expat@2.3.16 install D:\code\wechaty-getting-started\node_modules\wechaty\node_modules\node-expat
> node-gyp rebuild

npm:
D:\code\wechaty-getting-started\node_modules\wechaty\node_modules\node-expat>if not defined npm_config_node_gyp (node "D:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )

npm: gyp
npm:  ERR! configure error
gyp ERR! stack Error: Can't find Python executable "C:\Python36\python.EXE", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\configure.js:483:19)
gyp ERR! stack     at PythonFinder.<anonymous> (D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\configure.js:508:16)
gyp ERR! stack     at D:\Program Files\nodejs\node_modules\npm\node_modules\graceful-fs\polyfills.js:284:29
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:158:21)
gyp ERR! System Windows_NT 10.0.16299

npm: gyp ERR! command "D:\\Program Files\\nodejs\\node.exe" "D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd D:\code\wechaty-getting-started\node_modules\wechaty\node_modules\node-expat
gyp ERR! node -v v10.7.0
gyp ERR! node-gyp -v v3.6.2
gyp ERR! not ok

npm: npm WARN
npm:  wechaty-puppet-puppeteer@0.4.2 requires a peer of brolog@^1.6.5 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of file-box@^0.8.22 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of hot-import@^0.2.1 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of lru-cache@^4.1.3 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of qr-image@^3.2.0 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of promise-retry@^1.1.1 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of rxjs@^6.2.1 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of rx-queue@^0.4.26 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of state-switch@^0.6.2 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of watchdog@^0.8.10 but none is installed. You must install peer dependencies yourself.
npm WARN wechaty-puppet-puppeteer@0.4.2 requires a peer of wechaty-puppet@^0.6.4 but none is installed. You must install peer dependencies yourself.

npm: npm ERR!
npm:  code ELIFECYCLE
npm ERR! errno 1
npm ERR! node-expat@2.3.16 install: `node-gyp rebuild`
npm ERR! Exit status 1

npm: npm ERR!
npm ERR! Failed at the node-expat@2.3.16 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm:
npm
npm:  ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\username\AppData\Roaming\npm-cache\_logs\2018-07-22T17_59_53_633Z-debug.log
```

By reading the above log, the dependency relationship is analyzed as follows:

```bat
wechaty-puppet-puppeteer
    --> node-expat
        --> node-gyp
            --> gyp
                --> Python 2.7 & Windows Build Tools
```

Next, we need to install from the bottom of the dependency chain

**1. Install Python 2.7 to ``C:\Python27\python.exe``**, set environment variable ``PYTHON=C:\Python27\python.exe``

Note that node-gyp does not support Python 3.x. If you have Python 3.x installed, the error log looks like this:

```bat
Can't find Python executable "C:\Python36\python.EXE", you can set the PYTHON env variable.
```

You may wonder about this existing Python 3 path. Personally, I think this inaccurate error message can be considered a bug in the npm package.

**2. Install windows-build-tools**

Referring to the windows-build-tools official documentation, there are two methods:

* Visual C++ Build Tools
* Visual Studio 2017 vs Visual Studio 2015

Since I have already installed Visual Studio 2017 Community Edition, I didn't try other options. The key here is needing a VC++ compiler to compile Windows native programs. Visual C++ Build Tools is no longer available at Microsoft's official address and is not easy to find. npm officially recommends installing Visual Studio 2015. After installation, you can use ``npm install node-expat`` to verify if the above installation configuration was successful.

**3. [Install puppeteer](https://github.com/GoogleChrome/puppeteer)**

Due to network reasons, the Chromium that puppeteer depends on cannot be installed smoothly. At this time, we can use a special cnpm tool provided by Alibaba to install:

```bat
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install puppeteer
```

PS: If you encounter "Chromium revision is not downloaded," setting PUPPETEER_SKIP_CHROMIUM_DOWNLOAD in solutions you find is actually misleading. This option won't help you install puppeteer, but rather lets you not download Chromium binary every time you update.

There's also a manual installation method, but not recommended: you can manually download the chromium installation package and place it in ``/node_modules/puppeteer/.local-chromium/``, for example:

```bat
D:\code\wechaty-getting-started\node_modules\_puppeteer@1.6.0@puppeteer\.local-chromium\win64-571375
```

This path on macOS is as follows, where the numbers may differ:

```bat
~/node_modules/puppeteer/.local-chromium/mac-526987/chrome-mac
```

**4. .NET Framework 4.5.1 [Windows Vista / 7 only]**

If using Windows Vista / 7, you need to manually install .Net Framework.

**5. If using Wechaty with PadChat component and have the corresponding token, you also need to set the following environment variables:**

```sh
WECHATY_LOG=silly
WECHATY_PUPPET=padchat
WECHATY_PUPPET_PADCHAT_TOKEN=*YOUR-TOKEN*
```

### 3. Start Wechaty

```sh
npm install & npm start
```

After running, the program will open a text QR code in the console window, with the QR code's URL below it.

If you encounter problems scanning the console text QR code, you can refer to my [blog post about QR codes](https://kaffa.im/a-story-about-text-qrcode.html).

## Summary

Since I successfully started the project, I haven't configured it on Windows 7 systems or 32-bit machines, but the main issues should be similar. For solutions, I recommend checking the documentation for the software where errors occurred.

Of course, if you encounter any other problems, feel free to contact me on [my Github](https://github.com/kaffa).

---

> 本文也有[中文版本](/2018/07/24/wechaty-installation-in-windows-10/)。
