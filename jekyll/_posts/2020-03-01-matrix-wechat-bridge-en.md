---
title: "Sending and Receiving WeChat Messages Using [Matrix]"
author: cubesky
categories: tutorial
tags:
  - matrix
  - featured
  - ecosystem
image: /assets/2020/matrix-wechaty/2020-03-matrix-appservice-wechaty.webp
---

> This post is also available in [Chinese](/2020/03/01/matrix-wechat-bridge/)

Everyone around me knows I really dislike WeChat—it's bloated, slow, has low openness, and is extremely power-hungry. So naturally, I exercised my ability to cripple rogue software by completely disabling WeChat's background processes. As a result, people around me always say they often can't find me on WeChat. Of course—without background processes, it would be strange if they could find me in real-time.

Therefore, using other chat software to relay WeChat messages became very important. Previously, I used EH Forwarder Bot to forward WeChat messages to Telegram. After using it for a while, I found it rather inconvenient. After logging in, all messages were sent to you by a Bot account. Moreover, if you wanted to separately connect a WeChat group, you had to create a group yourself, invite the Bot, and then select the connection. Also, due to connection issues with the WeChat protocol, there were often situations where messages suddenly couldn't be received or connections would suddenly drop. So I eventually stopped using EH Forwarder Bot. (Of course, also because I bought a second phone at that time...)

Then this year, for various reasons, my friend and I each set up our own Matrix servers. I discovered a feature called Bridge on the official website, which essentially allows users and groups from other chat protocols to join Matrix as virtual users and Portal groups, as if they were originally Matrix users.

As an experiment, I first set up a Telegram Bridge to connect my Telegram account. The connection was successful, and I could receive messages normally and reply. However, because my Telegram message volume was too large, my server often responded slowly, and I eventually had to close the Telegram Bridge.

