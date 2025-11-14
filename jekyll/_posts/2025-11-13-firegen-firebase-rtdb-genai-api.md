---
title: "Announcing FireGen: Turn Firebase RTDB into Your Universal Generative AI API"
excerpt: "FireGen is a Firebase Extension that transforms your Realtime Database into a universal Generative AI job queue, simplifying AI integration for solo founders and developers."
categories: announcement
author: huan
tags:
  - google-cloud
  - firebase
  - vertex-ai
  - developer-experience
image: /assets/2025/11-firegen-firebase-rtdb-genai-api/firegen.webp
---

> FireGen: Generative AI as simple as Firebase Realtime Database.
> —— A Hackathon MVP announcement for Solo Founders and AI-Native Developers

Hey everyone, I’m Huan. I’m thrilled to announce the open-source launch of FireGen, a Firebase Extension born out of a hackathon sprint and a deep frustration with the current state of AI integration.

If you're building with Firebase and Vertex AI, you know the pain. Integrating powerful models like Veo 3.1 (video generation) shouldn't require a degree in Google Cloud infrastructure.

**The Elevator Pitch:** Solo founders and AI developers are wasting days fighting Vertex AI infrastructure—debugging SDKs, polling long-running operations (LROs), and juggling GCS files. FireGen abstracts it all away. It turns your Realtime Database (RTDB) into a universal AI job queue. You write a job node (or just a string\!), subscribe to updates, and get results. Polling, retries, auth, and storage are handled.

We turned 3 days of integration work into 15 minutes of setup.

-----

## The Problem: "SDK Hell" and the Innovation Bottleneck

Let's be honest: the developer experience for integrating multiple AI models is broken.

We all want to leverage the power of models like Veo, Gemini, and TTS, but integrating them into a Firebase backend is messy. The friction is killing innovation.

What should take 15 minutes ends up taking 3 days. Why?

1.  **Inconsistent SDKs:** Vertex AI has multiple SDKs with different APIs, outdated docs, and breaking changes.
2.  **Async Complexity (LROs):** Video generation takes time. Handling LROs means writing custom polling, exponential backoff, TTL management, and dead-letter queues.
3.  **Storage Gymnastics:** Juggling GCS URIs, signed URLs, and moving files between GCS and Firebase Storage is cognitive overhead you don't need.
4.  **Auth Confusion:** Navigating OIDC tokens and service accounts across Google services is a nightmare.
5.  **Model Chaos:** Guessing which model ID fits your prompt and which parameters are valid.

**The result?** Founders spend their time fighting infrastructure instead of shipping features and validating ideas with real users.

## The Solution: FireGen

FireGen is a Firebase Extension that abstracts all this complexity away. We turn your Realtime Database (RTDB) into a universal, queue-based Generative AI API.

The workflow is dead simple:

1.  Write a job request to `firegen-jobs/{jobId}`.
2.  Subscribe to that node using `onValue`.
3.  Get the results when `status: "succeeded"`.

That’s it. FireGen handles everything else behind the scenes using Cloud Functions v2, RTDB triggers, and Firebase Task Queues.

## The Magic: The AI-Native Developer Experience

This is where FireGen truly shines, especially for AI-native developers and those using AI coding agents (like Gemini, Claude, or open-source tools). We offer two operational modes:

### Mode 1: 🤖 AI-Assisted Mode (The "Just Write a String" API)

This is the future of APIs, designed for AI-to-AI communication. Don't worry about model IDs or complex JSON structures. Just write a string to RTDB:

```typescript
import {getDatabase, ref, push} from "firebase/database";
const db = getDatabase();

// Just write a string - AI picks the model automatically
await push(ref(db, 'firegen-jobs'), 
  "Create a 4-second vertical video of a waterfall with ambient sound"
);
```

**How it works:**
Our **AI Request Analyzer** (powered by Gemini 2.5 Flash) analyzes your prompt semantically. It automatically selects the best model (e.g., Veo 3.1 for video, Gemini Image, or TTS) and intelligently extracts parameters (duration, aspect ratio, audio).

Crucially, it saves the entire reasoning chain back to the database (`assisted.reasons`) for complete transparency.

### Mode 2: 🎯 Explicit Mode (Production Control)

When you need precise control for production, you can send a structured object that mirrors the Vertex AI REST API:

```typescript
await push(ref(db, 'firegen-jobs'), {
  model: "veo-3.1-fast-generate-preview",
  request: {
    instances: [{prompt: "A serene sunset over mountains"}],
    parameters: {durationSeconds: 8, aspectRatio: "16:9"}
  }
});
```

## Our Principles: Simplicity by Design

We made opinionated design choices guided by the **Principle of Least Power** and **Occam's Razor**. We want FireGen to be the simplest possible solution.

### 1\. Why RTDB? (Yes, Really.)

