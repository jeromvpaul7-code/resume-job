import React from 'react';
import {
  Sparkles,
  FileSearch,
  FileText,
  Target,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  Zap,
  BarChart2
} from 'lucide-react';
import { USER_STATS, RECENT_ANALYSES, PRESET_JOBS, PRESET_RESUMES } from '../../data/mockData';

export default function DashboardOverview({ onNavigate, onPresetSelect }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              AI Match Engine Active
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning 👋
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Ready to find your next opportunity? Analyze your resume against any job description to discover instant match scores and close your skill gaps.
            </p>
          </div>

          <button
            onClick={() => onNavigate('analyze')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            Analyze New Job
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Resumes Analyzed</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{USER_STATS.resumesAnalyzed}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +3 this month
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Jobs Matched</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{USER_STATS.jobsMatched}</span>
            <span className="text-xs font-semibold text-indigo-600">Active Pipeline</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Average Match</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{USER_STATS.averageMatch}%</span>
            <span className="text-xs font-semibold text-emerald-600">Strong fit</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Skills Improved</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{USER_STATS.skillsImproved}</span>
            <span className="text-xs font-semibold text-slate-400">Completed courses</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Analyses & 1-Click Quick Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Analyses Feed (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Job Analyses</h3>
              <p className="text-xs text-slate-400">Click any report to open detailed score breakdown</p>
            </div>
            <button
              onClick={() => onNavigate('resumes')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_ANALYSES.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('results')}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                    item.score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {item.score}%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{item.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.score >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                  }`}>
                    {item.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preset Selector / Quick Start Card (1 Column) */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Try Preset Job Matches</h3>
            <p className="text-xs text-slate-400">Instantly test AI matcher with pre-loaded profiles</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            {PRESET_JOBS.map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-indigo-50/40 hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-slate-800">{job.title}</h4>
                  <span className="text-[10px] font-semibold text-slate-500">{job.company}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                  {job.description.slice(0, 90)}...
                </p>
                <button
                  onClick={() => {
                    if (onPresetSelect) onPresetSelect(job.id);
                    onNavigate('analyze');
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Load Preset Match
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
