import React, { useState } from 'react';
import SkillBadge from '../common/SkillBadge';
import Modal from '../common/Modal';
import { CheckCircle2, AlertTriangle, Lightbulb, Info } from 'lucide-react';

export default function SkillsBadgeSection({ skillsCategory }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const matching = skillsCategory?.matching || [];
  const missing = skillsCategory?.missing || [];
  const recommended = skillsCategory?.recommended || [];

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Skills Compatibility Matrix</h3>
          <p className="text-xs text-slate-400">Hover or click any badge to inspect resume evidence and job requirements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matching Skills */}
        <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Matching Skills ({matching.length})
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Strong Fit
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {matching.map((skill, idx) => (
              <SkillBadge key={idx} skill={skill} type="matching" onSelect={setSelectedSkill} />
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Missing Skills ({missing.length})
            </span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              High Priority
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {missing.map((skill, idx) => (
              <SkillBadge key={idx} skill={skill} type="missing" onSelect={setSelectedSkill} />
            ))}
          </div>
        </div>

        {/* Recommended Skills */}
        <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Recommended Skills ({recommended.length})
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Competitive Edge
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {recommended.map((skill, idx) => (
              <SkillBadge key={idx} skill={skill} type="recommended" onSelect={setSelectedSkill} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSkill && (
        <Modal
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={`Skill Deep Dive: ${typeof selectedSkill === 'string' ? selectedSkill : selectedSkill.name}`}
        >
          <div className="space-y-4 text-xs leading-relaxed text-slate-700">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-bold">
                Importance: {selectedSkill.importance || 'High'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold">
                Requirement: {selectedSkill.requirement || 'Required'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" />
                Resume Evidence Analysis
              </h4>
              <p className="text-slate-600">
                {selectedSkill.evidence || 'Analyzed across resume work experiences, bullet points, and project histories.'}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
