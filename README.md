# ✦ RoleMatch

> **Jobs that fit you.**

RoleMatch is a resume-to-job matching web application that analyzes an uploaded resume, detects relevant skills, and ranks job opportunities based on how closely those skills match each role.

Built as a full-stack project using **React + Vite** on the frontend and **FastAPI + Python** on the backend.

---

## 🚀 What RoleMatch Does

RoleMatch turns a resume into a personalized starting point for job discovery:

**Resume → Analysis → Skill Detection → Job Matching → Ranked Opportunities**

For every matched role, the platform shows:
- Match percentage
- Matched skills
- Skill gaps
- Location and job type
- Job description
- Opportunity link

---

## ✨ Key Features

### 📄 Resume Analysis
Upload a **PDF or DOCX** resume and extract useful information from it.

### 🧠 Skill Detection
Automatically identify technical skills from the resume and normalize common variations such as `nodejs` → `Node.js`.

### 🎯 Skill-Based Job Matching
Compare detected resume skills against the requirements of available roles and calculate a match score.

### 📊 Match Insights
See exactly why a role matches:
- ✅ Skills you already have
- ⚠️ Skills that are missing

### 🔗 Job Opportunities
Open the relevant job-search opportunity directly from the results page.

### 🎨 Modern UI
A responsive dark-themed interface with:
- Resume upload modal
- Analysis state
- Results dashboard
- Job cards
- Match scores and skill tags
- Smooth result navigation

---

## 🏗️ System Architecture

```text
┌──────────────────────┐
│      React + Vite    │
│       Frontend       │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│       FastAPI        │
│       Backend        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Resume Parser     │
│  PDF / DOCX Analysis │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Skill Detection    │
│ & Normalization      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Matching Engine   │
│   Skill Comparison   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      jobs.json       │
│  Job Requirements    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Ranked Job Results │
└──────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, JavaScript, CSS |
| **Backend** | Python, FastAPI |
| **Resume Processing** | Python |
| **Matching Engine** | Python, rule-based skill matching |
| **Job Data** | JSON |
| **Communication** | REST API |
| **Version Control** | Git, GitHub |

---

## 📁 Project Structure

```text
RoleMatch/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── parser/
│   └── matcher/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── data/
│   └── jobs.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/AK-wxs/RoleMatch.git
cd RoleMatch
```

### 2. Start the backend

```bash
cd backend
python -m uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🧪 Using the Application

1. Open RoleMatch in your browser.
2. Click **Upload Resume**.
3. Select a PDF or DOCX resume.
4. Click **Analyze Resume**.
5. Review the resume score and detected skills.
6. Click **Find My Job Matches**.
7. Compare the ranked roles, matched skills, and skill gaps.
8. Click **View Opportunity** for a role you want to explore.

---

## 🔌 API

### Analyze Resume

```http
POST /api/resume/analyze
Content-Type: multipart/form-data
```

The endpoint accepts a PDF or DOCX resume and returns:
- Resume analysis data
- Detected skills
- Resume score
- Job matches
- Match scores
- Matched skills
- Missing skills

---

## 📈 Matching Logic

The current matching engine uses **skill-based rule matching**.

Conceptually:

```text
Resume Skills
      │
      ▼
Normalize Skills
      │
      ▼
Compare with Job Requirements
      │
      ├── Matched Skills
      │
      └── Missing Skills
      │
      ▼
Calculate Match Score
      │
      ▼
Rank Jobs
```

This makes the matching process easy to understand, test, and extend.

---

## 🎓 Why I Built This

Searching for internships and entry-level roles often means checking many job descriptions and manually comparing them with a resume.

RoleMatch was built to explore how a structured resume-analysis and matching pipeline can reduce that effort and give candidates more useful feedback than a simple job list.

---

## 🔮 Future Improvements

The current version uses a local job dataset and rule-based matching. Possible next steps include:

- Real-time job discovery from external job APIs
- Semantic matching using NLP / embeddings
- Personalized recommendations based on career goals
- User accounts and saved opportunities
- Resume improvement suggestions
- Skill-learning recommendations
- Better ranking using experience, location, and preferences
- Production deployment

---

## 📌 Current Status

**Core MVP: Complete ✅**

Implemented:
- Resume upload
- PDF/DOCX analysis
- Skill extraction and normalization
- Resume scoring
- Job matching
- Match-score dashboard
- Skill-gap display
- Opportunity links
- React + FastAPI integration

---

## 👤 Author

**Aarthi Kamble**

GitHub: [@AK-wxs](https://github.com/AK-wxs)

---

## ⭐ Project

If you find the project interesting, consider giving the repository a ⭐ on GitHub.
