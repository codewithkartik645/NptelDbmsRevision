import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useAppData } from "../context/AppDataContext.jsx";
import SetupPractice from "./SetupPractice.jsx";

export default function CustomWeeksSetup() {
  const { weeks, allQuestions } = useAppData();
  // Every week selected by default — a student can immediately press start
  // for "all weeks", or narrow down to just the ones they want.
  const [selectedWeeks, setSelectedWeeks] = useState(() => weeks.map((w) => w.week));

  function toggleWeek(weekNum) {
    setSelectedWeeks((prev) =>
      prev.includes(weekNum) ? prev.filter((w) => w !== weekNum) : [...prev, weekNum].sort((a, b) => a - b)
    );
  }

  function selectAll() {
    setSelectedWeeks(weeks.map((w) => w.week));
  }

  function selectNone() {
    setSelectedWeeks([]);
  }

  const pool = useMemo(
    () => allQuestions.filter((q) => selectedWeeks.includes(q.week)),
    [allQuestions, selectedWeeks]
  );

  const weekPicker = (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          Choose which weeks to include
        </p>
        <div className="flex gap-3 text-xs">
          <button onClick={selectAll} className="text-[var(--color-mark-text)] hover:underline">
            Select all
          </button>
          <button onClick={selectNone} className="text-[var(--color-ink-soft)] hover:underline dark:text-white/50">
            Clear
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {weeks.map((w) => {
          const isOn = selectedWeeks.includes(w.week);
          return (
            <button
              key={w.week}
              onClick={() => toggleWeek(w.week)}
              className={`flex min-h-[44px] items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                isOn
                  ? "border-[var(--color-mark)] bg-[var(--color-mark-soft)] text-[var(--color-ink)]"
                  : "border-[var(--color-rule)] text-[var(--color-ink-soft)] dark:border-[var(--color-rule-dark)] dark:text-white/50"
              }`}
            >
              <span>{w.title}</span>
              {isOn ? <Check size={15} /> : <span className="font-mono-num text-xs opacity-60">{w.questions.length}Q</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <SetupPractice
      key={selectedWeeks.join(",")}
      title="Choose your weeks"
      description="Pick any combination of weeks — questions and options are shuffled from just that selection."
      pool={pool}
      scope={{ type: "custom", weeks: selectedWeeks }}
      counts={[10, 20, 40, "all"]}
      ensurePerWeekCoverage
      weeks={selectedWeeks}
      beforeCounts={weekPicker}
      emptyMessage="Select at least one week above to build a practice set."
    />
  );
}
