---
name: monthly-ef-ytd-miles
description: >
  Generates an Excel report of vendor expenses per client for a given month, showing both
  the selected month's amount and the year-to-date total (January through that month). Works
  with any NetSuite instance.
---

# Generic Vendor Monthly YTD Expense Report

## Configuration Required (First Run)

This skill needs your vendor details. On first use, provide:

- **Vendor name or ID**: Which vendor are you pulling expenses for?
- **Month/Year**: Which month do you want the report through?
- *Optional*: Expense account number(s) to filter on

The skill will look up the vendor in NetSuite by name or ID.

## What this skill does

Given a vendor and month, this skill:
1. Pulls vendor expenses for January through the specified month
2. Groups by client (entity)
3. Calculates month total and YTD total for each client
4. Produces an Excel report showing both month and YTD amounts by client
5. Includes section totals and grand total

## How it works

Same query logic as ef-monthly, but aggregates across the year-to-date period. Results
grouped by client with month and YTD sums. Formatted .xlsx output with clean totals.

Result: Excel file showing vendor spending by client with YTD rollup.

