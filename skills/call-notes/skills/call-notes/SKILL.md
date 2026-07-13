---
name: call-notes
description: >-
  Analyzes a call or meeting transcript (.txt) and produces a structured Word briefing in the
  August Group house template (Golden_Template.docx) — titled by the call, with a snapshot,
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

The canonical finished example is **`City Golf USA — Investor Intro Call Notes.docx`** bundled
in `assets/`. Match its quality, voice, and structure — especially the B → C → D header
hierarchy and highlight density.

> **Which skill?** This skill produces the formatted **Word briefing**. If instead the user wants
> a transcript cross-referenced against pre-set diligence questions as markdown tables, that's the
> **`call-transcript`** skill. Both can trigger on "a transcript was shared" — pick by the
> deliverable. When unsure, ask.

## Output modes

This skill runs in two modes depending on the environment:

- **Document mode** — produces a `.docx` Word briefing using the bundled Python builder and
  August Group house template. Full styling, logo header, named paragraph styles.
- **Notes mode** — produces formatted notes directly as a response in markdown. Same structure,
  same hierarchy, same highlighted takeaways. No file I/O or Python required. Used in Cowork
  and any environment where Python is unavailable.

## How it works (pipeline)

1. **Detect mode:**
   - Try running `python --version` (or `python3 --version`).
   - If Python is available → **Document mode**.
   - If Python is NOT available (Cowork, or machine without Python) → **Notes mode**.
   - If Python is missing but `winget` is available, offer to install it:
     `winget install Python.Python.3.12 --silent` then `pip install python-docx`.
     If the user declines or winget is unavailable, proceed in Notes mode.

2. **Read the transcript** and analyze it.

3. **Identify the call type** (see Section Templates below) and plan the sections.

4. **[Document mode]** Write a JSON spec → run `scripts/build_notes.py` → save `.docx` → report path.

   **[Notes mode]** Write formatted notes directly as a markdown response using this mapping:
   - `# Call Name` → title
   - `## Section` → major section (BSubheader equivalent)
   - `### Sub-section` → sub-section (CSubheader — use for 2+ distinct topics within a B section)
   - `#### Detail` → second-level sub-section (DSubheader)
   - `**highlighted figure**` → inline bold for key numbers, dates, metrics, amounts
   - `> **Critical takeaway text**` → blockquote for the 2–3 most important facts
   - Standard bullet points for all content
   - Acronym table at the end (two columns: Term | Definition)

   Apply exactly the same voice rules, Snapshot formula, section templates, and highlight
   density as Document mode — the only difference is the output format.

Do NOT ask for outline approval or any confirmation before building. When a transcript is
provided and this skill is triggered, go straight to generating the notes.

## Before you start

- **The transcript** — a `.txt`, usually `speaker | MM:SS` format.
- **The call's name** — for the title (company/subject + call type, e.g. "City Golf — Investor
  Intro Call"). Infer from the transcript/filename; ask only if genuinely unclear.

You do **not** need a recording URL (no timestamps in these notes).

## Voice & attribution rules

These rules govern how you write every bullet. Violating them is the most common quality failure.

- **Terse, not flowery.** One idea per bullet. Kill filler: "the founders expressed excitement about
  the opportunity" → omit entirely, or just state the fact they were excited about.
- **Numbers over adjectives.** "Strong margins" → "~80% gross margins." "Fast growth" → "~35% YoY."
  "Significant capital" → "$12M committed." Never use a vague descriptor when the actual figure
  was stated.
- **Attribute pushback.** When someone challenged something, name them: "Mark pressed on patent
  durability" — not "patent durability was discussed."
- **Attribute concessions.** When someone hedged or conceded: "Tony acknowledged patents can be
  worked around" — not "there are some patent risks."
- **No corporate speak.** Never write: robust, exciting opportunity, strong pipeline, well-positioned,
  unique value proposition, or any phrase that could appear on a pitch deck cover slide.
- **Counterparty voice in substance sections.** The thematic sections report what the company said
  and what was on the slides. August Group's view belongs only in the Snapshot Read bullet and
  the Risks section.
- **Flag unclear transcript.** Use: `(units unclear in transcript)`, `(name ambiguous — likely X)`,
  `(number garbled — Tony said ~$480M but auto-transcript uncertain)`. Auto-transcripts mislabel
  speakers and mangle numbers — surface it rather than guessing.
- **Quote sparingly.** Only where clean and self-contained. Never reproduce an ungrammatical
  transcript fragment as a quote — paraphrase instead.

