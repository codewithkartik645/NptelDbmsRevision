import { Trophy, RotateCcw, ListChecks, Home } from "lucide-react";
import { useNav } from "../context/NavContext.jsx";
import { buildSession } from "../utils/shuffle.js";
import { useAppData } from "../context/AppDataContext.jsx";

export default function ResultScreen({ attempt, session }) {
  const { navigate } = useNav();
  const { allQuestionsById } = useAppData();

  const pct = attempt.total > 0 ? Math.round((attempt.correct / attempt.total) * 100) : 0;

  function practiceAgain() {
    // Re-shuffle the exact same underlying question pool for a fresh attempt.
    const originalQuestions = session.map((q) => allQuestionsById[q.id]).filter(Boolean);
    const newSession = buildSession(originalQuestions);
    navigate("practice", { session: newSession, mode: attempt.mode, scope: attempt.scope, timeLimitSec: null });
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 lg:px-8">
      <div className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-6 text-center dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
        <Trophy className="mx-auto mb-3 text-[var(--color-mark)]" size={32} />
        <p className="font-display text-xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          {attempt.mode === "exam" ? "Exam complete" : "Practice complete!"}
        </p>

        <p className="font-mono-num mt-3 text-4xl font-semibold text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          {attempt.correct} / {attempt.total}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">{pct}% accuracy</p>

        <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-md bg-[var(--color-correct-soft)] py-2">
            <p className="font-mono-num font-semibold text-[var(--color-correct)]">{attempt.correct}</p>
            <p className="text-xs text-[var(--color-ink-soft)]">Correct</p>
          </div>
          <div className="rounded-md bg-[var(--color-wrong-soft)] py-2">
            <p className="font-mono-num font-semibold text-[var(--color-wrong)]">{attempt.wrong}</p>
            <p className="text-xs text-[var(--color-ink-soft)]">Wrong</p>
          </div>
          <div className="rounded-md bg-black/[0.04] py-2 dark:bg-white/[0.06]">
            <p className="font-mono-num font-semibold text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
              {attempt.unattempted}
            </p>
            <p className="text-xs text-[var(--color-ink-soft)] dark:text-white/50">Unattempted</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={practiceAgain}
            className="flex items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
          >
            <RotateCcw size={15} /> Practice again (new shuffle)
          </button>
          <button
            onClick={() => navigate("review", { attempt, session })}
            className="flex items-center justify-center gap-2 rounded-md border border-[var(--color-rule)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] dark:border-[var(--color-rule-dark)] dark:text-[var(--color-paper-dark)]"
          >
            <ListChecks size={15} /> Review answers
          </button>
          <button
            onClick={() => navigate("dashboard")}
            className="flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm text-[var(--color-ink-soft)] dark:text-white/50"
          >
            <Home size={15} /> Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
