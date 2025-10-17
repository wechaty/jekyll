---
title: "WeChat Group Robot - Bible Reading Assistant"
author: kkdev163
categories: project
tags:
  - nodejs
  - chatroom-tool
  - bible
  - other
image: /assets/2021/05-wechaty-bible-chatbot-en/logo.webp
excerpt: "A WeChat bot that automates daily Bible reading article distribution, tracks member check-ins, and provides Bible content search features for Christian groups."
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/05/02/wechaty-bible-chatbot/).

The author will review and summarize the product development process of the WeChat Group Robot - Bible Reading Assistant from the aspects of development intention, product functional features, technical solutions, and insights, hoping to be helpful to other developers.

## 2. Development Intention

The author is a member of a Christian WeChat group. The group requires someone to manually send "article" links on time every day and count the number of group members who have "read" them. Initially, our solution was to manually send messages on time, and group members would go to online collaboration tools such as "Shimo Docs" to manually fill in "read". Although this solution saved the workload of counting people, it still had several shortcomings:

- Group members have a wide age distribution, including members in their 60s and 70s. Making them jump to third-party applications to manually fill in information has high operational costs, resulting in low check-in rates.
- Checking in directly with text in the group can motivate other members, while jumping to third-party applications to check in weakens this interactivity.
- Manual timed sending every day is a significant challenge for the sender in the long run.

So we hoped to develop a WeChat Robot - Bible Reading Assistant to help achieve the following functions:

- 1. Send article links to WeChat groups on time
- 2. Automatically perform statistics and check-ins based on group members' chat information (read, completed), etc.

Thanks to [Wechaty](https://wechaty.js.org/), based on the Wechaty SDK, the author implemented the above core requirements of the Bible Reading Assistant in one evening, freeing up hands. Currently, the Bible Reading Assistant is being used in 6 WeChat groups, with the longest service time of 2 months and serving 200+ people. (I dare not actively promote it, the reason will be explained later)

## 3. Product Features

The core function was implemented in just one evening, but the author spent about one month (about 3000 lines of TypeScript code) enriching the peripheral functions of the Bible Reading Assistant. The complete functions are roughly divided into the following categories:

- 1. Scheduled article push (supports multiple Christian publications)
- 2. Group member check-in (based on group member chat, count check-in numbers, summarize and generate Excel tables)
- 3. Get article links (get online links to multiple Christian publications)
- 4. Search article content (search content of Christian publications)

### Function Introduction

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-01.webp)

### More Features

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-02.webp)

[More Features Long Image](/assets/2021/05-wechaty-bible-chatbot-en/03-03.webp)

### Article Push

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-04.webp)

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-05.webp)

### Check-in Statistics

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-06.webp)

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-07.webp)

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-08.webp)

### Search Article Content

![image](/assets/2021/05-wechaty-bible-chatbot-en/03-09.webp)

## 4. Technical Implementation

### Wechaty

