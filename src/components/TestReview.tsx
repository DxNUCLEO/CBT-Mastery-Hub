import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ArrowLeft,
  Filter,
  Clock,
  Sparkles,
} from 'lucide-react';
import { TestResult, Question } from '../types';
import { SUBJECTS } from '../data/subjects';
import { toggleBookmark, isBookmarked } from '../utils/analytics';

interface TestReviewProps {
  result: TestResult;
  onBackToScorecard: () => void;
  onGoHome: () => void;
}

export const TestReview: React.FC<TestReviewProps> = ({
  result,
  onBackToScorecard,
  onGoHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct' | 'unattempted'>('incorrect');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter questions based on filter tab
  const filteredQuestions = useMemo(() => {
    return result.questionList.filter((q) => {
      const resp = result.responses[q.id];
      const isUnattempted = !resp || resp.selectedOption === null;
      const isCorrect = resp && resp.selectedOption === q.correctIndex;
      const isWrong = resp && resp.selectedOption !== null && resp.selectedOption !== q.correctIndex;

      if (filter === 'incorrect') return isWrong;
      if (filter === 'correct') return isCorrect;
      if (filter === 'unattempted') return isUnattempted;
      return true; // 'all'
    });
  }, [result, filter]);

  // Fallback to 'all' if no questions match filter
  const activeList = filteredQuestions.length > 0 ? filteredQuestions : result.questionList;
  const currentQuestion: Question = activeList[currentIndex] || activeList[0];
  const resp = currentQuestion ? result.responses[currentQuestion.id] : null;

  const bookmarked = currentQuestion ? isBookmarked(currentQuestion.id) : false;

  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    toggleBookmark(currentQuestion);
    // force update
    setCurrentIndex((prev) => prev);
  };

  const isUserCorrect = resp && resp.selectedOption === currentQuestion.correctIndex;
  const isUserWrong = resp && resp.selectedOption !== null && !isUserCorrect;
  const isUnattempted = !resp || resp.selectedOption === null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="bg-white dark:bg-[#141824] rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToScorecard}
            className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#1C2033] rounded-xl transition-colors cursor-pointer btn-press"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
              Exam Solutions & Explanation Review
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Analyze mistakes, read detailed explanations, and review performance
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-[#0B0F1A] p-1 rounded-xl text-xs font-semibold overflow-x-auto border border-stone-200 dark:border-stone-800">
          <button
            onClick={() => {
              setFilter('incorrect');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Mistakes Only ({result.wrongCount})
          </button>

          <button
            onClick={() => {
              setFilter('all');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            All ({result.totalQuestions})
          </button>

          <button
            onClick={() => {
              setFilter('correct');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Correct ({result.correctCount})
          </button>

          <button
            onClick={() => {
              setFilter('unattempted');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'unattempted'
                ? 'bg-stone-700 dark:bg-stone-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Skipped ({result.unattemptedCount})
          </button>
        </div>
      </div>

      {/* Main Review Card */}
      {currentQuestion ? (
        <div className="bg-white dark:bg-[#141824] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden animate-slide-up">
          {/* Question Title & Outcome Banner */}
          <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2 bg-[#F7F7F5] dark:bg-[#1C2033]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Question {currentIndex + 1} of {activeList.length}
              </span>
              <span className="text-stone-300 dark:text-stone-600">·</span>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                {SUBJECTS[currentQuestion.subject].name}
              </span>
              <span className="text-stone-300 dark:text-stone-600">·</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {currentQuestion.topic}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Result badge */}
              {isUserCorrect && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-1 border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Correct (+2.0m)</span>
                </span>
              )}
              {isUserWrong && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 flex items-center gap-1 border border-rose-200 dark:border-rose-800/50">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Incorrect (-0.5m)</span>
                </span>
              )}
              {isUnattempted && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center gap-1 border border-stone-200 dark:border-stone-700">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Unattempted (0.0m)</span>
                </span>
              )}

              {resp && (
                <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{resp.timeSpentSeconds}s</span>
                </span>
              )}

              <button
                onClick={handleToggleBookmark}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  bookmarked
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-300 dark:border-amber-700/50'
                    : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
                title="Save question for revision"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-lg font-medium text-stone-900 dark:text-stone-100 leading-relaxed font-sans">
              {currentQuestion.question}
            </div>

            {/* Options with user and correct answer highlight */}
            <div className="space-y-3">
              {currentQuestion.options.map((optText, optIdx) => {
                const isSelectedByUser = resp?.selectedOption === optIdx;
                const isCorrectAnswer = optIdx === currentQuestion.correctIndex;
                const letter = String.fromCharCode(65 + optIdx);

                let optionStyles = 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141824]';

                if (isCorrectAnswer) {
                  optionStyles =
                    'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/40';
                } else if (isSelectedByUser && !isCorrectAnswer) {
                  optionStyles =
                    'border-rose-500 bg-rose-50/80 dark:bg-rose-900/20 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500/40';
                } else {
                  optionStyles = 'border-stone-200 dark:border-stone-800 opacity-60';
                }

                return (
                  <div
                    key={optIdx}
                    className={`w-full p-4 rounded-xl border flex items-start justify-between gap-4 transition-all ${optionStyles}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCorrectAnswer
                            ? 'bg-emerald-600 text-white'
                            : isSelectedByUser && !isCorrectAnswer
                            ? 'bg-rose-600 text-white'
                            : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 bg-white dark:bg-[#1C2033]'
                        }`}
                      >
                        {letter}
                      </div>
                      <span className="pt-0.5 text-sm sm:text-base font-normal">{optText}</span>
                    </div>

                    <div className="shrink-0 pt-0.5 text-xs font-bold">
                      {isCorrectAnswer && (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Key
                        </span>
                      )}
                      {isSelectedByUser && !isCorrectAnswer && (
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Your Selection
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Explanation Container */}
            <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50 space-y-3">
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Comprehensive Solution & Concept Breakdown</span>
              </div>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>

              {currentQuestion.formulaOrRule && (
                <div className="mt-4 p-4 bg-white dark:bg-[#141824] rounded-xl border border-teal-100 dark:border-teal-900/60 text-sm font-mono text-teal-700 dark:text-teal-300 shadow-sm">
                  <div className="text-stone-400 mb-1 uppercase text-[10px] font-bold tracking-wider">Key Rule / Formula:</div>
                  <div>{currentQuestion.formulaOrRule}</div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 bg-[#F7F7F5] dark:bg-[#1C2033] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-[#141824] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed btn-press"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Solution
            </button>

            <span className="text-xs text-stone-500 font-mono font-medium tracking-wide">
              {currentIndex + 1} of {activeList.length}
            </span>

            <button
              onClick={() => {
                if (currentIndex < activeList.length - 1) setCurrentIndex((prev) => prev + 1);
              }}
              disabled={currentIndex === activeList.length - 1}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed btn-press shadow-sm"
            >
              <span>Next Solution</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-[#141824] rounded-2xl border border-stone-200 dark:border-stone-800">
          <p className="text-stone-500 dark:text-stone-400 text-sm">No questions found for this filter.</p>
        </div>
      )}
    </div>
  );
};
