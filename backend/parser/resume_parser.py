import io
import re

from pypdf import PdfReader
from docx import Document


# Skills our first version can detect
SKILLS = [
    "python",
    "java",
    "c++",
    "c",
    "javascript",
    "typescript",
    "react",
    "node.js",
    "html",
    "css",
    "sql",
    "mongodb",
    "mysql",
    "postgresql",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "data science",
    "data analysis",
    "pandas",
    "numpy",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "git",
    "github",
    "docker",
    "aws",
    "azure",
    "power bi",
    "tableau",
]


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from a PDF file."""

    reader = PdfReader(io.BytesIO(file_bytes))

    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    return "\n".join(text)


def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract text from a DOCX file."""

    document = Document(io.BytesIO(file_bytes))

    paragraphs = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            paragraphs.append(paragraph.text)

    return "\n".join(paragraphs)


def extract_resume_text(filename: str, file_bytes: bytes) -> str:
    """Extract text based on the uploaded file type."""

    filename = filename.lower()

    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)

    if filename.endswith(".docx"):
        return extract_text_from_docx(file_bytes)

    raise ValueError("Unsupported file type. Please upload PDF or DOCX.")


def extract_skills(text: str) -> list:
    """Find known skills inside resume text."""

    text_lower = text.lower()

    found_skills = []

    for skill in SKILLS:
        # Escape special characters such as C++ and C#
        pattern = r"(?<!\w)" + re.escape(skill.lower()) + r"(?!\w)"

        if re.search(pattern, text_lower):
            found_skills.append(skill)

    return found_skills


def calculate_resume_score(text: str, skills: list) -> int:
    """Calculate a simple initial resume score."""

    score = 40

    # Skills
    score += min(len(skills) * 4, 30)

    # Resume length/content
    word_count = len(text.split())

    if word_count >= 150:
        score += 10

    if word_count >= 300:
        score += 5

    # Common resume sections
    sections = [
        "education",
        "experience",
        "projects",
        "skills",
    ]

    for section in sections:
        if section in text.lower():
            score += 4

    return min(score, 100)


def analyze_resume(filename: str, file_bytes: bytes) -> dict:
    """Complete resume analysis."""

    text = extract_resume_text(filename, file_bytes)

    if not text.strip():
        raise ValueError(
            "Could not extract text from this resume."
        )

    skills = extract_skills(text)

    score = calculate_resume_score(text, skills)

    return {
        "filename": filename,
        "score": score,
        "skills": skills,
        "word_count": len(text.split()),
        "text_preview": text[:500],
    }