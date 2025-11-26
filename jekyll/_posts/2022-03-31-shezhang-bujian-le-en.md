---
title: "With the World's Largest Monolithic Chinese NLP Model and Wechaty, We Built an AI That Can Play Script Murder Games with Humans!"
author: bigbrother666sh
categories: article
tags:
  - puppet-xp
  - ai
  - murder-mystery-game
image: /assets/2022/03-shezhang-bujian-le-en/aoc7k-iob2u.webp
excerpt: >
  Building an AI player for murder mystery games using Wechaty and the world's largest Chinese NLP model, creating immersive interactive narrative experiences where AI seamlessly joins human players through WeChat.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/03/31/shezhang-bujian-le/).

## With the World's Largest Monolithic Chinese NLP Model and Wechaty, We Built an AI That Can Play Murder Mystery Games with Humans

**Project Repository, Welcome to Visit**: <https://github.com/bigbrother666sh/shezhangbujianle>

## Core Concept and Demonstration

For this project, we specially adapted a micro online script murder mystery script. The script has five characters, each played by five players, but we only recruit four players per game and, without their knowledge, have AI play the remaining character.

Players don't need to download clients or open web pages - they can play directly using WeChat (thanks to the amazing **Wechaty**).

Following the principle of maximizing detail, we also prepared a WeChat account for the AI, carefully setting her nickname and avatar. We even prepare three days of Moments content closely tied to current events before each game, and continue posting Moments for three days after the game to provide extended plot (very similar to "creepypasta").

![img](/assets/2022/03-shezhang-bujian-le-en/1.webp)  ![img](/assets/2022/03-shezhang-bujian-le-en/2.webp)

The overall plot is not complicated - it tells of five core members of a university club involved in various intrigues due to a matter affecting their interests. What players need to do is also very simple - find ways to form alliances and persuade others to accept their views... However, we made relatively major changes to the original work. The character the AI plays (Cai Xiao) is controlled by an evil tech giant (the "Arctic Goose" company).
She must help "Arctic Goose" execute a grand conspiracy that actually envelops everyone... Frankly speaking, from a gaming perspective, this character is quite difficult, bearing the role of driving the plot, and the game mechanism is set up so that all doubts will eventually point to her.
In actual script murder games, this character should be played by the DM rather than an ordinary player, which of course greatly increases the challenge for the AI.

Let's take a look at the AI's actual performance! (Demo videos are being produced. You can now visit the github project homepage to see recorded gifs).

### Tan Ming VS Cai Xiao (AI)

In the plot, Tan Ming unscrupulously plans a scheme to achieve his goals and plans to secretly form an alliance with Cai Xiao. However, what he doesn't know is that Cai Xiao is actually playing a bigger game, wanting to use his scheme to achieve her own conspiracy... So the AI's strategy for Tan Ming is to deceive him as much as possible and find ways to use him.
In actual performance, the AI implemented this approach well, even imaginatively using seduction tactics... Frankly speaking, this move greatly exceeded our expectations...

### Kong Mo VS Cai Xiao (AI)

In the plot, Kong Mo's task is to investigate the truth. The player of this character needs to take initiative to find other players to learn as much as possible, but sometimes encounters more introverted players. In such cases, we use the "director mechanism" to proactively initiate a round of dialogue first.
You can see that in such situations, the AI can provide good clue "hints" in subsequent rounds, playing a role in driving the plot.

### Li Chao VS Cai Xiao (AI)

Li Chao in the plot holds a completely opposite position from Cai Xiao played by the AI, so Cai Xiao needs to persuade Li Chao while concealing some things...

### Sun Ruo VS Cai Xiao (AI)

In the plot, Sun Ruo is a relatively complex character. He (or she, this character has no gender restriction) has actually been transformed into an "AI person" like Cai Xiao, but doesn't know it himself (herself), and the answer to the extended plot lies in this character. So the dialogue between AI and Sun Ruo needs to show a certain "depth" - can't say nothing, but can't say everything either.
As for the final effect, see for yourself~

### Cai Xiao (AI) in Group Chat (Room)

Finally, here's a segment of graduation group chat between the production team and AI. Let everyone feel the overall experience. :smile:

From a plot perspective, the AI's last words to Sun Ruo are full of meaning... Of course, from a technical perspective, I believe this is just a coincidence. However, this is precisely one of the fun parts of this work - the AI's uncertainty greatly enriches the original plot.

