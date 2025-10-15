---
mode: 'agent'
description: "Find images location issues in English blog posts and fix them."
tools: ['edit', 'search', 'runCommands', 'runTasks', 'usages', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'todos']
---

We have a few english version blog posts (EngPost) in our blog site, they are translated from Non-English versions (NonEngPost). (See **File List** below)

1. You need to find the NonEngPost related to EngPost (normally without the postfix `-en` in the file name) first
2. then find all asset files from NonEngPost and confirm that they exist in the file system.
3. after that, you need to place all those asset files to the new asset folder with new the EngPost path name: YEAR/MONTH-slug-en (refer to their path in the EngPost, that's the goal), and then remove the old files (only keep the new files) and then the old folder if it is empty. (if it is not empty, you need to tell me what files are left)
4. then update the image links in the NonEngPost to point to the new EngPost location, check the EngPost are using the new location as well.

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
2016-12-04-gitchat-lijiarui-interview-en.md
2016-12-05-ghostcloud-wechaty-docker-en.md
2016-12-07-beijing-nodejs-meetup-party-en.md
2016-12-10-try-to-write-wexinrobot-en.md
2017-03-20-added-hot-reload-for-bots-en.md
2017-04-13-support-message-type-of-image-and-video-en.md
2017-04-16-how-chatie-is-used-in-haoshiyou-project-en.md
2017-04-21-wechaty-meeting-dinner-en.md
2017-07-13-how-to-build-a-chatbot-en.md
2017-11-08-red-pocket-wechaty-iyjian-en.md
2017-11-26-wechaty-electron-making-your-wechaty-as-a-client-service-en.md
2018-01-09-all-you-need-to-know-about-chatbot-en.md
2018-01-25-how-to-build-face-blinder-bot-en.md
2018-06-24-migrating-wechaty-v0.14-to-v0.18-guide-from-puppeteer-to-padchat-en.md
2019-07-19-bot5-seminar-minutes-0-en.md
2020-03-27-kaiyuanshe-interview-huan-slash-youth-en.md
2020-05-19-open-source-wechaty-huan-2020-en.md
2020-07-06-wechat-calculator-bot-en.md
2020-11-06-wechaty-puppet-oa-released-en.md
2020-11-14-summer-2020-summit-talks-en.md
2020-11-14-summer-2020-wechaty-en.md
2020-12-23-open-source-pioneer-huan-en.md
2020-12-31-summer-2020-student-developers-en.md
2021-07-22-gdg-shanghai-wechaty-en.md
2021-08-26-gdg-community-talk-google-season-of-docs-en.md
2021-10-29-zilliz-milvus-open-source-panel-en.md
2021-11-05-kaiyuanshe-oss-con-2021-wechaty-gsod-en.md
2022-01-06-angular-tensorflow-js-en.md
2022-03-03-opensource-win-github-ranking-huan-007-en.md
2022-03-30-gsma-rcs-wechaty-walnut-5g-chatbot-en.md
```
