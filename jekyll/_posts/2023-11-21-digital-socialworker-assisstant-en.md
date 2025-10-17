---
title: "Wechaty + LLM Empowering Grassroots Community Autonomy"
author: bigbrother666sh
categories: article
tags:
  - workpro
  - llm
  - agent
image: /assets/2023/11-digital-socialworker-assisstant-en/0.webp
excerpt: >
  When neighborhood committees meet Wechaty + large language models - a digital social worker assistant using AI to help community workers manage 198 policy documents and generate activity planning reports with natural language interaction.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2023/11/21/digital-socialworker-assisstant/).

When neighborhood committees meet wechaty + large language models...

## Origin

During the Shanghai pandemic lockdown in 2022, several of us partners were fortunate to help volunteer teams in two communities as "IT volunteers" (about this experience: [United Effort, Fighting the Pandemic with AI!](https://wechaty.js.org/2022/05/20/wechaty-ai-antigenbot/)).

Unexpectedly, after the lockdown was lifted, this work attracted the interest of government departments, thus beginning our year-long cooperation with Linfen Road Sub-district in Jing'an District.

## Digital Social Worker Assistant

For a long time, village/neighborhood committees that directly serve every resident including you and me have inevitably been criticized for "not being effective enough," especially in special scenarios like pandemic lockdown, their shortcomings are fully exposed. In fact, there are complex reasons behind this:

Village/neighborhood committees do not belong to government institutions, but are "village/resident autonomous organizations." However, under China's current administrative environment, they have to assume part of the government's functions, such as community management, grassroots governance, etc. This contradiction of "neither being government nor not having to assume government functions" has led to unsatisfactory work efficiency and service quality of village/neighborhood committees.

Taking Shanghai as an example, a neighborhood committee is usually composed of 5~9 social workers, but needs to interface with 3,500~5,000 residents. On average, each social worker interfaces with 400~500 people... But their daily work includes up to 119 tasks. (The image below is from the public account "Shanghai Big Research")

![matrtial1](/assets/2023/11-digital-socialworker-assisstant-en/1.webp)

Behind this is actually the complex problem of grassroots community autonomy, especially under the background of China's political system. Academia actually has many discussions and research on this, and governments at all levels from central to local have been introducing various reform measures. But expecting immediate success is also unrealistic. The situation of village/neighborhood committees having few people, many tasks, and insufficient capabilities cannot be completely resolved immediately.
Under these circumstances, introducing AI technology to assist social workers' work becomes very meaningful.

## Consensus on WeChat Conversation Bots

The entire system uses WeChat conversation bots rather than traditional web pages or apps, not even using official accounts and mini-programs. This was determined from the beginning of cooperation. In fact, this is also one of the most attractive aspects to Linfen Road Sub-district, because most social workers don't have particularly high IT skills, and their daily work is already very heavy, with simply no time to learn and adapt to new tools. So our product must have "zero learning cost."
On the other hand, in reality, grassroots social workers, whether communicating with residents or receiving instructions and notices from superiors, these tasks are actually completed through WeChat (many systems developed by various ministries with huge investments are in a "gathering dust" state at neighborhood committees, because you can't expect social workers, when faced with residents' problems, to go find a computer, open an interface, log in, and then execute a series of cumbersome operations...).

Under these circumstances, WeChat conversation bots are undoubtedly the best choice: the most natural operating interface, no need to download any software, can be used after adding friends...

After reaching this consensus, we initially wanted to develop based on personal WeChat, because many existing work groups and resident groups are personal WeChat groups. If using WeCom, there would still be some migration costs.
But in practice, we found that personal WeChat still has many limitations. For example, we encountered more than once triggering a 24-hour ban due to sending more than 20 messages with the same content in a short period...
At the same time, considering factors such as formality, the client was finally persuaded by us to bear some migration costs, switch to WeCom, and newly certify the organization for this purpose (I wonder if WeCom is considering giving us some promotion fees).

During the migration process, Juzi Interactive provided great support. The wxwork protocol in the early stage was somewhat unstable, basically needing to restart once a month. After upgrading to workpro, after several months of polishing, since May this year, the entire system has been very stable, running continuously for months without any problems.

## The Pain of 198 Documents

The Linfen Road Sub-district in Jing'an District we cooperate with has 20 neighborhood committees and nearly 200 social workers. As mentioned above, their daily work includes up to 119 tasks.

After contact, we found that in fact, the Shanghai Municipal Government has been promoting the improvement of neighborhood committee autonomy capabilities over the years. Linfen Road Sub-district even compiled detailed work manuals for these 119 tasks, which is the SOP we are familiar with.
They have a total of 198 word documents that clearly and in detail indicate the affiliated unit, processing conditions, required materials, and handling procedures for each task. In fact, this has completely covered all aspects of residents' daily lives. But the problem is that no social worker can be familiar with and memorize the detailed content of these 198 documents. Manual searching when encountering problems is very cumbersome and time-consuming. Moreover, documents use written terminology, while residents' questions are often colloquial.
For example, the frequently mentioned "affordable housing" has the standard government terminology of "co-owned property security housing." In addition, the wording of residents' questions is also very different from written documents. For example, written documents only write "social security card replacement process," but in reality, residents' questions are more likely to be: "What should I do if I lost my social security card?" (In Shanghai dialect, "lost" = "misplaced").
...These all objectively increase the difficulty for social workers to use SOP documents.

To address this problem, we collected and annotated more than 400 actual resident question cases, and after data augmentation, fine-tuned a dedicated question-and-answer matching model for this project based on the open-source rocketqa model. Finally, combined with wechaty, we implemented the first function of the digital social worker assistant: intelligent SOP document Q&A. From then on, the pain of 198 documents no longer exists.

![matrtial2](/assets/2023/11-digital-socialworker-assisstant-en/3.webp)

After going online, the actual test results were quite good. Even direct WeChat voice questions can get very accurate answers.

![matrtial3](/assets/2023/11-digital-socialworker-assisstant-en/2.webp)

## Activity Planning Reports Generated with One Sentence

After completing the intelligent SOP Q&A, Linfen Road Sub-district proposed a second requirement - generating activity planning reports with one sentence.

It turns out that currently 50% of the neighborhood committee's workload is organizing various resident activities. Some of these activities are to complete corresponding publicity work, such as the annual Party Founding Day, Army Day, fire prevention publicity, policy publicity in the area, such as garbage classification, civilized city creation, etc... Some are related cultural activities, such as organizing rice dumpling making on Dragon Boat Festival, children's art exhibitions on Children's Day, moon viewing on Mid-Autumn Festival...
We only learned after contact that these cultural activities that seem to have no practical significance are actually very necessary. In modern life, there is little communication between neighbors. Many people don't even know who their neighbors are. These activities are meant to give residents opportunities to gather together and enhance neighborly feelings. Many conflicts between residents could not be mediated before, but after participating in an activity together, there is room for mediation. And neighborhood committees also need to close the distance with residents through these activities, so that in the future when they need to come forward to do various persuasion work, there is an emotional foundation.

But the neighborhood committee needs to write a planning proposal application every time it organizes an activity. For many social workers, this work is something they "have to complete." In addition, over time, social workers also face the problem of "running out of activity ideas"...

After receiving this requirement, we immediately thought of large language models. This is indeed a scenario where large models can truly play a value role. It happened that in April and May, the industry welcomed a big explosion of LLMs, and we had many choices. We first designed the prompt based on requirements, combined with report template requirements, then compared the effects of multiple open-source models and commercial large model APIs. Finally, comprehensively considering generation quality, speed, and cost, and fully considering the special requirements of government system data security, we chose local deployment of ChatGLM2-6B as the final solution.

![matrtial4](/assets/2023/11-digital-socialworker-assisstant-en/4.webp)

**Finally, here's the product video:**

{% include iframe.html src="https://www.bilibili.com/video/BV1x94y1H7yE/?vd_source=a9a9b3058af6573c5ad2ff31c387fa44" %}

## Project Received Extensive Reports from Mainstream Media

After the "Digital Social Worker Assistant" went online, it not only received widespread praise from social workers but also attracted reports from multiple professional media, which is also an encouragement to the team.

![matrtial5](/assets/2023/11-digital-socialworker-assisstant-en/5.webp)

## Final Words

Through more than a year of close contact with Linfen Road Sub-district, we truly felt what "a thousand threads above, one needle below" means. Grassroots work is indeed not easy to do. We are very happy to be able to provide some assistance.

However, we must also admit that this project has some randomness. First, the project location, Shanghai itself, is currently the region with the most open-minded government concept in China. Then Linfen Road Sub-district is also a national demonstration unit for government informatization. The person in charge who interfaced with us majored in computer science in university and has a certain sensitivity to new technologies. These are all factors that are difficult to replicate.

We also tried to promote this project in the summer of 2023, but it was not successful. There are no technical problems, nor even business problems (most sub-districts and towns interested in using this system have the ability to afford annual fees of hundreds of thousands of yuan). More resistance comes from the particularity of the government field. Of course, another big factor is that the team has only been part-time so far and has not actually invested enough energy in marketing and promotion.

But in any case, we still believe that this work is valuable, so we are also discussing open-sourcing this product to serve more autonomous organizations at the same time. We believe: with the power of technology, organizational management workload can be maximized, and the reduction in the proportion of management personnel is one of the necessary conditions for autonomy!

> This is a translated version of the original Chinese post. You can find the original post [here](/2023/11/21/digital-socialworker-assisstant/).
