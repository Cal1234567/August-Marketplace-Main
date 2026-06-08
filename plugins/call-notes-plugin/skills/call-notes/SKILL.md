---
name: call-notes
description: >-
  Analyzes a call or meeting transcript (.txt) and produces a structured Word briefing in the
  August Group house template (Notes Template.docx) — titled by the call, with a snapshot,
  counterparty participants, thematic sections in bullets/sub-bullets, highlighted critical
  takeaways, and an acronym appendix, rendered with the template's named styles and the August
  logo header/footer. Use whenever a transcript is shared and the user wants "notes", a "briefing",
  a "write-up", a "Word doc", "City Golf-style notes", "put this call in the template", or "notes
  doc" for an investor / diligence / meeting call. Produces a .docx saved next to the transcript.
  This is distinct from cross-referencing pre-set diligence questions into markdown tables (that
  is the call-transcript skill); use this one when the deliverable is the formatted Word document.
---

# Call Notes → August Group Word Template

You turn a call transcript into a polished, fact-checked briefing in the firm's house Word
template. The output is a `.docx` that looks exactly like the template (August logo header,
footer, margins, named styles) with your analysis poured into it.

The canonical finished example is **`City Golf x August Group - Notes.docx`** in
`…\CLAUDE\work\directs\citygolf\`. Match its quality and voice — but follow the structure rules
below (they supersede older versions of that file).

> **Which skill?** This skill produces the formatted **Word briefing**. If instead the user wants
> a transcript cross-referenced against pre-set diligence questions as markdown tables, that's the
> **`call-transcript`** skill. Both can trigger on "a transcript was shared" — pick by the
> deliverable. When unsure, ask.

## How it works (pipeline)

1. **Read the transcript** and analyze it.
2. **Plan the sections** (adaptive — see below) and note the acronyms that will need an Appendix.
3. **Show the user the planned outline** (section titles only) and get a quick OK before building —
   skip only for a trivially short call or when the user said "just do it."
4. **Write a JSON spec** describing the document as an ordered list of styled paragraph blocks.
5. **Run the bundled builder** (`scripts/build_notes.py`), which clones the template and renders
   the blocks. It writes correct UTF-8 (no `â€"` mojibake) and XML-escapes text for you.
6. **Report the saved path** and offer to adjust.

## Before you start

- **The transcript** — a `.txt`, usually `speaker | MM:SS` format.
- **The call's name** — for the title (company/subject + call type, e.g. "City Golf — Investor
  Intro Call"). Infer from the transcript/filename; ask only if genuinely unclear.

You do **not** need a recording URL (no timestamps in these notes).

## Analysis & fact-check rules

- **Only what was said on the call.** Never invent facts, names, or figures.
- **Quote sparingly**, only where clean and self-contained; paraphrase anything garbled — never
  reproduce an ungrammatical transcript fragment as a quote.
- **Flag ambiguity explicitly**: `(phonetic)`, "units garbled in the transcript", "name ambiguous
  in the auto-transcript". Auto-transcripts mislabel speakers and mangle numbers — surface it.
- **Attribute** where it matters ("Mark pressed on…", "the founder conceded…").
- **Capture the substance**, skip pleasantries/scheduling/slide-navigation.

## Document structure (adaptive)

Use the section set that fits the call; drop/rename/add as needed. Default order:

1. **Title** (`ATitle`) — the **name of the call**: subject + call type, e.g. "City Golf — Investor
   Intro Call" or "Regent — Series B Commercial DD Call". Exactly one, first.
   **No overview/recap paragraph** under it — go straight into Snapshot.
2. **Snapshot** (`BSubheader` + bullets) — the TL;DR as bullets: concept, the ask/round, one or two
   defining facts, the key risk, the read/next step. Highlight the 1–3 most critical takeaways.
3. **Participants** (`BSubheader`) — **the counterparty side only**. One bullet per person with a
   bold name lead-in. **Do not list who attended from August Group / AGC.** Add a short sub-bullet
   only to flag a transcript naming ambiguity.
4. **Thematic sections** (`BSubheader` each) — the substance: e.g. The Business / Concept,
   Technology & Moat, Deal Terms & Cap Table, Unit Economics, Customers & Revenue, Rollout &
   Go-to-Market, Management Team, Exit Strategy, Risks & Open Questions. Use `C) Subheader` for
   sub-groups. **Do NOT include an "August Group profile / about us" section.**
5. **Next Steps & Action Items** (`BSubheader`) — what the counterparty will send, plus mutual
   action items (action items may name August's next steps; that's fine).
6. **Appendix** (`BSubheader`, last) — see Acronyms below.

