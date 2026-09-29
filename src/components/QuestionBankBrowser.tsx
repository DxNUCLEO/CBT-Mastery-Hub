import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sparkles,
  Play,
} from 'lucide-react';
import { SubjectId, Difficulty, Question } from '../types';
import { SUBJECTS } from '../data/subjects';
import { getQuestionsBySubject, getTotalQuestionCount } from '../data/questionBank';
import { toggleBookmark, isBookmarked } from '../utils/analytics';

interface QuestionBankBrowserProps {
  onStartPractice: (subject: SubjectId) => void;
}

export const QuestionBankBrowser: React.FC<QuestionBankBrowserProps> = ({
  onStartPractice,
}) => {
  const [activeSubject, setActiveSubject] = useState<SubjectId>('general_awareness');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const totalCounts = useMemo(() => getTotalQuestionCount(), []);

  const allQuestions = useMemo(() => {
    return getQuestionsBySubject(activeSubject);
  }, [activeSubject]);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
      const matchSearch =
        searchTerm.trim() === '' ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDiff && matchSearch;
    });
  }, [allQuestions, difficultyFilter, searchTerm]);

  const paginatedQuestions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, page]);

  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#141824] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 animate-slide-up stagger-1">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/50 mb-3 uppercase tracking-wide">
            <Database className="w-3.5 h-3.5" />
            <span>Master Repository (2,000 Questions Total)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-display">
            Curated Question Vault
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Browse, search, and inspect the 500 questions available for each subject
          </p>
        </div>

        <button
          onClick={() => onStartPractice(activeSubject)}
          className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white text-sm font-bold shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 btn-press card-hover"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Practice {SUBJECTS[activeSubject].name}</span>
        </button>
      </div>

      {/* Subject Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up stagger-2">
        {(Object.keys(SUBJECTS) as SubjectId[]).map((sId) => {
          const isCur = activeSubject === sId;
          const s = SUBJECTS[sId];
          const count = totalCounts[sId];

          return (
            <button
              key={sId}
              onClick={() => {
                setActiveSubject(sId);
                setPage(1);
                setExpandedId(null);
              }}
              className={`relative overflow-hidden p-5 rounded-2xl border text-left transition-all cursor-pointer card-hover group ${
                isCur
                  ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-900/20 ring-2 ring-teal-500/20'
                  : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141824] hover:border-teal-300 dark:hover:border-teal-700'
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                <img src={s.imageUrl} alt="" className="w-full h-full object-cover rounded-bl-full" />
              </div>
              
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100 block relative z-10 font-display">
                {s.name}
              </span>
              <span className={`text-xs font-mono font-semibold mt-2 block relative z-10 ${
                isCur ? 'text-teal-700 dark:text-teal-400' : 'text-stone-500 dark:text-stone-400'
              }`}>
                {count} Questions Verified
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-[#141824] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between animate-slide-up stagger-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search questions by topic, formula, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F7F5] dark:bg-[#1C2033] border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-shadow"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value as Difficulty | 'all');
              setPage(1);
            }}
            className="bg-[#F7F7F5] dark:bg-[#1C2033] border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer transition-shadow"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <span className="text-xs text-stone-500 font-mono font-bold px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
            {filteredQuestions.length} Found
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4 animate-slide-up stagger-4">
        {paginatedQuestions.map((q, idx) => {
          const isExpanded = expandedId === q.id;
          const globalIdx = (page - 1) * pageSize + idx + 1;
          const bookmarked = isBookmarked(q.id);

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-[#141824] rounded-2xl border transition-all shadow-sm overflow-hidden ${
                isExpanded ? 'border-teal-300 dark:border-teal-700 ring-4 ring-teal-50 dark:ring-teal-900/10' : 'border-stone-200 dark:border-stone-800 hover:border-teal-200 dark:hover:border-teal-800/50'
              }`}
            >
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-mono text-sm font-bold flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-800/30">
                    #{globalIdx}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                        {q.topic}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm ${
                          q.difficulty === 'easy'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : q.difficulty === 'medium'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-base font-medium text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                      {q.question}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(q);
                      setExpandedId((prev) => prev); // trigger render
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer btn-press ${
                      bookmarked
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-300 dark:border-amber-700/50'
                        : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C2033]'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <div className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C2033]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-5 bg-[#F7F7F5] dark:bg-[#1C2033] animate-scale-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctIndex;
                      const letter = String.fromCharCode(65 + optIdx);
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
                              {letter}
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

                  {/* Explanation card */}
                  <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-900/50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Detailed Solution & Concept Explanation:</span>
                    </div>
                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                      {q.explanation}
                    </p>
                    {q.formulaOrRule && (
                      <div className="mt-4 p-4 rounded-xl font-mono text-sm text-teal-800 dark:text-teal-200 bg-white dark:bg-[#141824] border border-teal-100 dark:border-teal-800 shadow-sm">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-[#141824] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm animate-slide-up stagger-5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors btn-press"
          >
            Previous
          </button>
          <span className="text-sm font-mono font-bold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-lg">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors btn-press"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
