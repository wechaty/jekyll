---
title: 'Adding Image and Video Sending Function to Bots'
author: mukaiu
categories: feature
tags:
  - code
image: /assets/2017/04-support-message-type-of-image-and-video-en/mukaiu-ding-code.webp
---

For company activities, we needed to manage users joining groups and provide automatic responses. Earlier at Node Party Beijing, I was exposed to @huan's sharing, and Wechaty was perfect for supporting this activity with Docker deployment - it's a great Bot Framework.

During development, I discovered that [#4 Support Message Type of Image/Video](https://github.com/wechaty/wechaty/issues/4) functionality was not yet implemented, so I decided to complete this feature.

## 1. Problem Analysis

To understand how Web WeChat sends images, I performed data packet capture and analyzed WeChat Web source code:

```js
onSuccess: function(e) {
   if (0 == e.BaseResponse.Ret) {
        var o = this.MMSendMsg;
        o.MediaId = e.MediaId,
        s.sendMessage(o),
        t.$apply(function()
            o.MMFileStatus = a.MM_SEND_FILE_STATUS_SUCCESS
        })
   } else
        this.onError("Ret: " + e.BaseResponse.Ret)
},
```  

In Web, Messages are created through this function. Image messages get a MediaId property added, so if we can obtain the MediaId of the file to be uploaded, we can directly call sendMessage to send images.

## 2. Image Upload

Through packet capture, I found that images are sent via POST request to:

```sh
https://file.wx.qq.com/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json
```

Searching the source code, I found:

```js
API_webwxdownloadmedia: "https://" + o + "/cgi-bin/mmwebwx-bin/webwxgetmedia",
API_webwxuploadmedia: "https://" + o + "/cgi-bin/mmwebwx-bin/webwxuploadmedia",
API_webwxpreview: "/cgi-bin/mmwebwx-bin/webwxpreview",
```

API_webwxuploadmedia is the image upload address. By searching globally for this variable, could I find the file upload method?
After searching:

```js
window.WebUploader = e;
Y = e.create({
       auto: !0,
       dnd: "#chatArea",
       paste: f.browser.webkit ? "#chatArea" : void 0,
       swf: c.RES_PATH + "third_party/webuploader-0.1.5/Uploader.swf",
       server: c.API_webwxuploadmedia + "?f=json",
       fileVal: "filename",
       pick: ".js_fileupload",
       compress: !1,
       duplicate: !0,
       threads: 1,
       chunked: !0,
       chunkSize: 524288
})
```

e is webuploader, handling file uploads, packaged separately in a chunk. Since there's no good way to control the browser to read local files, I decided to upload files by directly posting data to this address. This request doesn't upload cookie information, saving a lot of trouble. All parameters can be directly obtained by calling Web information:

```js
let uploadMediaRequest = {
      BaseRequest: baseRequest,
      FileMd5: md5,
      FromUserName: this.self().id,
      ToUserName: toUserName,
      UploadType: 2,
      ClientMediaId: +new Date,
      MediaType: UploadMediaType.ATTACHMENT,
      StartPos: 0,
      DataLen: size,
      TotalLen: size,
}

let formData = {
      id: 'WU_FILE_1',
      name: filename,
      type: contentType,
      lastModifiedDate: Date().toString(),
      size: size,
      mediatype,
      uploadmediarequest: JSON.stringify(uploadMediaRequest),
      webwx_data_ticket: webwxDataTicket,
      pass_ticket: passTicket || '',
      filename: '文件数据',
}
```  

The return result is:

```json
{
"BaseResponse": {
"Ret": 0,
"ErrMsg": ""
}
,
"MediaId": "@crypt_cd2308ca_e13f71eeb3879a52f58935743a1008b609f391eaa6bfcce5de32d9c523f934224a5327a37ad85ce2ad76f055d0205d17a6c1a7afe7200a1051a7eed41dd6d8696b43a3e61d8836759b30df3c9fb7abf9d89be37cb1ce787e22d1e947e4227beeb323937471d5c0548b976dcd22e3361694ac3ea53389b6185714a7cbf4ee40430c01925415804d758411ddf73ee6679c1ddea340455ed7eb803733f28c4b4e14b0218f84c5d938a01983b60e71a55131cb2d77f52ba3938089c7606d86078d1a7a097788ea7ed411d2f34889590ff49b2100a5942919d4256b9cb1f2032593268997957928350338ec1a3c50d2a64cd811c0227c4c4789ced408f64ac99f2ee64d4a59d415857205ea30bd74bb425d49ae0dfb6524d67d5d71e2dbea635db99be32dd8ca13f7b5fe14df96fbd0fd19b59fe5431451861a31e7d3754039f6f52e",
"StartPos": 19482,
"CDNThumbImgHeight": 100,
"CDNThumbImgWidth": 100
}
```

MediaId is what we need. We can directly call createMessage and sendMessage to send images.

## 3. Integrating with Wechaty

To quickly verify feasibility, I directly added Wechaty.sendMedia. After discussing with @huan @lijiarui, we decided to use the form say(MediaMessage(filename)) to send media files.
Overloaded:

```js
Wchaty.send(message: MediaMessage)
Contact.say(mediaMessage: MediaMessage)
Message.say(mediaMessage: MediaMessage)

//Planned for future addition
Room.say(mediaMessage: MediaMessage)
```

## 4. Pitfalls

1. During testing, I found that sending images sometimes failed because MediaId couldn't be obtained. My first thought was: are there still details I haven't discovered? Comparing post data, everything was identical with no issues, so where was the problem?

    Later, looking at the source code, I discovered:

    ```js
    var e = location.host
    , t = "weixin.qq.com"
    , o = "file.wx.qq.com"
    , n = "webpush.weixin.qq.com";
    e.indexOf("wx2.qq.com") > -1 ? (t = "weixin.qq.com",
    o = "file2.wx.qq.com",
    ```

    Turns out there's another address wx2.qq.com. The corresponding file upload address is file2.wx.qq.com. Not careful enough!

1. Another pitfall is that WeChat Web has a 20MB limit for videos, which I didn't notice initially. Sending large videos will fail.
1. Circular dependency
    Since MediaMessage inherits from Message, and Message.say(MediaMessage) needs to reference MediaMessage. OMG, circular reference! TypeScript reported errors and doesn't support this approach~
    So I moved MediaMessage into message.ts, deleted media-message.ts, and magically created 186 lines of changes😊

## 5. End

Now Wechaty supports sending images (bmp, jpg, png), videos (mp4), and other files.
Images and videos can be viewed directly in the chat window.
You can reply with "code" in ding-dong-bot to receive a QR code image.

![ding-code][mukaiu-ding-code]

Author: @[mukaiu](https://github.com/mukaiu), [Wechaty Contributor](https://github.com/orgs/Chatie/teams/contributor)

![avatars2](https://avatars2.githubusercontent.com/u/7746790?v=3&s=88)

[mukaiu-ding-code]: /assets/2017/04-support-message-type-of-image-and-video-en/mukaiu-ding-code.webp

---

> Chinese version of this post: [给机器人添加发送图片视频功能]({{ '/2017/04/13/support-message-type-of-image-and-video/' | relative_url }})
