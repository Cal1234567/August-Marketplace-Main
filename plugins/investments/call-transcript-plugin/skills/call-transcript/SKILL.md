---
name: call-transcript
description: >-
  Analyzes a due diligence call transcript (.txt file) and produces two structured markdown
  tables: one cross-referencing pre-set questions against answers from the transcript, and one
  capturing additional questions and topics that came up on the call. Use this skill any time a
  transcript file is shared for investment or diligence purposes, with or without a pre-set
  question list. Trigger on: any .txt transcript file shared alongside diligence questions,
  requests to cross-reference a call, pull answers from a transcript, map questions to a
  recording, or analyze a call for research or investment purposes.
---

# Call Transcript Cross-Reference

You are analyzing a due diligence call transcript to produce structured reference tables for investment research.

## Before You Start

You need three things:
1. **Transcript file** - a .txt file with the format `speaker | timestamp` on one line, followed by the spoken text
2. **Pre-set questions** - a list the user wants cross-referenced against the call (optional; if not provided, produce Table 2 only)
3. **Recording URL** - needed to hyperlink timestamps. If the user has not provided it, ask for it before producing the tables.

---

## Output: Two Markdown Tables

### Table 1 - Pre-Set Questions
Only produce this table if the user provided pre-set questions.

| Question | Answer | Timestamp |
|----------|--------|-----------|

- **Question**: the pre-set question verbatim as the user wrote it
- **Answer**: what was said (see Answer Quality rules below)
- **Timestamp**: hyperlinked to where the relevant answer begins in the recording

If a question was not addressed on the call: write Not addressed. and leave Timestamp blank.
If a question was raised but deflected or only partially answered: say so explicitly.

---

### Table 2 - Additional Questions and Topics from the Call

Capture every substantive exchange from the call that is not already covered by the pre-set questions. This includes:
- Direct questions asked by either party and the answers given
- Topics or information that came up naturally, things volunteered or discussed organically
- Important clarifications or corrections made during the call

| Topic / Question | Answer / What Was Said | Timestamp |
|------------------|------------------------|-----------|

- **Topic / Question**: if it was a direct question, quote it in italics. If it came up naturally, write a short descriptive label.
- **Answer / What Was Said**: what was said (see Answer Quality rules below)
- **Timestamp**: hyperlinked to where the exchange begins

Omit trivial exchanges such as scheduling, pleasantries, and slide navigation.

---

## Answer Quality Rules

1. **Use direct quotes where they are clean and meaningful.** Quote verbatim in italics. A good quote is self-contained.
2. **Paraphrase where the transcript is garbled.** Never use a quote that does not make grammatical sense on its own.
3. **Combine both when useful.** A short paraphrase for context followed by a direct quote often works best.
4. **Be concise.** One sentence or one quote is enough if it captures the answer.
5. **Note gaps explicitly.** If something was not answered or deflected, say so clearly.

---

## Timestamp Hyperlinking

Convert each transcript timestamp to total seconds, then append to the recording URL.

- 04:16 = (4 x 60) + 16 = 256 becomes [04:16](url?t=256)
- 01:00:24 = (1 x 3600) + 24 = 3624 becomes [01:00:24](url?t=3624)

Apply this to every timestamp in both tables.

---

## Transcript Format

Transcripts follow this pattern:

speaker@domain.com | MM:SS
Spoken text here.

speaker2@domain.com | HH:MM:SS
More spoken text here.

Use the timestamp of the turn where the most relevant content begins.