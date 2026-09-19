# NPTEL Exam Prep — DBMS

A practice platform for your NPTEL DBMS assignments: shuffled questions and options on every attempt, mastery tracking, weak-question practice, exam mode, and full result history — all saved locally in your browser.

## What's loaded right now
All 8 weeks contain your real DBMS Assignment 1–8 questions (80 total), transcribed from the PDFs you uploaded.

A few notes on the transcription are documented at the top of `src/data/questions.js`, including spots where the source PDF used diagrams/table-images instead of plain text (Week 7 Q3 & Q10, Week 8 Q5 & Q6) — I've flagged exactly what was reconstructed there.

## Diagrams
Questions whose original assignment included an actual diagram (ER diagrams, 2-3-4 trees, wait-for graphs, the Week 8 recovery timeline, and the query-optimization trees) now render a real inline SVG diagram, reconstructed pixel-by-pixel against the source PDF images — not just described in text. These live in `src/components/diagrams/Diagrams.jsx` and are wired to questions via three optional fields in `questions.js`:
- `diagram`: renders above the question text (the diagram is needed to answer)
- `explanationDiagram`: renders only after checking the answer (the source PDF only revealed it in the worked explanation — showing it earlier would give the answer away)
- `optionDiagramMap`: renders a small diagram inside a specific answer option instead of plain text (used for Week 7 Q3, where the four options are themselves wait-for-graph diagrams)

## Running it

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

To build a static production version:
```bash
npm run build
npm run preview   # serves the built dist/ folder locally
```

Don't open `dist/index.html` directly by double-clicking it — browsers block ES module scripts loaded via `file://`. Use `npm run preview` or any static file server instead.

## Editing or adding questions
Everything lives in one file: `src/data/questions.js`. Each question needs:
- `id` — unique string
- `type` — `"MCQ"` (single answer) or `"MSQ"` (multi-select)
- `question` — exact text (use `\n` for line breaks in tables/schedules)
- `options` — array of option strings
- `correctAnswers` — array of the exact matching option string(s)
- `explanation` — optional

Nothing else needs to change — shuffling, scoring, stats, and the dashboard all read from this file automatically.

## Where your progress is stored
Everything (attempt history, per-question stats, mistakes, theme) is saved in your browser's `localStorage` under the key `nptel_prep_v1`. It's local to your browser — clearing browser data will clear it too. There's no backend; nothing is sent anywhere.
