---
title: "New Wechaty Puppet Service: SimplePad"
author: simplepad
image: /assets/2021/06-puppet-simplepad-hello-en/logo.webp
categories: announcement
tags:
  - puppet
  - featured
  - simplepad
  - puppet-provider
  - puppet-service
excerpt: "Introducing SimplePad - a flexible HTTP-based Wechaty Puppet service that offers language-agnostic API access with pay-per-use pricing model."
---

> This is a translated version of the original Chinese post. You can find the original post [here](/2021/06/17/puppet-simplepad-hello/).

Hello everyone, I am the developer of [SimplePad](https://github.com/chatrbot/wechaty-puppet-simplepad), and also the developer of the previous [Xiaomaruko](https://github.com/chatrbot/chatbot) project, known as "Galaxy Speeder" in the group.

I've promoted (~~bothered~~) everyone in our Wechaty group several times before, so some of you may have already seen or used it.

We are all familiar with `Wechaty-Puppet`. Thanks to Wechaty's ingenious and reasonable interface design and highly abstract model, we can use Puppet with ease while also being able to switch freely between various Puppets very conveniently.

While we enjoy the convenience that the SDK model brings us, we may occasionally be troubled by some issues:

> 1. Dependency redundancy. For example, if your project only wants to use Bot to send some simple text content, you have to introduce the entire SDK ecosystem to achieve this single purpose.
> 2. Usage limitations. Thanks to the development of the community, in addition to the official Node version of Wechaty, there are now `python-wechaty` and `go-wechaty` and other language projects. But if you use other languages, you can only choose to develop a corresponding Wechaty yourself or learn a language that already has a Wechaty implementation.
> 3. Difficult debugging. If there is a problem with the SDK we use, we can only study the source code implementation to make local temporary fixes, or submit a PR, or even just contact (wait for) the developer to fix it. This will affect our development progress and add extra troubleshooting time.
> 4. Feature redundancy. For example, if your bot only wants to send some simple text messages, you must purchase a Token with full functionality, which in my opinion is not the best user experience.

Fortunately, the Wechaty community has also considered these issues and provided a solution under development [WechatyOpenAPI](https://github.com/wechaty/openapi), providing a gateway to interface with the current `Wechaty-Grpc-Service`, while providing a complete set of Restful HTTP interfaces to solve the problems I mentioned above.

After saying all this, you may be thinking: What does this have to do with SimplePad?

I want to say that it has a relationship, and quite a significant one.

Before developing SimplePad, I also investigated the current Wechaty solutions on the market and realized the pain points mentioned above. To solve these problems, I first developed a protocol system in the form of HTTP protocol calls, and SimplePad was actually developed afterward. So naturally, the entire API part of SimplePad completely uses the interfaces of this system. For us internet developers, HTTP is the most used and most familiar protocol solution. The protocol is clear and easy to understand, and debugging is convenient. This is also the origin and core meaning of the SimplePad name. I hope to provide everyone with a Puppet that is convenient to use and simple to debug. After developers have a Token, they can choose to use Puppet or directly call HTTP protocol to implement corresponding operations. Here I drew a simple flowchart for everyone.

![process](/assets/2021/06-puppet-simplepad-hello-en/process.webp)

So for the problems mentioned above, SimplePad's solution is more flexible:

- No third-party library dependencies
- No programming language restrictions
- Debugging is simpler and more intuitive. You can use Postman commonly used by developers, or you can use the API debugging tool I provide in the backend
- Use on demand (to ensure smooth basic usage flow, there will be some interfaces that must be selected). Developers can freely choose the interfaces they need and pay as they go.
- Provides a fully functional backend where you can conveniently debug interfaces and manage your own Token.

The above is the original intention and origin of SimplePad's development, as well as my ideas and some small advantages in solving current community pain points. Everyone is welcome to explore more in-depth use and experience.

I also hope everyone can actively [communicate and provide feedback](https://github.com/chatrbot/wechaty-puppet-simplepad/issues) with me. I will do my best to let developers get the best user experience.

---

> Chinese version of this post: [puppet simplepad hello]({{ '/2021/06/17/puppet-simplepad-hello/' | relative_url }})
