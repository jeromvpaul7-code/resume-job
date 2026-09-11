import React from 'react';
import {
  LayoutDashboard,
  FileSearch,
  FileText,
  Bookmark,
  Target,
  GraduationCap,
  Settings,
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'Resume Analysis', icon: FileSearch, badge: 'AI' },
    { id: 'resumes', label: 'My Resumes', icon: FileText, count: '3' },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: Bookmark },
    { id: 'skill-gaps', label: 'Skill Gaps', icon: Target, badge: 'Hot' },
    { id: 'learning', label: 'Learning Hub', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <button
              onClick={() => handleSelect('dashboard')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">Match</span>
                  <span className="font-extrabold text-lg text-indigo-600">AI</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Resume & Skill Engine</p>
              </div>
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="p-4">
            <button
              onClick={() => handleSelect('analyze')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-between shadow-sm shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                Analyze New Job
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 py-2 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Main Menu
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card / Upgrade Box */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Pro AI Engine</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-indigo-500/30 text-indigo-300 rounded border border-indigo-500/40">Active</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">98.4% ATS Parser Accuracy Enabled</p>
          </div>
        </div>
      </aside>
    </>
  );
}
