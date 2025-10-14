---
title: 'Using Chatie to Implement WeChat Bot Business Logic for [Haoshiyou] Group Management'
author: xinbenlv
categories: project
tags:
  - code
  - startup
  - featured
  - real-estate
---

To help friends new to Silicon Valley find roommates and rent apartments, we established several WeChat groups in our local area.
Our basic philosophy for this project is simple focus and finish-and-go.

Our application scenario is as follows: We have several WeChat groups, divided by rental areas in the San Francisco Bay Area of Silicon Valley.
Each WeChat group consistently maintains the maximum limit of 500 people. We require friends who join the group to modify their group nicknames.
Every week, we kick out group members who don't modify their group nicknames according to requirements and the earliest members to join, implementing member turnover to ensure that the group consists of friends with recent rental needs rather than the zombie group situation common in many rental groups.

Additionally, we don't allow publishing any information unrelated to renting: advertisements, second-hand transactions, flight information, and other common spam are all considered prohibited types.
Under the joint efforts of our volunteer administrators, our groups have gained quite a good reputation among Bay Area friends for being clean and active, and are often recommended by Bay Area group members to their friends new to the Bay Area. It's also because our groups have reached a certain scale that we've attracted various marketing accounts, advertising accounts, and promotional accounts hoping to infiltrate large groups to spread advertisements.
People often enter our WeChat groups to post advertising messages and irrelevant messages. We issue warnings for such situations up to kicking them out of the group and adding them to the blacklist.

Before using bots, our volunteer administrators needed to manually log into their phones daily, accept friend requests, and then manage groups according to corresponding rules. Due to enormous group joining requests and multiple complex groups, they often had to first answer users' questions and then assign them to appropriate groups based on user intentions.
Deleting group members also required considerable time.

After learning about Chatie, we immediately used Chatie's interface to develop bots for group management work, greatly simplifying the workflow and burden of volunteer administrators. Here we introduce our business logic modules.

## Logic Modules

### 1. Automatically Accept Friend Requests

We automatically accept all user friend requests and send greeting messages. In our greeting messages, we explain our group rules and regional planning, as well as how to reply with intentions for group joining.

```js
exports = module.exports = async function onFriend(contact, request) {
  // ...
  if (request) {  // 1. request to be friend from new contact
    await request.accept();
    await contact.say(greetingsMsg);
  }
  // ...
}
```

### 2. Keyword Confirmation of User Group Joining Intentions

We use keywords to confirm user group joining intentions. After confirming which group the user wants to join, we first check if the group is full. If it's full, we clean it first, then add to the group.

```js
let maybeAddToHsyGroups = async function(m:Message):Promise<Boolean> {
  const contact = m.from();
  const content = m.content();
  const room = m.room();
  let groupType:HsyGroupEnum;
  // only to me or entry group
  if (WechatyApiX.isTalkingToMePrivately(m) || /好室友.*入口群/.test(m.room().topic())) {
    let groupToAdd:HsyGroupEnum = null;
    if (/加群/.test(content)) {
      await m.say(greetingsMsg);
      return;
    } else {
      groupToAdd = HsyUtil.getAddGroupIndentFromMessage(content);
    }
    if (groupToAdd != HsyGroupEnum.None) { // found no valid group
      // ...
      let keyRoom = await HsyUtil.findHsyRoomByEnum(groupToAdd);
      if (keyRoom) {
        await maybeDownsizeKeyRoom(keyRoom, contact);
        await keyRoom.add(contact);
      }
    }
    return true;
  }
  return false;
};

// inside of HsyUtil
public static getAddGroupIndentFromMessage = function(
    content:string):HsyGroupEnum {
  if (/南湾西|Mountain View|mtv|sv|Sunnyvale|Palo Alto|Stanford|Facebook|Google|Menlo Park/.test(content)) {
    return HsyGroupEnum.SouthBayEast;
  } else if (/南湾东|Milpitas|San Jose|Santa Clara|SJ|Campbell|Los Gatos/.test(content)) {
    return HsyGroupEnum.SouthBayWest;
  } else if (/东湾|奥克兰|伯克利|Berkeley|Fremont|Hayward|Newark/.test(content)) {
    return HsyGroupEnum.EastBay;
  } else if (...) {
    ...
  } else return HsyGroupEnum.None;
}
```

### 3. Automatic Group Member Removal Based on Group Nicknames and Join Order When Group is Full

We check each managed group, and if the number of users exceeds a threshold (e.g., 450 people), we trigger the group downsizing function.
First, we look for group members who haven't modified their group nicknames according to requirements, skipping administrators, group owners, and the bot itself.
We select several people from them (e.g., 20 people), then select several people from the earliest joined users (e.g., 10 people) as the removal list. We announce in the group that we're about to remove people and the reasons for removal (not modifying group nicknames and earliest joined), then privately tell each person being removed the specific reason for removal, and then execute the removal.

