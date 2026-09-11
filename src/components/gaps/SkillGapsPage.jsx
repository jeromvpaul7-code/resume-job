import React, { useState } from 'react';
import { Target, AlertTriangle, ArrowUpRight, Filter, Search, ShieldAlert } from 'lucide-react';
import { MOCK_ANALYSIS_RESULTS } from '../../data/mockData';
import Modal from '../common/Modal';

export default function SkillGapsPage({ onNavigate }) {
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedRec, setSelectedRec] = useState(null);

  const allGaps = MOCK_ANALYSIS_RESULTS['analysis-1'].skillGapMatrix;
  const learningRecs = MOCK_ANALYSIS_RESULTS['analysis-1'].learningRecommendations;

  const filteredGaps = allGaps.filter(g => {
    if (filterPriority === 'all') return true;
    return g.priority.toLowerCase() === filterPriority;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Skill Gap Analytics Directory</h2>
          <p className="text-xs text-slate-500 mt-1">Consolidated missing technical competencies across target market jobs.</p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filterPriority === p
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGaps.map((gap) => (
          <div
            key={gap.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                gap.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}>
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{gap.skill}</h4>
                <p className="text-xs text-slate-500 font-medium">{gap.category} • {gap.jobRequirement}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                gap.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {gap.priority} Priority
              </span>

              {gap.resumeStatus === 'Missing' && (
                <button
                  onClick={() => {
                    const rec = learningRecs.find(r => r.skill.toLowerCase().includes(gap.skill.toLowerCase())) || {
                      skill: gap.skill,
                      whyItMatters: `Close your ${gap.skill} gap to meet job specifications.`,
                      estimatedTime: '8-12 hours',
                      provider: 'Coursera / Udemy',
                      url: 'https://docs.docker.com'
                    };
                    setSelectedRec(rec);
                  }}
                  className="p-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedRec && (
        <Modal
          isOpen={!!selectedRec}
          onClose={() => setSelectedRec(null)}
          title={`Close Skill Gap: ${selectedRec.skill}`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <p className="leading-relaxed">{selectedRec.whyItMatters}</p>
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-900 font-bold">
              Estimated Study Time: {selectedRec.estimatedTime}
            </div>
            <a
              href={selectedRec.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:bg-indigo-700"
            >
              Access Learning Material <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
