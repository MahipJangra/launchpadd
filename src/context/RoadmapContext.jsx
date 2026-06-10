import { createContext, useContext, useState } from "react";

const RoadmapContext = createContext(null);

export function RoadmapProvider({ children }) {
  const [idea, setIdea] = useState("");
  const [questions, setQuestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [roadmap, setRoadmap] = useState(null);
  const [savedRoadmaps, setSavedRoadmaps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("launchpad_roadmaps") || "[]"); }
    catch { return []; }
  });

  const saveRoadmap = (data) => {
    const entry = { ...data, savedAt: new Date().toISOString(), id: Date.now() };
    const updated = [entry, ...savedRoadmaps].slice(0, 10);
    setSavedRoadmaps(updated);
    localStorage.setItem("launchpad_roadmaps", JSON.stringify(updated));
    return entry;
  };

  const reset = () => {
    setIdea(""); setQuestions([]); setSuggestions([]); setAnswers({}); setRoadmap(null);
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
