---
title: "How I Rebuilt the Sales System at MiraclePlus with a Chatbot"
author: rickyyin98
categories: project
tags:
  - featured
  - qiji
  - productivity
  - social
image: /assets/2020/08-qijibot-sales-automation-en/qijibot.webp
---

- In addition to media exposure, deep outreach through people is a good way to acquire customers.
- For the team, it is necessary to ensure that everyone's outreach is standardized.
- For individuals, it is necessary to strive to improve the efficiency of the outreach process.
- A chatbot is not a "silver bullet"; it requires people to summarize a structured methodology.
- A chatbot combined with a methodology is a good tool for standardization and efficiency improvement.
- An assisted agent based on Enterprise WeChat may achieve the goal of quickly building a "sales iron army".

## Me and MiraclePlus

I am a serial entrepreneur myself, with an [ed-tech company](www.phaedoclasses.com). In the summer of 2019, I was fortunate to get an interview opportunity with YC China from 1,700 applications, and thus had the opportunity to meet Dr. Lu Qi, the founder of YC China (now MiraclePlus).
Although I didn't get the investment through that round of interviews, I really wanted to get Dr. Lu Qi's investment, so in October 2019, I chose to become an intern at MiraclePlus and started working with Dr. Lu Qi and MiraclePlus.
After becoming an intern, I single-handedly completed all the product, visual, development, and internal and external coordination work for the MiraclePlus mini-program in two weeks. I also made a robot within MiraclePlus to "help investment managers chat with entrepreneurs," and the story begins here.
**The code in this article can be found at [qijibot](www.github.com/juzibot/qijibot). This article will not provide detailed code-level explanations.**

## 1. How does MiraclePlus acquire customers and what are the difficulties behind it?

### 1.1. The customer acquisition path explored by MiraclePlus

At that point in time at the end of 2019, MiraclePlus was not yet an influential enough venture capital brand. Simply relying on media exposure made it difficult for all early-stage entrepreneurs to understand and apply to MiraclePlus.
Therefore, the path that MiraclePlus explored was to directly reach out to entrepreneurs on WeChat through a large number of staff, in addition to continuous media exposure, and invite them to apply to MiraclePlus.
In fact, this path was very successful. Because of the presence of people, the transmission of MiraclePlus's value proposition became very easy. What originally needed to be repeatedly explained in the media could be quickly conveyed through a few back-and-forths in a conversation.

### 1.2. New difficulties under the new customer acquisition path

However, this brought two structural difficulties:

- First, for team managers, how to ensure that what everyone says is correct (or what the manager wants to pass on).
- Second, for individuals, how to minimize repetitive work in communication.

Based on these problems, I began to explore a good way to make the team's communication on WeChat standardized, so that everyone could do almost no repetitive work, and under these two premises, truly deliver value.

### 1.3. The structural dilemma beneath the surface difficulties

To complete the entire exploration path, "getting a robot to do automation" was obviously inevitable. I broke it down into two dimensions: finding a way to automate and finding a decision-making methodology.

- Automation means that the machine can freely send and receive messages, and what to send and receive is determined by the decision-making methodology.
- The essence of the decision-making methodology is to abstract human communication into a binary tree of dialogue and turn this interpretable binary tree into code that the machine can learn.

After completing these two steps, a dialogue system on WeChat can be run and can effectively help the sales team solve complex user communication problems.

## 2. Officially entering the chatbot industry

### 2.1. Learning about chatbots from scratch

In December 2019, MiraclePlus began to conduct intensive communication and customer acquisition on WeChat. From then on, I began to formally study how to implement the entire process into a robot system.
For me at that time, I only had a vague idea of "I want to do this," but I had no idea of "how to do it."
On a Thursday night, I found Li Jiarui, the founder of Juzi Interactive, on WeChat, whom I had met by chance at the MiraclePlus Alumni Day. After introducing the general situation, she invited me to participate in the [BOT Friday](bot5.ml) held on Friday (a technical geek forum discussing the landing and commercial application of the chatbot industry).

