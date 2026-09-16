import { useAppData } from "../context/AppDataContext.jsx";
import { useNav } from "../context/NavContext.jsx";
import StatCard from "./StatCard.jsx";
import { AccuracyOverTime, WeekWiseAccuracy } from "./Charts.jsx";
import { overallDashboardStats, weekStats } from "../utils/stats.js";

export default function Dashboard() {
  const { weeks, allQuestions, history, questionStats } = useAppData();
  const { navigate } = useNav();

  const stats = overallDashboardStats(history, questionStats, allQuestions.length, weeks.length);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <div className="mb-6">
        <p className="font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          Overall progress
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">
          {stats.weeksCount} weeks · {stats.totalQuestionCount} questions in the bank
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total attempts" value={stats.totalAttempts} />
        <StatCard label="Overall accuracy" value={`${stats.overallAccuracy}%`} accent />
        <StatCard label="Mastered questions" value={stats.masteredCount} sub={`of ${stats.totalQuestionCount}`} />
        <StatCard label="Weak questions" value={stats.weakCount} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-4 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
          <p className="mb-2 text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
            Accuracy over time
          </p>
          <AccuracyOverTime />
        </div>
        <div className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-4 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
          <p className="mb-2 text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
            Week-wise accuracy
          </p>
          <WeekWiseAccuracy />
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 font-display text-lg text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          Weeks
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {weeks.map((w) => {
            const ws = weekStats(w.week, w.questions, history, questionStats);
            return (
              <button
                key={w.week}
                onClick={() => navigate("week", { week: w.week })}
                className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-4 text-left transition-shadow hover:shadow-sm dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]"
              >
                <div className="flex items-start justify-between">
                  <p className="font-display text-base text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    {w.title}
                  </p>
                  <span className="font-mono-num text-xs text-[var(--color-ink-soft)] dark:text-white/40">
                    {ws.questionCount}Q
                  </span>
                </div>
                <div className="mt-3 rule-top pt-2 flex items-center justify-between text-xs">
                  <span className="text-[var(--color-ink-soft)] dark:text-white/50">
                    Best: <span className="font-mono-num">{ws.bestScore}</span>
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-medium ${
                      ws.status === "Mastered"
                        ? "bg-[var(--color-correct-soft)] text-[var(--color-correct)]"
                        : ws.status === "Not started"
                        ? "bg-black/5 text-[var(--color-ink-soft)] dark:bg-white/5 dark:text-white/40"
                        : "bg-[var(--color-mark-soft)] text-[var(--color-ink)]"
                    }`}
                  >
                    {ws.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
