---
title: "Game-Copilot辅助游戏工作室进行头脑风暴"
author: karryKeksis
categories: article
tags:
  - blog
  - game
  - agent
image: /assets/2023/10-game-designer-group-on-wechat/1.webp
---

## 介绍
在现代游戏开发过程中，创新和创意的重要性不言而喻。然而，即使对于最有才华的开发者来说，灵感也可能会枯竭。为了解决这个问题，我们创建了一个基于GPT-4的辅助工具，我们称之为Game Copilot。这个工具是一个包含十一个agent的聊天室，旨在帮助游戏创业者进行头脑风暴和优化游戏。  

## 工作机制
Game Copilot是怎么工作的呢？它利用GPT-4的强大功能，提供世界观，机制，玩法，角色等游戏必要的元素，为开发者提供灵感。它能够表现出高发散性，并能对过去的游戏，小说，当前世界背景进行参考，以帮助开发者构建独特且引人入胜的游戏体验。  

### Agent架构
![Agent架构](/assets/2023/10-game-designer-group-on-wechat/2.webp)

## 项目信息
Game Copilot主要适用于独立工作室和RPG类游戏的开发。不论你是一位游戏创业者，还是一位寻求新灵感的开发者，Game Copilot都能为你提供帮助。  

为了提高易用性，我们通过wechaty接入了企业微信，使得用户能在任何地方，任何时候记录自己的灵感，并进行迭代。无论是在挤公交车，还是在休闲的咖啡馆，只需打开企业微信，就能轻松访问Game Copilot。  
   
