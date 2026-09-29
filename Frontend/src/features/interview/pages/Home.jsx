import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";


const Home = () => {

  const { loading, generateReport, reports, getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
    navigate(`/interview/${data._id}`);
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main className="home">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <header className="home__header">
        <h1 className="home__title">
          Create Your Custom&nbsp;
          <span className="home__title--accent">Interview Plan</span>
        </h1>
        <p className="home__subtitle">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* ── Two-Panel Card ──────────────────────────────────────── */}
      <div className="home__card">

        {/* LEFT — Target Job Description */}
        <section className="home__panel home__panel--left">
          <div className="home__panel-header">
            <span className="home__panel-icon">
              {/* briefcase */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </span>
            <h2 className="home__panel-title">Target Job Description</h2>
            <span className="home__badge home__badge--required">REQUIRED</span>
          </div>

          <textarea
            onChange={(e) => { setJobDescription(e.target.value) }}
            className="home__textarea"
            id="jobDescription"
            name="jobDescription"
            placeholder={
              "Paste the full job description here...\n" +
              "e.g. 'Senior Frontend Engineer at Google requires proficiency " +
              "in React, TypeScript, and large-scale system design...'"
            }
          />

          <div className="home__char-count">
            <span>0 / 5000 chars</span>
          </div>
        </section>

        {/* Vertical Divider */}
        <div className="home__divider" />

        {/* RIGHT — Your Profile */}
        <section className="home__panel home__panel--right">
          <div className="home__panel-header">
            <span className="home__panel-icon">
              {/* user */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <h2 className="home__panel-title">Your Profile</h2>
          </div>

          {/* Upload Resume */}
          <div className="home__section">
            <p className="home__section-label">
              Upload Resume
              <span className="home__badge home__badge--best">BEST RESULTS</span>
            </p>

            <label className="home__upload-zone" htmlFor="resume">
              <span className="home__upload-icon">
                {/* upload-cloud */}
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
              </span>
              <span className="home__upload-primary">
                Click to upload or drag &amp; drop
              </span>
              <span className="home__upload-secondary">
                PDF or DOCX (Max 5MB)
              </span>
            </label>
            <input
              ref={resumeInputRef}
              hidden
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.docx"
            />
          </div>

          {/* OR Separator */}
          <div className="home__or">
            <span className="home__or-line" />
            <span className="home__or-text">OR</span>
            <span className="home__or-line" />
          </div>

          {/* Quick Self-Description */}
          <div className="home__section">
            <p className="home__section-label">Quick Self-Description</p>
            <textarea
              onChange={(e) => { setSelfDescription(e.target.value) }}
              className="home__textarea home__textarea--self"
              id="selfDescription"
              name="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />
          </div>

          {/* Info Banner */}
          <div className="home__info-banner">
            <span className="home__info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="#4f8ef7">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12"
                  stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="16" x2="12.01" y2="16"
                  stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <p className="home__info-text">
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to{" "}
              <span className="home__info-link">
                generate a personalized plan.
              </span>
            </p>
          </div>
        </section>
      </div>


      {/* ── Footer Bar ──────────────────────────────────────────── */}
      <footer className="home__footer">
        <p className="home__footer-meta">
          AI-Powered Strategy Generation&nbsp;&bull;&nbsp;Approx 30s
        </p>
        <button onClick={handleGenerateReport} className="home__generate-btn" id="generateStrategyBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Generate My Interview Strategy
        </button>
      </footer>

      {/* Recent Reports List */}

      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>My Recent Interview Reports</h2>
          <ul className="reports-list">
            {reports.map((report) => (
              <li key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                <h3>{report.title || "Untitled Position"}</h3>
                <p className="report-meta">Generated On : {new Date(report.createdAt).toLocaleString()}</p>
                <p className={`match-score ${report.matchScore >= 80 ? "score--high" : report.matchScore >= 60 ? "score--medium" : "score--low"}`}>Match Score : {report.matchScore}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Home;