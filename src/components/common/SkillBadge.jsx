import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, Info, X } from 'lucide-react';

export default function SkillBadge({ skill, type = 'matching', onSelect }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStyles = () => {
    switch (type) {
      case 'matching':
        return {
          bg: 'bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border-emerald-200/80',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
          dot: 'bg-emerald-500',
          tagBg: 'bg-emerald-100 text-emerald-800'
        };
      case 'missing':
        return {
          bg: 'bg-rose-50 hover:bg-rose-100/80 text-rose-800 border-rose-200/80',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />,
          dot: 'bg-rose-500',
          tagBg: 'bg-rose-100 text-rose-800'
        };
      case 'recommended':
      default:
        return {
          bg: 'bg-amber-50 hover:bg-amber-100/80 text-amber-900 border-amber-200/80',
          icon: <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
          dot: 'bg-amber-500',
          tagBg: 'bg-amber-100 text-amber-800'
        };
    }
  };

  const styles = getStyles();
  const name = typeof skill === 'string' ? skill : skill.name;
  const importance = typeof skill === 'object' ? skill.importance : null;
  const requirement = typeof skill === 'object' ? skill.requirement : null;
  const evidence = typeof skill === 'object' ? skill.evidence : null;

  return (
    <div className="relative inline-block m-1">
      <div
        onClick={() => {
          if (onSelect) onSelect(skill);
          setShowTooltip(!showTooltip);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-xs ${styles.bg}`}
      >
        {styles.icon}
        <span>{name}</span>

        {importance && (
          <span className={`ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded-md ${styles.tagBg}`}>
            {importance}
          </span>
        )}
      </div>

      {/* Popover / Tooltip */}
      {showTooltip && (evidence || requirement) && (
        <div className="absolute z-30 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between font-semibold border-b border-slate-800 pb-1.5 mb-1.5 text-slate-200">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              {name} Details
            </span>
            <span className="text-[10px] text-indigo-300 uppercase font-mono">{requirement || type}</span>
          </div>

          {evidence && (
            <p className="text-slate-300 leading-relaxed font-normal">
              <strong className="text-white">Evidence:</strong> {evidence}
            </p>
          )}

          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
        </div>
      )}
    </div>
  );
}
