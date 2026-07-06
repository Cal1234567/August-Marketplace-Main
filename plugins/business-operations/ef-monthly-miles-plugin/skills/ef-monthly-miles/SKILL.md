---
name: ef-monthly-miles
description: >
  Pulls the monthly expense report from a specified vendor in NetSuite — vendor bills for
  a given month, broken down by line with the client associated with each expense. Works
  with any NetSuite instance. Use whenever you need to see vendor expense activity for a
  specific period. Resolves the client associated with each expense line and presents a
  clean summary.
---

# Generic Vendor Monthly Expense Report

## Configuration Required (First Run)

This skill needs your vendor details. On first use, provide:

- **Vendor name or ID**: Which vendor are you pulling expenses for? (e.g., "Acme Consulting" or vendor ID 1234)
- **Month/Year**: Which month do you want? (e.g., "April 2026")
- *Optional*: Expense account number(s) to filter on (if you want only specific accounts)

The skill will look up the vendor in NetSuite by name or ID.

## What this skill does

Given a vendor and month, this skill:
1. Queries NetSuite for all vendor bills in that month
2. Filters out non-bill transaction types (bill payments, etc.)
3. Pulls all expense lines with associated client/entity information
4. Presents results as a clean table (or Excel export) showing:
   - Line amount
   - Client name
   - Line memo
   - Line number
5. Flags any lines missing client coding

## How it works

The skill uses SuiteQL to query `transaction` and `transactionline` for vendor bills.
It joins to the `entity` table to resolve client names from the entity ID stored on each
line. It excludes the main line (AP offset) and filters to expense lines only.

The user can optionally filter by expense account by specifying one or more account
numbers—the skill will then only return lines posting to those accounts.

Result: Clean table of vendor expenses for the month, with clients resolved and any
data issues flagged.

