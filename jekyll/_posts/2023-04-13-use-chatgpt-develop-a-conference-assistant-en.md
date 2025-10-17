---
title: "Developing a Conference Assistant with ChatGPT & Wechaty in 10 Minutes"
author: atorber
categories: article
tags:
  - blog
  - study
  - introduction
  - ecosystem
image: /assets/2023/04-use-chatgpt-develop-a-conference-assistant-en/rare-book.webp
---

> This post is also available in [Chinese](/2023/04/13/use-chatgpt-develop-a-conference-assistant/)

## Background

With ChatGPT's explosive popularity, various applications have been explored by developers from all walks of life. Using ChatGPT to help us implement programs is undoubtedly one of the most imaginative directions, with some developers even claiming that programmers will be out of work~

While not that exaggerated, there's no doubt that ChatGPT will bring huge changes to application developers. This article will share how an amateur developer uses ChatGPT to develop a Wechaty chatbot application.

## Requirements Gathering

First, I've always had an idea I wanted to implement in WeChat groups, so I simply organized the requirements:

Develop a chatbot using the latest version of Wechaty to record meeting chat information and export documents based on commands:
1. When we say #开会 (start meeting) in the group, start recording chat information
2. When #结束 (end) is said in the group, stop recording
3. When #会议纪要 (meeting minutes) is said in the group, export the chat records during the meeting to a Word document and send it to the group

## Starting to Ask Questions

I directly gave the requirements to ChatGPT:

Chaoge:

Use the latest version of Wechaty to develop a chatbot that records meeting chat information and exports documents based on commands: 1. When we say #开会 in the group, start recording chat information 2. When #结束 is said in the group, stop recording 3. When #会议纪要 is said in the group, export the chat records during the meeting to a Word document and send it to the group

ChatGPT:

I'm sorry, as an AI language model, I cannot directly execute code on your computer. However, I can provide some ideas and suggestions to help you start building this chatbot.

First, you need to use the latest version of WeChaty and Node.js to write code. WeChaty is an open-source SDK for WeChat personal account bots that allows you to create and manage WeChat bots using Node.js.

Here's a general implementation process:

Use WeChaty to log in to a WeChat account and listen to group chat messages.
In the listener function, determine if the received message is #开会, #结束, or #会议纪要.
If it's #开会, start recording chat information and store it in a data structure (e.g., array).
If it's #结束, stop recording chat information.
If it's #会议纪要, export the stored chat information to a Word document and send the document to the group.
To implement these features, you'll need to use some additional Node.js modules, such as:

docx: for creating and exporting Word documents.
fs: for reading and writing files.
moment: for handling dates and times.
lodash: for data processing and operations.
Here's sample code you can reference and modify according to your needs:

```javascript
const { Wechaty } = require('wechaty');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');

const CHAT_RECORD = []; // Array to store chat records
let RECORDING = false; // Flag indicating whether chat is being recorded

const bot = new Wechaty();

// Listen to group chat messages
bot.on('message', async message => {
  const text = message.text();
  const room = message.room();

  // Check if it's a group chat message
  if (room) {
    // Check if it's #开会 message
    if (text === '#开会') {
      RECORDING = true;
      await room.say('Started recording chat information.');
    }

    // Check if it's #结束 message
    if (text === '#结束') {
      RECORDING = false;
      await room.say('Stopped recording chat information.');
    }

    // Check if it's #会议纪要 message
    if (text === '#会议纪要') {
      // Create document
      const doc = new Document();
      const now = moment().format('YYYY-MM-DD_HH-mm-ss');
      const filename = `Meeting_Minutes_${now}.docx`;

      // Add title
      const title = new Paragraph();
      title.addRun(new TextRun('Meeting Minutes'));
      title.heading1();
      doc.addParagraph(title);

      // Add content
      const content = new Paragraph();
      const chatLog = _.map(CHAT_RECORD, item => `${item.from}:${item.text}`).join('\n');
      content.addRun(new TextRun(chatLog));
      doc.addParagraph(content);

      // Export document
      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(filename, buffer);

      // Send document to group
      await room.say({
        file: fs.readFileSync(filename),
        filename: filename
      });
    }

    // If currently recording chat, add message to record array
    if (RECORDING) {
      CHAT_RECORD.push({
        from: message.from().name(),
        text: text
      });
    }
  }
});
```

