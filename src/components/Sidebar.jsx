import {
  LayoutDashboard,
  Shuffle,
  Layers,
  GraduationCap,
  BookOpen,
  AlertTriangle,
  History,
  X,
  CheckSquare,
} from "lucide-react";
import { useNav } from "../context/NavContext.jsx";
import { useAppData } from "../context/AppDataContext.jsx";

function NavItem({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors text-left min-h-[40px] ${
        active
          ? "bg-[var(--color-mark-soft)] text-[var(--color-ink)] font-medium dark:bg-[var(--color-panel-dark-raised)] dark:text-[var(--color-paper-dark)]"
          : "text-[var(--color-ink-soft)] hover:bg-black/[0.03] dark:text-[color-mix(in_oklab,var(--color-paper-dark)_70%,transparent)] dark:hover:bg-white/[0.04]"
      }`}
    >
      <Icon size={16} strokeWidth={2} />
      <span>{children}</span>
    </button>
  );
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { view, params, navigate } = useNav();
  const { weeks } = useAppData();

  const go = (v, p) => {
    navigate(v, p);
    onCloseMobile?.();
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5 pb-4">
        <p className="font-display text-lg leading-tight text-[var(--color-ink)] dark:text-[var(--color-paper-dark)]">
          NPTEL
          <br />
          Exam Prep
        </p>
        <p className="mt-1 text-xs text-[var(--color-ink-soft)] dark:text-white/50">
          Practice until it sticks
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="mb-4 space-y-0.5">
          <NavItem active={view === "dashboard"} onClick={() => go("dashboard")} icon={LayoutDashboard}>
            Dashboard
          </NavItem>
        </div>

        <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-soft)]/70 dark:text-white/35">
          Weeks
        </p>
        <div className="mb-4 space-y-0.5">
          {weeks.map((w) => (
            <NavItem
              key={w.week}
              active={view === "week" && params?.week === w.week}
              onClick={() => go("week", { week: w.week })}
              icon={Layers}
            >
              {w.title}
            </NavItem>
          ))}
        </div>

        <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-soft)]/70 dark:text-white/35">
          Mixed practice
        </p>
        <div className="mb-4 space-y-0.5">
          <NavItem active={view === "setupRandom"} onClick={() => go("setupRandom")} icon={Shuffle}>
            Random practice
          </NavItem>
          <NavItem active={view === "setupCustomWeeks"} onClick={() => go("setupCustomWeeks")} icon={CheckSquare}>
            Choose your weeks
          </NavItem>
          <NavItem active={view === "setupAllWeeks"} onClick={() => go("setupAllWeeks")} icon={Layers}>
            All 8 weeks
          </NavItem>
          <NavItem active={view === "setupFinal"} onClick={() => go("setupFinal")} icon={GraduationCap}>
            Final exam practice
          </NavItem>
        </div>

        <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-soft)]/70 dark:text-white/35">
          Review
        </p>
        <div className="space-y-0.5">
          <NavItem active={view === "bank"} onClick={() => go("bank")} icon={BookOpen}>
            Question bank
          </NavItem>
          <NavItem active={view === "weak"} onClick={() => go("weak")} icon={AlertTriangle}>
            Weak questions
          </NavItem>
          <NavItem active={view === "history"} onClick={() => go("history")} icon={History}>
            Result history
          </NavItem>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop/tablet sidebar */}
      <aside className="hidden md:block w-56 lg:w-64 shrink-0 border-r border-[var(--color-rule)] bg-[var(--color-paper-raised)] dark:bg-[var(--color-panel-dark)] dark:border-[var(--color-rule-dark)]">
        {content}
      </aside>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onCloseMobile} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[var(--color-paper-raised)] dark:bg-[var(--color-panel-dark)] shadow-xl">
            <button
              onClick={onCloseMobile}
              className="absolute right-3 top-3 rounded-md p-1.5 text-[var(--color-ink-soft)] hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
