---
title: "好室友机器人升级为企业微信, 结合使用ChatGPT"
author: aishiqi
categories: article
tags:
  - chatgpt
  - haoshiyou
  - bayarea
image: /assets/2023/05-haoshiyou-bot-upgrade-to-wecom/logo.webp
---


好室友机器人由于之前个人微信号不稳定，不工作有一段时间了，最近我们和Huan，Jiarui聊天中了解到使用企业微信可以降低这个风险，于是我们将好室友机器人升级成了企业号。
企业号需要在国内挂靠国内实体企业，开通后，将群主转让给企业微信号，可以将普通微信群转换成企业群。

Setup：

我们使用 `wechaty-puppet-service`

```Text
package.json:
"wechaty": "^1.20.2",
"wechaty-puppet-service": "^1.19.9"
```

```javascript
import { WechatyBuilder} from 'wechaty'

const bot = WechatyBuilder.build({
  name: 'haoshiyou-bot',
  puppet: 'wechaty-puppet-service',
  puppetOptions: {
    token: 'puppet_workpro_你的Token',
  }
})
```

环境变量设置句子的发现服务器

```bash
WECHATY_PUPPET_SERVICE_AUTHORITY="token-service-discovery-test.juzibot.com"
WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
```

其他的和官方dingdong示例代码差不多。

句子Fork的版本会有一些新功能，例如以下新的事件：

```Text
post-comment
post-tap
room-announce
tag
tag-group
```

