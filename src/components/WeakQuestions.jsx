import { AlertTriangle, Play } from "lucide-react";
import { useAppData } from "../context/AppDataContext.jsx";
import { useNav } from "../context/NavContext.jsx";
import { weakQuestionPool, mistakeHistory, accuracyOf } from "../utils/stats.js";
import { buildSession } from "../utils/shuffle.js";

export default function WeakQuestions() {
  const { allQuestions, allQuestionsById, questionStats } = useAppData();
  const { navigate } = useNav();

  const weak = weakQuestionPool(questionStats, allQuestions);
  const mistakes = mistakeHistory(questionStats, allQuestionsById);

  function practiceWeak() {
    const session = buildSession(weak);
    navigate("practice", { session, mode: "full", scope: { type: "weak" } });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <p className="flex items-center gap-2 font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
        <AlertTriangle size={22} className="text-[var(--color-wrong)]" /> Weak questions
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">
        Questions you've frequently answered incorrectly. This list updates automatically as you keep practicing.
      </p>

      {weak.length === 0 ? (
        <p className="mt-6 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-4 py-6 text-center text-sm text-[var(--color-ink-soft)] dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)] dark:text-white/50">
          No weak questions yet — keep practicing and this will fill in automatically.
        </p>
      ) : (
        <>
          <p className="font-mono-num mt-4 text-sm text-[var(--color-ink-soft)] dark:text-white/50">
            {weak.length} questions available
          </p>
          <button
            onClick={practiceWeak}
            className="mt-3 flex items-center gap-2 rounded-md bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-white dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
          >
            <Play size={15} /> Practice weak questions
          </button>
        </>
      )}

      {mistakes.length > 0 && (
        <div className="mt-8">
          <p className="mb-3 font-display text-lg text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
            Mistake history
          </p>
          <div className="space-y-2">
            {mistakes.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-3.5 py-2.5 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]"
              >
                <p className="min-w-0 flex-1 truncate text-sm text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                  Week {m.question?.week} — {m.question?.question.split("\n")[0]}
                </p>
                <span className="font-mono-num shrink-0 text-xs text-[var(--color-wrong)]">
                  Wrong {m.wrongCount}×
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
