---
title: Wechaty Java Transplant Component Development
author: cunkoulaocai
categories: project
tags:
  - java
  - soc2020
  - soc
  - ecosystem
image: /assets/2020/07-java-wechaty-transplant-en/java-wechaty-transplant.webp
---

"Open Source Software Supply Chain Lighting Plan - Summer 2020" (hereinafter referred to as Summer 2020) is a summer activity for college students jointly organized by the Institute of Software, Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of outstanding open source software communities in China. According to the difficulty and completion of the project, participants can also get the "Open Source Software Supply Chain Lighting Plan - Summer 2020" event bonus and trophy. Official website: <https://isrc.iscas.ac.cn/summer2020> Official news: <http://www.iscas.ac.cn/xshd2016/xshy2016/202004/t20200426_5563484.html> This project [Wechaty Java Transplant Component Development] is an open source project supported by Summer 2020.

## [Wechaty Java Transplant Component Development] Specific Plan

- Mentor: Diao Zhengxin
- Student: Chen Yang
- Module List
  - memory-card storage
  - state-switch state machine
  - Basic api transplantation of other modules
  - (Optional) api optimization to be more in line with kotlin style
  - (Optional) Understand the underlying principles and add some new functions
- Schedule
  - memory-card storage
    - 7.1 - 7.19
    - The transplantation of this module is a basic requirement. In order to meet the functions of re-login of the robot without scanning the code and saving the robot's own information, this component is needed. This component separates the storage function from the structure of the stored data, so that the storage method can be easily replaced. It supports Alibaba Cloud OSS, Huawei Cloud OBS, Amazon S3, json storage, etc., and provides easy-to-use api to use.
    - Basic functions
  - state-switch state machine
    - 7.20 - 7.26
    - state-switch is a monitor/protector for managing asynchronous operations. In the original ts version, it can be easily implemented through the characteristics of Promise. In kotlin, other apis are needed to achieve it. The idea is clear, but it is a bit troublesome to find a suitable implementation method.
    - Basic functions
  - (Optional) Other api transplantation and testing
    - 7.27 - 8.7
    - There are still many apis in java-wechaty that have not been implemented, and the style of the api is also imitated by js. In the future, these apis need to be gradually implemented and their api style modified to be more suitable for languages ​​such as java and kotlin.
    - Extended functions
  - (Optional) Understand the underlying principles and add some new functions
    - 8.8-8.15
    - This part is optional. Wechaty still has some functions about miniprogram, red envelopes, etc. that have not been implemented. It is necessary to understand the bottom layer for subsequent expansion and gradually enhance the functions of wechaty.
    - Extended functions
- Project link: <https://github.com/cunkoulaocai/java-wechaty>
- Contact: +86 15806082601 | e: <1184016190@qq.com>

> Author: [@cunkoulaocai](https://github.com/cunkoulaocai)
> Code: [@cunkoulaocai/java-wechaty](https://github.com/cunkoulaocai/java-wechaty)

---

> Chinese version of this post: [java wechaty transplant]({{ '/2020/07/27/java-wechaty-transplant/' | relative_url }})
