---
title: 'Building a Face Recognition Chatbot - Wechaty Blinder'
author: lijiarui
categories: project
tags:
  - code
  - talk
  - machine-learning
  - tensorflow
  - featured
  - utility
  - social
excerpt: "Learn how to build a WeChat face recognition bot using Wechaty, TensorFlow, and FaceNet to help identify people in photos"
image: /assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-1.webp
---

This was my presentation at the TensorFlow session of the [2017 Beijing Google Developer Festival](http://www.itdks.com/eventlist/detail/1627). The event was hosted by Google (China) and the Google Beijing Developer Community, co-hosted by Beijing University of Posts and Telecommunications. I mainly introduced how to use the open-source project Wechaty-Blinder to quickly build a WeChat face recognition bot that can help you identify people in photos.

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-1.webp)

## Who am I

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-2.webp)

Before sharing this open-source project, let me introduce a congenital deficiency of mine:

1. Nearsighted + astigmatic, but I wear glasses only a few times per year.
2. Congenitally unable to remember people's faces.
3. I meet many people every day and have thousands of WeChat friends.

Usually, I chat enthusiastically with someone on WeChat, then meet them at an event and have a great conversation, but when we meet again months later, after enthusiastic greetings, we both silently wonder "who is this person?"

To avoid people thinking I'm a cold person, wherever I'm active, as long as someone looks at me, I warmly greet them. Perhaps they're also silently wondering "who is this crazy person?"

Yes, I have face blindness.
And the face recognition bot I'm introducing today uses artificial intelligence to specifically help me recognize various people.

## Content

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-3.webp)

I'll share from 5 perspectives: first, a brief introduction to TensorFlow, then Google's FaceNet, followed by our 3 open-source projects: Wechaty, Node-FaceNet, and Wechaty-Blinder. Finally, I'll give a live code demonstration.

The reason I need to introduce Wechaty and Node-FaceNet when presenting the Wechaty-Blinder project is because Wechaty-Blinder is based on these two open-source projects.

## Google TensorFlow

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-4.webp)

The face recognition bot Wechaty uses TensorFlow at its core. The Wechaty-Blinder I'm introducing today is a Node.js open-source project based on TensorFlow and Google's FaceNet paper, which can help solve face authentication, recognition, and clustering problems.

## Google FaceNet

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-5.webp)

FaceNet comes from Google's paper [FaceNet: A Unified Embedding for Face Recognition and Clustering](https://arxiv.org/abs/1503.03832), which is a neural network for face classification.

Unlike other deep learning methods applied to faces, FaceNet doesn't use the traditional softmax approach for classification learning and then extract features from a certain layer. Instead, it directly performs end-to-end learning of an encoding method from images to Euclidean space, then does face recognition, face verification, and face clustering based on this encoding. Euclidean distance can directly represent face similarity.

FaceNet algorithm has 2 characteristics:

1. Removes the final softmax layer and uses triplet distance calculation for model training. The image representation learned this way is very compact - 128 bits are sufficient.
2. Triplet selection is very important; good selection can lead to fast convergence.

## Open Source Chatie

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-6.webp)

Wechaty is an open-source WeChat bot framework for personal accounts. You can implement a simple bot with just 6 lines of JavaScript code, supporting Linux, Windows, Darwin (OSX/Mac), and Docker.
Blog address: [https://wechaty.github.io](https://wechaty.github.io)

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-7.webp)

The simplest 6-line code is here. You can also go to my project [wechaty-getting-started](https://github.com/lijiarui/wechaty-getting-started.git) to quickly get started with Wechaty. The final Wechaty running interface looks like the right side.

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-8.webp)

Github, Docker, and npm related addresses are here. Wechaty has very comprehensive DevOps - once code is committed, automated testing runs automatically. When tests pass, Docker and npm are automatically packaged and updated. So developers are welcome to submit pull requests.

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-9.webp)

Wechaty now has a very comprehensive developer community with developers covering the globe, including China, the United States, Australia, the United Kingdom, etc. This is a partial list of contributors, and Chatie also has several sub-projects supporting WeChat bots.

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-10.webp)

[Node-FaceNet](https://npmjs.com/package/facenet) is an open-source project based on TensorFlow and FaceNet that solves face authentication, recognition, and clustering problems. It's a Node.js wrapper for Python's FaceNet library, mainly implementing these three key functions:

1. Place different faces in a Euclidean space where the distance between different faces represents face similarity.
2. Well-optimized face recognition performance - a face can be represented with just a 128-dimensional vector.
3. Achieves 99.63% accuracy on the LFW dataset and 95.21% accuracy on the YouTube dataset.

## Open Source Node-FaceNet

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-11.webp)

