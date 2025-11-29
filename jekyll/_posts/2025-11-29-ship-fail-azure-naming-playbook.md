---
title: "Ship.Fail Azure Naming Playbook: From Mental Model to Real Resources"
excerpt: "I used to dread opening my Azure portal—it was a graveyard of forgotten resources and confusing bills. Today, it’s a clean machine that matches exactly how I run my business. Here is the 'Two Trees' naming playbook I used to turn chaos into clarity, so you can steal it for your own cloud."
categories: engineering
author: huan
tags:
  - azure
  - cloud-billing
  - finops
  - naming
  - ship-fail
image: /assets/2025/11-ship-fail-azure-naming-playbook/cover.webp
mermaid: true
---

> I used to dread opening my Azure portal—it was a graveyard of forgotten resources and confusing bills. Today, it’s a clean machine that matches exactly how I run my business. Here is the 'Two Trees' naming playbook I used to turn chaos into clarity, so you can steal it for your own cloud.

## 0. Context: Part 3 of a Small Trilogy

In my [first post](/2025/11/04/rethinking-azure-billing/), I redesigned the way I *think* about cloud billing: a simple two-tree model for money and work, with clear concepts like Agreement, Cost Center, Project, Environment, and Service Group.

In the [second post](/2025/11/25/the-antigravity-effect-when-coding-becomes-orchestration/), I locked in how I *ship*: a "Vibe Coding" workflow where AI orchestration handles the heavy lifting, and every Project has exactly two environments—`dev` for fast iteration and `prod` for deliberate releases.

Those two posts gave me a **mental model**:
1.  How money should flow.
2.  How code should flow.

But I was still missing something important: **how names should look** in my real Azure cloud.

This post is that missing piece. This is the story of how I sat down, stared at my messy list of resources, and designed a naming convention that matches my mental model, respects my limited working memory, and makes future-me say "oh, that’s obvious" instead of "who created `rg-test2-old-123` and why?".

---

## 1. The Blueprint: Two Trees, One Bridge

Before we get to the naming rules, let's recap the structure. The core idea is separating **Financial Responsibility** (The Money Tree) from **Operational Structure** (The Work Tree), connected by a single shared node: the **Project**.

Here is the map of the territory:

```mermaid
graph TD
    subgraph Money_Tree["💰 The Money Tree (Finance)"]
        Agreement["Agreement<br/>(Billing entity — e.g. PreAngel LLC)"]
        Umb_pre["Umbrella<br/>(umb-preangel)"]
        Umb_ship["Umbrella<br/>(umb-shipfail)"]
        Umb_tbm["Umbrella<br/>(umb-tobemigrated)"]
    end

    subgraph Work_Tree["🛠️ The Work Tree (Ops)"]
        Org["Organization<br/>(Tenant)"]
        Portfolio["Portfolio<br/>(Product family)"]
    end

    subgraph The_Bridge["🌉 The Bridge — Project (Shared node)"]
        Project["prj-<umbrella>-<project><br/>(Project — atomic unit of billing & work)"]
    end

    subgraph Operations["⚙️ Operations (Dev View)"]
        Env_dev["env: dev<br/>(fast iteration)"]
        Env_prod["env: prod<br/>(controlled releases)"]
        RG_dev["rg-<umbrella>-<project>-dev-<segment?>"]
        RG_prod["rg-<umbrella>-<project>-prod-<segment?>"]
        Resource["<type>-<umbrella>-<project>-<env>-<segment?><br/>(type-first naming)"]
        Tags["Tags required:<br/>Org, Umbrella, Project, Env, Segment"]
    end

    %% Finance connections
    Agreement --> Umb_pre
    Agreement --> Umb_ship
    Agreement --> Umb_tbm
    Umb_pre --> Project
    Umb_ship --> Project
    Umb_tbm --> Project

    %% Operations connections
    Org --> Portfolio
    Portfolio --> Project

    Project --> Env_dev
    Project --> Env_prod

    Env_dev --> RG_dev
    Env_prod --> RG_prod

    RG_dev --> Resource
    RG_prod --> Resource

    Resource --> Tags
    RG_dev --> Tags
    RG_prod --> Tags

    %% Emphasis styling
    style Project fill:#f96,stroke:#333,stroke-width:4px,color:black
    style Money_Tree fill:#e1f5fe,stroke:#01579b
    style Work_Tree fill:#fff3e0,stroke:#e65100
    style Operations fill:#f1f8e9,stroke:#33691e
    style Tags fill:#fff8e1,stroke:#f57f17
```

