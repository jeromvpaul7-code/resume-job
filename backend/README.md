# MatchAI Python FastAPI Backend

A high-performance Python FastAPI service providing AI resume-to-job matching, ATS scoring, skill gap detection, and personalized learning path synthesis.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
An `.env` file is pre-configured with your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
```

### 3. Run FastAPI Server
```bash
python main.py
```
Or with Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Server will start on: `http://localhost:8000`  
Interactive API Docs: `http://localhost:8000/docs`

## 📡 API Endpoints

- `GET /api/health` -> Server status & AI API key verification
- `POST /api/analyze` -> Upload resume (`PDF`/`DOCX`) + job description text
- `GET /api/analysis/{id}` -> Fetch analysis by ID
- `GET /api/resources` -> Retrieve learning resource recommendations