At the same time, I saw a Bridge called Wechaty in the Bridge introduction, developed by [Huan](https://github.com/huan). Since my WeChat message volume wasn't that high, I wanted to give it a try.

## Installing NodeJS

Actually, installing NodeJS can be easily found by searching, so I'll keep it brief. I used a domestic VPS with Debian Stable installed as the server running Wechaty to avoid being banned due to WeChat remote login. However, since Wechaty works best with NodeJS v10, and because installing via official sources places some Node components in certain fixed system directories, some Node packages that call recompilation commands may cause permission issues leading to failures, I recommend using nvm to install NodeJS.

Installing NVM is very simple—just run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

Wait for the installation to complete.

After NVM is installed, enter:

```bash
nvm install v10.18.0
```

This completes the installation and configuration of NodeJS v10.18.0.

## Using Yarn

Although the README for [matrix-appservice-wechaty](https://github.com/wechaty/matrix-appservice-wechaty) states to install using `npm install -g matrix-appservice-wechaty`, during my installation process, I repeatedly encountered failures when executing node-pre-gyp while installing grpc. After extensive searching, I found that using the Yarn package manager can quickly solve this problem, so let's install Yarn first.

```bash
npm install -g yarn
```

Then install matrix-appservice-wechaty via yarn. Note that since the version is currently being rapidly updated to fix bugs, I recommend installing the next version:

```bash
yarn global add matrix-appservice-wechaty@next
```

## Installing the Required Puppet

In the matrix-appservice-wechaty program, we need to define a Puppet to indicate which WeChat backend this AppService should use for communication. Currently available backends include `Puppeteer`, `Padplus`, `Macpro`, `Mock`, and `Wechat4u`. Among them, `Puppeteer` and `Wechat4u` are based on the Web protocol, `Padplus` is based on the iPad WeChat protocol, and `Macpro` is based on the MacOS WeChat protocol. After selecting the appropriate protocol, use the following command to install:

```bash
yarn global add wechaty-puppet-backend-name
```

> Note: The backend name is all lowercase, such as `wechaty-puppet-wechat4u`
> Note 2: Some backends are paid services. Please check the deployment information for each backend.

Currently, the next version of appservice requires the next version of PadPlus when using PadPlus as the backend: `wechaty-puppet-padplus@next`

## Creating the Configuration File

First copy [config.sample.yaml](https://github.com/wechaty/matrix-appservice-wechaty/blob/master/config/config.sample.yaml) to config.yaml. I recommend creating a separate folder for it, making it convenient to put all data files in this one folder later.

```yml
domain: chatie.io
homeserverUrl: https://matrix.chatie.io
registration: wechaty-registration.yaml
```

Replace aka.cn in the example with your Matrix Synapse server address. Replace homeserverUrl with your Synapse server endpoint address. Then run the command to create the registration file.

```bash
export APP_SERVICE_ENDPOINT='http://localhost:8788'

matrix-appservice-wechaty \
  --config  config.yaml \
  --url     "$APP_SERVICE_ENDPOINT" \
  --generate-registration
```

Note: If your Synapse server and Wechaty server are not the same server, you need to set the APP_SERVICE_ENDPOINT address to the Wechaty server address, and also pay attention to firewall port opening.

> Note: If your server is on a domestic VPS in China, please be aware of filing requirements. If not filed, Matrix server connections may be blocked by your VPS service provider.

After running the above command, a file named `wechaty-registration.yaml` will be generated. Copy it to your Synapse server.

Edit Synapse's `homeserver.yaml` file, add the path to `wechaty-registration.yaml` in the `app_service_config_files` item, save and restart the Synapse server.

> Note: Each time you run `--generate-registration`, you need to recopy and restart the Synapse server.

## Starting to Run

Generally speaking, simply running the following command in the directory with `config.yaml` and `wechaty-registration.yaml` should work.

```bash
export WECHATY_PUPPET=wechaty-puppet-backend-name

matrix-appservice-wechaty \
  --config  config.yaml \
  --file    wechaty-registration.yaml
```

However, note that if you use paid or Token-required Puppet backends like PadPlus, you also need to export the corresponding variables, such as `export WECHATY_PUPPET_PADPLUS_TOKEN=xxxxxxxxxxxxxxxxxxxxx`

I created a start.sh for convenience:

> Note: padplus version requires additionally installing `qrcode-terminal` or errors will occur.

```sh
#!/bin/bash
. /home/user/.nvm/nvm.sh
export WECHATY_PUPPET=wechaty-puppet-backend-name
matrix-appservice-wechaty \
  --config  config.yaml \
  --file    wechaty-registration.yaml
```

> Note: Replace user with your username

chmod +x /path/to/config/start.sh

You can also create a systemd configuration for auto-start (if your Wechaty and Synapse are not on the same server, don't add the `After` line):

```shell
[Unit]
Description=Matrix Bridge Wechaty
After=matrix-synapse.service

[Service]
Type=simple
WorkingDirectory=/path/to/config/
ExecStart=/path/to/config/start.sh
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

Execute `systemctl daemon-reload`.

Then you can use the `systemctl enable` command and `systemctl start` command to start the Wechaty Matrix Bridge.

I only recommend using systemctl to start after debugging is complete and it can run successfully.

## Let's Go

Come to your Matrix client and initiate a **private chat** with `@wechaty:your-server`. After the Bot joins, it should prompt:

```log
This room has been registered as your bridge management/status room.
```

After seeing this prompt, enter `!login`. When using it for the first time, the Bot should prompt:

```log
You are not enable matrix-appservice-wechaty yet.
```

It will immediately prompt `I had enabled it for you.`

At this point, Wechaty is officially registered as an AppService.

Send `!login` again. If you haven't installed your specified puppet, PuppetManager will automatically install it—just wait. If installation is too slow, you can consider pressing Ctrl + C to terminate the program, then manually install it yourself with yarn before starting again.

When the puppet starts successfully, a QR code link will be generated on the Matrix side. Open and scan the QR code to complete login.

## About Logout

Just send !logout to the wechaty bot!

> Note: As of the current latest version (0.6.3), this command doesn't exist. You need the next version (0.7.2)

## Matrix-AppService-Wechaty

This communication bridge is currently in an early development state and can only solve basic message relay issues. If the other party sends a link message, the Matrix side will display a very long xml structure. Looking forward to future version updates bringing more features!

At the same time, with [Wechaty-Puppet-PadPlus](https://github.com/wechaty/wechaty-puppet-padplus), users who cannot use Web WeChat can use the iPad protocol to connect. Since I just completed the deployment, I'm not very clear about stability yet, but since this protocol is implemented through client-level protocols, I estimate it will be more stable.

Many thanks to [huan](https://github.com/huan) for developing [Wechaty](https://github.com/wechaty/wechaty), bringing more possibilities for WeChat bridging and WeChat bots!

I also recommend his [Docker-Wechat](https://github.com/huan/docker-wechat), which solves the troublesome problem of using Linux WeChat with Docker. Thinking about how I installed WeChat using CrossOver and then had a bunch of bugs when using it, I feel this is really very good.

> Author: [Liyin](https://github.com/cubesky), individual developer. Originally published on blog: [Receiving WeChat Messages Using Matrix](https://liyin.date/2020/03/01/matrix-wechat-bridge/) under CC BY-NC-SA 3.0 CN
