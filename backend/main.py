import os
import uvicorn
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from analyzer import extract_text_from_bytes, run_ai_match_analysis, GEMINI_API_KEY

load_dotenv()

app = FastAPI(
    title="MatchAI Resume & Skill Gap Engine API",
    description="Python FastAPI backend powering AI resume-to-job matching, ATS scoring, and skill gap remediation.",
    version="1.0.0"
)

# Enable CORS for Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for analysis results
ANALYSIS_STORE = {}

@app.get("/")
def read_root():
    return {
        "name": "MatchAI API Engine",
        "status": "online",
        "docs": "/docs",
        "gemini_api_configured": bool(GEMINI_API_KEY)
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "version": "1.0.0",
        "engine": "FastAPI + Gemini AI Engine",
        "gemini_api_configured": bool(GEMINI_API_KEY)
    }

@app.post("/api/analyze")
async def analyze_resume(
    resume: Optional[UploadFile] = File(None),
    resume_preset_id: Optional[str] = Form(None),
    job_description: Optional[str] = Form(None),
    job_preset_id: Optional[str] = Form(None)
):
    """
    Main endpoint: Upload resume file or select preset ID, plus job description text.
    Returns complete MatchAI JSON structure with scores, skills, gaps, recommendations, and insights.
    """
    resume_text = ""
    resume_filename = "Uploaded_Resume.pdf"
    
    if resume and resume.filename:
        resume_filename = resume.filename
        file_bytes = await resume.read()
        resume_text = extract_text_from_bytes(file_bytes, resume.filename)
    elif resume_preset_id:
        resume_text = f"Senior Software Engineer with experience in Python, React, SQL, REST APIs, Git, Data Structures, PostgreSQL, and Agile development. 5 years experience building web applications."
        resume_filename = f"Preset_{resume_preset_id}.pdf"
    else:
        resume_text = "Software engineer candidate with Python, JavaScript, SQL, and REST API experience."

    job_text = job_description or ""
    if not job_text and job_preset_id:
        job_text = f"Senior Full Stack Engineer at Stripe. Requirements: 4+ years Python, React, SQL, Docker, AWS, Kubernetes, REST APIs, System Design."

    if not job_text:
        raise HTTPException(status_code=400, detail="Job description or job_preset_id is required.")

    # Run AI & ATS analysis
    result = await run_ai_match_analysis(resume_text, job_text, resume_filename)
    
    # Cache result in memory
    analysis_id = result.get("id", "analysis-1")
    ANALYSIS_STORE[analysis_id] = result
    
    return result

@app.get("/api/analysis/{analysis_id}")
def get_analysis(analysis_id: str):
    """Retrieve previous analysis by ID."""
    if analysis_id in ANALYSIS_STORE:
        return ANALYSIS_STORE[analysis_id]
        
    raise HTTPException(status_code=404, detail="Analysis ID not found.")

@app.get("/api/resources")
def get_learning_resources(skill: Optional[str] = None):
    """Return learning resources for requested skill."""
    return {
        "skill": skill or "Docker & AWS",
        "resources": [
            {
                "title": "Docker Mastery: Containerization from Zero to Hero",
                "provider": "Udemy",
                "estimatedTime": "8-12 hours",
                "url": "https://docs.docker.com/get-started/"
            },
            {
                "title": "AWS Certified Cloud Practitioner",
                "provider": "AWS Skill Builder",
                "estimatedTime": "15-20 hours",
                "url": "https://aws.amazon.com/training/"
            }
        ]
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=True)
