import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoadmap } from "../context/RoadmapContext";
import { analyzeIdea } from "../utils/api";
import toast from "react-hot-toast";
import "../styles/global.css";

const EXAMPLES = [
  "A food delivery app for home-cooked tiffin services by housewives for office workers",
  "SaaS tool for CA firms to automate GST filing and client payment tracking",
  "AI platform where students upload syllabus and get personalized 30-day study plans",
  "Mental health app for professionals with anonymous journaling and therapist matching",
  "WhatsApp-based ordering system for kirana stores — no separate app needed",
];

export default function Home() {
  const navigate = useNavigate();
  const { setIdea, setQuestions, setSuggestions, savedRoadmaps, reset } = useRoadmap();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    reset();
    try {
      const result = await analyzeIdea([{ role: "user", content: `Idea: ${input}` }]);
      if (result.phase === "questions") {
        setIdea(input);
        setQuestions(result.questions);
        setSuggestions(result.suggestions || []);
        navigate("/analyze");
      } else {
        toast.error("Unexpected response. Try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">LAUNCHPAD</div>
        {savedRoadmaps.length > 0 && (
          /* ✅ NOW CLICKABLE */
          <button className="nav-badge-btn" onClick={() => navigate("/saved")}>
            📁 {savedRoadmaps.length} saved
          </button>
        )}
      </nav>

      <main className="hero">
        <div className="hero-label">Idea → Roadmap in minutes</div>
        <h1 className="hero-title">
          WHAT ARE YOU<br />
          <span className="accent">BUILDING?</span>
        </h1>
        <p className="hero-sub">
          Describe your startup idea. Get a full roadmap — tech stack, costs,
          customers, marketing & revenue strategy.
        </p>

        <div className="input-wrap">
          <textarea
            className="idea-input"
            rows={4}
            placeholder="e.g. An AI tool that helps restaurants manage orders and inventory from one dashboard..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleSubmit()}
          />
          <button
            className={`btn-primary ${loading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
          >
            {loading ? "Analyzing..." : "Analyze My Idea →"}
          </button>
          <p className="hint">Ctrl + Enter to submit</p>
        </div>

        <div className="examples">
          <p className="examples-label">Try an example:</p>
          <div className="example-pills">
            {EXAMPLES.map((ex, i) => (
              <button key={i} className="pill" onClick={() => setInput(ex)}>
                {ex.slice(0, 60)}...
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}