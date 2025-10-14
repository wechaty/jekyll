---
title: 'Chat Transcript - Jiarui Li (李佳芮): A Female Developer Taking a Step Forward'
author: lijiarui
categories: story
tags:
  - interview
  - news
  - chatbot
  - female-developer
image: /assets/2016/gitchat-lijiarui-interview.webp
excerpt: An insightful GitChat interview with Jiarui Li, a female frontend engineer, discussing WeChat robots, Wechaty framework, and her entrepreneurial journey in chatbot automation.
---

On Thursday, November 24th at 8 PM, the GitChat team launched a Q&A session with Jiarui Li (李佳芮), a female frontend technical engineer. Below is the reorganized transcript by host Xiao Bing, recording the wonderful exchanges between the speaker and users about WeChat robots.

## GitChat Interview

### Q: Can you tell us what WeChat robots can and cannot do currently?

A: Wechaty's implementation principle is to monitor all content of Web WeChat and encapsulate it into APIs for developers to use. So in principle, anything that can be achieved on Web WeChat can be done by WeChat robots. Note that I'm talking about Web WeChat, not the WeChat client. WeChat has cut many functions on the web version compared to the PC client, which has much richer functionality. So features like grabbing red packets can't be done because Web WeChat cannot detect red packet events. Also, transfer functions cannot be handled by robots.

### Q: The robot monitors the browser on PC and then calls WeChat APIs, while Mini Programs are "local" apps based on "WeChat OS" - is this explanation correct?

A: The robot monitors the browser, but it has nothing to do with WeChat APIs - it's completely hacked in. The robot is more like solving mechanized repetitive operations in operations, hoping to provide services during the chat process.

### Q: Since it's hacked into Web WeChat, will it be blocked one day?

A: If they force a ban, there are definitely ways to do it, but I personally think the possibility is relatively low. First, blocking would have technical costs, and WeChat also needs to consider ROI. Second, there are at least 20+ such open source projects on Git, and many were created years ago. WeChat can't be unaware of this, and from the perspective of technical research and Chatbot application research, this is meaningful. Third, if this doesn't threaten WeChat's ecosystem, it won't be blocked, although the batch friend deletion feature was previously blocked.

PS: I think the biggest possibility of being blocked is having your personal WeChat account banned. I've seen someone on a tech community say they made an anti-recall robot that would resend recalled messages intact via chatbot. They threw it into groups for everyone to play with. But because they didn't set character limits, no matter how long the messages in the group were, it would resend them intact, causing group spamming.

WeChat banned that account for 7 days - couldn't send messages to friends or post to Moments, but could send red packets to friends with reply content inside, which I found quite amusing. I once had issues because I didn't check if messages were from myself when testing group name changes, causing system messages and my own messages to mix up, making the group unusable. So when using it, pay attention to things like character limits and blocking messages from the bot itself - you can use message.self() for that.

### Q: What's the relationship between WeChat robots and the Mini Programs recently launched by WeChat officially, and how can they be combined?

A: WeChat robots and the recently launched Mini Programs serve different application scenarios. Mini Programs provide an entry point within WeChat's app to serve users, eliminating the need to download apps - many low-frequency app scenarios are suitable for Mini Programs. WeChat robots, essentially just WeChat accounts, are currently mainly used to free up manpower and eliminate many mechanical tasks people do on WeChat, like batch friend requests approval, adding people to groups, or batch deleting friends. This is more like Chatbots, hoping to provide services during chat processes. Besides mechanical operations, robots can push links to friends in chat pages - these links can be Mini Program links, app links, or official account links.

### Q: What's the disconnection probability for robots?

A: From my own usage experience, the Wechaty framework is very stable, but Web WeChat periodically kicks you out, requiring re-login. Wechaty has a feature where `wechaty.instance({ profile: 'test' })` saves your session information to a test.wechaty.json file. If disconnected, it automatically re-logs in (you can change 'test' to any name). I currently run two robots long-term on my server, and they drop about once a week. I introduced Server酱 in my article - a tool for pushing alert messages from servers to WeChat. Combined with Server酱, adding pushes during logout and scan events means you get notifications when disconnected, and if the session is lost, it pushes the QR code to you. It's quite nice - no need to worry about going to the server to log in after disconnections.

