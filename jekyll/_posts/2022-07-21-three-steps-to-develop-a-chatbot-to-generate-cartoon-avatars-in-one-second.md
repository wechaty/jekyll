---
title: 三步开发聊天机器人一秒生成漫画头像    
author: hu-qi    
categories: article    
tags:    
  - puppet-service   
  - code    
  - ai   
image: /assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/title.webp    
mermaid: true    
---


大家好，我是胡琦。由于各种原因以及没能好好坚持笔记写作的习惯，距离上次分享有小半年了，今天给大家带来的是《三步开发聊天机器人一秒生成漫画头像》，其实就一个小小的功能：通过给微信群聊发送特定关键字触发聊天机器人头像漫画化处理程序，从而生成动漫化的头像。怎么实现呢？总的思路就是基于 ModelArts AI Gallery 快速验证 AnimateGanv2 现实照片动漫化能力，基于 Flask 快速部署动漫化服务，基于 Wechaty 快速开发动漫化聊天机器人。

## 为什么是 AnimeGAN?

动漫(Animation & Comic)作为日常生活中一种常见的艺术表现形式，在儿童教育、影视、广告等领域中应用十分广泛；但动漫创作困难、周期长、开发难度大，对创作者要求也十分苛刻，一般来说好的动漫作品需要创作者掌握线条、纹理、颜色和阴影等绘画技巧；普通人想要快速创造自己的动漫作品不得不借助工具。近年来，随着元宇宙的不断发展，人们对动漫的需求越来越多，比如生成二次元自画像、制作 NFT 艺术品等等，因此动漫风格迁移似乎成为“炼丹师”们喜爱的研究方向之一。

