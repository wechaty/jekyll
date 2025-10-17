---
title: ' "New Wechaty Puppet Service: PadLocal"'
author: padlocal
image: /assets/2020/10-puppet-padlocal-intro-en/logo.webp
categories: announcement
tags:
  - news
  - puppet
  - padlocal
  - puppet-provider
  - puppet-service
excerpt: >
  Introducing PadLocal, a new Wechaty puppet service with a unique stateless architecture. All traffic is proxied through the local puppet client, ensuring better IP isolation, data security, and system scalability.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2020/10/12/puppet-padlocal-intro/).

Hello everyone, I'm the developer of PadLocal, and everyone calls me "Haoda". In the past year or two, our team has been working on community-related products, and naturally, we've been using Wechaty. Gradually, we've come to appreciate and trust Wechaty and the entire community more and more.

A few years ago, while working on a web scraping system, I first encountered Wechaty. That project required regularly pushing scraper status updates and actively querying scraped content. At the time, there was a popular phrase: "Conversation as a Service", so I wondered if we could implement these features through WeChat. With the help of Wechaty, we quickly implemented all the functionality, and the final results were excellent.

## PadLocal: Wechaty puppet service provider

However, at that time, the puppets in the community were not particularly perfect, and there were some pain points during usage. Moreover, puppet lifecycles were not very stable - after using one for a while, it might no longer be maintained. We were concerned that this uncertainty would affect our business, so we decided to develop our own puppet. Additionally, as one of the early iOS developers in China, I was confident in my deep understanding of iOS and had also dabbled in reverse engineering, so this idea didn't seem impossible.

Thus began the long journey of reverse engineering, starting from decrypting the App and decompiling WeChat with IDA. Before doing this, we anticipated that the process would be difficult and we'd encounter various hard nuts to crack, but we never expected it to be so arduous. Although I had played with reverse engineering before, it was just for fun - modifying small App features, grabbing red envelopes, etc., fairly elementary stuff. The initial stage was quite pleasant because you could easily see your growth with each step, feeling like you leveled up with each monster defeated. But as we went deeper, we encountered truly difficult challenges, and after various tricks, research, and consultations all failed, we sighed and felt like the "donkey from Guizhou" (a Chinese idiom about exhausting one's tricks). We had thoughts of giving up, but we were always unwilling to quit and persevered by gritting our teeth. Here I'd like to share a few such "embarrassing" moments:

