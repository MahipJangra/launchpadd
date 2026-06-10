import { useNavigate } from "react-router-dom";
import { useRoadmap } from "../context/RoadmapContext";
import "../styles/global.css";
import "../styles/saved.css";

export default function Saved() {
  const navigate = useNavigate();
  const { savedRoadmaps, setRoadmap, setSavedRoadmaps } = useRoadmap();

  const handleOpen = (entry) => {
    setRoadmap(entry);
    navigate("/roadmap");
  };

  const handleDelete = (id) => {
    const updated = savedRoadmaps.filter((r) => r.id !== id);
    setSavedRoadmaps(updated);
    localStorage.setItem("launchpad_roadmaps", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">LAUNCHPAD</div>
        <button className="btn-ghost" onClick={() => navigate("/")}>↩ Back</button>
      </nav>

      <main className="saved-main">
        <div className="saved-header">
          <div className="hero-label">Your History</div>
          <h1 className="big-title" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>
            SAVED <span className="accent">ROADMAPS</span>
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 13, marginTop: 8 }}>
            {savedRoadmaps.length} roadmap{savedRoadmaps.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {savedRoadmaps.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: "var(--text-dim)", fontSize: 14 }}>No saved roadmaps yet.</p>
            <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("/")}>
              Analyze Your First Idea →
            </button>
          </div>
        ) : (
          <div className="saved-grid">
            {savedRoadmaps.map((entry) => (
              <div key={entry.id} className="saved-card">
                <div className="saved-card-top">
                  <div>
                    <div className="saved-product">{entry.productName}</div>
                    <div className="saved-tagline">{entry.tagline}</div>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)} title="Delete">✕</button>
                </div>

                <p className="saved-idea">💡 {entry.originalIdea?.slice(0, 80)}...</p>

                <div className="saved-meta">
                  {[
                    { label: "MVP", value: entry.timeline?.mvp },
                    { label: "Build Cost", value: entry.costs?.building?.low + " – " + entry.costs?.building?.high },
                    { label: "Market", value: entry.impact?.market_size?.slice(0, 30) },
                  ].map((m, i) => (
                    <div key={i} className="saved-stat">
                      <span className="saved-stat-label">{m.label}</span>
                      <span className="saved-stat-value">{m.value || "—"}</span>
                    </div>
                  ))}
                </div>

                <div className="saved-date">
                  Saved: {new Date(entry.savedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>

                <button className="btn-primary" style={{ width: "100%", marginTop: 16 }} onClick={() => handleOpen(entry)}>
                  View Roadmap →
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