图像风格迁移还得从 [pix2pix](https://phillipi.github.io/pix2pix/) 和 [CycleGAN](https://junyanz.github.io/CycleGAN/) 说起，这两个基于 GAN 的风格迁移算法为动漫画图片生成奠定了技术基础，后续的 [CartoonGAN](https://openaccess.thecvf.com/content_cvpr_2018/papers/Chen_CartoonGAN_Generative_Adversarial_CVPR_2018_paper.pdf) 通过语义内容损失函数和边缘增强的对抗性损失函数使生成的动漫图片质量更高。而 [AnimeGAN](https://github.com/TachibanaYoshino/AnimeGAN/blob/master/doc/Chen2020_Chapter_AnimeGAN.pdf)基于 CartoonGAN 改进，并提出了一个更加轻量级的生成器架构以及灰度风格损失、灰度对抗损失和颜色重建损失三个新的损失函数，使其风格化的视觉效果能超越 CartoonGAN。

毕竟，AnimeGAN 让新海诚本人都感觉很有趣；而对于我们普通人来说，多了一种创作的可能，只需一张现实照片就能通过 AI 输出大师级的动漫作品！

![新海诚 AnimeGAN](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/1.webp)

## 什么是 AnimeGAN ？

![AnimeGAN 发展历程](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/2.webp)

提到 AnimeGAN ，不得不说说它的发展历程，一作[Asher Chan](https://github.com/TachibanaYoshino)从 2019 年提交第一个 Git Commit 至今，已经迭代了三个版本，[AnimeGANv3](https://github.com/TachibanaYoshino/AnimeGANv3)放出了可执行程序和刚出炉还热乎的肖像素描（点我快速体验：[Run in ModelArts - AnimeGANv3 肖像素描生成](https://developer.huaweicloud.com/develop/aigallery/notebook/detail?id=8e87f943-9178-48d7-be00-28b9007dc7cb)）。

![AnimeGANv3 生成肖像画](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/3.webp)

AnimeGAN 实现了将现实世界场景的照片转换为动漫风格图像。 [AnimeGANv1](https://cdn.jsdelivr.net/gh/TachibanaYoshino/AnimeGAN/doc/Chen2020_Chapter_AnimeGAN.pdf) 提出了三种损失函数：灰度样式损失、颜色重建损失和灰度对抗损失。  
解决了：  
1.生成的图像没有明显的动画风格纹理  
2.生成的图像丢失了原始图像的内容；  
3.网络的参数需要大的存储容量。

[AnimeGANv2](https://tachibanayoshino.github.io/AnimeGANv2/) 修复了上个版本中存在的问题，例如模型生成的图像中存在高频伪影;更容易训练且直接能到达论文效果；进一步减少网络参数使生成器更小；尽可能多地使用更高画质的风格数据。作者觉得创新性不大因此就没重新发表论文。

[AnimeGANv3](https://github.com/TachibanaYoshino/AnimeGANv3) 基于与 Google 的商业许可，作者暂时不提供源码。不过目前提供了图形用户界面程序 (AnimeGANv3.exe) 和预训练模型 (onnx.zip) ，目前我们可以直接在 Windows 上体验图片或视频转动漫风格。截止笔者发文，作者由更新了 AnimeGANv3_PortraitSketch 用于生成肖像画，也就是上图的效果。

笔者有幸体验了 AnimeGAN 带来的乐趣，下图中左边是在华为云 ModelArts 上运行的结果，通过识别人脸关键点之后再进行风格迁移能获得动漫化头像；右边是 AnimeGANv3.exe 在本地运行的结果，我们无需关系环境和代码执行，简单操作就能生成动漫图片；中间是本次分享的主角--一个能将图片动漫化的聊天机器人。

![AnimeGAN 应用](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/4.webp)

## 在 AI Gallery 上提前验证

我们通常认为“数据、算法、算力”是人工智能的三要素，现如今，处在大数据时代，可靠高质量的数据的获得变得简洁；优质的算法随着开源文化的发展也变得普及；然而算力确成了制约人工智能普及的“拦路虎”，就连 AnimeGAN 的作者也感叹[“论文的延迟发表只因只借到了一年的 2080ti”](https://github.com/TachibanaYoshino/AnimeGANv3/issues/1)。对于笔者而言，幸亏有普惠 AI 的华为云 ModelArts，[AI Gallery](https://developer.huaweicloud.com/develop/aigallery/home.html) 是在 ModelArts 的基础上构建的开发者生态社区，提供了 Notebook 代码样例、数据集、算法、模型、Workflow 等 AI 数字资产的共享，姑且理解为 AI 届的 Github。

![AI Gallery](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/5.webp)

数据方面，AI Gallery 的数据模块支持数据集的共享和下载；而且数据集是支持 License 声明的，这一点类似于开源社区；
算法方面，AI Gallery 的算法模块支持算法的共享和订阅；并且算法支持变现，类似于一个算法商城；
算力方面，用户在 AI Gallery 中通过点击“Run in ModelArts”可以将 Notebook 案例在 ModelArts 控制台快速打开、运行以及进行二次开发等操作，目前提供有限的免费算力。

![一键Run in ModelArts，算力我有](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/6.webp)

通过学习改造 AI Gallery 已有的 AnimeGAN 案例，我们能够快速运行 NoteBook 并得到动漫化头像。

![Github 头像动漫化](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/7.webp)

## 基于 Wechaty 快速构建机器人

提到聊天机器人的开发，作为前端工程师，笔者认为最快捷的方式莫过于`import {Wechaty} from "wechaty";`,是的，Wechaty 是一个开源的的对话机器人 SDK，支持 个人号 微信。它是一个使用 Typescript 构建的 Node.js 应用。支持多种微信接入方案，包括网页，ipad，ios，windows， android 等。同时支持 Linux, Windows, Darwin(OSX/Mac) 和 Docker 多个平台。因此我们要实现聊天机器人就十分简单了！（PS：除了 token 有点小贵，当然有能力有创意可以加入官方资助计划）。

![Wechaty 构建机器人](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/8.webp)

聊天机器人有了，接下来怎么接入 AnimeGAN 的能力呢？为了给机器人提供服务，我们需要部署一个应用给前端提供接口，暂且使用 Flask 快速部署头像动漫化服务。

```python
from flask import *
# import request
import os
import uuid
import numpy as np
from animeGANv2 import *

app = Flask(__name__,template_folder='view')
app.config['MAX_CONTENT_LENGTH'] = 0.5 * 1024 * 1024  # 3MB

# 转换图片文件
@app.route('/postdata', methods=['POST'])
def postdata():
    print(request)
    f = request.files['content']
    print(f)
    user_input = request.form.get("name")
    basepath = os.path.dirname(__file__)  # 当前文件所在路径
    src_imgname = str(uuid.uuid1()) + ".jpg"
    upload_path = os.path.join(basepath, 'static/srcImg/')

    if os.path.exists(upload_path)==False:
        os.makedirs(upload_path)
    f.save(upload_path + src_imgname)
    # img = cv2.imread(upload_path + src_imgname, 1)

    save_path = os.path.join(basepath, 'static/resImg/')
    if os.path.exists(save_path) == False:
        os.makedirs(save_path)
    fileSize = os.path.getsize(upload_path+src_imgname)
    if(fileSize / 1024 / 1024 > 1):
        resSets = dict()
        resSets["value"] = 10
        resSets["resurl"] = "http://127.0.0.1:5000" +'/static/resImg/' + src_imgname
    else:
        inference_from_file(upload_path+src_imgname,os.path.join(save_path, src_imgname))
        resSets = dict()
        resSets["value"] = 10
        resSets["resurl"] = "http://127.0.0.1:5000" +'/static/resImg/' + src_imgname
    return json.dumps(resSets, ensure_ascii=False)

# 转换图片链接
@app.route('/postdataUrl', methods=['POST'])
def postdataUrl():
    url = request.values['content']
    print(url)
    user_input = request.form.get("name")
    basepath = os.path.dirname(__file__)  # 当前文件所在路径
    src_imgname = str(uuid.uuid1()) + ".jpg"

    save_path = os.path.join(basepath, 'static/resImg/')
    if os.path.exists(save_path) == False:
        os.makedirs(save_path)
    inference_from_url(url,os.path.join(save_path, src_imgname))
    resSets = dict()
    resSets["value"] = 10
    resSets["resurl"] = "http://127.0.0.1:5000" +'/static/resImg/' + src_imgname
    return json.dumps(resSets, ensure_ascii=False)

if __name__ == '__main__':
   app.run(threaded=True)
```

> **完整代码详见：[https://github.com/hu-qi/MDG-AnimeGANv2](https://github.com/hu-qi/MDG-AnimeGANv2)**

大致的效果如下图：
![头像漫画风聊天机器人](/assets/2022/07-three-steps-to-develop-a-chatbot-to-generate-cartoon-avatars-in-one-second/9.webp)

至此我们已经完整地快速开发了一个头像漫画风聊天机器人，是不是很简单？文章有不当之处欢迎指正！
