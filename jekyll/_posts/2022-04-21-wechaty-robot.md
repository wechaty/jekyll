---
 title: "基于开放 API 封装 Wechaty 接口下的虚拟币行情机器人"
 author: sennpang
 categories: article
 tags:
   - blog
   - wechaty
   - study
   - Robot
   - introduction
 image: /assets/2022/04-wechaty-coin-robot/robot.jpeg
---

## 基于开放 API 封装 Wechaty 接口下的虚拟币行情机器人

- 方案描述：
  - 安装必要插件, 设置环境变量, 启动wechaty, 实现 puppet 上各个类型的消息接口
  - 通过wechaty onMessge 事件读取消息
  - 通过消息中关键词调用 API 接口查询虚拟币信息
  - 组合信息发送到当前聊天页面
- 熟悉技术栈
  - NodeJS, TypeScript
  - 阅读 Wechaty API 相关文档
- 完成文本信息的收发 puppet
  - 将文本信息的收发结合到ipadlocal-puppet中
  - 搭建项目基础框架

- 开发环境
  - Node: v17.9.0

### 整体流程

package.json 相关依赖
```json
"dependencies": {
    "axios": "^0.26.1",
    "dotenv": "^10.0.0",
    "fs": "^0.0.1-security",
    "jshint": "^2.13.4",
    "qrcode-terminal": "^0.12.0",
    "request-promise": "^4.2.6",
    "wechaty": "^0.73.8",
    "wechaty-plugin-contrib": "^0.14.23",
    "wechaty-puppet": "^0.47.8",
    "wechaty-puppet-mock": "^0.31.3",
    "wechaty-puppet-oicq": "^0.1.6",
    "wechaty-puppet-padlocal": "^0.4.2",
    "wechaty-puppet-wechat": "^0.30.1",
    "wechaty-puppet-wechat4u": "^0.19.3",
    "wechaty-puppet-whatsapp": "^0.3.3",
    "wechaty-puppet-xp": "^0.7.2"
  },
  "devDependencies": {
    "@chatie/eslint-config": "^0.14.1",
    "@chatie/git-scripts": "^0.6.2",
    "@chatie/tsconfig": "^0.20.2",
    "check-node-version": "^4.1.0",
    "cross-env": "^7.0.3",
    "is-pr": "^2.0.0",
    "npm-run-all": "^4.1.5",
    "tstest": "^0.7.2"
  },
```

处理消息回复相关代码
```js
async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())
  log.info('StarterBot', msg.text())

  const msgText = msg.text()
  if (msgText.indexOf('-') === 0) {
    const coinTag = msgText.replace('-', '')
    const result = await coinBot(coinTag)
    if (!result) {
      await msg.say(' 未找到该信息, 请重新输入')
      return
    }

    // 过滤不需要的字段
    const filter = ['s', 'S', 'T']
    const responseText:string[] = []
    for (const [i, v] of Object.entries(result)) {
      if (filter.includes(i)) {
        continue
      }

      responseText.push(paraMap[i] + ':' + v)
    }
    await msg.say(responseText.join('\n'))
  }

  if (msgText === 'ding') {
    await msg.say('dong')
  }
}
```

通过接口获取数据代码
```js
async function coinBot (tag:string) {
  let response = null
  const today = getDate()
  tag = tag.toUpperCase()
  // 可以通过修改这个时间, 缓存相关结果, 防止 api 被频繁调用
  const filePath = './result_' + today + '.json'
  if (fs.existsSync(filePath) {
    const data = fs.readFileSync(filePath)
    const fileJson = JSON.parse(data.toString())
    return fileJson[tag]
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        response = await axios.get('https://data.mifengcha.com/api/v3/price', {
          headers: {
            'X-API-KEY': API_KEY,
          },
        })
      } catch (ex) {
        // error
        response = null
        reject(response)
      }

      if (response) {
        // success
        const priceJson:responseData = response.data
        const newPriceJson:responseData = {}
        let tagPriceInfo = {}
        for (const [, item] of Object.entries(priceJson)) {
          // 用 tag 做索引, 方便下次直接返回结果
          const itemTag = item.S.toUpperCase()
          if (itemTag === tag) {
            tagPriceInfo = item
          }
          newPriceJson[itemTag] = item
        }

        fs.writeFile(filePath, JSON.stringify(newPriceJson), function (err) {
          if (err) {
            return console.error(err)
          }
        })
        resolve(tagPriceInfo)
      }
    })
  }
}
```
## 最后效果

![fe5ce357110efd60b8c703ccba9805d5](/assets/2022/04-wechaty-coin-robot/fe5ce357110efd60b8c703ccba9805d5.jpg)

![94546d0603828f51f60646fc51dee993](/assets/2022/04-wechaty-coin-robot/94546d0603828f51f60646fc51dee993.jpg)
