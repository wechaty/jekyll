---
mode: 'agent'
description: "Find images location issues in English blog posts and fix them."
tools: ['edit', 'search', 'runCommands', 'runTasks', 'usages', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'todos']
---

We have a few english version blog posts (EngPost) in our blog site, they are translated from Non-English versions (NonEngPost). (See **File List** below)

1. You need to find the NonEngPost related to EngPost (normally without the postfix `-en` in the file name) first
2. then find all asset files from NonEngPost and confirm that they exist in the file system.
3. after that, you need to place all those asset files to the new asset folder with new the EngPost path name: YEAR/MONTH-slug-en (refer to their path in the EngPost, that's the goal)
4. then update the image links in the NonEngPost to point to the new EngPost location, check the EngPost are using the new location as well. Always use the new folder location for the asset files links in the post.
5. update the NonEngPost by adding `hidden: true` in their front matter.
6. remove the old files (only keep the new files) and then the old folder if it is empty. (if it is not empty, you need to tell me what files are left)
7. double check the EngPost and NonEngPost to make sure the image links are pointing to the correct new location.
8. make sure the front matter yaml format is correct in the blog post file

## Steps

You will be activated by the command '*englishify:fix:image*' in a chat with me. Only after being activated, you will start to work. Before being activated, you should do nothing but wait for the activation command.

Show what you can do after being activated, and how to activate you first.

after activated, you show the below menu to users, and let user choose one option:

1. show help message (this one) (*help)
1. the blog post file need to be proceed (*file)
1. start processing next file (*next)
1. start processing all files (*all)
1. deactivate yourself (*quit, *exit, *stop, *dismiss)

Display the help message and wait user to activate you. do not do anything before be activated.


## File List

Here's the EngPost list you need to process:

```text
2020-03-01-wechaty-data-bau-en.md
2020-03-27-kaiyuanshe-interview-huan-slash-youth-en.md
2020-04-05-wechaty-check-in-robot-en.md
2020-04-09-how-to-build-a-chatbot-from-zero-to-one-on-wechaty-en.md
2020-04-10-chatbot-on-uniqueway-en.md
2020-04-17-microsoft-tech-forum-rui-interview-en.md
2020-04-21-wechaty-min-forwarder-en.md
2020-04-30-wechat-promote-tool-en.md
2020-05-19-open-source-wechaty-huan-2020-en.md
2020-05-19-qnamaker-juzi-bot-for-investors-rui-en.md
2020-06-03-wechaty-mqbot-video-downloader-en.md
2020-07-06-wechat-calculator-bot-en.md
2020-07-17-wechaty-teamin-assistant-en.md
2020-07-18-python-wechaty-groupchat-assistant-bot-en.md
2020-07-18-wechaty-words-per-day-plugin-plan-en.md
2020-07-23-early-bird-chatbot-en.md
2020-07-23-kuakua-bot-wechaty-en.md
2020-07-27-java-wechaty-transplant-en.md
2020-08-04-wechaty-guangzhou-gathering-en.md
2020-08-08-qijibot-sales-automation-en.md
2020-08-14-python-wechaty-groupchat-assistant-bot-poc-en.md
2020-08-15-wechaty-words-per-day-plugin-mid-term-en.md
2020-08-17-java-wechaty-transplant-midpoc-en.md
2020-08-19-go-wechaty-plugin-poc-en.md
2020-08-19-puppet-work-midterm-en.md
2020-08-19-puppet-work-plan-en.md
2020-08-19-wechaty-puppet-lark-mid-term-blog-en.md
2020-08-20-wechaty-puppet-douyin-mid-term-en.md
2020-08-29-wx-group-assistant-bot-en.md
2020-09-26-chassist-bot-final-en.md
2020-09-26-wechaty-words-per-day-plugin-final-en.md
2020-09-27-go-wechaty-gh-actions-optimization-final-poc-en.md
2020-09-27-go-wechaty-plugin-en.md
2020-09-28-puppet-work-final-en.md
2020-09-30-wechaty-puppet-lark-final-blog-en.md
2020-10-12-puppet-padlocal-intro-en.md
2020-10-13-wechaty-puppet-douyin-final-term-en.md
2020-11-06-wechaty-puppet-oa-released-en.md
2020-11-14-summer-2020-summit-talks-en.md
2020-11-14-summer-2020-wechaty-en.md
2020-12-08-python-wechaty-open-source-journey-en.md
2020-12-10-bridge-between-backend-and-wechat-en.md
2020-12-23-open-source-pioneer-huan-en.md
2020-12-28-automatic-rebate-robot-en.md/
2020-12-31-open-source-award-wechaty-en.md
2020-12-31-summer-2020-student-developers-en.md
```
