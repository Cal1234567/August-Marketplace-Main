---
name: august-hub
description: >-
  Talk to the August AI Hub from any chat: search the firm's skill library, see what's new
  this week, and file workshop ideas that land on the live workshop board instantly —
  attributed to you. Use whenever the user says "what skills do we have for X", "search the
  hub", "what's new on the hub", "file an idea", "add to the workshop", "request a skill
  that...", or wants Hub content changed from conversation without opening the site. Read
  routes are instant; filing an idea visibly updates the site (workshop board + home-page
  pulse strip). Requires a Hub API token from Cal — without it the skill stops politely.
---

# August Hub — the Hub from chat

The Hub's thin API (`hub-api` Supabase edge function). Three routes. Every call needs BOTH
headers below. Use curl via Bash/PowerShell.

- Base URL: `https://ehnfpfgrfsocvqpuzana.supabase.co/functions/v1/hub-api`
- Header 1: `Authorization: Bearer <anon key>` — the project's public anon key (it ships in
  the site's own JS bundle, so it is not a secret):
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVobmZwZmdyZnNvY3ZxcHV6YW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NzAxMjgsImV4cCI6MjA5NTA0NjEyOH0.cjEKzpA-MIofWGGJ0gEfVGikgir_XI_vOafxCWCQi8k`
- Header 2: `x-hub-token: <token>` — the Hub API token IS a secret. Read it at call time
  from the first of these that exists:
  1. `~/.claude/secrets/hub-api-token.txt` (Windows: `C:\Users\<you>\.claude\secrets\hub-api-token.txt`)
  2. `hub-api-token.txt` in the current workspace root (Cowork — drop the token file Cal
     shares with you into your workspace folder)
  If neither exists, stop and tell the user to ask Cal for the token and where to save it.
  NEVER paste the token's value into any file you create, any commit, or any chat message —
  read it into a shell variable at call time only.

## Routes

**Search skills** — `GET /skills?q=<terms>` (omit q to list all, capped 25)
Returns name, description, category, install line. Answer with the top matches and the
Cowork install path; don't dump all 25 unless asked.

**What's new** — `GET /whats-new`
Last 14 days of new skills, published articles, and workshop ideas. Summarize in a few
lines, newest first.

**File an idea** — `POST /idea` with JSON body:
```json
{ "title": "...", "task": "...", "name": "...", "email": "...", "department": "..." }
```
- `title` and `task` required. Write them tight: title = the ask in a line; task = what
  the person wants automated/built and what done looks like.
- Identity: ALWAYS pass the user's own August email — it's the only guaranteed
  attribution. Name-only matching must be unambiguous (a first name that matches two
  employees fails safe). If the response says `"match": "unmatched"`, say the idea was
  filed unattributed and offer to refile with their email.
- `department` optional — defaults to the matched person's department, else General.
- On success, say it's live on the workshop board (the Hub site → Workshop) and which
  department it landed under.

## Rules

- Reads are free — use them liberally for "do we have a skill for X" questions.
- Ideas are writes to the live site the whole team sees: confirm title/task with the user
  in one line BEFORE posting unless they dictated it verbatim.
- Never invent a skill the search didn't return; say "nothing in the library for that —
  want me to file it as a workshop idea?" instead. That handoff is the whole loop.
- If a route errors twice (4xx/5xx, timeout, malformed response), stop and say so; don't
  retry blind.
- File ideas as the user you're talking to — never as someone else.
