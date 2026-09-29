import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";



// ─── Nav tabs ─────────────────────────────────────────────────────────────────
const NAV_TABS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

// ─── Question Card ────────────────────────────────────────────────────────────
const QuestionCard = ({ index, question, intention, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`iv__qcard ${open ? "iv__qcard--open" : ""}`}>
      <button
        className="iv__qcard-header"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="iv__qcard-num">Q{index + 1}</span>
        <span className="iv__qcard-question">{question}</span>
        <span className="iv__qcard-chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="iv__qcard-body">
          <div className="iv__qcard-section">
            <p className="iv__qcard-section-title">
              <span className="iv__dot iv__dot--blue" /> Intention
            </p>
            <p className="iv__qcard-text">{intention}</p>
          </div>
          <div className="iv__qcard-section">
            <p className="iv__qcard-section-title">
              <span className="iv__dot iv__dot--pink" /> Ideal Answer
            </p>
            <p className="iv__qcard-text">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Roadmap Day Card ─────────────────────────────────────────────────────────
const DayCard = ({ day, focus, tasks }) => (
  <div className="iv__day-card">
    <div className="iv__day-badge">Day {day}</div>
    <h3 className="iv__day-focus">{focus}</h3>
    <ul className="iv__day-tasks">
      {tasks.map((t, i) => (
        <li key={i} className="iv__day-task">
          <span className="iv__day-bullet" />
          {t}
        </li>
      ))}
    </ul>
  </div>
);

// ─── Main Component (UI Layer) ────────────────────────────────────────────────
const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const { interviewId } = useParams();

  const { report, getReportById, loading, getResumePdf } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading Report...</h1>
      </main>
    )
  }

  return (
    <div className="iv">
      {/* ── Match Score Banner ── */}
      <div className="iv__score-bar">
        <div className="iv__score-label">
          <span className="iv__score-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
          Profile Match Score
        </div>
        <div className="iv__score-value">
          <span className="iv__score-num">{report.matchScore}</span>
          <span className="iv__score-max">/100</span>
        </div>
        <div className="iv__score-track">
          <div
            className="iv__score-fill"
            style={{ width: `${report.matchScore}%` }}
          />
        </div>
      </div>

      {/* ── Three-column layout ── */}
      <div className="iv__layout">

        {/* LEFT — Navigation Sidebar */}
        <aside className="iv__sidebar">
          <nav className="iv__nav">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`iv__nav-item ${activeTab === tab.id ? "iv__nav-item--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.id === "technical" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                )}
                {tab.id === "behavioral" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {tab.id === "roadmap" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {tab.label}
                {activeTab === tab.id && (
                  <span className="iv__nav-indicator" />
                )}
              </button>
            ))}
          </nav>

          {/* counts */}

          <div className="iv__nav-counts">
            <div className="iv__count-item">
              <span className="iv__count-num">{report.technicalQuestions.length}</span>
              <span className="iv__count-label">Technical</span>
            </div>
            <div className="iv__count-item">
              <span className="iv__count-num">{report.behavioralQuestions.length}</span>
              <span className="iv__count-label">Behavioral</span>
            </div>
            <div className="iv__count-item">
              <span className="iv__count-num">{report.preparationPlan.length}</span>
              <span className="iv__count-label">Days</span>
            </div>
          </div>

          <div className="download-resume-container">
            <button onClick={() => { getResumePdf(interviewId) }} className="resume__generate-btn">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L13.7 8.3L20 10L13.7 11.7L12 18L10.3 11.7L4 10L10.3 8.3L12 2Z" />
                <path d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z" />
                <circle cx="4" cy="5" r="1.5" />
              </svg>

              Download Resume
            </button>
          </div>

        </aside>

        {/* CENTER — Main Content */}
        <main className="iv__main">
          {activeTab === "technical" && (
            <section className="iv__section">
              <h2 className="iv__section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Technical Questions
                <span className="iv__section-count">
                  {report.technicalQuestions.length}
                </span>
              </h2>
              <div className="iv__qlist">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} index={i} {...q} />
                ))}
              </div>
            </section>
          )}

          {activeTab === "behavioral" && (
            <section className="iv__section">
              <h2 className="iv__section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                Behavioral Questions
                <span className="iv__section-count">
                  {report.behavioralQuestions.length}
                </span>
              </h2>
              <div className="iv__qlist">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} index={i} {...q} />
                ))}
              </div>
            </section>
          )}

          {activeTab === "roadmap" && (
            <section className="iv__section">
              <h2 className="iv__section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                7-Day Preparation Road Map
              </h2>
              <div className="iv__roadmap">
                {report.preparationPlan.map((plan) => (
                  <DayCard key={plan.day} {...plan} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT — Skill Gaps Sidebar */}
        <aside className="iv__right-sidebar">
          <h3 className="iv__right-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Skill Gaps
          </h3>
          <div className="iv__gaps">
            {report.skillGaps.map((g, i) => (
              <span
                key={i}
                className={`iv__gap-pill iv__gap-pill--${g.severity}`}
              >
                {g.skill}
              </span>
            ))}
          </div>

          <div className="iv__severity-legend">
            <p className="iv__legend-title">Severity</p>
            <div className="iv__legend-item">
              <span className="iv__legend-dot iv__legend-dot--high" />
              High
            </div>
            <div className="iv__legend-item">
              <span className="iv__legend-dot iv__legend-dot--medium" />
              Medium
            </div>
            <div className="iv__legend-item">
              <span className="iv__legend-dot iv__legend-dot--low" />
              Low
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;