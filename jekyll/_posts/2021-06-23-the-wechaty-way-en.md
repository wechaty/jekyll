---
title: "The Wechaty Way: Best Practices Guide for Open Source Collaboration"
author: lijiarui
categories:
  - announcement
tags:
  - wechaty-way
  - guide
  - ospp
  - ospp-admin
  - news
  - ecosystem
image: /assets/2021/06-the-wechaty-way-en/teaser.webp
excerpt: >
  A comprehensive guide to Wechaty community's open source collaboration practices, including meeting procedures, blog publishing, issue management, and PR workflows following The Apache Way.
---

Wechaty (Conversational RPA SDK) was released on GitHub in 2016 and is an open source project licensed under Apache-2.0. After more than 5 years of development, the Wechaty open source community now has dozens of Committers, hundreds of Contributors, and is starred by over 10,000 GitHub developers. Currently, developers using Wechaty have covered tens of thousands of people and have thousands of active developer groups based on WeChat groups.

Contributors to the Wechaty community are spread across many countries and regions around the world, and major Internet companies, with professional backgrounds ranging from programmers to designers, from university professors to entrepreneurs, very diverse. There are thousands of open source projects on GitHub that have built chatbots based on Wechaty, and these developer users have also greatly promoted the activity and development of the community.

Wechaty's own code quality management uses GitHub Actions' DevOps tools to complete CI/CD workflows, from automated unit testing to automated packaging integration testing, from automatically publishing NPM packages to automatically building and publishing Docker Images of corresponding versions, realizing fully automatic community code release, greatly improving the collaborative efficiency of the community.

In terms of open source community management, Wechaty follows The Apache Way, has a PMC/Committer management system, and complete Issue/PR/Release management systems. As of 2021, Wechaty has nearly one million NPM installation downloads, and the community has spontaneously promoted the adaptation and release of languages such as Python, Go, Java, Scala, .NET, PHP, Rust, making it the most active Conversational AI Chatbot developer community in China.

## Wechaty Introduction PPT

By reading the following 3 PPTs, you can have a basic understanding of Wechaty and its development history.

