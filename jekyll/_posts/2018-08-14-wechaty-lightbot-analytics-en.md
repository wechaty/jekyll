---
title: "Lightbot Statistical Analysis Management Platform"
author: zhoumh1988
categories: project
tags:
  - analytics
  - featured
  - utility
  - ecosystem
image: /assets/2018/wechaty-lightbot-logo-en.webp
excerpt: >
  Lightbot is a comprehensive WeChat group management platform built with Wechaty, featuring auto-reply, keyword management, violation detection, user analytics, and chat data visualization for effective community operations.
---

Thanks to @lijiarui for inviting me to share our LIGHTBOT statistical analysis management platform. I hope it can help developers use Wechaty to provide more business solutions.

I'm just starting to learn Node.js, so the code is relatively basic. Please forgive me. 😄

## Project Introduction

> The Lightbot Statistical Analysis Management Platform will play two main roles in the Lightchain project WeChat groups: **maintenance management** and **data extraction**. The bot will provide simple content replies, including automatic friend acceptance and auto-invitation to groups based on keyword replies. These two features will ensure that investor group join requests are promptly processed. For daily group maintenance, the bot will record users' violation replies, warn after 3 violations and then remove them. Additionally, it will provide automatic keyword replies for common questions during non-working hours. These two features ensure 24/7 uninterrupted group maintenance. It also involves keyword management, including regular keywords and violation keywords, which can be set by administrators in the backend and adjusted in time according to the group chat environment and project progress. For violating users, the backend will also keep records for administrators to remind and handle.
> In terms of data and personnel management, the Lightbot Statistical Analysis Management Platform will calculate and analyze group members based on their replies, including the overall daily, weekly, and monthly activity of users and administrators, facilitating targeted operations and management within the group. In terms of text, statistics will also be performed, specifically reflected in word count, which will control the quality of group chats. In user analysis, backend data will assist in summarizing user profiles, including gender, region, etc. In terms of chat habits, it will also summarize reply times, etc., facilitating administrators to make more targeted group chat replies. In the bot's backend, specific chat records of multiple WeChat groups can be viewed, and role setting functions are provided, including users, administrators, shills, etc. These two functions will enable administrators to view specific chat content for each role in each group in the backend, while capturing complete chat records while collecting statistical data.

The entire project is divided into 4 major modules:

* Lightbot robot (completed)
* API interface service (50% completed)
* Web display interface (50% completed)
* Cron scheduled tasks (under development)

## Lightbot Features

### Automatic Group Information Extraction

> By iterating through user-fixed groups, extract group information and group member information. And automatically extract users' text and image messages.
>
> We iterate through the groups to extract while the WeChat bot logs in, perform insert or update operations after successful extraction, then extract group member information, and similarly perform insert or update operations after successful extraction.
The purpose of caching user information is for later user activity statistics, and it can also display dialogue modes for selectively screened users.

```javascript
const bot = new Wechaty({ puppet: 'padchat' })
const default_rooms = ['Test1','Test2','Test3'];

bot.on('login', async user => {
   default_rooms.forEach(async topic => {
        let r = await bot.Room.find({
            topic: topic
        });
        console.log(`The room ${topic} is ${isNotEmpty(r)}`);
        if (r) {
            saveRoom(r);
        }
    })
})
```

#### Code

