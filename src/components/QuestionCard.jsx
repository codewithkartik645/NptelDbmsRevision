import { Check, X, Circle, CheckCircle2, Square, CheckSquare } from "lucide-react";
import FormattedText from "./FormattedText.jsx";

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
        <FormattedText
          text={question.question}
          className="font-display text-[15px] leading-relaxed text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]"
          tableClassName="bg-black/[0.03] dark:bg-white/[0.05] px-2 py-1.5"
        />

        <div className="mt-4 space-y-2">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt);
            const isCorrectOpt = question.correctAnswers.includes(opt);
            let stateClasses =
              "border-[var(--color-rule)] hover:border-[var(--color-ink-soft)]/40 dark:border-[var(--color-rule-dark)]";
            // `highlighted` tracks whether this row has a colored (always-light,
            // non-theme-adaptive) background applied below. Text and icon color
            // must stay dark-ink whenever that's true, in both light and dark
            // mode, since the pastel highlight itself never darkens.
            let highlighted = false;

            if (isSelected && !checked) {
              stateClasses = "border-[var(--color-mark)] bg-[var(--color-mark-soft)]";
              highlighted = true;
            }
            if (checked && !examMode) {
              if (isCorrectOpt) {
                stateClasses = "border-[var(--color-correct)] bg-[var(--color-correct-soft)]";
                highlighted = true;
              } else if (isSelected && !isCorrectOpt) {
                stateClasses = "border-[var(--color-wrong)] bg-[var(--color-wrong-soft)]";
                highlighted = true;
              }
            }
            if (checked && examMode && isSelected) {
              stateClasses = "border-[var(--color-mark)] bg-[var(--color-mark-soft)]";
              highlighted = true;
            }

            const textClass = highlighted
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]";
            const iconClass = highlighted ? "text-[var(--color-ink-soft)]" : "text-[var(--color-ink-soft)] dark:text-white/40";
            const tableBgClass = highlighted ? "bg-black/[0.06]" : "bg-black/[0.04] dark:bg-white/[0.06]";

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
                className={`flex w-full min-h-[44px] items-start gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${stateClasses}`}
              >
                <Icon size={17} className={`mt-0.5 shrink-0 ${iconClass}`} strokeWidth={2} />
                <FormattedText text={opt} className={`min-w-0 flex-1 ${textClass}`} tableClassName={`${tableBgClass} px-1.5 py-1`} />
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
            {/* This banner's background is always a light pastel tint in both
                themes, so its text stays fixed dark-ink rather than following
                the page theme — a theme-adaptive light color here would be
                invisible against the light background, as it was before. */}
            <p className="mt-1 text-[var(--color-ink)]">
              Your answer: {selected.length ? selected.join(", ") : "—"}
              <br />
              Correct answer: {question.correctAnswers.join(", ")}
            </p>
            {question.explanation && (
              <div className="mt-2 border-t border-black/10 pt-2 text-[var(--color-ink)]/70">
                <p className="mb-0.5 font-medium text-[var(--color-ink)]">Explanation</p>
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
            className="rounded-md bg-[var(--color-ink)] px-4 py-2 min-h-[40px] text-sm font-medium text-white disabled:opacity-40 dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
          >
            Check answer
          </button>
        )}
        {(examMode || checked) && (
          <button
            onClick={onNext}
            className="rounded-md bg-[var(--color-ink)] px-4 py-2 min-h-[40px] text-sm font-medium text-white dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
          >
            {isLast ? (examMode ? "Submit exam" : "Finish") : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}
