---
title: "United Effort, Fighting the Pandemic with AI!"
author: bigbrother666sh
categories: article
tags:
  - ai
  - antigen
image: /assets/2022/05-wechaty-ai-antigenbot-en/a1fup-y7cpd.webp
excerpt: >
  During Shanghai's 2022 COVID lockdown, volunteers developed an AI antigen bot using Wechaty and PaddlePaddle to help community residents manage group purchases, forward messages, and analyze antigen test results, significantly improving community pandemic response efficiency.
---

On May 9, 2022, the Minhang District Government of Shanghai, after thorough deliberation on prevention and control mechanisms, measures, and effectiveness of "COVID-free community" applications, announced the first batch of "COVID-free communities," with "Jiayi Waterfront Smart Residences" prominently listed. The anti-pandemic achievements of Jiayi Waterfront Smart Residences community are remarkable.
Analyzing the reasons for its phased victory, it is inseparable from the residential area party branch and neighborhood committee standing firm without relaxation; inseparable from building self-governance, ensuring the "last hundred meters" in corridors; inseparable from the group purchase reporting system and transparency of epidemic-related information, and more benefited from the invisible AI "hardcore" technology support - the tireless **"AI Anti-Pandemic Bot"**.

## Early Buds Just Showing

In the early stage of the pandemic, the entire community lacked experience in static pandemic management, leading to chaotic and disorderly resident group purchases. After supplies arrived, transportation capacity was tight, volunteer delivery routes couldn't be traced, and work pressure on the neighborhood committee and volunteers sharply increased. There were frequent issues with supplies being incorrectly delivered, missed, or sent to the wrong positive buildings. Due to the inherent attributes of manual scheduling that could reduce community governance efficiency, in early April, Jiayi Waterfront community volunteers engaged in intense discussion and debate in WeChat groups, proposing building self-governance solutions. However, there was still no consensus on efficiency improvement and error elimination.

![img](/assets/2022/05-wechaty-ai-antigenbot-en/augyv-hwwkr.webp)

(Volunteers sorting supplies outside the community)

Living up to youth, running hard on the track of youth. To solve these difficulties, young community volunteers Wu Guangzheng, Ling Sikai, and Li Siying, as members of the community, determined to leverage their expertise and solve the community's difficulties from a technical perspective. Three young volunteers in the IT field stayed up late after heavy work at night discussing system design architecture, attempting to build a supplies scheduling and delivery system that frees up manpower in the fastest and most effective way. In just 2 nights, the supplies delivery system was successfully built. This system played an active role in helping the neighborhood committee automatically process group purchase information and quickly create customized forms.

![img](/assets/2022/05-wechaty-ai-antigenbot-en/avzr0-npy78.webp)

(Volunteers distributing with processed supply delivery forms)

## With an Exquisite Heart, Proceeding Calmly

After the system successfully served the community, programmer volunteers wanted to do more. They tried to seek a solution to free the neighborhood committee and volunteers from complicated and repetitive tasks with extremely low learning costs, giving them time to think about more important things and eliminate future crises.
United in the same boat, with one heart, holding firmly to green mountains. The joining of Wechaty community contributors Wu Jingjing (wj-Mcat) and Zhao Zeming (bigbrother) made the vision of Jiayi Waterfront community volunteers possible. The AI anti-pandemic bot project AntigenBot developed based on python-wechaty was born! This system not only integrated the initially developed supplies delivery system into the bot system but also developed a multi-functional message forwarding plugin to help Jiayi Waterfront neighborhood committee staff and community residents fight the pandemic side by side.
The pace of racing against the virus never stops. The Wechaty community joined forces with PaddlePaddle community volunteers and open-source community volunteers to race against the virus in system plugin development. Antigen image detection function and health code recognition function for various regions developed based on PaddleDetection and PaddleOCR were also recently deployed online, which can be said to be very practical.
Currently, the AI anti-pandemic bot has been running stably in Jiayi Waterfront community for one month, receiving unanimous praise from the neighborhood committee and residents.