网页版：
[体验链接](https://game-copilot-frontend.zeabur.app)
企微Bot版：开发中...

## 后端架构
### Technology

1. Package Manager: Poetry
2. Backend Framework: FastAPI
3. Database: MongoDB and Beanie

### Get Started

1. Install Poetry and `poetry install`
2. Prepare MongoDB. The easiest way is using docker: `docker run --rm -p 27017:27017 mongo`
3. Install `game-copilot-agent-v2` and generate access key
4. Uncomment `.env` file and fill in the required information
5. Run `uvicorn src.main:app --reload`

### Game Design Workflow

1. Register and Login
2. Start a Game: Sense we are using paid API for generating, each user will have limit on the number of games they can
   design.
3. Primary Information Collector: User will chat with a information collector agent. Then generate a basic description
   of the game user want to design.
4. Design Iteration:
    1. Firstly, user will chat with a group of agents, including an ideation agent and a critic agents. They will help
       user to brainstorm fancy ideas and give feedbacks on those ideas and current game design.
    2. When user is satisfied with new ideas and comments, they can issue a full game design iteration.
    3. After a full design are generated, user can review and modify the design.
        1. More specifically, user can issue a "command", such as "add some new ideas in here" or "give me more options
           for this part".
        2. Agents will generate the requested result.
        3. User and Agents chat with each other to discuss the result.
        4. Finally, user can choose to accept or reject the modification.
    4. This "Design Iteration" can be repeated for several times until user is satisfied with our result.

### Data Model

1. User: Very basic and common design
    1. email, username, (hashed)password, email validation, type
    2. In addition, a game limit counter is used
2. Game:
    1. user id, create time, design stage
    2. title: string
3. Revision: Store all chat messages, commands and designs.
    1. game id, create time, is closed
    2. type: collect-info, co-design, review-design
    3. iteration: int
4. Record:
    1. revision id, create time
    2. is agent, agent name
    3. type: chat, command, design
    4. command type: add, more-options
    5. content: string
5. Relations: User has-many Games, Game has-many Revisions, GameRevision has-many Records
6. Structure
    1. Game: collect-info - co-design - review-design - co-design - review-design - ...
    2. Every "Revision" starts with a "Bootstrap" operation and ends with a "Finalize" operation.
    3. Revision(collect-info): bootstrap - chat - chat - ... - chat - design
    4. Revision(co-design): bootstrap - chat - chat - ... - chat - todo-list - confirm - design
    5. Revision(review-design): bootstrap - chat - chat - ... - chat - design

### Required "Agent" API

1. Common Description
    1. **All** API should be invoked with an "agent-token" in request body. `{ "token": "<token>"}`
    2. **All** API except `bootstrap` message should be invoked with an "session-id" (may be generated
       by `uuid.uuid4().hex`) in request body. `{ "session_id": "<uuid>" }`
    3. Reset message (Force terminate session): `{ "type": "reset" }`
    4. Error message: `{ "type": "error", "detailed": "<str>" }`, For example:
        1. Invalid session id
        2. Invalid message scheme/format
        3. Unexpected message type
2. `/api/collect-info/`
    1. C -> S: `{ "type": "bootstrap" }`
    2. S -> C: `{ "type": "session", "session_id": "<uuid>" }`
    3. C -> S: `{ "type": "chat-user", "content": "<msg>" }`
    4. S -> C:
        1. `{ "type": "chat-agent-name", "name": "<name>" }`
        2. `{ "type": "chat-agent", "content": "<msg>" }`
        3. `{ "type": "chat-agent-fin", "end": "<bool>" }`
    5. C -> S: `{ "type": "end" }`
    6. S -> C: `{ "type": "design", "content": "<design>" }`
3. `/api/co-design/`
    1. C -> S: `{ "type": "bootstrap", "design": "<design>" }`
    2. S -> C: `{ "type": "session", "session_id": "<uuid>" }`
    3. C -> S: `{ "type": "chat-user", "content": "<msg>" }`
    4. S -> C:
        1. `{ "type": "chat-agent-name", "name": "<name>" }`
        2. `{ "type": "chat-agent", "content": "<msg>" }`
        3. `{ "type": "chat-agent-fin" }`
    5. C -> S: `{ "type": "end" }`
    6. S -> C: `{ "type": "summary", "content": "<content>" }`
    7. C -> S: `{ "type": "confirm", "content": "<content>" }`
    8. S -> C: `{ "type": "design", "content": "<design>" }`
4. `/api/review-design/`
    1. C -> S: `{ "type": "bootstrap" }`
    2. S -> C: `{ "type": "session", "session_id": "<uuid>" }`
    3. C -> S: `{ "type": "add|more-options", "design": "<design>", "target": "<target>", "extra": "<extra>" }`
    4. S -> C: `{ "type": "result", "content": "<content>" }`
    5. C -> S: `{ "type": "chat-user", "content": "<msg>" }`
    6. S -> C:
        1. `{ "type": "chat-agent-name", "name": "<name>" }`
        2. `{ "type": "chat-agent", "content": "<msg>" }`
        3. `{ "type": "chat-agent-fin" }`

### Frontend API

1. `/login/` `/signup/`
2. RESTful API
    1. `/users/` `/users/{uid}`
    2. `/users/{uid}/games/`  `/users/{uid}/games/{gid}`
    3. `/users/{uid}/games/{gid}/revision` `/users/{uid}/games/{gid}/revision/{rid}`
    4. `/users/{uid}/games/{gid}/revision/{rid}/records`
3. Server-Side Events (Prefix: `/users/{uid}/games/{gid}/revision/{rid}/records`)
    1. `/chat` `/reset`
    2. `/collect/end`
    3. `/codesign/end` `/codesign/confirm`
    4. `/review/command` `/review/submit`
4. Process:
    1. Create game: `POST /users/{uid}/games`
    2. Create revision (with types): `POST /users/{uid}/games/{gid}`
    3. Collect-Info
        1. Chat: `POST .../chat`
        2. End: `POST .../end-collection`
    4. Co-Design
        1. Chat: `POST .../chat`
        2. End: `POST .../end-co-design`
        3. Confirm: `POST .../confirm-summary`

### Backend TODO

- Legends:
    - :white_circle: Not started
    - :construction: In progress
    - :eight_pointed_black_star: Backend code finished. Need to be tested and integrated with frontend or agents.
    - :white_check_mark: Done!
    - :thought_balloon: Need to be discussed / Blocked by other tasks
- Authentication:
    - :white_check_mark: Signup
    - :white_check_mark: Login
    - :white_circle: Email verification
    - :white_circle: Password reset
- User:
    - :white_check_mark: Get info
    - :white_circle: Update info
    - :white_circle: Delete account
    - :white_circle: Get user list
- Game:
    - :white_check_mark: Get user's game list
    - :white_check_mark: Create game
    - :white_check_mark: Get game info
- Revision:
    - :white_check_mark: Get game's revision list
    - :construction: Create revision
    - :white_check_mark: Get revision info
- Record:
    - :eight_pointed_black_star: Get revision's record list
    - :eight_pointed_black_star: User chat
    - :eight_pointed_black_star: Collect info end
    - :eight_pointed_black_star: Co-design end
    - :eight_pointed_black_star: Co-design confirm
    - :eight_pointed_black_star: Review design command
    - :eight_pointed_black_star: Review design submit
- Agent Interaction:
    - :eight_pointed_black_star: Collect info
    - :eight_pointed_black_star: Co-design
    - :eight_pointed_black_star: Review design
    - :thought_balloon: Session recovery
- Others
    - :white_circle: Deploy to Zeabur