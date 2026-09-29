import React, { useState } from 'react';
import { Bookmark, Trash2, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { getBookmarks, toggleBookmark } from '../utils/analytics';
import { SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';

interface RevisionVaultProps {
  onStartStudyWithSubject: (subj: SubjectId) => void;
}

export const RevisionVault: React.FC<RevisionVaultProps> = ({ onStartStudyWithSubject }) => {
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [activeFilter, setActiveFilter] = useState<SubjectId | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleRemove = (q: any) => {
    toggleBookmark(q);
    setBookmarks(getBookmarks());
  };

  const filtered = bookmarks.filter((b) => {
    if (activeFilter === 'all') return true;
    return b.question.subject === activeFilter;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#141824] rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-amber-900/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden animate-slide-up stagger-1">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 mb-3 uppercase tracking-wide">
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Saved Questions Notebook</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-display">
            Revision Vault
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-medium">
            Revisit tricky questions, conceptual formulas, and personal bookmarks
          </p>
        </div>

        <div className="text-right relative z-10 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-800/30">
          <span className="text-4xl font-extrabold font-mono text-amber-600 dark:text-amber-500">
            {bookmarks.length}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800/70 dark:text-amber-500/70 block mt-1">
            Saved Items
          </span>
        </div>
      </div>

      {/* Filter strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide animate-slide-up stagger-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer shadow-sm btn-press ${
            activeFilter === 'all'
              ? 'bg-teal-600 text-white ring-2 ring-teal-600/20'
              : 'bg-white dark:bg-[#141824] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033]'
          }`}
        >
          All Subjects ({bookmarks.length})
        </button>

        {(Object.keys(SUBJECTS) as SubjectId[]).map((sId) => {
          const count = bookmarks.filter((b) => b.question.subject === sId).length;
          return (
            <button
              key={sId}
              onClick={() => setActiveFilter(sId)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer shadow-sm btn-press ${
                activeFilter === sId
                  ? 'bg-teal-600 text-white ring-2 ring-teal-600/20'
                  : 'bg-white dark:bg-[#141824] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033]'
              }`}
            >
              {SUBJECTS[sId].shortName} ({count})
            </button>
          );
        })}
      </div>

      {/* Bookmarks List */}
      {filtered.length > 0 ? (
        <div className="space-y-4 animate-slide-up stagger-3">
          {filtered.map((item) => {
            const q = item.question;
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-[#141824] rounded-2xl border transition-all shadow-sm overflow-hidden ${
                  isExpanded ? 'border-amber-300 dark:border-amber-700/50 ring-4 ring-amber-50 dark:ring-amber-900/10' : 'border-stone-200 dark:border-stone-800 hover:border-amber-200 dark:hover:border-amber-800/30'
                }`}
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
                      <span className="font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                        {SUBJECTS[q.subject].name}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="font-bold text-stone-600 dark:text-stone-400">
                        {q.topic}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-[11px] font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                        Saved {new Date(item.addedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-base font-medium text-stone-900 dark:text-stone-100 leading-relaxed font-sans">
                      {q.question}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(q);
                      }}
                      className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C2033] text-stone-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 dark:hover:bg-rose-900/20 dark:hover:border-rose-800/50 transition-all btn-press"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C2033]">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-5 bg-[#F7F7F5] dark:bg-[#1C2033] animate-scale-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correctIndex;
                        return (
                          <div
                            key={optIdx}
                            className={`p-4 rounded-xl border text-sm flex items-center justify-between transition-colors ${
                              isCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-950 dark:text-emerald-100 shadow-sm ring-1 ring-emerald-500/40'
                                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-[#141824] text-stone-700 dark:text-stone-300 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#141824] border border-amber-200/50 dark:border-amber-900/30 space-y-3 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>Explanation & Concept:</span>
                      </div>
                      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                      {q.formulaOrRule && (
                        <div className="mt-4 p-4 rounded-xl font-mono text-sm text-amber-800 dark:text-amber-200 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50">
                          <span className="text-stone-400 uppercase text-[10px] font-bold tracking-wider block mb-1">Rule/Formula:</span>
                          {q.formulaOrRule}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-[#141824] rounded-3xl border-2 border-dashed border-amber-200 dark:border-amber-900/30 p-8 space-y-4 shadow-sm animate-slide-up stagger-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-50/50 dark:bg-amber-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
            <Bookmark className="w-10 h-10 text-amber-500 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display relative z-10">
            Your Revision Vault is Empty
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed relative z-10">
            While taking a mock test or practicing in Study Mode, click the bookmark icon on any question to save it here for targeted revision and spaced repetition.
          </p>
        </div>
      )}
    </div>
  );
};
