---
name: te-monthly-report-miles
description: >
  Generates a standard Travel & Entertainment (T&E) monthly Budget vs. Actual report by
  department as a formatted Excel (.xlsx) file. Works with any NetSuite instance. Use when
  you need to see T&E actuals against budget for a given month by department.
---

# Generic T&E Monthly Budget vs. Actual Report

## Configuration Required (First Run)

This skill needs your NetSuite department/cost center structure. On first use, provide:

- **Department/Cost Center field**: How are departments tracked in your NetSuite?
  (e.g., "Class", "Department", "CostCenter", or custom field name)
- **Department list**: Which departments should appear in the report?
  (e.g., "Sales", "Operations", "Admin" — or provide all if you want them all)
- **T&E accounts**: Which account numbers should be included as T&E?
  (e.g., account codes for meals, airfare, hotel, entertainment)
- **Home currency**: Your reporting currency (e.g., CAD, USD)

The skill will save these for future runs.

## What this skill does

Given a month, this skill:
1. Pulls T&E actuals (YTD) from NetSuite for the specified month
2. Pulls YTD budget figures from the NetSuite Budget vs. Actual report
3. Groups by department
4. Calculates: Actual YTD | Budget YTD | Over/Under
5. Produces a formatted Excel report with one table per department

## How it works

The skill queries `transaction` for expenses in the specified T&E accounts (bills, expense
reports, etc.) and groups by the department field you specify. For budget data, it pulls
from the NetSuite Budget vs. Actual saved report (if available in your instance) or by
querying `budgetentry` directly.

Converts any non-home-currency amounts to home currency using consolidated exchange rates.

Result: Excel file with Budget vs. Actual by department for the specified month.

