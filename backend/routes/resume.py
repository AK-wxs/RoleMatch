from matcher.job_matcher import match_resume_to_jobs

from fastapi import APIRouter, File, HTTPException, UploadFile

from parser.resume_parser import analyze_resume
from matcher.job_matcher import match_resume_to_jobs


router = APIRouter(
    prefix="/api/resume",
    tags=["Resume"],
)


@router.post("/analyze")
async def analyze_uploaded_resume(
    file: UploadFile = File(...)
):
    """Analyze an uploaded resume."""

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file uploaded."
        )

    allowed_extensions = [".pdf", ".docx"]

    filename = file.filename.lower()

    if not any(filename.endswith(ext) for ext in allowed_extensions):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )

    try:
        file_bytes = await file.read()

        # Analyze resume
        result = analyze_resume(
            file.filename,
            file_bytes
        )

        # Match resume skills against available jobs
        job_matches = match_resume_to_jobs(
            result["skills"]
        )

        # Add matches to the analysis result
        result["job_matches"] = job_matches

        return {
            "success": True,
            "data": result
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )