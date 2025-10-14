---
title: "I Built a Points Red Packet Robot with Wechaty"
author: iyjian
categories: project
tags:
  - code
  - finance
  - automation
  - experience
image: /assets/2017/iyjian-1.webp
excerpt: A developer's journey building an automated WeChat robot for exchanging credit card reward points through red packets, sharing technical challenges and lessons learned from scaling to 3000+ users.
---

I'm a self-taught programmer with a wife who loves playing with credit cards. My wife always forces me to participate in bank point activities. To save time, I built a points red packet robot using Wechaty.

![Product Screenshot][3]

The following is a journal-style account: first introducing my needs, then how I found Wechaty, and finally sharing insights and pitfalls from using Wechaty.

My encounter with Wechaty was quite coincidental. A certain bank's credit card had an activity where spending would earn you a red packet containing points, and when shared with friends, friends could also get points. This also meant you could collect points from friends' red packets - up to one red packet from each of 15 different friends daily!

Although this activity was small, many people participated. While the bank's intention was to make non-cardholders envious of these points through red packet sharing, leading them to apply for credit cards, credit card enthusiasts exchanging red packets among themselves was fine too. However, people around you unlikely have so many friends with this credit card for mutual exchange, so these resourceful people invented WeChat groups - 16 people per group, everyone sharing red packets with each other. After building the product, I collected user information through Tencent Analytics. I don't know how Tencent knows these people's education levels, but if this data is real, these people might seem boring, but they're quite well-educated - many have bachelor's degrees.

![Education Distribution - Tencent Analytics][2]

My wife is also a credit card enthusiast who likes tinkering with credit cards in her spare time. She was in a WeChat group with friends, tirelessly exchanging red packets daily, and she demanded I do the same. But I'm lazy - wasting so much time on these few points really pained me! So I'd forget this every few days, making group members upset with me. Once while dining with friends, I complained about this, and a friend recommended a WeChat red packet robot that could simplify this - just send red packets to the robot, and it would automatically return other people's red packets. I immediately looked into it and found it was indeed as he said - a personal WeChat account providing this function, very magical.

I thought this function wasn't too complex - essentially an inventory system with algorithms for reasonable distribution. Although solving trust issues (due to potential cheating) would take time, the key question was how to automate a personal WeChat account. I decided to research this.

I consider myself a data engineer, but I haven't touched much data in over 5 years. Many former colleagues work in big data departments at major companies. Unable to make a name for myself there, I became extremely interested in programming - something I wasn't good at and couldn't learn well. After five years, I finally got started and can at least write runnable code.

I decided to act immediately. First, I searched GitHub for keywords like WeChat and wechat, discovering that personal WeChat account automation had been done early on. Framework languages included Perl, Python, JS, C#, etc. Most implementations used web version interfaces directly, some used Android client hooks, but I didn't find open source projects using iOS client hooks - probably all went to make money in the black market.

Although I'm a second-rate programmer, I can use any language - in my eyes, it's all if/then/else/for anyway. I don't have much object-oriented thinking ;). So I picked a Perl-based framework I was somewhat familiar with for experimentation. I wrote my first hello world application - after receiving a message, append "你个头!" (nonsense!) and auto-reply. So when friends greeted me with "hey", it would reply "hey 你个头!", and asking "在吗" would get "在吗你个头!". After deployment to my personal account, this amused friends for quite a while. I believed I now had the capability to build a red packet robot.

If I decided to spend time on this, I wanted it to last. After comparing available frameworks, I found Wechaty was quite good - clear documentation, many commits, many stars, and written in relatively novel TypeScript, showing the author keeps up with times. Reading the documentation revealed the author's dedication - using programs to automatically obtain WeChat web version code, automatically comparing code diffs, creating issues when changes occur. I found this very advanced since such frameworks heavily depend on WeChat, and the biggest worry is WeChat causing problems. Having this spirit for operating open source projects is definitely trustworthy.

I found another friend to work on this together - he handled product design while I wrote code, allowing us both to focus. From starting this project to temporarily stopping personal account usage took about 2+ months. At peak, we simultaneously used Wechaty on three phones (since personal accounts max out at 5000 people). Too many things happened during this period to record in journal format, but I'll share some Wechaty-related issues and WeChat personal account operation problems we encountered for everyone's reference. Please correct me if anything's wrong (just learned this phrase).

## Proactive Friend Adding

After completing our system, we had no promotion channels or users, which troubled us. We went to credit card forums to find QR codes people left (they'd leave WeChat contacts on forums to find mutual red packet sharing friends). We promoted person by person, but after adding 20 people the first day, we couldn't add more. Later research revealed WeChat limits proactive friend adding, with various frequency restrictions for nearby people, shake, QR codes, etc. However, larger friend bases or older account ages allow higher quotas. Sure enough, after persisting two days, we could add fifty to sixty people daily. Turns out these things need "cultivation." Later we discovered many things need cultivation.

## Passive Friend Adding

Later we built some reputation, and influential existing players began promoting us. The first promotion was powerful - bringing 300+ new users the first day. While adding these people, auto-friend approval stopped working, but we could manually approve on phones. Since many people would add us daily, we accurately calculated when this function would break - WeChat web interface limits to 100 people in 24 hours. Exceeding 100 people meant definitely no auto-friend approval, requiring manual phone clicking. Two months later, 800+ people came to one WeChat account in one day. We discovered that clicking through 500 people, phones couldn't click approve either, with this blockade lasting 48 hours. This can't be cultivated. Later, with too many people, those who couldn't be auto-approved were left there - if they wanted to add again, they could; otherwise, tough luck.

## Changing Remarks

Since WeChat web version lacks good methods for getting user unique IDs, Wechaty recommends managing users by changing remarks via Contact.alias() method. Initially, I simply used randomly generated MD5 as user remarks. While this looked strange in contact lists, it was unique.

This approach has pitfalls since the name-changing interface can also break. Changing too many breaks it, and immediately changing names after auto-friend approval makes it break easier. We never figured out this interface's frequency limit since it always broke before the auto-friend approval interface, with unpredictable timing. But if auto-naming breaks, you can still provide services based on changed names since Wechaty internally stores users' temporary unique IDs. Name changes actually modify Wechaty's internal Contact objects first, then sync to web version. Wechaty communicates with web version through these temporary unique IDs, so as long as Wechaty doesn't restart, even failed name changes won't cause problems. But once restarted, everything gets chaotic.

Once this problem appeared, we dared not restart. We'd manually change names on phones (same issue - web interface frequency limits, but clients still work), ensuring changes to originally assigned MD5 strings recorded in the database. This was painful - we used Apple's cloud paste function between computer and phone to copy from database tables to phone for speed, but still spent over an hour daily with eye strain.

## Message Replies

Message replies also have frequency limits. Replying too fast results in muting at minimum, mutual friend deletion at maximum. When 800+ people came that day, we got "reply too fast" warnings and automatically deleted many friends. But this frequency can be improved. Our Robot #1 could handle 10,000 messages per hour at peak. One user sent 50 messages to our WeChat account, and I replied 50 times without muting warnings - this was "cultivated." But Robot #2 couldn't handle the day with 800+ people and immediately collapsed.

## Restarts

Wechaty initializes Contact objects at startup. With few contacts, this process is quick and imperceptible. With over 3000 people, problems may occur. First, servers must be good quality. Initially, I used a 1-core, 1GB regular disk cloud server. With 1000+ people, Contact initialization wouldn't work, often failing. Realizing I might have many accounts and add many people, I directly used a 12-core, 12GB SSD server. This supported three WeChat accounts per server, single accounts with 3000 people without problems. But with 3000+ people during message processing peaks (10,000 messages per hour), restarts wouldn't work either. Don't expect successful initialization - we encountered this many times. In confusion, we looked through Wechaty source code but couldn't debug the cause.

Some restart experience: First, we had data statistics knowing non-peak times for restarts. Look at our non-peak times for one WeChat account - this was truly painful, usually only sleeping after successful restarts.

![Traffic Chart - Tencent Analytics][1]

Second, you can start two Docker instances per WeChat account on servers, like bot1 and bot1Shadow for the same account. When bot1 is running and needs restart, start bot1Shadow, scan to kick bot1 offline, reducing downtime. Additionally, Wechaty's Contact has a findAll method - you can add a message command like checkContacts, then send it after restart to see if Contacts loaded completely. With this command, you'll discover Contact initialization still needs time. During this period, finding contacts by alias will error - you can communicate with users separately :). Every time communicating with users on phone, they're amazed the robot can talk.

