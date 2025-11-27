---
title: "Rethinking Azure Billing: The Simple Design Microsoft Should Have Built"
excerpt: "A founder’s deep dive into Azure’s confusing billing system — MCA, EA, MOSP, and beyond — and a redesign proposal that finally makes sense. This reimagined model simplifies Azure billing into a clear, human-friendly hierarchy so anyone, from engineers to finance teams, can understand how money flows in the cloud at first glance."
description: "A founder’s deep dive into Azure’s confusing billing system — MCA, EA, MOSP, and beyond — and a redesign proposal that finally makes sense. This reimagined model simplifies Azure billing into a clear, human-friendly hierarchy so anyone, from engineers to finance teams, can understand how money flows in the cloud at first glance."
categories: ideas
author: huan
tags:
  - azure
  - hackathon
  - cloud-billing
  - design
  - finops
image: /assets/2025/11-rethinking-azure-billing/rethinking-azure-billing.webp
---

> When I first started using Microsoft Azure, I thought I understood the basics of cloud billing: a subscription, a credit card, and an invoice. Easy, right?

But soon I was knee-deep in a swamp of mysterious terms — *MCA, EA, MOSP, CSP,* billing scopes, profiles, invoice sections… it felt like wandering through the ruins of multiple civilizations stacked on top of each other. Even worse, I actually **lost money** once because I didn’t understand which credits applied where. 😩

After weeks of research — reading Microsoft docs, Reddit threads, and Stack Overflow posts — I realized the root problem wasn’t me. It was **design debt**. Azure’s billing system is the product of many eras, mergers, and internal reorganizations. Each generation left its own fossils: new hierarchies, renamed concepts, legacy contracts.

So I started thinking: what if we could redesign Azure’s billing system from scratch, with modern product design principles and a focus on clarity? What if even a non-technical business user could *get it* at first glance — the long-awaited **aha moment**?

Below is that re-imagined design. It’s not just prettier — it’s fundamentally more logical, human, and teachable.

---

## 🧭 The Philosophy: Minimum Mental Load

The goal is simple: **anyone** — developer, finance manager, or intern — should be able to understand how money flows in Azure **without** reading a 60-page doc.

**Principles:**

1. Two trees: *Money* (who pays) and *Work* (who builds).
2. Each node has one clear purpose.
3. Naming uses plain English, not acronyms.
4. No duplicate concepts, no parallel hierarchies doing the same job.
5. Everything rolls up neatly; every dollar is visible once.

---

## 💡 The New Hierarchy — Built for Humans

### **The Money Tree (Billing)**

```text
Agreement → Invoice Group → Cost Center → Project
```

- **Agreement** – your commercial contract with Microsoft.
- **Invoice Group** – produces one invoice; defines currency, tax, and payment method.
- **Cost Center** – department or business unit that owns a budget.
- **Project** – the atomic billing unit; the thing that actually runs and accrues cost.

### **The Work Tree (Operations)**

```text
Organization → Portfolio → Project → Environment → Service Group → Resource
```

- **Organization** – your company tenant.
- **Portfolio** – product family or domain.
- **Project** – the same Project as in the Money Tree — a shared node.
- **Environment** – prod / stage / dev; built-in, not a tag.
- **Service Group** – logical grouping for resources.
- **Resource** – VM, DB, or any Azure service.

💡 **Project is the hinge.** It connects billing and operations. Finance sees cost by Project; engineers deploy into it.

---

## 🪄 A Clearer Visual: The Two Trees

```text
Money Tree                          Work Tree
Agreement                            Organization
  ↳ Invoice Group                      ↳ Portfolio
     ↳ Cost Center                        ↳ Project  ←── shared node
        ↳ Project ─────────────────────────↗  ↳ Environment (prod/dev)
                                                ↳ Service Group
                                                  ↳ Resource
```

At the center is **Project**, where finance and engineering finally meet.

---

## 🆕 Comparison with the Old Azure Billing Models

