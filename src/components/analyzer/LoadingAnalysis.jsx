import React from 'react';
import { Sparkles, Brain, Cpu, FileSearch, CheckCircle2 } from 'lucide-react';

export default function LoadingAnalysis({ progressStep, progressMessage }) {
  const steps = [
    { num: 1, text: 'Extracting text & layout structure from Resume' },
    { num: 2, text: 'Parsing job description skills & qualification matrix' },
    { num: 3, text: 'Computing semantic embeddings & experience fit' },
    { num: 4, text: 'Mapping skill gaps & generating learning recommendations' }
  ];

  const currentPercent = Math.min(100, Math.max(15, progressStep * 25));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-8 text-center space-y-6">
        {/* Animated AI Brain Icon */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 animate-ping opacity-20" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <Brain className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Engine Processing
          </span>
          <h3 className="text-xl font-extrabold text-slate-900">
            AI is analyzing your resume...
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {progressMessage || 'Matching skills, experience, and education prerequisites...'}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${currentPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 font-semibold">
            <span>{currentPercent}% COMPLETE</span>
            <span>Parsing ATS Metrics</span>
          </div>
        </div>

        {/* Step-by-Step Progress Checklist */}
        <div className="space-y-2.5 text-left border-t border-slate-100 pt-4">
          {steps.map((s) => {
            const isDone = progressStep > s.num;
            const isCurrent = progressStep === s.num;
            return (
              <div
                key={s.num}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors text-xs ${
                  isCurrent ? 'bg-indigo-50/80 border border-indigo-200/60 font-semibold text-indigo-900' : 'text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={isDone ? 'line-through text-slate-400' : ''}>{s.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
