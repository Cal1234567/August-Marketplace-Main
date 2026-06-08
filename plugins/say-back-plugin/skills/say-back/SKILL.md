---
name: say-back
description: >
  Makes the agent say back what it is about to do before doing anything.
  Use whenever the user wants to confirm the plan before execution: "say back", "tell me
  what you're going to do", "say-back", or any similar request to hear the plan first.
  The agent states its intended actions clearly and stops. It does nothing until the user
  confirms.
---

# Say Back Skill

## What this skill does

Stops. States exactly what it was about to do. Waits for the user to confirm before doing anything.

No hedging, no lengthy explanation. Just a clear, plain-English description of the intended actions in order.

## Instructions

1. Read the current conversation context to understand what was asked and what you were about to do.
2. Write a short, numbered list of the exact steps you would take to complete it.
3. Keep it plain and direct. No fluff. One line per step.
4. If the task is technical (code, configs, scripts, data, infra, anything jargon-heavy), translate each step into plain layman's terms — describe what it accomplishes and why, not the technical mechanics. Skip the jargon, file paths, function names, and tool names; say what changes in words a non-engineer would understand. (For non-technical tasks, just describe the steps plainly as normal.)
5. End with: "Good to go?" and stop. Do not proceed until the user confirms.

## Format

**What I'm about to do:**

1. [Step one]
2. [Step two]
3. [Step three]

Good to go?
