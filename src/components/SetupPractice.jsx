import { useState } from "react";
import { Play, Timer } from "lucide-react";
import { useNav } from "../context/NavContext.jsx";
import { shuffleArray, buildSession } from "../utils/shuffle.js";

export default function SetupPractice({ title, description, pool, scope, counts, ensurePerWeekCoverage, weeks }) {
  const { navigate } = useNav();
  const [selectedCount, setSelectedCount] = useState(counts[Math.floor(counts.length / 2)]);
  const [examMode, setExamMode] = useState(false);
  const [minutes, setMinutes] = useState(30);

  function buildPool(count) {
    if (count === "all" || count >= pool.length) return shuffleArray(pool);

    if (ensurePerWeekCoverage && weeks && weeks.length > 0 && count >= weeks.length) {
      // Guarantee at least one question from every week, then fill the rest randomly.
      const perWeek = weeks.map((w) => shuffleArray(pool.filter((q) => q.week === w)));
      const guaranteed = perWeek.map((arr) => arr[0]).filter(Boolean);
      const guaranteedIds = new Set(guaranteed.map((q) => q.id));
      const remainderPool = shuffleArray(pool.filter((q) => !guaranteedIds.has(q.id)));
      const remainder = remainderPool.slice(0, Math.max(0, count - guaranteed.length));
      return shuffleArray([...guaranteed, ...remainder]);
    }

    return shuffleArray(pool).slice(0, count);
  }

  function start() {
    const count = selectedCount === "all" ? pool.length : selectedCount;
    const picked = buildPool(count);
    const session = buildSession(picked);
    navigate("practice", {
      session,
      mode: examMode ? "exam" : "full",
      scope,
      timeLimitSec: examMode ? minutes * 60 : null,
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      <p className="font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">{title}</p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">{description}</p>
      <p className="font-mono-num mt-3 text-xs text-[var(--color-ink-soft)] dark:text-white/40">
        {pool.length} questions available in this pool
      </p>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          Number of questions
        </p>
        <div className="flex flex-wrap gap-2">
          {counts.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCount(c)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                selectedCount === c
                  ? "border-[var(--color-mark)] bg-[var(--color-mark-soft)] text-[var(--color-ink)]"
                  : "border-[var(--color-rule)] text-[var(--color-ink-soft)] dark:border-[var(--color-rule-dark)] dark:text-white/50"
              }`}
            >
              {c === "all" ? "All questions" : `${c} questions`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-4 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
        <label className="flex items-center justify-between gap-3">
          <span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
              <Timer size={15} /> Exam mode
            </span>
            <span className="text-xs text-[var(--color-ink-soft)] dark:text-white/40">
              No immediate feedback, optional timer, results only at the end.
            </span>
          </span>
          <input
            type="checkbox"
            checked={examMode}
            onChange={(e) => setExamMode(e.target.checked)}
            className="h-5 w-5 accent-[var(--color-mark)]"
          />
        </label>
        {examMode && (
          <div className="mt-3 flex items-center gap-2 rule-top pt-3">
            <span className="text-sm text-[var(--color-ink-soft)] dark:text-white/50">Time limit (minutes)</span>
            <input
              type="number"
              min={1}
              value={minutes}
              onChange={(e) => setMinutes(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 rounded-md border border-[var(--color-rule)] bg-transparent px-2 py-1 text-sm dark:border-[var(--color-rule-dark)]"
            />
          </div>
        )}
      </div>

      <button
        onClick={start}
        disabled={pool.length === 0}
        className="mt-6 flex items-center gap-2 rounded-md bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
      >
        <Play size={15} /> {examMode ? "Start exam" : "Start practice"}
      </button>
    </div>
  );
}