My goal was simple: **Every name in my cloud must map directly to a node on this chart.**

---

## 2. Design Constraints From My Brain

Before touching any names, I wrote down the constraints that matter to **me**:

1.  **One company, one top-level identity.**
    I’m a local US company: **PreAngel LLC**. I don’t want to think about multiple agreements or billing entities.

2.  **Three umbrellas, not fifty cost centers.**
    In reality, I spend money in three big ways:
    *   **PreAngel** – real production products.
    *   **ShipFail** – hackathon ideas and MVP experiments.
    *   **ToBeMigrated** – old things I haven’t cleaned up yet.

3.  **Named Projects, not random subscriptions.**
    I don’t want to think "sub-9a12f3…". I want to think:
    *   **Zixia** – a product under the **PreAngel** umbrella.
    *   **Thoth** – an experiment under **ShipFail**.
    *   **ReMic** – another experiment under **ShipFail**.

4.  **Exactly two environments per Project.**
    *   `dev` – every merge to `main` deploys here.
    *   `prod` – only deliberate promotions land here.

5.  **Names must explain themselves.**
    If future-me can’t decode a name in under three seconds, it’s a bad name.

---

## 3. Mapping Once, Then Forgetting: The Cheat Sheet

This is the only place in this post where I will mention the old Azure terms directly. Everywhere else, I only use my own vocabulary.

| My Name | What it means in my head | Azure Term (Reference Only) |
| :--- | :--- | :--- |
| **Agreement** | PreAngel LLC as a single paying entity | Billing Account + Billing Profile |
| **Umbrella** | A budget bucket (PreAngel, ShipFail) | Invoice Section |
| **Project** | A named workload (Zixia, ReMic) | Subscription |
| **Environment** | `dev` or `prod` | (Naming Pattern / Tag) |
| **Resource Group** | A logical segment (web, api, data) | Resource Group |
| **Resource** | The actual thing (VM, DB) | Resource |

That’s it. After this table, I no longer say "subscription" or "invoice section" in my daily thinking. I say: *"Umbrella **ShipFail**, Project **ReMic**, `dev` environment, `web` Resource Group."*

---

## 4. Naming Conventions, Layer by Layer

I designed my naming system to satisfy three main goals:
1.  **Type first:** Sort similar things together (all VMs, all DBs).
2.  **Context visible:** Answer "who pays?" and "what project?" instantly.
3.  **Environment explicit:** Never mistake `dev` for `prod`.

### 4.1 Umbrella
Umbrellas are mostly a tagging concept, but I use a canonical string for each:
*   `umb-preangel`
*   `umb-shipfail`
*   `umb-tobemigrated`

### 4.2 Project
Projects are where billing and operations meet, so I want their names to be very explicit:
`prj-<umbrella>-<project>`

*   `prj-preangel-zixia`
*   `prj-shipfail-thoth`
*   `prj-shipfail-remic`

When I see `prj-shipfail-remic`, my brain instantly decodes: *This is the **ReMic** Project, under the **ShipFail** umbrella.*

### 4.3 Resource Groups
Resource Groups are the backbone of my structure. They encode **Umbrella**, **Project**, **Environment**, and optionally a **Segment**.

`rg-<umbrella>-<project>-<env>-<segment?>`

*   `rg-shipfail-remic-dev-web`
*   `rg-shipfail-remic-prod-api`
*   `rg-preangel-zixia-prod-data`

### 4.4 Resources
Resources follow a "type-first" convention. The name starts with a short type code, then echoes the same structure:

