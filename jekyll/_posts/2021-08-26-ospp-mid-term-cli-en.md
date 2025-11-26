---
title: ' "OSPP 2021 - Mid-term Report - Wechaty Command-line Text Client Software Based on Blessed"'
author: chinggg
categories:
  - project
  - ospp
image: /assets/2021/08-ospp-mid-term-cli-en/terminal-wechaty.webp
tags:
  - summer-of-wechaty
  - summer-2021
  - ospp
  - ospp-2021
  - mid-term
  - ecosystem
excerpt: >
  Mid-term report for the OSPP 2021 project developing a Blessed-based command-line text client for Wechaty, supporting all Wechaty puppet providers in a terminal interface.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/08/26/ospp-mid-term-cli/).

The "[Open Source Software Supply Chain Lighting Program - Summer 2021](https://summer.iscas.ac.cn)" (hereinafter referred to as Summer 2021) is a summer activity for college students jointly organized by the Institute of Software at the Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities. The activity unites major open source communities to provide projects for the development and maintenance of important open source software, open to college students around the world. Students can independently choose projects of interest to apply for, and after being selected, have the opportunity to receive personal guidance from senior maintainers of the software (community mentors). Depending on the difficulty of the project and completion status, participants can also receive bonuses and trophies from the "Open Source Software Supply Chain Lighting Program - Summer 2021" activity.

This project [Wechaty Command-line Text Client Software Based on Blessed] is an open source project supported by Summer 2021.

## [Wechaty Command-line Text Client Software Based on Blessed] Information

- Mentor: Li Zhuohuan
- Student: Liu Jing
- Project Introduction: [https://github.com/wechaty/summer/issues/80](https://github.com/wechaty/summer/issues/80)

- Project Name: Wechaty Command-line Text Client Software Based on Blessed
- Solution Description:
  - Modeled after Linux command-line terminal IRC text clients, implement an instant messaging client based on Wechaty, supporting all existing [Wechaty Puppet Providers](https://wechaty.js.org/docs/puppet-providers/) through Wechaty, such as WeChat, WeCom, Lark, WhatsApp, etc.
  - Use components provided by [Blessed](https://github.com/chjj/blessed) and [blessed-contrib](https://github.com/yaronn/blessed-contrib) to draw terminal graphical interface programs
  - Listen to events such as message reception and keyboard/mouse clicks, dynamically adjust component content, and provide an interactive experience close to general chat software
  - Refactor code using [react-blessed](https://github.com/Yomguithereal/react-blessed), RxJS, and Redux
- Time Planning:
  - Phase 1 (7.1 - 8.14) Interface with backend events, select appropriate architecture and technology stack to complete data storage, display, and update
    - Self-exploration to create demo
      - 7.1 - 7.14
      - Implement simple message reception and contact list display
      - Communicate with mentor about architectural design and technology stack to be used
    - During military training, project paused
      - 7.15 - 7.29
      - Limited time, learn front-end related knowledge or implement simpler functions when possible
    - Improve code structure, focus on advancing data storage and state management
      - 8.1 - 8.14
      - Implement message content storage and viewing by source
      - Caching of contact and group chat information
      - Write mid-term report
  - Phase 2 (8.15 - 9.30) Focus on improving frontend interaction, continuously improving user experience
    - Provide more interaction options and management functions
      - 8.15 - 8.30
      - Perform state management and intelligent sorting of contacts based on unread message count
    - Implement message sending
      - 9.1 - 9.14
    - Improve documentation, write sample code and tests
      - 9.15 - 9.30

## Project Progress

- Completed Work:
  - Reception and storage of all messages
  - Display and caching of contact and group chat information
  - GitHub CI/CD and NPM package publishing
  - Display corresponding conversation records according to current chat object
  - Display all members when a group chat is selected
  - Message sending
- Problems Encountered and Solutions:
  - First are technical issues, mainly that [Blessed](https://github.com/chjj/blessed) has been unmaintained for a long time, has few users, and lacks reference documentation and resources. To solve bugs encountered when using components, I often needed to read the source code in depth. For this purpose, I learned how to debug Node.js programs using VS Code, successfully found the causes of some problems and solved them, and even [contributed to the community blog](https://wechaty.js.org/2021/08/08/vscode-debug-nodejs/) with encouragement from my mentor. However, due to limitations of the terminal environment itself and compatibility issues across different platforms, Blessed's rendering capabilities and interactivity are indeed unsatisfactory, and some anticipated functions may ultimately be difficult to implement.
  - There are also issues with architecture selection and time planning. Lacking independent development experience, I initially obsessed over architecture choices, trying to determine all solutions from the start. After browsing related projects, I became even more confused. Only after I turned to implementing functions did I discover that Blessed had many unexpected problems - you still have to practice and encounter pitfalls one by one yourself; there is no silver bullet in software development.
  - Finally, there's the issue of open source project maintenance. With my mentor's help, I used Issues to subdivide tasks and manage progress, utilized GitHub Actions for CI/CD, and published NPM packages
- Future Work Arrangements:
  - Currently, basic chat functions have been roughly implemented; contact and group chat management still need to be discussed with the mentor regarding presentation format
  - Considering the characteristics of blessed and terminals, designs from general chat software (such as bringing new conversations to the top) may not be directly applicable
  - While ensuring usability, refactor the project using React and Redux

## Project Results

Project Repository: <https://github.com/wechaty/cli>

### Live Coding Video

{% include iframe.html src="https://www.youtube.com/watch?v=1U0ONeHV7z8" %}

> Domestic link: <https://www.bilibili.com/video/BV1L3411q72g/>

### PPT Presentation Video

{% include iframe.html src="https://www.youtube.com/watch?v=xPsAwLglVdM" %}

> Domestic link: <https://www.bilibili.com/video/BV1PQ4y1a7pM/>

### Project PPT

{% include iframe.html src="/assets/2021/08-ospp-mid-term-cli-en/mid-slides.pdf" %}

## Contact Us

- Project Link: [https://github.com/wechaty/cli]
- Contact: liuchinggg@gmail.com

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/08/26/ospp-mid-term-cli/).
