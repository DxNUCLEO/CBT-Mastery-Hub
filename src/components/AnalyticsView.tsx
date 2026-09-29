import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Trash2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { computeOverallAnalytics, getTestResults, clearAllTestResults, formatTime } from '../utils/analytics';
import { SUBJECTS } from '../data/subjects';
import { SubjectId, TestResult } from '../types';

interface AnalyticsViewProps {
  onReviewSavedTest: (result: TestResult) => void;
  onLaunchMock: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  onReviewSavedTest,
  onLaunchMock,
}) => {
  const [analytics, setAnalytics] = useState(computeOverallAnalytics());
  const [testResults, setTestResults] = useState(getTestResults());

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire assessment history? This cannot be undone.')) {
      clearAllTestResults();
      setAnalytics(computeOverallAnalytics());
      setTestResults([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#141824] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm animate-slide-up stagger-1">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/50 mb-3 tracking-wide uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Progress Tracking & Performance Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-display">
            Student Performance Dashboard
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Real-time analytics across General Awareness, Science, English, and Mathematics
          </p>
        </div>

        <div className="flex items-center gap-3">
          {testResults.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer btn-press"
              title="Reset Analytics"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onLaunchMock}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white text-sm font-bold shadow-md shadow-teal-600/20 transition-all cursor-pointer btn-press card-hover"
          >
            Take New Mock Test
          </button>
        </div>
      </div>

      {/* Aggregate Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up stagger-2">
        <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm card-hover relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-stone-50 dark:bg-[#1C2033] rounded-full group-hover:scale-110 transition-transform duration-500" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider relative z-10">
            Tests Completed
          </span>
          <div className="text-3xl font-mono font-extrabold text-stone-900 dark:text-stone-100 mt-2 relative z-10">
            {analytics.totalTestsCompleted}
          </div>
          <div className="text-xs text-stone-400 mt-1 font-mono relative z-10">
            {analytics.totalQuestionsAttempted} Questions Attempted
          </div>
        </div>

        <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm card-hover relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-teal-50 dark:bg-teal-900/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider relative z-10">
            Overall Accuracy
          </span>
          <div className="text-3xl font-mono font-extrabold text-teal-600 dark:text-teal-400 mt-2 relative z-10">
            {analytics.overallAccuracy}%
          </div>
          <div className="text-xs text-stone-400 mt-1 font-mono relative z-10">
            {analytics.totalCorrect} Correct · {analytics.totalWrong} Wrong
          </div>
        </div>

        <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm card-hover relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 dark:bg-emerald-900/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider relative z-10">
            Average Score %
          </span>
          <div className="text-3xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 relative z-10">
            {analytics.averageScorePercentage}%
          </div>
          <div className="text-xs text-stone-400 mt-1 relative z-10">
            Net score across all mocks
          </div>
        </div>

        <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm card-hover relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider relative z-10">
            Total Study Time
          </span>
          <div className="text-3xl font-mono font-extrabold text-stone-900 dark:text-stone-100 mt-2 relative z-10">
            {formatTime(analytics.totalTimeSpentSeconds)}
          </div>
          <div className="text-xs text-stone-400 mt-1 relative z-10">
            Active exam duration
          </div>
        </div>
      </div>

      {/* Subject-Wise Mastery Analytics */}
      <div className="bg-white dark:bg-[#141824] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 sm:p-8 space-y-6 animate-slide-up stagger-3">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display">
            Subject-Wise Accuracy & Mastery Breakdown
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Performance comparison across all 4 syllabus pillars (500 questions each)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(SUBJECTS) as SubjectId[]).map((sId) => {
            const meta = SUBJECTS[sId];
            const stats = analytics.subjectStats[sId];
            const hasData = stats && stats.questionsAttempted > 0;

            return (
              <div
                key={sId}
                className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#F7F7F5] dark:bg-[#1C2033] space-y-4 hover:border-teal-300 dark:hover:border-teal-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {meta.name}
                    </span>
                  </div>
                  <span className="font-mono text-lg font-extrabold text-stone-900 dark:text-stone-100">
                    {hasData ? `${stats.accuracy}%` : 'No data'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      stats.accuracy >= 75
                        ? 'bg-emerald-500'
                        : stats.accuracy >= 50
                        ? 'bg-teal-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(5, stats.accuracy))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono pt-1">
                  <span>
                    Attempted: <strong className="text-stone-700 dark:text-stone-300">{stats.questionsAttempted}</strong>
                  </span>
                  <span>
                    Correct: <strong className="text-emerald-600 dark:text-emerald-400">{stats.correct}</strong>
                  </span>
                  <span>
                    Wrong: <strong className="text-rose-600 dark:text-rose-400">{stats.wrong}</strong>
                  </span>
                  <span>
                    Avg: <strong className="text-stone-700 dark:text-stone-300">{stats.avgTimePerQuestion}s</strong>/q
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnostic Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up stagger-4">
        {/* Strong Topics */}
        <div className="bg-white dark:bg-[#141824] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
              Demonstrated Strengths (Accuracy $\ge$ 70%)
            </h3>
          </div>
          {analytics.strongTopics.length > 0 ? (
            <div className="space-y-3">
              {analytics.strongTopics.map((topic, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 text-sm font-semibold text-emerald-900 dark:text-emerald-100 flex items-center justify-between shadow-sm"
                >
                  <span>{topic}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide bg-emerald-500 text-white px-2.5 py-1 rounded-md shadow-sm">
                    Mastered
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Complete more mock tests to reveal your strongest topics.
              </p>
            </div>
          )}
        </div>

        {/* Areas Needing Attention */}
        <div className="bg-white dark:bg-[#141824] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-6 h-6" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
              Areas Needing Attention (Accuracy &lt; 50%)
            </h3>
          </div>
          {analytics.weakTopics.length > 0 ? (
            <div className="space-y-3">
              {analytics.weakTopics.map((topic, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-xl bg-rose-50/80 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/30 text-sm font-semibold text-rose-900 dark:text-rose-100 flex items-center justify-between shadow-sm"
                >
                  <span>{topic}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide bg-rose-500 text-white px-2.5 py-1 rounded-md shadow-sm">
                    Review Required
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Great consistency! No recurring weak topics identified so far.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Historical Test Logs Table */}
      <div className="bg-white dark:bg-[#141824] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-6 shadow-sm animate-slide-up stagger-5">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display">
              Assessment History & Mock Archives
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Review any past test, solutions, and score sheets
            </p>
          </div>
        </div>

        {testResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-stone-100 dark:border-stone-800 text-stone-500 dark:text-stone-400 uppercase tracking-wider font-bold text-xs">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Type & Subjects</th>
                  <th className="py-3 px-4 text-center">Score / Total</th>
                  <th className="py-3 px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 text-center">Time</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono">
                {testResults.map((t) => {
                  const dateStr = new Date(t.timestamp).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  const accuracy =
                    t.attemptedCount > 0
                      ? Number(((t.correctCount / t.attemptedCount) * 100).toFixed(1))
                      : 0;

                  return (
                    <tr key={t.id} className="hover:bg-[#F7F7F5] dark:hover:bg-[#1C2033] transition-colors group">
                      <td className="py-4 px-4 text-stone-600 dark:text-stone-400 font-sans font-medium whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="py-4 px-4 font-sans font-bold text-stone-900 dark:text-stone-100">
                        {t.config.subjects.length > 1
                          ? `Full Mock (${t.totalQuestions} Qs)`
                          : `${SUBJECTS[t.config.subjects[0]].name} (${t.totalQuestions} Qs)`}
                      </td>
                      <td className="py-4 px-4 text-center font-extrabold text-teal-600 dark:text-teal-400">
                        {t.netScore} / {t.totalMarks}
                      </td>
                      <td className="py-4 px-4 text-center font-bold">
                        <span className={accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-600 dark:text-stone-400'}>
                          {accuracy}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-stone-500 dark:text-stone-400">
                        {formatTime(t.timeTakenSeconds)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onReviewSavedTest(t)}
                          className="px-4 py-2 bg-white dark:bg-[#141824] border border-stone-200 dark:border-stone-700 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 dark:hover:border-teal-800 rounded-xl font-bold font-sans text-xs transition-all cursor-pointer shadow-sm group-hover:shadow-md btn-press"
                        >
                          Review Paper
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl bg-[#F7F7F5] dark:bg-[#1C2033]">
            <Award className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
            <p className="text-stone-500 dark:text-stone-400 font-medium">
              No exams recorded yet. Take your first mock test to generate comprehensive analytics!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