### Write in bullets and sub-bullets, not paragraphs
Prefer a hierarchy of bullets over prose. Keep each `F) Bullet` to one idea, and push supporting
detail into **sub-bullets** (`"level": 1`, and `2` if needed) rather than long sentences. Reserve
`E) Paragraph` for rare cases. A parent bullet with 2–4 sub-bullets reads far better than one dense
paragraph-bullet.

### Highlight critical takeaways
Mark the handful of genuinely decision-relevant facts as **bold + highlight** — use sparingly
(roughly 3–6 per doc), not on everything. Two ways:
- `"key": true` on a (short) bullet → bolds + yellow-highlights the whole bullet.
- a `"runs"` array → highlight just the key phrase inside a bullet (cleaner for long bullets).

### Appendix — acronyms
End with an **Appendix** section that expands every **non-finance-standard / industry / regulatory
/ company-specific acronym** used, one bullet each (`label` = the acronym, `text` = the expansion +
a few words of context). Examples to expand: WIG, USCG, DBA, PDP, OEM, RFID, PGA, TGL, TGF, F&B,
JV, ADNOC, DoW/DHS. **Leave finance-standard acronyms inline** (don't appendix these): PE, VC,
LP/GP, IRR, MOIC, EBITDA, CAPEX/OPEX, NDA, IC, SPV, MFN, LOI, ROFR, TAM, P&L, UHNW.

## Style vocabulary

| `style` id   | Use for |
|--------------|---------|
| `ATitle`     | The document title = the call's name. Exactly one, first. |
| `BSubheader` | Every major section header (Snapshot, Participants, …, Appendix). |
| `CSubheader` | A sub-group within a section. |
| `EParagraph` | Rare prose / a short caveat note. |
| `FBullet`    | The workhorse: nearly all content (renders a real bullet; use `level` for sub-bullets). |
| `DSubheader` | A deeper header — rarely needed. |
| `RisksHeader` / `Risks` | Optional dedicated risk styling; default to `BSubheader` + `FBullet`. |

### Block fields
```json
{"style": "FBullet", "label": "Round: ", "text": "$15M at $30M pre / $45M post."}
{"style": "FBullet", "level": 1, "text": "$12M already committed; ~$2–3M left for strategics."}
{"style": "FBullet", "key": true, "text": "Investment is into the whole US holdco, not a single site."}
{"style": "FBullet", "runs": [
   {"text": "Payback "}, {"text": "~2 years at 65% utilization", "bold": true, "highlight": true},
   {"text": "; breakeven at 25%."}]}
```
- `label` — bold lead-in (include its trailing punctuation/space). `text` — the normal run.
- `level` — FBullet sub-bullet depth: 0 (`•`), 1 (`o`), 2 (`▪`).
- `key` — `true` = critical takeaway (bold + yellow highlight of the whole bullet).
- `runs` — `[{text, bold?, italic?, highlight?}]`; replaces label/text. `highlight` may be `true`
  (= yellow) or a color name (yellow/green/turquoise/pink/gray).
- Only these keys are allowed (a typo'd key is rejected, so a label can't silently vanish).
- **No markdown** (`**bold**`, `- `, `#`) and no `\n` inside a block (one block = one paragraph).
  Use normal typography (em dashes, curly quotes, ≈, →) — the builder encodes it correctly.

## The JSON spec & build

Spec = `{"output_path": "...", "blocks": [ ... ]}`. Use **forward slashes** in `output_path`
(backslashes are invalid JSON escapes). Default name `<Subject> — <Call> Notes.docx` (or keep an
existing filename when redoing one). **Never write the .docx into this plugin's own folder**; if a
transcript lives there, save to a sensible notes location or ask.

Write the spec with the Write tool (not a shell heredoc), then run the builder by its absolute path:

```
python "<ABSOLUTE path to this skill>/scripts/build_notes.py" "<path to spec>.json"
```
- The template auto-resolves from `assets/Notes Template.docx`; you only pass the spec.
- It validates the spec (fails on bad/typo'd keys; warns on empty blocks or a missing/duplicate
  title), saves atomically, and if the output is **open in Word** stops with a clear "close it and
  re-run" message. `--out PATH` overrides `output_path`; `--dump-styles` lists styles.

After it saves, tell the user the path and offer to tweak.

## Limitations & assumptions

- **No tables or images** — title + headers + bullets/sub-bullets only.
- **The builder replaces the whole document body** (chrome survives via headers/footers); it
  assumes the template body holds only placeholder paragraphs.

## Maintenance

Template is bundled at `assets/Notes Template.docx` (frozen copy). If the house template changes,
refresh it from `C:\Users\CalShannon\OneDrive - August Group\Notes Template.docx`. Requires
`python-docx`. After editing this skill, refresh the installed copy:
`/plugin marketplace update august-group` then `/reload-plugins`.