- 2016: [Wechaty 101: from v0.0 to v0.7](https://docs.google.com/presentation/d/13oUOIEnzdLWO6KZWztD_pMuu22AQ3SIMjk2wp8f-f18/edit#slide=id.g194ee6e600_0_51)
- 2016-2020: [Open-source Wechaty: 2016 to 2020](https://docs.google.com/presentation/d/1eRNrKnCpdnsmplTwtZzmtGZgrPoNCmOnitmHKVc6iVU/edit#slide=id.g8568e8a985_3_8)
- 2021: [Wechaty 2021](https://docs.google.com/presentation/d/1aJ9j0VoRk0Dkyyajy3Z-zEI0QcpmpTjcCcabEXxo4JM/edit#slide=id.p)

## Community Communication

The Wechaty community continues to uphold open and transparent information:

- The preferred communication channel is [Gitter](https://gitter.im/wechaty/wechaty), because Gitter preserves all historical communication records. Even if you are a developer who has just joined the community, you can trace back to the content discussed by community members on day one.
- The next best communication channel is to join our Mailing List (send an email to wechaty@googlegroups.com to join). In 2019, I chatted with Apache Foundation Chairman Craig: **If it didn't happen on list, it didn't happen.** Ensuring community content is open and transparent and archived via email is a very important thing, so we also highly recommend everyone communicate through Wechaty's Mailing List.

Below are all of Wechaty's communication channels:

- [Gitter](https://gitter.im/wechaty/wechaty)
- Mailing List: Send an email to wechaty@googlegroups.com to join
- [WeChat Room: Wechaty Developers' Home](https://github.com/wechaty/wechaty#raising_hand-join-us)  
- [Discussion](https://github.com/wechaty/wechaty/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/wechaty)
- [Telegram](https://t.me/wechaty)
- [Twitter](https://twitter.com/chatieio)

## More Wechaty Links

In addition to community communication channels, you can also learn more about Wechaty-related content here.

- [Blog](https://wechaty.js.org/blog/): Here you can see all Wechaty blogs
- [Wechaty Contributors](https://wechaty.js.org/contributors/): Come here to see introductions to all Wechaty Contributors
- [Meeting Notes](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.64c95c3y2l4v): Content recorded from each Wechaty meeting.
- [Branding Guides](https://wechaty.js.org/docs/marketing/branding/): Materials for using Wechaty's logo and other content
- [YouTube](https://www.youtube.com/playlist?list=PL8hd9KDTdarDXf_Rxtr8meKhxtgcXMInh): Complete list of all Wechaty videos
- [Open Collective](https://opencollective.com/wechaty): The only channel for donating to Wechaty
- [Google Drive](https://drive.google.com/drive/folders/1KTnB3EOZo3nFRFSWoFc2-7LM7MgKQLzM): All Wechaty file archives
- [Photo Album](https://photos.google.com/share/AF1QipOWKUfUkjw-VzE0skrjmCwbwIWwuBiI7Li4UCbdXH62n8iH2ITnvDbPTsx4eBl8dw?key=cy1NdWFoUGpXanVmczVHSm84TVg1LXJWeW5HTDhR): Featured photos from Wechaty events
- [Hall of Fame](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.64c95c3y2l4v): Learn about the Wechaty Hall of Fame

## Wechaty Meeting Process Best Practices Guide

The Wechaty community hopes that every meeting allows all participants to focus and participate as much as possible, achieve positive output, and ensure meetings are concise, efficient, and the community is transparent. Wechaty meetings have the following three important tools and usage guidelines.

### 1. Wechaty Meeting Notes

Meeting Notes have the following values:

- **Transparency**: Every meeting held by the community is recorded in [Meeting Notes](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.64c95c3y2l4v). Even if you just joined the community, you can see past meeting content in Meeting Notes.
- **Efficiency**: As the saying goes, "Don't fight an unprepared battle." Similarly, "Don't hold an unprepared meeting." Preparing well before a meeting plays a crucial role in holding a good meeting. Before each meeting, participants must write meeting agendas in Meeting Notes in advance to ensure participants clearly know the discussion content before the meeting, improving meeting efficiency.

This is the template content of Meeting Notes (you can get the text version at the bottom of Meeting Notes; I've put an image here to make the format easier to see):

![meeting-notes](/assets/2021/06-the-wechaty-way-en/meeting-notes.webp)

Specific usage process guidelines:

1. Before the meeting, the organizer comes to [Meeting Notes](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.64c95c3y2l4v) to write the meeting location and time. Usually, meetings are public, and anyone can attend the video meeting through the Zoom link in Meeting Notes.
1. Participants must register their information in **Attendees**, including:
    1. Name
    1. One-sentence introduction
    1. Email (very important, as the host may send emails to this address later)
    1. Time zone (Wechaty as an international community often has overseas participants)
1. Before the meeting, participants should write their agenda items in Agenda in the format **[Name] Content**, so participants know which people have which different agenda items
1. In addition to meeting agenda items, you can also write down your questions in the Question section. Questions can also be commented on by others. The format is still **[Name] Content**
1. Anyone can comment on other people's agenda items at any time. The comment method is to indent and italicize the next line below the content, writing in the format **[Name] Content**.
1. We strongly encourage you to post comments under agenda items in Meeting Notes synchronously while others are expressing opinions during the meeting, because everyone will see what you write, and more discussion leads to more output.
1. It should be noted that Agenda and Question must be written before the meeting starts, so participants can understand the content in advance; but comments can be written at any time (before & during the meeting), ensuring meeting content can be archived.

### Zoom Meeting

When conditions allow, the community ensures that every meeting can be attended online as much as possible. The way to participate is to use Zoom meetings. Each Zoom meeting will be video recorded so people who did not attend the meeting can watch the video playback.

- Zoom download address: [Download](https://zoom.us/download#client_4meeting)
- Meeting link: <https://zoom.us/j/6505033788>  
- Meeting password: huan

### Meeting Videos

To ensure meeting documentation, major online meetings require the host to upload the meeting video to [YouTube](https://www.youtube.com/playlist?list=PL8hd9KDTdarDXf_Rxtr8meKhxtgcXMInh) after the meeting and complete the following:

- Set **Visibility** to `Public`
- Add to the wechaty playlist (if the host doesn't have add permissions, they can apply to [Huan](https://wechaty.js.org/contributors/huan/))
- Write video description
- In the video description, add video chapters on the video progress bar by adding times like `00:00`. For details, see: [How to add chapters on the progress bar in YouTube](https://support.google.com/youtube/answer/9884579?hl=zh-Hans). Chapters divide the video into multiple parts, making it easy for viewers to quickly jump to different parts of the video.

[Wechaty ❤️ Google Season of Docs: Kick-off meeting with 20 Technical Writers!](https://www.youtube.com/watch?v=hTkM_XPpFfU&list=PL8hd9KDTdarDXf_Rxtr8meKhxtgcXMInh&index=43) is a good example. Because a meeting lasts a long time, when others watch the video, they can easily know from the image below that **at 0:01:41 in the video, the content is Introducing the Meeting Agenda**, and clicking **0:01:41** can quickly jump to that part of the video.

![youtube-example](/assets/2021/06-the-wechaty-way-en/youtube-example.webp)

After uploading the video, the host should publish a meeting blog post in the community and embed the video content, so this meeting can be archived and shared with any developer in the community.

### Meeting Blog

To ensure every meeting in the community has content documentation, a meeting blog is required after major meetings. [Blog writing](#wechaty-blog-publishing-process-guide) will be introduced in the next section. A meeting blog should at least include the following content:

- Meeting background introduction
- Meeting group photo
- Participants
- Zoom meeting video
- Meeting agenda (don't paste the meeting agenda from Meeting Notes, but use the video segmentation links made in YouTube, which makes it convenient for readers to quickly watch the meeting content they are interested in)

#### Meeting Blog Example

The Wechaty community organized a Google Season Of Docs Tech Writer meeting blog [Hello Wechaty GSoD'21 Technical Writers](https://wechaty.js.org/2021/05/08/gsod-2021-selected-technical-writers/) is a good meeting blog case that completely includes the above requirements. People writing meeting blogs for the first time are advised to check out this case first.

## Wechaty Blog Publishing Process Guide

Anyone can publish a blog by submitting a PR under the [wechaty.js.org](https://github.com/wechaty/wechaty.js.org) Repo.

- [How to post a Wechaty blog](https://github.com/wechaty/wechaty.js.org#how-to-post-a-blog)
- [Guidelines for writing a Wechaty blog](https://github.com/wechaty/wechaty.js.org#guidelines-for-writing-a-blog-post)
- [Test locally to ensure blog content has no issues](https://github.com/wechaty/wechaty.js.org#how-to-run-tests)
- [Local preview](https://github.com/wechaty/wechaty.js.org#how-to-preview-your-changes)

### Inserting Videos in Blogs

Below is a simple example of code for embedding videos in meeting blogs. Pass the video link as the src parameter of the `include` tag.

{% raw %}

```liquid
{% include iframe.html src="https://www.youtube.com/watch?v=hTkM_XPpFfU" %}
```

{% endraw %}

[univerone](https://wechaty.js.org/contributors/univerone/) wrote a very detailed blog [Using jekyll include to quickly insert videos in wechaty blogs](https://wechaty.js.org/2020/08/24/add-video-to-wechaty-blog/), introducing how to elegantly insert videos in blogs. Interested students can also study the blog in depth.

### Beginner's Guide to Publishing Blogs

If you are a complete beginner, you can refer to [atorber](https://wechaty.js.org/contributors/atorber/)'s blog: [Getting Started: How a Beginner Can Publish Their First Blog in the Wechaty Community (Part 1)](https://wechaty.js.org/2021/04/22/how-to-publish-blog-on-wechaty/), which uses many screenshots to tell you step by step how to publish a Wechaty blog.

## Wechaty Issue Publishing Process Guide

The community hopes that any code problems are communicated through issues.

We strongly oppose taking code screenshots or log screenshots and sending them directly to WeChat groups, asking everyone why it doesn't work, or directly asking what error this is. A screenshot cannot provide comprehensive information, and is very unfavorable for archiving and disseminating to more developers. When you raise a valuable issue, you can actually greatly prevent other developers from stepping on the same pitfall.

Of course, before publishing an issue, it is also strongly recommended that you search the issue list to see if someone else has already raised this issue, and maybe someone has even given a good solution.

When publishing an issue, it is recommended to publish according to the issue template, which makes it easier for people in the community to provide you with better help. Issues are divided into 3 categories:

### 1. Bug Report

Template content: [Bug Report](https://github.com/wechaty/wechaty/blob/main/.github/ISSUE_TEMPLATE/wechaty-bug-report.md)

The most important thing in reporting a bug is **reproduction**. Only reproducible bugs can be solved. Specifically, you need to provide at least the following information:

- Wechaty version number, which wechaty puppet was used, node version and operating system
- Detailed description of this bug
- Clear reproduction steps
- Expected behavior after following your steps
- Actual behavior after following your steps
- Related complete logs

### 2. Feature Request

Template content: [Feature Request](https://github.com/wechaty/wechaty/blob/main/.github/ISSUE_TEMPLATE/wechaty-feature-request.md)

When you propose that the community should add a new feature, you need to describe in detail why it is needed and what you expect this requirement to look like specifically. The more detailed your description, the easier it is to get support from other developers. Requirements with more support from other developers are more likely to be given higher priority.

### 3. Question

Template content: [Question](https://github.com/wechaty/wechaty/blob/main/.github/ISSUE_TEMPLATE/wechaty-question.md)

The community does not want you to ask questions in issues. The best way is to ask questions on [StackOverflow](https://stackoverflow.com/questions/tagged/wechaty).

Wechaty Contributor [xpt](https://stackoverflow.com/users/2125837/xpt) has over 10K reputation on StackOverflow. He specifically created a tag for wechaty, so you can see all questions about wechaty by searching for wechaty on StackOverflow. It is also recommended that developers ask questions on [StackOverflow](https://stackoverflow.com/questions/tagged/wechaty) and tag them with wechaty, making it easy for other developers to search for related questions.

## Wechaty PR Publishing Process Guide

If you are not PR-ing a blog, before submitting a wechaty PR, you must create a new issue, clearly explain the problem you want to solve, and then send a PR linking the corresponding issue, so it is clear to everyone what problem your PR is solving, rather than just submitting a bunch of code.

In addition, before submitting a PR, developers must follow the requirements of the PR template:

- Clarify whether this is new feature development or a bug fix
- Add test cases for this submission
- Pass CI testing, displayed as GitHub Actions turning green
- Complete CLA signing
- Link related Issue links

![pr](/assets/2021/06-the-wechaty-way-en/pr.webp)

## Wechaty RFC

If it is a relatively large proposal, it is recommended to first submit a proposal describing what you want to do, why you want to do this, what benefits it can bring, what the plan is, and analyze the pros and cons of alternative plans, etc. We will have you submit an Issue for discussion, and finally, based on the discussed proposal, start subsequent development.

For example, this is a [proposal](https://github.com/wechaty/wechaty/issues/1776) published by Wechaty Committer [Gaoyuan](https://wechaty.js.org/contributors/windmemory/):

![rfc](/assets/2021/06-the-wechaty-way-en/rfc.webp)

## Advanced: Understanding The Apache Way, Knowing How to Better Participate in Open Source Projects

Finally, here I recommend a series of Apache Way materials to help you better understand the operation of open source projects, and welcome you to participate in community building in the Apache Way.

### Official Content

- [Incubator address](http://incubator.apache.org/)
- [Lifecycle](http://incubator.apache.org/cookbook/)

### Jiarui's Recommendations

- [Apache Introduction](http://www.apache.org/foundation/)
- [What is The Apache Way, The Apache Way refers to Apache's methods for managing and operating projects](http://apache.org/theapacheway/)
- [What is Incubator PMC](http://incubator.apache.org/whoweare.html#the_incubator_project_management_commitee_pmc)
- [What is Infrastructure Team](https://selfserve.apache.org/)
- [Video - How the ASF Works and Its Value](https://www.youtube.com/watch?v=TQwrH0PlpZg)
- [Video - How to Efficiently Manage Open Source Projects](https://www.youtube.com/watch?v=hpAv54KIgK8)

---

> 本文也有[中文版本](/2021/06/23/the-wechaty-way/)。