```javascript
// Save group information
const saveRoom = async function (room) {
    let record = {};
    record.id = room.id;
    record.topic = await room.topic();
    let members = await room.memberList();
    record.member_num = members.length;
    Query.saveRoom(record);
    members.forEach(async c => {
        if (c && !c.self()) {
            saveUser(c, room.id);
        }
    });
}

// Save user information
const saveUser = async function (contact, roomid) {
    Query.isExisted(contact.id, roomid, async res => {
        if (res === false) {
            return;
        }
        try {
            if (roomid) {
                let user = new User(contact);
                user.setRoomid(roomid);
                user.setGender(contact.gender());
                if (isNotEmpty(res) && parseInt(res.id || 0) !== 0) {
                    user.setId(res.id);
                    if (isEmpty(res.name + '')) {
                        Query.syncContactName(user, res => {
                            info.info(`Syncing user ${contact.name()} nickname`);
                        });
                    }
                    if (res.avatar == null || res.avatar == 0) {
                        let avatar = await contact.avatar();
                        avatar = await avatar.toDataURL();
                        Query.insertImage(avatar, imgId => {
                            user.setAvatar(imgId);
                            Query.syncContactAvatar(user, res => {
                                info.info(`Syncing user ${contact.name()} avatar`);
                            });
                        })
                    }
                } else {
                    let avatar = await contact.avatar();
                    avatar = await avatar.toDataURL();
                    Query.insertImage(avatar, imgId => {
                        user.setAvatar(imgId);
                        Query.addUser(user, res => {
                            info.info(`Adding user ${contact.name()} information`);
                        });
                    })
                }
            }
        } catch (e) {
            err.error(e.message);
        }
    });
}
```

> Where Query is a database storage utility class I wrote
>
> For user avatars, I use base64 encoding to store them in the database, so I first save the user avatar, then associate it with the user table. All images in the entire project are stored this way. Given that the string is too long after base64 encoding, I extract it separately into a table for storage and associate it with the main tables through IDs.

### Intelligent Reply

* We listen to user messages and make intelligent replies based on them. Since we want to do word count statistics to distinguish between good and bad members, we only extract text and image messages. (For images, we plan to introduce AI recognition functionality later to automatically analyze images.)
* The management platform has a keyword management function where you can set keyword content yourself, supporting fuzzy matching and exact matching. We also added sensitive word filtering - any user who steps on the mine more than 3 times, sorry~ goodbye! The main purpose of this function is to ensure a harmonious group environment.
* Our intelligent reply doesn't work 24 hours a day, it's just to reduce the workload of our operations staff, only working when they're resting, achieving unmanned group management.

#### Business Code

```javascript
// Auto-reply messages
bot.on('message', async function (message) {
    if (message.self()) {
        return
    }
    const content = message.text()
    const sender = message.from()
    const room = message.room()

    if (message.type() !== Message.Type.Text && message.type() !== Message.Type.Image) {
        info.info(`Message type: ${message.type()}, content=${content}`);
        return
    }
    let topic = room ? await room.topic() : null;
    if (room && default_rooms.indexOf(topic) != -1) {
        try {
            // Check if it's a new user, if so save to database
            saveUser(sender, room.id);
        } catch (e) {
            err.error(`saveUser error When get message. Error is : ${e}`);
        }
        try {
            // Record chat information
            if (message.type() == Message.Type.Image) {
                // Store image
                let filebox = await message.toFileBox();
                let msgContent = await filebox.toDataURL();
                Query.addChat(msgContent, sender.id, room.id, 5);
            } else {
                // Store text
                Query.addChat(content, sender.id, room.id, 6, async chatId => {
                    // Check if reply content violates rules
                    Query.isFoul(content, chatId, async kid => {
                        if (kid != 0) {
                            // Record and check user violation count
                            Query.recordFoul(sender.id, room.id, chatId, kid, async times => {
                                if (times > 2) {
                                    await room.say(`You have violated rules 3 times!`, sender);
                                    await room.del(sender);
                                } else {
                                    await room.say(`Your reply content has violated rules. ${3-times} more violations will result in removal from the group.`, sender);
                                }
                            });
                        } else {
                            let now = moment();
                            // Check if it's within bot working hours
                            if (now.isAfter(rest_time[0]) && now.isBefore(rest_time[1])) {
                                // Check if keyword was triggered
                                Query.queryKeyword(content, chatId, 1, async reply => {
                                    await room.say(reply, sender);
                                });
                            }
                        }
                    });
                });
            }
        } catch (e) {
            err.error(`When save message. Error is ${e}`);
        }
    }
})
```

### Auto Accept Friends and Reply Messages

To reduce the processing burden on operations staff for new user applications, we used Wechaty to implement automatic friend acceptance and message reply functions, instructing users on the next steps and allowing them to self-join groups by replying with specified content.

