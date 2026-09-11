import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LandingPage from './components/dashboard/LandingPage';
import DashboardOverview from './components/dashboard/DashboardOverview';
import AnalyzePage from './components/analyzer/AnalyzePage';
import ResultsDashboard from './components/results/ResultsDashboard';
import MyResumesPage from './components/resumes/MyResumesPage';
import SavedJobsPage from './components/jobs/SavedJobsPage';
import SkillGapsPage from './components/gaps/SkillGapsPage';
import LearningPage from './components/learning/LearningPage';
import SettingsPage from './components/settings/SettingsPage';
import { MOCK_ANALYSIS_RESULTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(MOCK_ANALYSIS_RESULTS['analysis-1']);
  const [selectedPresetJobId, setSelectedPresetJobId] = useState(null);

  const handleAnalysisComplete = (data) => {
    setCurrentAnalysis(data);
    setActiveTab('results');
  };

  const handlePresetSelect = (jobId) => {
    setSelectedPresetJobId(jobId);
    if (MOCK_ANALYSIS_RESULTS[`analysis-${jobId.replace('job-', '')}`]) {
      setCurrentAnalysis(MOCK_ANALYSIS_RESULTS[`analysis-${jobId.replace('job-', '')}`]);
    }
  };

  if (activeTab === 'landing') {
    return (
      <LandingPage
        onStartAnalysis={() => setActiveTab('analyze')}
        onSeeHowItWorks={() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else setActiveTab('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setIsMobileOpen={setIsMobileOpen}
          onNavigate={(tab) => setActiveTab(tab)}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              onNavigate={(tab) => setActiveTab(tab)}
              onPresetSelect={handlePresetSelect}
            />
          )}

          {activeTab === 'analyze' && (
            <AnalyzePage
              onAnalysisComplete={handleAnalysisComplete}
              presetJobId={selectedPresetJobId}
            />
          )}

          {activeTab === 'results' && (
            <ResultsDashboard
              analysisData={currentAnalysis}
              onAnalyzeNew={() => setActiveTab('analyze')}
            />
          )}

          {activeTab === 'resumes' && (
            <MyResumesPage onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'saved-jobs' && (
            <SavedJobsPage
              onNavigate={(tab) => setActiveTab(tab)}
              onPresetSelect={handlePresetSelect}
            />
          )}

          {activeTab === 'skill-gaps' && (
            <SkillGapsPage onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'learning' && (
            <LearningPage />
          )}

          {activeTab === 'settings' && (
            <SettingsPage />
          )}
        </main>
      </div>
    </div>
  );
}
