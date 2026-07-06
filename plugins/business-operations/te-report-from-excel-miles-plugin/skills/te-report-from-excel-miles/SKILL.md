---
name: te-report-from-excel-miles
description: >
  Generates a standard Travel & Entertainment (T&E) monthly Budget vs. Actual report from
  a NetSuite Budget vs. Actual export file (no live NetSuite connection required). Works
  with any NetSuite instance. Use when you already have the budget export and just need
  to format it as a report.
---

# T&E Report from Exported Budget Data

## How to use

1. In NetSuite, run the Budget vs. Actual report
2. Export it as Excel (.xls or .xlsx)
3. Upload the file to this skill
4. Provide your department structure (same as te-monthly-report):
   - Department/Cost Center field name
   - Department list
   - T&E account codes
   - Home currency

The skill will parse the export and produce a formatted T&E report.

## What this skill does

Given a NetSuite Budget vs. Actual export file, this skill:
1. Parses the budget data from the export
2. Groups by department
3. Calculates: Actual YTD | Budget YTD | Over/Under
4. Produces a formatted Excel report (same format as te-monthly-report)

## How it works

The skill extracts data from the exported Excel file, parses the account codes and amounts,
groups by department, and produces a clean formatted report. No live NetSuite connection
needed — the export file is the data source.

Result: Formatted Excel file ready to share or analyze.