_[For the above demo recordings, please visit the [project github homepage](https://github.com/bigbrother666sh/shezhangbujianle).]_

## Project Challenges

As the saying goes, 100 people have 100 different WeChat usage styles. Although using WeChat directly as the user interaction interface greatly reduces development workload and user costs, it also brings many challenges.

A major challenge is preprocessing user input text. For example, some users like to input large blocks of spaces or frequent line breaks instead of commas or periods, which easily causes simnet_bow errors (simnet_bow is a pre-trained model provided by Baidu's PaddlePaddle PaddleHub, which we use in this project to judge user questions). So we need to first use regex to replace these with commas. Additionally, as mentioned above, some users habitually ask questions first and then send another message only @-mentioning people. According to our initial processing plan,
using regex to delete all @ + nicknames would produce "empty text", and simnet_bow would still error. Our final solution is to only remove the @. Of course, this may cause name repetition in a sentence, but fortunately the generation model Yuan 1.0 used this time seems to have good interference resistance...

Additionally, we used the completely free puppet-xp solution this time, but its current functionality is really limited, only able to send and receive text messages. This caused many limitations and even left some flaws, which will be introduced in detail below.

There are many similar examples, such as puppet-xp being unable to recognize emojis other than those on WeChat's built-in first page. Considering the low frequency of occurrence, we ignored them. So friends who understand technology a bit, please **never approach testing with an "extreme testing" mindset** when testing - just focus on the AI generation itself :smile:

## Director Mechanism

Due to various limitations, we must also set up an auxiliary mechanism for the AI, which in this project is the so-called "**Director**". His role is to "manually guide" the AI when situations arise where the AI is not applicable. Some of these situations are due to the game mechanism itself, and some are due to limitations of the wechaty puppet-xp protocol we currently use (regarding the relationship between wechaty and puppet protocols, you can check the wechaty homepage (<https://github.com/wechaty>)).

Specifically, these situations include:

### User Registration Issue

First, since puppet-xp currently cannot get users' group nicknames, the program has no way of knowing which user corresponds to which character. We set a game rule for this: users need to first add other users as friends, then send a message "This is XXX" (character name). We require users to do this for all other players. This way the AI won't be exposed, and this is indeed necessary because real people can't check group nicknames every time
to determine which character the messaging player is playing.
However, we cannot guarantee every user will comply, so the director needs to manually help the AI complete this identification.

### Proactive Message Sending

During project testing, we also found awkward silence issues, such as everyone not talking for a while, or two users chatting enthusiastically while ignoring other players... From a player's perspective, this is quite a subjective problem - maybe I just don't know what to say. According to the program's "question-answer" design, the AI can only wait at this time. So we set up a proactive message or **small talk** mechanism. Specifically, we preset some questions, and when the director account sends specific instructions to the AI account, it triggers.

### Emergency Message Sending

Currently puppet-xp can only recognize text messages (of course Yuan 1.0 currently only supports text in text out, though actually multimodal solutions are not uncommon now). We stipulated that players must send text, which is actually quite limiting. In testing we found that puppet-xp doesn't support quoted messages either, and this occurs quite frequently in the project's actual scenarios! For this we had to preset
answer texts for some common questions. When unrecognizable messages appear, the director sends instructions to command the AI to send...
Some students might ask, can't you just send directly through the WeChat client logged in by AI? The answer is - actually yes, but this seems less "intelligent". Of course from a player experience perspective, this might be fine too. There's just a small detail here: you must send through the Windows client logged in by AI, not through the simultaneously logged-in mobile terminal, because puppet-xp mistakenly treats multi-terminal synchronized information
as information sent by the other party, which would trigger the AI "replying to its own messages".

Speaking of which, in preset messages we set the AI's personality as "carefree", occasionally "letting slip" some plot details. So in actual application, emergency messages often produce quite dramatic effects. From the work itself, this mechanism might be a very fun thing. So for emergency messages we didn't write them in the program but maintain them through external JSON files, which everyone can add to at any time.

### Process Guidance

From the user's perspective, the director is more like a "host" role, responsible for creating groups, assigning roles, etc. For the AI it's the same - when the game starts and ends are also informed to the program by the director through instructions. We also designed special plots for the AI character at the game's start and end.

Speaking of this, I actually hope puppet-xp can be further improved to support group operations (creating groups, disbanding groups, joining groups) and Moments operations (posting Moments, commenting on Moments, etc.). These would greatly enrich our gameplay. For example, the AI could suddenly comment on a player's recent Moments post during the game, and the comment contains some clues - that would definitely be exciting!

## Back to the Work Itself: Creativity First or Technology First?

The original intention of this project was to combine NLP large models and wechaty to make something fun. This is a vague definition, but as the project initiator, I was clear from the beginning that this is at least a 50% creativity and 50% technology matter...

However, in practice, whether technology or creativity comes first is quite tangled. If we start with creativity, we might design many unrealizable things and have to change creativity later. Conversely, if we consider from technology first, what we make won't be fun - good technology must be "invisible to users". Ultimately, for this question, **my answer is to consider both together**! This requires that project creators
must understand technology. So everyone can see an interesting phenomenon in this project - the person who writes the script is the same person who writes the code! What I worry about is that with the deepening popularization of AI, Python might become an essential skill for every creator, just like now no writer doesn't know how to use Word, and no self-media person doesn't know how to use video editing software.

And after introducing AI, another interesting question arises: is this work still a "script murder game"?

I have to admit, the final presentation of this work is different from what we envisioned before, or very different. The generation capability of NLP large models enables the AI to "perform" many new plots together with users. For example, in the following segment, "Tan Ming" reviews with the AI, and the AI tells him that he and Zhang Jiayi (a game character) are gay!

![img](/assets/2022/03-shezhang-bujian-le-en/3.webp)

For this situation, we simply added a rule to the game: "If others mention plots you don't know about, please believe they just don't appear in your script, not that they don't exist." We also don't provide review text but encourage them to review information with each other (naturally including the AI).
During this review process, players will sooner or later discover that one player is actually AI (the character the AI plays in the plot is a female college student implanted with an AI program, but most players will think this character is pretended by our staff, and they will finally discover this account is really just an AI!).
For this, we prepared corresponding extended plots, sent in Moments 1-3 days after the "script murder" game. This is very similar to **"creepypasta"**. The mechanism of private chat reviews and the plot effect of "shared fear" also give this work attributes of **stranger social networking**... It can be said that the most fun part of this work just begins after the "script murder" game ends.

All this makes this work a **"living story"**, a story co-created unknowingly by players and AI. I call it **"interactive narrative"**. (Actually this is the form I most wanted to achieve from the beginning, but I didn't know how to implement it. Finally I chose the script murder mode, but unexpectedly I still got what I initially envisioned.)

And this narrative sometimes also produces very touching random plots.

![img](/assets/2022/03-shezhang-bujian-le-en/4.webp)

In this project, the corpus files used as examples for each generation can be said to directly determine the AI's performance. Therefore, we also open source the corpus files, because under this "development paradigm", these corpora are essentially part of the code.

The relationship between human editors and AI in this project is more like that between "coaches and athletes". The production team will update the corpus based on the AI's on-site performance after each round of testing, thereby improving the AI's subsequent performance. This "iterative cooperation" model between human coaches and AI athletes is also worth exploring. (Relatively speaking, the current widespread "puppeteer" approach for virtual humans is equivalent to the relationship between humans and marionettes.)

In short, the various engineering solutions accumulated by this project may serve as a new "purposeful dialogue" solution, which can be applied not only to entertainment creation but also generalized to education, customer service, sales, government affairs, psychological counseling, emotional companionship, and other fields.

## Tribute

This project comprehensively uses Inspur Yuan 1.0 large model and Baidu PaddlePaddle's PaddleHub pre-trained models, as well as - **Wechaty**.
Without it, we could only let users interact with AI through a web page or APP, which not only greatly increases development workload but also greatly weakens the actual experience, and even makes it impossible to realize our key creative idea: let the AI character silently infiltrate among players,
and unknowingly shroud everyone in "the more you think about it, the more terrifying it becomes".

So here, I want to pay tribute to the **@Wechaty** community! "So good it makes you cry" - you live up to this evaluation! Also pay tribute to the poetry-loving **laozhang** (puppet-xp author)! Thank you for selflessly dedicating such a good thing!

## Final Words

The story of Cai Xiao and "Arctic Goose" is not yet over. Let's finally show Cai Xiao's "Arctic Goose" employee badge here!

![img](/assets/2022/03-shezhang-bujian-le-en/5.webp)

(As a team that likes to maximize details, this employee badge actually hides two easter eggs. Can you find them?)

**[For more detailed AI prompt configuration details, source code, character scripts, effect demo recordings, etc., please visit the [project github homepage](https://github.com/bigbrother666sh/shezhangbujianle)]**

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/03/31/shezhang-bujian-le/).
