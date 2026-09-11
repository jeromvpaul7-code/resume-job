import React from 'react';

export default function CircularProgress({
  value = 82,
  size = 140,
  strokeWidth = 12,
  label = 'Overall Match',
  category = 'Strong Match',
  colorScheme = 'indigo',
  showDetails = true
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  // Determine stroke color gradients based on score or custom scheme
  const getColorGradient = () => {
    if (colorScheme === 'emerald' || value >= 85) return { stroke: 'url(#gradient-emerald)', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (colorScheme === 'indigo' || value >= 75) return { stroke: 'url(#gradient-indigo)', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (colorScheme === 'amber' || value >= 60) return { stroke: 'url(#gradient-amber)', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { stroke: 'url(#gradient-rose)', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const scheme = getColorGradient();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <defs>
            <linearGradient id="gradient-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="gradient-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="gradient-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="gradient-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress circle with smooth transition */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={scheme.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {value}%
          </span>
          {showDetails && (
            <span className="text-xs font-medium text-slate-500 mt-0.5">
              Score
            </span>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 text-center">
          <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
          {category && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mt-1 ${scheme.badge}`}>
              {category}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
