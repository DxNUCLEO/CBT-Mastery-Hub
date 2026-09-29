import React from 'react';
import {
  Compass,
  Atom,
  BookOpen,
  Calculator,
  Play,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  ShieldCheck
} from 'lucide-react';
import { SubjectId, OverallAnalytics } from '../types';
import { SUBJECTS } from '../data/subjects';

interface DashboardProps {
  onOpenTestConfig: () => void;
  onStartSubjectTest: (subject: SubjectId, mode: 'test' | 'study') => void;
  onNavigateToStudy: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToVault: () => void;
  analytics: OverallAnalytics;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onOpenTestConfig,
  onStartSubjectTest,
  onNavigateToStudy,
  onNavigateToAnalytics,
  onNavigateToVault,
  analytics,
}) => {
  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'general_awareness':
        return <Compass className="w-6 h-6" />;
      case 'science':
        return <Atom className="w-6 h-6" />;
      case 'english':
        return <BookOpen className="w-6 h-6" />;
      case 'mathematics':
        return <Calculator className="w-6 h-6" />;
      default:
        return <Target className="w-6 h-6" />;
    }
  };

  const getStaggerClass = (index: number) => {
    const staggers = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];
    return staggers[index % 4];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white p-6 sm:p-10 shadow-xl overflow-hidden animate-slide-down">
        {/* Abstract background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-emerald-500/20 blur-2xl mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-teal-50 border border-white/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Next-Generation CBT Examination Simulation Engine</span>
            </div>
  
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              Master Competitive Exams with Real CBT Experience
            </h1>
  
            <p className="text-base sm:text-lg text-teal-50 leading-relaxed max-w-xl font-sans opacity-90">
              Prepare seamlessly with 500 questions per subject across General Awareness, Science,
              English, and Mathematics. Experience authentic exam countdown timers, color-coded question
              palettes, realistic negative marking, and comprehensive step-by-step solutions.
            </p>
  
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenTestConfig}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-teal-800 text-sm font-bold shadow-lg transition-all btn-press flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Exam</span>
              </button>
  
              <button
                onClick={onNavigateToStudy}
                className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 text-sm font-bold transition-all btn-press flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Study Mode</span>
              </button>
            </div>
          </div>
          
          {/* Decorative floating stats right side */}
          <div className="hidden lg:flex flex-col gap-5 w-72 shrink-0 animate-float">
            <div className="glass bg-white/10 p-5 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">2000+</div>
                  <div className="text-xs text-teal-100 font-medium uppercase tracking-wider">Total MCQs</div>
                </div>
              </div>
            </div>
            
            <div className="glass bg-white/10 p-5 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md ml-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">+2 <span className="text-xl text-teal-200">/ -0.5</span></div>
                  <div className="text-xs text-teal-100 font-medium uppercase tracking-wider">Marking Scheme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Snapshot */}
      {analytics.totalTestsCompleted > 0 && (
        <div className="bg-white dark:bg-[#141824] rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 animate-scale-in stagger-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-stone-900 dark:text-stone-100">
                Your Exam Preparation Snapshot
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
                {analytics.totalTestsCompleted} Tests Completed · {analytics.totalQuestionsAttempted} Questions Attempted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm font-mono bg-stone-50 dark:bg-[#0B0F1A] px-6 py-3 rounded-xl border border-stone-100 dark:border-stone-800">
            <div className="text-center">
              <span className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Overall Accuracy</span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
                {analytics.overallAccuracy}%
              </span>
            </div>
            <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
            <div className="text-center">
              <span className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Average Score</span>
              <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                {analytics.averageScorePercentage}%
              </span>
            </div>
            <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
            <button
              onClick={onNavigateToAnalytics}
              className="font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Subject Cards Section */}
      <div className="space-y-6">
        <div className="flex items-end justify-between px-1">
          <div>
            <h2 className="text-2xl font-display font-bold text-stone-900 dark:text-stone-100">
              Subject Modules
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Select a module to read study notes or launch a mock test
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.keys(SUBJECTS) as SubjectId[]).map((sId, index) => {
            const subj = SUBJECTS[sId];
            const stat = analytics.subjectStats[sId];

            return (
              <div
                key={sId}
                className={`bg-white dark:bg-[#141824] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden flex flex-col card-hover animate-slide-up ${getStaggerClass(index)}`}
              >
                {/* Image Header with Overlay */}
                <div className="relative h-48 w-full img-overlay">
                  {subj.imageUrl ? (
                    <img src={subj.imageUrl} alt={subj.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-teal-800 flex items-center justify-center text-teal-900 opacity-50">
                      <BookOpen size={64} />
                    </div>
                  )}
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2033] via-[#1C2033]/60 to-transparent dark:from-[#0B0F1A] dark:via-[#0B0F1A]/80 dark:to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-lg">
                        {getSubjectIcon(sId)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white drop-shadow-md">
                          {subj.name}
                        </h3>
                        <span className="text-sm font-medium text-teal-100 drop-shadow-sm flex items-center gap-1">
                          <Target className="w-3.5 h-3.5" /> 500 Questions Bank
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-[#1C2033]/80 dark:bg-[#0B0F1A]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700/50 text-right">
                      <span className="text-xs text-stone-300 block uppercase font-bold tracking-wider">Accuracy</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {stat && stat.questionsAttempted > 0 ? `${stat.accuracy}%` : '--%'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col grow">
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans mb-6">
                    {subj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {subj.topics.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                    {subj.topics.length > 4 && (
                      <span className="text-[11px] font-bold text-stone-500 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full">
                        +{subj.topics.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 dark:border-stone-800/80">
                    <button
                      onClick={() => onStartSubjectTest(sId, 'study')}
                      className="py-3 px-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 hover:border-teal-600 hover:text-teal-600 dark:hover:border-teal-500 dark:hover:text-teal-400 text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center gap-2 transition-all btn-press cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Study Notes</span>
                    </button>

                    <button
                      onClick={() => onStartSubjectTest(sId, 'test')}
                      className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-[#0B0F1A] text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all btn-press cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Mock Test</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-display font-bold text-stone-900 dark:text-stone-100 px-1">
          CBT Feature Highlights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm animate-fadeIn stagger-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
              Question Palette
            </h4>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
              Authentic 5-color status matrix: Answered, Marked for Review, Answered & Marked, Not Answered, and Not Visited.
            </p>
          </div>

          <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm animate-fadeIn stagger-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
              Negative Marking
            </h4>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
              Standard marking scheme (+2.0 / -0.5) reinforces disciplined risk-taking and reduces blind guessing.
            </p>
          </div>

          <div className="bg-white dark:bg-[#141824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm animate-fadeIn stagger-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
              Study Tools & Analytics
            </h4>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
              Instant feedback in Study Mode, combined with comprehensive test analytics, subject-wise accuracy tracking and bookmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
