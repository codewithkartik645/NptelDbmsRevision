import { Check, X, Circle, CheckCircle2, Square, CheckSquare } from "lucide-react";

// Exact-set comparison: correct only if selected options exactly match correctAnswers.
export function isAnswerCorrect(selected, correctAnswers) {
  if (selected.length !== correctAnswers.length) return false;
  const a = [...selected].sort();
  const b = [...correctAnswers].sort();
  return a.every((v, i) => v === b[i]);
}

export default function QuestionCard({
  question,
  index,
  total,
  selected,
  checked,
  onToggleOption,
  onCheck,
  onNext,
  isLast,
  examMode,
}) {
  const isMulti = question.type === "MSQ";
  const correct = checked && isAnswerCorrect(selected, question.correctAnswers);
  const showFeedback = checked && !examMode;

  return (
    <div className="animate-reveal rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
      <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-5 py-3 dark:border-[var(--color-rule-dark)]">
        <p className="font-mono-num text-xs text-[var(--color-ink-soft)] dark:text-white/50">
          Question {index + 1} of {total}
        </p>
        <span className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[11px] font-medium text-[var(--color-ink-soft)] dark:bg-white/[0.06] dark:text-white/50">
          {isMulti ? "Select all that apply" : "Single choice"}
        </span>
      </div>

      <div className="px-5 py-4">
        <p className="whitespace-pre-wrap font-display text-[15px] leading-relaxed text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          {question.question}
        </p>

        <div className="mt-4 space-y-2">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt);
            const isCorrectOpt = question.correctAnswers.includes(opt);
            let stateClasses =
              "border-[var(--color-rule)] hover:border-[var(--color-ink-soft)]/40 dark:border-[var(--color-rule-dark)]";
            if (isSelected && !checked) {
              stateClasses = "border-[var(--color-mark)] bg-[var(--color-mark-soft)]";
            }
            if (checked && !examMode) {
              if (isCorrectOpt) {
                stateClasses = "border-[var(--color-correct)] bg-[var(--color-correct-soft)]";
              } else if (isSelected && !isCorrectOpt) {
                stateClasses = "border-[var(--color-wrong)] bg-[var(--color-wrong-soft)]";
              }
            }
            if (checked && examMode && isSelected) {
              stateClasses = "border-[var(--color-mark)] bg-[var(--color-mark-soft)]";
            }

            const Icon = isMulti
              ? isSelected
                ? CheckSquare
                : Square
              : isSelected
              ? CheckCircle2
              : Circle;

            return (
              <button
                key={opt}
                disabled={checked && !examMode}
                onClick={() => onToggleOption(opt)}
                className={`flex w-full items-start gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${stateClasses}`}
              >
                <Icon
                  size={17}
                  className="mt-0.5 shrink-0 text-[var(--color-ink-soft)] dark:text-white/40"
                  strokeWidth={2}
                />
                <span className="whitespace-pre-wrap text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div
            className={`mt-4 rounded-md px-3.5 py-2.5 text-sm ${
              correct
                ? "bg-[var(--color-correct-soft)] text-[var(--color-correct)]"
                : "bg-[var(--color-wrong-soft)] text-[var(--color-wrong)]"
            }`}
          >
            <p className="flex items-center gap-1.5 font-medium">
              {correct ? <Check size={16} /> : <X size={16} />}
              {correct ? "Correct!" : "Wrong"}
            </p>
            <p className="mt-1 text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
              Your answer: {selected.length ? selected.join(", ") : "—"}
              <br />
              Correct answer: {question.correctAnswers.join(", ")}
            </p>
            {question.explanation && (
              <div className="mt-2 rule-top pt-2 text-[var(--color-ink-soft)] dark:text-white/60">
                <p className="mb-0.5 font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                  Explanation
                </p>
                <p className="whitespace-pre-wrap">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-[var(--color-rule)] px-5 py-3 dark:border-[var(--color-rule-dark)]">
        {!examMode && !checked && (
          <button
            onClick={onCheck}
            disabled={selected.length === 0}
            className="rounded-md bg-[var(--color-ink)] px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
          >
            Check answer
          </button>
        )}
        {(examMode || checked) && (
          <button
            onClick={onNext}
            className="rounded-md bg-[var(--color-ink)] px-4 py-1.5 text-sm font-medium text-white dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
          >
            {isLast ? (examMode ? "Submit exam" : "Finish") : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}
