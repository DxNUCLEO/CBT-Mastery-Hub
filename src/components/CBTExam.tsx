import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Clock,
  Calculator as CalcIcon,
  Edit3,
  Bookmark,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Send,
  Pause,
  Play,
  HelpCircle,
} from 'lucide-react';
import { Question, TestConfig, UserResponse, SubjectId, TestResult } from '../types';
import { SUBJECTS } from '../data/subjects';
import { CBTCalculator } from './CBTCalculator';
import { Scratchpad } from './Scratchpad';
import { calculateTestResult, formatTime, toggleBookmark, isBookmarked } from '../utils/analytics';

interface CBTExamProps {
  config: TestConfig;
  questions: Question[];
  onFinishExam: (result: TestResult) => void;
  onExitExam: () => void;
}

export const CBTExam: React.FC<CBTExamProps> = ({
  config,
  questions,
  onFinishExam,
  onExitExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, UserResponse>>(() => {
    const initial: Record<string, UserResponse> = {};
    questions.forEach((q, idx) => {
      initial[q.id] = {
        questionId: q.id,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
        visited: idx === 0, // First question is visited initially
      };
    });
    return initial;
  });

  const [activeSubjectFilter, setActiveSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [remainingSeconds, setRemainingSeconds] = useState(config.durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isQuestionBookmarked, setIsQuestionBookmarked] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Sync bookmark status
  useEffect(() => {
    if (currentQuestion) {
      setIsQuestionBookmarked(isBookmarked(currentQuestion.id));
    }
  }, [currentIndex, currentQuestion]);

  // Mark current question as visited
  useEffect(() => {
    if (currentQuestion) {
      setResponses((prev) => {
        const cur = prev[currentQuestion.id];
        if (cur && !cur.visited) {
          return {
            ...prev,
            [currentQuestion.id]: { ...cur, visited: true },
          };
        }
        return prev;
      });
    }
  }, [currentIndex, currentQuestion]);

  // Countdown timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitFinal();
          return 0;
        }
        return prev - 1;
      });

      // Track time spent on current question
      if (currentQuestion) {
        setResponses((prev) => {
          const cur = prev[currentQuestion.id];
          if (!cur) return prev;
          return {
            ...prev,
            [currentQuestion.id]: {
              ...cur,
              timeSpentSeconds: cur.timeSpentSeconds + 1,
            },
          };
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, currentQuestion]);

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Option selection
  const handleSelectOption = (optIdx: number) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: optIdx,
      },
    }));
  };

  // Clear current response
  const handleClearResponse = () => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: null,
      },
    }));
  };

  // Mark for review & Next
  const handleMarkForReviewAndNext = () => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isMarkedForReview: true,
      },
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Save & Next
  const handleSaveAndNext = () => {
    // If it was marked for review, clear mark since user is explicitly saving and proceeding
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isMarkedForReview: false,
      },
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Previous
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Jump directly to a question
  const handleJumpTo = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Handle bookmark
  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    const added = toggleBookmark(currentQuestion);
    setIsQuestionBookmarked(added);
  };

  // Calculate palette status
  const getQuestionStatus = useCallback(
    (qId: string) => {
      const resp = responses[qId];
      if (!resp || !resp.visited) return 'not_visited';
      if (resp.isMarkedForReview && resp.selectedOption !== null) return 'answered_and_marked';
      if (resp.isMarkedForReview) return 'marked';
      if (resp.selectedOption !== null) return 'answered';
      return 'not_answered';
    },
    [responses]
  );

  // Palette counts
  const counts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;

    questions.forEach((q) => {
      const status = getQuestionStatus(q.id);
      if (status === 'answered') answered++;
      else if (status === 'not_answered') notAnswered++;
      else if (status === 'marked') marked++;
      else if (status === 'answered_and_marked') answeredAndMarked++;
      else notVisited++;
    });

    return { answered, notAnswered, marked, answeredAndMarked, notVisited };
  }, [questions, getQuestionStatus]);

  // Submit test
  const handleSubmitFinal = () => {
    const totalTimeSpent = config.durationMinutes * 60 - remainingSeconds;
    const result = calculateTestResult(config, questions, responses, totalTimeSpent);
    onFinishExam(result);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when modals are open
      if (showSubmitModal || showExitConfirm || isCalculatorOpen || isScratchpadOpen) return;

      if (e.key === '1' || e.key === 'a' || e.key === 'A') handleSelectOption(0);
      else if (e.key === '2' || e.key === 'b' || e.key === 'B') handleSelectOption(1);
      else if (e.key === '3' || e.key === 'c' || e.key === 'C') handleSelectOption(2);
      else if (e.key === '4' || e.key === 'd' || e.key === 'D') handleSelectOption(3);
      else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') handleSaveAndNext();
      else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') handlePrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showSubmitModal, showExitConfirm, isCalculatorOpen, isScratchpadOpen]);

  // Filtered question indices for the palette
  const filteredIndices = useMemo(() => {
    return questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => activeSubjectFilter === 'all' || q.subject === activeSubjectFilter)
      .map(({ idx }) => idx);
  }, [questions, activeSubjectFilter]);

  const currentResp = responses[currentQuestion?.id] || { selectedOption: null };

  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#0B0F1A] flex flex-col select-none animate-fadeIn">
      {/* Top CBT Examination Control Bar */}
      <header className="bg-white dark:bg-[#141824] border-b border-stone-200 dark:border-stone-800 px-4 py-2.5 shadow-xs sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Test info */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-teal-600 dark:text-teal-400 tracking-tight">
              ApexCBT Terminal
            </span>
            <span className="hidden sm:inline-block text-xs text-stone-400">|</span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
              <span className="font-semibold text-stone-900 dark:text-white">
                Full Marks: {config.fullMarks}
              </span>
              <span>(+2 / -0.5)</span>
            </div>
          </div>

          {/* Center: Live Countdown Timer */}
          <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800/80 px-3.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700">
            <Clock
              className={`w-4 h-4 ${
                remainingSeconds < 300 ? 'text-rose-500 animate-pulse' : 'text-teal-600 dark:text-teal-400'
              }`}
            />
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Time Left:</span>
            <span
              className={`font-mono text-base font-bold ${
                remainingSeconds < 300 ? 'text-rose-600 dark:text-rose-400' : 'text-stone-900 dark:text-white'
              }`}
            >
              {formatTime(remainingSeconds)}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="ml-1 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded transition-colors cursor-pointer"
              title={isPaused ? 'Resume Timer' : 'Pause Timer'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-500" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Right: Quick CBT utilities */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Virtual Scientific Calculator"
            >
              <CalcIcon className="w-4 h-4" />
              <span className="hidden md:inline">Calculator</span>
            </button>

            <button
              onClick={() => setIsScratchpadOpen(true)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Rough Scratchpad"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden md:inline">Scratchpad</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer hidden sm:block"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          </div>
        </div>
      </header>

      {/* Section / Subject Tab Filter Bar */}
      <div className="bg-white dark:bg-[#141824] border-b border-stone-200 dark:border-stone-800 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-stone-500 dark:text-stone-400 mr-1 hidden sm:inline">
              Sections:
            </span>
            <button
              onClick={() => setActiveSubjectFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSubjectFilter === 'all'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              All Sections ({questions.length})
            </button>

            {config.subjects.map((sId) => {
              const countInSubj = questions.filter((q) => q.subject === sId).length;
              return (
                <button
                  key={sId}
                  onClick={() => setActiveSubjectFilter(sId)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSubjectFilter === sId
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {SUBJECTS[sId].shortName} ({countInSubj})
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-mono">Exam in Progress</span>
          </div>
        </div>
      </div>

      {/* Main Examination Viewport */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: Active Question Workspace (3 cols) */}
        <div className="lg:col-span-3 flex flex-col bg-white dark:bg-[#141824] rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 overflow-hidden">
          {/* Question Header */}
          <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-[#141824]/70">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-stone-900 dark:text-white">
                Question {currentIndex + 1}
              </span>
              <span className="text-xs text-stone-400">/ {questions.length}</span>
              <span className="mx-1 text-stone-300 dark:text-stone-700">·</span>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                {SUBJECTS[currentQuestion.subject].name}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                ({currentQuestion.topic})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-mono font-medium text-stone-600 dark:text-stone-300">
                Marks: <strong className="text-emerald-600 dark:text-emerald-400">+2.0</strong>,{' '}
                <strong className="text-rose-600 dark:text-rose-400">-0.5</strong>
              </div>
              <button
                onClick={handleToggleBookmark}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isQuestionBookmarked
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-300'
                    : 'text-stone-400 hover:text-stone-600 border-stone-200 dark:border-stone-700'
                }`}
                title="Flag/Bookmark Question"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6">
            <div className="text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = currentResp.selectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 dark:border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 ring-1 ring-teal-500/30'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50/80 dark:hover:bg-stone-800/40'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800'
                      }`}
                    >
                      {letter}
                    </div>
                    <div className="pt-0.5 text-sm sm:text-base font-normal text-stone-800 dark:text-stone-200">
                      {optionText}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="px-5 py-4 bg-stone-50 dark:bg-stone-900/90 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 rounded-lg border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                Mark for Review & Next
              </button>
              <button
                type="button"
                onClick={handleClearResponse}
                disabled={currentResp.selectedOption === null}
                className="px-3 py-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                type="button"
                onClick={handleSaveAndNext}
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette & Counts (1 col) */}
        <div className="lg:col-span-1 flex flex-col bg-white dark:bg-[#141824] rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2.5">
            <span className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              Question Palette
            </span>
            <span className="text-xs font-mono text-stone-500">
              {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Color Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {counts.answered}
              </span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {counts.notAnswered}
              </span>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {counts.marked}
              </span>
              <span>Marked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-emerald-300 text-[10px] font-bold border-2 border-emerald-400 flex items-center justify-center shrink-0">
                {counts.answeredAndMarked}
              </span>
              <span>Ans & Marked</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <span className="w-5 h-5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                {counts.notVisited}
              </span>
              <span>Not Visited</span>
            </div>
          </div>

          {/* Interactive Question Grid */}
          <div className="flex-1 overflow-y-auto max-h-[380px] pr-1">
            <div className="grid grid-cols-5 gap-2">
              {filteredIndices.map((idx) => {
                const q = questions[idx];
                const status = getQuestionStatus(q.id);
                const isCurrent = idx === currentIndex;

                let colorClasses = 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700';
                if (status === 'answered') {
                  colorClasses = 'bg-emerald-600 text-white border-emerald-600';
                } else if (status === 'not_answered') {
                  colorClasses = 'bg-rose-500 text-white border-rose-500';
                } else if (status === 'marked') {
                  colorClasses = 'bg-purple-600 text-white border-purple-600';
                } else if (status === 'answered_and_marked') {
                  colorClasses = 'bg-purple-600 text-white border-2 border-emerald-400';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleJumpTo(idx)}
                    className={`h-9 rounded-lg font-mono text-xs font-semibold border flex items-center justify-center transition-all cursor-pointer ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-stone-900 scale-105' : 'hover:opacity-90'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exit / Abandon Button */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="w-full py-2 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Exit / Abort Exam
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#141824] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  Confirm Exam Submission
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Are you ready to submit and calculate your scorecard?
                </p>
              </div>
            </div>

            {/* Summary statistics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 text-xs">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">Total Questions</span>
                <span className="text-sm font-bold font-mono text-stone-900 dark:text-white">
                  {questions.length}
                </span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">Answered</span>
                <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {counts.answered + counts.answeredAndMarked}
                </span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">Unanswered</span>
                <span className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400">
                  {counts.notAnswered + counts.notVisited}
                </span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">Time Left</span>
                <span className="text-sm font-bold font-mono text-stone-900 dark:text-white">
                  {formatTime(remainingSeconds)}
                </span>
              </div>
            </div>

            {counts.notAnswered + counts.notVisited > 0 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-xs text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  You still have {counts.notAnswered + counts.notVisited} unattempted questions!
                  Negative marks (-0.5) only apply to incorrect answers; unattempted questions earn 0.
                </span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
              >
                Resume Exam
              </button>
              <button
                type="button"
                onClick={handleSubmitFinal}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Exam Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#141824] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white">
              Abandon Current Exam?
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Exiting now will discard current progress. Do you wish to return to the dashboard?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={onExitExam}
                className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Abandon & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals for Calculator and Scratchpad */}
      <CBTCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <Scratchpad isOpen={isScratchpadOpen} onClose={() => setIsScratchpadOpen(false)} />
    </div>
  );
};
