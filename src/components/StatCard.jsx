export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-4 py-3.5 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
      <p className="text-xs text-[var(--color-ink-soft)] dark:text-white/50">{label}</p>
      <p
        className={`font-mono-num mt-1 text-2xl font-semibold ${
          accent ? "text-[var(--color-mark)]" : "text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-[var(--color-ink-soft)] dark:text-white/40">{sub}</p>}
    </div>
  );
}
