import { useState } from "react";
import { NavContext } from "./context/NavContext.jsx";
import { useAppData } from "./context/AppDataContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import WeekPage from "./components/WeekPage.jsx";
import SetupPractice from "./components/SetupPractice.jsx";
import Practice from "./components/Practice.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import ReviewAnswers from "./components/ReviewAnswers.jsx";
import QuestionBank from "./components/QuestionBank.jsx";
import WeakQuestions from "./components/WeakQuestions.jsx";
import HistoryPage from "./components/HistoryPage.jsx";
import SearchPage from "./components/SearchPage.jsx";

export default function App() {
  const [route, setRoute] = useState({ view: "dashboard", params: {} });
  const [mobileOpen, setMobileOpen] = useState(false);
  const { allQuestions, weeks } = useAppData();

  function navigate(view, params = {}) {
    setRoute({ view, params });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  let content;
  switch (route.view) {
    case "dashboard":
      content = <Dashboard />;
      break;
    case "week":
      content = <WeekPage week={route.params.week} />;
      break;
    case "setupRandom":
      content = (
        <SetupPractice
          title="Random practice"
          description="Questions are randomly selected from all available assignment questions."
          pool={allQuestions}
          scope={{ type: "random" }}
          counts={[5, 10, 20, "all"]}
        />
      );
      break;
    case "setupAllWeeks":
      content = (
        <SetupPractice
          title="All 8 weeks practice"
          description="Questions will be randomly selected from Week 1 through Week 8 — great for cumulative review."
          pool={allQuestions}
          scope={{ type: "allweeks" }}
          counts={[20, 40, "all"]}
          ensurePerWeekCoverage
          weeks={weeks.map((w) => w.week)}
        />
      );
      break;
    case "setupFinal":
      content = (
        <SetupPractice
          title="Final exam practice"
          description={`Simulate the real exam: a mix pulled from all ${allQuestions.length} questions across every week.`}
          pool={allQuestions}
          scope={{ type: "final" }}
          counts={[20, 40, 60, 100, "all"]}
          ensurePerWeekCoverage
          weeks={weeks.map((w) => w.week)}
        />
      );
      break;
    case "practice":
      content = (
        <Practice
          session={route.params.session}
          mode={route.params.mode}
          scope={route.params.scope}
          timeLimitSec={route.params.timeLimitSec}
        />
      );
      break;
    case "result":
      content = <ResultScreen attempt={route.params.attempt} session={route.params.session} />;
      break;
    case "review":
      content = <ReviewAnswers attempt={route.params.attempt} session={route.params.session} />;
      break;
    case "bank":
      content = <QuestionBank />;
      break;
    case "weak":
      content = <WeakQuestions />;
      break;
    case "history":
      content = <HistoryPage />;
      break;
    case "search":
      content = <SearchPage />;
      break;
    default:
      content = <Dashboard />;
  }

  return (
    <NavContext.Provider value={{ view: route.view, params: route.params, navigate }}>
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />
          <main className="flex-1">{content}</main>
        </div>
      </div>
    </NavContext.Provider>
  );
}