Currently, the lowest entry cost should be to only use [puppet-services](https://wechaty.js.org/docs/puppet-services/). The token provider I use is [Paimon](https://wechaty.js.org/docs/puppet-services/paimon). Register with a phone number to get a 7-day token.

### Deployment Solution

I went through the following deployment solutions:

- 1. Deploy wechaty application on idle computer + database (AWS DynamoDB Hong Kong node). I used DynamoDB because it is Amazon Cloud's free database product - wanted to use it for free.
- 2. Alibaba Cloud Lightweight Application Server (1C 2G 40G-SSD Hangzhou node) deploys wechaty application + database (AWS DynamoDB Hong Kong node). Alibaba Cloud server is 98 yuan per year (new user promotion price), can be bought for three consecutive years. But Alibaba Cloud Hangzhou node connecting to Amazon Hong Kong node sometimes has delays of tens of seconds. I tried Alibaba Cloud Hong Kong node - database requests were faster, but requests sent to puppet-services sometimes had delays of several seconds.
- 3. Alibaba Cloud deploys wechaty application + database changed to server's built-in MongoDB. This way, accessing puppet-services and database is very fast. Since both databases are document-oriented, the migration cost was not too high. It took about a day to do database migration + adaptation layer code.

Since content search was needed, ElasticSearch was also deployed on the Alibaba Cloud server. Alibaba Cloud at 98 per year is truly great value.

### Implementation Ideas

The code is open source in this [repository](https://github.com/kkdev163/wechaty-bible-robot). Those interested can refer to it. This section mainly introduces the directory structure

``` bash
├── README.md
├── deploy.sh  Deployment script
├── dev.sh  Development environment script
├── ecosystem.config.js pm2 process management configuration
├── nodemon.json Local development configuration
├── package-lock.json
├── package.json
├── prod.sh Production environment script
├── server
│   ├── index.ts  wechaty main entry
│   └── src
│       ├── actions  Implementation of action commands
│       │   ├── _7cthSchedule.ts
│       │   ├── bibleSchedule.ts
│       │   ├── commit.ts
│       │   ├── index.ts
│       │   ├── pushSchedule.ts
│       │   ├── remind.ts
│       │   ├── search.ts
│       │   ├── smdjSchedule.ts
│       │   └── static.ts
│       ├── bible  Bible-related resources
│       │   ├── _7cth.ts
│       │   ├── plan.ts
│       │   ├── shareRes.ts
│       │   └── smdj.ts
│       ├── constants.ts  
│       ├── controller HTTP service controllers
│       │   ├── index.ts
│       │   ├── proxy.ts
│       │   ├── search.ts
│       │   ├── setting.ts
│       │   └── utils.ts
│       ├── ddb Database-related
│       │   ├── commands
│       │   ├── index.ts
│       │   ├── mongoDb.ts
│       │   ├── schema.ts
│       │   ├── script
│       │   └── syncModels.ts
│       ├── handleMessage.ts Message processing
│       ├── http.ts HTTP server entry
│       ├── interface
│       │   └── index.ts
│       ├── schedule.ts Scheduled task entry
│       ├── service Services corresponding to HTTP services
│       │   ├── esClient.ts
│       │   ├── search.ts
│       │   └── setting.ts
│       └── util Utility function library
│           ├── bibleData.json
│           ├── bibleUtils.ts
│           ├── canvas.html
│           ├── devUtils.ts
│           ├── drawBible.html
│           ├── drawUtils.ts
│           ├── formatUtils.ts
│           ├── index.ts
│           ├── smdj-es-doc
│           ├── smdjStats
│           ├── smdjUtils.ts
│           ├── songUtils.ts
│           ├── timeUtils.ts
│           └── wxUtils.ts
```

## 5. Insights and Reflections

### First Time Writing Code for Myself

Most of the code I wrote before was for learning and work (making money). This time, I wrote code to free my hands and facilitate friends around me. My mindset changed from making money to dedication. I found that I rediscovered the passion and enthusiasm for writing programs. During the development of the Bible reading robot, I stayed up all night several times. Moreover, after the function went online, the timely feedback and sense of self-satisfaction were very pleasant.

This also made me realize that writing code is not only a job, but indeed a practical life skill and specialty.

### WeChat-side Risks

During the development stage, I once actively kicked the robot account out of the test group and found that the Provider Service threw an error. To reproduce this exception, I repeatedly kicked this account out of the test group. Then after a while, I received a WeChat risk control notice, indicating that the account was complained about by multiple people and had behavior of harassing users. So everyone should try not to kick the robot out of the group. It's best to use the active exit method to avoid WeChat risk control.

After changing to a new WeChat account, it served for less than 2 months and was found to be kicked offline by WeChat. When logging in again, it prompted the use of WeChat plug-ins, unofficial clients, or simulators. It's unclear whether it's that the provider service solution was detected in large numbers, or just the author's WeChat account was complained about...
(/assets/2021/05-wechaty-bible-chatbot-en/04-01.webp)

The author's original intention of developing the robot was to free up manpower. In fact, the more WeChat groups use it (free of charge), the higher the value of developing the robot for me. But due to the risk of WeChat account bans, I currently dare not actively promote it, relying only on word-of-mouth from group members.

### 80/20 Principle

As mentioned above, the core function was implemented in one evening. The remaining time was spent enriching various peripheral functions. But to be honest, these peripheral functions are all used by me personally, with very low frequency, but they took up more than 80% of my overall development time.

### Interaction Friendliness

Since the Bible reading robot has some functions that need to output long paragraphs of text, considering reading friendliness and preventing old phones from being flooded with large blocks of text, the Bible reading robot uses the node-canvas rendering engine and implements simple text layout, sending large blocks of text to users in the form of images.

### Convenience vs. Universality

In order to make functions more universal, the development of some functions often starts from the programmer's perspective, providing multiple parameterized configurations, but this increases the cognitive cost for users. For example, the Bible Reading Assistant provides the following command

```@Bible Reading Assistant Create Reading Plan Genesis 1~Malachi 4 90 days```

This command contains the following parameters: "starting book, starting chapter, ending book, ending chapter, reading days". A more convenient approach is to package it into the following command

```@Bible Reading Assistant Create Reading Plan Old Testament 90 days```

In addition, the author also tried to develop an H5 page. When group members enter

```@Bible Reading Assistant Group Settings```

It returns the H5 page link of the group settings. This way, configuration through the H5 page can facilitate users. But at the same time, it also introduces security issues: any group member can open the H5 page and can arbitrarily delete and change group configurations. If this problem is to be prevented, additional login and authentication development is needed. In comparison, using group chat to enter commands is under the supervision of the entire group, and no one will mess around. So although the H5 settings page was developed, it was not opened to users.

> Author: [kkdev163](https://github.com/kkdev163), Software Development Engineer

---

> Chinese version of this post: [wechaty bible chatbot]({{ '/2021/05/02/wechaty-bible-chatbot/' | relative_url }})
