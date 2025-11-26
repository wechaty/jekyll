---
title: "Revealed: Why 2021 Google Season of Docs Chose Wechaty"
author: juzibot
categories: gsod
tags:
  - google
  - gsod
  - event
  - gsod-2021
  - 2021
  - docs
  - news
  - ecosystem
image: /assets/2021/07-gsod-2021-publish-article-en/gsodandwechaty.webp
excerpt: >
  Wechaty has partnered with Google Season of Docs 2021 with an approved budget of $9,500 USD to improve documentation and support technical writers in the open source community.
---

> Thank you for clicking on my blog. I'm very honored to share with you the development of the 2021 Google Season of Docs and Wechaty.
> This year, Wechaty has reached a cooperation with Google Season of Docs, and the requested budget of $9,500 has been approved.
> ![gsodandwechaty1](/assets/2021/07-gsod-2021-publish-article-en/gsodandwechaty1.webp)

## GSoD Introduction

![gsod](/assets/2021/07-gsod-2021-publish-article-en/gsod.webp)

- GSoD is short for [Google Season of Docs](https://developers.google.com/season-of-docs), an annual event organized by Google to bring together technical writers and open source organizations to jointly promote and improve open source development in this space.
- This Google initiative is significant. Open source projects provide users with not only a platform to understand and learn about projects, but also a channel to contribute to open source projects.
  During the program, technical writers spend 3-5 months building new documentation, improving the structure of existing documentation, developing urgently needed tutorials, and improving the contribution processes and guidelines of open source organizations.

## Wechaty Introduction

![wechaty](/assets/2021/07-gsod-2021-publish-article-en/wechaty.webp)

- Wechaty is an open source personal WeChat bot interface, a Node.js application built with TypeScript. It supports multiple WeChat access solutions, including web, iPad, iOS, Windows, Android, etc. It also supports multiple platforms including Linux, OSX, Win32, and Docker.
- Surveys over the years have shown that good documentation is important for how developers use open source.
- Wechaty, as one of [30](https://developers.google.com/season-of-docs/docs/participants) [great open source organizations](https://developers.google.com/season-of-docs/docs/participants), helps chatbot developers quickly build chatbot frameworks and supports multiple system platforms.
- Wechaty's mission: Provide chatbot developers with the best open source SDK and the best experience for developers. Help developers focus more on logical applications and concentrate on writing upper-level application code, rather than spending time on docking with the bottom of the platform.
- Wechaty started preparing for the 2021 Google Season of Docs in February. After Wechaty officially announced joining 2021 Google Season of Docs on April 16, it contacted multiple technical writers, and almost all proposals were being planned in detail and deeply researched.

### Why Choose Wechaty

- Five years of technical accumulation: Wechaty (Conversational RPA SDK) was released on GitHub in 2016 and is an open source project under the Apache-2.0 license. After more than 5 years of development, the Wechaty open source community now has dozens of Committers, hundreds of Contributors, and is starred by over 10,000 GitHub developers. Currently, developers using Wechaty have covered tens of thousands of people and have thousands of active developer groups based on WeChat groups.
- Users worldwide: Wechaty community Contributors are spread across many countries and regions around the world, and major Internet companies, with professional backgrounds ranging from programmers to designers, from university professors to entrepreneurs. There are thousands of open source projects on GitHub that have built chatbots based on Wechaty, and these developer users have also greatly promoted the activity and development of the community.
- Efficient code release: Wechaty's own code quality management uses GitHub Actions' DevOps tools to complete CI/CD workflows, from automated unit testing to automated packaging integration testing, from automated publishing of NPM packages to automated building and publishing of Docker Images of corresponding versions, realizing fully automatic community code release, greatly improving the collaborative efficiency of the community.
- High community activity: As of 2021, Wechaty has nearly one million NPM installation downloads, and the community has spontaneously promoted the adaptation and release of languages such as Python, Go, Java, Scala, .NET, PHP, Rust, making it the most active Conversational AI Chatbot developer community in China.
- Open and transparent information: The preferred communication channel is Gitter because Gitter preserves all historical communication records. Even developers who have just joined the community can trace back the content discussed by community members on day one. The next best communication channel is to join the Mailing List to ensure community content is open and transparent and archived via email.
- Efficient standardized meetings: Wechaty community meetings use professional tools and standardized usage rules to ensure meetings are concise, efficient, and the community is transparent, enabling all participants to focus and achieve positive output.
- Various honors and achievements: One of the 30 top global open source projects supported by Google Season of Docs; rated as an excellent open source project by China's top open source organization China Open Source Cloud Alliance; open source project author Huan LI was selected as one of the "33 Chinese Open Source Pioneers"; selected for the Open Source Software Supply Chain Lighting Plan for 2020 and 2021.
- Safe and simple to use: Switch just one variable and other code remains unchanged to log in to new IM; supports common popular programming languages with API definitions consistent across programming languages; add one more line of code to have complex conversational capabilities.
- Rich and powerful features: In addition to basic functions such as receiving messages, sending messages, adding friends, remarking friends, accepting friend requests, initiating group chats, and adding people to groups, it can also perform message processing, group management, automatic friend request processing, intelligent dialogue, and many more functions.
- Flexible business customization: Building a WeChat bot with a personal account requires only 6 lines of code. Simple operations can issue different commands for messages to complete the desired logic.
- Compatible with various platforms: Write one piece of code that can run on different platforms by just switching environment variables. Supports multiple platforms including Linux, OSX, Win32, and Docker. Supports multiple access solutions including web, iPad, iOS, Windows, Android, etc.
- Talent and company reuse: Many developers and companies in the industry already using Wechaty can become high-quality suppliers of future operator Chatbots at the first opportunity.
- Commercial scenario reuse: Uses the most business-friendly Apache-2.0 license agreement. A large number of developers and commercial companies can quickly enter the new 5G Chatbot market through Wechaty.

### Current Progress

- Below is a chronological summary:

  First sent an announcement to the WeChat mailing list: [Wechaty GSoD'21 Technical Writers Registration Form is Open](https://groups.google.com/g/wechaty/c/C7r1_GMRRa0)

  May 3: Sent [Google Form](https://forms.gle/2LDqrX5GUs6j9fJR9) to technical writers

  May 8: Held an online meeting to discuss before announcing the final selection results. All technical writers are welcome to join [Hello Wechaty GSoD'21 Technical Writers!](https://wechaty.js.org/2021/05/08/gsod-2021-selected-technical-writers/)
  You can also learn more about [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.edr3nzd8l43b)
  ![zero](/assets/2021/07-gsod-2021-publish-article-en/zero.webp)

  May 9: Announced the Wechaty Google Season of Docs'21 Technical Writers selection results.

  May 16: Held the first week Google Season of Docs meeting, discussed future meeting dates, provided a week's work summary, introduced the next week's plan, discussed whether to extend the timeline of the main project, and Simin introduced documentation structure and style. Later we had a Q&A session.
  You can also learn more about [the related blog](https://wechaty.js.org/2021/05/16/gsod-2021-week1-meeting/) and [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.o69fqys8gbda)
  ![1st](/assets/2021/07-gsod-2021-publish-article-en/1st.webp)

  May 23: Held the second week Google Season of Docs meeting. Each attendee first gave their one-week summary and reported their plans for the next week. Discussed Wechaty's future vision together, and Simin discussed errors frequently appearing in PRs.
  You can also learn more about [the related blog](https://wechaty.js.org/2021/05/23/gsod-2021-second-meeting/) and [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.3ly9biu8mtyy)
  ![2nd](/assets/2021/07-gsod-2021-publish-article-en/2nd.webp)

  June 6: Held the third week Google Season of Docs meeting. Each attendee first provided a weekly summary and reported their plans for the next week to the community, raised concerns about large PRs, discussed the scope and scale of PRs, and teams lacking weekly follow-up explained their reasons. Simin explained relevant matters needing attention and demonstrated to everyone. Q&A session was held, and group photos were taken.
  You can also learn more about [the related blog](https://wechaty.js.org/2021/06/06/gsod-2021-third-meeting/) and [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.lmf3j0zgmymr)
  ![3rd](/assets/2021/07-gsod-2021-publish-article-en/3rd.webp)

  June 20: Held the fourth week Google Season of Docs meeting. First, each participant provided a weekly summary and reported their plans for the next week to the community. Volunteers and technical writers discussed while providing weekly summaries. Finally, everyone had a Q&A session and took a lovely group photo.
  You can also learn more about [the related blog](https://wechaty.js.org/2021/06/22/gsod-2021-fourth-meeting/) and [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.3am6kd2l4v24)
  ![4th](/assets/2021/07-gsod-2021-publish-article-en/4th.webp)

  July 4: Held the fifth week Google Season of Docs meeting. Each participant provided a weekly summary and planned the next week's work. Volunteers and technical writers discussed.
  You can also learn more about [the related blog](https://wechaty.js.org/2021/07/06/gsod-2021-fifth-meeting/) and [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.s6s37xc2auay)
  ![5th](/assets/2021/07-gsod-2021-publish-article-en/5th.webp)

  July 18: Held the sixth Google Season of Docs meeting. Similarly, each participant summarized this week's work and planned the next week's work. Volunteers and technical writers discussed. Finally, a Q&A session was held to discuss and resolve everyone's existing problems.
  You can also learn more about [meeting details](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.i4kw5zu3yk32)
  ![6th](/assets/2021/07-gsod-2021-publish-article-en/6th.webp)

### Participants

There are 12 participants in total:

1. Rohitesh Jain, Volunteer (UTC + 5:30)
2. Sajen Sarvajith, Reconstruct Landing page writer (UTC + 5:30)
3. Abhishek Jaiswal, How-to-guide section writer (UTC + 05:30)
4. Simin Liao, Volunteer (+8:00)
5. Mukosa Joseph Mawa, Introductions and Explanations section writer (UTC +03:00)
6. Rajiv Ranjan Singh, Improve the gRPC and OpenAPI ecosystem writer, rajivperfect007@gmail.com, (UTC+05:30)
7. Souvik Biswas, Create easy to learn tutorials for beginner users writer, sbis1999@gmail.com (UTC +05:30)
8. Shraddha, Improve References section writer (UTC + 5:30)
9. Shwetal Soni, Create easy to learn tutorials for beginners users writer (UTC +05:30)
10. Vasvi Sood, How to guides, contactvasvisood@gmail.com writer (UTC + 5:30)
11. Arnab Saha, Reconstruction of Landing page with value propositions writer (UTC + 5:30)
12. Chris Estepa, Introduction and Explanations sections writer (UTC +08:00)

### Welcome

We are very happy to have you all join Wechaty, and we welcome more technical writers to join us to learn together and build the Wechaty community together!

---

> 本文也有[中文版本](/2021/07/16/gsod-2021-publish-article/)。
