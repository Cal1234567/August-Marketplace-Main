---
name: boc-fx
description: >-
  Retrieve official Bank of Canada USD-to-CAD daily average exchange rates and apply them to USD amounts. Use whenever the user says "get USD/CAD," "what was the USD to CAD rate on this date," "pull Bank of Canada FX," or "convert USD to CAD using the BoC rate." Produces a source-linked chat result or a date/rate table, with file export only when explicitly requested. Distinct from general currency research, non-USD currency pairs, and building spreadsheet trackers. Never silently invert, substitute a missing date, guess a rate, or use an unofficial source.
---

# Bank of Canada USD/CAD

Use the Bank of Canada Valet API as the canonical source for USD to CAD. Keep the job narrow: retrieve or apply the official daily average series `FXUSDCAD`.

## Retrieve

1. Parse the requested date, date range, recent period, or USD amount. Interpret **USD to CAD** as Canadian dollars per 1 US dollar, normally shown as `1.x`.
2. Call the official endpoint directly:
   - Base: `https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json`
   - Date range: add `start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
   - Recent observations: add `recent=N`
3. Query only the dates needed. Do not browse the general web or load a long history for a single-date request.
4. Validate that the response identifies `FXUSDCAD` as the daily value of 1 US dollar expressed in Canadian dollars. Treat a missing observation as missing, not as zero.

## Handle dates

- The Bank publishes daily averages on Bank business days, generally by 16:30 ET. A weekend, holiday, or not-yet-published current date may have no observation.
- If the exact requested date is absent, say so. Offer the nearest prior or next available business-day observation, but use it only with the user's approval or when the user explicitly requested that convention.
- The current daily-average methodology begins on 2017-01-03. For earlier dates, explain the methodology break and ask before using the Bank's legacy noon or closing rates.

## Return

- Single rate: `YYYY-MM-DD: 1 USD = X.XXXX CAD — Bank of Canada daily average.`
- Date range: return a compact two-column table, `Date` and `USD/CAD`.
- USD conversion: multiply the USD amount by the selected `FXUSDCAD` value, show the rate and date used, and label the result as a calculation—not an executable transaction quote.
- Link the exact Valet request used. Include retrieval time when the answer may be reused operationally.
- Create CSV or Excel output only when the user explicitly asks for a file. Keep the API as the source of truth and label any file as a snapshot.

## Failure handling

- If Valet is unavailable, report that plainly and preserve the requested date parameters for a retry.
- Do not switch to another data provider without explicit permission.
- In a sandboxed environment, request network approval rather than replacing the official API with search snippets or model knowledge.

## Rules

- Always use Bank of Canada series `FXUSDCAD` for the canonical rate: CAD required to buy 1 USD, normally `1.x`.
- Never silently return or substitute the inverse `CAD/USD` rate, normally `0.x`.
- Never fill weekends, holidays, or missing dates without an explicit date-selection convention.
- Never describe the indicative daily average as a live, executable, closing, or tax-prescribed rate.
- Never guess, interpolate, or use an unofficial source when Valet is unavailable.
- Never create, refresh, or modify a shared workbook, CSV, database, or automation unless the user explicitly asks.
