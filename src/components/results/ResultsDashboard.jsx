import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Download,
  Share2,
  Bookmark,
  CheckCircle2,
  FileText,
  Building,
  Briefcase,
  ArrowLeft,
  Printer
} from 'lucide-react';
import CircularProgress from '../common/CircularProgress';
import ScoreCardBreakdown from './ScoreCardBreakdown';
import MatchFlowPipeline from './MatchFlowPipeline';
import SkillsBadgeSection from './SkillsBadgeSection';
import SkillGapTable from './SkillGapTable';
import ResumeInsightCard from './ResumeInsightCard';
import KeywordAnalysis from './KeywordAnalysis';

export default function ResultsDashboard({ analysisData, onAnalyzeNew }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const data = analysisData || {
    id: 'analysis-1',
    jobTitle: 'Senior Full Stack Engineer',
    company: 'Stripe',
    analyzedAt: 'Just now',
    overallScore: 82,
    matchCategory: 'Strong Match',
    summary: 'Your resume strongly matches this role. You have most of the required technical skills, but could improve your experience with Docker and AWS.',
    scores: { overall: 82, skills: 88, experience: 76, education: 92 },
    skillsCategory: {
      matching: [
        { name: 'Python', importance: 'High', requirement: 'Required', evidence: '5 years backend experience' },
        { name: 'Java', importance: 'Medium', requirement: 'Preferred', evidence: 'Core language coursework' },
        { name: 'SQL', importance: 'High', requirement: 'Required', evidence: 'PostgreSQL database modeling' },
        { name: 'React', importance: 'High', requirement: 'Required', evidence: '3+ years reactive UI development' },
        { name: 'Git', importance: 'High', requirement: 'Required', evidence: 'Collaborative team workflows' },
        { name: 'REST APIs', importance: 'High', requirement: 'Required', evidence: 'Microservices API design' },
        { name: 'Data Structures', importance: 'High', requirement: 'Required', evidence: 'Computer science foundation' }
      ],
      missing: [
        { name: 'Docker', importance: 'High', requirement: 'Required', evidence: 'No containerization listed' },
        { name: 'AWS', importance: 'High', requirement: 'Required', evidence: 'Cloud provider experience absent' },
        { name: 'Kubernetes', importance: 'Medium', requirement: 'Preferred', evidence: 'Orchestration missing' }
      ],
      recommended: [
        { name: 'CI/CD', importance: 'Medium', requirement: 'Recommended', evidence: 'Pipeline automation' },
        { name: 'System Design', importance: 'High', requirement: 'Recommended', evidence: 'Distributed system patterns' },
        { name: 'Cloud Computing', importance: 'High', requirement: 'Recommended', evidence: 'Cloud native scale' }
      ]
    },
    skillGapMatrix: [
      { id: 'sg-1', skill: 'Docker', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High' },
      { id: 'sg-2', skill: 'AWS', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High' },
      { id: 'sg-3', skill: 'Kubernetes', jobRequirement: 'Preferred', resumeStatus: 'Missing', priority: 'Medium' },
      { id: 'sg-4', skill: 'CI/CD Pipelines', jobRequirement: 'Recommended', resumeStatus: 'Partial', priority: 'Medium' },
      { id: 'sg-5', skill: 'Python', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low' },
      { id: 'sg-6', skill: 'React', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low' },
      { id: 'sg-7', skill: 'SQL / PostgreSQL', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low' }
    ],
    learningRecommendations: [
      {
        id: 'rec-1',
        skill: 'Docker',
        whyItMatters: 'Learn Docker fundamentals, containerization, image building, and multi-container setups with Docker Compose.',
        estimatedTime: '8–12 hours',
        resourceTitle: 'Docker Mastery: Containerization from Zero to Hero',
        provider: 'Udemy / Official Docs',
        url: 'https://docs.docker.com/get-started/'
      },
      {
        id: 'rec-2',
        skill: 'AWS (Amazon Web Services)',
        whyItMatters: 'Deploying cloud applications on AWS EC2, S3 storage buckets, and IAM security policies is essential.',
        estimatedTime: '15–20 hours',
        resourceTitle: 'AWS Certified Cloud Practitioner & Hands-On Labs',
        provider: 'AWS Skill Builder / Coursera',
        url: 'https://aws.amazon.com/training/'
      },
      {
        id: 'rec-3',
        skill: 'Kubernetes',
        whyItMatters: 'Understand pod scheduling, deployments, services, and ingress controllers for microservices.',
        estimatedTime: '10–14 hours',
        resourceTitle: 'Kubernetes for Developers & Microservice Engineers',
        provider: 'edX / Linux Foundation',
        url: 'https://kubernetes.io/docs/tutorials/'
      }
    ],
    resumeInsights: {
      strengths: [
        'Strong Python experience & API engineering background',
        'Good software development background with modern React frontend mastery',
        'Relevant academic projects and computer science fundamentals'
      ],
      improvements: [
        'Add measurable achievements (e.g. "Increased API throughput by 40%")',
        'Highlight cloud experience or side project deployment details',
        'Include Docker/AWS containerized project case studies'
      ],
      optimizationTips: [
        'Use specific ATS phrasing matching the job post: replace "web APIs" with "REST APIs & Microservices".',
        'Start bullet points with high-impact action verbs like "Architected", "Engineered", and "Optimized".',
        'Place a tech skills matrix high up on your resume layout.'
      ]
    },
    jobAnalysis: {
      title: 'Senior Full Stack Engineer',
      company: 'Stripe',
      experience: '4-6 years',
      education: "Bachelor's in CS or equivalent",
      technicalSkills: ['Python', 'React', 'SQL', 'Docker', 'AWS', 'Kubernetes', 'REST APIs', 'Java', 'Data Structures'],
      softSkills: ['Problem Solving', 'Cross-functional Collaboration', 'System Design Thinking', 'Agile Mindset'],
      keywords: {
        found: ['Python', 'React', 'SQL', 'REST APIs', 'Git', 'Data Structures', 'Java', 'PostgreSQL'],
        missing: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Microservices'],
        recommended: ['System Design', 'Serverless', 'Terraform', 'Unit Testing']
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Report link copied to clipboard!</span>
        </div>
      )}

      {/* Top Navigation & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onAnalyzeNew}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Analyze Another Job
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isSaved
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            {isSaved ? 'Saved to Profile' : 'Save Analysis'}
          </button>

          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-400" /> Share Link
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Main Hero Header: Resume Match Analysis */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
              AI Analysis Report
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Resume Match Analysis</h2>
            <p className="text-xs text-slate-500">
              Role: <strong className="text-slate-800">{data.jobTitle}</strong> at <strong className="text-slate-800">{data.company}</strong>
            </p>
          </div>

          <span className="text-xs text-slate-400 font-mono hidden sm:block">
            Report ID: #{data.id.slice(-6)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Large Circular Score Indicator */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
            <CircularProgress
              value={data.overallScore}
              size={150}
              strokeWidth={13}
              label="Overall Fit"
              category={data.matchCategory}
              colorScheme="indigo"
              showDetails={true}
            />
          </div>

          {/* AI Generated Executive Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                AI Executive Insights
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                "{data.summary}"
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" /> {data.company}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {data.jobAnalysis?.experience || '4-6 yrs'}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High ATS Formatting Compatibility
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Score Breakdown & Pipeline' },
          { id: 'skills', label: 'Skill Matrix & Gap Table' },
          { id: 'insights', label: 'Resume Insights & Tips' },
          { id: 'keywords', label: 'Job & Keyword Coverage' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB TAB CONTENT VIEWS */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          <ScoreCardBreakdown scores={data.scores} />
          <MatchFlowPipeline pipelineData={data.matchPipeline} />
          <SkillsBadgeSection skillsCategory={data.skillsCategory} />
        </div>
      )}

      {activeSubTab === 'skills' && (
        <div className="space-y-8">
          <SkillsBadgeSection skillsCategory={data.skillsCategory} />
          <SkillGapTable
            matrix={data.skillGapMatrix}
            learningRecs={data.learningRecommendations}
          />
        </div>
      )}

      {activeSubTab === 'insights' && (
        <div className="space-y-8">
          <ResumeInsightCard insights={data.resumeInsights} />
        </div>
      )}

      {activeSubTab === 'keywords' && (
        <div className="space-y-8">
          <KeywordAnalysis jobAnalysis={data.jobAnalysis} />
        </div>
      )}
    </div>
  );
}
