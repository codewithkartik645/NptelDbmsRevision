# NPTEL Exam Prep — DBMS

A practice platform for your NPTEL DBMS assignments: shuffled questions and options on every attempt, mastery tracking, weak-question practice, exam mode, and full result history — all saved locally in your browser.

## What's loaded right now
Weeks 1–7 contain your real DBMS Assignment 1–7 questions (72 total), transcribed from the PDFs you uploaded. Week 8 is a placeholder with 2 sample questions — send me Assignment 8 and I'll swap it in.

A few notes on the transcription are documented at the top of `src/data/questions.js`, including two spots where the source PDF used diagrams/table-images instead of plain text (Week 7, Q3 and Q10) — I've flagged exactly what was reconstructed there.

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

## Adding your real Week 8 (or editing any week)
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
