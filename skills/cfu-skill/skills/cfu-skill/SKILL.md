---
name: cfu-skill
description: >
  Generate an August Group CFU (Client-Facing Update / quarterly Company & Fund Update) DOCX
  that matches the historical reports exactly in formatting and voice. Trigger when the user
  asks to build, generate, rerun, or regenerate a CFU or quarterly fund/company update, or drops
  source LP letters/reports and asks for the CFU document.
---

# CFU Skill

Produce the quarterly August Group CFUs from a set of GP/manager source files (LP letters,
quarterly reports, fund updates). The deliverable is **two DOCX files** — a **Fund CFUs**
document and a **Direct CFUs** document — each matching its gold guide exactly: gold entity
names, navy section banners, August writing voice, correct bullet glyphs, inline italic glosses.

## The guides are the target

Two gold documents define exactly what the output must look and read like:

- `guide/Q1 2026 Fund CFUs.docx`
- `guide/Q1 2026 Direct CFUs.docx`

These are the gold reference documents bundled with the skill. For a new quarter, refresh them
from the latest finished CFUs when available. The whole job of this skill is to reproduce *that*
style and format, pointed at whatever source files a new quarter brings. When in doubt about
voice or layout, open the guides.

## Architecture

Content and formatting are separated:

- **You (the model)** read the source PDFs/docs and write all prose into `cfu-content.json`,
  following the guide references below.
- **`scripts/build_cfu.py`** turns that JSON into **two** byte-faithful DOCX files — fonts, gold
  headings, navy banners, bullet numbering, and the August header/footer are all enforced by
  code. Each file is built from its matching gold guide as the template.

Your only job is correct, on-voice, source-true content. Visual fidelity is automatic.

## Workspace layout

Create a working folder anywhere on your machine — the suggested structure is:

```
CFUs\
  Sources\                          ← drop source PDFs here (current quarter)
  cfu-content.json                  ← you write this; builder reads it
  Q# YYYY Fund CFUs - DRAFT.docx    ← funds output
  Q# YYYY Direct CFUs - DRAFT.docx  ← directs output
```

The guide docs, content schema, and gold example outputs are bundled inside this skill:

```
skill/
  guide/
    Q1 2026 Fund CFUs.docx     ← gold guide + template for the funds output
    Q1 2026 Direct CFUs.docx   ← gold guide + template for the directs output
  references/
    01-document-structure.md
    02-formatting-spec.md
    03-writing-style.md
    04-skeleton-template.md
    content-schema.md
```

Read both gold guides before drafting — they show exactly what the finished output should
look like for funds and directs respectively. Each guide doubles as the DOCX template for its
output, so the header/footer/logo/styles come through automatically.

For a new quarter, swap the files in Sources\ and write a fresh `cfu-content.json`. The builder
defaults to the bundled guides as templates — no path wiring needed. (If a newer gold guide
exists for the quarter, refresh the two files in `guide/` from it first.)

## Required reading (load before drafting)

All reference files are bundled in this skill's `references/` folder. Read all five in order
before writing a single bullet:

1. `references/01-document-structure.md` — the two-section layout (Fund CFUs / Direct CFUs),
   entity types, sub-header vocabulary, and per-entity layout rules.
2. `references/02-formatting-spec.md` — exact fonts, sizes, colors, bullet glyphs. Mostly
   enforced by the builder, but you need it to understand the content structure.
3. `references/03-writing-style.md` — comprehensive style bible: voice, date formats, number
   conventions (decimal rules, US$ prefix, k/M/B scale, tilde approximations), defined-term
   patterns, inline italic rules, sub-header vocabulary, topic header format, snapshot opener
   format, bullet lead patterns, terminal punctuation, and attribution requirements.
4. `references/04-skeleton-template.md` — the fill-in skeleton showing element order and the
   minimal generator checklist.
5. `references/content-schema.md` — the exact JSON spec you must produce.

## Requirements

Python 3 with `python-docx`. Install once with:
```
pip install python-docx
```
Optional: `pdfplumber` or `pypdf` for PDF text extraction.

## Workflow

1. **Confirm quarter and sources.** Identify the quarter (e.g. Q1 2026) and locate the source
   files wherever the user has placed them (e.g. a `Sources\` folder in their working directory).

2. **Extract source text.** Read each source PDF/DOCX. If a PDF is not extractable (scanned),
   ask the user to paste the text. Do not guess or fabricate any figure from memory.

3. **Read the guide docs.** Load all five files from `references/` as listed in the Required reading section above.

4. **Identify entities.** From the sources, determine:
   - Which are **fund** entities (funds August invests *through*) → `funds` array
   - Which are **direct** entities (companies August invests *in*) → `directs` array
   If a source covers multiple entities, split them.

5. **Draft `cfu-content.json`.** For each entity:
   - For **funds**, set `update_period` to the quarter that fund's source covers, in full form
     (`"Q4 2025"`) — the builder renders the gold `Name – Q4 2025 Update` header. Each fund gets
     its own quarter. Omit `update_period` for directs (bare-name header).
   - Start with `Fund Updates` / `General Updates` sub-header.
   - Lead with the snapshot-metrics bullet (investments/positions, deployed capital, gross
     multiple, gross IRR for funds; valuation/multiple for directs). No terminal period.
   - Add themed sub-headers as the source supports.
   - Use `Key Portfolio Updates` + italic topic headers for individual deal line-items in funds.
   - Apply all conventions from `03-writing-style.md`: date format, tilde approximations,
     inline italic glosses, attribution of forward-looking statements to the manager.
   - Never invent figures. If a metric is absent from the source, omit the bullet.
   - Follow the content-schema.md spec exactly for runs/topics/bullets.

6. **Build the two DOCX files.** Run (writes both files into one folder with standard names):
   ```
   python "<skill-dir>/scripts/build_cfu.py" \
     --content "path/to/cfu-content.json" \
     --out-dir "path/to/output/folder"
   ```
   Replace `<skill-dir>` with the absolute path to this skill's folder. Output names come from
   `period_label`: `{period_label} Fund CFUs - DRAFT.docx` and
   `{period_label} Direct CFUs - DRAFT.docx`. To control paths individually, use
   `--out-funds` / `--out-directs` instead of `--out-dir`. The builder defaults to the bundled
   gold guides as templates; override with `--template-funds` / `--template-directs` if needed.

7. **Review and deliver.** Open **both** DOCX files and confirm:
   - Entity names are gold; fund headers carry the `– Q# YYYY Update` suffix, directs do not.
   - Section banners are navy bold caps (`FUND CFUs` / `DIRECT CFUs`).
   - Bullets use correct glyphs.
   - Inline italic glosses are present for all jargon.
   - Dates are in `Mon-YY` / `Q#'YY` form in body text (full `Q# YYYY` only in fund headers).
   - No invented figures.
   Report both output paths and any entities where source material was sparse.

## Regeneration

To rerun or tweak: edit the prose in `cfu-content.json` and rerun the builder. The visual shell
is reproduced deterministically — there is no risk of losing formatting.

## Hard rules

- All facts come only from the current-quarter source files. Never from memory, prior quarters,
  or the web.
- Never fabricate numbers, multiples, IRRs, valuations, or dates.
- Attribute all forward-looking statements to the GP/manager by name.
- Define every piece of jargon inline in italics the first time it appears.
- Use `the Fund` (capital F) for fund entities; refer to direct companies by name or "the Company."
- Dates strictly in `Mon-YY` / `Q#'YY` form — never "January 2026" or "Q1 2026" in body text.
- Approximate values always get a tilde: `~US$350M`, `~10%`.
