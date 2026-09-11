import React, { useState } from 'react';
import { FileText, Download, Trash2, Eye, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRESET_RESUMES } from '../../data/mockData';
import Modal from '../common/Modal';

export default function MyResumesPage({ onNavigate }) {
  const [resumes, setResumes] = useState(PRESET_RESUMES);
  const [previewResume, setPreviewResume] = useState(null);

  const handleDelete = (id) => {
    setResumes(resumes.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">My Resumes</h2>
          <p className="text-xs text-slate-500 mt-1">Manage your uploaded CV versions and ATS parsing readiness scores.</p>
        </div>

        <button
          onClick={() => onNavigate('analyze')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Upload New Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resumes.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ATS Score: 92%
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 truncate mb-1">{res.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{res.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Uploaded: {res.uploadedAt}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPreviewResume(res)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(res.id)}
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewResume && (
        <Modal
          isOpen={!!previewResume}
          onClose={() => setPreviewResume(null)}
          title={`Resume Preview: ${previewResume.name}`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Executive Summary</span>
              <p className="text-slate-800 leading-relaxed font-medium">{previewResume.summary}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Extracted Skill Vectors</span>
              <div className="flex flex-wrap gap-1.5">
                {previewResume.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