![img](/assets/2022/05-wechaty-ai-antigenbot-en/ay0xw-gh4nt.webp)

(Neighborhood committee staff distributing supplies together with volunteers)

![img](/assets/2022/05-wechaty-ai-antigenbot-en/an3j3-lw6f4.webp)

(Secretary Jiang discussing anti-pandemic work with volunteers)

Secretary Jiang of Jiayi Waterfront community neighborhood committee said: "The entire system took just a few days from development, debugging, running-in to official operation, enabling the neighborhood committee to make a qualitative leap in livelihood security work, greatly reducing the neighborhood committee's manpower and time costs, giving us more time and energy to do pandemic prevention and control work well."

## AI Anti-Pandemic Bot Function Module Description

### Group Purchase Delivery Module

**Application Scenario:** The neighborhood committee receives a certain number of group purchase lists from multiple channels. After supplies arrive, they need to be delivered to owners according to building numbers and door numbers on the list.

**Function Description:** The neighborhood committee administrator only needs to send the group purchase list file to the bot, which will automatically parse the address format and generate the corresponding delivery file in one second, achieving precise delivery.

**Development Volunteers:** Wu Guangzheng, Liu Tong

### Multi-functional Message Forwarding Module

**Application Scenario:** The neighborhood committee regularly/irregularly publishes government notices, group purchase information, and important messages to the community building groups they manage.

**Function Description:** The neighborhood committee administrator only needs to send message content (text/images/mini-programs, etc.) to the bot, which will forward the message to all specified building groups within a certain time period, supporting timed forwarding, delayed forwarding, and authorized forwarding.

**Development Volunteers:** Wu Jingjing, Zhao Zeming (from Wechaty community)

![img](/assets/2022/05-wechaty-ai-antigenbot-en/a1ett-6rr3x.webp)

