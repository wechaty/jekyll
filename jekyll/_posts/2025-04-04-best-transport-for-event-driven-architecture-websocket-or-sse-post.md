---
title: "🚀 What's the Best Transport for an Event-Driven Architecture: WebSocket or SSE + POST?"
author: huan
categories: event
tags:
  - event-driven
  - cqrs
  - cloud-native
image: /assets/2025/04-best-transport-for-event-driven-architecture-websocket-or-sse-post/sse-post-websocket.webp
---

As the creator of the [Wechaty](https://github.com/wechaty/wechaty) and [Chatie](https://github.com/chatie) projects, I’ve spent years building conversational and messaging tools for developers. Now, I'm investing in a new phase of **cloud-native, event-driven infrastructure** for Chatie, and I want to get the architecture right from day one.

For this next-generation system, I'm adopting:

- **CQRS** (Command Query Responsibility Segregation)
- **Event Sourcing**
- **Event-Driven Programming**

These patterns enable scalable, modular systems with clear separation of concerns. But to tie it all together, I need a reliable, flexible, and efficient **messaging transport** — something that works both **internally between services**, and **externally with clients** (browsers, CLI tools, etc).

So the big question became:  
**What transport should I use for streaming and event communication?**

---

## ❓ The Problem: Choosing a Universal Messaging Protocol

My goal is to design a **universal communication layer** that:

1. Works across **cloud environments** and **local development**.
2. Supports **event-driven** messaging — sending and receiving updates in real-time.
3. Plays nicely with modern **web clients**, **CLI**, and **microservices**.

4. Allows **stateless request handling** (ideal for serverless and horizontally scalable systems).

Naturally, **WebSocket** is a common choice for bi-directional, real-time communication. But is it the best choice for this use case? I decided to dive deeper and explore another approach: **HTTP POST + Server-Sent Events (SSE)** — especially after learning how the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) team made a similar decision.

---

## ✅ The Solution: HTTP POST + SSE vs. WebSocket

After extensive research and experimentation, I’ve decided to go with **HTTP POST + Server-Sent Events (SSE)** as the primary messaging transport for Chatie.

Let’s break it down.

---

## ⚖️ Comparing WebSocket vs SSE + POST

| Feature | WebSocket | HTTP POST + SSE |
|--------|-----------|------------------|
| **Bi-directional** | ✅ Full-duplex | 🔄 Half-duplex (Client sends via POST, Server streams via SSE) |
| **Works with HTTP semantics (e.g., POST, headers)** | ❌ No (only GET upgrade) | ✅ Yes |
| **Authentication (e.g., `Authorization` header)** | ❌ Limited in browsers | ✅ Fully supported |
| **Browser support** | ✅ Native WebSocket API | ✅ Native EventSource API |
| **Proxy/firewall friendliness** | ⚠️ Sometimes blocked | ✅ Treated as normal HTTP |
| **Ease of debugging** | ⚠️ Requires special tools | ✅ Can use `curl`, browser, etc. |
| **Stateless-friendly (serverless, scale-out)** | ❌ Long-lived stateful connection | ✅ Stateless POST + stream |
| **Resumability (auto-reconnect)** | ❌ Manual reconnection logic needed | ✅ Built-in with EventSource |
| **Complexity** | ⚠️ Needs upgrade handshake, framing | ✅ Simple HTTP + text stream |

---

## 🔧 Architecture Diagrams

### WebSocket Architecture

```text
Client <======> WebSocket Server
      [ Bi-directional | Long-lived connection ]
```

### SSE + POST Architecture

```text
Client --(POST)--> Server
Client <--(SSE)-- Server

      [ Stateless requests + Server-push stream ]
```

---

## 💻 Code Examples

### SSE + POST Example (Node.js / Express)

```js
// Server (Express)
app.post('/run-tool', (req, res) => {
  // Process the incoming command
  const toolInput = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Simulate streaming output
  const interval = setInterval(() => {
    res.write(`data: Output at ${new Date().toISOString()}\n\n`);
  }, 1000);

  // Stop after 5 seconds
  setTimeout(() => {
    clearInterval(interval);
    res.write('event: done\n');
    res.write('data: Stream complete\n\n');
    res.end();
  }, 5000);
});
```

```js
// Client (Browser)
const evtSource = new EventSource('/run-tool');

evtSource.onmessage = (event) => {
  console.log('Message:', event.data);
};

evtSource.addEventListener('done', () => {
  console.log('Stream completed');
  evtSource.close();
});
```

---

## 📚 Resources & References

- MCP GitHub PR on SSE vs WebSocket: <https://github.com/modelcontextprotocol/specification/pull/206>
- Durable Objects & HTTP Streaming: <https://blog.cloudflare.com/introducing-workers-durable-objects/#why-not-websockets>

---

## 🧠 Conclusion

If you're building a **real-time, event-driven system**, it's easy to default to WebSockets. But before you do, consider whether you really need full-duplex communication.

For most **CQRS**, **event-sourcing**, and **cloud-native** use cases — where clients **send a command** and **receive streamed events** — a combination of **HTTP POST + SSE** gives you the best of both worlds:

- Clean request/response semantics
- Streaming real-time updates
- Low complexity and broad compatibility

This is why **Chatie will be built on SSE + POST**, and I believe it’s a powerful, underused pattern that deserves more attention in the developer community.

---

💬 I’d love to hear your thoughts! Have you used SSE or WebSockets in your projects? What challenges did you face? Let's chat in the comments or [on GitHub](https://github.com/chatie).
