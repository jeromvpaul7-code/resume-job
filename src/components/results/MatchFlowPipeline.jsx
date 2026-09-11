import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Code2, Briefcase, GraduationCap, Target, Award } from 'lucide-react';

export default function MatchFlowPipeline({ pipelineData }) {
  const steps = pipelineData || [
    { step: 'Resume', score: 100, icon: FileText, detail: 'Parsed 1.4k words' },
    { step: 'Skills', score: 88, icon: Code2, detail: '7/10 target skills' },
    { step: 'Experience', score: 76, icon: Briefcase, detail: '5 yrs vs 4-6 yrs' },
    { step: 'Education', score: 92, icon: GraduationCap, detail: 'B.S. CS Verified' },
    { step: 'Job Requirements', score: 82, icon: Target, detail: 'Stripe Criteria' },
    { step: 'Overall Match', score: 82, icon: Award, detail: '82% Strong Fit' }
  ];

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">AI Neural Match Flow Pipeline</h3>
          <p className="text-xs text-slate-400">Sequential evaluation from raw document parsing to weighted match score</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          6 Pipeline Nodes
        </span>
      </div>

      <div className="relative pt-2 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((node, index) => {
            const Icon = node.icon || FileText;
            const isLast = index === steps.length - 1;
            return (
              <div key={index} className="relative flex flex-col items-center group">
                <div className={`w-full p-3.5 rounded-2xl border text-center transition-all ${
                  isLast
                    ? 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-slate-800 shadow-md'
                    : 'bg-slate-50/80 border-slate-200/80 hover:bg-indigo-50/50 hover:border-indigo-200'
                }`}>
                  <div className={`w-8 h-8 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                    isLast ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white text-indigo-600 shadow-xs border border-slate-100'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold block ${isLast ? 'text-white' : 'text-slate-800'}`}>
                    {node.step}
                  </span>
                  <span className={`text-[11px] font-extrabold mt-1 inline-block ${
                    isLast ? 'text-emerald-400' : node.score >= 80 ? 'text-emerald-600' : 'text-indigo-600'
                  }`}>
                    {node.score}%
                  </span>
                  <p className={`text-[10px] truncate mt-0.5 ${isLast ? 'text-slate-300' : 'text-slate-400'}`}>
                    {node.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