1. **Handling Code Obfuscation**

   WeChat obfuscates sensitive code. For code obfuscation, I recommend checking out [ollvm](https://github.com/obfuscator-llvm/obfuscator/wiki). Generally speaking, code obfuscation has several techniques: 1. **Control Flow Flattening**, 2. **Bogus Control Flow**, 3. **Instruction Substitution**. Quarkslab's article ["Deobfuscation: recovering an OLLVM-protected program"](https://blog.quarkslab.com/deobfuscation-recovering-an-ollvm-protected-program.html) also introduces some deobfuscation methods, but the examples mentioned in the article are child's play compared to what we encountered in WeChat. For instance, one of WeChat's functions after obfuscation had over 70,000 lines, and decompiling it with IDA could take an entire day. By slowly analyzing this code every day, we summarized many patterns. So I wrote a small tool for deobfuscation, and through continuous trial and correction, we finally successfully deobfuscated the code.

1. **0305 Algorithm**

   WeChat itself performs strict verification on the client, including device environment and device fingerprint information. This means that using tools found online to modify WeChat features (like grabbing red envelopes) can easily be detected by WeChat, and getting banned is probably just a matter of time. This requires encryption/decryption and signature verification mechanisms, and the 0305 algorithm is one of the more difficult ones. First, the code itself is obfuscated, and secondly, even after deobfuscation, it's very difficult to understand its logic, such as what specific algorithm is used and the encryption/decryption and signature verification process. So we could only slowly explore, continuously observing the data changes at each step, figuring out some possible patterns. Finally, after many attempts, we hit upon the correct algorithm and process.

After experiencing and successfully solving these difficulties, we actually felt much more confident. When we encountered more challenges afterward (and there were still many), there were still moments of frustration, but more often we believed we could complete the challenge. Overall, this journey has been one pitfall after another. After solving one problem and happily raising our heads again, thinking "the sky has cleared, the rain has stopped, and I think I can do it again", WeChat would soon teach us a lesson, so we've always maintained a sense of awe towards WeChat.

Finally, we created a fully implemented puppet called PadLocal. As for why it's called "PadLocal"? This relates to our puppet's overall design and how it differs from other puppets. PadLocal's biggest features are:

* Account state hosting method
* Communication method with WeChatServer

When designing the puppet, we first investigated other puppets in the community and studied their implementation principles. We found that most other puppets are designed like this: the puppet server manages and maintains the state of hosted accounts. All requests are completed through the chain `puppet -> puppet server -> WeChatServer`. For message pushing, a long connection is established between puppet and puppet server, and a corresponding long connection is also established between puppet server and WeChatServer. When new messages are pushed, they reach the puppet end through the chain `WeChatServer -> puppet server -> puppet`. In this design, the puppet server acts as a stateful proxy, with all traffic being forwarded by the server. In our view, this design may have several potential disadvantages:

1. Because ultimately all communication with WeChatServer is done by the puppet server. If a puppet server hosts multiple accounts and doesn't configure corresponding proxy strategies for each account, these accounts will share the puppet server's IP. From a risk control perspective, this easily creates risks. Moreover, once some accounts have a relatively high risk level, it's easy to contaminate other accounts in the same IP pool, harming the innocent.
2. All traffic is forwarded through the puppet server, creating considerable pressure on its bandwidth, especially when hosted accounts generate large amounts of multimedia resources such as images and videos.
3. Since the puppet server maintains the state of hosted accounts, the puppet server is stateful. From a system architecture perspective, stateful servers face significant challenges in system stability, availability, and capacity planning. If some servers in the cluster go down and the backup switchover mechanism is not well designed, some accounts can easily become unavailable.
4. To ensure better availability and experience for the puppet, puppet servers usually cache (not necessarily permanently store) certain data (such as chat data). This means that the server inevitably needs to touch the business data of hosted accounts. This requires puppet providers to maintain extremely high industry self-discipline and ensure customer data security through adequate mechanisms.

Based on our thinking about these issues, we put all traffic forwarding work on the puppet side, **which is the origin of "Local" in PadLocal**. We utilized GRPC's bidirectional communication mechanism to make the puppet a proxy, forwarding all traffic to WeChatServer through the puppet. At the same time, the puppet maintains the long connection with WeChatServer. The advantages of this are obvious:

1. The IP used for communication between hosted accounts and WeChatServer is the IP of the puppet side, so different accounts naturally don't have the risk of sharing IPs.
2. Traffic for downloading images, videos, and other multimedia resources doesn't need to go through the PadLocal server. Moreover, not going through the server is more efficient.
3. Account state maintenance is completed on the puppet side, so the PadLocal server can be designed as stateless, making it naturally much simpler to deal with issues like scaling - simple is beautiful.
4. The PadLocal server doesn't save any business data, eliminating data security risks.

The topology diagram of the overall architecture is as follows:

![Topological Graph](/assets/2020/10-puppet-padlocal-intro-en/topological-graph.webp)

Looking back, by implementing a puppet, we ourselves have gained a lot. First, we have a deeper understanding of Wechaty and can better appreciate the designer's original intentions and the trade-offs involved. Wechaty's ease of use is the result of careful design. This has been a wonderful journey. Secondly, implementing a Wechaty puppet is a very challenging task, and completing such a task is of course very fulfilling. Furthermore, from an internal perspective, we can gain a deeper and more comprehensive understanding of WeChat's operational mechanisms and design philosophy. As a national-level communication software, WeChat's design is excellent, and various mechanisms and design concepts can completely serve as industry standards - it's truly the absolute king in this field.

Now we've decided to publicly release the PadLocal puppet. Our goal is to help everyone realize various creative ideas in the WeChat ecosystem, and also help the WeChat ecosystem develop in a richer and healthier way. Our existence is not for malicious purposes, but to help build a better society. For future plans, we will continue to actively maintain this puppet as WeChat versions iterate.

PadLocal is currently still in the beta testing stage, and there are still some minor issues that need to be resolved. We hope that more developers will participate and work together to bring this puppet to the next, more mature stage. We have a reward mechanism to thank partners who contribute to PadLocal, and specific rules are still being discussed. Currently, Tokens are gradually being opened to everyone through an "application + review" process. If you're interested, please contact the [administrator](mailto:oxddoxdd@gmail.com) and explain what kind of creative ideas you want to implement with PadLocal. We are also preparing more detailed documentation and guidance, so stay tuned.

Finally, Rome wasn't built in a day, and we were only able to complete this work by standing on the shoulders of giants. Thank you to all the friends who helped PadLocal come into being - much love.

> Chinese version of this post: [puppet padlocal intro]({{ '/2020/10/12/puppet-padlocal-intro/' | relative_url }})