更多详情请看 [Diff](https://github.com/wechaty/puppet/compare/main...juzibot:wechaty-puppet:main#diff-6125e4db0556b5355b2c93d63632b29f6192003c9b3e36835d0c9f75f961fe9dR17)

如果需要这些功能的话，需要以下改动：

```Text
package.json:
"@juzi/wechaty": "^1.0.52",
"@juzi/wechaty-puppet-service": "^1.0.51",
```

```javascript
注意这里使用'@juzi/wechaty' 和'@juzi/wechaty-puppet-service'
import { WechatyBuilder} from '@juzi/wechaty'

const bot = WechatyBuilder.build({
  name: 'haoshiyou-bot',
  puppet: '@juzi/wechaty-puppet-service',
  puppetOptions: {
    token: 'puppet_workpro_你的Token',
  }
})
```

注意

- 句子的发现服务器在美国连接不太稳定，Residential网络还行，虽然中途也出现过连不上的情况，不过之后就没有发生了。在Digital Ocean租用的服务器从来就没有能连接上过，显示连接超时。于是我们租了阿里云主机，发现Github又不稳定，不过可以通过SSH直接push，命令如下。国内ChatGPT API也不能访问，后面详细说。访问MongoDB Atlas没有问题。

  ```bash
  git remote add server ssh://root@YourServerIP:~/path_to_your_project/
  git push server master
  ```

  - contact.alias() 必须要是对方也是企业号时才有用。room.alias(contact)可以正常使用。
  - room.memberAll() 返回的用户不是按照加群时间排序，我们根据这个信息来移除加群比较久的不活跃用户，需要用数据库来维护这个加群顺序。其实如果打开企业微信群，看到的好友是按照字母顺序排序的而不是加群顺序，可能puppet在这个地方就读不出来加群顺序。注意，当服务器关闭的时候，新加的好友是不在数据库中的。可以在服务器自动的时候扫描一下所有的群，不在数据库中的用户认为是此刻加入的并添加到数据库中。我们还使用个人微信号导出了加群顺序，并根据群昵称匹配到企业号群。注意个人微信号看到的用户ID和企业号所看到相同用户的ID是不一样的。

  服务器刚部署没有历史聊天记录，我们可以从iPhone手机中导出微信聊天记录，使用这个开源软件 `https://github.com/BlueMatthew/WechatExporter` 可以更改模板来自定义导出的格式。例如：
  `WechatExporter/res/templates_txt`

  ```Text
    %%NAME%% (%%TIME%%):%%MESSAGE%%
  ```

  可用字段可以在源码中搜索 `%%`。

  我们使用 ChatGPT 进行信息处理和实现 AI 客服。在国内，无法直接访问 ChatGPT，因此我们使用 NodeJS 创建了一个简单的代理服务器，下面是代码示例。请注意，此处使用的是 HTTP 协议，它不安全，需要进行加密处理。

  ```javascript
    import express from 'express';
    import bodyParser from 'body-parser';
    import { ChatGPTAPI } from 'chatgpt';

    const app = express();
    app.use(bodyParser.json());

    const proxyApiKeys = {
      '随机数': true,
    }

    let chatGPTAPIs = {};

    if (!process.env.CHAT_GPT_API_KEY || process.env.CHAT_GPT_API_KEY === "")
    {
      console.error("Please set CHAT_GPT_API_KEY env variable");
      process.exit(1);
    }

    app.post('/chatgpt', async (req, res) => {
      const requestObj = req.body;
      let proxyApiKey = requestObj.proxyApiKey;
      if (!proxyApiKeys[proxyApiKey]) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      let chatGPTAPIOptions = requestObj.chatGPTAPIOptions;
      if (!chatGPTAPIOptions) {
        chatGPTAPIOptions = {};
      }
      let message = requestObj.message;
      let sendMessageOptions = requestObj.sendMessageOptions;

      console.log("making request to chatgpt :" + JSON.stringify(sendMessageOptions) + " Message: " + message);

      chatGPTAPIOptions.apiKey = process.env.CHAT_GPT_API_KEY

      if (!chatGPTAPIs[proxyApiKey]) {
        const api = new ChatGPTAPI(chatGPTAPIOptions);
        chatGPTAPIs[proxyApiKey] = api;
      }
      const api = chatGPTAPIs[proxyApiKey];
      const chatGPTResult = await api.sendMessage(message, sendMessageOptions);

      console.log("gpt returns :" + JSON.stringify(chatGPTResult));
      res.status(200).json(chatGPTResult);
    });

    app.use((req, res) => {
      res.status(404).json({ error: 'Not Found' });
    });

    const port = 3000;
    app.listen(port,"0.0.0.0", () => {
      console.log(`ChatGPT Proxy server running on port ${port}, listening post request to "/chatgpt"`);
    });
  ```

  客户端如下：

  ```javascript
    import axios, { AxiosResponse } from 'axios';
    const log4js = require('log4js');
    const logger = log4js.getLogger('chatgpt');

    export class ChatGPT {
        private previousMessageIdMap = {}
        private static systemMessage = ``

        public async ask(message: string, conversationId?: string) {
            try {
                let url = 'http://你的IP:3000/chatgpt';
                let request = {
                    proxyApiKey: "上面的随机数",
                    message: message,
                    sendMessageOptions: {
                        systemMessage: ChatGPT.systemMessage,
                        parentMessageId: conversationId ? this.previousMessageIdMap[conversationId] : null,
                        completionParams: {
                            max_tokens: 1000,
                            model: "gpt-3.5-turbo",
                        },
                    },
                };

                const response: AxiosResponse = await axios.post(url, request);
                if (response.status == 200) {
                    let data = response.data;
                    logger.info(`ChatGPT response: ${data.text}`);
                    if (conversationId != null)
                    {
                        this.previousMessageIdMap[conversationId] = data.id;
                    }
                    return data.text;
                }
                else {
                    logger.error(`ChatGPT error: ${response}`);
                }
            } catch (error) {
                logger.error(`ChatGPT error: ${error}`);
            }
            return null;
        }
    }
  ```

ChatGPT 默认会自由发挥，例如我们并不是通过公众号添加的：

![image3.webp](/assets/2023/05-haoshiyou-bot-upgrade-to-wecom/image3.webp)

我们把好室友的介绍，以及我们对ChatGPT的要求放到系统消息（上述的`systemMessage`）中，就可以了。

![image1.webp](/assets/2023/05-haoshiyou-bot-upgrade-to-wecom/image1.webp)

![image2.webp](/assets/2023/05-haoshiyou-bot-upgrade-to-wecom/image2.webp)

不过ChatGPT对`systemMessage`的权重比较低，偶尔也会忽略。

目前好室友机器人已经运行了一段时间了，Wechaty和juzi puppet都很稳定。
我们会继续开发好室友机器人V2，将支持租房之外更多的活动群，以便更好的服务湾区小伙伴。
