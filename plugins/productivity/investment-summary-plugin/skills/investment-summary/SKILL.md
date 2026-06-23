---
name: investment-summary
description: Generate an August Group Investment Summary (.docx) for a single operating company, matching the house deck style (Addepar / Form / Radiant) — teal hero banner, gold "INVESTMENT SUMMARY" label, the Asset Class / Risk / Minimum / Liquidity facts table, small-caps section headings with rules, gold sub-headings, teal-headed financial tables, and the standard section structure ending in Considerations → Risk Factors → Disclaimer. Trigger when the user asks to "make/build/write an investment summary", "do an August summary", "write up [company] as an investment summary", "turn this deck/memo into an investment summary", or hands over source material (a pitch deck, investor model, memo, or notes) on a company and wants the August-style write-up. This is for operating companies (direct/secondary growth-equity deals), not funds.
---

# Investment Summary (August Group house style)

Produces a polished `.docx` investment summary in the **operating-company deck style** of Addepar / Form Energy / Radiant. The look is locked by a golden template + build script; your job is to **gather the inputs, choose the sections that fit the company, write the prose in house voice, assemble a JSON spec, and run the build script.**

## Files in this skill
- `reference/style-and-format.md` — **the full style & writing guide. Read it before writing.** It defines the voice, number/date/citation conventions, palette, fonts, and section playbook.
- `assets/Golden_Template.docx` — the template (five named styles + August logo header + page-number footer). Do not edit; the script clones it.
- `scripts/build_summary.py` — renders a JSON spec into the styled `.docx`.

## Workflow

