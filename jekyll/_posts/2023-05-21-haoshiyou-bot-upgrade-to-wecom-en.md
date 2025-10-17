---
title: "Haoshiyou Bot Upgraded to WeCom with ChatGPT Integration"
author: aishiqi
categories: article
tags:
  - chatgpt
  - haoshiyou
  - bayarea
  - ecosystem
image: /assets/2023/05-haoshiyou-bot-upgrade-to-wecom-en/logo.webp
excerpt: >
  Upgrading Haoshiyou roommate-finding bot from personal WeChat to WeCom (WeChat Work) for better stability, featuring ChatGPT integration and deployment solutions for China network restrictions.
---

Due to instability with the previous personal WeChat account, the Haoshiyou bot stopped working for a period. Recently, through conversations with Huan and Jiarui, we learned that using WeCom (WeChat Work) can reduce this risk, so we upgraded the Haoshiyou bot to a corporate account.

Corporate accounts need to be registered under a mainland Chinese entity. After opening, by transferring group ownership to the WeCom account, you can convert regular WeChat groups into corporate groups.

Setup:

We use `wechaty-puppet-service`

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
    token: 'puppet_workpro_YourToken',
  }
})
```

Set environment variables for Juzibot's discovery server

```bash
WECHATY_PUPPET_SERVICE_AUTHORITY="token-service-discovery-test.juzibot.com"
WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true
```

Notes:

- Juzibot's discovery server has unstable connections from the US. Residential networks work reasonably well, though connection issues occurred occasionally but haven't happened since. Servers rented from Digital Ocean could never connect, showing connection timeouts. So we rented an Alibaba Cloud host, where we found GitHub to be unstable, but you can push directly via SSH with the following command. ChatGPT API is also inaccessible from mainland China, more details below. MongoDB Atlas access works fine.

  ```bash
  git remote add server ssh://root@YourServerIP:~/path_to_your_project/
  git push server master
  ```

  - contact.alias() only works when the other party is also a corporate account. room.alias(contact) works normally.
  - room.memberAll() does not return users sorted by join time. We rely on this information to remove long-time inactive users, so we need to maintain this join order in a database. Actually, when you open a WeCom group, friends are sorted alphabetically rather than by join order, so the puppet might not be able to read the join order at this level. Note that when the server is shut down, newly added friends won't be in the database. You can scan all groups when the server starts, and users not in the database can be considered as having joined at that moment and added to the database. We also exported the join order from a personal WeChat account and matched it to the WeCom group based on group nicknames. Note that user IDs seen by personal WeChat accounts differ from IDs seen by WeCom for the same users.

  When the server is newly deployed without historical chat records, we can export WeChat chat history from an iPhone using this open-source software `https://github.com/BlueMatthew/WechatExporter` and customize export formats by modifying templates. For example:
  `WechatExporter/res/templates_txt`

  ```Text
    %%NAME%% (%%TIME%%):%%MESSAGE%%
  ```

  Available fields can be found by searching for `%%` in the source code.

We use ChatGPT for information processing and implementing AI customer service. In mainland China, ChatGPT cannot be accessed directly, so we created a simple proxy server using NodeJS. Below is a code example. Note that this uses HTTP protocol, which is not secure and needs encryption.

  ```javascript
    import express from 'express';
    import bodyParser from 'body-parser';
    import { ChatGPTAPI } from 'chatgpt';

    const app = express();
    app.use(bodyParser.json());

    const proxyApiKeys = {
      'RandomString': true,
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

  Client code as follows:

  ```javascript
    import axios, { AxiosResponse } from 'axios';
    const log4js = require('log4js');
    const logger = log4js.getLogger('chatgpt');

    export class ChatGPT {
        private previousMessageIdMap = {}
        private static systemMessage = ``

        public async ask(message: string, conversationId?: string) {
            try {
                let url = 'http://YourIP:3000/chatgpt';
                let request = {
                    proxyApiKey: "RandomStringAbove",
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

ChatGPT defaults to freestyle responses. For example, we're not actually added through official accounts:

![image3.webp](/assets/2023/05-haoshiyou-bot-upgrade-to-wecom-en/image3.webp)

We put Haoshiyou's introduction and our requirements for ChatGPT into the system message (the `systemMessage` mentioned above), and it works.

![image1.webp](/assets/2023/05-haoshiyou-bot-upgrade-to-wecom-en/image1.webp)

![image2.webp](/assets/2023/05-haoshiyou-bot-upgrade-to-wecom-en/image2.webp)

However, ChatGPT gives lower weight to `systemMessage` and occasionally ignores it.

The Haoshiyou bot has been running for a while now. Both Wechaty and Juzi puppet are very stable.
We will continue developing Haoshiyou bot V2, which will support more activity groups beyond housing rentals to better serve the Bay Area community.

---

> 本文也有[中文版本](/2023/05/21/haoshiyou-bot-upgrade-to-wecom/)。
