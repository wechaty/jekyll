---
title: "WeChat App Communication Protocol Case Study Reference Guide"
author: h4dex
categories: hacking
tags:
  - hook
  - featured
  - ecosystem
image: /assets/2018/h4dex-wechatprotocol.webp
excerpt: >
  An in-depth technical analysis of WeChat's Android client communication protocol, including network architecture, message formats, synchronization mechanisms, and a reference implementation called MicroChat based on Mars framework.
---

In early January, I accidentally discovered in a WeChat enthusiast study group a discussion about **MicroChat** (based on Mars) - code utilizing the WeChat Android APP client communication protocol! Shocked and in awe of the author, I downloaded it excitedly and made some modifications and application tests to the original version based on reference articles. Later, I tested and added some functional implementations, as well as ideas for extending simulated arbitrary device login verification and specific function handling. My abilities are limited and my technical skills are weak, but with a passion for technology and to share my experiences with more learners, I've compiled this article to give everyone a first look. I've also expanded on some basic MicroChat functions. If there are any errors, please feel free to criticize and correct!

![Wechat Protocol](/assets/2018/h4dex-wechatprotocol.webp)

## Preparation

> Development Environment:

```text
Development Tools: Visual Studio 2015 or above (marsWin32SDK requires vc140+)
Packet capture and analysis tools: Wireshark / Fiddler / Charles, TCPDump
Compilation dependencies: Boost, ATL
```

> Include Directories

```text
If your machine lacks referenced directories, please add them manually
```

> Other Reminders

```text
Compilation order: Mars dependencies / SQLite3 -> MicrochatSDK (based on Mars Win32 Example) -> MicroChat (user layer)
```

## How Does WeChat Communicate?

> Ports

After scanning WeChat's common domains, remote ports discovered include: 80 443 8080 5222 5223 5228, etc.

> Domains

```text
dns.weixin.qq.com
support.weixin.qq.com    80/8080
short.weixin.qq.com      443/8080 (sz)
long.weixin.qq.com       80/443 (sz)
wx.qlogo.cn              80
timg.cn, etc.
```

> Basic Execution Process Overview

1. After program startup, it first attempts DNS resolution of specific domains (the above domains, which return all nodes);

```text
dns query
dns.weixin.qq.com
Returns a group of IP addresses long.weixin.qq.com
Returns a group of IP addresses. In this communication, WeChat used the last IP as the connection address for the TCP long connection.
http://dns.weixin.qq.com/cgi-bin/micromsg-bin/newgetdns?uin=0&clientversion=620888113&scene=0&net=1
Used to request the server to obtain the optimal IP path. The server returns an xml defining domain:IP correspondence list through settlement.
Reading carefully, you can see WeChat has begun internationalization: Hong Kong, Canada, South Korea, etc.
For specific text, refer to: https://gist.github.com/yongboy/9341884
After obtaining the optimal IP for long.weixin.qq.com, establish a TCP long connection to 101.227.131.105
```

1. If DNS query is unavailable, the program switches to using hardcoded IP to connect to services;
2. If DNS is available, the returned IP is the result of ISP intelligent resolution, and the program uses the returned IP to connect to services;
3. The program uses HTTPS links during registration, verification, unblocking, mini-programs, and other built-in content requests, with encryption protocol being Tencent's mmtls;
4. The client uses TCP 80/8080 to connect to remote servers. Both 80/8080 ports can provide services simultaneously or individually;
5. Port 80 is for short connections, 8080 for long connections. The program will prioritize port 8080;