This is a simple example code that you need to modify and optimize according to your needs. For example, you may need to add exception handling, logging, permission control, etc.

It's worth noting that WeChat officially does not allow using bots for automated operations, so using bots for meeting records may carry certain risks. Please use with caution and comply with relevant regulations and laws.

> Wow, looks pretty good! It provided ideas, code, and friendly risk warnings. However, it doesn't seem to be based on the latest Wechaty 1.x implementation, and it's not TypeScript which I prefer. Time to improve it by telling it about the ding-dong-bot example code...

[The article continues with the iterative conversation between the author and ChatGPT/New Bing, gradually refining the code to use the latest Wechaty syntax and TypeScript]

## Final Code

Tested and working, details can be further explored and optimized:

```TypeScript
// Import Wechaty modules
import {
    Contact,
    Message,
    ScanStatus,
    WechatyBuilder,
    log,
  }                  from 'wechaty'
  
import qrcodeTerminal from 'qrcode-terminal'

// Import html-to-docx module
import htmlToDocx from 'html-to-docx'
import { FileBox } from 'file-box'

// Create a Wechaty instance
const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',})

// Variable to store meeting chat information
let meetingLog = ''

// Variable to mark whether meeting is being recorded
let isRecording = false

// Listen to scan login event
function onScan (qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
      log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
  
      qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
  
    } else {
      log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
  }
bot.on('scan', onScan)

// Listen to successful login event
bot.on('login', user => console.log(`User ${user} logged in`))

// Listen to received message event
bot.on('message', async message => {
  // Get message text content
  const text = message.text()

  // Get the group chat where the message is located, returns null if not a group chat
  const room = message.room()

  // If message is a group chat message
  if (room) {
    // If message content is #开会, start recording meeting chat info and reply "Started recording"
    if (text === '#开会') {
      isRecording = true
      meetingLog = ''
      await message.say('Started recording')
    }
    // If message content is #结束, stop recording meeting chat info and reply "Stopped recording"
    else if (text === '#结束') {
      isRecording = false
      await message.say('Stopped recording')
    }
    // If message content is #会议纪要, export chat records during meeting to Word document and send to group
    else if (text === '#会议纪要') {
      // Use html-to-docx library to convert meeting chat info to Word document buffer object
      const buffer = await htmlToDocx(`<p>Meeting Minutes:</p><p>${meetingLog}</p>`)

      // Convert buffer object to FileBox object for sending files
      const fileBox = FileBox.fromBuffer(buffer, 'meeting.docx')

      // Send file to group
      await room.say(fileBox)
    }
    // If currently recording and message is not from self, append message to meeting chat info
    else if (isRecording && !message.self()) {
      meetingLog += `${await room.topic()}: ${message}<br>`
    }
  }
})

// Start bot
bot.start()
```

## Effect Demonstration

1. Send #开会, bot immediately returns "Started recording"
2. Start speaking "Test meeting content"
3. Send #结束, bot immediately replies "Stopped recording"
4. Send #会议纪要, bot immediately replies with a "meeting.docx" file to the group

Complete code can be viewed at [WeChat Group Meeting Assistant](https://github.com/choogoo/wechat-openai-qa-bot/blob/main/src/plugins/meet-mate.ts), which also adds support for exporting to Yuque documents, also from New Bing.

## Summary

1. The entire development and debugging process took about ten minutes. If you're not familiar with Wechaty, you can actually continue asking by sending error messages to NB. ChatGPT's capabilities are truly amazing—quickly building the program framework with AI plus manual fine-tuning. For non-professional programmers, the threshold for application development has undoubtedly been lowered further, provided we're familiar with the most basic usage of a language.
2. As ChatGPT continues to evolve and update its data, I believe in the not-too-distant future, building a Wechaty bot entirely using natural language will become a reality.

> Historical Articles

- [Wechaty + WeChat Mini Program for Group Activity Registration](https://wechaty.js.org/2021/03/17/node-wechaty-and-wechaty-puppet-padlocal/)
