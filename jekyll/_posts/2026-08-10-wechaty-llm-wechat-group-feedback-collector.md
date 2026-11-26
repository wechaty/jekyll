---
title: "Building a WeChat Group Feedback Collector with Wechaty + LLM"
author: Mr-Salticidae
date: 2026-08-10
tags:
  - wechaty
  - padlocal
  - llm
  - chatbot
  - feedback
  - wechat
  - automation
categories:
  - tutorial
image: /assets/2026/08-wechaty-llm-wechat-group-feedback-collector/architecture.svg
---

## Background

When running a web application with an active user community, feedback often flows through informal channels — most commonly, WeChat group chats. Users casually mention bugs ("this page just threw a 500"), suggest features ("it would be nice if we could..."), or complain about UX issues ("I can't find the settings button"). These conversations are gold mines of product insight, but manually collecting and organizing them is tedious and error-prone.

I faced this exact problem with **pb-arena**, a prompt battle platform where users discuss bugs and feature requests in a WeChat group. Relying on manual collection meant I was almost certainly missing important feedback buried in long chat threads.

This article describes how I built an automated feedback collection system that listens to WeChat group messages, identifies bug reports and feature suggestions using a two-layer filtering pipeline (rule-based + LLM), and stores structured feedback directly into the application's database.

## Architecture Overview

```
WeChat Group Messages
        │
        ▼
┌───────────────────┐
│  Wechaty Bot      │  ← PadLocal puppet (iPad protocol)
│  (Node.js)        │
└────────┬──────────┘
         │ message text
         ▼
┌───────────────────┐
│  Rule Layer       │  ← 53 Chinese keywords, scored by category
│  (filter.js)      │
└────────┬──────────┘
         │ candidate messages (score ≥ 3)
         ▼
┌───────────────────┐
│  AI Layer         │  ← LLM classification + summary extraction
│  (analyzer.js)    │
└────────┬──────────┘
         │ structured feedback JSON
         ▼
┌───────────────────┐
│  Storage Layer    │  ← HTTP POST to existing app API
│  (storage.js)     │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  App Database     │  ← SQLite feedback table
│  + Admin Panel    │
└───────────────────┘
```

The bot operates in **passive listening mode** — it does not reply to messages or interact with users. This design choice significantly reduces the risk of WeChat account restrictions, since high-frequency automated replies are a known trigger for WeChat's risk control systems.

## Key Design Decisions

### 1. Passive Listening, Not Active Chatting

The bot's sole purpose is to **collect information**, not to converse. This means:

- Lower ban risk: high-frequency automated replies trigger WeChat's anti-bot detection
- Zero social risk: no concern about inappropriate automated responses
- Simpler implementation: no need for conversational context management

### 2. Two-Layer Filtering Pipeline

Processing every group message through an LLM would be wasteful and expensive. Instead, we use a two-stage approach:

**Layer 1 — Rule-based Scoring (filter.js):**

53 Chinese keywords categorized into three signal types, each with a weight:

| Category | Example Keywords | Weight Range | Purpose |
|----------|-----------------|-------------|---------|
| Bug signals | 报错, 500, 崩了, 打不开, 白屏 | 2-4 | Identify error reports |
| Feature signals | 建议, 能不能, 加一个, 希望 | 2-4 | Identify feature requests |
| UX signals | 体验不好, 难用, 找不到, 太丑 | 1-3 | Identify usability complaints |

A message must score **≥ 3 points** to pass to the AI layer. This filters out ~95% of casual conversation while capturing feedback even when users don't use explicit keywords like "bug" or "建议."

```javascript
// Core scoring logic
function isPotentialFeedback(text) {
  let score = 0;
  for (const { re, weight } of BUG_SIGNALS) {
    if (re.test(text)) score += weight;
  }
  for (const { re, weight } of FEATURE_SIGNALS) {
    if (re.test(text)) score += weight;
  }
  for (const { re, weight } of UX_SIGNALS) {
    if (re.test(text)) score += weight;
  }
  return score >= 3; // threshold
}
```

**Layer 2 — LLM Classification (analyzer.js):**

Candidate messages are sent to an LLM with a structured prompt that extracts:

- **Type**: `bug` | `feature` | `experience`
- **Severity**: `high` | `medium` | `low`
- **Module**: which page or feature is affected
- **Summary**: one-sentence description

```javascript
async function analyzeFeedback(text, sender, roomName) {
  const prompt = `Analyze this WeChat group message.
If it's valid feedback, output JSON:
{
  "is_feedback": true,
  "type": "bug|feature|experience",
  "severity": "high|medium|low",
  "module": "affected page/feature",
  "title": "one-line summary",
  "summary": "detailed description"
}
If not feedback (casual chat), output: {"is_feedback": false}

Sender: ${sender}
Group: ${roomName}
Message: ${text}`;

  const result = await callLLM(prompt);
  return result.is_feedback ? result : null;
}
```

### 3. Integration with Existing Infrastructure

Rather than building a separate database, the bot calls the existing `POST /api/feedback` endpoint of the web application. This means feedback collected from WeChat appears in the same admin panel alongside feedback submitted through the website's built-in form — zero additional UI work required.

