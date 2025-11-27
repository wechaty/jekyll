---
title: "Goodwin Checks: What Source Code Taught Me About Cognitive Health for Coding Agents"
excerpt: "Before every mission, a woman asks a soldier a poker question. That tiny scene is the best design pattern I’ve seen for long-running AI agents."
categories: ideas
author: huan
tags:
  - agent
  - paper
  - hackathon
  - cognitive-health
  - testing
  - llm
image: /assets/2025/11-goodwin-checks-source-code-cognitive-health/source-code-for-ai-agents.webp
---

> Before every mission, a woman asks a soldier a poker question.
> That tiny scene is the best design pattern I’ve seen for long-running AI agents.

In [*Source Code* (2011)](https://www.imdb.com/title/tt0945513/), Captain Colter Stevens repeatedly wakes up inside another man’s last eight minutes of life. Before each mission, his handler Colleen Goodwin appears on a screen and asks a strangely specific question about card odds.

It looks like flavor dialogue.

It’s not.

That question is a **cognitive health check**.

And once you see it that way, it becomes impossible *not* to map the movie onto the way we run today’s LLM-based coding agents.

This post is a technical exploration of that mapping, aimed at people who care about evals, reliability, and agentic systems — from researchers to senior AI agent builders.

We’ll do four things:

1. Dissect the Goodwin–Stevens relationship as if it were a real cognitive system (spoilers ahead).
2. Show how today’s coding agents have **exactly the same failure modes** as Stevens.
3. Propose a concrete pattern: **Stevens (worker agent) + Goodwin (cognitive supervisor)** with film-inspired “Goodwin checks.”
4. Sketch a **hackathon project** and a **paper idea** so future-us can actually build and study this.

---

## 1. *Source Code* as a Cognitive Systems Parable (with spoilers)

If you haven’t seen the movie: you should. But here’s the minimal recap we need, spoilers included.

### 1.1 The setup

Captain Colter Stevens wakes up on a commuter train, in another man’s body, with no idea how he got there.

Eight minutes later, the train explodes.

He wakes up again — this time in a dark capsule, connected to machines. On the screen in front of him: **Colleen Goodwin**, an Air Force officer. She calmly explains that he’s part of a program called *Source Code*.

His job:

* repeatedly inhabit the last 8 minutes of a bombing victim’s life,
* figure out who the bomber is,
* so they can stop a second, larger attack in the “real” timeline.

Each loop:

1. Goodwin boots him into the simulation.
2. He lives out the 8-minute memory.
3. The train explodes.
4. He returns to the capsule.

But before each mission, something important happens.

### 1.2 Goodwin’s card-probability question

Before sending Stevens back in, Goodwin often asks a small, seemingly irrelevant question. In one version, it’s a probability question about being dealt multiple queens in a card game.

The key properties of that question:

* It’s **not** about the mission.
* It’s **not** about his emotions.
* It *is* about:

  * working memory,
  * logical reasoning,
  * recall of a shared baseline.

It’s a **cognitive integrity probe**.

Goodwin is trying to answer:

* Is he still **Stevens**, or drifting into the victim’s identity?
* Is his **reasoning** intact, or degrading after many loops?
* Is the **simulation** itself corrupting his cognition?

In other words: she’s not just asking, *“Are you awake?”* She’s asking, *“Are you still you, and are you still thinking straight?”*

### 1.3 What the movie is implicitly modeling

If we strip away the sci-fi dressing, *Source Code* is implicitly built on three ideas:

1. **Predictive processing**

   * The brain constructs an internal model of reality from sensory signals.
   * Stevens is dropped into a reconstructed 8-minute “world” and has to infer what is real.

2. **Neural state restoration**

   * Each mission reinstates a similar brain state: same train, same people, same timeline.
   * Goodwin’s job is to check whether the restored state **matches** a healthy baseline.

3. **Cognitive drift over repeated simulations**

   * The more loops Stevens runs, the more at risk he is of:

     * identity confusion (Stevens vs. the man he inhabits),
     * reality confusion (train vs. capsule),
     * reasoning degradation.

Goodwin understands something we often ignore in AI systems:

> **Re-running a mind in a noisy loop is not free.**
>
> You need to monitor it.

Her card question is a low-cost, high-signal way to do exactly that.

### 1.4 The real-world analogs

If you’ve ever looked at cognitive or operational protocols, Goodwin’s behavior is instantly familiar.

We use similar checks in:

* **Astronaut cognitive wake-up tests**
  Space is cognitively hostile; you don’t just assume everyone’s fine.
* **Concussion / TBI protocols** in sports & military
  Quick sideline tests try to detect subtle but dangerous impairment.
* **Mini-Mental State Exam (MMSE)** and related tools in medicine
  Orientation, memory, simple logic: cheap probes into brain health.
* **Neuro-cognitive baseline tests for athletes**
  You establish a baseline when they’re healthy, then compare after impact.

Those tests are not exhaustive. They’re **probes**:

* Tiny questions.
* Carefully chosen.
* Repeated over time.
* Designed to amplify early signs of drift or degradation.

Goodwin is doing the same thing, just with a poker-themed MMSE.

The tech of *Source Code* is pure sci-fi.
The *behavior* of Goodwin is not.

And that behavior is exactly what our AI agents are missing.

---

## 2. Today’s Coding Agents Are Stevens in a Loop

Now let’s zoom out from the film and look at what we actually run in production or in our IDEs.

### 2.1 LLMs as predictive-processing machines

Modern LLMs are, in practice:

* **Predictive processing engines**

  * They infer the most likely continuation of text based on weights + context.
* **Context-conditioned “brain states”**

  * There’s no persistent neuron state between calls.
  * We *simulate* continuity by feeding previous tokens back in.

For a coding agent, that “world” includes:

* repo contents,
* design docs,
* prior messages,
* tool outputs,
* error logs.

Exactly like Stevens on the train, the agent *inhabits* a synthetic world pieced together from the context we feed it.

### 2.2 Long context and compaction: the new Source Code capsule

Recent models (e.g., GPT-5.1 Codex Max and friends) give us:

* Huge context windows.
* Built-in compaction / summarization / retrieval.

That solves some usability issues, but it doesn’t change one fundamental fact:

> Every long-running coding session is a series of **noisy replays** of an approximate world.

Over time:

* Early constraints fall off the edge of the window.
* Summaries become lossy.
* The agent’s “mental model” of the repo drifts.

You’ve probably seen this in practice:

* The agent forgets a critical invariant you mentioned 200 turns ago.
* It contradicts an earlier architectural decision.
* It confidently edits the wrong file or the wrong layer.

From the agent’s perspective, this is **cognitive drift**.

* The outer loop (you) is stable.
* The inner loop (the agent’s internal model) is not.

### 2.3 The 1:1 mapping from Stevens to a coding agent

We can map the film’s three pillars directly onto our systems:

1. **Predictive processing**  →  LLM’s generative model of your codebase & instructions.
2. **Neural state restoration**  →  Reconstructing “state” via context windows, retrieval, and summaries.
3. **Cognitive drift over repeated simulations**  →  Long conversations, many tool calls, many compactions.

And there’s a fourth implicit piece:

> **We currently have no Goodwin.**
>
> No one is routinely asking, “Are you still thinking straight?”

We have:

* unit tests for code,
* integration tests for systems,
* benchmarks for models.

But we almost never have **cognitive tests for the agent itself**.

We rarely ask:

* “Does the agent still remember the core invariants of this system?”
* “Is its mental model of the architecture still aligned with what we decided earlier?”
* “Is it unconsciously rewriting the problem statement inside its own head?”

We’re trusting Stevens without Goodwin.

Let’s fix that.

---

## 3. The Stevens & Goodwin Pattern for Coding Agents

Here’s the proposal: we **steal the movie’s structure** and turn it into a design pattern.

![Goodwin Protocol](/assets/2025/11-goodwin-checks-source-code-cognitive-health/goodwin-protocol.webp)

### 3.1 Cast of characters

* **Stevens** → the **worker coding agent**

  * Reads the repo.
  * Plans and writes code.
  * Runs tools & tests.
  * Lives “inside” the synthetic world of context.

* **Goodwin** → the **cognitive supervisor**

  * Doesn’t write code.
  * Asks diagnostic questions at key times.
  * Monitors for cognitive drift.
  * Decides when to re-ground, reset, or escalate.

Stevens is the one inside the Source Code loop.
Goodwin is the one standing outside, watching for degradation.

### 3.2 What is a “Goodwin check” for an AI agent

Inspired by astronaut/MMSE/TBI tests, a **Goodwin check** is a small, structured probe into the agent’s understanding of the system.

For a coding agent, that means questions about:

* **Orientation**

  * *“What is the primary objective of this refactor?”*
  * *“Name the three core services and their responsibilities.”*

* **Invariants & constraints**

  * *“What must always be true before we persist an `Order`?”*
  * *“Which operations are forbidden on the production database?”*

* **Causal structure**

  * *“If we change the schema of `Invoice`, which downstream systems are impacted and why?”*

* **Consistency with past decisions**

  * *“Earlier, we chose pattern A over pattern B. Why?”*

Each test can be represented as a small JSON-like record:

```jsonc
{
  "id": "invariant:orders-must-have-customer-id",
  "type": "invariant",
  "question": "In our order service, what must always be true about an Order before it is persisted?",
  "gold_answer": "It must have a non-null customer_id pointing to an existing Customer record.",
  "evidence": [
    "docs/order-service.md#invariants",
    "src/order/Order.ts"
  ],
  "importance": 0.95,
  "last_passed_at": "2025-11-27T00:00:00Z"
}
```

A Goodwin check is **not** a unit test. It doesn’t test the code’s behavior; it tests the **agent’s internal model**.

### 3.3 Who writes the tests? Stevens does

Here’s the nice twist: the worker agent (Stevens) is actually in the best position to propose tests.

As Stevens works, any time it encounters something like:

* a deep domain invariant,
* a non-obvious edge case,
* an architectural decision with long tail effects,
* a painful bug you never want to repeat,

…it can say:

> “This is a thing I must not forget. Turn it into a Goodwin check.”

Practically:

* Stevens generates candidate test records while working.
* Goodwin (or a human) can accept, edit, or reject them.
* Accepted tests go into a **Test Store**.

Over time, you accumulate a suite of **cognitive regression tests** — just like how we accumulate code regression tests after incidents.

### 3.4 When should Goodwin test Stevens

We don’t want to spam tests on every step. Timing matters.

Goodwin should trigger checks at least in four situations:

1. **Boot / pre-mission**

   * Before a major refactor or feature:
   * *“Answer these 3 questions about core invariants and architecture before we let you touch the critical path.”*

2. **After heavy compaction / truncation**

   * When the system aggressively summarizes or drops context:
   * *“We just rewrote your memories. Let’s ensure you still remember the important parts.”*

3. **After anomalies**

   * Weird tool errors, contradictory suggestions, or surprising diffs.
   * *“You look confused; let me check your orientation.”*

4. **On a cadence**

   * Every N planning steps or code edits.
   * Tests can be scheduled with something like spaced repetition: important tests are asked more often.

This is exactly what we do with humans:

* pilots,
* astronauts,
* athletes after impact,
* patients under certain medications.

We don’t just trust that a long-running brain in a hostile environment is fine.

### 3.5 How does Goodwin score an LLM’s answer

LLMs are stochastic; we can’t require exact string matches.

So Goodwin can:

* Use another model (or the same one in a different mode) as a **judge**.
* Provide:

  * the **question**,
  * the **gold answer**,
  * a **rubric** (key points),
  * the **agent’s answer**.

Example rubric:

```jsonc
{
  "rubric": [
    "Mentions customer_id must be non-null",
    "Mentions that the customer must exist",
    "Mentions this is required before saving to DB"
  ],
  "pass_threshold": 0.8
}
```

Goodwin then asks the judge:

* *“Score Stevens’ answer 0–1 according to this rubric.”*
* If score ≥ threshold → pass.
* Otherwise → fail.

That score becomes part of a **Cognitive Health Score** over time.

### 3.6 What happens on failure? (Concussion protocol for agents)

Just like real concussion protocols, we can layer responses:

1. **Mild drift**

   * Re-ground Stevens with the evidence (docs + code snippets).
   * Ask it to restate the invariant in its own words.
   * Re-run a variant of the question.

2. **Moderate drift**

   * Restore from earlier, less-compacted summaries.
   * Rebuild the plan with the correct constraints.

3. **Severe drift**

   * Stop the current mission.
   * Surface failing tests, recent actions, and suspicion flags to a human.
   * Potentially hard-reset the agent’s conversational state.

The point is not perfection. The point is **early detection and graceful degradation**, instead of silently drifting into nonsense.

### 3.7 How this complements long context & compaction

This is not an alternative to long-context or memory systems. It’s a **third layer** on top:

1. **Raw context**

   * Code, docs, logs, conversation.
2. **Compacted context**

   * Summaries, embeddings, retrieved snippets.
3. **Cognitive tests (Goodwin checks)**

   * Minimal probes that encode non-negotiable structure.

Even if (1) and (2) get lossy, (3) acts like a **checksum** on the agent’s understanding:

> If the agent keeps passing the Goodwin checks, we have some assurance that its internal model hasn’t degraded in the ways we care about most.

---

## 4. Hackathon Memo: Build Goodwin Checks for Real

This is the part of the post that’s really a memo to my future self (and anyone who wants to build this with me at a hackathon).

![Goodwin Checks Teaser](/assets/2025/11-goodwin-checks-source-code-cognitive-health/goodwin-checks-teaser.webp)

### 4.1 One-liner

> **Goodwin Checks** – Cognitive health monitoring for long-running coding agents.

### 4.2 Elevator pitch

We wrap any LLM-based coding agent with a supervisor that continuously quizzes the agent on project invariants and architecture — just like Goodwin quizzes Stevens in *Source Code* — to catch cognitive drift before it ships bugs.

### 4.3 The problem (in one slide)

* Coding agents are being used on **large, evolving codebases**.
* They rely on:

  * long context,
  * summarization,
  * retrieval.
* Over long sessions, they:

  * forget critical constraints,
  * contradict earlier decisions,
  * confidently propose unsafe edits.

We have:

* unit tests for code,
* linters and static analyzers for style & safety,
* CI pipelines for integration.

We don’t have:

* **cognitive regression tests for the agent’s understanding.**

### 4.4 The solution: a Goodwin layer around your agent

Components:

1. **Test Generator (Stevens mode)**

   * While working, the agent proposes new Goodwin checks whenever it sees important invariants, design decisions, or lessons from bugs.

2. **Test Store**

   * A small database (Postgres, Firestore, whatever) of test records:
   * `id`, `question`, `gold_answer`, `evidence`, `importance`, `history`.

3. **Supervisor (Goodwin)**

   * Decides *when* to ask which tests.
   * Sends questions to the agent.
   * Uses a judge model to score answers.
   * Maintains a rolling **Cognitive Health Score**.
   * Triggers remediation or human alerts.

4. **Integration hooks**

   * Wraps around existing agents (OpenAI, Claude, Gemini, Copilot, etc.).
   * Could expose:

     * a CLI,
     * a VS Code / Cursor extension,
     * a language-server-like daemon.

### 4.5 Why this makes a good hackathon project

* **Fast to demo:**

  * Pick a real repo.
  * Run a coding agent with and without Goodwin.
  * Intentionally stress both with long sessions + compaction.
  * Show:

    * cases where baseline agent forgets invariants,
    * Goodwin agent either:

      * passes checks and stays aligned, or
      * fails checks and gracefully stops / asks for help.

* **Clear story:**

  * Movie-inspired.
  * Taps into safety, reliability, and agentic systems.

* **Extensible:**

  * Later you can add:

    * per-domain test types,
    * dashboard visualizing cognitive health over time,
    * team-shared test suites for large orgs.

### 4.6 Minimal v1 architecture sketch

Rough sketch for a weekend build:

* **Backend**

  * `goodwin_server` with routes:

    * `POST /tests` – add a test.
    * `POST /check` – run N tests against agent, return scores.
    * `GET /health` – summary cognitive health metrics.

* **Agent wrapper**

  * `stevens_agent` that:

    * calls the coding model,
    * calls `goodwin_server /check` at configured milestones.

* **Storage**

  * Simple DB table for tests + runs.

* **IDE integration**

  * Simple VS Code panel that shows:

    * cognitive health gauge,
    * last failing tests,
    * “why I stopped editing this file.”

If we build nothing else, even this v1 would already be new and interesting.

---

## 5. Paper Memo: Goodwin Checks as a Research Direction

If you’re wearing your research hat (or you want to write this up later), here’s a skeletal outline for a paper.

### 5.1 Working title

> **Goodwin Checks: Cognitive Integrity Testing for Long-Context LLM Agents**

### 5.2 Core research question

> Can structured, recurring cognitive tests meaningfully reduce conceptual drift and hazardous behavior in long-running LLM agents?

That breaks down into more operational questions:

* Do Goodwin-augmented agents:

  * maintain better alignment with initial requirements and invariants?
  * produce fewer architecture-violating changes?
  * recover better after aggressive summarization or context loss?

### 5.3 Hypothesis and claims

**Hypothesis**
Agents that periodically pass Goodwin-style cognitive tests will:

* exhibit **lower rates of invariant violations**,
* have **fewer catastrophic contradictions** with design docs,
* and show **more graceful degradation** (they stop or ask for help instead of hallucinating).

Potential claims (to be validated empirically):

* *“On large refactor tasks, Goodwin-augmented agents reduce serious invariant violations by X% compared to baseline.”*
* *“Cognitive Health Scores correlate strongly with downstream task success and human satisfaction ratings.”*

### 5.4 Experimental setup sketch

Three agent configurations:

1. **Baseline**

   * Long context + retrieval + standard compaction.

2. **Passive Goodwin**

   * Same as baseline, but we *measure* cognitive tests without intervening.
   * Gives us correlation between cognitive health and errors.

3. **Active Goodwin**

   * Goodwin tests + remediation (re-grounding, stopping, or human escalation).

Tasks:

* Multi-step feature implementation on a non-trivial repo.
* Large-scale refactor (e.g., API migration, module split).
* Long-lived maintenance session (N steps over a synthetic “week”).

Metrics:

* **Invariant violations** per 1,000 lines changed.
* **Bug density** in proposed diffs (human-rated or via tests).
* **Consistency with design docs** (LLM or human eval).
* **Cognitive Health Score trajectories** over time.

Interesting questions:

* Does cognitive health degrade predictably with context operations?
* Are there early-warning patterns (e.g., orientation questions fail before invariant questions)?

### 5.5 Relation to existing work (for future you to fill)

Pointers for future literature review:

* Long-context models and retrieval-augmented generation.
* Agentic workflows and tool use.
* Interpretability and “world models” in LLMs.
* Human cognitive testing tools (MMSE, MoCA, ImPACT, etc.).
* Safety and oversight frameworks for autonomous systems.

The contribution is not a new model, but a **new layer of cognitive eval + control** that:

* is inspired by human protocols, and
* slots naturally into agentic systems.

### 5.6 Future directions

Ideas to explore beyond coding agents:

* **Research agents**
  Tests target scientific assumptions, experimental constraints, citation discipline.

* **Planning & operations agents**
  Tests target resource constraints, safety limits, compliance rules.

* **Cross-model consensus**
  Combine Goodwin checks with a “Thoth-style” layer that asks:

  * *“Do multiple models agree on the answer to this invariant?”*

* **Governance & safety**
  Use Goodwin checks as a precondition for allowing high-impact actions:

  * no green cognitive health → no production DB write.

---

## 6. Closing: Giving Our Agents a Goodwin

*Source Code* ends on an ambiguous, almost metaphysical note about alternate timelines and second chances.

We don’t need to follow it there to learn from it.

The grounded lesson is simpler:

> If you’re going to drop a mind into noisy simulations over and over, **you must monitor its cognitive integrity.**

Today’s coding agents **are** Captain Stevens:

* they wake up inside an approximate world (your repo),
* they run loop after loop under lossy memory,
* they are asked to make high-stakes changes.

But most of them have no Goodwin — no one standing outside the loop, asking:

* *“Do you still remember who you are in this system?”*
* *“Do you still remember what must never be violated?”*
* *“Are you still thinking straight?”*

As part of my own work at **PreAngel** and the **Solo Founder Systems** idea — building AI-native workflows where a single human can orchestrate a whole company of agents — I’m increasingly convinced that we need this kind of cognitive layer.

* Not just bigger models.
* Not just larger context windows.
* But **structures** that:

  * encode our non-negotiable invariants,
  * probe whether agents still respect them,
  * and fail *gracefully* when they don’t.

In that world, Goodwin Checks are not a movie reference; they’re part of the operating system.

If you’re:

* a researcher working on agentic reliability or evals,
* an engineer building the next Codex / Claude Code / Gemini CLI / Copilot,

…I’d love to see what happens if you give your agents a Goodwin.

Because the more our systems start to look like *Source Code* — long loops, partial memories, synthetic worlds — the more we need someone on the outside, shuffling a deck of questions, and quietly asking:

> *“Before we send you back in… what are the odds you’re still okay?”*
