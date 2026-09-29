import React, { useState } from 'react';
import { X, Check, Clock, Award, ShieldAlert, Sparkles, BookOpen, Layers } from 'lucide-react';
import { ExamMode, SubjectId, Difficulty, TestConfig } from '../types';
import { SUBJECTS } from '../data/subjects';

interface TestConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (config: TestConfig) => void;
  initialMode?: ExamMode;
}

export const TestConfigModal: React.FC<TestConfigModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
  initialMode = 'test',
}) => {
  const [mode, setMode] = useState<ExamMode>(initialMode);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([
    'general_awareness',
    'science',
    'english',
    'mathematics',
  ]);
  const [difficulty, setDifficulty] = useState<Difficulty | 'mixed'>('mixed');
  const [fullMarks, setFullMarks] = useState<number>(100);

  if (!isOpen) return null;

  const toggleSubject = (sId: SubjectId) => {
    if (selectedSubjects.includes(sId)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((id) => id !== sId));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sId]);
    }
  };

  const selectAllSubjects = () => {
    setSelectedSubjects(['general_awareness', 'science', 'english', 'mathematics']);
  };

  const questionsCount = fullMarks / 2;
  const durationMinutes = questionsCount * 1.2; // ~60 mins for 50 questions, 120 mins for 100 questions

  const handleLaunch = () => {
    const config: TestConfig = {
      mode,
      subjects: selectedSubjects,
      difficulty,
      fullMarks,
      questionsCount,
      durationMinutes: Math.round(durationMinutes),
    };
    onStartExam(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center glass bg-stone-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-[#141824] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Configure Your Assessment
            </h2>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              <span>Standard CBT Pattern</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>+2.0 Right</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span className="text-rose-600 dark:text-rose-400">-0.5 Negative</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              Select Experience Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('test')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  mode === 'test'
                    ? 'border-teal-600 dark:border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      mode === 'test' ? 'bg-teal-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-stone-900 dark:text-white block">
                      CBT Exam Mode
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Timed simulation & palette
                    </span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode('study')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  mode === 'study'
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      mode === 'study' ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-stone-900 dark:text-white block">
                      Interactive Study Mode
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Instant feedback & hints
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Subjects Selection */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Subjects (500 Questions Per Subject)
              </label>
              <button
                type="button"
                onClick={selectAllSubjects}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-medium cursor-pointer"
              >
                Select All 4
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(SUBJECTS) as SubjectId[]).map((sId) => {
                const s = SUBJECTS[sId];
                const isSelected = selectedSubjects.includes(sId);
                return (
                  <button
                    key={sId}
                    type="button"
                    onClick={() => toggleSubject(sId)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/20'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40'
                    }`}
                  >
                    <div className="pr-2">
                      <span className="text-xs font-bold text-stone-900 dark:text-white block">
                        {s.name}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {s.shortName} · 500 questions bank
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'border border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Marks & Question Count */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              Total Marks & Questions
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { marks: 50, qCount: 25, mins: 30 },
                { marks: 100, qCount: 50, mins: 60 },
                { marks: 200, qCount: 100, mins: 120 },
              ].map((tier) => (
                <button
                  key={tier.marks}
                  type="button"
                  onClick={() => setFullMarks(tier.marks)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    fullMarks === tier.marks
                      ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/40 ring-2 ring-teal-500/20'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="block text-base font-bold text-stone-900 dark:text-white font-mono">
                    {tier.marks} Marks
                  </span>
                  <span className="block text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    {tier.qCount} Questions
                  </span>
                  <span className="block text-[11px] text-stone-500 dark:text-stone-500 mt-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" /> {tier.mins} mins
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              Difficulty Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'mixed', label: 'Adaptive / Mixed' },
                { id: 'easy', label: 'Easy' },
                { id: 'medium', label: 'Medium' },
                { id: 'hard', label: 'Hard' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setDifficulty(diff.id as Difficulty | 'mixed')}
                  className={`py-2 px-2.5 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                    difficulty === diff.id
                      ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Marking Scheme Summary Card */}
          <div className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
              <ShieldAlert className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Standard Negative Marking Rules:</span>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-200 dark:border-stone-700">
              <span>Correct Answer: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">+2.00 Marks</strong></span>
              <span>Wrong Answer: <strong className="text-rose-600 dark:text-rose-400 font-mono">-0.50 Marks</strong></span>
              <span>Unattempted: <strong className="text-stone-500 font-mono">0.00 Marks</strong></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 dark:bg-stone-800/60 border-t border-stone-200 dark:border-stone-800">
          <div className="text-xs text-stone-500 dark:text-stone-400">
            {questionsCount} questions · {Math.round(durationMinutes)} mins · {selectedSubjects.length} subjects
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLaunch}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Begin Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