1. **Read `reference/style-and-format.md`** (especially §1 voice, §1.5–1.7 number/date/citation rules, §4 section playbook, §7 boilerplate). Match it exactly — this is what makes the output indistinguishable from the real summaries.
2. **Gather source material.** Ask the user for / accept: a pitch deck, investor model, memo, teaser, transcript, or notes — plus the deal terms (round, size, valuation, August's entry price/discount/multiple, asset class, minimum, liquidity, SPV manager & fees). If key deal terms are missing, ask for them before building. You may also research public companies to fill gaps (cite sources in the prose).
3. **Choose the section structure** (see below) and **write each section in house voice** — dense, third-person, attributed claims, honest hedging, no hype. (On August Group's own view, see the hard rule below: state it as a neutral observation unless it is backed by actual August diligence.)
4. **Assemble the JSON spec** (schema below) and write it to a temp file.
5. **Run the build script** and return the saved `.docx` path to the user (offer to open it / send it).

## Hard style rules (the output is checked against these — do not violate)

These come straight from the source summaries (Addepar / Form / Radiant). Getting them wrong makes the doc look "off."

1. **Approximations use `~`, never the word "approximately."** Sources use `~` **36–46× each** and the word "approximately" **zero** times. Write `~US$730M`, `~24%`, `~6 months` — not "approximately US$730M". The `~` attaches directly to the value (no space) and also fronts approximate **counts, multiples, and dates** (`~3,000`, `~80x`, `~Mar-22`, `~Q1'26`).
2. **Bullet lead-ins take a colon inside the bold:** `**Cost Leadership:** explanation` — never an em-dash, never spaced. (`**Key Mitigants:**` likewise.) Em-dashes *are* used elsewhere, but **only** as a **closed** (no-space) paired parenthetical aside in running prose — `…complex—particularly private allocations—legacy systems…` — and sparingly (≤11 in a whole doc). En-dashes appear only **spaced** as a label separator (`Name – role`); numeric **ranges use a plain hyphen** (`5-10`, `96-99%`).
3. **Inline cross-references point to THIS document's own numbered Appendix Exhibits** — `*(see Exhibit 1 in Appendix)*` / `*(see Appendix, Exhibit 3)*`. **Never** reference "the deck," "the source materials," or "the slide." If you cite an exhibit inline, that exhibit must exist in the Appendix.
4. **Do not attribute an opinion to "August Group" unless it is backed by actual August diligence.** With only company materials, write analysis as neutral observations ("Notably, the implied valuation sits above the Company's own current-year framework…") rather than "August Group's view is…". The phrase "August Group" should otherwise appear only in the standard Considerations line ("August Group clients will invest…") and the verbatim disclaimer.
5. **Cite the source by name in `Source:` lines and third-party stats** ("Source: [Company] Investor Deck"; "According to [source]…") — but that is different from rule 3's inline *exhibit* cross-references.
6. **Currency follows the company's own reporting currency — not the audience.** In prose use the `US$` prefix; all three reference decks report in `US$`, **including the Canada-distributed Form Energy deck (zero `C$`)**. Use `C$`/`€` only if the company itself reports in that currency. Canadian *distribution* only adds the `For Canadian residents only` footer; it never changes the currency. In **financial tables** use a bare `$` with the unit in the column header (`(US$M)`); write the facts-table minimum as `$100k USD`.
7. **Don't invent missing facts.** If August's entry terms (instrument, price, discount, multiple), the SPV/fee structure, the minimum, or a stated valuation are absent, say so plainly and leave the facts-table value as `TBD`.
8. **Decimal precision is fixed by figure type.** Money magnitudes (`M`/`B`/`T`) take **≤1 decimal** (`US$2.9B`, `US$435.4M`; most are whole); per-share prices take **2** (`US$3.20 per share`). Percentages are **integers** unless sub-integer, then **exactly 1** (`~6.2%`, `~0.7%`) — never 2. **Financial multiples always carry 1 decimal, even when whole** (`8.6x`, `10.0x` — not `10x`); rhetorical "Nx" multipliers are integers (`3x`, `~80x`).
9. **Flag gaps, never fabricate — these summaries are finished in tandem with a human.** Wherever a fact cannot be verified from the available sources (a bio tenure, a date, a school, an unconfirmed identity, an unsourced figure), insert a visible gap marker `[[NEED: …]]` or `[[VERIFY: …]]` **instead of guessing or silently dropping it**. The build script renders `[[…]]` as **bold dark-red text on a yellow highlight**, so the human reviewer sees exactly what is left to complete. This is the standing rule for **team-bio tenures** (often only on LinkedIn, which is hard to read reliably) and for any deck claim you could not corroborate. Keep each marker short and specific: `[[NEED: tenure]]`, `[[VERIFY: which person]]`, `[[NEED: education]]`.

```
python "<skill>/scripts/build_summary.py" spec.json --out "C:/Users/.../Desktop/<Company> - Investment Summary.docx"
```

(On this machine, invoke with the full path to `scripts/build_summary.py`. python-docx must be installed: `pip install python-docx`.)

## Default section structure (operating company)

Render these as `h1` section headings, in this order. **This is the default — adapt to the company:** drop sections it can't support, add sector-appropriate ones, and choose `h2` sub-headings per the business (see §4 of the reference guide). Hardware/asset-heavy deals add **Manufacturing & Supply Chain**; unfamiliar sectors add a primer (e.g. "Nuclear 101"); software adds **Product & Technology → Add-On Products**, etc.

1. **Executive Summary** — (i) what the company is + the problem/market; (ii) the round + August's entry (price, discount, valuation, entry multiple).
2. **Company Overview** — founding, founders, what it does, scale today (employees, customers, capital raised).
3. **Market Overview** — the macro problem & structural shifts; segment and size the market with cited stats.
4. **Product & Technology** — core product, how it works, add-ons, IP, roadmap. *(Add `Manufacturing & Supply Chain` here for hardware.)*
5. **Business Model** — revenue streams, pricing, go-to-market, customer/geographic expansion, contracts & pipeline.
6. **Financial Overview** — KPIs, revenue/ARR, gross margin, EBITDA, unit economics — with a teal `table` block, each sourced.
7. **Competitive Landscape** — market structure, named peers (a comparison `table` if useful), competitive advantages, barriers to entry.
8. **Investment Overview** — current round & capitalization, financing history, future funding & exit.
9. **Key Risks & Mitigants** — see pattern below.
10. **Considerations** — the SPV / fee mechanics (and any deal caveats), as bullets.
11. **Appendix** — numbered **Exhibits** (`h1` "Appendix", then `h2` "Exhibit 1: …", "Exhibit 2: …"). Every source summary has one. Put the **management team & board** bios here as Exhibit 1 in the **deep-bio format** (per-person roles with tenure + education, researched and gap-flagged — see Patterns), and paste source charts/diagrams/timelines/pipelines as `image` exhibits. Inline cross-references (rule 3) must point to these exhibits.

Then always append, verbatim via dedicated blocks: **`risk_factors`** → **`disclaimer`**. (Order: … Considerations → Appendix → Risk Factors → Disclaimer.)

## Patterns

**Key Risks & Mitigants** — one risk per group:
```json
{"type":"h2","text":"Scaling Challenges"},
{"type":"p","text":"Acme must transition from pilot to high-volume production while maintaining quality and cost."},
{"type":"p","text":"**Key Mitigants:** Acme's experienced operations team and phased factory ramp de-risk the transition."}
```
(Use `h2` for the risk name, not an inline newline — keeps justified text from stretching.)

**Considerations** (operating-company / SPV) — bullets, adapt the manager & fees:
```json
{"type":"bullets","items":[
  {"text":"August Group clients will invest in this deal through an SPV set up by [SPV Manager].","level":0},
  {"text":"The SPV will include an annual management fee of 2% of total capital contributed (2 years upfront with the remainder paid upon exit) and 20% carried interest.","level":0}
]}
```

**Appendix exhibits** — a heading plus pasted source graphic:
```json
{"type":"h2","text":"Exhibit 2: Company Timeline"},
{"type":"image","path":"C:/.../ex_timeline.png","source":"Source: [Company] Investor Deck, How We Got Here"}
```
To make exhibit images, render the relevant source-deck page(s) to PNG (e.g. with PyMuPDF: `doc[pageno].get_pixmap(matrix=fitz.Matrix(2.5,2.5)).save(...)`) and pass the path. Team/board can instead be a `bullets` list of bold-name bios.

**Source lines** under any pasted chart/image or table: `{"type":"source","text":"Source: …"}` (renders gold italic).

**Management Team & Board — deep bios (Appendix Exhibit 1)** — the preferred team treatment: one **bold name + title** lead-in per person (level 0), then sub-bullets (level 1) of prior roles *with tenure* and education, closed by a single combined `source` line. Research each person across the deck, the company website, press, and LinkedIn, and corroborate across ≥2 sources where you can. **Where you cannot verify a tenure, school, or role, leave a `[[NEED: …]]` gap flag rather than guessing** (hard rule 9). Reconcile deck-vs-web conflicts in favour of the corroborated source (e.g. a Loblaws history the deck pins on the founder but LinkedIn shows belongs to the CFO) and flag anything still uncertain with `[[VERIFY: …]]`.
```json
{"type":"h2","text":"Exhibit 1: Management Team & Board"},
{"type":"bullets","items":[
  {"text":"**Dave Duronio (Partner & VP Finance and Strategy)**","level":0},
  {"text":"Former Head of Product Management, Marketing & BI at The Mobile Shop / Loblaw (~14-year tenure)","level":1},
  {"text":"M.B.A. from York University","level":1},
  {"text":"B.Com. from [[NEED: school]]","level":1},
  {"text":"**Andy Hay (Partner & Head of Culinary)**","level":0},
  {"text":"Runner-up on MasterChef Canada (Season 5) [[VERIFY: also \"Back to Win\"?]]","level":1},
  {"text":"B.A. in Commerce from Mount Allison University","level":1}
]},
{"type":"source","text":"Source: [Company] Investor Deck, [Company] website, LinkedIn."}
```

**Inline markup** in any text: `**bold**` (bullet lead-ins, with a colon: `**Lead-in:** …`), `*italic*` (cross-references like `*(see Exhibit 1 in Appendix)*`), and `[[…]]` (a **gap flag** — renders bold dark-red on a yellow highlight; use for anything you could not verify, e.g. `[[NEED: tenure]]`, so the human knows exactly what is left to complete — see hard rule 9).

## JSON spec schema

```json
{
  "title": "ACME ROBOTICS",
  "filename": "Acme Robotics - Investment Summary.docx",
  "output_dir": "C:/Users/.../Desktop",
  "banner_image": "C:/path/to/company_logo_white_or_product_photo.png",  // optional; else teal band w/ the title
  "facts": {
    "asset_class": "Direct Investment – Growth Equity",
    "risk_level": "High",
    "minimum_investment": "$100k USD",
    "liquidity": "Illiquid"
  },
  "canadian": false,                                  // true => "For Canadian residents only" note
  "blocks": [
    {"type":"h1","text":"Executive Summary"},
    {"type":"p","text":"Acme Robotics (\"Acme\" or the \"Company\") is ..."},
    {"type":"h2","text":"Core Product"},
    {"type":"bullets","items":[{"text":"**Lead-in**: detail","level":0},{"text":"sub-detail","level":1}]},
    {"type":"table","headers":["US$M","2024A","2025E"],"rows":[["Revenue","82","140"],["EBITDA","(12)","4"]],"emphasis_rows":[1],"source":"Source: Acme Investor Model"},
    {"type":"image","path":"C:/.../ex_chart.png","source":"Source: Acme Investor Deck"},
    {"type":"source","text":"Source: ..."},
    {"type":"risk_factors"},
    {"type":"disclaimer","variant":"short"}
  ]
}
```

Block types: `h1` (section heading), `h2` (gold sub-heading), `p` (body), `bullets` (`items` with `level` 0/1), `table` (teal header; `emphasis_rows` shades/bolds totals; optional `source`), `image` (paste a pre-built exhibit/chart PNG full-width, optional `source`; optional `width_in`), `source` (gold italic), `risk_factors` (verbatim), `disclaimer` (`variant` `short`|`long`, default short).

## Notes
- **Cover is automatic** from `title` + `subtitle` + `facts` + `banner_image`. **Always try to provide a real `banner_image`** — the source summaries never use a plain text band. A company logo (ideally white/knockout) or a product/facility/storefront photo is ideal, and one can usually be **extracted from the source deck** (e.g. render a slide or pull an embedded image with PyMuPDF, pick a wide ~2:1 hero shot). The teal text-band is only a last-resort fallback and it duplicates the title.
- **Tables built by the script** are native Word tables, good for straightforward financials/peers/cap tables. For complex multi-panel exhibits, charts, positioning maps, timelines, or pipelines, paste the source graphic via an `image` block (render the deck page/chart to PNG) and add a `source` line — this matches house practice.
- Keep the voice neutral and third-person; define the short name + acronyms in quotes on first use; money as `US$`/`€`/`C$`, dates as `Mon-YY`, multiples as `x`, approximations as `~` (never the word "approximately"); attribute management claims. State an August Group view only as a neutral observation unless backed by actual diligence (see Hard style rules).
- Use the **short** disclaimer for standard operating-company SPV deals; **long** for the Addepar-style variant.
