import React from 'react';
import CircularProgress from '../common/CircularProgress';
import { Award, Code2, Briefcase, GraduationCap } from 'lucide-react';

export default function ScoreCardBreakdown({ scores }) {
  const items = [
    {
      label: 'Overall Match',
      val: scores.overall || 82,
      category: scores.overall >= 80 ? 'Strong Fit' : 'Good Fit',
      icon: Award,
      color: 'indigo'
    },
    {
      label: 'Skills Match',
      val: scores.skills || 88,
      category: 'High Proficiency',
      icon: Code2,
      color: 'emerald'
    },
    {
      label: 'Experience Match',
      val: scores.experience || 76,
      category: 'Moderate Fit',
      icon: Briefcase,
      color: 'amber'
    },
    {
      label: 'Education Match',
      val: scores.education || 92,
      category: 'Fully Verified',
      icon: GraduationCap,
      color: 'emerald'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-between text-center hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-3">
              <Icon className="w-4 h-4 text-indigo-600" />
              <span>{item.label}</span>
            </div>

            <CircularProgress
              value={item.val}
              size={110}
              strokeWidth={10}
              label=""
              category=""
              colorScheme={item.color}
              showDetails={false}
            />

            <div className="mt-3">
              <span className="text-xl font-extrabold text-slate-900">{item.val}%</span>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{item.category}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
