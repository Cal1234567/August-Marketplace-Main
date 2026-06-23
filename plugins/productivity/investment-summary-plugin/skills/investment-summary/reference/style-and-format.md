# August Group — Investment Summary Style & Format Guide

> The single source of truth for writing and formatting an **August Group Investment Summary**.
> Derived 1:1 from four reference documents: **Addepar**, **Form Energy**, **Radiant Industries** (operating-company summaries) and **Sisyphus Ventures** (fund/manager summary).
> Goal: a new summary should be visually and editorially indistinguishable from these four.

---

## 0. What this document is

An Investment Summary is a **factual, institutional overview of a single investment opportunity** prepared by The August Group Capital Limited ("AGC" / "August Group") for sophisticated/accredited clients. It is *not* a sales document and *not* a personal opinion piece. It reads like a sell-side equity research note crossed with a private-placement memorandum: dense, neutral, third-person, heavily structured, and conservative.

Two structural variants exist. Pick one before writing:

| Variant | Use when the investment is… | Reference example |
|---|---|---|
| **Operating-company summary** | A direct/secondary stake in a single operating business (growth equity, a SPV into one company) | Addepar, Form Energy, Radiant |
| **Fund / manager summary** | A commitment to a fund or manager (VC/PE vehicle) | Sisyphus Ventures |

Most of this guide is shared. Section-order differences are called out in **§4**.

---

## 1. House voice & writing style (the most important section)

The writing is the hardest thing to copy. Internalize these rules; every sentence in the references obeys them.

### 1.1 Voice & person
- **Third person, always.** The subject is "the Company," "the Manager," or "the Fund" — never "we"/"our" except in the boilerplate disclaimer and in the explicit *August Group view* sentences (see §1.8).
- **Define the short name on first use, in quotes:**
  - Company: *"Addepar (or the "Company")…"*, *"Form Energy ("Form" or the "Company")…"*
  - Fund/Manager: *"Sisyphus Ventures ("Sisyphus" or the "Manager")…"*, *"Sisyphus Ventures I ("SVI" or the "Fund")…"*
  - Every acronym is defined on first use the same way: *software-as-a-service ("SaaS")*, *long-duration energy storage ("LDES")*, *Nuclear Regulatory Commission ("NRC")*, *registered investment advisers ("RIAs")*.
- After defining, use the short form consistently for the rest of the document.

### 1.2 Tense & register
- Present tense for what the business *is* and *does*; past tense for history; future/conditional for projections ("is projected to," "is expected to," "could," "would").
- Formal, complete sentences. No contractions. No exclamation points. No rhetorical questions. No second-person ("you").
- Long, multi-clause sentences are the norm — but each carries real information. Avoid empty adjectives ("amazing," "incredible," "game-changing"). Strength is shown with facts and qualifiers, not hype.

### 1.3 Paragraph rhythm
- Each subsection opens with a **topic paragraph** that states the claim, then 1–3 supporting paragraphs that substantiate it with specifics (numbers, customers, dates, mechanisms).
- Dense prose paragraphs for narrative; **bulleted lists** for: feature sets, competitive advantages, barriers to entry, segment definitions, risk/mitigant pairs, team bios, financing-round histories, product configurations.

### 1.4 Bullets
- Bullets frequently use a **bold lead-in label** followed by a **colon** (inside the bold), then the explanation — not an em-dash:
  - *"**Data Aggregation & Reconciliation:** Addepar excels in consolidating complex financial data…"*
  - *"**Cost Leadership:** By leveraging abundant minerals like iron, Form's batteries can store energy at less than 1/10th the cost of LIBs…"*
- Sub-bullets (one indent level) are used for nested detail (e.g., the three 45X credit types under one bullet).
- Risk sections pair a risk bullet/subhead with a **"Key Mitigant(s):"** lead-in (Radiant style) or a mitigation paragraph immediately after (Addepar/Form style).

### 1.4a Dashes & punctuation — exact usage (counted in the references)
These were counted character-by-character across the three operating-company references. Match them precisely — this is where summaries most often read "off."
- **Em-dash `—` (U+2014): permitted and used — but ONLY for a paired parenthetical aside inside a sentence, set CLOSED (no spaces on either side).** Counts: Addepar 11, Form 6, Radiant 3 — a light seasoning, not a habit (Addepar is the heaviest user; Radiant barely touches them).
  - *"As investment portfolios become increasingly complex—particularly with the rise of private market allocations—legacy systems struggle with data standardization…"*
  - *"…a liquidity event valuing Addepar at ~US\$3B—assuming no further dilution—would result in a breakeven or profitable outcome…"*
  - **Never** use an em-dash as a bullet lead-in separator (that is always a colon, §1.4), and **never** put spaces around it.
- **En-dash `–` (U+2013): two uses only —**
  - **Spaced ` – ` as a label/definition separator** in exhibit lists, captions, team bios, and financing lines: *"Addepar Trading (2024) – Comprehensive trading and rebalancing tool"*, *"Romeo Jaramillo & Ted Wiley – Form Energy co-founders"*, *"Co-Investment Opportunity – Fall 2025"*.
  - Occasionally **unspaced inside a numeric range** (`1–5`, `3–5`) — but the **hyphen is the house default for ranges** (see §1.5), so prefer the hyphen.
- **Minus sign `−` (U+2212): never used** (zero occurrences). Negative numbers in tables are written in **parentheses** — `($296M)` — never with a minus.
- **Hyphen `-`** carries ranges (`5-10`, `96-99%`, `1,000-1,600`, `3.5-15`), compound modifiers (`first-of-a-kind`, `behind-the-meter`, `multi-day`, `~4-year`, `take-or-pay`), and nothing fancier.
- **Ampersand `&`** is used freely in headings, compound labels, and team lines (`Product & Technology`, `Data Aggregation & Reconciliation`, `A & B`) — do not spell out "and" in those.
- **Fractions** use a slash and keep the ordinal: `1/10th the cost`, `1/8`, `24/7`.