## Interaction with Official Accounts

Our fundamental reason for using personal accounts was official accounts' inability to conveniently receive rich media messages, since the bank activity's shared red packets were rich media messages. Official accounts could work but with poor experience. However, personal account operations are painful, with risks of Tencent blocking web interface access. When blocked, you get notifications that newly registered accounts can't use web version - obviously an excuse. With this notification, you can't use Wechaty to automate your WeChat. But with patience over time (about a month), Tencent will lift restrictions, though blocking risks remain.

These pains led to ideas for official account interaction. I haven't implemented yet but have a plan. The general idea is using official accounts as customer retention bases, then notifying users through various methods to add personal WeChat accounts. This allows more operational methods, achieving sufficient distribution and balance. For example, sending specific invitation codes and personal account QR codes, having them note invitation codes when adding friends, then personal accounts approve after receiving codes. For binding personal and official accounts, you can add binding links in personal account welcome messages with personal account temporary unique IDs, then get official account openids through implicit authorization (I don't know why WeChat official account API field names are so disgusting - why not use camelCase, making my code sometimes camelCase, sometimes lowercase!), then notify Wechaty to change personal account remarks to these openids or user numbers.

## Miscellaneous Things

WeChat desktop client (I use Mac) and WeChat web version extract video posters differently. My partner does product work - after making videos, he makes posters display frames he's satisfied with. Every time he sends from Mac client to me, they look great, but when I put them in Wechaty and send out, they don't display those poster frames. After long searching, I realized the two versions use different poster extraction methods.

Docker containers default to non-GMT+8 time zones - must fix this. I suffered greatly with database and server reported time inconsistencies. But when I wrote this, I found timezone changes were already supported: [Add timezone in to Dockerfile](https://github.com/wechaty/wechaty/issues/594).

When I started coding, I put business logic and Wechaty's WeChat automation logic in one project. This made maintenance painful - changing business logic required Wechaty restarts with service interruptions. Later I wrapped business logic as HTTP requests, with Wechaty only handling simple send/receive messages, kicking, inviting, auto-friending operations, sending messages to business logic then operating after getting instructions. This made maintenance more convenient.

Group invitations also need cultivation. Don't expect newly created groups to pull people through group invitations. Initially unable to invite people, you need to reply with group QR codes for scanning. Wait until more people join, but not until 100 people, since only invitations work after 100 people.

I'll write this much for now. Finally, my personal accounts were completely wiped out in September, right on my birthday while vacationing in Sanya. I was completely stunned, but thinking carefully, there's no regret. With this experience, making a comeback isn't a problem. My product manager partner and I have restarted with official accounts. With brand recognition in the circle, users can be rebuilt quickly. After stabilizing official accounts, we'll continue implementing the official-personal account interaction idea above. It shouldn't be easily blocked - we won't stupidly put so many people on one account and create so much trouble.

All this rambling was promised to [lijiarui](https://github.com/lijiarui) in September, but between busy work and this entertainment project, sleeping at 2-3 AM and waking at 6-7 AM daily continues even now. I really had no complete time - I deeply apologize for this serious procrastination.

Finally, thank you for spending so much time reading what I wrote.

[1]: /assets/2017/iyjian-1.webp
[2]: /assets/2017/iyjian-2.webp
[3]: /assets/2017/iyjian-3.webp

---

---

> Chinese version of this post: [Wechaty 红包功能-我有我见]({{ '/2017/11/08/red-pocket-wechaty-iyjian/' | relative_url }})
