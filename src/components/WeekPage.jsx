import { Play, ListChecks } from "lucide-react";
import { useAppData } from "../context/AppDataContext.jsx";
import { useNav } from "../context/NavContext.jsx";
import { buildSession } from "../utils/shuffle.js";
import { weekStats, getQuestionStatus, STATUS_LABEL, accuracyOf } from "../utils/stats.js";
import StatCard from "./StatCard.jsx";

const STATUS_STYLES = {
  mastered: "bg-[var(--color-correct-soft)] text-[var(--color-correct)]",
  weak: "bg-[var(--color-wrong-soft)] text-[var(--color-wrong)]",
  needs_practice: "bg-[var(--color-mark-soft)] text-[var(--color-ink)]",
  new: "bg-black/5 text-[var(--color-ink-soft)] dark:bg-white/5 dark:text-white/40",
};

export default function WeekPage({ week }) {
  const { weeks, history, questionStats } = useAppData();
  const { navigate } = useNav();

  const weekData = weeks.find((w) => w.week === week);
  if (!weekData) return null;

  const stats = weekStats(week, weekData.questions, history, questionStats);

  function startFullPractice() {
    const session = buildSession(weekData.questions);
    navigate("practice", { session, mode: "full", scope: { type: "week", week } });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <p className="font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
        {weekData.title}
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">{weekData.topic}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Questions" value={stats.questionCount} />
        <StatCard label="Times practiced" value={stats.timesPracticed} />
        <StatCard label="Best score" value={stats.bestScore} />
        <StatCard label="Avg. accuracy" value={`${stats.avgAccuracy}%`} accent />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={startFullPractice}
          className="flex items-center gap-2 rounded-md bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-white dark:bg-[var(--color-mark)] dark:text-[var(--color-ink-dark)]"
        >
          <Play size={15} /> Start full practice ({weekData.questions.length} questions, shuffled)
        </button>
      </div>

      <div className="mt-8">
        <p className="mb-3 flex items-center gap-1.5 font-display text-lg text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          <ListChecks size={18} /> Questions in this week
        </p>
        <div className="space-y-2">
          {weekData.questions.map((q, i) => {
            const stat = questionStats[q.id];
            const status = getQuestionStatus(stat);
            const acc = accuracyOf(stat);
            return (
              <div
                key={q.id}
                className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-3.5 py-2.5 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    Q{i + 1}. {q.question.split("\n")[0]}
                  </p>
                  {stat && (
                    <p className="font-mono-num text-xs text-[var(--color-ink-soft)] dark:text-white/40">
                      {stat.attempts} attempts · {acc}% accuracy
                    </p>
                  )}
                </div>
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
                  {STATUS_LABEL[status]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