```text
Request confirmation after connection to retrieve data.
Submitted request includes: account, password, login method (can simulate any device~), device info, network info, network device info, geolocation, etc.

POST http://short.weixin.qq.com/cgi-bin/micromsg-bin/getprofile HTTP/1.1 (application/octet-stream)
Returns an attachment named "micromsgresp.dat", personal information

POST http://short.weixin.qq.com/cgi-bin/micromsg-bin/whatsnews HTTP/1.1 (application/octet-stream)
Still returns an attachment named "micromsgresp.dat"
Probably WeChat new version introduction and verification, news, subscription updates, etc...

POST http://short.weixin.qq.com/cgi-bin/micromsg-bin/downloadpackage HTTP/1.1 (application/octet-stream)
Output is micromsgresp.dat file
Then there will be another micromsgresp.dat creation, probably unread messages and contact list
(Testing shows approximately 1-3 times total)

GET http://support.weixin.qq.com/cgi-bin/mmsupport-bin/reportdevice?channel=34&deviceid=A952001f7a840c2a&clientversion=620888113&platform=0&lang=zh_CN&installtype=0 HTTP/1.1
Client self and device information verification feedback
POST http://short.weixin.qq.com/cgi-bin/micromsg-bin/reportstrategy HTTP/1.1 (application/octet-stream)
Returns chunked data
GET http://wx.qlogo.cn/mmhead/Q3auHgzwzM7NR4TYFcoNjbxZpfO9aiaE7RU5lXGUw13SMicL6iacWIf2A/96
Images and other static resources are assigned to the wx.qlogo.cn domain, downloaded and cached locally asynchronously based on loading or manual access.
```

1. When 2 consecutive heartbeat sends fail, the client will prompt "Current network conditions are poor, submit feedback data?" After confirmation, the client attempts to submit feedback data via web;

```text
Heartbeat frequency is approximately 5 minutes

After login, a long HTTP connection to long.weixin.qq.com is established, port 8080

Examining the long connection initial data communication, no data containing "HTTP" was found, initially thought to be WeChat's custom TCP/HTTP communication format. Based on analysis, likely used for data retrieval, heartbeat message exchange, etc.

Initial message transmission
Personal data, offline unread message portions, etc. are obtained separately through POST HTTP short connections, as above...
```

> Protocol Text Analysis

WeChat protocol messages may be as follows:

One message packet = message header + message body
Message header fixed 16 bytes length, message packet length defined in first 4 bytes of message header.

Taking only line 0000 as example, 16-byte header:

```text
00 00 00 10 00 10 00 01 00 00 00 06 00 00 00 0f
```

Hexadecimal representation, every two adjacent digits represent one byte.

WeChat message packet format:

1. First 4 bytes indicate data packet length, variable. Value of 16 means a complete data packet containing only the header (may represent predefined business meaning), possibly followed by other message packets
2. 2 bytes indicate header length, fixed value, 0x10 = 16
3. 2 bytes indicate protocol version, fixed value, 0x01 = 1
4. 4 bytes operation code indicating number, variable
5. Sequence number, variable
6. After the header comes the message body, non-plaintext, encrypted form
7. One message packet, minimum 16 bytes

```text
If you're not familiar with message formats, you can learn by referencing other low-level communication protocols like ModbusTCP
```

> Protocol Summary

1. Published messages correspond to an ID (only needs to be unique in one direction, server may judge duplicate reception based on ID), message retransmission mechanism ensures limited retries, failed retries give user prompts, successful sends get feedback confirmation, client only knows sending succeeded upon receiving confirmation. Sending messages may not generate new SyncKey.
2. State message synchronization mechanism based on version number (SyncKey), incremental, ordered transmission needs met naturally. Long connection notification/short connection retrieval, confirmation, etc., simple interaction ensures reliable and accurate message delivery.
3. Both client/server store message ID processing records, avoiding repeated consumption. Client gets latest messages but doesn't confirm, server won't consider message consumed. Next time client will re-retrieve, will check if current message was processed. Based on some phenomena and speculation.
4. Overall, WeChat protocol is cross-platform (can be presented via TCP or HTTP, processing can be unified), synchronizes through "handshake," very reliable, any platform can support it well
5. WeChat protocol minimum cost is 16 bytes, most times several message packets are batched together for transmission. Can't say the most concise or most traffic-saving, but very successful.
6. If server detects uncertain factors, may cause WeChat to enable SSL protocol for regular TCP long connection transmission. Short connections have no changes.

