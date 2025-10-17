---
title: "OSPP (Open Source Promotion Plan) Guide - 2021"
author: lijiarui
categories:
  - announcement
  - ospp
tags:
  - event
  - 2021
  - summer-2021
  - summer-of-wechaty
  - guide
  - ospp
  - ospp-2021
  - ospp-admin
  - news
  - ecosystem
image: /assets/2021/06-summer-wechaty-guide-en/teaser.webp
excerpt: >
  Comprehensive guide for OSPP 2021 participants covering milestones, daily work requirements, mid-term and final reports, with templates and examples from successful 2020 students.
---

The Open Source Software Supply Chain Lighting Program - Summer 2021 kick-off meeting was successfully completed under the chairmanship of [ninetailskim](https://wechaty.js.org/contributors/ninetailskim/). For detailed content about the Open Source Software Supply Chain Lighting Program, see [Wechaty Summer of Code 2021 Kickoff Meeting](https://wechaty.js.org/2021/06/24/wechaty-soc-kick-off-meeting/)

## Open Source Software Supply Chain Lighting Program Organizing Committee Activity Milestones

![agenda](/assets/2021/06-summer-wechaty-guide-en/agenda.webp)

Note: All students who pass the final project evaluation will receive the full amount of the corresponding project award. Whether the project is rated as excellent does not affect the distribution of the award.

### Official Guidelines from the Organizing Committee

- Schedule for student participation, see [Student Guide](https://summer.iscas.ac.cn/help/student/)
- Schedule for community mentor participation, see [Mentor Guide](https://summer.iscas.ac.cn/help/mentor/)
- Schedule for community participation, see [Community Guide](https://summer.iscas.ac.cn/help/community/)

## Wechaty Community Work

The Wechaty project Issue serves as the main notification channel for students and mentors in this event. After being selected, all students must complete the first thing:
**Under the project list Issue, reply with all the work that students and mentors need to complete in checklist form, facilitating subsequent completion of related work by students and mentors, and check it off in the Comment after completion**

The Wechaty community adheres to the principle of openness in open source. All meeting notes, online meetings, phased reports, videos, and documentary materials will be completely open to the community. Students who mind having their videos and documentary materials open, please consider carefully before joining.

Students and mentors participating in the project need to complete **daily work** and **phased work** respectively:

- Daily work
  - Students reply with progress reports under the issue weekly
  - Mentors score students' progress reports under the issue weekly
- Phased work
  - 2021.7.15 Initial report
  - 2021.8.28 Mid-term Demo Day
  - 2021.8.30 Mid-term report
  - 2021.9.30 Final report

Below are specific requirements, templates, and content references from past students

### Daily Work

Daily work takes the example of OSPP 2020's Outstanding Student Contribution Award winner [Jiang Shanshan](https://wechaty.js.org/contributors/univerone/)'s weekly reports and mentor summaries, see [Write a "Daily Sentence" Plugin](https://github.com/wechaty/summer-of-wechaty/issues/10)

#### Report Template

```markdown
# [Project Name] Progress Report

Date: XXXX-XX-XX

## Achievements Completed This Week
1. XX 
1. XX

## Difficulties Encountered This Week and Areas Needing Cooperation
1. XX

## Next Week's Development Plan and Expected Results
1. XX

## Other Matters Needing Explanation and Synchronization
1. XX
```

#### Mentor Scoring Template

```markdown
# [Project Name] Mentor Scoring

Date: XXXX-XX-XX

## Scoring for This Week's Progress Report
- [ ] 1: Deliverable not acceptable
- [ ] 2: Deliverable is below expectations
- [ ] 3: Deliverable is OK
- [ ] 4: Deliverable is above expectations
- [ ] 5: Deliverable is perfect

## Other Matters Needing Explanation and Synchronization
XXX
```

### Phased Work

Initial, mid-term, and final reports must be **submitted to the [[wechaty.js.org](https://github.com/wechaty/wechaty.js.org) Repo] in blog format**. Before submitting reports, you can first read [Wechaty Community Guidelines](https://wechaty.js.org/2021/06/23/the-wechaty-way/), at least understanding the following:

1. Introduction to Wechaty
1. Community communication channels
1. Meeting guidelines
1. Blog publishing guidelines
1. Issue publishing guidelines
1. PR publishing guidelines

Pay special attention to the blog publishing guidelines which introduce in detail how to submit blogs, how to embed videos in blogs, etc., which will be used in mid-term and final reports. Specific requirements for the three reports are as follows.

#### Initial Report

##### Student Developers

###### 1. Personal Introduction

Please submit your introduction in markdown format to the `jekyll/_contributors` directory of the [wechaty.js.org](https://github.com/wechaty/wechaty.js.org) Repo.

You can refer to the following developer introduction content pages:

- [Wu Jingjing, wj-mcat, Creator of python-wechaty](https://raw.githubusercontent.com/wechaty/wechaty.js.org/master/jekyll/_contributors/wj-mcat.md)
- [Jiang Shanshan, univerone, OSPP 2020 Outstanding Student Contribution Award winner](https://raw.githubusercontent.com/wechaty/wechaty.js.org/master/jekyll/_contributors/univerone.md)

###### 2. Initial Report

- Title: `OSPP 2021-Initial Report-Your Title`
- Filename: `2021-XX-XX-ospp-plan-XX`
- Report category should be: `project`, `ospp`
- Report tags should at least include: `summer-of-wechaty`,`summer-2021`,`ospp`,`ospp-2021`,`plan`
- Report content should at least include:
  - Project name
  - Collaborator introduction
  - Mentor
  - Project introduction
  - Project plan

**When submitting PR, please note: Tag this PR with `ospp` label, and fill in your project's GitHub Issue link in the PR to facilitate committee review.**

###### 3. OSPP 2020 Student Initial Report Reference

- [Summer 2020 Design and Implement Plugin System for go-wechaty Plan](https://wechaty.js.org/2020/07/19/go-wechaty-plugin-dev-plan/)
- [Group Chat Assistant Bot Based on python-wechaty](https://wechaty.js.org/2020/07/18/python-wechaty-groupchat-assistant-bot/)
- [Based on Open API Packaging Wechaty Interface Feishu Chatbot: Initial](https://wechaty.js.org/2020/07/29/wechaty-puppet-lark-plan-blog/)
- [Building a Meme Bot Based on Python-Wechaty](https://wechaty.js.org/2020/07/18/python-wechaty-meme-bot/)
- [Summer 2020 Writing a "Daily Sentence" Plugin Plan](https://wechaty.js.org/2020/07/18/wechaty-words-per-day-plugin-plan/)
- [Summer 2020 [Based on RPA Packaging Wechaty Interface Kuaishou Chatbot] Plan](https://wechaty.js.org/2020/07/28/wechaty-rpa-kuaishou-plan/)
- [Douyin Chatbot Based on RPA-Encapsulated Wechaty Interface](https://wechaty.js.org/2020/07/28/wechaty-puppet-douyin/)
- [Summer 2020 Based on Open API Packaging Wechaty Interface Enterprise WeChat Chatbot Plan](https://wechaty.js.org/2020/08/19/puppet-work-plan/)
- [Summer 2020 Go-wechaty Github Action Optimization Plan](https://wechaty.js.org/2020/07/30/go-wechaty-gh-optimization-poc/)
- [Wechaty Java Porting Component Development](https://wechaty.js.org/2020/07/27/java-wechaty-transplant/)
- [Based on Open API Packaging Wechaty Interface DingTalk Chatbot Specific Plan](https://wechaty.js.org/2020/07/19/wechaty-puppet-dingtalk/)

##### Community Mentors

According to community blog submission guidelines, review blogs submitted by students. After review approval, **Approve** this PR on GitHub, then submit it to Wechaty PMC for blog review. Note that community mentors must **prioritize and approve** their students' PRs in advance.

#### Mid-term Report

Before submitting mid-term reports, there will be an OSPP Mid-term Demo Day, where mentors and students will present mid-term reports online. The submitted mid-term report includes the Mid-term Demo Day video and mid-term report content summary. [Click here to view Summer 2020 Mid-Term Demo Day meeting reality](https://wechaty.js.org/2020/08/22/summer-2020-wechaty-soc-midterm-demo-day/)

##### Student Developers

###### 1. Mid-term Demo Day Video

Each developer needs to give a mid-term presentation. Videos will be added to blogs, submitted to the organizing committee, and edited into a complete Demo Day video to showcase to the entire community and attract more developers to participate in corresponding projects:

- Submit a 3-5 minute, with live appearance (video conference software recording), PPT-based presentation.
- Submit an unlimited duration, with live appearance (video conference software recording) Live Code.

Students must submit video links by August 26 by replying under the corresponding project's Github Issue. Videos are directly uploaded by students to YouTube / Bilibili, and video links and iframes are attached to each blog:

- Videos need to be uploaded to YouTube and contact [Huan](https://wechaty.js.org/contributors/huan/) to add to wechaty's playlist.
- Considering domestic users, can be uploaded to bilibili or Tencent Video

You can refer to last year's Outstanding Student Contribution Award winner [Jiang Shanshan](https://wechaty.js.org/contributors/univerone/)'s videos:

- [Mid-term Report Video](https://www.bilibili.com/video/BV1vT4y157x5/)
- [Live Coding Video](https://www.bilibili.com/video/BV1ih411d75h)

###### 2. Mid-term Report

Before August 30, submit blogs in Pull Requests form in the [wechaty.js.org Repo](https://github.com/wechaty/wechaty.js.org).

- Title: `OSPP 2021-Mid-term Report-Your Title`
- Filename: `2021-XX-XX-ospp-mid-term-XX`
- Report category should be: `project`, `ospp`
- Report tags should at least include: `summer-of-wechaty`,`summer-2021`,`ospp`,`ospp-2021`,`mid-term`,`ospp`
- Report content should at least include:
  - Project information
    - Project name
    - Solution description
    - Time planning
  - Project progress
    - Completed work
    - Problems encountered and solutions
    - Subsequent work arrangement
  - Project results
    - Mid-term report video, refer to [Using jekyll include to quickly insert videos in wechaty blogs](https://wechaty.js.org/2020/08/24/add-video-to-wechaty-blog/)
    - Live Coding/Demo video

**When submitting PR, please note: Tag this PR with `ospp` label, and fill in your project's GitHub Issue link in the PR to facilitate committee review.**

You can fully copy the corresponding Markdown of this article as a blog content template, but can also add more supplementary information.

```markdown
"[Open Source Software Supply Chain Lighting Plan - Summer 2021](https://summer.iscas.ac.cn)" (hereinafter referred to as Summer 2021) is a summer activity for college students jointly organized by the Institute of Software Chinese Academy of Sciences and the openEuler community. It aims to encourage students to actively participate in the development and maintenance of open source software and promote the vigorous development of excellent domestic open source software communities. The activity brings together major open source communities to provide projects for the development and maintenance of important open source software, and is open for registration to college students worldwide. Students can independently choose projects they are interested in to apply for, and after selection, they will have the opportunity to be personally guided by senior maintainers (community mentors) of the software. According to the difficulty of the project and completion status, participants can also receive "Open Source Software Supply Chain Lighting Plan - Summer 2021" activity bonuses and trophies.

This project [Project Name] is an open source project supported by Summer 2021.

## [Project Name] Information

- Mentor: [Mentor Name]  
- Student: [Student Name]  
- Project Introduction: [Github Issue Link, such as https://github.com/wechaty/summer/issues/74]  

- Project Name:  
- Solution Description:  
- Time Planning:  

## Project Progress

- Completed Work:  
  *Describe current work results according to original plan and time planning*  
- Problems Encountered and Solutions:   
  *Can focus on describing summaries and insights*  
- Subsequent Work Arrangement:  
  *Describe whether work plans need adjustment, etc.*  

## Project Results

Project Repository: <https://github.com/XX/XX>  

### Live Coding Video:
{% raw %} 
{% include iframe.html src="Video Link" %}
{% endraw %}
### PPT Presentation Video:
{% raw %}
{% include iframe.html src="Video Link" %}
{% endraw %}
### Project PPT:
{% raw %}
{% include iframe.html src="PDF Link" %}
{% endraw %}
## Contact Us

- Project Link: [Github Issue Link, such as https://github.com/wechaty/summer/issues/74]  
- Contact Information:
```

###### 3. OSPP 2020 Student Mid-term Report Reference

- [Based on Open API Packaging Wechaty Interface Feishu Chatbot: Mid-term](https://wechaty.js.org/2020/08/19/wechaty-puppet-lark-mid-term-blog/)
- [Summer 2020 Writing a "Daily Sentence" Plugin POC Results Display](https://wechaty.js.org/2020/08/15/wechaty-words-per-day-plugin-mid-term/)
- [Summer 2020 Group Chat Assistant Bot Based on python-wechaty POC Results Display](https://wechaty.js.org/2020/08/14/python-wechaty-groupchat-assistant-bot-poc/)
- [Summer 2020 Based on RPA Packaging Wechaty Interface Kuaishou Chatbot Mid-term Report](https://wechaty.js.org/2020/08/20/wechaty-puppet-kuaishou-mid-term/)
- [Wechaty Java Porting Component Development](https://wechaty.js.org/2020/08/17/java-wechaty-transplant-midpoc/)

##### Community Mentors

###### 1. "Summer 2021" Organizing Committee Review Report

During August 16 - August 22, submit review reports in Issues on the organizing committee's Gitlab and cooperate with the organizing committee for mid-term review.

###### 2. Wechaty Community Mid-term Blog Review

Before August 30, submit supplementary review result information in Pull Requests form under the corresponding student blog in the [wechaty.js.org](https://github.com/wechaty/wechaty.js.org) Repo.

At the same time, according to community blog submission guidelines, review blogs submitted by students. After review approval, **Approve** this PR on GitHub, then submit it to Wechaty PMC for blog review. Note that community mentors must **prioritize and approve** their students' PRs in advance.

You can fully copy the corresponding Markdown of this article as a blog content template, but can also add more supplementary information.

```markdown
## Review Object

- Review Content: *Mid-term Report|Final Report*
- Submitter: *Student Name*

## Review Results

- Project Completion: *Evaluate whether students implemented the project according to the original plan and how well it was completed*
- Student Participation: *Evaluate whether students actively participated during project implementation*
- Code Contribution: *Evaluate the amount of code students contributed to the open source project in this project*
- Comprehensive Evaluation and Suggestions: *Summary evaluation and improvement suggestions*
- Final Review Result: "Pass" or "Fail" ("Fail" means project termination and students will not receive corresponding bonuses)
```

#### Final Report

##### Student Developers

###### 1. Final Video

- Videos need to be uploaded to YouTube and contact [Huan](https://wechaty.js.org/contributors/huan/) to add to wechaty's playlist.
- Considering domestic users, can be uploaded to bilibili or Tencent Video

You can refer to last year's Feishu project participating student, this year's Feishu project mentor [Fan Rui](https://wechaty.js.org/contributors/roxanne718/)'s videos:

- [SOC-Based on Open API Packaging Wechaty Interface Feishu Chatbot-Final Report](https://www.youtube.com/watch?v=eutz5EMlJCI)
- [SOC-Based on Open API Packaging Wechaty Interface Feishu Chatbot-Demo Demonstration](https://www.youtube.com/watch?v=_y5DktHdL9U)

###### 2. Final Report

- Title: `OSPP 2021-Final Report-Your Title`
- Filename: `2021-XX-XX-ospp-final-XX`
- Report category should be: `project`, `ospp`
- Report tags should at least include: `summer-of-wechaty`,`summer-2021`,`ospp`,`ospp-2021`,`final`
- Report content should at least include:
  - Project information
    - Project name
    - Solution description
    - Time planning
  - Project summary
    - Project results
    - Final report video
    - Final report PPT
    - Problems encountered and solutions
  - Mentor review
    - Review object
    - Review results

**When submitting PR, please note: Tag this PR with `ospp` label, and fill in your project's GitHub Issue link in the PR to facilitate committee review.**

###### 3. OSPP 2020 Student Final Report Reference

- [Summer 2020 Design and Implement Plugin System for go-wechaty Final Report](https://wechaty.js.org/2020/09/27/go-wechaty-plugin/)
- [Summer 2020 Group Chat Assistant Bot Based on python-wechaty Final Results Display](https://wechaty.js.org/2020/09/26/chassist-bot-final/)
- [Based on Open API Packaging Wechaty Interface Feishu Chatbot: Final](https://wechaty.js.org/2020/09/30/wechaty-puppet-lark-final-blog/)
- [Building a Meme Bot Based on Python-Wechaty POC Final Blog](https://wechaty.js.org/2020/09/27/python-wechaty-meme-bot-final/)
- [Summer 2020 Writing a "Daily Sentence" Plugin Final Report](https://wechaty.js.org/2020/09/26/wechaty-words-per-day-plugin-final/)
- [Douyin Chatbot Based on RPA-Encapsulated Wechaty Interface Final Report](https://wechaty.js.org/2020/10/13/wechaty-puppet-douyin-final-term/)
- [Summer 2020 Based on Open API Packaging Wechaty Interface Enterprise WeChat Chatbot Final Results Display](https://wechaty.js.org/2020/09/28/puppet-work-final/)

##### Community Mentors

###### 1. "Summer 2021" Organizing Committee Review Report

During October 1 - October 14, submit review reports in Issues on the organizing committee's Gitlab and cooperate with the organizing committee for final review.

###### 2. Wechaty Community Final Blog Review

Before October 14, submit supplementary review result information in Pull Requests form under the corresponding student blog in the [wechaty.js.org](https://github.com/wechaty/wechaty.js.org) Repo.

At the same time, according to community blog submission guidelines, review blogs submitted by students. After review approval, **Approve** this PR on GitHub, then submit it to Wechaty PMC for blog review. Note that community mentors must **prioritize and approve** their students' PRs in advance.

You can fully copy the corresponding Markdown of this article as a blog content template, but can also add more supplementary information.

```markdown
## Review Object

- Review Content: *Final Report*
- Submitter: *Student Name*

## Review Results

- Project Completion: *Evaluate whether students implemented the project according to the original plan and how well it was completed*
- Student Participation: *Evaluate whether students actively participated during project implementation*
- Code Contribution: *Evaluate the amount of code students contributed to the open source project in this project*
- Comprehensive Evaluation and Suggestions: *Summary evaluation and improvement suggestions*
- Final Review Result: "Pass" or "Fail" ("Fail" means project termination and students will not receive corresponding bonuses)
```

## More Content Introduction for OSPP 2020

- [Wechaty Summer of Code 2020 Kickoff Meeting](https://wechaty.js.org/2020/07/20/wechaty-soc-kick-off-meeting/)
- [Middle Term Demo Day](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.5ztnno5qivcb)
- Final
  - [OSPP Project Summary: This Summer, Stories of Wechaty Community and 9 Open Source Rising Stars](https://wechaty.js.org/2020/12/31/summer-2020-student-developers/)
  - [Open Source Software Supply Chain Lighting Plan Summer 2020 Results Announced: Projects Based on Wechaty Won Outstanding Contribution Award and Most Potential Two Major Awards!](https://wechaty.js.org/2020/11/14/summer-2020-wechaty/)
  - [Award-winning Student: A Pleasant Nanjing Open Source Summit Journey](https://wechaty.js.org/2021/02/17/summer-wechaty-nanjing-summit-journey/)
- [OSPP 2020 Project Introduction, Initial, Mid-term, Final Report Summary Table](https://docs.google.com/spreadsheets/d/1XcDoIczyIclqXP1p90Sz7S0n4Q22xjFzJmjPFlU2g1E/edit#gid=1646451274)

## OSPP Wechaty Org Admin Work Content

### Toolkit

1. Community Repo: <https://github.com/wechaty/summer>
1. Community Notification Issue: <<https://github.com/wechaty/summer/issues/Project> List Link Confirmed After Preparatory Meeting>
1. Community WeChat Group: ***Summer of Wechaty - SoW***
1. Community Org Admin Committee Group: ***Summer of Wechaty Org Admin SoW***
1. Wechaty Contributor Group: ***Wechaty Contributors***
1. All blogs published to Wechaty need to be tagged with the following tags:
    - ospp-admin
    - summer-202X (change 202X to current year)
    - summer-of-wechaty
    - ospp
    - ospp-202X (change 202X to current year)

### 0. Preparatory Meeting

1. Issue a call to the Wechaty Contributor group, calling on Wechaty Contributors to become Mentors for Open Source Summer of that year, and have Mentors publish tasks as Issues in the [Wechaty Summer Of Code Repo](https://github.com/wechaty/summer).
1. Invite all willing Mentors to join Wechaty OSPP's official WeChat group: `Summer of Wechaty - SoW`
1. After collecting all OSPP projects, publish a project list Issue. All important notifications for that year will be notified to the community in reply form under this Issue. Refer to the 2021 project list: [OSPP Project Notification ("Summer 2021") - 2021](https://github.com/wechaty/summer/issues/79)
1. Prepare for OSPP registration and related arrangements, participate in (hold) at least one meeting. Refer to 2021 preparatory meeting content:
    - [Summer of Wechaty, Here We Come](http://wechaty.js.org/2021/03/14/summer-2021-kick-off-meeting/)
    - [OSPP 2021 Project Status](http://wechaty.js.org/2021/06/11/ospp-startup-discussion/)
1. Complete the OSPP Guide Manual for that year and publish a blog, refer to [OSPP (Open Source Promotion Plan) Guide Manual - 2021](https://wechaty.js.org/2021/06/24/summer-wechaty-guide/)
1. Under the project list Issue, copy and reply with all work that Org Admins need to complete in checklist form, facilitating subsequent completion of related work by Wechaty Org Admins, and check it off in the Comment after completion

### 1. Initial Meeting

1. Confirm the time of the initial meeting with all Org Admins in the `Summer of Wechaty Org Admin |SoW` group, and send calendar invitations for the initial meeting to all participating Org Admins.
1. Organize mentors and students to complete the meeting, create the meeting in [Meeting Notes](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit), and guide students to complete registration. **Note to fill in name, one-sentence introduction, and email address, must have email!**, refer to 2021 meeting information: [Kick off OSPP First Meeting with Students](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.ufupcyw9mp0h). At the same time, synchronize at least the following three items of information to the community during the meeting:
    - Key time points for that year, including organizing committee report submission, community blog submission, community defense time, etc.
    - [OSPP (Open Source Promotion Plan) Guide Manual](https://wechaty.js.org/2021/06/24/summer-wechaty-guide/)
    - [Wechaty Community Open Source Collaboration Best Practices Guide](https://wechaty.js.org/2021/06/23/the-wechaty-way/)
    - Each student's work progress, reply under their project's Issue
1. Publish an announcement in Wechaty OSPP's official WeChat group (`Summer of Wechaty - SoW`). Previous participants can also observe the initial meeting to understand that year's projects.
1. Invite all selected students to join Wechaty OSPP's official WeChat group: `Summer of Wechaty - SoW`
1. Publish an initial blog after the initial meeting ends, refer to [Wechaty Open Source Promotion Plan 2021 Kickoff Meeting](http://wechaty.js.org/2021/06/24/wechaty-soc-kick-off-meeting/)
1. Promote all students to submit community initial report blogs, and synchronize initial blog completion progress under that year's <u>OSPP Project Notification</u> issue, refer to [2021 OSPP Initial Blog Completion Status](https://github.com/wechaty/summer/issues/79#issuecomment-882059181). Can also initiate a relay in the corresponding WeChat group with students.

### 2. Mid-term Defense (Mid-term Demo Day)

1. Confirm the time of the mid-term meeting with all Org Admins in the `Summer of Wechaty Org Admin |SoW` group, and send calendar invitations for the initial meeting to all participating Org Admins.
1. Issue mid-term defense notification, refer to [Wechaty Community Mid-term Defense (Mid-term Demo Day) Notification](https://github.com/wechaty/summer/issues/79#issuecomment-899086777)
1. Require students to record mid-term defense videos, including **defense video** and **Live Coding** two videos, and reply with corresponding YouTube links and domestic video website links under their project's Issue.
1. Promote students to submit organizing committee-required mid-term reports on time, and initiate a relay in Wechaty OSPP's official WeChat group (`Summer of Wechaty - SoW`). Students who have completed report submission complete the relay. Relay content reference:

    ```txt
    Relay
    "Summer 2021 Mid-term Student Report Submission Confirmation"

    The organizing committee requires submission before XX (time). If students do not submit reports in the system before the deadline, the project will be deemed as automatically abandoned, and the organizing committee will no longer support this project.

    Wechaty OSPP'21 mid-term submission content includes:
    1. Reports required by the organizing committee
    2. Blogs required by the Wechaty community

    Each project's students, after confirming completion, please relay and confirm. (Also update the corresponding GitHub Issue)
    Example: Name/Project Abbreviation/Issue#
    ```

1. Promote mentors to complete mid-term report reviews on the organizing committee-required platform on time, and initiate a relay in Wechaty OSPP's official WeChat group (`Summer of Wechaty - SoW`). Mentors who have completed reports complete the relay. Relay content reference:

    ```txt
    #Relay
    "Summer 2021 Mid-term Mentor Review Completion Confirmation"

    The organizing committee requires completion before XX (time). If mentors do not complete reviews in the system before the deadline, the project will be deemed as automatically abandoned, and the organizing committee will no longer support this project.

    Each project's mentor, after confirming review completion, please relay and confirm. (Also update the corresponding GitHub Issue)
    Example: Name/Project Abbreviation/Issue#
    ```

1. Promote all students to submit community mid-term report blogs, and synchronize mid-term blog completion progress under that year's <u>OSPP Project Notification</u> issue, refer to [2021 OSPP Mid-term Blog Completion Status](https://github.com/wechaty/summer/issues/79#issuecomment-899023310)
1. Confirm all students have completed the two videos required by the Wechaty community, and initiate a relay in Wechaty OSPP's official WeChat group (`Summer of Wechaty - SoW`). Students who have replied with video links under Issues complete the relay. Relay content reference:

    ```txt
    #Relay
    "Summer 2021 Mid-term Demo Day Video Completion Confirmation"

    [Fireworks]XX (time)[Fireworks] Wechaty's mid-term Demo Day presentation will be held, each student will conduct Wechaty's mid-term defense.

    Mid-term Demo Day videos require 2 videos:
    1. Mid-term report video (3-5 minute, with live appearance, PPT-based presentation)
    2. Live Coding video (unlimited duration, with live appearance Live Coding)

    Can refer to last year's @Fan Rui's videos:
    1. Defense video: https://www.bilibili.com/video/BV1n54y1U7Fn
    2. Live Coding: https://www.bilibili.com/video/BV1v54y1e7LM

    Video submission deadline:
    [Firecracker] XX (time) [Firecracker]
    Please submit on time, or it may affect project scoring.

    Each project's students, after completing video recording, relay and confirm. (Also update video links to the corresponding GitHub Issue)

    1. Name/Project Summary/Issue#
    ```

1. Organize mentors and students to complete mid-term defense, create mid-term defense meeting in [Meeting Notes](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit), and guide students to complete registration. **Note to fill in name, one-sentence introduction, and email address, must have email!**, refer to 2021 meeting information: [Wechaty OSPP (Open Source Summer) Midterm Demo Day](https://docs.google.com/document/d/1fVCk8qRYc4RKGMf2UY5HOe07hEhPUOpGC34v88GEFJg/edit#heading=h.5ztnno5qivcb). At the same time, list each student's defense content in the Agenda, refer to the following:
    - [Student Name] Project Name
      - Defense Video: <https://Defense> Video Link
      - Live Coding Video: <https://Online> Live Coding Video Link
1. Publish mid-term blog after mid-term defense ends, refer to [Summer 2020 Mid-Term Demo Day](https://wechaty.js.org/2020/08/22/summer-2020-wechaty-soc-midterm-demo-day/)

### 3. Final Project Defense (Final-term Demo Day)

TBW

## Excellent Project Selection

In 2020, after 3 months of effort, 151 students finally passed the final project review. Students' final reports and daily R&D work were unanimously recognized by the community and organizing committee. From the project perspective (project completion quality, code readability, document completeness making the project sustainable), community perspective (student contribution to the community, importance of completed projects to the community, etc.), student perspective (student progress during activity participation and rapid learning ability), open source perspective (students showing potential and willingness to continue contributing to open source in the future), and other aspects, after comprehensive review, [Summer 2020's final awards](https://isrc.iscas.ac.cn/summer2020/#/announcement) were determined:

- @univerone (Jiang Shanshan) from the Wechaty community won the Summer 2020 Outstanding Student Contribution Award!
- @kxz18 (Kong Xiangzhe) from the Wechaty community won the Summer 2020 Outstanding Student Most Potential Award!

This year, Wechaty will also provide the following awards for particularly outstanding students and projects:

- Wechaty Outstanding Project Award
- After final project completion, high-quality projects will be merged into Wechaty's official org.

Looking forward to the summer of 2021, you can also successfully pass the final project review after 3 months and win excellent awards issued by OSPP!

---

> 本文也有[中文版本](/2021/06/24/summer-wechaty-guide/)。
