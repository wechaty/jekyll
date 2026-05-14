---
title: "Building a Zero-Latency Family WeChat AI Assistant with Gemini 3 Flash Lite, FastAPI, and Docker"
author: sshi0929
categories: tutorial
tags:
  - gemini
  - fastapi
  - docker
  - ai
  - chatbot
---

In this tutorial, we will explore a robust, modern architecture for building a Family WeChat AI Assistant. By integrating **Wechaty** (with the PadLocal puppet) for messaging, **FastAPI** for background orchestration, and the brand-new **Gemini 3 Flash Lite** via Google's Vertex AI, we can achieve near-zero latency inference while maintaining a long-term memory system.

## 1. System Architecture

To ensure high performance and stability, we decoupled the architecture into two primary components running via Docker Compose:

1.  **Container A (The Interface):** A Node.js application running `wechaty` and `wechaty-puppet-padlocal`. It maintains the live, asynchronous connection with WeChat servers and handles all physical message routing.
2.  **Container B (The Brain):** A Python application running **FastAPI**. It manages a dual-ledger memory system (SQLite + ChromaDB via LlamaIndex) and handles core reasoning loops with Vertex AI.

## 2. The Dual-Ledger Memory Strategy

A common bottleneck in LLM chat agents is retrieving historical context. To solve this, we split memory into two tiers:

*   **Short-Term Flow (SQLite):** Mandatory. The last 10 messages are instantly appended to the prompt context.
*   **Long-Term Facts (ChromaDB + LlamaIndex):** Tool-Driven. Only queried if the Agent explicitly invokes the history tool.

Crucially, all database insertions are offloaded to **FastAPI BackgroundTasks**, completely decoupling the data ingestion from the AI inference loop.

## 3. The FastAPI Brain Implementation

Here is how we leverage `gemini-3-flash-lite` with Vertex AI Tools and background tasks:

```python
from fastapi import FastAPI, BackgroundTasks
import sqlite3
import chromadb
from llama_index.core import Document, VectorStoreIndex, Settings
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from vertexai.generative_models import GenerativeModel, Tool

app = FastAPI()

# Setup LlamaIndex and ChromaDB
Settings.embed_model = HuggingFaceEmbedding(model_name="all-MiniLM-L6-v2")
chroma_client = chromadb.PersistentClient(path="/app/db/chroma_storage")
index = VectorStoreIndex.from_vector_store(
    ChromaVectorStore(chroma_collection=chroma_client.get_or_create_collection("history"))
)

# Setup SQLite
db = sqlite3.connect('/app/db/chat_history.db', check_same_thread=False)

def process_data_insertion(sender: str, text: str):
    """Executes in a background thread to prevent blocking Agent inference."""
    sqlite_safe_text = text if len(text) <= 1000 else text[:1000] + "... [truncated]"
    db.execute("INSERT INTO messages (sender, content) VALUES (?, ?)", (sender, sqlite_safe_text))
    db.commit()
    index.insert(Document(text=text, metadata={"sender": sender}))

def search_family_history(query: str) -> str:
    nodes = index.as_retriever(similarity_top_k=3).retrieve(query)
    if not nodes:
        return "No relevant past conversations found."
    return "\n".join([f"{n.metadata.get('sender')}: {n.text}" for n in nodes])

history_tool = Tool.from_function(search_family_history)
search_tool = Tool.from_google_search_retrieval(google_search_retrieval={})

@app.post("/chat")
async def chat(payload: dict, background_tasks: BackgroundTasks):
    prompt = payload.get("prompt")
    sender = payload.get("sender")
    
    # Decouple insertion!
    background_tasks.add_task(process_data_insertion, sender, prompt)
    
    recent_rows = db.execute("SELECT sender, content FROM messages ORDER BY timestamp DESC LIMIT 10").fetchall()
    context = "RECENT CHAT:\n" + "\n".join([f"{r[0]}: {r[1]}" for r in reversed(recent_rows)])
    contents = [f"Context: {context}\n\nUser Question: {prompt}"]
    
    model = GenerativeModel("gemini-3-flash-lite", tools=[history_tool, search_tool])
    response = model.generate_content(contents)
    
    return {"reply": response.text, "files": []}
```

## 4. The Wechaty Interface

The Node.js side remains incredibly thin, acting purely as a router. When the bot is mentioned, it hits the `/chat` endpoint. For all other background chatter, it hits a `/log_message` endpoint to build the vector database silently.

```javascript
bot.on('message', async msg => {
  if (msg.self()) return;

  const sender = msg.talker().name();
  const text = msg.text();
  const room = msg.room();
  const isMentioned = room ? await msg.mentionSelf() : false;

  if (isMentioned || !room) {
    const response = await axios.post(`${API_ENDPOINT}/chat`, { prompt: text, sender });
    await (room || msg).say(response.data.reply);
  } else {
    // Background logging
    await axios.post(`${API_ENDPOINT}/log_message`, { text, sender });
  }
});
```

## Conclusion

By utilizing FastAPI's background tasks and Wechaty's robust `padlocal` puppet, we can build sophisticated AI assistants that never miss a beat. Combining this with the blazing-fast `gemini-3-flash-lite` ensures that family members get intelligent responses instantaneously.
