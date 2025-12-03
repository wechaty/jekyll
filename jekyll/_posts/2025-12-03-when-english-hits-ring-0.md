---
title: "When English Hits Ring 0: A Field Guide to PromptWare"
excerpt: "Software 1.0 was code, 2.0 was data, 3.0 is prompts. Who owns prompts, how do we license them, and what happens when English effectively runs at ring 0?"
categories: engineering
author: huan
tags:
  - promptware
  - software-3-0
  - licensing
  - preangel
  - ai-native
image: /assets/2025/12-when-english-hits-ring-0/english-hits-ring-0.webp
---

> Software 1.0 was code. Software 2.0 was data. Software 3.0 is us yelling at a stochastic parrot until it becomes a co-founder.

I started this whole journey with an extremely boring question:

> If a prompt is the new source code, which license do I put at the bottom?

MIT? Apache? Some Creative Commons flavor? Or do we need a new license family for prompts and agents?

I thought I was just going to compare MIT vs Apache vs CC and go back to work. Instead, I fell down a rabbit hole that ended with PromptWare, Software 5.0, and the slightly cursed idea that one day English will effectively run at ring 0.

This post is my field guide from that trip.

---

## 1. How a Boring License Question Turned into a PromptWare Rabbit Hole

At the beginning, I only wanted to tidy up my house.

I have been building more and more AI-native systems under PreAngel: agents, prompts, RAG pipelines, weird little workflows that feel more like summoning circles for LLMs than normal software.

All of them share one thing: the most valuable logic is no longer buried in a src/ folder. It is hiding inside:

- system prompts
- YAML agent configs
- chain templates
- demo notebooks with "just a quick prompt" that somehow became production

So I asked myself:

- If this prompt is the core of the product,
- and I want to open source it,
- what license label do I slap on it?

MIT? Apache? CC BY? CC BY-SA? Some sad PDF that says "usage allowed for good vibes only"?

Ten tabs later I realized two things:

1. The legal substrate of our world is still mostly old-school FOSS.
2. None of the existing licenses really speak PromptWare yet.

