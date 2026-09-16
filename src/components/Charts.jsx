import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useAppData } from "../context/AppDataContext.jsx";

function EmptyState({ label }) {
  return (
    <div className="flex h-52 items-center justify-center text-sm text-[var(--color-ink-soft)] dark:text-white/40">
      {label}
    </div>
  );
}

export function AccuracyOverTime() {
  const { history } = useAppData();
  if (history.length === 0) return <EmptyState label="Practice a few questions to see your accuracy trend here." />;

  const data = [...history]
    .reverse()
    .map((a, i) => ({ name: `#${i + 1}`, accuracy: a.accuracy }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule)" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--color-rule)" }}
          formatter={(v) => [`${v}%`, "Accuracy"]}
        />
        <Line type="monotone" dataKey="accuracy" stroke="var(--color-mark)" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WeekWiseAccuracy() {
  const { weeks, history } = useAppData();
  const data = weeks.map((w) => {
    const attempts = history.filter((a) => a.scope?.type === "week" && a.scope.week === w.week);
    const answered = attempts.reduce((s, a) => s + a.correct + a.wrong, 0);
    const correct = attempts.reduce((s, a) => s + a.correct, 0);
    return {
      name: `W${w.week}`,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  });

  const hasAny = data.some((d) => d.accuracy > 0);
  if (!hasAny) return <EmptyState label="Complete a week's practice to see per-week accuracy." />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule)" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--color-rule)" }}
          formatter={(v) => [`${v}%`, "Accuracy"]}
        />
        <Bar dataKey="accuracy" fill="var(--color-mark)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
