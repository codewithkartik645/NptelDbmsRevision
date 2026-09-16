import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useAppData } from "../context/AppDataContext.jsx";

export default function SearchPage() {
  const { allQuestions } = useAppData();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allQuestions.filter((item) => {
      if (item.question.toLowerCase().includes(q)) return true;
      if (item.options.some((o) => o.toLowerCase().includes(q))) return true;
      if (`week ${item.week}`.includes(q)) return true;
      return false;
    });
  }, [query, allQuestions]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <p className="font-display text-2xl text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
        Search questions
      </p>
      <div className="mt-4 flex items-center gap-2 rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-3 py-2 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]">
        <SearchIcon size={16} className="text-[var(--color-ink-soft)] dark:text-white/40" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search question text, options, or 'week 3'…"
          className="w-full bg-transparent text-sm outline-none text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]"
        />
      </div>

      {query.trim() && (
        <p className="mt-3 text-xs text-[var(--color-ink-soft)] dark:text-white/40">{results.length} result(s)</p>
      )}

      <div className="mt-3 space-y-2">
        {results.map((q) => (
          <div
            key={q.id}
            className="rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-3.5 py-2.5 dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)]"
          >
            <p className="font-mono-num text-xs text-[var(--color-ink-soft)] dark:text-white/40">Week {q.week}</p>
            <p className="mt-0.5 whitespace-pre-wrap text-sm text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
              {q.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
