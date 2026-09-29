import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  FileText,
  BarChart2,
} from 'lucide-react';
import { TestResult, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';
import { formatTime } from '../utils/analytics';

interface ScorecardProps {
  result: TestResult;
  onReviewTest: () => void;
  onRetake: () => void;
  onGoToAnalytics: () => void;
  onGoHome: () => void;
}

export const Scorecard: React.FC<ScorecardProps> = ({
  result,
  onReviewTest,
  onRetake,
  onGoToAnalytics,
  onGoHome,
}) => {
  useEffect(() => {
    if (result.percentage >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [result.percentage]);

  const accuracy =
    result.attemptedCount > 0
      ? Number(((result.correctCount / result.attemptedCount) * 100).toFixed(1))
      : 0;

  const getRankBadge = (pct: number) => {
    if (pct >= 85) return { label: 'Outstanding / Top 1%', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' };
    if (pct >= 70) return { label: 'Excellent / Top 5%', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200' };
    if (pct >= 50) return { label: 'Qualified / Average', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200' };
    return { label: 'Needs Improvement', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200' };
  };

  const badge = getRankBadge(result.percentage);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-slide-up">
      {/* Top Banner / Hero Score Card */}
      <div className="bg-white dark:bg-[#141824] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-stone-200 dark:border-stone-700">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>CBT Official Assessment Scorecard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              Exam Performance Overview
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Completed on {new Date(result.timestamp).toLocaleDateString()} at{' '}
              {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Primary Net Score Ring / Box */}
          <div className="flex flex-col items-center bg-stone-50 dark:bg-stone-800/80 px-8 py-5 rounded-2xl border border-stone-200 dark:border-stone-700/80 shrink-0">
            <span className="text-xs uppercase font-semibold text-stone-500 dark:text-stone-400 tracking-wider">
              Net Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl sm:text-5xl font-mono font-extrabold text-teal-600 dark:text-teal-400">
                {result.netScore}
              </span>
              <span className="text-base font-mono text-stone-400 font-semibold">
                / {result.totalMarks}
              </span>
            </div>
            <div className={`mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </div>
          </div>
        </div>

        {/* Metric Quadrants */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct (+2.0)</span>
            </div>
            <div className="text-xl font-mono font-bold text-stone-900 dark:text-white mt-1">
              {result.correctCount}
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              +{result.positiveMarks} Marks
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-semibold">
              <XCircle className="w-4 h-4" />
              <span>Wrong (-0.5)</span>
            </div>
            <div className="text-xl font-mono font-bold text-stone-900 dark:text-white mt-1">
              {result.wrongCount}
            </div>
            <div className="text-[11px] text-rose-500 font-mono">
              -{result.negativeMarks} Marks lost
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 text-xs font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>Accuracy</span>
            </div>
            <div className="text-xl font-mono font-bold text-stone-900 dark:text-white mt-1">
              {accuracy}%
            </div>
            <div className="text-[11px] text-stone-500">
              {result.attemptedCount} / {result.totalQuestions} Attempted
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>Time Taken</span>
            </div>
            <div className="text-xl font-mono font-bold text-stone-900 dark:text-white mt-1">
              {formatTime(result.timeTakenSeconds)}
            </div>
            <div className="text-[11px] text-stone-500">
              {Math.round(result.timeTakenSeconds / (result.attemptedCount || 1))}s / question
            </div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Performance Table */}
      <div className="bg-white dark:bg-[#141824] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">
            Subject-Wise Marks Breakdown
          </h2>
          <span className="text-xs text-stone-500">Standard Marking (+2 / -0.5)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3 text-center">Attempted</th>
                <th className="py-3 px-3 text-center">Correct</th>
                <th className="py-3 px-3 text-center">Wrong</th>
                <th className="py-3 px-3 text-center">Net Marks</th>
                <th className="py-3 px-3 text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-mono">
              {(Object.keys(result.subjectBreakdown) as SubjectId[]).map((sId) => {
                const sb = result.subjectBreakdown[sId];
                if (!sb || sb.total === 0) return null;
                const meta = SUBJECTS[sId];

                return (
                  <tr key={sId} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/30">
                    <td className="py-3.5 px-3 font-sans font-semibold text-stone-900 dark:text-stone-100">
                      {meta.name}
                    </td>
                    <td className="py-3.5 px-3 text-center text-stone-600 dark:text-stone-300">
                      {sb.attempted} / {sb.total}
                    </td>
                    <td className="py-3.5 px-3 text-center text-emerald-600 dark:text-emerald-400 font-bold">
                      {sb.correct}
                    </td>
                    <td className="py-3.5 px-3 text-center text-rose-600 dark:text-rose-400 font-bold">
                      {sb.wrong}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-stone-900 dark:text-white">
                      {sb.netScore}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span
                        className={`font-bold ${
                          sb.accuracy >= 75
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : sb.accuracy >= 50
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {sb.accuracy}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onGoHome}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          Return to Arena
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onRetake}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>

          <button
            onClick={onReviewTest}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Review Full Solutions & Explanations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
