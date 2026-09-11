import React, { useState } from 'react';
import { Bookmark, Building, Briefcase, Zap, Trash2, ArrowRight } from 'lucide-react';
import { PRESET_JOBS } from '../../data/mockData';

export default function SavedJobsPage({ onNavigate, onPresetSelect }) {
  const [jobs, setJobs] = useState(PRESET_JOBS);

  const handleRemove = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Saved Job Descriptions</h2>
          <p className="text-xs text-slate-500 mt-1">Bookmarked opportunities ready for Instant AI match calculation.</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          {jobs.length} Saved Jobs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{job.company}</span>
                <button
                  onClick={() => handleRemove(job.id)}
                  className="p-1 rounded text-slate-300 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">{job.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{job.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{job.experienceRequired}</span>
                <span>{job.location}</span>
              </div>

              <button
                onClick={() => {
                  if (onPresetSelect) onPresetSelect(job.id);
                  onNavigate('analyze');
                }}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                Run AI Matcher
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