[Module Details](https://github.com/ShanghaiITVolunteer/AntigenWechatBot)

### Antigen Image Analysis Module

**Application Scenario:** AI antigen recognition based on deep learning, helping communities achieve efficient self-examination of risks.

**Function Description:** The bot reminds owners to conduct antigen testing and analyzes whether there are missed, duplicate, or other issues. Finally, all data is organized into Excel data and image compressed package data, automatically uploaded to the designated platform.

**Development Volunteers:** Liu Jianjian, Ma He, Han Pengyuan (from PaddlePaddle community)

![img](/assets/2022/05-wechaty-ai-antigenbot-en/a3vh5-c3zmu.webp)

[Module Details](https://github.com/ShanghaiITVolunteer/AntigenWechatBot/issues/44)

During the project development process, young volunteers hoped to protect citizens' data privacy. They specially invited the Legal Advisory Committee of KAIYUANSHE, lawyer Chen Yuanxi from Haihua Yongtai Law Firm as legal guidance for the project, Wechaty open-source project author Teacher Li Zhuohuan, and KAIYUANSHE board member Teacher Zhuang Biaowei as project technical advisors to provide advice and suggestions.
The AI Anti-Pandemic Bot AntigenBot project, based on the Jiayi Waterfront community anti-pandemic workflow, simplifies methods through first principles, improves efficiency, and avoids risks. After a series of optimizations and improvements, community management personnel responsible for the bot can achieve "out-of-the-box" and "understand at a glance" usage methods.

![img](/assets/2022/05-wechaty-ai-antigenbot-en/aa0nw-g84t1.webp)

(Project UI interface prototype)

Finally, borrowing the words of Wu Guangzheng, one of the project initiators: "The purpose of this bot is not to replace the connection between grassroots workers and people with cold machines. On the contrary, we aim to free grassroots workers from repetitive, complicated, and trivial work, giving them more motivation to deeply understand people's higher-level needs, establish warmer and friendlier connections, and better serve the people, establishing fish-water relations. I believe that only by strengthening this connection can we in Shanghai work together and overcome this pandemic that is as fierce as floods and wild beasts!"

(Screen full of thanks)

![img](/assets/2022/05-wechaty-ai-antigenbot-en/arjkv-k9fni.webp)

![img](/assets/2022/05-wechaty-ai-antigenbot-en/a2izi-ehkxh.webp)

(Jiayi Waterfront community neighborhood committee and residents fighting side by side)

## Within Our Capability, An Unshirkable Duty

In fact, this project also has a branch project waiting to be put into use, which is the WeChat QA question-and-answer bot led by Wechaty community contributor luyuchao (Brother Chao) - specifically for community workers, group purchase leaders, and business group operation managers, helping them solve repetitive question-and-answer problems ([project portal](https://github.com/choogoo/wechat-openai-qa-bot)). It can be said that the development of AI bot plugins is unlimited, usage scenarios are extensible, and the significance of this project is obvious.
We also believe that although WeChat is a closed system, developing some tool-based applications based on WeChat as a convenient tool for contact between grassroots organizations and the masses is an inevitable move under the current pandemic situation. Even in the late stage of the pandemic and after it ends, our AI Anti-Pandemic Bot project can continue to play its role, transforming into an AI Community Assistant Bot, using scientific management tools to help grassroots workers handle informatization-related affairs.
On the other hand, for the AI industry, although our country has made significant progress in scientific research in recent years, with academic papers and laboratory results already at the forefront of the world, in terms of specific industrial implementation, the overall penetration rate is still less than 5%... Under the heavy pressure of this round of pandemic, grassroots communities as the "peripheral nerves" of government governance have exposed many problems. These problems will be areas that need strengthened investment and improvement in the future. At the same time, for the AI industry, this will also be a valuable implementation scenario, as Galileo's famous saying goes - "The sole purpose of science is to alleviate the suffering of human existence."

## Acknowledgments

**Jiayi Waterfront Volunteer Team:** Wu Guangzheng, Liu Tong, Li Siying, Ling Sikai

**Wechaty Community Team:** Li Zhuohuan, Wu Jingjing, Zhao Zeming, luyuchao, Padlocal Haoda

**KAIYUANSHE:** Chen Yuanxi, Zhuang Biaowei, Li Siying

**PaddlePaddle Community Team:** PaddlePaddle Operations Feifei, Liu Jianjian, Ma He, Han Pengyuan

## Community Introduction

### Wechaty Community

![img](/assets/2022/05-wechaty-ai-antigenbot-en/logo.webp)

Wechaty is a Conversational RPA SDK for chatbot makers. With only 6 lines of code, you can create a bot on the most popular IMs like WeChat, Whatsapp, WeCom, Gitter, etc.

### KAIYUANSHE

![img](/assets/2022/05-wechaty-ai-antigenbot-en/aa8zj-zyze7.webp)

KAIYUANSHE was founded in 2014 and is composed of individual members who voluntarily contribute to the open-source cause, following the principles of "contribution, consensus, and co-governance." It always maintains vendor neutrality, public welfare, and non-profit characteristics. It is the earliest open-source community alliance with the mission of "open-source governance, international alignment, community development, and open-source projects." KAIYUANSHE actively cooperates closely with communities, enterprises, and relevant government units that support open source. With the vision of "based in China, contributing globally," it aims to co-create a healthy and sustainable open-source ecosystem and promote Chinese open-source communities to become active participants and contributors to the global open-source system.

### PaddlePaddle Community

![img](/assets/2022/05-wechaty-ai-antigenbot-en/adt2z-wdcvt.webp)

As China's first independently developed, feature-rich, open-source industrial-grade deep learning platform, Baidu PaddlePaddle was officially open-sourced in 2016. Currently, the PaddlePaddle platform has gathered more than 4 million developers, helping AI developers from enterprise units, universities, and research institutions improve model development efficiency and experience, and promoting the actual implementation and application of AI technology in various industries. AI Studio is an artificial intelligence learning and training community based on Baidu's deep learning platform PaddlePaddle, providing online programming environment, free GPU computing power, massive training projects, and open data to help developers quickly create and deploy models.

bigbrother on behalf of the [ShanghaiITVolunteer](https://github.com/ShanghaiITVolunteer)

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/05/20/wechaty-ai-antigenbot/).