### 1.5 Numbers, units & money — exact conventions
Copy these precisely; they are highly consistent across all four documents.

- **Currency — prose vs. tables (verified):**
  - **In prose, use the `US$` prefix, no space:** `US$230M`, `US$7T`, `US$730M`, `US$2.9B`. Per-share / per-unit prices spell out the unit and take **2 decimals**: `US$3.20 per share`, `US$35 per kWh`.
  - **In financial tables, use a bare `$`** with the magnitude carried in the column-header unit label (`(US$M)`): `$1.2B`, `$117.1M`, `$435.4M`. Inside a projection table, keep a trailing `.0` for column consistency (`$4.0B`, `$7.0B`).
  - **The facts-table minimum is written `$100k USD` / `$75k USD`** — bare `$`, lowercase `k`, a space, then `USD`.
- **Currency follows the COMPANY's own reporting currency — not the audience.** All three operating-company references report in **US$**, including Form Energy, which is the **Canada-distributed** deck and still contains **zero `C$`**. Use `C$` or `€` only when the company itself reports in that currency. Canadian *distribution* changes only the `For Canadian residents only` footer (§2.4); it never changes the currency.
- **Decimals (money):** magnitude figures (`M`/`B`/`T`) carry **at most 1 decimal** (`US$2.9B`, `US$27.1M`, `US$435.4M`); most are whole (`US$730M`, `US$350M`). Per-share prices carry **2** (`US$3.20`). A large round figure may keep `M` with a thousands comma rather than switching to `B` (`US$1,850M`).
- **Approximations use `~`, NOT the word "approximately."** The reference docs use `~` **36–46× each** and the word "approximately" **zero times**. Write `~US$730M`, `~24% CAGR`, `~6 months`, `~3,000 clients`. The `~` attaches directly to the value (no space) and also fronts approximate **counts, multiples, and dates** (`~550k`, `~80x`, `~Mar-22`); use `a ~8.6x` (not `an ~8.6x`).
- **Magnitude suffixes:** `k`, `M`, `B`, `T` (thousand/million/billion/trillion). Lowercase `k`, uppercase `M/B/T`.
- **Percentages:** **integers by default** (`10%`, `25%`, `49%`, `100%`). Use a decimal **only when sub-integer precision matters, and then exactly 1 place** (`~6.2%`, `~0.7%`) — never 2. Ranges use a **hyphen** with a single `%` at the end (`~96-99%`, `5-10%`); front with `~` if approximate.
- **Ranges:** the **plain hyphen is the house default** (`5-10`, `1,000-1,600`, `36-160`, `3.5-15`); en-dash and the word `to` (`0.3 to 2 bps`) appear occasionally. No spaces around a numeric-range hyphen.
- **Multiples — two kinds, different precision:**
  - **Financial multiples (entry multiple, MOIC, ARR multiple): always 1 decimal, even when whole** — `11.3x LTM / 8.6x NTM ARR`, `12.6x`, `10.0x`, `5.4x gross MOIC`. (The kept `.0` in `10.0x` is the tell — do not write `10x` for a financial multiple.)
  - **Rhetorical "Nx" multipliers: integer** — `3x global nuclear capacity`, `43x`, `~80x more`.
  - Always lowercase `x`, no space, in both cases.
- **"+" for "or more":** `1,100+ clients`, `US$7T+`, `300+ custodians`, `100 MW+`, `500+ MW`.
- **Counts spelled vs. numerals:** small counts in running prose are often written as digits when technical (`3 electrodes`, `2 projects`, `7 projects`); "2 key dynamics," "3 core components." Follow the references — they lean numeral-heavy for anything quantitative.
- **Units:** `MWe`, `MW`, `GW`, `TW`, `MWh`, `GWh`, `TWh`, `kWh`, `bps`, `sq ft` / `sqft`, `GWe`. Space between number and unit (`~1 MWe`, `~550k sqft`), except currency/percent.
- **"x" multipliers in text:** `3x global nuclear capacity`, `4x U.S. nuclear capacity`, `~80x more hourly time steps`.
- **Basis points:** `0.3 to 2 bps`, `~300 bps annual improvement`.

### 1.6 Dates
- **Month-Year short form with hyphen and 2-digit year:** `May-26`, `Oct-23`, `Apr-23`, `Sep-25`. The house standard for as-of, financing, and milestone dates. (Radiant uses it throughout; Addepar leans on quarters and Form on full dates — **pick one date convention per document and hold it.**)
- **Approximate dates take the tilde too:** `~Mar-22`, `~Q1'26`.
- Quarters: `Q4'25`, `Q2'24`, `Q1'26` — `Q` + quarter + apostrophe + 2-digit year.
- **Full "Month YYYY"** (`May 2023`, `September 2024`) is fine in running prose for a specific narrative event; reserve `Mon-YY` for compact/as-of references and tables.
- Full years for ranges and history: `2017-2020`, `1970s-1990s`, `Founded in 2017`, `by 2030`, `by 2050`.
- "As of May-26, the Fund had…" is the canonical as-of construction.

### 1.7 Citations & sourcing (do not skip)
Sourcing discipline is a hallmark of the house style.
- **Inline cross-references** to the appendix, in italics, parenthetical:
  - Operating-company style: *"(see Exhibit 1 in Appendix)"* / *"(see Appendix, Exhibit 1)"* / *"(see Exhibits 13 & 14 in the Appendix)"*.
  - Fund style references inline sections: *"(see Investment Case Study below)"*.
- **Source lines** under every table, chart, and exhibit — small, gold/bronze, italic, prefixed `Source:`
  - *"Source: Addepar's Investor Model, Series G"*
  - *"Source: Form Energy Investor Model, Series F"*
  - *"Source: Equity Research and August Research"*
  - *"Source: Sisyphus Schedule of Investments. Note that entry and latest valuations are post-money."*
