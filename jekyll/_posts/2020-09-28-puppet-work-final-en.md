---
title: "Summer 2020 [WeChat Work Chatbot based on Open API for Wechaty] Final Results"
author: sapio-s
categories: project
image: /assets/2020/09-puppet-work-final-en/manager-backgroud.webp
tags:
  - summer-2020
  - summer-of-wechaty
  - puppet-provider
  - wecom
  - ecosystem
excerpt: >
  Developing a puppet for WeChat Work platform to enable Wechaty developers to use WeChat Work features by simply changing a variable
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/28/puppet-work-final/).

---

This project plans to develop a puppet for the WeChat Work platform, allowing Wechaty developers to switch to using WeChat Work functions by simply changing a variable.

## Summer 2020 [WeChat Work Chatbot based on Open API for Wechaty] Final Results

## Summer 2020

The "Open Source Promotion Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community.
It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities.
According to the difficulty and completion of the project, participants can also receive activity bonuses and trophies from the "Open Source Promotion Plan - Summer 2020".
Official website: <https://isrc.iscas.ac.cn/summer2020> Official news: <http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html>
This project [WeChat Work Chatbot based on Open API for Wechaty] is an open source project supported by Summer 2020.

## [WeChat Work Chatbot based on Open API for Wechaty]

- Mentor: Gao Yuan
- Student: Xie Yuqing

- Project Name: wechaty-puppet-wecom: WeChat Work Chatbot based on Open API for Wechaty
- Project Description:
- Timeline:
  - Preparation work
  - 2020.7.1 - 2020.7.19
    - Master related technology stack (typescript, etc.) and understand puppet structure.
    - Establish connection with WeChat Work and complete the information channel from node.js to WeChat Work
  - 2020.7.20 - 2020.8.5
    - Including encryption and decryption of conversations, related environment configuration, interaction between node.js and WeChat SDK. Complete a demo of node.js pulling WeChat Work messages.
    - Note: Originally planned to be completed on 2020.7.26, but due to a misunderstanding of the expected results, the progress direction deviated and was postponed by one week.
    - Implement message interfaces of various types on puppet
  - 2020.8.6 - 2020.8.30
    - Officially develop puppet. Complete status functions, message reading and message storage. May need to extend the original puppet data structure. Complete logical design and basic message pulling in the first week.
    - Note: WeChat Work puppet is only responsible for pulling messages and does not need to complete the complete interaction process, so a corresponding bot may need to be designed separately for testing.
    - Implement media file information pulling on puppet
  - 2020.8.31 - 2020.9.20
    - Basically complete all functions of puppet and can temporarily store media files in folders.
    - Code refactoring + final improvement
  - 2020.9.21 - 2020.9.30
    - Simply encapsulated classes such as contact and room, changed the transmission method of media files, and completed related functions of FileBox. Write readme and other documents, clarify the content that still needs to be developed, and complete the project completion report.

## Project Progress

- Project achievements:
  - Used the API interface provided by WeChat Work to complete message encryption and decryption and cross-language information transmission;
  - Completed the encapsulation of all message types (text messages and media messages);
  - Simply configured parameters and internal logic to achieve the effect of "instant communication" through timed pulling;
  - Wrote simple configuration instructions.
  - Video about code structure and function demonstration
  
{% include iframe.html src="https://player.bilibili.com/player.html?bvid=BV1CA41177DG" %}

- Problems encountered and solutions:
  - The project requirements were unclear, and there was a lack of effective communication with the mentor in the early stage, which led to one or two weeks of progress being unrelated to the target direction and becoming useless work. In the later stage, I should actively communicate with the mentor and resolve doubtful issues as soon as possible to avoid similar situations.
  - Using a brand new technology stack, in addition to spending a lot of time getting started, there were a lot of problems in configuring the environment, some of which could not even be found online. For example, several rare installation bugs encountered when installing node-ffi:
    - There is no binding.cc file during compilation, you need to create an empty file yourself;
    - Node and npm need to be downgraded, otherwise ffi/ref cannot be installed and compiled successfully;
    - If you use C++ to compile ffi's example (factorial.c), you need to change the macro structure, otherwise it will report "Error: Dynamic Symbol Retrieval Error: Win32 error 127".
  - There were some accidents in time management. I attended a total of seven weeks of mini semester at school, as well as three weeks of official autumn classes. In addition, I usually don't pay attention to time management, which resulted in long-term progress lagging behind. In the future, I also need to pay attention to seizing time, not procrastinating, and solving things that can be done as soon as possible.

## Insights and Experiences

During the project, I felt that my understanding of code was constantly improving. Looking back, I now understand roughly what I didn't understand before, and the gains are really great. When writing this report, I actually had a relatively clear understanding of the entire wechaty architecture. From being completely clueless in early July to gradually getting started in August to suddenly realizing now (maybe not really understanding), it is very fulfilling.
  
Of course, there are also many regrets and shortcomings. The main problem is still myself. Unfamiliarity with the language and time conflicts have led to results that are not very satisfactory, leaving many pitfalls to be filled. This is also a very important lesson for me. In the future, I should also plan my time well when doing projects and understand the required technology stack early so that I can complete tasks better.
  
Also: Actually, I originally thought that although my code could definitely not be published directly, it could barely be said to have completed the main functions. But when I looked at other people's blogs, I fell into deep embarrassment. Actually, it could have been completed better with a higher degree of completion. I hope that the software engineering courses offered by the school this semester will allow me to more deeply understand and become familiar with the complete development process!

## Contact Us

- Repo: <https://github.com/Sapio-S/wechaty-puppet-official/>
- Email: <1205402283@mail.qq.com>

> Author: [@Sapio-S](https://github.com/Sapio-S) Learning & practicing.
> Code: [@code](https://github.com/Sapio-S/wechaty-puppet-official)

---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/09/28/puppet-work-final/).
