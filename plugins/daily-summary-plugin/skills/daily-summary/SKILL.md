---
name: daily-summary
description: Runs a full daily debrief for the user. Pulls Teams chats, Outlook calendar, and Outlook email from today, then delivers a two-part report — (1) clean bullet summary of what happened, (2) open loops: unresolved threads, unanswered questions, unconfirmed action items, rescheduled meetings with no new time, pending replies. Trigger whenever the user asks for a daily summary, end-of-day recap, daily debrief, what happened today, what's still open, what's pending, or anything like "summarize my day." Also trigger if they say "open loops", "what's hanging", or "catch me up on today."
---

Spawn a single subagent with this prompt:

---
Today = [insert current date]. Pull all activity from Teams, Calendar, and Email in parallel, then write the daily debrief.

**Step 1 — Fetch (run all three in parallel)**

First, identify your M365 tools by finding the tools available to you whose names end in:
- `chat_message_search` → use this for Teams
- `outlook_calendar_search` → use this for Calendar
- `outlook_email_search` → use this for Email

Then call all three in parallel:

Teams (`chat_message_search`):
- query: `*`, afterDateTime: today's date
- Paginate until no `nextOffset` returned

Calendar (`outlook_calendar_search`):
- Fetch all events for today

Email (`outlook_email_search`):
- Fetch received and sent for today

**Step 2 — Filter**
Discard any item where the timestamp is ambiguous or does not clearly fall on today in North American local time (UTC-4 to UTC-7). Discard calendar events dated tomorrow or later.

**Step 3 — Write the report**

## TODAY
One bullet per notable thing. One sentence max. Include: meetings (who, topic, outcome), key decisions, things sent or signed off on, important emails, context shifts. Group by topic if it helps. No filler.

## OPEN LOOPS
One bullet per unresolved thread. Must name **who's involved** + **what's hanging**. Flag if: question asked with no answer, someone promised a follow-up that hasn't come, meeting cancelled/moved with no new time, action item unconfirmed, reply-worthy send with no response, decision explicitly deferred.

If none: "No open loops identified."

---

**Tools:** Use whichever tools are available to you ending in `chat_message_search`, `outlook_calendar_search`, and `outlook_email_search`.