### Q: GitChat wants to use a WeChat account to automatically add people to groups (breaking the 100-person QR code limit). Is Wechaty the best choice?

A: I think it's an excellent choice. Actually, I started using Wechaty simply to break the 100-person group QR code limit. Use three key functions: get the contact through m.from() on the chat page, find the group through room.find(), then room.add(contact) to automatically add people.

### Q: Can WeChat robots detect if they're still friends with a contact?

A: Yes, Contact has a Contact.findAll() function that returns a Contact array with all your contacts. Then traverse this array, use contact.say() to send messages to all friends, and judge the reply type and content. The reply message type can be obtained through Message.type() - if it returns 10000, it's a system message. Once you determine the return is a "the other party is not your friend" system message, you know this contact is no longer a friend.

### Q: Don't WeChat robots get data through WeChat APIs? I'm thinking about a group recovery requirement - can this be implemented?

A: Robots don't use WeChat APIs, but your requirement can be implemented. However, you need to stay logged in long-term and store all your messages, so all content from login onwards can be searched. A feature I made for automatically adding people to groups has a small aspect similar to your requirement. When someone replies with the robot's password, the robot adds them to the group. If the person is already in the group, the robot will @ them in the group, bringing that group to the front of your chat interface. This way, people with many groups can find a long-dormant WeChat group through this method.

### Q: Now WeChat robots can handle many things for personal WeChat accounts. Have you considered how to design robots to make them more intelligent?

A: Yes, I have considered it. But I hope more that the first step is to make WeChat robots better at completing automated work - repetitive tasks that people need to do, like adding to groups, auto-replies, adding people, one-click group messaging, etc. The robot helps complete these first. This is also a major confusion many enterprises face in WeChat community operations. There's a great saying: "Machine should work, People should think."

I hope my WeChat robot can first solve many problems operations staff face, allowing them more time to think about activity planning, user retention, and even business monetization. On one hand, I hope to help enterprises save costs by enabling one operations person to manage thousands of groups and WeChat accounts. On the other hand, I hope to help enterprises free up manpower, liberating operations staff from complex mechanical operations to do creative things.

Regarding AI, some robot platforms are already doing very well - they specialize in this and are much more professional than us, with many brilliant algorithm engineers researching daily. Intelligence can use their APIs - I previously connected my WeChat robot with Turing Robot with good results. I hope more to cooperate with intelligent robot companies to jointly solve tedious problems in chat or community operations. Or rather, what I'm doing is more application-level chatbot attempts, exploring more needs at lower costs and iteratively solving problems with small costs.

### Q: The article mentioned several libraries for implementing WeChat robots. How did you compare and finally choose Wechaty?

A: I did compare several different libraries. My selection reason was simple - I looked at what language they were implemented in. Since I'm more familiar with JS, I used Wechaty. Actually, when choosing libraries, I found Python libraries were earliest and relatively most complete. But I didn't choose them for two reasons: first, I'm not as familiar with Python as JS; second, while Python libraries are early, their API encapsulation isn't very clean.

Here are the JS ones for your reference:

- Wechat4U: JavaScript implementation of WeChat web interface, compatible with Node and browsers
- Weixinbot Nodejs: Encapsulates web WeChat interface for programmable WeChat message control  
- WechatBot: Personal WeChat robot platform using Wechat4u web interface
- Wechat-user-bot: WeChat robot under assembly
- Hubot-WeChat Hubot: Robot with real WeChat account that can auto-reply to WeChat groups and contacts, and automatically send Hubot online status to maintainer's WeChat

### Q: The article mentions teaching dance and making videos. What benefits do you think dance has brought you?