- When a third-party stat is cited in prose, name the source: *"According to PitchBook, global defense technology venture activity reached US$49.9B…"*, *"McKinsey projects that in a net-zero scenario…"*, *"a segment projected to reach ~US$23T by 2026 according to WestCap."*

### 1.8 August Group's independent view (critical editorial signature)
The summary is **balanced**: it presents management's/the manager's case, then layers an independent, often more skeptical, assessment. This is what separates it from a pitch deck.
- Attribute management claims explicitly: *"Management expects…," "the Manager believes…," "the Company plans to…," "Boucher noted that…," "During a call with August Group, Boucher described…."*
- **Only attribute a view to August Group when it is backed by the firm's actual diligence** (a call, independent research, materials reviewed by the firm). The reference summaries earn those lines — *"During a call with August Group…," "August Group's view is that…"* — because diligence happened.
- **When you are working only from the company's own materials (no August diligence), do NOT fabricate a firm view.** Write the same analysis as a **neutral observation** instead: *"Notably, the implied valuation sits above the Company's own current-year framework…," "the great majority of the modelled value sits in years not yet delivered."* The analysis still belongs in the doc — just not falsely attributed to the firm.
- The **Key Risks & Mitigants** and **Considerations** sections are where the doc is most candid about what could go wrong. Never omit them and never soften them into marketing.
- Hedge honestly: "largely unproven at institutional scale," "remains an emerging manager with a limited investing track record," "while the model is mathematically achievable…." Confidence is earned, not asserted.

### 1.9 Terminology consistency
- "the Company" / "the Manager" / "the Fund" / "the Round" — capitalized defined terms.
- "behind-the-meter," "go-to-market," "first-of-a-kind," "take-or-pay," "least-cost," "walk-away passive safety" — keep hyphenation consistent with the references.
- Spell out then abbreviate: NRC, DoE/DOE, DoD, IRA, ITC, LDES, SDES, ESS, MOU, PPA, SPV, LPA, MOIC, ARR, ARPA, CAGR, EBITDA, KPI.

### 1.10 Management team & board — deep bios, research & gap-flagging
The team exhibit (usually **Appendix Exhibit 1**) is written as a **deep bio per person**, not a one-liner: a bold **name + title** lead-in, then sub-bullets of prior roles *with tenure* and education, closed by one combined `Source:` line. The model:

> **Dave Duronio (Partner & VP Finance and Strategy)**
> • Former Head of Product Management, Marketing & BI at The Mobile Shop / Loblaw (~14-year tenure)
> • M.B.A. from York University
> • B.Com. from `[[NEED: school]]`
> *Source: [Company] Investor Deck, [Company] website, LinkedIn.*

**Research protocol (do this per named person):**
1. Start with the **deck and the company website** for the name, current title, and any stated history.
2. **Search the open web and LinkedIn** for prior roles, tenures, and education; the company's own LinkedIn "meet the team" posts and press/alumni records are often richer than its website.
3. **Corroborate across ≥2 sources** where you can, and confirm you have the *right* person (disambiguate common names against the company).
4. **Reconcile deck-vs-web conflicts in favour of the corroborated source.** (Real example: the HARVEST deck pinned The Mobile Shop / Loblaw rollout on the founder, but LinkedIn and the company's own post show that history belongs to the VP Finance — the web wins, and the deck-only version was wrong.)

**Gap-flagging (the load-bearing rule — these docs are finished with a human):**
- These summaries are always completed in tandem with a person, so **leave a visible to-do wherever you could not verify something** rather than inventing it. Use the inline gap marker **`[[NEED: …]]`** (missing fact) or **`[[VERIFY: …]]`** (uncertain/needs confirming). The build script renders `[[…]]` as **bold dark-red on a yellow highlight**, so the reviewer can scan or Ctrl-F straight to what is open.
- This is the **default for exact tenures** ("16-year", "6-month") — they come from LinkedIn employment dates, which are not always reliably readable; never estimate a tenure. Write the role and flag the number: `…at TELUS [[NEED: tenure]]`.
- Keep markers short and specific: `[[NEED: tenure]]`, `[[NEED: education]]`, `[[VERIFY: which person]]`, `[[NEED: confirm role]]`.
- The same flag is valid anywhere in the doc — any deck figure or claim you could not corroborate — not only in bios.

---

## 2. Brand & visual identity (exact spec)

### 2.1 Color palette
> **Authoritative source = the Sisyphus `.docx` theme** (this is the golden template — see §11). The values below are taken from its `theme1.xml`. The teal is a **PDF-cover-only** treatment used on the operating-company decks and is *not* part of the editable Word template's text palette.

| Role | Color | Hex | RGB | Theme slot | Where used |
|---|---|---|---|---|---|
| **Ink — Navy** | near-black navy | `#000825` | (0, 8, 37) | `dk2` | Section headings (H1), "AUGUST GROUP" wordmark |
| **Accent — Gold/Bronze** | muted gold | `#B29659` | (178, 150, 89) | `accent3` | Logo "A" mark, sub-headings (H2), **all `Source:` lines**, callout boxes/highlights |
| **Black** | black | `#000000` | (0,0,0) | `dk1` | Title text, body copy |
| **Slate (rule/secondary)** | slate gray-blue | `#4D5265` | (77, 82, 101) | `accent1` | Built-in heading color, dotted H2 rule (tinted → `#8D93A8`) |
| **Gray (muted)** | medium gray | `#8C8C8C` | (140,140,140) | `accent2` | De-emphasized logos/labels in exhibits |
| **Table/neutral fill** | light gray | `#C8C8C8` | (200,200,200) | `lt2` | Table fills, banner-facts cells |
| **White** | white | `#FFFFFF` | — | `lt1` | Knockout text on dark fills |
| *(PDF cover only)* **Pine/Teal** | dark teal-green | `#1C4849` | (28, 72, 73) | — | Operating-company hero-banner background + financial-table header rows **in the PDF decks**; not in the Word text template |

Other theme accents exist but are rarely used in body content: `accent4 #FFC20E` (amber), `accent5 #8DC63F` (green), `accent6 #EC1C24` (red). Charts/exhibits stay within **navy / gold / gray** (teal added only on the operating-company PDF decks) — never bright primaries.

### 2.2 Typography (locked to the template)
Theme **major & minor fonts are both Arial** — so everything defaults to Arial except the title.

| Element | Font | Size | Weight / effect | Color |
|---|---|---|---|---|
| **Title** | **Calibre Semibold** | **26 pt** (sz 52 half-pt) | tight tracking (−10) | `#000000` |
| **Section heading (H1)** | Arial | **11 pt** (sz 22) | **bold, SMALL CAPS** | navy `#000825` |
| **Sub-heading (H2)** | Arial | ~11 pt (inherits) | **bold + italic** | gold `#B29659` |
| **Body** | Arial | **10 pt** (sz 20) | regular | `#000000` |
| **Bullets** | Arial | 10 pt | regular | `#000000` |
| **Source lines** | Arial | small (~8 pt) | italic | gold `#B29659` |
| **Doc default** | Arial | 11 pt (sz 22) | — | — |

- If **Calibre Semibold** isn't installed, fall back to **Arial Bold** for the title (it's the only non-Arial face in the document).
- Italics are reserved for source lines, inline cross-references, and H2 sub-headings.

