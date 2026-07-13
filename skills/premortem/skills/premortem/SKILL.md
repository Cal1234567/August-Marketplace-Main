---
name: premortem
description: >-
  Kahneman-style premortem on any plan, build, or deal about to happen: assume it already FAILED
  months from now, then work backward to name the failure modes, their earliest warning signs, and
  the cheapest present-day tests. Fans out blind investigator subagents (fresh context, one failure
  lens each) so the failure hunt can't anchor on the conversation's optimism. Works on code/projects
  ("premortem this build/migration/refactor") and on investment decisions ("premortem this deal /
  our lean on X" — deal mode ends by offering, once, to log the best failure hypotheses into your
  thoughts/notes system, if one is installed). Use whenever the user says "premortem", "pre-mortem", "assume this
  failed", "kill this plan", "what kills this", "why would this fail", "run the failure case", or is
  about to commit to a plan and wants it stress-tested BEFORE starting. Distinct from red-team (full
  adversarial case against a company) and devils-advocate (one-turn counterargument): premortem is
  failure-first planning on a specific plan. It never blocks or reverses the plan — it hands back a
  ranked failure map and one recommended change; the decision stays with the user.
---

# Premortem — assume it failed, work backward

The technique (Klein/Kahneman): prospective hindsight. People generate ~30% more failure reasons,
and more specific ones, when told "it HAS failed — explain why" than when asked "what could go
wrong?". Your job is to run that exercise properly: specific failures, not risk-register mush.

## Step 0 — Pin the plan and the clock

1. Check the real clock (`Get-Date` / `date`, per platform) — the failure date is **today + 6 months** unless the plan has
   its own natural horizon (a launch date, an IC date, a fund close); use that instead and say so.
2. Restate the plan in 2–3 sentences: what is being attempted, what success looks like, who/what it
   depends on. This restatement is the contract for the whole exercise — if you can't write it, ask
   ONE question to pin it down (never a questionnaire).
3. Classify the mode — **Build** (code, systems, migrations, content, org changes) or **Deal**
   (investment decision, sizing, pass/proceed) — same machinery, different lenses and ending.

## Step 1 — Blind investigators (the core)

Spawn 3–4 subagents IN PARALLEL (cheap/medium tier — set model or effort explicitly, per what your
harness's Agent tool actually accepts; fresh context — they must NOT see this conversation;
anchoring on the room's optimism is the failure mode this skill exists to prevent). If subagent
spawning is unavailable, simulate each lens in strict isolation and say so in the delivery.
Each gets: the Step-0 restatement, the failure date, and ONE lens:

- **Assumption lens** — the plan failed because something everyone treated as true was false.
  Which load-bearing assumption broke, and what did reality turn out to be?
- **Execution lens** — the plan was right; the doing failed. Where did it stall, who dropped what,
  which dependency never arrived, what took 4× longer?
- **World lens** — something outside the plan moved: market, competitor, regulation, platform,
  pricing, a counterparty's incentives.
- **People/incentive lens** (use when the plan involves other humans: team, founder, vendor, LP) —
  someone behaved rationally for THEIR incentives and it broke the plan.

Each investigator's brief ends: "It is [date]. The plan failed completely. Write the 2–3 most
plausible failure narratives under your lens ONLY. For each: (a) the specific story of what
happened — name the mechanism, not the category; (b) the EARLIEST observable warning sign, the thing
someone could have noticed first; (c) the cheapest test or safeguard available TODAY. Specific
beats comprehensive. Your final message is the deliverable."

## Step 2 — Synthesize (you, not another agent)

- Dedupe overlapping narratives; when two lenses independently produced the same failure, flag it —
  independent convergence is the strongest signal in the whole exercise.
- Rank by **plausibility × damage**. Drop anything generic enough to appear in any project's risk
  slide ("scope creep", "key person risk") unless an investigator made it specific to THIS plan.
- Keep 4–7. A premortem with 15 failure modes is a listing, not a ranking.

## Step 3 — Deliver

Chat, in this order:

1. **The plan under test** — the Step-0 restatement (one paragraph).
2. **Ranked failure map** — for each kept failure: the story in 1–2 sentences → *earliest tell* →
   *cheapest test/safeguard now*. Mark convergent ones.
3. **The one change** — the single cheapest modification to the plan that removes or defangs the
   top-ranked failure. One, not three. If the honest answer is "no change needed — the plan holds,"
   say exactly that; manufacturing risk to seem rigorous is a failure of THIS skill.
4. **Deal mode only:** if a thoughts/notes-capture skill is installed, offer ONCE — "want the top
   failure hypotheses logged?" Route through that skill's capture flow; never auto-log. If no such
   skill is installed, skip the offer silently.

## Rules

- Failure stories must name mechanisms: "the vendor withholds usage data because the contract
  gives them no reason to share it" — never "data risk".
- The plan's author is not on trial; failures are framed as what the world did, not who was dumb.
- This skill never cancels or rewrites the plan on its own. Failure map + one change, then hand it
  back. The user decides.
- If the user is mid-plan and asks for this, run it on the REMAINING part of the plan, not a
  retrospective of what's already done (that's a postmortem — different tool).
- Composable: pairs well with a deal-screening skill if you have one — run the screen first, then
  premortem its implied "proceed" plan.
