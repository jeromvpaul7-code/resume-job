import React, { useState } from 'react';
import { Menu, Search, Bell, Sparkles, User, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab, setIsMobileOpen, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'analyze': return 'Resume & Job Matcher';
      case 'results': return 'Analysis Report & Score Breakdown';
      case 'resumes': return 'My Resume Collection';
      case 'saved-jobs': return 'Saved Job Descriptions';
      case 'skill-gaps': return 'Skill Gap Matrix';
      case 'learning': return 'Personalized Learning Hub';
      case 'settings': return 'System & API Settings';
      default: return 'MatchAI Portal';
    }
  };

  const notifications = [
    { id: 1, title: 'New Match Result', text: 'Senior Full Stack Engineer @ Stripe (82% Match)', time: '10 mins ago', unread: true },
    { id: 2, title: 'Skill Gap Recommendation', text: '3 high-priority learning resources ready for Docker & AWS', time: '1 hour ago', unread: true },
    { id: 3, title: 'ATS Compatibility', text: 'Alex_Morgan_Resume.pdf scored 92% formatting index', time: 'Yesterday', unread: false }
  ];

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">{getTitle()}</h1>
          <p className="text-xs text-slate-400 font-medium hidden sm:block">AI-Driven Match Analytics & Skill Remediation</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Search Input Bar */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, jobs, recommendations..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-100/80 border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] font-semibold text-indigo-600 hover:underline cursor-pointer">Mark all as read</span>
              </div>

              <div className="space-y-1 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('results');
                    }}
                    className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                      n.unread ? 'bg-indigo-50/60 hover:bg-indigo-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 line-clamp-2 leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              J
            </div>
            <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Jerome</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-800">Jerome</p>
                <p className="text-[11px] text-slate-500 truncate">jerome@example.com</p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Premium Account
                </span>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('settings');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Account & API Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('dashboard');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Dashboard Overview
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
