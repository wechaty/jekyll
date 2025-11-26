---
title: "Deploying Private ChatGPT with Wechaty and LangChain"
author: bestk
categories: article
tags:
  - chatgpt
  - langchain
  - ecosystem
image: /assets/2023/07-wechaty-chat-with-langchain-en/logo.webp
excerpt: >
  Building a private GPT chatbot on WeChat using Wechaty and LangChain with Pinecone vector database for document embedding and intelligent Q&A capabilities.
---

WeChaty is an open-source WeChat bot framework based on Node.js, while LangChain is a tool for deploying private GPT models. By combining WeChaty and LangChain, you can create a privatized GPT bot that runs on the WeChat platform.

Setup:

We use `wechaty-puppet-wechat4u`

```Text
package.json:
"wechaty": "^1.20.2",
"wechaty-puppet-wechat4u": "1.14.1"
"langchain": "^0.0.102",
"@pinecone-database/pinecone": "^0.1.6",
"pdf-parse": "^1.1.1", // Only demonstrating PDF here for brevity
```

```javascript
import { WechatyBuilder} from 'wechaty'

const wechaty = WechatyBuilder.build({
  name: 'wechaty-chatgpt',
  puppet: 'wechaty-puppet-wechat4u',
  puppetOptions: {
    uos: true,
  },
});

```

Set up Pinecone and OpenAI:

```bash
PROMPTLAYER_API_KEY=pl_... # PROMPTLAYER is a tool for logging API call prompts and responses
PINECONE_API_KEY=89e...
PINECONE_ENVIRONMENT=us-west4-gcp-free
PINECONE_INDEX=...
```

The following code vectorizes supported files when received and returns a prompt upon successful completion:

  ```javascript
   wechaty.on('message', async message => {
    const contact = message.talker();
    currentAdminUser = contact.payload.alias === process.env.ADMIN
    const receiver = message.listener();
    let content = message.text().trim();
    const room = message.room();
    const target = room || contact;
    const isText = message.type() === wechaty.Message.Type.Text;
    const isAudio = message.type() === wechaty.Message.Type.Audio;
    const isFile = message.type() === wechaty.Message.Type.Attachment;

    if (isFile) {
      const filebox = await message.toFileBox()
      if (supportFileType(filebox.mediaType)) {
        await saveFile(filebox)
        await loadDocuments()
        await send(room || contact, `${filebox.name} Embeddings successful`)
        return
      }
    }
   })  
  ```

![image1.webp](/assets/2023/07-wechaty-chat-with-langchain-en/image1.webp)

LangChain-related code:

  ```javascript
  import { PineconeClient } from "@pinecone-database/pinecone";
  import dotenv from 'dotenv';
  import { VectorDBQAChain } from "langchain/chains";
  import { DirectoryLoader } from "langchain/document_loaders";
  import { DocxLoader } from "langchain/document_loaders/fs/docx";
  import { PDFLoader } from "langchain/document_loaders/fs/pdf";
  import { TextLoader } from "langchain/document_loaders/fs/text";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import { PromptLayerOpenAI } from "langchain/llms/openai";
  import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
  import { PineconeStore } from "langchain/vectorstores";

  dotenv.config();
  const client = new PineconeClient();

  await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);


  async function loadDocuments(directory = 'resource') {
      console.log('loadDocuments...')
      const loader = new DirectoryLoader(directory,
          {
              ".pdf": (path) => new PDFLoader(path),
              ".txt": (path) => new TextLoader(path),
              ".doc": (path) => new DocxLoader(path),
              ".docx": (path) => new DocxLoader(path),
          });
      // Convert data to document objects, each file becomes a document
      const rawDocuments = await loader.load();
      console.log(`documents: ${rawDocuments.length}`);

      // Initialize loader
      const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
      // Split loaded documents
      const splitDocs = await textSplitter.splitDocuments(rawDocuments);

      // Persist data
      // const docsearch = await Chroma.fromDocuments(splitDocs, embeddings, { collectionName: "private_doc" });
      // docsearch.persist();


      await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
          pineconeIndex,
      });
      console.log(`send to PineconeStore`);

  }


  async function askDocument(question) {
      const llm = new PromptLayerOpenAI({ plTags: ["langchain-requests", "chatbot"] })
      // Initialize OpenAI embeddings object

      // Load data
      const vectorStore = await PineconeStore.fromExistingIndex(
          new OpenAIEmbeddings(),
          { pineconeIndex }
      );

      /* Search the vector DB independently with meta filters */
      const chain = VectorDBQAChain.fromLLM(llm, vectorStore, {
          k: 1,
          returnSourceDocuments: true,
      });
      const response = await chain.call({ query: question });
      console.log(response);

      // const response = await vectorStore.similaritySearch(question, 1);
      // console.log(response);

      return response.text
  }

  function supportFileType(mediaType) {
      const types = ['doc', 'docx', , 'pdf', 'text']
      return types.filter(e => mediaType.includes(e)).length > 0
  }


  export { askDocument, loadDocuments, supportFileType };
  ```

---

> 本文也有[中文版本](/2023/07/07/wechaty-chat-with-langchain/)。