## The Snapshot — exact formula

The Snapshot is the most important section. It must contain these elements in this order:

1. **Concept** (`label: "Concept: "`) — one sentence: what is it, what does it do, where did it come from.
2. **Ask / Round** (`key: true`) — raise amount, valuation, committed capital, remaining allocation.
3. **Headline metric** (`runs` with inline highlights) — the single most compelling number (payback
   period, revenue, growth rate, margins — whatever is the hook). Use `runs` to highlight the
   specific figure inline.
4. **Structure note** (`key: true` if decision-relevant) — anything structurally unusual about
   the investment (e.g. "investment is into the holdco, not a single site"; "Golf Zone gets 25%
   equity for no capital").
5. **Key risk** (`label: "Key risk: "`) — the single most important concern, stated plainly.
6. **Read** (`label: "Read: "`) — August Group's current lean and what diligence is needed to decide.

Never add generic "background" or "overview" bullets to the Snapshot. If it's not one of these
six elements, it belongs in the thematic sections.

## Section templates by call type

Pick the template that fits and adapt — drop or rename sections as needed, but always include
Snapshot, Participants, Next Steps, and Appendix.

### Investor Intro / Pitch Call
Company pitching August Group for the first time.
```
Snapshot → Participants → The Business & Concept → Technology & IP →
Unit Economics → Cap Table & Deal Terms → Go-to-Market & Rollout →
Management Team → Customer Segments & Revenue → Exit Strategy →
Risks & Open Questions → Next Steps & Action Items → Appendix
```

### Diligence Call
Deep-dive on a specific topic area after an intro.
```
Snapshot → Participants → [Topic sections matching call agenda, e.g.
  "Technology Deep-Dive", "Financial Model Review", "Reference Check"] →
Open Questions → Next Steps & Action Items → Appendix
```

### Expert / Advisor Call
Conversation with an operator, industry expert, or advisor (not the company).
```
Snapshot → Participants → Background & Context → Key Themes →
Advice & Recommendations → Open Questions & Follow-ups → Appendix
```

### Portfolio Company Update
Existing investment — operational or board-style update.
```
Snapshot → Participants → Performance Update → Key Developments →
Risks & Concerns → Next Steps → Appendix
```

### LP / Investor Relations Call
Call with a current or prospective LP.
```
Snapshot → Participants → Portfolio Updates → Market Commentary →
Next Steps → Appendix
```

## Document structure rules

1. **Title** (`ATitle`) — the **name of the call**: subject + call type. Exactly one, first.
   **No overview paragraph** under it — go straight to Snapshot.
2. **Participants** (`BSubheader`) — **counterparty side only.** One bullet per person, bold name
   lead-in. **Never list August Group / AGC attendees.** Sub-bullet only to flag a transcript
   naming ambiguity.
3. **No "August Group profile" section.** Ever.
4. **Appendix** always last.

### The three-level header hierarchy — use it every time

The template has B → C → D headers. **A flat document with only `BSubheader` is wrong.**
Every substantial section should go at least B → C. Most should go B → C → D.

| `style` id   | Level | Visual | Use for |
|--------------|-------|--------|---------|
| `ATitle`     | —     | Large bold | Document title. Exactly one. |
| `BSubheader` | 1     | Bold, solid ruled underline | Major sections (Snapshot, Technology & IP, etc.) |
| `CSubheader` | 2     | Gold, dotted underline | Sub-sections within a B section. Any B with 2+ distinct topics gets C headers. |
| `DSubheader` | 3     | Dark underline | Sub-sections within a C section. Any C with 2+ distinct topics gets D headers. |
| `EParagraph` | —     | Normal text | Rare prose or caveat. |
| `FBullet`    | —     | Bullet point | Nearly all content. Use `level` (1, 2) for sub-bullets. |

**Mandatory examples — these must always use D headers, never just bullets:**

- **Technology & IP** (B) → **Golf Zone Platform** (C) → **Technology Approach** (D) + **Korean Market Scale** (D)
- **Technology & IP** (B) → **IP & Competitive Moat** (C) → **Patent Portfolio** (D) + **Physical Differentiation** (D)
- **Go-to-Market & Rollout** (B) → **Site Strategy** (C) → **Site 1 — [City]** (D) + **Other Markets** (D)
- **Go-to-Market & Rollout** (B) → **Marketing & Distribution** (C) → **Network Partnerships** (D) + **Content & Athlete Strategy** (D)
- **Cap Table & Deal Terms** (B) → **Round Structure** (C) + **Ownership & Governance** (C) — each C may then split to D
- **Vessel Status & Engineering** (B) → **Viceroy** (C) → **Timeline & Slippage** (D) + **OTA Deadline** (D)

**The test before writing any C section:** does this C have 2+ distinct named sub-topics?
If yes → add D headers. If no → bullets are fine.

**Never** leave a C section with 4+ bullets on obviously different sub-topics — break them into D.

### Write in bullets, not paragraphs
One idea per bullet. Push supporting detail into sub-bullets (`"level": 1`, `2`) rather than long
sentences. A parent bullet with 2–4 sub-bullets reads far better than one dense paragraph-bullet.
Reserve `EParagraph` for rare cases.

### Highlight liberally
Every key number, metric, date, and decision-relevant fact should be highlighted so a reader
skimming can extract the substance at a glance.
- `"key": true` — bolds + yellow-highlights the whole bullet. Reserve for the 2–3 most critical
  facts in the whole doc (e.g. the round size, the headline metric).
- `"runs"` with `"highlight": true` — highlight just the phrase. Use freely: dollar amounts,
  percentages, timeframes, dates, headcounts, utilization figures, patent counts, site sizes,
  check sizes. When in doubt, highlight it.

### Appendix — acronyms
One bullet per non-standard acronym (`label` = acronym, `text` = expansion + a few words of
context). Expand: industry terms, company-specific terms, regulatory bodies, proper nouns
abbreviated on the call (TGF, TGL, RFID, PGA, F&B, JV, OEM, etc.).
**Leave standard finance acronyms inline** (no appendix entry): PE, VC, LP/GP, IRR, MOIC,
EBITDA, CAPEX/OPEX, NDA, IC, SPV, MFN, LOI, ROFR, TAM, P&L, UHNW.

## Style vocabulary — block fields

```json
{"style": "FBullet", "label": "Round: ", "text": "$15M at $30M pre / $45M post."}
{"style": "FBullet", "level": 1, "text": "$12M already committed; ~$3M left for strategics."}
{"style": "FBullet", "key": true, "text": "Investment is into the whole US holdco, not a single site."}
{"style": "FBullet", "runs": [
   {"text": "Payback "}, {"text": "~2 years at 65% utilization", "bold": true, "highlight": true},
   {"text": "; breakeven at 25%."}]}
```
- `label` — bold lead-in (include trailing punctuation/space). `text` — normal-weight run after it.
- `level` — FBullet sub-bullet depth: 0 (`•`), 1 (`o`), 2 (`▪`).
- `key` — `true` = critical takeaway: bold + yellow-highlight the whole bullet.
- `runs` — `[{text, bold?, italic?, highlight?}]`; replaces label/text. `highlight` may be `true`
  (= yellow) or a color name (yellow/green/turquoise/pink/gray).
- Only these keys are allowed (a typo'd key is rejected, so a label can't silently vanish).
- **No markdown** (`**bold**`, `- `, `#`) and no `\n` inside a block (one block = one paragraph).
  Use normal typography (em dashes, curly quotes, ≈, →) — the builder encodes it correctly.

## The JSON spec & build

Spec = `{"output_path": "...", "blocks": [ ... ]}`. Use **forward slashes** in `output_path`
(backslashes are invalid JSON escapes). Default name `<Subject> — <Call Type> Notes.docx`.
**Never write the .docx into this skill's own folder.**

Write the spec with the Write tool, then run the builder by its absolute path:

```
python "<ABSOLUTE path to this skill>/scripts/build_notes.py" "<path to spec>.json"
```
- The template auto-resolves from `assets/Golden_Template.docx`; you only pass the spec.
- It validates the spec (fails on bad/typo'd keys; warns on empty blocks or missing title),
  saves atomically, and if the output is **open in Word** stops with a clear "close it and re-run"
  message. `--out PATH` overrides `output_path`; `--dump-styles` lists template styles.

After it saves, tell the user the path and offer to tweak.

## Limitations & assumptions

- **No tables or images** — title + headers + bullets/sub-bullets only.
- **The builder replaces the whole document body** (chrome survives via headers/footers); it
  assumes the template body holds only placeholder paragraphs.

## Maintenance

Template is bundled at `assets/Golden_Template.docx` (frozen copy). If the house template changes,
refresh it from `C:\Users\CalShannon\OneDrive - August Group\Desktop\CLAUDE\work\directs\citygolf\Golden_Template.docx`.
Requires `python-docx`.
