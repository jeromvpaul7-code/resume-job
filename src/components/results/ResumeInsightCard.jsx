import React from 'react';
import { ShieldCheck, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ResumeInsightCard({ insights }) {
  const strengths = insights?.strengths || [
    'Strong Python experience & API engineering background',
    'Good software development background with modern React frontend mastery',
    'Relevant academic projects and computer science fundamentals'
  ];

  const improvements = insights?.improvements || [
    'Add measurable achievements (e.g. "Increased API throughput by 40%")',
    'Highlight cloud experience or side project deployment details',
    'Include Docker/AWS containerized project case studies'
  ];

  const tips = insights?.optimizationTips || [
    'Use specific ATS phrasing matching the job post: replace "web APIs" with "REST APIs & Microservices".',
    'Start bullet points with high-impact action verbs like "Architected", "Engineered", and "Optimized".',
    'Place a tech skills matrix high up on your resume layout.'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Strengths Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Your Strengths</h3>
            <p className="text-[11px] text-slate-400">Key advantages found in your resume</p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {strengths.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Areas to Improve Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Areas to Improve</h3>
            <p className="text-[11px] text-slate-400">Gaps hindering higher ATS ranking</p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {improvements.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resume Optimization Tips Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Optimization Tips</h3>
            <p className="text-[11px] text-slate-400">Actionable advice for ATS pass-through</p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {tips.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
