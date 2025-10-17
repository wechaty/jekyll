---
title: "Building a Message Notification Service with Wechaty and Flask"
author: houruirui
categories: project
tags:
  - productivity
  - ecosystem
image: /assets/2023/02-wechaty-flask-service-en/wechaty.webp
excerpt: >
  Learn how to build a WeChat message notification service using Wechaty and Flask, enabling proactive message sending and multi-service notifications through a single WeChat account with the PadLocal protocol.
---
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://wechaty.js.org)
[![Wechaty Contributor Program](https://img.shields.io/badge/Wechaty-Contributor%20Program-green.svg)](https://wechaty.js.org/docs/contributor-program)
[![Juzi.BOT Developer Program](https://img.shields.io/badge/Wechaty%20Contributor%20Program-Juzi.BOT-orange.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty/)

> Author: [Houruirui](https://github.com/Houruirui), coding enthusiast.

[Wechaty-Flask-Service](https://github.com/Houruirui/wechaty-flask)

<!-- more -->

Currently, there are various APIs on the market that provide message push notifications, such as DingTalk, Spark, IFTTT, Telegram, etc. However, the overwhelming variety of message notifications in everyone's phones can be too much to handle. WeChat, as the most widely used chat tool, is rarely ignored when it comes to reading messages. Therefore, the most convenient approach is to push messages through a WeChat bot.

Through research, I found that current message bots in the market include itchat, wxpy, wechaty, and others. However, with Tencent applying pressure, itchat and wxpy based on web WeChat can no longer be used. Wechaty supports multiple protocols and is more secure than the web protocol, so I decided to use wechaty based on the iPad protocol (PadLocal) to build the bot. However, in practical applications, wechaty is implemented through message callback functions, which means there's no way to make the bot proactively send messages. Another issue is that you may have many applications that need WeChat notifications, but one token can only be used for one WeChat account. How can multiple services send notifications through this single WeChat account? For these two problems, my solution was to first implement bot initialization myself, and after completing initialization, directly return the bot without letting it enter the message listening loop, thus actively controlling the bot to send and receive messages. In a multi-service scenario, I used Flask to build a backend service to maintain the initialized bot, allowing different services to send requests directly to the backend to implement message notifications.

Let's get to the point!

## Environment and Dependencies

python
aioflask
asyncio

## Deploying Wechaty Puppet Hostie

Since the native wechaty is written in JavaScript and TypeScript, you need to set up a Wechaty Puppet Hostie service through Docker as a relay, which can then be called through Python.

- **Pre-deployment Requirements:**

A server that meets the following three requirements:

>Public IP
>Public Port
>Docker

- **Deploy Wechaty Puppet Hostie**

The specific code is as follows (my server is Ubuntu 18.04):

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

The WECHATY_PUPPET_PADLOCAL_TOKEN in the code needs to be applied for from the official team. You can get a 7-day trial token, and through the community incentive program, you can also get a longer-lasting token for free. [See details here](https://wechaty.js.org/docs/contributor-program/).

- **Verify Wechaty Puppet Hostie**

Access <https://api.chatie.io/v0/hosties/WECHATY_TOKEN>, where WECHATY_TOKEN is the token you just set yourself. When the returned result is the server's public IP, deployment is successful; if it returns 0.0.0.0, deployment has failed~

## Project Approach

Regarding the bot, I read the code in the official examples and found that all bots inherit from the Wechaty base class to implement various functions through custom callback functions. Using event-driven callback functions is very passive, and I wanted to get a directly callable Wechaty object without entering the event loop monitoring through the start() function, so it could actively send messages. After a day of reading code and self-exploration, I finally managed to create a directly callable bot object. Please refer to the detailed code later. The most important thing is still needing to enter event listening, then after listening to the successful login event, interrupt the listening and return the already logged-in bot object, thus enabling direct calls.

First, we initialize the bot object. I wanted to send message notifications to group chats, and during use, I discovered that WeChat groups weren't loaded after initializing the bot, so we need to first use the official examples to get the WeChat group IDs, then manually load the WeChat groups. Additionally, I found that if messages are sent synchronously, Flask needs 5-10 seconds to process the request, so here I used threads to handle different requests, implementing message concurrency.

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

# Group chats you need to send notifications to - you need to get IDs in advance using official examples
ROOMS = {
    "Happy Family": ["1111111111111@chatroom", None],
    "Fellow Villagers": ["222222222@chatroom", None]
}

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    asyncio.set_event_loop(loop)
    bot = WechatBot()
    app.run(debug=False, host='0.0.0.0', port="9999")

```

At this point, our basic framework is set up. You can implement more complex projects based on this example code.

## Acknowledgments

Finally, we want to thank all the teams and individuals who provided us with tools and services. Special thanks to the open source project [Wechaty](https://github.com/wechaty/wechaty) team and the PadLocal team for providing free services.

---

> 本文也有[中文版本](/2023/02/18/wechaty-flask-service/)。