### 2.3 The August Group logo lockup (top of every page)
- Lives in the **page header**, repeated on **every** page (in the template it's the embedded PNG `media/image3.png`, 2641×414 px).
- Composition: gold/bronze serif **"A" mark** → thin navy vertical divider rule → **"AUGUST GROUP"** wordmark in navy `#000825`, uppercase, generously letter-spaced.
- Reuse the exact PNG from the template rather than recreating it.

### 2.4 Page setup (from the template's `sectPr`)
- **US Letter** portrait (12240 × 15840 twips = 8.5″ × 11″). Single column.
- **Margins: 0.5″ all sides** (720 twips top/right/bottom/left). Header 0.5″ (720), footer 0.4″ (576). *(The tighter 0.5″ margin is deliberate — it gives the dense prose more width.)*
- **Page number** in the footer (`1`, `2`, …).
- **Jurisdiction line** (when applicable): a small `For Canadian residents only` line in the footer/inner-page header for the Canada-distributed variant. Include only when distributed under that restriction.

---

## 3. The cover / first page

> **Build decision (locked):** this skill uses the **operating-company deck cover** (Addepar / Form / Radiant), built automatically by the script: page-header logo → **teal hero banner** (company logo/photo, or a teal band with the company name) → **title** (`TitleSummary`) → gold **"INVESTMENT SUMMARY"** label → **4-column facts table** (Asset Class / Risk Level / Minimum Investment / Liquidity) → first H1 (`EXECUTIVE SUMMARY`). See §11.4.
>
> ```
> ┌─ AUGUST GROUP ─────────────┐   (logo PNG in page header)
> │ ████ ACME ROBOTICS ████████ │   ← teal hero banner (logo/photo or band)
> │  ACME ROBOTICS             │   ← TitleSummary (Calibre Semibold 26pt)
> │  INVESTMENT SUMMARY        │   ← gold label, letter-spaced
> │ ┌Asset│Risk│Min.│Liquid┐   │   ← facts table (gray fill, gold rule)
> │ EXECUTIVE SUMMARY          │   ← SubheaderSummary (H1) + rule
> │ Acme Robotics ("Acme")...  │
> └────────────────────────────┘
> ```
>
> *(The bare fund-style cover — title straight into the first section, no banner/label/facts — is the Sisyphus convention and is no longer used by this build.)*

The deck cover stack, top to bottom:

1. **August Group running header** (logo lockup, top-left).
2. **Hero banner** — full-content-width block, ~30–40% of page height. Two accepted treatments:
   - **(a) Logo-on-teal:** the target company's logo, white/knockout, centered on the `#1C4849` teal field (Addepar).
   - **(b) Hero photo:** a full-bleed product/facility photograph with a small August "A" watermark in a corner (Form Energy = factory aerial; Radiant = reactor module render).
3. **Title** — the investment name, large and bold.
   - Operating company: company name (e.g., **ADDEPAR**, **FORM ENERGY**, **RADIANT INDUSTRIES**).
   - Fund: fund/vehicle name (e.g., **Sisyphus Ventures I**).
   - Case treatment: Addepar/Form use bold ALL-CAPS sans; Radiant uses **bold small-caps serif-style**. Either is on-brand — match the heading style you choose in §5.
4. **"INVESTMENT SUMMARY"** label — directly under the title, **gold (`#BC985A`)**, uppercase, letter-spaced, smaller than the title.
5. **Banner facts table** — a single 4-column table (see §6.1) summarizing the deal terms.
6. **First section heading** (`Executive Summary`) and body begins.

---

## 4. Section structure (DYNAMIC — chosen per company)

> **Core principle: section headers are not fixed and are not copied from Sisyphus.** They are generated dynamically to fit the **company type / sector / deal**. What stays constant is the *styling* (every section heading is `SubheaderSummary`/H1, every sub-heading is `Subheading2`/H2), the *voice & conventions* (§1), and the *end-matter boilerplate* (Considerations → Risk Factors → Disclaimer). Everything between the title and the boilerplate — which sections exist, what they're called, their order, and their sub-headings — is selected to suit the business.
>
> The lists below are **a starting palette, not a checklist.** Add, drop, rename, reorder, merge, and split sections so the structure reads naturally for *this* company. A vertical-SaaS deal, a hardware/manufacturing deal, a marketplace, a biotech, and a fintech should each end up with a visibly different section set.

**How to choose sections for a given company (heuristics):**
- Always anchor with **Executive Summary** first and **Key Risks & Mitigants** near the end, then the **end-matter boilerplate** last.
- Pull in a section only if the company gives it substance. Examples of conditional sections:
  - **Manufacturing & Supply Chain** → only for hardware / asset-heavy businesses (Form, Radiant) — omit for pure software.
  - **Sector primer** (e.g., *Nuclear 101*, *Energy Storage Market Overview*) → only when the reader needs educating on an unfamiliar domain.
  - **Add-On Products / Product Suite** → multi-product software; **Unit Economics** → hardware or transactional models; **Regulatory Pathway** → regulated sectors (nuclear, defense, health, fintech).
  - **Contracts & Pipeline**, **Manufacturing**, **IP & Patents**, **Go-to-Market** → include when material to the thesis.
- Name sections in the company's own terms (e.g., *Form Energy's Technology & Products*, *Radiant's Business Model*) — the references frequently prefix the company name.
- Sub-headings (H2) are likewise company-specific (e.g., *Core Product* / *Add-On Products* vs. *Iron-Air Battery* / *Formware* / *Manufacturing*).

### 4.1 Operating-company palette (Addepar / Form / Radiant) — adapt, don't copy
1. **Executive Summary** — 2 short paragraphs: (i) what the company is + the problem/market in one breath; (ii) the round being raised and August Group's entry (price, discount, valuation, entry multiple).
2. **Company Overview** — founding story, founders, what it does, scale today (employees, customers, capital raised), leadership (pointer to team exhibit).
3. **Market Overview** — the macro problem and structural shifts creating the opportunity; segment the market; size it with cited stats. (May include primer subsections, e.g. Radiant's *Nuclear 101* / *Nuclear Market Landscape*; Form's *Overview of the Electrical Grid* / *Energy Storage Market* / *Regulatory Environment*.)
4. **Product & Technology** — core product, add-ons, how it works, IP, roadmap, manufacturing/supply chain (asset-heavy businesses get a dedicated *Manufacturing & Supply Chain* section).
5. **Business Model** — revenue streams, pricing, go-to-market, customer/geographic expansion, contracts & pipeline.
6. **Financial Overview** — KPIs, revenue/ARR, gross profit/margins, EBITDA, unit economics, capex (with charts/tables; every figure sourced to the investor model).
7. **Competitive Landscape** — market structure, named peers (often a comparison table), the company's competitive advantages, barriers to entry.
8. **Investment Overview** — current round & capitalization, financing history, future funding & exit.
9. **Key Risks & Mitigants** — each risk as a subhead/bullet with a mitigant.
10. **Considerations** — the SPV/fee mechanics (and any deal caveats). *(In the fund variant this becomes a substantive risk-discussion section — see §4.2.)*
11. **Appendix** — numbered **Exhibits** (team & board bios, financing history, market charts, technical diagrams, peer tables).
12. **Risk Factors** — boilerplate (verbatim, §7).
13. **Disclaimer** — boilerplate (verbatim, §7).

### 4.2 Fund / manager summary (Sisyphus)
1. **Manager Overview** — what the firm is, who founded it, the fund being raised (size, stage, geography, check size), deployment/commitments to date.
   - **Team Overview** (sub) — Founder/Managing Partner bio, Advisors, with tenure-tagged bullets.
2. **Investment Philosophy & Approach** — the thesis and worldview; what the manager believes and why.
3. **Sourcing & Value-Add** — how deals are found and how the manager helps (hiring, procurement, intros).
4. **Fund Overview** — vehicle terms, target categories, portfolio construction (number of companies, check sizes, ownership targets), the base-case return model **with August Group's critique of it**.
   - **Current Portfolio** (sub) — each position: thesis one-liner, check size, co-investors, current mark (MOIC).
   - **Investment Case Study** (sub) — one position in depth.
   - **Key Terms** (sub) — carry/waterfall/hurdle, fund admin/platform.
5. **Track Record** — prior performance (with a schedule-of-investments table); flag concentration honestly.
6. **Considerations** — the substantive risk section, broken into subheads: **Limited Track Record**, **Market Competition / Valuation / Underwriting**, **Team & Key Person Risk**, etc.
7. **Disclaimer** — boilerplate (the fund variant uses the longer prose disclaimer, §7.3).

> Note: the fund variant's *Considerations* is a multi-paragraph risk analysis (not just SPV fee mechanics). The operating-company *Considerations* is short and mechanical. Don't conflate them.

---

## 5. Heading hierarchy & treatment

| Level | Example | Treatment |
|---|---|---|
| **Title** | `RADIANT INDUSTRIES` / `Sisyphus Ventures I` | Largest, bold. ALL-CAPS sans **or** bold small-caps. Black/navy. |
| **"INVESTMENT SUMMARY" label** | — | Gold `#BC985A`, uppercase, letter-spaced, small. Cover only. |
| **Section heading (H1)** | `EXECUTIVE SUMMARY`, `FINANCIAL OVERVIEW`, `Considerations` | Bold, navy/black. **Full-content-width thin horizontal rule directly beneath.** Two valid cases: **ALL/SMALL-CAPS** (Radiant) or **Title Case** (Addepar/Form). Pick one per document. |
| **Sub-heading (H2)** | `Unit Economics`, `Core Product`, `Team Overview`, `Revenue Streams` | Smaller, **no rule**. Gold `#BC985A` (Radiant) **or** bold black (Addepar/Form). |
| **Sub-sub / bullet lead-in** | `Operational Unit (Initial Product)`, `Natural Uranium:` | Bold inline lead-in within a bullet or short line. |

**Recommended default for new documents:** Radiant template — small-caps bold navy section headings with a rule; gold sub-headings; Arial body. It is the most recent and cleanest.

---

## 6. Tables & charts

### 6.1 The banner facts table (cover)
A single 4-column, 2-row table summarizing the deal:

| Asset Class | Risk Level | Minimum Investment | Liquidity |
|---|---|---|---|
| Direct Investment – Growth Equity | High | $100k USD | Illiquid |

- **Header row:** light-gray fill, **bold navy** column labels, centered. A **gold rule** runs directly beneath the header row.
- **Value row:** light-gray fill, gray/black centered values.
- Typical values seen: Asset Class = `Direct Investment – Growth Equity`; Risk Level = `High`; Minimum Investment = `$75k USD` / `$100k USD`; Liquidity = `Illiquid`. Adjust per deal.

### 6.2 Data / financial tables
- **Header row(s):** solid **teal `#1C4849`** background, **white bold** text. Group headers (e.g., `Actuals` vs `Projected`, `Operational Reactor` vs `Installation Reactor`) sit in a teal band spanning their columns.
- **Row labels:** left-aligned; a units column in parentheses (`(US$M)`, `(%)`, `(#)`).
- **Emphasis rows:** key totals/subtotals (`Reactors Sold`, `Gross Profit`, `EBITDA`, `Total ARR`) get a **shaded fill** (pale teal/gray) and/or bold to stand out.
- **Right-edge callout:** a **gold** CAGR / summary column (e.g., `'24-'29E CAGR`) when relevant.
- Numbers right-aligned; negatives in parentheses `($296M)`; `--` or `n.a.` for not-applicable.
- **Source line** in gold italic immediately below the table.

### 6.3 Charts
- Built in the brand palette (teal primary, gold accent, grays; muted blue sparingly).
- Common types: stacked column (cost/COGS roadmaps), revenue-vs-cost waterfall-style EBITDA bridges, growth-trajectory columns, simple comparison bars.
- Always carry a **gold italic `Source:` line**.
- Data labels on bars; legend below or beside; clean gridlines, no chartjunk.

### 6.4 Comparison / matrix tables (competitive landscape, tech families)
- Teal header, left-hand row labels, one column per peer/technology.
- The subject company's column may be **highlighted** and annotated with gold callout labels (e.g., *"Radiant's Technology," "Radiant's Fuel"*) with light dotted leader lines.
- Footnote-style bullet notes inside cells are acceptable for dense peer detail.

---

## 7. Boilerplate (use verbatim)

### 7.1 Considerations — operating-company / SPV variant
Short, mechanical. Adapt the SPV manager name and fee terms to the deal. Examples:

> - August Group clients will be investing in this deal through a Limited Partnership SPV set up by [SPV Manager].
> - This SPV will include an upfront payment of 4% to cover 2 years of 2% management fees, as well as 20% carried interest.

or (Radiant form):

> - August Group clients will invest in this deal through an SPV set up by [SPV Manager].
> - The SPV will include an annual management fee of 2% of total capital contributed (2 years upfront with the remainder paid upon exit) and 20% carried interest.

### 7.2 Risk Factors (operating-company variant) — verbatim
> - Growth equity capital investing involves a high degree of business and financial risk that can result in substantial losses.
> - An investment in this SPV/fund is highly speculative, involves a high degree of risk and could result in the loss of part or all of a Limited Partner's capital contribution. Therefore, Limited Partners should not subscribe for LP Interests unless they can bear such a loss. Moreover, there can be no assurance that the fund's investment objectives will be achieved, and investment results may vary materially from one reporting period to the next. Consequently, an investment in the fund is suitable only for sophisticated investors with substantial other assets who are capable of making an informed independent decision as to the risks involved in an investment in the fund.

### 7.3 Disclaimer — short (operating-company / Form & Radiant) — verbatim
> - The information contained in this material is subject to change without notice and August Group Capital will not be held liable for any inaccuracies or misprints. The information within this Investment Summary is meant for informational purposes and is not meant to elicit an individual investment. Information is taken from sources believed to be accurate.
> - August Group Capital is a registered Portfolio Manager with the Autorité des Marchés Financiers (Quebec), Ontario Securities Commission, Alberta Securities Commission, British Columbia Securities Commission, the Manitoba Securities Commission, and a Registered Investment Advisor with the U.S. Securities and Exchange Commission.
> - The SPV manager in question is not an affiliate of August Group Capital. More information may be obtained by contacting August Group Capital (the registrant).

### 7.4 Disclaimer — long (Addepar / fund variant) — verbatim
> - This Investment Summary is intended to be a factual overview of an investment, provided to you for informational purposes. The information contained in this Investment Summary is derived from sources that we believe to be reliable and accurate, including information received from the SPV/Fund and/or companies related to the SPV/Fund. The August Group Capital Limited makes no representations or warranties as to accuracy, completeness or reliability of such information, and will not be held liable for any inaccuracies or misprints derived from such information.
> - This Investment Summary is not intended to be, and should not be taken to be, an offer to sell or a solicitation of an offer to buy the investment that is the subject of the Investment Summary, or any other investment. Investing your money in investment products involves the risk of loss, and past performance of investment products is not a guarantee of future returns.
> - This Investment Summary is confidential and intended solely for the use of the individual or entity to whom it is addressed. Any unauthorized review, use, disclosure, or distribution is prohibited. If you are not the intended recipient, please contact the sender and destroy any copies that may have been inadvertently sent to you.
> - August Group Capital is a registered Portfolio Manager with the Autorité des Marchés Financiers (Quebec), Ontario Securities Commission, Alberta Securities Commission, British Columbia Securities Commission, the Manitoba Securities Commission, and a Registered Investment Advisor with the U.S. Securities and Exchange Commission.

> The fund-variant disclaimer (Sisyphus) is the same in substance, attributed to "The August Group Capital Limited ("AGC")" and adds the registration sentence: *"AGC is registered as a portfolio manager in Alberta, British Columbia, Manitoba, Ontario and Quebec, and is registered as an investment adviser in the United States."*

---

## 8. Worked phrasing patterns (lift these constructions)

Use these as fill-in templates — they capture the exact cadence of the house voice.

**Executive Summary — sentence 1 (what it is + problem):**
> [Company] ("[Short]" or the "Company") is a [geography]-based [category] [developing/offering] [product], designed to [solve problem]. As [macro trend], [legacy approach] [falls short]. [Company]'s approach is [differentiator].

**Executive Summary — sentence 2 (the round + entry):**
> [Company] is [in the process of] raising a [US$X] Series [N] [preferred equity] round at a [US$Y] pre-money valuation to [use of proceeds]. August Group will invest in [common shares] at [~US$Z per share], a [~10%] discount to the Series [N], representing an [11.3x LTM / 8.6x NTM ARR] entry multiple.

**Company Overview — founding:**
> Founded in [year] by [founders], [Company] was created to address [problem]. [Founder background sentence]. Since [milestone], [Company] has [scaled to N employees / N clients / US$X raised].

**Market sizing with citation:**
> According to [source], [market metric] reached [US$X] across [N] [deals/units] in [year], [growth qualifier], while [secondary metric] increased from [A] to [B] year-over-year.

**Financials — projection:**
> [Metric] is projected to grow at a [~30%] CAGR from [year] to [year], reaching [US$X], with [driver] accounting for the majority of this growth.

**Competitive advantage bullet:**
> - **[Advantage]:** [Company] [verb] [specific capability], [evidence/proof point], [why it matters / moat].

**Risk + mitigant (Radiant style):**
> **[Risk Name]**
> [1–2 sentences describing the risk and what could go wrong.]
> Key Mitigant(s): [What de-risks it — structural, team, policy, or strategic.]

**August Group's independent view:**
> While [the Manager/management] [believes/expects X], August Group's view is that [the outcome is dependent on / remains unproven because] [specific execution-sensitive assumptions].

**Fund — as-of deployment:**
> As of [Mon-YY], [the Fund] has deployed [US$X] across [N] portfolio companies, [N] of which have subsequently raised follow-on financings led by tier-1 venture firms including [names].

---

## 9. Pre-flight checklist

Before a summary is "done," verify:

- [ ] Operating-company deck cover (§3 / §11.4): logo header → hero banner (logo/photo, or teal band) → `TitleSummary` title → gold "INVESTMENT SUMMARY" label → 4-column facts table → first H1 (`EXECUTIVE SUMMARY`).
- [ ] Short name + acronyms defined in quotes on first use; used consistently after.
- [ ] Prose money `US$` (the **company's** reporting currency, not the audience's); tables bare `$` with a unit header; minimum `$100k USD`; magnitudes ≤1 dp, per-share 2 dp.
- [ ] Percentages integer unless sub-integer (then 1 dp); financial multiples 1 dp incl. `10.0x`, rhetorical multiples integer (`3x`); approximations `~`, never "approximately"; dates `Mon-YY` / `~Mon-YY`.
- [ ] Em-dashes only as **closed** parenthetical asides (never a bullet lead-in, never spaced); en-dash spaced only as a label separator; numeric ranges use a **hyphen**; table negatives in parentheses `($296M)`.
- [ ] Every table and chart has a gold italic `Source:` line; appendix exhibits are numbered and cross-referenced inline `(see Exhibit N…)`.
- [ ] Team exhibit is in the **deep-bio format** (per-person roles with tenure + education, one combined `Source:` line); every unverified tenure/school/role left as a `[[NEED: …]]` / `[[VERIFY: …]]` gap flag — nothing fabricated.
- [ ] Management claims attributed ("Management expects…"); at least one explicit **August Group view**.
- [ ] **Key Risks & Mitigants** (operating co.) or substantive **Considerations** (fund) present and candid — not softened.
- [ ] Tables use navy/teal headers + white text; emphasis rows shaded; negatives in parentheses.
- [ ] H1 headings (`SubheaderSummary`) carry the solid bottom rule; H2 (`Subheading2`) the dotted gold-gray rule.
- [ ] Boilerplate appended verbatim: **Considerations** (SPV/fee mechanics) → **Risk Factors** → **Disclaimer** (correct short/long variant).
- [ ] `For Canadian residents only` footer included **only** if distributed under that restriction.
- [ ] August Group logo header + page number on every page.
- [ ] Tone: neutral, third-person, no hype, no contractions, no second-person.

---

## 10. Quick reference card

```
COLORS    Navy #000825   Gold #B29659   Black #000000   Gray fill #C8C8C8   (Teal #1C4849 = PDF cover only)
FONTS     Title: Calibre Semibold 26pt (→ Arial Bold)   Everything else: Arial (10pt body / 11pt H1)
TITLE     Calibre Semibold black; (operating co. adds gold "INVESTMENT SUMMARY" + facts table)
HEADINGS  H1: Arial 11pt bold SMALL-CAPS navy + solid bottom rule | H2: Arial bold-italic gold + dotted rule
TABLES    Navy/teal header + white text; shaded total rows; gold italic Source: line
DATES     Mon-YY (May-26) · ~Mar-22 (approx) · Q2'24       MONEY  prose US$730M · tables $4.0B · min $100k USD · US$3.20 per share
NUMBERS   % integer (1 dp only if sub-integer ~6.2%)   MULT  financial 1 dp (10.0x) · rhetorical int (3x)   APPROX  ~ (never "approximately")
DASHES    em — closed parenthetical only · en – spaced label-separator only · ranges = hyphen (5-10) · negatives ($296M)
MARGINS   US Letter, 0.5" all sides   HEADER August logo PNG every page   FOOTER page number
VOICE     3rd person · present/future · attributed claims · honest hedging
ENDMATTER Considerations → Risk Factors → Disclaimer (verbatim)
```
```
SECTIONS — DYNAMIC, chosen per company type. NOT a fixed list. See §4.
Fixed anchors only:  Executive Summary (first) ... Key Risks & Mitigants (late)
                     ... Considerations -> Risk Factors -> Disclaimer (end, verbatim)
Everything between = selected/renamed/reordered to fit the business.

OPERATING-COMPANY PALETTE (pick & adapt):
Executive Summary · Company Overview · Market Overview · Product & Technology
· (Manufacturing & Supply Chain — hardware only) · (Sector primer — if needed)
· Business Model · Financial Overview · Competitive Landscape · Investment Overview
· Key Risks & Mitigants · Considerations · Appendix (Exhibits) · Risk Factors · Disclaimer

FUND PALETTE (Sisyphus — for reference):
Manager Overview (+Team) · Investment Philosophy & Approach · Sourcing & Value-Add
· Fund Overview (+Current Portfolio, Case Study, Key Terms) · Track Record
· Considerations (Limited Track Record / Competition / Key Person) · Disclaimer
```

---

## 11. The golden template — Sisyphus `.docx` (canonical build target)

> This is the file the skill should **clone-and-fill** (same approach as the August `call-notes` and `cfu` skills). It is a native Word document whose look comes entirely from **five named paragraph styles** + a header logo + theme. Build by copying the template, deleting the body, and writing new paragraphs in these styles — never hand-format runs.

### 11.1 Package facts
- **Format:** Word `.docx` (Open XML). US Letter, **0.5″ margins**, Arial theme (major+minor).
- **Header:** embedded PNG logo (`media/image3.png`) on every page.
- **Footer:** page number only.
- **In-body graphics** are pasted designed exhibits (the positioning map is a PNG; the Track Record schedule is an EMF) — i.e. complex tables/charts are built in Excel/PowerPoint and embedded as pictures, not native Word tables.

### 11.2 The five named styles (use these IDs/specs exactly)

| Style name (ID) | Role | Font | Size | Color | Effects | Bottom border | Spacing (before/after, twips) |
|---|---|---|---|---|---|---|---|
| `. Title (Summary)` (`TitleSummary`) | Document title | **Calibre Semibold** | 26 pt | `#000000` | tracking −10 | — | 140 / 160 |
| `. Subheader (Summary)` (`SubheaderSummary`) | **Section heading (H1)** | Arial | 11 pt | navy `#000825` | **bold, small-caps** | **solid, 0.5 pt, auto (black)** | 220 / 100 |
| `. Subheading2` (`Subheading2`) | **Sub-heading (H2)** | Arial | ~11 pt | gold `#B29659` | **bold, italic** | **dotted, 0.5 pt, `#8D93A8`** (accent1 tint) | 140 / 40, line 260 exact |
| `. Paragraph (Summary)` (`ParagraphSummary`) | Body / bio lines | Arial | 10 pt | `#000000` | — | — | — |
| `Bullet (Summary)` (`BulletSummary`) | Source notes / bullets | Arial | 10 pt | `#000000` | — | — | — |

Bullet glyphs (from `numbering.xml`): level 1 = filled `●` (Symbol), level 2 = hollow `o`, level 3 = `▪`.

> Key corrections vs. the PDF decks: in this Word template the **H1 rule is a thin solid black underline** (not a teal accent) and the **H2 sub-heading carries a dotted gold-gray underline** (the PDFs showed H2 with no rule). Defer to the template.

### 11.3 Adapting Sisyphus → an operating company (what's fixed vs dynamic)

The user's case: **same formatting, operating company, different sector, some sections dynamic.** Mapping:

**Fixed (always present, same styling):**
- Logo header, page-number footer, 0.5″ margins, the five named styles, the title in `TitleSummary`.
- End-matter: **Considerations → Risk Factors → Disclaimer** (verbatim, §7) — use the **operating-company** Considerations (SPV/fee mechanics) and the short/long disclaimer per distribution.
- Voice, number/date/citation conventions (§1), `Source:` lines on every exhibit.

**Dynamic (vary by company & sector):**
- **Section set** — swap the fund skeleton (§4.2) for the operating-company skeleton (§4.1): Executive Summary · Company Overview · Market Overview · Product & Technology · *(Manufacturing & Supply Chain — only for hardware/asset-heavy)* · Business Model · Financial Overview · Competitive Landscape · Investment Overview · Key Risks & Mitigants.
- **Sector primer sub-sections** — include only when the sector needs teaching the reader (e.g., Radiant's *Nuclear 101*; Form's *grid / storage-market* primers). Software/consumer deals usually skip these.
- **H2 sub-headings within each section** are chosen per company (e.g., *Core Product / Add-On Products* for SaaS; *Iron-Air Battery / Formware / Manufacturing* for hardware).
- **Exhibits/Appendix** — team & board bios, financing history, market charts, peer comparison, technical diagrams — pick what the deal warrants.
- All headings render in `SubheaderSummary` (H1) / `Subheading2` (H2) regardless of which sections you choose, so the look stays identical to Sisyphus.

### 11.4 Cover treatment — DECIDED: operating-company deck cover
This build reproduces the **Addepar / Form / Radiant** cover, generated automatically by `build_summary.py` from the spec's `title`, `subtitle`, `facts`, and optional `banner_image`:

- **Hero banner** — `banner_image` (a white/knockout company logo or a product/facility photo) rendered full content-width; if omitted, a **teal `#1C4849` band** with the company name in white.
- **Title** in `TitleSummary` (Calibre Semibold 26 pt).
- **Gold "INVESTMENT SUMMARY"** label (Arial bold, letter-spaced, `#B29659`).
- **4-column facts table** — Asset Class / Risk Level / Minimum Investment / Liquidity; gray fill, bold-navy labels, gold rule under the header.

Then the body opens at `EXECUTIVE SUMMARY` (H1). Section headings render in the template's `SubheaderSummary` style — **small-caps navy with a solid rule** (the Radiant look). If the Addepar/Form **Title-Case** heading look is preferred instead, turn off `smallCaps` on the `. Subheader (Summary)` style in the template (one-line change) — everything else stays identical.
