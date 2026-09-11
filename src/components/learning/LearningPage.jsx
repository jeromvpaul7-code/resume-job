import React, { useState } from 'react';
import { GraduationCap, Clock, ArrowUpRight, CheckCircle2, Award, BookOpen, Star } from 'lucide-react';
import { MOCK_ANALYSIS_RESULTS } from '../../data/mockData';

export default function LearningPage() {
  const [completed, setCompleted] = useState([false, false, false]);

  const recs = MOCK_ANALYSIS_RESULTS['analysis-1'].learningRecommendations;

  const toggleCompleted = (index) => {
    const next = [...completed];
    next[index] = !next[index];
    setCompleted(next);
  };

  const completedCount = completed.filter(Boolean).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            Skill Remediation Roadmap
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Personalized Learning Hub</h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Curated courses designed to bridge your missing technical skills for target job applications.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <div className="text-right">
            <span className="text-2xl font-black text-amber-400">{completedCount}/{recs.length}</span>
            <p className="text-[10px] text-slate-300 font-bold uppercase">Modules Completed</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recs.map((rec, idx) => {
          const isDone = completed[idx];
          return (
            <div
              key={rec.id}
              className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between space-y-4 ${
                isDone ? 'border-emerald-300 bg-emerald-50/20 shadow-xs' : 'border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                    {rec.skill}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {rec.estimatedTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {rec.resourceTitle || rec.skill}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {rec.whyItMatters}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">{rec.provider}</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {rec.rating || 4.8}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCompleted(idx)}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isDone ? 'Completed' : 'Mark Completed'}
                  </button>

                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    title="Open Resource"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
