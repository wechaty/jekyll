---
title: "I created a drop-in WeChat client replacement that is fully open source."
excerpt: "I thought an independent WeChat client was out of reach. A week with AI agents changed my mind."
categories: project
author: thisnick
tags:
  - wechat
  - social
  - reverse-engineering
  - frida
  - ai
  - agent
image: /assets/2026/10-reverse-engineering-wechat-native-client/teaser.webp
---

I never thought it was possible, but now I’m using my own [WeChat client](https://github.com/thisnick/agent-wechat). I can send and receive messages, view images, and listen to voice notes. The client is working locally and will be publicly available as open source in the next few days. All my previous research told me this was impossible. I know nothing about reverse engineering and I do not know how to use Frida or the other reverse engineering tools, but I did it in one week.

## AI agents demand more ambition, but finding a project that warrants it is hard

People claim that agents now let them ship larger software than they could before. DHH said of Omarchy Quattro that he “would never have attempted something as ambitious as Quattro without” the models, which produced a codebase four times the size of the previous series largely from 40,000 lines of Quickshell QML, after three months and a thousand pull requests.[\[1\]][1][\[2\]][2] On the same project he described being “granted a limitless ceiling on my ambition” and being able to look at any feature on Windows, Mac, or other Linux systems and say “I want that.”[\[3\]][3] Theo wrote of his Rust port of the TypeScript compiler: “I’ve never read a line of this code.” He also reported burning roughly $400k of Codex tokens over months with little progress, then reaching a working version in about two weeks with Opus.[\[4\]][4] Both treat this as reason to attempt more ambitious projects. It is impressive that people have done that. In my own experience it is hard to find projects that are both ambitious and worth the effort.

I have been in software engineering for 18 years. I am not currently at a large company, but I have friends who are. From their work and mine, the usual constraint is knowing what is worth building rather than lacking a large assignment. I have personal projects that already use agents: a sync from Google Messages into my AI tools, a voice-call plugin for OpenClaw, and the prior Agent-WeChat release that automated the official Linux client. None of them required the volume of tokens or the scale of ambition in the examples above. Part of the gap is imagination. Building the kind of projects DHH and Theo describe is not a matter of adding more features to existing work. It requires identifying something you had not previously considered building.

## A message about REA kicked off the attempt

I was looking for an ambitious project I could use to test what the agents could actually do when Huan sent me a message about REA. He asked me to look into the tool and see how it might help with Agent-WeChat. My immediate reaction was to apply it to the work I was already doing: finding offsets for the next WeChat build. I had finished that work the week before in a few hours, so the message looked like an incremental improvement to the existing integration.

After the message I kept thinking about what he had sent. It was not until a few days later that it occurred to me I could attempt something much more ambitious: rebuild the WeChat client as open source, something that had not been practical before.

## Fully reverse engineering WeChat has required the skill of a few people

Prior public work on reverse engineering WeChat falls into a few categories. None of them produced a maintained, open, independent client that fully reimplements the protocol and local formats without relying on the official binary.

| Area | What exists | Scope and limitations |
|---|---|---|
| MMTLS and network protocol | Citizen Lab analysis (2023–2024) with Frida tooling to intercept and decrypt traffic; older academic opcode mapping | Documents dual encryption layers and request formats. Security/privacy focused, not a usable client. |
| Wechaty / PadLocal | Reverse-engineered iPad protocol; commercial puppet that proxies traffic | Heavy obfuscation (functions >70k lines), device fingerprinting, custom algorithms. Not an independent open reimplementation. |
| Local databases | Multiple tools extract SQLCipher/WCDB keys from memory (Windows, macOS, Linux) | Version-sensitive; enables reading history but not live protocol or media transfer. |
| Media and CDN | Partial write-ups of CDN paths, image DAT formats, and related AES keys | Mostly one-off analyses or hooks; incomplete independent upload/download and storage formats. |
| Hooks and instrumented clients | Frida-based bots and RPA (WeChatFerry, macOS hooks, earlier Agent-WeChat) | Drive or intercept the official binary. Break on updates; require the official process. |

What has been scarce is a complete, open, independent native client that handles login, synchronization, messaging, media, and compatible local storage without the official binary. The existing pieces required substantial manual reverse engineering of obfuscated code and frequently changing offsets.

## I tried this before and it was hard

In March I spent about a month building the first version of Agent-WeChat, with a little over two weeks spent on reverse engineering. I used Claude Code and Frida against the official Linux client to turn it into something an agent could drive. The goal was a CLI, an OpenClaw plugin, and a Wechaty puppet that could send text, receive messages, and download images without the GUI.

Most of the reverse engineering was done by Claude Code. I described the goal and it located the SQLCipher databases, suggested memory scanning for the cipher contexts, recovered the keys, and worked out the image DAT decryption. I spent most of that reverse-engineering time directing it and verifying results rather than writing the analysis myself. It handled the database and media extraction well enough to make the RPA integration usable. It was less effective on the live protocol side. I wrote up the details at the time.[\[5\]][5]

I concluded a full independent client was still out of reach. Even a narrower attempt to intercept incoming messages kept the model working for roughly a day without meaningful progress. It would reach the context limit, compact, and continue working, but lose track of the investigation. Then it would reach the limit and compact again. It kept working, but it was not getting anywhere. If a single send path already took a day without a result, maintaining the reverse engineering against every new binary drop looked impractical. I kept the project at the RPA level because driving the official client was more maintainable than reverse engineering the protocol on each update.

## The model got fast enough for offset updates, but can it reverse engineer the wire protocol?

The week before Huan’s message a new WeChat binary dropped. Updating the Frida offsets for the previous release had taken about two days. With GPT-6.1 Sol it took roughly an hour to update the offsets for both architectures, then another hour to handle original-size image downloads. That was the first clear difference from the March models.

Offset speed was not enough. I still needed evidence that the wire path itself could be reconstructed. Over the course of one day I asked the model to use REA against the Linux binary and produce a client that could log in and download recent messages without launching the official client.

From there the model recovered the protobuf fields for login and sync, implemented the inner encryption, fixed a short-connection routing mistake that had been causing session timeouts, and generated a working QR. After I scanned and approved it, the standalone client completed native authentication, corrected a key-mapping assumption, and downloaded 382 messages directly from WeChat’s servers (later expanded to 400 records and 257 chat messages across eight conversations from roughly the past day).

I was surprised it actually worked. Seeing a real session come back from the official servers made me confident the rest of the protocol could be reverse engineered as well.

## I found my ambitious project, and I was in awe

I had been looking for a project that would make me take the advice to be more ambitious seriously. This turned out to be it. I had decided an independent WeChat client was out of reach. A few months later, and after 91 recent commits, roughly 145,000 lines of code, and seven days of work, I was using one to send and receive messages, view images, and listen to voice notes. I was in awe of how far the agents had taken a project I would not have known how to attempt on my own.

What excites me about an open-source client is the control it gives people over how they use WeChat and the data stored on their own machines. People can inspect and change the client, give an AI assistant access to the conversations they choose, and build workflows around their messages. They can build tools to download and save available images and other attachments, maintain their own archives, and search or organize the data locally. Having the client code makes those choices much easier to implement.

The drop-in client is now working locally and will be publicly available in the next few days. From the point where the standalone process could log in and pull recent messages, the remaining pieces looked incremental rather than open-ended.

I am not publishing a full breakdown of the encryption and protocol reconstruction. Tencent has a reputation for going after people who reverse engineer WeChat, and I would rather not give them a reason to do so here. If you are interested in the details, reach out. For how the client works at a high level, see the official [Agent-WeChat repository](https://github.com/thisnick/agent-wechat); contributions are welcome.

## Appendix: High-level notes on the official client

These are observations from static mapping and dynamic tracing of the Linux binary (primarily 4.1.13.26 AMD64), plus protocol reconstruction against an isolated test account. They are not a complete specification.

The official Linux client is a multi-process application. The main process (`/opt/wechat/wechat`) is a statically linked Qt binary that holds the UI, database access, and key material. Helper processes based on Chromium (`WeChatAppEx`) handle web content, networking, and GPU. Networking and CDN sit on Tencent’s Mars stack, located through a two-level service registry of singletons (`CdnManager`, `StnManager`, DNS, etc.). Local data lives in SQLCipher databases written through WCDB.

A request to the servers crosses several layers: a numbered business protobuf (the CGI body), business-layer encryption (Hybrid12 before login, main13 after), a BF header with checksum, a route body, MMTLS records, and an HTTP POST on port 80 for the shortlink. The persistent longlink carries a 16-byte application envelope inside MMTLS records. Media bytes travel separately over the CDN; a final CGI creates the chat message. Three different number spaces are all sometimes called “command”: the CGI itself, the outer longlink command, and the `CmdItem` ID inside a NewSync reply. NewSync is CGI 138 and travels as longlink command 121.

Login uses a short sequence of CGIs (getloginqrcode, checkloginqrcode, secmanualauth, plus a saved-device path). After authentication the client keeps a push connection; a push only signals that something changed. The client then issues a NewSync with its SyncKey cursor and receives a batch of commands (messages, contact changes). Text goes directly; media is prepared, encrypted, uploaded to the CDN, and referenced by a subsequent CGI.

On disk a profile splits into domains: roughly 20 SQLCipher databases under `db_storage` (messages sharded by chat, contacts, sessions, media resources, etc.), encrypted `.dat` image files and caches, and small MMKV stores that hold the saved login material. Three unrelated secrets protect it: an account password that derives every database page key, a per-account image AES key plus XOR byte for the DAT files, and a static MMKV format key for the saved-login stores. The native client can read an official-format profile and, in limited cases, write selected fixtures back so the official client accepts them. Full concurrent writers are unsupported.

## Appendix: Local storage and key material

The official client stores chat history in roughly 20 SQLCipher databases under `db_storage`, written through Tencent’s WCDB layer. Messages for a given chat live in per-chat tables that can be sharded across files. Images on disk use a two-layer format: AES-128-ECB on the first 1024 bytes followed by single-byte XOR on the remainder. The AES key is a 16-byte ASCII string derived from a 32-character hex value; the XOR byte is per-account. Both were recovered from process memory after undoing a build-specific XOR mask.

Database page keys are derived from a single 32-byte account password plus each file’s own 16-byte salt. In the earlier RPA work the keys themselves were extracted from memory by scanning for SQLCipher cipher contexts. The native client can open all known databases from one password once it is known, and can decode the V2 DAT images. Saved login state lives in MMKV stores protected by a static format key for the build; those stores hold the AutoAuthKey, cookie, and device identity used for restart without a new QR.

These pieces are build-bound. Masks, offsets, and the exact memory layout change with each binary, which is why the March work stayed at the RPA layer and why the later native path treated the official executable only as a research reference.

## Appendix: Development environment

I ran the development environment on a Linux box, accessing Codex remotely from the Mac app and my phone. My main WeChat account remained on the official phone client.

The official Linux desktop client ran in a Docker container, where the agent could instrument it with Frida and observe its behavior. Codex used REA for static analysis of the binaries and runtime investigation against the containerized client. The standalone native client ran in a separate container, allowing us to test its implementation independently of the official desktop application.

[1]: https://x.com/dhh/status/2085308432593088685  
[2]: https://x.com/dhh/status/2087156526058230092  
[3]: https://lexfridman.com/dhh-2-transcript/  
[4]: https://github.com/pingdotgg/ts-rust  
[5]: https://thisnick.me/blog/agent-wechat/
