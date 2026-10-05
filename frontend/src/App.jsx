import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");
  const [showMatches, setShowMatches] = useState(false);

  const fileInputRef = useRef(null);

  const matchesRef = useRef(null);
  useEffect(() => {
    if (showMatches) {
      setTimeout(() => {
        matchesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
  }
}, [showMatches]);

const formatSkill = (skill) => {
  const names = {
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "postgresql": "PostgreSQL",
    "github": "GitHub",
    "typescript": "TypeScript",
    "javascript": "JavaScript",
    "react": "React",
    "python": "Python",
    "java": "Java",
    "sql": "SQL",
    "mongodb": "MongoDB",
    "docker": "Docker",
    "aws": "AWS",
  };

  return names[skill.toLowerCase()] || skill;
};

  // ================================
  // FILE SELECTION
  // ================================

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setAnalysisComplete(false);
    setAnalysisData(null);
    setError("");
  };

  // ================================
  // REAL RESUME ANALYSIS
  // ================================

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError("");
    setAnalysisComplete(false);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/resume/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || "Resume analysis failed."
        );
      }

      setAnalysisData(result.data);
      setAnalysisComplete(true);
    } catch (err) {
      console.error("Resume analysis error:", err);
      setError(
        err.message ||
        "Could not connect to the resume analysis server."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ================================
  // VIEW JOB OPPORTUNITY
  // ================================

  const handleViewOpportunity = (job) => {
  if (!job.url) {
    alert("Job link is not available.");
    return;
  }

  window.open(job.url, "_blank", "noopener,noreferrer");
};

  // ================================
  // CLOSE MODAL
  // ================================

  const closeUpload = () => {
    setShowUpload(false);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setSelectedFile(null);
    setAnalysisData(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="app">

      {/* ================================
          NAVBAR
      ================================= */}

      <nav className="navbar">

        <div className="logo">
          <span className="logo-icon">✦</span>
          Role<span>Match</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
        </div>

        <div className="nav-actions">

          <button className="signin-btn">
            Sign In
          </button>

          <button
            className="signup-btn"
            onClick={() => setShowUpload(true)}
          >
            Get Started
          </button>

        </div>

      </nav>


      {/* ================================
          HERO
      ================================= */}

      <main id="home" className="hero">

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="hero-content">

          <div className="badge">
            <span>✦</span>
            AI-powered job matching
          </div>

          <h1>
            Find jobs that
            <br />
            <span>fit you.</span>
          </h1>

          <p>
            Upload your resume and let AI discover
            opportunities that match your skills,
            experience, and career goals.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => setShowUpload(true)}
            >
              Upload Resume
              <span>→</span>
            </button>

            <button className="secondary-btn">
              Explore Jobs
            </button>

          </div>

          <div className="trust">

            <div>
              <strong>8 curated roles</strong>
              <span> matched to your skills</span>
            </div>

            <div>
              <strong>10,000+</strong>
              <span> opportunities matched</span>
            </div>

          </div>

        </div>


        {/* MATCH CARD */}

        <div className="match-card">

          <div className="card-top">

            <div>
              <span className="small-label">
                YOUR TOP MATCH
              </span>

              <h3>AI / ML Intern</h3>

              <p>
                Hyderabad · Internship
              </p>
            </div>

            <div className="match-score">
              <strong>94%</strong>
              <span>Match</span>
            </div>

          </div>

          <div className="skills">
            <span>✓ Python</span>
            <span>✓ Machine Learning</span>
            <span>✓ SQL</span>
            <span>⚠ AWS</span>
          </div>

          <div className="match-footer">

            <span>
              Based on your resume
            </span>

            <button>
              View Job →
            </button>

          </div>

        </div>

      </main>


      {/* ================================
          HOW IT WORKS
      ================================= */}

      <section
        id="how-it-works"
        className="how-section"
      >

        <div className="section-heading">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Your resume.{" "}
            <span>Smart matching.</span>{" "}
            Your next opportunity.
          </h2>

          <p>
            We turn your resume into personalized
            job recommendations in three simple steps.
          </p>

        </div>


        <div className="steps">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              📄
            </div>

            <h3>
              Upload Resume
            </h3>

            <p>
              Upload your existing resume in PDF
              or DOCX format.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🧠
            </div>

            <h3>
              Smart Analysis
            </h3>

            <p>
              We analyze your skills,
              experience and strengths.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              🎯
            </div>

            <h3>
              Find Your Match
            </h3>

            <p>
              Get ranked jobs with personalized
              match scores.
            </p>

          </div>

        </div>

      </section>


      {/* ================================
          FEATURES
      ================================= */}

      <section
        id="features"
        className="features-section"
      >

        <div>

          <span className="section-label">
            BUILT FOR YOUR CAREER
          </span>

          <h2>
            More than a job search.
          </h2>

          <p>
            RoleMatch helps you understand where
            you stand, what you're missing, and where
            you should apply next.
          </p>

        </div>


        <div className="feature-list">

          <div className="feature">

            <span>🎯</span>

            <div>
              <h3>
                Smart Job Matching
              </h3>

              <p>
                Find opportunities based on
                your actual skills.
              </p>
            </div>

          </div>


          <div className="feature">

            <span>📊</span>

            <div>
              <h3>
                Resume Score
              </h3>

              <p>
                Understand how strong your
                resume really is.
              </p>
            </div>

          </div>


          <div className="feature">

            <span>🚀</span>

            <div>
              <h3>
                Skill Gap Analysis
              </h3>

              <p>
                Know exactly what skills you
                need to improve.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================================
          CTA
      ================================= */}

      <section className="cta-section">

        <div>

          <span className="section-label">
            READY?
          </span>

          <h2>
            Your next opportunity is waiting.
          </h2>

          <p>
            Let AI find the jobs that fit your potential.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowUpload(true)}
          >
            Analyze My Resume
            <span>→</span>
          </button>

        </div>

      </section>


      {/* ================================
          FOOTER
      ================================= */}

      <footer>

        <div className="logo">
          <span className="logo-icon">✦</span>
          Role<span>Match</span>
        </div>

        <p>
          AI-powered career matching.
        </p>

        <p>
          © 2026 RoleMatch
        </p>

      </footer>


      {/* ================================
          RESUME UPLOAD MODAL
      ================================= */}

      {showUpload && (

        <div
          className="upload-overlay"
          onClick={closeUpload}
        >

          <div
            className="upload-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-upload"
              onClick={closeUpload}
            >
              ×
            </button>


            {/* ============================
                ANALYZING
            ============================= */}

            {isAnalyzing && (

              <div className="analysis-state">

                <div className="analysis-spinner">
                  ✦
                </div>

                <span className="section-label">
                  SMART ANALYSIS
                </span>

                <h2>
                  Analyzing your{" "}
                  <span>resume...</span>
                </h2>

                <p>
                  Analyzing your experience,
                  skills, education and projects.
                </p>

                <div className="analysis-progress">
                  <div className="progress-bar"></div>
                </div>

                <small>
                  Extracting skills • Understanding
                  experience • Finding opportunities
                </small>

              </div>

            )}


            {/* ============================
                SUCCESS
            ============================= */}

            {!isAnalyzing && analysisComplete && (

              <div className="analysis-state success-state">

                <div className="success-icon">
                  ✓
                </div>

                <span className="section-label">
                  ANALYSIS COMPLETE
                </span>

                <h2>
                  Your resume looks{" "}
                  <span>strong.</span>
                </h2>

                <p>
                  We've identified your strongest
                  skills from your resume.
                </p>


                {/* SCORE */}

                <div className="resume-score">

                  <div className="score-circle">

                    <strong>
                      {analysisData?.score ?? 0}
                    </strong>

                    <span>
                      /100
                    </span>

                  </div>

                  <div className="score-info">

                    <strong>
                      Matching Score
                    </strong>

                    <span>
                      Based on detected skills and experience.
                    </span>

                  </div>

                </div>


                {/* SKILLS */}

                <div className="detected-skills">

                  {analysisData?.skills?.length > 0 ? (

                    analysisData.skills.map((skill) => (
                      <span key={formatSkill(skill)}>
                        {formatSkill(skill)}
                      </span>
                    ))

                  ) : (

                    <span>
                      No skills detected
                    </span>

                  )}

                </div>


                {/* META */}

                {analysisData && (

                  <p className="analysis-meta">
                    Analyzed{" "}
                    <strong>
                      {analysisData.word_count}
                    </strong>{" "}
                    words from your resume.
                  </p>

                )}


                <button
                  className="analyze-btn"
                  onClick={() => {
                    setShowUpload(false);
                    setShowMatches(true);
                  }}
                >
                  Find My Job Matches
                  <span>→</span>
                </button>

              </div>

            )}


            {/* ============================
                UPLOAD
            ============================= */}

            {!isAnalyzing && !analysisComplete && (

              <>

                <div className="upload-header">

                  <div className="upload-icon">
                    📄
                  </div>

                  <span className="section-label">
                    RESUME ANALYSIS
                  </span>

                  <h2>
                    Upload your{" "}
                    <span>resume.</span>
                  </h2>

                  <p>
                    We'll analyze your skills,
                    experience and projects to find
                    your best job matches.
                  </p>

                </div>


                {!selectedFile ? (

                  <div
                    className="drop-zone"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >

                    <div className="drop-icon">
                      ↑
                    </div>

                    <h3>
                      Drop your resume here
                    </h3>

                    <p>
                      or{" "}
                      <span>
                        browse files
                      </span>{" "}
                      from your computer
                    </p>

                    <small>
                      PDF or DOCX · Maximum 10 MB
                    </small>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileSelect}
                      hidden
                    />

                  </div>

                ) : (

                  <div className="selected-file">

                    <div className="file-icon">
                      📄
                    </div>

                    <div className="file-info">

                      <strong>
                        {selectedFile.name}
                      </strong>

                      <span>
                        {(
                          selectedFile.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </span>

                    </div>

                    <button
                      className="remove-file"
                      onClick={() => {
                        setSelectedFile(null);
                        setError("");

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      ×
                    </button>

                  </div>

                )}


                {selectedFile && (

                  <button
                    className="analyze-btn"
                    onClick={handleAnalyze}
                  >
                    Analyze Resume
                    <span>→</span>
                  </button>

                )}


                {error && (

                  <div className="upload-error">
                    ⚠️ {error}
                  </div>

                )}


                <div className="upload-security">
                  🔒 Your resume is processed securely.
                </div>

              </>

            )}

          </div>

        </div>

      )}
      {/* ================================
          JOB MATCHES DASHBOARD
      ================================= */}

      {showMatches && analysisData && (
        
        <div
          className="matches-page"
          ref={matchesRef}
        >

          <div className="matches-header">

            <div>
              <span className="section-label">
                YOUR RESULTS
              </span>

              <h1>
                Jobs that <span>fit you.</span>
              </h1>

              <p>
                Based on the skills we found in your resume.
              </p>
            </div>

            <button
              className="close-matches"
              onClick={() => setShowMatches(false)}
            >
              ← Back
            </button>

          </div>


          {/* RESUME SUMMARY */}

          <div className="matches-summary">

            <div className="summary-score">

              <div className="summary-circle">
                <strong>
                  {analysisData.score}
                </strong>
                <span>/100</span>
              </div>

              <div>
                <span className="summary-label">
                  RESUME SCORE
                </span>

                <h3>
                  Excellent match potential
                </h3>
              </div>

            </div>


            <div className="summary-skills">

              <span className="summary-label">
                DETECTED SKILLS
              </span>

              <div className="summary-skill-list">

                {analysisData.skills?.map((skill) => (
                  <span key={formatSkill(skill)}>
                    {formatSkill(skill)}
                  </span>
                ))}

              </div>

            </div>

          </div>


          {/* JOB RESULTS */}

          <div className="job-results">

            <div className="job-results-heading">

              <div>
                <span className="section-label">
                  TOP OPPORTUNITIES
                </span>

                <h2>
                  Your best matches
                </h2>
              </div>

              <span className="job-count">
                {analysisData.job_matches?.length || 0} jobs found
              </span>

            </div>


            <div className="job-list">

              {analysisData.job_matches?.map((job) => (

                <div
                  className="job-card"
                  key={job.id}
                >

                  <div className="job-main">

                    <div className="job-icon">
                      💼
                    </div>

                    <div className="job-info">

                      <h3>
                        {job.title}
                      </h3>

                      <p className="job-company">
                        {job.company}
                      </p>

                      <div className="job-meta">
                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💼 {job.type}
                        </span>
                      </div>

                    </div>

                  </div>


                  <div className="job-match">

                    <strong>
                      {job.match_score}%
                    </strong>

                    <span>
                      MATCH
                    </span>

                  </div>


                  <div className="job-details">

                    <p>
                      {job.description}
                    </p>


                    <div className="job-skills">

                      <div>

                        <span className="skill-heading">
                          MATCHED SKILLS
                        </span>

                        <div className="skill-tags">

                          {job.matched_skills?.map(
                            (skill) => (
                              <span
                                className="matched"
                                key={formatSkill(skill)}
                              >
                                ✓ {formatSkill(skill)}
                              </span>
                            )
                          )}

                        </div>

                      </div>


                      {job.missing_skills?.length > 0 && (

                        <div>

                          <span className="skill-heading">
                            SKILL GAPS
                          </span>

                          <div className="skill-tags">

                            {job.missing_skills.map(
                              (skill) => (
                                <span
                                  className="missing"
                                  key={formatSkill(skill)}
                                >
                                  + {formatSkill(skill)}
                                </span>
                              )
                            )}

                          </div>

                        </div>

                      )}

                    </div>


                    <button
                      className="view-job-btn"
                      onClick={() => handleViewOpportunity(job)}
                    >
                    View Opportunity
                    <span>→</span>
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
export default App;