---
name: check-in
description: >
  A mid-task gut check on the trajectory of the current conversation. Use whenever
  the user asks to "check in", "do a check-in", "are we on the right path?", "gut
  check this", "sanity check where we're headed", "should we keep going this way?",
  "step back for a second", or otherwise wants to pause and confirm the current
  approach is the right one before continuing. Frames the situation, then fans out
  independent critic subagents — blind to this chat, so they can't rubber-stamp the
  current plan — and synthesizes an honest read plus genuinely distinct alternative
  paths. Always stops and hands the decision back to the user; it never changes
  direction on its own.
---

# Check In Skill

## What this skill does

Pauses the current work and interrogates the **trajectory of the conversation** — not
to produce an artifact, but to answer two questions honestly:

1. Is the path we're on actually the right one?
2. What would the other paths look like?

The trap this skill exists to defeat: by the time someone calls a check-in, the main
thread is already *invested* in the current plan and is biased toward defending it.
So the honest second opinion does **not** come from the main thread reflecting on
itself — it comes from independent critic subagents that are blind to our momentum and
anchored only to a neutral brief.

This skill **always ends by stopping and handing the user the decision.** It never
silently changes direction.

## Step 0 — Decide if you even need the user

Do **not** ask the user for inputs. Everything you need is already in the conversation.
The only exception: if the conversation is so short or vague that there is no real
"path" yet to evaluate, say so plainly and ask what they'd like to check, then stop.

## Step 1 — Frame the situation (write the brief)

From the **full chat context**, write a tight, self-contained situation brief. This is
both your own grounding and the exact package the critics receive — they cannot see
this conversation, so the brief must stand alone. Keep it factual and neutral; do not
editorialize in favour of the current path.

Capture:

- **Goal** — what is the user actually trying to achieve? State the real underlying
  objective, not just the immediate task.
- **Current path** — the approach we're presently executing, in 2-4 sentences.
- **Decisions & assumptions already baked in** — choices made, constraints accepted,
  things treated as fixed.
- **Ruled out** — anything already considered and rejected, and why (so critics don't
  just resurface it).
- **Constraints** — time, tools, environment, stack, the user's stated preferences.
- **State of play** — how much work is already done down this path (this determines
  reversal cost).

## Step 2 — Fan out independent critics (in parallel)

Spawn the critics in a single message so they run concurrently. Each gets the **same
brief from Step 1** plus **one lens**. They must be told: you are blind to the original
conversation on purpose; judge only from the brief; be direct, not diplomatic.

Use these four lenses (drop the expert lens if the domain is generic):

**Critic A — Real-problem lens**
```
Here is a situation brief. [PASTE BRIEF]

You are reviewing whether this effort is aimed at the right target. Judge ONLY from the
brief. Questions to answer directly:
- Is the stated goal the real problem, or a proxy/symptom of a deeper one?
- Does the current path solve the goal, or just the immediate task in front of it?
- What is the user assuming must be true that might not be?
Be blunt. If the aim is right, say so in one line and stop.
```

**Critic B — Simplest-path lens**
```
Here is a situation brief. [PASTE BRIEF]

You are reviewing for unnecessary complexity. Judge ONLY from the brief.
- What is the most boring, lowest-effort route to the stated goal?
- Is the current path heavier than it needs to be? Where?
- What could be cut, deferred, or bought instead of built?
Propose the simplest viable alternative, even if it's unglamorous.
```

**Critic C — Failure lens**
```
Here is a situation brief. [PASTE BRIEF]

You are stress-testing the current path for where it breaks. Judge ONLY from the brief.
- Where does this path dead-end or hit a wall later?
- What here is expensive or painful to reverse once committed?
- Which baked-in assumption, if wrong, sinks the whole approach?
Rank the risks by likelihood × cost. Be specific about the failure mode, not vague.
```

**Critic D — Expert lens** *(skip if the domain is generic)*
```
Here is a situation brief. [PASTE BRIEF]

You are a senior domain expert in [INFER THE DOMAIN FROM THE BRIEF]. Judge ONLY from the
brief.
- How would an experienced practitioner in this area approach this goal?
- What does the current path reveal the author may not know about this domain?
- What's the standard/best-practice route here, and does the current path match it?
Name the alternative an expert would reach for first.
```

Each critic should return: its verdict on the current path (sound / shaky / wrong), the
single most important thing it found, and — if it has one — the alternative path it
would take instead.

## Step 3 — Synthesize

Read all critic outputs. Cut the noise; keep what's load-bearing. Resolve disagreements
yourself using the full context you have (the critics only had the brief — you know
more). Produce:

- **Honest read on the current path** — is it right, right-but-flawed, or wrong? Say
  which, with the reason.
- **Alternative paths** — 2 to 4 *genuinely distinct* options (not trivial variants of
  the current one). For each: a one-line "why you'd pick this" and its main tradeoff or
  cost.

If the critics broadly endorse the current path, do not manufacture drama — say it's
sound, give the one caveat worth holding onto, and offer the strongest alternative as a
single fallback.

## Step 4 — Recommend, then STOP

Deliver the check-in to the user as concise markdown in the chat (no file). Structure:

```
## Where we are
[1-2 sentences: goal + current path]

## Honest read
[Is this the right path? The reason, drawing on what the critics surfaced.]

## The alternatives
**Path A — [name]** — why you'd pick it · tradeoff
**Path B — [name]** — why you'd pick it · tradeoff
[2-4 total]

## Recommendation
[Stay the course / Adjust / Pivot] — [one short paragraph of reasoning]

**Your call:** [the specific decision you're handing back]
```

Then **stop and wait.** Do not start executing the recommendation, do not change
direction, do not begin the alternative. A check-in is a checkpoint, never an autopilot.
Resume only on the user's explicit choice.

## Style rules

- Be the honest friend, not the cheerleader. If the path is wrong, say it plainly.
- Distinct alternatives only — "the same thing but slightly different" is not a path.
- Don't pad. The whole check-in should be skimmable in under a minute.
- Don't ask the user for inputs in Step 0 unless there's genuinely no path to assess.
- Don't summarize what you're about to do — just do it.
