---
title: "wechaty+TypeChat: Control Your WeChat with Natural Language"
author: atorber
categories: article
tags:
  - blog
  - study
  - introduction
  - ecosystem
image: /assets/2023/08-use-llm-control-your-wechat-en/rare-book.webp
---

> This post is also available in [Chinese](/2023/08/06/use-llm-control-your-wechat/)

With ChatGPT's explosive popularity, LLM applications are springing up like mushrooms after rain. Almost anyone can develop their own Tmall Genie, Xiao Ai, or Xiao Du based on large language models...

Today I'll introduce a solution for controlling WeChat using natural language based on ChatGPT. Using LLM to control wechaty bots to execute various commands, the combination of wechaty + [TypeChat](https://github.com/microsoft/TypeChat) has achieved the following features (view complete code at [type-wechaty https://github.com/atorber/type-wechaty](https://github.com/atorber/type-wechaty) for experience):

- Use natural language to send messages to specified friends or groups (if you're someone who daily needs to coordinate and arrange various different people or groups, this will be very helpful)

- More... well, not yet implemented

Thanks to Microsoft's TypeChat [https://github.com/microsoft/TypeChat](https://github.com/microsoft/TypeChat), we only need to define types to quickly implement the above features, and expanding functionality only requires continuing to expand more types.

First, let me introduce TypeChat [https://github.com/microsoft/TypeChat](https://github.com/microsoft/TypeChat)

## TypeChat

Official introduction:

```TypeScript
TypeChat is a library that makes it easy to build natural language interfaces using types.

Building natural language interfaces has traditionally been difficult. These apps often relied on complex decision trees to determine intent and collect the required inputs to take action. Large language models (LLMs) have made this easier by enabling us to take natural language input from a user and match to intent. This has introduced its own challenges including the need to constrain the model's reply for safety, structure responses from the model for further processing, and ensuring that the reply from the model is valid. Prompt engineering aims to solve these problems, but comes with a steep learning curve and increased fragility as the prompt increases in size.

TypeChat replaces prompt engineering with schema engineering.

Simply define types that represent the intents supported in your natural language application. That could be as simple as an interface for categorizing sentiment or more complex examples like types for a shopping cart or music application. For example, to add additional intents to a schema, a developer can add additional types into a discriminated union. To make schemas hierarchical, a developer can use a "meta-schema" to choose one or more sub-schemas based on user input.

After defining your types, TypeChat takes care of the rest by:

Constructing a prompt to the LLM using types.
Validating the LLM response conforms to the schema. If the validation fails, repair the non-conforming output through further language model interaction.
Summarizing succinctly (without use of a LLM) the instance and confirm that it aligns with user intent.
Types are all you need!
```

In brief:

1. TypeChat is a library that makes it easy to build natural language interfaces using types.
2. TypeChat replaces prompt engineering with schema engineering.
3. After defining types, TypeChat handles the rest by: constructing prompts to LLM using types. Validating that LLM responses conform to the schema. If validation fails, repairing non-conforming output through further language model interaction. Succinctly summarizing (without using LLM) the instance and confirming it aligns with user intent. Types are all you need!

For TypeScript developers, this project is incredibly cool.

## Requirements Description

Our requirement is to send messages to specified friends or groups by talking to the WeChat bot. For example:

To send a message to friend Zhang San telling him tomorrow's meeting is cancelled, just say to the bot "Tell Zhang San that tomorrow's meeting is cancelled," and the WeChat bot will automatically send a WeChat message to Zhang San.

Combined with voice recognition technology, we can even use voice to control WeChat like using a smart speaker to complete our needed actions.

## Implementation

Based on TypeChat implementation, we only need to define a type file, and TypeChat will automatically help us extract the recipient and content from "Tell Zhang San that tomorrow's meeting is cancelled."

We want the formatted information to look like this:

```TypeScript
{
    "actions": [
      {
        "actionType": "sendMessage",
        "event": {
          "text": "明天的会议取消了",
          "contacts": [
            "张三"
          ]
        }
      }
    ]
  }
```

This way we can search for WeChat friends through contacts and send the text message to them.

Build types, corresponding type file messageActionsSchema.ts:

```TypeScript
// The following types define the structure of an object of type MessageActions that represents a list of requested message actions

// Notify [xxx]: meeting cancelled, tell [xxx]: meeting cancelled
export type Message = {
    // Some message content, such as coming to the meeting immediately and picking up the delivery at the door
    text: string;
    // a list of people like 'team'
    contacts: string[];
};

// Notify group [xxx]: meeting cancelled, group [xxx]: meeting cancelled
export type RoomMessage = {
    // Some message content, such as coming to the meeting immediately and picking up the delivery at the door
    text: string;
    // a list of room or named groups like 'team'
    rooms: string[];
};

export type SendMessageAction = {
    // Send message to someone or notify someone
    actionType: 'sendMessage';
    event: Message;
};

export type SendRoomMessageAction = {
    // Send message to a group or send notification to a group
    actionType: 'sendRoomMessage';
    event: RoomMessage;
};

// if the user types text that can not easily be understood as a calendar action, this action is used
export interface UnknownAction {
    actionType: 'unknown';
    // text typed by the user that the system did not understand
    text: string;
}

export type Action =
    | UnknownAction
    | SendRoomMessageAction
    | SendMessageAction;

export type MessageActions = {
    actions: Action[];
};
```

Use TypeChat to implement a messageStructuring function. Calling this function can return the target format we want.

[Code examples continue with implementation details...]

## Effect

![send](/assets/2023/08-use-llm-control-your-wechat-en/1.webp)

![res](/assets/2023/08-use-llm-control-your-wechat-en/2.webp)

Send control commands to the admin group:

```TypeScript
/llm Tell Zhang San that tomorrow's meeting is cancelled

(Zhang San is not a bot friend)

luyuchao /llm >
2023/8/6 22:10:20
All sending failed[1]: Zhang San
```

```TypeScript
/llm Tell luyuchao that tomorrow's meeting is cancelled

(luyuchao is a bot friend)

luyuchao /llm >
2023/8/6 22:31:19
All sending successful[1]: luyuchao
```

```TypeScript
/llm Notify [Master, luyuchao]: Come to the company for a meeting tonight

(Both Master and luyuchao are bot friends)

luyuchao /llm >
2023/8/6 22:33:13
All sending successful[2]: Master, luyuchao
```

> View complete effect screenshots on GitHub [https://github.com/atorber/type-wechaty](https://github.com/atorber/type-wechaty)

## Historical Articles

- [Wechaty + WeChat Mini Program for Group Activity Registration](https://wechaty.js.org/2021/03/17/node-wechaty-and-wechaty-puppet-padlocal/)
- [Getting Started: How a Beginner Can Publish Their First Blog in the Wechaty Community (Part 1)](https://wechaty.js.org/2021/04/22/how-to-publish-blog-on-wechaty/)
- [New Windows Puppet Project wechaty-puppet-xp Startup](https://wechaty.js.org/2021/07/13/wechaty-puppet-xp-start-up/)
