// Pure functions that turn { history, questionStats } into the numbers the
// UI displays. Nothing here touches storage directly.

export function getQuestionStatus(stat) {
  if (!stat || stat.attempts === 0) return "new";
  const acc = stat.correct / stat.attempts;
  if (stat.attempts >= 3 && acc >= 0.85) return "mastered";
  if (stat.wrong >= 2 && acc < 0.5) return "weak";
  return "needs_practice";
}

export const STATUS_LABEL = {
  new: "Not attempted",
  mastered: "Mastered",
  needs_practice: "Needs practice",
  weak: "Weak",
};

export function accuracyOf(stat) {
  if (!stat || stat.attempts === 0) return null;
  return Math.round((stat.correct / stat.attempts) * 100);
}

// Roll a completed attempt's per-question results into questionStats.
// Returns a brand-new object; never mutates the input.
export function applyAttemptToStats(questionStats, answers) {
  const next = { ...questionStats };
  for (const [qid, answer] of Object.entries(answers)) {
    const prev = next[qid] || { attempts: 0, correct: 0, wrong: 0 };
    next[qid] = {
      attempts: prev.attempts + 1,
      correct: prev.correct + (answer.correct ? 1 : 0),
      wrong: prev.wrong + (answer.correct ? 0 : 1),
    };
  }
  return next;
}

export function overallDashboardStats(history, questionStats, totalQuestionCount, weeksCount) {
  const totalAttempts = history.length;
  const correctSum = history.reduce((s, a) => s + a.correct, 0);
  const totalAnswered = history.reduce((s, a) => s + a.correct + a.wrong, 0);
  const overallAccuracy = totalAnswered > 0 ? Math.round((correctSum / totalAnswered) * 100) : 0;

  const statuses = Object.values(questionStats).map(getQuestionStatus);
  const masteredCount = statuses.filter((s) => s === "mastered").length;
  const weakCount = statuses.filter((s) => s === "weak").length;
  const practicedQuestionCount = Object.keys(questionStats).length;

  return {
    weeksCount,
    totalQuestionCount,
    totalAttempts,
    overallAccuracy,
    masteredCount,
    weakCount,
    practicedQuestionCount,
  };
}

export function weekStats(weekNumber, weekQuestions, history, questionStats) {
  const weekHistory = history.filter((a) => a.scope?.type === "week" && a.scope.week === weekNumber && a.mode === "full");
  const timesPracticed = weekHistory.length;
  let best = null;
  for (const a of weekHistory) {
    if (!best || a.correct / a.total > best.correct / best.total) best = a;
  }
  const accSum = weekHistory.reduce((s, a) => s + a.correct / a.total, 0);
  const avgAccuracy = timesPracticed > 0 ? Math.round((accSum / timesPracticed) * 100) : 0;

  const qStatuses = weekQuestions.map((q) => getQuestionStatus(questionStats[q.id]));
  const masteredCount = qStatuses.filter((s) => s === "mastered").length;
  let status = "Not started";
  if (timesPracticed > 0) {
    if (masteredCount === weekQuestions.length) status = "Mastered";
    else if (avgAccuracy >= 70) status = "Good progress";
    else status = "Needs practice";
  }

  return {
    questionCount: weekQuestions.length,
    timesPracticed,
    bestScore: best ? `${best.correct}/${best.total}` : "—",
    bestAccuracy: best ? Math.round((best.correct / best.total) * 100) : null,
    avgAccuracy,
    status,
  };
}

export function mistakeHistory(questionStats, allQuestionsById) {
  return Object.entries(questionStats)
    .filter(([, stat]) => stat.wrong > 0)
    .map(([qid, stat]) => ({
      id: qid,
      question: allQuestionsById[qid],
      wrongCount: stat.wrong,
      attempts: stat.attempts,
    }))
    .sort((a, b) => b.wrongCount - a.wrongCount);
}

export function weakQuestionPool(questionStats, allQuestions) {
  return allQuestions.filter((q) => getQuestionStatus(questionStats[q.id]) === "weak");
}
