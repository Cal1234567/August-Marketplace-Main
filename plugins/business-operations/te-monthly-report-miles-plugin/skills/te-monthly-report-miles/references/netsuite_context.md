# NetSuite Context — T&E Monthly Report

## NetSuite Account

- **Account URL**: `https://7335291.app.netsuite.com`
- **Budget vs. Actual Report**: `https://7335291.app.netsuite.com/app/reporting/reportrunner.nl?cr=-197`
- **Subsidiary context for budget**: August Group (Consolidated) — subsidiary ID -1
- **Budget category**: FY 2026 (category ID 7)

## T&E Accounts Under 626000

| Account # | Account Name | NetSuite ID |
|-----------|-------------|-------------|
| 626000 | Travel and Entertainment (parent) | 477 |
| 626100 | Accommodations | 405 |
| 626200 | Airline and Other Travel Tickets | 406 |
| 626250 | *(rarely has activity)* | 601 |
| 626300 | Car Mileage | 407 |
| 626400 | Car Rental | 408 |
| 626500 | Meals (Business - With Clients) | 409 |
| 626550 | Meals (No Clients) | 410 |
| 626560 | Tips/Gratuities | 602 |
| 626600 | Parking & Tolls | 411 |
| 626700 | Road & Rail (Uber, Taxi or Trains) | 412 |
| 626750 | *(rarely has activity)* | 603 |
| 626800 | Other Travel | 413 |
| 626850 | Entertainment - August (No Clients) | 859 |
| 626900 | Entertainment - Client Events/Shows | 480 |
| 626910 | Entertainment - Client Golf | 481 |

**Intercompany variants** (IDs 883–897) are included in the SuiteQL query for completeness but
typically carry no balances. They share the same account numbers as the above with intercompany flags.

**Full ID list for SuiteQL `IN` clause**:
`477,405,883,406,884,601,885,407,886,408,887,409,888,410,889,602,890,411,891,412,892,603,893,413,894,859,895,480,896,481,897`

## Department Names (as they appear in NetSuite)

1. Advisory
2. Business Development / Client Servicing
3. Corporate Events
4. Group Operations
5. Investments
6. Legal / Compliance

Transactions with no department assigned appear as `No Department` from `COALESCE(d.name, 'No Department')`.
These are included in consolidated totals but not mapped to any named department column.

## Excel Template Layout

### Section 1 (rows 6–21 in the template)
Columns in order: B=Account Name, C–E=Advisory, F–H=BD/Client Servicing, I–K=Corporate Events, L–N=Group Operations

Sub-columns per department (3 each):
- Col 1: Amount (Actual)
- Col 2: Budget Amount
- Col 3: Amount Over Budget `=(ROUND(actual,2) - ROUND(budget,2))`

### Section 2 (rows 23–38 in the template, after a blank row 22)
Columns in order: B=Account Name, C–E=Investments, F–H=Legal/Compliance, I–K=Total

Total columns aggregate all six departments:
- Total Actual = SUM of all dept actuals (including No Department)
- Total Budget = SUM of all dept budgets (same as consolidated budget per account)
- Total Over Budget = ROUND(total_actual,2) - ROUND(total_budget,2)

### Header styling
- Department name row: fill `#D0D0D0`, bold, 7pt, centered; merged across 3 columns
- Sub-column header row: fill `#D0D0D0`, bold, 7pt, centered
- Parent account row (626000): no fill, bold, 8pt
- Data rows: no fill, 8pt, right-aligned
- Total row: no fill, bold, 8pt, dotted top border + thin bottom border

### Number format
All amount cells: `"$"#,##0.00`

### Column widths (approximate from template)
- Col B (account name): ~54 characters wide
- Amount columns: ~14 wide
- Budget Amount columns: ~16 wide
- Amount Over Budget columns: ~19 wide

## Chrome / Virtual Scroll Notes

The NetSuite Budget vs. Actual report uses virtual scrolling. The DOM only renders rows currently
in the viewport. The T&E section (626xxx accounts) appears near the bottom of the report.

**Key element IDs**:
- `scrollarea` — the scrollable container (set `scrollTop = scrollHeight` to reach the bottom)
- `contentviewport` — alternate scroll container (scroll this too)

**Scroll sequence**:
```javascript
const scrollarea = document.getElementById('scrollarea');
const viewport = document.getElementById('contentviewport');
if (scrollarea) scrollarea.scrollTop = scrollarea.scrollHeight;
if (viewport) viewport.scrollTop = viewport.scrollHeight;
await new Promise(r => setTimeout(r, 2500));
```

After scrolling, use `document.body.innerText` (via `javascript_tool`) to read the full text.
Look for lines starting with `626` to find T&E accounts.

**Parsing budget values from report text**:
Lines follow the format (tab-separated):
```
626100 - Accommodations\t[Actual]\t[Budget]\t[Variance]\t[Variance%]
```
The budget value is the second tab-separated column. Dollar signs and commas may be present —
strip them before converting to float.

## Known Limitations

- Budget data is not accessible via the NetSuite SuiteQL or report API — Chrome is required
- The B vs A report shows consolidated budget (not per-department breakdown)
- Setting the month filter programmatically may or may not work depending on the report state;
  fallback is to ask the user to set it manually
- Session tokens in URLs expire — always use the base URL `?cr=-197` and let the page load fresh
