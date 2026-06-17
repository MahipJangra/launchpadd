import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRoadmap } from "../context/RoadmapContext";
import { analyzeIdea } from "../utils/api";
import toast from "react-hot-toast";
import "../styles/global.css";
import "../styles/analyze.css";

export default function Analyze() {
  const navigate = useNavigate();
  const { idea, questions, suggestions, answers, setAnswers, setRoadmap, saveRoadmap } = useRoadmap();
  const [currentQ, setCurrentQ] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [generating, setGenerating] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [ready, setReady] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    // Small delay to let sessionStorage restore first
    const timer = setTimeout(() => {
      if (!idea || questions.length === 0) {
        navigate("/");
      } else {
        setReady(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (customMode && inputRef.current) inputRef.current.focus();
  }, [customMode]);

  const handleSuggestionClick = (suggestion) => {
    setCurrentAnswer(suggestion);
    setCustomMode(false);
  };

  const handleAnswer = async (answerText) => {
    const answer = answerText || currentAnswer;
    if (!answer.trim()) return;

    const updated = { ...answers, [currentQ]: answer };
    setAnswers(updated);
    setCurrentAnswer("");
    setCustomMode(false);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      await generate(updated);
    }
  };

  const generate = async (allAnswers) => {
    setGenerating(true);
    try {
      const qaText = questions
        .map((q, i) => `Q: ${q}\nA: ${allAnswers[i]}`)
        .join("\n\n");

      const result = await analyzeIdea([
        { role: "user", content: `Idea: ${idea}` },
        { role: "assistant", content: JSON.stringify({ phase: "questions", questions }) },
        {
          role: "user",
          content: `Here are my answers:\n\n${qaText}\n\nNow generate the complete roadmap.`,
        },
      ]);

      if (result.phase === "roadmap") {
        setRoadmap(result);
        saveRoadmap({ ...result, originalIdea: idea });
        navigate("/roadmap");
      } else {
        toast.error("Could not generate roadmap. Try again.");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error generating roadmap");
      navigate("/");
    } finally {
      setGenerating(false);
    }
  };

  // Loading state while sessionStorage restores
  if (!ready && !generating) {
    return (
      <div className="page center">
        <div className="gen-icon pulse">⚡</div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="page center">
        <div className="generating">
          <div className="gen-icon pulse">🔮</div>
          <h2 className="gen-title">BUILDING YOUR ROADMAP</h2>
          <p className="gen-sub">Analyzing market, tech, costs & strategy...</p>
          <div className="gen-tags">
            {["Timeline", "Tech Stack", "Costs", "Customers", "Marketing", "Revenue"].map((t, i) => (
              <span key={i} className="gen-tag" style={{ animationDelay: `${i * 0.2}s` }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentSuggestions = suggestions[currentQ] || [];
  const progress = (currentQ / questions.length) * 100;

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">LAUNCHPAD</div>
        <button className="btn-ghost" onClick={() => navigate("/")}>↩ Back</button>
      </nav>

      <main className="analyze-main">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="q-meta">
          <span className="q-count">Question {currentQ + 1} / {questions.length}</span>
          <span className="idea-badge">💡 {idea.slice(0, 50)}...</span>
        </div>

        <h2 className="question-text">{questions[currentQ]}</h2>

        {/* Suggestion Chips */}
        {currentSuggestions.length > 0 && !customMode && (
          <div className="suggestions-wrap">
            <p className="suggestions-label">Quick select or write your own:</p>
            <div className="suggestion-chips">
              {currentSuggestions.map((s, i) => (
                <button
                  key={i}
                  className={`chip ${currentAnswer === s ? "chip-selected" : ""}`}
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </button>
              ))}
              <button className="chip chip-custom" onClick={() => { setCustomMode(true); setCurrentAnswer(""); }}>
                ✏️ Custom answer
              </button>
            </div>

            {currentAnswer && !customMode && (
              <div className="selected-answer">
                <span className="selected-text">"{currentAnswer}"</span>
                <button className="btn-primary" onClick={() => handleAnswer()}>
                  {currentQ + 1 === questions.length ? "Generate Roadmap 🚀" : "Next →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Custom text input */}
        {(customMode || currentSuggestions.length === 0) && (
          <div className="custom-input-wrap">
            {customMode && (
              <button className="back-to-chips" onClick={() => { setCustomMode(false); setCurrentAnswer(""); }}>
                ← Back to suggestions
              </button>
            )}
            <textarea
              ref={inputRef}
              className="answer-input"
              rows={4}
              placeholder="Type your answer..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleAnswer()}
            />
            <div className="answer-actions">
              <button
                className="btn-primary"
                onClick={() => handleAnswer()}
                disabled={!currentAnswer.trim()}
              >
                {currentQ + 1 === questions.length ? "Generate Roadmap 🚀" : "Next Question →"}
              </button>
              <span className="hint">Ctrl + Enter</span>
            </div>
          </div>
        )}

        {currentQ > 0 && (
          <div className="prev-answers">
            <p className="prev-label">Previous answers:</p>
            {Array.from({ length: currentQ }).map((_, i) => (
              <div key={i} className="prev-item">
                <span className="prev-q">{questions[i].slice(0, 70)}...</span>
                <span className="prev-a">{answers[i]}</span>
              </div>
            ))}
          </div>
        )}

        <div className="dots">
          {questions.map((_, i) => (
            <div key={i} className={`dot ${i < currentQ ? "done" : i === currentQ ? "active" : ""}`} />
          ))}
        </div>
      </main>
    </div>
  );
}