### 2.2. Continuous high-density thinking and precipitation

That week, I received the manuscript of Jiarui's book, "Chatbot from 0 to 1," which became my enlightenment to chatbots.
Later, I met a large number of entrepreneurs, engineers, and chatbot practitioners at BOT Friday, and through several BOT Friday events that "seemed to be sharing but were actually asking everyone to help me answer questions," I gradually entered the chatbot industry.
![My first sharing](/assets/2020/08-qijibot-sales-automation-en/talk1.webp)

{% include iframe.html src="/assets/2020/08-qijibot-sales-automation-en/talk2.pdf" %}

## 3. How to make a usable chatbot system?

### 3.1. A 10,000-word "script"

When I started trying to design a chatbot to help MiraclePlus communicate, I vaguely felt that I should first sort out the possible conversation pairs.
I repeatedly read and reviewed my chat records with previous entrepreneurs and precipitated a 10,000-word "script," which clearly listed the if-else style of progression.

{% include iframe.html src="/assets/2020/08-qijibot-sales-automation-en/method.pdf" %}

When I finished writing the "script" and the technical development was not yet complete, I communicated with 300 people in one week based on this "script." The whole process required almost no thinking, as if the machine should run like this.
Based on this script, I successfully shortened the communication time of each entrepreneur to less than 5 minutes in the manual communication link, and directly converted dozens of them to sign up.
At that time, I realized that it was time to turn it into a more general system.

### 3.2. A fully automated attempt

No one would refuse a fully automated system, and this was the first thing I wanted to accomplish after finishing the script.
![A fully automated attempt](/assets/2020/08-qijibot-sales-automation-en/first.webp)
However, it undoubtedly failed. The reason is not even worth mentioning. After all, it is already a consensus in the chatbot industry that pure robots can hardly meet all human needs.

### 3.3. Returning to the human-computer coupled assisted agent

After the significant failure of the fully automated attempt, I began to explore a path that could truly solve the problem—not to be obsessed with the machine doing everything. So how about the machine doing 90% of the things, and then people making the final decision?
At this time, I began to realize that I should make a human-computer coupled assisted agent.

{% include iframe.html src="/assets/2020/08-qijibot-sales-automation-en/final.pdf" %}

At the product level, I thought about it from several dimensions:

- This assisted agent should be independent of the traditional dialogue form of WeChat. When the daily work is to use WeChat to complete the same task, it should be made into a feed stream form. That is to say, all messages should not be distinguished by who sent them, but should be mixed together on a single timeline.
- For each message, it should be possible to reply by clicking a button. Each button corresponds to a complete set of words and additional actions (tagging, pulling into a group, changing remarks).

Based on these two levels of thinking, the traditional logic of repeatedly switching between different chat objects and replying to each person differently should be turned into assembly line work:

- The user only needs to stare at whether there are new messages on the assembly line and basically does not need to consider who sent them.
- The user only needs to click a button to reply to the questions raised by the other party and complete some necessary operations.
- The machine never replies on its own, and always needs a person to confirm once.

![Final product](/assets/2020/08-qijibot-sales-automation-en/qijibot.webp)

## 4. Helping more companies do private domain sales on WeChat

Of course, the resources invested in Qijibot are destined to be a non-commercial attempt, and there is still a long way to go before it becomes a tool that everyone can use and truly changes the sales experience of enterprises.
Later, I officially joined Juzi Interactive in 2020 as CMO, and began to help enterprises do "private domain sales" on the Enterprise WeChat ecosystem. Our product [Jukebao](qiwei.juzibot.com) has been launched.
![Jukebao](/assets/2020/08-qijibot-sales-automation-en/jukebao.webp)
This is another long, unfinished story...
If you are interested in how to build a sales system with tools, you are welcome to chat with me (WeChat: bohao-YIN), maybe it will be the starting point of our next blog post.

> Author: [Yinbohao](https://github.com/rickyyin98/)

---

> Chinese version of this post: [qijibot sales automation]({{ '/2020/08/08/qijibot-sales-automation/' | relative_url }})
