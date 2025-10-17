---
title: ' "Python-Wechaty Journey at Nanjing Open Source Summit"'
author: wj-mcat
categories: story
tags:
  - news
  - python
image: /assets/2020/12-python-wechaty-open-source-journey-en/wechaty-nanjing-picture.webp
excerpt: >
  A personal story about starting the python-wechaty open source project, participating in the 2020 Open Source Summit in Nanjing, and the lessons learned from contributing to open source.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/12/08/python-wechaty-open-source-journey/).

Open source should be a necessary path for every excellent programmer.

## python-wechaty at the 2020 Open Source Software Summit

I was very fortunate to be able to participate in the 2020 Open Source Software Supply Chain Summit. This summit was hosted by the Institute of Software at the Chinese Academy of Sciences and the [openEuler](https://openeuler.org/zh/) community, and organized by the Nanjing Software Technology Research Institute of the Institute of Software at the Chinese Academy of Sciences. The theme of the summit was "Contribute · Open Source", including 1 main forum, 7 sub-forums, and 1 student special report. I attended as one of the `wechaty` community mentors to participate in the "Open Source & Education" sub-forum sharing activities. The conference had more than 300 attendees from open source software practitioners, enterprise technical experts, representatives from universities and research institutions, open source community representatives, and students from all over the country, with more than 23,000 people participating online simultaneously.

## How I Started the python-wechaty Open Source Project

Actually, it all started from an event...

> Students and colleagues who are already working can try to participate in some open salons and technical summits. At the conferences, you can exchange ideas with others, discuss problems, meet like-minded people, and gain experiences you never expected.

At the sharing session, I learned about the `wechaty` project, and I was particularly attracted by Jiarui's live coding session. With just a few simple lines of code, you can develop a very fun chatbot. After a period of learning and exploration, I mastered the basic usage of `wechaty`.

However, the original `wechaty` version only had a `TypeScript` version and did not have the current multi-language versions. I myself am a loyal fan of `python`, and I thought how could such a useful open source framework not have a `python` development version? This question kept lingering in my mind.

Finally, during the epidemic in February this year, everyone was trapped at home. Rather than saying trapped, it's better to say liberated. Because we had plenty of time to sit in our rooms and discuss various issues with netizens, and the `wechaty` community was particularly active. By then, I was already able to help everyone solve some problems.

Suddenly, someone started asking the question that was on my mind: Why doesn't `wechaty` have a `python` version of the development framework? The author (Li Zhuohuan) began to encourage us to start developing, and I was the first to sign up (I don't know what courage I had at that time, but now I'm very grateful for that fearless courage). After two months of struggling, we had the first ding-dong version of [python-wechaty](https://github.com/wechaty/python-wechaty).

## Open Source Projects Are Not as Difficult as You Think

Actually, I had a pretty tough time during those two months because the author (Li Zhuohuan) set quite high code quality requirements for `python-wechaty` (high is a relative term). Various code reviews were needed to pass, and I had never used these code review tools before, encountering various pitfalls during actual development. What impressed me most was the need to solve the most classic problem in Python: the circular reference problem of packages. Although there are many solutions, finding one that can pass strict code review was still very difficult for me at the time.

During the development process, there were many [discussions](https://github.com/wechaty/python-wechaty/wiki/Coding-Style) about the naming of each function, comments, and code style. What impressed me most was the discussion about naming array types: for example, for a list of friend IDs variable naming, there were discussions between two styles: `room_ids` and `room_id_list`. Through these very detailed technical discussions, I gained a new understanding of programming: writing code is not just about completing a function, but also requires trade-offs in terms of readability, code style, code robustness, and various other aspects.

Although the above are all small detail issues, it is precisely in the details that ability can be demonstrated. As long as you put in enough time, they can be solved, and you can have these abilities.

So open source projects are not as difficult as you imagine. **You just need to put in enough effort to gain the corresponding hard skills.**

## Open Source Projects Are Not as Simple as You Think

Since the open source project has gradually stabilized and more and more people are participating, as the main promoter of the project, you need to organize and manage the project's `issues` and `pull requests`, and coordinate everyone participating in the project. Since everyone comes from the open source community and is in loose cooperation rather than using mandatory constraints to do the project, project management becomes very difficult to push forward.

So I consulted with several different authors from the `wechaty` open source community. They generously shared their knowledge and gave me a lot of valuable advice and views on future planning. So I started making some adjustments, actively communicating with team members on every detail, and was able to smoothly manage everything based on issues and PRs in GitHub.

Open source projects are actually a way to collaborate with anyone in the world with an open source mindset, without any mandatory constraints. It's more about cooperation with an open mindset. These things all need to be learned deeply.

So open source projects are not as simple as you imagine. **You just need to persist enough to gain the corresponding soft skills.**

## You Must Actively Participate in Open Source Projects

In fact, many open source projects are very welcoming to fresh blood and are willing to guide students who are willing to learn. So if you have a heart that wants to open source, bravely try to participate in open source projects. You will gain a lot of improvement and help, and you will also meet many excellent people.

## Talk: Multi-Wechaty SDK for Chatbot

{% include iframe.html src="https://youtu.be/ncSWIRtHyAo" %}

> YouTube: <https://youtu.be/ncSWIRtHyAo>

## Vlog: Wechaty Community's Journey at Nanjing Open Source Summit

{% include iframe.html src="https://youtu.be/0ARx1cCf5p0" %}

> YouTube: <https://youtu.be/0ARx1cCf5p0>
>
> This is a translated version of the original Chinese post. You can find the original post [here](/2020/12/08/python-wechaty-open-source-journey/).
