"""
parse_and_build.py — Reads a NetSuite Budget vs. Actual XML export (.xls) and produces
the formatted AG T&E monthly report Excel.

The input is the NetSuite "Budget vs. Actual" report exported as Excel XML
(file extension .xls but actually SpreadsheetML XML). It contains all accounts
across all departments; this script filters to the 12 T&E accounts (626xxx).

Department column layout in the NetSuite export (0-indexed within each row):
  Col 0  : Account label
  Cols 1-4   : No Department (Amount, Budget, Over, %)
  Cols 5-8   : Advisory
  Cols 9-12  : Business Development / Client Servicing
  Cols 13-16 : Client Experience  (ignored — not in AG template)
  Cols 17-20 : Corporate Events
  Cols 21-24 : Group Operations
  Cols 25-28 : Influencer Marketing  (ignored — not in AG template)
  Cols 29-32 : Investments
  Cols 33-36 : Legal / Compliance
  Cols 37-40 : Tax  (ignored — not in AG template)
  Cols 41-44 : Total (computed — not read)

Month/year is extracted from the "From Jan YYYY to Month YYYY" header row.

Usage:
    python parse_and_build.py --input /path/to/Budgetvs.Actual.xls --output /path/to/output.xlsx
"""

import argparse
import os
import re
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(__file__))
from build_te_excel import build_report

NS = {'ss': 'urn:schemas-microsoft-com:office:spreadsheet'}

T_AND_E_ACCTS = {
    '626100', '626200', '626300', '626400', '626500', '626550',
    '626560', '626600', '626700', '626850', '626900', '626910',
}

DEPT_COLS = {
    'Advisory':                                (5,  6),
    'Business Development / Client Servicing': (9,  10),
    'Corporate Events':                        (17, 18),
    'Group Operations':                        (21, 22),
    'Investments':                             (29, 30),
    'Legal / Compliance':                      (33, 34),
}
NO_DEPT_ACTUAL_COL = 1

MONTH_MAP = {
    'jan': 'January',  'feb': 'February', 'mar': 'March',
    'apr': 'April',    'may': 'May',       'jun': 'June',
    'jul': 'July',     'aug': 'August',    'sep': 'September',
    'oct': 'October',  'nov': 'November',  'dec': 'December',
}


def row_vals(row):
    """Return a list of cell text values for a row."""
    out = []
    for cell in row.findall('ss:Cell', NS):
        data = cell.find('ss:Data', NS)
        out.append(data.text if data is not None and data.text else '')
    return out


def num(s):
    """Parse a numeric string; treat -0.0 as 0."""
    try:
        v = float(s)
        return 0.0 if v == 0.0 else v
    except (TypeError, ValueError):
        return 0.0


def parse_date_range(text):
    """
    Parse 'From Jan 2026 to May 2026' → ('May', 2026).
    Returns (month_name, year) where month_name is the end month.
    """
    m = re.search(r'to\s+(\w{3})\s+(\d{4})', text, re.IGNORECASE)
    if m:
        mon = MONTH_MAP.get(m.group(1).lower(), m.group(1).capitalize())
        return mon, int(m.group(2))
    # Fallback: look for any month+year pair
    m = re.search(r'(\w{3})\s+(\d{4})', text, re.IGNORECASE)
    if m:
        mon = MONTH_MAP.get(m.group(1).lower(), m.group(1).capitalize())
        return mon, int(m.group(2))
    return 'Unknown', 2026


def parse_netsuite_xml(path):
    """
    Parse a NetSuite XML SpreadsheetML export and extract T&E actuals + budget.

    Returns:
        actuals    : [{department, acctnumber, actual_amount}]
        budget     : {dept: {acctnumber: float}}
        month_name : str
        year       : int
    """
    tree = ET.parse(path)
    root = tree.getroot()

    ws = root.findall('.//ss:Worksheet', NS)[0]
    rows = ws.findall('.//ss:Row', NS)

    month_name = 'Unknown'
    year = 2026
    actuals = []
    budget = {dept: {} for dept in DEPT_COLS}

    for row in rows:
        vals = row_vals(row)
        if not vals:
            continue

        first = vals[0].strip()

        # Extract month/year from the date-range header (e.g. 'From Jan 2026 to May 2026')
        if first.lower().startswith('from '):
            month_name, year = parse_date_range(first)
            continue

        # Filter to T&E accounts
        acct_num = first.split(' - ')[0].strip()
        if acct_num not in T_AND_E_ACCTS:
            continue

        # No-dept actual is folded into Total via the builder's no_dept dict.
        # We attach it as a "No Department" actuals entry so build_report handles it.
        nd_act = num(vals[NO_DEPT_ACTUAL_COL]) if len(vals) > NO_DEPT_ACTUAL_COL else 0
        if nd_act:
            actuals.append({
                'department':    'No Department',
                'acctnumber':    acct_num,
                'actual_amount': nd_act,
            })

        for dept, (ac, bc) in DEPT_COLS.items():
            act = num(vals[ac]) if len(vals) > ac else 0
            bud = num(vals[bc]) if len(vals) > bc else 0
            if act:
                actuals.append({
                    'department':    dept,
                    'acctnumber':    acct_num,
                    'actual_amount': act,
                })
            budget[dept][acct_num] = bud

    return actuals, budget, month_name, year


def main():
    parser = argparse.ArgumentParser(
        description='Build AG T&E report from a NetSuite Budget vs. Actual XML export'
    )
    parser.add_argument('--input',  required=True, help='Path to the NetSuite .xls XML export')
    parser.add_argument('--output', required=True, help='Path for the output .xlsx file')
    args = parser.parse_args()

    print(f'Reading: {args.input}')
    actuals, budget, month_name, year = parse_netsuite_xml(args.input)

    print(f'  Month / year : {month_name} {year}')
    print(f'  Actuals rows : {len(actuals)}')
    print(f'  Departments  : {list(budget.keys())}')

    if month_name == 'Unknown':
        print('WARNING: could not detect month from file — defaulting to Unknown 2026.')
        print('         Rename the output file manually after review.')

    build_report(actuals, budget, month_name, year, args.output)
    print(f'Output written : {args.output}')


if __name__ == '__main__':
    main()
