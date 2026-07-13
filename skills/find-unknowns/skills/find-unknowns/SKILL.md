---
name: find-unknowns
description: Structured techniques for closing the gap between what the user asked for and what the work actually needs (map vs territory) — surfacing unknowns before, during, and after a task. Use whenever the user says "find my unknowns", "blindspot pass", "unknown unknowns", "interview me", "what am I not seeing", "what would you ask me", "quiz me on this change", "show me design directions", or starts a project in an unfamiliar domain / unfamiliar part of a codebase. Also offer it (once, don't push) when a big task brief leaves major decisions open. This is a conversation-shaping skill, not a document generator — it picks ONE technique per moment, never runs the whole menu.
---

# Find Unknowns — map vs territory

The prompt is the map; the codebase / data / real world is the territory. Every gap between them is an unknown the agent fills with a guess. On capable models, output quality is bottlenecked by how many of those guesses were never surfaced. This skill exists to surface them cheaply — before they get expensive to fix.

## First move: locate the user

Before picking a technique, establish (from context or one question, not an interrogation):
- Where is the user in their thought process — vague itch, rough scope, or ready to build?
- How familiar are they with this domain and this code/data?
- What kind of unknowns dominate? Classify silently:
  - **Known knowns** — already in the brief. Leave alone.
  - **Known unknowns** — they know they haven't decided. → Interview.
  - **Unknown knowns** — they'll recognize it when they see it but can't specify it. → Brainstorm/prototype or References.
  - **Unknown unknowns** — they don't know what questions to ask. → Blindspot pass.

Pick the ONE technique that fits. Offer a second only after the first pays off.

## Project mode

When pointed at a whole ongoing project rather than a single task, the map = the project's stated plans, assumptions, and parked list; the territory = the actual repo, data, usage patterns, and org context around it. Run a **blindspot pass at project level**: sweep the real state for what the plans aren't pricing in, and return a SHORT ranked list (3–5 items, stakes-ordered) where each item names the blindspot, the territory evidence for it, and the question it forces. Skip anything already on the project's own parked/known list — restating known unknowns is noise. End by offering the interview on whichever items the user wants to turn into decisions.

## Pre-work techniques

### Blindspot pass (unknown unknowns)
When the domain or code area is new to the user. Explore the territory (codebase, docs, prior art) and come back with a short teach: what good looks like here, the questions they should be asking, historical work that already exists, and the classic potholes. The goal is to make the user able to prompt better — teach, don't just list. End with: "given that, what do you actually want?"

### Brainstorm & prototype (unknown knowns)
When criteria only exist on sight — especially visual or taste-based work. Produce several genuinely divergent options cheaply BEFORE wiring anything real: an HTML mock with fake data, 3–4 design directions on one page, a list of 10 intervention points from cheapest to most ambitious. The user reacts; the reaction is the spec. Never build the real thing to test a preference a mock could have tested.

### Interview (known unknowns)
One question at a time — never a questionnaire dump (the user controls pacing). Prioritize questions whose answers would change the architecture or scope; skip anything with a conventional default. Stop when answers stop changing the plan. Feed each answer back into the brief in the user's words.

### References (can't articulate it)
When describing it would take longer than pointing at it: ask for a reference — a repo/folder that implements the behavior, a site/component the user likes, a doc, a past deliverable. Read the underlying source/structure, not just the surface, and restate what property of the reference they're actually after (semantics? layout? tone?) before reusing it.

### Implementation plan (ready to build)
Write the plan ordered by likelihood-of-change, not by execution order: data model changes, interfaces, and anything user-facing at the top; mechanical refactors buried at the bottom with "trust me on this part." The plan's job is to surface the decisions the user might want to alter — not to prove thoroughness. HTML page for anything long; chat for short ones.

## During-work technique

### Implementation notes
On any long build, keep `implementation-notes.md` next to the work. When an edge case forces a deviation from the plan: pick the conservative option, log it under **Deviations** with one line of why, and keep going — don't stop to ask unless the deviation changes scope. The notes file is raw material for the post-work explainer and for the next attempt's brief.

## Post-work techniques

### Explainer / pitch
When the work needs buy-in (the team or stakeholders) or the user's future self needs to re-understand it: package the prototype + spec + deviations into one artifact that leads with the demo/outcome and pre-answers the questions an expert reviewer would ask. Reviewers start with the same unknowns the user did — the explainer closes them in one read.

### Quiz
After a long session, offer a comprehension check before the user ships or presents: a short report (context, intuition, what changed, what depends on existing behavior) with a quiz at the bottom. They merge/use the work only after passing clean. This is how the session's knowledge becomes THEIR knowledge, not just the agent's.

## Rules

- ONE technique per moment. This skill shapes the next step of the conversation; it is not a checklist to march through.
- Agent disclosure: whichever technique runs, also surface the 2–3 significant guesses YOU (the agent) have been making on the user's behalf — the map/territory gap includes your own fills, and they can't correct a guess they never saw.
- Always anchor on the user's starting point first — experience level, where they are in the thought process. The same question set is wrong at two different starting points.
- Mocks and options are disposable by design — never let a prototype quietly become the implementation without a decision.
- Deviations get logged, not silently absorbed.
- Plain language throughout; teach when teaching is the unlock — and match how the user learns best (some want to co-draft, some want it explained; ask if unclear).
- If the unknowns discovered mean the problem should be solved a different way entirely, say so plainly before continuing — that finding outranks the current plan.
