---
name: weekly-summary
description: >-
  Runs a full weekly debrief for the user. Pulls Teams chats, Outlook calendar, and Outlook email from the current week (Monday through today), then delivers a two-part report — (1) clean bullet summary of what happened grouped by topic, (2) open loops: unresolved threads, unanswered questions, unconfirmed action items, rescheduled meetings with no new time, pending replies. Trigger whenever the user asks for a weekly summary, week recap, weekly debrief, what happened this week, what's still open this week, or anything like "summarize my week." Also trigger if they say "weekly open loops", "what's hanging this week", or "catch me up on the week."
---

Spawn a single subagent with this prompt:

---
Today = [insert current date]. The week started on [insert most recent Monday's date]. Pull all activity from Teams, Calendar, and Email for the full week (Monday through today) in parallel, then write the weekly debrief.

**Step 1 — Fetch (run all three in parallel)**

First, identify your M365 tools by finding the tools available to you whose names end in:
- `chat_message_search` → use this for Teams
- `outlook_calendar_search` → use this for Calendar
- `outlook_email_search` → use this for Email

Then call all three in parallel:

Teams (`chat_message_search`):
- query: `*`, afterDateTime: Monday of this week
- Paginate until no `nextOffset` returned

Calendar (`outlook_calendar_search`):
- Fetch all events from Monday through today

Email (`outlook_email_search`):
- Fetch received and sent from Monday through today

**Step 2 — Filter**
Discard any item where the timestamp does not clearly fall within this week (Monday through today) in North American local time (UTC-4 to UTC-7). Discard calendar events dated next week or later.

**Step 3 — Write the report**

## THIS WEEK
Group bullets by topic/project (e.g. deal names, internal workstreams, admin). One bullet per notable thing. One sentence max. Include: meetings (who, topic, outcome), key decisions, things sent or signed off on, important emails, context shifts, deals that progressed or stalled. No filler.

## OPEN LOOPS
One bullet per unresolved thread carrying into next week. Must name **who's involved** + **what's hanging**. Flag if: question asked with no answer, someone promised a follow-up that hasn't come, meeting cancelled/moved with no new time confirmed, action item unconfirmed, reply-worthy send with no response, decision explicitly deferred.

If none: "No open loops identified."

---

**Tools:** Use whichever tools are available to you ending in `chat_message_search`, `outlook_calendar_search`, and `outlook_email_search`.
