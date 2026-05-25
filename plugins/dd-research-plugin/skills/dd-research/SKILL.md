---
name: dd-research
description: >
  Investment due diligence research skill. Use this whenever the user asks to
  "research" a company, "pull research on" a company, "do DD research", "find
  articles on", or wants to investigate a company for investment purposes.
  Runs three research subagents — find, verify, deepen — then produces a
  formatted HTML full of DDQ questions generated FROM the research (gaps,
  discrepancies, unverified claims, red flags). Also saves all sources as
  individual HTML files in a folder the user specifies. Trigger this for any
  company-level research task in an investment context, even if the user just
  says "do what you did for Stendr but for [company]" or "now research [company]".
---

# DD Research Skill

## What this skill does

Researches a company from scratch using three web research passes, then produces:

1. **`DDQ Research.html`** — a structured HTML document full of DDQ questions that emerged from the research. Each question is backed by what the research found (or failed to find). This is the primary output.
2. **Individual source HTML files** — one per article/source, saved to a folder the user specifies.

The DDQ questions are not inputs — they are outputs. The research reveals what to ask.

## Step 0 — Gather inputs

Ask for these two things if not already provided (ask together, not one at a time):

1. **Company name and a brief description** — what the company does, who founded it, who invested
2. **Output folder path** — where to save the source HTML files and the DDQ Research HTML

Do not proceed until you have both.

## Step 1 — Launch Subagent 1 (find) and Subagent 2 (verify) in parallel

Send both in the same message so they run concurrently.

**Subagent 1 — Find sources (subagent_type: Explore)**

```
Find as many public sources as possible about [COMPANY NAME] — a [brief description].

Search for:
- Funding details: amount, round type, investors, date
- Founder backgrounds and credentials
- Product description — what exactly does it do, for whom
- Named customers or government partnerships
- Named competitors
- Any claims about market size, demand, or technology differentiation
- Any press coverage, LinkedIn posts, Crunchbase, or official announcements

Return every source found: title, URL, publication date, and the key facts from each.
Be thorough — this is investment due diligence.
```

**Subagent 2 — Verify key facts (subagent_type: Explore)**

```
You are doing investment fact-checking on [COMPANY NAME] — a [brief description]
backed by [investors if known].

Search the web to independently verify or challenge the following types of claims
that typically appear in investment memos for this type of company:

- Funding round details (exact amount, lead investors, co-investors, round type)
- Founder credentials and prior company outcomes
- Market size figures cited for this sector
- Regulatory or legal status relevant to the product (licences, treaties, approvals)
- Named government contracts or partnerships — are they confirmed or aspirational?
- Key competitors — who else is doing this, and at what stage?
- Any macro claims about industry demand (spending commitments, government budgets)

For each item: state what you found, cite the source (title, URL, date), and flag
anything that looks wrong, overstated, or missing. Be concise — one paragraph per item.
```

## Step 2 — Launch Subagent 3 (deepen) after reading Subagents 1 and 2

Read both outputs. Identify the 3-5 most important things that are still unclear, contradicted, or only partially sourced. Subagent 3 goes after those specifically.

**Subagent 3 — Deepen (subagent_type: Explore)**

```
You are doing targeted research for investment due diligence on [COMPANY NAME].

Prior research passes left the following items unresolved. Search specifically for each:

[LIST ONLY THE GAPS — max 5 items, specific and factual]

For each: find the best available source, state what it says, and confirm whether
the item is now verified, partially verified, or still unverifiable publicly.
```

## Step 3 — Save source files

For each distinct source across all three passes, save it as an individual HTML file in the user's chosen folder.

File naming: `01_Short_Title.html`, `02_Short_Title.html`, etc. Only save sources with at least one concrete, relevant fact — skip paywalled or empty results.

Use this template for each source file:

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>[Title]</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:800px;margin:48px auto;padding:0 28px;color:#1a1a1a;line-height:1.7}h1{font-size:22px;font-weight:700;border-bottom:2px solid #1a1a1a;padding-bottom:10px}.meta{font-size:13px;color:#888;margin-bottom:28px}h2{font-size:15px;font-weight:700;margin-top:28px}ul{padding-left:20px}li{margin:5px 0}blockquote{border-left:3px solid #ccc;padding:4px 16px;margin:16px 0;color:#333;font-style:italic}</style>
</head>
<body>
<h1>[Article Title]</h1>
<div class="meta">Source: [domain] · Published [date] · Retrieved [today]</div>
[KEY FACTS AS H2 SECTIONS + BULLET LISTS — only what's relevant to the investment case]
<h2>DDQ Relevance</h2>
<p>[1-2 sentences: what question does this source raise or help answer?]</p>
</body>
</html>
```

## Step 4 — Generate DDQ questions from the research

Before writing the HTML, synthesise what the three passes found into a set of DDQ questions. Good DDQ questions come from:

- **Gaps** — important things that should be public but aren't (no named customers, no product demo, no regulatory confirmation)
- **Discrepancies** — where the memo or official materials say one thing and public sources say another (wrong investor, wrong figure, overstated claim)
- **Red flags** — patterns that warrant scrutiny (related-party relationships, team missing key expertise, market claim built on aspirational not committed figures)
- **Unverified positives** — things the company claims that would be compelling if true but can't be confirmed (government pilot, exclusive partnership)

Group questions into themes (e.g. Team, Product, Demand, Competition, Financials, Legal/Regulatory).

## Step 5 — Write DDQ Research.html

Save to the same folder as the source files.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>[Company] — DDQ Research</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:1000px;margin:60px auto;padding:0 32px;color:#1a1a1a;line-height:1.6}
    h1{font-size:26px;font-weight:700;border-bottom:3px solid #1a1a1a;padding-bottom:12px}
    h1+p{color:#666;font-size:13px;margin-top:4px;margin-bottom:40px}
    h2{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-top:44px;margin-bottom:12px}
    .q{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #ebebeb}
    .q:last-child{border-bottom:none}
    .question{font-size:16px;font-weight:700;margin:0 0 8px}
    .context{font-size:14px;color:#444;line-height:1.65;margin:0 0 8px}
    .src{font-size:12px;color:#999;margin:0}
    .disc{background:#fff8e6;border-left:4px solid #e6a800;padding:12px 16px;margin:0 0 8px;border-radius:2px;font-size:14px;color:#444}
    .disc strong{color:#b87800}
    .flag{background:#fff0f0;border-left:4px solid #c0392b;padding:12px 16px;margin:0 0 8px;border-radius:2px;font-size:14px;color:#444}
    .flag strong{color:#c0392b}
  </style>
</head>
<body>
<h1>[Company] — DDQ Research</h1>
<p>Research conducted [date] · [N] sources · [N] questions generated</p>

<h2>[Theme — e.g. Team / Product / Demand / Competition / Financials / Legal]</h2>

<div class="q">
  <p class="question">[The DDQ question]</p>
  <p class="context">[2-4 sentences: what the research found that makes this question important.]</p>
  <p class="src">Sources: [source file name(s)]</p>
</div>

</body>
</html>
```

Use `.disc` for memo vs. public record contradictions. Use `.flag` for structural red flags. Plain `.context` for gaps.

Aim for 10-20 questions total. Every question must be backed by a specific research finding.

## Token efficiency rules

- Do not summarise what you're about to do — just do it
- Do not re-read files you just wrote
- Keep subagent prompts specific — no padding
- Source files contain only facts relevant to the investment case
- Each question context block is 2-4 sentences maximum
