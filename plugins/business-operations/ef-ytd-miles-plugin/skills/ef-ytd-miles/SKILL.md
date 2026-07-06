---
name: ef-ytd-miles
description: >
  Generates an Excel report of vendor expenses per client for a given month, showing both
  the selected month's amount and the year-to-date total (January through that month). Works
  with any NetSuite instance. Use when you need to see vendor spending by client with a
  running YTD view.
---

# Generic Vendor YTD Expense Report

## Configuration Required (First Run)

This skill needs your vendor details. On first use, provide:

- **Vendor name or ID**: Which vendor are you pulling expenses for?
- **Month/Year**: Which month do you want the report through? (e.g., "April 2026")
- *Optional*: Expense account number(s) to filter on

The skill will look up the vendor in NetSuite by name or ID.

## What this skill does

Given a vendor and month, this skill:
1. Pulls vendor expenses for January through the specified month
2. Groups by client (entity)
3. Calculates month total and YTD total for each client
4. Produces an Excel report with columns:
   - Client Name
   - [Current Month] Amount
   - YTD Amount (Jan–[Current Month])
5. Includes grand totals

## How it works

Same query logic as ef-monthly, but runs for each month from January through the specified
month. Groups results by client entity and sums by month. Produces a formatted .xlsx with
two stacked tables (current month vs. YTD view) or a single pivot table depending on preference.

Result: Excel file showing vendor spending by client with YTD rollup.

