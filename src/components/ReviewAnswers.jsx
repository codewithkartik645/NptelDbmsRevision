import { Check, X, ArrowLeft } from "lucide-react";
import { useNav } from "../context/NavContext.jsx";
import FormattedText from "./FormattedText.jsx";

export default function ReviewAnswers({ attempt, session }) {
  const { navigate } = useNav();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      <button
        onClick={() => navigate("result", { attempt, session })}
        className="mb-4 flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] dark:text-white/50"
      >
        <ArrowLeft size={15} /> Back to result
      </button>

      <p className="mb-4 font-display text-xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
        Review answers
      </p>

      <div className="space-y-4">
        {session.map((q, i) => {
          const ans = attempt.answers[q.id] || { selected: [] };
          const correct = ans.correct;
          return (
            <div
              key={q.id}
              className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-4 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="font-mono-num text-xs text-[var(--color-ink-soft)] dark:text-white/50">Q{i + 1}</p>
                <span
                  className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium ${
                    ans.selected.length === 0
                      ? "bg-black/5 text-[var(--color-ink-soft)] dark:bg-white/5 dark:text-white/40"
                      : correct
                      ? "bg-[var(--color-correct-soft)] text-[var(--color-correct)]"
                      : "bg-[var(--color-wrong-soft)] text-[var(--color-wrong)]"
                  }`}
                >
                  {ans.selected.length === 0 ? (
                    "Unattempted"
                  ) : correct ? (
                    <>
                      <Check size={12} /> Correct
                    </>
                  ) : (
                    <>
                      <X size={12} /> Wrong
                    </>
                  )}
                </span>
              </div>
              <FormattedText
                text={q.question}
                className="text-sm text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]"
                tableClassName="bg-black/[0.03] dark:bg-white/[0.05] px-2 py-1.5"
              />
              <div className="mt-3 space-y-1.5">
                {q.options.map((opt) => {
                  const isSel = ans.selected.includes(opt);
                  const isCorrectOpt = q.correctAnswers.includes(opt);
                  let cls = "border-[var(--color-rule)] dark:border-[var(--color-rule-dark)] text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]";
                  let tableBg = "bg-black/[0.04] dark:bg-white/[0.06]";
                  // correct-soft/wrong-soft are fixed light pastels in both
                  // themes, so once applied, text must stay dark-ink (not
                  // theme-adaptive) or it becomes invisible in dark mode.
                  if (isCorrectOpt) {
                    cls = "border-[var(--color-correct)] bg-[var(--color-correct-soft)] text-[var(--color-ink)]";
                    tableBg = "bg-black/[0.06]";
                  } else if (isSel) {
                    cls = "border-[var(--color-wrong)] bg-[var(--color-wrong-soft)] text-[var(--color-ink)]";
                    tableBg = "bg-black/[0.06]";
                  }
                  return (
                    <div key={opt} className={`rounded-md border px-3 py-1.5 text-sm ${cls}`}>
                      <FormattedText text={opt} tableClassName={`${tableBg} px-1.5 py-1`} />
                      {isSel && <span className="ml-1.5 text-xs opacity-60">(your answer)</span>}
                    </div>
                  );
                })}
              </div>
              {q.explanation && (
                <p className="mt-2 rule-top pt-2 text-xs text-[var(--color-ink-soft)] dark:text-white/50">
                  <span className="font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    Explanation:{" "}
                  </span>
                  <span className="whitespace-pre-wrap">{q.explanation}</span>
                </p>
              )}
              {q.hinglishExplanation && (
                <p className="mt-2 rule-top pt-2 text-xs text-[var(--color-ink-soft)] dark:text-white/50">
                  <span className="font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    🇮🇳 Concept Hinglish mein:{" "}
                  </span>
                  <span className="whitespace-pre-wrap">{q.hinglishExplanation}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
