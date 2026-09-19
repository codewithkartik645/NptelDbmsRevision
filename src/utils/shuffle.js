// Unbiased Fisher-Yates shuffle. Never mutates the input array.
export function shuffleArray(input) {
  const arr = input.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Given an array of original question objects, produce a brand-new practice
// session: question order shuffled, and each question's options shuffled.
// The original data (imported from data/questions.js) is never mutated —
// we only ever read from it and build new arrays/objects here.
export function buildSession(questions) {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map((q) => ({
    id: q.id,
    week: q.week,
    type: q.type || "MCQ",
    question: q.question,
    options: shuffleArray(q.options),
    correctAnswers: q.correctAnswers,
    explanation: q.explanation || "",
    hinglishExplanation: q.hinglishExplanation || "",
    // Diagram wiring: `diagram` renders with the question prompt (needed to
    // answer); `explanationDiagram` renders only after checking the answer
    // (the source PDF only revealed it in the worked explanation, so
    // showing it earlier would give the answer away); `optionDiagramMap`
    // renders a small diagram inside a specific option button instead of
    // plain text, keyed by that option's exact string so it survives
    // shuffling. All three are optional and simply omitted when unused.
    diagram: q.diagram || null,
    explanationDiagram: q.explanationDiagram || null,
    optionDiagramMap: q.optionDiagramMap || null,
  }));
}

// Pick `count` random questions (without replacement) from a pool, then
// build a shuffled session from that subset.
export function buildRandomSession(pool, count) {
  const n = Math.min(count, pool.length);
  const picked = shuffleArray(pool).slice(0, n);
  return buildSession(picked);
}
