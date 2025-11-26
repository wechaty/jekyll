---
title: "Party Game Bot"
author: osindex
categories: project
tags:
  - nodejs
  - padplus
  - game
  - redis
  - sqlite
  - knex
  - featured
  - ecosystem
image: /assets/2020/im-game-robot/qrcat.webp 
---

> This post is also available in [Chinese](/2020/06/06/wechaty-game-bot/)

Several years ago, when people started sending New Year's greetings via WeChat, I experimented with a bot based on vbot. I wanted to send customized greetings to all friends whose alias wasn't empty. However, after sending fewer than 10 messages, my WeChat web interface was banned. I helplessly tasted the tears of lacking technical skills and being blocked.

As a developer, why should we do manually what can be automated?

## Project Description

A few days ago, I stumbled upon Wechaty while browsing, which rekindled my idea of creating a bot. This time, I wanted to make an entertainment-focused bot~

### Game Features

This development includes a "Who is the Spy" mini-game. The room host cannot set game roles and the number of players—at least 4 participants are required. After each round, roles are reassigned, adding randomness and fun. [Scan the QR code at the bottom and send `ding` to automatically add friends and try it out~]

```log
Assuming total players = ALL
Civilians [P]: Default is half of total players + 1, rounded down
Spies [W]: Default is random from 1 to total players - civilians
Blank [B]: ALL - P - W
Extra allocation: If W > 3, reassign by randomly reducing 0 or W - 2 people, adding reduced count to P
Therefore, typical player distributions are: 3/1/0, 3/1/1, 3/2/0, 4/1/1, 4/2/0....
```

Game rules:

```log
Game ends when:
Surviving players / total players <= 1/2, i.e., 2/4, 2/5, 3/6, 3/7, 4/8
Victory conditions:
1. Civilians eliminate all spies and blanks → Civilians win
2. Spies survive until game end → Spies win
3. All spies are eliminated but blanks still survive → Blanks win
```

Here are some code snippets explaining the logic.

```javascript
/**
 * Define current round game role counts
 * @param  {Number} playLength [Total number of players]
 * @return {Array}             [Specific numbers for civilians, spies, and blanks]
 */
Word.defRoleNum = function (playLength) {
    let Civilian, Undercover = 0
    Civilian = parseInt(playLength / 2) + 1 // Half + 1
    Undercover = randomNum(1, playLength - Civilian) // Random spy count
    if (Undercover > 3) { // If spies > 3
        const rand = randomNum(0, Undercover - 2)
        Civilian += rand // Keep at least 1 spy, others go to civilians
        Undercover -= rand
    }
    const Blank = playLength - Civilian - Undercover // Blank count
    return [Civilian, Undercover, Blank];
}
// Define current round player roles
Word.defTurn = function (playsList) {
    const playLength = playsList.length
    if (playLength < 4) {
        return
    }
    const roles = this.defRoleNum(playLength)
    const roleList = deepClone(roles)
    const randomWord = randomNum(1) ? this.randomWord() : this.randomWord().reverse()
    // Using Chinese characters directly instead of conversion
    let role = '平民';
    let word = '';
    let newPlaysList = []
    for (var i = 0; i < playLength; i++) {
        var index = randomNum(playsList.length - 1); // Random index
        if (roles[2]) {
            role = '白板';
            word = '';
            roles[2]--;
        } else if (roles[1]) {
            role = '卧底';
            word = randomWord[1];
            roles[1]--;
        } else {
            role = '平民';
            word = randomWord[0];
        }
        playsList[index].role = role
        playsList[index].word = word
        // Sort by order
        newPlaysList.push(playsList[index])
        playsList.splice(index, 1); // Remove randomly selected element from arr
        // console.log(roles)
    }
    // Sort
    newPlaysList.sort((a, b) => {
        return a.self_id - b.self_id
    })
    const first = randomNum(1, newPlaysList.length)
    return { roleList, playsList: newPlaysList, first }
}
```

## Project Usage

### Directory Structure

- `config` folder contains common configuration files and `flyio` request-related configurations
- `imgs` stores related images
- `listeners` stores bot initialization event handlers (modularized)
  - `games` game module
    - `iswho.js` Who is the Spy core module
  - `on-friendship.js` handles friend requests
  - `on-login.js` handles login
  - `on-message.js` handles user messages and group messages
  - `on-scan.js` handles login QR code
  - `on-work.js` performs additional tasks
- `schedule` encapsulates the `node-schedule` library for scheduled tasks
- `migrations` database migration files
- `api` stores all data requests and interface encapsulations
- `utils` encapsulation of common methods
- `app.js` entry file
- `db.js` database entry file
- `knexfile.js` database configuration file

### How to Use

1. Modify `config` configuration
   Open the `config/index.js` file and change the configuration to your own.
   token and name are required, appToken.tianxin is also required
2. Modify Tianxing interface configuration
   Tianxing API website: [https://tianapi.com/](https://tianapi.com/)  
   After registering successfully, apply for the following interfaces:
   - [Daily English Quote](https://www.tianapi.com/apiview/62)
   - [God Reply](https://www.tianapi.com/apiview/39)
3. Depends on sqlite3 and redis, redis needs to be installed separately

Then you can run it:

```bash
npm install
npm run initdb
npm start
```

### Implemented Features

- [x] Send group invitation keyword to automatically invite people to join the group
- [x] Scenario mode
  - [x] Who is the Spy
- [x] God Reply
- [x] Daily English Quote
- [x] Weather query
- [x] Send keyword to kick people

Here are some interesting features, more to be added gradually:

- [ ] Random anonymous friend chat
- [ ] Life-oriented text adventure game

### Who is the Spy Mini-Game

![Image text](/assets/2020/im-game-robot/a.webp)
![Image text](/assets/2020/im-game-robot/b.webp)
![Image text](/assets/2020/im-game-robot/c.webp)
![Image text](/assets/2020/im-game-robot/qrbread.webp)

> Author: [osindex](https://github.com/osindex)
> Code: [Github](https://github.com/osindex/im-robot)
