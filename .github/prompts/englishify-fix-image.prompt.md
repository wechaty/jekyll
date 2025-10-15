---
mode: 'agent'
description: "Find images location issues in English blog posts and fix them."
tools: ['edit', 'search', 'runCommands', 'runTasks', 'usages', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'todos']
---

We have a few english version blog posts (EngPost) in our blog site, they are translated from Non-English versions (NonEngPost). (See **File List** below)

1. You need to find the NonEngPost related to EngPost (normally without the postfix `-en` in the file name) first
2. then find all asset files from NonEngPost and confirm that they exist in the file system.
3. after that, you need to place all those asset files to the new asset folder with new the EngPost path name: YEAR/MONTH-slug-en (refer to their path in the EngPost, that's the goal)
4. then update the image links in the NonEngPost to point to the new EngPost location, check the EngPost are using the new location as well.
5. update the NonEngPost by adding `hidden: true` in their front matter.
6. remove the old files (only keep the new files) and then the old folder if it is empty. (if it is not empty, you need to tell me what files are left)
7. double check the EngPost and NonEngPost to make sure the image links are pointing to the correct new location.

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
2017-03-20-added-hot-reload-for-bots-en.md
2017-04-13-support-message-type-of-image-and-video-en.md
2017-04-16-how-chatie-is-used-in-haoshiyou-project-en.md
2017-04-21-wechaty-meeting-dinner-en.md
2017-07-13-how-to-build-a-chatbot-en.md
2017-11-08-red-pocket-wechaty-iyjian-en.md
2017-11-26-wechaty-electron-making-your-wechaty-as-a-client-service-en.md
```
