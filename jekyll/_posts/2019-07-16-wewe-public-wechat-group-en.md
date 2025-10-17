---
title: "wewe - Making Group Messages Public to the World"
author: timqian
categories: project
tags:
  - startup
  - featured
  - social
  - utility
  - ecosystem
image: /assets/2019/wewe-screenshot.webp
excerpt: >
  wewe is an open-source tool that records and publicly shares WeChat and Slack group chat messages, making discussions searchable and accessible to everyone, with topic extraction and chat analysis features.
---

A few weeks ago, I shared my [Transparent Startup Experiment](https://blog.t9t.io/transparent-startup-experiment-2019-05-20/) on several forums and created a WeChat group for discussion.

Unexpectedly, over 500 people joined, and many interesting discussions emerged in the group.

Unfortunately, these discussions remained trapped in WeChat, only visible to those who joined the group. New members couldn't see old messages, and for repeated questions, I sometimes had to answer multiple times.

I kept thinking - could I make these messages public for everyone to see? This way, interested people could conveniently view chat history and search for content of interest. If I built such a tool, it would also be meaningful for other groups wishing to publicize their messages.

I had previous experience with [wechaty](https://github.com/wechaty/wechaty), so I got to work and built the MVP! After several weeks of design and development, I created [wewe](https://wewe.t9t.io)

## Value Provided by wewe

- Records group chat information in one place, visible to non-group members
- Searchable by search engines
- Topic extraction for easy browsing and searching
- Chat content analysis (unfinished)
- Supports various group chat tools (currently supports WeChat groups and Slack groups, with plans to support Telegram/Gitter and other mainstream group chat tools)

## Technical Implementation

[wewe](https://wewe.t9t.io) is an open-source project. For specific implementation details, see [GitHub](https://github.com/t9tio/wewe)

The WeChat portion is based on [wechaty](https://github.com/wechaty/wechaty). The basic principle is to launch a browser, log into web WeChat, then store received messages in a database.

## How to Join

Requirements

1. Inform all group members that group messages will be publicly available on the internet
2. If it's a WeChat group, designate a volunteer willing to collect topics (Slack doesn't need this, it has built-in threads feature)

How to Join

- WeChat: Add [timbot](../assets/2019/wewe-timbot.webp) as a friend, with remark "join wewe", then invite the bot into the group chat. If the content is suitable for publicity, I'll start collecting
- Slack: Join the [t9t.io slack group](https://join.slack.com/t/t9tio/shared_invite/enQtNjgzMzkwMDM0NTE3LTE5ZTUzYjU4Y2I0YzRiZjNkYTkzMzE1ZmM0NDdmYzRlZmMxNGY1MzZlN2EwYjYyNWVlMWY0Nzk2MDBhNWZlY2I)

## FAQ

- **Privacy**: Maximizing privacy protection for group members, so messages are anonymous by default. However, for members willing to make their identity public, we also support displaying nicknames, brief self-introductions, links, etc. e.g. t9t group members <https://wewe.t9t.io/chat/t9t.io%20community/members>
- **Pricing**: wewe is still in development, and because the website uses serverless development (aws lambda & dynamodb & s3), maintenance and server costs are relatively low. Free service provided for the first 30 groups to join. The charging model afterwards is still under consideration

### wewe is still a project under development. Feel free to comment and share your thoughts on it

> Author: [@timqian](https://github.com/timqian) Building transparent products at [t9t.io](https://t9t.io)

---

> 本文也有[中文版本](/2019/07/16/wewe-public-wechat-group/)。
