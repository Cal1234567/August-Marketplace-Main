---
name: cfu-skill
description: >
  Generate an August Group CFU (Client-Facing Update / quarterly Company & Fund Update) DOCX
  that matches the historical reports exactly in formatting and voice. Trigger when the user
  asks to build, generate, rerun, or regenerate a CFU or quarterly fund/company update, or drops
  source LP letters/reports and asks for the CFU document.
---

# CFU Skill

Produce the quarterly August Group CFU document from a set of GP/manager source files (LP letters,
quarterly reports, fund updates). The output must match the historical CFUs exactly — gold entity
names, navy section banners, August writing voice, correct bullet glyphs, inline italic glosses.

## Architecture

Content and formatting are separated:

- **You (the model)** read the source PDFs/docs and write all prose into `cfu-content.json`,
  following the guide references below.
- **`scripts/build_cfu.py`** turns that JSON into a byte-consistent DOCX — fonts, gold headings,
  navy banners, bullet numbering, and the August header/footer are all enforced by code.

Your only job is correct, on-voice, source-true content. Visual fidelity is automatic.

## Workspace layout

Create a working folder anywhere on your machine — the suggested structure is:

```
CFUs\
  Sources\                   ← drop source PDFs here (current quarter)
  cfu-content.json           ← you write this; builder reads it
  Q# YYYY CFUs - DRAFT.docx  ← output lands here
```

The guide docs, content schema, and gold example outputs are bundled inside this skill:

```
skill/
  guide/
    Q1 2026 CFUs.docx          ← Word base template (header/footer/styles)
    Q1 2026 Fund CFUs.docx     ← gold example: Fund CFUs section
    Q1 2026 Direct CFUs.docx   ← gold example: Direct CFUs section
  references/
    01-document-structure.md
    02-formatting-spec.md
    03-writing-style.md
    04-skeleton-template.md
    content-schema.md
```

Read the gold examples before drafting — they show exactly what the finished output should
look like for funds and directs respectively.

For a new quarter, swap the files in Sources\ and update `template_docx` in the JSON to point
to `guide/Q1 2026 CFUs.docx` (or a newer template if available). The builder only cares about
`cfu-content.json`.

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
   - Start with `Fund Updates` / `General Updates` sub-header.
   - Lead with the snapshot-metrics bullet (positions, net multiple, net IRR for funds;
     valuation/multiple for directs).
   - Add themed sub-headers as the source supports.
   - Use `Key Portfolio Updates` + italic topic headers for individual deal line-items in funds.
   - Apply all conventions from `03-writing-style.md`: date format, tilde approximations,
     inline italic glosses, attribution of forward-looking statements to the manager.
   - Never invent figures. If a metric is absent from the source, omit the bullet.
   - Follow the content-schema.md spec exactly for runs/topics/bullets.

6. **Build the DOCX.** Run:
   ```
   python "<skill-dir>/scripts/build_cfu.py" \
     --content "path/to/cfu-content.json" \
     --out "path/to/Q1 2026 CFUs - DRAFT.docx"
   ```
   Replace `<skill-dir>` with the absolute path to this skill's folder. Adjust content and
   output paths as needed. If `template_docx` is omitted from the JSON, the builder
   automatically uses the template bundled at `guide/Q1 2026 CFUs.docx`.

7. **Review and deliver.** Open the DOCX and confirm:
   - Entity names are gold.
   - Section banners are navy bold caps.
   - Bullets use correct glyphs.
   - Inline italic glosses are present for all jargon.
   - Dates are in `Mon-YY` / `Q#'YY` form.
   - No invented figures.
   Report the output path and any entities where source material was sparse.

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
