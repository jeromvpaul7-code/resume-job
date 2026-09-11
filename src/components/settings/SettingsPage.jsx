import React, { useState, useEffect } from 'react';
import { Settings, Server, CheckCircle2, AlertCircle, RefreshCw, Save, ShieldCheck, Database } from 'lucide-react';
import { getApiBaseUrl, setApiBaseUrl, checkBackendStatus } from '../../services/api';

export default function SettingsPage() {
  const [apiUrl, setApiUrlState] = useState('');
  const [status, setStatus] = useState({ online: false, mode: 'Checking...' });
  const [isTesting, setIsTesting] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const current = getApiBaseUrl();
    setApiUrlState(current.includes('Mock') ? '' : current);
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setIsTesting(true);
    const res = await checkBackendStatus();
    setStatus(res);
    setIsTesting(false);
  };

  const handleSave = () => {
    setApiBaseUrl(apiUrl.trim());
    setSavedMsg(true);
    runHealthCheck();
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Backend & API Integration</h2>
        <p className="text-xs text-slate-500 mt-1">Configure your Python/FastAPI or Streamlit AI backend endpoint.</p>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>API settings updated successfully!</span>
        </div>
      )}

      {/* Backend API Configuration Form */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Python/FastAPI Service Endpoint</h3>
              <p className="text-xs text-slate-400">Default fallback is our built-in high-fidelity offline mock AI engine</p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            status.online ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700'
          }`}>
            {status.mode}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Backend Base URL (VITE_API_URL)</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrlState(e.target.value)}
              placeholder="e.g. http://localhost:8000 or https://your-fastapi-backend.com"
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Expected endpoints: <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">POST /api/analyze</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">GET /api/analysis/:id</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">GET /api/health</code>
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" /> Save Connection
            </button>

            <button
              onClick={runHealthCheck}
              disabled={isTesting}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} /> Test Health Endpoint
            </button>
          </div>
        </div>
      </div>

      {/* Integration Code Snippet */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold">FastAPI Python Implementation Reference</h3>
          </div>
          <span className="text-[10px] font-mono text-indigo-300">main.py</span>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
{`from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok", "version": "1.0.0"}

@app.post("/api/analyze")
async def analyze_resume(
    resume: UploadFile = File(None),
    job_description: str = Form(...)
):
    # Parse PDF text using PyPDF2 / pdfplumber
    # Extract skills using spaCy / OpenAI / Gemini LLM
    # Compute ATS compatibility and skill gaps
    return {
        "overallScore": 82,
        "matchCategory": "Strong Match",
        "scores": {"overall": 82, "skills": 88, "experience": 76, "education": 92}
    }`}
        </pre>
      </div>
    </div>
  );
}
