import { Menu, Sun, Moon, Search } from "lucide-react";
import { useAppData } from "../context/AppDataContext.jsx";
import { useNav } from "../context/NavContext.jsx";

export default function Topbar({ onOpenMobileMenu }) {
  const { theme, toggleTheme } = useAppData();
  const { navigate } = useNav();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/90 backdrop-blur px-4 py-3 dark:bg-[var(--color-ink-dark)]/90 dark:border-[var(--color-rule-dark)]">
      <button
        className="md:hidden rounded-md p-1.5 text-[var(--color-ink-soft)] hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
        onClick={onOpenMobileMenu}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <button
        onClick={() => navigate("search")}
        className="flex flex-1 max-w-sm items-center gap-2 rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-raised)] px-3 py-1.5 text-sm text-[var(--color-ink-soft)] dark:bg-[var(--color-panel-dark-raised)] dark:border-[var(--color-rule-dark)] dark:text-white/50"
      >
        <Search size={15} />
        <span>Search questions…</span>
      </button>

      <div className="flex-1" />

      <button
        onClick={toggleTheme}
        className="rounded-md p-2 text-[var(--color-ink-soft)] hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
        aria-label="Toggle theme"
        title="Toggle light / dark mode"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
