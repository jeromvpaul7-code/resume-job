import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Target,
  Brain,
  GraduationCap,
  UploadCloud,
  FileText,
  LineChart,
  ShieldCheck,
  Zap
} from 'lucide-react';
import CircularProgress from '../common/CircularProgress';

export default function LandingPage({ onStartAnalysis, onSeeHowItWorks }) {
  const features = [
    {
      icon: Brain,
      title: 'AI Resume Analysis',
      description: 'Advanced NLP algorithms parse your resume formatting, keywords, and domain terminology for 98.4% ATS compatibility.'
    },
    {
      icon: LineChart,
      title: 'Job Match Score',
      description: 'Get an instant multidimensional score calculating technical fit, experience years, and education alignment.'
    },
    {
      icon: Target,
      title: 'Skill Gap Detection',
      description: 'Pinpoint exact missing hard and soft skills required by job postings before you submit your application.'
    },
    {
      icon: FileSearch,
      title: 'Experience Matching',
      description: 'Compare your past roles, responsibilities, and key achievements directly against target job expectations.'
    },
    {
      icon: GraduationCap,
      title: 'Personalized Learning Resources',
      description: 'Receive curated courses, documentation, and estimated study hours to close your skill gaps rapidly.'
    }
  ];

  const steps = [
    { step: '01', title: 'Upload Resume', desc: 'Drag & drop your PDF or DOCX file (up to 10 MB).' },
    { step: '02', title: 'Add Job Description', desc: 'Paste the target job description or choose a sample.' },
    { step: '03', title: 'AI Analyzes Both', desc: 'Our neural matcher compares skills, keywords, and experience.' },
    { step: '04', title: 'Get Score & Gaps', desc: 'Unlock your match score, missing skills table, and learning path.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Top Banner Navigation */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Match<span className="text-indigo-600">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onSeeHowItWorks}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors hidden sm:block"
          >
            How It Works
          </button>
          <button
            onClick={onStartAnalysis}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30"
          >
            Analyze My Resume
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-6 animate-pulse-glow">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          Powered by Deep Neural Skill Gap Analytics
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Know Your Resume.<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Match Your Dream Job.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-normal">
          Upload your resume and paste any job description. MatchAI scans technical keywords, calculates match scores, uncovers missing skills, and crafts your custom learning roadmap.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Analyze My Resume
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onSeeHowItWorks}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:border-slate-300"
          >
            See How It Works
          </button>
        </div>

        {/* Hero Visual Preview Card */}
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-2xl p-6 md:p-8 overflow-hidden text-left">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified Match</span>
                <span className="text-xs text-slate-400 font-medium">Stripe • Senior Full Stack Engineer</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Alex_Morgan_Resume.pdf</h3>
            </div>
            <div className="flex items-center gap-6">
              <CircularProgress value={82} size={90} strokeWidth={9} showDetails={false} />
              <div>
                <span className="text-2xl font-black text-slate-900">82% Match</span>
                <p className="text-xs font-semibold text-emerald-600">Strong Candidate</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-emerald-700 block mb-2">Matching Skills (7)</span>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'React', 'SQL', 'REST APIs', 'Git'].map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-rose-700 block mb-2">Missing Skills (3)</span>
              <div className="flex flex-wrap gap-1.5">
                {['Docker', 'AWS', 'Kubernetes'].map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-indigo-700 block mb-2">AI Remediation Plan</span>
              <p className="text-xs text-slate-600">Learn Docker Compose & AWS EC2 deployment (~12 hrs total)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Built for Modern Job Seekers & Tech Talent
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to beat applicant tracking systems and optimize your skill set for top employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-100 bg-slate-50/50 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            How MatchAI Works in 4 Easy Steps
          </h2>
          <p className="text-slate-500 text-sm">
            From raw document parsing to actionable skill gap insights in under 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-3xl font-black text-indigo-100 block mb-3 font-mono">{s.step}</span>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{s.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-10 mt-20 border-t border-slate-200/80 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-800">MatchAI</span> • AI Resume-to-Job Matcher & Skill Gap Analysis
        </div>
        <p>© 2026 MatchAI Platform. Built for recruitment automation & skill remediation.</p>
      </footer>
    </div>
  );
}
