// Persistence layer. Everything the app saves goes through here.
// Swappable later for a real backend/database without touching UI code —
// just reimplement these functions with the same signatures.

const STORAGE_KEY = "nptel_prep_v1";

const DEFAULT_STATE = {
  theme: "light",
  history: [], // array of attempt records, newest first
  questionStats: {}, // { [questionId]: { attempts, correct, wrong } }
};

export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme || DEFAULT_STATE.theme,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      questionStats:
        parsed.questionStats && typeof parsed.questionStats === "object"
          ? parsed.questionStats
          : {},
    };
  } catch (err) {
    console.error("Failed to load saved progress, starting fresh:", err);
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error("Failed to save progress:", err);
    return false;
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error("Failed to clear progress:", err);
    return false;
  }
}