## MicroChat Usage Guide

> Request Addresses

```cpp
#define CGI_NEWSYNC "/cgi-bin/micromsg-bin/newsync" //Sync latest server messages
#define CGI_MANUALAUTH "/cgi-bin/micromsg-bin/manualauth" //Login
#define CGI_NEWSENDMSG "/cgi-bin/micromsg-bin/newsendmsg" //Send text message
#define CGI_NEWINIT "/cgi-bin/micromsg-bin/newinit" //First login, initialize database
#define CGI_GETPROFILE "/cgi-bin/micromsg-bin/getprofile" //Get personal info
#define CGI_SEARCHCONTACT "/cgi-bin/micromsg-bin/searchcontact" //Search new friends
#define CGI_GETCONTACT "/cgi-bin/micromsg-bin/getcontact" //Find new friends
#define CGI_VERIFYUSER "/cgi-bin/micromsg-bin/verifyuser" //Add friends
#define CGI_BIND "/cgi-bin/micromsg-bin/bindopmobileforreg" //First login SMS authorization
```

For other functions, add request addresses yourself, such as FindNearBy for nearby people, etc.~

> Multi-Device Online Extension

1. QR code scan login (Method to get QR code cannot be obtained from Android version, need to packet capture from iPad version)
2. Packet capture different device login requests, customize login request parameters to simulate.
3. Only login verification. SYNC part not implemented, slightly different on some platforms...

> UI Implementation

The code uses Duilib interface. Since WeChat message functionality is complex, handling data in one Notify in Duilib can be troublesome. It's recommended to consider Qt / MFC / WebUI for the View layer. Or use WinForm or WPF for simpler implementation.

> Utilize Open Source Libraries to Complete Other Functions

1. FFmpeg - Video and audio file transcoding and playback
2. Avcodec - Audio file transcoding and playback
3. CEF3 - Provides simulated WeChat built-in browser access function (mini-programs not supported)
4. Screenshot tool
5. proxy
6. SQLite3

## Appendix

Microsoft Exchange Active Sync protocol, abbreviated as EAS, divided into foldersync (synchronize folder directory, i.e., which folders are in the mailbox) and sync (which documents are in each folder).

A netizen's summary of protocol conversation example:

```c
Client: synckey=0 //First time key is 0
Server: newsynckey=1235434 //First time returns new key
Client: synckey=1235434 //Use new key to query
Server: newsynckey=1647645,data=***** //First query, get new key and data
Client: synckey=1647645
Server: newsynckey=5637535,data=null //Second query, no new messages
Client: synckey=5637535
Server: newsynckey=8654542, data=**** //Third query, incremental sync
Adjacent requests in the above page are all at fixed time intervals, such as two minutes
Client uses old key to mark its state each time, server returns new key and incremental data together each time.
Key is incremental but not required to be continuous
A certain parameter in the request determines whether server returns immediately
```

## Portal

Original Github Portal (DNS error 301 issue fixed):
> <https://github.com/InfiniteTsukuyomi/MicroChat/>

Python Version
> <https://github.com/InfiniteTsukuyomi/MicroChat/tree/master/test>

## Acknowledgments

Special thanks to authors of WeChat protocol analysis articles on CSDN and Cnblogs. Your reference articles guided me in learning and verification, providing great inspiration and help.

Code publicly released by @InfiniteTsukuyomi.

Thanks to Tencent WXG's open source spirit and dedication, providing a large amount of open source references and article explanations.

Reference links:

<http://www.blogjava.net/yongboy/archive/2014/03/05/410636.html>

## Serious Disclaimer

> Do not distribute for any commercial purposes, violators are responsible for consequences!
> Blog: <https://www.icefox.org>

---

> 本文也有[中文版本](/2018/03/10/wechat-protocol-reference-guide/)。
