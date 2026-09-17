import { useState } from "react";
import { useAppData } from "../context/AppDataContext.jsx";
import { getQuestionStatus, STATUS_LABEL, accuracyOf } from "../utils/stats.js";
import FormattedText from "./FormattedText.jsx";

const STATUS_STYLES = {
  mastered: "bg-[var(--color-correct-soft)] text-[var(--color-correct)]",
  weak: "bg-[var(--color-wrong-soft)] text-[var(--color-wrong)]",
  needs_practice: "bg-[var(--color-mark-soft)] text-[var(--color-ink)]",
  new: "bg-black/5 text-[var(--color-ink-soft)] dark:bg-white/5 dark:text-white/40",
};

export default function QuestionBank() {
  const { weeks, questionStats } = useAppData();
  const [openWeek, setOpenWeek] = useState(weeks[0]?.week ?? null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <p className="font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
        Question bank
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">
        Every question, grouped by week — nothing is hidden here, so it's safe to browse without spoiling practice.
      </p>

      <div className="mt-6 space-y-3">
        {weeks.map((w) => {
          const isOpen = openWeek === w.week;
          return (
            <div
              key={w.week}
              className="overflow-hidden rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]"
            >
              <button
                onClick={() => setOpenWeek(isOpen ? null : w.week)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                  {w.title} <span className="text-[var(--color-ink-soft)] dark:text-white/40">— {w.topic}</span>
                </span>
                <span className="font-mono-num text-xs text-[var(--color-ink-soft)] dark:text-white/40">
                  {w.questions.length}Q
                </span>
              </button>
              {isOpen && (
                <div className="space-y-2 border-t border-[var(--color-rule)] px-4 py-3 dark:border-[var(--color-rule-dark)]">
                  {w.questions.map((q, i) => {
                    const stat = questionStats[q.id];
                    const status = getQuestionStatus(stat);
                    const acc = accuracyOf(stat);
                    return (
                      <div key={q.id} className="rounded-md bg-black/[0.02] px-3 py-2 dark:bg-white/[0.03]">
                        <div className="flex items-start justify-between gap-2">
                          <FormattedText
                            text={`Q${i + 1}. ${q.question}`}
                            className="min-w-0 flex-1 text-sm text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]"
                            tableClassName="bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-1"
                          />
                          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
                            {STATUS_LABEL[status]}
                          </span>
                        </div>
                        {stat && (
                          <p className="font-mono-num mt-1 text-xs text-[var(--color-ink-soft)] dark:text-white/40">
                            {stat.attempts} attempts · {stat.correct} correct · {stat.wrong} wrong · {acc}% accuracy
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
