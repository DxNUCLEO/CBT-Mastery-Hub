import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CBTExam } from './components/CBTExam';
import { StudyMode } from './components/StudyMode';
import { Scorecard } from './components/Scorecard';
import { TestReview } from './components/TestReview';
import { AnalyticsView } from './components/AnalyticsView';
import { QuestionBankBrowser } from './components/QuestionBankBrowser';
import { RevisionVault } from './components/RevisionVault';
import { TestConfigModal } from './components/TestConfigModal';
import { TestConfig, TestResult, SubjectId, Question } from './types';
import { generateTestQuestions } from './data/questionBank';
import { computeOverallAnalytics } from './utils/analytics';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

type AppView = 'dashboard' | 'study' | 'exam' | 'scorecard' | 'review' | 'analytics' | 'questions' | 'bookmarks';

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('apexcbt_dark_mode') === 'true';
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [initialConfigMode, setInitialConfigMode] = useState<'test' | 'study'>('test');

  // Active exam state
  const [activeExamConfig, setActiveExamConfig] = useState<TestConfig | null>(null);
  const [activeExamQuestions, setActiveExamQuestions] = useState<Question[]>([]);
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);
  const [selectedStudySubject, setSelectedStudySubject] = useState<SubjectId>('general_awareness');

  const [analytics, setAnalytics] = useState(computeOverallAnalytics());

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('apexcbt_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('apexcbt_dark_mode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Launch exam from config modal
  const handleStartExam = (config: TestConfig) => {
    if (config.mode === 'study') {
      setSelectedStudySubject(config.subjects[0] || 'general_awareness');
      setView('study');
    } else {
      const drawnQuestions = generateTestQuestions(
        config.subjects,
        config.questionsCount,
        config.difficulty
      );
      setActiveExamConfig(config);
      setActiveExamQuestions(drawnQuestions);
      setView('exam');
    }
  };

  // Quick start for a specific subject
  const handleStartSubject = (subject: SubjectId, mode: 'test' | 'study') => {
    if (mode === 'study') {
      setSelectedStudySubject(subject);
      setView('study');
    } else {
      const config: TestConfig = {
        mode: 'test',
        subjects: [subject],
        difficulty: 'mixed',
        fullMarks: 50,
        questionsCount: 25,
        durationMinutes: 30,
      };
      const drawn = generateTestQuestions([subject], 25, 'mixed');
      setActiveExamConfig(config);
      setActiveExamQuestions(drawn);
      setView('exam');
    }
  };

  // Exam finished
  const handleFinishExam = (result: TestResult) => {
    setLastTestResult(result);
    setAnalytics(computeOverallAnalytics());
    setView('scorecard');
  };

  // Review a saved test from analytics
  const handleReviewSavedTest = (result: TestResult) => {
    setLastTestResult(result);
    setView('review');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#0B0F1A] text-stone-900 dark:text-stone-100 flex flex-col transition-colors duration-300 font-sans">
      {/* Show header on non-exam screens */}
      {view !== 'exam' && (
        <Header
          currentView={
            view === 'scorecard' || view === 'review'
              ? 'analytics'
              : (view as 'dashboard' | 'study' | 'analytics' | 'questions' | 'bookmarks')
          }
          onNavigate={(target) => setView(target)}
          onOpenTestConfig={() => {
            setInitialConfigMode('test');
            setIsConfigModalOpen(true);
          }}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Main Content Areas */}
      <main className="flex-1 flex flex-col">
        {view === 'dashboard' && (
          <Dashboard
            onOpenTestConfig={() => {
              setInitialConfigMode('test');
              setIsConfigModalOpen(true);
            }}
            onStartSubjectTest={handleStartSubject}
            onNavigateToStudy={() => setView('study')}
            onNavigateToAnalytics={() => setView('analytics')}
            onNavigateToVault={() => setView('bookmarks')}
            analytics={analytics}
          />
        )}

        {view === 'study' && (
          <StudyMode
            initialSubject={selectedStudySubject}
            onExit={() => setView('dashboard')}
          />
        )}

        {view === 'exam' && activeExamConfig && activeExamQuestions.length > 0 && (
          <CBTExam
            config={activeExamConfig}
            questions={activeExamQuestions}
            onFinishExam={handleFinishExam}
            onExitExam={() => setView('dashboard')}
          />
        )}

        {view === 'scorecard' && lastTestResult && (
          <Scorecard
            result={lastTestResult}
            onReviewTest={() => setView('review')}
            onRetake={() => {
              if (activeExamConfig) {
                handleStartExam(activeExamConfig);
              } else {
                setIsConfigModalOpen(true);
              }
            }}
            onGoToAnalytics={() => setView('analytics')}
            onGoHome={() => setView('dashboard')}
          />
        )}

        {view === 'review' && lastTestResult && (
          <TestReview
            result={lastTestResult}
            onBackToScorecard={() => setView('scorecard')}
            onGoHome={() => setView('dashboard')}
          />
        )}

        {view === 'analytics' && (
          <AnalyticsView
            onReviewSavedTest={handleReviewSavedTest}
            onLaunchMock={() => {
              setInitialConfigMode('test');
              setIsConfigModalOpen(true);
            }}
          />
        )}

        {view === 'questions' && (
          <QuestionBankBrowser
            onStartPractice={(subj) => {
              setSelectedStudySubject(subj);
              setView('study');
            }}
          />
        )}

        {view === 'bookmarks' && (
          <RevisionVault
            onStartStudyWithSubject={(subj) => {
              setSelectedStudySubject(subj);
              setView('study');
            }}
          />
        )}
      </main>

      {/* Footer (on non-exam views) */}
      {view !== 'exam' && (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-stone-200/60 dark:border-stone-800/60 bg-white/40 dark:bg-[#141824]/40 py-8 mt-12 text-center text-sm text-stone-500"
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-500" />
                <span className="font-medium text-stone-700 dark:text-stone-300">CBT Mastery Hub</span>
                <span className="text-stone-400">· Premium Exam Prep</span>
              </div>
              <span className="text-teal-600/70 dark:text-teal-500/70 text-xs md:ml-7 font-medium">Built by Arnab</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[13px]">
              <span className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-default">General Awareness</span>
              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
              <span className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-default">General Science</span>
              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
              <span className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-default">English</span>
              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
              <span className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-default">Mathematics</span>
            </div>
          </div>
        </motion.footer>
      )}

      {/* Test Configuration Modal */}
      <TestConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onStartExam={handleStartExam}
        initialMode={initialConfigMode}
      />
    </div>
  );
}
