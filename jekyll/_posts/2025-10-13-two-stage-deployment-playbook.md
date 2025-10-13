---
title: "📘 PreAngel Two‑Stage Deployment Playbook — Firebase App Hosting × Google Cloud Run"
description: "**Purpose:** Document the full design story, reasoning, and lessons behind PreAngel’s simplified **two‑stage deployment model**, and show how it aligns perfectly with **Firebase App Hosting** and **Google Cloud Run** best practices. This handbook is written for any engineer — even those with zero DevOps background — to understand, follow, and operate confidently."
categories: guide
author: huan
tags:
  - deployment
image: /assets/2025/10-two-stage-deployment-playbook/two-stage-deployment-playbook.webp
---

We started like most teams — with five or six deployment environments: `dev`, `qa`, `preview`, `staging`, `preprod`, `prod`. Each served a purpose, but over time they became **confusing, inconsistent, and expensive**:

* Code drifted between stages.
* Builds weren’t reproducible.
* Deployments slowed down because approvals piled up.

We wanted to ask a radical question:

> What’s the **minimum number of stages** that guarantees **speed and safety**?

## `1. Why We Simplified — From Many Stages to Two

After analyzing dozens of pipelines (Firebase, Vercel, AWS, GitHub Actions, Google Cloud Deploy), we found that **two stages — Staging and Production — are enough** when you use Google Cloud’s built‑in rollout and rollback capabilities.

This led to the new model:

* `main` → auto‑deploys to **Staging** (continuous integration & validation).
* A **Git tag** → promotes to **Production** (controlled rollout).

---

## 2. The Journey — The Questions We Asked Ourselves

To reach this model, we asked — and answered — many questions:

| Question                                 | Our Finding                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Why not more stages?                     | Each extra environment creates cost, delay, and drift. Two are enough when rollout control is strong.        |
| Why not merge dev + staging?             | Staging must mirror production closely to validate releases.                                                 |
| Why use Git tags for promotion?          | Tags are immutable, human‑auditable, and integrate naturally with GitHub releases.                           |
| Why not just copy staging to production? | Cloud Run doesn’t clone environments; it shifts **traffic between revisions** — a safer, more elegant model. |
| How does rollback work?                  | Cloud Run reroutes traffic to the previous revision instantly. No redeploys, no downtime.                    |
| Can we preview before rollout?           | Yes. Deploy a revision with **0 % traffic** and access via its direct URL.                                   |
| What about frontend & backend sync?      | Firebase App Hosting can coordinate them; if not, APIs must be backward‑compatible.                          |
| Do we lose flexibility with two stages?  | No — Cloud Run traffic splitting and Firebase Rollouts bring flexibility back.                               |

---

## 3. The Insight — Cloud Run Changed the Rules

In traditional CI/CD systems:

* Promotion = copy Staging → Prod.
* Rollback = redeploy old build.

In **Cloud Run**:

* **Each deploy creates an immutable revision**.
* **Promotion = traffic migration**.
* **Rollback = re‑routing**.

| Legacy Thinking      | Cloud Run Reality                     |
| -------------------- | ------------------------------------- |
| Copy Staging to Prod | Shift traffic to new Prod revision    |
| Rollback = Re‑deploy | Rollback = Redirect traffic instantly |
| Multi‑env drift      | Revisions are immutable snapshots     |

This model removes drift, downtime, and duplication.

---

## 4. The Model — Two‑Stage, Google‑Native Deployment

### 🧩 Stage 1: Continuous Staging

* The `main` branch deploys automatically to **Staging** via Firebase App Hosting → Cloud Build → Cloud Run.
* QA, integration tests, and monitoring occur here.
* Once stable, we tag the commit (e.g., `v1.4.2`) — the tag means **ready for production rollout**.

### 🚀 Stage 2: Controlled Production Rollout

* Cloud Run creates a **new revision** of the Production service using the *same container image* tested in Staging.
* That revision starts with **0 % traffic**.
* Gradually migrate traffic: 5 % → 25 % → 100 %.
* Monitor metrics and logs through Cloud Monitoring.
* If all good → complete rollout. If not → rollback instantly to the previous revision.

> 💡 Cloud Run and Firebase handle this natively — no custom scripts required.

---

## 5. The Reasoning — Analytics That Justify the Choice

| Challenge         | Our Approach                                       | Benefit                       |
| ----------------- | -------------------------------------------------- | ----------------------------- |
| Build drift       | Build once in Staging, reuse same artifact in Prod | Consistency & reproducibility |
| Downtime risk     | Gradual rollout + instant rollback                 | Continuous availability       |
| Complex pipeline  | 2 clear stages + tag promotion                     | Simplicity + speed            |
| Low observability | Firebase Rollouts + Cloud Run Revisions            | Transparent release history   |
| Approval fatigue  | Git tag = single promotion signal                  | Clarity + accountability      |

---

## 6. Best Practices — Firebase App Hosting × Cloud Run

### Firebase App Hosting

* Integrate GitHub repo → deploys automatically from `main`.
* Use **Rollouts tab** to view deployments and initiate rollbacks.
* Tracks rollout history, commits, and environments visually.
* Can serve frontend + backend in sync.

### Google Cloud Run

* Every deploy = **immutable revision**.
* Supports **traffic splitting** for canary or gradual rollout.
* Rollback = **redirect traffic** to any previous revision.
* Supports tagging of revisions for `candidate`, `active`, `stable`.
* Auto‑scales per request; great for cost efficiency.

### Together

* Firebase manages build, history, and frontends.
* Cloud Run handles backend revisions, rollouts, and scaling.
* Both share the same observability stack via Cloud Monitoring.

---

## 7. The New Mental Model — Traffic, Not Copies

Instead of copying staging → prod, think of **traffic control**:

```
main branch → Firebase → Cloud Build → Cloud Run (Staging)
     │                              │
     │                              └─ validated image digest
     │
   Git tag (v1.4.2) ───────────────→ Cloud Run (Prod)
                                      │
                               New revision @ 0 % traffic
                                      │
                              5 % → 25 % → 100 % rollout
                                      │
                              rollback ← metrics breach
```

* **Promotion = Traffic Migration**
* **Rollback = Traffic Redirect**
* **Artifact = Immutable Revision**

---

## 8. Policies to Enforce

| Policy                | Description                                    |
| --------------------- | ---------------------------------------------- |
| Branch rule           | `main` auto‑deploys to Staging.                |
| Promotion rule        | Only signed Git tags can trigger Prod rollout. |
| Artifact immutability | Same container digest in Staging & Prod.       |
| Default rollout       | Start ≤ 5 %, expand if SLOs green.             |
| Rollback rule         | Auto‑rollback if error rate > threshold.       |
| Audit trail           | Firebase + GitHub track all releases.          |

---

## 9. Why It’s So Easy to Understand

Even engineers new to DevOps can reason about this:

1. Code on `main` → auto in Staging.
2. Validate.
3. Tag when ready.
4. Cloud Run migrates traffic → monitors → finalizes.
5. Rollback instantly if needed.

One branch, one tag, two environments — no confusion.

---

## 10. Conclusion — Build Once, Promote by Traffic

This 2‑Stage model achieves the trifecta:

* **Speed:** Continuous deployment to Staging keeps momentum high.
* **Safety:** Gradual rollout + instant rollback prevent outages.
* **Simplicity:** Two stages, one promotion signal.

> ✅ **Build once. Test once. Promote by shifting traffic — not by redeploying.**

**PreAngel Engineering Handbook — 2025 Edition**