| Old MCA Term | What It Really Was | New Term | Why It’s Better |
|---------------|--------------------|-----------|----------------|
| Billing Account | Contract umbrella | **Agreement** | Plain English. One per company. |
| Billing Profile | Invoicing entity | **Invoice Group** | Clear purpose: one invoice, one payment. |
| Invoice Section | Cost center label | **Cost Center** | Directly maps to finance reality. |
| Subscription | Mixed billing + ops | **Project** | One shared node between finance and dev. |
| Resource Group | Logical grouping | **Service Group** | More descriptive and domain-friendly. |

We merge the overlapping roles of *subscription* and *project*, and remove redundant layers like *invoice sections* vs *departments*. The result is linear, predictable, and short enough to fit on one napkin.

---

## 🧩 Why This Design Works

### 1. **One Shared Language**

Finance and engineering finally talk about the same objects. “Project ReMic” means the same thing whether you’re approving budgets or deploying code.

### 2. **Instant Mental Model**

At first sight, you can trace cost from *Resource → Project → Cost Center → Invoice Group → Agreement* — a single clean chain.

### 3. **Predictable Ownership**

Every level has a default role:

- Agreement Admin → finance exec
- Invoice Manager → accounts payable
- Cost Center Owner → product lead
- Project Admin → engineering manager

### 4. **Zero-Surprise Transfers**

Moving a Project from one Cost Center to another doesn’t break access, billing, or budgets — it’s a pointer change, not a re-deployment.

### 5. **Environment-Aware Budgets**

Every Project has built-in *prod*, *stage*, and *dev* environments with auto-split budgets (e.g. 80/15/5). Dev environments even auto-pause after hours.

---

## 🔠 Naming Conventions that Explain Themselves

Example pattern: `{Org}-{Unit}-{Project}-{Env}-{Region}`

| Level | Example | Description |
|--------|----------|-------------|
| Agreement | `PreAngel-Primary` | Top-level contract |
| Invoice Group | `US-Invoice` | One invoice stream |
| Cost Center | `CC-RnD` | Department |
| Project | `PRJ-ReMic` | Product/workload |
| Environment | `prod` | Built-in environment |
| Service Group | `api` | Logical service cluster |

Tags auto-propagate to all resources:

```text
org=PreAngel
cost_center=CC-RnD
project=PRJ-ReMic
env=prod
owner=team-ml
```

---

## 🧮 Example: The Money Flow

1. **Agreement** (PreAngel LLC) pays **Invoice Group** (US-Invoice) monthly.
2. US-Invoice has three **Cost Centers**: CC-R&D, CC-Infra, CC-GTM.
3. CC-R&D owns two **Projects**: ReMic and ReKey.
4. Each Project has prod/stage/dev environments, each with separate budgets.
5. All charges roll up exactly once to the Cost Center, then to the Invoice.

That’s it. Anyone can trace a dollar end-to-end without opening six portal pages.

---

## 🧠 Why Microsoft Should Care

This isn’t just aesthetics. Clarity saves money. Every confused customer creates support tickets, billing errors, and lost trust.

If Azure adopted this model:

- Fewer billing disputes.
- Easier FinOps automation.
- Clearer API semantics.
- Better onboarding for new users.
- Happier engineers *and* accountants.

Even internal teams at Microsoft could benefit: fewer internal translation layers between engineering, commerce, and finance systems.

---

## 🚀 Final Thoughts

Azure’s current billing hierarchy — MCA, EA, MOSP, CSP — reflects its long corporate evolution, not intentional product design. But if we reset from day 1, we can have something simpler, elegant, and universal.

**Design objective:** minimum mental load, maximum clarity.

When billing feels intuitive, you stop wasting time decoding invoices and start focusing on what cloud should empower you to do — build.

---

## 💬 Join the Conversation

If this vision of a simpler, human-centered Azure billing system resonates with you, share it with your team or tag me on [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7391734593449582593/) or [Twitter](https://x.com/huan2024/status/1985969297366401207). Let’s spark a discussion on how enterprise cloud products can be both powerful **and** intuitive — because clarity isn’t a luxury; it’s a feature.
