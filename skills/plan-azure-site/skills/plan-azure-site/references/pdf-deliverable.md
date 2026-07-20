# Shareable PDF deliverable

Every completed run produces two matching files containing the full report:

- `<project-slug>-azure-hosting-plan-YYYY-MM-DD.pdf` - the circulation copy;
- `<project-slug>-azure-hosting-plan-YYYY-MM-DD.md` - the editable source.

Use a user-selected output folder when provided. Otherwise use `output/pdf/` in the current writable task workspace. Never write the report into the inspected repository unless the user explicitly requests it.

## Make the report standalone

The reader must not need the chat transcript. Include every section from [report-contract.md](report-contract.md), the report date, project/repository name, assessment scope, and a short evidence/source section.

Use repository-relative evidence paths rather than local machine paths. Include official Microsoft URLs as readable citations. Do not include secrets, environment-variable values, raw email content, tool tokens, internal reasoning, or raw command output.

## PDF presentation

- Use a clean August Group internal-report style: white background, dark navy headings, one restrained accent color, generous margins, and readable tables.
- Put the project name, `Azure Hosting & Migration Plan`, date, and `Prepared for August Group` at the top of the first page.
- Add `August Group - Internal` and page numbers in the footer.
- Preserve the report-contract order and keep the three-line bottom line on page one.
- Repeat table headers across page breaks. Do not split a table row when avoidable.
- Prefer portrait Letter pages; use landscape only for a genuinely wide matrix.
- Keep URLs clickable and human-readable.
- Use ASCII hyphens. Avoid unsupported glyphs, clipped text, overlapping elements, tiny tables, and orphaned headings.

## Build and verify

Use the maintained PDF workflow or the nearest available equivalent:

1. Write the complete Markdown source first.
2. Generate the PDF with ReportLab or another reliable local PDF renderer.
3. Render every PDF page to PNG.
4. Inspect every rendered page for clipping, overlap, broken tables, unreadable text, blank pages, or missing content.
5. Extract the PDF text and verify that every required report heading is present.
6. Correct defects and repeat rendering and inspection until clean.

Do not call the run complete if only the Markdown exists or if the PDF has not been visually inspected. If PDF tooling remains unavailable after checking the bundled runtime, produce a self-contained HTML file beside the Markdown, explain the precise blocker, and do not claim that a PDF was created.

## Final handoff

In chat, give only:

1. the three-line bottom line;
2. a link to the PDF;
3. a link to the Markdown source;
4. one sentence naming any unresolved blocker.
