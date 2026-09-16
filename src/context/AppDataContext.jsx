import { createContext, useContext, useEffect, useMemo, useState } from "react";
import rawWeeks from "../data/questions.js";
import { loadState, saveState } from "../utils/storage.js";
import { applyAttemptToStats } from "../utils/stats.js";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [state, setState] = useState(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Apply the theme to the document root so Tailwind's dark: variant works.
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  const weeks = useMemo(
    () =>
      rawWeeks.map((w) => ({
        ...w,
        questions: w.questions.map((q) => ({ ...q, week: w.week })),
      })),
    []
  );

  const allQuestions = useMemo(() => weeks.flatMap((w) => w.questions), [weeks]);

  const allQuestionsById = useMemo(() => {
    const map = {};
    for (const q of allQuestions) map[q.id] = q;
    return map;
  }, [allQuestions]);

  function toggleTheme() {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }

  // Record a finished attempt: append to history and roll results into
  // per-question stats. `answers` is { [questionId]: { selected, correct } }
  function recordAttempt({ mode, scope, total, correct, wrong, unattempted, answers, durationSec }) {
    const attempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      mode,
      scope, // { type: 'week'|'random'|'allweeks'|'final', week?: number }
      total,
      correct,
      wrong,
      unattempted,
      accuracy: total > 0 ? Math.round((correct / (correct + wrong || 1)) * 100) : 0,
      durationSec: durationSec || null,
      answers,
    };
    setState((s) => ({
      ...s,
      history: [attempt, ...s.history],
      questionStats: applyAttemptToStats(s.questionStats, answers),
    }));
    return attempt;
  }

  const value = {
    weeks,
    allQuestions,
    allQuestionsById,
    theme: state.theme,
    toggleTheme,
    history: state.history,
    questionStats: state.questionStats,
    recordAttempt,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used inside AppDataProvider");
  return ctx;
}
