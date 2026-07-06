---
name: council
description: >-
  Decision council for choices with multiple defensible options: three blind persona agents
  (Architect, Skeptic, Pragmatist) each argue FOR a course of action from a self-contained brief —
  they never see the conversation, so they can't anchor on the room's current lean — then
  anonymously critique each other's arguments, and a chairman picks the best-ARGUED position (never
  an average, never a vote count), grafting in the best surviving points from the losers. Use when
  the user says "council", "convene the council", "run a council on this", "have them debate it",
  "argue it out", or faces a genuine fork (two+ viable architectures, build-vs-buy, sequencing
  calls, invest-vs-pass framings) and wants structured disagreement rather than one synthesized
  take. Distinct from check-in (gut check on the CURRENT trajectory mid-task) — council is for a
  decision not yet made, with real options on the table. Not for fact questions (just answer those)
  or taste calls with one obvious owner. Ends with a recommendation plus what would change it; the
  decision stays with the user.
---

# Council — structured disagreement, then a verdict

The failure this skill prevents: one model in one context converging politely on the conversation's
existing lean. The counter-mechanism is structural, not rhetorical — the arguing agents are BLIND
(fresh context, self-contained brief), the critique round is ANONYMOUS (arguments travel without
authorship), and the chairman's rule is BEST-ARGUED WINS (an average of three positions is nobody's
position and usually worse than any of them).

## Step 0 — Frame the decision (the brief)

Write a self-contained brief: the decision, the real constraints (deadline, budget, existing
systems, non-negotiables), the options on the table (2–4 — if only one option exists there is no
council to run; say so), and what "good" means here. The blind agents get ONLY this. Writing it
forces the first clarity gain: if you can't brief it, the decision isn't formed enough to council —
clarify it first (grill it, if that skill is installed).

Ask the user to confirm the brief in one line only if you had to guess a constraint that would
change the debate. Otherwise proceed.

## Step 1 — Three advocates, in parallel (blind; cheap/medium tier — set model or effort explicitly, per what your harness's Agent tool actually accepts)

If subagent spawning is unavailable in the current environment, simulate each persona in strict
isolation (write each argument without looking at the others) and say so in the verdict.

Each persona gets the brief and this instruction: "Pick the course of action you would genuinely
defend and argue FOR it — commit to one, no hedging across options. Your final message: your chosen
course, your 3 strongest reasons ranked, the single biggest cost of your position honestly stated."

- **Architect** — argues from structure and the long term: which option is still the right call in
  a year, composes with what exists, avoids painting into corners.
- **Skeptic** — argues from what breaks: which option survives the most failure modes, hidden
  assumptions, second-order effects, the option whose worst case is most tolerable.
- **Pragmatist** — argues from reality: cost, time-to-shipped, what the user will actually
  maintain, the option that wins because it happens at all.

Two personas landing on the same option independently is signal, not a problem — note it.

## Step 2 — Anonymous cross-examination

Send each advocate the OTHER TWO arguments with authorship stripped ("Position A argues...").
Instruction: "Name the weakest point in each rival argument — the specific claim you'd attack, one
or two sentences each. Then state whether anything in them changes your own position, and how."
Position changes under cross-examination are high signal; note who moved and why.

Routing: when you resume an advocate for this round, its critique must come back as its final
message (the resumed agent's reply) — tell each advocate its final message IS the reply to the
chairman; do not have it send messages elsewhere, or the critique round lands in the main thread
instead of with you.

## Step 3 — The chairman's verdict (you, main thread)

Rule: **best-argued wins.** Not the majority, not the average, not the one closest to the room's
prior. Judge the arguments as arguments: evidence over assertion, survived its cross-examination,
honest about its own costs.

Deliver:
1. **The verdict** — the chosen course, and the specific argument that won it (quote or paraphrase
   the decisive point — the chairman must show the work).
2. **Grafts** — the best surviving point from each losing position, folded into the chosen course
   as a modification or guardrail. Losers usually carry one thing the winner needs.
3. **The dissent worth keeping** — the strongest point that survived cross-examination but lost
   anyway, preserved in one line so the user knows what they're overriding.
4. **What would change the answer** — the observable condition under which a losing option becomes
   the right one.

Then hand it back: the council recommends; the user decides.

## Rules

- Advocates never see the conversation, each other's identities, or the user's current lean. If the
  brief can't avoid revealing the lean, rewrite the brief.
- Cap the machinery: 3 advocates + 1 critique round = 6 subagent calls, then the chairman. No
  second council on the same decision in the same session — if the verdict doesn't sit right,
  that's a conversation, not another fan-out.
- If all three advocates independently converge on one option, deliver a short verdict and say the
  debate collapsed — don't pad convergence into fake drama.
- Fact disputes that surface mid-council get checked (files, your knowledge tools, web), not
  adjudicated by rhetoric — facts are inputs to the debate, not outputs of it.
- Decisions in domains with fixed policy: the council argues framings, but your team's actual
  criteria, red flags, and fact-vs-hypothesis discipline still govern — cite facts inline, label
  hypotheses.
