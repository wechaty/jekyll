---
title: "Medical Assistant Bot Developed with Wechaty"
author: smartnikocj
categories: article
tags:
  - assistant
  - wechat
  - medicine
  - improve-efficiency
image: /assets/2022/02-wechaty-medical-bot-en/title-image.webp
excerpt: >
  A medical assistant bot built with Wechaty to help resident doctors manage clinical work, providing personalized reminders for ward rotations, professional knowledge queries, and automating repetitive communications in healthcare settings.
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2022/02/02/wechaty-medical-bot/).

## 1. Foreword

With the development and popularization of mobile internet instant messaging tools, communication between people increasingly relies on communication tools. For example, `WeChat` has become an important communication tool in various work scenarios. Healthcare is a special industry where communication between doctors and doctors, doctors and nurses, and doctors and patients is particularly important for disease diagnosis, treatment, follow-up, etc. As a specialist doctor, most patients come for certain common diseases, and communication content is often repetitive. How can machines or programs help us complete repetitive communications to improve work efficiency? In addition, medical knowledge is extensive and complex. How can machines or programs help us remember better?

## 2. Introduction to Chief Resident and Clinical Work

The author is a surgeon at a hospital, passionate about programming. During university, I self-learned Python for automated data processing, automated collection of medical record materials, research statistics and charting, which greatly improved my work efficiency and data accuracy. Currently serving as **Chief Resident** (abbreviated as `Chief Resident`). I believe everyone has heard of the `996` work system. The Chief Resident position lasts 1-2 years, with 24 hours a day in the ward to be on call. Some hospitals may have 1 day off per week. The work intensity of Chief Residents is definitely more demanding. Chief Resident is an advanced stage in resident training, a necessary stage for residents to grow into attending physicians. Generally, Chief Residents are responsible for all department matters, including but not limited to department scheduling, responsible for clinical rotation arrangements and exit exams for visiting doctors, rotating physicians, and interns; conveying various hospital documents and instructions; consultations for various departments both routine and emergency, especially emergency consultations requiring immediate availability; responsible for ward emergency rescue work, etc. Additionally, surgical Chief Residents need to participate in surgeries and may miss important reminders during operations. Secondly, visiting and rotating doctors rotate periodically, and each time new trainees arrive, reminders, guidance, and teaching need to be repeated. So how can we reduce the work pressure of Chief Residents, assist memory, and improve work efficiency during this process involving many repetitive and important message reminders, file delivery, and clinical work precaution notifications?

Therefore, a **Medical Assistant Bot** was developed based on `wechaty`. Due to the author's limited programming ability, this article only provides a brief introduction. For specific code, please refer to the [wechaty official website](https://github.com/wechaty/wechaty).

## 3. Currently Implemented Functions of the Medical Assistant Bot

### 3.1 Personalized Reminders for Clinical Work Precautions for Rotating Doctors

Admission diagnosis and clinical pathway entry
![new-admission-dignosis](/assets/2022/02-wechaty-medical-bot-en/new-admission-dignosis.webp)

New admission precautions
![new-admission](/assets/2022/02-wechaty-medical-bot-en/new-admission.webp)

Progress note writing precautions
![soap](/assets/2022/02-wechaty-medical-bot-en/soap.webp)

Items and content to focus on during morning rounds
![pre-wardround](/assets/2022/02-wechaty-medical-bot-en/pre-wardround.webp)
![recall](/assets/2022/02-wechaty-medical-bot-en/recall.webp)

Medical waste classification after dressing changes and procedures
![debridement](/assets/2022/02-wechaty-medical-bot-en/debridement.webp)

Discharge precautions and post-operative follow-up
![discharge](/assets/2022/02-wechaty-medical-bot-en/discharge.webp)

Medical record submission
![file-submit](/assets/2022/02-wechaty-medical-bot-en/file-submit.webp)

Weekend handover
![weekend](/assets/2022/02-wechaty-medical-bot-en/weekend.webp)
![exchange](/assets/2022/02-wechaty-medical-bot-en/exchange.webp)

### 3.2 Professional Knowledge Queries

Post-operative fluid replacement principles
![fluid](/assets/2022/02-wechaty-medical-bot-en/fluid.webp)

Common analgesic drugs
![analgesia](/assets/2022/02-wechaty-medical-bot-en/analgesia.webp)

Emergency rescue drugs
![life-saving](/assets/2022/02-wechaty-medical-bot-en/life-saving.webp)

### 3.3 Others

![light](/assets/2022/02-wechaty-medical-bot-en/light.webp)

![post-blood-check](/assets/2022/02-wechaty-medical-bot-en/post-blood-check.webp)

![tue-note](/assets/2022/02-wechaty-medical-bot-en/tue-note.webp)

## 4. Results

Although the Medical Assistant Bot currently only has some functions, it has greatly alleviated my burden as Chief Resident. Regular reminders and notifications have improved doctors' initiative. Currently, the medical record submission rate within the specified timeframe is 100%, and medical waste at dressing carts and dressing rooms is disposed of according to classification regulations.

## 5. Functions to be Developed and Prospects

Due to busy clinical work and limited programming ability, the Medical Assistant Bot currently has few functions. However, I have set some goals to develop more functions in the future. If there's an opportunity, I will share more with everyone later. Welcome to provide valuable suggestions (`smartnikocj@gmail.com`).

`Functions to be developed`:

- Rotating doctor scheduling and attendance
- Contact directory (different rotating doctors each month, regularly update directory, query anytime for convenient communication)
- Medical record writing precautions (regularly push medical record writing key points)
- Regular professional knowledge push (form knowledge network, regular push, query anytime, let visiting and rotating doctors learn more professional knowledge)
- Common medication usage precautions (such as regularly pushing drug interaction contraindications for commonly used drugs in our department)
- Emergency procedures and drugs (regularly push, repeatedly learn, so when encountering emergencies, be well-prepared)
- Doctor-patient communication (answer common patient questions, etc.)
- And more

## 6. Acknowledgments

Thanks to the hard work of [wechaty](https://wechaty.js.org/) community developers, and thanks to [Huan](https://github.com/huan) for valuable suggestions. Hope this project can continue to develop.

---
