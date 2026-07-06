---
name: august-annual-miles
description: >
  Generates a formatted Excel (.xlsx) report of all NetSuite transactions matching a specific
  memo string, organized by account type and account number. Works with any NetSuite instance.
  Use whenever you need to pull all transactions tagged with a particular memo — e.g. "pull
  all transactions with memo X", "give me a report of everything coded to [memo]". The skill
  handles both vendor bills and expense reports, filters out AP offset lines, converts
  non-home-currency subsidiary activity to home currency using NetSuite consolidated
  exchange rates, and produces a clean grouped Excel file with subtotals per account.
---

# NetSuite Memo Transaction Report (Generic)

## Configuration Required (First Run)

This skill needs your NetSuite home currency and home subsidiary ID.

**Find these values:**
- Home currency: The consolidation currency (typically CAD, USD, EUR, GBP, etc.)
- Home subsidiary ID: Your top-level parent subsidiary ID in NetSuite
  - Go to Setup > Company > Subsidiaries
  - Find your parent/consolidation subsidiary and note its ID

The skill will prompt you for these on first use.

## What this skill does

Given a memo string, this skill:
1. Asks for: (a) the memo to search for, (b) your home subsidiary ID, (c) your home currency
2. Queries NetSuite for all matching transaction lines (bills, expense reports, checks, etc.)
3. Filters out accounting offset lines (AP, liability, bank accounts)
4. Converts any non-home-currency subsidiary lines to home currency using NetSuite exchange rates
5. Produces a formatted Excel report grouped by account type → account number with subtotals

## How it works

The skill uses SuiteQL to query `transactionaccountingline` for matches on the memo field.
It queries both transaction-level memos and line-level memos (which are prefixed with ": "
in expense reports), using case-insensitive partial matching.

It pulls amounts from `transactionaccountingline.amount` (posted GL amounts) and converts
subsidiary currency to home currency using `consolidatedexchangerate` with your specified
home subsidiary ID.

Account types used for filtering: AcctPay, OthCurrLiab, Bank, CreditCard (excluded as
they are balancing entries).

Result: Excel file with accounts grouped by type, subtotals per account, grand total.