Which is how I ended up sketching a Prompt Public License (PPL, see my other blog post [From GPL to Prompts: Rethinking Open Source Licenses for the AI-Native Era
](https://preangel.ai/2025/12/02/from-gpl-to-prompts/)) and then zooming out into the bigger question:

> If prompts are the new programs, what era of software are we actually in?

---

## 2. Licenses as Soil: MIT, Apache, CC, and the Missing Prompt License

Before we talk about PromptWare and Software 3.0+, we have to talk about soil.

Software does not grow in a vacuum; it grows in license soil. Whatever we plant there inherits the nutrients, bugs, and weird fungi living in that soil.

### 2.1. The 2025 License Landscape in One Screenshot

If you squint at GitHub, npm, and a few big ecosystem studies, the 2025 picture is surprisingly simple:

- MIT: Roughly about one-third of all projects that declare a license. It is still the default "if you do not know, pick this" for open source.
- Apache-2.0: Roughly 10-20% of licensed projects. Hugely dominant in cloud infra, CNCF, and anything where lawyers say the words "patent grant" with a serious face.
- ISC: Globally only a few percent, but in npm it is massive (around ~40% of licensed packages) because tooling made it the default. The minimalist cousin of MIT.
- BSL / BUSL: Well under 1% by project count, but strategically loud: databases, observability, and infra vendors who want to say "open, but not for hyperscalers."
- SSPL: Also <<1%: used by a few high-profile database/logging/search stacks; more famous in blog wars than in raw repo numbers.

The short version:

> MIT + Apache still power most of the open source universe. ISC is their compact sidekick. BSL/SSPL are small but very loud gravity wells around the cloud wars.

### 2.2. CC vs OSI: Where Do Prompts Belong?

When you look at a system prompt, the natural instinct is:

- "It is text, text is content, content uses Creative Commons, right?"

But prompts are weird creatures:

- They are written like essays,
- behave like configuration,
- and feel like source code because they directly shape system behavior.

Creative Commons itself actually says:

> Please do not use CC licenses for software; use real software licenses instead.

And the Open Source world basically says:

> Please do not invent new licenses unless you really, really have to.

Prompts sit exactly in the awkward space between those two memos.

So the natural question arises:

> Should prompts be treated as content (CC), as software (MIT/Apache), or as something new (PPL)?

### 2.3. Why I Started Sketching a Prompt Public License (PPL)

Once you admit that prompts are first-class artifacts, you start wanting things like:

- Clear rules for derivative prompts (what if I heavily modify your system prompt?).
- Clarity on training vs inference (can I fine-tune a model on your prompt library?).
- Consistent rules for prompts embedded in agents, tools, and workflows.

Creative Commons does not know about any of this.

MIT and Apache do not know about "prompt injection" or "agent memory" either; they just treat everything as code blobs.

So PPL for me is less about inventing a clever license and more about asking:

> What would an OSI-spirit license for PromptWare look like, if we took prompts seriously as the source code of Software 3.0?

To answer that, we have to zoom out past licenses and look at the bigger timeline we are living in.

---

## 3. PromptWare: Giving Software a Third Dimension

Let us rewind.

### 3.1. Software 1.0 - Codeware: Humans as Rule Machines

For decades, Software 1.0 was our only mental model:

- Humans write explicit rules in C, Java, Python.
- Compilers smash those into machine code.
- CPUs do exactly what we say (which is how bugs happen).

The source of the system is literally:

```javascript
if (x > 42 && user.is_admin()) {
  delete_everything();
}
```

We are the rule machines. Every if, every loop, every branch is manually crafted.

This is the world that built the internet, your bank, your phone, and probably your washing machine.

### 3.2. Software 2.0 - Neuralware: Data as Source Code

Then deep learning shows up and Andrej Karpathy writes "Software 2.0."

Suddenly, the source is not the rules anymore; it is:

- the dataset, and
- the neural net architecture.

You do not write a million lines of code to recognize cats:

- you collect labeled cat images,
- design a model,
- and let gradient descent compile that dataset into a big weight matrix.

The weird thing about Software 2.0 is that the program still exists, but it is not written in a language we can read anymore. It is embedded in 30M floating-point numbers.

We are still Software 1.0 programmers, but the core of perception and prediction has moved into Neuralware.

### 3.3. Software 3.0 - Promptware: Natural Language as API and IDE

Then we hit 2022 and the LLMs escape from the research labs.

We suddenly have models that:

- speak natural language,
- write code,
- explain themselves,
- and can be "programmed" with a paragraph of text.

That is when Software 3.0 comes into focus:

> The runtime now understands natural language, so your shortest path from idea to behavior is no longer "write code"; it is describe what you want.

In Software 3.0, a program looks like this:

- A system prompt that defines behavior and constraints.
- A set of tools or APIs the model can call.
- Some RAG or chain templates that inject context at the right time.
- Possibly a bit of fine-tuning as a style plug-in.

You are still writing Python or TypeScript around the edges, but the most interesting behavior lives in these prompts and flows.

This is what I call PromptWare:

> PromptWare is software whose primary logic is expressed in prompts, not in traditional source code.

And once you see the world that way, you cannot unsee it.

![Software 3.0 - PromptWare]({{ 'assets/2025/12-when-english-hits-ring-0/software-3.0-promptware.webp' | relative_url }})

---

## 4. Beyond PromptWare: Agentware and Societyware (Software 4.0 and 5.0)

PromptWare explains the present. But it does not explain where we are heading.

Let us extrapolate a bit.

### 4.1. Software 4.0 - Agentware: Programs That Want Things

If Software 3.0 is "you talk, it responds," Software 4.0 is:

> You give it a job, and it keeps working even when you are asleep.

In Agentware, the unit of software is not a function or a request anymore; it is a persistent agent:

- It has goals (keep my infra healthy, grow my MRR, run my household).
- It has memory (knows your preferences, past decisions, recurring events).
- It has tools (APIs, shells, clouds, calendars).
- It has permission, at least in a sandbox, to rewrite its own prompts and plans.

Instead of just prompting a model, you onboard an AI teammate, give it access to certain systems, and let it operate over weeks or months.

From a programming point of view, we move from "write functions" to "define roles, goals, and guardrails."

### 4.2. Software 5.0 - Societyware: Programming Whole Civilizations

Push one step further and the interesting object is not a single agent; it is a society.

Now you have:

- many agents (yours, mine, your company, your city),
- many humans,
- shared infrastructure,
- rules, incentives, and norms encoded in text and code.

This is Software 5.0 in my mental model: Societyware.

The program you are designing here is:

- A governance system.
- A market.
- A reputation network.
- A set of cultural defaults baked into all the agents.

Software engineering turns into:

- Constitution design (who decides what?).
- Market design (who gets rewarded for what?).
- Culture design (what do our agents consider normal?).

At that point, the question "what license should my prompt use" becomes part of a much larger question:

> What kind of civilization am I quietly compiling every time I ship a new agent?

![Software 5.0 - SocietyWare]({{ 'assets/2025/12-when-english-hits-ring-0/software-5.0-societyware.webp' | relative_url }})

---

## 5. Natural Language as the New Programming Language (All the Way Down)

Now let us come back to ring 0.

### 5.1. From Assembly to C, to Python, to Prompts

If you zoom out on programming history, it is one long game of climb away from the hardware:

- Assembly: You talk almost directly to the CPU.
- C: You get a portable illusion of the machine.
- Python or JS: You float even higher above the stack.
- Frameworks or DSLs: You describe what you want, not how to do it.

Software 3.0 just keeps going:

> Now the language we use to program is the same one we use to argue about movies and complain about meetings.

We built a runtime that understands our everyday language, and of course the first thing we do is ask it to write more Python.

### 5.2. LLMs as Virtual Machines, Prompts as Source Code

There is a very natural way to look at LLMs:

- The LLM is a weird virtual machine.
- Its instruction set is structured natural language plus tool calls.
- Prompts are its source files.
- RAG, fine-tuning, and tool wiring are the new linker or loader.

In that picture, the stack looks something like this:

```text
[ Hardware ]
  |
[ Kernel / OS ]
  |
[ Runtimes (JVM, Node, Python, etc.) ]
  |
[ LLM VM (understands language and tools) ]
  |
[ PromptWare (prompts, agents, workflows) ]
```

Python did not kill C, and PromptWare will not kill Python. But it will sit above it, deciding when and how to call it.

### 5.3. PromptWare at Ring 0: The Bernhardt Vision, Rebooted

In his legendary PyCon 2014 talk [The Birth and Death of JavaScript](https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript), Gary Bernhardt jokes about a future where JavaScript eventually runs directly on the hardware:

- no Node,
- no Linux,
- no bootloader,
- just JS at ring 0.

It is hilarious because it is both absurd and consistent with our obsession for layering more JavaScript onto everything.

The PromptWare version of that joke looks like this:

> One day, the most critical systems in our lives will be governed by natural language specs that sit at the very bottom of the socio-technical stack.

Not literally at ring 0 of the CPU, but at something like ring 0 of our institutions:

- Our constitutions, terms of service, policies, and norms become machine-readable prompts.
- Our agents treat those as unbreakable contracts.
- Our infrastructure enforces them with the same seriousness that kernels enforce memory protection.

At that point, saying "when English hits ring 0" is less a joke and more a gentle warning:

> If you are going to run English at ring 0, you had better test it like kernel code.

---

## 6. What PromptWare Needs to Grow Up: Engineering, Licensing, and Culture

PromptWare is still in its teenager phase: very powerful, a little chaotic, questionable fashion sense.

### 6.1. Promptware Engineering: Tests, Types, and Version Control for English

If prompts are programs, we should treat them accordingly:

- Put them in version control with real names, not "final_final_really_final.txt".
- Write prompt tests that assert behavior on representative inputs.
- Use semantic diffing to see what changed in meaning, not just in characters.
- Introduce contracts: preconditions, postconditions, and invariants for agents.

"Just tweak the prompt until it works" is fine for a hackathon demo. It is less fine when your ring-0-ish prompt is deciding which invoices to pay.

### 6.2. Licensing Promptware: Why PPL Might Matter

Licensing is how we encode norms into the soil.

For PromptWare, we probably want:

- OSI-style freedoms (use, modify, share, commercialize),
- clarity about what counts as a derivative prompt,
- rules for embedding prompts in products and agents,
- some way to be honest about training vs inference on public prompt libraries.

That is roughly the design target for a Prompt Public License (PPL):

> A license that treats prompts like software, understands they live inside agents and LLMs, and still respects the spirit of the Open Source Definition (OSD).

Will PPL be the answer? I do not know. But we need to start experimenting, or we will wake up one day with ring-0 English governed entirely by unreadable corporate terms of service.

### 6.3. Ecosystems, Not Heroic Prompts

The future will not be won by a single legendary system prompt.

It will be won by ecosystems:

- Shared PromptWare libraries.
- Reusable agent roles and patterns.
- Registries, linters, and test suites.
- Communities that know how to review and reason about prompts.

UNIX did not win because of one perfect binary; it won because of a culture of small, composable tools. PromptWare will need the same culture if we want Software 3.0 to 5.0 to feel like a flourishing ecosystem, not a random zoo of prompt-glued SaaS.

---

## 7. Takeaways for Builders Standing in 2025

Let us end with some practical notes for our current timeline.

### 7.1. Treat Your Prompts as First-Class Artifacts

Stop treating prompts as disposable strings.

- Put them in repos.
- Name them.
- Test them.
- Comment them.
- Decide what license they are under (even if the answer is MIT for now).

Future-you will thank you, and so will your agents.

### 7.2. Design for 3.0 to 4.0 to 5.0

When you design a simple chat workflow today, ask:

- Could this grow into an autonomous agent later?
- Could that agent become one citizen inside a bigger system?
- Is my architecture compatible with that future, or am I painting myself into a corner?

You do not have to build Software 5.0 now. Just avoid building things that cannot evolve in that direction.

### 7.3. Ask Better Questions Before You Ship the Next Prompt-Wrapped App

Before you ship, try a few uncomfortable questions:

- Is this a real product, or just PromptWare duct-taped to someone else's API?
- What happens if my prompts leak into the open? Am I okay with that?
- If this ended up effectively running at ring 0 of someone's business, would I trust it?

If the answers make you nervous, good. That is your inner SRE screaming from the future.

---

## 8. Further Reading

If you want to go deeper down this rabbit hole, here are a few starting points:

- [GitHub Octoverse](https://octoverse.github.com/) - annual data on how developers actually work and which languages, ecosystems, and licenses are winning.
- [Synopsys OSSRA Report](https://www.blackduck.com/resources/analyst-reports/open-source-security-risk-analysis.html) - how open source shows up inside real commercial codebases, including license risk.
- [Creative Commons FAQ on Software](https://wiki.creativecommons.org/wiki/frequently_asked_questions#Can_I_use_a_Creative_Commons_license_for_software.3F) - why CC politely asks you not to use their licenses for software.
- [Software 2.0 (Karpathy)](https://karpathy.github.io/2017/12/04/software-2.0/) - the original essay on data and neural nets as source code.
- [Promptware Engineering: Software Engineering for LLM Prompt Development](https://arxiv.org/abs/2503.02400) - an academic look at prompts as first-class software artifacts.
- [The Birth and Death of JavaScript](https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript) - the sci-fi keynote that partially inspired the "English at ring 0" energy in this post.

## 9. A Tiny PromptWare Manifesto

I will close with a short manifesto you are welcome to fork, remix, or just steal.

1. Prompts are programs. Treat them with the same respect as code.
2. PromptWare is software. Give it tests, tooling, and version control.
3. Licenses are culture. Choose them intentionally; they are how we encode our values into the soil.
4. Agents are colleagues. Design their roles, guardrails, and incentives like you are hiring someone who could one day run the company.
5. Societyware is coming. The systems we are quietly building now will feel like civilizations later.

If we are going to let English inch closer to ring 0, we might as well make sure it is good English, sitting on good PromptWare, running inside good institutions.

And maybe, just maybe, our future agents will look back at our scrappy prompts from 2025 the way we look at early JavaScript: a little embarrassed, a little nostalgic, and very grateful that we decided to grow up.
