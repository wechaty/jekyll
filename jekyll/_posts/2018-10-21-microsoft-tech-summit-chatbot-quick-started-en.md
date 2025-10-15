---
title: "Microsoft Tech Summit - Quickly Build a Chatbot"
author: lijiarui
categories: event
tags:
  - talk
  - news
  - chatbot
  - luis
image: /assets/2018/microsoft-hol-chatbot.webp
excerpt: "A hands-on lab from Microsoft Tech Summit 2018 that shows you how to quickly build a WeChat chatbot using Microsoft LUIS and Wechaty."
---

This is my sharing at the hands-on lab of [Microsoft Tech Summit 2018](https://mp.weixin.qq.com/s/Hm2tc_V4b3EKOlBx4PxEuA). The Microsoft Tech Summit 2018 was held at the Shanghai World Expo Center on October 24. As Microsoft's most prestigious technical summit, this conference will lead participants to deeply appreciate the essence of technology, feel the charm of Microsoft's black technology, and explore how to gain insight into new technologies and new changes in the development trend of cloud computing, Internet of Things, mobile Internet, big data and artificial intelligence, focusing on solving problems and creating value, and how to start the digital transformation journey of enterprises.

This experiment helps developers start from actual business scenarios, practice around Microsoft Luis and Typescript, and let developers easily make a WeChat chatbot. In addition, for traditional product managers or traditional engineers who hope to transform into artificial intelligence, it can help you quickly understand the industry background and get started quickly. For technical decision-makers, you can clearly understand the limitations and development of chatbots at this stage.

## Introduction to Luis

LUIS (Language Understanding Intelligent Service, <https://www.luis.ai>) is a natural language semantic understanding module development service for developers released by Microsoft. The mission of LUIS is to **enable developers who are not NLP professionals to easily create and maintain high-quality natural language understanding models, and seamlessly connect to related smart applications**.
Through the LUIS platform, non-NLP professional developers can easily create a LUIS App, and further "cultivate" it by marking the desired input (natural language instructions) and output (intent and entities). In the entire development process, developers do not need to understand the details of the underlying algorithms, but only need to clearly define the user intent and entities that they need the machine to understand. LUIS App can be any traditional application, including social media applications, chatbots, physical robots, in-vehicle and voice-enabled desktop applications.
The development process of LUIS is more like a teaching process: the developer is the teacher, and the LUIS App is the student. The teacher completes the teaching by constantly telling the student the correct semantic analysis results. A good teaching process is a closed loop of "training + practice": marking a certain amount of initial data; training to obtain a semantic understanding model; performing necessary tests on the model; publishing the model and applying it to real user scenarios; selecting statements from application logs; continuing to mark and update the model. This process is repeated, and through continuous iterative development, the understanding model is continuously improved to make it closer and closer to human understanding.

![luis](/assets/2018/microsoft-hol-luis.webp)

## Experimental Objectives

- Build a LUIS model
- Use wechaty to create a WeChat chatbot
- Integrate the LUIS model into the WeChat robot

## System Requirements

- Ubuntu 18
- Microsoft Visual Studio Code (VSCode)
- Node (version > 10.0)
- Github account
- Luis account

## Steps

1. Install Ubuntu 18
2. Install Node and Npm
3. Install Microsoft Visual Studio Code (VSCode)
4. Install Github
5. Clone the project from Github: <https://github.com/lijiarui/microsoft-summit-chatbot-course>

## Experiment

1. Create a LUIS model
2. Create a WeChat robot
3. Integrate the LUIS model into the WeChat robot

## Experiment 1--Create a LUIS model

Creating a LUIS model can be divided into 3 steps: creating an APP, training the model, and publishing the model. The following will be explained in detail:

### Task 1-Create APP

1.Log in to www.luis.ai. If you have registered before, sign in. If you have registered, you can log in directly:

![luis-1](/assets/2018/microsoft-hol-luis-1.webp)

2.Click "Create New App" in the upper left corner to create a new application

![luis-2](/assets/2018/microsoft-hol-luis-2.webp)

3.In the pop-up box, give your LUIS model a name, set a description, and then select an application environment. We choose Chinese. Then click "Done"

![luis-3](/assets/2018/microsoft-hol-luis-3.webp)

4.Then go to the main page of the LUIS model, and then go to train the LUIS model.

![luis-4](/assets/2018/microsoft-hol-luis-4.webp)

### Task 2-Add intents and entities

Next, we add two intents to our APP. Intents represent the tasks that users want to perform. Define a set of intents that correspond to the actions that users want to perform in the APP.

1.Click ‘Create new intent’ to create a ‘BookFlight’ intent, and name this intent ‘BookFlight’ and click ‘Done’

![luis-5](/assets/2018/microsoft-hol-luis-5.webp)

![luis-6](/assets/2018/microsoft-hol-luis-6.webp)

![luis-7](/assets/2018/microsoft-hol-luis-7.webp)

2.Enter a possible ticket booking phrase, such as "Help me book a flight to Shanghai", and then press Enter:

![luis-8](/assets/2018/microsoft-hol-luis-8.webp)

3.It is recommended to write at least 5 similar phrases, and you will find that these phrases will be automatically marked with the BookFlight intent.

![luis-9](/assets/2018/microsoft-hol-luis-9.webp)

4.Go back and click ‘Intent’ to add a ‘GetWeather’ intent. Like just now, enter at least 5 phrases that indicate the weather:

![luis-10](/assets/2018/microsoft-hol-luis-10.webp)
![luis-11](/assets/2018/microsoft-hol-luis-11.webp)

#### Define entities

You can create various categories of entities. Entities represent useful words or phrases in utterances, and they will be the key elements to complete the task. Entities and their associated intents are very important for the task execution of the APP. In our example of booking a flight, "location", "date", "airline", and "cabin" are all very important entities.

There are multiple types of entities:

- Simple: Identified by machine learning, it is the simplest entity
- Hierarchical: Identified by machine learning, the entity obtained according to the context relationship, such as Location, knows whether it is ToLocation or FromLocation according to the context. They share an entity set, but are assigned to different entities according to the context.
- Composite: Identified by machine learning, composed of multiple entities, such as 3 tickets to Shanghai, which can be an entity of PlaneTicketOrder, composed of number and ToLocation
- List: It is identified by text matching and is a closed set of words. LUIS will not automatically generate more values for List
- Regex: Entities identified by regular expressions
- Pattern.any: It is a variable-length placeholder used in templates to mark the start and end positions of entities. For example, to search for books: Who wrote {BookTitle}[?]

1. Click ‘Create new entity’ to create a new entity.

2. In the pop-up box, name the entity ‘Location’ and select the entity category as ’Hierarchical’

3. After selecting the entity category, 'Child name' will automatically pop up. Click ‘Add a child entity’ to add two Child names, which are ’ToLocation’ and ‘FromLocation’

4. Finally, click ’Done’ to save this entity.

![luis-12](/assets/2018/microsoft-hol-luis-12.webp)

#### Use Pre-Build Entities

Next, we add a predefined time entity.

1.Click ‘Add prebuild Entity’

![luis-13](/assets/2018/microsoft-hol-luis-13.webp)

2.Pre-built entities do not support Chinese yet, so we can choose 'number' to experience it first.

![luis-14](/assets/2018/microsoft-hol-luis-14.webp)

### Task 3-Train the model

After we have defined the intents and entities, we need to train the model. Click 'Train' in the upper right corner. When the button turns from red to green, the training is successful. To make the model more and more useful, you need to add more labeled intents and entities.

![luis-15](/assets/2018/microsoft-hol-luis-15.webp)

Click ‘Publish’ to publish this App. Finally, it can be integrated into the WeChat robot.

## Experiment 2--Create a WeChat robot

This part shows how to quickly build a WeChat robot

### Task 1-Run the code

1.Enter the command git clone <https://github.com/lijiarui/microsoft-summit-chatbot-course.git>

![wechaty-1](/assets/2018/microsoft-hol-wechaty-1.webp)

2.Enter the directory microsoft-summit-chatbot-course, cd microsoft-summit-chatbot-course

3.Install dependencies, run npm install

![wechaty-2](/assets/2018/microsoft-hol-wechaty-2.webp)

### Task 2-Run the code

1.Run npm run start

![wechaty-3](/assets/2018/microsoft-hol-wechaty-3.webp)

## Experiment 3--Integrate the LUIS model into the WeChat robot

### Task 1-Publish LUIS version

1.Click LUIS's Publish to get APPID and KEY

![integrate-1](/assets/2018/microsoft-hol-integrate-1.webp)

2.After successful publication, you can see a green success prompt. Click Refer to the list of endpoints to switch to the management page:

![integrate-2](/assets/2018/microsoft-hol-integrate-2.webp)

3.Get Authoring Key:

![integrate-3](/assets/2018/microsoft-hol-integrate-3.webp)

4.Click Application Information to get APP ID

![integrate-4](/assets/2018/microsoft-hol-integrate-4.webp)

### Task 2-Access LUIS RESTFUL API to wechaty

1.Install the official 'luis-sdk' and fill in the obtained key and Application ID:

![wechaty-4](/assets/2018/microsoft-hol-wechaty-4.webp)

2.Write sample code according to the existing LUIS configuration:

![wechaty-5](/assets/2018/microsoft-hol-wechaty-5.webp)

3.Run npm run start:

![wechaty-6](/assets/2018/microsoft-hol-wechaty-6.webp)

When the user sends, they will get a test reply:

![demo](/assets/2018/microsoft-hol-demo.webp)

Note:
Due to time constraints, this experiment only explains the LUIS part. The key obtained by LUIS is only a free test version. In the future, it needs to be combined with Azure to obtain a stable paid version of the interface.

> This post is also available in [Chinese](/2018/10/21/microsoft-tech-summit-chatbot-quick-started/).