```javascript
async function storeFeedback(feedback) {
  const resp = await fetch(`${API_BASE}/api/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: feedback.type,
      severity: feedback.severity,
      module: feedback.module,
      title: feedback.title,
      summary: feedback.summary,
      source: 'wechat-bot',
      metadata: {
        sender: feedback.sender,
        room: feedback.roomName,
        rawMessage: feedback.text,
      },
    }),
  });
  if (!resp.ok) {
    console.error('Failed to store feedback:', await resp.text());
  }
}
```

## Getting Started with Wechaty + PadLocal

### Prerequisites

- Node.js ≥ 18
- A WeChat account (secondary/alt account recommended)
- PadLocal Token (7-day free trial available at [pad-local.com](http://pad-local.com))

### Installation

```bash
mkdir wechat-bot && cd wechat-bot
npm init -y
npm install wechaty wechaty-puppet-padlocal dotenv
```

### Configuration

Create a `.env` file:

```bash
PADLOCAL_TOKEN=puppet_padlocal_xxxxxxxx
LLM_API_KEY=sk-xxxxxxxx      # optional, falls back to rule-only mode
LLM_API_BASE=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
FEEDBACK_API_BASE=http://localhost:3000
```

### Bot Entry Point (bot.js)

```javascript
import { WechatyBuilder } from 'wechaty';
import { PuppetPadlocal } from 'wechaty-puppet-padlocal';
import dotenv from 'dotenv';
import { isPotentialFeedback } from './filter.js';
import { analyzeFeedback } from './analyzer.js';
import { storeFeedback } from './storage.js';

dotenv.config();

const bot = WechatyBuilder.build({
  name: 'feedback-collector',
  puppet: new PuppetPadlocal({
    token: process.env.PADLOCAL_TOKEN,
  }),
});

bot.on('scan', (qrcode, status) => {
  console.log(`Scan QR Code: ${status}`);
  console.log(`https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`);
});

bot.on('login', (user) => {
  console.log(`Bot logged in as: ${user.name()}`);
});

bot.on('message', async (message) => {
  // Ignore own messages
  if (message.self()) return;

  // Only process group messages
  const room = await message.room();
  if (!room) return;

  const text = message.text();
  const sender = message.talker();
  const roomName = await room.topic();

  // Layer 1: Keyword scoring
  if (!isPotentialFeedback(text)) return;

  console.log(`[Candidate] ${sender.name()} in ${roomName}: ${text.substring(0, 80)}`);

  // Layer 2: LLM classification
  const feedback = await analyzeFeedback(text, sender.name(), roomName);
  if (!feedback) return;

  // Store to app database
  await storeFeedback(feedback);
  console.log(`[Stored] ${feedback.type}/${feedback.severity}: ${feedback.title}`);
});

bot.start()
  .then(() => console.log('Feedback collector bot started'))
  .catch(console.error);
```

## Testing Without a Real WeChat Account

A simulation script (`simulate.js`) allows testing the full pipeline without connecting to WeChat:

```javascript
import { isPotentialFeedback } from './filter.js';
import { analyzeFeedback } from './analyzer.js';

const testMessages = [
  { text: '今天的 prompt battle 结果出来了', expected: false },
  { text: '我打开首页直接500报错了，什么情况', expected: true, type: 'bug' },
  { text: '能不能加一个收藏 prompt 的功能？', expected: true, type: 'feature' },
  { text: '这个手机版太难用了，按钮都找不到', expected: true, type: 'experience' },
  { text: '大家早上好', expected: false },
  { text: '排行榜页面加载特别慢，等了好几分钟', expected: true, type: 'experience' },
];

for (const msg of testMessages) {
  const passed = isPotentialFeedback(msg.text);
  const status = passed === msg.expected ? '✓' : '✗';
  console.log(`${status} "${msg.text.substring(0, 50)}..." → ${passed}`);
  if (passed) {
    const result = await analyzeFeedback(msg.text, 'TestUser', 'TestGroup');
    console.log(`  → ${JSON.stringify(result)}`);
  }
}
```

## Deployment

The bot can run alongside the main application. For production use:

1. **Process manager**: Use PM2 to keep the bot running
   ```bash
   npm install -g pm2
   pm2 start bot.js --name feedback-bot
   pm2 save
   pm2 startup
   ```

2. **Environment isolation**: Run the bot on the same server as your web app, or on a separate lightweight instance

3. **Monitoring**: PM2 provides built-in log management and auto-restart on crash

## Results and Observations

After deploying this system:

- **Coverage**: The bot captures feedback that users would rarely bother to submit through the website's form
- **Noise reduction**: The rule layer filters ~95% of casual chat; the AI layer further eliminates false positives
- **Cost efficiency**: Only ~5% of group messages reach the LLM, keeping API costs near zero
- **Zero disruption**: Users are unaware the bot exists — it silently observes without interacting

## Caveats

1. **WeChat account risk**: Using any non-official protocol carries account restriction risk. Always use a secondary account and keep reply frequency low (or zero, as in this passive-listening design).

2. **PadLocal availability**: Since PadLocal is a community-maintained service, occasional downtime is possible. The bot gracefully degrades — it simply stops collecting until the service recovers.

3. **LLM dependency**: The AI layer improves accuracy but is not required. The rule-only mode still catches most feedback, albeit with more false positives.

## Conclusion

A WeChat group is often where the most honest, immediate feedback about your product lives. By combining Wechaty's robust group message capabilities with a simple two-layer filtering pipeline, you can turn casual chat into structured, actionable feedback — without writing a single line of WeChat API integration code.

The complete source code for this project is available at [github.com/Mr-Salticidae/pb-arena/wechat-bot](https://github.com/Mr-Salticidae/pb-arena).

---

> **Author**: [Mr-Salticidae](https://github.com/Mr-Salticidae), independent developer working on AI creative tools and prompt engineering platforms.
