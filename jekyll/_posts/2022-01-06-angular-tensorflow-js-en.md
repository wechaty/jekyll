---
title: Chatbot and Angular (Beijing GDG | Community Talk | NG+)
author: huan
categories: talk
image: /assets/2022/01-angular-tensorflow-js-en/ai-angular-tensorflow-js.webp
tags:
  - angular
  - tensorflow.js
  - gdg
---

AI has accelerated research in conversational interaction. With the ubiquity of mobile instant messaging, Chatbot use cases are flourishing. How do we build a chatbot powered by modern AI?

What are the lifecycle differences between a chatbot and traditional web/app products? Drawing on practical experience, ML GDE Huan shares insights and a live demo: using Angular + TensorFlow.js to analyze WeChat messages in the browser, in real time.

## Agenda

1. Intro to Conversational UI (CUI)
1. A brief review of AI development
1. Wechaty open-source project intro
1. TensorFlow.js overview
1. Live Demo: Analyze WeChat messages in the browser with Angular + TensorFlow.js
1. Q&A

## Speaker

Huan (Li Zixuan), Google Developer Expert (Machine Learning)

- TensorFlow.js Evangelist; Angular enthusiast
- Angel investor at PreAngel focusing on AI/Chatbot startups
- Co-author of "Chatbot from 0 to 1" and "Simple TensorFlow 2"
- Creator of the 10k+ stars open-source Conversational SDK Wechaty

GDE (Machine Learning); Angel Investor. PreAngel Partner, Plug and Play Venture Partner (China). Active angel investor for AI startups; serial entrepreneur with strong technical background.

## Presentation

### Slides

{% include iframe.html src="https://docs.google.com/presentation/d/1Gd3D8bS6OifXDsdSe0x5i6XsP_uISX3W9tR8yBA0mYs/edit?usp=sharing" %}

### Source Code

GitHub: <https://github.com/huan/ng-plus-wechaty>

## Tutorials

### Wechaty Token: apply a token from Puppet Service Providers

1. Apply a token: <https://github.com/wechaty/puppet-supports/issues/new/choose>
1. Puppet Service FAQ: <https://wechaty.js.org/docs/puppet-services/faq>

#### DIY a Wechaty Puppet Service Token

```sh
export WECHATY_TOKEN=insecure_wechaty_puppet_service_token_diy
export WECHATY_PUPPET_SERVER_PORT=48788
export WECHATY_PUPPET=wechaty-puppet-padlocal
export WECHATY_PUPPET_PADLOCAL_TOKEN=YOUR_PADLOCAL_TOKEN_AT_HERE
export WECHATY_LOG=verbose

docker run \
  --rm -ti \
  -e WECHATY_LOG \
  -e WECHATY_PUPPET \
  -e WECHATY_PUPPET_PADLOCAL_TOKEN \
  -e WECHATY_PUPPET_SERVER_PORT \
  -e WECHATY_TOKEN \
  -p "$WECHATY_PUPPET_SERVER_PORT" \
  wechaty/wechaty:0.78
```

> Learn more: Puppet Service DIY: <https://wechaty.js.org/docs/puppet-services/diy/>

## Replays

- NG+ 2020: {% include iframe.html src="https://youtu.be/SACugbTNQnc" %}
- GDG Community Talk: {% include iframe.html src="https://youtu.be/XGBBx3_pLdg" %}

> 中文版: [北京GDG - 社区说 - NG+ - 聊天机器人与Angular](/2022/01/06/angular-tensorflow-js/)