`<shorttype>-<umbrella>-<project>-<env>-<segment?>`

*   `vm-shipfail-remic-dev-web` (A dev web VM for ReMic)
*   `st-shipfail-thoth-dev-data` (A dev storage account for Thoth)
*   `fn-preangel-zixia-prod-web` (A prod web function for Zixia)

---

## 5. Walking Through a Real Example: ShipFail / ReMic

Let’s put everything together and see how a real Project looks in practice.

### The Money View 💰
```text
Agreement: PreAngel LLC
└─ Umbrella: ShipFail
     └─ Project: prj-shipfail-remic
```
When I see a bill for **ShipFail**, I know it aggregates all Projects under that Umbrella, including ReMic.

### The Work View 🛠️
```text
Project: prj-shipfail-remic
├─ Environment: dev
│    ├─ Resource Group: rg-shipfail-remic-dev-web
│    │     ├─ vm-shipfail-remic-dev-web
│    │     └─ st-shipfail-remic-dev-web
│    └─ Resource Group: rg-shipfail-remic-dev-api
│          └─ fn-shipfail-remic-dev-api
└─ Environment: prod
     ├─ Resource Group: rg-shipfail-remic-prod-web
     │     └─ vm-shipfail-remic-prod-web
     └─ Resource Group: rg-shipfail-remic-prod-api
           └─ db-shipfail-remic-prod-api
```

Every box in that tree has a name that tells the same story. Future-me can open any of those names in the cloud console and instantly know:
1.  This belongs to **ShipFail**.
2.  Specifically to the **ReMic** Project.
3.  In the **dev** or **prod** environment.
4.  And in the **web** or **api** segment.

---

## 6. Tags: The Labels That Save You at 2 AM

Names are great for humans, but tags are where the real power comes from—for search, billing dashboards, and future automation. I keep my tag schema small and strict:

```text
Org       = PreAngel
Umbrella  = PreAngel | ShipFail | ToBeMigrated
Project   = Zixia | Thoth | ReMic | ...
Env       = dev | prod
Segment   = web | api | data | tools | ...
```

Every **Resource Group** and every important **Resource** must have all of these tags.

**Example: A prod API database for Zixia**
*   **Name:** `db-preangel-zixia-prod-api`
*   **Tags:**
    *   `Org = PreAngel`
    *   `Umbrella = PreAngel`
    *   `Project = Zixia`
    *   `Env = prod`
    *   `Segment = api`

Now I can answer questions like *"How much am I spending on **dev** environments?"* or *"Show me everything in **ShipFail**"* with a simple filter.

---

## 7. The "KonMari" Checklist for Your Cloud

Here’s the practical checklist I used when I sat down to clean up my Azure resources. You can literally copy-paste this into your own notebook.

1.  **Decide the Umbrellas:** I committed to exactly three (`PreAngel`, `ShipFail`, `ToBeMigrated`).
2.  **List your Projects:** Under each Umbrella, list the concrete Projects (e.g., `Zixia`, `Thoth`).
3.  **Rename Projects:** Rename the Project object (Subscription) to `prj-<umbrella>-<project>`.
4.  **Create Resource Groups:** Create RGs for `dev` and `prod` following `rg-<umbrella>-<project>-<env>-<segment?>`.
5.  **Move Resources:** Move existing resources into the new RGs. If a resource sparks confusion ("why is this here?"), delete it or move it to `ToBeMigrated`.
6.  **Apply Tags:** Tag everything. No exceptions.

---

## 8. Why This Matters

This might look like a naming problem, but for me, it’s really about **cognitive load**.

When the portal matches my mental model, I make fewer mistakes. When `dev` vs `prod` is encoded into names and tags, I’m less likely to destroy something important at 2 AM.

If you’re also a solo founder, hacker, or small team juggling multiple ideas, I hope this playbook helps you design a cloud that feels like it belongs to you, instead of the other way around.

**Steal this system.** You don't have to use my names (`ShipFail`, `Zixia`), but the **shape**—Umbrellas, Projects, Environments, and Type-First Naming—will save your sanity.