```javascript
bot.on('friendship', friendship);
```

#### Related Code

```javascript
const friendship = async friendship => {
    if (friendship.type() === Friendship.Type.RECEIVE) { // 1. receive new friendship request from new contact
        const contact = friendship.contact()
        let result = await friendship.accept()
        if (result) {
            let msg = `Hello, Lightchain Assistant welcomes you!
Reply "Join Lightchain Group" to join the Lightchain WeChat group. Reply "Contact Assistant" and the assistant will reply to you later.
Lightchain is the world's first public blockchain with all three elements: "security, high performance, and decentralization."
Please follow Lightchain's other communities and promotional channels:
Telegram: t.me/lightchain_cn
Official Sina Weibo: LightChain
Yizhibo ID: 346346982
Trading platforms:
OKEx: www.okex.com
IDAX: www.idax.mn
KKcoin: www.kkcoin.com`;
            contact.say(msg);
            info.info(`Request from ${contact.name()} is accept succesfully!`)
        } else {
            err.error(`Request from ${contact.name()} failed to accept!`)
        }
    } else if (friendship.type() === Friendship.Type.CONFIRM) {
        // 2. confirm friendship
        info.info(`new friendship confirmed with ${contact.name()}`)
    }
}

bot.on('message', async function (message) {
  ...
  if (content == 'Join Lightchain Group' && room == null) {
        Query.queryRoomRandom(async res => {
            const room = bot.Room.load(res.roomid);
            if (room) {
                let topic = await room.topic();
                try {
                    await room.add(sender);
                    await room.say(`Welcome ${sender.name()} to join ${topic}`, sender);
                } catch (e) {
                    err.error(`Can't join room. ${e}`);
                    console.error(e)
                }
            }
        });
        return
    }
  ...
});
```

> Listen for friend requests, automatically accept them, and prompt for next steps.
>
> When listening to messages, if it exactly matches "Join Lightchain Group" and is sent directly to the bot, it will join groups based on group member count ranking.

## Statistical Analysis Platform

![Login Interface](/assets/2018/wechaty-lightbot-1-en.webp)

### Architecture Design

> Rendering engine is React
>
> Frontend framework uses Alibaba's Ant Financial's open source [Ant Design](https://ant.design/).
>
> Overall architecture is modified based on [Ant Admin](https://github.com/zuiidea/antd-admin).
>
> Database uses MySQL 8.0
>
> Service is a Node server I wrapped myself.

### Business Functions

> Currently only management functions for each module are implemented
>
> Statistics-related functions will be completed by the end of the month. I'll update the blog then. Thanks for your support.

#### Keyword Management

> Keyword pagination query
>
> Keywords support exact matching and fuzzy matching, with exact matching prioritized.
>
> Supports query condition filtering

![Sensitive Word Management](/assets/2018/wechaty-lightbot-2-en.webp)

#### Sensitive Word Management

> Management of sensitive words

![Sensitive Word Management](/assets/2018/wechaty-lightbot-3-en.webp)

#### Chat Management

##### Chat Records

> Pagination query based on group, user role, and time

![Chat Records](/assets/2018/wechaty-lightbot-4-en.webp)

##### Dialogue Mode

> Data filtering based on group, specific users, and time
>
> Filter out redundant personnel's messages, only showing filtered users' chat records

![Chat Records](/assets/2018/wechaty-lightbot-5-en.webp)

#### User Management

> Quickly view user basic information
>
> Set user roles (user, shill, administrator) for group activity analysis.

![User Management](/assets/2018/wechaty-lightbot-6-en.webp)

#### Group Management

> View group information
>
> Set responsible account (this is set to reflect operations staff performance level)

![User Management](/assets/2018/wechaty-lightbot-7-en.webp)

#### Statistical Analysis

Function under development, stay tuned...

> Author: [@LittleStrong](https://github.com/zhoumh1988), WEB Development Manager at [iTrustdata](http://itrustdata.com/), Love digging holes and filling them 😝

---

> 本文也有[中文版本](/2018/08/14/wechaty-lightbot-analytics/)。
