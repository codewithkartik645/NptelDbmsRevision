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

// Recharts takes literal color strings, not Tailwind classes, so chart
// colors are resolved here per theme rather than left as CSS vars tuned
// only for light mode (which read as low-contrast grey-on-grey once dark
// mode actually applies correctly).
function useChartColors() {
  const { theme } = useAppData();
  const isDark = theme === "dark";
  return {
    grid: isDark ? "rgba(231,233,242,0.12)" : "#d7dce4",
    tick: isDark ? "rgba(231,233,242,0.6)" : "#4b5169",
    tooltipBg: isDark ? "#1e2340" : "#ffffff",
    tooltipBorder: isDark ? "#2c3253" : "#d7dce4",
    tooltipText: isDark ? "#e7e9f2" : "#1c2033",
    accent: "#e3a32b",
  };
}

export function AccuracyOverTime() {
  const { history } = useAppData();
  const c = useChartColors();
  if (history.length === 0) return <EmptyState label="Practice a few questions to see your accuracy trend here." />;

  const data = [...history]
    .reverse()
    .map((a, i) => ({ name: `#${i + 1}`, accuracy: a.accuracy }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: c.tick }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: c.tick }} />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: `1px solid ${c.tooltipBorder}`,
            backgroundColor: c.tooltipBg,
            color: c.tooltipText,
          }}
          labelStyle={{ color: c.tooltipText }}
          itemStyle={{ color: c.tooltipText }}
          formatter={(v) => [`${v}%`, "Accuracy"]}
        />
        <Line type="monotone" dataKey="accuracy" stroke={c.accent} strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WeekWiseAccuracy() {
  const { weeks, history } = useAppData();
  const c = useChartColors();
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
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: c.tick }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: c.tick }} />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: `1px solid ${c.tooltipBorder}`,
            backgroundColor: c.tooltipBg,
            color: c.tooltipText,
          }}
          labelStyle={{ color: c.tooltipText }}
          itemStyle={{ color: c.tooltipText }}
          formatter={(v) => [`${v}%`, "Accuracy"]}
        />
        <Bar dataKey="accuracy" fill={c.accent} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
