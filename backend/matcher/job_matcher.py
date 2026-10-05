import json
import os

SKILL_ALIASES = {
    "nodejs": "node.js",
    "node js": "node.js",
    "node.js": "node.js",
    "reactjs": "react",
    "react.js": "react",
    "react": "react",
    "typescript": "typescript",
    "javascript": "javascript",
    "js": "javascript",
    "github": "github",
    "git": "git",
}


def normalize_skill(skill):
    skill = skill.lower().strip()
    return SKILL_ALIASES.get(skill, skill)

# Find the jobs.json file
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

JOBS_FILE = os.path.join(
    BASE_DIR,
    "data",
    "jobs.json"
)


def load_jobs():
    """Load available jobs from jobs.json."""

    with open(JOBS_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def calculate_match(resume_skills, job_skills):
    """Calculate how well resume skills match a job."""
    

    resume_skills = {
        normalize_skill(skill)
        for skill in resume_skills
    }

    job_skills = {
        normalize_skill(skill)
        for skill in job_skills
    }
    # Related skills
    if "react" in resume_skills or "node.js" in resume_skills or "typescript" in resume_skills:
        resume_skills.add("javascript")

    if "github" in resume_skills:
        resume_skills.add("git")

    if not job_skills:
        return 0, [], []

    matched_skills = sorted(
        resume_skills.intersection(job_skills)
    )

    missing_skills = sorted(
        job_skills - resume_skills
    )

    match_percentage = round(
        (len(matched_skills) / len(job_skills)) * 100
    )

    return (
        match_percentage,
        matched_skills,
        missing_skills
    )


def match_resume_to_jobs(resume_skills):
    """Match resume skills against all available jobs."""

    jobs = load_jobs()

    results = []

    for job in jobs:

        score, matched, missing = calculate_match(
            resume_skills,
            job["skills"]
        )

        results.append({
            "id": job["id"],
            "title": job["title"],
            "company": job["company"],
            "location": job["location"],
            "type": job["type"],
            "description": job["description"],
            "url": job["url"],
            "match_score": score,
            "matched_skills": matched,
            "missing_skills": missing
        })

    # Highest matching jobs first
    results.sort(
        key=lambda job: job["match_score"],
        reverse=True
    )

    return results