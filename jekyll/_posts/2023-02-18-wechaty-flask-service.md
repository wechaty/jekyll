---
title: "使用wechaty与Flask搭建消息通知服务"
author: houruirui
categories: project
tags:
  - productivity
image: /assets/2023/02-wechaty-flask-service/wechaty.webp
---
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://wechaty.js.org)
[![Wechaty Contributor Program](https://img.shields.io/badge/Wechaty-Contributor%20Program-green.svg)](https://wechaty.js.org/docs/contributor-program)
[![Juzi.BOT Developer Program](https://img.shields.io/badge/Wechaty%20Contributor%20Program-Juzi.BOT-orange.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty/)

> 作者: [Houruirui](https://github.com/Houruirui)，代码爱好者。

[Wechaty-Flask-Service](https://github.com/Houruirui/wechaty-flask)

<!-- more -->

目前，市面上有各种各样的接口提供了消息推送，比如钉钉，spark， IFTTT， telegram等等. 但是，每个人手机里各种各样的消息推送常常让人应接不暇。而微信，作为最广泛使用的聊天工具，鲜有人错过阅读微信消息。 所以，最方便的还是通过微信机器人来进行消息推送。

通过搜索，了解到目前市场的消息机器人有itchat， wxpy，wechaty等等。可是随着腾讯施加压力，基于web微信的itchat和wxpy无法使用。而wechaty支持多种协议，比web协议更加安全，于是决定采用wechaty基于ipad协议 ( padLocal ) 来搭建机器人。但是，在实际的应用当中，而且wechaty是通过消息回调的形式实现的，这样的情况下，就没有办法让机器人主动发消息，还有一个问题是可能你有很多个应用都需要使用微信通知，但是一个Token只能供一个微信账号使用，那怎么样才能让多个服务都通过这一个微信来发通知呢？对于这两个问题，我想到的办法首先自己实现初始化机器人，在完成初始化后直接返回机器人而不让机器人进入消息监听循环，从而主动控制机器人收发消息；在多服务的场景下，用flask建立后端服务，维护初始化好的机器人，这样不同的业务可以直接向后端发起请求而实现消息通知。

让我们进入正题！

## 环境和依赖

python
aioflask
asyncio

## Wechaty Puppet Hostie部署

因为原生的wechaty是基于JavaScript和TypeScript写的，所以需要通过docker搭建Wechaty Puppet Hostie 服务作为中转， 从而可以通过python调用。

- **部署前置准备:**

一个满足以下三点要求的服务器：

>Public IP
>Public Port
>Docker

- **部署Wechaty Puppet Hostie**

具体代码如下（本人服务器为 Ununtu 18.04）

```bash
#! /usr/bin/bash

export WECHATY_LOG="verbose"
export WECHATY_PUPPET="wechaty-puppet-padlocal"
export WECHATY_PUPPET_PADLOCAL_TOKEN="puppet_padlocal__TOKEN__"

export WECHATY_PUPPET_SERVER_PORT="9001"
export WECHATY_TOKEN=$(curl -s https://www.uuidgenerator.net/api/version4)
  --name wechaty_puppet_service_token_gateway \
  --rm \
  -e WECHATY_LOG \
  -e WECHATY_PUPPET \
  -e WECHATY_PUPPET_PADLOCAL_TOKEN \
  -e WECHATY_PUPPET_SERVER_PORT \
  -e WECHATY_TOKEN \
  -p "$WECHATY_PUPPET_SERVER_PORT:$WECHATY_PUPPET_SERVER_PORT" \
  wechaty/wechaty
```

代码中的WECHATY_PUPPET_PADLOCAL_TOKEN是需要向官方申请，可以得到的一个可以试用7天的token，后续通过社区的激励计划，还可以免费获得时效更长的token。[详情参见这里](https://wechaty.js.org/docs/contributor-program/)。

- **验证Wechaty Puppet Hostie**

访问 <https://api.chatie.io/v0/hosties/WECHATY_TOKEN>, 其中WECHATY_TOKEN是指你刚刚自行设定的Token，当返回结果为服务器的Public IP时则说明部署成功，为0.0.0.0时则说明部署失败~

## 项目思路

关于机器人方面，我读了官方examples里面的代码发现机器人都是继承Wechaty基类来通过自定义回调函数来实现各种功能。利用事件驱动的回调函数这样是很被动的，而我想得到一个可直接调用的Wechaty对象，不通过start()函数进入事件循环监听, 而可以主动的发送信息。经过一天的阅读代码和自我摸索，终于实现了创建一个可以直接调用的机器人对象，稍后请参考详细代码，其中最重要的还是需要进入事件监听，然后在监听到成功登录的事件以后，中断监听，返回已经登录好的机器人对象， 从而实现直接调用。

首先我们初始化机器人对象，我是想把消息通知发送到群聊当中，在使用过程中发现，在初始化好机器人后并没有加载好微信群，所以我们需要先用官方提供的examples来获取到微信群的id，然后手动加载微信群。同时，我还发现如果同步的发送消息，flask需要5-10s才能处理完请求，所以在这里我使用了用线程处理不同的请求，实现了消息的并发。

```python
from aioflask import Flask
from aioflask import request
from Config import WECHAT_SEVER_CONFIG
import concurrent.futures
from threading import Thread
import threading
import itertools

from wechaty import Wechaty, Message, WechatyPlugin, Room, WechatyOptions
from wechaty_puppet import *
import os
import asyncio
import json
import traceback

app = Flask(__name__)

WECHATY_PUPPET_SERVICE_TOKEN = ''
WECHATY_PUPPET = 'wechaty-puppet-service'

os.environ['WECHATY_PUPPET_SERVICE_TOKEN'] = WECHATY_PUPPET_SERVICE_TOKEN
os.environ['WECHATY_PUPPET'] = WECHATY_PUPPET
os.environ['WECHATY_PUPPET_SERVICE_ENDPOINT'] = "0.0.0.0:9001"

class WechatBot():

    def __init__(self):
        print("need to Init wechat bot!")
        self.bot: Wechaty = None
        asyncio.get_event_loop().run_until_complete(self.init_wechat_bot())

    async def init_wechat_bot(self):
        puppet_options = PuppetOptions()
        puppet_options.token = WECHATY_PUPPET_SERVICE_TOKEN

        options = WechatyOptions()
        # options.name = self.my_wechat_id
        options.puppet = WECHATY_PUPPET
        options.puppet_options = puppet_options

        self.bot = Wechaty(options)
        await self.bot.init_puppet()
        await self.bot.init_puppet_event_bridge(self.bot.puppet)
        self.bot.puppet._init_puppet()
        # await self.bot.puppet.logout()
        # print(self.bot.puppet.login_user_id)
        async for response in self.bot.puppet.puppet_stub.event():
            if response is not None:
                payload_data: dict = json.loads(response.payload)
                if response.type == int(EventType.EVENT_TYPE_SCAN):
                    print('receive scan info,', payload_data)
                    # create qr_code
                    payload = EventScanPayload(
                        status=ScanStatus(payload_data['status']),
                        qrcode=payload_data.get('qrcode', None),
                        data=payload_data.get('data', None)
                    )
                    print('scan payload_data', payload_data)
                    self.bot.puppet._event_stream.emit('scan', payload)

                elif response.type == int(EventType.EVENT_TYPE_LOGIN):
                    print('receive login info ', payload_data)
                    # print('login payload_data', payload_data)
                    event_login_payload = EventLoginPayload(
                        contact_id=payload_data['contactId'])
                    self.bot.puppet.login_user_id = payload_data.get('contactId', None)
                    self.bot.puppet._event_stream.emit('login', event_login_payload)
                    break

                elif response.type == int(EventType.EVENT_TYPE_READY):
                    print('receive ready info ', payload_data)
                    payload = EventReadyPayload(**payload_data)
                    self.bot.puppet._event_stream.emit('ready', payload)
                    break

                elif response.type == int(EventType.EVENT_TYPE_ROOM_TOPIC):
                    print('receive room-topic info <%s>', payload_data)
                    payload = EventRoomTopicPayload(
                        changer_id=payload_data.get('changerId'),
                        new_topic=payload_data.get('newTopic'),
                        old_topic=payload_data.get('oldTopic'),
                        room_id=payload_data.get('roomId'),
                        timestamp=payload_data.get('timestamp')
                    )
                    self.bot.puppet._event_stream.emit('room-topic', payload)
                elif response.type == int(EventType.EVENT_TYPE_DONG):
                    print('receive dong info <%s>', payload_data)
                    payload = EventDongPayload(**payload_data)
                    self.bot.puppet._event_stream.emit('dong', payload)

                elif response.type == int(EventType.EVENT_TYPE_MESSAGE):
                    # payload = get_message_payload_from_response(response)
                    print('receive message info <%s>', payload_data)
                    event_message_payload = EventMessagePayload(
                        message_id=payload_data['messageId'])
                    self.bot.puppet._event_stream.emit('message', event_message_payload)
                elif response.type == int(EventType.EVENT_TYPE_HEARTBEAT):
                    print('receive heartbeat info <%s>', payload_data)
                    # Huan(202005) FIXME:
                    #   https://github.com/wechaty/python-wechaty-puppet/issues/6
                    #   Workaround for unexpected server json payload key: timeout
                    # if 'timeout' in payload_data:
                    #     del payload_data['timeout']
                    payload_data = {'data': payload_data['data']}
                    payload = EventHeartbeatPayload(**payload_data)
                    self.bot.puppet._event_stream.emit('heartbeat', payload)

                elif response.type == int(EventType.EVENT_TYPE_ERROR):
                    print('receive error info <%s>', payload_data)
                    payload = EventErrorPayload(**payload_data)
                    self.bot.puppet._event_stream.emit('error', payload)
                elif response.type == int(EventType.EVENT_TYPE_FRIENDSHIP):
                    print('receive friendship info <%s>', payload_data)
                    payload = EventFriendshipPayload(
                        friendship_id=payload_data.get('friendshipId')
                    )
                    self.self.bot.puppet._event_stream.emit('friendship', payload)

                elif response.type == int(EventType.EVENT_TYPE_ROOM_JOIN):
                    print('receive room-join info <%s>', payload_data)
                    payload = EventRoomJoinPayload(
                        invited_ids=payload_data.get('inviteeIdList', []),
                        inviter_id=payload_data.get('inviterId'),
                        room_id=payload_data.get('roomId'),
                        timestamp=payload_data.get('timestamp')
                    )
                    self.self.bot.puppet._event_stream.emit('room-join', payload)
                elif response.type == int(EventType.EVENT_TYPE_ROOM_INVITE):
                    print('receive room-invite info <%s>', payload_data)
                    payload = EventRoomInvitePayload(
                        room_invitation_id=payload_data.get(
                            'roomInvitationId', None)
                    )
                    self.bot.puppet._event_stream.emit('room-invite', payload)

                elif response.type == int(EventType.EVENT_TYPE_ROOM_LEAVE):
                    print('receive room-leave info <%s>', payload_data)
                    payload = EventRoomLeavePayload(
                        removed_ids=payload_data.get('removeeIdList', []),
                        remover_id=payload_data.get('removerId'),
                        room_id=payload_data.get('roomId'),
                        timestamp=payload_data.get('timestamp')
                    )
                    self.bot.puppet._event_stream.emit('room-leave', payload)

                elif response.type == int(EventType.EVENT_TYPE_LOGOUT):
                    print('receive logout info <%s>', payload_data)
                    payload = EventLogoutPayload(
                        contact_id=payload_data['contactId'],
                        data=payload_data.get('data', None)
                    )
                    self.login_user_id = None
                    self.bot.puppet._event_stream.emit('logout', payload)

                elif response.type == int(EventType.EVENT_TYPE_UNSPECIFIED):
                    pass
        for room_name, values in ROOMS.items():
            room = self.bot.Room.load(values[0])
            await room.ready()
            ROOMS[room_name][1] = room
            print(room_name, "ready!", room)
        print(ROOMS)


class EventLoopThread(threading.Thread):
    loop = None
    _count = itertools.count(0)

    def __init__(self):
        self.started = threading.Event()
        name = f"{type(self).__name__}-{next(self._count)}"
        super().__init__(name=name, daemon=True)

    def __repr__(self):
        loop, r, c, d = self.loop, False, True, False
        if loop is not None:
            r, c, d = loop.is_running(), loop.is_closed(), loop.get_debug()
        return (
            f"<{type(self).__name__} {self.name} id={self.ident} "
            f"running={r} closed={c} debug={d}>"
        )

    def run(self):
        self.loop = loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.call_later(0, self.started.set)

        try:
            loop.run_forever()
        finally:
            try:
                shutdown_asyncgens = loop.shutdown_asyncgens()
            except AttributeError:
                pass
            else:
                loop.run_until_complete(shutdown_asyncgens)
            try:
                shutdown_executor = loop.shutdown_default_executor()
            except AttributeError:
                pass
            else:
                loop.run_until_complete(shutdown_executor)
            asyncio.set_event_loop(None)
            loop.close()

    def stop(self):
        loop, self.loop = self.loop, None
        if loop is None:
            return
        loop.call_soon_threadsafe(loop.stop)
        self.join()


_lock = threading.Lock()
_loop_thread = None


def get_event_loop():
    global _loop_thread

    if _loop_thread is None:
        with _lock:
            if _loop_thread is None:
                _loop_thread = EventLoopThread()
                _loop_thread.start()
                # give the thread up to a second to produce a loop
                _loop_thread.started.wait(1)

    return _loop_thread.loop


def stop_event_loop():
    global _loop_thread
    with _lock:
        if _loop_thread is not None:
            _loop_thread.stop()
            _loop_thread = None


def run_coroutine(coro):
    """Run the coroutine in the event loop running in a separate thread

    Returns a Future, call Future.result() to get the output

    """
    return asyncio.run_coroutine_threadsafe(coro, get_event_loop())





async def send_wechat_message(room_str, message):
    global ROOMS
    room = ROOMS[room_str][1]
    if room:
        await room.say(message)
        return True
    return False


@app.route('/sendmessage', methods=['POST'])
def send_message():
    try:
        res = request.json
        if res:
            room_str = res['room']
            message = res['message']
            asyncio.create_task(send_wechat_message(room_str, message))
            return "success"
    except Exception:
        print("send msg fail, error:", traceback.format_exc())
    return 'fail'

# 你需要发送通知的群聊，需要使用官方example提前获取
ROOMS = {
    "快乐一家人": ["1111111111111@chatroom", None],
    "父老乡亲": ["222222222@chatroom", None]
}

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    asyncio.set_event_loop(loop)
    bot = WechatBot()
    app.run(debug=False, host='0.0.0.0', port="9999")

```

至此我们的基本框架已经搭好，大家可以通过本例的基础代码实现更复杂的工程。

## 感谢

在最后我们要感谢所有为我们提供工具和服务的团队和个人。特别感谢开源项目[Wechaty](https://github.com/wechaty/wechaty)团队和免费提供服务的padLocal团队。
