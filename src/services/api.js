import { MOCK_ANALYSIS_RESULTS, PRESET_JOBS, PRESET_RESUMES } from '../data/mockData';

// API Configuration
let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


export const getApiBaseUrl = () => API_BASE_URL || 'Mock Engine (Offline/Local)';
export const setApiBaseUrl = (url) => {
  API_BASE_URL = url;
  if (url) {
    localStorage.setItem('MATCHAI_API_URL', url);
  } else {
    localStorage.removeItem('MATCHAI_API_URL');
  }
};

// Check if localStorage has saved custom API URL
const savedUrl = typeof window !== 'undefined' ? localStorage.getItem('MATCHAI_API_URL') : null;
if (savedUrl) {
  API_BASE_URL = savedUrl;
}

/**
 * Perform Resume to Job Match Analysis
 * Connects to Python FastAPI POST /api/analyze if API_BASE_URL exists,
 * otherwise runs high-fidelity mock AI analysis simulation.
 */
export async function analyzeMatch({ resumeFile, resumePresetId, jobDescription, jobPresetId, progressCallback }) {
  if (progressCallback) progressCallback({ step: 1, message: 'Reading resume structure & extracting text...' });

  if (API_BASE_URL) {
    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append('resume', resumeFile);
      } else if (resumePresetId) {
        formData.append('resume_preset_id', resumePresetId);
      }
      formData.append('job_description', jobDescription || '');
      if (jobPresetId) formData.append('job_preset_id', jobPresetId);

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data, source: 'backend' };
    } catch (err) {
      console.warn('Backend API request failed, falling back to mock engine:', err);
    }
  }

  // Simulated AI steps delay for polished presentation demo
  await new Promise(res => setTimeout(res, 800));
  if (progressCallback) progressCallback({ step: 2, message: 'Parsing job requirements & technical keywords...' });

  await new Promise(res => setTimeout(res, 900));
  if (progressCallback) progressCallback({ step: 3, message: 'Computing vector embeddings & experience matching matrix...' });

  await new Promise(res => setTimeout(res, 900));
  if (progressCallback) progressCallback({ step: 4, message: 'Synthesizing skill gap analysis & learning resources...' });

  await new Promise(res => setTimeout(res, 600));

  // Determine base analysis template from preset or generate dynamic mock
  let analysis = MOCK_ANALYSIS_RESULTS['analysis-1'];
  if (jobPresetId && MOCK_ANALYSIS_RESULTS[`analysis-${jobPresetId.replace('job-', '')}`]) {
    analysis = MOCK_ANALYSIS_RESULTS[`analysis-${jobPresetId.replace('job-', '')}`];
  } else if (jobDescription && jobDescription.toLowerCase().includes('data')) {
    analysis = MOCK_ANALYSIS_RESULTS['analysis-2'] || MOCK_ANALYSIS_RESULTS['analysis-1'];
  }

  // Create a realistic dynamic snapshot ID for newly submitted analyses
  const newAnalysis = {
    ...analysis,
    id: `analysis-${Date.now()}`,
    analyzedAt: 'Just now',
    resumeName: resumeFile ? resumeFile.name : (PRESET_RESUMES.find(r => r.id === resumePresetId)?.name || 'Custom_Resume.pdf'),
    jobTitle: PRESET_JOBS.find(j => j.id === jobPresetId)?.title || extractJobTitleFromText(jobDescription) || 'Software Engineer',
    company: PRESET_JOBS.find(j => j.id === jobPresetId)?.company || 'Target Company'
  };

  return { success: true, data: newAnalysis, source: 'mock' };
}

/**
 * Fetch analysis details by ID
 */
export async function getAnalysisById(id) {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/analysis/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, falling back to mock data:', e);
    }
  }

  return MOCK_ANALYSIS_RESULTS[id] || MOCK_ANALYSIS_RESULTS['analysis-1'];
}

/**
 * Health check endpoint tester
 */
export async function checkBackendStatus() {
  if (!API_BASE_URL) return { online: false, mode: 'Offline Mock Mode' };
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET' });
    if (res.ok) {
      const json = await res.json();
      return { online: true, mode: 'Connected to Python Backend', details: json };
    }
  } catch (e) {
    // fallback
  }
  return { online: false, mode: 'Backend Unreachable (Using Mock)' };
}

function extractJobTitleFromText(text) {
  if (!text) return 'Custom Job Role';
  const firstLine = text.split('\n')[0].trim();
  if (firstLine.length < 50 && firstLine.length > 3) return firstLine;
  return 'Role Match Analysis';
}
