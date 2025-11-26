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
2021-02-09-how-to-use-wechaty-to-ask-for-payment-before-user-joining-the-group-en.md
2021-04-05-wechaty-contributor-meetup-en.md
2021-04-22-wechaty-with-paddlepaddle-en.md
2021-05-02-wechaty-bible-chatbot-en.md
2021-05-24-how-to-build-a-panda-face-generator-with-paddlepaddle-en.md
2021-06-17-puppet-simplepad-hello-en.md
2021-07-05-code-like-poetry-bot-like-song-en.md
2021-07-13-ospp-plan-wechaty-piggy-bro-en.md
2021-07-14-ospp-plan-blessed-cli-en.md
2021-07-14-ospp-plan-wechaty-matrix-en.md
2021-07-15-ospp-plan-wechaty-club-managment-en.md
2021-07-22-gdg-shanghai-wechaty-en.md
2021-07-30-walnut-5g-press-en.md
2021-08-26-gdg-community-talk-google-season-of-docs-en.md
2021-08-26-ospp-mid-term-cli-en.md
2021-08-26-ospp-mid-term-wechaty-piggy-bro-en.md
2021-08-29-ospp-mid-term-club-managment-en.md
2021-09-29-final-term-club-managment-en.md
2021-09-29-ospp-final-term-wechaty-puppet-lark-en.md
2021-09-30-ospp-final-term-cli-en.md
2021-10-06-ospp-final-term-wechaty-piggy-bro-en.md
2021-10-19-jyy-chatbot-blog-en.md
2021-10-28-osschat-is-what-you-need-for-opensouce-community-operations-en.md
2021-10-29-zilliz-milvus-open-source-panel-en.md
2021-11-05-kaiyuanshe-oss-con-2021-wechaty-gsod-en.md
2021-11-30-report-for-summer-2021-en.md
```
