---
title: "OSPP 2021 - Final Report - Wechaty Command-line Text Client Software Based on Blessed"
author: chinggg
categories:
  - project
  - ospp
image: /assets/2021/09-ospp-final-term-cli-en/terminal-wechaty.webp
tags:
  - summer-of-wechaty
  - summer-2021
  - ospp
  - ospp-2021
  - final-term
  - ecosystem
excerpt: >
  Final report for the OSPP 2021 project developing a Blessed-based command-line text client for Wechaty, enabling users to chat using keyboard in terminal and developers to observe bot behavior in real-time.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/09/30/ospp-final-term-cli/).

This project developed a command-line text client for Wechaty based on Blessed, allowing users to chat using keyboard in the terminal and making it convenient for developers to observe bot behavior in real-time.

## [Wechaty Command-line Text Client Software Based on Blessed] Information

- Mentor: Li Zhuohuan
- Student: Liu Jing
- Project Name: Wechaty Command-line Text Client Software Based on Blessed
- Project Introduction: [https://github.com/wechaty/summer/issues/80](https://github.com/wechaty/summer/issues/80)
- Solution Description:
  - Following the IRC text client of Linux command-line terminals, implement an instant messaging client based on Wechaty, supporting all existing [Wechaty Puppet Providers](https://wechaty.js.org/docs/puppet-providers/) through Wechaty, such as WeChat, WeChat Work, Lark, WhatsApp, etc.  
  - Utilize components provided by [Blessed](https://github.com/chjj/blessed) and [blessed-contrib](https://github.com/yaronn/blessed-contrib) to draw terminal graphical interface programs
  - Listen to events such as message reception and keyboard/mouse clicks, dynamically adjust component content to provide interactive experience close to general chat software
  - Refactor code using [react-blessed](https://github.com/Yomguithereal/react-blessed), RxJS and Redux (optional)
- Timeline:  
  - Phase 1 (7.1 - 8.14) Connect backend events, select appropriate architecture and technology stack to complete data storage, display and update
    - Self-explore to make demo
      - 7.1 - 7.14
      - Implement simple message reception and contact list display
      - Communicate with mentor on architecture design and technology stack to use
    - During military training, project paused
      - 7.15 - 7.29
      - Limited time, learn front-end related knowledge or find time to implement simpler functions
    - Improve code structure, focus on data storage and state management
      - 8.1 - 8.14
      - Implement message content storage and viewing by source
      - Contact and group chat information caching
      - Write mid-term report
  - Phase 2 (8.15 - 9.30) Focus on improving front-end interaction, continuously improve user experience
    - Provide more interaction options and management functions
      - 8.15 - 8.30
      - Perform state management and intelligent sorting of contacts based on unread message count
    - Implement message sending
      - 9.1 - 9.14
    - Improve documentation, write sample code and tests
      - 9.15 - 9.30

## Project Summary

- Project Results: The entire project is a Wechaty chat client running in the terminal. Results can be summarized from the following perspectives:
  - Data acquisition and display: All contacts and group chats are fetched at once when the application starts, then messages are monitored and displayed in the corresponding chat interface. Since the underlying puppet implementation may not be able to obtain all information at startup, an option to re-fetch contact and group chat data is also provided.
  - Interface interaction design: Basically completed. The left side of the interface is the friends and group chat list, the right side is the active chat (friends and group chats with message exchanges) list, the middle large block displays message records, the middle lower side has an input box for sending messages, and the bottom is the quick menu bar. Users can press shortcuts to trigger various functions. Some functions will pop up windows in the upper layer, and pressing again will make the window disappear. Worth mentioning is support for common Vim keys - users can use `j/k/C-u/C-d/g/G` to move the selection box, and pressing `/` will pop up a search box where you can directly enter the chat name to try searching and jumping to the corresponding chat.
  - Chat function coverage: Basic text message sending and receiving has been completed. Chat management is relatively easy to implement, but due to dissatisfaction with the existing code architecture and not having figured out what layout and interaction methods should be used for group and contact management, and unlike the scenario where bots automatically manage chats, users don't frequently add/delete/modify contacts and group chats, and the consequences of misoperation are quite serious, so management functions have lower priority.
  - Open source ecosystem improvement: First is the standardization of open source collaboration. The development process is preserved through meaningful commit messages. Using English to discuss technical details in issues and PRs also allows developers worldwide to easily retrieve and communicate. To improve development efficiency, a set of CI/CD processes common in the Wechaty community is used, and ESM is adopted as the module management method. For ease of use, besides npm installation, a Docker build method is also provided.

  Some effect images are shown below:
  ![demo](/assets/2021/09-ospp-final-term-cli-en/final-demo.webp)

- Problems Encountered and Solutions:

  First is interface design: The initially designed interface was too idealistic. There are actually many limitations in the terminal, including automatic text wrapping and defects in keyboard and mouse interaction. Finally, following [dockly](https://github.com/lirantal/dockly), using menu bar + shortcuts to provide interaction is a relatively ideal solution.

  Second are code detail issues: [Blessed](https://github.com/chjj/blessed) has been unmaintained for a long time, with few users and lacking reference documentation and resources. To solve bugs encountered when using components, I learned how to debug Node.js programs with VS Code, successfully found the cause of the problem and solved it, and even [contributed to the community blog](https://wechaty.js.org/2021/08/08/vscode-debug-nodejs/) with mentor encouragement.

  Finally are architectural issues: Actually from the beginning I collected many small projects to reference and learned basic RxJS knowledge, but lacking personal experience in independent development and due to scenario differences being unable to directly apply them, I could only lead development with feature implementation, concentrating all code in two or three files. This approach was actually very intuitive and easy to understand at the beginning, but in the later stages of project development, with more and more states needing maintenance and control, code grew extensively making maintenance difficult, finally showing the importance of using design patterns and frameworks. Expected to later reference [accursed](https://github.com/cancerberoSgx/accursed) to try using React for rendering and refactor code accordingly.
- Follow-up Work Arrangement:  
  - Currently basic chat functions have been roughly implemented. Contact and group chat management still needs discussion with mentor on what form to present
  - Considering the characteristics of blessed and terminals, general chat software designs (like new conversations pinned to top) may not be directly applicable
  - While ensuring usability, refactor the project using React and Redux

### Live Coding Video

{% include iframe.html src="https://youtu.be/D5QbX183kb8" %}

> Domestic link: <https://www.bilibili.com/video/BV1444y1t7So/>

### PPT Presentation Video

{% include iframe.html src="https://youtu.be/PssH9epe0tU" %}

> Domestic link: <https://www.bilibili.com/video/BV1Wg411F7Gh/>

### Project PPT

{% include iframe.html src="/assets/2021/09-ospp-final-term-cli-en/final-slides.pdf" %}

## Contact Us

- Project Link: [https://github.com/wechaty/cli]  
- Contact: liuchinggg@gmail.com

The "[Summer 2021 of Open Source Promotion Plan](https://summer.iscas.ac.cn)" (hereinafter referred to as Summer 2021) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community. It aims to encourage college students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities. The activity collaborates with major open source communities to provide projects for the development and maintenance of important open source software, and opens registration to college students worldwide. Students can independently choose projects of interest to apply for, and after being selected, gain the opportunity to receive personal guidance from senior maintainers (community mentors) of the software. According to the difficulty of the project and completion status, participants can also receive awards and trophies from the "Summer 2021 of Open Source Promotion Plan".

This project [Wechaty Command-line Text Client Software Based on Blessed] is an open source project supported by Summer 2021.

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/09/30/ospp-final-term-cli/).
