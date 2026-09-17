import { useAppData } from "../context/AppDataContext.jsx";

function scopeLabel(scope) {
  if (!scope) return "—";
  if (scope.type === "week") return `Week ${scope.week}`;
  if (scope.type === "random") return "Random";
  if (scope.type === "allweeks") return "All weeks";
  if (scope.type === "final") return "Final exam";
  if (scope.type === "weak") return "Weak questions";
  return scope.type;
}

export default function HistoryPage() {
  const { history } = useAppData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <p className="font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
        Result history
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] dark:text-white/50">
        Every attempt is kept — nothing here is ever overwritten.
      </p>

      {history.length === 0 ? (
        <p className="mt-6 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-4 py-6 text-center text-sm text-[var(--color-ink-soft)] dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)] dark:text-white/50">
          No attempts yet. Start a practice session to see it here.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--color-rule)] dark:border-[var(--color-rule-dark)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-rule)] bg-black/[0.02] text-xs text-[var(--color-ink-soft)] dark:border-[var(--color-rule-dark)] dark:bg-white/[0.03] dark:text-white/50">
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Scope</th>
                <th className="px-4 py-2 font-medium">Mode</th>
                <th className="px-4 py-2 font-medium">Score</th>
                <th className="px-4 py-2 font-medium">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {history.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-[var(--color-rule)] last:border-0 dark:border-[var(--color-rule-dark)]"
                >
                  <td className="px-4 py-2 text-[var(--color-ink-soft)] dark:text-white/50">
                    {new Date(a.date).toLocaleDateString()}{" "}
                    {new Date(a.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-4 py-2 text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    {scopeLabel(a.scope)}
                  </td>
                  <td className="px-4 py-2 capitalize text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    {a.mode}
                  </td>
                  <td className="font-mono-num px-4 py-2 text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
                    {a.correct}/{a.total}
                  </td>
                  <td className="font-mono-num px-4 py-2 text-[var(--color-mark-text)]">{a.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