This open-source project's core consists of 2 classes and 3 methods. For more details, refer to the [documentation](http://www.zixia.net/node-facenet) I wrote.

Two main classes:

1. Face - obviously represents a face
2. FaceNet - represents a collection of faces

Three main methods:

1. align() - finds all faces contained in an image by first finding face coordinates, then generating a Face instance array. In other words, pass an image to align and it returns an array of faces.
2. embedding() - converts a face into a 128-dimensional vector
3. distance() - calculates the distance between two faces

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-12.webp)

This is a simple example. Let's read the code on the left. First create a FaceNet instance, then pass in a photo and see the printed face results. The right side shows the printed results. From this we can see that after the align function finds the face coordinates in the image, it generates a Face instance and puts all instances in an array. These coordinates include two types: one is the bounding box that can frame the face, and the other is 5 key feature points on the face. Look at the log to get a feel:

* bounding box: The box that frames the face, represented by two key points - top-left corner and bottom-right corner
* landmarks: 5 key feature points on the face - left eye, right eye, nose, left mouth corner, right mouth corner  
* embedding: The 128-dimensional vector representing the face. In the FaceNet paper, embedding represents a facial feature matrix as a 128-dimensional vector.

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-13.webp)

This is another example that visualizes the distance between faces.
We can see the green bounding box is what I mentioned above - the box that frames the face from align. The numbers 1.45, 1.47, 0.66 represent the similarity between two faces. We can see that the smaller the number, the more similar the faces. If two faces belong to the same person, their distance is usually around 0.75. Of course, this is just an empirical number and needs specific analysis for specific situations.

## Open Source Wechaty-Blinder

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-14.webp)

Finally, we get to today's main character - the face recognition bot open-source project [wechaty-blinder](https://github.com/huan/wechaty-blinder). Actually, once you understand the two projects above, Wechaty-Blinder becomes very easy to understand.

This project can remember the faces of all your WeChat friends.

Once the bot remembers a face, you can name that face anytime, anywhere. It has these 3 functions:

1. Remember all friends' faces in groups
2. Remember all friends' faces in your contact list  
3. Remember faces in every photo you send

Of course, it can then help you recognize which people in your photos, groups, and friends are the same person.

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-15.webp)

This is the effect of using Wechaty-Blinder. You can see when I send photos of Donnie Yen (甄子丹) and Andy Lau (刘德华), it automatically outputs all similar faces from the database and allows you to rename them anytime. Simply put, it does two things:

1. Recognize faces
2. Name faces

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-16.webp)

You can experience it yourself. This is the wechaty-dev-facenet WeChat group I created in advance for this event. There's a bot in the group - scan the QR code to join and experience this function.

This bot has been packaged with Docker. Run the following command to start the bot. `WECHATY_TOKEN=TOKEN` can be any name you choose.

```shell
docker run -d --restart=always --volume=/workdir:/workdir -e WECHATY_TOKEN=TOKEN zixia/wechaty-blinder
```

If you want to control this bot through a web interface anytime, it's simple - follow these 5 steps:

1. Open <https://wechaty.github.io/angular/> and click "Click to run"
2. Enter your WECHATY_TOKEN in the input box and click "Set Token"  
3. Wait for the login QR code to appear, then scan it with your phone camera (long-pressing in WeChat won't work)
4. Create a new group. After creating the group, don't do anything else - first change the group name to any string containing "facenet"
5. Send photos in the group, and the bot possessing you will cast its magic.

## Finally, thanks to Google for hosting such an interesting event

![wechaty](/assets/2018/01-how-to-build-face-blinder-bot-en/wechaty-blinder-17.webp)

This event invited dozens of senior engineers from home and abroad. In addition to Google's R&D expert team, the JetBrains team was also invited - this was JetBrains' first official Kotlin sharing in mainland China. The event also invited many first-tier domestic R&D teams from companies like Didi, Strikingly, Baidu, Swarma, Juzi.BOT (句子互动), etc., sharing their recent first-line development experience.

DevFest is a technical exchange event that Google promotes annually in the fall through global GDGs (Google Developer Communities) for Google technology developers and enthusiasts. Its main purpose is to synchronize various advanced Google-related technologies, promote and apply them, and foster communication among local community members. DevFest events feature attractive themed presentations, interactive participation segments, and authentic Google merchandise - unmissable experiences for Google technology developers and enthusiasts.

> Author: [Jiarui LI (李佳芮)](https://github.com/lijiarui)  
> Code: [Github](https://github.com/huan/wechaty-blinder)

---

> 中文版: [构建脸盲聊天机器人--Wechaty Blinder](/2018/01/25/how-to-build-face-blinder-bot/)

---

> Chinese version of this post: [how to build face blinder bot]({{ '/2018/01/25/how-to-build-face-blinder-bot/' | relative_url }})
