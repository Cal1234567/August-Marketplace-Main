---
name: grill
description: >-
  Relentless one-question-at-a-time interrogation BEFORE anything gets built — extracts the spec
  that lives in the user's head so the build doesn't run on guesses. The agent researches first
  (repo, files, context), then asks only questions it provably cannot answer itself, one at a time,
  hardest-first, until answers stop changing the plan. Ends with a tight written brief (what /
  where / done-looks-like / do-NOT-touch) for a yes before any work starts — a brief good enough to
  hand straight to an execution agent or delegation workflow. Use whenever the user says "grill me", "interview me on
  this", "interrogate this idea", "extract the spec", "make sure you understand before building" —
  or accepts the offer after a big build request. Distinct from find-unknowns (broad map-vs-territory
  toolkit; this is its interview technique weaponized as a BUILD GATE) and from say-back (which
  confirms a plan already formed; grill forms it). The measured target: correction-shaped follow-up
  prompts — every question asked here is a rework round-trip that never happens.
---

# Grill — the spec extraction gate

Rework happens because the spec lived in the user's head and the agent filled the gaps with guesses.
This skill converts those silent guesses into explicit questions BEFORE work starts. Friction is
the feature — but only friction that pays; every question must earn its round-trip.

## Step 0 — Do your homework first (silently)

Before asking ANYTHING, spend a moment in the territory: glance at the repo/files/data the ask
touches, check conventions, check whether an existing skill/pattern already covers part of it.
The cardinal sin of this skill is asking a question the codebase already answers — each one burns
trust and pacing. If the homework answers everything, say so and skip to Step 3.

## Step 1 — Rank the unknowns

List (internally, not aloud) every decision the ask leaves open. Rank by **blast radius**: would the
answer change the architecture or scope (ask first), the behavior (ask second), or just cosmetics
(don't ask — pick the convention and note it in the brief). Explicitly hunt for:

- **The avoided decision** — the thing the user has been circling without deciding. Usually the
  first "hmm, good question" is exactly this.
- **The undefined edge** — what happens on the empty/duplicate/concurrent/failure case.
- **The real success criterion** — "done" as the user will actually judge it, not as stated.
- **The do-NOT-want** — what must not change, break, or be touched. Almost never volunteered,
  almost always exists.

## Step 2 — Ask, one at a time

- ONE question per turn. Never a numbered list of questions. The user controls pacing.
- Each question carries its stakes in one clause: "Sessions or days as the unit? — it decides the
  whole file layout." A question without visible stakes reads as a quiz.
- Banned: anything answerable from the repo or the conversation; multi-part questions; obvious
  questions (the viral original's one rule: no obvious questions); leading questions that
  smuggle in your preferred answer.
- Use AskUserQuestion with concrete options when the choice-space is enumerable; plain text when
  it's open-ended.
- Feed each answer back into the forming brief IN THE USER'S OWN WORDS — their vocabulary is part
  of the spec.
- **Stop condition:** answers stop changing the plan (typically 3–7 questions), or the user says
  "enough" / "just build it". Respect the bail-out instantly and proceed with stated assumptions
  labeled as such. Overstaying is how this skill dies.

## Step 3 — The brief

Deliver the extracted spec, tight:

- **What** — the thing being built, one paragraph, user's words.
- **Where** — files/systems touched.
- **Done looks like** — checkable criteria, including the edge answers.
- **Do NOT touch** — the protected list.
- **Assumptions I'm making** — anything ranked "cosmetic" in Step 1 plus anything from a bail-out,
  each one line.

Then: "That's the contract — build it?" Wait for the yes. On yes, build against the brief exactly;
scope beyond it follows the one-line-flag rule (say it, don't do it).

The brief doubles as a delegation artifact: if your workflow hands builds to a subagent or an
external executor, the brief drops into the handoff nearly verbatim — a grilled brief lowers the
guesswork (and the effort) a delegation needs, because the spec did the thinking.

## Rules

- Never start building mid-grill "to save time." The gate is the point.
- If Step 0 homework reveals the ask is already fully specified, SAY that and skip the theater —
  running a hollow interview to justify the skill is worse than not running it.
- If an answer reveals the whole problem should be solved differently, surface that immediately —
  that finding outranks finishing the interview.
- Keep the register plain; this is a working conversation, not a deposition.
