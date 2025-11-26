---
title: A Job-seeking Community Management Tool Based on Wechaty
author: lmacode
categories: event
tags:
  - bot
  - job
  - intern
image: /assets/2020/07-early-bird-chatbot-en/bird.webp
---

The Early Bird platform was created by a group of engineers working in Silicon Valley. Due to the global pandemic, this year's job-seeking season has become very special. For companies, reducing recruitment demand has become the norm for a period of time. For job seekers, the interview cycle has been prolonged and the pressure of job hunting has doubled. As a professional public welfare platform for job-seeking communication, Early Bird should help the majority of graduates or job seekers in the context of the global pandemic and economic downturn.

The positioning of Early Bird is as follows:

1. A platform that provides services including but not limited to practicing coding problems, doing projects, and reviewing resumes with each other.
2. Connect with internal referrals from major companies, bridging the gap from school to the workplace.
3. A community where you can get long-term help, from finding internships, full-time jobs to career development, etc.

The 2020 fall recruitment season is about to begin. Early Bird plans to expand to more than ten sub-teams for practicing coding problems, projects, resumes, job hunting, internal referrals, interviews, and internships. Each sub-team involves students from many famous universities at home and abroad, and will build groups with different themes. In order to maintain the job information group more conveniently, it is urgent to generate a community management tool. Limited by the fact that some users cannot log in to the `web protocol` of wechaty. So use wechaty-puppet-padplus based on `iPad protocol` to achieve the function.

> Wechaty is an open source personal account WeChat robot interface, which is a Node.js application built with Typescript. It supports a variety of WeChat access solutions, including web, ipad, ios, windows, android, etc. At the same time, it supports multiple platforms such as Linux, Windows, Darwin (OSX/Mac) and Docker.

## How to get a free Token

The official documentation provides a way to get a free token.
[https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

Details are as follows:
> In order to participate in the open source incentive plan, developers need to fill out a form and contact Juzi BOT (WeChat ID: juzibot) or wait for it to contact them.
> Directly fill in: Wechaty Open Source Incentive Plan 2.0 Application Form.
>
> After receiving the open source incentive plan application form and Github project information, Juzi BOT (WeChat ID: juzibot) will take the initiative to contact according to the contact information in the open source incentive plan application form.
> After confirming that the developer is willing to open source the final product code and write a blog in the Wechaty community, a 15-day valid Token will be issued to the developer.
> The Token of the open source incentive plan is the padplus protocol, which currently mainly supports the development of node.js. If you want to use Java / Python / Go for development, you can apply for a Donut Token, which is optimized for multiple languages, but requires a paid purchase.
>
> After providing a 15-day valid Token, we expect developers to open source the MVP (Minimum Viable Product) code on Github and store it in a public repo.

## Features implemented in this tool

- Receive user friend requests and automatically send welcome messages
- Invite to join the group
- Welcome message for joining the group
- Automatically create groups, for example, sending "create group-early bird group 1" will automatically create a group
- Job information
- Overseas epidemic situation

Example:
Reply with the serial number or keyword to get the corresponding service

1. Join Wechaty group chat (or other configured group chats)
2. Job information
3. Overseas epidemic situation

If you need to create a group chat, please enter "create group chat-" + group name (for example: create group chat-job group 1)

As shown in the figure:

![1](/assets/2020/07-early-bird-chatbot-en/job.webp)
![2](/assets/2020/07-early-bird-chatbot-en/covid.webp)

## Directory Structure

- `config` folder stores common configuration files and `superagent` request related configurations
- `imgs` stores related pictures
- `listeners` stores a series of event processing after robot initialization (by module)
  - `on-friendship.js` handles friend requests
  - `on-login.js` handles login
  - `on-message.js` handles user messages and group messages
  - `on-scan.js` handles login QR code
- `schedule` encapsulates the timing task `node-schedule` library
- `superagent` stores all data requests and interface encapsulation
- `app.js` entry file

## How to use

Clone the repository code
[Early-Bird-ChatBot](https://github.com/lmaCode/early-bird-chatbot)

Install dependencies

```bash
npm install
```

1. Modify `config` configuration
   Open the `config/index.js` file and change the configuration inside to your own.
2. Modify Tianxing interface configuration
   Tianxing api official website: [https://tianapi.com/](https://tianapi.com/)
    After successful registration, apply for the following interfaces:
   - [Overseas epidemic situation]

   After that, please open `superagent/index.js` and change the top `APIKEY` to your own Tianxing api `key`.

Other free interfaces can be applied for at will. If you don't want to use Tianxing's interface, you can delete the corresponding keywords.

Start the program

```bash
npm start
```

A QR code will appear in the terminal, scan it to log in.

## Future Prospects

Due to the busy work at present, time and energy are limited and only some functions have been implemented. In the future, more developers will join the development queue of the Early Bird robot. The list of functions we plan to expand is as follows (continuously updated):

- Daily algorithm
- Detailed explanation of architecture design
- Interview treasure book
- Silicon Valley fresh news
- Workplace survival record
- Science and technology daily
- Bay Area life guide

Interested friends can explore more functions of wechaty, please see: (<https://github.com/wechaty/wechaty-puppet-padplus>)

API list for easy search: (<https://github.com/wechaty/wechaty>)

> Author: [lmaCode](https://github.com/lmaCode)
> Code: [early-bird-chatbot](https://github.com/lmaCode/early-bird-chatbot)

---

> Chinese version of this post: [early bird chatbot]({{ '/2020/07/23/early-bird-chatbot/' | relative_url }})
