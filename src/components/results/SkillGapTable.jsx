import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import Modal from '../common/Modal';

export default function SkillGapTable({ matrix, learningRecs, onStartLearning }) {
  const [activeModalRec, setActiveModalRec] = useState(null);

  const rows = matrix || [
    { id: 1, skill: 'Docker', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'DevOps' },
    { id: 2, skill: 'AWS', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'Cloud' },
    { id: 3, skill: 'Kubernetes', jobRequirement: 'Preferred', resumeStatus: 'Missing', priority: 'Medium', category: 'DevOps' },
    { id: 4, skill: 'Python', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low', category: 'Backend' },
    { id: 5, skill: 'React', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low', category: 'Frontend' }
  ];

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Medium</span>;
      case 'low':
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'strong':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Strong
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1 text-rose-700 font-semibold text-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Missing
          </span>
        );
      default:
        return <span className="text-amber-700 font-semibold text-xs">Partial</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Skill Gap Matrix Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Skill Gap Breakdown Table</h3>
            <p className="text-xs text-slate-400">Direct comparison of job prerequisites vs detected resume evidence</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            {rows.length} Skills Analyzed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                <th className="py-3 px-4">Skill</th>
                <th className="py-3 px-4">Job Requirement</th>
                <th className="py-3 px-4">Resume Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.map((r) => (
                <tr key={r.id || r.skill} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{r.skill}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{r.jobRequirement}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(r.resumeStatus)}</td>
                  <td className="py-3.5 px-4">{getPriorityBadge(r.priority)}</td>
                  <td className="py-3.5 px-4 text-right">
                    {r.resumeStatus === 'Missing' ? (
                      <button
                        onClick={() => {
                          const matchingRec = (learningRecs || []).find(rec => rec.skill.toLowerCase().includes(r.skill.toLowerCase())) || {
                            skill: r.skill,
                            whyItMatters: `Learn ${r.skill} fundamentals to fulfill job requirements.`,
                            estimatedTime: '8-12 hours',
                            resourceTitle: `${r.skill} Complete Developer Guide`,
                            provider: 'Official Documentation & Video Courses',
                            url: 'https://google.com'
                          };
                          setActiveModalRec(matchingRec);
                        }}
                        className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        View Resource
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendation Panel: How to close your skill gaps */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              AI Action Plan
            </span>
            <h3 className="text-xl font-extrabold tracking-tight mt-2">How to Close Your Skill Gaps</h3>
            <p className="text-xs text-slate-300">Recommended learning paths matched to high-priority missing skills</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(learningRecs || []).map((rec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col justify-between space-y-4 hover:border-indigo-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{rec.skill}</span>
                  <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-indigo-300" /> {rec.estimatedTime}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">{rec.resourceTitle || rec.skill}</h4>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{rec.whyItMatters}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-indigo-200 font-mono">{rec.provider}</span>
                <button
                  onClick={() => setActiveModalRec(rec)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
                >
                  Start Learning
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resource Detail Modal */}
      {activeModalRec && (
        <Modal
          isOpen={!!activeModalRec}
          onClose={() => setActiveModalRec(null)}
          title={`Resource Guide: ${activeModalRec.skill}`}
        >
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Curated Course Overview</span>
              <h4 className="text-base font-extrabold text-indigo-950">{activeModalRec.resourceTitle || activeModalRec.skill}</h4>
              <p className="text-slate-700">{activeModalRec.whyItMatters}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">Estimated Time</span>
                <span className="text-sm font-bold text-slate-900">{activeModalRec.estimatedTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">Provider Platform</span>
                <span className="text-sm font-bold text-slate-900">{activeModalRec.provider || 'Coursera / Udemy'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalRec(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200"
              >
                Close
              </button>
              <a
                href={activeModalRec.url || 'https://google.com'}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
              >
                Open External Resource <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
