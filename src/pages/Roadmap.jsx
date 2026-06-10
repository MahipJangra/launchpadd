import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoadmap } from "../context/RoadmapContext";
import toast from "react-hot-toast";
import "../styles/global.css";
import "../styles/roadmap.css";

const TABS = [
  { id: "timeline", label: "📅 Timeline" },
  { id: "tech", label: "⚙️ Tech Stack" },
  { id: "features", label: "✨ Features" },
  { id: "costs", label: "💰 Costs" },
  { id: "customers", label: "👥 Customers" },
  { id: "marketing", label: "📣 Marketing" },
  { id: "revenue", label: "💸 Revenue" },
  { id: "impact", label: "🌍 Impact" },
];

export default function Roadmap() {
  const navigate = useNavigate();
  const { roadmap, idea, reset } = useRoadmap();
  const [activeTab, setActiveTab] = useState("timeline");

  if (!roadmap) {
    navigate("/");
    return null;
  }

  const handleNew = () => {
    reset();
    navigate("/");
  };

  const handleCopy = () => {
    const text = JSON.stringify(roadmap, null, 2);
    navigator.clipboard.writeText(text);
    toast.success("Roadmap copied as JSON!");
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">LAUNCHPAD</div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={handleCopy}>Copy JSON</button>
          <button className="btn-ghost" onClick={handleNew}>↩ New Idea</button>
        </div>
      </nav>

      <main className="roadmap-main">
        {/* Header */}
        <div className="rm-header">
          <div className="rm-label">Your Startup Roadmap</div>
          <h1 className="rm-title">{roadmap.productName}</h1>
          <p className="rm-tagline">{roadmap.tagline}</p>
          <p className="rm-overview">{roadmap.overview}</p>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {[
            { label: "MVP Ready", value: roadmap.timeline?.mvp },
            { label: "Beta Launch", value: roadmap.timeline?.beta },
            { label: "V1.0 Launch", value: roadmap.timeline?.v1 },
            { label: "Build Cost", value: `${roadmap.costs?.building?.low} – ${roadmap.costs?.building?.high}` },
            { label: "Monthly Infra", value: `${roadmap.costs?.monthly_infra?.low} – ${roadmap.costs?.monthly_infra?.high}` },
            { label: "Market Size", value: roadmap.impact?.market_size },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value || "—"}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content" key={activeTab}>

          {/* TIMELINE */}
          {activeTab === "timeline" && (
            <div className="timeline">
              {roadmap.timeline?.milestones?.map((m, i) => (
                <div key={i} className="milestone">
                  <div className="ms-track">
                    <div className="ms-dot" />
                    {i < roadmap.timeline.milestones.length - 1 && <div className="ms-line" />}
                  </div>
                  <div className="ms-card">
                    <div className="ms-week">{m.week}</div>
                    <div className="ms-task">{m.task}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TECH */}
          {activeTab === "tech" && (
            <div>
              {[
                { label: "Frontend", data: roadmap.techStack?.frontend },
                { label: "Backend", data: roadmap.techStack?.backend },
                { label: "Database", data: roadmap.techStack?.database },
                { label: "Infrastructure", data: roadmap.techStack?.infrastructure },
                { label: "AI / Tools", data: roadmap.techStack?.ai_tools },
              ].filter(s => s.data?.length > 0).map((s, i) => (
                <div key={i} className="card">
                  <div className="card-label">{s.label}</div>
                  <div className="tags">
                    {s.data.map((t, j) => <span key={j} className="tag">{t}</span>)}
                  </div>
                </div>
              ))}
              {roadmap.techStack?.reasoning && (
                <div className="card">
                  <div className="card-label">Why This Stack</div>
                  <p className="card-text">{roadmap.techStack.reasoning}</p>
                </div>
              )}
            </div>
          )}

          {/* FEATURES */}
          {activeTab === "features" && (
            <div>
              <div className="section-head">MVP Features</div>
              {roadmap.features?.mvp?.map((f, i) => (
                <div key={i} className="card">
                  <div className="feature-name">{f.name}</div>
                  <div className="feature-desc">{f.description}</div>
                </div>
              ))}

              {roadmap.features?.v2?.length > 0 && (
                <>
                  <div className="section-head dim">V2 Features (Future)</div>
                  {roadmap.features.v2.map((f, i) => (
                    <div key={i} className="card dim-card">
                      <div className="feature-name">{f.name}</div>
                      <div className="feature-desc">{f.description}</div>
                    </div>
                  ))}
                </>
              )}

              {roadmap.usps && (
                <div className="card">
                  <div className="card-label">Unique Selling Points</div>
                  {roadmap.usps.map((u, i) => (
                    <div key={i} className="list-item">
                      <span className="arrow">→</span>{u}
                    </div>
                  ))}
                </div>
              )}

              {roadmap.kpis && (
                <div className="card">
                  <div className="card-label">KPIs to Track</div>
                  <div className="kpi-grid">
                    {roadmap.kpis.map((k, i) => (
                      <div key={i} className="kpi-card">
                        <div className="kpi-metric">{k.metric}</div>
                        <div className="kpi-target">{k.target}</div>
                        <div className="kpi-time">{k.timeframe}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COSTS */}
          {activeTab === "costs" && (
            <div>
              <div className="two-col">
                <div className="card">
                  <div className="card-label">Build Cost</div>
                  <div className="big-num">
                    {roadmap.costs?.building?.low} – {roadmap.costs?.building?.high}
                  </div>
                </div>
                <div className="card">
                  <div className="card-label">Monthly Infra</div>
                  <div className="big-num">
                    {roadmap.costs?.monthly_infra?.low} – {roadmap.costs?.monthly_infra?.high}
                  </div>
                  {roadmap.costs?.monthly_infra?.details && (
                    <p className="card-text small">{roadmap.costs.monthly_infra.details}</p>
                  )}
                </div>
              </div>

              {roadmap.costs?.building?.breakdown && (
                <div className="card">
                  <div className="card-label">Cost Breakdown</div>
                  {roadmap.costs.building.breakdown.map((b, i) => (
                    <div key={i} className="cost-row">
                      <div>
                        <span className="cost-item">{b.item}</span>
                        {b.note && <span className="cost-note"> — {b.note}</span>}
                      </div>
                      <span className="cost-val">{b.cost}</span>
                    </div>
                  ))}
                </div>
              )}

              {roadmap.costs?.publishing && (
                <div className="card">
                  <div className="card-label">Publishing / Distribution</div>
                  {roadmap.costs.publishing.map((p, i) => (
                    <div key={i} className="cost-row">
                      <span className="cost-item">{p.platform}</span>
                      <span className="cost-val">{p.cost}</span>
                    </div>
                  ))}
                </div>
              )}

              {roadmap.costs?.total_runway && (
                <div className="card highlight-card">
                  <div className="card-label">6-Month Runway Estimate</div>
                  <div className="big-num">{roadmap.costs.total_runway}</div>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMERS */}
          {activeTab === "customers" && (
            <div>
              <div className="two-col">
                <div className="card">
                  <div className="card-label">Primary Segment</div>
                  <p className="card-text">{roadmap.customers?.primary}</p>
                </div>
                <div className="card">
                  <div className="card-label">Secondary Segment</div>
                  <p className="card-text">{roadmap.customers?.secondary}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-label">Ideal Customer Profile (ICP)</div>
                <p className="card-text">{roadmap.customers?.icp}</p>
                {roadmap.customers?.acquisition_cost && (
                  <div className="icp-cac">
                    <span className="card-label">Est. CAC:</span>
                    <span className="accent-text"> {roadmap.customers.acquisition_cost}</span>
                  </div>
                )}
              </div>
              {roadmap.customers?.pain_points && (
                <div className="card">
                  <div className="card-label">Pain Points You Solve</div>
                  {roadmap.customers.pain_points.map((p, i) => (
                    <div key={i} className="list-item">
                      <span className="cross">✗</span>{p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MARKETING */}
          {activeTab === "marketing" && (
            <div>
              {roadmap.marketing?.gtm && (
                <div className="card highlight-card">
                  <div className="card-label">Go-to-Market Strategy</div>
                  <p className="card-text">{roadmap.marketing.gtm}</p>
                </div>
              )}
              {roadmap.marketing?.channels?.map((c, i) => (
                <div key={i} className="card">
                  <div className="channel-head">
                    <div>
                      <span className="channel-name">{c.channel}</span>
                      {c.priority && (
                        <span className={`priority ${c.priority?.toLowerCase()}`}>{c.priority}</span>
                      )}
                    </div>
                    <span className="tag">{c.cost}</span>
                  </div>
                  <p className="card-text">{c.strategy}</p>
                </div>
              ))}
            </div>
          )}

          {/* REVENUE */}
          {activeTab === "revenue" && (
            <div>
              <div className="card highlight-card">
                <div className="card-label">Revenue Model</div>
                <p className="card-text">{roadmap.monetization?.model}</p>
              </div>

              {roadmap.monetization?.plans && (
                <>
                  <div className="section-head">Pricing Plans</div>
                  <div className="plans-grid">
                    {roadmap.monetization.plans.map((p, i) => (
                      <div key={i} className="plan-card">
                        <div className="plan-name">{p.name}</div>
                        <div className="plan-price">{p.price}</div>
                        <div className="plan-features">{p.features}</div>
                        {p.target && <div className="plan-target">For: {p.target}</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {roadmap.monetization?.projections && (
                <div className="card">
                  <div className="card-label">Revenue Projections</div>
                  <div className="proj-grid">
                    {roadmap.monetization.projections.map((p, i) => (
                      <div key={i} className="proj-card">
                        <div className="proj-month">{p.month}</div>
                        <div className="proj-mrr">{p.mrr}</div>
                        <div className="proj-users">{p.users}</div>
                        {p.assumption && <div className="proj-note">{p.assumption}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* IMPACT */}
          {activeTab === "impact" && (
            <div>
              <div className="card">
                <div className="card-label">Problem Being Solved</div>
                <p className="card-text">{roadmap.impact?.problem_solved}</p>
              </div>
              <div className="card highlight-card">
                <div className="card-label">Market Size (TAM/SAM/SOM)</div>
                <div className="big-num">{roadmap.impact?.market_size}</div>
              </div>
              {roadmap.impact?.social_impact && (
                <div className="card">
                  <div className="card-label">Social Impact</div>
                  <p className="card-text">{roadmap.impact.social_impact}</p>
                </div>
              )}
              {roadmap.impact?.competition?.length > 0 && (
                <div className="card">
                  <div className="card-label">Competitive Landscape</div>
                  {roadmap.impact.competition.map((c, i) => (
                    <div key={i} className="comp-row">
                      <span className="comp-name">{c.name}</span>
                      <span className="comp-gap">{c.weakness}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        <div className="rm-footer">
          <button className="btn-ghost" onClick={handleNew}>Analyze a New Idea →</button>
        </div>
      </main>
    </div>
  );
}
