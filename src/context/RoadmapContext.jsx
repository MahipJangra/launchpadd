import { createContext, useContext, useState, useEffect } from "react";

const RoadmapContext = createContext(null);

// Helper functions
const saveToSession = (key, value) => {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {}
};
const loadFromSession = (key, fallback) => {
  try {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch { return fallback; }
};

export function RoadmapProvider({ children }) {
  const [idea, setIdeaState] = useState(() => loadFromSession("lp_idea", ""));
  const [questions, setQuestionsState] = useState(() => loadFromSession("lp_questions", []));
  const [suggestions, setSuggestionsState] = useState(() => loadFromSession("lp_suggestions", []));
  const [answers, setAnswersState] = useState(() => loadFromSession("lp_answers", {}));
  const [roadmap, setRoadmapState] = useState(() => loadFromSession("lp_roadmap", null));

  const [savedRoadmaps, setSavedRoadmaps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("launchpad_roadmaps") || "[]"); }
    catch { return []; }
  });

  // Sync to sessionStorage on every change
  const setIdea = (val) => { setIdeaState(val); saveToSession("lp_idea", val); };
  const setQuestions = (val) => { setQuestionsState(val); saveToSession("lp_questions", val); };
  const setSuggestions = (val) => { setSuggestionsState(val); saveToSession("lp_suggestions", val); };
  const setAnswers = (val) => { setAnswersState(val); saveToSession("lp_answers", val); };
  const setRoadmap = (val) => { setRoadmapState(val); saveToSession("lp_roadmap", val); };

  const saveRoadmap = (data) => {
    const entry = { ...data, savedAt: new Date().toISOString(), id: Date.now() };
    const updated = [entry, ...savedRoadmaps].slice(0, 10);
    setSavedRoadmaps(updated);
    localStorage.setItem("launchpad_roadmaps", JSON.stringify(updated));
    return entry;
  };

  const reset = () => {
    setIdea(""); setQuestions([]); setSuggestions([]); setAnswers({}); setRoadmap(null);
    sessionStorage.clear();
  };

  return (
    <RoadmapContext.Provider value={{
      idea, setIdea,
      questions, setQuestions,
      suggestions, setSuggestions,
      answers, setAnswers,
      roadmap, setRoadmap,
      savedRoadmaps, setSavedRoadmaps, saveRoadmap,
      reset,
    }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export const useRoadmap = () => useContext(RoadmapContext);
