import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import QuestionCard, { isAnswerCorrect } from "./QuestionCard.jsx";
import { useAppData } from "../context/AppDataContext.jsx";
import { useNav } from "../context/NavContext.jsx";

function formatTime(sec) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function Practice({ session, mode, scope, timeLimitSec }) {
  const { recordAttempt } = useAppData();
  const { navigate } = useNav();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qid]: { selected: [], checked: bool } }
  const [remaining, setRemaining] = useState(timeLimitSec || null);
  const startedAt = useRef(Date.now());
  const submittedRef = useRef(false);

  const examMode = mode === "exam";
  const current = session[index];
  const currentAnswer = answers[current.id] || { selected: [], checked: false };

  useEffect(() => {
    if (!examMode || !timeLimitSec) return;
    const timer = setInterval(() => {
      setRemaining((r) => {
        if (r === null) return r;
        if (r <= 1) {
          clearInterval(timer);
          finishSession();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleOption(opt) {
    if (currentAnswer.checked && !examMode) return;
    setAnswers((prev) => {
      const prevSel = prev[current.id]?.selected || [];
      let nextSel;
      if (current.type === "MSQ") {
        nextSel = prevSel.includes(opt) ? prevSel.filter((o) => o !== opt) : [...prevSel, opt];
      } else {
        nextSel = [opt];
      }
      return { ...prev, [current.id]: { selected: nextSel, checked: prev[current.id]?.checked || false } };
    });
  }

  function checkAnswer() {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: { ...prev[current.id], checked: true },
    }));
  }

  function goNext() {
    if (index < session.length - 1) {
      setIndex((i) => i + 1);
    } else {
      finishSession();
    }
  }

  function finishSession() {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const finalAnswers = {};
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    for (const q of session) {
      const a = answers[q.id];
      const selected = a?.selected || [];
      if (selected.length === 0) {
        unattempted++;
        finalAnswers[q.id] = { selected: [], correct: false };
        continue;
      }
      const isCorrect = isAnswerCorrect(selected, q.correctAnswers);
      if (isCorrect) correct++;
      else wrong++;
      finalAnswers[q.id] = { selected, correct: isCorrect };
    }

    const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
    const attempt = recordAttempt({
      mode,
      scope,
      total: session.length,
      correct,
      wrong,
      unattempted,
      answers: finalAnswers,
      durationSec,
    });

    navigate("result", { attempt, session });
  }

  const answeredCount = Object.values(answers).filter((a) => a.selected.length > 0).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-[var(--color-mark)] transition-all"
            style={{ width: `${((index + 1) / session.length) * 100}%` }}
          />
        </div>
        {examMode && timeLimitSec && (
          <div className="ml-4 flex items-center gap-1.5 font-mono-num text-sm text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
            <Clock size={15} />
            {formatTime(remaining ?? 0)}
          </div>
        )}
      </div>

      {examMode && (
        <p className="mb-3 text-xs text-[var(--color-ink-soft)] dark:text-white/50">
          {answeredCount} of {session.length} answered — results are shown only after you submit.
        </p>
      )}

      <QuestionCard
        key={current.id}
        question={current}
        index={index}
        total={session.length}
        selected={currentAnswer.selected}
        checked={currentAnswer.checked}
        onToggleOption={toggleOption}
        onCheck={checkAnswer}
        onNext={goNext}
        isLast={index === session.length - 1}
        examMode={examMode}
      />
    </div>
  );
}
