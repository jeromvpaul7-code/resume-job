import React from 'react';
import { Tag, Check, X, Sparkles, Building, Briefcase, GraduationCap, Code2, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function KeywordAnalysis({ jobAnalysis }) {
  const found = jobAnalysis?.keywords?.found || ['Python', 'React', 'SQL', 'REST APIs', 'Git', 'PostgreSQL'];
  const missing = jobAnalysis?.keywords?.missing || ['Docker', 'AWS', 'Kubernetes', 'CI/CD'];
  const recommended = jobAnalysis?.keywords?.recommended || ['System Design', 'Serverless', 'Terraform'];

  const chartData = [
    { name: 'Found Keywords', count: found.length, color: '#10b981' },
    { name: 'Missing Keywords', count: missing.length, color: '#f43f5e' },
    { name: 'Recommended', count: recommended.length, color: '#6366f1' }
  ];

  return (
    <div className="space-y-6">
      {/* Job Details Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
              Target Role Metadata
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {jobAnalysis?.title || 'Senior Full Stack Engineer'}
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
              <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-slate-400" /> {jobAnalysis?.company || 'Stripe'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {jobAnalysis?.experience || '4-6 years'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {jobAnalysis?.education || "Bachelor's Degree"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
              ATS Keyword Density: 74%
            </span>
          </div>
        </div>

        {/* Technical & Soft Skills Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-600" /> Technical Skill Spectrum
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(jobAnalysis?.technicalSkills || ['Python', 'React', 'SQL', 'Docker', 'AWS', 'Kubernetes']).map(s => (
                <span key={s} className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" /> Soft Skills & Mindset
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(jobAnalysis?.softSkills || ['Problem Solving', 'Cross-functional', 'System Design Thinking']).map(s => (
                <span key={s} className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyword Coverage Visualization */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Keyword Coverage & Density Breakdown</h3>
            <p className="text-xs text-slate-400">Visualizing keywords found in resume vs missing ATS target terms</p>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Keyword Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Found Keywords */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Keywords Found ({found.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {found.map(k => (
                <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/60 space-y-2">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
              <X className="w-3.5 h-3.5 text-rose-600" /> Missing Keywords ({missing.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {missing.map(k => (
                <span key={k} className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-semibold">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Keywords */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/60 space-y-2">
            <span className="text-xs font-bold text-indigo-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> High Yield Boosters ({recommended.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {recommended.map(k => (
                <span key={k} className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-semibold">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