```js
let maybeDownsizeKeyRoom = async function(keyRoom: Room, c:Contact) {
  if (/老友/.test(keyRoom.topic())) return;
  if (keyRoom.memberList().length >= groupDownSizeTriggerThreshold) { // triggering
    await keyRoom.say(hsyGroupClearMsg);
    for (let i = 0; i < keyRoom.memberList().length - newComerSize/* never newComer */; i++) {
      let c:Contact = cList[i];
      if (c.self()) continue; // never does anything with haoshiyou-admin itself.
      let groupNickName = WechatyApiX.getGroupNickNameFromContact(c);
      if (/^(管|介|群主)-/.test(groupNickName) || /管理员/.test(c.alias())) {
        // pass, never remove
      } else if (/^(招|求)租/.test(groupNickName)) {
        // good format, but need to rotate
        potentialRotationList.push(c);
      } else {
        noGroupNickNames.push(c);
      }
      if (noGroupNickNames.length >= shouldRemoveSize) {
        shouldRemoveList = noGroupNickNames;
        break;
      } else if (noGroupNickNames.length + potentialRotationList.length >= shouldRemoveSize) {
        shouldRemoveList = noGroupNickNames
            .concat(potentialRotationList.slice(0,
                shouldRemoveSize - noGroupNickNames.length));
        break;
      }
    }
    if (shouldRemoveList.length > 0) {
      await c.say(`群里有点儿满，我先清一下人哦`);
    }
    await Promise.all(shouldRemoveList.map(async (c:Contact) => {
      let msg = (`亲，我们要清人了哦`);
      await c.say(msg);
      await keyRoom.del(c);
    }));
  }
};
```

### 4. Adding Users to Blacklist Based on Administrator Messages

Our current process for adding users to the blacklist in WeChat is: if a user posts irrelevant information in the group or doesn't modify their group nickname for a long time, our administrators can send messages in the group saying "@某用户，请不要发无关消息" (Don't post irrelevant messages) or "@某用户，请修改群昵称" (Please modify your group nickname).
Such commands will first be repeated by the bot "感谢管理员张三，@某用户请不要发无关消息" (Thanks to administrator Zhang San, @某用户 please don't post irrelevant messages) to increase the administrator's authority in the group. At the same time, the bot will privately message the administrator asking whether to add this user to the blacklist and remove them. If the administrator confirms, it will start the blacklist addition and removal logic. Currently, we manage the blacklist by adding `#黑名单` to a friend's remark in the bot's WeChat.

Logic as follows:

```js
let maybeBlacklistUser = async function(m: Message):Promise<Boolean> {
  if (! await HsyUtil.isHsyAdmin(m.from())) {
    return false; // Not an admin
  }
  let admin = m.from();
  if(WechatyApiX.isTalkingToMePrivately(m)
      && /加黑名单/.test(m.content())) {
    // find the last one being marked blacklist by this admin
    let blackListObj = GLOBAL_blackListCandidates[admin.alias()];

    // not able to find a blacklist candidate.
    if (blackListObj === undefined || blackListObj === null) return false;
    if (blackListObj !== null && blackListObj !== undefined) {
        let indexOfCandidate = m.content().slice(4); //"加黑名单1"取编号
        let contactToBlacklist:Contact = blackListObj.candidates[indexOfCandidate];
        await HsyUtil.addToBlacklist(contactToBlacklist);
        let teamRoom = await HsyUtil.findHsyBigTeamRoom();
        await HsyUtil.kickFromAllHsyGroups(contactToBlacklist);
        await admin.say(`搞定!`);
    }
    return true;
  } else if (m.room() !== null &&
      /好室友/.test(m.room().topic()) &&
      /无关|修改群昵称/.test(m.content()) &&
      /^@/.test(m.content())) {
    let mentionName = m.content().slice(1)/*ignoring@*/
        .replace(" "/*Space Char in Chinese*/, " ").split(" ")[0];
    let foundUsers = findMemberFromGroup(m.room(), new RegExp(mentionName));
    if (foundUsers.length > 0) {
      // Repeat the warning from the admin
      await m.room().say(`感谢管理员@${m.from().name()}\n\n${m.content()}`);
      let buffer = `管理员 ${m.from().name()}，你好，你刚才在${m.room().topic()}这个群` + `里警告了用户@${mentionName}，符合这个名称的群内的用户有：\n`;
      for (let i = 0; i < foundUsers.length; i++) {
        let candidate = foundUsers[i];
        buffer += `${i}. 昵称:${candidate.name()}, 备注:${candidate.alias()}, ` +
            `群昵称: ${WechatyApiX.getGroupNickNameFromContact(candidate)} \n`;
      }
      buffer += `请问要不要把这个用户加黑名单？五分钟内回复 "加黑名单[数字编号]"\n`;
      buffer += `例如 "加黑名单0"，将会把${foundUsers[1]} ` +
          `加入黑名单:${WechatyApiX.contactToStringLong(foundUsers[0])}`;
      await m.from().say(buffer);
      GLOBAL_blackListCandidates[m.from().alias()] = {
        time: Date.now(),
        candidates: foundUsers
      };
    } else {
      await admin.say(`管理员您好，您刚才在"${m.room().topic()}"群里要求踢出的用户"${mentionName}" `+
          `我们没有找到，请在确认该用户仍然在该群里，并且请在同一个群尝试at他的昵称而不是群昵称。`);
    }
    return true;
  }
  return false;
};
```

## Postscript

In this article, we introduced how we applied Chatie to implement a series of daily management tasks for the [Haoshiyou] rental group series, greatly simplifying administrators' workload and improving and enhancing user experience in the groups.
We will introduce in future articles how we use Chatie's programmable interface to achieve data and information connectivity between WeChat and our developed website and APP.

At the time of writing this article, the haoshiyou-bot code described in this article is located
[here](https://github.com/xinbenlv/haoshiyou-bot/tree/5f4dc109fafb5bf22996e53560e5a2ee51b4da89)

---

> Chinese version of this post: [用Chatie实现微信机器人商业逻辑之【好室友】群管理篇]({{ '/2017/04/16/how-chatie-is-used-in-haoshiyou-project/' | relative_url }})