We chose Realtime Database (RTDB) over Firestore intentionally. RTDB offers the lowest latency and the simplest SDK complexity for real-time updates.

For an API interface where clients need immediate updates on job status, RTDB's `onValue()` listener is superior, faster, and less complex than Firestore's snapshot listeners. It perfectly embodies the Principle of Least Power.

### 2\. Why Zero Config?

You’ll notice FireGen has zero configuration parameters. This is by design. We don't want users to worry about setting the optimal polling interval, the job TTL, or the database path. We've hard-coded optimized defaults (like the `/firegen-jobs` path) so it *just works* out of the box.

## Why FireGen is Good (The Takeaways)

We built FireGen specifically for developers who want to move fast and focus on the product.

  * **Ship in Minutes, Not Days:** We compressed the 3-day debugging cycle into a 15-minute setup.
  * **Firebase-Native:** Built on familiar primitives (RTDB, Functions v2, Task Queue). No new infrastructure needed.
  * **LROs Handled:** Async (Veo video) and Sync (Images/TTS) operations are unified. The client code is identical. We handle the polling, backoff, and retries.
  * **Big-File Friendly:** Integrates with GCS and provides signed URLs, bypassing Firebase's limits.

### Optimized for AI Coding Agents

This is critical for the modern stack. We designed FireGen to be the perfect interface for AI coding agents.

1.  **AI-to-AI Communication:** The AI-Assisted mode allows AI agents to generate media using natural language, without needing to understand the underlying API schemas.
2.  **Dedicated AI Docs:** We maintain a specific `LLMS.md` file in the repository, providing a complete API reference tailored specifically for AI agents integrating with FireGen.

## Usage Example: The Full Lifecycle

Here’s how you integrate FireGen in your client app. Note the efficient monitoring pattern—this is a key takeaway for RTDB performance:

```typescript
import {getDatabase, ref, push, onValue, get} from 'firebase/database';
const db = getDatabase();

// 1. Create the Job (AI-Assisted Mode)
const jobRef = await push(ref(db, 'firegen-jobs'), 
  "Generate a photorealistic image of a scientist in a lab"
);

// 2. Monitor the Job (Efficiently!)
// CRITICAL TIP: Watch the 'status' field only, not the entire job node. 
// This prevents unnecessary re-renders during polling (which happens frequently for video jobs!).
const statusRef = ref(db, `firegen-jobs/${jobRef.key}/status`);

onValue(statusRef, async (snapshot) => {
  const status = snapshot.val();

  if (status === 'succeeded') {
    // 3. Get the Results
    // Fetch the full job data only once success is confirmed
    const jobData = (await get(ref(db, `firegen-jobs/${jobRef.key}`))).val();
    const imageUrl = jobData.files[0].https; 
    
    console.log("Generated Image URL:", imageUrl);
    // ⚠️ Download immediately! URL expires in 24h.
  } else if (status === 'failed') {
    console.error("Job failed.");
  }
});
```

## The Story Behind FireGen

This project was born out of frustration. I was helping a friend integrate Veo (video generation) into her Firebase app. (She’s a solo founder and not deeply familiar with Google Cloud intricacies., read her blog post at [How a Non-Technical CEO Rebuilt a Video AI Platform in 30 Days
](https://preangel.ai/2025/10/24/company-of-one-rebuilt-video-ai-platform/).)

I spent three days troubleshooting broken libraries, missing docs, and the complexities of LRO polling and GCS file handling. Even after solving it, I realized any new developer would hit the same wall. This is exactly the type of undifferentiated heavy lifting that a Firebase Extension should solve.

FireGen is the tool I wish we had.

## Built With

FireGen is open-source (MIT Licensed) and built with a modern, robust stack:

  * **Platform:** Firebase (Cloud Functions v2, RTDB, Task Queue)
  * **AI Models:** Vertex AI (Veo 3.1, Gemini 2.5 Flash for Image, TTS, and the AI Analyzer)
  * **Language:** TypeScript (Node.js 22)
  * **Validation:** Zod (for strict schema validation)
  * **Integration:** Pure Vertex AI REST API (we ditched the bloated SDKs for direct control and stability)

## Conclusion: Focus on Product, Not Plumbing

FireGen lets solo founders and AI-native developers focus on what matters: validating product ideas and shipping features, not debugging infrastructure.

Write a string to RTDB, get AI-generated media back. It’s that simple.

We're excited to see what you build with it.

### Call to Action

🚀 **Try FireGen today and let us know what you think\!**

[⭐ Star us on GitHub](https://github.com/ShipFail/firegen)

[📄 Read the Docs](https://github.com/ShipFail/firegen/blob/main/README.md)

[🤖 API Guide for AI Agents (LLMS.md)](https://raw.githubusercontent.com/ShipFail/firegen/refs/heads/main/LLMS.md)
