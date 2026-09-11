import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  FileCode,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { PRESET_RESUMES, PRESET_JOBS } from '../../data/mockData';
import LoadingAnalysis from './LoadingAnalysis';
import { analyzeMatch } from '../../services/api';

export default function AnalyzePage({ onAnalysisComplete }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedResumePreset, setSelectedResumePreset] = useState('res-1');
  const [jobDescription, setJobDescription] = useState(PRESET_JOBS[0].description);
  const [selectedJobPreset, setSelectedJobPreset] = useState('job-1');
  
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(1);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const jobFileInputRef = useRef(null);

  // File Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    setError(null);
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
      setError('Invalid file format. Please upload a PDF or DOCX file.');
      return;
    }

    if (file.size > maxSize) {
      setError('File size exceeds 10 MB limit.');
      return;
    }

    setResumeFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      raw: file
    });
    setSelectedResumePreset(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleJobFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJobDescription(event.target.result);
        setSelectedJobPreset(null);
      };
      reader.readAsText(file);
    }
  };

  const handleSelectJobPreset = (jobId) => {
    const job = PRESET_JOBS.find(j => j.id === jobId);
    if (job) {
      setSelectedJobPreset(jobId);
      setJobDescription(job.description);
    }
  };

  const handleSelectResumePreset = (resId) => {
    setSelectedResumePreset(resId);
    setResumeFile(null);
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste or upload a job description.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setProgressStep(1);

    try {
      const result = await analyzeMatch({
        resumeFile: resumeFile ? resumeFile.raw : null,
        resumePresetId: selectedResumePreset,
        jobDescription,
        jobPresetId: selectedJobPreset,
        progressCallback: ({ step, message }) => {
          setProgressStep(step);
          setProgressMessage(message);
        }
      });

      if (result.success) {
        onAnalysisComplete(result.data);
      } else {
        setError('Failed to analyze match. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const activeResumeInfo = resumeFile || PRESET_RESUMES.find(r => r.id === selectedResumePreset);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {isLoading && (
        <LoadingAnalysis progressStep={progressStep} progressMessage={progressMessage} />
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Match Analysis Setup</h2>
          <p className="text-xs text-slate-500 mt-1">Upload your resume and paste the target job description to compute ATS score & skill gap remediation.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Presets Ready
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            PDF & DOCX Support
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-500 hover:text-rose-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: YOUR RESUME */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              1. Your Resume
            </h3>
            <span className="text-xs font-medium text-slate-400">PDF or DOCX • Max 10 MB</span>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
              isDragging
                ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01]'
                : 'border-slate-200/80 hover:border-indigo-300 bg-white hover:bg-slate-50/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc"
              className="hidden"
            />

            {resumeFile ? (
              /* Uploaded Custom File Card */
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-500/20">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[280px]">
                      {resumeFile.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{resumeFile.size}</p>
                  </div>
                </div>

                <button
                  onClick={() => setResumeFile(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Dropzone Placeholder */
              <div className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                  <UploadCloud className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Drop your resume here</h4>
                  <p className="text-xs text-slate-400 mt-1">or click browse files on your device</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Sample Preset Resume Switcher */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Or pick a sample demo resume:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_RESUMES.map((res) => {
                const isSelected = selectedResumePreset === res.id && !resumeFile;
                return (
                  <button
                    key={res.id}
                    onClick={() => handleSelectResumePreset(res.id)}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs'
                        : 'bg-slate-50/60 border-slate-100 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="truncate">{res.name}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: JOB DESCRIPTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-purple-600" />
              2. Job Description
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={jobFileInputRef}
                onChange={handleJobFileUpload}
                accept=".txt,.md,.doc,.docx"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => jobFileInputRef.current?.click()}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Upload Job File
              </button>
            </div>
          </div>

          {/* Textarea Input */}
          <div className="relative rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setSelectedJobPreset(null);
              }}
              rows={9}
              placeholder="Paste the job description here..."
              className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:outline-none resize-none leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400 font-mono">
              <span>{jobDescription.length} characters</span>
              <span>{jobDescription.trim().split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>

          {/* Sample Job Presets Switcher */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Or pick a sample job posting:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_JOBS.map((job) => {
                const isSelected = selectedJobPreset === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => handleSelectJobPreset(job.id)}
                    className={`p-2 rounded-xl text-[11px] font-semibold text-center border transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-xs'
                        : 'bg-slate-50/60 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {job.company}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 flex flex-col items-center justify-center">
        <button
          onClick={handleAnalyze}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
          Analyze Match →
        </button>
        <p className="text-xs text-slate-400 mt-2 font-medium">Instant ATS Score, Skill Gap Detection & Remediation Plan</p>
      </div>
    </div>
  );
}
