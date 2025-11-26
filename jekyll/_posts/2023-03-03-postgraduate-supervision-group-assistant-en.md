---
title: "Postgraduate Exam Supervision Group Assistant - A Good Helper on the Postgraduate Exam Journey"
author: imooooc
categories:
  - article
image: /assets/2023/03-postgraduate-supervision-group-assistant-en/cover_title.webp
tags:
  - chatbot
  - assistant
excerpt: >
  A Wechaty-based bot for managing postgraduate exam study groups, featuring daily check-ins, study time tracking, scheduled reminders, and automatic countdown updates to help students focus on their studies.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2023/03/03/postgraduate-supervision-group-assistant/).

## Background

Planning to take the postgraduate entrance examination, I spontaneously organized a postgraduate study group. Currently, it mainly solves the function of managing group chats. Each member is required to check in daily for study in the group, and the group admin needs to keep records, including check-ins, study time calculation, missing check-in reminders, scheduled message notifications, and automatically updating the daily postgraduate exam countdown title, etc. Therefore, I thought of using wechaty to create a bot admin.

## Traditional Supervision Methods

In earlier times, I saw some group owners or admins manually statistics member check-in situations every day, like this

![image-0](/assets/2023/03-postgraduate-supervision-group-assistant-en/image-0.webp)

Time-consuming and laborious. There's also manually changing the postgraduate exam countdown every day, which is not only not timely and accurate enough, but also very troublesome to set up every day.![image-1](/assets/2023/03-postgraduate-supervision-group-assistant-en/image-1.webp)

Things like those mentioned above are actually repetitive labor that can be completely left to a robot to complete. Therefore, I thought of using **wechaty** to implement a postgraduate exam supervision group admin function.

## Currently Implemented Functions

- [x]  Scheduled message notifications
- [x]  Scheduled automatic group name modification
- [x]  Record group member check-ins
- [ ]  ~~Missing check-in reminders~~
- [x]  Study time calculation
- [ ] ~~Welcome reminder for new members~~
- [ ]  ~~Group member leaving reminder~~

## Check-in Format

Provides two scenarios: simple and standard:

| Scenario | Function Description                             | Description                                           | Notes                                       |
| :--- | :----------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| Simple | @bot assistant check-in                        | Only record check-in days, don't calculate study time, indicates studied today | @bot assistant check-in                              |
| Standard | @bot assistant check-in + space + time (unit: h) | Check-in and record study time                           | Time unit is h, number accurate to 1 decimal place (rounded) |

Example 1:
@bot assistant check-in

Example 2:
@bot assistant check-in 2.5h

## Implemented Effects

- Simple version mode

![image-2](/assets/2023/03-postgraduate-supervision-group-assistant-en/image-2.webp)

- Standard version mode

![image-3](/assets/2023/03-postgraduate-supervision-group-assistant-en/image-3.webp)

- Scheduled reminders and updating group name "Postgraduate Exam Countdown"

![image-4](/assets/2023/03-postgraduate-supervision-group-assistant-en/image-4.webp)

Data storage may be improved in the future. Currently, the data volume is relatively small. I record all students' check-in data in a json file. In the future, I can consider using a database and encapsulating operations as API calls.

At the same time, some new functions may be added, such as posting a summary of the content studied that evening, with the bot reminding in the morning the next day to consolidate knowledge learned the previous day. There are also missing check-in reminders - if a student hasn't checked in for 3 consecutive days, the bot will provide corresponding reminders and encouragement, etc.

This robot greatly facilitates our daily study and life, allowing us to save a lot of time. Compared to other postgraduate exam supervision group management, there's no need to manually modify the postgraduate exam countdown every day, no need to use an Excel spreadsheet to record member study check-in situations every day, allowing me to focus more on the postgraduate exam itself, leaving other miscellaneous matters to the robot. Finally, keep going for the 2024 postgraduate exam, definitely get admitted this year, charge charge charge!

> This is a translated version of the original Chinese post. You can find the original post [here](/2023/03/03/postgraduate-supervision-group-assistant/).