A: First, dance brought me many friends - I met various interesting people outside work. Sometimes I'm quite boring in life, and being with these people makes me more interesting. Also, having a hobby makes weekly life more colorful. Since we shoot series videos, you have expectations like following a drama, but you're the protagonist or director - this feeling is wonderful.

Most importantly, dancing is exercise for me. Sweating weekly provides both physical and psychological relaxation, helping me better invest in work. This exercise has a side benefit - maintaining figure, which is very important for girls.

### Q: Juzi Interactive provides WeChat operations services. What opportunity led to starting WeChat services, and how do you want to develop in the future?

A: When I was in my first year of graduate school, official accounts just became popular. By coincidence, a graduated senior knew I wrote PHP in the lab. His friend had outsourcing needs, so he led several technical students to take projects. Later we simply rented a workspace near school where everyone would meet weekly to work on projects together. As projects became increasingly homogenized, we tried making a small platform, turning common needs like check-ins, form filling, WeChat walls, WeChat wedding invitations into modules for internal use. Later, as we took more development projects, we began trying to package them as services - perhaps this was the opportunity.

Later I participated in startup competitions with our wedding invitations and won VC funding, so I went to Shenzhen to do wedding O2O. It failed due to offline resources and product direction issues. After returning to Beijing, I returned to the old business of WeChat operations projects. We now also take H5 projects, website projects, and content operations needs, but this has become a red ocean with low profits.

Recently I discovered many repetitive tasks on personal WeChat accounts need automation, so I'm trying to move in this direction. Next, I'll modularize products, hoping to help more enterprises provide automation services in WeChat community operations, helping them save costs and free up manpower.

### Q: Regarding entrepreneurship, what thoughts can you share with everyone, and what advice would you give friends who want to start businesses?

A: Regarding entrepreneurship, from the various detours I've taken these years, focus might be most important. I used to think I had abundant energy and could do many things, so I'd make various attempts. But all attempts should preferably be within a limited domain, and projects must carve out relatively vertical fields - do that well first, then rapidly scale.

Also, entrepreneurship is business, so products must have commercial logic. When I first did wedding O2O, perhaps because I got millions in VC funding and the team wasn't large, thinking the company wasn't short of money, I simply thought if the product was good, everything else would follow naturally, falling into the trap of just focusing on product development. I didn't even think clearly about cash flow generation or profitability.

So now what I do tries to be more focused. I hope in the Chatbot field, starting from WeChat operations automation, to help enterprises and individuals solve actual operational automation needs, then try to polish and refine products. I hope those interested in Chatbots can chat together and spark good ideas.

### Q: As an excellent female programmer, do you have suggestions for other female programmers or girls who want to become programmers?

A: First, don't be afraid. Sandberg has a book called "Lean In" that encourages women to pursue their goals - I think these words are very applicable in the programming world too. For many girls, whether from technical backgrounds or not, there's fear of programming - always afraid of breaking servers or crashing programs. Actually not so - just do it. At worst, reinstall the system or rewrite code. Don't avoid doing things because you're afraid of making mistakes. Even now, I sometimes have this fear, which I should overcome myself. Many things in programming are like window paper - take a step forward, pierce through, and you'll find the programming world isn't so mysterious.

Also, when a large section of code won't debug and you don't know what's wrong, many girls suddenly feel desperate. Actually there's a trick - break the entire code into small segments and debug one by one to catch problems. Many experts debug programs this way too, but sometimes we don't dare break things down, falling into very confused situations we can't escape.

Finally, what I most want to say: it's not only men who can master programming. Many jobs don't distinguish between men and women, only between strong and weak - entrepreneurship is the same.

Original article: [GitChat - Chat Transcript - Jiarui Li: A Female Developer Taking a Step Forward][gitchat-url]

[gitchat-url]: http://mp.weixin.qq.com/s/dWHAj8XtiKG-1fIS5Og79g

---

> Chinese version of this post: [Chat实录｜李佳芮：向前一步的程序媛]({{ '/2016/12/04/gitchat-lijiarui-interview/' | relative_url }})
